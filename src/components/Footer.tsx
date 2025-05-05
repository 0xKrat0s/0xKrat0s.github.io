
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t border-cyber-gray">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 flex items-center">
            <span className="font-mono font-bold text-cyber-blue mr-2">~/</span>
            <span className="font-mono">cyber_portfolio</span>
          </div>
          
          <div className="text-sm text-cyber-light-gray font-mono">
            <span className="block md:inline">© {currentYear} CyberDev. All rights reserved. </span>
            <span className="hidden md:inline mx-2">|</span>
            <span className="block md:inline">Secured with modern cryptography.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
