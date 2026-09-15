"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rgbCase } from "../lib/rgb-text";

const navLinks = [
  { label: "Shop", href: "#shop" },
  { label: "Custom Print", href: "#custom-print" },
  { label: "How We Work", href: "#how-we-work" },
  { label: "About Us", href: "#about" },
];

/* ------------------------------------------------------------------ */
/*  Pixel-art icon set                                               */
/* ------------------------------------------------------------------ */

type Bitmap = number[][];

const HEART_BITMAP: Bitmap = [
  [0, 1, 1, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const CART_BITMAP: Bitmap = [
  [1, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 1, 0, 0],
];

const USER_BITMAP: Bitmap = [
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
];

function PixelIcon({ bitmap, className = "" }: { bitmap: Bitmap; className?: string }) {
  const rows = bitmap.length;
  const cols = bitmap[0].length;

  return (
    <svg
      viewBox={`0 0 ${cols} ${rows}`}
      className={className}
      fill="currentColor"
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
    >
      {bitmap.map((row, y) =>
        row.map((cell, x) =>
          cell ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} /> : null
        )
      )}
    </svg>
  );
}

function PixelMenuIcon({ open, className = "" }: { open: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 8 8" className={className} fill="currentColor" shapeRendering="crispEdges">
      {open ? (
        <>
          <rect x="0" y="0" width="1" height="1" />
          <rect x="1" y="1" width="1" height="1" />
          <rect x="2" y="2" width="1" height="1" />
          <rect x="3" y="3" width="2" height="2" />
          <rect x="5" y="2" width="1" height="1" />
          <rect x="6" y="1" width="1" height="1" />
          <rect x="7" y="0" width="1" height="1" />
          <rect x="0" y="7" width="1" height="1" />
          <rect x="1" y="6" width="1" height="1" />
          <rect x="2" y="5" width="1" height="1" />
          <rect x="5" y="5" width="1" height="1" />
          <rect x="6" y="6" width="1" height="1" />
          <rect x="7" y="7" width="1" height="1" />
        </>
      ) : (
        <>
          <rect x="0" y="1" width="8" height="1" />
          <rect x="0" y="3.5" width="8" height="1" />
          <rect x="0" y="6" width="8" height="1" />
        </>
      )}
    </svg>
  );
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Deep Glassmorphism Bar */}
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="show"
       className="flex h-16 w-full items-center justify-between gap-6 border-b border-white/10 bg-black/40 px-6 backdrop-blur-2xl md:h-20 md:px-12"
      >
        {/* Logo */}
        <motion.a href="#top" className="flex shrink-0 items-center gap-3" variants={itemVariants}>
          <img
            src="/aaRGeeBee.png"
            alt="aaRGeeBee Logo"
            className="h-7 w-auto object-contain [image-rendering:pixelated]"
          />
          <span 
            className="whitespace-nowrap text-lg text-white" 
            style={{ 
              fontFamily: 'var(--font-pixel), "Courier New", monospace',
              letterSpacing: "0.1em",
              imageRendering: "pixelated",
            }}
          >
            {rgbCase("aaRGeeBee")}
          </span>
        </motion.a>

        {/* Desktop Links with Animated Underline */}
        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <motion.li key={link.label} variants={itemVariants}>
              <a
                href={link.href}
                className="group relative py-1 text-xs font-semibold tracking-[0.25em] text-white/80 transition-colors hover:text-white"
              >
                {rgbCase(link.label)}
                <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-red-500 via-green-400 to-blue-500 transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Pill-shaped Icon Buttons + Glowing Badge */}
        <motion.div className="flex items-center gap-4" variants={itemVariants}>
          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              aria-label="Wishlist"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
            >
              <PixelIcon bitmap={HEART_BITMAP} className="h-[18px] w-[18px]" />
            </button>

            <button
              type="button"
              aria-label="Cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
            >
              <PixelIcon bitmap={CART_BITMAP} className="h-[18px] w-[18px]" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-[9px] font-bold text-white shadow-[0_0_10px_rgba(239,68,68,0.8)]">
                2
              </span>
            </button>

            <button
              type="button"
              aria-label="Account"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
            >
              <PixelIcon bitmap={USER_BITMAP} className="h-[18px] w-[18px]" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:bg-white/10 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <PixelMenuIcon open={mobileOpen} className="h-4 w-4" />
          </button>
        </motion.div>
      </motion.nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full overflow-hidden border-b border-white/10 bg-black/60 backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col divide-y divide-white/10">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-6 py-4 text-xs font-semibold tracking-[0.2em] text-white/80 hover:text-white"
                  >
                    {rgbCase(link.label)}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-4 px-6 py-4 sm:hidden">
                <button
                  type="button"
                  aria-label="Wishlist"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
                >
                  <PixelIcon bitmap={HEART_BITMAP} className="h-[18px] w-[18px]" />
                </button>
                <button
                  type="button"
                  aria-label="Cart"
                  className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
                >
                  <PixelIcon bitmap={CART_BITMAP} className="h-[18px] w-[18px]" />
                  <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-[8px] font-bold text-white shadow-[0_0_8px_rgba(239,68,68,0.8)]">
                    2
                  </span>
                </button>
                <button
                  type="button"
                  aria-label="Account"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
                >
                  <PixelIcon bitmap={USER_BITMAP} className="h-[18px] w-[18px]" />
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}