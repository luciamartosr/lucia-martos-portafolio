import type { Metadata } from "next";
import Image from "next/image";
import { User, Clock, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/sections/footer";
import { CaseHero } from "@/components/case-study/case-hero";
import { CaseSection } from "@/components/case-study/case-section";
import { KeyDecision } from "@/components/case-study/key-decision";
import { ImagePlaceholder } from "@/components/case-study/image-placeholder";
import { CaseMedia } from "@/components/case-study/case-media";
import { CaseStatsBand } from "@/components/case-study/case-stats-band";
import { CaseHook } from "@/components/case-study/case-hook";
import { BackToTopButton } from "@/components/case-study/back-to-top-button";

const ACCENT = "#F5B800";
const ACCENT_DARK = "#B8860B";

export const metadata: Metadata = {
  title: "Shortcat — Case Study | Lucía Martos",
  description:
    "ERP for procurement management in the construction sector. A case study by Lucía Martos, Lead Product Designer.",
};

const STATS = [
  { icon: User, label: "Role", value: "Lead Product Designer" },
  { icon: Clock, label: "Duration", value: "13 months" },
  { icon: CheckCircle2, label: "Status", value: "In production" },
];

export default function ShortcatCaseStudy() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <CaseHero
          eyebrow="Case study"
          title="Shortcat"
          tagline="ERP for procurement management in the construction sector."
          tags={["Complex Workflows", "UX/UI Design", "Design System"]}
          image="/images/project-shortcat.png"
          imageAlt="Shortcat — construction industry ERP platform"
          accentColor={ACCENT}
        />

        <section className="px-6 py-10 md:px-10 lg:px-16">
          <CaseStatsBand stats={STATS} iconColor={ACCENT_DARK} />
        </section>

        <section className="px-6 pb-24 pt-6 md:px-10 md:pb-32 md:pt-10 lg:px-16">
          <CaseHook>
            &ldquo;An initial brief, incomplete documentation, and workflows
            that kept changing throughout execution. This is the product I
            led for 13 months — and that is now in production.&rdquo;
          </CaseHook>
        </section>

        <CaseSection title="The context" accentColor={ACCENT}>
          <p>
            The construction sector runs on procurement. Every project
            depends on getting the right materials, from the right
            suppliers, at the right price — and on time. Most companies
            still manage this with spreadsheets, emails, and WhatsApp.
          </p>
          <p>
            Shortcat was born to change that — not just by digitizing the
            process, but by reimagining it: turning individual purchasing
            decisions into collective purchasing power.
          </p>
          <p>
            I joined as lead designer with a high-level vision already
            documented. The flows needed adjustments from day one — and kept
            evolving throughout the entire design process. My role wasn&apos;t
            just to design screens — it was to facilitate the conversations
            that turned business ideas into documented flows, and documented
            flows into a real product.
          </p>
        </CaseSection>

        <CaseSection title="What I designed" accentColor={ACCENT}>
          <p>
            I built an ERP with six interconnected systems covering the full
            procurement management cycle, focused primarily on the
            construction sector — with an architecture designed to expand
            into other sectors in the future.
          </p>

          <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
            <Image
              src="/images/shortcat-ecosystem-map.png"
              alt="Shortcat product ecosystem — six interconnected systems"
              width={1600}
              height={1840}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 813px, 100vw"
            />
          </div>

          <h3
            className="mt-4 font-display text-2xl font-semibold"
            style={{ color: ACCENT }}
          >
            Core procurement flow
          </h3>
          <p>
            From requirement creation to closing with two-way evaluation. The
            flow supports configurable conditional approvals — because
            Shortcat serves both companies where the general manager approves
            alone, and companies with multiple hierarchical levels.
          </p>
          <p>
            The most complex component was the comparison table — a grid
            where the buyer evaluates quotes from multiple suppliers per item
            and awards them granularly. Before designing a single screen, I
            met with logistics and procurement users from different
            companies to understand how they actually evaluate quotes in
            practice: which criteria matter most, in what order they decide,
            and how they think when ten suppliers are quoting on ten items
            each.
          </p>
          <KeyDecision accentColor={ACCENT}>
            Visually show which is the best proposal per item without
            forcing the choice — because in real procurement, price
            isn&apos;t always the only criterion. That decision came from
            understanding the business logic, not from a spec.
          </KeyDecision>
          <p>
            The flow closes with Shortcat Drive — document management by
            purchase order directly in the platform, eliminating email
            chaos — and a two-way evaluation where buyers and suppliers rate
            each other. I included the buyer&apos;s rating because in
            construction, knowing whether a client pays late or changes
            terms at the last minute is just as valuable as evaluating a
            supplier.
          </p>

          <CaseMedia
            src="/images/shortcat-comparison-table.gif"
            alt="Shortcat comparison table and award flow"
            caption="Comparison table and award"
          />

          <h3
            className="mt-4 font-display text-2xl font-semibold"
            style={{ color: ACCENT }}
          >
            Collaborative purchasing — the biggest differentiator
          </h3>
          <p>
            Group purchase: multiple companies pool volume to negotiate
            better prices together.
          </p>
          <p>
            Reverse auction: Shortcat identifies the most in-demand products
            across the platform and launches an auction where the price
            drops as more buyers join.
          </p>
          <p>
            Both features had earlier screens built on incomplete business
            logic. I rebuilt them from the logic up, through multiple
            sessions with the client.
          </p>
          <KeyDecision accentColor={ACCENT}>
            In group purchase, defining how much visibility each company has
            into the others. Too much information broke trust between
            competitors; too little made it impossible to coordinate the
            purchase. Finding that balance took several iterations and was a
            product decision, not an interface one.
          </KeyDecision>

          <ImagePlaceholder label="Group purchase and reverse auction screens" />

          <h3
            className="mt-4 font-display text-2xl font-semibold"
            style={{ color: ACCENT }}
          >
            Projects and cost management
          </h3>
          <p>
            What started as a &ldquo;cost center&rdquo; field inside
            Settings evolved into a full module: budgets by line item and
            sub-item, change order management, cost tracking linked to each
            line item, and a real-time execution dashboard.
          </p>
          <KeyDecision accentColor={ACCENT}>
            Separating &ldquo;Projects&rdquo; from &ldquo;Cost
            management&rdquo; into two distinct sections instead of one.
            Projects is where you define and plan — costs is where you
            control and execute. Merging them into a single screen created
            confusion about what action the user was taking at any given
            moment.
          </KeyDecision>

          <ImagePlaceholder label="Projects module and cost dashboard screens" />

          <h3
            className="mt-4 font-display text-2xl font-semibold"
            style={{ color: ACCENT }}
          >
            Additional modules designed
          </h3>
          <p>
            Three modules designed and queued for development: a redesigned
            requirements marketplace, Shortcat Academy (tutorial videos and
            downloadable templates with an admin panel), and premium
            subscription plans with webhook-based activation logic and a
            subscriber management panel.
          </p>
        </CaseSection>

        <CaseSection title="Why this project is different" accentColor={ACCENT}>
          <p>
            I didn&apos;t execute briefs — I helped write them. The most
            complex flows had no clear spec. I facilitated the sessions,
            mapped the stakeholders, defined the logic, and only then
            designed.
          </p>
          <p>
            My 13 years as a business consultant let me read the operational
            logic behind every requirement before opening Figma. That&apos;s
            why I could design a two-way evaluation, a reverse auction, or a
            line-item budget control system — not because it was handed to
            me in a document, but because I understand how these things
            actually work inside real companies.
          </p>
        </CaseSection>

        <CaseSection title="What I learned" accentColor={ACCENT}>
          <p>
            Moving forward without validating with real users isn&apos;t
            progress — it&apos;s assumption. The post-launch friction in the
            core flow confirmed what I had flagged early on. That experience
            shaped how I approach product decisions now: defend the user
            with arguments, document the reasoning, and push for early
            validation even under startup pressure.
          </p>
          <p className="font-display text-xl font-semibold text-ink">
            A product doesn&apos;t end when it ships. It ends when it works
            well for whoever uses it.
          </p>
        </CaseSection>

        <BackToTopButton accentColor={ACCENT} />
      </main>
      <Footer />
    </div>
  );
}
