"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit,
  Trash,
  Shield,
  CheckCircle,
  XCircle,
  Users,
} from "lucide-react";
import { UserRole } from "@/context/AuthContext";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: "ACTIVE" | "INACTIVE";
  lastLogin: string;
}

const MOCK_USERS: User[] = [
  {
    id: "U001",
    fullName: "Nguyen Van A",
    email: "a.nguyen@hcmut.edu.vn",
    role: "STUDENT",
    status: "ACTIVE",
    lastLogin: "2 mins ago",
  },
  {
    id: "U002",
    fullName: "Dr. Tran Thi B",
    email: "b.tran@hcmut.edu.vn",
    role: "LECTURER",
    status: "ACTIVE",
    lastLogin: "1 hour ago",
  },
  {
    id: "U003",
    fullName: "Admin System",
    email: "admin@hcmut.edu.vn",
    role: "ADMIN",
    status: "ACTIVE",
    lastLogin: "Just now",
  },
  {
    id: "U004",
    fullName: "Office Staff C",
    email: "c.office@hcmut.edu.vn",
    role: "OFFICE",
    status: "INACTIVE",
    lastLogin: "3 days ago",
  },
  {
    id: "U005",
    fullName: "Le Van D",
    email: "d.le@hcmut.edu.vn",
    role: "STUDENT",
    status: "ACTIVE",
    lastLogin: "5 hours ago",
  },
];

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Filter Logic
  const filteredUsers = MOCK_USERS.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="mx-auto max-w-7xl p-8">
      <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="mt-1 text-gray-500">
            Manage system access and permissions
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-white shadow-md transition-colors hover:bg-blue-700"
        >
          <Plus size={18} />
          Create User
        </button>
      </header>

      {/* Controls */}
      <div className="mb-6 flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm md:flex-row">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-gray-600 transition-colors hover:bg-gray-50">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-xs font-semibold uppercase text-gray-500">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Login</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="group transition-colors hover:bg-gray-50/50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
                        {user.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {user.fullName}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                        user.role === "ADMIN"
                          ? "border-purple-100 bg-purple-50 text-purple-700"
                          : user.role === "LECTURER"
                            ? "border-indigo-100 bg-indigo-50 text-indigo-700"
                            : user.role === "OFFICE"
                              ? "border-amber-100 bg-amber-50 text-amber-700"
                              : "border-blue-100 bg-blue-50 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.status === "ACTIVE" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                        <CheckCircle size={12} /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
                        <XCircle size={12} /> Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600">
                        <Edit size={16} />
                      </button>
                      <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600">
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <Users size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900">
              No users found
            </h3>
            <p>Try adjusting your search terms</p>
          </div>
        )}
      </div>

      {/* Simple Create User Modal (Placeholder) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <h2 className="mb-4 text-xl font-bold">Create New User</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Nguyen Van A"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="user@hcmut.edu.vn"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500">
                  <option value="STUDENT">Student</option>
                  <option value="LECTURER">Lecturer</option>
                  <option value="OFFICE">Office</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Create Account
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
