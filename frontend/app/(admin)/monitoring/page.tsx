"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Activity, Cpu, HardDrive, Users, Clock } from "lucide-react";

export default function MonitoringPage() {
  // Mock Data
  const trafficData = [
    { time: "00:00", users: 120, bandwidth: 45 },
    { time: "04:00", users: 80, bandwidth: 30 },
    { time: "08:00", users: 1500, bandwidth: 550 },
    { time: "12:00", users: 2300, bandwidth: 890 },
    { time: "16:00", users: 1800, bandwidth: 670 },
    { time: "20:00", users: 950, bandwidth: 320 },
    { time: "23:59", users: 400, bandwidth: 120 },
  ];

  const serverHealth = [
    { name: "Server A", cpu: 45, ram: 60 },
    { name: "Server B", cpu: 30, ram: 45 },
    { name: "Server C", cpu: 85, ram: 90 }, // Creating a high load scenario
    { name: "Server D", cpu: 20, ram: 25 },
    { name: "DB Cluster", cpu: 55, ram: 75 },
  ];

  const stats = [
    {
      label: "Active Users",
      value: "2,345",
      sub: "+12% vs last hour",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Avg. Response Time",
      value: "124ms",
      sub: "Normal",
      icon: Clock,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      label: "CPU Usage",
      value: "48%",
      sub: "Peak: 85%",
      icon: Cpu,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      label: "Memory Usage",
      value: "6.2GB",
      sub: "Total: 16GB",
      icon: HardDrive,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="title-xl font-bold text-gray-800">
            System Monitoring
          </h1>
          <p className="subtitle-xl mt-1 text-gray-500">
            Real-time infrastructure health and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
          <Activity size={16} />
          System Operational
        </div>
      </header>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </p>
                  <h3 className="mt-1 text-2xl font-bold text-gray-800">
                    {stat.value}
                  </h3>
                </div>
                <div className={`rounded-lg p-3 ${stat.bg} ${stat.color}`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="mt-4 text-xs font-medium text-gray-400">
                {stat.sub}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Traffic Chart (Takes up 2 columns) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2"
        >
          <h2 className="mb-6 text-lg font-bold text-gray-800">
            Network Traffic & Users
          </h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorBandwidth"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f3f4f6"
                />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#2563eb"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
                <Area
                  type="monotone"
                  dataKey="bandwidth"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorBandwidth)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Server Health (Takes up 1 column) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
        >
          <h2 className="mb-6 text-lg font-bold text-gray-800">
            Server Health
          </h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serverHealth} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#f3f4f6"
                />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={80}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="cpu"
                  fill="#8b5cf6"
                  radius={[0, 4, 4, 0]}
                  barSize={10}
                  name="CPU %"
                />
                <Bar
                  dataKey="ram"
                  fill="#f97316"
                  radius={[0, 4, 4, 0]}
                  barSize={10}
                  name="RAM %"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
