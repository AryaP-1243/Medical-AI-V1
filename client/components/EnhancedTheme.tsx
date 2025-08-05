import { createContext, useContext, useEffect } from 'react';

// Enhanced Theme System with Beautiful White Shades
const EnhancedThemeContext = createContext({});

export const useEnhancedTheme = () => useContext(EnhancedThemeContext);

export function EnhancedThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Apply enhanced styling to the body
    document.body.style.setProperty('--background', '0 0% 0%');
    document.body.style.setProperty('--foreground', '210 15% 95%');
    
    // Add dynamic glass effects
    const style = document.createElement('style');
    style.textContent = `
      /* Enhanced beautiful white text colors */
      .text-premium-white { color: hsl(0 0% 98%); }
      .text-elegant-white { color: hsl(210 15% 92%); }
      .text-soft-white { color: hsl(210 12% 85%); }
      .text-muted-white { color: hsl(210 10% 72%); }
      .text-subtle-white { color: hsl(210 8% 58%); }
      
      /* Enhanced glass morphism */
      .glass-premium {
        background: rgba(255, 255, 255, 0.04);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      }
      
      .glass-ultra {
        background: rgba(255, 255, 255, 0.06);
        backdrop-filter: blur(32px);
        -webkit-backdrop-filter: blur(32px);
        border: 1px solid rgba(255, 255, 255, 0.12);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15);
      }
      
      /* Enhanced text shadows for premium feel */
      .text-shadow-glow {
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
      }
      
      .text-shadow-premium {
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 40px rgba(255, 255, 255, 0.1);
      }
      
      /* Enhanced button styles */
      .btn-premium {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
        border: 1px solid rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(20px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .btn-premium:hover {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08));
        border-color: rgba(255, 255, 255, 0.25);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
        transform: translateY(-1px);
      }
      
      /* Enhanced card animations */
      .card-premium {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .card-premium:hover {
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2);
      }
      
      /* Beautiful gradients */
      .gradient-premium-text {
        background: linear-gradient(135deg, hsl(0 0% 98%), hsl(210 15% 88%), hsl(210 12% 75%));
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      .gradient-medical-premium {
        background: linear-gradient(135deg, 
          rgba(59, 130, 246, 0.15), 
          rgba(6, 182, 212, 0.1), 
          rgba(16, 185, 129, 0.05)
        );
      }
      
      /* Enhanced focus states */
      .focus-premium:focus {
        outline: none;
        ring: 2px solid rgba(59, 130, 246, 0.5);
        ring-offset: 2px;
        ring-offset-color: transparent;
        border-color: rgba(59, 130, 246, 0.6);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
    `;
    
    if (!document.head.querySelector('#enhanced-theme-styles')) {
      style.id = 'enhanced-theme-styles';
      document.head.appendChild(style);
    }
    
    // Force dark mode
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
    
    return () => {
      const existingStyle = document.head.querySelector('#enhanced-theme-styles');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  return (
    <EnhancedThemeContext.Provider value={{}}>
      {children}
    </EnhancedThemeContext.Provider>
  );
}
