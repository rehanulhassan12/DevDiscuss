
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import LatestQuestions from "@/components/LatestQuestions";
import TopContributer from "@/components/ui/TopContributer";
import JoinNowSection from "@/components/JoinNowSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <LatestQuestions />
      <TopContributer />
      <JoinNowSection />
    </main>
  );
}
