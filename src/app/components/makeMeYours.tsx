"use client";

import { useEffect, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import type { User } from "@supabase/supabase-js";
import { createClient } from "../lib/supabase/client"; // adjust to wherever this actually lives in your project
import { rgbCase } from "../lib/rgb-text";

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
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 16V4" />
      <path d="M7 9l5-5 5 5" />
      <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function GoogleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="#4285F4" d="M23.04 12.27c0-.82-.07-1.6-.2-2.36H12v4.47h6.19a5.3 5.3 0 0 1-2.3 3.48v2.9h3.72c2.18-2 3.43-4.96 3.43-8.49Z" />
      <path fill="#34A853" d="M12 24c3.1 0 5.7-1.02 7.6-2.78l-3.71-2.9c-1.03.7-2.36 1.11-3.89 1.11-2.99 0-5.52-2.02-6.43-4.73H1.74v2.98A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.57 14.7a7.2 7.2 0 0 1 0-4.6V7.12H1.74a12 12 0 0 0 0 9.76l3.83-2.98Z" />
      <path fill="#EA4335" d="M12 4.77c1.68 0 3.19.58 4.38 1.72l3.29-3.29C17.7 1.27 15.1.24 12 .24A12 12 0 0 0 1.74 7.12l3.83 2.98C6.48 6.79 9 4.77 12 4.77Z" />
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

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function CustomPrint() {
  const [supabase] = useState(() => createClient());

  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [file, setFile] = useState<File | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [product, setProduct] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.href },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleFiles = (files: FileList | null) => {
    if (files && files[0]) setFile(files[0]);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("SUBMIT CLICKED:", { user, file, product });
    if (!user || !file || !product) return;

    setStatus("submitting");
    setErrorMessage(null);

    const filePath = `${user.id}/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("design-uploads")
      .upload(filePath, file);

    if (uploadError) {
      setStatus("error");
      setErrorMessage(uploadError.message);
      return;
    }

    const { error: insertError } = await supabase
      .from("custom_print_submissions")
      .insert({ user_id: user.id, product, file_path: filePath });

    if (insertError) {
      setStatus("error");
      setErrorMessage(insertError.message);
      return;
    }

    setStatus("success");
    setFile(null);
    setProduct("");
  };

  return (
    <section className="w-full bg-black px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: copy + steps */}
        <motion.div variants={copyContainerVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <motion.h2 variants={copyItemVariants} className="mb-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl">
            {rgbCase("Make it embarrassingly yours")}
          </motion.h2>

          <motion.p variants={copyItemVariants} className="mb-12 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            {rgbCase("Got a design, a logo, or questionable meme energy? Slap it on select Kindred pieces. We print it, you own the consequences.")}
          </motion.p>

          <motion.ol variants={stepsContainerVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="flex flex-col gap-8">
            {steps.map((step) => (
              <motion.li key={step.number} variants={stepItemVariants} className="flex gap-3">
                <span className="shrink-0 text-lg font-semibold text-white/90">{step.number}.</span>
                <div>
                  <p className="mb-1 text-lg font-semibold text-white">{rgbCase(step.title)}</p>
                  <p className="max-w-md text-sm leading-relaxed text-white/60">{rgbCase(step.description)}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>

        {/* Right: upload card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex h-fit flex-col gap-5 rounded-3xl border border-white/10 p-8"
        >
          {authLoading ? (
            <div className="flex items-center justify-center py-16 text-sm text-white/40">
              Checking session…
            </div>
          ) : !user ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <p className="text-sm text-white/70">
                {rgbCase("Sign in to upload a design — this keeps every submission tied to an actual account.")}
              </p>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-white/90"
              >
                <GoogleIcon className="h-4 w-4" />
                {rgbCase("Sign in with Google")}
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-white/50">
                <span>{rgbCase(`Signed in as ${user.email}`)}</span>
                <button type="button" onClick={handleSignOut} className="underline hover:text-white/80">
                  {rgbCase("Sign out")}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => document.getElementById("design-file-input")?.click()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") document.getElementById("design-file-input")?.click();
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
                    {file ? file.name : rgbCase("Drop your masterpiece here, or click to browse")}
                  </p>
                  <input id="design-file-input" type="file" accept=".png,.svg,.pdf" onChange={handleInputChange} className="hidden" />
                </div>

                <div className="relative">
                  <select
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    required
                    className="w-full appearance-none rounded-xl bg-neutral-900 px-6 py-4 pr-12 text-white/90 focus:outline-none"
                  >
                    <option value="" disabled>
                      {rgbCase("Select a product")}
                    </option>
                    {products.map((p) => (
                      <option key={p} value={p}>
                        {rgbCase(p)}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-6 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                </div>

                <button
                  type="submit"
                  disabled={!file || !product || status === "submitting"}
                  className="w-full rounded-xl bg-white py-4 font-semibold text-neutral-950 transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "submitting" ? rgbCase("Uploading…") : rgbCase("Submit")}
                </button>

                {status === "success" && (
                  <p className="text-center text-sm text-emerald-400">
                    {rgbCase("Design submitted — we'll review it shortly.")}
                  </p>
                )}
                {status === "error" && (
                  <p className="text-center text-sm text-red-400">{errorMessage ? rgbCase(errorMessage) : null}</p>
                )}
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}