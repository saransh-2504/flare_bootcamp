"use client";

export default function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        px-6 py-3 rounded-xl text-lg font-semibold
        bg-gradient-to-r from-[#00FFA3] to-[#00D1FF]
        text-black
        scale-hover glow fade-in
      "
    >
      {label}
    </button>
  );
}
