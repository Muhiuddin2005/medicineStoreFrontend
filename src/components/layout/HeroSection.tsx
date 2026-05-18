"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pill, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { getSessionAction } from "../../../actions/auth";

export default function HeroSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const titleWords = "Delivered.".split("");

  useEffect(() => {
    getSessionAction().then((session: any) => setIsLoggedIn(!!session));
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const elementVariants: Variants = {
    hidden: { opacity: 0, y: 40, rotateX: -15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        mass: 1,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.5 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  };

  return (
    <section className="relative bg-linear-to-b from-primary/10 via-primary/5 to-background py-28 px-4 overflow-hidden min-h-[85vh] flex items-center perspective-1000">
      
      <div className="absolute inset-0 -z-10">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -20, 0] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, -40, 0],
            y: [0, 40, 0] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"
        />
        <div className="absolute inset-0 bg-grid-black/[0.01] dark:bg-grid-white/[0.01]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto text-center space-y-8 relative z-10"
      >
        
        <motion.div variants={elementVariants} className="inline-flex items-center">
          <Badge className="px-4 py-1.5 border border-primary/20 bg-background/60 backdrop-blur-md shadow-xs text-foreground gap-2 rounded-full font-medium text-xs">
            <Sparkles className="h-3.5 w-3.5 text-yellow-500 animate-spin-slow" />
            100% Authentic Over-The-Counter Medicines
          </Badge>
        </motion.div>

        <motion.h1 
          variants={elementVariants}
          className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-balance leading-tight"
        >
          Your Health, <br className="sm:hidden" />
          <span className="text-foreground/90">Global Security.</span> <br />
          <span className="relative inline-block bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {titleWords.map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block origin-bottom"
                whileHover={{ 
                  scale: 1.3, 
                  rotateY: 25, 
                  color: "#2563eb",
                  transition: { duration: 0.1 } 
                }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p 
          variants={elementVariants}
          className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance"
        >
          Order authentic healthcare products seamlessly from verified local pharmacies. 
          Get your essentials secured immediately with transparent 
          <span className="text-foreground font-semibold underline underline-offset-4 decoration-primary/40"> Cash on Delivery</span> pathways.
        </motion.p>

        <motion.div 
          variants={elementVariants}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <Link href="/shop" className="w-full">
              <Button size="lg" className="w-full sm:w-auto px-10 h-12 shadow-xl shadow-primary/20 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary to-blue-700 hover:opacity-95 transition-all">
                Shop Medicines
              </Button>
            </Link>
          </motion.div>

          {!isLoggedIn && (
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link href="/register?role=seller" className="w-full">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 h-12 rounded-xl text-sm font-semibold border-primary/20 hover:bg-primary/5 bg-background/40 backdrop-blur-xs transition-all">
                  Become a Seller
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          variants={elementVariants}
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute -right-4 top-1/3 hidden lg:flex items-center gap-2 p-3 bg-background/80 backdrop-blur-md rounded-2xl border border-border shadow-lg rotate-12 pointer-events-none"
        >
          <div className="p-2 bg-green-500/10 rounded-xl text-green-600">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="text-left text-xs pr-2">
            <p className="font-bold">Verified Vendor</p>
            <p className="text-muted-foreground">100% Safe Pass</p>
          </div>
        </motion.div>

        <motion.div 
          variants={elementVariants}
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -8, 0]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute -left-8 bottom-1/4 hidden lg:flex items-center justify-center p-4 bg-background/80 backdrop-blur-md rounded-full border border-border shadow-xl -rotate-12 pointer-events-none"
        >
          <Pill className="h-8 w-8 text-primary transform -rotate-45" />
        </motion.div>

      </motion.div>
    </section>
  );
}
