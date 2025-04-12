import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, CreditCard, CheckCircle, ChevronRight, ArrowRight, Award, Users, Dumbbell } from "lucide-react";

const MySubscription = () => {
  // Mock user subscription data - this would typically come from an API
  const [subscription, setSubscription] = useState({
    plan: "Premium",
    cost: "$49.99",
    billingCycle: "monthly",
    startDate: "March 15, 2025",
    endDate: "April 15, 2025",
    daysLeft: 3,
    totalDays: 30,
    features: [
      "Unlimited access to all equipment",
      "Group fitness classes included",
      "Personal trainer session (2x/month)",
      "Locker rental included",
      "Guest passes (2 per month)"
    ],
    usage: {
      gymVisits: {
        used: 12,
        total: 'Unlimited'
      },
      personalTraining: {
        used: 1,
        total: 2
      },
      groupClasses: {
        used: 5,
        total: 'Unlimited'
      }
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 1,
      name: "Basic",
      price: "$29.99",
      cycle: "monthly",
      features: [
        "Access to gym equipment",
        "Basic fitness assessment",
        "Limited hours (6am-8pm)"
      ]
    },
    {
      id: 2,
      name: "Premium",
      price: "$49.99",
      cycle: "monthly",
      features: [
        "Unlimited access to all equipment",
        "Group fitness classes included",
        "Personal trainer session (2x/month)",
        "Locker rental included",
        "Guest passes (2 per month)"
      ],
      popular: true
    },
    {
      id: 3,
      name: "Elite",
      price: "$79.99",
      cycle: "monthly",
      features: [
        "All Premium features",
        "Unlimited personal training sessions",
        "Nutrition consultation",
        "Spa access",
        "Priority class booking"
      ]
    }
  ];

  // Calculate progress percentage
  const progressPercentage = 100 - ((subscription.daysLeft / subscription.totalDays) * 100);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const selectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="bg-gray-800 min-h-screen p-6 text-gray-100 pt-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8">My Subscription</h1>
          
          {/* Current Plan Card */}
          <div className="bg-slate-700 rounded-xl overflow-hidden shadow-lg mb-8">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{subscription.plan} Plan</h2>
                  <p className="text-gray-300">{subscription.cost} {subscription.billingCycle}</p>
                </div>
                <motion.div
                  className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  Active
                </motion.div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="text-emerald-500" size={20} />
                  <span>Started: {subscription.startDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-amber-500" size={20} />
                  <span>Expires: {subscription.endDate}</span>
                </div>
              </div>
              
              {/* Subscription Progress */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Subscription Progress</span>
                  <span>{subscription.daysLeft} days left</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
              
              {/* Plan Features */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Plan Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {subscription.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="text-emerald-500 flex-shrink-0" size={18} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Usage Stats */}
          <div className="bg-slate-700 rounded-xl overflow-hidden shadow-lg mb-8">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Plan Usage</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Gym Visits */}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <Dumbbell className="text-emerald-500" size={20} />
                      <span className="font-medium">Gym Visits</span>
                    </div>
                    <span>{subscription.usage.gymVisits.used}/{subscription.usage.gymVisits.total}</span>
                  </div>
                  {subscription.usage.gymVisits.total !== 'Unlimited' && (
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-emerald-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(subscription.usage.gymVisits.used / subscription.usage.gymVisits.total) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  )}
                </div>
                
                {/* Personal Training */}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <Users className="text-amber-500" size={20} />
                      <span className="font-medium">PT Sessions</span>
                    </div>
                    <span>{subscription.usage.personalTraining.used}/{subscription.usage.personalTraining.total}</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-amber-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(subscription.usage.personalTraining.used / subscription.usage.personalTraining.total) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
                
                {/* Group Classes */}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <Users className="text-emerald-500" size={20} />
                      <span className="font-medium">Group Classes</span>
                    </div>
                    <span>{subscription.usage.groupClasses.used}/{subscription.usage.groupClasses.total}</span>
                  </div>
                  {subscription.usage.groupClasses.total !== 'Unlimited' && (
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-emerald-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(subscription.usage.groupClasses.used / subscription.usage.groupClasses.total) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Renew or Change Plan */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              className="bg-emerald-500 text-white py-3 px-6 rounded-lg flex-1 flex items-center justify-center gap-2 font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={toggleModal}
            >
              <CreditCard size={20} />
              <span>Renew Current Plan</span>
            </motion.button>
            
            <motion.button
              className="bg-slate-700 text-white py-3 px-6 rounded-lg flex-1 flex items-center justify-center gap-2 font-medium"
              whileHover={{ scale: 1.02, backgroundColor: "#4B5563" }}
              whileTap={{ scale: 0.98 }}
              onClick={toggleModal}
            >
              <ArrowRight size={20} />
              <span>Change Plan</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      {/* Plan Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Select a Plan</h2>
                <button 
                  className="text-gray-400 hover:text-white"
                  onClick={toggleModal}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {plans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    className={`bg-slate-700 rounded-lg p-5 cursor-pointer relative overflow-hidden ${
                      selectedPlan?.id === plan.id ? "ring-2 ring-emerald-500" : ""
                    }`}
                    whileHover={{ y: -5 }}
                    onClick={() => selectPlan(plan)}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1 transform rotate-45 translate-x-6 -translate-y-1">
                          POPULAR
                        </div>
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <div className="flex items-end gap-1">
                        <span className="text-2xl font-bold">{plan.price}</span>
                        <span className="text-gray-400">/{plan.cycle}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-2 mb-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="text-emerald-500 flex-shrink-0 mt-1" size={16} />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {selectedPlan?.id === plan.id && (
                      <div className="mt-4 flex justify-center">
                        <CheckCircle className="text-emerald-500" size={24} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-end gap-4">
                <motion.button
                  className="bg-slate-600 text-white py-2 px-4 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={toggleModal}
                >
                  Cancel
                </motion.button>
                
                <motion.button
                  className={`bg-emerald-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 ${
                    !selectedPlan ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  whileHover={{ scale: selectedPlan ? 1.02 : 1 }}
                  whileTap={{ scale: selectedPlan ? 0.98 : 1 }}
                  disabled={!selectedPlan}
                >
                  <CreditCard size={18} />
                  <span>Confirm Selection</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MySubscription;