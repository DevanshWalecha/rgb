"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { TextScramble } from "../lib/effects/text-scramble"; // adjust to wherever your TextScramble component actually lives
import { Spotlight } from "../lib/effects/spotlight";

function ArrowUpRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 12 12 4" />
      <path d="M5.5 4H12v6.5" />
    </svg>
  );
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Hero() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // wire this up to your waitlist provider / API route
    console.log("waitlist signup:", email);
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-[#ff3333]">
        <Spotlight></Spotlight>
      {/* Buy Now pill, top right */}
      <motion.a
        href="#buy"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="absolute right-6 top-8 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-neutral-900/80 px-6 py-3.5 text-xs font-medium tracking-[0.12em] text-white backdrop-blur-md transition-colors hover:bg-neutral-800 sm:right-10"
      >
        BUY NOW
        <ArrowUpRightIcon className="h-3.5 w-3.5" />
      </motion.a>

      {/* Main content, anchored bottom-left */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-3xl px-6 pb-16 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24"
      >
        <motion.p variants={itemVariants} className="mb-4 text-sm text-white/60">
          Coming Soon
        </motion.p>

        <TextScramble
          as="h1"
          duration={1.1}
          speed={0.035}
          trigger
          className="mb-6 text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          Your accessories are boring. We fixed that.
        </TextScramble>

        <motion.p
          variants={itemVariants}
          className="mb-8 max-w-xl text-base text-white/60 sm:text-lg"
        >
          Kindred makes everyday tech and lifestyle accessories designed with the
          same care as the things you already love. Join the waitlist for early
          access.
        </motion.p>

        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@gmail.com"
            className="flex-1 rounded-xl border border-white/10 bg-neutral-900 px-5 py-4 text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-xl bg-white px-8 py-4 font-medium text-neutral-950 transition-colors hover:bg-white/90"
          >
            Join Waitlist
          </button>
        </motion.form>

        <motion.p variants={itemVariants} className="mt-4 text-xs text-white/40">
          No spam. One email when we launch. We&apos;re too busy making stuff to
          email you about &quot;our journey.&quot;
        </motion.p>
      </motion.div>
    </section>
  );
}