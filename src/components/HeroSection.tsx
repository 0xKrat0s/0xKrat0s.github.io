
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
    
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
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
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = Math.min(canvas.width, canvas.height) * 0.25;
    
    let angle = 0;
    
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
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
      
      angle += 0.01;
      requestAnimationFrame(render);
    }
    
    const resizeObserver = new ResizeObserver(() => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    });
    
    resizeObserver.observe(canvas);
    render();
    
    return () => {
      resizeObserver.disconnect();
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
                <span>// Security Researcher & Developer</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-mono">
                Hello, I'm <span className="text-cyber-blue">CyberDev</span>
              </h1>
              
              <p className="text-lg md:text-xl mb-8 text-cyber-light-gray max-w-lg">
                Specializing in vulnerability research and secure application development with a focus on critical infrastructure protection. I transform complex security concepts into accessible knowledge for the tech community.
              </p>
              
              <div className="flex gap-4">
                <Button className="bg-cyber-blue text-black hover:bg-cyber-blue/80 font-mono">
                  View Projects
                </Button>
                <Button variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10 font-mono">
                  Contact Me
                </Button>
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
