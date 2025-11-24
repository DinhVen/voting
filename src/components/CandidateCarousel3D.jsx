import { useEffect, useState } from 'react';

const CandidateCarousel3D = ({ candidates = [] }) => {
  const [isPaused, setIsPaused] = useState(false);
  
  // Limit to 8 candidates for best visual effect
  const displayCandidates = candidates.slice(0, 8);
  const quantity = displayCandidates.length || 8;

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes rotating3d {
          from {
            transform: perspective(1000px) rotateX(-15deg) rotateY(0deg);
          }
          to {
            transform: perspective(1000px) rotateX(-15deg) rotateY(360deg);
          }
        }

        .carousel-3d-container {
          position: absolute;
          width: 120px;
          height: 180px;
          transform-style: preserve-3d;
          animation: rotating3d 20s linear infinite;
        }

        .carousel-3d-container.paused {
          animation-play-state: paused;
        }

        .carousel-3d-card {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          overflow: hidden;
          border: 2px solid rgba(99, 102, 241, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .carousel-3d-card:hover {
          border-color: rgba(139, 92, 246, 0.6);
          box-shadow: 0 12px 48px rgba(139, 92, 246, 0.4);
        }

        .carousel-3d-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: radial-gradient(
            circle,
            rgba(99, 102, 241, 0.1) 0%,
            rgba(139, 92, 246, 0.3) 80%,
            rgba(168, 85, 247, 0.5) 100%
          );
        }
      `}</style>

      <div 
        className={`carousel-3d-container ${isPaused ? 'paused' : ''}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          '--quantity': quantity,
        }}
      >
        {displayCandidates.map((candidate, index) => {
          const angle = (360 / quantity) * index;
          const translateZ = 200; // Distance from center

          return (
            <div
              key={candidate.id || index}
              className="carousel-3d-card"
              style={{
                transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`,
              }}
            >
              <img
                src={candidate.image || 'https://via.placeholder.com/120x180'}
                alt={candidate.name}
                className="carousel-3d-img"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <p className="text-white text-xs font-bold truncate">{candidate.name}</p>
                <p className="text-white/70 text-[10px]">{candidate.votes || 0} phiếu</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Instruction */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full">
        Hover để tạm dừng
      </div>
    </div>
  );
};

export default CandidateCarousel3D;
