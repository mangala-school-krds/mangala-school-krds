// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//   const [content, setContent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '' });
//   const [newGalleryItem, setNewGalleryItem] = useState({ caption: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('adminToken');
//     if (!token) {
//       navigate('/admin');
//       return;
//     }

//     // Set base URL and auth header
//     axios.defaults.baseURL = 'http://localhost:5000';
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     fetchContent();
//   }, [navigate]);

//   const fetchContent = async () => {
//     try {
//       const response = await axios.get('/api/content');
//       setContent(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching content:', error);
//       if (error.code === 'ERR_NETWORK') {
//         setError('Cannot connect to server. Please make sure the backend is running on port 5000.');
//       } else if (error.response?.status === 401) {
//         localStorage.removeItem('adminToken');
//         navigate('/admin');
//       } else {
//         setError('Failed to load content');
//       }
//       setLoading(false);
//     }
//   };

//   const handleContentUpdate = async (field, value) => {
//     setSaving(true);
//     try {
//       const updatedContent = { ...content, [field]: value };
//       await axios.put('/api/content', updatedContent);
//       setContent(updatedContent);
//     } catch (error) {
//       console.error('Error updating content:', error);
//       alert('Failed to update content');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const uploadImage = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       throw error;
//     }
//   };

//   const handleLogoUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     try {
//       const uploadResponse = await uploadImage(file);
//       const response = await axios.post('/api/logos', uploadResponse);
//       setContent({ ...content, logos: response.data });
//       e.target.value = ''; // Reset file input
//     } catch (error) {
//       console.error('Error adding logo:', error);
//       alert('Failed to upload logo');
//     }
//   };

//   const deleteLogo = async (logoId) => {
//     if (!window.confirm('Are you sure you want to delete this logo?')) return;

//     try {
//       const response = await axios.delete(`/api/logos/${logoId}`);
//       setContent({ ...content, logos: response.data });
//     } catch (error) {
//       console.error('Error deleting logo:', error);
//       alert('Failed to delete logo');
//     }
//   };

//   const handlePersonImageUpload = async (e, personType) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     try {
//       const uploadResponse = await uploadImage(file);
//       const response = await axios.put(`/api/person-image/${personType}`, uploadResponse);
//       setContent(response.data);
//       e.target.value = ''; // Reset file input
//     } catch (error) {
//       console.error('Error updating person image:', error);
//       alert('Failed to upload image');
//     }
//   };

//   const deletePersonImage = async (personType) => {
//     if (!window.confirm('Are you sure you want to delete this image?')) return;

//     try {
//       const response = await axios.delete(`/api/person-image/${personType}`);
//       setContent(response.data);
//     } catch (error) {
//       console.error('Error deleting person image:', error);
//       alert('Failed to delete image');
//     }
//   };

//   const addEvent = async () => {
//     if (!newEvent.title || !newEvent.description || !newEvent.date) {
//       alert('Please fill all event fields');
//       return;
//     }

//     try {
//       const response = await axios.post('/api/events', newEvent);
//       setContent({ ...content, events: response.data });
//       setNewEvent({ title: '', description: '', date: '' });
//     } catch (error) {
//       console.error('Error adding event:', error);
//       alert('Failed to add event');
//     }
//   };

//   const deleteEvent = async (eventId) => {
//     if (!window.confirm('Are you sure you want to delete this event?')) return;

//     try {
//       const response = await axios.delete(`/api/events/${eventId}`);
//       setContent({ ...content, events: response.data });
//     } catch (error) {
//       console.error('Error deleting event:', error);
//       alert('Failed to delete event');
//     }
//   };

//   const handleGalleryUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!newGalleryItem.caption.trim()) {
//       alert('Please provide a caption for the image');
//       return;
//     }

//     try {
//       const uploadResponse = await uploadImage(file);
//       const galleryData = {
//         ...uploadResponse,
//         caption: newGalleryItem.caption
//       };
      
