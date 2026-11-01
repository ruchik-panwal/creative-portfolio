export default function Loader({ isLoaded }) {
  return (
    <div 
      className={`fixed inset-0 z-999 bg-secondaryBlack transition-opacity duration-1000 ease-in-out cursor-shrink dot-shrink cursor-none ${
        isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Positioned exactly identically to the Hero text so they perfectly overlap */}
      <div className="absolute bottom-5 left-20 text-[150px] font-black tracking-[-10%] select-none text-white animate-pulse">
        Ruchik Panwal
      </div>
    </div>
  );
}