
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

  // Extended movie data inspired by BookMyShow
  const latestMovies = [
    {
      id: 1,
      title: "Jawan",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      genre: "Action, Thriller",
      releaseDate: "2024-01-15",
      rating: "8.5",
      duration: "169 min",
      language: "Hindi",
      description: "An emotional journey of a man who is set to rectify the wrongs in the society.",
      votes: "485.2K",
      theaters: ["PVR Nexus", "INOX GVK One", "AMB Cinemas"]
    },
    {
      id: 2,
      title: "Leo",
      image: "https://images.unsplash.com/photo-1489599735734-79b4609e24c8?w=400&h=600&fit=crop",
      genre: "Action, Thriller",
      releaseDate: "2024-02-01",
      rating: "8.2",
      duration: "164 min",
      language: "Tamil",
      description: "A mild-mannered cafe owner discovers that he's accidentally caught in the middle of a war between two crime families.",
      votes: "342.8K",
      theaters: ["Prasads IMAX", "Forum Sujana Mall", "PVR Kukatpally"]
    },
    {
      id: 3,
      title: "Tiger 3",
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      genre: "Action, Adventure",
      releaseDate: "2024-01-21",
      rating: "7.8",
      duration: "155 min",
      language: "Hindi",
      description: "Tiger and Zoya are back - to save the country and their family.",
      votes: "298.5K",
      theaters: ["INOX CMR Central", "PVR Preston", "Asian GPR"]
    },
    {
      id: 4,
      title: "Salaar",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      genre: "Action, Drama",
      releaseDate: "2024-01-10",
      rating: "8.7",
      duration: "175 min",
      language: "Telugu",
      description: "The fate of a violently contested kingdom hangs on the fraught bond between two friends-turned-foes.",
      votes: "567.3K",
      theaters: ["Sudarshan 35MM", "Sandhya 70MM", "Devi 70MM"]
    },
    {
      id: 5,
      title: "Dunki",
      image: "https://images.unsplash.com/photo-1489599735734-79b4609e24c8?w=400&h=600&fit=crop",
      genre: "Comedy, Drama",
      releaseDate: "2024-01-05",
      rating: "8.1",
      duration: "161 min",
      language: "Hindi",
      description: "Four friends from a Punjab village try to immigrate to England using an illegal route called 'Dunki'.",
      votes: "234.7K",
      theaters: ["PVR Irrum Manzil", "INOX Maheshwari Parmeshwari", "Miraj Cinemas"]
    },
    {
      id: 6,
      title: "Animal",
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      genre: "Action, Crime",
      releaseDate: "2024-02-14",
      rating: "8.4",
      duration: "201 min",
      language: "Hindi",
      description: "A son's love for his father leads him down a dark path of violence and revenge.",
      votes: "412.9K",
      theaters: ["AMB Cinemas Gachibowli", "PVR Forum Mall", "INOX Banjara Hills"]
    },
    {
      id: 7,
      title: "12th Fail",
      image: "https://images.unsplash.com/photo-1489599735734-79b4609e24c8?w=400&h=600&fit=crop",
      genre: "Biography, Drama",
      releaseDate: "2024-01-28",
      rating: "9.1",
      duration: "147 min",
      language: "Hindi",
      description: "Based on the true story of IPS officer Manoj Kumar Sharma who fearlessly embraced the idea of restarting his academic journey.",
      votes: "189.4K",
      theaters: ["Cinepolis Mantra Mall", "PVR Next Galleria", "INOX Vishaal De Mall"]
    },
    {
      id: 8,
      title: "Gadar 2",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      genre: "Action, Drama",
      releaseDate: "2024-02-10",
      rating: "7.9",
      duration: "170 min",
      language: "Hindi",
      description: "Tara Singh goes to Pakistan to bring his son Jeete back home and faces various obstacles.",
      votes: "267.8K",
      theaters: ["Shanti 70MM", "Bramaramba 70MM", "Odeon 70MM"]
    },
    {
      id: 9,
      title: "Bhola Shankar",
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      genre: "Action, Comedy",
      releaseDate: "2024-01-18",
      rating: "6.8",
      duration: "144 min",
      language: "Telugu",
      description: "A taxi driver with a past seeks to protect his sister and her daughter from danger.",
      votes: "156.2K",
      theaters: ["AAA Cinemas", "Megaplex Kondapur", "Mallikarjuna 70MM"]
    },
    {
      id: 10,
      title: "Bholaa",
      image: "https://images.unsplash.com/photo-1489599735734-79b4609e24c8?w=400&h=600&fit=crop",
      genre: "Action, Adventure",
      releaseDate: "2024-02-05",
      rating: "7.5",
      duration: "144 min",
      language: "Hindi",
      description: "An ex-convict must deliver a truck to its destination while protecting a police officer and her son.",
      votes: "198.7K",
      theaters: ["PVR Promenade", "INOX Hyderabad Central", "Carnival Cinemas"]
    },
    {
      id: 11,
      title: "Pathaan",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      genre: "Action, Thriller",
      releaseDate: "2024-01-12",
      rating: "8.3",
      duration: "146 min",
      language: "Hindi",
      description: "An exiled RAW agent partners with other agents to take down a rogue agent threatening India.",
      votes: "445.1K",
      theaters: ["PVR Panjagutta", "INOX Forum Vijaya Mall", "Asian Shaan"]
    },
    {
      id: 12,
      title: "Varisu",
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      genre: "Action, Family",
      releaseDate: "2024-01-25",
      rating: "7.7",
      duration: "168 min",
      language: "Tamil",
      description: "A young businessman becomes the head of a business empire and fights to protect his family legacy.",
      votes: "223.6K",
      theaters: ["Devi Cineplex", "Sudarshan Cinemas", "CMR Vijay"]
    }
  ];

  const genres = ['All', 'Action', 'Drama', 'Comedy', 'Thriller', 'Romance', 'Biography'];

  const showtimes = [
    { time: "10:15 AM", theater: "PVR Nexus", price: 180 },
    { time: "12:30 PM", theater: "INOX GVK One", price: 200 },
    { time: "2:45 PM", theater: "AMB Cinemas", price: 220 },
    { time: "5:00 PM", theater: "Prasads IMAX", price: 280 },
    { time: "7:15 PM", theater: "PVR Kukatpally", price: 250 },
    { time: "9:30 PM", theater: "Forum Sujana Mall", price: 230 }
  ];

  useEffect(() => {
    // TODO: Replace with actual API call
    // fetch('http://localhost:8080/api/movies')
    //   .then(response => response.json())
    //   .then(data => setMovies(data))
    //   .catch(error => console.error('Error fetching movies:', error));
    
    setMovies(latestMovies);
    setFilteredMovies(latestMovies);
  }, []);

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
          {/* Back to Movies Button */}
          <Button
            variant="outline"
            onClick={handleBookingReset}
            className="mb-6 flex items-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Back to Movies</span>
          </Button>

          {/* Selected Movie Info */}
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

          {/* Date Selector */}
          {bookingStep !== 'movies' && (
            <DateSelector
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          )}

          {/* Showtime Selector */}
          {bookingStep === 'showtimes' && (
            <ShowtimeSelector
              showtimes={showtimes}
              selectedShowtime={selectedShowtime}
              onShowtimeSelect={handleShowtimeSelect}
            />
          )}

          {/* Seat Selection */}
          {bookingStep === 'seats' && selectedShowtime && (
            <SeatSelection
              selectedSeats={selectedSeats}
              onSeatSelect={handleSeatSelect}
            />
          )}

          {/* Booking Summary */}
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Movies in Hyderabad</h1>
          <p className="text-lg text-gray-600">Book tickets for the latest and trending movies</p>
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
                  placeholder="Search movies, genres, languages..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Genre Filter */}
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

        {/* Movies Grid */}
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
