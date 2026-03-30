"use client";

export default function Template({ children }) {
  return (
    <div 
      className="page-transition"
      style={{ 
        animation: 'pageEnter 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards' 
      }}
    >
      {/* SUNTIKAN CSS ANIMASI PROFESIONAL (FADE + SLIDE + BLUR) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pageEnter {
          0% { 
            opacity: 0; 
            transform: translateY(20px); 
            filter: blur(5px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
            filter: blur(0); 
          }
        }
      `}} />
      
      {children}
    </div>
  );
}
