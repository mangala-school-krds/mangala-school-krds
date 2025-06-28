// src/components/Events.js
import React from 'react';

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Annual Sports Day',
      date: '2024-04-15',
      time: '9:00 AM',
      location: 'School Playground',
      description: 'Inter-house sports competition with various athletic events'
    },
    {
      id: 2,
      title: 'Science Exhibition',
      date: '2024-04-20',
      time: '10:00 AM',
      location: 'Science Block',
      description: 'Students will showcase their innovative science projects'
    },
    {
      id: 3,
      title: 'Cultural Festival',
      date: '2024-05-01',
      time: '6:00 PM',
      location: 'School Auditorium',
      description: 'Traditional and modern performances by students'
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: 'Annual Day Celebration',
      date: '2024-02-14',
      description: 'Grand celebration with cultural performances and prize distribution'
    },
    {
      id: 5,
      title: 'Teacher\'s Day',
      date: '2023-09-05',
      description: 'Special program organized by students to honor teachers'
    },
    {
      id: 6,
      title: 'Independence Day',
      date: '2023-08-15',
      description: 'Flag hoisting ceremony and patriotic performances'
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>School Events</h1>
      </div>
      <div className="page-content">
        <section className="upcoming-events">
          <h2>Upcoming Events</h2>
          <div className="events-list">
            {upcomingEvents.map(event => (
              <div key={event.id} className="event-card upcoming">
                <div className="event-date">
                  <span className="day">{new Date(event.date).getDate()}</span>
                  <span className="month">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                </div>
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p className="event-meta">
                    <span className="time">🕐 {event.time}</span>
                    <span className="location">📍 {event.location}</span>
                  </p>
                  <p className="event-description">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="past-events">
          <h2>Past Events</h2>
          <div className="events-list">
            {pastEvents.map(event => (
              <div key={event.id} className="event-card past">
                <div className="event-date">
                  <span className="day">{new Date(event.date).getDate()}</span>
                  <span className="month">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                </div>
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Events;