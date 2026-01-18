import { useState, useEffect, useCallback } from "react";
import { Catalog, ProfileData } from "@/app/(student)/_types/profile/record";
import { BASE_URL } from "@/lib/api";
import { authFetch } from "@/lib/authFetch";

export const useProfileData = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [catalogs, setCatalogs] = useState<Catalog>({
    provinces: [],
    countries: [],
    ethnics: [],
    religions: [],
    wards: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [familyTab, setFamilyTab] = useState<"parents" | "guardian">("parents");

  const fetchInitialData = useCallback(async () => {
    try {
      const [profRes, provRes, countRes, ethRes, relRes] = await Promise.all([
        authFetch(`${BASE_URL}/profile/student/me`),
        authFetch(`${BASE_URL}/location/provinces`),
        authFetch(`${BASE_URL}/location/countries`),
        authFetch(`${BASE_URL}/location/ethnics`),
        authFetch(`${BASE_URL}/location/religions`),
      ]);

      if (!profRes.ok) throw new Error("Failed to load profile");

      const pData = await profRes.json();
      const provData = await provRes.json();
      const countData = await countRes.json();
      const ethData = await ethRes.json();
      const relData = await relRes.json();

      setProfile(pData);

      setCatalogs({
        provinces: Array.isArray(provData)
          ? provData.map((p: any) => ({ value: p.id, label: p.name }))
          : [],
        countries: Array.isArray(countData)
          ? countData.map((c: any) => ({ value: c.id, label: c.name }))
          : [],
        ethnics: Array.isArray(ethData)
          ? ethData.map((e: any) => ({
              value: e.id,
              label: e.name_vi || e.name_en || e.label || "Unknown",
            }))
          : [],
        religions: Array.isArray(relData)
          ? relData.map((r: any) => ({
              value: r.id,
              label: r.name_vi || r.name_en || r.label || "Unknown",
            }))
          : [],
        wards: {},
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const fetchWards = async (provinceId: number) => {
    if (catalogs.wards[provinceId]) return catalogs.wards[provinceId];
    try {
      const res = await authFetch(
        `${BASE_URL}/location/provinces/${provinceId}/wards`,
      );
      if (res.ok) {
        const data = await res.json();
        const mappedWards = Array.isArray(data)
          ? data.map((w: any) => ({
              value: w.id,
              label: w.name_vi || w.name_en || w.label || w.name || "Unknown",
            }))
          : [];
        setCatalogs((prev) => ({
          ...prev,
          wards: {
            ...prev.wards,
            [provinceId]: mappedWards,
          },
        }));
        return mappedWards;
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  };

  return {
    // #region State
    profile,
    catalogs,
    isLoading,
    familyTab,
    setProfile,
    setCatalogs,
    setIsLoading,
    setFamilyTab,
    // #endregion
    // #region Function
    fetchInitialData,
    fetchWards,
    // #endregion
  };
};
