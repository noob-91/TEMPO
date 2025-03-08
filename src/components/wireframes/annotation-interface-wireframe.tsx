import React from "react";

export function AnnotationInterfaceWireframe() {
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

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <div className="h-10 w-32 bg-gray-100 flex items-center justify-center">
          <div className="h-4 w-4 bg-gray-300 mr-2"></div>
          <div className="h-4 w-16 bg-gray-300"></div>
        </div>
        <div className="h-10 w-32 bg-blue-200 border-b-2 border-blue-500 flex items-center justify-center">
          <div className="h-4 w-4 bg-blue-300 mr-2"></div>
          <div className="h-4 w-16 bg-blue-300"></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex gap-4 h-[calc(100vh-200px)]">
        {/* Text Viewer (65%) */}
        <div className="w-2/3 bg-gray-100 rounded-md p-4 flex flex-col">
          {/* Text Header */}
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-6 w-6 bg-blue-200 rounded-full mr-2"></div>
              <div className="h-6 w-48 bg-gray-300"></div>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute left-2 top-2 h-4 w-4 bg-gray-400"></div>
                <div className="h-8 w-48 bg-white rounded-md pl-8"></div>
              </div>
              <div className="h-8 w-20 bg-gray-300 rounded-md ml-2"></div>
            </div>
          </div>

          {/* Text Content with Selection */}
          <div className="flex-1 bg-white rounded-md p-6 overflow-auto">
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-gray-200 w-full"></div>
              ))}
              <div className="h-4 bg-blue-200 w-1/3"></div>
              {[1, 2].map((i) => (
                <div key={i} className="h-4 bg-gray-200 w-full"></div>
              ))}
              {/* Selected Text */}
              <div className="h-4 bg-yellow-300 w-2/5"></div>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-4 bg-gray-200 w-full"></div>
              ))}
            </div>
          </div>

          {/* Text Footer */}
          <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
            <div className="h-4 w-32 bg-gray-300"></div>
            <div className="flex gap-2">
              <div className="h-8 w-24 bg-gray-300 rounded-md"></div>
              <div className="h-8 w-24 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        </div>

        {/* Annotation Form (35%) */}
        <div className="w-1/3 bg-white rounded-md border border-gray-200 p-4 flex flex-col">
          <div className="mb-4">
            <div className="h-6 w-32 bg-gray-300 mb-4"></div>

            {/* Selected Text Display */}
            <div className="mb-4">
              <div className="h-4 w-24 bg-gray-300 mb-1"></div>
              <div className="h-16 bg-gray-100 rounded-md p-2">
                <div className="h-3 bg-gray-300 w-full mb-1"></div>
                <div className="h-3 bg-gray-300 w-4/5"></div>
              </div>
            </div>

            {/* Annotation Type */}
            <div className="mb-4">
              <div className="h-4 w-32 bg-gray-300 mb-2"></div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-gray-300 rounded-full mr-2"></div>
                  <div className="h-4 w-4 bg-red-300 mr-1"></div>
                  <div className="h-4 w-48 bg-gray-300"></div>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-blue-300 rounded-full mr-2"></div>
                  <div className="h-4 w-4 bg-green-300 mr-1"></div>
                  <div className="h-4 w-48 bg-gray-300"></div>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-gray-300 rounded-full mr-2"></div>
                  <div className="h-4 w-4 bg-yellow-300 mr-1"></div>
                  <div className="h-4 w-48 bg-gray-300"></div>
                </div>
              </div>
            </div>

            {/* Confidence Level */}
            <div className="mb-4">
              <div className="h-4 w-32 bg-gray-300 mb-2"></div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-gray-300 rounded-full mr-2"></div>
                  <div className="h-4 w-40 bg-gray-300"></div>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-blue-300 rounded-full mr-2"></div>
                  <div className="h-4 w-48 bg-gray-300"></div>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-gray-300 rounded-full mr-2"></div>
                  <div className="h-4 w-44 bg-gray-300"></div>
                </div>
              </div>
            </div>

            {/* Justification */}
            <div className="mb-4">
              <div className="h-4 w-40 bg-gray-300 mb-2"></div>
              <div className="h-32 bg-gray-100 rounded-md"></div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <div className="h-10 w-24 bg-gray-300 rounded-md"></div>
              <div className="h-10 w-32 bg-blue-200 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
