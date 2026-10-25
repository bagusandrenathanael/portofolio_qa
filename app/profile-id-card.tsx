"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type ProfileIdCardProps = { name: string; role: string; location: string; openToWork: boolean; openLabel: string; photoUrl: string; hintTitle: string; hintBody: string };

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "QA";
}

function drawTexture(canvas: HTMLCanvasElement, name: string, role: string, location: string, openToWork: boolean, openLabel: string, photoUrl: string, texture: THREE.CanvasTexture) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  const inset = 18;
  ctx.save();
  ctx.beginPath(); ctx.roundRect(inset, inset, width - inset * 2, height - inset * 2, 42); ctx.clip();
  ctx.fillStyle = "#fbfaf6"; ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#294c8a"; ctx.fillRect(0, 0, width, 26);
  ctx.fillStyle = "#e9edf2";
  for (let y = 45; y < height; y += 34) { ctx.fillRect(24, y, width - 48, 1); }

  ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#294c8a"; ctx.font = "900 88px Arial, sans-serif";
  ctx.fillText("MEMBER", 74, 165); ctx.fillText("CARD", 74, 250);
  ctx.fillStyle = "#70809a"; ctx.font = "700 22px Arial, sans-serif";
  ctx.fillText("QUALITY ASSURANCE", 78, 294);

  const photoX = 520, photoY = 300, photoW = 292, photoH = 356;
  ctx.fillStyle = "#d8e0e8"; ctx.beginPath(); ctx.roundRect(photoX - 9, photoY - 9, photoW + 18, photoH + 18, 20); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.roundRect(photoX, photoY, photoW, photoH, 14); ctx.clip();
  const drawPortrait = (image?: HTMLImageElement) => {
    if (image) {
      const scale = Math.max(photoW / image.width, photoH / image.height);
      const drawnW = image.width * scale, drawnH = image.height * scale;
      ctx.drawImage(image, photoX + (photoW - drawnW) / 2, photoY + (photoH - drawnH) / 2, drawnW, drawnH);
    } else {
      const background = ctx.createLinearGradient(photoX, photoY, photoX + photoW, photoY + photoH);
      background.addColorStop(0, "#d9e8f6"); background.addColorStop(1, "#a9bfd8");
      ctx.fillStyle = background; ctx.fillRect(photoX, photoY, photoW, photoH);
      ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(photoX + photoW / 2, photoY + photoH * .43, 83, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#294c8a"; ctx.font = "800 64px Arial, sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(initials(name), photoX + photoW / 2, photoY + photoH * .43);
    }
  };
  drawPortrait(); ctx.restore();

  ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#8390a0"; ctx.font = "700 22px Arial, sans-serif"; ctx.fillText("NAME", 78, 410);
  ctx.fillStyle = "#25374e"; ctx.font = "italic 54px Georgia, serif"; ctx.fillText(name.split(/\s+/).slice(0, 2).join(" "), 78, 482, 410);
  ctx.fillStyle = "#8390a0"; ctx.font = "700 22px Arial, sans-serif"; ctx.fillText("ROLE", 78, 560);
  ctx.fillStyle = "#294c8a"; ctx.font = "700 24px Arial, sans-serif";
  const roleWords = (role || "Software Quality Assurance Engineer Specialist").split(/\s+/);
  let roleLine = "", roleY = 604;
  for (const word of roleWords) {
    const next = roleLine ? `${roleLine} ${word}` : word;
    if (roleLine && ctx.measureText(next).width > 370) { ctx.fillText(roleLine, 78, roleY); roleLine = word; roleY += 35; }
    else roleLine = next;
  }
  if (roleLine) ctx.fillText(roleLine, 78, roleY);

  if (location) {
    const locationY = Math.max(680, roleY + 72);
    ctx.save();
    ctx.translate(88, locationY - 8);
    ctx.strokeStyle = "#54709b"; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, -5, 12, Math.PI * .18, Math.PI * .82); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-9, 3); ctx.lineTo(0, 17); ctx.lineTo(9, 3); ctx.stroke();
    ctx.fillStyle = "#54709b"; ctx.beginPath(); ctx.arc(0, -5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.textAlign = "left"; ctx.fillStyle = "#526781"; ctx.font = "600 22px Arial, sans-serif";
    const words = location.split(/\s+/); let line = "", lineY = locationY;
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(next).width > 350) { ctx.fillText(line, 118, lineY); line = word; lineY += 30; }
      else line = next;
    }
    if (line) ctx.fillText(line, 118, lineY);
  }

  if (openToWork) {
    const badgeY = 940;
    ctx.fillStyle = "#e9f8ef"; ctx.beginPath(); ctx.roundRect(76, badgeY, 360, 48, 24); ctx.fill();
    ctx.fillStyle = "#20a86b"; ctx.beginPath(); ctx.arc(101, badgeY + 24, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#13754b"; ctx.font = "700 18px Arial, sans-serif"; ctx.textAlign = "left";
    ctx.fillText(openLabel.toUpperCase(), 120, badgeY + 30, 300);
  }

  ctx.fillStyle = "#8390a0"; ctx.font = "700 20px Arial, sans-serif"; ctx.fillText("MEMBER SINCE", 78, 780);
  ctx.fillStyle = "#33445a"; ctx.font = "italic 42px Georgia, serif"; ctx.fillText(String(new Date().getFullYear()), 78, 838);
  ctx.fillStyle = "#294c8a"; ctx.beginPath(); ctx.ellipse(692, 835, 92, 49, -.12, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#f6f8fc"; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(692, 835, 78, 36, -.12, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = "#fff"; ctx.font = "italic 700 44px Georgia, serif"; ctx.textAlign = "center"; ctx.fillText("QA", 692, 850);
  ctx.textAlign = "left"; ctx.fillStyle = "#75849a"; ctx.font = "700 19px Arial, sans-serif";
  ctx.fillText("PLAN  ·  TEST  ·  IMPROVE", 78, height - 82);
  ctx.restore(); texture.needsUpdate = true;

  if (photoUrl) {
    const image = new Image();
    if (/^https?:/i.test(photoUrl)) image.crossOrigin = "anonymous";
    image.onload = () => { const nextCtx = canvas.getContext("2d"); if (!nextCtx) return; nextCtx.save(); nextCtx.beginPath(); nextCtx.roundRect(photoX, photoY, photoW, photoH, 14); nextCtx.clip(); const scale = Math.max(photoW / image.width, photoH / image.height); const drawnW = image.width * scale, drawnH = image.height * scale; nextCtx.drawImage(image, photoX + (photoW - drawnW) / 2, photoY + (photoH - drawnH) / 2, drawnW, drawnH); nextCtx.restore(); texture.needsUpdate = true; };
    image.onerror = () => { /* Keep initials when the profile photo cannot be loaded. */ };
    image.src = photoUrl;
    return () => { image.onload = null; image.onerror = null; };
  }
}

export default function ProfileIdCard({ name, role, location, openToWork, openLabel, photoUrl, hintTitle, hintBody }: ProfileIdCardProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef({ x: 0.04, y: -0.08 });
  const dragRef = useRef<{ x: number; y: number; startX: number; startY: number; startOffsetY: number } | null>(null);
  const offsetYRef = useRef(0);
  const springVelocityRef = useRef(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      mount.classList.add("profile-card-fallback");
      return;
    }

    mount.classList.remove("profile-card-fallback");
    const scene = new THREE.Scene();
    const cardRig = new THREE.Group();
    scene.add(cardRig);
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.z = window.innerWidth < 740 ? 8.8 : 9.8;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.prepend(renderer.domElement);

    const canvas = document.createElement("canvas");
    canvas.width = 900;
    canvas.height = 1400;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const cancelPhoto = drawTexture(canvas, name, role, location, openToWork, openLabel, photoUrl, texture);

    const width = 2.82;
    const height = width * (1400 / 900);
    const strapPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.26, 3.34, -0.13),
      new THREE.Vector3(-0.28, 3.52, -0.13),
      new THREE.Vector3(-0.2, 3.7, -0.13),
      new THREE.Vector3(0, 3.76, -0.13),
      new THREE.Vector3(0.2, 3.7, -0.13),
      new THREE.Vector3(0.28, 3.52, -0.13),
      new THREE.Vector3(0.26, 3.34, -0.13),
    ]);
    const strap = new THREE.Mesh(
      new THREE.TubeGeometry(strapPath, 48, 0.075, 8, false),
      new THREE.MeshStandardMaterial({ color: 0x294c8a, roughness: 0.82, metalness: 0.02 }),
    );
    cardRig.add(strap);
    const cordMaterial = new THREE.MeshStandardMaterial({ color: 0x294c8a, roughness: 0.82, metalness: 0.02 });
    const cordGeometry = new THREE.CylinderGeometry(0.062, 0.062, 1, 10);
    const cords = [-1, 1].map(() => {
      const cord = new THREE.Mesh(cordGeometry, cordMaterial);
      cardRig.add(cord);
      return cord;
    });

    const plateGeometry = new THREE.BoxGeometry(width, height, 0.075, 1, 1, 1);
    const plate = new THREE.Mesh(plateGeometry, [
      new THREE.MeshStandardMaterial({ color: 0x8ba6d7, roughness: 0.32, metalness: 0.45 }),
      new THREE.MeshStandardMaterial({ color: 0x8ba6d7, roughness: 0.32, metalness: 0.45 }),
      new THREE.MeshStandardMaterial({ color: 0x8ba6d7, roughness: 0.32, metalness: 0.45 }),
      new THREE.MeshStandardMaterial({ color: 0x8ba6d7, roughness: 0.32, metalness: 0.45 }),
      new THREE.MeshStandardMaterial({ map: texture, roughness: 0.48, metalness: 0.06 }),
      new THREE.MeshStandardMaterial({ color: 0x163e86, roughness: 0.4, metalness: 0.18 }),
    ]);
    const cardGroup = new THREE.Group();
    cardRig.add(cardGroup);
    cardGroup.add(plate);
    const attachment = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.28, 0.11),
      new THREE.MeshStandardMaterial({ color: 0xc1c8d0, roughness: 0.3, metalness: 0.82 }),
    );
    attachment.position.set(0, height / 2 - 0.04, 0.065);
    cardGroup.add(attachment);
    const clipRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.14, 0.035, 8, 24),
      new THREE.MeshStandardMaterial({ color: 0xaeb8c3, roughness: 0.28, metalness: 0.88 }),
    );
    clipRing.position.set(0, height / 2 + 0.12, 0.055);
    cardGroup.add(clipRing);

    const updateCords = (cardY: number) => {
      cords.forEach((cord, index) => {
        const side = index === 0 ? -1 : 1;
        const end = new THREE.Vector3(side * 0.2, height / 2 + cardY + 0.06, -0.12);
        const start = new THREE.Vector3(side * 0.26, 3.34, -0.12);
        const direction = end.clone().sub(start);
        cord.position.copy(start).add(end).multiplyScalar(0.5);
        cord.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
        cord.scale.set(1, direction.length(), 1);
      });
    };
    updateCords(0);
    scene.add(new THREE.AmbientLight(0xffffff, 2.1));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(-3, 4, 6);
    scene.add(keyLight);

    const resize = () => {
      const bounds = mount.getBoundingClientRect();
      const w = Math.max(1, bounds.width);
      const h = Math.max(1, bounds.height);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.z = window.innerWidth < 740 ? 8.8 : 9.8;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    let frame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let previousTime = 0;
    const render = (time: number) => {
      frame = requestAnimationFrame(render);
      const drag = dragRef.current;
      const delta = Math.min((time - previousTime) / 1000 || 0.016, 0.04);
      previousTime = time;
      if (drag) {
        cardGroup.position.y = offsetYRef.current;
      } else {
        const acceleration = -48 * cardGroup.position.y - 10 * springVelocityRef.current;
        springVelocityRef.current += acceleration * delta;
        cardGroup.position.y += springVelocityRef.current * delta;
        offsetYRef.current = cardGroup.position.y;
        if (Math.abs(cardGroup.position.y) < 0.001 && Math.abs(springVelocityRef.current) < 0.01) {
          cardGroup.position.y = 0;
          springVelocityRef.current = 0;
        }
      }
      updateCords(cardGroup.position.y);
      if (!drag && !reducedMotion) {
        const idle = Math.sin(time * 0.0007) * 0.035;
        cardGroup.rotation.x += (rotationRef.current.x - cardGroup.rotation.x) * 0.08;
        cardGroup.rotation.y += (rotationRef.current.y + idle - cardGroup.rotation.y) * 0.08;
      } else {
        cardGroup.rotation.x += (rotationRef.current.x - cardGroup.rotation.x) * (drag ? 0.18 : 0.08);
        cardGroup.rotation.y += (rotationRef.current.y - cardGroup.rotation.y) * (drag ? 0.18 : 0.08);
      }
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      cancelPhoto?.();
      observer.disconnect();
      plateGeometry.dispose();
      plate.material.forEach((material) => material.dispose());
      strap.geometry.dispose();
      (strap.material as THREE.Material).dispose();
      cordGeometry.dispose();
      cordMaterial.dispose();
      attachment.geometry.dispose();
      (attachment.material as THREE.Material).dispose();
      clipRing.geometry.dispose();
      (clipRing.material as THREE.Material).dispose();
      texture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [name, role, location, openToWork, openLabel, photoUrl]);

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    springVelocityRef.current = 0;
    dragRef.current = { x: event.clientX, y: event.clientY, startX: rotationRef.current.x, startY: rotationRef.current.y, startOffsetY: offsetYRef.current };
    event.currentTarget.closest(".hero-city")?.classList.add("profile-card-dragging");
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag) return;
    const deltaY = event.clientY - drag.y;
    offsetYRef.current = THREE.MathUtils.clamp(drag.startOffsetY - deltaY * 0.012, -1.8, 0.5);
    rotationRef.current = {
      x: THREE.MathUtils.clamp(drag.startX + deltaY * 0.0025, -0.35, 0.35),
      y: THREE.MathUtils.clamp(drag.startY + (event.clientX - drag.x) * 0.012, -2.7, 2.7),
    };
  }
  function onPointerUp() {
    const drag = dragRef.current;
    if (!drag) return;
    rotationRef.current = { x: drag.startX, y: drag.startY };
    dragRef.current = null;
    mountRef.current?.closest(".hero-city")?.classList.remove("profile-card-dragging");
  }

  return <div className="profile-id-card-wrap"><div ref={mountRef} className="profile-id-card-stage" role="img" aria-label={`Kartu profil 3D ${name}, ${role}${location ? `, ${location}` : ""}${openToWork ? `, ${openLabel}` : ""}. Seret untuk memutar kartu.`} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} tabIndex={0} onKeyDown={(event) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) event.preventDefault();
    if (event.key === "ArrowLeft") rotationRef.current = { ...rotationRef.current, y: Math.max(-2.7, rotationRef.current.y - 0.12) };
    if (event.key === "ArrowRight") rotationRef.current = { ...rotationRef.current, y: Math.min(2.7, rotationRef.current.y + 0.12) };
    if (event.key === "ArrowUp") rotationRef.current = { ...rotationRef.current, x: Math.max(-0.45, rotationRef.current.x - 0.12) };
    if (event.key === "ArrowDown") rotationRef.current = { ...rotationRef.current, x: Math.min(0.45, rotationRef.current.x + 0.12) };
  }} onLostPointerCapture={onPointerUp}><div className="profile-card-html"><div className="profile-card-avatar">{photoUrl ? <img src={photoUrl} alt="" /> : <span>{initials(name)}</span>}</div><div><small>QUALITY ENGINEER</small><b>{name}</b><span>{role}</span></div></div></div><p className="profile-card-hint"><b>{hintTitle}</b><span>{hintBody}</span></p></div>;
}



