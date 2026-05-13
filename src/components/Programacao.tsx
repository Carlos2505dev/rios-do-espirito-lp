const schedule = [
  {
    day: "Quinta-feira",
    date: "18 DE JUNHO",
    events: [
      { time: "18:50", title: "Abertura dos portões / Check-in" },
      { time: "19:10", title: "Momento Profético 🔥🔥" },
      { time: "19:30", title: "Início" },
      { time: "20:30", title: "Intervalo" },
      { time: "21:00", title: "Palavra" },
    ]
  },
  {
    day: "Sexta-feira",
    date: "19 DE JUNHO",
    events: [
      { time: "18:50", title: "Abertura dos portões / Check-in" },
      { time: "19:10", title: "Momento Profético 🔥🔥" },
      { time: "19:30", title: "Início" },
      { time: "20:30", title: "Intervalo" },
      { time: "21:00", title: "Palavra" },
    ]
  },
  {
    day: "Sábado - Manhã",
    date: "20 DE JUNHO",
    events: [
      { time: "09:30", title: "Abertura dos portões" },
      { time: "10:00", title: "Início" },
      { time: "10:30", title: "Intervalo" },
      { time: "11:00", title: "Ministração" },
    ]
  },
  {
    day: "Sábado - Tarde",
    date: "20 DE JUNHO",
    events: [
      { time: "15:00", title: "Sábado Teens (até 16:30)" },
    ]
  },
  {
    day: "Sábado - Noite",
    date: "20 DE JUNHO",
    events: [
      { time: "18:00", title: "Abertura dos portões" },
      { time: "18:30", title: "Momento Profético 🔥🔥" },
      { time: "19:00", title: "Início" },
      { time: "20:00", title: "Intervalo" },
      { time: "20:30", title: "Ministração" },
    ]
  }
];

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

        {/* Schedule Content */}
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

                    <span className={`text-lg md:text-xl font-aeonik font-bold tracking-tight ${event.title.includes('Momento Profético') ? 'animate-fire-text' : 'text-rvl-laranja'}`}>
                      {event.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programacao;






