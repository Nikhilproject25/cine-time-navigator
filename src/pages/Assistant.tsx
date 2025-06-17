
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, User, Ticket } from 'lucide-react';

const Assistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your CineTime assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickQuestions = [
    "Show me movies playing today",
    "Help me find my booking",
    "What events are happening this weekend?",
    "How do I cancel my booking?",
    "Show me movie showtimes",
    "What's the refund policy?"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('http://localhost:8080/api/assistant/ask', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ question: inputMessage }),
      // });
      // const data = await response.json();

      // Simulate API call with dummy response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const botResponse = getBotResponse(inputMessage);
      
      const assistantMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getBotResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('movie') || lowerQuestion.includes('film')) {
      return "I can help you find movies! We have great movies playing in Hyderabad including Spider-Man: No Way Home, Dune: Part Two, and Oppenheimer. Would you like me to show you showtimes or help you book tickets?";
    }
    
    if (lowerQuestion.includes('booking') || lowerQuestion.includes('ticket')) {
      return "For booking-related queries, you can:\n\n• View your bookings in the 'My Bookings' section\n• Cancel bookings up to 2 hours before showtime\n• Download your tickets from the booking confirmation\n\nWhat specific help do you need with your booking?";
    }
    
    if (lowerQuestion.includes('event') || lowerQuestion.includes('concert') || lowerQuestion.includes('sports')) {
      return "We have exciting events coming up! Including IPL matches, A.R. Rahman concert, comedy shows, and food festivals. Check out our Sports & Events page for the complete list and booking options.";
    }
    
    if (lowerQuestion.includes('refund') || lowerQuestion.includes('cancel')) {
      return "Our refund policy:\n\n• Full refund if cancelled 24+ hours before showtime\n• 50% refund if cancelled 2-24 hours before\n• No refund within 2 hours of showtime\n\nRefunds are processed within 5-7 business days.";
    }
    
    if (lowerQuestion.includes('time') || lowerQuestion.includes('show')) {
      return "Movie showtimes are typically:\n\n• 10:00 AM (Morning)\n• 01:00 PM (Afternoon)\n• 04:00 PM (Evening)\n• 07:00 PM (Night)\n• 10:00 PM (Late night)\n\nFor specific movie timings, please check the individual movie page.";
    }
    
    return "I understand you're asking about: \"" + question + "\"\n\nI can help you with:\n• Finding movies and events\n• Booking tickets\n• Managing your bookings\n• Showtimes and venue information\n• Refund and cancellation policies\n\nCould you please be more specific about what you'd like to know?";
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CineTime Assistant</h1>
          <p className="text-gray-600">Get instant help with your bookings and queries</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Quick Questions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start text-xs"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Chat with Assistant
                </CardTitle>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto space-y-4 p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-cinetime-primary text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === 'bot' && (
                          <Ticket className="h-5 w-5 mt-0.5 text-cinetime-primary" />
                        )}
                        {message.type === 'user' && (
                          <User className="h-5 w-5 mt-0.5" />
                        )}
                        <div>
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.type === 'user' ? 'text-white/70' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Ticket className="h-5 w-5 text-cinetime-primary" />
                        <div>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>

              {/* Input Form */}
              <div className="p-4 border-t">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Type your question here..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-cinetime-primary hover:bg-cinetime-primary/90"
                  >
                    Send
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Ticket className="h-12 w-12 text-cinetime-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Booking Help</h3>
              <p className="text-sm text-gray-600">Get assistance with ticket booking, cancellations, and refunds</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Search className="h-12 w-12 text-cinetime-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Find Movies</h3>
              <p className="text-sm text-gray-600">Discover showtimes, venues, and book tickets for latest movies</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <User className="h-12 w-12 text-cinetime-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Account Support</h3>
              <p className="text-sm text-gray-600">Manage your account, view booking history, and update preferences</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
