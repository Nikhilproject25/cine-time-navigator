
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, Ticket } from 'lucide-react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dummy bookings data (replace with API call to GET /api/bookings)
  const dummyBookings = [
    {
      id: 1,
      bookingId: 'BK123456789',
      title: 'Spider-Man: No Way Home',
      type: 'movie',
      image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=200&fit=crop',
      date: '2024-03-20',
      time: '07:00 PM',
      seats: 2,
      venue: 'PVR Cinemas, Hyderabad',
      totalAmount: 400,
      status: 'confirmed',
      bookingDate: '2024-03-15'
    },
    {
      id: 2,
      bookingId: 'BK987654321',
      title: 'A.R. Rahman Live Concert',
      type: 'event',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
      date: '2024-04-01',
      time: '06:00 PM',
      seats: 4,
      venue: 'Gachibowli Stadium',
      totalAmount: 1200,
      status: 'confirmed',
      bookingDate: '2024-03-10'
    },
    {
      id: 3,
      bookingId: 'BK456789123',
      title: 'IPL 2024: SRH vs MI',
      type: 'event',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=300&h=200&fit=crop',
      date: '2024-04-15',
      time: '07:30 PM',
      seats: 3,
      venue: 'Rajiv Gandhi International Stadium',
      totalAmount: 900,
      status: 'confirmed',
      bookingDate: '2024-03-12'
    },
    {
      id: 4,
      bookingId: 'BK789123456',
      title: 'Dune: Part Two',
      type: 'movie',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
      date: '2024-02-28',
      time: '04:00 PM',
      seats: 1,
      venue: 'INOX Movies, Hyderabad',
      totalAmount: 200,
      status: 'completed',
      bookingDate: '2024-02-25'
    }
  ];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('http://localhost:8080/api/bookings');
        // const data = await response.json();
        // setBookings(data);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBookings(dummyBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const upcomingBookings = bookings.filter(booking => 
    new Date(booking.date) >= new Date() && booking.status === 'confirmed'
  );
  
  const pastBookings = bookings.filter(booking => 
    new Date(booking.date) < new Date() || booking.status === 'completed'
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cinetime-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">View and manage your ticket bookings</p>
        </div>

        {bookings.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Ticket className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-4">You haven't made any bookings yet.</p>
              <Button className="bg-cinetime-primary hover:bg-cinetime-primary/90">
                <a href="/movies">Browse Movies</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Upcoming Bookings */}
            {upcomingBookings.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Bookings</h2>
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          <img
                            src={booking.image}
                            alt={booking.title}
                            className="w-full md:w-32 h-32 object-cover rounded-lg"
                          />
                          
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                              <div>
                                <h3 className="text-xl font-semibold mb-1">{booking.title}</h3>
                                <Badge className={getStatusColor(booking.status)}>
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </Badge>
                              </div>
                              <div className="text-right mt-2 md:mt-0">
                                <p className="text-sm text-gray-600">Booking ID</p>
                                <p className="font-mono text-sm font-semibold">{booking.bookingId}</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>{new Date(booking.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2" />
                                <span>{booking.time}</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-2" />
                                <span>{booking.seats} {booking.seats === 1 ? 'Seat' : 'Seats'}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-start mt-3">
                              <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                              <span className="text-sm text-gray-600">{booking.venue}</span>
                            </div>
                            
                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                              <div>
                                <p className="text-sm text-gray-600">Total Amount</p>
                                <p className="text-xl font-bold text-cinetime-primary">₹{booking.totalAmount}</p>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                                <Button variant="outline" size="sm">
                                  Download Ticket
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Past Bookings */}
            {pastBookings.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Past Bookings</h2>
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <Card key={booking.id} className="opacity-75 hover:opacity-100 transition-opacity">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          <img
                            src={booking.image}
                            alt={booking.title}
                            className="w-full md:w-32 h-32 object-cover rounded-lg grayscale"
                          />
                          
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                              <div>
                                <h3 className="text-xl font-semibold mb-1">{booking.title}</h3>
                                <Badge className={getStatusColor(booking.status)}>
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </Badge>
                              </div>
                              <div className="text-right mt-2 md:mt-0">
                                <p className="text-sm text-gray-600">Booking ID</p>
                                <p className="font-mono text-sm font-semibold">{booking.bookingId}</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>{new Date(booking.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2" />
                                <span>{booking.time}</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-2" />
                                <span>{booking.seats} {booking.seats === 1 ? 'Seat' : 'Seats'}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-start mt-3">
                              <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                              <span className="text-sm text-gray-600">{booking.venue}</span>
                            </div>
                            
                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                              <div>
                                <p className="text-sm text-gray-600">Total Amount</p>
                                <p className="text-xl font-bold text-gray-600">₹{booking.totalAmount}</p>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  View Receipt
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
