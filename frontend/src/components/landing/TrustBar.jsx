import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "@/components/landing/Reveal";

export const TrustBar = () => {
  const { t } = useLanguage();
  return (
    <section className="border-y border-border bg-secondary/40" data-testid="trust-bar">
      <div className="container-ds py-8">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {t.trust.label}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {t.trust.sectors.map((s) => (
              <span
                key={s}
                className="font-heading text-sm font-600 text-primary/70 sm:text-base"
                style={{ fontWeight: 600 }}
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
