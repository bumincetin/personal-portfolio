"use client";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import ExperienceIcon from '../ExperienceIcon';
import { useEffect, useRef, useSyncExternalStore } from "react";
import type { Locale } from "@/lib/translations";
import type { LibraryUI } from "@/lib/content/library-ui";
import { PROFILE } from "@/lib/profile";
import { getWorldCopy } from "./copy";
import { experience } from '../director/experience-director';
import { volumeStop } from '../director/narrative';
import type { WorldRuntime } from "./runtime";
import "./world.css";

type Subject = {
  id: string;
  roman: string;
  title: string;
  discipline: string;
  note: string;
  format: string;
  href: string;
};
export default function WorldExperience({
  locale,
  subjects,
  copy,
  identity,
}: {
  locale: Locale;
  subjects: Subject[];
  copy: LibraryUI;
  identity: string;
}) {
  const state = useSyncExternalStore(experience.subscribeWorld, experience.getWorld, experience.getServerWorld);
  const dispatch = experience.dispatch;
  const root = useRef<HTMLElement>(null),
    canvas = useRef<HTMLCanvasElement>(null);
  const markers = useRef<(HTMLButtonElement | null)[]>([]),
    indexLinks = useRef<(HTMLAnchorElement | null)[]>([]);
  const runtime = useRef<WorldRuntime | null>(null),
    heading = useRef<HTMLHeadingElement>(null);
  const lastSelected = useRef(0);
  const router = useRouter();
  const readingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (readingTimer.current) clearTimeout(readingTimer.current); }, []);
  const ui = getWorldCopy(locale);
  const loaded = !["LOADING", "FALLBACK"].includes(state.phase);
  const selected = state.selected === null ? null : subjects[state.selected];

  useEffect(() => {
    const surface = canvas.current,
      host = root.current;
    if (!surface || !host) return;
    let cancelled = false;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    void import("./runtime")
      .then((module) => {
        if (cancelled) return;
        try {
          runtime.current = module.createWorld(
            surface,
            markers.current,
            dispatch,
            () => experience.world,
          );
          dispatch({ type: "READY", reduced: motion.matches });
        } catch {
          dispatch({ type: "FAILED" });
        }
      })
      .catch(() => {
        if (!cancelled) dispatch({ type: "FAILED" });
      });
    const preference = () =>
      dispatch({ type: "MOTION", reduced: motion.matches });
    const escape = (e: KeyboardEvent) => {
      if (
        e.key === "Escape" &&
        experience.world.selected !== null &&
        !document.querySelector("dialog[open]")
      ) {
        if (readingTimer.current) { clearTimeout(readingTimer.current); readingTimer.current = null; }
        root.current?.removeAttribute('data-departing');
        root.current?.removeAttribute('data-closing');
        experience.publish({ departing: false });
        experience.home();
        indexLinks.current[lastSelected.current]?.focus({
          preventScroll: true,
        });
      }
    };
    window.addEventListener("keydown", escape);
    motion.addEventListener("change", preference);
    experience.measure();
    return () => {
      cancelled = true;
      runtime.current?.dispose();
      runtime.current = null;
      window.removeEventListener("keydown", escape);
      motion.removeEventListener("change", preference);
    };
  }, [dispatch]);
  useEffect(() => {
    runtime.current?.update();
    if (state.phase === "FALLBACK") {
      runtime.current?.dispose();
      runtime.current = null;
    }
  }, [state]);
  useEffect(() => {
    if (state.selected !== null) {
      lastSelected.current = state.selected;
    }
  }, [state.selected]);
  const home = () => {
    if (readingTimer.current) clearTimeout(readingTimer.current);
    root.current?.setAttribute('data-closing', 'true');
    readingTimer.current = setTimeout(() => {
      readingTimer.current = null;
      root.current?.removeAttribute('data-closing');
      root.current?.removeAttribute('data-departing');
      experience.publish({ departing: false });
      experience.home();
      indexLinks.current[lastSelected.current]?.focus({ preventScroll: true });
    }, state.reduced ? 0 : 160);
  };
  const select = (index: number) => {
    if (readingTimer.current) { clearTimeout(readingTimer.current); readingTimer.current = null; }
    root.current?.removeAttribute('data-closing');
    root.current?.removeAttribute('data-departing');
    experience.publish({ departing: false });
    dispatch({ type: "SELECT", index });
    // Focus only explicit inspection, never while the visitor is scrolling.
    setTimeout(() => heading.current?.focus({ preventScroll: true }), 0);
  };
  return (
    <header
      className="world-chapter"
      ref={root}
      data-phase={state.phase}
      data-selected={state.selected ?? ""}
      data-hovered={state.hovered ?? ""}
      data-motion={state.reduced ? "reduced" : "full"}
    >
      {subjects.map((subject, index) => <span key={subject.id} id={`inspect-${subject.id}`} className="world-stop" aria-hidden="true" style={{ top: `calc((100% - 100svh) * ${volumeStop(index)})` }} />)}
      <div
        className="world-stage"
      >
        <div className="world-placeholder" aria-hidden="true">
          <svg viewBox="0 0 1200 700" fill="none">
            <g stroke="currentColor" strokeWidth="1">
              <path d="M130 420 560 160 1090 360 660 640Z M130 420V160L560 20 1090 180V360 M560 20V160 M130 160 660 380 1090 180 M660 380V640" />
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <path
                  key={i}
                  d={`M${200 + i * 70} ${448 + i * 28} ${630 + i * 70} ${188 + i * 28} M${200 + i * 85} ${378 - i * 51} ${730 + i * 60} ${580 - i * 36}`}
                  opacity=".4"
                />
              ))}
              <ellipse cx="615" cy="360" rx="135" ry="70" />
              <path d="M480 360v80c0 95 270 95 270 0v-80M270 345v-75l130-70 130 55v75M790 420v-90l110-60 100 40v90" />
            </g>
          </svg>
        </div>
        <canvas className="world-canvas" ref={canvas} aria-hidden="true" />
        <div className="world-vignette" aria-hidden="true" />
        <div className="world-introduction">
          <p className="world-eyebrow">
            {ui.archive}
            <span aria-hidden="true"> / I — VII</span>
          </p>
          <h1>{copy.hero}</h1>
          <p className="world-identity">{identity}</p>
        </div>
        <div className="world-coordinate" aria-hidden="true">
          <span>
            {PROFILE.city}, {PROFILE.country}
          </span>
          <span>45°27′ N / 09°11′ E</span>
        </div>
        <div
          className="world-markers"
          hidden={!loaded}
          role="group"
          aria-label={copy.directory}
        >
          {subjects.map((subject, index) => (
            <button
              key={subject.id}
              ref={(el) => {
                markers.current[index] = el;
              }}
              className="world-marker"
              tabIndex={-1}
              aria-label={`${ui.inspect}: ${subject.title}`}
              data-active={state.hovered === index}
              onPointerEnter={() => dispatch({ type: "HOVER", index })}
              onPointerLeave={() => dispatch({ type: "HOVER", index: null })}
              onClick={() => select(index)}
            >
              <span>{subject.roman}</span>
              <span className="world-marker-title">
                {subject.title}
                <b aria-hidden="true"><ExperienceIcon name="external" /></b>
              </span>
            </button>
          ))}
        </div>
        {!loaded && (
          <p className="world-status" role="status">
            {state.phase === "FALLBACK" ? ui.unavailable : ui.loading}
            <span aria-hidden="true"> / 01—07</span>
          </p>
        )}
        {selected && (
          <section
            key={selected.id}
            className="world-inspection"
            data-lenis-prevent
            aria-labelledby="world-selection-title"
          >
            <button className="world-return" onClick={home}>
              <span aria-hidden="true"><ExperienceIcon name="back" /></span>
              {ui.back}
              <span aria-hidden="true">Esc</span>
            </button>
            <div className="world-inspection-body">
              <p className="world-eyebrow">
                {ui.position} {selected.roman}{" "}
                <span>/ {selected.discipline}</span>
              </p>
              <h2 id="world-selection-title" tabIndex={-1} ref={heading}>
                {selected.title}
              </h2>
              <p>{selected.note}</p>
              <div className="world-output">
                <span>{copy.takeaway}</span>
                <p>{selected.format}</p>
              </div>
              <Link
                href={`/${locale}${selected.href}`}
                prefetch={false}
                className="world-read"
                onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || state.reduced) return;
                  event.preventDefault();
                  if (readingTimer.current) return;
                  experience.beginReading();
                  root.current?.setAttribute('data-departing', 'true');
                  runtime.current?.update();
                  const href = `/${locale}${selected.href}`;
                  readingTimer.current = setTimeout(() => router.push(href), 420);
                }}
              >
                {copy.read}
                <span aria-hidden="true"><ExperienceIcon name="external" /></span>
              </Link>
            </div>
            <div className="world-paging">
              <button
                onClick={() => select((state.selected! + 6) % 7)}
                aria-label={ui.previous}
              >
                <ExperienceIcon name="back" />
              </button>
              <span>{selected.roman} / VII</span>
              <button
                onClick={() => select((state.selected! + 1) % 7)}
                aria-label={ui.next}
              >
                <ExperienceIcon name="arrow" />
              </button>
            </div>
          </section>
        )}
        <div
          className="world-bottom"
        >
          <div className="world-guide">
            <span className="world-signal" aria-hidden="true" />
            <p>
              {state.hovered === null ? ui.hint : subjects[state.hovered].title}
            </p>
          </div>
          <div className="world-bottom-row">
            <nav className="world-index" data-lenis-prevent aria-label={copy.directory}>
              {subjects.map((subject, index) => (
                <a
                  key={subject.id}
                  ref={(el) => {
                    indexLinks.current[index] = el;
                  }}
                  href={`/${locale}${subject.href}`}
                  role={loaded ? "button" : undefined}
                  aria-label={`${ui.inspect}: ${subject.title}`}
                  aria-current={state.selected === index ? "true" : undefined}
                  onKeyDown={(e) => {
                    if (loaded && e.key === " ") {
                      e.preventDefault();
                      select(index);
                    }
                  }}
                  onClick={(e) => {
                    if (loaded) {
                      e.preventDefault();
                      select(index);
                    }
                  }}
                  onFocus={() => dispatch({ type: "HOVER", index })}
                  onBlur={() => dispatch({ type: "HOVER", index: null })}
                  onPointerEnter={() => dispatch({ type: "HOVER", index })}
                  onPointerLeave={() =>
                    dispatch({ type: "HOVER", index: null })
                  }
                >
                  <span>{subject.roman}</span>
                  <span className="world-index-title">{subject.title}</span>
                </a>
              ))}
            </nav>
            <a className="world-browse" href="#catalogue">
              {copy.browse}
              <span aria-hidden="true"><ExperienceIcon name="down" /></span>
            </a>
          </div>
        </div>
        <noscript>
          <style>
            {
              ".world-markers,.world-status{display:none}.world-placeholder{opacity:.3}.atlas-page .world-chapter{height:100svh}"
            }
          </style>
        </noscript>
      </div>
    </header>
  );
}
