import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-red-600">
          403 - Access Denied
        </h1>
        <p className="mb-6 text-gray-600">
          You do not have permission to access this page.
        </p>
        <Link
          href="/"
          className="inline-block rounded-md bg-[#032b91] px-6 py-2 font-semibold text-white transition-colors duration-200 hover:bg-[#021f6b]"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
