
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    console.log("Form submitted:", formData);
    alert("Thanks for your message! This is a demo form - in a real application your message would be sent.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Contact</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
          <div>
            <h3 className="text-xl font-mono text-cyber-blue mb-6">Get In Touch</h3>
            <p className="text-cyber-light-gray mb-8">
              Have a security concern or interested in collaboration? Feel free to reach out through any of the channels below or use the contact form.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-cyber-gray p-3 rounded-md mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyber-green">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-mono mb-1">Email</h4>
                  <a href="mailto:contact@cybersecurity.dev" className="text-cyber-green hover:underline">
                    contact@cybersecurity.dev
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-cyber-gray p-3 rounded-md mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyber-green">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-mono mb-1">Twitter</h4>
                  <a href="https://twitter.com/cybersecurity_dev" target="_blank" rel="noopener noreferrer" className="text-cyber-green hover:underline">
                    @cybersecurity_dev
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-cyber-gray p-3 rounded-md mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyber-green">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-mono mb-1">GitHub</h4>
                  <a href="https://github.com/cybersecurity-dev" target="_blank" rel="noopener noreferrer" className="text-cyber-green hover:underline">
                    github.com/cybersecurity-dev
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-cyber-gray p-3 rounded-md mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyber-green">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-mono mb-1">LinkedIn</h4>
                  <a href="https://linkedin.com/in/cybersecurity-dev" target="_blank" rel="noopener noreferrer" className="text-cyber-green hover:underline">
                    linkedin.com/in/cybersecurity-dev
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="tech-card">
              <h3 className="text-xl font-mono text-cyber-blue mb-6">Send Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-mono mb-1 text-cyber-light-gray">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-cyber-gray border-cyber-green/30 focus:border-cyber-green/70"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-mono mb-1 text-cyber-light-gray">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-cyber-gray border-cyber-green/30 focus:border-cyber-green/70"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-mono mb-1 text-cyber-light-gray">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="min-h-32 bg-cyber-gray border-cyber-green/30 focus:border-cyber-green/70"
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-cyber-green text-black hover:bg-cyber-green/80 font-mono"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
