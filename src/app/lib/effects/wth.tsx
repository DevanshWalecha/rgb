"use client";

import { motion } from "framer-motion";

type FeatureCard = {
  brand: string;
  partner: string;
  image?: string; 
  href?: string;
};


const cards: FeatureCard[] = [
  { brand: "Tyler", partner: "Notice", image: "/p4.jpg", href: "#" },
  { brand: "Tyler", partner: "Notice", image: "/p5.jpg", href: "#" },
];

const copyContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const copyItemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

// Same slower, deliberate left-to-right stagger used on the product grid.
const cardGridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22, delayChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, x: -48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: "easeOut" as const } },
};

export default function WTH() {
  return (
    <section className="w-full bg-[#ff3333] px-6 py-20 sm:px-10 lg:px-16">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-8 text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
      >
        Why the hell! We are building this.
      </motion.h2>

      <motion.div
        variants={copyContainerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2"
      >
        <motion.p variants={copyItemVariants} className="max-w-md text-base leading-relaxed text-white/70">
          Most accessories are an afterthought: made fast, priced cheap,
          forgotten quickly. We think the objects you touch every day
          deserve better thinking behind them.
        </motion.p>
        <motion.p variants={copyItemVariants} className="max-w-md text-base leading-relaxed text-white/70">
          Most accessories are an afterthought: made fast, priced cheap,
          forgotten quickly. We think the objects you touch every day
          deserve better thinking behind them.
        </motion.p>
      </motion.div>

      <motion.div
        variants={cardGridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {cards.map((card, index) => (
          <motion.div
            key={`${card.brand}-${index}`}
            variants={cardVariants}
            className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900 sm:aspect-[16/15]"
          >
            {card.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={card.image}
                alt={`${card.brand} x ${card.partner}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-widest text-white/30">
                Image
              </div>
            )}

            {/* Gradient so the overlaid text/button stay legible over any image */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col items-start gap-4">
              <div className="flex items-center gap-3 text-white">
                <span className="text-2xl font-bold uppercase tracking-tight">{card.brand}</span>
                <span className="text-2xl font-light">×</span>
                <span className="text-2xl font-bold uppercase tracking-tight">{card.partner}</span>
              </div>

              <a
                href={card.href}
                className="rounded-full border border-white/15 bg-black/40 px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white backdrop-blur-md transition-colors hover:bg-black/60"
              >
                Buy Now
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}