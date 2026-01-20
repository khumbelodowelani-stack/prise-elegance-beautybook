import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import logo from '@/assets/logo.png';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <img src={logo} alt="Prise Elegance" className="h-16 w-auto mb-4 brightness-[1.3]" />
            <p className="text-primary-foreground/80 text-sm max-w-sm">
              Premium nail and beauty services delivered with elegance and care. 
              Book your appointment today and let us make you feel beautiful.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Home
              </Link>
              <Link to="/services" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Services
              </Link>
              <Link to="/about" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <a 
                href="tel:+27763781015" 
                className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                +27 76 378 1015
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <p className="text-center text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Prise Elegance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
