import { ClipboardList, MessagesSquare, ShieldCheck } from "lucide-react";
import { img } from "../data/photos";
import { Eyebrow, Reveal } from "./ui";

const STEPS = [
  {
    icon: MessagesSquare,
    title: "Tell Us About Your Project",
    text: "Reach out with what you have in mind — a fresh lawn, a rock bed, a repair or seasonal work.",
  },
  {
    icon: ClipboardList,
    title: "Get a Clear Plan",
    text: "We look at the space, talk through options and give you a straightforward estimate.",
  },
  {
    icon: ShieldCheck,
    title: "We Get It Done Right",
    text: "The work is carried out with care, and the site is left clean and tidy when we're finished.",
  },
];

export default function Process() {
  return (
    <section className="relative overflow-hidden bg-ink px-5 py-24 text-cream md:px-6 md:py-32">
      <img src={img("rock-bed-curve")} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-15" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow light>Why Choose J&amp;W</Eyebrow>
          </div>
          <h2 className="h-section mt-4">
            Simple Process. <span className="text-gold">Quality Results.</span>
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.1}>
              <div className="relative h-full rounded-xl border border-cream/10 bg-ink-2/80 p-8 backdrop-blur transition-colors duration-300 hover:border-gold/50">
                <span className="absolute right-6 top-5 font-display text-5xl text-gold/20">0{i + 1}</span>
                <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/50 text-gold">
                  <s.icon className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <h3 className="mt-6 font-display text-2xl">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-cream/70">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
