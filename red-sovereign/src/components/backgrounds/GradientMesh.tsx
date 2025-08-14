'use client'

export default function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient orbs - more visible */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-500/40 to-red-600/20 rounded-full blur-2xl animate-float-slow mix-blend-screen" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-bl from-red-600/30 to-orange-500/20 rounded-full blur-2xl animate-float-medium mix-blend-screen" />
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-tr from-red-400/30 to-pink-500/20 rounded-full blur-2xl animate-float-fast mix-blend-screen" />
      
      {/* Additional animated elements */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-red-500/25 to-transparent rounded-full blur-xl animate-float-medium mix-blend-screen" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-l from-red-600/25 to-transparent rounded-full blur-xl animate-float-slow mix-blend-screen" style={{ animationDelay: '1s' }} />
      
      {/* Grid overlay with enhanced visibility */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.15) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(239, 68, 68, 0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0',
          animation: 'grid-move 15s linear infinite',
        }}
      />
      
      {/* Animated particles */}
      <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-red-500 rounded-full animate-pulse" />
      <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-1/4 left-2/3 w-1 h-1 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/2 w-1 h-1 bg-red-600 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />
    </div>
  )
}