
import { Progress } from "@/components/ui/progress";

const SkillsSection = () => {
  const technicalSkills = [
    { name: "Penetration Testing", level: 95 },
    { name: "Malware Analysis", level: 88 },
    { name: "Network Security", level: 92 },
    { name: "Secure Coding", level: 85 },
    { name: "Reverse Engineering", level: 90 },
    { name: "Cloud Security", level: 82 }
  ];
  
  const developmentSkills = [
    { name: "Python", level: 95 },
    { name: "C/C++", level: 88 },
    { name: "JavaScript", level: 86 },
    { name: "Go", level: 80 },
    { name: "Bash Scripting", level: 92 },
    { name: "Rust", level: 75 }
  ];
  
  const toolsExpertise = [
    "Burp Suite", "IDA Pro", "Wireshark", "Metasploit",
    "GDB", "Ghidra", "Docker", "Kubernetes",
    "AWS Security Tools", "SIEM Systems"
  ];

  const renderSkillBar = (skill: { name: string, level: number }, index: number) => (
    <div 
      key={skill.name} 
      className="mb-6"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-sm">{skill.name}</span>
        <span className="font-mono text-xs text-cyber-light-gray">{skill.level}%</span>
      </div>
      <div className="relative">
        <Progress 
          value={skill.level} 
          className="h-2 bg-cyber-gray" 
        />
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyber-green to-cyber-blue opacity-30" 
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 bg-cyber-dark/50">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Skills</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
          <div>
            <h3 className="text-xl font-mono text-cyber-blue mb-6">Security Expertise</h3>
            {technicalSkills.map(renderSkillBar)}
          </div>
          
          <div>
            <h3 className="text-xl font-mono text-cyber-blue mb-6">Development</h3>
            {developmentSkills.map(renderSkillBar)}
          </div>
        </div>
        
        <div className="mt-12">
          <h3 className="text-xl font-mono text-cyber-blue mb-6">Tools & Technologies</h3>
          <div className="flex flex-wrap gap-3">
            {toolsExpertise.map((tool, index) => (
              <div 
                key={tool}
                className="px-4 py-2 bg-cyber-gray rounded-md border border-cyber-green/20 font-mono text-sm
                         hover:border-cyber-green/70 transition-all cursor-default"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 tech-card">
          <h3 className="text-xl font-mono text-cyber-blue mb-4">Certifications & Education</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="h-2 w-2 rounded-full bg-cyber-green mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium">OSCP (Offensive Security Certified Professional)</p>
                <p className="text-cyber-light-gray text-sm">Offensive Security</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="h-2 w-2 rounded-full bg-cyber-green mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium">CISSP (Certified Information Systems Security Professional)</p>
                <p className="text-cyber-light-gray text-sm">ISC²</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="h-2 w-2 rounded-full bg-cyber-green mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium">M.S. Computer Science, Cybersecurity Specialization</p>
                <p className="text-cyber-light-gray text-sm">Georgia Institute of Technology</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="h-2 w-2 rounded-full bg-cyber-green mt-2 mr-3 flex-shrink-0"></div>
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
