import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Instagram, Facebook, Twitter, Youtube, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {

      const [isOpen, setIsOpen] = useState(false);
      const [scrolled, setScrolled] = useState(false);
    
      useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 10) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    
      const navigationItems = [
        { name: 'Home', href: '#' },
        { name: 'Classes', href: '#', hasDropdown: true, 
          dropdownItems: [
            { name: 'Strength Training', href: '#' },
            { name: 'Cardio', href: '#' },
            { name: 'Yoga', href: '#' },
            { name: 'CrossFit', href: '#' }
          ] 
        },
        { name: 'Membership', href: '#' },
        { name: 'Trainers', href: '#' },
        { name: 'Schedule', href: '#' },
        { name: 'Contact', href: '#' },
      ];
    
      const [activeDropdown, setActiveDropdown] = useState(null);
    
    return (
        <footer className="bg-gray-800 text-gray-100">
        <div className="container mx-auto px-4 pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Logo and About */}
            <div className="space-y-4">
              <div className="text-2xl font-bold flex items-center">
                <span className="text-emerald-500">FLEX</span>
                <span className="text-amber-500">FIT</span>
              </div>
              <p className="text-sm text-gray-300">
                Transforming lives through fitness excellence. Join our community and achieve your fitness goals with expert guidance.
              </p>
              <div className="flex space-x-4">
                <motion.a 
                  whileHover={{ y: -3, color: '#10B981' }}
                  href="#" 
                  className="text-gray-100 hover:text-emerald-500"
                >
                  <Instagram size={20} />
                </motion.a>
                <motion.a 
                  whileHover={{ y: -3, color: '#10B981' }}
                  href="#" 
                  className="text-gray-100 hover:text-emerald-500"
                >
                  <Facebook size={20} />
                </motion.a>
                <motion.a 
                  whileHover={{ y: -3, color: '#10B981' }}
                  href="#" 
                  className="text-gray-100 hover:text-emerald-500"
                >
                  <Twitter size={20} />
                </motion.a>
                <motion.a 
                  whileHover={{ y: -3, color: '#10B981' }}
                  href="#" 
                  className="text-gray-100 hover:text-emerald-500"
                >
                  <Youtube size={20} />
                </motion.a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-emerald-500">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-emerald-500 transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-500 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-500 transition-colors">Classes</a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-500 transition-colors">Schedule</a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-500 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-500 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Working Hours */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-emerald-500">Working Hours</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-300">Monday - Friday:</span>
                  <span className="text-amber-500">6:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-300">Saturday:</span>
                  <span className="text-amber-500">7:00 AM - 8:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-300">Sunday:</span>
                  <span className="text-amber-500">8:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-300">Holidays:</span>
                  <span className="text-amber-500">9:00 AM - 5:00 PM</span>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-emerald-500">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Mail size={16} className="mr-2 text-amber-500" />
                  <a href="mailto:info@flexfit.com" className="text-gray-300 hover:text-emerald-500">info@flexfit.com</a>
                </li>
                <li className="flex items-center">
                  <Phone size={16} className="mr-2 text-amber-500" />
                  <a href="tel:+15551234567" className="text-gray-300 hover:text-emerald-500">+1 (555) 123-4567</a>
                </li>
                <li className="text-gray-300 mt-2">
                  123 Fitness Street<br />
                  Gym City, GC 12345<br />
                  United States
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-8 border-slate-700" />

          {/* Copyright and Terms */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} FlexFit Gym. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-emerald-500 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-emerald-500 transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-gray-400 hover:text-emerald-500 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    )
}