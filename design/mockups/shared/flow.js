/* NOD flow state — carries the chosen situation and the user's intake across the
   6 static screens so every screen reflects the real task (not a hard-coded demo).
   Store is localStorage-backed; screens write on advance and read on load. */
(function (global) {
  'use strict';

  var KEY = 'nod.flow';

  var Store = {
    load: function () {
      try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
      catch (e) { return {}; }
    },
    save: function (patch) {
      var s = Store.load();
      for (var k in patch) { if (Object.prototype.hasOwnProperty.call(patch, k)) s[k] = patch[k]; }
      try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
      return s;
    },
    get: function (k, fallback) {
      var s = Store.load();
      return (s[k] != null && s[k] !== '') ? s[k] : fallback;
    },
    clear: function () { try { localStorage.removeItem(KEY); } catch (e) {} }
  };

  /* Per-situation copy. Each screen pulls what it needs; the `custom` free-text
     path echoes the user's typed situation and labels its draft as a sample. */
  var SCENARIOS = {
    quiet: {
      id: 'quiet',
      chip: 'Follow-up · A prospect went quiet',
      pHeading: "First, who went quiet — <em>and what you need.</em>",
      pSub: "Three quick lines. I'll use them to shape a follow-up that sounds like you — then we refine it together.",
      whoPh: "e.g. Nidhi, a marketing lead I met in June",
      askPh: "e.g. a 20-minute call next week",
      ctxPh: "e.g. we spoke at the expo and she asked me to follow up after launch",
      dHeading: "Here's a first shape — <em>your call on the moves.</em>",
      draft: {
        warm: "we spoke back in June, and you'd asked me to follow up once we launched",
        direct: "following up from June, where you'd asked to see this once it launched",
        reason: "the thing you wanted to see is live now",
        tight: "The thing you asked to see is live now.",
        ask: "Would {ask} be a useful way to see if it fits what your team's working on?",
        to: "a lead you'd been talking to"
      },
      artTitle: "A prospect went quiet"
    },
    cold: {
      id: 'cold',
      chip: 'Cold intro · Reaching out to someone new',
      pHeading: "Who are you reaching out to — <em>and why now?</em>",
      pSub: "Three quick lines. I'll shape a first message that earns a reply without sounding like a cold pitch.",
      whoPh: "e.g. Arjun, who leads growth at a fintech I admire",
      askPh: "e.g. a quick 15-minute intro call",
      ctxPh: "e.g. they just opened a Pune office and I can help with X",
      dHeading: "Here's a first shape — <em>your call on the moves.</em>",
      draft: {
        warm: "I came across what your team's building and wanted to reach out properly",
        direct: "I'm reaching out because what your team's building lines up with what I work on",
        reason: "there's a specific reason I think this is worth a look",
        tight: "There's a specific reason I think this is worth two minutes of your time.",
        ask: "Would {ask} be a good way to see if it's relevant?",
        to: "someone you haven't met yet"
      },
      artTitle: "Cold intro to a new prospect"
    },
    meeting: {
      id: 'meeting',
      chip: 'Meeting request · Booking a demo or call',
      pHeading: "Who are you meeting — <em>and what's the next step?</em>",
      pSub: "Three quick lines. I'll shape a request that makes saying yes to a time the easy choice.",
      whoPh: "e.g. Meera, a product lead who liked our last demo",
      askPh: "e.g. 30 minutes to walk through it",
      ctxPh: "e.g. she asked to see pricing once we shipped the new plan",
      dHeading: "Here's a first shape — <em>your call on the moves.</em>",
      draft: {
        warm: "thanks again for taking a look at what we shared",
        direct: "following up on what we shared, to find a time",
        reason: "the clearest next step is a quick look together",
        tight: "The clearest next step is a short look together.",
        ask: "Would {ask} work for you?",
        to: "someone weighing a demo"
      },
      artTitle: "Book a meeting or demo"
    },
    event: {
      id: 'event',
      chip: 'Event follow-up · Reconnecting after meeting',
      pHeading: "Who did you meet — <em>and what should you continue?</em>",
      pSub: "Three quick lines. I'll shape a follow-up that picks up the conversation while it's still warm.",
      whoPh: "e.g. Sam, who I met at the SaaS meetup on Friday",
      askPh: "e.g. a coffee next week to keep talking",
      ctxPh: "e.g. we talked about onboarding and they wanted our notes",
      dHeading: "Here's a first shape — <em>your call on the moves.</em>",
      draft: {
        warm: "it was good to meet you and talk through what you're working on",
        direct: "good to meet you — following up while it's still fresh",
        reason: "I said I'd send something over, so here it is",
        tight: "I said I'd follow up while it was fresh, so here I am.",
        ask: "Would {ask} be a good way to keep it going?",
        to: "someone you just met"
      },
      artTitle: "Follow up after an event"
    },
    custom: {
      id: 'custom',
      chip: 'Your task',
      pHeading: "First, who it's for — <em>and what you need.</em>",
      pSub: "Three quick lines about your situation. I'll shape a first draft, then we refine it together.",
      whoPh: "e.g. the person you're writing to, and how you know them",
      askPh: "e.g. the one thing you want them to do",
      ctxPh: "e.g. what makes now the right moment to send it",
      dHeading: "Here's a first shape — <em>a sample to start from.</em>",
      draft: {
        sample: true,
        warm: "I wanted to reach out about this properly",
        direct: "I'm reaching out about this directly",
        reason: "here's the real reason I'm getting in touch now",
        tight: "Here's the real reason I'm reaching out now.",
        ask: "Would {ask} be a useful next step?",
        to: "the person you're writing to"
      },
      artTitle: "Your message"
    }
  };

  /* Inline suggestions under the "one thing you're asking for" field, for users
     who don't yet know what a good, low-friction ask looks like. Editable once picked. */
  var ASK_SUGGESTIONS = ['A 15-minute call', 'Two times to choose from', 'A quick yes/no reply'];

  /* The one soft opener every guided draft still carries — the "just checking in"
     pattern named across the research as the #1 thing that gets outreach skimmed.
     Feedback flags exactly this substring, so Draft and Feedback stay the same message. */
  var SOFT_FLAG = 'I just wanted to quickly check in and share that';
  var FLAG_WHY = 'Soft openers like "just checking in" bury your reason and read as a template. Your real reason is stronger — lead with it.';

  function scenario(id) { return SCENARIOS[id] || SCENARIOS.quiet; }

  // first name from the "who" line, for greetings and reassurance; falls back to "there"
  function firstName(who) {
    var m = (who || '').match(/\b([A-Z][a-z]{1,})\b/);
    return m ? m[1] : 'there';
  }

  /* Compose the guided draft's three paragraphs from stored intake + scenario copy.
     P2 is the soft, flaggable line; feedback rewrites P2 to `tight`. */
  function composeDraft() {
    var id = Store.get('scenario', 'quiet');
    var sc = scenario(id);
    var d = sc.draft;
    var who = Store.get('who', '');
    var ask = Store.get('ask', '') || sc.askPh.replace(/^e\.g\.\s*/, '');
    var tone = Store.get('tone', 'warm');
    var name = firstName(who);
    var opener = 'Hi ' + name + ' — ' + (tone === 'direct' ? d.direct : d.warm) + '.';
    var soft = SOFT_FLAG + ' ' + d.reason + '.';
    var askLine = d.ask.replace('{ask}', ask);
    return {
      scenario: id, sample: !!d.sample, name: name,
      recipient: who || d.to, tone: tone,
      p1: opener, p2: soft, p3: askLine,
      flag: SOFT_FLAG, tight: d.tight, why: FLAG_WHY,
      artTitle: sc.artTitle
    };
  }

  /* Current situation label for the context chip: a custom free-text situation
     shows the user's own words; a curated one shows its chip label. */
  function currentSituationLabel() {
    var id = Store.get('scenario', 'quiet');
    if (id === 'custom') {
      var t = Store.get('customText', '');
      return t ? ('Your task · ' + t) : SCENARIOS.custom.chip;
    }
    return scenario(id).chip;
  }

  global.NOD = {
    store: Store,
    SCENARIOS: SCENARIOS,
    ASK_SUGGESTIONS: ASK_SUGGESTIONS,
    SOFT_FLAG: SOFT_FLAG,
    FLAG_WHY: FLAG_WHY,
    scenario: scenario,
    firstName: firstName,
    composeDraft: composeDraft,
    currentSituationLabel: currentSituationLabel
  };
})(window);
