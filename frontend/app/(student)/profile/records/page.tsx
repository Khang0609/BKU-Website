import { RecordProvider } from "@/app/(student)/_context/RecordContext";
import { RecordPageContent } from "./RecordPageContent";
import { getRecordInitialDataServer } from "@/services/records.service";

export default async function StudentRecordsPage() {
  const initialData = await getRecordInitialDataServer();

  return (
    <RecordProvider initialData={initialData}>
      <RecordPageContent />
    </RecordProvider>
  );
}
