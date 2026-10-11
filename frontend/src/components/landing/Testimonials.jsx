import React from "react";
import { Quote, Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/Reveal";

export const Testimonials = () => {
  const { t } = useLanguage();
  return (
    <section data-testid="testimonials-section" className="section-pad">
      <div className="container-ds">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="eyebrow mb-4 justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-safety" />
            {t.testimonials.eyebrow}
          </div>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl text-balance">
            {t.testimonials.title}
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {t.testimonials.items.map((item) => (
            <StaggerItem key={item.quote}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-0.5" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-safety text-safety" />
                  ))}
                </div>
                <Quote className="mt-4 h-6 w-6 text-primary/20" />
                <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-foreground">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <div className="font-heading text-sm font-semibold text-foreground">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.role}</div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};
