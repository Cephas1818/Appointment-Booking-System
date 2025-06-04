'use client';
import React from 'react';

interface AnalyticsWidgetProps {
  metric: string;
  value: number;
}

const AnalyticsWidget: React.FC<AnalyticsWidgetProps> = ({ metric, value }) => {
  return (
    <div className="bg-neutral-900 rounded-xl p-4 shadow text-white text-center">
      <div className="text-sm mb-1">{metric}</div>
      <div className="text-2xl font-bold text-yellow-400">{value}</div>
    </div>
  );
};

export default AnalyticsWidget;
