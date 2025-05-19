import React, { useState } from 'react';
import { useMoodContext } from '../datafiles/moodContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MoodEntryForm from './MoodEntryForm';
import '../index.css';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { getEntryByDate } = useMoodContext();

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = endOfMonth.getDate();
    const leadingDays = startOfMonth.getDay();
    const totalCells = Math.ceil((leadingDays + daysInMonth) / 7) * 7;

    const calendar: { date: Date; isCurrentMonth: boolean }[] = [];

    for (let i = leadingDays - 1; i >= 0; i--) {
      calendar.push({ date: new Date(year, month, -i), isCurrentMonth: false });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push({ date: new Date(year, month, day), isCurrentMonth: true });
    }

    const remaining = totalCells - calendar.length;
    for (let i = 1; i <= remaining; i++) {
      calendar.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return calendar;
  };

  const calendar = generateCalendar();

  return (
    <div className="flex flex-col md:flex-row md:items-start gap-6">
      <div className="w-full md:w-1/2 p-4 rounded-2xl shadow-lg bg-gray-700/30 backdrop-blur-md border border-gray-700/30 glassy-animated animate-fade-in-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-thin text-white pl-6">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
              className="p-2 rounded-xl hover:bg-gray-200 transition transform duration-100 ease-in hover:scale-110 "
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
              className="p-2 rounded-xl hover:bg-gray-200 transition transform duration-100 ease-in hover:scale-110"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 text-sm font-extralight text-white-400 mb-2 cursor-pointer">
          {weekdays.map(day => (
            <div key={day} className="text-center py-1 transition transform duration-200 ease-in-out hover:scale-110 cursor-pointer">{day}</div>
          ))}
        </div>

        {/* for Calendar gridview */}
        <div className="grid grid-cols-7 gap-1 ">
          {calendar.map(({ date, isCurrentMonth }, idx) => {
            const iso = date.toISOString();
            const entry = getEntryByDate(iso);
            const isToday = date.toDateString() === new Date().toDateString();
            const isSelected = date.toDateString() === selectedDate.toDateString();
            const moodColor = entry && isCurrentMonth ? `${entry.mood.color}30` : undefined;

            return (
              <button
                key={idx}
                onClick={() => setSelectedDate(date)}
                className={`aspect-square flex flex-col items-center justify-center p-1 rounded-md text-sm font-bold transition transform duration-200 ease-in-out hover:scale-110

                  ${isCurrentMonth ? 'text-white' : 'text-gray-600'}
                  ${isToday ? 'ring-2 ring-white font-bold' : ''}
                  ${isSelected ? 'bg-gray-700 text-gray-950' : ''}
                `}
                style={{ backgroundColor: moodColor }}
              >
                {date.getDate()}
                {entry && <span className="text-lg">{entry.mood.emoji}</span>}
              </button>
            );
          })}
        </div>
      </div> 
      {/* mood entry form */}
      <div className="w-full md:w-1/2 p-4 rounded-2xl shadow-lg bg-gray-900/30 backdrop-blur-lg border border-gray-700/50 animate-fade-in-up duration-500">
        <MoodEntryForm date={selectedDate.toISOString()} />
      </div>
    </div>
  );
};

export default CalendarView;
