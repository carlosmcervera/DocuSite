import React from "react";
import { Sparkles, Mic, MapPin, PenLine, FolderTree, MonitorSmartphone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { SECTION_IDS } from "@/i18n/translations";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/Reveal";

const featureIcons = [Sparkles, Mic, MapPin, PenLine, FolderTree, MonitorSmartphone];

export const Features = () => {
  const { t } = useLanguage();
  return (
    <section id={SECTION_IDS.features} data-testid="features-section" className="section-pad bg-secondary/40">
      <div className="container-ds">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="eyebrow mb-4 justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-safety" />
            {t.features.eyebrow}
          </div>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl text-balance">
            {t.features.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t.features.subtitle}
          </p>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((f, i) => {
            const Icon = featureIcons[i] || Sparkles;
            return (
              <StaggerItem key={f.title}>
                <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-md">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform duration-200 group-hover:scale-105">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
};
