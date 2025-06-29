// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newEvent, setNewEvent] = useState({ 
    title: '', 
    description: '', 
    date: '', 
    time: '', 
    location: '',
    image: null 
  });
  const [newNews, setNewNews] = useState({ 
    title: '', 
    description: '', 
    publishDate: '', 
    expiryDate: '', 
    priority: 'medium',
    image: null 
  });
  const [newsImageFile, setNewsImageFile] = useState(null);
  const [editingNews, setEditingNews] = useState(null);
  const [eventImageFile, setEventImageFile] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newGalleryItem, setNewGalleryItem] = useState({ caption: '' });
  const [newHomeGalleryItem, setNewHomeGalleryItem] = useState({ caption: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }

    // Set base URL and auth header
    axios.defaults.baseURL = '';
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchContent();
  }, [navigate]);

  const fetchContent = async () => {
    try {
      const response = await axios.get('/api/content');
      setContent(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching content:', error);
      if (error.code === 'ERR_NETWORK') {
        setError('Cannot connect to server. Please make sure the backend is running on port 5000.');
      } else if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin');
      } else {
        setError('Failed to load content');
      }
      setLoading(false);
    }
  };

  const handleContentUpdate = async (field, value) => {
    setSaving(true);
    try {
      const updatedContent = { ...content, [field]: value };
      await axios.put('/api/content', updatedContent);
      setContent(updatedContent);
    } catch (error) {
      console.error('Error updating content:', error);
      alert('Failed to update content');
    } finally {
      setSaving(false);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploadResponse = await uploadImage(file);
      const response = await axios.post('/api/logos', uploadResponse);
      setContent({ ...content, logos: response.data });
      e.target.value = ''; // Reset file input
    } catch (error) {
      console.error('Error adding logo:', error);
      alert('Failed to upload logo');
    }
  };

  const deleteLogo = async (logoId) => {
    if (!window.confirm('Are you sure you want to delete this logo?')) return;

    try {
      const response = await axios.delete(`/api/logos/${logoId}`);
      setContent({ ...content, logos: response.data });
    } catch (error) {
      console.error('Error deleting logo:', error);
      alert('Failed to delete logo');
    }
  };

  const handlePersonImageUpload = async (e, personType) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploadResponse = await uploadImage(file);
      const response = await axios.put(`/api/person-image/${personType}`, uploadResponse);
      setContent(response.data);
      e.target.value = ''; // Reset file input
    } catch (error) {
      console.error('Error updating person image:', error);
      alert('Failed to upload image');
    }
  };

  const deletePersonImage = async (personType) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await axios.delete(`/api/person-image/${personType}`);
      setContent(response.data);
    } catch (error) {
      console.error('Error deleting person image:', error);
      alert('Failed to delete image');
    }
  };

  const addEvent = async () => {
    if (!newEvent.title || !newEvent.description || !newEvent.date) {
      alert('Please fill all required event fields (title, description, date)');
      return;
    }

    try {
      let eventData = { ...newEvent };
      
      // Upload image if provided
      if (eventImageFile) {
        const uploadResponse = await uploadImage(eventImageFile);
        eventData.image = uploadResponse;
      }

      const response = await axios.post('/api/events', eventData);
      setContent({ ...content, events: response.data });
      setNewEvent({ title: '', description: '', date: '', time: '', location: '', image: null });
      setEventImageFile(null);
      // Reset file input
      const fileInput = document.getElementById('eventImageUpload');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Failed to add event');
    }
  };

  const updateEvent = async () => {
    if (!editingEvent.title || !editingEvent.description || !editingEvent.date) {
      alert('Please fill all required event fields (title, description, date)');
      return;
    }

    try {
      let eventData = { ...editingEvent };
      
      // Upload new image if provided
      if (eventImageFile) {
        const uploadResponse = await uploadImage(eventImageFile);
        eventData.image = uploadResponse;
      }

      const response = await axios.put(`/api/events/${editingEvent._id}`, eventData);
      setContent({ ...content, events: response.data });
      setEditingEvent(null);
      setEventImageFile(null);
      // Reset file input
      const fileInput = document.getElementById('editEventImageUpload');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event');
    }
  };

  const deleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      const response = await axios.delete(`/api/events/${eventId}`);
      setContent({ ...content, events: response.data });
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event');
    }
  };

  const deleteEventImage = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event image?')) return;

    try {
      const response = await axios.delete(`/api/events/${eventId}/image`);
      setContent({ ...content, events: response.data });
    } catch (error) {
      console.error('Error deleting event image:', error);
      alert('Failed to delete event image');
    }
  };

  const addNews = async () => {
    if (!newNews.title || !newNews.description) {
      alert('Please fill all required news fields (title, description)');
      return;
    }

    try {
      let newsData = { ...newNews };
      
      // Upload image if provided
      if (newsImageFile) {
        const uploadResponse = await uploadImage(newsImageFile);
        newsData.image = uploadResponse;
      }

      const response = await axios.post('/api/news', newsData);
      setContent({ ...content, news: response.data });
      setNewNews({ title: '', description: '', publishDate: '', expiryDate: '', priority: 'medium', image: null });
      setNewsImageFile(null);
      // Reset file input
      const fileInput = document.getElementById('newsImageUpload');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Error adding news:', error);
      alert('Failed to add news');
    }
  };

  const updateNews = async () => {
    if (!editingNews.title || !editingNews.description) {
      alert('Please fill all required news fields (title, description)');
      return;
    }

    try {
      let newsData = { ...editingNews };
      
      // Upload new image if provided
      if (newsImageFile) {
        const uploadResponse = await uploadImage(newsImageFile);
        newsData.image = uploadResponse;
      }

      const response = await axios.put(`/api/news/${editingNews._id}`, newsData);
      setContent({ ...content, news: response.data });
      setEditingNews(null);
      setNewsImageFile(null);
      // Reset file input
      const fileInput = document.getElementById('editNewsImageUpload');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Error updating news:', error);
      alert('Failed to update news');
    }
  };

  const deleteNews = async (newsId) => {
    if (!window.confirm('Are you sure you want to delete this news item?')) return;

    try {
      const response = await axios.delete(`/api/news/${newsId}`);
      setContent({ ...content, news: response.data });
    } catch (error) {
      console.error('Error deleting news:', error);
      alert('Failed to delete news');
    }
  };

  const deleteNewsImage = async (newsId) => {
    if (!window.confirm('Are you sure you want to delete this news image?')) return;

    try {
      const response = await axios.delete(`/api/news/${newsId}/image`);
      setContent({ ...content, news: response.data });
    } catch (error) {
      console.error('Error deleting news image:', error);
      alert('Failed to delete news image');
    }
  };

  const handleGalleryUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!newGalleryItem.caption.trim()) {
      alert('Please provide a caption for the image');
      return;
    }

    try {
      const uploadResponse = await uploadImage(file);
      const galleryData = {
        ...uploadResponse,
        caption: newGalleryItem.caption
      };
      
      const response = await axios.post('/api/gallery', galleryData);
      setContent({ ...content, gallery: response.data });
      setNewGalleryItem({ caption: '' });
      e.target.value = ''; // Reset file input
    } catch (error) {
      console.error('Error adding gallery item:', error);
      alert('Failed to add gallery item');
    }
  };

  const deleteGalleryItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;

    try {
      const response = await axios.delete(`/api/gallery/${itemId}`);
      setContent({ ...content, gallery: response.data });
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      alert('Failed to delete gallery item');
    }
  };

  const handleHomeGalleryUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!newHomeGalleryItem.caption.trim()) {
      alert('Please provide a caption for the home gallery image');
      return;
    }

    try {
      const uploadResponse = await uploadImage(file);
      const homeGalleryData = {
        ...uploadResponse,
        caption: newHomeGalleryItem.caption
      };
      
      const response = await axios.post('/api/homegallery', homeGalleryData);
      setContent({ ...content, homegallery: response.data });
      setNewHomeGalleryItem({ caption: '' });
      e.target.value = ''; // Reset file input
    } catch (error) {
      console.error('Error adding home gallery item:', error);
      alert('Failed to add home gallery item');
    }
  };

  const deleteHomeGalleryItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this home gallery item?')) return;

    try {
      const response = await axios.delete(`/api/homegallery/${itemId}`);
      setContent({ ...content, homegallery: response.data });
    } catch (error) {
      console.error('Error deleting home gallery item:', error);
      alert('Failed to delete home gallery item');
    }
  };

  const getImageUrl = (imageData) => {
    if (!imageData || !imageData.imageId) return null;
    return `/api/image/${imageData.imageId}`;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">No content available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button 
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* School Logos Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">School Logos</h2>
          <div className="mb-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              id="logoUpload"
              className="hidden"
            />
            <label 
              htmlFor="logoUpload" 
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Add New Logo
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {content.logos && content.logos.length > 0 ? (
              content.logos.map((logo, index) => (
                <div key={logo._id || index} className="bg-gray-50 rounded-lg p-4">
                  <img 
                    src={getImageUrl(logo)} 
                    alt={logo.originalName}
                    className="w-full h-32 object-contain rounded-md mb-3"
                  />
                  <div className="space-y-2">
                    <span className="text-sm text-gray-600 block truncate">{logo.originalName}</span>
                    <button 
                      onClick={() => deleteLogo(logo._id)}
                      className="w-full bg-red-600 text-white py-1 px-2 rounded-md text-sm hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 col-span-full">No logos uploaded</p>
            )}
          </div>
        </section>

        {/* Leadership Messages Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Leadership Messages</h2>
          <div className="space-y-8">
            {[
              { key: 'president', label: 'President' },
              { key: 'secretary', label: 'Secretary' },
              { key: 'correspondent', label: 'Correspondent' },
              { key: 'headmistress', label: 'Headmistress' }
            ].map(({ key, label }) => (
              <div key={key} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{label}</h3>
                
                {/* Image Upload Section */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label} Image:
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePersonImageUpload(e, key)}
                      id={`${key}Image`}
                      className="hidden"
                    />
                    <label 
                      htmlFor={`${key}Image`}
                      className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 transition-colors cursor-pointer"
                    >
                      Upload Image
                    </label>
                    {content[`${key}Image`] && (
                      <button 
                        onClick={() => deletePersonImage(key)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors"
                      >
                        Delete Image
                      </button>
                    )}
                  </div>
                  {content[`${key}Image`] && (
                    <div className="mt-3">
                      <img
                        src={getImageUrl(content[`${key}Image`])}
                        alt={label}
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label} Message:
                  </label>
                  <textarea
                    value={content[`${key}Message`] || ''}
                    onChange={(e) => handleContentUpdate(`${key}Message`, e.target.value)}
                    rows="4"
                    placeholder={`Enter ${label.toLowerCase()} message...`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Events Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Events Management</h2>
          
          {/* Add Event Form */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Event</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Event Title *"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                placeholder="Event Time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <textarea
              placeholder="Event Description *"
              value={newEvent.description}
              onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <div className="flex flex-wrap gap-4 items-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setEventImageFile(e.target.files[0])}
                id="eventImageUpload"
                className="hidden"
              />
              <label 
                htmlFor="eventImageUpload"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors cursor-pointer"
              >
                Choose Event Image
              </label>
              {eventImageFile && (
                <span className="text-sm text-gray-600">{eventImageFile.name}</span>
              )}
              <button 
                onClick={addEvent}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Event
              </button>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-6">
            {content.events && content.events.length > 0 ? (
              content.events.map((event, index) => (
                <div key={event._id || index} className="border border-gray-200 rounded-lg p-6">
                  {editingEvent && editingEvent._id === event._id ? (
                    // Edit Form
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={editingEvent.title}
                          onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="date"
                          value={editingEvent.date ? editingEvent.date.split('T')[0] : ''}
                          onChange={(e) => setEditingEvent({...editingEvent, date: e.target.value})}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="time"
                          value={editingEvent.time || ''}
                          onChange={(e) => setEditingEvent({...editingEvent, time: e.target.value})}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Location"
                          value={editingEvent.location || ''}
                          onChange={(e) => setEditingEvent({...editingEvent, location: e.target.value})}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <textarea
                        value={editingEvent.description}
                        onChange={(e) => setEditingEvent({...editingEvent, description: e.target.value})}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex flex-wrap gap-4 items-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setEventImageFile(e.target.files[0])}
                          id="editEventImageUpload"
                          className="hidden"
                        />
                        <label 
                          htmlFor="editEventImageUpload"
                          className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors cursor-pointer text-sm"
                        >
                          Change Image
                        </label>
                        {eventImageFile && (
                          <span className="text-sm text-gray-600">{eventImageFile.name}</span>
                        )}
                        <button 
                          onClick={updateEvent}
                          className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors"
                        >
                          Save Changes
                        </button>
                        <button 
                          onClick={() => {
                            setEditingEvent(null);
                            setEventImageFile(null);
                          }}
                          className="bg-gray-600 text-white px-4 py-1 rounded-md text-sm hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Display Event
                    <div className="flex flex-col lg:flex-row gap-6">
                      {event.image && event.image.imageId && (
                        <div className="lg:w-1/3">
                          <img 
                            src={getImageUrl(event.image)} 
                            alt={event.title}
                            className="w-full h-48 object-cover rounded-md"
                          />
                          <button 
                            onClick={() => deleteEventImage(event._id)}
                            className="mt-2 w-full bg-red-600 text-white py-1 px-2 rounded-md text-sm hover:bg-red-700 transition-colors"
                          >
                            Remove Image
                          </button>
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-medium text-gray-900 mb-2">{event.title}</h3>
                        <div className="text-sm text-gray-600 mb-2 space-y-1">
                          <div>📅 {new Date(event.date).toLocaleDateString()}</div>
                          {event.time && <div>🕐 {event.time}</div>}
                          {event.location && <div>📍 {event.location}</div>}
                        </div>
                        <p className="text-gray-700 mb-4">{event.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <button 
                            onClick={() => setEditingEvent(event)}
                            className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => deleteEvent(event._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600">No events available</p>
            )}
          </div>
        </section>

        {/* News Section */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">News Management</h2>
            
            {/* Add News Form */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New News</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="News Title *"
                  value={newNews.title}
                  onChange={(e) => setNewNews({...newNews, title: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={newNews.priority}
                  onChange={(e) => setNewNews({...newNews, priority: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <input
                  type="date"
                  placeholder="Publish Date"
                  value={newNews.publishDate}
                  onChange={(e) => setNewNews({...newNews, publishDate: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  placeholder="Expiry Date (Optional)"
                  value={newNews.expiryDate}
                  onChange={(e) => setNewNews({...newNews, expiryDate: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <textarea
                placeholder="News Description *"
                value={newNews.description}
                onChange={(e) => setNewNews({...newNews, description: e.target.value})}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
              <div className="flex flex-wrap gap-4 items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewsImageFile(e.target.files[0])}
                  id="newsImageUpload"
                  className="hidden"
                />
                <label 
                  htmlFor="newsImageUpload"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors cursor-pointer"
                >
                  Choose News Image
                </label>
                {newsImageFile && (
                  <span className="text-sm text-gray-600">{newsImageFile.name}</span>
                )}
                <button 
                  onClick={addNews}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add News
                </button>
              </div>
            </div>

            {/* News List */}
            <div className="space-y-6">
              {content.news && content.news.length > 0 ? (
                content.news.map((newsItem, index) => (
                  <div key={newsItem._id || index} className="border border-gray-200 rounded-lg p-6">
                    {editingNews && editingNews._id === newsItem._id ? (
                      // Edit Form
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={editingNews.title}
                            onChange={(e) => setEditingNews({...editingNews, title: e.target.value})}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <select
                            value={editingNews.priority || 'medium'}
                            onChange={(e) => setEditingNews({...editingNews, priority: e.target.value})}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                          </select>
                          <input
                            type="date"
                            value={editingNews.publishDate ? editingNews.publishDate.split('T')[0] : ''}
                            onChange={(e) => setEditingNews({...editingNews, publishDate: e.target.value})}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="date"
                            placeholder="Expiry Date (Optional)"
                            value={editingNews.expiryDate ? editingNews.expiryDate.split('T')[0] : ''}
                            onChange={(e) => setEditingNews({...editingNews, expiryDate: e.target.value})}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <textarea
                          value={editingNews.description}
                          onChange={(e) => setEditingNews({...editingNews, description: e.target.value})}
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex flex-wrap gap-4 items-center">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setNewsImageFile(e.target.files[0])}
                            id="editNewsImageUpload"
                            className="hidden"
                          />
                          <label 
                            htmlFor="editNewsImageUpload"
                            className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors cursor-pointer text-sm"
                          >
                            Change Image
                          </label>
                          {newsImageFile && (
                            <span className="text-sm text-gray-600">{newsImageFile.name}</span>
                          )}
                          <button 
                            onClick={updateNews}
                            className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors"
                          >
                            Save Changes
                          </button>
                          <button 
                            onClick={() => {
                              setEditingNews(null);
                              setNewsImageFile(null);
                            }}
                            className="bg-gray-600 text-white px-4 py-1 rounded-md text-sm hover:bg-gray-700 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Display News
                      <div className="flex flex-col lg:flex-row gap-6">
                        {newsItem.image && newsItem.image.imageId && (
                          <div className="lg:w-1/3">
                            <img 
                              src={getImageUrl(newsItem.image)} 
                              alt={newsItem.title}
                              className="w-full h-48 object-cover rounded-md"
                            />
                            <button 
                              onClick={() => deleteNewsImage(newsItem._id)}
                              className="mt-2 w-full bg-red-600 text-white py-1 px-2 rounded-md text-sm hover:bg-red-700 transition-colors"
                            >
                              Remove Image
                            </button>
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-medium text-gray-900">{newsItem.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              newsItem.priority === 'high' ? 'bg-red-100 text-red-800' :
                              newsItem.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {newsItem.priority?.toUpperCase() || 'MEDIUM'}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-2 space-y-1">
                            {newsItem.publishDate && (
                              <div>📅 Published: {new Date(newsItem.publishDate).toLocaleDateString()}</div>
                            )}
                            {newsItem.expiryDate && (
                              <div>⏰ Expires: {new Date(newsItem.expiryDate).toLocaleDateString()}</div>
                            )}
                          </div>
                          <p className="text-gray-700 mb-4">{newsItem.description}</p>
                          <div className="flex flex-wrap gap-2">
                            <button 
                              onClick={() => setEditingNews(newsItem)}
                              className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => deleteNews(newsItem._id)}
                              className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No news available</p>
              )}
            </div>
          </section>

        {/* Home Gallery Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Home Gallery Management</h2>
          
          {/* Add Home Gallery Form */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Image Caption"
                value={newHomeGalleryItem.caption}
                onChange={(e) => setNewHomeGalleryItem({...newHomeGalleryItem, caption: e.target.value})}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleHomeGalleryUpload}
                id="homeGalleryUpload"
                className="hidden"
              />
              <label 
                htmlFor="homeGalleryUpload"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer text-center"
              >
                Add Home Gallery Image
              </label>
            </div>
          </div>

          {/* Home Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {content.homegallery && content.homegallery.length > 0 ? (
              content.homegallery.map((item, index) => (
                <div key={item._id || index} className="bg-gray-50 rounded-lg p-4">
                  <img 
                    src={getImageUrl(item)} 
                    alt={item.caption}
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                  <p className="text-sm text-gray-700 mb-3">{item.caption}</p>
                  <button 
                    onClick={() => deleteHomeGalleryItem(item._id)}
                    className="w-full bg-red-600 text-white py-1 px-2 rounded-md text-sm hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600 col-span-full">No home gallery items available</p>
            )}
          </div>
        </section>

        {/* Gallery Section */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Gallery Management</h2>
          
          {/* Add Gallery Form */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Image Caption"
                value={newGalleryItem.caption}
                onChange={(e) => setNewGalleryItem({...newGalleryItem, caption: e.target.value})}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleGalleryUpload}
                id="galleryUpload"
                className="hidden"
              />
              <label 
                htmlFor="galleryUpload"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer text-center"
              >
                Add Gallery Image
              </label>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {content.gallery && content.gallery.length > 0 ? (
              content.gallery.map((item, index) => (
                <div key={item._id || index} className="bg-gray-50 rounded-lg p-4">
                  <img 
                    src={getImageUrl(item)} 
                    alt={item.caption}
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                  <p className="text-sm text-gray-700 mb-3">{item.caption}</p>
                  <button 
                    onClick={() => deleteGalleryItem(item._id)}
                    className="w-full bg-red-600 text-white py-1 px-2 rounded-md text-sm hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600 col-span-full">No gallery items available</p>
            )}
          </div>
        </section>
      </div>

      {/* Saving Indicator */}
      {saving && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg">
          Saving...
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;