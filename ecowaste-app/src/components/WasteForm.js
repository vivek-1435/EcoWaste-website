
import React, { useState } from 'react';
import { User, MapPin, Package, Weight, Calendar, Camera, ImageIcon, DollarSign, ArrowRight } from 'lucide-react';
import { wasteAPI } from '../services/api';
import { wasteCategories } from '../constants/data';

export default function WasteForm({ user, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    wasteType: "",
    estimatedWeight: "",
    description: "",
    preferredPickup: "",
    frequency: "one-time",
    paymentMethod: "upi",
    upiId: "",
    bankAccountNumber: "",
    bankIfscCode: "",
    bankAccountHolderName: "",
    bankName: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('phone', formData.phone);
      submitData.append('email', formData.email);
      submitData.append('address', formData.address);
      submitData.append('wasteType', formData.wasteType);
      submitData.append('estimatedWeight', formData.estimatedWeight);
      submitData.append('frequency', formData.frequency);
      submitData.append('description', formData.description);
      submitData.append('paymentMethod', formData.paymentMethod);
      
      // Add payment credentials based on method
      if (formData.paymentMethod === 'upi') {
        submitData.append('upiId', formData.upiId);
      } else if (formData.paymentMethod === 'bank') {
        submitData.append('bankDetails', JSON.stringify({
          accountNumber: formData.bankAccountNumber,
          ifscCode: formData.bankIfscCode,
          accountHolderName: formData.bankAccountHolderName,
          bankName: formData.bankName
        }));
      }
      
      if (formData.preferredPickup) {
        submitData.append('preferredPickup', formData.preferredPickup);
      }
      
      if (selectedImage) {
        submitData.append('image', selectedImage);
      }

      // Submit to backend
      const response = await wasteAPI.createRequest(submitData);

      if (response.success) {
        onSuccess('success', response.message || 'Request submitted successfully!');
        
        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          address: "",
          wasteType: "",
          estimatedWeight: "",
          description: "",
          preferredPickup: "",
          frequency: "one-time",
          paymentMethod: "bank",
        });
        setSelectedImage(null);
        setImagePreview(null);
      }
    } catch (error) {
      console.error('Submission error:', error);
      onSuccess('error', error.response?.data?.message || 'Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (user && user.role === 'admin') {
    return null;
  }

  return (
    <section id="submit-form" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-effect rounded-3xl p-8 border border-emerald-500/20">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Submit Your Waste
              </span>
            </h2>
            <p className="text-gray-400">
              Fill in the details and get instant verification
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <User className="w-5 h-5 text-emerald-400" />
                <span>Personal Information</span>
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full glass-effect px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full glass-effect px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full glass-effect px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Location Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span>Location Details</span>
              </h3>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Pickup Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full glass-effect px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10 custom-scrollbar"
                  placeholder="Complete address with landmarks"
                  rows="3"
                  required
                />
              </div>
            </div>

            {/* Waste Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Package className="w-5 h-5 text-emerald-400" />
                <span>Waste Information</span>
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Waste Type *
                  </label>
                  <select
                    name="wasteType"
                    value={formData.wasteType}
                    onChange={handleInputChange}
                    className="w-full glass-effect px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                    required
                  >
                    <option value="">Select type</option>
                    {wasteCategories.map((cat, i) => (
                      <option key={i} value={cat.name}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Weight (kg) *
                  </label>
                  <div className="relative">
                    <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      name="estimatedWeight"
                      value={formData.estimatedWeight}
                      onChange={handleInputChange}
                      className="w-full glass-effect pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                      placeholder="0"
                      min="1"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Frequency
                  </label>
                  <select
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleInputChange}
                    className="w-full glass-effect px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                  >
                    <option value="one-time">One-time Pickup</option>
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Preferred Pickup
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="datetime-local"
                      name="preferredPickup"
                      value={formData.preferredPickup}
                      onChange={handleInputChange}
                      className="w-full glass-effect pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Camera className="w-5 h-5 text-emerald-400" />
                <span>Upload Image (Optional)</span>
              </h3>

              <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-emerald-500/30 transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setSelectedImage(null);
                        }}
                        className="text-sm text-red-400 hover:text-red-300"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                        <ImageIcon className="w-8 h-8 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          Click to upload image
                        </p>
                        <p className="text-sm text-gray-400">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="glass-effect p-6 rounded-2xl border border-white/10">
              <div className="flex items-center space-x-2 mb-4">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <span>Payment Method</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["upi", "bank", "cash"].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, paymentMethod: method })
                    }
                    className={`p-4 rounded-xl border-2 transition ${
                      formData.paymentMethod === method
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <p className="font-semibold capitalize">{method}</p>
                  </button>
                ))}
              </div>

              {/* UPI ID Field */}
              {formData.paymentMethod === "upi" && (
                <div className="mt-4">
                  <label className="block text-sm text-gray-400 mb-2">
                    UPI ID *
                  </label>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleInputChange}
                    className="w-full glass-effect px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                    placeholder="yourname@upi"
                    required={formData.paymentMethod === "upi"}
                  />
                </div>
              )}

              {/* Bank Details Fields */}
              {formData.paymentMethod === "bank" && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Account Holder Name *
                    </label>
                    <input
                      type="text"
                      name="bankAccountHolderName"
                      value={formData.bankAccountHolderName}
                      onChange={handleInputChange}
                      className="w-full glass-effect px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                      placeholder="John Doe"
                      required={formData.paymentMethod === "bank"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Account Number *
                    </label>
                    <input
                      type="text"
                      name="bankAccountNumber"
                      value={formData.bankAccountNumber}
                      onChange={handleInputChange}
                      className="w-full glass-effect px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                      placeholder="1234567890"
                      required={formData.paymentMethod === "bank"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      IFSC Code *
                    </label>
                    <input
                      type="text"
                      name="bankIfscCode"
                      value={formData.bankIfscCode}
                      onChange={handleInputChange}
                      className="w-full glass-effect px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                      placeholder="SBIN0001234"
                      required={formData.paymentMethod === "bank"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Bank Name *
                    </label>
                    <input
                      type="text"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      className="w-full glass-effect px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
                      placeholder="State Bank of India"
                      required={formData.paymentMethod === "bank"}
                    />
                  </div>
                </div>
              )}

              {formData.paymentMethod === "cash" && (
                <p className="mt-4 text-sm text-gray-400">
                  You will receive cash payment upon waste collection.
                </p>
              )}
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Additional Notes
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full glass-effect px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10 custom-scrollbar"
                placeholder="Any special instructions or details..."
                rows="3"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-emerald-500 to-teal-500 py-4 rounded-xl hover:shadow-2xl hover:shadow-emerald-500/50 transition-all font-semibold text-lg flex items-center justify-center space-x-2 group ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span>{isSubmitting ? 'Submitting...' : 'Submit Request'}</span>
              {!isSubmitting && (
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              )}
            </button>

            <p className="text-center text-sm text-gray-400">
              By submitting, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
