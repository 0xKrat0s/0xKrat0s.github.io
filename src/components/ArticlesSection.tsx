
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const ArticlesSection = () => {
  const articles = [
    {
      title: "Exploiting Zero-Day Vulnerabilities in IoT Devices",
      excerpt: "An analysis of recently discovered security flaws in popular smart home systems and how attackers could leverage them for remote access.",
      url: "https://medium.com/cybersecurity/iot-vulnerabilities",
      tags: ["IOT", "Zero-Day", "Research"]
    },
    {
      title: "Secure Coding Practices for Modern Web Applications",
      excerpt: "A comprehensive guide to implementing security-first development approaches that prevent common vulnerabilities in web frameworks.",
      url: "https://dev.to/security/secure-coding",
      tags: ["Web Security", "Development"]
    },
    {
      title: "Breaking Encryption: The State of Quantum Computing Threats",
      excerpt: "Evaluating the current progress in quantum computing and its implications for the future of cryptographic security systems.",
      url: "https://infosec-magazine.com/quantum-threats",
      tags: ["Encryption", "Quantum", "Research"]
    },
    {
      title: "Inside the Dark Web: Tracking Threat Actors and Marketplaces",
      excerpt: "A deep dive into methodologies for monitoring criminal activities and identifying emerging threats in underground forums.",
      url: "https://cybernews.com/dark-web-analysis",
      tags: ["Threat Intel", "Dark Web"]
    }
  ];

  return (
    <section id="articles" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {articles.map((article, index) => (
            <div 
              key={index}
              className="tech-card flex flex-col h-full group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-2">
                <div className="h-2 w-2 rounded-full bg-cyber-green mr-2"></div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="text-xs font-mono px-2 py-1 rounded-full bg-cyber-blue/10 text-cyber-blue"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group cursor-pointer"
              >
                <h3 className="text-lg font-mono font-medium mb-2 text-white group-hover:text-cyber-green transition-colors relative inline-block">
                  {article.title}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyber-green transition-all duration-300 group-hover:w-full"></span>
                </h3>
              </a>
              
              <p className="text-cyber-light-gray text-sm mb-4 flex-grow">
                {article.excerpt}
              </p>
              
              <Button 
                asChild
                variant="ghost" 
                className="font-mono text-cyber-green hover:bg-cyber-green/10 p-0 h-auto mt-auto justify-start"
              >
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <span className="mr-2">Read Article</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
