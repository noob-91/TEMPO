import React from "react";

export function LoginWireframe() {
  return (
    <div className="border-2 border-dashed border-gray-300 p-8 bg-white">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="h-12 w-32 bg-gray-200 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-2">Sign In</h1>
          <p className="text-sm text-gray-500">Access your scholar account</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Email</label>
            <div className="h-10 bg-gray-100 rounded-md w-full"></div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="block text-sm font-medium">Password</label>
              <span className="text-xs text-blue-600">Forgot Password?</span>
            </div>
            <div className="h-10 bg-gray-100 rounded-md w-full"></div>
          </div>

          <div className="h-10 bg-blue-200 rounded-md w-full"></div>

          <div className="text-center text-sm">
            <span className="text-gray-500">Don't have an account? </span>
            <span className="text-blue-600">Sign up</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RegisterWireframe() {
  return (
    <div className="border-2 border-dashed border-gray-300 p-8 bg-white">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="h-12 w-32 bg-gray-200 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-2">Create Account</h1>
          <p className="text-sm text-gray-500">Join the scholarly community</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Full Name</label>
            <div className="h-10 bg-gray-100 rounded-md w-full"></div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Email</label>
            <div className="h-10 bg-gray-100 rounded-md w-full"></div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Password</label>
            <div className="h-10 bg-gray-100 rounded-md w-full"></div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Academic Institution
            </label>
            <div className="h-10 bg-gray-100 rounded-md w-full"></div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Academic Credentials
            </label>
            <div className="h-20 bg-gray-100 rounded-md w-full"></div>
          </div>

          <div className="h-10 bg-blue-200 rounded-md w-full"></div>

          <div className="text-center text-sm">
            <span className="text-gray-500">Already have an account? </span>
            <span className="text-blue-600">Sign in</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ForgotPasswordWireframe() {
  return (
    <div className="border-2 border-dashed border-gray-300 p-8 bg-white">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="h-12 w-32 bg-gray-200 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
          <p className="text-sm text-gray-500">We'll send you a reset link</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Email</label>
            <div className="h-10 bg-gray-100 rounded-md w-full"></div>
          </div>

          <div className="h-10 bg-blue-200 rounded-md w-full"></div>

          <div className="text-center text-sm">
            <span className="text-gray-500">Remember your password? </span>
            <span className="text-blue-600">Sign in</span>
          </div>
        </div>
      </div>
    </div>
  );
}
