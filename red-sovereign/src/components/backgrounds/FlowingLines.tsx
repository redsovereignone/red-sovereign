'use client'

export default function FlowingLines() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated flowing lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 800"
      >
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(239, 68, 68)" stopOpacity="0" />
            <stop offset="50%" stopColor="rgb(239, 68, 68)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="rgb(239, 68, 68)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Flowing paths */}
        <path
          d="M0,400 Q360,300 720,400 T1440,400"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
        >
          <animate
            attributeName="d"
            values="M0,400 Q360,300 720,400 T1440,400;M0,400 Q360,500 720,400 T1440,400;M0,400 Q360,300 720,400 T1440,400"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>
        
        <path
          d="M0,200 Q360,100 720,200 T1440,200"
          stroke="url(#line-gradient)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.2"
        >
          <animate
            attributeName="d"
            values="M0,200 Q360,100 720,200 T1440,200;M0,200 Q360,300 720,200 T1440,200;M0,200 Q360,100 720,200 T1440,200"
            dur="10s"
            repeatCount="indefinite"
          />
        </path>
        
        <path
          d="M0,600 Q360,500 720,600 T1440,600"
          stroke="url(#line-gradient)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.2"
        >
          <animate
            attributeName="d"
            values="M0,600 Q360,500 720,600 T1440,600;M0,600 Q360,700 720,600 T1440,600;M0,600 Q360,500 720,600 T1440,600"
            dur="12s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      
      {/* Particle dots */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-20 right-10 w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60 pointer-events-none" />
    </div>
  )
}