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
      <header
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-[background-color,box-shadow] duration-300 ${
          scrolled ? "bg-ink/80 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)]" : "bg-ink/55"
        }`}
      >
        <div className="relative mx-auto flex max-w-7xl items-center gap-6 px-5 md:px-6 lg:gap-10">
          <button
            onClick={() => go("home")}
            className="absolute left-5 top-1.5 z-10 md:left-6 lg:top-2"
            aria-label="J&W Landscaping, back to top"
          >
            <Logo
              spin
              className={`drop-shadow-[0_6px_14px_rgba(0,0,0,0.85)] transition-[width,height] duration-500 ${
                scrolled ? "h-[64px] w-[64px] lg:h-[68px] lg:w-[68px]" : "h-[104px] w-[104px] lg:h-[200px] lg:w-[200px]"
              }`}
            />
          </button>
          <div
            aria-hidden="true"
            className={`shrink-0 transition-[width] duration-500 ${scrolled ? "w-[64px] lg:w-[68px]" : "w-[104px] lg:w-[200px]"}`}
          />

          <div className="relative flex min-w-0 flex-1 flex-col">
            <span aria-hidden="true" className="absolute -right-[50vw] bottom-0 left-0 h-px bg-gold/60" />
            <div
              className={`hidden items-center justify-between overflow-hidden border-b border-cream/10 text-[13px] text-cream/75 transition-all duration-300 lg:flex ${
                scrolled ? "h-0 border-transparent opacity-0" : "h-12 opacity-100"
              }`}
            >
              <p className="tracking-wide">Repairs · Demo · Rock · Sprinklers · Sod · Snow Removal</p>
              {hasContact ? (
                <div className="flex items-center gap-6">
                  {business.phone && (
                    <a href={`tel:${business.phone}`} className="flex items-center gap-2 hover:text-gold-light">
                      <Phone className="h-4 w-4 text-gold" /> {business.phone}
                    </a>
                  )}
                  {business.email && (
                    <a href={`mailto:${business.email}`} className="flex items-center gap-2 hover:text-gold-light">
                      <Mail className="h-4 w-4 text-gold" /> {business.email}
                    </a>
                  )}
                  {business.social.facebook && (
                    <a href={business.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="flex items-center gap-2 font-medium text-cream hover:text-gold-light">
                      Follow Us <FacebookIcon className="h-5 w-5 text-gold" />
                    </a>
                  )}
                </div>
              ) : (
                <p className="tracking-wide text-gold-light">Free estimates available</p>
              )}
            </div>

            <div className="flex h-[76px] items-center justify-end gap-3">
              <nav className="hidden flex-1 items-center justify-center gap-10 lg:flex" aria-label="Main">
                {NAV.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => go(n.id)}
                    className={`relative py-2 text-[1rem] font-medium transition-colors ${
                      active === n.id ? "text-gold-light" : "text-cream/90 hover:text-cream"
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

              {business.phone ? (
                <a href={`tel:${business.phone}`} className="btn-gold hidden rounded-full px-6 sm:inline-flex">
                  <Phone className="h-4 w-4" /> {business.phone}
                </a>
              ) : (
                <button onClick={() => go("contact")} className="btn-gold hidden rounded-full px-6 sm:inline-flex">
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
