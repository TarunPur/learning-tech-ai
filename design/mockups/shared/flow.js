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
      artTitle: "Follow up after an event"
    },
    custom: {
      id: 'custom',
      chip: 'Your situation',
      pHeading: "First, who it's for — <em>and what you need.</em>",
      pSub: "Three quick lines about your situation. I'll shape a first draft, then we refine it together.",
      whoPh: "e.g. the person you're writing to, and how you know them",
      askPh: "e.g. the one thing you want them to do",
      ctxPh: "e.g. what makes now the right moment to send it",
      dHeading: "Here's a first shape — <em>a sample to start from.</em>",
      artTitle: "Your message"
    }
  };

  /* Inline suggestions under the "one thing you're asking for" field, for users
     who don't yet know what a good, low-friction ask looks like. Editable once picked. */
  var ASK_SUGGESTIONS = ['A 15-minute call', 'Two times to choose from', 'A quick yes/no reply'];

  function scenario(id) { return SCENARIOS[id] || SCENARIOS.quiet; }

  /* Current situation label for the context chip: a custom free-text situation
     shows the user's own words; a curated one shows its chip label. */
  function currentSituationLabel() {
    var id = Store.get('scenario', 'quiet');
    if (id === 'custom') {
      var t = Store.get('customText', '');
      return t ? ('Your situation · ' + t) : SCENARIOS.custom.chip;
    }
    return scenario(id).chip;
  }

  global.NOD = {
    store: Store,
    SCENARIOS: SCENARIOS,
    ASK_SUGGESTIONS: ASK_SUGGESTIONS,
    scenario: scenario,
    currentSituationLabel: currentSituationLabel
  };
})(window);
