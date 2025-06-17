
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DateSelectorProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const DateSelector = ({ selectedDate, onDateSelect }: DateSelectorProps) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());

  // Generate dates for the current week view (7 days)
  const generateWeekDates = (startDate: Date) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = generateWeekDates(currentWeekStart);

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return { day: 'Today', date: date.getDate(), month: date.toLocaleDateString('en-US', { month: 'short' }) };
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return { day: 'Tomorrow', date: date.getDate(), month: date.toLocaleDateString('en-US', { month: 'short' }) };
    } else {
      return {
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' })
      };
    }
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeekStart(newStart);
  };

  const isDateSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Select Date</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateWeek('prev')}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateWeek('next')}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {weekDates.map((date, index) => {
            const formatted = formatDate(date);
            const isSelected = isDateSelected(date);
            const isToday = date.toDateString() === new Date().toDateString();
            const isPast = date < new Date() && !isToday;

            return (
              <Button
                key={index}
                variant={isSelected ? "default" : "outline"}
                className={`flex-shrink-0 flex flex-col items-center px-4 py-3 h-auto min-w-[80px] ${
                  isSelected 
                    ? "bg-cinetime-primary hover:bg-cinetime-primary/90 text-white" 
                    : isPast 
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-50"
                }`}
                onClick={() => !isPast && onDateSelect(date)}
                disabled={isPast}
              >
                <span className="text-xs font-medium">{formatted.day}</span>
                <span className="text-lg font-bold">{formatted.date}</span>
                <span className="text-xs">{formatted.month}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default DateSelector;
