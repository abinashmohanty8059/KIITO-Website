import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import EngineeringSection from "@/components/EngineeringSection";
import TeamSection from "@/components/TeamSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WidgetScreen from "@/components/screens/WidgetScreen";
import NotificationScreen from "@/components/screens/NotificationScreen";
import FacultyScreen from "@/components/screens/FacultyScreen";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="ambient-bg" />
      <div className="gradient-wave" />
      <div className="noise-overlay" />

      <div className="relative z-10">
        <HeroSection />

        <FeatureSection
          title="Your Day at a Glance"
          description="See upcoming classes directly from your home screen without opening the app. KIITO's intelligent widget keeps you informed with real-time schedule updates, attendance stats, and upcoming deadlines — all at a glance."
          floatingCards={[
            { label: "Attendance", value: "94.2%", detail: "Above average", position: "top-right" },
            { label: "Next Class", value: "Physics Lab", detail: "in 35 min", position: "bottom-left" },
          ]}
        >
          <WidgetScreen />
        </FeatureSection>

        <FeatureSection
          title="Smart Academic Notifications"
          description="KIITO automatically notifies you about upcoming classes, attendance alerts, and schedule changes. Never miss a lecture or deadline — intelligent reminders arrive exactly when you need them."
          reverse
          floatingCards={[
            { label: "Streak", value: "12 Days", detail: "No missed classes", position: "top-left" },
            { label: "Alert", value: "Room Changed", detail: "EE-201 → EE-305", position: "bottom-right" },
          ]}
        >
          <NotificationScreen />
        </FeatureSection>

        <FeatureSection
          title="Faculty Directory & Details"
          description="Access faculty schedules, room numbers, and contact information instantly. KIITO aggregates scattered university data into a clean, searchable directory so you always know where to find your professors."
          floatingCards={[
            { label: "Faculty", value: "Dr. Sharma", detail: "Available now", position: "top-right" },
            { label: "Office", value: "Room 312", detail: "CS Block", position: "bottom-left" },
          ]}
        >
          <FacultyScreen />
        </FeatureSection>

        <EngineeringSection />
        <TeamSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
