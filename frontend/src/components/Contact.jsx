import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Building2,
  Users,
} from "lucide-react";
import { motion as Motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    status: "", // success, error, or loading
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ status: "loading", message: "Sending message..." });

    // Simulate API call
    setTimeout(() => {
      setFormStatus({
        status: "success",
        message: "Message sent successfully! We'll get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      details: [
        { text: "BuildVeritas Technologies", type: "main" },
        { text: "4th Block, Koramangala", type: "sub" },
        { text: "Bangalore, Karnataka 560034", type: "sub" },
        { text: "India", type: "sub" },
      ],
      color: "blue",
      bgGradient: "from-blue-500/10 to-blue-600/5",
    },
    {
      icon: Phone,
      title: "Contact Numbers",
      details: [
        {
          text: "Main: +91 80 4123 4567",
          type: "main",
          link: "tel:+918041234567",
        },
        {
          text: "Support: +91 80 4123 4568",
          type: "sub",
          link: "tel:+918041234568",
        },
        {
          text: "Toll Free: 1800 123 4567",
          type: "highlight",
          link: "tel:18001234567",
        },
      ],
      color: "purple",
      bgGradient: "from-purple-500/10 to-purple-600/5",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        {
          text: "Info: info@buildveritas.com",
          type: "main",
          link: "mailto:info@buildveritas.com",
        },
        {
          text: "Support: support@buildveritas.com",
          type: "sub",
          link: "mailto:support@buildveritas.com",
        },
        {
          text: "Sales: sales@buildveritas.com",
          type: "highlight",
          link: "mailto:sales@buildveritas.com",
        },
      ],
      color: "indigo",
      bgGradient: "from-indigo-500/10 to-indigo-600/5",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        { text: "Monday - Friday: 9:00 AM - 6:00 PM", type: "main" },
        { text: "Saturday: 10:00 AM - 4:00 PM", type: "sub" },
        { text: "Sunday: Closed", type: "highlight-red" },
      ],
      color: "green",
      bgGradient: "from-green-500/10 to-green-600/5",
    },
  ];

  const stats = [
    { icon: Building2, value: "127+", label: "Projects Completed" },
    { icon: Users, value: "90+", label: "Happy Clients" },
    { icon: MapPin, value: "5+", label: "Countries" },
    { icon: Phone, value: "24/7", label: "Support" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Get in Touch with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                BuildVeritas
              </span>
            </Motion.h1>
            <Motion.p
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Have questions about our AI-powered construction management
              platform? We're here to help you transform your construction
              projects.
            </Motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <Motion.div
              className="bg-white rounded-3xl p-8 shadow-2xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="Your company"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="How can we help?"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Your message..."
                    required
                  ></textarea>
                </div>
                <Motion.button
                  type="submit"
                  className="w-full group relative overflow-hidden bg-blue-500 text-white font-semibold py-4 px-8 rounded-xl text-base transition-all duration-300 hover:bg-blue-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={formStatus.status === "loading"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 inline-flex items-center">
                    {formStatus.status === "loading" ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </span>
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                </Motion.button>
                {formStatus.message && (
                  <Motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-center p-4 rounded-xl ${
                      formStatus.status === "success"
                        ? "bg-green-50 text-green-800"
                        : "bg-red-50 text-red-800"
                    }`}
                  >
                    {formStatus.message}
                  </Motion.div>
                )}
              </form>
            </Motion.div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Map */}
              <Motion.div
                className="relative h-[300px] rounded-3xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <iframe
                  title="BuildVeritas Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5965530079037!2d77.64634067573588!3d12.93862518743881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1453952145c7%3A0x6d74c04ea4c91bae!2sKoramangala%2C%20Bengaluru%2C%20Karnataka%20560034!5e0!3m2!1sen!2sin!4v1709667547943!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Motion.div>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <Motion.div
                    key={index}
                    className={`relative overflow-hidden bg-gradient-to-br ${info.bgGradient} rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 group hover:-translate-y-1`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-white/10 rounded-full -translate-y-16 translate-x-16 transform group-hover:translate-y-[-70%] group-hover:translate-x-[70%] transition-transform duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-black/5 to-black/10 rounded-full translate-y-16 -translate-x-16 transform group-hover:translate-y-[70%] group-hover:translate-x-[-70%] transition-transform duration-500"></div>

                    {/* Icon */}
                    <div
                      className={`relative inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 bg-${info.color}-100 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <info.icon className={`w-7 h-7 text-${info.color}-600`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {info.title}
                    </h3>

                    {/* Details */}
                    <ul className="space-y-3 relative">
                      {info.details.map((detail, idx) => (
                        <li key={idx}>
                          {detail.link ? (
                            <a
                              href={detail.link}
                              className={`block transition-colors duration-300 ${
                                detail.type === "main"
                                  ? "text-gray-800 font-medium"
                                  : detail.type === "highlight"
                                  ? "text-blue-600 font-semibold"
                                  : detail.type === "highlight-red"
                                  ? "text-red-500 font-medium"
                                  : "text-gray-600"
                              } hover:text-blue-500`}
                            >
                              {detail.text}
                            </a>
                          ) : (
                            <span
                              className={`block ${
                                detail.type === "main"
                                  ? "text-gray-800 font-medium"
                                  : detail.type === "highlight"
                                  ? "text-blue-600 font-semibold"
                                  : detail.type === "highlight-red"
                                  ? "text-red-500 font-medium"
                                  : "text-gray-600"
                              }`}
                            >
                              {detail.text}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </Motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Find quick answers to common questions about BuildVeritas
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                q: "How quickly can I get started with BuildVeritas?",
                a: "You can start using BuildVeritas immediately after signing up. Our onboarding process is streamlined, and you'll have access to all features within minutes.",
              },
              {
                q: "Do you offer custom solutions for enterprise clients?",
                a: "Yes, we offer customized enterprise solutions tailored to your specific needs. Contact our sales team to discuss your requirements.",
              },
              {
                q: "What kind of support do you provide?",
                a: "We offer 24/7 customer support through multiple channels including phone, email, and chat. Enterprise clients get dedicated account managers.",
              },
              {
                q: "Is my data secure with BuildVeritas?",
                a: "Yes, we implement enterprise-grade security measures and comply with industry standards to ensure your data is always protected.",
              },
            ].map((faq, index) => (
              <Motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.q}
                </h3>
                <p className="text-gray-600">{faq.a}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
