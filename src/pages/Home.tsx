import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Film, Calendar, Ticket, ArrowRight } from 'lucide-react';
import AIAssistant from '@/components/AIAssistant';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredMovies = [
    {
      id: 1,
      title: "Spider-Man: No Way Home",
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=450&fit=crop",
      genre: "Action, Adventure",
      rating: "8.4"
    },
    {
      id: 2,
      title: "Dune: Part Two",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop",
      genre: "Sci-Fi, Drama",
      rating: "8.7"
    },
    {
      id: 3,
      title: "Oppenheimer",
      image: "https://images.unsplash.com/photo-1489599735734-79b4609e24c8?w=800&h=450&fit=crop",
      genre: "Biography, Drama",
      rating: "8.6"
    }
  ];

  const quickActions = [
    {
      title: "Movies",
      description: "Book tickets for the latest movies",
      icon: Film,
      path: "/movies",
      color: "bg-blue-500"
    },
    {
      title: "Sports & Events",
      description: "Catch live matches and concerts",
      icon: Calendar,
      path: "/sports-events",
      color: "bg-green-500"
    },
    {
      title: "My Bookings",
      description: "View your booking history",
      icon: Ticket,
      path: "/my-bookings",
      color: "bg-purple-500"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredMovies.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <section className="relative h-96 md:h-[500px] overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
        <div className="relative z-20 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              Welcome to <span className="text-gradient">CineTime</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Your Ultimate Entertainment Destination in Hyderabad
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-cinetime-primary hover:bg-cinetime-primary/90">
                <Link to="/movies" className="flex items-center space-x-2">
                  <Film className="h-5 w-5" />
                  <span>Book Movie Tickets</span>
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                <Link to="/sports-events" className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Explore Events</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Carousel Background */}
        <div className="absolute inset-0">
          {featuredMovies.map((movie, index) => (
            <div
              key={movie.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {featuredMovies.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What would you like to do?
            </h2>
            <p className="text-lg text-gray-600">
              Discover movies, events, and more in Hyderabad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card key={index} className="card-hover cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className={`${action.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
                    <p className="text-gray-600 mb-4">{action.description}</p>
                    <Link to={action.path}>
                      <Button variant="outline" className="group-hover:bg-cinetime-primary group-hover:text-white transition-colors">
                        Explore <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Trending Movies</h2>
            <Link to="/movies">
              <Button variant="outline">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredMovies.map((movie, index) => (
              <Card key={movie.id} className="card-hover overflow-hidden">
                <div className="relative">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black px-2 py-1 rounded-lg text-sm font-semibold">
                    ⭐ {movie.rating}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
                  <p className="text-gray-600 mb-4">{movie.genre}</p>
                  <Link to="/booking" state={{ movie }}>
                    <Button className="w-full bg-cinetime-primary hover:bg-cinetime-primary/90">
                      Book Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Film className="h-8 w-8 text-cinetime-primary" />
                <span className="text-2xl font-bold text-gradient">CineTime</span>
              </div>
              <p className="text-gray-400">
                Your ultimate entertainment destination in Hyderabad
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/movies" className="text-gray-400 hover:text-white">Movies</Link></li>
                <li><Link to="/sports-events" className="text-gray-400 hover:text-white">Sports & Events</Link></li>
                <li><Link to="/my-bookings" className="text-gray-400 hover:text-white">My Bookings</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                <li><Link to="/assistant" className="text-gray-400 hover:text-white">Help Assistant</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Location</h4>
              <p className="text-gray-400">📍 Hyderabad, Telangana</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 CineTime. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
};

export default Home;
