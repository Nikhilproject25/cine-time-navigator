
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Minimize2, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm your movie assistant. I can help you find movies, check showtimes, or answer any questions about CineTime. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const presetQueries = [
    "What are today's top Telugu movies?",
    "Show me comedy films",
    "What's playing at PVR Nexus?",
    "Movies with ratings above 8.0",
    "Latest action movies in Hindi"
  ];

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('telugu')) {
      return "Here are today's top Telugu movies:\n\n1. Salaar (8.7 ⭐) - Action, Drama\n2. Leo (8.2 ⭐) - Action, Thriller\n3. Bhola Shankar (6.8 ⭐) - Action, Comedy\n\nWould you like to book tickets for any of these?";
    } else if (message.includes('comedy')) {
      return "Great choice! Here are the comedy movies currently showing:\n\n1. Dunki (8.1 ⭐) - Comedy, Drama starring Shah Rukh Khan\n2. Bhola Shankar (6.8 ⭐) - Action, Comedy\n\nBoth are available at multiple theaters. Which one interests you?";
    } else if (message.includes('pvr nexus')) {
      return "PVR Nexus showtimes today:\n\n🎬 Jawan: 10:15 AM, 2:30 PM, 7:15 PM\n🎬 Tiger 3: 12:45 PM, 5:00 PM, 9:30 PM\n🎬 Pathaan: 11:30 AM, 4:15 PM, 8:45 PM\n\nTicket prices start from ₹180. Shall I help you book?";
    } else if (message.includes('rating') && message.includes('8')) {
      return "Movies with 8.0+ ratings:\n\n⭐ 12th Fail (9.1) - Biography, Drama\n⭐ Salaar (8.7) - Action, Drama\n⭐ Jawan (8.5) - Action, Thriller\n⭐ Animal (8.4) - Action, Crime\n⭐ Pathaan (8.3) - Action, Thriller\n⭐ Leo (8.2) - Action, Thriller\n\nAll are must-watch films!";
    } else if (message.includes('action') && message.includes('hindi')) {
      return "Latest Hindi action movies:\n\n🔥 Jawan (8.5 ⭐) - Shah Rukh Khan starrer\n🔥 Tiger 3 (7.8 ⭐) - Salman Khan action thriller\n🔥 Pathaan (8.3 ⭐) - High-octane spy thriller\n🔥 Animal (8.4 ⭐) - Intense crime drama\n\nAll are available for booking. Which one catches your eye?";
    } else if (message.includes('book') || message.includes('ticket')) {
      return "I'd love to help you book tickets! Please let me know:\n\n1. Which movie you'd like to watch\n2. Preferred date and time\n3. Number of seats needed\n\nOr you can browse movies on our main page and click 'Book Tickets' on any movie card.";
    } else if (message.includes('price') || message.includes('cost')) {
      return "Ticket prices vary by theater and seat type:\n\n💺 Regular seats: ₹180 - ₹250\n🏆 Premium seats: ₹280 - ₹350\n🎥 IMAX: ₹400 - ₹500\n\nPrices include convenience fee and taxes. Weekend shows may have slightly higher rates.";
    } else {
      return "I can help you with:\n\n🎬 Finding movies by genre, language, or rating\n📅 Checking showtimes and availability\n🎫 Booking assistance and theater information\n💰 Ticket pricing and offers\n\nJust ask me anything about movies or bookings!";
    }
  };

  const handlePresetQuery = (query: string) => {
    handleSendMessage(query);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-cinetime-primary hover:bg-cinetime-primary/90 shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 w-96 shadow-xl z-50 transition-all duration-300 ${
      isMinimized ? 'h-16' : 'h-[600px]'
    }`}>
      <CardHeader className="p-4 bg-cinetime-primary text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Bot className="h-5 w-5 mr-2" />
            Movie Assistant
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[calc(600px-80px)]">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-cinetime-primary text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {message.type === 'bot' ? (
                        <Bot className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                      <span className="text-xs opacity-70">
                        {message.type === 'bot' ? 'Assistant' : 'You'}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4" />
                      <span className="text-xs opacity-70">Assistant is typing...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Preset Queries */}
          {messages.length === 1 && (
            <div className="p-4 border-t bg-gray-50">
              <p className="text-sm text-gray-600 mb-3">Quick questions:</p>
              <div className="space-y-2">
                {presetQueries.slice(0, 3).map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start text-xs h-auto py-2"
                    onClick={() => handlePresetQuery(query)}
                  >
                    {query}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask me about movies..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage(inputMessage)}
                size="sm"
                className="bg-cinetime-primary hover:bg-cinetime-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default AIAssistant;
