
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SportsEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Dummy data for sports and events (replace with API call to GET /api/sports-events)
  const dummyEvents = [
    {
      id: 1,
      title: "IPL 2024: SRH vs MI",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop",
      category: "Sports",
      date: "2024-04-15",
      time: "19:30",
      venue: "Rajiv Gandhi International Stadium",
      price: "₹500 onwards",
      description: "Experience the thrill of IPL cricket as Sunrisers Hyderabad takes on Mumbai Indians."
    },
    {
      id: 2,
      title: "A.R. Rahman Live Concert",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      category: "Concert",
      date: "2024-03-20",
      time: "18:00",
      venue: "Gachibowli Stadium",
      price: "₹1500 onwards",
      description: "Join the maestro A.R. Rahman for an unforgettable musical evening."
    },
    {
      id: 3,
      title: "Stand-up Comedy Night",
      image: "https://images.unsplash.com/photo-1516307365426-bea591f05011?w=400&h=300&fit=crop",
      category: "Comedy",
      date: "2024-03-25",
      time: "20:00",
      venue: "Phoenix Arena",
      price: "₹800 onwards",
      description: "Laugh out loud with top comedians performing their best sets."
    },
    {
      id: 4,
      title: "Badminton Premier League",
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=300&fit=crop",
      category: "Sports",
      date: "2024-04-01",
      time: "16:00",
      venue: "Kotla Vijaya Bhaskara Reddy Stadium",
      price: "₹300 onwards",
      description: "Watch world-class badminton players compete in the premier league."
    },
    {
      id: 5,
      title: "Hyderabad Food Festival",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
      category: "Food",
      date: "2024-03-30",
      time: "11:00",
      venue: "HITEC City",
      price: "₹200 onwards",
      description: "Explore the diverse culinary heritage of Hyderabad at this grand food festival."
    },
    {
      id: 6,
      title: "Tech Conference 2024",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
      category: "Conference",
      date: "2024-04-10",
      time: "09:00",
      venue: "HICC, Madhapur",
      price: "₹2000 onwards",
      description: "Join industry leaders and innovators at the biggest tech conference in the city."
    }
  ];

  const categories = ['All', 'Sports', 'Concert', 'Comedy', 'Food', 'Conference'];

  useEffect(() => {
    // TODO: Replace with actual API call
    // fetch('http://localhost:8080/api/sports-events')
    //   .then(response => response.json())
    //   .then(data => setEvents(data))
    //   .catch(error => console.error('Error fetching events:', error));
    
    setEvents(dummyEvents);
    setFilteredEvents(dummyEvents);
  }, []);

  useEffect(() => {
    let filtered = events;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [events, selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sports & Events in Hyderabad</h1>
          <p className="text-lg text-gray-600">Discover exciting sports matches, concerts, and events</p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search events..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-cinetime-primary hover:bg-cinetime-primary/90" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="card-hover overflow-hidden bg-white">
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-cinetime-primary text-white">
                    {event.category}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{event.title}</h3>
                
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">📍</span>
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">💰</span>
                    <span className="font-semibold text-cinetime-primary">{event.price}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>
                
                <Link to="/booking" state={{ event }}>
                  <Button className="w-full bg-cinetime-primary hover:bg-cinetime-primary/90">
                    Book Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No events found matching your criteria</div>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SportsEvents;
