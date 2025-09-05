import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="relative bg-white py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Get in Touch</h2>
          <p className="text-gray-600">We'd love to hear from you. Here's how you can reach us.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Map and Contact Info */}
          <div className="space-y-8">
                    {/* Map Container */}
        <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
          <iframe
                title="BuildVeritas Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5965530079037!2d77.64634067573588!3d12.93862518743881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1453952145c7%3A0x6d74c04ea4c91bae!2sKoramangala%2C%20Bengaluru%2C%20Karnataka%20560034!5e0!3m2!1sen!2sin!4v1709667547943!5m2!1sen!2sin"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Contact Info Cards */}
            <div className="bg-white rounded-3xl p-8 shadow-xl transform transition-all duration-500 hover:shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <MapPin className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
                    <p className="text-gray-600">
                      BuildVeritas Technologies<br />
                      4th Block, Koramangala<br />
                      Bangalore, Karnataka 560034<br />
                      India
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <Phone className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                    <p className="text-gray-600">
                      Main: +91 80 4123 4567<br />
                      Support: +91 80 4123 4568<br />
                      Toll Free: 1800 123 4567
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <Mail className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                    <p className="text-gray-600">
                      Info: info@buildveritas.com<br />
                      Support: support@buildveritas.com<br />
                      Sales: sales@buildveritas.com
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <Clock className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-xl lg:sticky lg:top-24 transform transition-all duration-500 hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full group relative overflow-hidden bg-blue-400 text-white font-semibold py-3 px-8 rounded-xl text-base transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)] hover:scale-[1.02]"
              >
                <span className="relative z-10">Send Message</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;