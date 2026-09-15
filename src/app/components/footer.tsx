"use client";

import { motion } from "framer-motion";
import { rgbCase } from "../lib/rgb-text";

const columns = [
  {
    heading: "Shop",
    links: ["All Objects", "New Releases", "Best Sellers"],
  },
  {
    heading: "Custom",
    links: ["Send Design", "How It Works", "Get A Quote"],
  },
  {
    heading: "Connect",
    links: ["Instagram", "Email", "WhatsApp"],
  },
];

const columnContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const columnVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-black">
      {/* Oversized background wordmark */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap pl-6 pt-4 text-[140px] font-bold leading-none tracking-tight text-white/5 sm:pl-10 sm:text-[200px] lg:pl-16 lg:text-[260px]"
      >
        {rgbCase("aaRGeeBee")}
      </motion.p>

      {/* Tagline + link columns */}
      <motion.div
        variants={columnContainerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-10 px-6 pb-16 pt-8 sm:px-10 md:grid-cols-4 md:gap-8 lg:px-16"
      >
        <motion.p variants={columnVariants} className="text-sm text-white/60 md:col-span-1">
          {rgbCase("3D printed objects, designed for everyday life.")}
        </motion.p>

        {columns.map((column) => (
          <motion.div key={column.heading} variants={columnVariants}>
            <p className="mb-4 text-xs font-medium tracking-[0.15em] text-white/40">
              {rgbCase(column.heading)}
            </p>
            <ul className="flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {rgbCase(link)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="flex flex-col gap-2 border-t border-white/10 px-6 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16"
      >
        <p>{rgbCase("© 2026 aaRGeeBee.")}</p>
        <p>{rgbCase("As the tech.")}</p>
      </motion.div>
    </footer>
  );
}