import { ArrowRight } from "lucide-react";
import { services } from "../data/business";
import { img } from "../data/photos";
import { Eyebrow, IconBadge, Reveal, scrollToId } from "./ui";

export default function Services() {
  return (
    <section id="services" className="grain bg-ink px-5 py-24 text-cream md:px-6 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow light>Our Services</Eyebrow>
          </div>
          <h2 className="h-section mt-4">
            Complete Outdoor <span className="text-gold">Property Services</span>
          </h2>
          <p className="mt-5 text-cream/70">
            Repairs, demolition, rock work, sprinklers, sod and snow removal — one crew for the jobs that keep a
            property in shape.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={(i % 3) * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-cream/10 bg-ink-2 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-gold/50">
                {s.photo ? (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={img(s.photo, "sm")}
                      alt={s.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-ink-3">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-40"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 55%, rgba(218,160,71,0.28), transparent 60%)",
                      }}
                    />
                    <div className="relative transition-transform duration-500 group-hover:scale-110">
                      <IconBadge name={s.icon} size={84} />
                    </div>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3">
                    {s.photo && <IconBadge name={s.icon} size={36} />}
                    <h3 className="font-display text-2xl">{s.title}</h3>
                  </div>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-cream/70">{s.summary}</p>
                  <button
                    onClick={() => scrollToId("contact")}
                    className="mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold text-gold-light transition-colors hover:text-gold"
                  >
                    Ask about {s.title.toLowerCase()}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-14 text-center">
          <button onClick={() => scrollToId("contact")} className="btn-gold">
            Request a Free Estimate <ArrowRight className="h-4 w-4" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
