<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import LoadingGif from '../images/waiting.gif';

export const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000); // 1 second

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div style={{position: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw', display: 'grid', placeItems: 'center', background: 'rgba(0, 0, 0, 0.5)'}}>
      <div style={{width: '8.5rem', aspectRatio: '1 / 1'}}>
        <img src={LoadingGif} alt="Loading..." />
      </div>
    </div>
  );
}
=======
import React, { useEffect, useState } from 'react';
import LoadingGif from '../images/waiting.gif';

export const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000); // 1 second

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div style={{position: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw', display: 'grid', placeItems: 'center', background: 'rgba(0, 0, 0, 0.5)'}}>
      <div style={{width: '8.5rem', aspectRatio: '1 / 1'}}>
        <img src={LoadingGif} alt="Loading..." />
      </div>
    </div>
  );
}
>>>>>>> 8e56e10c44ed715152572326d6bfe6ee3e1ca8fe
