import { Fab } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

export default function ChatToggleButton({ isOpen, onClick }) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Fab 
        color="primary" 
        onClick={onClick} 
        sx={{ boxShadow: "0px 8px 24px rgba(0,0,0,0.2)" }}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </Fab>
    </div>
  );
}