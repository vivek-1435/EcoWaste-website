import React from 'react';

export default function StatusBadge({ status }) {
  const statusConfig = {
    pending: {
      color: 'from-yellow-400 to-orange-500',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400',
      label: 'Pending'
    },
    verified: {
      color: 'from-blue-400 to-cyan-500',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      label: 'Verified'
    },
    collected: {
      color: 'from-purple-400 to-pink-500',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      text: 'text-purple-400',
      label: 'Collected'
    },
    completed: {
      color: 'from-green-400 to-emerald-500',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      text: 'text-green-400',
      label: 'Completed'
    },
    cancelled: {
      color: 'from-red-400 to-rose-500',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      text: 'text-red-400',
      label: 'Cancelled'
    }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.border} ${config.text} border`}>
      <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${config.color} mr-2`}></span>
      {config.label}
    </span>
  );
}
