import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Calendar, Weight, Target, Edit, Save, Heart, UserCheck, X, Check } from "lucide-react";

export default function ProfilePage() {
  // Initial profile state
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    age: 28,
    weight: 165,
    height: "5'10\"",
    goals: "Build muscle and improve overall fitness",
    memberSince: "March 2023",
    emergencyContact: {
      name: "Sam Johnson",
      relationship: "Spouse",
      phone: "(555) 987-6543"
    },
    trainer: {
      name: "Coach Mike",
      specialty: "Strength Training",
      phone: "(555) 456-7890",
      email: "mike@fitnessclub.com"
    }
  });

  // Edit mode states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingEmergency, setIsEditingEmergency] = useState(false);
  const [isEditingTrainer, setIsEditingTrainer] = useState(false);
  
  // Temporary states for editing
  const [tempProfile, setTempProfile] = useState({...profile});
  const [tempEmergency, setTempEmergency] = useState({...profile.emergencyContact});
  const [tempTrainer, setTempTrainer] = useState({...profile.trainer});

  // Animation variants
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
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Handle save functions
  const handleSaveProfile = () => {
    setProfile({...profile, ...tempProfile});
    setIsEditingProfile(false);
  };

  const handleSaveEmergency = () => {
    setProfile({
      ...profile, 
      emergencyContact: tempEmergency
    });
    setIsEditingEmergency(false);
  };

  const handleSaveTrainer = () => {
    setProfile({
      ...profile, 
      trainer: tempTrainer
    });
    setIsEditingTrainer(false);
  };

  // Handle cancel functions
  const handleCancelProfile = () => {
    setTempProfile({...profile});
    setIsEditingProfile(false);
  };

  const handleCancelEmergency = () => {
    setTempEmergency({...profile.emergencyContact});
    setIsEditingEmergency(false);
  };

  const handleCancelTrainer = () => {
    setTempTrainer({...profile.trainer});
    setIsEditingTrainer(false);
  };

  // Input change handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setTempProfile({
      ...tempProfile,
      [name]: value
    });
  };

  const handleEmergencyChange = (e) => {
    const { name, value } = e.target;
    setTempEmergency({
      ...tempEmergency,
      [name]: value
    });
  };

  const handleTrainerChange = (e) => {
    const { name, value } = e.target;
    setTempTrainer({
      ...tempTrainer,
      [name]: value
    });
  };

  return (
    <div className="min-h-screen bg-gray-800 text-gray-100 pt-24">
      {/* Header */}
      <header className="bg-slate-700 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">My Profile</h1>
        </div>
      </header>

      <motion.div 
        className="container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Section */}
        <motion.section 
          className="mb-10"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <User className="text-emerald-500 mr-3" size={28} />
              <h2 className="text-2xl font-bold">Personal Details</h2>
            </div>
            {!isEditingProfile ? (
              <motion.button
                onClick={() => setIsEditingProfile(true)}
                className="flex items-center bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit size={16} className="mr-2" />
                Edit Details
              </motion.button>
            ) : (
              <div className="flex space-x-2">
                <motion.button
                  onClick={handleSaveProfile}
                  className="flex items-center bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Save size={16} className="mr-2" />
                  Save
                </motion.button>
                <motion.button
                  onClick={handleCancelProfile}
                  className="flex items-center bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded border border-gray-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={16} className="mr-2" />
                  Cancel
                </motion.button>
              </div>
            )}
          </div>
          
          <div className="bg-slate-700 rounded-lg p-6 shadow-lg">
            <div className="flex flex-col md:flex-row">
              {/* Profile Image */}
              <div className="flex flex-col items-center mb-6 md:mb-0 md:mr-10">
                <div className="relative">
                  <motion.div 
                    className="w-40 h-40 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                  >
                    <User size={64} className="text-gray-400" />
                  </motion.div>
                  {isEditingProfile && (
                    <motion.div 
                      className="absolute bottom-0 right-0 bg-emerald-500 p-2 rounded-full cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit size={16} className="text-white" />
                    </motion.div>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-400">Member since {profile.memberSince}</p>
              </div>
              
              {/* Profile Details */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div>
                    <div className="mb-4">
                      <label className="block text-gray-400 text-sm mb-1">Full Name</label>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          name="name"
                          value={tempProfile.name}
                          onChange={handleProfileChange}
                          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-emerald-500 focus:outline-none"
                        />
                      ) : (
                        <p className="text-lg">{profile.name}</p>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-400 text-sm mb-1">Email</label>
                      {isEditingProfile ? (
                        <input
                          type="email"
                          name="email"
                          value={tempProfile.email}
                          onChange={handleProfileChange}
                          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-emerald-500 focus:outline-none"
                        />
                      ) : (
                        <div className="flex items-center">
                          <Mail size={16} className="text-emerald-500 mr-2" />
                          <p>{profile.email}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-400 text-sm mb-1">Phone</label>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          name="phone"
                          value={tempProfile.phone}
                          onChange={handleProfileChange}
                          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-emerald-500 focus:outline-none"
                        />
                      ) : (
                        <div className="flex items-center">
                          <Phone size={16} className="text-emerald-500 mr-2" />
                          <p>{profile.phone}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Right Column */}
                  <div>
                    <div className="mb-4">
                      <label className="block text-gray-400 text-sm mb-1">Age</label>
                      {isEditingProfile ? (
                        <input
                          type="number"
                          name="age"
                          value={tempProfile.age}
                          onChange={handleProfileChange}
                          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-emerald-500 focus:outline-none"
                        />
                      ) : (
                        <div className="flex items-center">
                          <Calendar size={16} className="text-emerald-500 mr-2" />
                          <p>{profile.age} years</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-400 text-sm mb-1">Weight</label>
                      {isEditingProfile ? (
                        <input
                          type="number"
                          name="weight"
                          value={tempProfile.weight}
                          onChange={handleProfileChange}
                          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-emerald-500 focus:outline-none"
                        />
                      ) : (
                        <div className="flex items-center">
                          <Weight size={16} className="text-emerald-500 mr-2" />
                          <p>{profile.weight} lbs</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-400 text-sm mb-1">Height</label>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          name="height"
                          value={tempProfile.height}
                          onChange={handleProfileChange}
                          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-emerald-500 focus:outline-none"
                        />
                      ) : (
                        <p>{profile.height}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Full Width Fields */}
                <div className="mt-2">
                  <label className="block text-gray-400 text-sm mb-1">Fitness Goals</label>
                  {isEditingProfile ? (
                    <textarea
                      name="goals"
                      value={tempProfile.goals}
                      onChange={handleProfileChange}
                      className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-emerald-500 focus:outline-none h-20"
                    ></textarea>
                  ) : (
                    <div className="flex items-start">
                      <Target size={16} className="text-emerald-500 mr-2 mt-1" />
                      <p>{profile.goals}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Emergency Contact Section */}
        <motion.section 
          className="mb-10"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Heart className="text-emerald-500 mr-3" size={28} />
              <h2 className="text-2xl font-bold">Emergency Contact</h2>
            </div>
            {!isEditingEmergency ? (
              <motion.button
                onClick={() => setIsEditingEmergency(true)}
                className="flex items-center bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit size={16} className="mr-2" />
                Edit Contact
              </motion.button>
            ) : (
              <div className="flex space-x-2">
                <motion.button
                  onClick={handleSaveEmergency}
                  className="flex items-center bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Save size={16} className="mr-2" />
                  Save
                </motion.button>
                <motion.button
                  onClick={handleCancelEmergency}
                  className="flex items-center bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded border border-gray-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={16} className="mr-2" />
                  Cancel
                </motion.button>
              </div>
            )}
          </div>
          
          <div className="bg-slate-700 rounded-lg p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Name</label>
                {isEditingEmergency ? (
                  <input
                    type="text"
                    name="name"
                    value={tempEmergency.name}
                    onChange={handleEmergencyChange}
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-emerald-500 focus:outline-none"
                  />
                ) : (
                  <p>{profile.emergencyContact.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-1">Relationship</label>
                {isEditingEmergency ? (
                  <input
                    type="text"
                    name="relationship"
                    value={tempEmergency.relationship}
                    onChange={handleEmergencyChange}
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-emerald-500 focus:outline-none"
                  />
                ) : (
                  <p>{profile.emergencyContact.relationship}</p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-1">Phone</label>
                {isEditingEmergency ? (
                  <input
                    type="text"
                    name="phone"
                    value={tempEmergency.phone}
                    onChange={handleEmergencyChange}
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-emerald-500 focus:outline-none"
                  />
                ) : (
                  <div className="flex items-center">
                    <Phone size={16} className="text-emerald-500 mr-2" />
                    <p>{profile.emergencyContact.phone}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Trainer Details Section */}
        <motion.section 
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <UserCheck className="text-emerald-500 mr-3" size={28} />
              <h2 className="text-2xl font-bold">Personal Trainer</h2>
            </div>
            {!isEditingTrainer ? (
              <motion.button
                onClick={() => setIsEditingTrainer(true)}
                className="flex items-center bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit size={16} className="mr-2" />
                Edit Trainer
              </motion.button>
            ) : (
              <div className="flex space-x-2">
                <motion.button
                  onClick={handleSaveTrainer}
                  className="flex items-center bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Save size={16} className="mr-2" />
                  Save
                </motion.button>
                <motion.button
                  onClick={handleCancelTrainer}
                  className="flex items-center bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded border border-gray-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={16} className="mr-2" />
                  Cancel
                </motion.button>
              </div>
            )}
          </div>
          
          <motion.div 
            className="bg-slate-700 rounded-lg p-6 shadow-lg"
            whileHover={{ boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col md:flex-row">
              {/* Trainer Image */}
              <div className="flex flex-col items-center mb-6 md:mb-0 md:mr-10">
                <div className="w-32 h-32 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
                  <UserCheck size={48} className="text-gray-400" />
                </div>
              </div>
              
              {/* Trainer Details */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Name</label>
                    {isEditingTrainer ? (
                      <input
                        type="text"
                        name="name"
                        value={tempTrainer.name}
                        onChange={handleTrainerChange}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-emerald-500 focus:outline-none"
                      />
                    ) : (
                      <p className="text-lg font-medium">{profile.trainer.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Specialty</label>
                    {isEditingTrainer ? (
                      <input
                        type="text"
                        name="specialty"
                        value={tempTrainer.specialty}
                        onChange={handleTrainerChange}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-emerald-500 focus:outline-none"
                      />
                    ) : (
                      <p>{profile.trainer.specialty}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Phone</label>
                    {isEditingTrainer ? (
                      <input
                        type="text"
                        name="phone"
                        value={tempTrainer.phone}
                        onChange={handleTrainerChange}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-emerald-500 focus:outline-none"
                      />
                    ) : (
                      <div className="flex items-center">
                        <Phone size={16} className="text-emerald-500 mr-2" />
                        <p>{profile.trainer.phone}</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Email</label>
                    {isEditingTrainer ? (
                      <input
                        type="email"
                        name="email"
                        value={tempTrainer.email}
                        onChange={handleTrainerChange}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-emerald-500 focus:outline-none"
                      />
                    ) : (
                      <div className="flex items-center">
                        <Mail size={16} className="text-emerald-500 mr-2" />
                        <p>{profile.trainer.email}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {!isEditingTrainer && (
                  <motion.button
                    className="mt-4 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail size={16} className="mr-2" />
                    Contact Trainer
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.section>
      </motion.div>
    </div>
  );
}