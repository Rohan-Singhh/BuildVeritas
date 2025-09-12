export const FaqSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our pricing and plans
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              question: "Can I change my plan anytime?",
              answer:
                "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing accordingly.",
            },
            {
              question: "Is there a free trial available?",
              answer:
                "We offer a 7-day free trial for all plans so you can explore our features and see how BuildVeritas fits your needs.",
            },
            {
              question: "What payment methods do you accept?",
              answer:
                "We accept all major credit cards, debit cards, UPI, net banking, and can also arrange for invoice-based billing for Enterprise customers.",
            },
            {
              question: "How accurate are the AI budget estimates?",
              answer:
                "Our AI has been trained on hundreds of Indian construction projects and maintains a 99.2% accuracy rate, with estimates typically within 5-8% of actual costs.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 animate-fade-in-up border border-gray-100"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
