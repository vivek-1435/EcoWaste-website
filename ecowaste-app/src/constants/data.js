
import { Zap, MapPinned, CreditCard, Shield, Leaf, Globe, Sparkles, Users } from "lucide-react";

export const wasteCategories = [
  {
    name: "Vegetable Waste",
    icon: "🥬",
    rate: "₹5-8",
    color: "from-green-400 to-emerald-600",
  },
  {
    name: "Fruit Waste",
    icon: "🍎",
    rate: "₹6-10",
    color: "from-orange-400 to-red-500",
  },
  {
    name: "Cooked Food",
    icon: "🍲",
    rate: "₹3-5",
    color: "from-yellow-400 to-orange-500",
  },
  {
    name: "Bakery Items",
    icon: "🍞",
    rate: "₹4-7",
    color: "from-amber-400 to-yellow-600",
  },
  {
    name: "Dairy Products",
    icon: "🥛",
    rate: "₹8-12",
    color: "from-blue-400 to-indigo-500",
  },
  {
    name: "Mixed Organic",
    icon: "♻️",
    rate: "₹4-6",
    color: "from-teal-400 to-cyan-600",
  },
];

export const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Verification",
    description: "AI-powered waste quality check in seconds",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: <MapPinned className="w-6 h-6" />,
    title: "Real-time Tracking",
    description: "Track your pickup live on the map",
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Quick Payments",
    description: "Instant UPI/Bank transfer on collection",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure & Verified",
    description: "All transactions are encrypted & safe",
    color: "from-purple-400 to-pink-500",
  },
];

export const impactMetrics = [
  {
    label: "CO₂ Emissions Reduced",
    value: "2.5 Tons",
    icon: <Leaf className="w-5 h-5" />,
    change: "+12%",
  },
  {
    label: "Trees Equivalent",
    value: "125",
    icon: <Globe className="w-5 h-5" />,
    change: "+8%",
  },
  {
    label: "Water Saved",
    value: "10K L",
    icon: <Sparkles className="w-5 h-5" />,
    change: "+15%",
  },
  {
    label: "Happy Contributors",
    value: "500+",
    icon: <Users className="w-5 h-5" />,
    change: "+20%",
  },
];
