export default function WorkSection() {
  return (
    <div className="flex flex-col gap-5 h-screen p-5 box-border overflow-hidden">
      <WorkNav />
      <ShowWork />
    </div>
  );
}

function WorkNav() {
  return (
    <div className="shrink-0 h-[8vh] bg-secondaryBlack w-full rounded-[20px]"></div>
  );
}

function ShowWork() {
  const Reels = [
    {
      title: "5 React Hooks You Need to Know",
      link: "https://www.instagram.com/reel/abc123xyz/",
      description:
        "Level up your web dev game with these essential React hooks for managing state and side effects.",
    },
    {
      title: "Optimal PPL Split for Body Recomp",
      link: "https://www.instagram.com/reel/def456uvw/",
      description:
        "Hit your macros and smash this 6-day Push Pull Legs routine designed for building muscle while burning fat.",
    },
    {
      title: "Grinding a 10-inch Mirror (Part 1)",
      link: "https://www.instagram.com/reel/ghi789rst/",
      description:
        "Starting the journey of amateur telescope making. Patience and the right grit are key!",
    },
    {
      title: "RTX 4050 Laptop Performance Test",
      link: "https://www.instagram.com/reel/jkl012opq/",
      description:
        "Pushing the limits of modern gaming and seeing how far this GPU can go without thermal throttling.",
    },
    {
      title: "Tailwind CSS Tricks for Dashboards",
      link: "https://www.instagram.com/reel/mno345lmn/",
      description:
        "Building responsive UI components and sleek layouts much faster using utility classes.",
    },
    {
      title: "GSAP Animations in React",
      link: "https://www.instagram.com/reel/pqr678ijk/",
      description:
        "Adding smooth, complex animations to a Pokémon-themed web app to make the UI pop.",
    },
  ];

  return (
    <div className="flex-1 min-h-0 flex w-full gap-5">
      <div className="flex-1 flex flex-col gap-2 items-center h-full bg-secondaryBlack rounded-[20px] p-4">
        <div className="w-full text-[7rem] -tracking-[7px] overflow-hidden leading-none">
          Reels
        </div>
        <div className="bg-foreground h-0.5 w-[98%]"></div>
        <div className="flex h-full flex-col gap-1 mt-3 w-full">
          {Reels.map((reel, ind) => {
            return <ReelButton key={ind} reel={reel} />;
          })}
        </div>
      </div>
      <div className="h-full aspect-9/16 shrink-0 bg-secondaryBlack rounded-[20px]"></div>
    </div>
  );
}

function ReelButton({ reel }) {
  return (
    <div className="bg-[#1D1D1D] h-14 w-full px-4 flex items-center rounded-[10px]">
      <div className="truncate text-3xl">{reel.title}</div>
    </div>
  );
}