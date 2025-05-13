import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import ScheduleTable from './components/ScheduleTable';
import { ScheduleItem } from './types';

const initialSchedule: ScheduleItem[] = [
  { day: "Monday", session: "Leetcode", description: "5m understand, 25m solve, 15m discuss", name: "" },
  { day: "Tuesday", session: "Leetcode", description: "5m understand, 25m solve, 15m discuss", name: "" },
  { day: "Wednesday", session: "Teaching 1", description: "30m teach, 15m example", name: "" },
  { day: "Thursday", session: "Mock Interview", description: "Easy/medium Qs, focus on breakdown", name: "" },
  { day: "Friday", session: "Leetcode", description: "5m understand, 25m solve, 15m discuss", name: "" },
  { day: "Saturday", session: "Teaching 2", description: "30m teach, 15m example", name: "" },
  { day: "Sunday", session: "Driver Coding", description: "Live solving with shared screen", name: "" },
];

const members = [
  "holy@leetcodegroup.com",
  "example1@gmail.com",
  "example2@gmail.com"
];

function App() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(initialSchedule);

  const handleUpdate = (day: string, name: string) => {
    setSchedule(prevSchedule =>
      prevSchedule.map(item =>
        item.day === day ? { ...item, name } : item
      )
    );
    toast.success('Schedule updated!');
  };

  const handleSendEmail = async () => {
    try {
      // Format the schedule for email
      const scheduleText = schedule
        .map(item => `${item.day}: ${item.session} - ${item.name || 'Unassigned'}`)
        .join('\n');

      // Replace with your EmailJS configuration
      const templateParams = {
        to_email: members.join(','),
        schedule: scheduleText,
      };

      // Replace with your actual EmailJS service ID, template ID, and user ID
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        templateParams,
        'YOUR_USER_ID'
      );

      toast.success('Email sent to all members!');
    } catch (error) {
      toast.error('Failed to send email. Please try again.');
      console.error('Email error:', error);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <Toaster position="top-right" />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          🧠 Leetcode Crew Weekly Planner
        </h1>

        <div className="mb-8">
          <ScheduleTable schedule={schedule} onUpdate={handleUpdate} />
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex justify-center"
        >
          <button
            onClick={handleSendEmail}
            className="btn-primary flex items-center space-x-2"
          >
            <span>📨 Send Email to All Members</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
