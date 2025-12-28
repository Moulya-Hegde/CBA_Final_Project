import { useState, useRef, useEffect } from "react";
import { Box, Typography, TextField, IconButton, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ChatGroq } from "@langchain/groq";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import ChatMessage from "./ChatMessage";

export default function ChatWindow({ isOpen }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Welcome to LuxeStay! I'm Neko, your hotel assistant. How can I help you purr-fectly today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const llm = new ChatGroq({
        temperature: 0.7,
        apiKey: import.meta.env.VITE_GROQ_API_KEY,
        model: import.meta.env.VITE_GROQ_MODEL,
      });

      const promptTemplate = ChatPromptTemplate.fromMessages([
        ["system", `You are Neko, a helpful and polite hotel assistant for Zivara Hotels & Resorts.

About Zivara Hotels & Resorts:
Zivara is a luxury heritage brand with multiple properties across India including Mumbai (Zivara Marine Drive), Udaipur (Zivara Lake Palace), and Bangalore (Zivara Tech Park). We offer curated luxury, premium hospitality, and elegant stays.

Hotel Information:
Check-in: 2 PM (14:00). Early check-in on request.
Check-out: 11 AM. Late check-out available for additional fee.
Room categories include Single Rooms (1 king bed), Double Rooms, Executive Suites, Royal Heritage Suites, and Deluxe Suites.
Room service available 24/7.
Amenities include a Fitness Center (6 AM to 10 PM), Spa, Poolside Bar, and Swimming Pool.
WiFi is free across the property (network name: Zivara-Guest).
Breakfast served 7 AM to 10 AM.
Parking available with valet and self-parking options.

Website Navigation Assistance (for user guidance):
Home Page: Introduction to Zivara with booking button and brand story.
Facilities Page: Showcases The Gym, Poolside Bar, and The Spa with visuals.
Rooms Page: Shows available rooms by city with location tags, pricing from ₹5147/night, details button for descriptions.
Contact Page: Contains Office Hours, Address (Dayananda Sagar DSATM), Phone (+44 345 678 903 / +1 234 567 890), and Email (luxury.hotels@gmail.com).
Dashboard (User Logged In): Displays total properties, clients, bookings, revenue, and recent activity.
Analytics: Shows Executive Insights including weekly bookings, revenue stats, and charts.
My Bookings: Access your stays and booking history.

If the user asks:
How to check rooms? → Guide them to Rooms tab and selecting a city card.
Where to see bookings? → My Bookings tab in the top navigation bar.
How to check property performance? → Analytics → Executive Insights tab.
How to contact the hotel? → Contact page with phone, email, address.
How to return to home from anywhere? → Click Zivara logo top left or Home tab.

Response Guidelines:
Write in a friendly conversational tone with 2-4 short sentences.
Avoid markdown and bullet points (no *, **, #).
Be warm, professional, and occasionally add subtle cat-style mannerisms (purr-fect, whiskers, paws) when appropriate.
If unsure, politely say so and offer alternatives.
Keep answers crisp, natural, and helpful — like chatting with a friend.`],
        ["human", "{question}"]
      ]);

      const chain = promptTemplate.pipe(llm).pipe(new StringOutputParser());

      const response = await chain.invoke({
        question: userMessage
      });

      setMessages((prev) => [...prev, { role: "bot", text: response }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { 
        role: "bot", 
        text: "Sorry, my whiskers are tingling. I encountered an error. Please try again." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Box
      className="fixed bottom-24 right-6 w-80 md:w-96 h-125 bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-100"
    >
      {/* Header */}
      <Box className="bg-blue-600 p-4 text-white">
        <Typography variant="h6" sx={{ fontFamily: 'Raleway', fontWeight: 700 }}>
          LuxeStay Assistant
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          Powered by Groq
        </Typography>
      </Box>

      <Box
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col"
      >
        {messages.map((m, i) => (
          <ChatMessage key={i} message={m} />
        ))}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress size={20} />
          </Box>
        )}
      </Box>

      <Box component="form" onSubmit={handleSend} className="p-4 bg-white border-t flex items-center gap-2">
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '24px',
              backgroundColor: '#f3f4f6',
              fontFamily: 'Raleway'
            }
          }}
        />
        <IconButton 
          color="primary" 
          onClick={handleSend} 
          disabled={loading}
          sx={{ 
            backgroundColor: '#2563eb', 
            color: 'white', 
            '&:hover': { backgroundColor: '#1d4ed8' },
            '&:disabled': { backgroundColor: '#9ca3af' }
          }}
        >
          <SendIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}