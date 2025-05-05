
const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-cyber-dark/50">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">About Me</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="tech-card">
            <h3 className="text-lg font-mono text-cyber-blue mb-3 flex items-center">
              <span className="inline-block h-2 w-2 bg-cyber-blue rounded-full mr-2"></span>
              Background
            </h3>
            <p className="text-cyber-light-gray">
              With over a decade of experience in cybersecurity, I've dedicated my career to identifying and resolving security vulnerabilities in critical systems. My journey began with network security analysis and evolved into specialized research on zero-day exploits and advanced persistent threats. I hold multiple security certifications including OSCP and CISSP, and regularly contribute to open security standards.
            </p>
          </div>
          
          <div className="tech-card">
            <h3 className="text-lg font-mono text-cyber-blue mb-3 flex items-center">
              <span className="inline-block h-2 w-2 bg-cyber-blue rounded-full mr-2"></span>
              Philosophy
            </h3>
            <p className="text-cyber-light-gray">
              I believe in the principle of security through transparency rather than obscurity. My work focuses on responsible disclosure and collaborative defense strategies that strengthen our digital ecosystem. I advocate for privacy-first design and user empowerment through education. Security isn't merely a technical challenge but a human one—requiring empathy in design and clear communication about risks and mitigations to bridge the gap between technical capabilities and user understanding.
            </p>
          </div>
          
          <div className="tech-card">
            <h3 className="text-lg font-mono text-cyber-blue mb-3 flex items-center">
              <span className="inline-block h-2 w-2 bg-cyber-blue rounded-full mr-2"></span>
              Current Focus
            </h3>
            <p className="text-cyber-light-gray">
              Currently, I'm exploring the intersection of artificial intelligence and security—particularly the vulnerabilities in machine learning systems and how they can be exploited or defended. I'm developing open-source tools for automated vulnerability assessment in cloud environments and researching novel approaches to detect sophisticated supply chain attacks. Additionally, I contribute to several cybersecurity communities through mentorship programs and technical workshops focusing on practical, hands-on security skills.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
