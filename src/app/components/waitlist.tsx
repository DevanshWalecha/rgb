"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { joinWaitlist } from "@/app/actions/waitlist";

const copyContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const copyItemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function FinalCallToAction() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");

    const formData = new FormData();
    formData.set("email", email);

    try {
      const res = await joinWaitlist(formData);
      if (res.ok) {
        setStatus("success");
        setMessage(res.message ?? "You're on the list.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(res.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  const isLoading = status === "loading";

  return (
    <section className="w-full bg-black px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: brand label, headline, subtext */}
        <motion.div
          variants={copyContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-2xl"
        >
          <motion.p
            variants={copyItemVariants}
            className="mb-4 text-sm font-medium tracking-[0.1em] text-white/70"
          >
            AARGEEBEE
          </motion.p>

          <motion.h2
            variants={copyItemVariants}
            className="mb-6 text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Stop settling for
            <br />
            beige. Get on the list.
          </motion.h2>

          <motion.p
            variants={copyItemVariants}
            className="max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            Kindred makes everyday tech and lifestyle accessories designed
            with the same care as the things you already love. Join the
            waitlist for early access.
          </motion.p>
        </motion.div>

        {/* Right: email signup */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
          className="flex w-full flex-col gap-3 lg:w-auto lg:shrink-0"
        >
          {status === "success" ? (
            <div className="rounded-xl border border-white/10 bg-neutral-900 px-6 py-4 text-white sm:w-auto">
              <p className="font-medium">{message}</p>
              <p className="mt-1 text-sm text-white/50">
                We&apos;ll be in touch when early access opens.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto"
            >
              <input
                type="email"
                required
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@gmail.com"
                className="w-full rounded-xl border border-white/10 bg-neutral-900 px-6 py-4 text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none disabled:opacity-60 sm:w-72"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-xl bg-white px-8 py-4 font-medium text-neutral-950 transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Joining…" : "Join Waitlist"}
              </button>
            </form>
          )}

          {status === "error" && message && (
            <p className="text-sm text-red-400">{message}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}