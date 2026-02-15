import React, { useEffect, useState } from 'react';
import { X, TrendingUp, Package, DollarSign, Calendar, Weight, MapPin, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { wasteAPI } from '../services/api';
import StatusBadge from './StatusBadge';
import StatusTimeline from './StatusTimeline';
import FeedbackModal from './FeedbackModal';

export default function Dashboard({ isOpen, onClose }) {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRequests: 0,
    pending: 0,
    completed: 0,
    totalEarnings: 0,

    totalWeight: 0
  });
  const [feedbackRequest, setFeedbackRequest] = useState(null);

  useEffect(() => {
    if (isOpen && user) {
      fetchRequests();
    }
  }, [isOpen, user]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await wasteAPI.getMyRequests();
      if (response.success) {
        setRequests(response.data);
        
        // Calculate stats
        const stats = response.data.reduce((acc, req) => {
          acc.totalRequests++;
          if (req.status === 'pending') acc.pending++;
          if (req.status === 'completed') {
            acc.completed++;
            acc.totalEarnings += req.totalAmount || 0;
            acc.totalWeight += req.actualWeight || 0;
          }
          return acc;
        }, { totalRequests: 0, pending: 0, completed: 0, totalEarnings: 0, totalWeight: 0 });
        
        setStats(stats);
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="glass-effect border border-emerald-500/20 rounded-3xl p-4 md:p-8 max-w-6xl w-full relative my-8">
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
              My Dashboard
            </span>
          </h2>
          <p className="text-gray-400">Track your waste requests and earnings</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-effect p-4 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-500/20 p-3 rounded-lg">
                <DollarSign className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{stats.totalEarnings}</p>
                <p className="text-xs text-gray-400">Total Earnings</p>
              </div>
            </div>
          </div>

          <div className="glass-effect p-4 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <Package className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalRequests}</p>
                <p className="text-xs text-gray-400">Total Requests</p>
              </div>
            </div>
          </div>

          <div className="glass-effect p-4 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-500/20 p-3 rounded-lg">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-xs text-gray-400">Pending</p>
              </div>
            </div>
          </div>

          <div className="glass-effect p-4 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <Weight className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalWeight} kg</p>
                <p className="text-xs text-gray-400">Collected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading requests...</div>
          ) : requests.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No requests yet. Submit your first waste request!</p>
            </div>
          ) : (
            requests.map((request) => (
              <div
                key={request._id}
                className="glass-effect p-6 rounded-xl border border-white/10 hover:border-emerald-500/30 transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold mb-1">{request.wasteType}</h3>
                    <p className="text-sm text-gray-400">
                      Submitted on {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <StatusBadge status={request.status} />
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Weight className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">
                      {request.actualWeight || request.estimatedWeight} kg
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">
                      {request.totalAmount ? `₹${request.totalAmount}` : 'Pending'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 truncate">{request.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">
                      {request.preferredPickup
                        ? new Date(request.preferredPickup).toLocaleDateString()
                        : 'Not specified'}
                    </span>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <StatusTimeline
                    status={request.status}
                    createdAt={request.createdAt}
                    collectedAt={request.collectedAt}
                    paidAt={request.paidAt}
                  />
                </div>

                {request.description && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-sm text-gray-400">{request.description}</p>
                  </div>
                )}

                {/* Feedback Section */}
                {request.status === 'completed' && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    {request.feedback && request.feedback.rating ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= request.feedback.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-emerald-400 font-medium">
                          Thanks for your feedback!
                        </span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setFeedbackRequest(request)}
                        className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-sm font-semibold py-2 rounded-lg transition border border-emerald-500/20"
                      >
                        Rate Service
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        </div>
      </div>
      
      {/* Feedback Modal */}
      {feedbackRequest && (
        <FeedbackModal
          request={feedbackRequest}
          onClose={() => setFeedbackRequest(null)}
          onSuccess={() => {
            fetchRequests(); // Refresh list to show updated rating
            setFeedbackRequest(null);
          }}
        />
      )}
    </>
  );
}
