import { Suspense } from 'react';
import Link from 'next/link';

function SuccessContent() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <div className="mx-auto w-16 h-16 bg-[#DDF730] rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-300">
            Thank you for your purchase. You will receive an email with download instructions shortly.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/store"
            className="inline-block w-full bg-[#DDF730] hover:bg-[#c5e82d] text-black font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Browse More Templates
          </Link>
          <Link
            href="/"
            className="inline-block w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Success() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}