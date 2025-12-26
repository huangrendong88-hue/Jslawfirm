import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services, { ServiceData } from './components/Services';
import Stats from './components/Stats';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ServiceDetail from './components/ServiceDetail';

export type ViewState = 'home' | 'about' | 'services' | 'stats' | 'service-detail';

const App: React.FC = () => {
  // Crisis mode controls the "Emergency Mode" state
  const [isCrisisMode, setIsCrisisMode] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

  const toggleCrisisMode = () => {
    setIsCrisisMode((prev) => !prev);
  };

  const handleServiceClick = (service: ServiceData) => {
    setSelectedService(service);
    setCurrentView('service-detail');
  };

  const handleBackToServices = () => {
    setSelectedService(null);
    setCurrentView('services');
  };

  // Render logic based on current view
  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero isCrisisMode={isCrisisMode} navigateTo={() => setCurrentView('services')} />
            <Services 
                limit={3} 
                showTitle={true} 
                navigateTo={() => setCurrentView('services')} 
                onServiceClick={handleServiceClick}
            />
            <Stats />
          </>
        );
      case 'about':
        return <About />;
      case 'services':
        return <Services limit={100} showTitle={true} onServiceClick={handleServiceClick} />;
      case 'stats':
        return <Stats fullPage={true} />;
      case 'service-detail':
        return selectedService ? (
            <ServiceDetail service={selectedService} onBack={handleBackToServices} />
        ) : (
            <Services limit={100} showTitle={true} onServiceClick={handleServiceClick} />
        );
      default:
        return <Hero isCrisisMode={isCrisisMode} navigateTo={() => setCurrentView('services')} />;
    }
  };

  return (
    <div className="min-h-screen bg-deep text-silver font-sans selection:bg-ultra-blue selection:text-deep overflow-x-hidden flex flex-col">
      
      {/* Background Particles Simulation */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20" 
           style={{
             backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.1) 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}>
      </div>

      <Navbar 
        isCrisisMode={isCrisisMode} 
        toggleCrisisMode={toggleCrisisMode} 
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      
      <main className="relative z-10 flex-grow pt-20">
        {renderContent()}
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
