
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  // Dummy data for movies (replace with API call to GET /api/movies)
  const dummyMovies = [
    {
      id: 1,
      title: "Spider-Man: No Way Home",
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      genre: "Action",
      releaseDate: "2024-01-15",
      rating: "8.4",
      duration: "148 min",
      language: "English",
      description: "Spider-Man's identity is revealed and he must deal with the consequences."
    },
    {
      id: 2,
      title: "Dune: Part Two",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      genre: "Sci-Fi",
      releaseDate: "2024-02-01",
      rating: "8.7",
      duration: "166 min",
      language: "English",
      description: "Paul Atreides unites with Chani and the Fremen while seeking revenge."
    },
    {
      id: 3,
      title: "Oppenheimer",
      image: "https://images.unsplash.com/photo-1489599735734-79b4609e24c8?w=400&h=600&fit=crop",
      genre: "Drama",
      releaseDate: "2024-01-21",
      rating: "8.6",
      duration: "180 min",
      language: "English",
      description: "The story of J. Robert Oppenheimer and the Manhattan Project."
    },
    {
      id: 4,
      title: "RRR",
      image: "https://images.unsplash.com/photo-1489599735734-79b4609e24c8?w=400&h=600&fit=crop",
      genre: "Action",
      releaseDate: "2024-01-10",
      rating: "8.2",
      duration: "187 min",
      language: "Telugu",
      description: "A fictitious story about two legendary revolutionaries."
    },
    {
      id: 5,
      title: "KGF Chapter 2",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      genre: "Action",
      releaseDate: "2024-01-05",
      rating: "8.5",
      duration: "168 min",
      language: "Kannada",
      description: "Rocky's journey continues as he rises to become the undisputed king."
    },
    {
      id: 6,
      title: "Pushpa: The Rule",
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      genre: "Action",
      releaseDate: "2024-02-14",
      rating: "8.3",
      duration: "175 min",
      language: "Telugu",
      description: "Pushpa Raj's story continues in this highly anticipated sequel."
    }
  ];

  const genres = ['All', 'Action', 'Drama', 'Sci-Fi', 'Comedy', 'Thriller'];

  useEffect(() => {
    // TODO: Replace with actual API call
    // fetch('http://localhost:8080/api/movies')
    //   .then(response => response.json())
    //   .then(data => setMovies(data))
    //   .catch(error => console.error('Error fetching movies:', error));
    
    setMovies(dummyMovies);
    setFilteredMovies(dummyMovies);
  }, []);

  useEffect(() => {
    let filtered = movies;

    if (selectedGenre !== 'All') {
      filtered = filtered.filter(movie => movie.genre === selectedGenre);
    }

    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMovies(filtered);
  }, [movies, selectedGenre, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Movies in Hyderabad</h1>
          <p className="text-lg text-gray-600">Discover the latest movies and book your tickets</p>
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
                  placeholder="Search movies..."
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
            <Card key={movie.id} className="card-hover overflow-hidden bg-white">
              <div className="relative">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-4 right-4 bg-yellow-400 text-black px-2 py-1 rounded-lg text-sm font-semibold">
                  ⭐ {movie.rating}
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-black/70 text-white">
                    {movie.language}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{movie.title}</h3>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline">{movie.genre}</Badge>
                  <Badge variant="outline">{movie.duration}</Badge>
                </div>
                
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {movie.description}
                </p>
                
                <Link to="/booking" state={{ movie }}>
                  <Button className="w-full bg-cinetime-primary hover:bg-cinetime-primary/90">
                    Book Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
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
