export default function ResultsBox({ a, b }) {
  return (
    <div className="glass p-6 rounded-2xl w-[350px] fade-in">
      <h2 className="text-white text-xl mb-4 font-semibold">Live Results</h2>
      <p className="text-white text-lg mb-2">Option A: <span className="text-[#00FFA3]">{a}</span></p>
      <p className="text-white text-lg">Option B: <span className="text-[#00FFA3]">{b}</span></p>
    </div>
  );
}
