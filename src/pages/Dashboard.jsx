import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Calendar, 
  Clock, 
  Activity, 
  Award, 
  TrendingUp, 
  Check, 
  ChevronRight, 
  Dumbbell, 
  User, 
  X,
  BarChart3,
  Heart,
  Flame,
  Target,
  Zap
} from 'lucide-react';

// Mock user data (in a real app, this would come from your backend)
const mockUserData = {
  firstName: "Alex",
  lastName: "Johnson",
  email: "alex.johnson@example.com",
  memberSince: "2023-09-15",
  plan: {
    name: "Premium Fitness",
    type: "Monthly",
    startDate: "2025-03-15",
    endDate: "2025-04-14",
    features: [
      "Unlimited gym access",
      "All group classes",
      "Personal trainer (2 sessions/week)",
      "Nutrition consultation",
      "Access to spa & pool"
    ],
    price: 89.99
  },
  progress: {
    workoutsThisMonth: 12,
    totalWorkouts: 145,
    streak: 5,
    achievements: 8
  },
  upcomingClasses: [
    { id: 1, name: "HIIT Training", trainer: "Mike Peters", time: "Today, 5:30 PM", duration: "45 min" },
    { id: 2, name: "Yoga Flow", trainer: "Sarah Chen", time: "Tomorrow, 8:00 AM", duration: "60 min" },
    { id: 3, name: "Strength & Conditioning", trainer: "James Wilson", time: "Thursday, 7:00 PM", duration: "60 min" }
  ],
  notifications: [  
    { id: 1, type: "warning", message: "Your subscription will expire in 3 days", time: "1 hour ago", read: false },
    { id: 2, type: "info", message: "New class schedule available for next week", time: "Yesterday", read: false },
    { id: 3, type: "success", message: "Congratulations! You've completed 10 workouts this month", time: "2 days ago", read: true }
  ],
  fitnessGoals: [
    { id: 1, name: "Weight Loss", progress: 65, target: "Lose 10 lbs", deadline: "May 15, 2025" },
    { id: 2, name: "Cardio Endurance", progress: 40, target: "Run 5K in 25 min", deadline: "June 1, 2025" }
  ],
  recommendations: [
    { id: 1, type: "class", name: "Boxing Basics", reason: "Based on your interests" },
    { id: 2, type: "workout", name: "Upper Body Focus", reason: "Complement to your recent workouts" }
  ]
};

