'use client';
import React from 'react';

interface BookingSummaryCardProps {
  count: number;
}

const BookingSummaryCard: React.FC<BookingSummaryCardProps> = ({ count }) => {
  return (
    <div className="bg-neutral-900 rounded-xl p-4 shadow text-white">
      <div className="text-sm">Bookings Today</div>
      <div className="text-3xl font-bold text-yellow-400">{count}</div>
    </div>
  );
};

export default BookingSummaryCard;
