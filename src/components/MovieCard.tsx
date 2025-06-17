
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  image: string;
  genre: string;
  releaseDate: string;
  rating: string;
  duration: string;
  language: string;
  description: string;
  votes: string;
  theaters: string[];
}

interface MovieCardProps {
  movie: Movie;
  onBookClick: () => void;
}

const MovieCard = ({ movie, onBookClick }: MovieCardProps) => {
  return (
    <Card className="card-hover overflow-hidden bg-white group">
      <div className="relative">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-yellow-400 text-black px-2 py-1 rounded-lg text-sm font-semibold shadow-lg">
          ⭐ {movie.rating}
        </div>
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-black/70 text-white backdrop-blur-sm">
            {movie.language}
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 text-white">
            <p className="text-xs opacity-90">{movie.votes} votes</p>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-cinetime-primary transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="text-xs">
            {movie.genre.split(',')[0]}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {movie.duration}
          </Badge>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{new Date(movie.releaseDate).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {movie.description}
        </p>

        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">Available at:</p>
          <div className="flex flex-wrap gap-1">
            {movie.theaters.slice(0, 2).map((theater, index) => (
              <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                {theater}
              </span>
            ))}
            {movie.theaters.length > 2 && (
              <span className="text-xs text-gray-500">+{movie.theaters.length - 2} more</span>
            )}
          </div>
        </div>
        
        <Button 
          className="w-full bg-cinetime-primary hover:bg-cinetime-primary/90 font-semibold"
          onClick={onBookClick}
        >
          Book Tickets
        </Button>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
