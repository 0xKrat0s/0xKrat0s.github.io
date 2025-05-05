
import { Briefcase } from "lucide-react";

const ExperienceSection = () => {
  const experiences = [
    {
      position: "Chief Security Researcher",
      company: "SecureTech Systems",
      period: "2020 - Present",
      responsibilities: [
        "Leading research on emerging threats in cloud security environments",
        "Developing novel detection techniques for sophisticated zero-day attacks",
        "Publishing security advisories and collaborating with industry partners on vulnerability mitigation"
      ]
    },
    {
      position: "Security Engineer Team Lead",
      company: "CyberDefense Inc.",
      period: "2017 - 2020",
      responsibilities: [
        "Managed a team of 8 security engineers focused on threat detection",
        "Implemented advanced endpoint protection solutions across enterprise networks",
        "Reduced incident response time by 65% through automation and streamlined protocols"
      ]
    },
    {
      position: "Penetration Tester",
      company: "Ethical Hack Consulting",
      period: "2014 - 2017",
      responsibilities: [
        "Conducted comprehensive security assessments for Fortune 500 clients",
        "Specialized in web application and network infrastructure testing",
        "Discovered and responsibly disclosed 13 critical vulnerabilities in widely-used systems"
      ]
    },
    {
      position: "Security Analyst",
      company: "Global Financial Services",
      period: "2012 - 2014",
      responsibilities: [
        "Monitored security infrastructure and responded to incidents in a 24/7 SOC environment",
        "Developed custom detection rules for the SIEM platform",
        "Led security awareness training for over 5,000 employees"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Experience</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative pl-8 border-l border-cyber-blue/30">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className="mb-12 relative"
              >
                <div className="absolute -left-10 mt-1.5 h-5 w-5 rounded-full bg-cyber-gray border-2 border-cyber-blue flex items-center justify-center">
                  <Briefcase className="h-3 w-3 text-cyber-blue" />
                </div>
                
                <div className="tech-card">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                    <h3 className="text-xl font-mono text-cyber-blue">{exp.position}</h3>
                    <span className="text-sm text-cyber-light-gray font-mono">{exp.period}</span>
                  </div>
                  
                  <p className="text-cyber-bright-blue mb-4 font-medium">{exp.company}</p>
                  
                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyber-blue mt-2 mr-2.5 flex-shrink-0"></span>
                        <span className="text-cyber-light-gray">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
