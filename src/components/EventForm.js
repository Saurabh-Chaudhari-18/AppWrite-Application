import React, { useState } from "react";
import { databases } from "../appwrite";
import "./EventForm.css"; 

function EventForm() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await databases.createDocument(
        "670b6548003e12dd763a", 
        "670b6560003cb6d95f01", 
        "unique()", 
        {
          eventName,
          eventDate,
          location,
          description,
        }
      );
     alert("Event created Succesfully", response);

      
      setEventName("");
      setEventDate("");
      setLocation("");
      setDescription("");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label>Event Name</label>
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date & Time</label>
          <input
            type="datetime-local"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default EventForm;
