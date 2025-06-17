
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SeatSelectionProps {
  selectedSeats: string[];
  onSeatSelect: (seats: string[]) => void;
}

const SeatSelection = ({ selectedSeats, onSeatSelect }: SeatSelectionProps) => {
  const [seatType, setSeatType] = useState('Regular');

  // Generate seat layout (simplified grid)
  const generateSeats = () => {
    const seats = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const seatsPerRow = 12;
    
    // Some seats are unavailable (booked)
    const unavailableSeats = ['A5', 'A6', 'B8', 'C3', 'C4', 'D7', 'E9', 'F5', 'F6', 'G2', 'H10', 'I4'];
    
    for (let row of rows) {
      const rowSeats = [];
      for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
        const seatId = `${row}${seatNum}`;
        const isUnavailable = unavailableSeats.includes(seatId);
        const isSelected = selectedSeats.includes(seatId);
        
        rowSeats.push({
          id: seatId,
          row,
          number: seatNum,
          isUnavailable,
          isSelected,
          isPremium: row >= 'F' // Last 5 rows are premium
        });
      }
      seats.push(rowSeats);
    }
    return seats;
  };

  const seatLayout = generateSeats();

  const handleSeatClick = (seatId: string, isUnavailable: boolean) => {
    if (isUnavailable) return;
    
    let newSelectedSeats;
    if (selectedSeats.includes(seatId)) {
      newSelectedSeats = selectedSeats.filter(id => id !== seatId);
    } else {
      if (selectedSeats.length >= 10) {
        alert('You can select maximum 10 seats');
        return;
      }
      newSelectedSeats = [...selectedSeats, seatId];
    }
    
    onSeatSelect(newSelectedSeats);
  };

  const getSeatPrice = (isPremium: boolean) => {
    return isPremium ? 300 : 200;
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seatId) => {
      const row = seatId[0];
      const isPremium = row >= 'F';
      return total + getSeatPrice(isPremium);
    }, 0);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Select Seats</CardTitle>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-300 rounded border"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-cinetime-primary rounded border"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-500 rounded border"></div>
            <span>Booked</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Screen */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <div className="bg-gray-200 rounded-lg py-2 px-4 inline-block">
              <span className="text-sm text-gray-600">SCREEN</span>
            </div>
          </div>
        </div>

        {/* Seat Layout */}
        <div className="space-y-3 mb-6">
          {seatLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex items-center justify-center space-x-2">
              <div className="w-6 text-center text-sm font-medium text-gray-500">
                {row[0].row}
              </div>
              <div className="flex space-x-1">
                {row.map((seat) => (
                  <button
                    key={seat.id}
                    className={`w-6 h-6 text-xs rounded border transition-colors ${
                      seat.isUnavailable
                        ? 'bg-gray-500 text-white cursor-not-allowed'
                        : seat.isSelected
                        ? 'bg-cinetime-primary text-white border-cinetime-primary'
                        : seat.isPremium
                        ? 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200'
                        : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                    }`}
                    onClick={() => handleSeatClick(seat.id, seat.isUnavailable)}
                    disabled={seat.isUnavailable}
                    title={`${seat.id} - ${seat.isPremium ? 'Premium' : 'Regular'} - ₹${getSeatPrice(seat.isPremium)}`}
                  >
                    {seat.number}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Seat Types Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 border rounded-lg">
            <div className="text-sm font-medium">Regular</div>
            <div className="text-lg font-bold text-cinetime-primary">₹200</div>
            <div className="text-xs text-gray-500">Rows A-E</div>
          </div>
          <div className="text-center p-3 border rounded-lg bg-yellow-50">
            <div className="text-sm font-medium">Premium</div>
            <div className="text-lg font-bold text-cinetime-primary">₹300</div>
            <div className="text-xs text-gray-500">Rows F-J</div>
          </div>
        </div>

        {/* Selection Summary */}
        {selectedSeats.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium">Selected Seats:</span>
              <Badge variant="secondary">{selectedSeats.length} seat(s)</Badge>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedSeats.map(seatId => (
                <Badge key={seatId} variant="outline">
                  {seatId}
                </Badge>
              ))}
            </div>
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-cinetime-primary">₹{calculateTotal()}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SeatSelection;
