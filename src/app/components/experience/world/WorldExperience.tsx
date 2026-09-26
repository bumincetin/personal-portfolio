"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/translations";
import type { WorldRuntime } from "./runtime";
import { getWorldCopy } from "./copy";

type Subject = {
  id: string;
  roman: string;
  title: string;
  note: string;
  href: string;
};

export default function WorldExperience({
  locale,
  subjects,
}: {
  locale: Locale;
  subjects: Subject[];
}) {
  const copy = getWorldCopy(locale);
  const canvas = useRef<HTMLCanvasElement>(null);
  const runtime = useRef<WorldRuntime | null>(null);
  const reduced = useRef(false);
  const selection = useRef<number | null>(null);
  const optedIn = useRef(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [enabled, setEnabled] = useState(true);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">(
    "loading",
  );

  useEffect(() => {
    if (!enabled || !canvas.current) return;
    let cancelled = false;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = media.matches;
    const change = () => {
      reduced.current = media.matches;
      runtime.current?.update(selection.current, media.matches);
    };
    media.addEventListener("change", change);
    const element = canvas.current;
    const fail = () => {
      if (!cancelled) {
        runtime.current?.dispose();
        runtime.current = null;
        setStatus("fallback");
        setEnabled(false);
      }
    };
    // Yield the first paint to the HTML heading and the static room image.
    const timer = window.setTimeout(async () => {
      const connection = (
        navigator as Navigator & { connection?: { saveData?: boolean } }
      ).connection;
      const constrained = (navigator as Navigator & { deviceMemory?: number })
        .deviceMemory;
      const touch = matchMedia("(pointer: coarse), (max-width: 700px)").matches;
      if (
        (connection?.saveData ||
          touch ||
          (constrained !== undefined && constrained <= 2)) &&
        !optedIn.current
      ) {
        fail();
        return;
      }
      try {
        const { createWorld } = await import("./runtime");
        if (cancelled) return;
        runtime.current = createWorld(
          element,
          setSelected,
          fail,
          media.matches,
        );
        runtime.current.update(selection.current, media.matches);
        setStatus("ready");
      } catch {
        fail();
      }
    }, 180);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      media.removeEventListener("change", change);
      runtime.current?.dispose();
      runtime.current = null;
    };
  }, [enabled]);

  useEffect(() => {
    selection.current = selected;
    runtime.current?.update(selected, reduced.current);
  }, [selected]);

  const subject = selected === null ? null : subjects[selected];
  const selectSubject = (index: number) => {
    setSelected(index);
    const firstInteraction = !optedIn.current;
    optedIn.current = true;
    // On phones, choosing an exhibit is also an explicit request to open 3D.
    if (!enabled && firstInteraction) {
      setStatus("loading");
      setEnabled(true);
    }
  };
  return (
    <section
      className="world-room"
      aria-label={copy.label}
      data-state={enabled ? status : "still"}
      onKeyDown={(event) => {
        if (event.key === "Escape") setSelected(null);
      }}
    >
      <div className="world-caption">
        <span>{copy.label} / I–VII</span>
        <button
          type="button"
          className="world-mode"
          onClick={() => {
            optedIn.current = true;
            setStatus("loading");
            setEnabled(!enabled);
          }}
        >
          {enabled ? copy.still : copy.live}
        </button>
      </div>
      <div className="world-viewport">
        <Image
          src="/world-preview.webp"
          alt=""
          fill
          sizes="(max-width: 900px) 100vw, 65vw"
          priority
          className="world-preview"
        />
        <canvas key={String(enabled)} ref={canvas} aria-hidden="true" />
        <span className="world-coordinate" aria-hidden="true">
          BKÇ / MILANO
        </span>
      </div>
      <div className="world-controls">
        <button
          className="world-overview"
          type="button"
          aria-pressed={selected === null}
          onClick={() => setSelected(null)}
        >
          {copy.overview}
        </button>
        <div className="world-index" role="group" aria-label={copy.hint}>
          {subjects.map((item, index) => (
            <button
              type="button"
              key={item.id}
              aria-label={`${copy.select} ${item.roman}: ${item.title}`}
              aria-pressed={selected === index}
              onClick={() => selectSubject(index)}
            >
              {item.roman}
            </button>
          ))}
        </div>
      </div>
      <div className="world-detail" aria-live="polite" aria-atomic="true">
        {subject ? (
          <>
            <p className="world-detail-title">{subject.title}</p>
            <p>{subject.note}</p>
            <Link
              className="text-link"
              href={`/${locale}${subject.href}`}
              prefetch={false}
            >
              {copy.read}
              <span aria-hidden="true">↗</span>
            </Link>
          </>
        ) : (
          <>
            <p className="world-detail-title">{copy.hint}</p>
            <p>{copy.explore}</p>
          </>
        )}
      </div>
      <span className="sr-only" role="status">
        {!enabled || status === "fallback"
          ? copy.fallback
          : status === "loading"
            ? copy.loading
            : copy.ready}
      </span>
      <noscript>
        <style>{`.world-controls,.world-mode,.world-detail{display:none}.world-room [role="status"]{display:none}`}</style>
        <p className="world-static-note">{copy.hint}</p>
      </noscript>
    </section>
  );
}
