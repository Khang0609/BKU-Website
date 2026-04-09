import { User } from "lucide-react";
import { ProfileMainProvider } from "@/app/(student)/_context/ProfileMainContext";
import { PageTitle } from "@/components/ui/navigation/PageTitle";
import { ProfilePageContent } from "@/app/(student)/_components/profile/main/ProfilePageContent";
import { getProfileSummaryServer } from "@/services/profile-summary.service";

const ProfilePage = async () => {
  const summary = await getProfileSummaryServer();

  return (
    <div className="relative min-h-full p-6 text-slate-800">
      <div className="mx-auto max-w-7xl space-y-6">
        <PageTitle
          title="Student Profile"
          subtitle="Manage your personal information, records, and academic status."
          icon={User}
          className="mb-8"
        />

        <ProfileMainProvider initialData={summary}>
          <ProfilePageContent />
        </ProfileMainProvider>
      </div>
    </div>
  );
};

export default ProfilePage;
