import { Button } from './ui/button';

const Tickets = () => {
  const tickets = [
    { name: 'INGRESSO INDIVIDUAL', price: '120,00', features: ['+ R$ 8,16 taxa', 'Até 30/05 às 23:59'], highlight: true, batch: 'SEGUNDO LOTE' },
    { name: 'INGRESSO CASADINHA', price: '220,00', features: ['+ R$ 14,96 taxa', 'Até 24/05 às 23:00'] },
    { name: 'INGRESSO INFANTIL', price: '30,00', features: ['+ R$ 2,40 taxa', 'Até 30/05 às 23:59'], sub: '04 MESES A 4 ANOS', batch: 'SEGUNDO LOTE' },
    { name: 'INGRESSO INFANTIL', price: '45,00', features: ['+ R$ 3,06 taxa', 'Até 30/05 às 23:59'], sub: '5 A 10 ANOS', batch: 'SEGUNDO LOTE' },
  ];

  return (
    <section id="ingressos" aria-labelledby="tickets-title" className="bg-rvl-creme-bg py-20 md:py-28 px-6 scroll-mt-0 md:scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#B5440A] font-medium mb-2 uppercase tracking-wider text-sm font-aeonik">Ingressos | CRE 26</p>
          <h2 id="tickets-title" className="text-rvl-escuro">
            Escolha como participar
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {tickets.map((ticket, i) => (
            <article key={i} className={`relative bg-rvl-escuro rounded-2xl shadow-2xl overflow-visible h-full flex flex-col ${ticket.highlight ? 'ring-2 ring-rvl-laranja/60' : ''}`}>
              <div className="px-5 pt-6 pb-4 text-center flex-1">
                <div className="inline-block border text-[11px] font-aeonik font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3 bg-rvl-laranja/20 border-rvl-laranja/40 text-rvl-laranja">
                  SEGUNDO LOTE
                </div>
                <h3 className="font-aeonik text-2xl text-rvl-creme tracking-wide leading-tight mb-1">{ticket.name}</h3>
                {ticket.sub && <p className="font-blauer text-rvl-creme/80 text-xs mb-2">{ticket.sub}</p>}
                <ul className={`font-blauer text-rvl-creme/80 text-xs mb-4 mt-3 space-y-1 ${ticket.name === 'KIT RVL' ? 'grid grid-cols-2 gap-x-3 gap-y-1' : ''}`}>
                  {ticket.features.map((f, j) => (
                    <li key={j} className="flex items-center justify-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-rvl-laranja/60 inline-block flex-shrink-0"></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative flex items-center px-0">
                <div className="absolute -left-3.5 w-7 h-7 rounded-full bg-[#F5F9FF] z-20"></div>
                <div className="w-full border-t-2 border-dashed border-white/15 mx-6"></div>
                <div className="absolute -right-3.5 w-7 h-7 rounded-full bg-[#F5F9FF] z-20"></div>
              </div>

              <div className="px-5 py-5 text-center">
                <p className="font-aeonik text-3xl text-rvl-creme tracking-wide mb-0.5">R${ticket.price}</p>
                <div className="mb-4"></div>
                <Button
                  href="https://tiketo.com.br/evento/5167"
                  className="!w-full !max-w-none !rounded-xl shadow-[0_4px_24px_rgba(245,130,58,0.35)]"
                  boxClassName="!p-1.5 !w-full !rounded-xl"
                  buttonClassName="!py-4 !px-6 !text-sm !font-bold uppercase tracking-wide !w-full !rounded-xl"
                >
                  QUERO GARANTIR MEU INGRESSO AGORA
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tickets;
