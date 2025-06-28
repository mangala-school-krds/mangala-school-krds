// src/components/EventsNews.js
import React, { useState, useEffect } from 'react';

const EventsNews = () => {
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('news'); // Start with news tab

  useEffect(() => {
    fetchEventsAndNews();
  }, []);

  const fetchEventsAndNews = async () => {
    try {
      const [eventsResponse, newsResponse] = await Promise.all([
        fetch('http://localhost:5000/api/events'),
        fetch('http://localhost:5000/api/news')
      ]);
      
      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);
      }
      
      if (newsResponse.ok) {
        const newsData = await newsResponse.json();
        setNews(newsData);
      }
    } catch (error) {
      console.error('Error fetching events and news:', error);
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[priority] || colors.medium}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  const openModal = (item, type) => setSelectedItem({ ...item, type });
  const closeModal = () => setSelectedItem(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const NewsCard = ({ newsItem }) => {
    const publishDate = formatDate(newsItem.publishDate);
    
    return (
      <article
        onClick={() => openModal(newsItem, 'news')}
        className={`cursor-pointer bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-200 border-l-4 ${getPriorityColor(newsItem.priority)}`}
      >
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold flex-1">{newsItem.title}</h3>
            {getPriorityBadge(newsItem.priority)}
          </div>
          
          {newsItem.image?.imageId && (
            <img
              src={`http://localhost:5000/api/image/${newsItem.image.imageId}`}
              alt={newsItem.title}
              className="w-full h-48 object-cover rounded mb-3"
              loading="lazy"
            />
          )}
          
          <div className="text-sm text-gray-600 mb-2">
            <span>📅 Published: {publishDate.fullDate}</span>
            {newsItem.expiryDate && (
              <span className="ml-4">⏰ Expires: {formatDate(newsItem.expiryDate).fullDate}</span>
            )}
          </div>
          
          <p className="text-gray-700 mb-3">
            {newsItem.description.length > 120
              ? `${newsItem.description.substring(0, 120)}...`
              : newsItem.description}
          </p>
          
          <button className="text-blue-600 hover:underline text-sm font-medium">
            Read More
          </button>
        </div>
      </article>
    );
  };

  const EventCard = ({ event, type }) => {
    const dateInfo = formatDate(event.date);
    
    return (
      <article
        onClick={() => openModal(event, 'event')}
        className={`cursor-pointer bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-200 ${
          type === 'upcoming' ? 'border-l-4 border-blue-500' : 'border-l-4 border-gray-400'
        }`}
      >
        <div className="flex">
          <div className={`p-4 text-center min-w-[80px] ${
            type === 'upcoming' ? 'text-blue-700' : 'text-gray-600'
          }`}>
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
            <p className="text-gray-700 mb-3">
              {event.description.length > 100
                ? `${event.description.substring(0, 100)}...`
                : event.description}
            </p>
            <button className="text-blue-600 hover:underline text-sm font-medium">
              View Details
            </button>
          </div>
        </div>
      </article>
    );
  };

  const Modal = ({ item, onClose }) => {
    if (!item) return null;

    const isNews = item.type === 'news';
    const dateInfo = isNews 
      ? formatDate(item.publishDate)
      : formatDate(item.date);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="p-4">
            {item.image?.imageId && (
              <img
                src={`http://localhost:5000/api/image/${item.image.imageId}`}
                alt={item.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
            )}
            
            <div className="mb-4">
              {isNews ? (
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>📅 Published: {dateInfo.fullDate}</span>
                  {item.expiryDate && (
                    <span>⏰ Expires: {formatDate(item.expiryDate).fullDate}</span>
                  )}
                  <div className="ml-auto">{getPriorityBadge(item.priority)}</div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>📅 Date: {dateInfo.fullDate}</span>
                  {item.time && <span>🕐 Time: {item.time}</span>}
                  {item.location && <span>📍 Location: {item.location}</span>}
                </div>
              )}
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{item.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Events & News</h1>
      
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('news')}
            className={`px-6 py-2 rounded-md transition duration-200 ${
              activeTab === 'news'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            📢 News & Announcements
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-2 rounded-md transition duration-200 ${
              activeTab === 'events'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            🎉 Events
          </button>
        </div>
      </div>

      {/* News Section */}
      {activeTab === 'news' && (
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center">Latest News & Announcements</h2>
          {news.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No news available at the moment.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {news.map((newsItem) => (
                <NewsCard key={newsItem._id} newsItem={newsItem} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Events Section */}
      {activeTab === 'events' && (
        <div>
          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-blue-700">🔮 Upcoming Events</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {upcomingEvents.map((event) => (
                  <EventCard key={event._id} event={event} type="upcoming" />
                ))}
              </div>
            </div>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-700">📚 Past Events</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {pastEvents.map((event) => (
                  <EventCard key={event._id} event={event} type="past" />
                ))}
              </div>
            </div>
          )}

          {events.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No events available at the moment.</p>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {selectedItem && (
        <Modal item={selectedItem} onClose={closeModal} />
      )}
    </div>
  );
};

export default EventsNews;