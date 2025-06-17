
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Movie {
  id: number;
  title: string;
  image: string;
  genre: string;
  language: string;
  duration: string;
}

interface Showtime {
  time: string;
  theater: string;
  price: number;
}

interface BookingSummaryProps {
  movie: Movie;
  showtime: Showtime;
  date: Date;
  seats: string[];
}

const BookingSummary = ({ movie, showtime, date, seats }: BookingSummaryProps) => {
  const { toast } = useToast();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const getSeatPrice = (seatId: string) => {
    const row = seatId[0];
    return row >= 'F' ? 300 : 200; // Premium vs Regular
  };

  const calculateSubtotal = () => {
    return seats.reduce((total, seatId) => total + getSeatPrice(seatId), 0);
  };

  const convenientFee = Math.round(calculateSubtotal() * 0.05); // 5% convenience fee
  const taxes = Math.round((calculateSubtotal() + convenientFee) * 0.18); // 18% GST
  const totalAmount = calculateSubtotal() + convenientFee + taxes;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast({
        title: "Please fill all required fields",
        description: "Name, email, and phone number are required",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // TODO: Replace with actual payment API integration
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const bookingData = {
        movieId: movie.id,
        movieTitle: movie.title,
        theater: showtime.theater,
        date: date.toISOString().split('T')[0],
        time: showtime.time,
        seats: seats,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        subtotal: calculateSubtotal(),
        convenientFee,
        taxes,
        totalAmount,
        bookingId: 'BK' + Date.now()
      };

      // TODO: Send to backend API
      // await fetch('http://localhost:8080/api/bookings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(bookingData)
      // });

      toast({
        title: "Booking Confirmed!",
        description: `Your booking ID is ${bookingData.bookingId}`,
      });

      // Redirect to success page or my bookings
      console.log('Booking confirmed:', bookingData);

    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Booking Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Movie Info */}
          <div className="flex space-x-4">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-16 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{movie.title}</h3>
              <p className="text-gray-600">{movie.genre}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline">{movie.language}</Badge>
                <Badge variant="outline">{movie.duration}</Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Booking Details */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{showtime.theater}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>{date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{showtime.time}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="h-4 w-4 text-gray-500" />
              <div className="flex items-center space-x-2">
                <span>{seats.length} seat(s):</span>
                <div className="flex flex-wrap gap-1">
                  {seats.map(seatId => (
                    <Badge key={seatId} variant="secondary" className="text-xs">
                      {seatId}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Price Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal ({seats.length} seats)</span>
              <span>₹{calculateSubtotal()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Convenience Fee</span>
              <span>₹{convenientFee}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Taxes (GST 18%)</span>
              <span>₹{taxes}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount</span>
              <span className="text-cinetime-primary">₹{totalAmount}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Info & Payment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Customer Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={customerInfo.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={customerInfo.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={customerInfo.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <Separator />

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Payment Method</h4>
            <div className="text-sm text-gray-600 mb-3">
              Secure payment powered by Razorpay
            </div>
            <div className="text-xs text-gray-500">
              Your payment information is encrypted and secure
            </div>
          </div>

          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-cinetime-primary hover:bg-cinetime-primary/90 h-12 text-lg font-semibold"
          >
            {isProcessing ? 'Processing...' : `Pay ₹${totalAmount}`}
          </Button>

          <div className="text-xs text-gray-500 text-center">
            By proceeding, you agree to our Terms & Conditions
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingSummary;
