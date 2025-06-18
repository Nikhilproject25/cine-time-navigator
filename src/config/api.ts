
// API Configuration for CineTime Movie Booking
// Replace the BASE_URL with your actual backend URL
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080/api', // TODO: Replace with your Spring Boot backend URL
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
