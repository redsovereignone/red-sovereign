'use client'

export default function DynamicOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Large animated gradient orbs with higher visibility */}
      <div 
        className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, rgba(239, 68, 68, 0.2) 40%, transparent 70%)',
          animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite, float-slow 20s ease-in-out infinite',
        }}
      />
      
      <div 
        className="absolute top-40 right-10 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(248, 113, 113, 0.3) 0%, rgba(239, 68, 68, 0.15) 40%, transparent 70%)',
          animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite, float-medium 15s ease-in-out infinite',
          animationDelay: '1s',
        }}
      />
      
      <div 
        className="absolute bottom-20 left-1/3 w-[350px] h-[350px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(252, 165, 165, 0.35) 0%, rgba(248, 113, 113, 0.15) 40%, transparent 70%)',
          animation: 'pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite, float-fast 10s ease-in-out infinite',
          animationDelay: '2s',
        }}
      />
      
      {/* Moving gradient lines */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(239, 68, 68, 0.03) 10px,
              rgba(239, 68, 68, 0.03) 20px
            )
          `,
          animation: 'grid-move 20s linear infinite',
        }}
      />
      
      {/* Glowing particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse" />
      <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-red-400 rounded-full shadow-[0_0_10px_rgba(248,113,113,0.8)] animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-2/3 w-2 h-2 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)] animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-red-400 rounded-full shadow-[0_0_10px_rgba(248,113,113,0.8)] animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
    </div>
  )
}