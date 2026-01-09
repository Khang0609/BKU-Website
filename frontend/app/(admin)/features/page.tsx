"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ToggleLeft,
  ToggleRight,
  Settings,
  AlertTriangle,
  ShieldCheck,
  Mail,
  Database,
} from "lucide-react";

interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  category: "SYSTEM" | "USER" | "BETA";
  icon: any;
}

export default function FeaturesPage() {
  const [features, setFeatures] = useState<FeatureFlag[]>([
    {
      id: "f1",
      name: "Maintenance Mode",
      description:
        "Put the entire system into maintenance mode. Only admins can access.",
      isEnabled: false,
      category: "SYSTEM",
      icon: AlertTriangle,
    },
    {
      id: "f2",
      name: "New Dashboard Layout",
      description: "Enable the experimental V2 dashboard layout for all users.",
      isEnabled: true,
      category: "BETA",
      icon: Settings,
    },
    {
      id: "f3",
      name: "Two-Factor Authentication",
      description: "Enforce 2FA for all staff and lecturer accounts.",
      isEnabled: true,
      category: "USER",
      icon: ShieldCheck,
    },
    {
      id: "f4",
      name: "Email Notifications",
      description: "Send automated email notifications for system events.",
      isEnabled: true,
      category: "SYSTEM",
      icon: Mail,
    },
    {
      id: "f5",
      name: "Legacy Database Sync",
      description: "Sync data with the old Oracle database every hour.",
      isEnabled: false,
      category: "SYSTEM",
      icon: Database,
    },
  ]);

  const toggleFeature = (id: string) => {
    setFeatures(
      features.map((f) =>
        f.id === id ? { ...f, isEnabled: !f.isEnabled } : f,
      ),
    );
  };

  return (
    <div className="mx-auto max-w-5xl p-8">
      <header className="mb-10">
        <h1 className="title-xl font-bold text-gray-800">Feature Control</h1>
        <p className="subtitle-xl mt-1 text-gray-500">
          Manage feature flags and system toggles
        </p>
      </header>

      <div className="space-y-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex items-center justify-between rounded-xl border p-6 transition-all duration-200 ${
                feature.isEnabled
                  ? "border-blue-200 bg-white shadow-md shadow-blue-500/5"
                  : "border-gray-200 bg-gray-50 opacity-90"
              } `}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`rounded-lg p-3 ${feature.isEnabled ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-500"}`}
                >
                  <Icon size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-gray-800">
                      {feature.name}
                    </h3>
                    <span
                      className={`rounded border px-2 py-0.5 text-[10px] font-bold uppercase ${
                        feature.category === "SYSTEM"
                          ? "border-red-100 bg-red-50 text-red-600"
                          : feature.category === "BETA"
                            ? "border-purple-100 bg-purple-50 text-purple-600"
                            : "border-green-100 bg-green-50 text-green-600"
                      } `}
                    >
                      {feature.category}
                    </span>
                  </div>
                  <p className="mt-1 max-w-lg text-sm text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleFeature(feature.id)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${feature.isEnabled ? "bg-blue-600" : "bg-gray-300"} `}
              >
                <span className="sr-only">Enable {feature.name}</span>
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${feature.isEnabled ? "translate-x-7" : "translate-x-1"} `}
                />
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 flex items-start gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <AlertTriangle className="mt-0.5 shrink-0 text-yellow-600" size={20} />
        <div>
          <h4 className="text-sm font-bold text-yellow-800">Caution</h4>
          <p className="mt-0.5 text-sm text-yellow-700">
            Toggling &quot;System&quot; features may result in temporary service
            interruptions. Please ensure you have approval before making
            changes.
          </p>
        </div>
      </div>
    </div>
  );
}
