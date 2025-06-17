
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: 'Hi! I\'m your movie assistant. How can I help you today?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const presetQueries = [
    "What are today's top Telugu movies?",
    "Show me comedy films",
    "Which movies have evening shows?",
    "Best rated movies this week",
    "Action movies in IMAX"
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage('');
    
    setMessages(prev => [...prev, {
      type: 'user',
      content: userMessage
    }]);

    // Simulate AI response (replace with actual API call later)
    setTimeout(() => {
      let response = "I understand you're looking for information about movies. ";
      
      if (userMessage.toLowerCase().includes('telugu')) {
        response = "Here are some popular Telugu movies currently showing: Pushpa 2, RRR, Baahubali 3, and KGF Chapter 3. Would you like showtimes for any of these?";
      } else if (userMessage.toLowerCase().includes('comedy')) {
        response = "For comedy movies, I recommend Geetha Govindam 2 and Ala Vaikunthapurramuloo 2. Both have great ratings and multiple showtimes available.";
      } else if (userMessage.toLowerCase().includes('evening') || userMessage.toLowerCase().includes('show')) {
        response = "Evening shows are available from 5:00 PM to 9:30 PM across all theaters. Popular slots are 7:15 PM and 9:30 PM.";
      } else if (userMessage.toLowerCase().includes('rating') || userMessage.toLowerCase().includes('best')) {
        response = "Top rated movies this week: RRR (8.9), Baahubali 3 (8.8), Pushpa 2 (8.7), and Rangasthalam 2 (8.6).";
      } else if (userMessage.toLowerCase().includes('action') || userMessage.toLowerCase().includes('imax')) {
        response = "Action movies in IMAX: RRR, Baahubali 3, KGF Chapter 3, and Pushpa 2 are available at Prasads IMAX with premium sound and visuals.";
      } else {
        response += "You can ask me about movie recommendations, showtimes, theaters, or ratings. Try one of the quick suggestions below!";
      }

      setMessages(prev => [...prev, {
        type: 'assistant',
        content: response
      }]);
    }, 1000);
  };

  const handlePresetQuery = (query) => {
    setInputMessage(query);
    handleSendMessage();
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-cinetime-primary hover:bg-cinetime-primary/90 text-white rounded-full p-4 shadow-lg flex items-center space-x-2"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="hidden sm:inline">Movie Assistant</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 sm:w-96 transition-all duration-300 ${isMinimized ? 'h-16' : 'h-96'} shadow-2xl`}>
        <CardHeader className="p-4 bg-cinetime-primary text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Movie Assistant</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 p-1"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-4 flex flex-col h-80">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.type === 'user'
                        ? 'bg-cinetime-primary text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Preset Queries */}
            {messages.length === 1 && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Quick suggestions:</p>
                <div className="flex flex-wrap gap-1">
                  {presetQueries.slice(0, 3).map((query, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handlePresetQuery(query)}
                      className="text-xs p-1 h-auto"
                    >
                      {query}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about movies, showtimes..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-cinetime-primary hover:bg-cinetime-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default AIAssistant;