//       const response = await axios.post('/api/gallery', galleryData);
//       setContent({ ...content, gallery: response.data });
//       setNewGalleryItem({ caption: '' });
//       e.target.value = ''; // Reset file input
//     } catch (error) {
//       console.error('Error adding gallery item:', error);
//       alert('Failed to add gallery item');
//     }
//   };

//   const deleteGalleryItem = async (itemId) => {
//     if (!window.confirm('Are you sure you want to delete this gallery item?')) return;

//     try {
//       const response = await axios.delete(`/api/gallery/${itemId}`);
//       setContent({ ...content, gallery: response.data });
//     } catch (error) {
//       console.error('Error deleting gallery item:', error);
//       alert('Failed to delete gallery item');
//     }
//   };

//   const getImageUrl = (imageData) => {
//     if (!imageData || !imageData.imageId) return null;
//     return `http://localhost:5000/api/image/${imageData.imageId}`;
//   };

//   const logout = () => {
//     localStorage.removeItem('adminToken');
//     delete axios.defaults.headers.common['Authorization'];
//     navigate('/admin');
//   };

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div className="error-page">
//         <h2>Error</h2>
//         <p>{error}</p>
//         <button onClick={() => window.location.reload()}>Retry</button>
//       </div>
//     );
//   }

//   if (!content) {
//     return <div className="loading">No content available</div>;
//   }

//   return (
//     <div className="admin-dashboard">
//       <header className="dashboard-header">
//         <h1>Admin Dashboard</h1>
//         <button onClick={logout} className="logout-btn">Logout</button>
//       </header>

//       <div className="dashboard-content">
//         <section className="logos-section">
//           <h2>School Logos</h2>
//           <div className="logo-upload">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleLogoUpload}
//               id="logoUpload"
//             />
//             <label htmlFor="logoUpload" className="upload-btn">Add New Logo</label>
//           </div>
//           <div className="logos-grid">
//             {content.logos && content.logos.length > 0 ? (
//               content.logos.map((logo, index) => (
//                 <div key={logo._id || index} className="logo-item">
//                   <img src={getImageUrl(logo)} alt={logo.originalName} />
//                   <div className="logo-actions">
//                     <span className="logo-name">{logo.originalName}</span>
//                     <button onClick={() => deleteLogo(logo._id)} className="delete-btn">Delete</button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No logos uploaded</p>
//             )}
//           </div>
//         </section>

//         <section className="messages-section">
//           <h2>Leadership Messages</h2>
//           <div className="message-editors">
//             {[
//               { key: 'president', label: 'President' },
//               { key: 'secretary', label: 'Secretary' },
//               { key: 'correspondent', label: 'Correspondent' },
//               { key: 'headmistress', label: 'Headmistress' }
//             ].map(({ key, label }) => (
//               <div key={key} className="editor-group">
//                 <div className="image-upload-section">
//                   <label>{label} Image:</label>
//                   <div className="image-upload-controls">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => handlePersonImageUpload(e, key)}
//                       id={`${key}Image`}
//                     />
//                     <label htmlFor={`${key}Image`} className="upload-btn">Upload Image</label>
//                     {content[`${key}Image`] && (
//                       <button 
//                         onClick={() => deletePersonImage(key)} 
//                         className="delete-btn"
//                       >
//                         Delete Image
//                       </button>
//                     )}
//                   </div>
//                   {content[`${key}Image`] && (
//                     <div className="image-preview">
//                       <img
//                         src={getImageUrl(content[`${key}Image`])}
//                         alt={label}
//                         className="preview"
//                       />
//                     </div>
//                   )}
//                 </div>
//                 <label>{label} Message:</label>
//                 <textarea
//                   value={content[`${key}Message`] || ''}
//                   onChange={(e) => handleContentUpdate(`${key}Message`, e.target.value)}
//                   rows="4"
//                   placeholder={`Enter ${label.toLowerCase()} message...`}
//                 />
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* <section className="programme-section">
//           <h2>Programme</h2>
//           <textarea
//             value={content.programme || ''}
//             onChange={(e) => handleContentUpdate('programme', e.target.value)}
//             rows="6"
//             placeholder="Enter programme details..."
//           />
//         </section> */}

