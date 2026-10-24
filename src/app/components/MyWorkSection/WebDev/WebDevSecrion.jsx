import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";

export default function WebDevSection() {
  return (
    <div className=" w-full h-full flex justify-center items-center gap-25 p-3">
      <button className=" bg-[#1D1D1D] rounded-[20px] w-[120px] h-[120px] flex justify-center items-center text-5xl">
        <FaArrowLeftLong />
      </button>


      <div className="bg-sky-100 h-full aspect-video rounded-[20px]"></div>
      <button className=" bg-[#1D1D1D] rounded-[20px] flex justify-center items-center w-[120px] h-[120px] text-5xl">
        <FaArrowRightLong />
      </button>
    </div>
  );
}
