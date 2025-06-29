import React from 'react';

const NotificationsCircular = () => {
  const notifications = [
    { title: 'Annual Sports Day Announcement', date: '2025-06-20' },
    { title: 'Summer Vacation Circular', date: '2025-05-10' },
    { title: 'Parent-Teacher Meeting Notice', date: '2025-04-15' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">Notifications & Circulars</h1>
        </div>

        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Updates</h2>
          <ul className="divide-y divide-gray-200">
            {notifications.map((item, index) => (
              <li key={index} className="py-4">
                <p className="text-lg font-medium text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-600">Date: {item.date}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default NotificationsCircular;
