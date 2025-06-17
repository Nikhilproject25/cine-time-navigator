
# CineTime - Professional Movie Ticket Booking Web Application

CineTime is a professional, responsive React-based movie ticket booking web application inspired by BookMyShow. Built for the Hyderabad market, it provides a seamless experience for booking movie tickets with advanced features like seat selection, AI assistant, and dynamic showtime management.

## 🌟 Enhanced Features

### 🎬 Movie Discovery & Booking
- **Dynamic Movie Listings**: 12+ latest trending movies with real titles, genres, ratings, and high-quality posters
- **Advanced Filtering**: Search by title, genre, language with real-time results
- **Interactive Movie Cards**: Detailed movie information with theaters, votes, and booking options
- **Responsive Grid Layout**: Optimized for all screen sizes

### 📅 Advanced Date & Time Selection
- **Horizontal Scrollable Date Selector**: BookMyShow-inspired date chips with "Today", "Tomorrow" labels
- **Smart Date Navigation**: Week-by-week navigation with past date restrictions
- **Dynamic Showtime Display**: Clickable showtime buttons instead of dropdowns
- **Theater-specific Pricing**: Different prices for different theaters and timings

### 🪑 Interactive Seat Selection
- **Visual Seat Map**: 10 rows x 12 seats grid with realistic theater layout
- **Seat Categories**: Regular (₹200) and Premium (₹300) with visual differentiation
- **Real-time Selection**: Visual feedback for available, selected, and booked seats
- **Dynamic Pricing**: Price calculation based on seat type and quantity
- **Seat Restrictions**: Maximum 10 seats per booking with smart validation

### 🧾 Comprehensive Booking Flow
- **Multi-step Process**: Movies → Date → Showtime → Seats → Payment
- **Booking Summary**: Complete details with pricing breakdown
- **Customer Information**: Secure data collection for booking confirmation
- **Price Breakdown**: Subtotal, convenience fee (5%), and GST (18%) calculation
- **Payment Integration Ready**: Structured for Razorpay/payment gateway integration

### 🤖 AI Movie Assistant
- **Floating Chat Widget**: Always accessible from bottom-right corner
- **Intelligent Responses**: Context-aware answers about movies, showtimes, and bookings
- **Preset Queries**: Quick access to common questions
- **Minimize/Maximize**: Space-efficient chat interface
- **Movie Recommendations**: Personalized suggestions based on user queries

## 🏗️ Technical Architecture

### Frontend Stack
- **React 18** with TypeScript for type safety
- **Tailwind CSS** with custom design system
- **Shadcn/ui** component library for consistent UI
- **React Router DOM** for client-side routing
- **Lucide React** for beautiful icons
- **Modular Component Architecture** for easy maintenance

### Component Structure
```
src/
├── components/
│   ├── MovieCard.tsx          # Individual movie display card
│   ├── DateSelector.tsx       # Horizontal scrollable date picker
│   ├── ShowtimeSelector.tsx   # Theater showtime selection
│   ├── SeatSelection.tsx      # Interactive seat map
│   ├── BookingSummary.tsx     # Final booking details & payment
│   └── AIAssistant.tsx        # Floating AI chat widget
├── pages/
│   ├── Home.tsx              # Landing page with featured content
│   ├── Movies.tsx            # Enhanced movie listing with booking flow
│   ├── SportsEvents.tsx      # Sports and events booking
│   ├── Booking.tsx           # Legacy booking page (kept for compatibility)
│   ├── MyBookings.tsx        # User booking history
│   ├── Assistant.tsx         # Full-page AI assistant
│   └── Contact.tsx           # Contact and support
└── App.tsx                   # Main application routing
```

## 🎨 Design System

### Colors
```css
--primary: #E91E63 (Pink)     /* Main brand color */
--secondary: #8BC34A (Green)   /* Secondary actions */
--accent: #FF5722 (Orange)     /* Highlights */
--dark: #1A1A2E (Dark Blue)   /* Dark theme */
--light: #F8F9FA (Light Gray) /* Background */
```

