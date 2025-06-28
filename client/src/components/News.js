// // src/components/News.js
// import React, { useState, useEffect } from 'react';
// import './News.css';

// const News = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/events');
//       if (response.ok) {
//         const data = await response.json();
//         setEvents(data);
//       }
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return {
//       day: date.getDate(),
//       month: date.toLocaleDateString('en-US', { month: 'short' }),
//       year: date.getFullYear(),
//       fullDate: date.toLocaleDateString('en-US', { 
//         year: 'numeric', 
//         month: 'long', 
//         day: 'numeric' 
//       })
//     };
//   };

//   const isUpcoming = (dateString) => {
//     return new Date(dateString) > new Date();
//   };

//   const upcomingEvents = events.filter(event => isUpcoming(event.date));
//   const pastEvents = events.filter(event => !isUpcoming(event.date));

//   const openModal = (event) => {
//     setSelectedEvent(event);
//   };

//   const closeModal = () => {
//     setSelectedEvent(null);
//   };

//   if (loading) {
//     return (
//       <div className="news-container">
//         <div className="loading">Loading news...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="news-container">
//       <div className="news-header">
//         <h1>School News & Events</h1>
//         <p>Stay updated with the latest happenings at our school</p>
//       </div>

//       {upcomingEvents.length > 0 && (
//         <section className="news-section">
//           <h2 className="section-title">Upcoming Events</h2>
//           <div className="news-grid">
//             {upcomingEvents.map(event => {
//               const dateInfo = formatDate(event.date);
//               return (
//                 <article key={event._id} className="news-card upcoming" onClick={() => openModal(event)}>
//                   <div className="news-date">
//                     <span className="day">{dateInfo.day}</span>
//                     <span className="month">{dateInfo.month}</span>
//                     <span className="year">{dateInfo.year}</span>
//                   </div>
                  
//                   {event.image && event.image.imageId && (
//                     <div className="news-image">
//                       <img 
//                         src={`http://localhost:5000/api/image/${event.image.imageId}`} 
//                         alt={event.title}
//                         loading="lazy"
//                       />
//                     </div>
//                   )}
                  
//                   <div className="news-content">
//                     <h3 className="news-title">{event.title}</h3>
                    
//                     <div className="news-meta">
//                       {event.time && (
//                         <span className="meta-item">
//                           <i className="icon">🕐</i>
//                           {event.time}
//                         </span>
//                       )}
//                       {event.location && (
//                         <span className="meta-item">
//                           <i className="icon">📍</i>
//                           {event.location}
//                         </span>
//                       )}
//                     </div>
                    
//                     <p className="news-description">
//                       {event.description.length > 120 
//                         ? `${event.description.substring(0, 120)}...` 
//                         : event.description
//                       }
//                     </p>
                    
//                     <button className="read-more">Read More</button>
//                   </div>
//                 </article>
//               );
//             })}
//           </div>
//         </section>
//       )}

//       <section className="news-section">
//         <h2 className="section-title">Recent News</h2>
//         <div className="news-grid">
//           {pastEvents.map(event => {
//             const dateInfo = formatDate(event.date);
//             return (
//               <article key={event._id} className="news-card past" onClick={() => openModal(event)}>
//                 <div className="news-date">
//                   <span className="day">{dateInfo.day}</span>
//                   <span className="month">{dateInfo.month}</span>
//                   <span className="year">{dateInfo.year}</span>
//                 </div>
                
//                 {event.image && event.image.imageId && (
//                   <div className="news-image">
//                     <img 
//                       src={`http://localhost:5000/api/image/${event.image.imageId}`} 
//                       alt={event.title}
//                       loading="lazy"
//                     />
//                   </div>
//                 )}
                
//                 <div className="news-content">
//                   <h3 className="news-title">{event.title}</h3>
                  
//                   <div className="news-meta">
//                     {event.time && (
//                       <span className="meta-item">
//                         <i className="icon">🕐</i>
//                         {event.time}
//                       </span>
//                     )}
//                     {event.location && (
//                       <span className="meta-item">
//                         <i className="icon">📍</i>
//                         {event.location}
//                       </span>
//                     )}
//                   </div>
                  
//                   <p className="news-description">
//                     {event.description.length > 120 
//                       ? `${event.description.substring(0, 120)}...` 
//                       : event.description
//                     }
//                   </p>
                  
//                   <button className="read-more">Read More</button>
//                 </div>
//               </article>
//             );
//           })}
//         </div>
//       </section>

//       {events.length === 0 && (
//         <div className="no-news">
//           <h3>No news available at the moment</h3>
//           <p>Check back later for updates!</p>
//         </div>
//       )}

//       {/* Modal for detailed view */}
//       {selectedEvent && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <button className="modal-close" onClick={closeModal}>×</button>
            
//             <div className="modal-header">
//               <h2>{selectedEvent.title}</h2>
//               <div className="modal-date">
//                 {formatDate(selectedEvent.date).fullDate}
//                 {selectedEvent.time && ` at ${selectedEvent.time}`}
//               </div>
//               {selectedEvent.location && (
//                 <div className="modal-location">
//                   <i className="icon">📍</i>
//                   {selectedEvent.location}
//                 </div>
//               )}
//             </div>
            
//             {selectedEvent.image && selectedEvent.image.imageId && (
//               <div className="modal-image">
//                 <img 
//                   src={`http://localhost:5000/api/image/${selectedEvent.image.imageId}`} 
//                   alt={selectedEvent.title}
//                 />
//               </div>
//             )}
            
//             <div className="modal-body">
//               <p>{selectedEvent.description}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default News;

// src/components/News.js
import React, { useState, useEffect } from 'react';

const News = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      year: date.getFullYear(),
      fullDate: date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
  };

  const isUpcoming = (dateString) => new Date(dateString) > new Date();
  const upcomingEvents = events.filter(event => isUpcoming(event.date));
  const pastEvents = events.filter(event => !isUpcoming(event.date));

  const openModal = (event) => setSelectedEvent(event);
  const closeModal = () => setSelectedEvent(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-600">Loading news...</p>
      </div>
    );
  }

  const EventCard = ({ event, dateInfo, type }) => (
    <article
      onClick={() => openModal(event)}
      className={`cursor-pointer bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-200 ${
        type === 'upcoming' ? 'border-l-4 border-blue-500' : 'border-l-4 border-gray-400'
      }`}
    >
      <div className="flex">
        <div className="p-4 text-center text-blue-700">
          <div className="text-2xl font-bold">{dateInfo.day}</div>
          <div className="uppercase text-sm">{dateInfo.month}</div>
          <div className="text-xs text-gray-500">{dateInfo.year}</div>
        </div>
        <div className="flex-1 p-4">
          {event.image?.imageId && (
            <img
              src={`http://localhost:5000/api/image/${event.image.imageId}`}
              alt={event.title}
              className="w-full h-48 object-cover rounded mb-2"
              loading="lazy"
            />
          )}
          <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
            {event.time && (
              <span className="flex items-center gap-1">🕐 {event.time}</span>
            )}
            {event.location && (
              <span className="flex items-center gap-1">📍 {event.location}</span>
            )}
          </div>
          <p className="text-gray-700">
            {event.description.length > 120
              ? `${event.description.substring(0, 120)}...`
              : event.description}
          </p>
          <button className="mt-3 text-blue-600 hover:underline text-sm">Read More</button>
        </div>
      </div>
    </article>
  );

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">School News & Events</h1>
        <p className="text-gray-600">Stay updated with the latest happenings at our school</p>
      </div>

      {upcomingEvents.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <EventCard
                key={event._id}
                event={event}
                dateInfo={formatDate(event.date)}
                type="upcoming"
              />
            ))}
          </div>
        </section>
      )}

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Recent News</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastEvents.map(event => (
            <EventCard
              key={event._id}
              event={event}
              dateInfo={formatDate(event.date)}
              type="past"
            />
          ))}
        </div>
      </section>

      {events.length === 0 && (
        <div className="text-center mt-20">
          <h3 className="text-xl font-medium">No news available at the moment</h3>
          <p className="text-gray-500">Check back later for updates!</p>
        </div>
      )}

      {/* Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-3 text-2xl text-gray-600 hover:text-red-500"
              onClick={closeModal}
            >
              ×
            </button>

            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-1">{selectedEvent.title}</h2>
              <div className="text-gray-600 text-sm mb-1">
                {formatDate(selectedEvent.date).fullDate}
                {selectedEvent.time && ` at ${selectedEvent.time}`}
              </div>
              {selectedEvent.location && (
                <div className="text-gray-600 text-sm flex items-center gap-1">
                  📍 {selectedEvent.location}
                </div>
              )}
            </div>

            {selectedEvent.image?.imageId && (
              <img
                src={`http://localhost:5000/api/image/${selectedEvent.image.imageId}`}
                alt={selectedEvent.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
            )}

            <div className="text-gray-800 whitespace-pre-line">
              {selectedEvent.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
