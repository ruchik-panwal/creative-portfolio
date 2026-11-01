import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";

export default function WebDevSection() {
  return (
    <div className=" w-full h-full flex justify-center items-center gap-4 p-3">
      <Controls />
      <div className="bg-sky-100 h-full aspect-video rounded-[20px]"></div>
    </div>
  );
}

function Controls() {
  return (
    <div className="flex flex-col h-full w-full gap-4">
      <div className="h-full w-full bg-[#1D1D1D] rounded-[20px]"></div>
      <div className="flex gap-4">
        <button className=" bg-[#1D1D1D] rounded-[20px] w-70 h-30 flex justify-center items-center text-5xl cursor-shrink">
          <FaArrowLeftLong />
        </button>
        <div className="h-full w-full bg-[#1D1D1D] rounded-[20px] flex justify-center items-center text-3xl cursor-shrink">Visit Site</div>
        <button className=" bg-[#1D1D1D] rounded-[20px] flex justify-center items-center w-70 h-30 text-5xl cursor-shrink">
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
}
