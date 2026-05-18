"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, Clock, CreditCard, Pill } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Sellers",
    desc: "Strict verification for all pharmacies to ensure authentic products.",
    colors: "from-blue-500 to-indigo-600",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Quick and reliable dispatch directly to your doorstep.",
    colors: "from-emerald-400 to-green-600",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    desc: "Always online and ready to serve your healthcare needs anytime.",
    colors: "from-orange-400 to-red-500",
  },
  {
    icon: Pill,
    title: "Authentic Medicines",
    desc: "100% genuine over-the-counter healthcare products guaranteed.",
    colors: "from-purple-500 to-pink-600",
  },
  {
    icon: CreditCard,
    title: "Cash on Delivery",
    desc: "Pay safely and transparently at your door with zero hidden fees.",
    colors: "from-cyan-400 to-blue-500",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-background to-primary/5 overflow-hidden border-t border-border/50">
      
      <div className="max-w-7xl mx-auto px-4 text-center mb-16 relative z-20">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight">
          Why Choose <span className="text-primary">MediStore</span>
        </h2>
        <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
          We prioritize your health, security, and convenience above all else.
        </p>
      </div>

      <div className="relative flex w-full overflow-hidden py-4">
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, ease: "linear", repeat: Infinity }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {[...features, ...features].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="w-[300px] md:w-[380px] shrink-0 mx-4">
                <div className="group h-full relative overflow-hidden rounded-[2rem] p-8 bg-card border border-border/60 hover:border-primary/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300">
                  <div className={`absolute -right-12 -top-12 w-40 h-40 rounded-full bg-gradient-to-br ${feature.colors} opacity-10 group-hover:opacity-20 blur-3xl transition-opacity duration-500`} />

                  <div className={`inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.colors} text-white mb-6 shadow-lg transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300`}>
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
