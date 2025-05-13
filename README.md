# Leetcode Crew Weekly Planner

A beautiful, animated web application for managing a weekly Leetcode group schedule. Built with React, TypeScript, and Framer Motion.

## Features

- 📅 Dynamic weekly schedule table
- ✏️ Editable name fields with smooth animations
- 📧 Email functionality using EmailJS
- 🎨 Modern UI with glassmorphism design
- 📱 Fully responsive layout
- ✨ Smooth animations and transitions

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up EmailJS:
   - Create an account at [EmailJS](https://www.emailjs.com/)
   - Create an email service and template
   - Replace the EmailJS configuration in `src/App.tsx`:
     ```typescript
     await emailjs.send(
       'YOUR_SERVICE_ID',
       'YOUR_TEMPLATE_ID',
       templateParams,
       'YOUR_USER_ID'
     );
     ```

4. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. View the weekly schedule in the table
2. Click the edit (✏️) icon next to any name to edit
3. Enter the name and click the check (✓) icon to save
4. Click "Send Email to All Members" to send the updated schedule

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Framer Motion
- EmailJS
- React Hot Toast

## Development

The project structure is organized as follows:

- `src/components/` - React components
- `src/types.ts` - TypeScript interfaces
- `src/App.tsx` - Main application component
- `src/index.css` - Global styles

## License

MIT
