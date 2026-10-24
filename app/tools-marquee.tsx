"use client";

import { useEffect, useRef } from "react";
import { type Language, t } from "../lib/i18n";

const items = [
  ["Jenkins", "J", "#d24939"], ["Katalon", "K", "#1769ff"], ["Selenium", "Se", "#43b02a"],
  ["Playwright", "Pw", "#2ead6e"], ["TypeScript", "TS", "#3178c6"], ["JavaScript", "JS", "#d7bd00"],
  ["Java", "♨", "#007396"], ["Postman", "P", "#ff6c37"], ["Swagger", "Sw", "#62a626"],
  ["Bruno", "B", "#f16a37"], ["k6", "k6", "#7d64ff"], ["JMeter", "JM", "#d22128"],
  ["VS Code", "</>", "#007acc"], ["Microsoft Office", "O", "#d83b01"], ["SQL", "DB", "#294c8a"],
  ["QA Methods", "QA", "#294c8a"], ["Waterfall", "WF", "#6d798d"], ["Agile", "Ag", "#178e78"],
  ["SDLC", "SD", "#6954aa"], ["Manual Testing", "MT", "#4383bb"], ["Automation Testing", "AT", "#2e9c72"],
  ["API Testing", "API", "#e87936"], ["Performance Testing", "PT", "#7b62c7"], ["Regression Testing", "RT", "#c85b6d"],
  ["Risk-based Testing", "RB", "#ad7b27"], ["Shift-left Testing", "SL", "#33799c"],
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
      {items.map(([label, icon, color]) => (
        <span className="tools-marquee-item" key={label}>
          <span className="tools-marquee-icon" style={{ "--tool-color": color } as React.CSSProperties}>{icon}</span>
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
