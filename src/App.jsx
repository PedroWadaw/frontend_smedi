import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import './index.css'
import { toast, Toaster } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;