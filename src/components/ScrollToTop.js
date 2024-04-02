import { useState, useEffect, useRef } from 'react';
import { IconButton } from '@chakra-ui/react';
import { IoArrowUpSharp } from 'react-icons/io5';
import gsap from 'gsap';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollButton = useRef();

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    scrollButton.current.blur();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible) {
      gsap.to(scrollButton.current, {
        duration: 0.5,
        opacity: 1,
        zIndex: 100
      });
    } else {
      gsap.to(scrollButton.current, {
        duration: 0.5,
        opacity: 0,
        zIndex: -1
      });
    }
  }, [isVisible]);

  return (
    <IconButton
      aria-label="scroll to top"
      icon={<IoArrowUpSharp />}
      size="md"
      colorScheme="purple"
      variant="outline"
      border="1px solid"
      ref={scrollButton}
      onClick={handleClick}
      position="fixed"
      bottom="4rem"
      right="4rem"
      zIndex="-1"
      opacity="0"
    />
  );
};

export default ScrollToTopButton;
