"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Product = {
  title: string;
  price: string;
  image?: string; // drop your image URL here per product
  href?: string;
};

const products: Product[] = [
  {
    title: "Tyler – Article 19: Weapon of Mass",
    price: "Rs. 4,747",
    image: "/p1.jpg",
    href: "#",
  },
  {
    title: "Tyler – Article 19: Weapon of Mass",
    price: "Rs. 4,747",
    image: "/p2.jpg",
    href: "#",
  },
  {
    title: "Tyler – Article 19: Weapon of Mass Creation",
    price: "Rs. 4,747",
    image: "/p3.jpg",
    href: "#",
  },
];

const tabs = ["Upcoming Drops", "Best Sellers"] as const;

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

// Slightly longer, more deliberate stagger than the hero/navbar entrances —
// each card slides in from the left, one after another, left to right.
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, x: -48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: "easeOut" as const } },
};

export default function WhatsComing() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Upcoming Drops");

  return (
    <section className="w-full px-6 py-16 sm:px-10 lg:px-16" style={{ backgroundColor: "#ff3333" }}>
      {/* Header row */}
      <div className="mb-8 flex items-start justify-between gap-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl"
        >
          What&apos;s Coming.
        </motion.h2>

        <motion.a
          href="#shop"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-neutral-900 px-6 py-3 text-xs font-medium tracking-[0.1em] text-white transition-colors hover:bg-neutral-800"
        >
          SHOP ALL
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </motion.a>
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        className="mb-10 flex items-center gap-8 border-b border-white/10 pb-4"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`relative pb-4 text-sm font-medium uppercase tracking-[0.08em] transition-colors ${
              activeTab === tab ? "text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.span
                layoutId="whats-coming-tab-underline"
                className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-white"
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Product grid — left to right entrance */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {products.map((product) => (
          <motion.article key={product.title} variants={cardVariants} className="flex flex-col">
            {/* Image slot — drop product.image URLs into the array above */}
            <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-900">
              {product.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-widest text-white/30">
                  Image
                </div>
              )}
            </div>

            <div className="flex min-h-[92px] items-start justify-between gap-4 bg-neutral-900 px-5 py-4">
              <p className="text-sm font-semibold uppercase leading-snug text-white">
                {product.title}
              </p>
              <p className="shrink-0 text-sm font-semibold text-white">{product.price}</p>
            </div>

            <a
              href={product.href}
              className="border-t border-white/5 bg-neutral-800 px-5 py-3 text-center text-xs font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-neutral-700"
            >
              View Object
            </a>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}