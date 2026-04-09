import { ProfileProvider } from "@/app/(student)/_context/ProfileContext";
import { InfoPageContent } from "./InfoPageContent";
import { getProfileInfoServer } from "@/services/profile-info.service";

export default async function StudentDetailedInfoPage() {
  const initialData = await getProfileInfoServer();

  return (
    <ProfileProvider initialData={initialData}>
      <InfoPageContent />
    </ProfileProvider>
  );
}
