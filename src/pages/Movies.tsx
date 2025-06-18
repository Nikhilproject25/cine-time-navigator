import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Search, X, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import MovieCard from '@/components/MovieCard';
import DateSelector from '@/components/DateSelector';
import ShowtimeSelector from '@/components/ShowtimeSelector';
import SeatSelection from '@/components/SeatSelection';
import BookingSummary from '@/components/BookingSummary';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingStep, setBookingStep] = useState('movies'); // movies, showtimes, seats, summary

  // ===== API INTEGRATION CODE - ADDED FOR BACKEND CONNECTION =====
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // NEW API CALL CODE - Replace dummy data with your backend API
        const response = await fetch('http://localhost:8080/api/movies');
        const moviesData = await response.json();
        setMovies(moviesData);
        setFilteredMovies(moviesData);
        console.log('Movies loaded from API:', moviesData);
      } catch (error) {
        console.error('Error fetching movies from API:', error);
        // Fallback to dummy data if API fails
        setMovies(latestMovies);
        setFilteredMovies(latestMovies);
      }
    };

    fetchMovies();
  }, []);

  // ===== DUMMY DATA - COMMENTED FOR API INTEGRATION =====
  // KEEP THIS COMMENTED - Uncomment if you need to use dummy data again
  /*
  useEffect(() => {
    // OLD DUMMY DATA LOADING CODE
    setMovies(latestMovies);
    setFilteredMovies(latestMovies);
  }, []);
  */

  // ===== DUMMY MOVIES DATA - COMMENTED FOR API INTEGRATION =====
  // KEEP THIS COMMENTED - Your API should return data in this format
  const latestMovies = [
    {
      id: 1,
      title: "Pushpa 2: The Rule",
      image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=600&fit=crop",
      genre: "Action, Drama",
      releaseDate: "2025-01-15",
      rating: "8.7",
      duration: "178 min",
      language: "Telugu",
      description: "The rule continues as Pushpa's empire faces new challenges and enemies.",
      votes: "567.3K",
      theaters: ["Sudarshan 35MM", "Sandhya 70MM", "Devi 70MM"]
    },
    {
      id: 2,
      title: "RRR: Rise Roar Revolt",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      genre: "Action, Period",
      releaseDate: "2025-02-01",
      rating: "8.9",
      duration: "187 min",
      language: "Telugu",
      description: "A tale of two legendary revolutionaries and their journey away from home.",
      votes: "892.1K",
      theaters: ["Prasads IMAX", "Forum Sujana Mall", "PVR Kukatpally"]
    },
    {
      id: 3,
      title: "Baahubali 3: The Crown",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      genre: "Action, Drama",
      releaseDate: "2025-01-21",
      rating: "8.8",
      duration: "165 min",
      language: "Telugu",
      description: "The epic saga continues with new kingdoms and greater battles.",
      votes: "745.2K",
      theaters: ["INOX CMR Central", "PVR Preston", "Asian GPR"]
    },
    {
      id: 4,
      title: "KGF Chapter 3",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
      genre: "Action, Thriller",
      releaseDate: "2025-01-10",
      rating: "8.6",
      duration: "168 min",
      language: "Telugu",
      description: "Rocky's journey reaches its climactic conclusion in the gold fields.",
      votes: "623.7K",
      theaters: ["Sudarshan 35MM", "Sandhya 70MM", "Devi 70MM"]
    },
    {
      id: 5,
      title: "Arjun Reddy 2",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      genre: "Romance, Drama",
      releaseDate: "2025-01-05",
      rating: "8.2",
      duration: "158 min",
      language: "Telugu",
      description: "A passionate love story that challenges societal norms.",
      votes: "412.8K",
      theaters: ["PVR Irrum Manzil", "INOX Maheshwari Parmeshwari", "Miraj Cinemas"]
    },
    {
      id: 6,
      title: "Sita Ramam",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop",
      genre: "Romance, Drama",
      releaseDate: "2025-02-14",
      rating: "8.4",
      duration: "163 min",
      language: "Telugu",
      description: "A timeless love story set against the backdrop of war.",
      votes: "387.6K",
      theaters: ["AMB Cinemas Gachibowli", "PVR Forum Mall", "INOX Banjara Hills"]
    },
    {
      id: 7,
      title: "Kantara 2",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop",
      genre: "Action, Thriller",
      releaseDate: "2025-01-28",
      rating: "8.5",
      duration: "148 min",
      language: "Telugu",
      description: "The divine intervention continues in this mystical thriller.",
      votes: "456.3K",
      theaters: ["Cinepolis Mantra Mall", "PVR Next Galleria", "INOX Vishaal De Mall"]
    },
    {
      id: 8,
      title: "Vikram Vedha 2",
      image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=600&fit=crop",
      genre: "Action, Thriller",
      releaseDate: "2025-02-10",
      rating: "8.3",
      duration: "156 min",
      language: "Telugu",
      description: "The cat and mouse game between cop and gangster continues.",
      votes: "378.9K",
      theaters: ["Shanti 70MM", "Bramaramba 70MM", "Odeon 70MM"]
    },
    {
      id: 9,
      title: "Master 2",
      image: "https://images.unsplash.com/photo-1489599735734-79b4609e24c8?w=400&h=600&fit=crop",
      genre: "Action, Thriller",
      releaseDate: "2025-01-18",
      rating: "8.1",
      duration: "169 min",
      language: "Telugu",
      description: "The master returns to face new challenges and adversaries.",
      votes: "298.4K",
      theaters: ["AAA Cinemas", "Megaplex Kondapur", "Mallikarjuna 70MM"]
    },
    {
      id: 10,
      title: "Ala Vaikunthapurramuloo 2",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
      genre: "Action, Family",
      releaseDate: "2025-02-05",
      rating: "8.0",
      duration: "165 min",
      language: "Telugu",
      description: "Bantu's journey of self-discovery continues with new family dynamics.",
      votes: "445.7K",
      theaters: ["PVR Promenade", "INOX Hyderabad Central", "Carnival Cinemas"]
    },
    {
      id: 11,
      title: "Rangasthalam 2",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      genre: "Drama, Action",
      releaseDate: "2025-01-12",
      rating: "8.6",
      duration: "159 min",
      language: "Telugu",
      description: "The village saga continues with new political upheavals.",
      votes: "567.1K",
      theaters: ["PVR Panjagutta", "INOX Forum Vijaya Mall", "Asian Shaan"]
    },
    {
      id: 12,
      title: "Geetha Govindam 2",
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      genre: "Romance, Comedy",
      releaseDate: "2025-01-25",
      rating: "7.9",
      duration: "143 min",
      language: "Telugu",
      description: "A heartwarming romantic comedy about second chances in love.",
      votes: "334.2K",
      theaters: ["Devi Cineplex", "Sudarshan Cinemas", "CMR Vijay"]
    }
  ];

  const genres = ['All', 'Action', 'Drama', 'Comedy', 'Thriller', 'Romance', 'Biography'];

  // ===== DUMMY SHOWTIMES DATA - COMMENTED FOR API INTEGRATION =====
  // KEEP THIS COMMENTED - Your API should return showtimes data
  const showtimes = [
    { time: "10:15 AM", theater: "PVR Nexus", price: 180 },
    { time: "12:30 PM", theater: "INOX GVK One", price: 200 },
    { time: "2:45 PM", theater: "AMB Cinemas", price: 220 },
    { time: "5:00 PM", theater: "Prasads IMAX", price: 280 },
    { time: "7:15 PM", theater: "PVR Kukatpally", price: 250 },
    { time: "9:30 PM", theater: "Forum Sujana Mall", price: 230 }
  ];

  useEffect(() => {
    let filtered = movies;

    if (selectedGenre !== 'All') {
      filtered = filtered.filter(movie =>
        movie.genre.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.language.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMovies(filtered);
  }, [movies, selectedGenre, searchTerm]);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setBookingStep('showtimes');
    setSelectedShowtime(null);
    setSelectedSeats([]);
  };

  const handleShowtimeSelect = (showtime) => {
    setSelectedShowtime(showtime);
    setBookingStep('seats');
  };

  const handleSeatSelect = (seats) => {
    setSelectedSeats(seats);
    if (seats.length > 0) {
      setBookingStep('summary');
    }
  };

  const handleBookingReset = () => {
    setSelectedMovie(null);
    setSelectedShowtime(null);
    setSelectedSeats([]);
    setBookingStep('movies');
  };

  if (bookingStep !== 'movies' && selectedMovie) {
    return (
      <div className="min-h-screen bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="outline"
            onClick={handleBookingReset}
            className="mb-6 flex items-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Back to Movies</span>
          </Button>

          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedMovie.image}
                  alt={selectedMovie.title}
                  className="w-20 h-28 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-xl font-bold">{selectedMovie.title}</h2>
                  <p className="text-gray-600">{selectedMovie.genre}</p>
                  <p className="text-sm text-gray-500">{selectedMovie.duration} • {selectedMovie.language}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="ml-1 font-semibold">{selectedMovie.rating}</span>
                    <span className="ml-1 text-gray-500">({selectedMovie.votes} votes)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {bookingStep !== 'movies' && (
            <DateSelector
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          )}

          {bookingStep === 'showtimes' && (
            <ShowtimeSelector
              showtimes={showtimes}
              selectedShowtime={selectedShowtime}
              onShowtimeSelect={handleShowtimeSelect}
            />
          )}

          {bookingStep === 'seats' && selectedShowtime && (
            <SeatSelection
              selectedSeats={selectedSeats}
              onSeatSelect={handleSeatSelect}
            />
          )}

          {bookingStep === 'summary' && selectedSeats.length > 0 && (
            <BookingSummary
              movie={selectedMovie}
              showtime={selectedShowtime}
              date={selectedDate}
              seats={selectedSeats}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Movies in Hyderabad</h1>
          <p className="text-lg text-gray-600">Book tickets for the latest and trending movies</p>
        </div>

        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search movies, genres, languages..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {genres.map((genre) => (
                <Button
                  key={genre}
                  variant={selectedGenre === genre ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedGenre(genre)}
                  className={selectedGenre === genre ? "bg-cinetime-primary hover:bg-cinetime-primary/90" : ""}
                >
                  {genre}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onBookClick={() => handleMovieSelect(movie)}
            />
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No movies found matching your criteria</div>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setSelectedGenre('All');
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

export default Movies;
