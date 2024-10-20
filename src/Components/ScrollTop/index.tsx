import { useEffect, ReactNode, ReactElement } from 'react';

// ==============================|| NAVIGATION - SCROLL TO TOP ||============================== //

interface ScrollTopProps {
  children?: ReactNode;
}

const ScrollTop: React.FC<ScrollTopProps> = ({ children }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  // Ensure that the children returned is of type ReactElement or null
  return (typeof children === 'object' && children !== null) ? children as ReactElement : null;
};

export default ScrollTop;