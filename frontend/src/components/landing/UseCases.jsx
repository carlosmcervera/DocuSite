import React from "react";
import { HardHat, Building2, Factory, UserCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/Reveal";

const caseIcons = [HardHat, Building2, Factory, UserCheck];

export const UseCases = () => {
  const { t } = useLanguage();
  return (
    <section data-testid="use-cases-section" className="section-pad bg-secondary/40">
      <div className="container-ds">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="eyebrow mb-4 justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-safety" />
            {t.useCases.eyebrow}
          </div>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl text-balance">
            {t.useCases.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t.useCases.subtitle}
          </p>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {t.useCases.cases.map((c, i) => {
            const Icon = caseIcons[i] || HardHat;
            return (
              <StaggerItem key={c.title}>
                <div className="flex h-full items-start gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <Icon className="h-6 w-6 text-accent-foreground" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
};
