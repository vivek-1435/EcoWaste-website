import React, { useEffect, useState } from 'react';
import { X, Package, TrendingUp, Users, DollarSign, Search, Filter, CheckCircle, Edit, Star } from 'lucide-react';
import { wasteAPI } from '../services/api';
import StatusBadge from './StatusBadge';

export default function AdminPanel({ isOpen, onClose }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRequest, setEditingRequest] = useState(null);
  const [updateData, setUpdateData] = useState({
    status: '',
    actualWeight: '',
    pricePerKg: ''
  });

  useEffect(() => {
    if (isOpen) {
      fetchRequests();
    }
  }, [isOpen, filter]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await wasteAPI.getAllRequests({ status: filter === 'all' ? '' : filter });
      if (response.success) {
        setRequests(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (requestId) => {
    try {
      const response = await wasteAPI.updateStatus(requestId, updateData);
      if (response.success) {
        setEditingRequest(null);
        fetchRequests();
        alert('Status updated successfully!');
      }
    } catch (error) {
      alert('Failed to update status: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleToggleFeatured = async (requestId) => {
    try {
      const response = await wasteAPI.toggleFeatured(requestId);
      if (response.success) {
        fetchRequests();
      }
    } catch (error) {
      alert('Failed to toggle featured status');
    }
  };

  const filteredRequests = requests.filter(req => {
    if (!searchTerm) return true;
    return (
      req.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.wasteType?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    verified: requests.filter(r => r.status === 'verified').length,
    collected: requests.filter(r => r.status === 'collected').length,
    completed: requests.filter(r => r.status === 'completed').length,
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="glass-effect border border-emerald-500/20 rounded-3xl p-4 md:p-8 max-w-7xl w-full relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 glass-effect p-2 rounded-lg hover:bg-white/10 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Admin Panel
            </span>
          </h2>
          <p className="text-gray-400">Manage all waste requests and payments</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="glass-effect p-4 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3">
              <Package className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-gray-400">Total</p>
              </div>
            </div>
          </div>
          <div className="glass-effect p-4 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-xs text-gray-400">Pending</p>
              </div>
            </div>
          </div>
          <div className="glass-effect p-4 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-2xl font-bold">{stats.verified}</p>
                <p className="text-xs text-gray-400">Verified</p>
              </div>
            </div>
          </div>
          <div className="glass-effect p-4 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3">
              <Package className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-2xl font-bold">{stats.collected}</p>
                <p className="text-xs text-gray-400">Collected</p>
              </div>
            </div>
          </div>
          <div className="glass-effect p-4 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-2xl font-bold">{stats.completed}</p>
                <p className="text-xs text-gray-400">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or waste type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full glass-effect pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'verified', 'collected', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-xl transition ${
                  filter === status
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                    : 'glass-effect hover:bg-white/5'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Requests Table */}
        <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading requests...</div>
          ) : filteredRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No requests found</p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div
                key={request._id}
                className="glass-effect p-6 rounded-xl border border-white/10 hover:border-emerald-500/30 transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold mb-1">{request.name || 'Anonymous'}</h3>
                    <p className="text-sm text-gray-400">{request.email || 'No email'}</p>
                    <p className="text-sm text-gray-400">{request.phone}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <StatusBadge status={request.status} />
                    <button
                      onClick={() => {
                        setEditingRequest(request._id);
                        setUpdateData({
                          status: request.status,
                          actualWeight: request.actualWeight || request.estimatedWeight,
                          pricePerKg: request.pricePerKg || '6'
                        });
                      }}
                      className="glass-effect p-2 rounded-lg hover:bg-emerald-500/10 transition"
                    >
                      <Edit className="w-4 h-4 text-emerald-400" />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Waste Type</p>
                    <p className="text-sm font-semibold">{request.wasteType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Weight</p>
                    <p className="text-sm font-semibold">
                      {request.actualWeight || request.estimatedWeight} kg
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Payment</p>
                    <p className="text-sm font-semibold">
                      {request.totalAmount ? `₹${request.totalAmount}` : 'Pending'}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-1">Address</p>
                  <p className="text-sm">{request.address}</p>
                </div>

                {/* Payment Credentials */}
                <div className="glass-effect p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 mb-4">
                  <p className="text-xs text-emerald-400 font-semibold mb-3 flex items-center space-x-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Payment Details</span>
                  </p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-400">Payment Method</p>
                      <p className="text-sm font-semibold capitalize">{request.paymentMethod || 'Not specified'}</p>
                    </div>
                    
                    {request.paymentMethod === 'upi' && request.upiId && (
                      <div>
                        <p className="text-xs text-gray-400">UPI ID</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-mono bg-black/20 px-3 py-1 rounded">{request.upiId}</p>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(request.upiId);
                              alert('UPI ID copied!');
                            }}
                            className="text-xs bg-emerald-500/20 hover:bg-emerald-500/30 px-2 py-1 rounded transition"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {request.paymentMethod === 'bank' && request.bankDetails && (
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-400">Account Holder</p>
                          <p className="text-sm font-semibold">{request.bankDetails.accountHolderName}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Account Number</p>
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-mono bg-black/20 px-3 py-1 rounded">{request.bankDetails.accountNumber}</p>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(request.bankDetails.accountNumber);
                                alert('Account number copied!');
                              }}
                              className="text-xs bg-emerald-500/20 hover:bg-emerald-500/30 px-2 py-1 rounded transition"
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">IFSC Code</p>
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-mono bg-black/20 px-3 py-1 rounded">{request.bankDetails.ifscCode}</p>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(request.bankDetails.ifscCode);
                                alert('IFSC code copied!');
                              }}
                              className="text-xs bg-emerald-500/20 hover:bg-emerald-500/30 px-2 py-1 rounded transition"
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Bank Name</p>
                          <p className="text-sm font-semibold">{request.bankDetails.bankName}</p>
                        </div>
                      </div>
                    )}
                    
                    {request.paymentMethod === 'cash' && (
                      <p className="text-sm text-gray-400">Cash payment on collection</p>
                    )}
                  </div>
                </div>

                {/* User Feedback & Feature Control */}
                {request.feedback && request.feedback.rating && (
                  <div className="glass-effect p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 mb-4">
                    <div className="flex justify-between items-start mb-2">
                       <p className="text-xs text-yellow-400 font-semibold flex items-center space-x-2">
                        <Star className="w-4 h-4 fill-yellow-400" />
                        <span>User Feedback</span>
                      </p>
                      <button
                        onClick={() => handleToggleFeatured(request._id)}
                        className={`text-xs px-2 py-1 rounded transition ${
                          request.feedback.isFeatured
                            ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                            : 'bg-white/10 text-gray-400 hover:bg-white/20'
                        }`}
                      >
                        {request.feedback.isFeatured ? 'Featured ★' : 'Feature'}
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < request.feedback.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-300 italic">"{request.feedback.comment}"</p>
                  </div>
                )}

                {editingRequest === request._id && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <h4 className="font-semibold mb-3">Update Request</h4>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-xs text-gray-400 mb-2">Status</label>
                        <select
                          value={updateData.status}
                          onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
                          className="w-full glass-effect px-3 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                        >
                          <option value="pending">Pending</option>
                          <option value="verified">Verified</option>
                          <option value="collected">Collected</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-2">Actual Weight (kg)</label>
                        <input
                          type="number"
                          value={updateData.actualWeight}
                          onChange={(e) => setUpdateData({ ...updateData, actualWeight: e.target.value })}
                          className="w-full glass-effect px-3 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-2">Price per kg (₹)</label>
                        <input
                          type="number"
                          value={updateData.pricePerKg}
                          onChange={(e) => setUpdateData({ ...updateData, pricePerKg: e.target.value })}
                          className="w-full glass-effect px-3 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateStatus(request._id)}
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 rounded-lg hover:shadow-lg transition"
                      >
                        Update Status
                      </button>
                      <button
                        onClick={() => setEditingRequest(null)}
                        className="glass-effect px-4 py-2 rounded-lg hover:bg-white/5 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
