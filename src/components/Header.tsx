import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Phone, Mail, ArrowRight } from "lucide-react";
import { business } from "../data/business";
import { Logo, scrollToId, EASE } from "./ui";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5H16.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z" />
    </svg>
  );
}
export { FacebookIcon };

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const line = window.innerHeight * 0.4;
      let current = "home";
      for (const id of ["home", "about", "services", "projects", "gallery", "contact"]) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id === "gallery" ? "projects" : id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = "contact";
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    requestAnimationFrame(() => scrollToId(id));
  };

  const hasContact = business.phone || business.email || business.social.facebook;

  return (
    <>
      <div className="hidden bg-ink text-cream/70 md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 text-[12.5px]">
          <p className="tracking-wide">
            Repairs · Demo · Rock · Sprinklers · Sod · Snow Removal
          </p>
          {hasContact ? (
            <div className="flex items-center gap-5">
              {business.phone && (
                <a href={`tel:${business.phone}`} className="flex items-center gap-1.5 hover:text-gold-light">
                  <Phone className="h-3.5 w-3.5 text-gold" /> {business.phone}
                </a>
              )}
              {business.email && (
                <a href={`mailto:${business.email}`} className="flex items-center gap-1.5 hover:text-gold-light">
                  <Mail className="h-3.5 w-3.5 text-gold" /> {business.email}
                </a>
              )}
              {business.social.facebook && (
                <a href={business.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-gold-light">
                  <FacebookIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          ) : (
            <p className="tracking-wide text-gold-light/80">Free estimates available</p>
          )}
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled ? "bg-ink/92 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md" : "bg-ink"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-[height] duration-300 md:px-6 ${
            scrolled ? "h-[68px]" : "h-[84px]"
          }`}
        >
          <button onClick={() => go("home")} className="flex items-center gap-3" aria-label="J&W Landscaping — back to top">
            <Logo size={scrolled ? 52 : 64} className="transition-all duration-300" />
            <span className="hidden font-display text-[1.35rem] leading-none text-cream sm:block">
              J&amp;W <span className="text-gold">Landscaping</span>
            </span>
          </button>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={`relative py-2 text-[0.95rem] transition-colors ${
                  active === n.id ? "text-gold-light" : "text-cream/85 hover:text-cream"
                }`}
              >
                {n.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ${
                    active === n.id ? "w-full" : "w-0"
                  }`}
                />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {business.phone ? (
              <a href={`tel:${business.phone}`} className="btn-gold hidden sm:inline-flex">
                <Phone className="h-4 w-4" /> {business.phone}
              </a>
            ) : (
              <button onClick={() => go("contact")} className="btn-gold hidden sm:inline-flex">
                Get a Free Estimate <ArrowRight className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-md border border-cream/20 text-cream lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-ink/97 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <nav className="grain flex h-full flex-col px-7 pb-10 pt-28" aria-label="Mobile">
              <motion.ul
                className="space-y-1"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
              >
                {NAV.map((n, i) => (
                  <motion.li
                    key={n.id}
                    variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } } }}
                  >
                    <button
                      onClick={() => go(n.id)}
                      className="flex w-full items-baseline gap-4 border-b border-cream/10 py-4 text-left"
                    >
                      <span className="text-xs text-gold/70">0{i + 1}</span>
                      <span className={`font-display text-3xl ${active === n.id ? "text-gold-light" : "text-cream"}`}>
                        {n.label}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                className="mt-auto"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5, ease: EASE }}
              >
                <button onClick={() => go("contact")} className="btn-gold w-full py-4">
                  Get a Free Estimate <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-5 text-center text-xs tracking-wide text-cream/50">
                  Repairs · Demo · Rock · Sprinklers · Sod · Snow Removal
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
