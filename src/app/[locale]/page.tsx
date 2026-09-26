import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { HowCanIHelp } from "@/components/sections/how-can-i-help";
import { Projects } from "@/components/sections/projects";
import { Footer } from "@/components/sections/footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <Hero />
        <About />
        <HowCanIHelp />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
