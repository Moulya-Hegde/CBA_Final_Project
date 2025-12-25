import { useState, useRef, useEffect } from "react";
import { Box, Typography, TextField, IconButton, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { GoogleGenAI } from "@google/genai";
import ChatMessage from "./ChatMessage";

// Initialize the AI client
// Note: In a production app, use import.meta.env.VITE_GEMINI_KEY
const ai = new GoogleGenAI({apiKey:import.meta.env.VITE_GEMINI_API_KEY});

export default function ChatWindow({ isOpen }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Welcome to LuxeStay! I'm Neko, your hotel assistant. How can I help you purr-fectly today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to latest message
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
      // Using the Gemini 2.5 Flash model with the config format from your docs
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userMessage,
        config: {
          systemInstruction: "You are a helpful and polite hotel assistant for LuxeStay. Your name is Neko. You assist guests with check-in info (2 PM), check-out (11 AM), and room types (Single, Double, Suite).",
          temperature: 1.0, // Default recommended for Gemini 3 models
        },
      });

      setMessages((prev) => [...prev, { role: "bot", text: response.text }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages((prev) => [...prev, { role: "bot", text: "Sorry, my whiskers are tingling. I encountered an error. Please try again." }]);
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
        <Typography variant="caption" sx={{ opacity: 0.8 }}>Powered by Gemini 2.5 Flash</Typography>
      </Box>

      {/* Messages Area */}
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

      {/* Input Area */}
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
          sx={{ backgroundColor: '#2563eb', color: 'white', '&:hover': { backgroundColor: '#1d4ed8' } }}
        >
          <SendIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}