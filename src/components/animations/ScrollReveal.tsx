"use client";

import { Fade, Zoom, Slide } from "react-awesome-reveal";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  cascade?: boolean;
  damping?: number;
  fraction?: number;
}

export function RevealFade({ children, delay = 0, direction = "up", cascade = false, damping = 0.1, fraction = 0.2 }: RevealProps) {
  return (
    <Fade direction={direction} delay={delay} cascade={cascade} damping={damping} triggerOnce fraction={fraction}>
      {children}
    </Fade>
  );
}

export function RevealZoom({ children, delay = 0, cascade = false, damping = 0.1, fraction = 0.2 }: RevealProps) {
  return (
    <Zoom delay={delay} cascade={cascade} damping={damping} triggerOnce fraction={fraction}>
      {children}
    </Zoom>
  );
}

export function RevealSlide({ children, delay = 0, direction = "left", cascade = false, fraction = 0.2 }: RevealProps) {
  return (
    <Slide direction={direction} delay={delay} cascade={cascade} triggerOnce fraction={fraction}>
      {children}
    </Slide>
  );
}
