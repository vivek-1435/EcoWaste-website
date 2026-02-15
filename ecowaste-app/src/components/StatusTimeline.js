import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

export default function StatusTimeline({ status, createdAt, collectedAt, paidAt }) {
  const stages = [
    { key: 'pending', label: 'Submitted', completed: true, date: createdAt },
    { key: 'verified', label: 'Verified', completed: ['verified', 'collected', 'completed'].includes(status) },
    { key: 'collected', label: 'Collected', completed: ['collected', 'completed'].includes(status), date: collectedAt },
    { key: 'completed', label: 'Paid', completed: status === 'completed', date: paidAt }
  ];

  return (
    <div className="flex items-center justify-between">
      {stages.map((stage, index) => (
        <React.Fragment key={stage.key}>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              stage.completed
                ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                : 'glass-effect border border-white/10'
            }`}>
              {stage.completed ? (
                <CheckCircle className="w-5 h-5 text-white" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <p className={`text-xs mt-2 ${stage.completed ? 'text-emerald-400' : 'text-gray-400'}`}>
              {stage.label}
            </p>
            {stage.date && (
              <p className="text-xs text-gray-500 mt-1">
                {new Date(stage.date).toLocaleDateString()}
              </p>
            )}
          </div>
          {index < stages.length - 1 && (
            <div className={`flex-1 h-0.5 mx-2 ${
              stages[index + 1].completed ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : 'bg-white/10'
            }`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
