"use client";

import { motion } from "framer-motion";

// Drop your image URL in here once you have it.
const heroObjectImage = "";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function AboutUs() {
  return (
    <section className="w-full bg-black px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={itemVariants}
            className="mb-8 text-4xl font-extrabold uppercase leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Why the hell!
            <br />
            We are building this
          </motion.h2>

          <motion.p variants={itemVariants} className="mb-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Somewhere, a factory is making its ten-millionth identical phone
            stand. Somewhere else, someone just bought it because it was
            cheap and &ldquo;fine.&rdquo; We have a problem with
            &ldquo;fine.&rdquo;
          </motion.p>

          <motion.p variants={itemVariants} className="mb-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Kindred is a design-first accessories brand, which is a fancy way
            of saying we obsess over things most brands don&rsquo;t bother
            with — how it sits on your desk, how it ages, whether
            you&rsquo;ll still like it in three years or quietly hate
            yourself for buying it. We&rsquo;re not chasing catalog size.
            We&rsquo;re building five things well, and we&rsquo;d rather ship
            nothing than ship something forgettable.
          </motion.p>

          <motion.p variants={itemVariants} className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            This waitlist is chapter one. No influencer unboxings, no fake
            scarcity countdown timers — just five objects, coming soon, made
            by people who think &ldquo;good enough&rdquo; is a personal
            insult.
          </motion.p>
        </motion.div>

        {/* Image slot — 476x476 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mx-auto aspect-square w-full max-w-[476px] overflow-hidden bg-neutral-900 lg:mx-0 lg:ml-auto"
        >
          {heroObjectImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroObjectImage}
              alt="Kindred objects arranged in a circle"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-widest text-white/30">
              Image — 476 × 476
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}