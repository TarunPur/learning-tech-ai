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
      pSub: "Three quick lines about your situation — you'll use them to write your follow-up next, and I'll help you make it sharp.",
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
      pSub: "Three quick lines — you'll use them to write a first message next; I'll help it earn a reply without sounding like a cold pitch.",
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
      pSub: "Three quick lines — you'll use them to write your request next; I'll help make saying yes to a time the easy choice.",
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
      pSub: "Three quick lines — you'll use them to write your follow-up next; I'll help you pick the conversation back up while it's warm.",
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
      pSub: "Three quick lines about your situation — you'll write the first version next, and I'll help you refine it.",
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

  /* ---- Two-path loop (Decisions 7/11) -------------------------------------
     path === 'own'  -> the user wrote their own first version (the DEFAULT)
     path === 'nod'  -> NOD drafted it and the user spotted the weak line first
     Both end at the same check, which reads the user's OWN working text. */
  function getPath() { return Store.get('path', 'own'); }

  /* The text the feedback screen actually checks, whichever path was taken. */
  function workingDraftText() {
    var s = Store.load();
    if (s.path === 'own') return s.ownText || '';
    var c = composeDraft();
    return [c.p1, c.p2, c.p3].join('\n\n');
  }

  /* ---- Prototype checker (Option A) ---------------------------------------
     A HEURISTIC stand-in for the real evaluator (length-math in code + an
     anchored Claude call), which is deferred to the build (journey.md §6).
     It runs on the user's OWN words and returns ONE fix, or null when it
     finds nothing. Clearly not the real judge — just enough to make the
     write-your-own path's payoff demoable and honest about its shape. */
  var SOFT_OPENERS = [
    'i just wanted to quickly check in and share that','just wanted to quickly check in',
    'i just wanted to check in','just wanted to check in','just checking in','wanted to quickly check in',
    'quickly check in','just wanted to','i wanted to reach out','just following up','just a quick note',
    'touching base','circling back','circle back','following up to see','reaching out to see',
    'i hope this finds you','hope this email finds you','hope this finds you well','hope you are doing well',
    'hope all is well','sorry to bother','sorry for bothering'
  ];

  function splitSentences(text) {
    return (String(text || '').replace(/\s+/g, ' ').match(/[^.!?]+[.!?]*/g) || [])
      .map(function (s) { return s.trim(); }).filter(Boolean);
  }
  function wordCount(text) { var m = String(text || '').trim().match(/\S+/g); return m ? m.length : 0; }
  function excerpt(s) { s = String(s); return s.length > 30 ? s.slice(0, 30) + '…' : s; }

  function tightenSoftOpener(sentence, phrase) {
    var low = sentence.toLowerCase(), at = low.indexOf(phrase);
    if (at === -1) return null;
    var rest = sentence.slice(at + phrase.length);
    rest = rest.replace(/^[\s,]*(and\s+)?(share|say|let you know|tell you|mention)?(\s+that)?[\s,:–-]*/i, '').trim();
    if (!rest) return null;
    return rest.charAt(0).toUpperCase() + rest.slice(1);
  }

  function evaluateText(text) {
    var t = String(text || ''), low = t.toLowerCase(), sentences = splitSentences(t);

    // 1) soft opener — the #1 thing the research says gets outreach skimmed
    for (var i = 0; i < SOFT_OPENERS.length; i++) {
      var phrase = SOFT_OPENERS[i], idx = low.indexOf(phrase);
      if (idx !== -1) {
        var sent = sentences.filter(function (s) { return s.toLowerCase().indexOf(phrase) !== -1; })[0] || t.trim();
        return {
          kind: 'soft-opener', sentence: sent,
          why: 'Soft openers like “' + excerpt(phrase) + '” bury your real reason and read like a template. Lead with the reason instead.',
          tight: tightenSoftOpener(sent, phrase)
        };
      }
    }
    // 2) no clear ask — nothing to say yes to
    if (t.indexOf('?') === -1 && wordCount(t) > 12) {
      return {
        kind: 'no-ask', sentence: (sentences[sentences.length - 1] || t.trim()),
        why: "I can’t find one clear ask. A busy reader needs one obvious, low-effort thing to do — end with a single question.",
        tight: null
      };
    }
    // 3) too long — the replies come from ~50–125 words
    var wc = wordCount(t);
    if (wc > 150) {
      var longest = sentences.slice().sort(function (a, b) { return b.length - a.length; })[0] || t.trim();
      return {
        kind: 'too-long', sentence: longest,
        why: 'This runs long (~' + wc + ' words). Outreach that gets replies is usually 50–125 words — cut anything that isn’t the reason or the ask.',
        tight: null
      };
    }
    return null; // clean enough for the prototype heuristic
  }

  /* Soft funnel (PRD §13): a lightweight intent check on the free-text task.
     Prototype stand-in for a server-side classifier — extend by adding keywords.
     Returns { kind:'outreach'|'offscope', scenario:<nearest curated id> }. */
  var OFFSCOPE = ['proposal','report','deck','presentation','slide','spreadsheet','excel','sheet',
    'blog','article','post','linkedin post','resume','cv','essay','contract','invoice','document',
    'doc ','strategy','business plan','memo','newsletter','whitepaper','case study','script','code'];
  var OUTREACH = ['email','message','follow up','follow-up','followup','chaser','reach out','reaching out',
    'intro','introduc','connect','reply','respond','nudge','ping','pitch','invite','reconnect',
    'thank you','thank-you','outreach','cold','prospect','client','lead','meeting','demo','call','dm'];

  function classifyTask(text) {
    var t = (text || '').toLowerCase();
    // nearest curated situation
    var sc = 'quiet';
    if (/\b(meeting|demo|call|book|schedule|walk ?through)\b/.test(t)) sc = 'meeting';
    else if (/\b(event|expo|conference|meetup|met (you|them|at)|thank|after the)\b/.test(t)) sc = 'event';
    else if (/\b(cold|new|intro|introduc|reach(ing)? out|first message|someone new)\b/.test(t)) sc = 'cold';
    // off-scope wins only if no outreach signal is also present
    var hasOff = OFFSCOPE.some(function (k) { return t.indexOf(k) !== -1; });
    var hasOut = OUTREACH.some(function (k) { return t.indexOf(k) !== -1; });
    var kind = (hasOff && !hasOut) ? 'offscope' : 'outreach'; // unsure -> outreach
    return { kind: kind, scenario: sc };
  }

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
    // if the user typed their own task, keep their words in the eyebrow even when
    // we've mapped them to the nearest curated situation under the hood
    var t = Store.get('customText', '');
    if (t) return 'Your task · ' + t;
    return scenario(Store.get('scenario', 'quiet')).chip;
  }

  global.NOD = {
    store: Store,
    SCENARIOS: SCENARIOS,
    ASK_SUGGESTIONS: ASK_SUGGESTIONS,
    SOFT_FLAG: SOFT_FLAG,
    FLAG_WHY: FLAG_WHY,
    scenario: scenario,
    classifyTask: classifyTask,
    firstName: firstName,
    composeDraft: composeDraft,
    currentSituationLabel: currentSituationLabel,
    getPath: getPath,
    workingDraftText: workingDraftText,
    evaluateText: evaluateText,
    splitSentences: splitSentences,
    wordCount: wordCount
  };
})(window);
