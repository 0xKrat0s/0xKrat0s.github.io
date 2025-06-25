
import { Shield, Cpu, Globe, Lock } from "lucide-react";

const SkillsSection = () => {
  const securitySkills = [
    "Application Security (Web,Mobile,API)", 
    "Thick Client PT",
    "Network Secuirty", 
    "Cloud Security", 
    "Secure Coding", 
    "Reverse Engineering", 
    "Security Frameworks and Standards: OWASP, NIST, CERT-IN"
  ];
  
  const toolsExpertise = [
    "Burp Suite", "IDA Pro", "Wireshark", "Metasploit",
    "Nessus", "Ghidra", "Docker", "Postman",
    "Opengrep", "Codeql"
  ];

  return (
    <section id="skills" className="py-20 bg-cyber-dark/50">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Skills</h2>
        
        <div className="relative max-w-4xl mx-auto backdrop-blur-lg bg-gradient-to-br from-cyber-gray/50 to-cyber-gray/30 border-l border-t border-cyber-blue/20 rounded-lg p-8 shadow-lg overflow-hidden mb-12">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyber-blue/5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyber-blue/5 rounded-full blur-2xl"></div>
          
          <div className="flex items-center mb-6">
            <Shield className="text-cyber-blue mr-3 h-6 w-6" />
            <h3 className="text-xl font-mono text-cyber-bright-blue">Security Expertise</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {securitySkills.map((skill) => (
              <div key={skill} className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-cyber-blue mr-2.5"></span>
                <span className="text-cyber-light-gray">{skill}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <h3 className="text-xl font-mono text-cyber-blue mb-6 flex items-center">
            <Cpu className="mr-2 h-5 w-5" />
            Tools & Technologies
          </h3>
          
          <div className="flex flex-wrap gap-3">
            {toolsExpertise.map((tool) => (
              <div 
                key={tool}
                className="px-4 py-2 bg-cyber-gray/30 backdrop-blur-sm rounded-md border-b border-r border-cyber-blue/30 font-mono text-sm
                         hover:border-cyber-blue/70 transition-all duration-300 cursor-default hover:bg-cyber-gray/50"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 relative max-w-4xl mx-auto backdrop-blur-md bg-cyber-gray/40 border border-cyber-blue/20 rounded-lg p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-blue/5 rounded-full blur-3xl"></div>
          
          <h3 className="text-xl font-mono text-cyber-blue mb-6 flex items-center">
            <Lock className="mr-2 h-5 w-5" />
            Certifications & Education
          </h3>
          
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="h-2 w-2 rounded-full bg-cyber-blue mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium">CEH v12 (Certified Ethical Hacker)</p>
                <p className="text-cyber-light-gray text-sm">EC-Council</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="h-2 w-2 rounded-full bg-cyber-blue mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium">CAP (Certified Appsec Practitioner)</p>
                <p className="text-cyber-light-gray text-sm">The Secops Group</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="h-2 w-2 rounded-full bg-cyber-blue mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium"> CNSP (Certified Network Security Practitioner)</p>
                <p className="text-cyber-light-gray text-sm">The Secops Group</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="h-2 w-2 rounded-full bg-cyber-blue mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium">Dante, POO (HackTheBox Pro Labs)</p>
                <p className="text-cyber-light-gray text-sm">HackTheBox</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
