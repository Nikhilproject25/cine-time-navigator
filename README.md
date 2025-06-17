
# CineTime - Movie Ticket Booking Web Application

CineTime is a professional, responsive React-based movie ticket booking web application inspired by BookMyShow. Built for the Hyderabad market, it provides a seamless experience for booking movie tickets, sports events, and concerts.

## 🚀 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Movie Booking**: Browse and book tickets for the latest movies
- **Sports & Events**: Book tickets for sports matches, concerts, and live events
- **Booking Management**: View and manage your booking history
- **AI Assistant**: Interactive chatbot for customer support
- **Contact Support**: Comprehensive contact form and support system

## 🏗️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router DOM
- **UI Components**: Shadcn/ui component library
- **State Management**: React hooks (useState, useEffect)
- **HTTP Client**: Fetch API (ready for Axios integration)
- **Build Tool**: Vite
- **Package Manager**: npm

## 📱 Pages

1. **Home** - Featured movies, quick actions, and hero carousel
2. **Movies** - Browse movies with filtering and search
3. **Sports & Events** - Discover and book event tickets
4. **Booking** - Complete booking form with confirmation
5. **My Bookings** - View booking history and manage tickets
6. **Assistant** - AI-powered customer support chat
7. **Contact** - Contact form and support information
8. **404** - Custom not found page

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cinetime
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:8080`

### Build for Production

```bash
npm run build
```

## 🔗 API Integration

The application is designed to work with a Spring Boot backend running on `http://localhost:8080/api/`. Here are the key API endpoints to implement:

### Backend API Endpoints

| Method | Endpoint | Purpose | Component |
|--------|----------|---------|-----------|
| GET | `/api/movies` | Fetch movie list | Movies.tsx |
| GET | `/api/sports-events` | Fetch events list | SportsEvents.tsx |
| POST | `/api/bookings` | Create new booking | Booking.tsx |
| GET | `/api/bookings` | Get user bookings | MyBookings.tsx |
| POST | `/api/assistant/ask` | AI assistant queries | Assistant.tsx |
| POST | `/api/contact` | Contact form submission | Contact.tsx |

### Example API Integration

Replace the dummy data fetching in components:

```typescript
// In Movies.tsx - Replace dummy data with:
useEffect(() => {
  fetch('http://localhost:8080/api/movies')
    .then(response => response.json())
    .then(data => setMovies(data))
    .catch(error => console.error('Error fetching movies:', error));
}, []);
```

### Expected Data Formats

**Movie Object:**
```json
{
  "id": 1,
  "title": "Movie Title",
  "image": "image-url",
  "genre": "Action",
  "releaseDate": "2024-01-15",
  "rating": "8.4",
  "duration": "148 min",
  "language": "English",
  "description": "Movie description"
}
```

**Event Object:**
```json
{
  "id": 1,
  "title": "Event Title",
  "image": "image-url",
  "category": "Sports",
  "date": "2024-04-15",
  "time": "19:30",
  "venue": "Stadium Name",
  "price": "₹500 onwards",
  "description": "Event description"
}
```

**Booking Object:**
```json
{
  "id": 1,
  "bookingId": "BK123456789",
  "title": "Movie/Event Title",
  "type": "movie",
  "date": "2024-03-20",
  "time": "07:00 PM",
  "seats": 2,
  "venue": "Cinema/Venue Name",
  "totalAmount": 400,
  "status": "confirmed",
  "customerName": "John Doe",
  "customerEmail": "john@example.com"
}
```

## 🎨 Customization

### Theme Colors
The application uses a custom color palette defined in `tailwind.config.ts`:

```typescript
cinetime: {
  primary: '#E91E63',    // Pink
  secondary: '#8BC34A',  // Green
  accent: '#FF5722',     // Orange
  dark: '#1A1A2E',       // Dark Blue
  light: '#F8F9FA'       // Light Gray
}
```

### Images
Replace placeholder images in the `/public` directory:
- Movie posters
- Event banners
- Hero carousel images
- Venue photos

## 🔧 Configuration

### Environment Variables
Create a `.env` file for environment-specific configurations:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=CineTime
VITE_DEFAULT_CITY=Hyderabad
```

### API Base URL
Update the API base URL in components by creating a config file:

```typescript
// src/config/api.ts
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
```

## 📱 Mobile Responsiveness

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🧪 Testing

Run the development server and test:
- Navigation between pages
- Form submissions
- Responsive design
- API integration points

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify

## 🤝 Backend Integration Guide

For Spring Boot developers:

1. **Enable CORS** for `http://localhost:8080`
2. **Implement REST controllers** for the endpoints listed above
3. **Use MySQL database** with appropriate entity models
4. **Return JSON responses** in the expected formats
5. **Handle validation** and error responses

### Sample Spring Boot Controller
```java
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8080")
public class MovieController {
    
    @GetMapping("/movies")
    public ResponseEntity<List<Movie>> getAllMovies() {
        // Implementation
    }
    
    @PostMapping("/bookings")
    public ResponseEntity<BookingResponse> createBooking(@RequestBody BookingRequest request) {
        // Implementation
    }
}
```

## 📄 License

This project is licensed under the MIT License.

## 🙋‍♂️ Support

For support and questions:
- Email: support@cinetime.com
- Phone: +91 9876543210
- Use the in-app Assistant feature

---

**Default Location**: Hyderabad, Telangana
**Target Audience**: Movie enthusiasts and event-goers in Hyderabad
**Business Model**: Ticket booking with service fees
