"use client";

import { useEffect, useRef } from "react";
import { type Language, t } from "../lib/i18n";
import ToolIcon from "./tool-icon";

const items = [
  "Jenkins", "Katalon", "Selenium", "Playwright", "TypeScript", "JavaScript",
  "Java", "Postman", "Swagger", "Bruno", "k6", "JMeter", "VS Code",
  "Microsoft Office", "SQL", "QA Methods", "Waterfall", "Agile", "SDLC",
  "Manual Testing", "Automation Testing", "API Testing", "Performance Testing",
  "Regression Testing", "Risk-based Testing", "Shift-left Testing",
] as const;

type DragState = { pointerX: number; startOffset: number };

export default function ToolsMarquee({ language }: { language: Language }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const dragRef = useRef<DragState | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    let frame = 0;
    let lastTime = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const normalize = (offset: number) => {
      const halfWidth = track.scrollWidth / 2;
      if (!halfWidth) return offset;
      while (offset <= -halfWidth) offset += halfWidth;
      while (offset > 0) offset -= halfWidth;
      return offset;
    };
    const render = (time: number) => {
      frame = requestAnimationFrame(render);
      const delta = Math.min(time - (lastTime || time), 32);
      lastTime = time;
      const paused = dragRef.current || viewport.matches(":hover") || viewport.matches(":focus-within");
      if (!paused && !reduceMotion) offsetRef.current = normalize(offsetRef.current - delta * 0.035);
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    };
    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, []);

  function normalizeOffset(offset: number) {
    const track = trackRef.current;
    const halfWidth = track ? track.scrollWidth / 2 : 0;
    if (halfWidth) {
      while (offset <= -halfWidth) offset += halfWidth;
      while (offset > 0) offset -= halfWidth;
    }
    return offset;
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    dragRef.current = { pointerX: event.clientX, startOffset: offsetRef.current };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add("is-dragging");
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || !trackRef.current) return;
    offsetRef.current = normalizeOffset(drag.startOffset + event.clientX - drag.pointerX);
    trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragRef.current) return;
    dragRef.current = null;
    event.currentTarget.classList.remove("is-dragging");
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    offsetRef.current = normalizeOffset(offsetRef.current + (event.key === "ArrowLeft" ? 100 : -100));
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  }

  const renderItems = (copy: number) => (
    <div className="tools-marquee-group" key={copy} aria-hidden={copy === 1}>
      {items.map((label) => (
        <span className="tools-marquee-item" key={label}>
          <span className="tools-marquee-icon"><ToolIcon name={label} size={24} /></span>
          <span>{label}</span>
        </span>
      ))}
    </div>
  );

  return (
    <section className="tools-marquee-section" aria-label={t(language, "toolsHeading")}>
      <small className="tools-marquee-heading">{t(language, "toolsHeading")}</small>
      <div className="tools-marquee-viewport" ref={viewportRef} role="region" aria-label="Tools and QA methods. Drag to scroll." tabIndex={0} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onLostPointerCapture={onPointerUp} onKeyDown={onKeyDown}>
        <div className="tools-marquee-track" ref={trackRef}>{renderItems(0)}{renderItems(1)}</div>
      </div>
    </section>
  );
}
