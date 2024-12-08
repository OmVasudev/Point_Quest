// Marking this component as a client component
"use client";

import { useState } from "react";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // FAQ Data
  const faqs = [
    {
      question: "What is Point Quest?",
      answer:
        "Point Quest is a centralized platform for managing club activities. It allows students to join, participate, and track events hosted by various clubs efficiently.",
    },
    {
      question: "How does the carbon footprint platform for coal mines work?",
      answer:
        "Our platform uses advanced technologies like AI, Big Data, and Blockchain to quantify carbon emissions from coal mining activities and explore ways to achieve carbon neutrality.",
    },
    {
      question: "What is a water footprint, and why is it important?",
      answer:
        "A water footprint is a measure of the total water used for producing an agricultural product. Understanding it helps promote sustainable water usage and conserve resources.",
    },
    {
      question: "Can Point Quest be integrated with mobile devices?",
      answer:
        "Yes, Point Quest provides seamless integration with mobile devices through responsive web design and Bluetooth connectivity for certain features.",
    },
    {
      question: "Does the carbon footprint platform support real-time data?",
      answer:
        "Yes, the platform uses IoT devices and real-time data feeds to monitor and analyze emissions for actionable insights.",
    },
    {
      question:
        "What technologies are used in the water footprint calculation project?",
      answer:
        "We utilize a combination of AI algorithms, blockchain for data transparency, and Big Data analytics to provide accurate water footprint calculations.",
    },
    {
      question: "How do I join a club using Point Quest?",
      answer:
        "Simply log in to Point Quest, navigate to the 'Clubs' section, and click on the club you'd like to join. You can also view club events and participation details.",
    },
    {
      question:
        "Is the carbon footprint platform customizable for other industries?",
      answer:
        "Yes, the platform is designed to be adaptable for various industries such as manufacturing, transportation, and energy production.",
    },
  ];

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">
      <header className="mb-6 rounded-lg bg-white p-4 shadow">
        <h1 className="text-center text-2xl font-semibold text-blue-600">
          Frequently Asked Questions (FAQ)
        </h1>
      </header>

      <div className="mx-12">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-lg"
              >
                <h2 className="text-lg font-semibold text-blue-600">
                  {faq.question}
                </h2>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No FAQs found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
