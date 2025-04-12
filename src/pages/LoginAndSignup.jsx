import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle, X } from 'lucide-react';

export default function AuthPages() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Here you would typically make an API call to authenticate or register the user
  };

  const toggleView = () => {
    setIsLogin(!isLogin);
    // Reset form data when switching between login and signup
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  // Password validation
  const passwordStrength = () => {
    const password = formData.password;
    if (!password) return "";
    if (password.length < 8) return "weak";
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const strength = [hasLowerCase, hasUpperCase, hasNumber, hasSpecialChar].filter(Boolean).length;
    if (strength <= 2) return "medium";
    return "strong";
  };

  const getPasswordStrengthColor = () => {
    const strength = passwordStrength();
    if (strength === "weak") return "bg-red-500";
    if (strength === "medium") return "bg-amber-500";
    if (strength === "strong") return "bg-emerald-500";
    return "";
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center pt-16 p-4">
      <motion.div 
        className="bg-slate-700 rounded-xl shadow-xl overflow-hidden w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        key={isLogin ? "login" : "signup"}
      >
        {/* Header */}
        <div className="bg-gray-800 p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-100">
            <span className="text-emerald-500">FLEX</span>
            <span className="text-amber-500">FIT</span>
          </h2>
          <p className="text-gray-300 mt-2">
            {isLogin ? "Welcome back to your fitness journey" : "Start your fitness journey today"}
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Login/Signup toggle */}
            <motion.div 
              className="flex rounded-lg overflow-hidden mb-6"
              variants={itemVariants}
            >
              <button
                type="button"
                className={`flex-1 py-2 px-4 text-center transition-colors ${
                  isLogin 
                    ? "bg-emerald-500 text-gray-100" 
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                type="button"
                className={`flex-1 py-2 px-4 text-center transition-colors ${
                  !isLogin 
                    ? "bg-emerald-500 text-gray-100" 
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </motion.div>

            {/* Name Fields (Sign Up only) */}
            {!isLogin && (
              <motion.div 
                className="grid grid-cols-2 gap-4 mb-4"
                variants={itemVariants}
              >
                <div className="relative">
                  <label className="block text-gray-300 text-sm mb-1" htmlFor="firstName">
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 text-gray-100 rounded-lg py-2 pl-10 pr-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="John"
                    />
                    <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-gray-300 text-sm mb-1" htmlFor="lastName">
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 text-gray-100 rounded-lg py-2 pl-10 pr-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Doe"
                    />
                    <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Email */}
            <motion.div className="mb-4" variants={itemVariants}>
              <label className="block text-gray-300 text-sm mb-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-800 text-gray-100 rounded-lg py-2 pl-10 pr-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="your@email.com"
                />
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div className="mb-4" variants={itemVariants}>
              <label className="block text-gray-300 text-sm mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-800 text-gray-100 rounded-lg py-2 pl-10 pr-10 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="••••••••"
                />
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-100"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Password strength indicator (Sign Up only) */}
              {!isLogin && formData.password && (
                <div className="mt-1">
                  <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getPasswordStrengthColor()}`} 
                      style={{ width: formData.password ? 
                        passwordStrength() === "weak" ? "33%" : 
                        passwordStrength() === "medium" ? "66%" : "100%" : "0%" 
                      }}
                    />
                  </div>
                  <p className="text-xs mt-1 text-gray-400">
                    {passwordStrength() === "weak" && "Weak - Use at least 8 characters"}
                    {passwordStrength() === "medium" && "Medium - Add uppercase, numbers or special characters"}
                    {passwordStrength() === "strong" && "Strong password"}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Confirm Password (Sign Up only) */}
            {!isLogin && (
              <motion.div className="mb-4" variants={itemVariants}>
                <label className="block text-gray-300 text-sm mb-1" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className={`w-full bg-gray-800 text-gray-100 rounded-lg py-2 pl-10 pr-3 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                      formData.confirmPassword && formData.password !== formData.confirmPassword
                        ? "focus:ring-red-500 border border-red-500"
                        : "focus:ring-emerald-500"
                    }`}
                    placeholder="••••••••"
                  />
                  <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  
                  {formData.confirmPassword && (
                    formData.password === formData.confirmPassword ? (
                      <CheckCircle size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-500" />
                    ) : (
                      <X size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                    )
                  )}
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs mt-1 text-red-500">Passwords do not match</p>
                )}
              </motion.div>
            )}

            {/* Remember me / Forgot password */}
            {isLogin && (
              <motion.div 
                className="flex justify-between items-center mb-6 text-sm"
                variants={itemVariants}
              >
                <label className="flex items-center text-gray-300">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 rounded border-gray-400 text-emerald-500 focus:ring-emerald-500 bg-gray-800"
                  />
                  Remember me
                </label>
                <a href="#" className="text-emerald-500 hover:text-emerald-400">
                  Forgot password?
                </a>
              </motion.div>
            )}

            {/* Terms and Conditions (Sign Up only) */}
            {!isLogin && (
              <motion.div className="mb-6" variants={itemVariants}>
                <label className="flex items-center text-gray-300 text-sm">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    required
                    className="mr-2 h-4 w-4 rounded border-gray-400 text-emerald-500 focus:ring-emerald-500 bg-gray-800"
                  />
                  I agree to the{" "}
                  <a href="#" className="text-emerald-500 hover:text-emerald-400 mx-1">
                    Terms of Service
                  </a>
                  and
                  <a href="#" className="text-emerald-500 hover:text-emerald-400 mx-1">
                    Privacy Policy
                  </a>
                </label>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-gray-100 py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
                disabled={!isLogin && (!formData.agreeToTerms || formData.password !== formData.confirmPassword)}
              >
                <span>{isLogin ? "Login" : "Create Account"}</span>
                <ArrowRight size={18} className="ml-2" />
              </button>
            </motion.div>

            {/* Switch between Login/Signup */}
            <motion.div 
              className="text-center mt-6 text-gray-300 text-sm"
              variants={itemVariants}
            >
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                className="text-emerald-500 hover:text-emerald-400 font-medium"
                onClick={toggleView}
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </motion.div>
          </form>

          {/* Social Login */}
          <motion.div 
            className="mt-8"
            variants={itemVariants}
          >
            <div className="relative flex items-center justify-center">
              <hr className="w-full border-gray-600" />
              <span className="absolute bg-slate-700 px-4 text-sm text-gray-400">
                Or continue with
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              {/* Google */}
              <button 
                type="button" 
                className="flex justify-center items-center bg-gray-800 hover:bg-gray-700 text-gray-100 py-2 px-4 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
              </button>
              
              {/* Facebook */}
              <button 
                type="button" 
                className="flex justify-center items-center bg-gray-800 hover:bg-gray-700 text-gray-100 py-2 px-4 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22,12c0-5.52-4.48-10-10-10S2,6.48,2,12c0,4.84,3.44,8.87,8,9.8V15H8v-3h2V9.5C10,7.57,11.57,6,13.5,6H16v3h-2 c-0.55,0-1,0.45-1,1v2h3v3h-3v6.95C18.05,21.45,22,17.19,22,12z" />
                </svg>
              </button>
              
              {/* Apple */}
              <button 
                type="button" 
                className="flex justify-center items-center bg-gray-800 hover:bg-gray-700 text-gray-100 py-2 px-4 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.65,13.3c-0.01-1.06,0.47-1.86,1.45-2.42c-0.77-1.12-1.95-1.75-3.52-1.89c-1.48-0.14-3.09,0.87-3.7,0.87 c-0.64,0-1.56-0.85-2.68-0.83C6.23,9.06,4.59,10.15,3.74,11.92c-1.77,3.06-0.45,7.58,1.24,10.05c0.85,1.22,1.84,2.58,3.13,2.53 c1.27-0.05,1.74-0.8,3.27-0.8c1.51,0,1.95,0.8,3.26,0.77c1.35-0.02,2.21-1.21,3.02-2.44c0.97-1.37,1.36-2.72,1.37-2.78 C18.94,19.23,16.67,17.96,16.65,13.3z M13.94,4.59c0.68-0.85,1.19-2.03,1.01-3.26c-1.01,0.07-2.17,0.7-2.86,1.53 c-0.62,0.73-1.18,1.92-1.03,3.03C12.14,6.03,13.23,5.46,13.94,4.59z" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}