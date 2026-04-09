import { serverFetch } from "@/lib/server-api";
import { ProfileData } from "@/app/(student)/_types/profile/record";

export const getRecordInitialDataServer = async () => {
  const [profile, provinces, countries, ethnics, religions] = await Promise.all([
    serverFetch<ProfileData>("/profile/student/me"),
    serverFetch<any[]>("/location/provinces"),
    serverFetch<any[]>("/location/countries"),
    serverFetch<any[]>("/location/ethnics"),
    serverFetch<any[]>("/location/religions"),
  ]);

  return {
    profile,
    catalogs: {
      provinces: provinces || [],
      countries: countries || [],
      ethnics: ethnics || [],
      religions: religions || [],
    }
  };
};
