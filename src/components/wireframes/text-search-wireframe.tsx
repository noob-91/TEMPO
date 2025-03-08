import React from "react";

export function TextSearchWireframe() {
  return (
    <div className="border-2 border-dashed border-gray-300 p-8 bg-white">
      {/* Navigation Bar */}
      <div className="h-16 bg-gray-200 mb-6 flex items-center px-4">
        <div className="flex-1 flex items-center">
          <div className="h-8 w-32 bg-gray-300 mr-8"></div>
          <div className="h-6 w-20 bg-gray-300 mx-2"></div>
          <div className="h-6 w-20 bg-gray-300 mx-2"></div>
          <div className="h-6 w-20 bg-gray-300 mx-2"></div>
        </div>
        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
      </div>

      {/* Page Header */}
      <div className="mb-6">
        <div className="h-8 bg-gray-300 w-64 mb-2"></div>
        <div className="h-4 bg-gray-200 w-1/2"></div>
      </div>

      {/* Search Controls */}
      <div className="bg-gray-100 rounded-md p-4 mb-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-3 h-4 w-4 bg-gray-300"></div>
            <div className="h-10 bg-white rounded-md w-full pl-10"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-24 bg-gray-300 rounded-md flex items-center justify-center">
              <div className="h-4 w-4 bg-gray-400 mr-1"></div>
              <div className="h-3 w-12 bg-gray-400"></div>
            </div>
            <div className="h-10 w-24 bg-gray-300 rounded-md flex items-center justify-center">
              <div className="h-4 w-4 bg-gray-400 mr-1"></div>
              <div className="h-3 w-12 bg-gray-400"></div>
            </div>
          </div>
        </div>

        {/* Search Type Toggle */}
        <div className="flex gap-2 mb-4">
          <div className="h-8 w-32 bg-blue-200 rounded-md"></div>
          <div className="h-8 w-32 bg-gray-300 rounded-md"></div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-8 w-24 ${i === 1 ? "bg-blue-200" : "bg-gray-300"} rounded-md flex-shrink-0`}
            ></div>
          ))}
        </div>
      </div>

      {/* Search Results */}
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-md p-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex justify-between mb-2">
              <div className="h-5 bg-gray-300 w-3/4"></div>
              <div className="h-8 w-8 bg-blue-200 rounded-full"></div>
            </div>
            <div className="h-4 bg-gray-200 w-1/2 mb-3"></div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-16 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-200 w-24"></div>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 bg-gray-300 mr-1"></div>
              <div className="h-3 bg-gray-200 w-32"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-gray-300 rounded-md"></div>
          <div className="h-8 w-8 bg-blue-200 rounded-md"></div>
          <div className="h-8 w-8 bg-gray-300 rounded-md"></div>
          <div className="h-8 w-8 bg-gray-300 rounded-md"></div>
          <div className="h-8 w-8 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
