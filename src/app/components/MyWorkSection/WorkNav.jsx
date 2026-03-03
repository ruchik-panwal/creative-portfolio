export default function WorkNav({ sectionSetter, section }) {
  const btns = ["Content Creation", "Graphic Design", "Ui/Ux"];

  return (
    <div className="shrink-0 flex justify-center items-center gap-5 h-[8vh] bg-secondaryBlack w-full rounded-[20px]">
      {btns.map((btn, ind) => {
        return (
          <NavBtn
            name={btn}
            key={ind}
            onClick={() => sectionSetter(ind)}
            onStatus={section == ind}
          />
        );
      })}
    </div>
  );
}

function NavBtn({ name, onStatus, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`tracking-tighter text-[2.2vw] cursor-pointer ${onStatus ? "text-amber-200" : "text-yellow-600"}`}
    >
      {name}
    </button>
  );
}
