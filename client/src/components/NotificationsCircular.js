// import React from 'react';

// const NotificationsCircular = () => {
//   const notifications = [
//     { title: 'Annual Sports Day Announcement', date: '2025-06-20' },
//     { title: 'Summer Vacation Circular', date: '2025-05-10' },
//     { title: 'Parent-Teacher Meeting Notice', date: '2025-04-15' },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-12">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold text-blue-800 mb-2">Notifications & Circulars</h1>
//         </div>

//         <section className="bg-white p-6 rounded-xl shadow">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Updates</h2>
//           <ul className="divide-y divide-gray-200">
//             {notifications.map((item, index) => (
//               <li key={index} className="py-4">
//                 <p className="text-lg font-medium text-gray-900">{item.title}</p>
//                 <p className="text-sm text-gray-600">Date: {item.date}</p>
//               </li>
//             ))}
//           </ul>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default NotificationsCircular;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationsCircular = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/api/notifications');
      setNotifications(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError('Failed to load notifications');
      setLoading(false);
    }
  };

  const openPDF = (pdfId, title) => {
    const pdfUrl = `/api/pdf/${pdfId}`;
    window.open(pdfUrl, '_blank');
  };

  const downloadPDF = (pdfId, originalName) => {
    const downloadUrl = `/api/pdf/${pdfId}?download=true`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = originalName || 'notification.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading notifications...</div>
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

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">Notifications & Circulars</h1>
          <p className="text-gray-600">Stay updated with the latest announcements and important documents</p>
        </div>

        <section className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-6">
            <h2 className="text-2xl font-semibold flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 6h16M4 12h16M4 18h11" />
              </svg>
              Recent Updates ({notifications.length})
            </h2>
          </div>
          
          {notifications.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {notifications.map((notification, index) => (
                <div key={notification._id || index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {notification.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Date: {formatDate(notification.date)}
                      </div>
                      {notification.originalName && (
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          File: {notification.originalName}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button 
                        onClick={() => openPDF(notification.pdfId, notification.title)}
                        className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View PDF
                      </button>
                      <button 
                        onClick={() => downloadPDF(notification.pdfId, notification.originalName)}
                        className="flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-xl text-gray-600 mb-2">No notifications available</p>
              <p className="text-gray-500">Check back later for new updates and announcements</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default NotificationsCircular;