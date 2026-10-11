import React from "react";
import { ImageOff, PencilLine, FileWarning, FolderX } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/Reveal";

const icons = [ImageOff, PencilLine, FileWarning, FolderX];

export const Problem = () => {
  const { t } = useLanguage();
  return (
    <section className="section-pad" data-testid="problem-section">
      <div className="container-ds">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="eyebrow mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                {t.problem.eyebrow}
              </div>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl text-balance">
                {t.problem.title}
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                {t.problem.subtitle}
              </p>

              <div className="mt-8 flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <span className="font-heading text-4xl font-bold text-safety sm:text-5xl">
                  {t.problem.statValue}
                </span>
                <span className="text-sm leading-snug text-muted-foreground">
                  {t.problem.statLabel}
                </span>
              </div>
            </div>
          </Reveal>

          <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {t.problem.pains.map((p, i) => {
              const Icon = icons[i] || FileWarning;
              return (
                <StaggerItem key={p.title}>
                  <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10">
                      <Icon className="h-5 w-5 text-destructive" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {p.desc}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
};
