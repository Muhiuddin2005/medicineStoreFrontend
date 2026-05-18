"use client";

import { motion } from "framer-motion";
import { Search, ShoppingBag, Truck } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      num: "01",
      title: "Browse & Search",
      desc: "Instantly explore thousands of over-the-counter medicines from certified local pharmacies.",
      themeColor: "text-blue-600",
      bgLight: "bg-blue-50",
      badgeColor: "bg-blue-600",
    },
    {
      icon: ShoppingBag,
      num: "02",
      title: "Secure Your Cart",
      desc: "Review your specific healthcare items and checkout effortlessly with zero prescription barriers.",
      themeColor: "text-green-600",
      bgLight: "bg-green-50",
      badgeColor: "bg-green-600",
    },
    {
      icon: Truck,
      num: "03",
      title: "Cash on Delivery",
      desc: "Receive items at your doorstep. Inspect your parcel completely, then pay safely on the spot.",
      themeColor: "text-indigo-600",
      bgLight: "bg-indigo-50",
      badgeColor: "bg-indigo-600",
    },
  ];

  return (
    <section className="relative py-28 px-4 bg-background overflow-hidden border-t border-border/50">
      <div className="max-w-7xl mx-auto relative">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            How <span className="text-blue-600">MediStore</span> Works
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Get authentic healthcare delivered directly to you in three transparent steps.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 items-start">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 150 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 1,
                  delay: idx * 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex flex-col items-center text-center p-8 rounded-[2rem] bg-card border border-border/40 hover:border-primary/20 hover:shadow-2xl transition-all duration-500 z-10"
              >


                <div className="relative mb-8 mt-4">
                  <div className={`relative h-24 w-24 ${step.bgLight} rounded-full flex items-center justify-center shadow-inner group-hover:-translate-y-3 group-hover:shadow-xl transition-all duration-500`}>
                    <IconComponent className={`h-10 w-10 ${step.themeColor}`} />
                  </div>

                  <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white shadow-md ${step.badgeColor} ring-4 ring-background`}>
                    Step {idx + 1}
                  </div>
                </div>

                <h3 className="text-xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[260px]">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
