import { useState, useEffect } from 'react';

const useCloudinary = () => {
  const [cloudinary, setCloudinary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCloudinaryScript = () => {
      return new Promise((resolve, reject) => {
        if (window.cloudinary) {
        //   console.log('Cloudinary script already loaded');
          resolve(window.cloudinary);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
        script.onload = () => {
        //   console.log('Cloudinary script loaded successfully');
          resolve(window.cloudinary);
        };
        script.onerror = () => {
          console.error('Failed to load Cloudinary script');
          reject(new Error('Failed to load Cloudinary script'));
        };
        document.body.appendChild(script);
      });
    };

    loadCloudinaryScript()
      .then(cloudinary => {
        setCloudinary(cloudinary);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });

    return () => {
      const script = document.querySelector('script[src="https://widget.cloudinary.com/v2.0/global/all.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return { cloudinary, loading, error };
};

export default useCloudinary;
