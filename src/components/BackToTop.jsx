import { useState, useEffect } from 'react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        .back-to-top-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: rgb(20, 20, 20);
          border: none;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0px 0px 0px 4px rgba(180, 160, 255, 0.253);
          cursor: pointer;
          transition-duration: 0.3s;
          overflow: hidden;
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 40;
        }

        .back-to-top-btn:hover {
          width: 140px;
          border-radius: 50px;
          transition-duration: 0.3s;
          background-color: rgb(181, 160, 255);
          align-items: center;
        }

        .back-to-top-icon {
          width: 20px;
          height: 20px;
          transition-duration: 0.3s;
        }

        .back-to-top-btn:hover .back-to-top-icon {
          transition-duration: 0.3s;
          transform: translateY(-200%);
        }

        .back-to-top-btn::before {
          position: absolute;
          bottom: -20px;
          content: "Back to Top";
          color: white;
          font-size: 0px;
        }

        .back-to-top-btn:hover::before {
          font-size: 13px;
          opacity: 1;
          bottom: unset;
          transition-duration: 0.3s;
        }

        @media (max-width: 640px) {
          .back-to-top-btn {
            width: 45px;
            height: 45px;
            bottom: 1.5rem;
            right: 1.5rem;
          }
          
          .back-to-top-btn:hover {
            width: 120px;
          }
          
          .back-to-top-btn:hover::before {
            font-size: 11px;
          }
        }
      `}</style>

      <button
        onClick={scrollToTop}
        className="back-to-top-btn animate-fadeIn"
        aria-label="Back to top"
      >
        <svg 
          className="back-to-top-icon" 
          fill="white" 
          viewBox="0 0 24 24"
        >
          <path d="M12 4l-8 8h5v8h6v-8h5z" />
        </svg>
      </button>
    </>
  );
};

export default BackToTop;
