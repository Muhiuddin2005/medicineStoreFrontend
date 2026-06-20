"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function DashboardBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // 1. Create floating colorful blur orbs (Magical aura)
    const orbs: HTMLDivElement[] = [];
    const orbColors = [
      "bg-gradient-to-tr from-emerald-500/20 to-teal-500/20",
      "bg-gradient-to-tr from-purple-500/20 to-indigo-500/20",
      "bg-gradient-to-tr from-pink-500/20 to-rose-500/20",
      "bg-gradient-to-tr from-sky-500/20 to-blue-500/20"
    ];

    for (let i = 0; i < 4; i++) {
      const orb = document.createElement("div");
      orb.className = `absolute rounded-full filter blur-[100px] pointer-events-none opacity-60 ${orbColors[i]}`;
      const size = 300 + Math.random() * 250;
      orb.style.width = `${size}px`;
      orb.style.height = `${size}px`;
      orb.style.left = `${Math.random() * 80}%`;
      orb.style.top = `${Math.random() * 80}%`;
      
      container.appendChild(orb);
      orbs.push(orb);

      // Animate magical drifting of glow orbs
      gsap.to(orb, {
        x: () => (Math.random() - 0.5) * 400,
        y: () => (Math.random() - 0.5) * 400,
        scale: () => 0.8 + Math.random() * 0.5,
        duration: () => 25 + Math.random() * 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: -Math.random() * 10
      });
    }

    // 2. Create floating neon medicine elements
    const elements: HTMLDivElement[] = [];
    const count = 24;
    
    const shapes = [
      // Pill shape
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-10 h-10 text-emerald-400/50 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>`,
      // Cross / Medical plus
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-8 h-8 text-sky-400/50 drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]"><path d="M12 5v14M5 12h14"/></svg>`,
      // Flask / Chemistry
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-9 h-9 text-purple-400/50 drop-shadow-[0_0_8px_rgba(192,132,252,0.4)]"><path d="M6 3h12M12 3v14M9 12h6M5 21h14M9 3h6"/></svg>`,
      // Heart with pulse
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-10 h-10 text-rose-400/50 drop-shadow-[0_0_8px_rgba(251,113,133,0.4)]"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
      // Capsule pill
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-12 h-12 text-indigo-400/50 drop-shadow-[0_0_8px_rgba(129,140,248,0.4)]"><rect x="2" y="9" width="20" height="6" rx="3"/><path d="M12 9v6"/></svg>`
    ];

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "absolute pointer-events-none select-none";
      el.innerHTML = shapes[i % shapes.length];
      
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      el.style.left = `${x}%`;
      el.style.top = `${y}%`;
      
      container.appendChild(el);
      elements.push(el);

      // Animate floating with GSAP
      gsap.to(el, {
        x: () => (Math.random() - 0.5) * 450,
        y: () => (Math.random() - 0.5) * 450,
        rotation: () => Math.random() * 720 - 360,
        duration: () => 18 + Math.random() * 25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: -Math.random() * 15,
      });

      // Scale breathing
      gsap.to(el, {
        scale: () => 0.8 + Math.random() * 0.7,
        duration: () => 3.5 + Math.random() * 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: -Math.random() * 5,
      });
    }

    // 3. Create magical rising spark particles
    const sparks: HTMLDivElement[] = [];
    const sparkCount = 30;

    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement("div");
      spark.className = "absolute rounded-full pointer-events-none select-none bg-white opacity-0";
      
      // Random neon shadow for magical vibe
      const colors = ["#34d399", "#60a5fa", "#c084fc", "#f43f5e", "#818cf8"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      const size = 3 + Math.random() * 4;
      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;
      spark.style.left = `${Math.random() * 100}%`;
      spark.style.top = `${100 + Math.random() * 10}%`; // Start below screen
      spark.style.boxShadow = `0 0 10px ${randomColor}, 0 0 4px ${randomColor}`;

      container.appendChild(spark);
      sparks.push(spark);

      // Animate rising and fading sparks
      const duration = 8 + Math.random() * 12;
      
      gsap.to(spark, {
        y: () => -(window.innerHeight + 100),
        x: () => (Math.random() - 0.5) * 150,
        duration: duration,
        repeat: -1,
        ease: "none",
        delay: -Math.random() * duration
      });

      gsap.to(spark, {
        keyframes: [
          { opacity: 0, duration: 0 },
          { opacity: () => 0.4 + Math.random() * 0.5, duration: 0.2 },
          { opacity: () => 0.4 + Math.random() * 0.5, duration: 0.6 },
          { opacity: 0, duration: 0.2 }
        ],
        repeat: -1,
        duration: duration,
        ease: "none",
        delay: -Math.random() * duration
      });
    }

    return () => {
      orbs.forEach(orb => {
        gsap.killTweensOf(orb);
        orb.remove();
      });
      elements.forEach(el => {
        gsap.killTweensOf(el);
        el.remove();
      });
      sparks.forEach(spark => {
        gsap.killTweensOf(spark);
        spark.remove();
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-gradient-to-br from-background via-background/95 to-primary/8"
    />
  );
}
