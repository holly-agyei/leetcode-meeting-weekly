import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PencilIcon, CheckIcon } from '@heroicons/react/24/outline';
import { ScheduleRowProps } from '../types';

const ScheduleRow: React.FC<ScheduleRowProps> = ({ item, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(item.name);

  const handleSave = () => {
    onUpdate(item.day, name);
    setIsEditing(false);
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-gray-200 hover:bg-gray-50"
    >
      <td className="px-6 py-4 whitespace-nowrap">{item.day}</td>
      <td className="px-6 py-4 whitespace-nowrap">{item.session}</td>
      <td className="px-6 py-4">{item.description}</td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                placeholder="Enter name"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSave}
                className="p-2 text-green-600 hover:text-green-800"
              >
                <CheckIcon className="h-5 w-5" />
              </motion.button>
            </>
          ) : (
            <>
              <span className="text-gray-900">{name || 'Unassigned'}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsEditing(true)}
                className="p-2 text-blue-600 hover:text-blue-800"
              >
                <PencilIcon className="h-5 w-5" />
              </motion.button>
            </>
          )}
        </div>
      </td>
    </motion.tr>
  );
};

export default ScheduleRow; 