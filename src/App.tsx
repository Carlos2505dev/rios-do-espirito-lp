import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LineUp from './components/LineUp';
import { CustomCursor } from './components/CustomCursor';
import FloatingCTA from './components/FloatingCTA';

// Lazy loading for components below the fold
const Tickets = lazy(() => import('./components/Tickets'));
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const WhatWeLived = lazy(() => import('./components/WhatWeLived'));
const Programacao = lazy(() => import('./components/Programacao'));

const FAQ = lazy(() => import('./components/FAQ'));
const Footer = lazy(() => import('./components/Footer'));
const CallToAction = lazy(() => import('./components/CallToAction'));
const Ministros = lazy(() => import('./components/Ministros'));

const App = () => {
  return (
    <div id="root">

      <CustomCursor />

      <Navbar />
      <main>
        <Hero />

        <LineUp />

        <Suspense fallback={<div className="h-32" />}>
          <Ministros />
        </Suspense>

        <Suspense fallback={<div className="h-32" />}>
          <About />
        </Suspense>

        <Suspense fallback={<div className="h-32" />}>
          <WhatWeLived />
        </Suspense>

        <Suspense fallback={<div className="h-32" />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<div className="h-32" />}>
          <Programacao />
        </Suspense>



        <Suspense fallback={<div className="h-32" />}>
          <Tickets />
        </Suspense>

        <Suspense fallback={<div className="h-32" />}>
          <FAQ />
        </Suspense>

        <Suspense fallback={<div className="h-32" />}>
          <CallToAction />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <FloatingCTA />
    </div>
  );
};

export default App;
