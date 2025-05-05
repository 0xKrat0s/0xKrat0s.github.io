
import { ArrowRight, Shield } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-cyber-dark/50">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">About Me</h2>
        
        <div className="tech-card backdrop-blur-sm bg-cyber-gray/80 border-cyber-blue/20 p-6 relative overflow-hidden group max-w-4xl mx-auto">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyber-blue/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <Shield className="text-cyber-blue mb-4 h-8 w-8" />
          <p className="text-cyber-light-gray">
            With over a decade of experience in cybersecurity, I've dedicated my career to identifying and resolving security vulnerabilities in critical systems. My journey began with network security analysis and evolved into specialized research on zero-day exploits and advanced persistent threats. I believe in the principle of security through transparency rather than obscurity and currently focus on the intersection of artificial intelligence and security—particularly the vulnerabilities in machine learning systems and how they can be exploited or defended. I hold multiple security certifications including OSCP and CISSP, and regularly contribute to open security standards.
          </p>
          <div className="absolute bottom-4 right-4">
            <ArrowRight className="text-cyber-blue/40 h-6 w-6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
