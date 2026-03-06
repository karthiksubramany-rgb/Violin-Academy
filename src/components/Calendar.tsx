import React, { useState, useEffect } from 'react';
import { 
  format, 
  addDays, 
  startOfWeek, 
  eachDayOfInterval, 
  isSameDay, 
  parseISO,
  startOfDay,
  addHours,
  isAfter
} from 'date-fns';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { AvailabilitySlot, Currency } from '../types';
import { cn } from '../lib/utils';

interface CalendarProps {
  slots: AvailabilitySlot[];
  onSelectSlot: (slot: AvailabilitySlot) => void;
  currency: Currency;
}

export const Calendar: React.FC<CalendarProps> = ({ slots, onSelectSlot, currency }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6),
  });

  const slotsForSelectedDate = slots.filter(slot => 
    selectedDate && isSameDay(parseISO(slot.startTime), selectedDate)
  );

  const getPrice = (duration: number) => {
    if (currency === 'INR') {
      return duration <= 30 ? 900 : 1500;
    }
    if (currency === 'GBP') {
      return duration <= 30 ? 20 : 40;
    }
    return duration <= 30 ? 25 : 50;
  };

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'INR': return '₹';
      case 'GBP': return '£';
      default: return '$';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
      <div className="p-6 border-bottom border-black/5 flex items-center justify-between bg-stone-50">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-stone-600" />
          <h2 className="text-lg font-medium text-stone-900">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentDate(addDays(currentDate, -7))}
            className="p-2 hover:bg-stone-200 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setCurrentDate(addDays(currentDate, 7))}
            className="p-2 hover:bg-stone-200 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-bottom border-black/5">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div key={day} className="py-3 text-center text-xs font-semibold text-stone-400 uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {weekDays.map(day => {
          const hasSlots = slots.some(slot => isSameDay(parseISO(slot.startTime), day));
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isToday = isSameDay(day, new Date());

          return (
            <button
              key={day.toISOString()}
              onClick={() => setSelectedDate(day)}
              className={cn(
                "h-24 p-2 border-right border-bottom border-black/5 flex flex-col items-center justify-start transition-all relative",
                isSelected ? "bg-stone-900 text-white" : "hover:bg-stone-50",
                !isAfter(day, startOfDay(new Date())) && !isToday && "opacity-30 cursor-not-allowed"
              )}
            >
              <span className={cn(
                "text-sm font-medium w-8 h-8 flex items-center justify-center rounded-full mb-1",
                isToday && !isSelected && "bg-emerald-100 text-emerald-700"
              )}>
                {format(day, 'd')}
              </span>
              {hasSlots && !isSelected && (
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1" />
              )}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div className="p-6 bg-stone-50 border-top border-black/5">
          <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">
            Available Slots for {format(selectedDate, 'EEEE, MMMM do')}
          </h3>
          {slotsForSelectedDate.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {slotsForSelectedDate.map(slot => {
                const start = parseISO(slot.startTime);
                const end = parseISO(slot.endTime);
                const duration = Math.round((end.getTime() - start.getTime()) / 60000);
                
                return (
                  <button
                    key={slot.id}
                    onClick={() => onSelectSlot(slot)}
                    className="flex items-center justify-between p-4 bg-white border border-black/5 rounded-xl hover:border-stone-900 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-stone-100 rounded-lg group-hover:bg-stone-900 group-hover:text-white transition-colors">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-stone-900">
                          {format(start, 'h:mm a')} - {format(end, 'h:mm a')}
                        </p>
                        <p className="text-xs text-stone-500">{duration} minutes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-stone-900">
                        {getCurrencySymbol()}{getPrice(duration)}
                      </p>
                      <p className="text-[10px] text-emerald-600 font-semibold uppercase tracking-tight">Available</p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-stone-400">
              <p className="text-sm italic">No slots available for this day.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