### Key Features
- **Mobile-first Responsive Design**
- **BookMyShow-inspired UI/UX**
- **Smooth Animations & Transitions**
- **High-quality Image Optimization**
- **Consistent Typography & Spacing**

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd cinetime

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:8080
```

### Build for Production
```bash
npm run build
```

## 🔌 Backend Integration Guide

### API Endpoints Configuration

The application is designed to integrate with a Spring Boot backend. Update these API endpoints in the respective components:

#### Movies API (`src/pages/Movies.tsx`)
```typescript
// Replace dummy data with:
fetch('http://localhost:8080/api/movies')
  .then(response => response.json())
  .then(data => setMovies(data))
```

#### Showtimes API (`src/components/ShowtimeSelector.tsx`)
```typescript
// Add dynamic showtime fetching:
fetch(`http://localhost:8080/api/movies/${movieId}/showtimes?date=${selectedDate}`)
  .then(response => response.json())
  .then(data => setShowtimes(data))
```

#### Seat Availability API (`src/components/SeatSelection.tsx`)
```typescript
// Fetch real-time seat availability:
fetch(`http://localhost:8080/api/showtimes/${showtimeId}/seats`)
  .then(response => response.json())
  .then(data => updateSeatAvailability(data))
```

#### Booking API (`src/components/BookingSummary.tsx`)
```typescript
// Complete booking submission:
fetch('http://localhost:8080/api/bookings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(bookingData)
})
```

#### AI Assistant API (`src/components/AIAssistant.tsx`)
```typescript
// AI query processing:
fetch('http://localhost:8080/api/assistant/ask', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: userMessage })
})
```

### Expected Data Formats

#### Movie Object
```json
{
  "id": 1,
  "title": "Jawan",
  "image": "https://example.com/poster.jpg",
  "genre": "Action, Thriller",
  "language": "Hindi",
  "duration": "169 min",
  "rating": "8.5",
  "votes": "485.2K",
  "description": "Movie description...",
  "releaseDate": "2024-01-15",
  "theaters": ["PVR Nexus", "INOX GVK One"]
}
```

#### Showtime Object
```json
{
  "id": 1,
  "movieId": 1,
  "time": "07:00 PM",
  "theater": "PVR Nexus",
  "screen": "Screen 1",
  "price": 250,
  "availableSeats": 120,
  "totalSeats": 150
}
```

#### Seat Object
```json
{
  "seatId": "A5",
  "row": "A",
  "number": 5,
  "type": "regular", // or "premium"
  "price": 200,
  "isAvailable": true,
  "isBooked": false
}
```

#### Booking Object
```json
{
  "bookingId": "BK123456789",
  "movieId": 1,
  "showtimeId": 1,
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+91 9876543210",
  "seats": ["A5", "A6"],
  "totalAmount": 450,
  "bookingDate": "2024-01-15T10:30:00Z",
  "status": "confirmed"
}
```

## ⚙️ Configuration

### API Base URL Setup
Create a configuration file for easy API management:

```typescript
// src/config/api.ts
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  ENDPOINTS: {
    MOVIES: '/movies',
    SHOWTIMES: '/showtimes',
    BOOKINGS: '/bookings',
    SEATS: '/seats',
    ASSISTANT: '/assistant/ask',
    CONTACT: '/contact'
  }
};
```

### Environment Variables
Create `.env` file in project root:
```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_PAYMENT_KEY=your_razorpay_key
REACT_APP_APP_NAME=CineTime
```

### Seat Configuration
Customize seat layout in `SeatSelection.tsx`:
```typescript
const SEAT_CONFIG = {
  ROWS: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
  SEATS_PER_ROW: 12,
  PREMIUM_ROWS: ['F', 'G', 'H', 'I', 'J'], // Last 5 rows
  PRICES: {
    REGULAR: 200,
    PREMIUM: 300
  },
  MAX_SEATS_PER_BOOKING: 10
};
```

## 🔧 Backend Requirements (Spring Boot)

### Essential Controllers
1. **MovieController** - Movie CRUD operations
2. **ShowtimeController** - Showtime management
3. **BookingController** - Booking processing
4. **SeatController** - Seat availability
5. **AssistantController** - AI chat processing

### Database Schema (MySQL)
```sql
-- Movies table
CREATE TABLE movies (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(255),
  language VARCHAR(100),
  duration VARCHAR(50),
  rating DECIMAL(2,1),
  votes VARCHAR(50),
  description TEXT,
  image_url VARCHAR(500),
  release_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Theaters table
CREATE TABLE theaters (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  total_screens INT,
  address TEXT
);

-- Showtimes table
CREATE TABLE showtimes (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  movie_id BIGINT,
  theater_id BIGINT,
  show_date DATE,
  show_time TIME,
  screen_number VARCHAR(50),
  base_price DECIMAL(10,2),
  available_seats INT,
  total_seats INT,
  FOREIGN KEY (movie_id) REFERENCES movies(id),
  FOREIGN KEY (theater_id) REFERENCES theaters(id)
);

-- Bookings table
CREATE TABLE bookings (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  booking_id VARCHAR(20) UNIQUE,
  showtime_id BIGINT,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  seats JSON,
  total_amount DECIMAL(10,2),
  booking_status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (showtime_id) REFERENCES showtimes(id)
);
```

### CORS Configuration
```java
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
@RestController
@RequestMapping("/api")
public class MovieController {
    // Controller methods...
}
```

## 🧪 Testing

### API Testing with Postman
Sample requests included in `docs/api-collection.json`:

```bash
# Get all movies
GET http://localhost:8080/api/movies

# Get showtimes for a movie
GET http://localhost:8080/api/movies/1/showtimes?date=2024-01-15

# Create booking
POST http://localhost:8080/api/bookings
Content-Type: application/json
{
  "showtimeId": 1,
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "seats": ["A5", "A6"],
  "totalAmount": 450
}
```

### Frontend Testing
```bash
# Run development server
npm run dev

# Test responsive design on different screen sizes
# Verify all booking flows work end-to-end
# Check AI assistant responses
# Validate form submissions
```

## 📱 Mobile Optimization

- **Touch-friendly Interface**: Large buttons for seat selection and showtime picking
- **Responsive Breakpoints**: Optimized for phones, tablets, and desktops
- **Fast Loading**: Optimized images and lazy loading
- **Offline Support**: Service worker ready for PWA conversion

## 🎯 Performance Features

- **Image Optimization**: WebP format with fallbacks
- **Lazy Loading**: Components and images load on demand
- **Code Splitting**: Route-based chunk splitting
- **Caching**: API response caching for better performance
- **Smooth Animations**: Hardware-accelerated transitions

## 🚀 Deployment

### Vercel Deployment
```bash
npm install -g vercel
vercel --prod
```

### Netlify Deployment
```bash
npm run build
# Upload dist folder to Netlify
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔐 Security Considerations

- **Input Validation**: All user inputs sanitized
- **XSS Protection**: React's built-in protection
- **API Security**: CORS properly configured
- **Payment Security**: PCI DSS compliant payment processing
- **Data Privacy**: GDPR compliant data handling

## 🛠️ Development Tools

- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting
- **TypeScript**: Type safety
- **Vite**: Fast development server
- **Git Hooks**: Pre-commit code validation

## 📈 Analytics Integration

Ready for integration with:
- **Google Analytics 4**
- **Mixpanel** for user behavior tracking
- **Hotjar** for user experience insights
- **Performance monitoring** with Web Vitals

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

- **Email**: support@cinetime.com
- **Phone**: +91 9876543210
- **Live Chat**: Use the AI Assistant on the website
- **Documentation**: [Full API Documentation](./docs/api.md)

---

**Built with ❤️ for movie lovers in Hyderabad**

**Default Location**: Hyderabad, Telangana  
**Target Audience**: Movie enthusiasts and entertainment seekers  
**Tech Stack**: React + TypeScript + Tailwind CSS + Spring Boot + MySQL
