"use client";

import { useRef, useState, useCallback, useEffect, useMemo } from "react";

const OptionWheel = ({
  items = DEFAULT_ITEMS,
  defaultSelected = 3,
  onChange,
  textColor = "#a6a6a6",
  activeColor = "#ffffff",
  side = "left",
  fontSize = 3,
  spacing = 1,
  curve = 1,
  tilt = 6,
  blur = 2,
  fade = 0.25,
  minOpacity = 0.05,
  smoothing = 200,
  inset = 80,
  loop = true,
  draggable = true,
  soundUrl = "",
  soundVolume = 0.5,
  className = "",
  fillHeight = true,
  visibleItems = 21,
}) => {
  const rootRef = useRef(null);
  const itemRefs = useRef([]);
  const posRef = useRef(defaultSelected);
  const targetRef = useRef(defaultSelected);
  const rafRef = useRef(null);
  const lastRef = useRef(0);
  const cfgRef = useRef({});
  const onChangeRef = useRef(onChange);
  const selectedRef = useRef(defaultSelected);
  const dragRef = useRef(null);
  const dragMovedRef = useRef(false);
  const audioRef = useRef(null);
  const audioUrlRef = useRef("");
  const lastTickRef = useRef(0);
  const containerHeightRef = useRef(0);
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected);
  const [isDragging, setIsDragging] = useState(false);

  const remPx =
    typeof window !== "undefined"
      ? parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
      : 16;

  onChangeRef.current = onChange;

  const repeatCount = loop
    ? Math.max(1, Math.ceil((visibleItems + 6) / items.length))
    : 1;
  const renderItems = useMemo(
    () => Array(repeatCount).fill(items).flat(),
    [items, repeatCount, visibleItems],
  );

  cfgRef.current = {
    count: renderItems.length,
    originalCount: items.length,
    items: renderItems,
    originalItems: items,
    rowH: Math.max(fontSize * spacing * remPx, 1),
    curve,
    tilt,
    blur,
    fade,
    minOpacity,
    side,
    loop,
    smoothing,
    draggable,
    soundUrl,
    soundVolume,
    fillHeight,
    visibleItems,
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    containerHeightRef.current = el.clientHeight;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        containerHeightRef.current = entry.contentRect.height;
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const runFrame = useCallback((now) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const cfg = cfgRef.current;
    const n = cfg.count;
    const tau = Math.max(cfg.smoothing, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);

    const target = targetRef.current;
    const cur = posRef.current;
    let next = cur + (target - cur) * k;
    const settled = Math.abs(target - next) < 0.001;
    if (settled) next = target;
    posRef.current = next;

    let safeVisible = cfg.visibleItems;
    if (safeVisible % 2 === 0) safeVisible -= 1;

    let effectiveRowH = cfg.rowH;
    if (cfg.fillHeight && containerHeightRef.current > 0) {
      effectiveRowH = containerHeightRef.current / Math.max(safeVisible - 1, 1);
    }

    const els = itemRefs.current;
    const mirror = cfg.side === "right" ? -1 : 1;
    const tiltRad = (cfg.tilt * Math.PI) / 180;
    const R = tiltRad > 0.0005 ? effectiveRowH / tiltRad : 0;

    for (let i = 0; i < n; i++) {
      const el = els[i];
      if (!el) continue;
      let d = i - next;
      if (cfg.loop && n > 1) {
        d = ((d % n) + n) % n;
        if (d > n / 2) d -= n;
      }
      const dist = Math.abs(d);

      let y = d * effectiveRowH;
      let x = 0;
      let rot = 0;

      if (R > 0) {
        const ang = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, d * tiltRad));
        x = -mirror * R * (1 - Math.cos(ang)) * cfg.curve;
        rot = (mirror * ang * 180) / Math.PI;
      }

      el.style.transform = `translate(${x.toFixed(2)}px, calc(${y.toFixed(2)}px - 50%)) rotate(${rot.toFixed(3)}deg)`;
      el.style.opacity = String(Math.max(cfg.minOpacity, 1 - dist * cfg.fade));
      el.style.filter =
        cfg.blur > 0 ? `blur(${(dist * cfg.blur).toFixed(2)}px)` : "none";
      el.style.setProperty(
        "--ow-p",
        Math.max(0, 1 - Math.min(dist, 1)).toFixed(4),
      );
    }

    if (settled) {
      rafRef.current = null;
    } else {
      rafRef.current = requestAnimationFrame(runFrame);
    }
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current === null) {
      lastRef.current = performance.now();
      rafRef.current = requestAnimationFrame(runFrame);
    }
  }, [runFrame]);

  const playTick = useCallback(() => {
    const { soundUrl, soundVolume } = cfgRef.current;
    if (!soundUrl) return;
    const now = performance.now();
    if (now - lastTickRef.current < 70) return;
    lastTickRef.current = now;
    if (!audioRef.current || audioUrlRef.current !== soundUrl) {
      audioRef.current = new Audio(soundUrl);
      audioRef.current.preload = "auto";
      audioUrlRef.current = soundUrl;
    }
    const audio = audioRef.current;
    audio.volume = Math.min(Math.max(soundVolume, 0), 1);
    audio.currentTime = 0;
    audio.play()?.catch(() => {});
  }, []);

  const applyTarget = useCallback(
    (value, snap) => {
      const cfg = cfgRef.current;
      let v = value;
      if (!cfg.loop) v = Math.min(Math.max(v, 0), Math.max(cfg.count - 1, 0));
      if (snap) v = Math.round(v);
      targetRef.current = v;

      const domIdx = ((Math.round(v) % cfg.count) + cfg.count) % cfg.count;
      const originalIdx =
        ((Math.round(v) % cfg.originalCount) + cfg.originalCount) %
        cfg.originalCount;

      if (domIdx !== selectedRef.current) {
        selectedRef.current = domIdx;
        setSelectedIndex(domIdx);
        onChangeRef.current?.(originalIdx, cfg.originalItems[originalIdx]);
        playTick();
      }
      startLoop();
    },
    [startLoop, playTick],
  );

  const handlePointerDown = useCallback((e) => {
    if (!cfgRef.current.draggable) return;
    // Only respond to left clicks, ignore right-clicks
    if (e.pointerType === "mouse" && e.button !== 0) return;

    dragRef.current = {
      startY: e.clientY,
      startTarget: targetRef.current,
      lastY: e.clientY,
      lastTime: performance.now(),
      velocity: 0,
      id: e.pointerId,
    };
    dragMovedRef.current = false;
    setIsDragging(true);
  }, []);

  const handlePointerEnd = useCallback(
    (e) => {
      if (!dragRef.current) return;
      const drag = dragRef.current;
      dragRef.current = null;
      setIsDragging(false);

      if (dragMovedRef.current) {
        if (e && e.pointerId) {
          rootRef.current?.releasePointerCapture(e.pointerId);
        }

        let finalTarget = targetRef.current;
        const now = performance.now();

        if (now - drag.lastTime < 100) {
          const cfg = cfgRef.current;
          let safeVisible = cfg.visibleItems;
          if (safeVisible % 2 === 0) safeVisible -= 1;

          let effectiveRowH = cfg.rowH;
          if (cfg.fillHeight && containerHeightRef.current > 0) {
            effectiveRowH =
              containerHeightRef.current / Math.max(safeVisible - 1, 1);
          }

          const momentumMultiplier = 180;
          const velocityInItems = drag.velocity / effectiveRowH;
          finalTarget =
            targetRef.current - velocityInItems * momentumMultiplier;
        }

        applyTarget(finalTarget, true);
      }
    },
    [applyTarget],
  );

  const handlePointerMove = useCallback(
    (e) => {
      const drag = dragRef.current;
      if (!drag) return;

      // Failsafe: if the user is hovering with the mouse but NO buttons are held down,
      // instantly cancel the drag state. This fixes the stuck hover bug.
      if (e.pointerType === "mouse" && e.buttons === 0) {
        handlePointerEnd(e);
        return;
      }

      const dy = e.clientY - drag.startY;

      if (!dragMovedRef.current && Math.abs(dy) > 4) {
        dragMovedRef.current = true;
        rootRef.current?.setPointerCapture(drag.id);
      }

      if (dragMovedRef.current) {
        const now = performance.now();
        const dt = now - drag.lastTime;

        if (dt > 5) {
          const v = (e.clientY - drag.lastY) / dt;
          drag.velocity =
            drag.velocity === 0 ? v : drag.velocity * 0.4 + v * 0.6;
          drag.lastY = e.clientY;
          drag.lastTime = now;
        }

        const cfg = cfgRef.current;
        let safeVisible = cfg.visibleItems;
        if (safeVisible % 2 === 0) safeVisible -= 1;

        let effectiveRowH = cfg.rowH;
        if (cfg.fillHeight && containerHeightRef.current > 0) {
          effectiveRowH =
            containerHeightRef.current / Math.max(safeVisible - 1, 1);
        }

        applyTarget(drag.startTarget - dy / effectiveRowH, false);
      }
    },
    [applyTarget, handlePointerEnd],
  );

  const handleItemClick = useCallback(
    (index) => {
      if (dragMovedRef.current) return;
      const cfg = cfgRef.current;
      const cur = targetRef.current;
      let d = index - (((Math.round(cur) % cfg.count) + cfg.count) % cfg.count);
      if (cfg.loop && cfg.count > 1) {
        if (d > cfg.count / 2) d -= cfg.count;
        else if (d < -cfg.count / 2) d += cfg.count;
      }
      applyTarget(Math.round(cur) + d, true);
    },
    [applyTarget],
  );

  const handleKeyDown = useCallback(
    (e) => {
      let delta = null;
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") delta = -1;
      else if (e.key === "ArrowDown" || e.key === "ArrowRight") delta = 1;
      if (delta == null) return;
      e.preventDefault();
      applyTarget(Math.round(targetRef.current) + delta, true);
    },
    [applyTarget],
  );

  useEffect(() => {
    applyTarget(targetRef.current, false);
  }, [
    items,
    fontSize,
    spacing,
    curve,
    tilt,
    blur,
    fade,
    minOpacity,
    side,
    loop,
    smoothing,
    fillHeight,
    visibleItems,
    renderItems,
    applyTarget,
  ]);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      audioRef.current?.pause();
    },
    [],
  );

  return (
    <div
      ref={rootRef}
      role="listbox"
      tabIndex={0}
      aria-label="Option wheel"
      className={`relative h-full w-full select-none overflow-hidden outline-none touch-noneging ? "cursor-grabbing" : "cursor-grab"}${className ? ` ${className}` : ""}`}
      style={{
        "--ow-text-color": textColor,
        "--ow-active-color": activeColor,
        "--ow-font-size": `${fontSize}rem`,
        "--ow-inset": `${inset}px`,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onKeyDown={handleKeyDown}
    >
      {renderItems.map((item, index) => (
        <div
          key={`${item.name}-${index}`}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          role="option"
          aria-selected={selectedIndex === index}
          className={`absolute top-1/2 cursor-pointer whitespace-nowrap leading-none will-change-[transform,opacity,filter] [font-size:var(--ow-font-size)] text-[color-mix(in_srgb,var(--ow-active-color)_calc(var(--ow-p,0)*100%),var(--ow-text-color))] ${
            side === "right"
              ? "right-(--ow-inset) origin-right"
              : "left-(--ow-inset) origin-left"
          } ${selectedIndex === index ? "font-medium" : "font-extralight"}`}
          onClick={() => handleItemClick(index)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default OptionWheel;
