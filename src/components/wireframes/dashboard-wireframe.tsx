import React from "react";

export function DashboardWireframe() {
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
      <div className="flex gap-6">
        {/* Left Column (2/3) */}
        <div className="flex-2 space-y-6 w-2/3">
          {/* Welcome Banner */}
          <div className="h-16 bg-blue-100 rounded-md p-4 flex items-center">
            <div className="h-6 w-6 bg-blue-200 rounded-full mr-3"></div>
            <div className="h-4 bg-gray-300 w-3/4"></div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-100 rounded-md p-4">
            <div className="h-6 bg-gray-300 w-40 mb-4"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-24 bg-white rounded-md flex flex-col items-center justify-center">
                <div className="h-8 w-8 bg-blue-200 rounded-full mb-2"></div>
                <div className="h-4 bg-gray-300 w-20"></div>
              </div>
              <div className="h-24 bg-white rounded-md flex flex-col items-center justify-center">
                <div className="h-8 w-8 bg-blue-200 rounded-full mb-2"></div>
                <div className="h-4 bg-gray-300 w-24"></div>
              </div>
              <div className="h-24 bg-white rounded-md flex flex-col items-center justify-center">
                <div className="h-8 w-8 bg-blue-200 rounded-full mb-2"></div>
                <div className="h-4 bg-gray-300 w-20"></div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-100 rounded-md p-4">
            <div className="h-6 bg-gray-300 w-40 mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-start p-3 bg-white rounded-md"
                >
                  <div className="h-8 w-8 bg-blue-200 rounded-full mr-3 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-4 bg-blue-200 w-24 mt-3 ml-auto"></div>
          </div>
        </div>

        {/* Right Column (1/3) */}
        <div className="flex-1 space-y-6 w-1/3">
          {/* User Profile */}
          <div className="bg-gray-100 rounded-md p-4">
            <div className="flex items-center mb-4">
              <div className="h-16 w-16 bg-gray-300 rounded-full mr-3"></div>
              <div>
                <div className="h-5 bg-gray-300 w-32 mb-1"></div>
                <div className="h-4 bg-gray-200 w-24"></div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-300 w-24"></div>
                <div className="h-4 bg-gray-300 w-8"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-300 w-24"></div>
                <div className="h-4 bg-gray-300 w-8"></div>
              </div>
            </div>
            <div className="h-8 bg-blue-200 rounded-md w-full mb-2"></div>
            <div className="h-8 bg-gray-300 rounded-md w-full"></div>
          </div>

          {/* Recommended Texts */}
          <div className="bg-gray-100 rounded-md p-4">
            <div className="h-6 bg-gray-300 w-40 mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-3 bg-white rounded-md">
                  <div className="h-5 bg-gray-300 w-3/4 mb-1"></div>
                  <div className="h-3 bg-gray-200 w-1/4"></div>
                </div>
              ))}
            </div>
            <div className="h-4 bg-blue-200 w-24 mt-3 ml-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
