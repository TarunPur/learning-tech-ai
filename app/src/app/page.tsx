"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import "./landing.css";

// Ported from design/mockups/landing-editorial-blue-v3.html (Phase 10). The five
// CTAs below all route into sign-in; the marketing chrome (nav shadow, section
// reveal-on-scroll, the transform-demo carousel) is wired up imperatively in
// one effect, mirroring the original vanilla script almost verbatim — it's a
// self-contained decorative widget with no app state to coordinate with.

function ArrowIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckCircleIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8.4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 10.2l2.3 2.3 4.6-4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CtaLink({ children }: { children: ReactNode }) {
  return (
    <Link className="btn" href="/signin?next=/app">
      {children}
      <ArrowIcon />
    </Link>
  );
}

const VOICES: { quote: string; ai: string; pattern: string; blocker: string; role: string }[] = [
  { quote: "I don’t know where to start, or what “good” even looks like for a cold email.", ai: "Every day", pattern: "Cold intros", blocker: "Where to start", role: "Founder, small business · pre-launch research" },
  { quote: "ChatGPT gives me something instantly, but instant isn’t the same as good, and nothing tells me the difference.", ai: "Every day", pattern: "Client follow-ups", blocker: "Is it any good?", role: "Account manager · pre-launch research" },
  { quote: "When the draft is off, I can’t tell why, so I can’t fix it. I just send it and hope.", ai: "A few times a week", pattern: "Re-engaging quiet leads", blocker: "Can’t tell why", role: "Operations lead · pre-launch research" },
  { quote: "Every tool writes it for me. None of them make me any better at writing it myself.", ai: "Every day", pattern: "Partnership outreach", blocker: "Not enough practice", role: "Partnerships lead · pre-launch research" },
];

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "Will NOD use my real names or company details?",
    a: (
      <>
        Names and identifying details are <b>masked before NOD processes your message</b>, and your saved copy stays
        masked. Your real names are only filled back into the version you copy to send.
      </>
    ),
  },
  {
    q: "What kind of messages can NOD help with?",
    a: (
      <>
        Outreach you actually send — a follow-up to a prospect who went quiet, a cold intro, a meeting or demo
        request, an event follow-up. <b>One real message at a time.</b>
      </>
    ),
  },
  {
    q: "Is this for people who already use AI?",
    a: (
      <>
        Yes. If a chat tool hands you a draft but you can’t tell whether it’s any good, NOD is the part
        that’s missing — <b>a fixed standard that tells you what to change,</b> not another quick draft.
      </>
    ),
  },
  {
    q: "How is this different from a template or a generic AI prompt?",
    a: (
      <>
        A template gives you words to copy. NOD holds <b>your real message</b> to how the best outreach actually
        works, shows you the one line worth changing and why — and you make the call.
      </>
    ),
  },
];

function VoiceCard({ v, hidden }: { v: (typeof VOICES)[number]; hidden?: boolean }) {
  return (
    <figure className={hidden ? "vcard dup" : "vcard"} aria-hidden={hidden || undefined}>
      <div className="vc-head">
        <span className="vtag">
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
            <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          Insight from research
        </span>
      </div>
      <blockquote>{v.quote}</blockquote>
      <div className="vc-data">
        <div className="vc-row">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.6l1.5 4.9 4.9 1.5-4.9 1.5L8 14.4l-1.5-4.9L1.6 8l4.9-1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
          <span className="vc-k">Daily AI use</span><span className="vc-v">{v.ai}</span>
        </div>
        <div className="vc-row">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 4.5A1.5 1.5 0 0 1 4 3h8a1.5 1.5 0 0 1 1.5 1.5v4A1.5 1.5 0 0 1 12 10H6l-3 2.4V10H4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
          <span className="vc-k">Use case pattern</span><span className="vc-v">{v.pattern}</span>
        </div>
        <div className="vc-row">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 14.5V2.5M4 3h7l-1.4 2.4L11 8H4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="vc-k">Learning blocker</span><span className="vc-v">{v.blocker}</span>
        </div>
      </div>
      <figcaption>{v.role}</figcaption>
    </figure>
  );
}

