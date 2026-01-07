interface StatusTableProps {
  data: Array<{
    id: string;
    date: string;
    service: string;
    status: "pending" | "approved" | "rejected" | "processing";
    notes?: string;
  }>;
}

export function StatusTable({ data }: StatusTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
              Request ID
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
              Date
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
              Service
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
              Status
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
              Notes
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4 text-sm font-mono text-gray-600">
                {row.id}
              </td>
              <td className="py-3 px-4 text-sm text-gray-600">{row.date}</td>
              <td className="py-3 px-4 text-sm text-gray-900">{row.service}</td>
              <td className="py-3 px-4">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(
                    row.status
                  )}`}
                >
                  {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                </span>
              </td>
              <td className="py-3 px-4 text-sm text-gray-600">
                {row.notes || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
