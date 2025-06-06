import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#DDF730]">Template Store</h1>
          <Link 
            href="/store"
            className="bg-[#DDF730] text-black px-4 py-2 rounded-md font-medium hover:bg-[#c5e82d] transition-colors duration-200"
          >
            Browse Templates
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6">
            Welcome to the
            <span className="text-[#DDF730] block">Template Store</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Discover premium project templates designed to accelerate your development. 
            From e-commerce solutions to SaaS dashboards, find the perfect starting point for your next project.
          </p>
          <div className="flex gap-6 justify-center flex-col sm:flex-row">
            <Link
              href="/store"
              className="bg-[#DDF730] text-black px-8 py-4 rounded-md font-semibold text-lg hover:bg-[#c5e82d] transition-colors duration-200"
            >
              Explore Templates
            </Link>
            <Link
              href="#features"
              className="border border-[#DDF730] text-[#DDF730] px-8 py-4 rounded-md font-semibold text-lg hover:bg-[#DDF730] hover:text-black transition-colors duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-8 border border-gray-800 rounded-lg hover:border-[#DDF730] transition-colors duration-300">
            <div className="w-16 h-16 bg-[#DDF730] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Fast Development</h3>
            <p className="text-gray-300">
              Skip the setup and start building immediately with our ready-to-use templates.
            </p>
          </div>

          <div className="text-center p-8 border border-gray-800 rounded-lg hover:border-[#DDF730] transition-colors duration-300">
            <div className="w-16 h-16 bg-[#DDF730] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Production Ready</h3>
            <p className="text-gray-300">
              All templates are built with best practices and modern technologies.
            </p>
          </div>

          <div className="text-center p-8 border border-gray-800 rounded-lg hover:border-[#DDF730] transition-colors duration-300">
            <div className="w-16 h-16 bg-[#DDF730] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75 9.75 9.75 0 00-9.75-9.75z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Fully Customizable</h3>
            <p className="text-gray-300">
              Easily customize and extend templates to match your specific needs.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gray-900 rounded-lg p-12 border border-gray-800">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Browse our collection of premium templates and find the perfect foundation for your project.
          </p>
          <Link
            href="/store"
            className="bg-[#DDF730] text-black px-8 py-4 rounded-md font-semibold text-lg hover:bg-[#c5e82d] transition-colors duration-200 inline-block"
          >
            View All Templates
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Template Store. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}