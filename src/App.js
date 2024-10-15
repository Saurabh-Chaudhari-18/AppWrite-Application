import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import "./App.css";
import "./components/Navbar.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="nav-links">
          <Link to="/create">Create Event</Link>
          <Link to="/events">Event List</Link>
        </nav>

        <Routes>
          <Route path="/create" element={<EventForm />} />
          <Route path="/events" element={<EventList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
