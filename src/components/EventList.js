import React, { useEffect, useState } from "react";
import { databases } from "../appwrite";
import "./EventList.css";

function EventList() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // For storing the event to be edited
  const [updatedEvent, setUpdatedEvent] = useState({
    eventName: "",
    eventDate: "",
    location: "",
    description: ""
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await databases.listDocuments(
          "670e16510026bf6aed48",
          "670e165b0001a5ae02e2"
        );
        setEvents(response.documents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Handle form input changes for update
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  // Handle Update Button Click (show form pre-filled)
  const handleEditClick = (event) => {
    setSelectedEvent(event.$id);
    setUpdatedEvent({
      eventName: event.eventName,
      eventDate: event.eventDate,
      location: event.location,
      description: event.description,
    });
  };

  // Update Event function
  const handleUpdateEvent = async () => {
    try {
      await databases.updateDocument(
        "670e16510026bf6aed48",
        "670e165b0001a5ae02e2",
        selectedEvent,
        updatedEvent
      );
      alert("Event updated successfully!");

      // Refresh the event list after update
      const response = await databases.listDocuments(
        "670e16510026bf6aed48",
        "670e165b0001a5ae02e2"
      );
      setEvents(response.documents);
      setSelectedEvent(null); // Hide the update form
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update the event.");
    }
  };

  // Handle Delete Event
  const handleDeleteClick = async (eventId) => {
    try {
      await databases.deleteDocument(
        "670e16510026bf6aed48",
        "670e165b0001a5ae02e2",
        eventId
      );
      alert("Event deleted successfully!");
      setEvents(events.filter((event) => event.$id !== eventId)); // Remove from UI
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete the event.");
    }
  };

  return (
    <div className="event-list-container">
      <h2>Event List</h2>
      <ul className="event-list">
        {events.map((event) => (
          <li key={event.$id} className="event-item">
            <h3>{event.eventName}</h3>
            <p>{new Date(event.eventDate).toLocaleString()}</p>
            <p>{event.location}</p>
            <p>{event.description}</p>
            <div className="event-actions">
            <button className="update-btn" onClick={() => handleEditClick(event)}>Update</button>
            <button className="delete-btn" onClick={() => handleDeleteClick(event.$id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Update Form */}
      {selectedEvent && (
        <div className="update-form">
          <h2>Edit Event</h2>
          <input
            type="text"
            name="eventName"
            value={updatedEvent.eventName}
            onChange={handleInputChange}
            placeholder="Event Name"
          />
          <input
            type="datetime-local"
            name="eventDate"
            value={updatedEvent.eventDate}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="location"
            value={updatedEvent.location}
            onChange={handleInputChange}
            placeholder="Location"
          />
          <textarea
            name="description"
            value={updatedEvent.description}
            onChange={handleInputChange}
            placeholder="Description"
          ></textarea>
          <button onClick={handleUpdateEvent}>Update Event</button>
        </div>
      )}
    </div>
  );
}

export default EventList;
