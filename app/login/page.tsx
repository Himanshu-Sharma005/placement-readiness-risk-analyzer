"use client";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-8 space-y-4 text-center">
        <h1 className="text-2xl font-semibold">Login Disabled</h1>

        <p className="text-sm text-gray-500">
          Authentication is intentionally disabled in the deployed build.
        </p>

        <p className="text-sm text-gray-500">
          This project focuses on deterministic risk modeling and behavioral
          analysis. Full Firebase Authentication is implemented and can be
          demonstrated locally.
        </p>

        <div className="mt-6 p-4 rounded-md bg-gray-900 text-gray-300 text-sm">
          Demo Mode Active
        </div>
      </div>
    </div>
  );
}
