import React from "react";

export function ComparisonWireframe() {
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

      {/* Main Content */}
      <div className="flex gap-6 h-[calc(100vh-200px)]">
        {/* Text Comparison (65%) */}
        <div className="w-2/3 bg-white rounded-md border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-5 w-5 bg-blue-200 rounded-full mr-2"></div>
              <div className="h-5 w-48 bg-gray-300"></div>
            </div>
            <div className="h-8 w-48 bg-gray-300 rounded-md flex items-center justify-center">
              <div className="h-4 w-4 bg-gray-400 mr-1"></div>
              <div className="h-3 w-32 bg-gray-400"></div>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 bg-gray-200 w-full"></div>
              ))}
              <div className="h-4 w-full">
                <div className="h-4 bg-gray-200 w-1/4 inline-block"></div>
                <div className="h-4 bg-red-200 w-1/6 inline-block line-through"></div>
                <div className="h-4 bg-gray-200 w-1/2 inline-block"></div>
              </div>
              {[1, 2].map((i) => (
                <div key={i} className="h-4 bg-gray-200 w-full"></div>
              ))}
              <div className="h-4 w-full">
                <div className="h-4 bg-gray-200 w-2/5 inline-block"></div>
                <div className="h-4 bg-green-200 w-1/5 inline-block"></div>
                <div className="h-4 bg-gray-200 w-1/3 inline-block"></div>
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 bg-gray-200 w-full"></div>
              ))}
              <div className="h-4 w-full">
                <div className="h-4 bg-gray-200 w-1/6 inline-block"></div>
                <div className="h-4 bg-yellow-200 w-1/4 inline-block"></div>
                <div className="h-4 bg-gray-200 w-1/2 inline-block"></div>
              </div>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-4 bg-gray-200 w-full"></div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="p-3 border-t border-gray-200">
            <div className="h-4 w-32 bg-gray-300 mb-2"></div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-blue-200 rounded mr-1"></div>
                <div className="h-3 w-24 bg-gray-300"></div>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-green-200 rounded mr-1"></div>
                <div className="h-3 w-24 bg-gray-300"></div>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-yellow-200 rounded mr-1"></div>
                <div className="h-3 w-24 bg-gray-300"></div>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-12 bg-gray-300 line-through mr-1"></div>
                <div className="h-3 w-16 bg-gray-300"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Annotation Sidebar (35%) */}
        <div className="w-1/3 bg-gray-100 rounded-md flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-5 w-5 bg-blue-200 rounded-full mr-2"></div>
                <div className="h-5 w-32 bg-gray-300"></div>
              </div>
              <div className="h-6 w-8 bg-gray-300 rounded-full"></div>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-2">
              <div className="h-8 w-20 bg-blue-200 rounded-md"></div>
              <div className="h-8 w-20 bg-gray-300 rounded-md"></div>
              <div className="h-8 w-20 bg-gray-300 rounded-md"></div>
              <div className="h-8 w-32 bg-gray-300 rounded-md"></div>
            </div>
          </div>

          {/* Annotations List */}
          <div className="flex-1 overflow-auto">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`p-4 border-b border-gray-200 ${i === 2 ? "bg-yellow-50" : ""}`}
              >
                <div className="flex items-start gap-2">
                  <div className="h-5 w-5 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <div className="h-4 bg-gray-300 w-3/5"></div>
                      <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="h-3 bg-gray-200 w-full mb-2"></div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-gray-300 mr-1"></div>
                      <div className="h-3 bg-gray-200 w-24 mr-2"></div>
                      <div className="h-3 bg-gray-200 w-16"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Annotation Details */}
          <div className="p-4 bg-gray-200 border-t border-gray-300">
            <div className="flex justify-between mb-2">
              <div className="h-5 w-32 bg-gray-300"></div>
              <div className="h-5 w-20 bg-yellow-200 rounded-full"></div>
            </div>
            <div className="h-16 bg-white rounded-md p-2 mb-2">
              <div className="h-3 bg-gray-200 w-full mb-1"></div>
              <div className="h-3 bg-gray-200 w-4/5"></div>
            </div>
            <div className="h-3 bg-gray-200 w-full mb-2"></div>
            <div className="h-24 bg-white rounded-md p-2 mb-2">
              <div className="h-3 bg-gray-300 w-24 mb-1"></div>
              <div className="h-3 bg-gray-200 w-full mb-1"></div>
              <div className="h-3 bg-gray-200 w-full mb-1"></div>
              <div className="h-3 bg-gray-200 w-4/5"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-8 w-24 bg-gray-300 rounded-md"></div>
              <div className="flex items-center">
                <div className="h-6 w-6 bg-gray-300 rounded-full mr-1"></div>
                <div className="h-4 w-4 bg-gray-300 mr-1"></div>
                <div className="h-6 w-6 bg-gray-300 rounded-full mr-1"></div>
                <div className="h-4 w-4 bg-gray-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
