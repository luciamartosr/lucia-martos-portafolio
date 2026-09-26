import type { Metadata } from "next";
import { User, Clock, CheckCircle2, MapPin, ArrowUpRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/sections/footer";
import { CaseHero } from "@/components/case-study/case-hero";
import { CaseSection } from "@/components/case-study/case-section";
import { KeyDecision } from "@/components/case-study/key-decision";
import { CaseStatsBand } from "@/components/case-study/case-stats-band";
import { CaseHook } from "@/components/case-study/case-hook";
import { CaseDisclaimer } from "@/components/case-study/case-disclaimer";
import { BackToTopButton } from "@/components/case-study/back-to-top-button";
import { LightboxImage } from "@/components/case-study/lightbox-image";
import { LightboxVideo } from "@/components/case-study/lightbox-video";

const PRIMARY = "#EA580C";
const DARK = "#27272A";
const ACCENT = "#6D28D9";
const STAT_ICONS = [User, Clock, CheckCircle2, MapPin];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "caseStudyJobmatch.meta" });
  const path = locale === "es" ? "/es/projects/jobmatch" : "/projects/jobmatch";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        en: "/projects/jobmatch",
        es: "/es/projects/jobmatch",
        "x-default": "/projects/jobmatch",
      },
    },
    openGraph: { title: t("title"), description: t("description"), url: path },
  };
}

function ProfileItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <p>
      <span
        className="mr-2 inline-block h-2 w-2 rounded-full align-middle"
        style={{ backgroundColor: ACCENT }}
      />
      <span className="font-display font-semibold text-ink">{label}: </span>
      {children}
    </p>
  );
}

