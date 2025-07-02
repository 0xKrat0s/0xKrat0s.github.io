
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const ArticlesSection = () => {
  const articles = [
    {
      title: "NoSQL injection",
      excerpt: "NoSQL injection is a vulnerability where an attacker is able to interfere with the queries that an application makes to a NoSQL database.",
      url: "https://blog.amalpk.in/nosql-injection",
      tags: ["Web Security", "Bug Bounty", "Injection"]
    },
    {
      title: "Client Side Path Traversal (CSPT)",
      excerpt: "Exploring Client-Side Path Traversal (CSPT): How Attackers Exploit API Requests to Bypass Security and Exfiltrate Data.",
      url: "https://medium.com/bug-bounty-hunting/client-side-path-traversal-cspt-a-deep-dive-into-an-overlooked-vulnerability-cdf91baca715",
      tags: ["Web Security", "Bug Bounty"]
    },
    {
      title: "PHP Type Juggling Vulnerabilities",
      excerpt: "How Attackers Exploit Loose Comparisons PHP type juggling that leads to security vulnerabilities.",
      url: "https://0xkratos.medium.com/php-type-juggling-vulnerabilities-how-attackers-exploit-loose-comparisons-e4e0c78ec9e6",
      tags: ["Web Security", "Development", "PHP"]
    },
    {
      title: "Web Cache Deception",
      excerpt: "Understanding and Mitigating Security Risks Learn about Web Cache Deception and Cache Poisoning.",
      url: "https://blog.amalpk.in/web-cache-deception",
      tags: ["Web Security", "Bug Bounty"]
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
