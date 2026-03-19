import React from "react";
import { useNavigate } from "react-router-dom";

// Smart Community Security & Incident Reporting System landing page
// Theme: neon green (#7cfc00) on dark background, using custom CSS classes from index.css

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-darkBg text-gray-200 font-sans">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-5 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-neonGreen text-black rounded-lg flex items-center justify-center font-bold text-xl">
            S
          </div>
          <span className="text-white font-semibold text-xl tracking-tight">
            Community
            <span className="text-neonGreen">Security</span>
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a href="#" className="hover:text-neonGreen transition">
            Benefits
          </a>
          <a href="#" className="hover:text-neonGreen transition">
            How it works
          </a>
          <a href="#" className="hover:text-neonGreen transition">
            Testimonials
          </a>
          <a href="#" className="hover:text-neonGreen transition">
            FAQ
          </a>
          <button
            className="bg-neonGreen hover:bg-lightGreen text-black px-5 py-2 rounded-md text-sm font-semibold transition"
            onClick={() => navigate("/login")}
          >
            Get started
          </button>
        </div>
        {/* Mobile menu button */}
        <button className="md:hidden text-gray-300 focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-4xl">
          {/* Badge with neon green */}
          <div className="inline-block bg-neonGreen/10 text-neonGreen text-sm font-semibold px-4 py-1 rounded-full mb-6 border border-neonGreen/40">
            Keeping our communities safe since 2026
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Community Security <br />& Incident Reporting System
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mt-6 max-w-2xl">
            2025 Gartner® Magic Quadrant™ for Community Safety Platforms.
            Real‑time incident reporting, instant alerts, and seamless
            coordination between residents and authorities.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <button className="bg-gradient-submit hover:bg-gradient-submit text-black px-8 py-3 rounded-md text-lg font-semibold flex items-center gap-2 transition">
              Download report
            </button>
            <button
              className="border border-neonGreen hover:bg-neonGreen/20 text-neonGreen px-8 py-3 rounded-md text-lg font-semibold transition"
              onClick={() => navigate("/login")}
            >
              Get started
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4 flex items-center gap-1">
            <span className="h-1.5 w-1.5 bg-neonGreen rounded-full"></span>
            Used by 150+ communities and local authorities
          </p>
        </div>
      </section>

      {/* Benefits / Core Features */}
      <section className="container mx-auto px-6 py-16 border-t border-gray-800">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Built for community safety
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Everything you need to report, track, and resolve incidents — in one
            unified platform.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "📱",
              title: "Incident Reporting",
              desc: "Report thefts, accidents, or suspicious activity with photos, videos, and auto‑location.",
            },
            {
              icon: "🗺️",
              title: "Real‑Time Map",
              desc: "Interactive map with color‑coded markers. Filter by type, view severity, and track updates.",
            },
            {
              icon: "🔔",
              title: "Community Alerts",
              desc: "Broadcast urgent alerts (curfews, missing persons) and allow residents to subscribe.",
            },
            {
              icon: "📊",
              title: "Analytics Dashboard",
              desc: "Graphs on incident frequency, monthly safety reports, and trend insights.",
            },
            {
              icon: "👮",
              title: "Incident Management",
              desc: "Officers verify, resolve, and message reporters. Admins remove duplicates.",
            },
            {
              icon: "💬",
              title: "In‑app Chat",
              desc: "Direct messaging between residents and security officers for follow‑ups.",
            },
          ].map((feat, i) => (
            <div
              key={i}
              className="bg-gray-900/60 p-6 rounded-xl border border-gray-800 hover:border-neonGreen transition"
            >
              <div className="text-neonGreen text-3xl mb-4">{feat.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feat.title}
              </h3>
              <p className="text-gray-400">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-6 py-16 border-t border-gray-800">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            How it works
          </h2>
          <p className="text-gray-400 mt-3">
            From report to resolution in three simple steps.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[1, 2, 3].map((step) => (
            <div key={step} className="text-center">
              <div className="bg-neonGreen/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center border-2 border-neonGreen text-neonGreen text-2xl font-bold">
                {step}
              </div>
              <h3 className="text-xl font-semibold text-white mt-4">
                {step === 1
                  ? "Resident reports"
                  : step === 2
                    ? "Officer verifies"
                    : "Community updated"}
              </h3>
              <p className="text-gray-400 mt-2">
                {step === 1
                  ? "Use the form to add details, photos, and location. Incident appears on the map instantly."
                  : step === 2
                    ? "Security officers review, verify, and update status. Real‑time notifications sent."
                    : "Residents see resolved incidents and receive alerts. Analytics are updated."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 py-16 border-t border-gray-800">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Trusted by communities
          </h2>
          <p className="text-gray-400 mt-3">
            What residents and officers say about the system.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Linda M.",
              role: "Resident, Oakwood",
              quote:
                "The real‑time map helped our neighborhood track a series of car break‑ins. We caught the culprit thanks to quick reporting.",
            },
            {
              name: "Carlos R.",
              role: "Security Officer",
              quote:
                "As a security officer, the verification panel and chat save hours of phone calls. Everything is in one place.",
            },
            {
              name: "Priya K.",
              role: "Community Admin",
              quote:
                "The monthly safety reports help our admin team allocate patrols where they're needed most. A game changer.",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-gray-900/40 p-6 rounded-xl border border-gray-800"
            >
              <div className="flex text-neonGreen mb-3">★★★★★</div>
              <p className="text-gray-300 italic">“{t.quote}”</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 bg-gray-700 rounded-full"></div>
                <div>
                  <p className="text-white font-medium">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-6 py-16 border-t border-gray-800">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Frequently asked questions
          </h2>
          <p className="text-gray-400 mt-3">
            Got questions? We've got answers.
          </p>
        </div>
        <div className="max-w-3xl mx-auto divide-y divide-gray-800">
          {[
            {
              q: "How do I report an incident?",
              a: "Residents can log in, click 'Report Incident', fill in the details, upload media, and submit. Location is auto‑detected or can be set manually.",
            },
            {
              q: "Who can see the reported incidents?",
              a: "All verified residents and security officers in the community see incidents on the map. Personal data is kept private.",
            },
            {
              q: "Can I subscribe only to specific alerts?",
              a: "Yes. In your profile, you can choose alert types (urgent, weather, community) and opt out of non‑essential ones.",
            },
            {
              q: "Is the system free for residents?",
              a: "Absolutely. The platform is provided by the community or local authorities. Residents only need to create an account.",
            },
          ].map((faq, i) => (
            <div key={i} className="py-5">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer text-white font-medium list-none">
                  <span>{faq.q}</span>
                  <span className="text-neonGreen group-open:rotate-180 transition">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-gray-400">{faq.a}</p>
              </details>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-gray-900 to-gray-950 rounded-2xl p-10 border border-neonGreen/30 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Ready to make your community safer?
            </h3>
            <p className="text-gray-400 mt-2 max-w-xl">
              Join hundreds of communities using our platform.
            </p>
          </div>
          <button className="mt-5 md:mt-0 bg-neonGreen hover:bg-lightGreen text-black px-8 py-3 rounded-md text-lg font-semibold transition">
            Get started today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-neonGreen text-black rounded-md flex items-center justify-center font-bold text-xs">
              S
            </div>
            <span>SmartCommunity © 2025</span>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-neonGreen">
              Privacy
            </a>
            <a href="#" className="hover:text-neonGreen">
              Terms
            </a>
            <a href="#" className="hover:text-neonGreen">
              Contact
            </a>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="text-xs">Gartner® Magic Quadrant™</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
