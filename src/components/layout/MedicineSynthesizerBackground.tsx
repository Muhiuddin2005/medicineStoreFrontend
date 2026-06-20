"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MedicineSynthesizerBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create 15 floating chemical molecules / bubbles
    const bubbleCount = 18;
    const bubbles: HTMLDivElement[] = [];

    // Color choices for medicine sparks/bubbles: turquoise, soft purple, electric blue, soft green, glowing orange
    const colors = [
      "rgba(45, 212, 191, 0.4)", // teal
      "rgba(99, 102, 241, 0.3)", // indigo
      "rgba(147, 51, 234, 0.35)", // purple
      "rgba(59, 130, 246, 0.3)",  // blue
      "rgba(34, 197, 94, 0.3)",   // green
    ];

    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement("div");
      bubble.className = "absolute rounded-full pointer-events-none blur-[1px]";
      
      // Random sizes (mostly small, some medium)
      const size = Math.random() * 24 + 8;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      bubble.style.boxShadow = `0 0 15px ${bubble.style.backgroundColor}`;
      
      // Random initial position
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.bottom = `${Math.random() * 20 - 5}%`;
      bubble.style.opacity = "0";

      containerRef.current.appendChild(bubble);
      bubbles.push(bubble);

      // Animate bubble rising and wobbling (synthesis effect)
      gsap.fromTo(
        bubble,
        {
          y: 0,
          x: 0,
          opacity: 0,
          scale: 0.2 + Math.random() * 0.4,
        },
        {
          y: -500 - Math.random() * 400,
          x: () => (Math.random() - 0.5) * 150, // Drift horizontally
          scale: 1 + Math.random() * 0.6,
          opacity: () => Math.random() * 0.7 + 0.1,
          duration: 6 + Math.random() * 8,
          delay: Math.random() * 8,
          repeat: -1,
          ease: "power1.out",
        }
      );
    }

    // Animate the beaker & chemical flask outlines to hover slightly
    const elements = containerRef.current.querySelectorAll(".glowing-glass");
    elements.forEach((el) => {
      gsap.to(el, {
        y: -15,
        rotation: "random(-3, 3)",
        duration: 3 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    // Make the pills spin and float
    const pills = containerRef.current.querySelectorAll(".glowing-pill");
    pills.forEach((pill, idx) => {
      gsap.to(pill, {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: idx % 2 === 0 ? 360 : -360,
        duration: 8 + Math.random() * 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    // Sparkles connecting lines (simulating molecule building)
    const sparks = containerRef.current.querySelectorAll(".sparkle");
    sparks.forEach((spark) => {
      gsap.fromTo(
        spark,
        { opacity: 0.1, scale: 0.6 },
        {
          opacity: 0.9,
          scale: 1.3,
          duration: 1 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        }
      );
    });

    return () => {
      if (containerRef.current) {
        bubbles.forEach((b) => b.remove());
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-radial-[circle_at_center] from-neutral-950 via-neutral-900 to-black select-none"
    >
      {/* Dynamic Background Auras */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-teal-500/10 blur-[120px] mix-blend-screen animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-indigo-500/10 blur-[130px] mix-blend-screen animate-pulse delay-700" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-violet-600/10 blur-[100px] mix-blend-screen" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Beaker Outline (Left Side) */}
      <div className="absolute left-[8%] top-[25%] opacity-20 glowing-glass hidden md:block">
        <svg
          width="120"
          height="160"
          viewBox="0 0 120 160"
          fill="none"
          stroke="url(#grad1)"
          strokeWidth="2"
          className="drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]"
        >
          <path d="M45 20 H75 M45 20 V50 L15 140 H105 L75 50 V20" />
          {/* Liquid level inside beaker */}
          <path d="M22 120 Q30 118 60 120 T98 120 L102 130 H18 Z" fill="rgba(45, 212, 191, 0.2)" />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Laboratory Flask (Right Side) */}
      <div className="absolute right-[8%] top-[20%] opacity-20 glowing-glass hidden md:block">
        <svg
          width="130"
          height="150"
          viewBox="0 0 130 150"
          fill="none"
          stroke="url(#grad2)"
          strokeWidth="2"
          className="drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
        >
          <path d="M50 15 H80 M50 15 V40 L20 120 C10 140 30 145 65 145 C100 145 120 140 110 120 L80 40 V15" />
          <path d="M27 105 Q65 108 103 105 L108 125 C102 135 28 135 22 125 Z" fill="rgba(168, 85, 247, 0.2)" />
          <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Glowing Floating Pills & Sparkles */}
      <div className="absolute left-[15%] bottom-[15%] glowing-pill opacity-30">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="5" y="15" width="30" height="10" rx="5" fill="#3b82f6" transform="rotate(-45 20 20)" className="drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          <line x1="20" y1="5" x2="20" y2="35" stroke="rgba(255,255,255,0.4)" strokeWidth="1" transform="rotate(-45 20 20)" />
        </svg>
      </div>

      <div className="absolute right-[18%] bottom-[25%] glowing-pill opacity-35">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <circle cx="25" cy="25" r="15" fill="#10b981" className="drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
          <line x1="10" y1="25" x2="40" y2="25" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Sparkling molecule connector dots */}
      <div className="absolute left-[30%] top-[15%] sparkle w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf]" />
      <div className="absolute left-[45%] top-[12%] sparkle w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#6366f1]" />
      <div className="absolute right-[35%] top-[18%] sparkle w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_10px_#a855f7]" />
      <div className="absolute right-[48%] top-[10%] sparkle w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
    </div>
  );
}
