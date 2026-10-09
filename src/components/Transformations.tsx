import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";
import { img, transformations } from "../data/photos";
import { EASE, Eyebrow, Reveal } from "./ui";

function BeforeAfter({ before, after, title }: { before: string; after: string; title: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => dragging.current && setFromX(e.clientX);
    const up = () => (dragging.current = false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [setFromX]);

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - step));
    else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + step));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[4/5] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-2xl bg-ink-3 shadow-2xl sm:aspect-[4/3]"
      onPointerDown={(e) => {
        dragging.current = true;
        setFromX(e.clientX);
      }}
    >
      <img src={img(after)} alt={`${title} — after`} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={img(before)} alt={`${title} — before`} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      </div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cream backdrop-blur">
        Before
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-widest text-ink">
        After
      </span>

      <div className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-gold" style={{ left: `${pos}%` }} />
      <div
        role="slider"
        tabIndex={0}
        aria-label={`${title}: drag to compare before and after`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% before`}
        onKeyDown={onKey}
        className="absolute top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-cream bg-gold text-ink shadow-xl"
        style={{ left: `${pos}%` }}
      >
        <MoveHorizontal className="h-6 w-6" />
      </div>
    </div>
  );
}

export default function Transformations() {
  const [i, setI] = useState(0);
  const t = transformations[i];
  const n = transformations.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);

  return (
    <section id="projects" className="bg-beige px-5 py-24 md:px-6 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Before &amp; After</Eyebrow>
          <h2 className="h-section mt-4 text-text">
            See the <span className="text-bronze">Transformation</span>
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted">
            Real jobs, photographed before and after. Drag the handle — or use your arrow keys — to compare.
          </p>

          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Projects">
            {transformations.map((x, idx) => (
              <button
                key={x.id}
                role="tab"
                aria-selected={idx === i}
                onClick={() => setI(idx)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  idx === i ? "border-ink bg-ink text-cream" : "border-text/20 text-text hover:border-bronze hover:text-bronze"
                }`}
              >
                {x.title}
              </button>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button onClick={() => go(-1)} aria-label="Previous project" className="grid h-11 w-11 place-items-center rounded-full border border-text/20 text-text transition-colors hover:border-gold hover:bg-gold">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => go(1)} aria-label="Next project" className="grid h-11 w-11 place-items-center rounded-full border border-text/20 text-text transition-colors hover:border-gold hover:bg-gold">
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="ml-2 text-sm tabular-nums text-muted">
              {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <BeforeAfter before={t.before} after={t.after} title={t.title} />
              <p className="mt-4 text-center font-display text-xl text-text">{t.title}</p>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
