
import { ArrowRight, Shield } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-cyber-dark/50">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">About Me</h2>
        
        <div className="relative max-w-4xl mx-auto backdrop-blur-md bg-cyber-gray/40 border border-cyber-blue/30 rounded-lg p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-blue/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyber-blue/5 rounded-full blur-3xl"></div>
          
          <div className="flex items-start space-x-4">
            <Shield className="text-cyber-blue mt-1 h-8 w-8 flex-shrink-0" />
            <p className="text-cyber-light-gray text-lg">
              With over a decade of experience in cybersecurity, I've dedicated my career to identifying and resolving security vulnerabilities in critical systems. My journey began with network security analysis and evolved into specialized research on zero-day exploits and advanced persistent threats. I believe in the principle of security through transparency rather than obscurity and currently focus on the intersection of artificial intelligence and security—particularly the vulnerabilities in machine learning systems and how they can be exploited or defended.
            </p>
          </div>
          
          <div className="absolute -bottom-2 -right-2 w-24 h-24">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-cyber-blue/10 blur-lg rounded-full"></div>
              <ArrowRight className="absolute bottom-4 right-4 text-cyber-blue h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
