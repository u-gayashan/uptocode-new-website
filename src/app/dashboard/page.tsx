import ProjectsCard from "@/components/dashboard/cards/ProjectsCard";
import ComplianceChatsCard from "@/components/dashboard/cards/ComplianceChatsCard";
import ComplianceAssistantCard from "@/components/dashboard/cards/ComplianceAssistantCard";
import RecentUpdatesCard from "@/components/dashboard/cards/RecentUpdatesCard";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-2 gap-5 h-full" style={{ gridTemplateRows: "1fr 1fr" }}>
      <ProjectsCard />
      <ComplianceChatsCard />
      <ComplianceAssistantCard />
      <RecentUpdatesCard />
    </div>
  );
}
