
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';

const JejumSection = () => {
  return (
    <section className="bg-rvl-escuro py-14 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-rvl-laranja font-aeonik font-medium uppercase tracking-widest text-xs mb-2">Pré-Conferência</p>
          <h2 className="text-rvl-creme">40 DIAS DE JEJUM</h2>
          <p className="font-blauer text-rvl-creme/80 text-sm mt-2 max-w-md leading-relaxed">Um tempo coletivo de alinhamento espiritual antes do encontro. Faça parte.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
          <Button 
            href="/jejum"
            className="!w-auto !max-w-none !rounded-full shadow-[0_0_30px_rgba(245,130,58,0.25)]"
            boxClassName="!p-1.5 !rounded-full"
            buttonClassName="!px-8 !py-3.5 !text-sm !font-bold uppercase tracking-wide !rounded-full"
          >
            SAIBA MAIS
          </Button>
          <a href="https://chat.whatsapp.com/Lu7EaWpM7Lf2Jp89o1ehAf?mode=gi_t" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-rvl-creme/20 text-rvl-creme rounded-full px-8 py-3.5 font-aeonik font-bold text-sm uppercase tracking-wide hover:border-rvl-creme/50 hover:text-white transition-all">
            <Sparkles size={16} /> GRUPO DO JEJUM
          </a>
        </div>
      </div>
    </section>
  );
};

export default JejumSection;


