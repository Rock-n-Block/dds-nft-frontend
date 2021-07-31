import { useEffect, useState } from 'react';

const useAutoplay = () => {
  const [autoplay, setAutoplay] = useState('false');

  const toggleAutoplay = () => {
    if (autoplay === 'true') {
      localStorage.setItem('autoplay', 'false');
      setAutoplay('false')
    } else {
      localStorage.setItem('autoplay', 'true');
      setAutoplay('true')
    }
  };
  useEffect(() => {
    const localAutoplay = localStorage.getItem('autoplay');
    if (localAutoplay) {
      setAutoplay(localAutoplay);
    }
  }, [setAutoplay]);

  return { autoplay, toggleAutoplay };
};

export default useAutoplay;
