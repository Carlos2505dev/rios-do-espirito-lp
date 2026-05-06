
import { ChevronRight } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    { q: 'O que é a Conferência Rios do Espírito?', a: 'A Conferência Rios do Espírito é a nossa conferência anual focada em renovação espiritual, avivamento e busca por uma imersão mais profunda na presença do Espírito Santo, despertando a igreja para um novo nível de intimidade e poder.' },
    { q: 'Quando e onde acontecerá?', a: 'A CRE 2026 acontecerá entre os dias 18 e 20 de Junho de 2026, na Igreja Verbo da Vida Cabula, em Salvador/BA.' },
    { q: 'Como garanto meu ingresso?', a: 'Os ingressos da CRE estão sendo vendidos unicamente pelo Tiketo, através do link disponível nesta página.' },
    { q: 'Preciso ser membro da Verbo da Vida para participar?', a: 'Não! A Conferência é interdenominacional. Qualquer pessoa que deseje buscar mais de Deus e viver um tempo de avivamento será muito bem-vinda, independentemente de sua congregação local.' },
    { q: 'Posso levar crianças?', a: 'Sim! A conferência é um ambiente para toda a família. Em breve divulgaremos mais detalhes sobre a programação e estrutura do Ministério Infantil durante os dias do evento.' }
  ];

  return (
    <section className="bg-rvl-creme-bg py-20 md:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#B5440A] font-medium mb-2 uppercase tracking-wider text-sm font-aeonik">FAQ</p>
          <h2 className="text-rvl-escuro tracking-wide">PERGUNTAS FREQUENTES</h2>
        </div>
        <div className="bg-white rounded-2xl shadow-sm px-6 md:px-10 py-4 space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-rvl-escuro/10 last:border-b-0">
              <details className="group">
                <summary className="w-full flex items-center justify-between py-5 cursor-pointer list-none group-hover:text-rvl-laranja transition-colors">
                  <span className="font-aeonik font-semibold text-rvl-escuro text-sm md:text-base">{faq.q}</span>
                  <ChevronRight className="w-5 h-5 text-rvl-laranja transition-transform group-open:rotate-90" />
                </summary>
                <div className="pb-5 font-blauer text-rvl-escuro/70 text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {faq.a}
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;