export default function Home() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  // UX-004: one answer open at a time (the mockup's own accordion script
  // toggled a class per-item without closing siblings, contradicting its own
  // comment "expand one answer at a time on click" — a Set here had the same
  // gap, letting every answer accumulate open. A single nullable index makes
  // "one open" structurally true instead of something callers have to
  // remember to enforce.
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  function toggleFaq(i: number) {
    setOpenFaq((prev) => (prev === i ? null : i));
  }

  // Nav hairline-on-scroll + section reveal-on-enter + the ChatGPT transform-demo
  // carousel — ported near-verbatim from the mockup's <script>, scoped to this
  // page's root so it only touches elements this component rendered.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cleanups: (() => void)[] = [];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // reveal-on-enter, once
    const risers = root.querySelectorAll<HTMLElement>(".rise");
    if (reduce || !("IntersectionObserver" in window)) {
      risers.forEach((el) => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
      );
      risers.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // nav hairline on scroll
    const nav = root.querySelector<HTMLElement>(".nav");
    if (nav) {
      const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
    }

    // transform-demo: one continuous message improving, animate only the ask
    const demo = root.querySelector<HTMLElement>(".transform-demo");
    if (demo) {
      const card = demo.querySelector<HTMLElement>("#demoCard");
      const ctx = demo.querySelector<HTMLElement>("#demoCtx");
      const mail = demo.querySelector<HTMLElement>("#demoMail");
      const note = demo.querySelector<HTMLElement>("#demoNote");
      const cap = demo.querySelector<HTMLElement>("#demoCap");
      const lesson = demo.querySelector<HTMLElement>("#demoLesson");
      const steps = Array.from(demo.querySelectorAll<HTMLElement>(".td-step"));
      const STAGE = 4000;
      const PAUSE = 1400;
      let i = -1;
      let timer: ReturnType<typeof setTimeout> | null = null;
      let started = false;
      let paused = false;

      const warnSvg =
        '<svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 6v5M10 14h.01" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.4"/></svg>';
      const okSvg =
        '<svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8.4" stroke="currentColor" stroke-width="1.4"/><path d="M6.5 10.2l2.3 2.3 4.6-4.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

      function setNote(kind: "warn" | "good", html: string) {
        if (!note) return;
        note.className = "demo-note " + kind;
        note.innerHTML = (kind === "good" ? okSvg : warnSvg) + "<span>" + html + "</span>";
      }
      function setSteps(idx: number) {
        steps.forEach((st, n) => {
          const f = st.querySelector<HTMLElement>(".td-sfill");
          st.classList.toggle("is-active", n === idx);
          st.classList.toggle("is-done", n < idx);
          if (!f) return;
          if (n < idx) {
            f.style.transition = "none";
            f.style.width = "100%";
          } else if (n === idx) {
            if (reduce) {
              f.style.transition = "none";
              f.style.width = "100%";
            } else {
              f.style.transition = "none";
              f.style.width = "0%";
              void f.offsetWidth;
              f.style.transition = "width " + STAGE + "ms linear";
              f.style.width = "100%";
            }
          } else {
            f.style.transition = "none";
            f.style.width = "0%";
          }
        });
      }
      function setCap(text: string) {
        if (!cap) return;
        if (text) {
          cap.textContent = text;
          cap.classList.add("show");
        } else {
          cap.classList.remove("show");
          cap.textContent = "";
        }
      }
      function setLesson(show: boolean) {
        lesson?.classList.toggle("show", show);
      }
      function stage0() {
        if (!ctx || !mail) return;
        ctx.textContent = "Your draft · a prospect who went quiet";
        mail.innerHTML = 'Hi Tarun — just checking in. <span class="demo-ask weak">Let me know your thoughts.</span>';
        setNote("warn", "A vague ask gives them nothing simple to say yes to.");
        setLesson(false);
        setCap("");
        setSteps(0);
      }
      function stage1() {
        if (!ctx || !mail) return;
        ctx.textContent = "Checked against the standard";
        const a = mail.querySelector<HTMLElement>(".demo-ask");
        if (a) {
          a.classList.remove("weak");
          a.classList.add("fixed");
          setTimeout(
            () => {
              if (mail.querySelector(".demo-ask") === a) a.textContent = "Would Thursday at 4 work for a quick call?";
            },
            reduce ? 0 : 650
          );
        }
        setNote("good", "The standard wants <b>one clear, easy ask</b> — so NOD points at that line, and why.");
        setLesson(false);
        setCap("");
        setSteps(1);
      }
      function stage2() {
        function apply() {
          if (!ctx || !mail) return;
          ctx.textContent = "You improve · the same message, sharpened";
          mail.innerHTML =
            'Hi Tarun — following up after the demo. <span class="demo-ask fixed">Would Thursday at 4 work for a quick call?</span>';
          setNote("good", "Now you know the fix — <b>next time you write the clear ask yourself.</b>");
          setLesson(true);
          setCap("That is the part a chat box skips: the skill sticks.");
        }
        if (reduce || !card) {
          apply();
        } else {
          card.classList.add("swapping");
          setTimeout(() => {
            apply();
            card.classList.remove("swapping");
          }, 340);
        }
        setSteps(2);
      }
      const fns = [stage0, stage1, stage2];
      function schedule() {
        if (paused) return;
        timer = setTimeout(advance, i === 2 ? STAGE + PAUSE : STAGE);
      }
      function advance() {
        i = (i + 1) % 3;
        fns[i]?.();
        schedule();
      }
      function startStatic() {
        if (!ctx || !mail) return;
        ctx.textContent = "You improve · the same message, sharpened";
        mail.innerHTML =
          'Hi Tarun — following up after the demo. <span class="demo-ask fixed">Would Thursday at 4 work for a quick call?</span>';
        setNote("good", "Now you know the fix — <b>next time you write the clear ask yourself.</b>");
        setLesson(true);
        setCap("That is the part a chat box skips: the skill sticks.");
        steps.forEach((st) => {
          st.classList.remove("is-active");
          st.classList.add("is-done");
          const f = st.querySelector<HTMLElement>(".td-sfill");
          if (f) {
            f.style.transition = "none";
            f.style.width = "100%";
          }
        });
      }
      function start() {
        if (started) return;
        started = true;
        if (reduce) {
          startStatic();
          return;
        }
        i = -1;
        advance();
      }
      function pause() {
        if (paused || reduce) return;
        paused = true;
        if (timer) clearTimeout(timer);
      }
      function resume() {
        if (!paused || reduce) return;
        paused = false;
        schedule();
      }
      demo.addEventListener("mouseenter", pause);
      demo.addEventListener("mouseleave", resume);
      demo.addEventListener("focusin", pause);
      demo.addEventListener("focusout", resume);
      cleanups.push(() => {
        demo.removeEventListener("mouseenter", pause);
        demo.removeEventListener("mouseleave", resume);
        demo.removeEventListener("focusin", pause);
        demo.removeEventListener("focusout", resume);
        if (timer) clearTimeout(timer);
      });
      if (!("IntersectionObserver" in window)) {
        start();
      } else {
        const io = new IntersectionObserver(
          (es) => {
            es.forEach((e) => {
              if (e.isIntersecting) {
                start();
                io.unobserve(e.target);
              }
            });
          },
          { threshold: 0.35 }
        );
        io.observe(demo);
        cleanups.push(() => io.disconnect());
      }
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div className="landing" ref={rootRef}>
      <header className="nav">
        <div className="wrap row">
          <a className="mark" href="#top" aria-label="NOD home">
            <span className="logo" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v6A2.5 2.5 0 0 1 17.5 15H9l-4 3.5V15H6.5" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M9.5 9.2l1.8 1.8 3.4-3.7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="wm">NOD</span>
          </a>
          <CtaLink>Start with your first task</CtaLink>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="wrap hero-grid-2">
            <div className="hero-copy">
              <h1 className="h-anim a1">
                Finish one real task — and know you can be <em>better at it</em> next time.
              </h1>
              <p className="sub h-anim a2">
                You write it; NOD checks it against a proven standard — so you know what to send, and what to do
                differently next time.
              </p>
              <div className="cta h-anim a3">
                <CtaLink>Start with your first task</CtaLink>
                <span className="micro">Free to use · one sign-in · names are masked before NOD processes your message</span>
              </div>
              <p className="cred h-anim a3">
                <CheckCircleIcon />
                Built from published outreach research — not a generic AI opinion.
              </p>
            </div>

            <div className="hero-art h-anim a4" aria-hidden="true">
              <svg
                className="hero-scene"
                viewBox="0 0 468 372"
                fill="none"
                role="img"
                aria-label="How NOD helps: you bring a real task, NOD checks it against a proven standard, and each time you get sharper — until you do it on your own."
              >
                <rect className="hs-shadow" x="40" y="52" width="398" height="300" />
                <rect className="hs-card" x="30" y="40" width="398" height="300" />
                <text className="hs-tag fade f1" x="58" y="80">HOW NOD HELPS</text>
                <line className="hs-conn fade f1" x1="73" y1="118" x2="73" y2="270" />
                <g className="fade f1">
                  <circle className="hs-num" cx="73" cy="118" r="16" />
                  <text className="hs-numtxt" x="73" y="123" textAnchor="middle">1</text>
                  <text className="hs-title" x="104" y="112">You bring a real task</text>
                  <text className="hs-subq" x="104" y="135">&ldquo;Hi Tarun — following up on the demo…&rdquo;</text>
                </g>
                <g className="fade f2">
                  <circle className="hs-num" cx="73" cy="194" r="16" />
                  <text className="hs-numtxt" x="73" y="199" textAnchor="middle">2</text>
                  <text className="hs-title" x="104" y="188">NOD checks it against the standard</text>
                  <text className="hs-sub" x="104" y="211">points at the one line to fix — and why</text>
                </g>
                <g className="fade f3">
                  <circle className="hs-num" cx="73" cy="270" r="16" />
                  <text className="hs-numtxt" x="73" y="275" textAnchor="middle">3</text>
                  <text className="hs-title" x="104" y="264">You get sharper each time</text>
                  <text className="hs-sub" x="104" y="287">soon you do it on your own</text>
                </g>
              </svg>
            </div>
          </div>
        </section>

        <section className="section tint">
          <div className="wrap">
            <div className="sec-head rise">
              <p className="eyebrow-q">&ldquo;Then why not just use <em>ChatGPT?</em>&rdquo;</p>
              <p className="sec-sub">
                <strong>
                  A chat tool writes it <em className="serif">for</em> you. NOD does something a chat box can&rsquo;t
                  — it walks you from stuck, to a message worth sending, to writing the next one on your own.
                </strong>
              </p>
            </div>
            <div className="td-actions rise d1">
              <CtaLink>Start with your first task</CtaLink>
              <span className="td-proof">
                <CheckCircleIcon size={16} />
                Held to one fixed standard, the same every time — not a flattering opinion.
              </span>
            </div>
            <div
              className="transform-demo rise d2"
              role="img"
              aria-label="A live demo you can watch: your vague ask 'Let me know your thoughts' is checked against the standard, replaced with a clear one 'Would Thursday at 4 work for a quick call?', and you can write it yourself next time."
            >
              <div className="demo-card" id="demoCard" aria-hidden="true">
                <span className="demo-ctx" id="demoCtx">Your draft · a prospect who went quiet</span>
                <p className="demo-mail" id="demoMail">
                  Hi Tarun — just checking in. <span className="demo-ask weak" id="demoAsk">Let me know your thoughts.</span>
                </p>
                <div className="demo-note warn" id="demoNote">
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M10 6v5M10 14h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                  <span>A vague ask gives them nothing simple to say yes to.</span>
                </div>
                <div className="demo-lesson" id="demoLesson">
                  <span className="ll">
                    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M10 2.5l2.2 4.6 5 .7-3.6 3.5.9 5L10 14l-4.5 2.3.9-5L2.8 7.8l5-.7L10 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                    </svg>
                    The skill you keep
                  </span>
                  <span className="lt">
                    End with <b>one clear, specific ask</b> — give them a single, easy thing to say yes to.
                  </span>
                </div>
                <p className="demo-cap" id="demoCap" />
              </div>
              <div className="td-progress demo-timeline" aria-hidden="true">
                <div className="td-step is-active" data-step="0"><div className="td-sbar"><div className="td-sfill" /></div><span className="td-slabel">Your draft</span></div>
                <div className="td-step" data-step="1"><div className="td-sbar"><div className="td-sfill" /></div><span className="td-slabel">Checked vs the standard</span></div>
                <div className="td-step" data-step="2"><div className="td-sbar"><div className="td-sfill" /></div><span className="td-slabel">You improve</span></div>
              </div>
            </div>
            <p className="journey-foot rise d3">
              <b>A chat tool writes it for you.</b> NOD optimizes your draft against a proven standard and shows you
              why — so the skill sticks.
            </p>
          </div>
        </section>

        <section className="section auth">
          <div className="wrap">
            <div className="sec-head">
              <p className="eyebrow-q">What makes NOD <em>uniquely powerful.</em></p>
              <p className="sec-sub">
                Three things a chat box doesn&rsquo;t give you: a flow that takes a real message and holds it to how
                the best outreach actually works.
              </p>
            </div>

            <div className="power-flow">
              <div className="pw-step rise">
                <span className="pw-ico" aria-hidden="true">
                  <svg width="19" height="19" viewBox="0 0 20 20" fill="none">
                    <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3h9A1.5 1.5 0 0 1 16 4.5v6A1.5 1.5 0 0 1 14.5 12H8l-3.2 2.6V12H5.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M7 6.6h6M7 9h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="pw-flow">Your message</span>
                <h3 className="pw-title">Starts with your real one</h3>
                <p className="pw-body">The exact message you need to send now, <strong>not a template or a blank box.</strong></p>
              </div>
              <div className="pw-join" aria-hidden="true"><ArrowIcon size={24} /></div>
              <div className="pw-step rise d1">
                <span className="pw-ico" aria-hidden="true">
                  <svg width="19" height="19" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2.4l6 2.3v4c0 3.5-2.4 6-6 7-3.6-1-6-3.5-6-7v-4l6-2.3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M7.2 9.6l2 2 3.6-3.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="pw-flow">Fixed expert standard</span>
                <h3 className="pw-title">Checked, not flattered</h3>
                <p className="pw-body">Held to patterns from <strong>millions of real emails</strong>, the same way every time.</p>
              </div>
              <div className="pw-join" aria-hidden="true"><ArrowIcon size={24} /></div>
              <div className="pw-step rise d2">
                <span className="pw-ico" aria-hidden="true">
                  <svg width="19" height="19" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="10" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10 1.6V4M10 16v2.4M18.4 10H16M4 10H1.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="pw-flow">The exact change</span>
                <h3 className="pw-title">Shows you what to fix</h3>
                <p className="pw-body">Points at the specific line, tells you why — and <strong>you</strong> make the change.</p>
              </div>
            </div>

            <div className="src-strip rise d1">
              <p className="src-strip-label">Research NOD&rsquo;s standard is built on. <b>Not customers, endorsements, or partnerships.</b></p>
              <div className="src-marquee" aria-label="Research sources behind the standard">
                <div className="src-track">
                  {["Gong", "Boomerang", "Backlinko", "Woodpecker", "Lavender"].map((name) => (
                    <span className="lg" key={name}>{name}</span>
                  ))}
                  <span className="lg lg-name">Josh Braun</span>
                  {["Gong", "Boomerang", "Backlinko", "Woodpecker", "Lavender"].map((name) => (
                    <span className="lg dup" aria-hidden="true" key={"dup-" + name}>{name}</span>
                  ))}
                  <span className="lg lg-name dup" aria-hidden="true">Josh Braun</span>
                </div>
              </div>
              <p className="srcnote">Published outreach analyses across <span className="n">70M+</span> real emails.</p>
            </div>
          </div>
        </section>

        <section className="section voices" id="research">
          <div className="wrap voices-head">
            <span className="v-eyebrow rise">From our research</span>
            <h2 className="v-h rise d1">We didn&rsquo;t guess at this. <em>We asked.</em></h2>
            <p className="v-sub rise d2">
              Before building anything, we asked professionals in marketing, sales and ops where outreach breaks
              down. In our target group, <strong>36% said they don&rsquo;t know where to start</strong> and{" "}
              <strong>25% said they don&rsquo;t get enough practice</strong>. That&rsquo;s the exact friction NOD is
              built to remove.
            </p>
          </div>

          <p className="voices-grouplabel rise d2">What professionals described before NOD existed</p>

          <div className="voices-marquee" aria-label="Insights from our pre-launch research">
            <div className="voices-vtrack">
              {VOICES.map((v) => (
                <VoiceCard v={v} key={v.role} />
              ))}
              {VOICES.map((v) => (
                <VoiceCard v={v} key={"dup-" + v.role} hidden />
              ))}
            </div>
          </div>

          <p className="v-note wrap">
            Paraphrased from our pre-launch research for length — these are research findings, not customer
            reviews.
          </p>
        </section>

        <section className="section faq" id="faq">
          <div className="wrap">
            <div className="faq-head rise">
              <p className="eyebrow-q">A few questions that came up in our <em>research.</em></p>
            </div>
            <div className="faq-list rise">
              {FAQS.map((item, i) => {
                const open = openFaq === i;
                return (
                  <div className={open ? "faq-item open" : "faq-item"} key={item.q}>
                    <button className="faq-q" type="button" aria-expanded={open} onClick={() => toggleFaq(i)}>
                      <svg className="faq-chevron" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{item.q}</span>
                    </button>
                    <div className="faq-a-wrap">
                      <div className="faq-a-inner">
                        <p className="faq-a">{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="close">
          <div className="wrap">
            <h2 className="rise">The message you&rsquo;ve been putting off? <em>Let&rsquo;s finish it.</em></h2>
            <div className="cta rise d1">
              <CtaLink>Start with your first task</CtaLink>
              <span className="micro">Free to use · English, for now · names are masked before NOD processes your message</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap">
          <div className="foot-top">
            <div className="foot-brand">
              <a className="mark" href="#top" aria-label="NOD home">
                <span className="logo" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v6A2.5 2.5 0 0 1 17.5 15H9l-4 3.5V15H6.5" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
                    <path d="M9.5 9.2l1.8 1.8 3.4-3.7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="wm">NOD</span>
              </a>
              <p className="foot-desc">Finish one real task — and know you can do it on your own.</p>
            </div>
            <nav className="foot-cols" aria-label="Footer">
              <div className="foot-col">
                <h4>Company</h4>
                <a href="#research">Our research</a>
                <span className="foot-soon">About <i>soon</i></span>
                <span className="foot-soon">Careers <i>soon</i></span>
              </div>
              <div className="foot-col">
                <h4>Your data</h4>
                <a href="#faq">How your data is masked</a>
                <span className="foot-soon">Privacy <i>soon</i></span>
                <span className="foot-soon">Terms <i>soon</i></span>
              </div>
              <div className="foot-col">
                <h4>Start</h4>
                <Link href="/signin?next=/app">Start with your first task</Link>
                <span className="foot-soon">LinkedIn <i>soon</i></span>
                <span className="foot-soon">X <i>soon</i></span>
              </div>
            </nav>
          </div>
          <p className="note">
            A calm way to finish the task you&rsquo;re stuck on. We claim quality by a fixed expert standard —
            never that a message will get a reply. Examples on this page are illustrative.
          </p>
          <div className="foot-wordmark" aria-hidden="true">NOD</div>
        </div>
      </footer>
    </div>
  );
}
