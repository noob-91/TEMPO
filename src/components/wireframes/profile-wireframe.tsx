import React from "react";

export function ProfileWireframe() {
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
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-48 bg-gray-300"></div>
        <div className="h-10 w-32 bg-gray-300 rounded-md flex items-center justify-center">
          <div className="h-4 w-4 bg-gray-400 mr-1"></div>
          <div className="h-4 w-20 bg-gray-400"></div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Photo */}
          <div className="flex flex-col items-center">
            <div className="h-32 w-32 bg-gray-300 rounded-full mb-4 relative">
              <div className="absolute bottom-0 right-0 h-8 w-8 bg-blue-200 rounded-full"></div>
            </div>
            <div className="h-4 w-40 bg-gray-300"></div>
          </div>

          {/* Profile Form */}
          <div className="flex-1">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-300"></div>
                  <div className="h-10 bg-gray-100 rounded-md w-full"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-300"></div>
                  <div className="h-10 bg-gray-100 rounded-md w-full"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-4 w-16 bg-gray-300"></div>
                <div className="h-10 bg-gray-200 rounded-md w-full"></div>
                <div className="h-3 w-40 bg-gray-300"></div>
              </div>

              <div className="h-10 bg-blue-200 rounded-md w-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="h-6 w-40 bg-gray-300 mb-4"></div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-300"></div>
            <div className="h-10 bg-gray-100 rounded-md w-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-300"></div>
            <div className="h-10 bg-gray-100 rounded-md w-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-40 bg-gray-300"></div>
            <div className="h-10 bg-gray-100 rounded-md w-full"></div>
          </div>
          <div className="h-10 bg-blue-200 rounded-md w-40"></div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="h-6 w-32 bg-gray-300 mb-4"></div>
        <div className="h-10 bg-red-100 rounded-md w-full flex items-center justify-center">
          <div className="h-4 w-4 bg-red-300 mr-2"></div>
          <div className="h-4 w-20 bg-red-300"></div>
        </div>
      </div>
    </div>
  );
}
