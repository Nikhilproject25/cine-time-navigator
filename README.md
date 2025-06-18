
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

## 🔌 **STEP-BY-STEP API INTEGRATION GUIDE**

### **Step 1: Setup API Configuration**

First, create a configuration file for your API base URL:

**Create `src/config/api.ts`:**
```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080/api', // Replace with your backend URL
  ENDPOINTS: {
    MOVIES: '/movies',
    SHOWTIMES: '/showtimes',
    BOOKINGS: '/bookings',
    SEATS: '/seats',
    ASSISTANT: '/assistant/ask',
    CONTACT: '/contact',
    SPORTS_EVENTS: '/sports-events'
  }
};

// Helper function for API calls
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
};
```

### **Step 2: Replace Movies Data**

**File: `src/pages/Movies.tsx`**

**Find this section (around lines 15-18):**
```typescript
useEffect(() => {
  setMovies(latestMovies);
  setFilteredMovies(latestMovies);
}, []);
```

**Replace with:**
```typescript
useEffect(() => {
  const fetchMovies = async () => {
    try {
      // COMMENT OUT THE DUMMY DATA:
      // setMovies(latestMovies);
      // setFilteredMovies(latestMovies);
      
      // ADD YOUR API CALL HERE:
      const response = await fetch('http://localhost:8080/api/movies');
      const moviesData = await response.json();
      setMovies(moviesData);
      setFilteredMovies(moviesData);
    } catch (error) {
      console.error('Error fetching movies:', error);
      // Fallback to dummy data if API fails
      setMovies(latestMovies);
      setFilteredMovies(latestMovies);
    }
  };

  fetchMovies();
}, []);
```

**Also comment out the dummy data array (around lines 20-140):**
```typescript
// COMMENT OUT THIS ENTIRE ARRAY:
/*
const latestMovies = [
  {
    id: 1,
    title: "Pushpa 2: The Rule",
    // ... rest of dummy data
  },
  // ... all other movies
];
*/
```

### **Step 3: Replace Sports Events Data**

**File: `src/pages/SportsEvents.tsx`**

**Find the dummy events array (around lines 10-50) and replace:**
```typescript
useEffect(() => {
  const fetchEvents = async () => {
    try {
      // COMMENT OUT DUMMY DATA:
      // setEvents(dummyEvents);
      
      // ADD YOUR API CALL:
      const response = await fetch('http://localhost:8080/api/sports-events');
      const eventsData = await response.json();
      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
      // Fallback to dummy data
      setEvents(dummyEvents);
    }
  };

  fetchEvents();
}, []);
```

### **Step 4: Replace Booking Submission**

**File: `src/pages/Booking.tsx`**

**Find the handleSubmit function (around lines 70-100) and replace:**
```typescript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    // COMMENT OUT DUMMY SIMULATION:
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // const result = { success: true, bookingId: 'BK...' };

    // ADD YOUR API CALL:
    const response = await fetch('http://localhost:8080/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        movieId: movie?.id,
        eventId: event?.id,
        title: movie?.title || event?.title,
        type: movie ? 'movie' : 'event'
      }),
    });
    
    const result = await response.json();

    if (result.success) {
      setBookingConfirmed(true);
      setBookingId(result.bookingId);
      toast({
        title: "Booking Confirmed!",
        description: `Your booking ID is ${result.bookingId}`,
      });
    } else {
      throw new Error(result.message || 'Booking failed');
    }
  } catch (error) {
    console.error('Booking error:', error);
    toast({
      title: "Booking Failed",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};
```

### **Step 5: Replace My Bookings Data**

**File: `src/pages/MyBookings.tsx`**

**Find the fetchBookings function (around lines 50-70) and replace:**
```typescript
useEffect(() => {
  const fetchBookings = async () => {
    try {
      // COMMENT OUT DUMMY DATA:
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // setBookings(dummyBookings);

      // ADD YOUR API CALL:
      const response = await fetch('http://localhost:8080/api/bookings');
      const bookingsData = await response.json();
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      // Fallback to dummy data
      setBookings(dummyBookings);
    } finally {
      setIsLoading(false);
    }
  };

  fetchBookings();
}, []);
```

### **Step 6: Replace AI Assistant API**

**File: `src/components/AIAssistant.tsx`**

