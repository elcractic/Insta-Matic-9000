import React, { useState, useRef } from 'react';

type FilterMode = 'sepia' | 'neon' | 'noir' | 'spidey' | 'matrix' | 'glitch';

const RetroCamera: React.FC = () => {
  const [mode, setMode] = useState<FilterMode>('neon');
  const [isFlashing, setIsFlashing] = useState(false);
  const [printingState, setPrintingState] = useState<'idle' | 'printing' | 'developed'>('idle');
  const [printId, setPrintId] = useState(0);
  
  // Default Image
  const [imageSrc, setImageSrc] = useState<string>("https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=600&auto=format&fit=crop");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filters: Record<FilterMode, string> = {
    sepia: 'sepia(1) contrast(1.2) brightness(0.9) saturate(0.8)',
    neon: 'contrast(1.2) saturate(1.5) hue-rotate(-10deg) brightness(1.1)',
    noir: 'grayscale(1) contrast(1.5) brightness(0.8)',
    spidey: 'contrast(1.4) saturate(1.8) brightness(1.1)',
    matrix: 'contrast(1.5) brightness(0.8) sepia(1) hue-rotate(50deg) saturate(3)',
    glitch: 'contrast(1.3) brightness(1.1) saturate(1.2)',
  };

  const getModeLabel = (m: FilterMode) => {
    switch (m) {
        case 'sepia': return '80s';
        case 'neon': return '90s';
        case 'noir': return '50s';
        default: return m.toUpperCase();
    }
  };

  const getOverlayContent = () => {
    switch (mode) {
      case 'spidey':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-90">
             <svg viewBox="0 0 200 200" className="w-1/2 h-1/2 drop-shadow-2xl filter drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]">
                <path fill="#D00" d="M100 20 C 60 20 30 50 30 100 C 30 160 80 190 100 195 C 120 190 170 160 170 100 C 170 50 140 20 100 20 Z" />
                <path fill="white" d="M55 80 Q 80 100 90 70 Q 70 60 55 80 M145 80 Q 120 100 110 70 Q 130 60 145 80" />
                <path fill="none" stroke="black" strokeWidth="2" d="M100 20 V 195 M30 100 H 170 M 50 50 L 150 150 M 150 50 L 50 150" opacity="0.5"/>
             </svg>
             <div className="absolute inset-0 bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-[size:8px_8px] opacity-20"></div>
          </div>
        );
      case 'matrix':
        return (
          <div className="absolute inset-0 pointer-events-none z-20 opacity-40 font-mono text-[10px] text-green-500 overflow-hidden leading-3 break-all select-none mix-blend-screen">
             {Array(500).fill(0).map(() => (Math.random() > 0.5 ? '1' : '0')).join(' ')}
          </div>
        );
      case 'glitch':
        return (
            <div className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay opacity-50 bg-gradient-to-tr from-cyan-500 via-transparent to-pink-500">
                <div className="absolute top-10 left-0 w-full h-2 bg-white/20 blur-sm"></div>
                <div className="absolute bottom-20 left-0 w-full h-4 bg-white/10 blur-md"></div>
            </div>
        );
      default:
        const colors = {
            sepia: 'rgba(112, 66, 20, 0.2)',
            neon: 'rgba(255, 0, 255, 0.15)',
            noir: 'rgba(0, 0, 0, 0.1)',
        };
        return <div className="absolute inset-0 pointer-events-none mix-blend-overlay" style={{ backgroundColor: colors[mode as 'sepia' | 'neon' | 'noir'] }}></div>;
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => { if (e.target?.result) setImageSrc(e.target.result as string); };
      reader.readAsDataURL(file);
    }
  };

  const handleShutter = () => {
    if (printingState === 'printing') return;
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 200);
    setPrintingState('idle');
    setTimeout(() => { setPrintId(p => p + 1); setPrintingState('printing'); }, 50);
    setTimeout(() => { setPrintingState('developed'); }, 4000);
  };

  const downloadPhoto = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.crossOrigin = "anonymous"; 
    img.src = imageSrc;

    if (!ctx) return;

    img.onload = () => {
        try {
            const w = img.naturalWidth;
            const h = img.naturalHeight;
            const borderSide = w * 0.08;
            const borderTop = h * 0.08;
            const borderBottom = h * 0.3; 

            canvas.width = w + (borderSide * 2);
            canvas.height = h + borderTop + borderBottom;

            ctx.fillStyle = '#fdfdfd';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.filter = filters[mode]; 
            ctx.drawImage(img, borderSide, borderTop, w, h);
            ctx.filter = 'none';

            ctx.font = `bold ${w * 0.04}px Courier New`;
            ctx.fillStyle = '#a1a1a1';
            const dateStr = new Date().toLocaleDateString();
            ctx.fillText(dateStr, canvas.width - (borderSide + (w*0.3)), canvas.height - (borderBottom/2));
            
            const link = document.createElement('a');
            link.download = `elcractic-${mode}-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            alert("Security Error: The browser blocked downloading this specific image because it comes from an external website. \n\nPlease click 'LOAD FILM' and upload your own photo - that will download perfectly!");
        }
    };
  };

  return (
    <div className="relative z-20 w-full max-w-md bg-zinc-800 rounded-3xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] border-t-2 border-zinc-700 border-b-8 border-zinc-950 p-6 flex flex-col gap-6">
      
      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />

      {/* Texture */}
      <div className="absolute inset-0 bg-neutral-800 opacity-50 rounded-3xl pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center text-zinc-400 z-10">
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 bg-zinc-900 px-3 py-1 rounded border border-zinc-700 hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer group shadow-lg"
        >
          <div className="w-2 h-2 bg-yellow-500 rounded-full group-hover:animate-pulse"></div>
          <span className="text-[10px] tracking-widest font-bold">LOAD FILM</span>
        </button>
        <h1 className="text-xl font-black italic tracking-tighter text-zinc-300 drop-shadow-md">
          INSTA-MATIC <span className="text-teal-400 text-shadow-neon">9000</span>
        </h1>
      </div>

      {/* Screen */}
      <div className="relative w-full aspect-[4/3] bg-black rounded-lg border-4 border-zinc-900 shadow-inner overflow-hidden ring-1 ring-zinc-800 group">
        <div className={`absolute inset-0 bg-white z-50 pointer-events-none ${isFlashing ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}></div>

        <div 
          className="absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center animate-shake transition-all duration-500"
          style={{ backgroundImage: `url(${imageSrc})`, filter: filters[mode] }}
        ></div>
        
        {getOverlayContent()}
        <div className="absolute inset-0 pointer-events-none scanline opacity-30 z-30"></div>
        
        <div className="absolute top-2 right-2 text-green-400 text-xs font-mono drop-shadow-md bg-black/50 px-2 py-0.5 rounded z-40 border border-green-900/50">
            REC ● [{getModeLabel(mode)}]
        </div>
        
        <div onClick={() => fileInputRef.current?.click()} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 cursor-pointer z-50 backdrop-blur-sm">
          <span className="text-white text-xs font-mono border-2 border-white px-4 py-2 hover:bg-white hover:text-black transition font-bold">UPLOAD IMAGE</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 z-10">
        <div className="grid grid-cols-3 gap-2 bg-zinc-900/60 p-2 rounded-xl border border-zinc-800 shadow-inner">
            {(['sepia', 'neon', 'noir', 'spidey', 'matrix', 'glitch'] as FilterMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`py-2 text-[10px] font-bold uppercase rounded-md transition-all duration-200 
                  ${mode === m 
                    ? 'bg-teal-600 text-white shadow-[0_0_10px_rgba(13,148,136,0.5)] scale-95 ring-1 ring-teal-300' 
                    : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700 hover:text-zinc-200'}`}
              >
                {getModeLabel(m)}
              </button>
            ))}
        </div>

        <div className="flex justify-between items-center px-4">
             <button onClick={() => fileInputRef.current?.click()} className="text-zinc-600 text-xs font-bold hover:text-zinc-300 flex items-center gap-1 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                EJECT
             </button>

            <div className="relative group cursor-pointer active:scale-95 transition-transform" onClick={handleShutter}>
                <div className="absolute inset-0 bg-red-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-red-500 to-red-800 rounded-full border-4 border-zinc-800 shadow-[0_6px_0_rgb(60,20,20)] active:shadow-none active:translate-y-1.5 transition-all flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border border-red-400/30 bg-red-600/50"></div>
                </div>
            </div>

            <div className="w-12"></div> 
        </div>
      </div>

      <div className="absolute bottom-[-14px] left-1/2 -translate-x-1/2 w-56 h-4 bg-black rounded-b-xl border-x-4 border-b-4 border-zinc-900 z-30 shadow-2xl"></div>

      {/* --- PRINT ANIMATION & DOWNLOAD --- */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md h-[750px] pointer-events-none z-[60] flex justify-center items-end pb-8">
        {printingState !== 'idle' && (
          <div 
            key={printId} 
            className="relative bg-[#fdfdfd] p-3 pt-3 pb-14 shadow-[0_25px_50px_rgba(0,0,0,0.6)] origin-top pointer-events-auto transition-transform hover:scale-105 hover:rotate-0"
            style={{ 
              animation: 'slide-out 1s cubic-bezier(0.25, 1, 0.5, 1) forwards',
              width: '280px',
            }}
          >
            {/* The Print Content */}
            <div className="w-full aspect-square bg-black overflow-hidden relative border border-zinc-200">
              <img src={imageSrc} className="w-full h-full object-cover" style={{ filter: filters[mode] }} />
              {getOverlayContent()}
              <div className="absolute inset-0 bg-[#111]" style={{ transition: 'opacity 3s ease-in-out', opacity: printingState === 'printing' ? 1 : 0 }}></div>
            </div>

            {/* DOWNLOAD BUTTON - HIGH CONTRAST */}
            {printingState === 'developed' && (
                <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-auto">
                    <button 
                        onClick={downloadPhoto} 
                        className="bg-black text-white text-[10px] font-bold tracking-widest px-6 py-2 rounded-full shadow-lg hover:bg-zinc-800 hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                       </svg>
                       SAVE PRINT
                    </button>
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RetroCamera;