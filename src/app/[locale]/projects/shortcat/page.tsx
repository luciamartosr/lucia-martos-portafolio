import type { Metadata } from "next";
import { User, Clock, CheckCircle2, MapPin, ArrowUpRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/sections/footer";
import { CaseHero } from "@/components/case-study/case-hero";
import { CaseSection } from "@/components/case-study/case-section";
import { KeyDecision } from "@/components/case-study/key-decision";
import { LearnMoreNote } from "@/components/case-study/learn-more-note";
import { LightboxImage } from "@/components/case-study/lightbox-image";
import { CaseStatsBand } from "@/components/case-study/case-stats-band";
import { CaseHook } from "@/components/case-study/case-hook";
import { BackToTopButton } from "@/components/case-study/back-to-top-button";
import { LightboxVideo } from "@/components/case-study/lightbox-video";

const ACCENT = "#F5B800";
const ACCENT_DARK = "#B8860B";
const STAT_ICONS = [User, Clock, CheckCircle2, MapPin];
const rich = { b: (chunks: React.ReactNode) => <strong>{chunks}</strong> };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "caseStudyShortcat.meta" });
  const path = locale === "es" ? "/es/projects/shortcat" : "/projects/shortcat";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        en: "/projects/shortcat",
        es: "/es/projects/shortcat",
        "x-default": "/projects/shortcat",
      },
    },
    openGraph: { title: t("title"), description: t("description"), url: path },
  };
}

export default async function ShortcatCaseStudy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "caseStudyShortcat" });
  const tShared = await getTranslations({ locale, namespace: "caseStudyShared" });

  const stats = (t.raw("stats") as { label: string; value: string }[]).map(
    (stat, i) => ({ ...stat, icon: STAT_ICONS[i] }),
  );

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <CaseHero
          eyebrow={t("hero.eyebrow")}
          title={t("hero.title")}
          tagline={t("hero.tagline")}
          tags={t.raw("hero.tags")}
          image="/images/project-shortcat.png"
          imageAlt={t("hero.imageAlt")}
          accentColor={ACCENT}
        />

        <section className="px-6 py-10 md:px-10 lg:px-16">
          <CaseStatsBand stats={stats} iconColor={ACCENT_DARK} />
        </section>

        <section className="px-6 pb-6 pt-6 md:px-10 md:pb-10 md:pt-10 lg:px-16">
          <CaseHook>&ldquo;{t("hook")}&rdquo;</CaseHook>
        </section>

        <CaseSection title={t("context.title")} accentColor={ACCENT}>
          <p>{t("context.p1")}</p>
          <p>{t("context.p2")}</p>
          <div
            className="rounded-2xl border-l-4 bg-ink/5 px-6 py-5"
            style={{ borderColor: ACCENT }}
          >
            <p>{t("context.calloutP")}</p>
          </div>
        </CaseSection>

        <CaseSection title={t("whatIDesigned.title")} accentColor={ACCENT}>
          <LightboxImage
            src={
              locale === "es"
                ? "/images/shortcat-ecosystem-map-es.png"
                : "/images/shortcat-ecosystem-map.png"
            }
            alt={t("whatIDesigned.ecosystemImage.alt")}
            caption={t("whatIDesigned.ecosystemImage.caption")}
            width={1600}
            height={1421}
          />

          <p>{t("whatIDesigned.intro")}</p>

          <h3
            className="mt-4 font-display text-2xl font-semibold"
            style={{ color: ACCENT }}
          >
            {t("whatIDesigned.coreFlow.heading")}
          </h3>
          <p>{t("whatIDesigned.coreFlow.p1")}</p>
          <p>{t("whatIDesigned.coreFlow.p2")}</p>
          <KeyDecision accentColor={ACCENT} label={tShared("keyDecisionDefaultLabel")}>
            {t("whatIDesigned.coreFlow.keyDecision")}
          </KeyDecision>
          <p>{t("whatIDesigned.coreFlow.p3")}</p>
          <p>{t("whatIDesigned.coreFlow.p4")}</p>

          <LightboxImage
            src="/images/shortcat-comparison-table.gif"
            alt={t("whatIDesigned.comparisonImage.alt")}
            caption={t("whatIDesigned.comparisonImage.caption")}
            width={1920}
            height={1080}
          />

          <h3
            className="mt-4 font-display text-2xl font-semibold"
            style={{ color: ACCENT }}
          >
            {t("whatIDesigned.collaborative.heading")}
          </h3>
          <p>{t.rich("whatIDesigned.collaborative.p1", rich)}</p>
          <p>{t.rich("whatIDesigned.collaborative.p2", rich)}</p>
          <p>{t("whatIDesigned.collaborative.p3")}</p>
          <KeyDecision accentColor={ACCENT} label={tShared("keyDecisionDefaultLabel")}>
            {t("whatIDesigned.collaborative.keyDecision")}
          </KeyDecision>

          <LearnMoreNote accentColor={ACCENT}>
            {t("whatIDesigned.learnMore")}
          </LearnMoreNote>

          <h3
            className="mt-4 font-display text-2xl font-semibold"
            style={{ color: ACCENT }}
          >
            {t("whatIDesigned.projectsCost.heading")}
          </h3>
          <p>{t.rich("whatIDesigned.projectsCost.p1", rich)}</p>
          <KeyDecision accentColor={ACCENT} label={tShared("keyDecisionDefaultLabel")}>
            {t("whatIDesigned.projectsCost.keyDecision")}
          </KeyDecision>
          {t.has("whatIDesigned.projectsCost.p2") && (
            <p>{t("whatIDesigned.projectsCost.p2")}</p>
          )}

          <LightboxVideo
            src="/images/shortcat-projects-cost-management.mp4"
            caption={t("whatIDesigned.projectsCost.videoCaption")}
            autoPlayOnView
          />

          <h3
            className="mt-4 font-display text-2xl font-semibold"
            style={{ color: ACCENT }}
          >
            {t("whatIDesigned.additionalModules.heading")}
          </h3>
          <p>{t("whatIDesigned.additionalModules.p1")}</p>
          {(["marketplace", "academy", "premium"] as const).map(
            (key) =>
              t.has(`whatIDesigned.additionalModules.${key}`) && (
                <p key={key}>
                  {t.rich(`whatIDesigned.additionalModules.${key}`, rich)}
                </p>
              ),
          )}
        </CaseSection>

        <CaseSection title={t("whyDifferent.title")} accentColor={ACCENT}>
          <p>{t("whyDifferent.p1")}</p>
          <p>{t("whyDifferent.p2")}</p>
        </CaseSection>

        <CaseSection title={t("whatILearned.title")} accentColor={ACCENT}>
          <p>{t("whatILearned.p1")}</p>
          {t.has("whatILearned.p2") && <p>{t("whatILearned.p2")}</p>}
          <p className="font-display text-xl font-semibold text-ink">
            {t("whatILearned.highlight")}
          </p>
          <p>
            {t("whatILearned.liveProductPrefix")}{" "}
            <a
              href="https://clientes.shortcat.ai/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-display font-semibold underline underline-offset-4"
              style={{ color: ACCENT_DARK }}
            >
              {t("whatILearned.liveProductLabel")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            .
          </p>
        </CaseSection>

        <BackToTopButton accentColor={ACCENT} />
      </main>
      <Footer />
    </div>
  );
}
