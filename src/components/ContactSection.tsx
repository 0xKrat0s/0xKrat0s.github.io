
import { Mail, Twitter, Github, Linkedin, Globe } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Contact</h2>
        
        <div className="mt-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-mono text-cyber-blue mb-6">Get In Touch</h3>
          <p className="text-cyber-light-gray mb-8">
            Have a security concern or interested in collaboration? Feel free to reach out through any of the channels below.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
            <div className="flex items-start group">
              <div className="bg-cyber-gray p-3 rounded-md mr-4 group-hover:bg-cyber-blue/10 transition-colors duration-300">
                <Mail className="text-cyber-blue" />
              </div>
              <div>
                <h4 className="text-lg font-mono mb-1">Email</h4>
                <a href="mailto:contact@cybersecurity.dev" className="text-cyber-blue hover:underline">
                  contact@cybersecurity.dev
                </a>
              </div>
            </div>
            
            <div className="flex items-start group">
              <div className="bg-cyber-gray p-3 rounded-md mr-4 group-hover:bg-cyber-blue/10 transition-colors duration-300">
                <Twitter className="text-cyber-blue" />
              </div>
              <div>
                <h4 className="text-lg font-mono mb-1">Twitter</h4>
                <a href="https://twitter.com/cybersecurity_dev" target="_blank" rel="noopener noreferrer" className="text-cyber-blue hover:underline">
                  @cybersecurity_dev
                </a>
              </div>
            </div>
            
            <div className="flex items-start group">
              <div className="bg-cyber-gray p-3 rounded-md mr-4 group-hover:bg-cyber-blue/10 transition-colors duration-300">
                <Globe className="text-cyber-blue" />
              </div>
              <div>
                <h4 className="text-lg font-mono mb-1">Bluesky</h4>
                <a href="https://bsky.app/profile/cybersecurity.dev" target="_blank" rel="noopener noreferrer" className="text-cyber-blue hover:underline">
                  @cybersecurity.dev
                </a>
              </div>
            </div>
            
            <div className="flex items-start group">
              <div className="bg-cyber-gray p-3 rounded-md mr-4 group-hover:bg-cyber-blue/10 transition-colors duration-300">
                <Github className="text-cyber-blue" />
              </div>
              <div>
                <h4 className="text-lg font-mono mb-1">GitHub</h4>
                <a href="https://github.com/cybersecurity-dev" target="_blank" rel="noopener noreferrer" className="text-cyber-blue hover:underline">
                  github.com/cybersecurity-dev
                </a>
              </div>
            </div>
            
            <div className="flex items-start group">
              <div className="bg-cyber-gray p-3 rounded-md mr-4 group-hover:bg-cyber-blue/10 transition-colors duration-300">
                <Linkedin className="text-cyber-blue" />
              </div>
              <div>
                <h4 className="text-lg font-mono mb-1">LinkedIn</h4>
                <a href="https://linkedin.com/in/cybersecurity-dev" target="_blank" rel="noopener noreferrer" className="text-cyber-blue hover:underline">
                  linkedin.com/in/cybersecurity-dev
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
