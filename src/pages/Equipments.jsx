import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Info, Clock, CheckCircle, XCircle, ChevronDown, ChevronUp, Play } from "lucide-react";

// This would typically come from an API
const equipmentData = [
  {
    id: 1,
    name: "Smith Machine",
    image: "/api/placeholder/300/200",
    description: "A weight machine used for weight training that consists of a barbell fixed within steel rails.",
    status: "available",
    usageInstructions: "1. Adjust the safety stops. 2. Select your weight. 3. Position yourself under the bar. 4. Rotate the bar to unhook it. 5. Perform your exercise. 6. Rotate to re-hook when finished.",
    videoUrl: "#smith-machine-demo"
  },
  {
    id: 2,
    name: "Lat Pulldown Machine",
    image: "/api/placeholder/300/200",
    description: "A resistance machine used to strengthen the latissimus dorsi muscles in the back.",
    status: "busy",
    usageInstructions: "1. Adjust the thigh pads. 2. Select your weight. 3. Grip the bar with hands wider than shoulder-width. 4. Pull the bar down to your chest. 5. Slowly return to starting position.",
    videoUrl: "#lat-pulldown-demo"
  },
  {
    id: 3,
    name: "Leg Press Machine",
    image: "/api/placeholder/300/200",
    description: "A weight training machine used to strengthen the quadriceps, hamstrings, and glutes.",
    status: "maintenance",
    usageInstructions: "1. Adjust the seat position. 2. Select your weight. 3. Place feet shoulder-width apart on the platform. 4. Release the safety and push the platform away. 5. Slowly bend knees to return.",
    videoUrl: "#leg-press-demo"
  },
  {
    id: 4,
    name: "Cable Crossover Machine",
    image: "/api/placeholder/300/200",
    description: "A versatile machine that allows for a variety of exercises targeting different muscle groups.",
    status: "available",
    usageInstructions: "1. Adjust the pulleys to desired height. 2. Select your weight. 3. Grab the handles. 4. Step forward and perform your exercise. 5. Control the movement in both directions.",
    videoUrl: "#cable-crossover-demo"
  }
];

const EquipmentGuide = () => {
  const [expanded, setExpanded] = useState({});
  const [filter, setFilter] = useState("all");

  const toggleExpand = (id) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "available":
        return <CheckCircle className="text-emerald-500" />;
      case "busy":
        return <Clock className="text-amber-500" />;
      case "maintenance":
        return <XCircle className="text-red-500" />;
      default:
        return <Info className="text-gray-400" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "available":
        return "Available";
      case "busy":
        return "In Use";
      case "maintenance":
        return "Under Maintenance";
      default:
        return "Unknown";
    }
  };

  const filteredEquipment = filter === "all" 
    ? equipmentData 
    : equipmentData.filter(item => item.status === filter);

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen p-6 pt-24">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Gym Equipment Guide
        </motion.h1>

        <div className="mb-6 flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg transition-all ${filter === "all" ? "bg-emerald-500 text-white" : "bg-slate-700 hover:bg-slate-600"}`}
          >
            All Equipment
          </button>
          <button 
            onClick={() => setFilter("available")}
            className={`px-4 py-2 rounded-lg transition-all ${filter === "available" ? "bg-emerald-500 text-white" : "bg-slate-700 hover:bg-slate-600"}`}
          >
            Available
          </button>
          <button 
            onClick={() => setFilter("busy")}
            className={`px-4 py-2 rounded-lg transition-all ${filter === "busy" ? "bg-amber-500 text-white" : "bg-slate-700 hover:bg-slate-600"}`}
          >
            In Use
          </button>
          <button 
            onClick={() => setFilter("maintenance")}
            className={`px-4 py-2 rounded-lg transition-all ${filter === "maintenance" ? "bg-red-500 text-white" : "bg-slate-700 hover:bg-slate-600"}`}
          >
            Maintenance
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEquipment.map((equipment) => (
            <motion.div
              key={equipment.id}
              className="bg-slate-700 rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative">
                <img 
                  src={equipment.image} 
                  alt={equipment.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-gray-800 bg-opacity-80 rounded-full p-2 flex items-center gap-2">
                  {getStatusIcon(equipment.status)}
                  <span className="text-sm font-medium">{getStatusText(equipment.status)}</span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{equipment.name}</h3>
                <p className="text-gray-300 mb-4">{equipment.description}</p>
                
                <button 
                  className="w-full flex justify-between items-center py-2 px-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all"
                  onClick={() => toggleExpand(equipment.id)}
                >
                  <span className="font-medium">Usage Instructions</span>
                  {expanded[equipment.id] ? <ChevronUp /> : <ChevronDown />}
                </button>
                
                {expanded[equipment.id] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 p-4 bg-gray-800 rounded-lg"
                  >
                    <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-300">
                      {equipment.usageInstructions.split(/\d+\.\s/).filter(Boolean).map((instruction, idx) => (
                        <li key={idx} className="ml-1">{instruction.trim()}</li>
                      ))}
                    </ol>
                    
                    <a 
                      href={equipment.videoUrl} 
                      className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400 transition-colors"
                    >
                      <Play size={18} />
                      <span>Watch Demo Video</span>
                    </a>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredEquipment.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No equipment found with the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentGuide;