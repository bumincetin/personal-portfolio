"use client";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { PortfolioUI } from "@/lib/content/portfolio-ui";

/** One semantic list. Cards wrap individually; no duplicated links or clones. */
export default function WorkGallery({
  children,
  copy,
}: {
  children: ReactNode;
  copy: PortfolioUI;
}) {
  const root = useRef<HTMLDivElement>(null),
    track = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false),
    [animated, setAnimated] = useState(false);
  const pause = useRef(false),
    move = useRef<(direction: number) => void>(() => {});
  useEffect(() => {
    pause.current = paused;
  }, [paused]);
  useEffect(() => {
    const host = root.current!,
      list = track.current!;
    const media = matchMedia("(prefers-reduced-motion: reduce)"),
      fine = matchMedia("(pointer: fine) and (min-width: 769px)");
    const capability = navigator as Navigator & {
      connection?: { saveData?: boolean };
      deviceMemory?: number;
    };
    const cards = Array.from(list.children) as HTMLElement[];
    let automatic = false,
      inView = false,
      hover = false,
      focused = false,
      offset = 0,
      total = 1,
      frame = 0,
      last = 0;
    let starts: number[] = [],
      widths: number[] = [];
    let drag: { x: number; offset: number; moved: boolean } | null = null,
      suppressClick = false;
    const draw = () =>
      cards.forEach((card, i) => {
        const x =
          ((((starts[i] - offset + widths[i]) % total) + total) % total) -
          widths[i];
        card.style.transform = `translate3d(${x}px,0,0)`;
      });
    const tick = (time: number) => {
      frame = 0;
      if (
        !automatic ||
        !inView ||
        document.hidden ||
        pause.current ||
        hover ||
        focused ||
        drag
      ) {
        last = 0;
        return;
      }
      if (last) offset += Math.min(50, time - last) * 0.018;
      last = time;
      draw();
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const measure = () => {
      widths = cards.map((card) => card.getBoundingClientRect().width);
      total = 0;
      starts = widths.map((width) => {
        const x = total;
        total += width + 20;
        return x;
      });
      if (automatic) draw();
    };
    const preference = () => {
      automatic =
        fine.matches &&
        !media.matches &&
        !capability.connection?.saveData &&
        (capability.deviceMemory ?? 8) > 2;
      host.dataset.animated = String(automatic);
      setAnimated(automatic);
      cards.forEach((card) => {
        card.style.transform = "";
      });
      list.scrollLeft = 0;
      offset = 0;
      measure();
      start();
    };
    move.current = (direction) => {
      if (automatic) {
        offset += direction * (widths[0] + 20);
        draw();
      } else
        list.scrollBy({
          left: direction * (widths[0] + 20),
          behavior: media.matches ? "instant" : "smooth",
        });
    };
    const enter = () => {
      hover = true;
    };
    const leave = () => {
      hover = false;
      start();
    };
    const focus = (event: FocusEvent) => {
      focused = true;
      const i = cards.findIndex((card) => card.contains(event.target as Node));
      if (automatic && i >= 0) {
        list.scrollLeft = 0;
        offset = starts[i] - (list.clientWidth - widths[i]) / 2;
        draw();
      }
    };
    const blur = (event: FocusEvent) => {
      focused = list.contains(event.relatedTarget as Node);
      if (!focused) start();
    };
    const down = (event: PointerEvent) => {
      if (!automatic || event.button !== 0 || event.pointerType !== "mouse")
        return;
      drag = { x: event.clientX, offset, moved: false };
      suppressClick = false;
    };
    const pointer = (event: PointerEvent) => {
      if (!drag) return;
      if (Math.abs(event.clientX - drag.x) > 6) {
        drag.moved = true;
        list.setPointerCapture(event.pointerId);
        offset = drag.offset - (event.clientX - drag.x);
        draw();
      }
    };
    const up = (event: PointerEvent) => {
      suppressClick = drag?.moved ?? false;
      drag = null;
      if (list.hasPointerCapture(event.pointerId))
        list.releasePointerCapture(event.pointerId);
      start();
    };
    const click = (event: MouseEvent) => {
      if (suppressClick) {
        event.preventDefault();
        event.stopPropagation();
        suppressClick = false;
      }
    };
    const key = (event: KeyboardEvent) => {
      if (event.key === " " && (event.target as HTMLElement).matches("a")) {
        event.preventDefault();
        (event.target as HTMLAnchorElement).click();
      }
    };
    const visible = () => {
      last = 0;
      if (!document.hidden) start();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      start();
    });
    observer.observe(host);
    const size = new ResizeObserver(measure);
    size.observe(list);
    const events = {
      pointerenter: enter,
      pointerleave: leave,
      focusin: focus,
      focusout: blur,
      pointerdown: down,
      pointermove: pointer,
      pointerup: up,
      pointercancel: up,
      keydown: key,
    };
    for (const [name, handler] of Object.entries(events))
      list.addEventListener(name, handler as EventListener);
    list.addEventListener("click", click, true);
    const pauseChange = () => start();
    host.addEventListener("gallery-pause", pauseChange);
    document.addEventListener("visibilitychange", visible);
    media.addEventListener("change", preference);
    fine.addEventListener("change", preference);
    preference();
    host.dataset.ready = "true";
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      size.disconnect();
      for (const [name, handler] of Object.entries(events))
        list.removeEventListener(name, handler as EventListener);
      list.removeEventListener("click", click, true);
      host.removeEventListener("gallery-pause", pauseChange);
      document.removeEventListener("visibilitychange", visible);
      media.removeEventListener("change", preference);
      fine.removeEventListener("change", preference);
    };
  }, []);
  return (
    <div className="work-gallery" ref={root} data-paused={paused}>
      <div className="gallery-toolbar">
        <p>{copy.galleryHint}</p>
        <div className="gallery-controls">
          {animated && (
            <button
              type="button"
              aria-pressed={paused}
              onClick={() => {
                pause.current = !paused;
                setPaused(!paused);
                root.current?.dispatchEvent(new Event("gallery-pause"));
              }}
            >
              {paused ? copy.play : copy.pause}
              <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
            </button>
          )}
          <button
            type="button"
            aria-label={copy.previous}
            onClick={() => move.current(-1)}
          >
            ←
          </button>
          <button
            type="button"
            aria-label={copy.next}
            onClick={() => move.current(1)}
          >
            →
          </button>
        </div>
      </div>
      <ul ref={track} className="gallery-track" aria-label={copy.gallery}>
        {children}
      </ul>
    </div>
  );
}