//         <section className="events-section">
//           <h2>Events Management</h2>
//           <div className="add-event">
//             <input
//               type="text"
//               placeholder="Event Title"
//               value={newEvent.title}
//               onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
//             />
//             <textarea
//               placeholder="Event Description"
//               value={newEvent.description}
//               onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
//               rows="3"
//             />
//             <input
//               type="date"
//               value={newEvent.date}
//               onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
//             />
//             <button onClick={addEvent}>Add Event</button>
//           </div>
//           <div className="events-list">
//             {content.events && content.events.length > 0 ? (
//               content.events.map((event, index) => (
//                 <div key={event._id || index} className="event-item">
//                   <div>
//                     <h3>{event.title}</h3>
//                     <p>{event.description}</p>
//                     <span>{new Date(event.date).toLocaleDateString()}</span>
//                   </div>
//                   <button onClick={() => deleteEvent(event._id)}>Delete</button>
//                 </div>
//               ))
//             ) : (
//               <p>No events available</p>
//             )}
//           </div>
//         </section>

//         <section className="gallery-section">
//           <h2>Gallery Management</h2>
//           <div className="add-gallery">
//             <input
//               type="text"
//               placeholder="Image Caption"
//               value={newGalleryItem.caption}
//               onChange={(e) => setNewGalleryItem({...newGalleryItem, caption: e.target.value})}
//             />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleGalleryUpload}
//               id="galleryUpload"
//             />
//             <label htmlFor="galleryUpload" className="upload-btn">Add Gallery Image</label>
//           </div>
//           <div className="gallery-grid">
//             {content.gallery && content.gallery.length > 0 ? (
//               content.gallery.map((item, index) => (
//                 <div key={item._id || index} className="gallery-item">
//                   <img src={getImageUrl(item)} alt={item.caption} />
//                   <p>{item.caption}</p>
//                   <button onClick={() => deleteGalleryItem(item._id)}>Delete</button>
//                 </div>
//               ))
//             ) : (
//               <p>No gallery items available</p>
//             )}
//           </div>
//         </section>
//       </div>

