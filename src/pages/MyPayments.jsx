import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Download, 
  CreditCard, 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  Search,
  ArrowDownCircle
} from "lucide-react";

export default function MyPayments() {
  const [activeTab, setActiveTab] = useState("history");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedPayment, setExpandedPayment] = useState(null);

  // Mock data for payment history
  const payments = [
    {
      id: "INV-2025-0412",
      date: "April 10, 2025",
      amount: "$49.99",
      description: "Monthly Membership - April 2025",
      status: "paid",
      method: "Credit Card (****4567)",
      receiptUrl: "#"
    },
    {
      id: "INV-2025-0312",
      date: "March 10, 2025",
      amount: "$49.99",
      description: "Monthly Membership - March 2025",
      status: "paid",
      method: "Credit Card (****4567)",
      receiptUrl: "#"
    },
    {
      id: "INV-2025-0210",
      date: "February 10, 2025",
      amount: "$49.99",
      description: "Monthly Membership - February 2025",
      status: "paid",
      method: "PayPal",
      receiptUrl: "#"
    },
    {
      id: "INV-2025-0110",
      date: "January 10, 2025",
      amount: "$149.99",
      description: "Personal Training Session (3x)",
      status: "paid",
      method: "Credit Card (****4567)",
      receiptUrl: "#"
    },
    {
      id: "INV-2024-1210",
      date: "December 10, 2024",
      amount: "$49.99",
      description: "Monthly Membership - December 2024",
      status: "paid",
      method: "Credit Card (****4567)",
      receiptUrl: "#"
    }
  ];

  // Mock data for pending dues
  const pendingDues = [
    {
      id: "DUE-2025-0510",
      dueDate: "May 10, 2025",
      amount: "$49.99",
      description: "Monthly Membership - May 2025",
      status: "upcoming",
      paymentMethod: "Credit Card (****4567)"
    },
    {
      id: "DUE-2025-0415",
      dueDate: "April 15, 2025",
      amount: "$25.00",
      description: "Protein Shake Package",
      status: "overdue",
      paymentMethod: "Not selected"
    }
  ];

  const togglePaymentDetails = (id) => {
    setExpandedPayment(expandedPayment === id ? null : id);
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    
    // Simple date filtering logic (could be improved with proper date parsing)
    const matchesDate = dateFilter === "all" || 
                        (dateFilter === "recent" && ["April 10, 2025", "March 10, 2025"].includes(payment.date)) ||
                        (dateFilter === "older" && !["April 10, 2025", "March 10, 2025"].includes(payment.date));
    
    return matchesSearch && matchesStatus && matchesDate;
  });

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
          <h1 className="text-3xl font-bold text-center">My Payments</h1>
        </div>
      </header>

      <motion.div 
        className="container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Tabs */}
        <motion.div 
          className="flex mb-8 border-b border-gray-700"
          variants={itemVariants}
        >
          <button
            className={`py-3 px-6 font-medium ${activeTab === "history" ? "border-b-2 border-emerald-500 text-emerald-500" : "text-gray-400 hover:text-gray-100"}`}
            onClick={() => setActiveTab("history")}
          >
            Payment History
          </button>
          <button
            className={`py-3 px-6 font-medium ${activeTab === "pending" ? "border-b-2 border-emerald-500 text-emerald-500" : "text-gray-400 hover:text-gray-100"}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending Dues
            {pendingDues.length > 0 && (
              <span className="ml-2 bg-amber-500 text-xs font-semibold rounded-full px-2 py-1">
                {pendingDues.length}
              </span>
            )}
          </button>
        </motion.div>

        {/* Payment History Section */}
        {activeTab === "history" && (
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row justify-between mb-6">
              {/* Search */}
              <div className="relative mb-4 md:mb-0 md:w-64">
                <input
                  type="text"
                  placeholder="Search payments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pl-10 rounded bg-gray-800 border border-gray-700 focus:border-emerald-500 focus:outline-none"
                />
                <Search size={18} className="absolute left-3 top-3.5 text-gray-400" />
              </div>

              {/* Filter */}
              <div className="relative">
                <button
                  className="p-3 flex items-center rounded bg-slate-700 hover:bg-slate-600 transition-colors duration-200"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  <Filter size={18} className="mr-2 text-emerald-500" />
                  Filter Options
                  {filterOpen ? (
                    <ChevronUp size={18} className="ml-2" />
                  ) : (
                    <ChevronDown size={18} className="ml-2" />
                  )}
                </button>

                {filterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-64 bg-slate-700 rounded shadow-lg p-4 z-10"
                  >
                    <div className="mb-4">
                      <label className="block mb-2 font-medium">Date Range</label>
                      <select
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                      >
                        <option value="all">All Time</option>
                        <option value="recent">Last 30 Days</option>
                        <option value="older">Older Than 30 Days</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 font-medium">Status</label>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                      >
                        <option value="all">All Statuses</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                      </select>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {filteredPayments.length > 0 ? (
              <div className="bg-slate-700 rounded-lg shadow-lg overflow-hidden">
                {filteredPayments.map((payment, index) => (
                  <div key={payment.id} className="border-b border-gray-700 last:border-b-0">
                    <div 
                      className="p-4 hover:bg-slate-600 cursor-pointer transition-colors duration-200"
                      onClick={() => togglePaymentDetails(payment.id)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex items-start mb-2 md:mb-0">
                          <div className="mr-3 mt-1">
                            <CheckCircle size={20} className="text-emerald-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">
                              {payment.description}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {payment.id} • {payment.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center ml-8">
                          <p className="font-medium mr-4">{payment.amount}</p>
                          <motion.div 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.95 }}
                          >
                            <button
                              className="text-emerald-500 hover:text-emerald-400"
                              onClick={(e) => {
                                e.stopPropagation();
                                alert(`Downloading receipt for ${payment.id}`);
                              }}
                            >
                              <Download size={20} />
                            </button>
                          </motion.div>
                          <motion.div animate={{ rotate: expandedPayment === payment.id ? 180 : 0 }}>
                            <ChevronDown size={20} className="ml-2 text-gray-400" />
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    <motion.div 
                      initial="collapsed"
                      animate={expandedPayment === payment.id ? "expanded" : "collapsed"}
                      variants={{
                        expanded: { opacity: 1, height: "auto", padding: 16 },
                        collapsed: { opacity: 0, height: 0, padding: 0, overflow: "hidden" }
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="bg-gray-800 border-t border-gray-700"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Payment ID</p>
                          <p>{payment.id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Payment Date</p>
                          <p>{payment.date}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Payment Method</p>
                          <p>{payment.method}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Status</p>
                          <p className="flex items-center">
                            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                            Paid
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <motion.button
                          className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded flex items-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`Downloading full invoice for ${payment.id}`);
                          }}
                        >
                          <ArrowDownCircle size={18} className="mr-2" />
                          Download Full Invoice
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-700 rounded-lg p-8 text-center">
                <p className="text-gray-400">No payment records found matching your filters.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Pending Dues Section */}
        {activeTab === "pending" && (
          <motion.div
            variants={itemVariants}
          >
            {pendingDues.length > 0 ? (
              <div className="bg-slate-700 rounded-lg shadow-lg overflow-hidden">
                {pendingDues.map((due) => (
                  <div key={due.id} className="border-b border-gray-700 last:border-b-0 p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-start mb-2 md:mb-0">
                        <div className="mr-3 mt-1">
                          {due.status === "overdue" ? (
                            <AlertCircle size={20} className="text-red-500" />
                          ) : (
                            <Clock size={20} className="text-amber-500" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {due.description}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {due.id} • Due on {due.dueDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center ml-8">
                        <p className="font-medium mr-4">{due.amount}</p>
                        <motion.button
                          className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => alert(`Processing payment for ${due.id}`)}
                        >
                          Pay Now
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-700 rounded-lg p-8 text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle size={48} className="text-emerald-500" />
                </div>
                <h3 className="text-xl font-medium mb-2">All Caught Up!</h3>
                <p className="text-gray-400">You have no pending payments due at this time.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Summary Card */}
        <motion.div 
          className="mt-8 bg-slate-700 rounded-lg p-6 shadow-lg"
          variants={itemVariants}
        >
          <h3 className="text-lg font-medium mb-4">Payment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 rounded p-4">
              <p className="text-sm text-gray-400 mb-1">Total Payments (YTD)</p>
              <p className="text-2xl font-medium">$349.95</p>
            </div>
            <div className="bg-gray-800 rounded p-4">
              <p className="text-sm text-gray-400 mb-1">Pending Dues</p>
              <p className="text-2xl font-medium">$74.99</p>
            </div>
            <div className="bg-gray-800 rounded p-4">
              <p className="text-sm text-gray-400 mb-1">Next Payment Date</p>
              <p className="text-2xl font-medium">May 10</p>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            <p>Need help with your payment? Contact our support team at support@coolgym.com</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}