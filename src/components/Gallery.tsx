import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { gallery, img, type Category } from "../data/photos";
import { EASE, Eyebrow, Reveal } from "./ui";

const FILTERS: ("All" | Category)[] = ["All", "Rock", "Sod & Lawn", "Repairs", "Beds"];

function Lightbox({ index, items, onClose, onMove }: {
  index: number;
  items: typeof gallery;
  onClose: () => void;
  onMove: (d: number) => void;
}) {
  const p = items[index];
  const startX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onMove(-1);
      else if (e.key === "ArrowRight") onMove(1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prevFocus?.focus();
    };
  }, [onClose, onMove]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={p.label}
      className="fixed inset-0 z-[60] flex flex-col bg-ink/96 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      onTouchStart={(e) => (startX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (startX.current == null) return;
        const dx = e.changedTouches[0].clientX - startX.current;
        if (Math.abs(dx) > 50) onMove(dx < 0 ? 1 : -1);
        startX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 text-cream">
        <span className="text-sm tabular-nums text-cream/60">
          {index + 1} / {items.length}
        </span>
        <button ref={closeRef} onClick={onClose} aria-label="Close" className="grid h-11 w-11 place-items-center rounded-full hover:bg-cream/10">
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-4 pb-6 md:px-20">
        <AnimatePresence mode="wait">
          <motion.figure
            key={p.id}
            className="flex max-h-full flex-col items-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={img(p.id)} alt={p.alt} className="max-h-[78vh] max-w-full rounded-lg object-contain shadow-2xl" />
            <figcaption className="mt-4 text-center text-cream">
              <span className="font-display text-xl">{p.label}</span>
              <span className="ml-3 text-xs uppercase tracking-widest text-gold-light">{p.category}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
        <button
          onClick={(e) => { e.stopPropagation(); onMove(-1); }}
          aria-label="Previous photo"
          className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-cream/10 text-cream hover:bg-gold hover:text-ink sm:grid md:left-6"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onMove(1); }}
          aria-label="Next photo"
          className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-cream/10 text-cream hover:bg-gold hover:text-ink sm:grid md:right-6"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);
  const items = useMemo(() => (filter === "All" ? gallery : gallery.filter((g) => g.category === filter)), [filter]);
  const move = useCallback((d: number) => setOpen((v) => (v == null ? v : (v + d + items.length) % items.length)), [items.length]);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="gallery" className="px-5 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <Eyebrow>Project Gallery</Eyebrow>
            <h2 className="h-section mt-4 text-text">
              Our Work <span className="text-bronze">Speaks for Itself.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter photos">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    filter === f ? "bg-gold text-ink" : "bg-beige text-text hover:bg-ink hover:text-cream"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.ul layout className="mt-12 grid grid-flow-dense auto-rows-[200px] grid-cols-2 gap-3 md:auto-rows-[280px] md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((p, idx) => (
              <motion.li
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={`${p.orientation === "landscape" ? "col-span-2" : ""}`}
              >
                <button
                  onClick={() => setOpen(idx)}
                  className="group relative block h-full w-full overflow-hidden rounded-xl bg-beige"
                  aria-label={`Open photo: ${p.label}`}
                >
                  <img
                    src={img(p.id, "sm")}
                    alt={p.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4 text-left text-cream">
                    <span>
                      <span className="block text-[0.68rem] uppercase tracking-widest text-gold-light">{p.category}</span>
                      <span className="font-medium">{p.label}</span>
                    </span>
                    <Expand className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <AnimatePresence>
        {open != null && items[open] && <Lightbox index={open} items={items} onClose={close} onMove={move} />}
      </AnimatePresence>
    </section>
  );
}
