"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Truck, Star } from "lucide-react";

export default function AuthSidebar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const ctx = gsap.context(() => {
      // 1. Zoom in & fade in background image (Ken Burns)
      gsap.fromTo(
        bgRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 0.65, duration: 2.2, ease: "power3.out" }
      );

      // 2. Slow breathing zoom animation for background
      gsap.to(bgRef.current, {
        scale: 1.05,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.2
      });

      // 3. Slide up and fade in the card container
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: "power4.out" }
      );

      // 4. Staggered reveal of text and features
      const tl = gsap.timeline({ delay: 0.4 });
      tl.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          featuresRef.current?.children || [],
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" },
          "-=0.4"
        );

      // 5. Floating particle effects (glowing orbs in the background)
      const particles = currentContainer.querySelectorAll(".glowing-orb");
      particles.forEach((orb) => {
        gsap.to(orb, {
          y: "random(-40, 40)",
          x: "random(-30, 30)",
          duration: "random(6, 12)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
    }, currentContainer);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative hidden md:flex md:w-1/2 flex-col justify-between p-10 overflow-hidden bg-neutral-950 border-r border-border/20 min-h-[600px] lg:min-h-[700px]"
    >
      {/* Background Hero Image with Dark Overlay */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 origin-center pointer-events-none"
      >
        <Image
          src="/auth-hero.png"
          alt="MediStore Premium Healthcare Banner"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent" />
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-transparent to-neutral-950/80" />
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-10" />

      {/* Glowing Orbs */}
      <div className="absolute top-[20%] right-[10%] glowing-orb w-64 h-64 rounded-full bg-teal-500/10 blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[10%] glowing-orb w-72 h-72 rounded-full bg-indigo-500/10 blur-[90px] pointer-events-none z-0" />

      {/* Branding Header */}
      <div className="relative z-10 flex items-center gap-2">
        <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-sm select-none">
          MediStore 💊
        </span>
      </div>

      {/* Bottom Content Card with Glassmorphic design */}
      <div
        ref={cardRef}
        className="relative z-10 p-6 sm:p-8 rounded-2xl border border-white/5 bg-neutral-900/40 backdrop-blur-md shadow-2xl select-none"
      >
        <h2
          ref={titleRef}
          className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white mb-2 leading-tight"
        >
          Your Premium Online Medicine Shop
        </h2>
        <p
          ref={subtitleRef}
          className="text-sm text-neutral-300 mb-6 leading-relaxed"
        >
          Access thousands of verified medicines, healthcare items, and dynamic order tracking, all in one trusted digital hub.
        </p>

        {/* Feature list */}
        <div ref={featuresRef} className="space-y-3.5">
          <div className="flex items-center gap-3 text-sm text-neutral-200">
            <span className="flex-shrink-0 p-1 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <ShieldCheck className="h-4.5 w-4.5" />
            </span>
            <span>100% Authenticated Medicines</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-neutral-200">
            <span className="flex-shrink-0 p-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Truck className="h-4.5 w-4.5" />
            </span>
            <span>Reliable Cash on Delivery Shipping</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-neutral-200">
            <span className="flex-shrink-0 p-1 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Star className="h-4.5 w-4.5" />
            </span>
            <span>Verified Customer Reviews & Feedback</span>
          </div>
        </div>
      </div>
    </div>
  );
}
