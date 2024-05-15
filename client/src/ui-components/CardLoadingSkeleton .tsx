import React from "react";

const CardLoadingSkeleton  = () => {
  return (
    <div className="flex min-h-screen  justify-center p-4">
      <div className="w-full max-w-sm p-4 mx-auto">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200 rounded-md" />
          <div className="mt-4 space-y-2">
            <div className="h-6 bg-gray-200 rounded-md" />
            <div className="h-4 bg-gray-200 rounded-md w-2/3" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded-md w-1/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded-md w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLoadingSkeleton ;