export default async function JobMatchCaseStudy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "caseStudyJobmatch" });
  const tShared = await getTranslations({ locale, namespace: "caseStudyShared" });

  const stats = (t.raw("stats") as { label: string; value: string }[]).map(
    (stat, i) => ({ ...stat, icon: STAT_ICONS[i] }),
  );
  const lessons = t.raw("whatILearned.lessons") as {
    number: string;
    title: string;
    description: string;
  }[];

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <CaseHero
          eyebrow={t("hero.eyebrow")}
          title={t("hero.title")}
          tagline={t("hero.tagline")}
          tags={t.raw("hero.tags")}
          image="/images/project-jobmatch.png"
          imageAlt={t("hero.imageAlt")}
          accentColor={PRIMARY}
          darkColor={DARK}
        />

        <section className="px-6 py-10 md:px-10 lg:px-16">
          <CaseStatsBand stats={stats} iconColor={PRIMARY} />
        </section>

        <section className="px-6 pb-6 pt-6 md:px-10 md:pb-10 md:pt-10 lg:px-16">
          <CaseHook>&ldquo;{t("hook")}&rdquo;</CaseHook>
        </section>

        <CaseSection title={t("challenge.title")} accentColor={PRIMARY}>
          <p>{t("challenge.p1")}</p>
          <p>{t("challenge.p2")}</p>
          <p>{t("challenge.p3")}</p>

          <CaseDisclaimer
            heading={tShared("disclaimerHeading")}
            accentColor={PRIMARY}
          >
            {t("challenge.disclaimer")}
          </CaseDisclaimer>
        </CaseSection>

        <CaseSection title={t("valueProposition.title")} accentColor={PRIMARY}>
          <p>{t("valueProposition.p1")}</p>
          <KeyDecision accentColor={ACCENT} label={tShared("keyDecisionDefaultLabel")}>
            {t("valueProposition.keyDecision")}
          </KeyDecision>
          <p>{t("valueProposition.p2")}</p>

          <LightboxImage
            src="/images/jobmatch-swipe-to-apply-interaction.png"
            alt={t("valueProposition.image.alt")}
            caption={t("valueProposition.image.caption")}
            width={2000}
            height={1500}
          />
        </CaseSection>

        <CaseSection title={t("advantage.title")} accentColor={PRIMARY}>
          <p>{t("advantage.p1")}</p>
          <p>{t("advantage.p2")}</p>
          <p>{t("advantage.p3")}</p>
        </CaseSection>

        <CaseSection title={t("process.title")} accentColor={PRIMARY}>
          <p>{t("process.p1")}</p>
          <p>{t("process.p2")}</p>
          <p>{t("process.p3")}</p>

          <LightboxImage
            src="/images/jobmatch-information-architecture.png"
            alt={t("process.image1.alt")}
            caption={t("process.image1.caption")}
            width={2000}
            height={1500}
          />

          <LightboxImage
            src="/images/jobmatch-talent-application-flow.png"
            alt={t("process.image2.alt")}
            caption={t("process.image2.caption")}
            width={2000}
            height={1500}
          />

          <LightboxImage
            src="/images/jobmatch-profile-evaluation-selection.png"
            alt={t("process.image3.alt")}
            caption={t("process.image3.caption")}
            width={2000}
            height={1500}
          />
        </CaseSection>

        <CaseSection title={t("coreDesignChallenge.title")} accentColor={PRIMARY}>
          <p>{t("coreDesignChallenge.p1")}</p>
          <p>{t("coreDesignChallenge.p2")}</p>

          <div className="flex flex-col gap-3">
            <ProfileItem label={t("coreDesignChallenge.profiles.candidates.label")}>
              {t("coreDesignChallenge.profiles.candidates.description")}
            </ProfileItem>
            <ProfileItem label={t("coreDesignChallenge.profiles.companies.label")}>
              {t("coreDesignChallenge.profiles.companies.description")}
            </ProfileItem>
            <ProfileItem label={t("coreDesignChallenge.profiles.recruiters.label")}>
              {t("coreDesignChallenge.profiles.recruiters.description")}
            </ProfileItem>
          </div>

          <p>{t("coreDesignChallenge.p3")}</p>

          <LightboxImage
            src="/images/jobmatch-ecosystem.png"
            alt={t("coreDesignChallenge.image.alt")}
            caption={t("coreDesignChallenge.image.caption")}
            width={2000}
            height={1500}
          />
        </CaseSection>

        <CaseSection title={t("flowToInterface.title")} accentColor={PRIMARY}>
          <p>{t("flowToInterface.p1")}</p>
          <KeyDecision accentColor={ACCENT} label={t("flowToInterface.keyDecisionLabel")}>
            {t("flowToInterface.keyDecision")}
          </KeyDecision>

          <LightboxVideo
            src="/images/jobmatch-design-system.mp4"
            caption={t("flowToInterface.videoCaption")}
            autoPlayOnView
          />
        </CaseSection>

        <CaseSection title={t("kuska.title")} accentColor={PRIMARY}>
          <p>{t("kuska.p1")}</p>
          <p>{t("kuska.p2")}</p>
          <p>{t("kuska.p3")}</p>
          <p>{t("kuska.p4")}</p>

          <LightboxImage
            src="/images/jobmatch-kuska.png"
            alt={t("kuska.image.alt")}
            caption={t("kuska.image.caption")}
            width={2000}
            height={1500}
          />
        </CaseSection>

        <CaseSection title={t("result.title")} accentColor={PRIMARY}>
          <p>{t("result.p1")}</p>
          <p>
            {t("result.liveProductPrefix")}{" "}
            <a
              href="https://www.jmperu.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-display font-semibold underline underline-offset-4"
              style={{ color: PRIMARY }}
            >
              {t("result.liveProductLabel")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            .
          </p>

          <LightboxVideo
            src="/images/jobmatch-talent-profile-creation.mp4"
            caption={t("result.videoCaption")}
            autoPlayOnView
          />
        </CaseSection>

        <CaseSection title={t("whatILearned.title")} accentColor={PRIMARY}>
          <p>{t("whatILearned.intro")}</p>

          <div className="flex flex-col">
            {lessons.map((lesson) => (
              <div
                key={lesson.number}
                className="border-b border-ink/10 py-5 first:pt-0 last:border-b-0 last:pb-0"
              >
                <p
                  className="font-sans text-sm font-semibold"
                  style={{ color: PRIMARY }}
                >
                  {lesson.number}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-ink">
                  {lesson.title}
                </h3>
                <p className="mt-1 text-ink-soft">{lesson.description}</p>
              </div>
            ))}
          </div>
        </CaseSection>

        <BackToTopButton accentColor={PRIMARY} />
      </main>
      <Footer />
    </div>
  );
}
