

const About = () => {
  return (
    <section id="sobre" aria-labelledby="about-title" className="bg-rvl-creme-bg py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 id="about-title" className="text-rvl-escuro mb-6 whitespace-normal md:whitespace-nowrap">
          O QUE É A CONFERÊNCIA RIOS DO<br className="block md:hidden" /> ESPÍRITO?
        </h2>
        <div className="font-blauer text-rvl-escuro/80 text-base md:text-lg max-w-4xl leading-relaxed mb-14 space-y-5">
          <p>
            A Conferência Rios do Espírito não é um marco no calendário, é um fluxo que seguimos. Há sete anos, nos reunimos para mergulhar no que Deus está gerando agora. Em 2026, nossa direção é clara: <span className="text-rvl-laranja">"Por onde o rio passar, tudo viverá"</span> (Ezequiel 47:9).          </p>
          <p>
            Este não é um convite para assistir a uma conferência, mas para abandonar a segurança da margem. É o lugar de quem entende que a estagnação não faz parte do Reino e busca a renovação que só acontece em águas profundas. Seja você da nossa casa ou alguém sedento por um novo, o Rio está passando. E ele traz vida.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: '01', title: 'VIDA', text: 'Onde o Rio toca, a morte acaba. É o fluir da Palavra que gera cura, restauração e o despertar da natureza divina em nós. Não buscamos apenas um encontro, buscamos a substância que sustenta a nossa caminhada.' },
            { id: '02', title: 'PROFUNDIDADE', text: 'Saímos do superficial para o sobrenatural. Um ambiente de imersão onde o conhecimento se torna experiência e os dons são despertados pelo movimento da correnteza. É o momento de deixar de apenas observar e passar a navegar.' },
            { id: '03', title: 'IMPACTO', text: 'Não retemos a água; nos tornamos canais. Acreditamos em uma igreja que transborda a vida do Espírito para além das paredes, transformando a realidade da nossa cidade com a mensagem do Reino.' }
          ].map((item, i) => (
            <article key={i} className="servico-card group text-left">
              <div className="icone-box">
                <span className="font-aeonik text-7xl md:text-8xl text-rvl-laranja/70 group-hover:text-rvl-laranja transition-colors duration-300 leading-none inline-block">
                  {item.id}
                </span>
              </div>
              <h3 className="font-aeonik text-2xl text-rvl-escuro tracking-wide mt-2 mb-3 group-hover:text-rvl-laranja transition-colors duration-300 relative z-10">
                {item.title}
              </h3>
              <p className="font-blauer text-sm text-rvl-escuro/70 leading-relaxed group-hover:text-rvl-escuro transition-colors duration-300 relative z-10">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;


