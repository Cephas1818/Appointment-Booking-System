'use client';
import React from 'react';

interface AgentStatusCardProps {
  name: string;
  status: string;
  nextRun?: string;
}

const statusColors: Record<string, string> = {
  IDLE: 'bg-gray-500',
  RUNNING: 'bg-yellow-400',
  ERROR: 'bg-red-600',
};

const AgentStatusCard: React.FC<AgentStatusCardProps> = ({ name, status, nextRun }) => {
  return (
    <div className="bg-neutral-900 rounded-xl p-4 shadow text-white">
      <div className="flex justify-between items-center mb-2">
        <span>{name}</span>
        <span className={`px-2 py-1 text-xs rounded ${statusColors[status]}`}>{status}</span>
      </div>
      {nextRun && <div className="text-xs text-gray-400">Next run: {nextRun}</div>}
    </div>
  );
};

export default AgentStatusCard;
