
import {
  BookOpen,
  Fingerprint,
  Compass,
  Waves,
  Heart
} from 'lucide-react';

const Experience = () => {
  const items = [
    { icon: BookOpen, label: 'Mentes renovadas pelo refrigério e ensino da Palavra' },
    { icon: Fingerprint, label: 'Restauração de propósitos e da identidade em Cristo' },
    { icon: Compass, label: 'Clareza e direção espiritual para as próximas estações' },
    { icon: Waves, label: 'Força e ousadia para avançar em águas mais profundas' },
    { icon: Heart, label: 'Manifestações reais de cura e transformação' }
  ];

  return (
    <section className="bg-rvl-exp-bg pt-20 md:pt-28 pb-10 md:pb-14 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-rvl-escuro mb-4">A Experiência</h2>
        <p className="font-blauer text-rvl-escuro/70 max-w-2xl leading-relaxed mb-12">
          Nossa expectativa é simples e direta: a Palavra revelada e o Espírito em movimento. Não buscamos emoções passageiras, mas um mergulho real que altera a nossa rota. Quando a correnteza do Espírito assume o controle, o resultado é vida que permanece muito além do amém final.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-rvl-laranja shrink-0" />
              <span className="font-blauer text-sm text-rvl-escuro">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Experience;


