import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import {
  Hammer,
  Mountain,
  Sprout,
  Droplets,
  Snowflake,
  Shovel,
} from "lucide-react";
import type { Service } from "../data/business";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.65, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function Logo({ size, spin = false, className = "" }: { size?: number; spin?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.img
      src="/img/logo-gold.webp"
      alt="J&W Landscaping"
      width={size ?? 132}
      height={size ?? 132}
      className={`select-none ${className}`}
      style={size ? { width: size, height: size } : undefined}
      draggable={false}
      initial={spin && !reduce ? { rotate: -360, scale: 0.4, opacity: 0 } : false}
      animate={{ rotate: 0, scale: 1, opacity: 1 }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${light ? "text-gold-light" : "text-bronze"}`}>
      {children}
    </p>
  );
}

const ICONS = {
  repairs: Hammer,
  demo: Shovel,
  rock: Mountain,
  sprinkler: Droplets,
  sod: Sprout,
  snow: Snowflake,
};

export function ServiceIcon({ name, className = "" }: { name: Service["icon"]; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} strokeWidth={1.6} aria-hidden="true" />;
}

export function IconBadge({ name, size = 44 }: { name: Service["icon"]; size?: number }) {
  return (
    <span
      className="inline-grid shrink-0 place-items-center rounded-full bg-gold text-ink"
      style={{ width: size, height: size }}
    >
      <ServiceIcon name={name} className="h-[45%] w-[45%]" />
    </span>
  );
}

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
