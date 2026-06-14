import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import MyRegistrations from "./pages/MyRegistrations";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout> <Events /> </MainLayout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events/:id" element={<MainLayout> <EventDetails /> </MainLayout>} />
        <Route path="/my-registrations" element={<MainLayout> <MyRegistrations /> </MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;