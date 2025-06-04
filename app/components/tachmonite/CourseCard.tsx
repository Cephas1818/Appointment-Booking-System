'use client';
import React from 'react';

interface CourseCardProps {
  title: string;
  minutes: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, minutes }) => {
  return (
    <div className="bg-neutral-900 rounded-xl p-4 shadow text-white">
      <div className="font-semibold mb-2">{title}</div>
      <div className="text-xs text-gray-400">{minutes} min video</div>
      <button className="mt-3 w-full bg-yellow-400 text-black py-1 rounded">Deploy Now</button>
    </div>
  );
};

export default CourseCard;
