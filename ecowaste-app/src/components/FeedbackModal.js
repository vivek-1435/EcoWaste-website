import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { wasteAPI } from '../services/api';

export default function FeedbackModal({ request, onClose, onSuccess }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!request) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await wasteAPI.addFeedback(request._id, {
        rating,
        comment
      });

      if (response.success) {
        onSuccess();
        onClose();
      } else {
        setError(response.message || 'Failed to submit feedback');
      }
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-effect border border-emerald-500/20 rounded-2xl p-8 max-w-md w-full relative animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-bold mb-2 text-center">Rate Your Experience</h3>
        <p className="text-gray-400 text-center mb-6 text-sm">
          How was your waste collection service for {request.wasteType}?
        </p>

        <form onSubmit={handleSubmit}>
          {/* Star Rating */}
          <div className="flex justify-center space-x-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none transition-transform hover:scale-110"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoverRating || rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-600'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Feedback (Optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full glass-effect px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10 h-32 resize-none"
              placeholder="Tell us about your experience..."
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-emerald-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
}
