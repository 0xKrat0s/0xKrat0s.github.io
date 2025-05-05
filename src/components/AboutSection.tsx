
import { ShieldCheck, ChevronDown } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-cyber-dark/50">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">About Me</h2>
        
        <div className="max-w-4xl mx-auto backdrop-blur-md bg-cyber-gray/20 border border-cyber-blue/30 rounded-lg p-8 overflow-hidden shadow-[0_0_15px_rgba(14,165,233,0.15)] relative">
          {/* Subtle glow effects */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyber-blue/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyber-blue/10 rounded-full blur-3xl"></div>
          
          <div className="space-y-6 relative z-10">
            <div className="flex items-start gap-4">
              <ShieldCheck className="text-cyber-blue mt-1 h-8 w-8 flex-shrink-0" />
              <p className="text-cyber-light-gray text-lg leading-relaxed">
                My name is Amal, I work in cybersecurity, focusing on keeping applications safe and finding vulnerabilities. I'm always learning and growing in this field and currently working as a Security Analyst. I specialize in application security and am deeply committed to advancing my career in this field. My expertise lies in identifying and resolving security vulnerabilities, which I approach with a strong passion for continuous learning. I engage in hands-on projects, collaborative efforts, and cutting-edge research to stay at the forefront of the industry.
              </p>
            </div>
            
            <p className="text-cyber-light-gray text-lg leading-relaxed ml-12">
              In my role as a Security Analyst, I focus on analyzing and fortifying applications to protect them from potential threats. My work involves not only technical skills but also effective communication, which ensures smooth collaboration with team members and adaptability in fast-paced environments.
            </p>
            
            <p className="text-cyber-light-gray text-lg leading-relaxed ml-12">
              I have consistently excelled in Capture The Flag (CTF) challenges, which showcase my ability to tackle complex security problems both independently and as part of a team. My goal is to contribute meaningfully to the cybersecurity field, leveraging my skills and experience to drive progress and innovation.
            </p>
          </div>
          
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 mt-8 text-cyber-blue/70 animate-bounce">
            <ChevronDown className="h-6 w-6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
