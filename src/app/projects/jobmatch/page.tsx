import type { Metadata } from "next";
import { User, Clock, CheckCircle2, ArrowUpRight } from "lucide-react";
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

export const metadata: Metadata = {
  title: "JobMatch — Case Study | Lucía Martos",
  description:
    "Designing an employment platform for three user types — without turning it into three different products. A case study by Lucía Martos, UX/UI Designer.",
};

const STATS = [
  { icon: User, label: "Role", value: "UX/UI Designer" },
  { icon: Clock, label: "Duration", value: "4 months" },
  { icon: CheckCircle2, label: "Status", value: "In production" },
];

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

export default function JobMatchCaseStudy() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <CaseHero
          eyebrow="Case study"
          title="JobMatch"
          tagline="Designing an employment platform for three user types — without turning it into three different products."
          tags={["Product Strategy", "UX Research", "UX/UI Design"]}
          image="/images/project-jobmatch.png"
          imageAlt="JobMatch — employment platform"
          accentColor={PRIMARY}
          darkColor={DARK}
        />

        <section className="px-6 py-10 md:px-10 lg:px-16">
          <CaseStatsBand stats={STATS} iconColor={PRIMARY} />
        </section>

        <section className="px-6 pb-24 pt-6 md:px-10 md:pb-32 md:pt-10 lg:px-16">
          <CaseHook>
            &ldquo;What if finding a job were as easy as swiping on Tinder?
            That&apos;s Jobmatch — and this is how I designed it.&rdquo;
          </CaseHook>
        </section>

        <CaseDisclaimer accentColor={PRIMARY}>
          This case study reflects the product and flows designed during my
          involvement in the project. Some interfaces and user flows may have
          evolved or been modified during development after my participation.
        </CaseDisclaimer>

        <CaseSection title="The challenge" accentColor={PRIMARY}>
          <p>
            Finding talent is still a complex process for everyone involved —
            and there are more than two sides to it.
          </p>
          <p>
            Jobmatch was built to connect three profiles with different
            needs: companies looking to optimize their hiring process,
            candidates seeking faster and more transparent opportunities, and
            independent recruiters managing multiple processes at the same
            time.
          </p>
          <p>
            The real challenge wasn&apos;t designing a job platform — it was
            designing a single ecosystem that served all three without
            adding complexity or sacrificing anyone&apos;s experience.
          </p>
        </CaseSection>

        <CaseSection title="The value proposition" accentColor={PRIMARY}>
          <p>
            Jobmatch positions itself as the &ldquo;job Tinder&rdquo; — and
            it&apos;s not just a tagline. The platform doesn&apos;t ask you
            to search for jobs: it recommends positions you might match with
            based on your profile.
          </p>
          <KeyDecision accentColor={ACCENT}>
            You can have more than one active professional profile at a time
            — applying as an administrator and also as a designer — without
            one identity interfering with the other.
          </KeyDecision>
          <p>
            The Tinder metaphor translates directly into the interface: in
            the candidate dashboard, job openings appear as cards you can
            swipe right to apply or left to pass. A familiar mechanic that
            removes the friction of applying and makes exploring
            opportunities feel natural, not tedious.
          </p>

          <LightboxImage
            src="/images/jobmatch-swipe-to-apply-interaction.png"
            alt="JobMatch swipe-to-apply interaction in the candidate dashboard"
            caption="Swipe-to-apply interaction — Candidates browse suggested opportunities and swipe to apply."
            width={2000}
            height={1500}
          />
        </CaseSection>

        <CaseSection title="My advantage before starting" accentColor={PRIMARY}>
          <p>
            I didn&apos;t come to this project with a blank slate — I came
            with two perspectives that rarely exist in the same designer.
          </p>
          <p>
            As a business administrator, I experienced the recruiting
            process from the company side: defining profiles, evaluating
            candidates, coordinating hiring. As someone who actively
            searched for work for over a year, I experienced it from the
            other side too: the frustrations, the uncertainty, the lack of
            feedback.
          </p>
          <p>
            That dual perspective wasn&apos;t a biographical detail — it was
            the foundation for every design decision I made. Before drawing
            a single screen, I already knew what hurt on both ends of the
            process.
          </p>
        </CaseSection>

        <CaseSection
          title="Process: understand before designing"
          accentColor={PRIMARY}
        >
          <p>
            From that foundation I began a research phase to validate
            assumptions and better understand the business.
          </p>
          <p>
            I developed a competitive benchmark, proto-personas, information
            architecture, user flows, and feature prioritization.
          </p>
          <p>
            The most valuable part of this phase was working closely with a
            recruiting specialist who validated the proposed flows against
            real operational scenarios. I didn&apos;t design on assumptions
            — I designed on verified operational logic.
          </p>

          <LightboxImage
            src="/images/jobmatch-information-architecture.png"
            alt="JobMatch information architecture map"
            caption="Information architecture"
            width={2000}
            height={1500}
          />

          <LightboxImage
            src="/images/jobmatch-talent-application-flow.png"
            alt="JobMatch proposed user flow for the talent profile"
            caption="User flow for discovering and applying to suggested job opportunities."
            width={2000}
            height={1500}
          />

          <LightboxImage
            src="/images/jobmatch-profile-evaluation-selection.png"
            alt="JobMatch user flow for candidate evaluation and selection"
            caption="User flow for candidate evaluation and selection."
            width={2000}
            height={1500}
          />
        </CaseSection>

        <CaseSection
          title="The core design challenge: one ecosystem, not three products"
          accentColor={PRIMARY}
        >
          <p>
            Designing for three profiles in one platform has a clear risk:
            that each profile feels like the platform wasn&apos;t made for
            them.
          </p>
          <p>
            The key was nailing the main flows for each profile with
            precision — not just defining what each user could do, but how
            they&apos;d do it, in what order, what information they needed
            at each step, and where the three flows intersected without
            colliding.
          </p>

          <div className="flex flex-col gap-3">
            <ProfileItem label="Candidates">
              discover match-recommended vacancies, apply with a gesture,
              manage multiple professional profiles simultaneously.
            </ProfileItem>
            <ProfileItem label="Companies">
              post vacancies, manage hiring processes, and evaluate
              candidates with full pipeline visibility.
            </ProfileItem>
            <ProfileItem label="Independent recruiters">
              manage multiple simultaneous processes while collaborating
              with different companies from a single place.
            </ProfileItem>
          </div>

          <p>
            Every design decision was evaluated against all three profiles
            before being validated.
          </p>

          <LightboxImage
            src="/images/jobmatch-ecosystem.png"
            alt="JobMatch ecosystem — candidates, companies, and recruiters"
            caption="JobMatch ecosystem — how candidates, companies, and recruiters connect within a single platform."
            width={2000}
            height={1500}
          />
        </CaseSection>

        <CaseSection title="From flow to interface" accentColor={PRIMARY}>
          <p>
            With the strategy and flows defined, I developed the full
            visual experience of the platform: high-fidelity interfaces,
            design system, reusable component library, and interaction
            patterns.
          </p>
          <KeyDecision accentColor={ACCENT}>
            I also participated in visual identity decisions. One of them
            was introducing purple as the accent color — a deliberate
            choice to stand out in a market dominated by blues and greens,
            conveying innovation and closeness. That decision became a core
            part of Jobmatch&apos;s visual identity.
          </KeyDecision>

          <LightboxVideo
            src="/images/jobmatch-design-system.mp4"
            caption="Design system and reusable component library."
            autoPlayOnView
          />
        </CaseSection>

        <CaseSection
          title="Kuska: the AI with a face and personality"
          accentColor={PRIMARY}
        >
          <p>
            The platform needed more than functionality — it needed
            presence.
          </p>
          <p>
            The team had the idea of an AI assistant that would guide users
            throughout the entire process. My job was to give it a face and
            a personality consistent with the product&apos;s identity.
          </p>
          <p>
            Its name is Kuska — a Quechua word meaning &ldquo;together&rdquo;
            or &ldquo;united&rdquo; — reflecting the platform&apos;s core
            mission. Inspired by classic assistants like Clippy but designed
            not to be intrusive, Kuska evolved visually from an orange tiger
            to an otorongo (jaguar) — an emblematic Peruvian animal — strengthening
            the connection between the product and its cultural roots.
          </p>
          <p>
            I explored multiple concepts using AI tools until reaching the
            final version.
          </p>

          <LightboxImage
            src="/images/jobmatch-kuska.png"
            alt="Kuska's visual evolution — from early concepts to the final version"
            caption="Kuska's visual evolution — from early concepts to the final version."
            width={2000}
            height={1500}
          />
        </CaseSection>

        <CaseSection title="Result" accentColor={PRIMARY}>
          <p>
            Jobmatch is already on the market. Much of the information
            architecture, main flows, design system, and visual identity
            developed during this project are present in the final product
            — including Kuska.
          </p>
          <p>
            You can explore the live product at{" "}
            <a
              href="https://www.jmperu.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-display font-semibold underline underline-offset-4"
              style={{ color: PRIMARY }}
            >
              jmperu.com
              <ArrowUpRight className="h-4 w-4" />
            </a>
            .
          </p>

          <LightboxVideo
            src="/images/jobmatch-talent-profile-creation.mp4"
            caption="Talent profile creation flow in the final product."
          />
        </CaseSection>

        <CaseSection title="What I learned" accentColor={PRIMARY}>
          <p>
            This project confirmed something that has followed me throughout
            my career: the best products don&apos;t just come from
            understanding users. They come from understanding the business
            behind them at the same time.
          </p>
          <p className="font-display text-xl font-semibold text-ink">
            Having lived the recruiting process from both sides — as a
            company and as a candidate — allowed me to make design
            decisions that didn&apos;t depend only on research. They
            depended on having been there.
          </p>
        </CaseSection>

        <BackToTopButton accentColor={PRIMARY} />
      </main>
      <Footer />
    </div>
  );
}
