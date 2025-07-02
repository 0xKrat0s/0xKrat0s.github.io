
import { Briefcase } from "lucide-react";

const ExperienceSection = () => {
  const experiences = [
    {
      position: "Junior Security Analyst",
      company: "HackIT Technology and Advisory Services",
      period: "Jan 2025 - Present",
      responsibilities: [
        "Performed penetration testing on web apps, mobile apps, APIs, and cloud environments, identifying vulnerabilities and helping teams fix them",
        "Assessed infrastructure and network security to find misconfigurations and potential risks",
        "Handled clients throughout the project life cycle — from understanding their security needs to sharing findings and guiding them through remediation",
        "Wrote clear and detailed reports explaining security issues and suggested practical solutions",
        "Ensured that assessments were aligned with industry standards and frameworks such as the OWASP Top 10, NIST, CERT-IN guidelines, and other relevant compliance requirements"
      ]
    },
    {
      position: "Security Analyst - Intern",
      company: "HackIT Technology and Advisory Services",
      period: "Sep 2024 – Dec 2024",
      responsibilities: [
        "Conducted penetration testing on web applications (Black Box, Grey Box, White Box) to find and report vulnerabilities",
        "Tested APIs for vulnerabilities and secured integrations",
        "Identified and fixed security flaws in Android applications",
        "Performed Thick Client Pentesting to identify application-level vulnerabilities",
        "Documented findings in detailed reports, providing clear and actionable recommendations for remediation"
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
