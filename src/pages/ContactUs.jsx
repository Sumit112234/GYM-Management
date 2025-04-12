import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, MessageSquare, ChevronDown, ChevronUp, Send } from "lucide-react";

export default function ContactSupport() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! Our team will get back to you soon.");
    setMessage("");
    setEmail("");
    setSubject("");
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What are your membership options?",
      answer: "We offer monthly, quarterly, and annual memberships with various perks. Our basic monthly plan starts at $49.99, while our premium annual membership offers the best value with additional benefits like free guest passes and personal training sessions."
    },
    {
      question: "How do I cancel or freeze my membership?",
      answer: "You can cancel or freeze your membership through your account dashboard or by speaking with our front desk staff. We require a 7-day notice for cancellations, and membership freezes can be done for 1-3 months at a time."
    },
    {
      question: "Do you offer personal training?",
      answer: "Yes! We have certified personal trainers available for one-on-one or group sessions. You can book personal training through the app or at the front desk. First-time members get a complimentary session to establish fitness goals."
    },
    {
      question: "What amenities are available at your gym?",
      answer: "Our facility includes state-of-the-art cardio and strength equipment, free weights area, functional training zone, group fitness studios, locker rooms with showers, sauna, and a nutrition bar. Some locations also offer swimming pools and basketball courts."
    },
    {
      question: "How do I book classes?",
      answer: "Classes can be booked through our mobile app or website up to 7 days in advance. We recommend booking early as popular classes fill up quickly. You'll need to cancel at least 2 hours before class to avoid a late cancellation fee."
    }
  ];

  const locations = [
    {
      name: "Downtown",
      address: "123 Main Street, Downtown",
      hours: "Monday-Friday: 5am-11pm, Weekends: 7am-9pm",
      phone: "(555) 123-4567"
    },
    {
      name: "Westside",
      address: "456 Fitness Blvd, Westside",
      hours: "24/7 Access for Members",
      phone: "(555) 987-6543"
    },
    {
      name: "Northgate",
      address: "789 Muscle Avenue, Northgate",
      hours: "Monday-Friday: 6am-10pm, Weekends: 8am-8pm",
      phone: "(555) 456-7890"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-gray-100 pt-24">
      {/* Header */}
      <header className="bg-slate-700 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Contact & Support</h1>
        </div>
      </header>

      <motion.div 
        className="container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Direct Messaging Section */}
        <motion.section 
          className="mb-16"
          variants={itemVariants}
        >
          <div className="flex items-center mb-6">
            <MessageSquare className="text-emerald-500 mr-3" size={28} />
            <h2 className="text-2xl font-bold">Message Us</h2>
          </div>
          
          <div className="bg-slate-700 rounded-lg p-6 shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="block mb-2">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-emerald-500 focus:outline-none h-32"
                  required
                ></textarea>
              </div>
              
              <motion.button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={18} className="mr-2" />
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section 
          className="mb-16"
          variants={itemVariants}
        >
          <div className="flex items-center mb-6">
            <Mail className="text-emerald-500 mr-3" size={28} />
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          </div>
          
          <div className="bg-slate-700 rounded-lg shadow-lg overflow-hidden">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-700 last:border-b-0">
                <button
                  className="w-full py-4 px-6 flex justify-between items-center hover:bg-slate-600 transition-colors duration-200"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-left">{faq.question}</span>
                  {expandedFaq === index ? 
                    <ChevronUp size={20} className="text-emerald-500" /> : 
                    <ChevronDown size={20} className="text-emerald-500" />
                  }
                </button>
                
                <motion.div 
                  className="px-6 overflow-hidden"
                  initial="collapsed"
                  animate={expandedFaq === index ? "expanded" : "collapsed"}
                  variants={{
                    expanded: { opacity: 1, height: "auto", paddingBottom: 16 },
                    collapsed: { opacity: 0, height: 0, paddingBottom: 0 }
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <p className="text-gray-300">{faq.answer}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Locations Section */}
        <motion.section 
          variants={itemVariants}
        >
          <div className="flex items-center mb-6">
            <MapPin className="text-emerald-500 mr-3" size={28} />
            <h2 className="text-2xl font-bold">Our Locations</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location, index) => (
              <motion.div 
                key={index}
                className="bg-slate-700 rounded-lg p-6 shadow-lg"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-bold mb-2 text-amber-500">{location.name} Location</h3>
                <div className="flex items-start mb-3">
                  <MapPin size={18} className="text-emerald-500 mr-2 mt-1" />
                  <p>{location.address}</p>
                </div>
                <div className="flex items-start mb-3">
                  <Clock size={18} className="text-emerald-500 mr-2 mt-1" />
                  <p>{location.hours}</p>
                </div>
                <div className="flex items-center">
                  <Mail size={18} className="text-emerald-500 mr-2" />
                  <p>{location.phone}</p>
                </div>
                <motion.button
                  className="mt-4 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Directions
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}