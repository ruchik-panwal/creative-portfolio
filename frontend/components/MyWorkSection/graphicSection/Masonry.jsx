import Image from "next/image";

// Defining the data outside the component prevents it from being recreated on every render
const allImages = [
  { src: "/graphics/Email/CodematesMail.png", width: 756, height: 1850, category: "Emails" },
  { src: "/graphics/Email/CouncilRevealMail.png", width: 1620, height: 8538, category: "Emails" },
  { src: "/graphics/Email/FyRepMail.png", width: 1080, height: 2109, category: "Emails" },
  { src: "/graphics/Email/GitWorkshopMail.png", width: 756, height: 1850, category: "Emails" },
  { src: "/graphics/Email/IdeaEmail.png", width: 1080, height: 5482, category: "Emails" },
  { src: "/graphics/Logos/ConcepIdea4.png", width: 1445, height: 848, category: "Logos" },
  { src: "/graphics/Logos/Concept.png", width: 1445, height: 848, category: "Logos" },
  { src: "/graphics/Logos/ConceptIdea.png", width: 2138, height: 1385, category: "Logos" },
  { src: "/graphics/Logos/ConceptIdea2.png", width: 1445, height: 848, category: "Logos" },
  { src: "/graphics/Logos/ConceptIdea3.png", width: 1445, height: 848, category: "Logos" },
  { src: "/graphics/Logos/ConceptInnosphere.png", width: 1445, height: 848, category: "Logos" },
  { src: "/graphics/Logos/ConceptVortex.png", width: 1445, height: 848, category: "Logos" },
  { src: "/graphics/Logos/IdeaMain.png", width: 1445, height: 848, category: "Logos" },
  { src: "/graphics/Posters/A4 - 6.png", width: 595, height: 842, category: "Poster" },
  { src: "/graphics/Posters/Frame 60.png", width: 1080, height: 1080, category: "Poster" },
  { src: "/graphics/Posters/GeminiCsi.png", width: 595, height: 842, category: "Poster" },
  { src: "/graphics/Thumbnails/CodematesThumbnail.png", width: 1080, height: 1920, category: "Thumbnails" },
  { src: "/graphics/Thumbnails/IdeaPhase1.png", width: 1080, height: 1920, category: "Thumbnails" },
  { src: "/graphics/Thumbnails/IdeaPhase2.png", width: 1080, height: 1920, category: "Thumbnails" }
];

export default function Masonry({ activeFilter }) {
  // Filter the images based on the activeFilter prop
  const displayedImages = activeFilter
    ? allImages.filter((img) => img.category === activeFilter)
    : allImages;

  return (
    <div className="w-full h-full text-white ">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2">
        {displayedImages.map((img, i) => (
          <div key={img.src} className="w-full mb-2 break-inside-avoid ">
            <Image
              src={img.src}
              alt={`${img.category} Graphic ${i + 1}`}
              width={img.width}
              height={img.height}
              // Only prioritize the first 4 images of the CURRENTLY displayed list
              priority={i < 4} 
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="w-full h-auto rounded-[20px] bg-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
}