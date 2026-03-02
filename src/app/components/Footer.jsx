"use client";

export default function Footer() {
  const apps = [
    { name: "> instagram", link: "https://www.instagram.com/ruchik_35/" },
    { name: "> github", link: "https://github.com/ruchik-panwal/" },
    { name: "> linkedin", link: "https://www.linkedin.com/in/ruchikpanwal/" },
    { name: "> email", link: "https://www.instagram.com/ruchik_35/" },
  ];

  return (
    <div className="flex flex-col items-center justify-between bg-secondaryBlack h-[50vh] overflow-hidden">
      <div className="flex sm:flex-row flex-col w-[90%] justify-between items-start sm:items-center text-2xl mt-10 mb-5">
        {apps.map((app, ind) => {
          return <PersonalLinks key={ind} app={app} />;
        })}
      </div>

      {/* The text container stays exactly the same */}
      <div className="select-none sm:text-[20vw] text-[30vw] whitespace-nowrap leading-none sm:tracking-[-25px] tracking-[-10px] sm:mt-15 mt-25 -ml-3.75">
        Contact<span className="hidden sm:inline"> Me</span>
      </div>
    </div>
  );
}

function PersonalLinks({ app }) {
  function siteDirect() {
    window.open(app.link, "_blank");
  }

  return (
    <button onClick={siteDirect} className="cursor-pointer">
      {app.name}
    </button>
  );
}
