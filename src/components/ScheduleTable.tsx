import React from 'react';
import { motion } from 'framer-motion';
import { ScheduleTableProps } from '../types';
import ScheduleRow from './ScheduleRow';

const ScheduleTable: React.FC<ScheduleTableProps> = ({ schedule, onUpdate }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 glass-card">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Day
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Session
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {schedule.map((item) => (
            <ScheduleRow key={item.day} item={item} onUpdate={onUpdate} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable; 