export default function Dashboard() {
  const [user, setUser] = useState(mockUserData);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(mockUserData.notifications);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update time every minute
    
    return () => clearInterval(interval);
  }, []);
  
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getDaysLeft = () => {
    const endDate = new Date(user.plan.endDate);
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true } 
        : notification
    ));
  };

  const dismissNotification = (notificationId) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning':
        return <Bell size={20} className="text-amber-500" />;
      case 'success':
        return <Check size={20} className="text-emerald-500" />;
      case 'info':
      default:
        return <Bell size={20} className="text-gray-400" />;
    }
  };

  const getNotificationClass = (type) => {
    switch (type) {
      case 'warning':
        return 'border-l-amber-500';
      case 'success':
        return 'border-l-emerald-500';
      case 'info':
      default:
        return 'border-l-gray-400';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const notificationVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: { 
        duration: 0.3
      }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  // Calculate percentage of plan duration used
  const calculatePlanProgress = () => {
    const start = new Date(user.plan.startDate);
    const end = new Date(user.plan.endDate);
    const today = new Date();
    
    const totalDuration = end - start;
    const elapsedDuration = today - start;
    
    let percentage = (elapsedDuration / totalDuration) * 100;
    // Ensure the percentage is between 0 and 100
    percentage = Math.max(0, Math.min(100, percentage));
    
    return percentage;
  };

  const planProgress = calculatePlanProgress();
  const daysLeft = getDaysLeft();
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen pt-16 bg-gray-900 text-gray-100 overflow-x-hidden">
      {/* Hero Banner */}
      <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-center"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="text-emerald-500">FLEX</span><span className="text-amber-500">FIT</span>
              </h1>
              <p className="text-gray-300 mt-2">Your personal fitness journey, optimized.</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="bg-slate-800 p-4 rounded-full border-2 border-emerald-500">
                <User size={28} className="text-emerald-500" />
              </div>
              <div className="ml-4">
                <p className="font-medium text-lg">{user.firstName} {user.lastName}</p>
                <p className="text-gray-400 text-sm">Premium Member</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-6 gap-6"
        >
          {/* Welcome Section */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-4"
          >
            <div className="bg-slate-800 rounded-xl p-6 shadow-lg border-t border-emerald-500/20">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold">
                    {getGreeting()}, <span className="text-emerald-500">{user.firstName}</span>!
                  </h1>
                  <p className="text-gray-300 mt-1">
                    Welcome back to <span className="text-emerald-500">FLEX</span><span className="text-amber-500">FIT</span>. Ready for another great workout?
                  </p>
                </div>
                <div className="bg-gray-900 p-3 rounded-full">
                  <Flame size={28} className="text-amber-500" />
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-900 p-4 rounded-lg flex items-center hover:border hover:border-emerald-500/30 transition-all duration-300 shadow-md">
                  <div className="bg-emerald-500 bg-opacity-20 p-3 rounded-full mr-4">
                    <Activity size={20} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Workouts This Month</p>
                    <h3 className="text-xl font-bold">{user.progress.workoutsThisMonth}</h3>
                  </div>
                </div>
                
                <div className="bg-gray-900 p-4 rounded-lg flex items-center hover:border hover:border-amber-500/30 transition-all duration-300 shadow-md">
                  <div className="bg-amber-500 bg-opacity-20 p-3 rounded-full mr-4">
                    <TrendingUp size={20} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Current Streak</p>
                    <h3 className="text-xl font-bold">{user.progress.streak} days</h3>
                  </div>
                </div>
                
                <div className="bg-gray-900 p-4 rounded-lg flex items-center hover:border hover:border-emerald-500/30 transition-all duration-300 shadow-md">
                  <div className="bg-emerald-500 bg-opacity-20 p-3 rounded-full mr-4">
                    <Dumbbell size={20} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Workouts</p>
                    <h3 className="text-xl font-bold">{user.progress.totalWorkouts}</h3>
                  </div>
                </div>
                
                <div className="bg-gray-900 p-4 rounded-lg flex items-center hover:border hover:border-amber-500/30 transition-all duration-300 shadow-md">
                  <div className="bg-amber-500 bg-opacity-20 p-3 rounded-full mr-4">
                    <Award size={20} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Achievements</p>
                    <h3 className="text-xl font-bold">{user.progress.achievements}</h3>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Notifications Section */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <div className="bg-slate-800 rounded-xl p-6 shadow-lg h-full border-t border-amber-500/20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center">
                  <Bell size={20} className="mr-2" />
                  Notifications
                  {unreadNotificationsCount > 0 && (
                    <span className="ml-2 bg-amber-500 text-gray-900 text-xs font-medium px-2 py-0.5 rounded-full">
                      {unreadNotificationsCount} new
                    </span>
                  )}
                </h2>
                {notifications.length > 0 && (
                  <button 
                    className="text-sm text-emerald-500 hover:text-emerald-400"
                    onClick={() => setShowAllNotifications(!showAllNotifications)}
                  >
                    {showAllNotifications ? "Show Less" : "View All"}
                  </button>
                )}
              </div>
              
              {notifications.length === 0 ? (
                <div className="text-center py-6 text-gray-400">
                  <p>No new notifications</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications
                    .slice(0, showAllNotifications ? notifications.length : 2)
                    .map(notification => (
                      <motion.div 
                        key={notification.id}
                        variants={notificationVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`bg-gray-900 p-3 rounded-lg border-l-4 ${getNotificationClass(notification.type)} ${!notification.read ? 'ring-1 ring-emerald-500 ring-opacity-50' : ''}`}
                      >
                        <div className="flex justify-between">
                          <div className="flex items-start">
                            <div className="mr-3 mt-0.5">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div>
                              <p className={`text-sm ${!notification.read ? 'font-medium' : 'text-gray-300'}`}>
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                          <button 
                            className="text-gray-400 hover:text-gray-300"
                            onClick={() => dismissNotification(notification.id)}
                          >
                            <X size={16} />
                          </button>
                        </div>
                        {!notification.read && (
                          <button
                            className="text-xs text-emerald-500 hover:text-emerald-400 mt-2 flex items-center"
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            Mark as read <Check size={14} className="ml-1" />
                          </button>
                        )}
                      </motion.div>
                    ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Current Plan Section */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-3"
          >
            <div className="bg-slate-800 rounded-xl p-6 shadow-lg border-t border-emerald-500/20">
              <h2 className="text-xl font-bold flex items-center mb-4">
                <Award size={20} className="mr-2 text-amber-500" />
                Current Plan
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="bg-gray-900 rounded-lg p-5 shadow-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-emerald-500">
                          {user.plan.name}
                        </h3>
                        <p className="text-gray-300 text-sm">{user.plan.type} Membership</p>
                      </div>
                      <div className="bg-emerald-500 py-1 px-3 rounded-full text-sm font-medium">
                        Active
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-gray-400 text-sm">Plan Validity</p>
                      <div className="flex items-center mt-1">
                        <Calendar size={16} className="text-gray-400 mr-2" />
                        <p className="text-gray-300">
                          {new Date(user.plan.startDate).toLocaleDateString()} - {new Date(user.plan.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{Math.round(planProgress)}% complete</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${daysLeft <= 3 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                          style={{ width: `${planProgress}%` }}
                        ></div>
                      </div>
                      <p className={`text-sm mt-2 ${daysLeft <= 3 ? 'text-amber-500' : 'text-gray-300'}`}>
                        {daysLeft > 0 ? (
                          <>
                            <Clock size={14} className="inline mr-1" />
                            {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left in your current plan
                          </>
                        ) : (
                          <>
                            <Bell size={14} className="inline mr-1" />
                            Your plan has expired
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 bg-gray-900 rounded-lg p-5 shadow-md">
                    <h4 className="font-medium mb-3">Plan Features</h4>
                    <ul className="space-y-2">
                      {user.plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <Check size={16} className="text-emerald-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <div className="bg-gray-900 rounded-lg p-5 h-full shadow-md">
                    <h4 className="font-medium mb-4">Billing Summary</h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-300">
                        <span>Plan Price</span>
                        <span>${user.plan.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Billing Cycle</span>
                        <span>{user.plan.type}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Next Billing</span>
                        <span>{new Date(user.plan.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 border-t border-gray-700 pt-4">
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total</span>
                        <span className="text-emerald-500">${user.plan.price.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <button className="mt-6 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-lg">
                      Renew Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Upcoming Classes & Stats */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-3"
          >
            <div className="bg-slate-800 rounded-xl p-6 shadow-lg border-t border-amber-500/20">
              <h2 className="text-xl font-bold flex items-center mb-4">
                <Calendar size={20} className="mr-2 text-emerald-500" />
                Upcoming Classes
              </h2>
              
              {user.upcomingClasses.length === 0 ? (
                <div className="text-center py-6 text-gray-400">
                  <p>No upcoming classes</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {user.upcomingClasses.map(cls => (
                    <div key={cls.id} className="bg-gray-900 p-4 rounded-lg shadow-md hover:border hover:border-emerald-500/30 transition-all duration-300">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-emerald-500">{cls.name}</h4>
                        <span className="text-amber-500 text-sm">{cls.duration}</span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">with {cls.trainer}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-400">
                        <Clock size={14} className="mr-1" />
                        {cls.time}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-4 flex justify-center">
                <button className="text-emerald-500 hover:text-emerald-400 text-sm flex items-center">
                  View Full Schedule <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 shadow-lg mt-6 border-t border-emerald-500/20">
              <h2 className="text-xl font-bold flex items-center mb-4">
                <BarChart3 size={20} className="mr-2 text-amber-500" />
                Quick Stats
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-900 p-3 rounded-lg text-center shadow-md hover:border hover:border-amber-500/30 transition-all duration-300">
                  <p className="text-gray-400 text-xs">Member Since</p>
                  <p className="text-lg font-medium mt-1">
                    {new Date(user.memberSince).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  </p>
                </div>
                
                <div className="bg-gray-900 p-3 rounded-lg text-center shadow-md hover:border hover:border-emerald-500/30 transition-all duration-300">
                  <p className="text-gray-400 text-xs">Avg. Workouts</p>
                  <p className="text-lg font-medium mt-1">3x Weekly</p>
                </div>
                
                <div className="bg-gray-900 p-3 rounded-lg text-center shadow-md hover:border hover:border-amber-500/30 transition-all duration-300">
                  <p className="text-gray-400 text-xs">Favorite Class</p>
                  <p className="text-lg font-medium mt-1">HIIT</p>
                </div>
                
                <div className="bg-gray-900 p-3 rounded-lg text-center shadow-md hover:border hover:border-emerald-500/30 transition-all duration-300">
                  <p className="text-gray-400 text-xs">Next Goal</p>
                  <p className="text-lg font-medium mt-1">10 Day Streak</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Fitness Goals Section */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-3"
          >
            <div className="bg-slate-800 rounded-xl p-6 shadow-lg border-t border-emerald-500/20">
              <h2 className="text-xl font-bold flex items-center mb-4">
                <Target size={20} className="mr-2 text-amber-500" />
                Fitness Goals
              </h2>
              
              <div className="space-y-4">
                {user.fitnessGoals.map(goal => (
                  <div key={goal.id} className="bg-gray-900 p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{goal.name}</h4>
                      <span className="text-xs bg-gray-800 text-gray-300 py-1 px-2 rounded">
                        Due: {goal.deadline}
                      </span>
                    </div>
                    <p className="text-emerald-500 text-sm mt-1">{goal.target}</p>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-emerald-500" 
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="mt-4 w-full bg-gray-900 hover:bg-gray-800 text-emerald-500 border border-emerald-500 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                <Zap size={16} className="mr-2" />
                Add New Goal
              </button>
            </div>
          </motion.div>

          {/* Recommended Section */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-3"
          >
            <div className="bg-slate-800 rounded-xl p-6 shadow-lg border-t border-amber-500/20">
              <h2 className="text-xl font-bold flex items-center mb-4">
                <Heart size={20} className="mr-2 text-emerald-500" />
                Recommended For You
              </h2>
              
              <div className="space-y-3">
                {user.recommendations.map(rec => (
                  <div key={rec.id} className="bg-gray-900 p-4 rounded-lg shadow-md hover:border hover:border-amber-500/30 transition-all duration-300">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-emerald-500">{rec.name}</h4>
                        <p className="text-sm text-gray-300 mt-1">{rec.reason}</p>
                      </div>
                      <span className="bg-gray-800 text-xs text-gray-300 px-2 py-1 h-fit rounded capitalize">
                        {rec.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-center">
                <button className="text-emerald-500 hover:text-emerald-400 text-sm flex items-center">
                  View All Recommendations <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Featured Content */}
        <motion.div
          variants={itemVariants}
          className="mt-8 mb-16"
        >
          <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border-t border-amber-500/20">
            <div className="p-6">
              <h2 className="text-2xl font-bold flex items-center mb-4">
                <Zap size={24} className="mr-2 text-amber-500" />
                Featured Programs
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="h-40 bg-gradient-to-r from-emerald-600 to-emerald-400 flex items-center justify-center">
                    <Dumbbell size={48} className="text-white" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg">Strength Mastery</h3>
                    <p className="text-gray-300 text-sm mt-1">12-week progressive program</p>
                    <button className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 rounded transition-colors">Learn More
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="h-40 bg-gradient-to-r from-amber-600 to-amber-400 flex items-center justify-center">
                    <Activity size={48} className="text-white" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg">HIIT Revolution</h3>
                    <p className="text-gray-300 text-sm mt-1">8-week fat burning program</p>
                    <button className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 rounded transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="h-40 bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
                    <Heart size={48} className="text-white" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg">Mindful Movement</h3>
                    <p className="text-gray-300 text-sm mt-1">6-week wellness journey</p>
                    <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 p-4 flex justify-between items-center">
              <p className="text-gray-300">Unlock exclusive programs with your Premium membership</p>
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-lg flex items-center">
                Browse All Programs 
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Footer */}
      
      </div>
    </div>
  );
}