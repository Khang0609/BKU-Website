import React from "react";

export const LoadingError = ({ error }: { error: string }) => {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center p-6 text-center text-red-600">
      <p className="font-bold">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 underline"
      >
        Retry
      </button>
    </div>
  );
};
