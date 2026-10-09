import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { highlights } from "../data/business";
import { staggerChild, staggerParent } from "./ui";

export default function Highlights() {
  return (
    <section aria-label="What we do" className="relative z-10 mt-6 px-5 md:mt-8 md:px-6">
      <motion.ul
        className="mx-auto grid max-w-6xl grid-cols-1 gap-px overflow-hidden rounded-xl bg-beige shadow-[0_20px_50px_-25px_rgba(23,19,16,0.45)] sm:grid-cols-2 lg:grid-cols-4"
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
      >
        {highlights.map((h) => (
          <motion.li key={h} variants={staggerChild} className="flex items-center gap-3 bg-white px-6 py-5">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-gold" strokeWidth={2} />
            <span className="text-[0.95rem] font-medium text-text">{h}</span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
