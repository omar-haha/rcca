export function StatsStrip() {
  const stats = [
    { num: "99.2", unit: "%", label: "Average HPLC purity" },
    { num: "48", unit: "hr", label: "Average dispatch time" },
    { num: "12", unit: "+", label: "Active compound lines" },
    { num: "100", unit: "%", label: "Third-party verified" },
  ];

  return (
    <div className="py-20 px-6 border-y border-secondary bg-secondary" id="stats">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] max-w-[1080px] mx-auto bg-secondary border border-secondary rounded-2xl overflow-hidden">
        {stats.map((s) => (
          <div className="bg-secondary p-10 px-8 flex flex-col justify-center" key={s.label}>
            <div className="text-[42px] font-light tracking-[-0.03em] mb-1.5 text-primary">
              {s.num}
              <span className="text-[22px]">{s.unit}</span>
            </div>
            <div className="text-[13px] text-tertiary tracking-[0.01em]">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
