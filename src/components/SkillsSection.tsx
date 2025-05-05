
import { Shield } from "lucide-react";

const SkillsSection = () => {
  const securitySkills = [
    "Penetration Testing", 
    "Malware Analysis", 
    "Network Security", 
    "Secure Coding", 
    "Reverse Engineering", 
    "Cloud Security"
  ];
  
  const toolsExpertise = [
    "Burp Suite", "IDA Pro", "Wireshark", "Metasploit",
    "GDB", "Ghidra", "Docker", "Kubernetes",
    "AWS Security Tools", "SIEM Systems"
  ];

  return (
    <section id="skills" className="py-20 bg-cyber-dark/50">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Skills</h2>
        
        <div className="tech-card bg-gradient-to-br from-cyber-gray/90 to-cyber-gray/70 backdrop-filter backdrop-blur-sm p-6 max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Shield className="text-cyber-blue mr-3 h-6 w-6" />
            <h3 className="text-xl font-mono text-cyber-bright-blue">Security Expertise</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {securitySkills.map((skill) => (
              <div key={skill} className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-cyber-blue mr-2"></span>
                <span className="text-cyber-light-gray">{skill}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12">
          <h3 className="text-xl font-mono text-cyber-blue mb-6">Tools & Technologies</h3>
          <div className="flex flex-wrap gap-3">
            {toolsExpertise.map((tool) => (
              <div 
                key={tool}
                className="px-4 py-2 bg-cyber-gray/60 rounded-md border border-cyber-blue/20 font-mono text-sm
                         hover:border-cyber-blue/70 transition-all cursor-default hover:bg-cyber-gray/80"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 tech-card bg-gradient-to-br from-cyber-gray/90 to-cyber-gray/70 backdrop-filter backdrop-blur-sm">
          <h3 className="text-xl font-mono text-cyber-blue mb-4">Certifications & Education</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="h-2 w-2 rounded-full bg-cyber-blue mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium">OSCP (Offensive Security Certified Professional)</p>
                <p className="text-cyber-light-gray text-sm">Offensive Security</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="h-2 w-2 rounded-full bg-cyber-blue mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium">CISSP (Certified Information Systems Security Professional)</p>
                <p className="text-cyber-light-gray text-sm">ISC²</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="h-2 w-2 rounded-full bg-cyber-blue mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium">M.S. Computer Science, Cybersecurity Specialization</p>
                <p className="text-cyber-light-gray text-sm">Georgia Institute of Technology</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="h-2 w-2 rounded-full bg-cyber-blue mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium">B.S. Computer Science</p>
                <p className="text-cyber-light-gray text-sm">Massachusetts Institute of Technology</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
