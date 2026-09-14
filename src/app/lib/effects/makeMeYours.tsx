"use client";

import { useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Throw us your design",
    description:
      "PNG, SVG, or PDF. If it'll print like a pixelated crime scene, we'll tell you before you regret it.",
  },
  {
    number: "02",
    title: "Throw us your design",
    description:
      "PNG, SVG, or PDF. If it'll print like a pixelated crime scene, we'll tell you before you regret it.",
  },
  {
    number: "03",
    title: "Throw us your design",
    description:
      "PNG, SVG, or PDF. If it'll print like a pixelated crime scene, we'll tell you before you regret it.",
  },
];

const products = ["Tyler — Article 19", "Tyler — Article 20", "Tyler — Article 21"];

function UploadIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 16V4" />
      <path d="M7 9l5-5 5 5" />
      <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

const copyContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const copyItemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stepsContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
};

const stepItemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function MakeMeYours() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [product, setProduct] = useState("");

  const handleFiles = (files: FileList | null) => {
    if (files && files[0]) {
      setFileName(files[0].name);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // wire this up to your upload / order endpoint
    console.log("custom print submission:", { fileName, product });
  };

  return (
    <section className="w-full bg-black px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: copy + steps */}
        <motion.div
          variants={copyContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={copyItemVariants}
            className="mb-6 text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl"
          >
            Make it embarrassingly yours
          </motion.h2>

          <motion.p variants={copyItemVariants} className="mb-12 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            Got a design, a logo, or questionable meme energy? Slap it on
            select Kindred pieces. We print it, you own the consequences.
          </motion.p>

          <motion.ol
            variants={stepsContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-8"
          >
            {steps.map((step) => (
              <motion.li key={step.number} variants={stepItemVariants} className="flex gap-3">
                <span className="shrink-0 text-lg font-semibold text-white/90">{step.number}.</span>
                <div>
                  <p className="mb-1 text-lg font-semibold text-white">{step.title}</p>
                  <p className="max-w-md text-sm leading-relaxed text-white/60">{step.description}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>

        {/* Right: upload card */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex h-fit flex-col gap-5 rounded-3xl border border-white/10 p-8"
        >
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingOver(true);
            }}
            onDragLeave={() => setIsDraggingOver(false)}
            onDrop={handleDrop}
            className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed px-6 py-16 text-center transition-colors ${
              isDraggingOver ? "border-white/50 bg-white/5" : "border-white/15 hover:border-white/30"
            }`}
          >
            <UploadIcon className="h-6 w-6 text-white" />
            <p className="text-sm text-white/80">
              {fileName ?? "Drop your masterpiece here, or click to browse"}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".png,.svg,.pdf"
              onChange={handleInputChange}
              className="hidden"
            />
          </div>

          <div className="relative">
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              required
              className="w-full appearance-none rounded-xl bg-neutral-900 px-6 py-4 pr-12 text-white/90 focus:outline-none"
            >
              <option value="" disabled>
                Select a product
              </option>
              {products.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-6 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-white py-4 font-semibold text-neutral-950 transition-colors hover:bg-white/90"
          >
            Submit
          </button>
        </motion.form>
      </div>
    </section>
  );
}