import { useState, useEffect } from 'react';
import { throttle } from 'lodash';

const useYScroll = (): number => {
  const [yPos, setYPos] = useState<number>(0);

  useEffect(() => {
    const scrollHandler = throttle(() => {
      setYPos(window.pageYOffset);
    }, 200);

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return yPos;
};

export default useYScroll;
