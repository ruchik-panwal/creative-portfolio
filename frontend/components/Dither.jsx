'use client'
import { useEffect, useRef } from "react";

export default function AnimatedDitherEffect({ 
  imageUrl, 
  hoverRadius = 400, 
  hoverBrightness = 0.90,
  onLoadComplete,
  isLoaded // <--- Accept the new prop here
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0, active: false, opacity: 0 });
  const rafRef = useRef(null);

  const frameCount = 3; 
  const animationSpeed = 350; 

  useEffect(() => {
    let isActive = true;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const img = new Image();
    
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    const bwFrames = Array.from({ length: frameCount }, () => document.createElement("canvas"));
    const staticColorCanvas = document.createElement("canvas");
    const hoverCanvas = document.createElement("canvas");
    const hoverCtx = hoverCanvas.getContext("2d", { willReadFrequently: true });

    img.onload = () => {
      if (!isActive) return;

      const displayWidth = container.clientWidth || img.width;
      const displayHeight = container.clientHeight || img.height;
      
      canvas.width = hoverCanvas.width = staticColorCanvas.width = displayWidth;
      canvas.height = hoverCanvas.height = staticColorCanvas.height = displayHeight;
      
      const scale = Math.max(displayWidth / img.width, displayHeight / img.height);
      const drawW = img.width * scale;
      const drawH = img.height * scale;
      const startX = (displayWidth - drawW) / 2;
      const startY = (displayHeight - drawH) / 2;
      
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = displayWidth;
      tempCanvas.height = displayHeight;
      const tempCtx = tempCanvas.getContext("2d");
      tempCtx.drawImage(img, startX, startY, drawW, drawH);
      const originalImageData = tempCtx.getImageData(0, 0, displayWidth, displayHeight);
      
      const noiseAmount = 15; 
      const totalPixels = displayWidth * displayHeight;
      const noiseMap = new Float32Array(totalPixels);
      for (let i = 0; i < totalPixels; i++) {
        noiseMap[i] = (Math.random() - 0.5) * noiseAmount;
      }
      
      const generateDither = (isColorMode, errorVal, applyNoise, frameIndex = 0) => {
        const imgData = new ImageData(
          new Uint8ClampedArray(originalImageData.data), 
          displayWidth, 
          displayHeight
        );
        const data = imgData.data;
        const workingData = new Float32Array(originalImageData.data);

        const frameOffset = applyNoise ? Math.floor((totalPixels / frameCount) * frameIndex) : 0;

        const addError = (x, y, errR, errG, errB, factor) => {
          if (x < 0 || x >= displayWidth || y >= displayHeight) return;
          const index = (y * displayWidth + x) * errorVal;
          
          workingData[index] += errR * factor;     
          workingData[index + 1] += errG * factor; 
          workingData[index + 2] += errB * factor; 
        };

        for (let y = 0; y < displayHeight; y++) {
          for (let x = 0; x < displayWidth; x++) {
            const pixelIndex = y * displayWidth + x;
            const index = pixelIndex * 4;
            
            const noise = applyNoise ? noiseMap[(pixelIndex + frameOffset) % totalPixels] : 0;
            
            if (isColorMode) {
              const oldR = (workingData[index] * hoverBrightness) + noise;
              const oldG = (workingData[index + 1] * hoverBrightness) + noise;
              const oldB = (workingData[index + 2] * hoverBrightness) + noise;
              
              const newR = oldR < 128 ? 0 : 255;
              const newG = oldG < 128 ? 0 : 255;
              const newB = oldB < 128 ? 0 : 255;
              
              data[index] = newR;
              data[index + 1] = newG;
              data[index + 2] = newB;
              data[index + 3] = 255; 
              
              const errR = oldR - newR;
              const errG = oldG - newG;
              const errB = oldB - newB;
              
              addError(x + 1, y, errR, errG, errB, 7 / 16);     
              addError(x - 1, y + 1, errR, errG, errB, 3 / 16); 
              addError(x, y + 1, errR, errG, errB, 5 / 16);     
              addError(x + 1, y + 1, errR, errG, errB, 1 / 16); 
              
            } else {
              const oldR = workingData[index];
              const oldG = workingData[index + 1];
              const oldB = workingData[index + 2];
              
              const oldPixel = ((oldR + oldG + oldB) / 3) + noise;
              const newPixel = oldPixel < 128 ? 0 : 255;
              
              data[index] = newPixel;
              data[index + 1] = newPixel;
              data[index + 2] = newPixel;
              data[index + 3] = 255; 
              
              const error = oldPixel - newPixel;
              
              addError(x + 1, y, error, error, error, 7 / 16);     
              addError(x - 1, y + 1, error, error, error, 3 / 16); 
              addError(x, y + 1, error, error, error, 5 / 16);     
              addError(x + 1, y + 1, error, error, error, 1 / 16); 
            }
          }
        }
        return imgData;
      };

      staticColorCanvas.getContext("2d").putImageData(generateDither(true, 4, false), 0, 0);

      for (let i = 0; i < frameCount; i++) {
        bwFrames[i].width = displayWidth;
        bwFrames[i].height = displayHeight;
        bwFrames[i].getContext("2d").putImageData(generateDither(false, 10, true, i), 0, 0);
      }

      if (onLoadComplete) {
        onLoadComplete();
      }

      const render = () => {
        if (!isActive) return;

        const mouse = mouseRef.current;
        mouse.x += (mouse.tx - mouse.x) * 0.15;
        mouse.y += (mouse.ty - mouse.y) * 0.15;
        
        const targetOpacity = mouse.active ? 1 : 0;
        mouse.opacity += (targetOpacity - mouse.opacity) * 0.1;

        const currentFrameIndex = Math.floor(Date.now() / animationSpeed) % frameCount;
        const currentBwFrame = bwFrames[currentFrameIndex];

        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(currentBwFrame, 0, 0);

        if (mouse.opacity > 0.01) {
          hoverCtx.clearRect(0, 0, displayWidth, displayHeight);
          
          const scaleX = displayWidth / container.clientWidth;
          const scaleY = displayHeight / container.clientHeight;
          const drawX = mouse.x * scaleX;
          const drawY = mouse.y * scaleY;
          const drawRadius = hoverRadius * Math.max(scaleX, scaleY);
          
          const gradient = hoverCtx.createRadialGradient(
            drawX, drawY, 0, 
            drawX, drawY, drawRadius
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${mouse.opacity})`);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          
          hoverCtx.globalCompositeOperation = "source-over";
          hoverCtx.fillStyle = gradient;
          hoverCtx.fillRect(0, 0, displayWidth, displayHeight);

          hoverCtx.globalCompositeOperation = "source-in";
          hoverCtx.drawImage(staticColorCanvas, 0, 0);

          ctx.drawImage(hoverCanvas, 0, 0);
        }

        rafRef.current = requestAnimationFrame(render);
      };

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(render);
    };

    return () => {
      isActive = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [imageUrl, hoverRadius, hoverBrightness, onLoadComplete]);

  const updateMouse = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current.tx = e.clientX - rect.left;
    mouseRef.current.ty = e.clientY - rect.top;
  };

  return (
    <div 
      ref={containerRef}
      // ADDED: cursor-shrink, dot-shrink, and cursor-none
      className={`w-full h-full overflow-hidden touch-none cursor-none ${
        isLoaded ? "cursor-shrink dot-shrink rounded-[20px]" : "pointer-events-none rounded-none"
      }`}
      onPointerEnter={(e) => {
        mouseRef.current.active = true;
        const rect = canvasRef.current.getBoundingClientRect();
        mouseRef.current.x = mouseRef.current.tx = e.clientX - rect.left;
        mouseRef.current.y = mouseRef.current.ty = e.clientY - rect.top;
      }}
      onPointerMove={updateMouse}
      onPointerLeave={() => mouseRef.current.active = false}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block"
        style={{ 
          imageRendering: 'pixelated', 
          objectFit: 'cover' 
        }}
      />
    </div>
  );
}