**Find the handleSendMessage function (around lines 35-70) and replace:**
```typescript
const handleSendMessage = async () => {
  if (!inputMessage.trim()) return;

  const userMessage = inputMessage;
  setInputMessage('');
  
  setMessages(prev => [...prev, {
    type: 'user',
    content: userMessage
  }]);

  try {
    // COMMENT OUT DUMMY SIMULATION:
    // setTimeout(() => { ... dummy responses ... }, 1000);

    // ADD YOUR API CALL:
    const response = await fetch('http://localhost:8080/api/assistant/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: userMessage }),
    });
    
    const result = await response.json();
    
    setMessages(prev => [...prev, {
      type: 'assistant',
      content: result.response || result.message
    }]);
  } catch (error) {
    console.error('AI Assistant error:', error);
    setMessages(prev => [...prev, {
      type: 'assistant',
      content: 'Sorry, I encountered an error. Please try again.'
    }]);
  }
};
```

### **Step 7: Replace Contact Form Submission**

**File: `src/pages/Contact.tsx`**

**Find the handleSubmit function and replace dummy simulation with:**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // COMMENT OUT DUMMY SIMULATION:
    // await new Promise(resolve => setTimeout(resolve, 1000));

    // ADD YOUR API CALL:
    const response = await fetch('http://localhost:8080/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const result = await response.json();
    
    if (result.success) {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you soon.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    toast({
      title: "Error",
      description: "Failed to send message. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};
```

## 📋 **QUICK CHECKLIST FOR API INTEGRATION**

### ✅ **Files to Update:**
1. **Create:** `src/config/api.ts` (API configuration)
2. **Update:** `src/pages/Movies.tsx` (lines 15-18 and 20-140)
3. **Update:** `src/pages/SportsEvents.tsx` (useEffect function)
4. **Update:** `src/pages/Booking.tsx` (handleSubmit function)
5. **Update:** `src/pages/MyBookings.tsx` (fetchBookings function)
6. **Update:** `src/components/AIAssistant.tsx` (handleSendMessage function)
7. **Update:** `src/pages/Contact.tsx` (handleSubmit function)

### ✅ **What to Comment Out:**
- All `latestMovies`, `dummyEvents`, `dummyBookings` arrays
- `setTimeout` simulations in functions
- Dummy response objects

### ✅ **What to Replace With:**
- `fetch()` calls to your Spring Boot API
- Proper error handling with try-catch blocks
- Real data processing from API responses

## 🔧 **Expected API Response Formats**

### Movies API Response (`GET /api/movies`)
```json
[
  {
    "id": 1,
    "title": "Pushpa 2: The Rule",
    "image": "https://example.com/poster.jpg",
    "genre": "Action, Drama",
    "language": "Telugu",
    "duration": "178 min",
    "rating": "8.7",
    "votes": "567.3K",
    "description": "Movie description...",
    "releaseDate": "2025-01-15",
    "theaters": ["Sudarshan 35MM", "Sandhya 70MM"]
  }
]
```

### Bookings API Response (`POST /api/bookings`)
```json
{
  "success": true,
  "bookingId": "BK123456789",
  "message": "Booking confirmed successfully!",
  "totalAmount": 450
}
```

### AI Assistant API Response (`POST /api/assistant/ask`)
```json
{
  "response": "Here are some popular Telugu movies currently showing...",
  "success": true
}
```

## 🚀 **Testing Your API Integration**

### 1. **Start Your Spring Boot Backend**
```bash
# Make sure your Spring Boot app is running on http://localhost:8080
./mvnw spring-boot:run
```

### 2. **Update Frontend API URLs**
- Change `http://localhost:8080/api` to your actual backend URL if different
- Update in `src/config/api.ts` and all fetch calls

### 3. **Test Each Feature**
- **Movies:** Verify movie list loads from your API
- **Booking:** Submit a test booking and check database
- **My Bookings:** Verify bookings display from your API
- **AI Assistant:** Test chat queries
- **Contact:** Submit contact form

### 4. **Debug Common Issues**
- **CORS Errors:** Add CORS configuration in Spring Boot
- **404 Errors:** Verify API endpoint URLs match
- **JSON Errors:** Check request/response data formats

## 🔐 **CORS Configuration for Spring Boot**

Add this to your Spring Boot application:

```java
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
@RestController
@RequestMapping("/api")
public class MovieController {
    // Your controller methods
}
```

## 📱 **Mobile Optimization & Performance**

- **Touch-friendly Interface**: Large buttons for seat selection
- **Responsive Breakpoints**: Optimized for all screen sizes
- **Fast Loading**: Optimized images and lazy loading
- **Caching**: API response caching for better performance

---

**🎯 You're all set! Follow the steps above to connect your APIs. If you encounter issues, check the console logs and verify your Spring Boot endpoints are working with tools like Postman.**

**Default Location**: Hyderabad, Telangana  
**Backend**: Spring Boot + MySQL  
**Frontend**: React + TypeScript + Tailwind CSS
