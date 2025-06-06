'use client';

import { useState } from "react";
import { getStripe } from "@/lib/stripe";

interface Template {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  features: string[];
}

const templates: Template[] = [
  {
    id: "1",
    name: "E-commerce Starter",
    description: "Complete e-commerce solution with product management, cart, and checkout",
    price: 99,
    category: "E-commerce",
    features: ["Product catalog", "Shopping cart", "Payment integration", "Admin dashboard"]
  },
  {
    id: "2",
    name: "SaaS Dashboard",
    description: "Modern dashboard template for SaaS applications with analytics",
    price: 149,
    category: "Dashboard",
    features: ["Analytics charts", "User management", "Billing integration", "Team collaboration"]
  },
  {
    id: "3",
    name: "Landing Page Pro",
    description: "High-converting landing page template with multiple sections",
    price: 49,
    category: "Marketing",
    features: ["Hero section", "Testimonials", "Pricing table", "Contact forms"]
  },
  {
    id: "4",
    name: "Blog Platform",
    description: "Full-featured blog platform with CMS and SEO optimization",
    price: 79,
    category: "Content",
    features: ["Content management", "SEO optimization", "Comments system", "Newsletter signup"]
  },
  {
    id: "5",
    name: "Portfolio Showcase",
    description: "Creative portfolio template for designers and developers",
    price: 39,
    category: "Portfolio",
    features: ["Project gallery", "Contact form", "Resume section", "Dark/light mode"]
  },
  {
    id: "6",
    name: "Learning Management",
    description: "Complete LMS with course creation and student tracking",
    price: 199,
    category: "Education",
    features: ["Course builder", "Progress tracking", "Assignments", "Video streaming"]
  }
];

export default function Templates() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleBuyTemplate = async (template: Template) => {
    setLoading(template.id);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: template.id,
          templateName: template.name,
          price: template.price,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      const stripe = await getStripe();

      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Project Templates
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Professional templates to jumpstart your next project. Built with modern technologies and best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-[#1E1E1E] rounded-lg shadow-md border border-gray-700 overflow-hidden hover:shadow-lg hover:border-[#DDF730] transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-medium bg-[#DDF730] text-black rounded-full">
                    {template.category}
                  </span>
                  <span className="text-2xl font-bold text-[#DDF730]">
                    ${template.price}
                  </span>
                </div>


                <h3 className="text-xl font-semibold text-white mb-2">
                  {template.name}
                </h3>

                <p className="text-gray-300 text-sm mb-4">
                  {template.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-white mb-2">
                    Features included:
                  </h4>
                  <ul className="space-y-1">
                    {template.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-300 flex items-center">
                        <svg className="w-4 h-4 text-[#DDF730] mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleBuyTemplate(template)}
                  disabled={loading === template.id}
                  className="cursor-pointer w-full bg-white hover:bg-[#888] disabled:opacity-50 disabled:cursor-not-allowed text-black font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
                >
                  {loading === template.id ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Buy Template'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            Need a custom template?
          </h2>
          <p className="text-gray-300 mb-6">
            Contact us for custom development services tailored to your specific needs.
          </p>
          <button className="bg-[#DDF730] text-black font-medium py-3 px-6 rounded-md hover:bg-[#c5e82d] transition-colors duration-200">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
