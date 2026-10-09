import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { img } from "../data/photos";
import { EASE, scrollToId } from "./ui";

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: EASE, delay },
        };

  return (
    <section id="home" className="relative overflow-hidden bg-ink text-cream">
      <div className="absolute inset-0">
        <motion.img
          src={img("lawn-sod-yard")}
          alt=""
          className="h-full w-full object-cover"
          initial={reduce ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: EASE }}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/88 to-ink/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-32 pt-36 md:px-6 md:pb-40 md:pt-40 lg:pt-64 lg:grid-cols-[1.1fr_0.9fr] lg:pb-48">
        <div>
          <motion.p {...rise(0.05)} className="eyebrow mb-5 flex items-center gap-3 text-gold-light">
            Landscaping &amp; Outdoor Services
          </motion.p>
          <motion.h1 {...rise(0.15)} className="h-hero max-w-[13ch]">
            Outdoor Spaces <span className="text-gold">Built to Last.</span>
          </motion.h1>
          <motion.p {...rise(0.3)} className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-cream/80 md:text-lg">
            From fresh sod and sprinklers to rock work, repairs and seasonal snow removal — J&amp;W Landscaping
            helps keep your property looking its best, all year round.
          </motion.p>
          <motion.div {...rise(0.45)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => scrollToId("contact")} className="btn-gold">
              Get a Free Estimate <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => scrollToId("projects")} className="btn-ghost">
              View Our Work <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>

        <div className="relative mx-auto h-[300px] w-[300px] sm:h-[400px] sm:w-[420px] lg:h-[480px] lg:w-[480px]">
          <motion.div
            className="absolute right-0 top-0 h-[220px] w-[220px] overflow-hidden rounded-full border-[5px] border-gold shadow-2xl sm:h-[300px] sm:w-[300px] lg:h-[350px] lg:w-[350px]"
            initial={reduce ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
          >
            <img src={img("retaining-wall-after", "sm")} alt="Rebuilt block retaining wall" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0 h-[160px] w-[160px] overflow-hidden rounded-full border-[5px] border-gold shadow-2xl sm:h-[210px] sm:w-[210px] lg:h-[240px] lg:w-[240px]"
            initial={reduce ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
          >
            <img src={img("tree-ring-after", "sm")} alt="Stone tree ring with fresh mulch" className="h-full w-full object-cover" />
          </motion.div>
          <motion.span
            aria-hidden="true"
            className="absolute bottom-10 right-6 h-16 w-16 rounded-full border border-gold/50 sm:h-20 sm:w-20"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          />
        </div>
      </div>

      <svg
        className="absolute bottom-0 left-0 h-[60px] w-full text-cream md:h-[90px]"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 90V40C240 85 520 95 760 70C1000 45 1240 5 1440 20V90Z" fill="currentColor" />
      </svg>
    </section>
  );
}
