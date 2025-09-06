// src/components/Gallery.js
import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await fetch('/api/content');
      if (response.ok) {
        const data = await response.json();
        setGalleryItems(data.gallery || []);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (item, index) => {
    setSelectedImage(item);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCurrentIndex(0);
  };

  const navigateImage = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % galleryItems.length
      : (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    
    setCurrentIndex(newIndex);
    setSelectedImage(galleryItems[newIndex]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowRight') navigateImage('next');
    if (e.key === 'ArrowLeft') navigateImage('prev');
    if (e.key === 'Escape') closeModal();
  };

  useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [selectedImage, currentIndex]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  const GalleryCard = ({ item, index }) => (
    <div
      onClick={() => openModal(item, index)}
      className="group cursor-pointer bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative overflow-hidden">
        <img
          src={`/api/image/${item.imageId}`}
          alt={item.caption || 'Gallery image'}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white rounded-full p-3 shadow-lg">
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {item.caption && (
        <div className="p-4">
          <p className="text-gray-700 text-sm line-clamp-2">{item.caption}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">Gallery</h1>
        <p className="text-gray-600">From classroom learning to cultural celebrations, sports events to science exhibitions – Mangala School is alive with joyful learning.</p>
        {galleryItems.length > 0 && (
          <p className="text-sm text-gray-500 mt-2">{galleryItems.length} {galleryItems.length === 1 ? 'photo' : 'photos'}</p>
        )}
      </div>

      {galleryItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <GalleryCard key={item._id || index} item={item} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-20">
          <div className="mb-6">
            <svg className="mx-auto h-24 w-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">No photos in gallery yet</h3>
          <p className="text-gray-500">Check back soon for new photos from school events!</p>
        </div>
      )}

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative max-w-5xl max-h-full w-full h-full flex items-center justify-center p-4">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white text-3xl hover:text-red-400 transition-colors z-10"
              onClick={closeModal}
            >
              ×
            </button>

            {/* Navigation buttons */}
            {galleryItems.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-blue-400 transition-colors z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                >
                  ‹
                </button>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-blue-400 transition-colors z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                >
                  ›
                </button>
              </>
            )}

            {/* Image counter */}
            {galleryItems.length > 1 && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full">
                {currentIndex + 1} / {galleryItems.length}
              </div>
            )}

            {/* Main image */}
            <div
              className="relative flex flex-col items-center justify-center max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`/api/image/${selectedImage.imageId}`}
                alt={selectedImage.caption || 'Gallery image'}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              
              {/* Caption */}
              {selectedImage.caption && (
                <div className="mt-4 bg-black bg-opacity-70 text-white px-6 py-3 rounded-lg max-w-2xl">
                  <p className="text-center">{selectedImage.caption}</p>
                </div>
              )}
            </div>

            {/* Navigation hints */}
            {galleryItems.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xs bg-black bg-opacity-50 px-3 py-1 rounded-full">
                Use arrow keys or click arrows to navigate
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;