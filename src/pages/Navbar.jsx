import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Instagram, Facebook, Twitter, Youtube, Mail, Phone, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Navbar() {
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
    { name: 'Home', href: '/' },
    { name: 'Classes', href: '#', hasDropdown: true, 
      dropdownItems: [
        { name: 'Strength Training', href: '#' },
        { name: 'Cardio', href: '#' },
        { name: 'Yoga', href: '#' },
        { name: 'CrossFit', href: '#' }
      ] 
    },
    { name: 'Subscription', href: 'subscription' },
    { name: 'Payments', href: 'payments' },
    { name: 'Equipments', href: 'equipments' },
    { name: 'Contact', href: 'contact' },
  ];

  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <div className="flex flex-col ">
      {/* Navbar */}
      <motion.header 
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-800 shadow-lg' : 'bg-transparent'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <motion.div 
                className="text-2xl font-bold text-gray-100 flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-emerald-500">FLEX</span>
                <span className="text-amber-500">FIT</span>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative" 
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href} 
                    className="text-gray-100 hover:text-emerald-500 transition-colors font-medium flex items-center"
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown size={16} className="ml-1" />}
                 </Link>

                  {item.hasDropdown && activeDropdown === item.name && (
                    <motion.div 
                      className="absolute mt-2 py-2 bg-slate-700 rounded-md shadow-xl min-w-max"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          className="block px-4 py-2 text-gray-100 hover:text-emerald-500 hover:bg-gray-800 transition-colors"
                        >
                          {dropdownItem.name}
                       </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button */}

            <div className='flex'>
                <Link to="/profile" className="md:block  hover:bg-emerald-600 text-gray-100 font-medium py-2 px-6 rounded-full transition-colors"><User/></Link>
            <Link
             
              to="/login"
              className="hidden md:block bg-emerald-500 hover:bg-emerald-600 text-gray-100 font-medium py-2 px-6 rounded-full transition-colors"
              >
              Sign Up
            </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                className="text-gray-100 hover:text-emerald-500 focus:outline-none" 
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden bg-gray-800" 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-4">
                {navigationItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.href} 
                      className="block py-3 text-gray-100 hover:text-emerald-500 transition-colors"
                      onClick={() => item.hasDropdown ? null : setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.hasDropdown && (
                      <div className="pl-4 space-y-2 mb-2">
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            to={dropdownItem.href}
                            className="block py-2 text-gray-100 hover:text-emerald-500 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <motion.a
                  whileTap={{ scale: 0.95 }}
                  href="/login"
                  className="block mt-4 bg-emerald-500 hover:bg-emerald-600 text-center text-gray-100 font-medium py-2 px-6 rounded-full transition-colors"
                >
                  Sign Up
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}