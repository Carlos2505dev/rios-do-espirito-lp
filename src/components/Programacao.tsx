

/*
const schedule = [
  {
    day: "Quinta-feira",
    date: "04 DE JUNHO",
    events: [
      { time: "10h00", title: "Início da Conferência" },
      { time: "21h30", title: "Encerramento do 1º Dia" },
    ]
  },
  {
    day: "Sexta-feira",
    date: "05 DE JUNHO",
    events: [
      { time: "10h00", title: "Início da Conferência" },
      { time: "21h30", title: "Encerramento do 2º Dia" },
    ]
  }
];
*/

const Programacao = () => {
  return (
    <section id="programacao" className="bg-rvl-creme-bg text-rvl-escuro py-20 md:py-28 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-14 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-rvl-laranja"></div>
            <span className="text-rvl-laranja font-aeonik font-bold tracking-[0.2em] text-[11px] md:text-xs uppercase">
              CRE 2026
            </span>
          </div>
          <h2 className="text-rvl-escuro">
            PROGRAMAÇÃO
          </h2>
        </div>

        {/* Placeholder Message */}
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <p className="font-aeonik text-xl md:text-2xl text-rvl-escuro/80 font-medium italic tracking-wide">
            Em breve será lançada a programação
          </p>
          <div className="mt-6 w-12 h-[2px] bg-rvl-laranja/30"></div>
        </div>

        {/* Schedule Content (Comentado para uso futuro) */}
        {/* 
        <div className="space-y-16 md:space-y-24">
          {schedule.map((dayData, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-8 md:gap-0">
              <div className="w-full md:w-1/4 flex flex-col items-start gap-3">
                <h3 className="text-2xl md:text-3xl font-aeonik font-bold text-rvl-escuro tracking-tight">
                  {dayData.day}
                </h3>
                <div className="bg-rvl-laranja/10 px-4 py-1.5 rounded-full border border-rvl-laranja/5">
                  <span className="text-rvl-laranja font-aeonik font-bold text-[10px] md:text-xs tracking-widest uppercase">
                    {dayData.date}
                  </span>
                </div>
              </div>

              <div className="w-full md:w-3/4 space-y-10">
                {dayData.events.map((event, eIdx) => (
                  <div key={eIdx} className="grid grid-cols-[60px_40px_1fr] md:grid-cols-[100px_50px_1fr] items-center gap-2 md:gap-4">
                    <span className="text-base md:text-lg font-aeonik font-bold text-rvl-escuro text-right">
                      {event.time}
                    </span>

                    <div className="flex justify-center items-center">
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-rvl-laranja/10 flex items-center justify-center border border-rvl-laranja/5">
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-rvl-laranja"></div>
                      </div>
                    </div>

                    <span className="text-lg md:text-xl font-aeonik font-bold text-rvl-laranja tracking-tight">
                      {event.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        */}
      </div>
    </section>
  );
};

export default Programacao;