//       {saving && <div className="saving-indicator">Saving...</div>}
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '' });
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
    axios.defaults.baseURL = 'http://localhost:5000';
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
      alert('Please fill all event fields');
      return;
    }

    try {
      const response = await axios.post('/api/events', newEvent);
      setContent({ ...content, events: response.data });
      setNewEvent({ title: '', description: '', date: '' });
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Failed to add event');
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
    return `http://localhost:5000/api/image/${imageData.imageId}`;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/admin');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-page">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!content) {
    return <div className="loading">No content available</div>;
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={logout} className="logout-btn">Logout</button>
      </header>

      <div className="dashboard-content">
        <section className="logos-section">
          <h2>School Logos</h2>
          <div className="logo-upload">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              id="logoUpload"
            />
            <label htmlFor="logoUpload" className="upload-btn">Add New Logo</label>
          </div>
          <div className="logos-grid">
            {content.logos && content.logos.length > 0 ? (
              content.logos.map((logo, index) => (
                <div key={logo._id || index} className="logo-item">
                  <img src={getImageUrl(logo)} alt={logo.originalName} />
                  <div className="logo-actions">
                    <span className="logo-name">{logo.originalName}</span>
                    <button onClick={() => deleteLogo(logo._id)} className="delete-btn">Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No logos uploaded</p>
            )}
          </div>
        </section>

        <section className="messages-section">
          <h2>Leadership Messages</h2>
          <div className="message-editors">
            {[
              { key: 'president', label: 'President' },
              { key: 'secretary', label: 'Secretary' },
              { key: 'correspondent', label: 'Correspondent' },
              { key: 'headmistress', label: 'Headmistress' }
            ].map(({ key, label }) => (
              <div key={key} className="editor-group">
                <div className="image-upload-section">
                  <label>{label} Image:</label>
                  <div className="image-upload-controls">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePersonImageUpload(e, key)}
                      id={`${key}Image`}
                    />
                    <label htmlFor={`${key}Image`} className="upload-btn">Upload Image</label>
                    {content[`${key}Image`] && (
                      <button 
                        onClick={() => deletePersonImage(key)} 
                        className="delete-btn"
                      >
                        Delete Image
                      </button>
                    )}
                  </div>
                  {content[`${key}Image`] && (
                    <div className="image-preview">
                      <img
                        src={getImageUrl(content[`${key}Image`])}
                        alt={label}
                        className="preview"
                      />
                    </div>
                  )}
                </div>
                <label>{label} Message:</label>
                <textarea
                  value={content[`${key}Message`] || ''}
                  onChange={(e) => handleContentUpdate(`${key}Message`, e.target.value)}
                  rows="4"
                  placeholder={`Enter ${label.toLowerCase()} message...`}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="events-section">
          <h2>Events Management</h2>
          <div className="add-event">
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
            />
            <textarea
              placeholder="Event Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              rows="3"
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
            />
            <button onClick={addEvent}>Add Event</button>
          </div>
          <div className="events-list">
            {content.events && content.events.length > 0 ? (
              content.events.map((event, index) => (
                <div key={event._id || index} className="event-item">
                  <div>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <button onClick={() => deleteEvent(event._id)}>Delete</button>
                </div>
              ))
            ) : (
              <p>No events available</p>
            )}
          </div>
        </section>

        <section className="home-gallery-section">
          <h2>Home Gallery Management</h2>
          <div className="add-home-gallery">
            <input
              type="text"
              placeholder="Image Caption"
              value={newHomeGalleryItem.caption}
              onChange={(e) => setNewHomeGalleryItem({...newHomeGalleryItem, caption: e.target.value})}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleHomeGalleryUpload}
              id="homeGalleryUpload"
            />
            <label htmlFor="homeGalleryUpload" className="upload-btn">Add Home Gallery Image</label>
          </div>
          <div className="home-gallery-grid">
            {content.homegallery && content.homegallery.length > 0 ? (
              content.homegallery.map((item, index) => (
                <div key={item._id || index} className="home-gallery-item">
                  <img src={getImageUrl(item)} alt={item.caption} />
                  <p>{item.caption}</p>
                  <button onClick={() => deleteHomeGalleryItem(item._id)}>Delete</button>
                </div>
              ))
            ) : (
              <p>No home gallery items available</p>
            )}
          </div>
        </section>

        <section className="gallery-section">
          <h2>Gallery Management</h2>
          <div className="add-gallery">
            <input
              type="text"
              placeholder="Image Caption"
              value={newGalleryItem.caption}
              onChange={(e) => setNewGalleryItem({...newGalleryItem, caption: e.target.value})}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleGalleryUpload}
              id="galleryUpload"
            />
            <label htmlFor="galleryUpload" className="upload-btn">Add Gallery Image</label>
          </div>
          <div className="gallery-grid">
            {content.gallery && content.gallery.length > 0 ? (
              content.gallery.map((item, index) => (
                <div key={item._id || index} className="gallery-item">
                  <img src={getImageUrl(item)} alt={item.caption} />
                  <p>{item.caption}</p>
                  <button onClick={() => deleteGalleryItem(item._id)}>Delete</button>
                </div>
              ))
            ) : (
              <p>No gallery items available</p>
            )}
          </div>
        </section>
      </div>

      {saving && <div className="saving-indicator">Saving...</div>}
    </div>
  );
};

export default AdminDashboard;