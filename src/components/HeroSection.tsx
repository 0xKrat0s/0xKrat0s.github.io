
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Simple 3D wireframe cube animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 3D cube vertices
    const vertices = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1]
    ];
    
    // Edges
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];
    
    // Geometry depends on canvas size, so recompute on every resize
    let centerX = 0;
    let centerY = 0;
    let scale = 0;
    
    const resizeCanvas = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const cssWidth = canvas.clientWidth;
      const cssHeight = canvas.clientHeight;
      
      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      centerX = cssWidth / 2;
      centerY = cssHeight / 2;
      scale = Math.min(cssWidth, cssHeight) * 0.25;
    };
    
    let angle = 0;
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      
      // Rotate and project vertices
      const rotatedVertices = vertices.map(([x, y, z]) => {
        // Rotate around Y axis
        const rotY = [
          x * Math.cos(angle) + z * Math.sin(angle),
          y,
          -x * Math.sin(angle) + z * Math.cos(angle)
        ];
        
        // Rotate around X axis
        const rotX = [
          rotY[0],
          rotY[1] * Math.cos(angle * 0.7) - rotY[2] * Math.sin(angle * 0.7),
          rotY[1] * Math.sin(angle * 0.7) + rotY[2] * Math.cos(angle * 0.7)
        ];
        
        // Project to 2D
        const z2d = 4 + rotX[2];
        const scale2d = scale / z2d;
        
        return {
          x: centerX + rotX[0] * scale2d,
          y: centerY + rotX[1] * scale2d,
          z: rotX[2]
        };
      });
      
      // Draw edges
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.8)';
      
      edges.forEach(([a, b]) => {
        const alpha = Math.min(
          1, 
          (rotatedVertices[a].z + 2) * 0.25 + (rotatedVertices[b].z + 2) * 0.25
        );
        
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(rotatedVertices[a].x, rotatedVertices[a].y);
        ctx.lineTo(rotatedVertices[b].x, rotatedVertices[b].y);
        ctx.stroke();
      });
      
      // Draw vertices
      ctx.fillStyle = '#1EAEDB';
      rotatedVertices.forEach(({ x, y, z }) => {
        const alpha = Math.min(1, (z + 2) * 0.5);
        const size = Math.max(3, 5 * ((z + 2) * 0.25));
        
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      ctx.globalAlpha = 1;
    };
    
    const animate = () => {
      angle += 0.01;
      render();
      frameId = requestAnimationFrame(animate);
    };
    
    let frameId = 0;
    resizeCanvas();
    
    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Respect reduced motion: draw exactly one static frame, no animation loop
      render();
    } else {
      frameId = requestAnimationFrame(animate);
    }
    
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      // Re-render immediately so the cube recenters without waiting a frame
      if (!prefersReducedMotion) {
        cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(animate);
      }
    });
    
    resizeObserver.observe(canvas);
    
    const motionQuery =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;
    const handleMotionChange = (event: MediaQueryListEvent) => {
      cancelAnimationFrame(frameId);
      if (event.matches) {
        render();
      } else {
        frameId = requestAnimationFrame(animate);
      }
    };
    motionQuery?.addEventListener('change', handleMotionChange);
    
    return () => {
      resizeObserver.disconnect();
      motionQuery?.removeEventListener('change', handleMotionChange);
      cancelAnimationFrame(frameId);
    };
  }, []);
  
  return (
    <section id="home" className="min-h-screen pt-16 flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-1/2">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-cyber-blue font-mono mb-2">
                <div className="h-1 w-1 rounded-full bg-cyber-blue animate-pulse-blue"></div>
                <span>// Security Researcher & Analyst</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-mono">
                Hello, I'm <span className="text-cyber-blue">Amal</span>
              </h1>
              
              <p className="text-lg md:text-xl mb-8 text-cyber-light-gray max-w-lg">
                Specializing in application security, vulnerability assessment, and penetration testing.
              </p>
              
              <div className="flex gap-4">
                <a href="/Amalpk_Resume.pdf">
                <Button className="bg-cyber-blue text-black hover:bg-cyber-blue/80 font-mono">
                  Download Resume
                </Button>
                </a>
                <a href="#contact">
                <Button variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10 font-mono">
                  Contact Me
                </Button>
                </a>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 h-64 md:h-96">
            <div className="relative w-full h-full overflow-hidden rounded-lg border border-cyber-gray">
              <canvas ref={canvasRef} className="w-full h-full" />
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-cyber-dark to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
