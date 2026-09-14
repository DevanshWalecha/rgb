"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Shop", href: "#shop" },
  { label: "Custom Print", href: "#custom-print" },
  { label: "How We Work", href: "#how-we-work" },
  { label: "About Us", href: "#about" },
];

/* ------------------------------------------------------------------ */
/*  Pixel-art icon set (Streamline "pixel" style)                      */
/*  Bitmap grids rendered as crisp, non-anti-aliased squares — swap    */
/*  for licensed Streamline Pixel SVGs directly if you have that pack. */
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

function LogoMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 20 20" shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="7" height="7" fill="#EF4444" />
      <rect x="11" y="2" width="7" height="7" fill="#FACC15" />
      <rect x="2" y="11" width="7" height="7" fill="#3B82F6" />
      <rect x="11" y="11" width="7" height="7" fill="#22C55E" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar — one piece, full width with side margins, warm-tinted      */
/*  glass so the red hero behind it shows through blurred rather than  */
/*  reading as a plain dark/black bar.                                 */
/* ------------------------------------------------------------------ */

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
    <header className="sticky w-full top-0 z-50 px-4 pt-1 sm:px-6 md:px-8">
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full items-center justify-between gap-6 rounded-2xl border border-white/10 px-6 py-4 backdrop-blur-xl md:px-8"
        style={{
          backgroundColor: "rgba(255, 51, 51, 0.38)",
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%)",
          boxShadow: "0 8px 32px rgba(180, 20, 20, 0.25)",
        }}
      >
        {/* Logo */}
        <motion.a href="#top" className="flex shrink-0 items-center gap-2.5" variants={itemVariants}>
          <LogoMark />
          <span className="whitespace-nowrap text-sm font-semibold tracking-[0.18em] text-white">
            AARGEEBEE
          </span>
        </motion.a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <motion.li key={link.label} variants={itemVariants}>
              <a
                href={link.href}
                className="text-[13px] font-medium tracking-[0.08em] text-white/85 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Icons + mobile toggle, inline in the same bar */}
        <motion.div className="flex items-center gap-5" variants={itemVariants}>
          <div className="hidden items-center gap-5 sm:flex">
            <button type="button" aria-label="Wishlist" className="text-white/90 transition-colors hover:text-white">
              <PixelIcon bitmap={HEART_BITMAP} className="h-[18px] w-[18px]" />
            </button>
            <button type="button" aria-label="Cart" className="text-white/90 transition-colors hover:text-white">
              <PixelIcon bitmap={CART_BITMAP} className="h-[18px] w-[18px]" />
            </button>
            <button type="button" aria-label="Account" className="text-white/90 transition-colors hover:text-white">
              <PixelIcon bitmap={USER_BITMAP} className="h-[18px] w-[18px]" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center text-white md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <PixelMenuIcon open={mobileOpen} className="h-4 w-4" />
          </button>
        </motion.div>
      </motion.nav>

      {/* Mobile dropdown panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mx-auto mt-2 w-full overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl md:hidden"
            style={{ backgroundColor: "rgba(255, 51, 51, 0.5)" }}
          >
            <ul className="flex flex-col divide-y divide-white/10">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-6 py-4 text-sm font-medium tracking-[0.06em] text-white/90 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-6 px-6 py-4 sm:hidden">
                <button type="button" aria-label="Wishlist" className="text-white/90">
                  <PixelIcon bitmap={HEART_BITMAP} className="h-[18px] w-[18px]" />
                </button>
                <button type="button" aria-label="Cart" className="text-white/90">
                  <PixelIcon bitmap={CART_BITMAP} className="h-[18px] w-[18px]" />
                </button>
                <button type="button" aria-label="Account" className="text-white/90">
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