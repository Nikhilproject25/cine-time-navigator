
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock } from 'lucide-react';

interface Showtime {
  time: string;
  theater: string;
  price: number;
}

interface ShowtimeSelectorProps {
  showtimes: Showtime[];
  selectedShowtime: Showtime | null;
  onShowtimeSelect: (showtime: Showtime) => void;
}

const ShowtimeSelector = ({ showtimes, selectedShowtime, onShowtimeSelect }: ShowtimeSelectorProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          Select Showtime
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {showtimes.map((showtime, index) => {
            const isSelected = selectedShowtime?.time === showtime.time && 
                             selectedShowtime?.theater === showtime.theater;
            
            return (
              <Button
                key={index}
                variant={isSelected ? "default" : "outline"}
                className={`h-auto p-4 flex flex-col items-start text-left ${
                  isSelected 
                    ? "bg-cinetime-primary hover:bg-cinetime-primary/90 text-white" 
                    : "hover:bg-gray-50"
                }`}
                onClick={() => onShowtimeSelect(showtime)}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-semibold text-lg">{showtime.time}</span>
                </div>
                <div className="flex items-center space-x-2 mb-1">
                  <MapPin className="h-3 w-3" />
                  <span className="text-sm">{showtime.theater}</span>
                </div>
                <div className="text-sm font-medium">
                  ₹{showtime.price} onwards
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShowtimeSelector;
