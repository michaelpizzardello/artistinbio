'use client';

import type { CSSProperties, ReactElement, TouchEvent } from "react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import Image from "next/image";
import Link from "next/link";

type SectionId = "bio" | "cv" | "works" | "exhibitions" | "contact";

type Work = {
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  price: string;
  image: string;
};

type Exhibition = {
  title: string;
  venue: string;
  location: string;
  dates: string;
  status: string;
  summary: string;
  image: string;
};

const sections: { id: SectionId; label: string }[] = [
  { id: "bio", label: "Bio" },
  { id: "cv", label: "CV" },
  { id: "works", label: "Works" },
  { id: "exhibitions", label: "Shows" },
  { id: "contact", label: "Contact" },
];

const profile = {
  name: "Daniel Richter",
  birthYear: 1991,
  location: "Brooklyn, New York",
  summary:
    "Interdisciplinary artist working with light, sound, and projection to translate private archives into live environments.",
  coverImage: "/artist/image.png",
  enquiriesEmail: "studio@ava-martinez.art",
};

const bioCopy = [
  "Daniel Richter develops light-based installations that react to visitor presence and archival footage. Her practice merges sculptural glass, projection mapping, and responsive audio to examine how memory occupies physical space.",
  "Works are produced in modular components so they can travel between institutions, civic commissions, and remote presentations without losing detail or atmosphere.",
];

const cvSections = [
  {
    title: "Exhibitions",
    items: [
      "2024 · Echo Light · Current Space, New York",
      "2023 · Sensors & Sentiments · Aurora Gallery, Toronto",
      "2022 · Signal Festival Commission · Prague",
      "2021 · Resonant Bodies · Soft Signal Symposium, Los Angeles",
    ],
  },
  {
    title: "Prizes",
    items: [
      "2024 · Waveform Labs Residency Award",
      "2022 · New Light Pioneer Grant",
      "2021 · Paragon Digital Futures Scholarship",
    ],
  },
  {
    title: "Acquisitions",
    items: [
      "Museum of Future Imaging · Signal Bloom (2024)",
      "Aurora Public Art Collection · Night Data (2023)",
      "Private Collection, London · Memory Field (2022)",
    ],
  },
];

const works: Work[] = [
  {
    title: "Signal Bloom",
    year: "2024",
    medium: "Holographic resin, projection mapping",
    dimensions: "240 × 160 × 60 cm",
    price: "Available on request",
    image: "/art/art-1.png",
  },
  {
    title: "Night Data",
    year: "2023",
    medium: "Custom LED array, multichannel audio",
    dimensions: "Room-responsive installation",
    price: "Edition of 3",
    image: "/art/art-2.png",
  },
  {
    title: "Memory Field",
    year: "2022",
    medium: "Etched glass, projection, live capture",
    dimensions: "620 × 420 cm installation",
    price: "Commission only",
    image: "/art/art-3.png",
  },
  {
    title: "Aperture Study",
    year: "2021",
    medium: "Backlit glass, archival film, sound",
    dimensions: "140 × 90 cm",
    price: "Sold",
    image: "/art/art-4.png",
  },
];

const exhibitions: Exhibition[] = [
  {
    title: "Echo Light",
    venue: "Current Space",
    location: "New York, NY",
    dates: "8 Nov – 12 Dec 2024",
    status: "On view",
    summary:
      "Immersive light environment that shifts colour temperature with visitor flow and pairs on-site work with a remote documentation kit.",
    image: "/exhibitions/show-1.png",
  },
  {
    title: "Sensors & Sentiments",
    venue: "Aurora Gallery",
    location: "Toronto, CA",
    dates: "July 2024",
    status: "Recent",
    summary:
      "Group exhibition focused on intimate technologies. Presented Night Data with live sensor-responsive performance.",
    image: "/exhibitions/show-2.png",
  },
  {
    title: "Signal Festival Commission",
    venue: "Public Installation",
    location: "Prague, CZ",
    dates: "October 2023",
    status: "Archive",
    summary:
      "Projection mapping commission translating family photo archives into dynamic street-scale visuals across historic facades.",
    image: "/exhibitions/show-3.png",
  },
];

const contacts = [
  {
    label: "Email",
    value: "studio@ava-martinez.art",
    href: "mailto:studio@ava-martinez.art",
  },
  {
    label: "Instagram",
    value: "@ava.martinez.studio",
    href: "https://instagram.com/placeholder",
  },
  {
    label: "Website",
    value: "ava-martinez.art",
    href: "https://ava-martinez.art",
  },
];

const NAV_BAR_HEIGHT = 52;
const SLIDER_HEIGHT = "100vh";

export default function Page() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [worksSort, setWorksSort] = useState<"newest" | "oldest">("newest");
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const scrollContainers = useRef<Record<SectionId, HTMLDivElement | null>>({
    bio: null,
    cv: null,
    works: null,
    exhibitions: null,
    contact: null,
  });
  const [navVisible, setNavVisible] = useState(true);
  const navLastScroll = useRef(0);

  const registerScrollContainer = useCallback(
    (id: SectionId, node: HTMLDivElement | null) => {
      scrollContainers.current[id] = node;
    },
    [],
  );
  const setBioScrollRef = useCallback(
    (node: HTMLDivElement | null) => registerScrollContainer("bio", node),
    [registerScrollContainer],
  );
  const setCVScrollRef = useCallback(
    (node: HTMLDivElement | null) => registerScrollContainer("cv", node),
    [registerScrollContainer],
  );
  const setWorksScrollRef = useCallback(
    (node: HTMLDivElement | null) => registerScrollContainer("works", node),
    [registerScrollContainer],
  );
  const setExhibitionsScrollRef = useCallback(
    (node: HTMLDivElement | null) => registerScrollContainer("exhibitions", node),
    [registerScrollContainer],
  );
  const setContactScrollRef = useCallback(
    (node: HTMLDivElement | null) => registerScrollContainer("contact", node),
    [registerScrollContainer],
  );

  const goToIndex = (index: number) => {
    if (index < 0 || index >= sections.length) return;
    navLastScroll.current = 0;
    setNavVisible(true);
    setActiveIndex(index);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const delta = touchStartX.current - touchEndX.current;
    const threshold = 40;
    if (Math.abs(delta) > threshold) {
      if (delta > 0) {
        goToIndex(activeIndex + 1);
      } else {
        goToIndex(activeIndex - 1);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const sectionId = sections[activeIndex].id;
    const node = scrollContainers.current[sectionId];
    if (!node) return;

    const handleScroll = () => {
      const current = node.scrollTop;
      if (current <= 8) {
        setNavVisible(true);
      } else if (current > navLastScroll.current + 6) {
        setNavVisible(false);
      } else if (current < navLastScroll.current) {
        setNavVisible(true);
      }
      navLastScroll.current = current;
    };

    navLastScroll.current = node.scrollTop;

    node.addEventListener("scroll", handleScroll, { passive: true });
    return () => node.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  const sliderStyle = {
    transform: `translateX(-${activeIndex * 100}%)`,
  } as const;

  const sectionStyle: CSSProperties = {
    height: SLIDER_HEIGHT,
  };

  const renderBio = () => (
    <div
      className="flex basis-full min-w-full flex-shrink-0 justify-center bg-neutral-100"
      style={sectionStyle}
    >
      <div
        ref={setBioScrollRef}
        className="flex h-full w-full max-w-xl flex-col overflow-y-auto px-4 pb-8 pt-6 sm:px-6"
        style={{ paddingBottom: navVisible ? NAV_BAR_HEIGHT : 0 }}
      >
        <article className="flex w-full flex-col">
          <div className="bg-white">
            <Image
              src={profile.coverImage}
              alt={`${profile.name} cover`}
              width={1200}
              height={1600}
              priority
              className="h-auto w-full object-contain"
              sizes="(min-width: 768px) 640px, 100vw"
            />
          </div>
          <div className="space-y-1 px-6 py-6 text-center text-neutral-800">
            <h1 className="text-3xl font-light sm:text-4xl">{profile.name}</h1>
            <p className="text-sm text-neutral-600">Lives and works in {profile.location}</p>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-700">
              B. {profile.birthYear}
            </p>
          </div>
          <div className="space-y-5 border-t border-neutral-200 px-6 py-8 text-base leading-7 text-neutral-700">
            <p>{profile.summary}</p>
            {bioCopy.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );

  const renderCV = () => (
    <div className="flex basis-full min-w-full flex-shrink-0 bg-white" style={sectionStyle}>
      <div
        ref={setCVScrollRef}
        className="flex h-full w-full max-w-xl flex-col overflow-y-auto px-4 pb-8 pt-6 sm:px-6"
        style={{ paddingBottom: navVisible ? NAV_BAR_HEIGHT : 0 }}
      >
        <div className="space-y-6 text-sm text-neutral-700">
          {cvSections.map((section) => (
            <div key={section.title} className="border border-neutral-200 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{section.title}</p>
              <ul className="mt-3 space-y-2">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWorks = () => {
    return (
      <WorksSection
        works={works}
        worksSort={worksSort}
        setWorksSort={setWorksSort}
        showAll={showAll}
        setShowAll={setShowAll}
        sectionStyle={sectionStyle}
        enquiriesEmail={profile.enquiriesEmail}
        navVisible={navVisible}
        registerScrollContainer={setWorksScrollRef}
      />
    );
  };

  const renderExhibitions = () => (
    <div className="flex basis-full min-w-full flex-shrink-0 bg-white" style={sectionStyle}>
      <div
        ref={setExhibitionsScrollRef}
        className="flex h-full w-full flex-col overflow-y-auto px-6 pb-8 pt-0 sm:px-10"
        style={{ paddingBottom: navVisible ? NAV_BAR_HEIGHT : 0 }}
      >
        <div className="space-y-6 text-sm text-neutral-700">
          {exhibitions.map((show) => (
            <article key={show.title} className="border border-neutral-200 bg-white">
              <div className="bg-neutral-100 p-4">
                <Image
                  src={show.image}
                  alt={`${show.title} installation view`}
                  width={1600}
                  height={1100}
                  className="h-auto w-full object-contain"
                  sizes="(min-width: 768px) 720px, 100vw"
                />
              </div>
              <div className="space-y-2 px-4 py-4">
                <p className="text-neutral-900">{show.title} · {show.status}</p>
                <p>
                  {show.venue} · {show.location}
                </p>
                <p>{show.dates}</p>
                <p>{show.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );


  const renderContact = () => (
    <div className="flex basis-full min-w-full flex-shrink-0 bg-white" style={sectionStyle}>
      <div
        ref={setContactScrollRef}
        className="flex h-full w-full flex-col overflow-y-auto px-6 pb-8 pt-6 sm:px-10"
        style={{ paddingBottom: navVisible ? NAV_BAR_HEIGHT : 0 }}
      >
        <div className="grid gap-3 text-sm text-neutral-700 sm:grid-cols-3">
          {contacts.map((item) => (
            <Link key={item.label} href={item.href} className="border border-neutral-200 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{item.label}</p>
              <p className="mt-1 text-neutral-900">{item.value}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  const contentById: Record<SectionId, () => ReactElement> = {
    bio: renderBio,
    cv: renderCV,
    works: renderWorks,
    exhibitions: renderExhibitions,
    contact: renderContact,
  };

  return (
    <main className="relative h-screen overflow-hidden bg-white text-neutral-900">
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ height: SLIDER_HEIGHT }}
      >
        <div
          className="flex h-full w-full transition-transform duration-300 ease-out"
          style={sliderStyle}
        >
          {sections.map((section) => {
            const SectionContent = contentById[section.id];
            return <SectionContent key={section.id} />;
          })}
        </div>
      </div>

      <nav
        className={`fixed bottom-0 left-0 right-0 z-20 border-t border-neutral-200 bg-white transition-transform duration-200 ${
          navVisible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: NAV_BAR_HEIGHT }}
      >
        <div className="mx-auto flex h-full w-full max-w-md divide-x divide-neutral-200 text-xs uppercase tracking-[0.2em] text-neutral-600">
          {sections.map((section, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => goToIndex(index)}
                className={`flex h-full flex-1 items-center justify-center ${
                  isActive ? "bg-neutral-900 text-white" : "bg-white"
                }`}
              >
                {section.label}
              </button>
            );
          })}
        </div>
      </nav>
    </main>
  );
}

type WorksSectionProps = {
  works: Work[];
  worksSort: "newest" | "oldest";
  setWorksSort: (sort: "newest" | "oldest") => void;
  showAll: boolean;
  setShowAll: Dispatch<SetStateAction<boolean>>;
  sectionStyle: CSSProperties;
  enquiriesEmail: string;
  navVisible: boolean;
  registerScrollContainer: (node: HTMLDivElement | null) => void;
};

function WorksSection({
  works,
  worksSort,
  setWorksSort,
  showAll,
  setShowAll,
  sectionStyle,
  enquiriesEmail,
  navVisible,
  registerScrollContainer,
}: WorksSectionProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const lastScroll = useRef(0);
  const setScrollNode = useCallback(
    (node: HTMLDivElement | null) => {
      scrollRef.current = node;
      registerScrollContainer(node);
    },
    [registerScrollContainer],
  );

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    lastScroll.current = node.scrollTop;
    const handleScroll = () => {
      const current = node.scrollTop;
      if (current <= 8) {
        setToolbarVisible(true);
      } else if (current > lastScroll.current + 6) {
        setToolbarVisible(false);
      } else if (current < lastScroll.current - 6) {
        setToolbarVisible(true);
      }
      lastScroll.current = current;
    };
    node.addEventListener("scroll", handleScroll, { passive: true });
    return () => node.removeEventListener("scroll", handleScroll);
  }, []);

  const sortedWorks = [...works].sort((a, b) => {
    const yearA = parseInt(a.year, 10);
    const yearB = parseInt(b.year, 10);
    return worksSort === "newest" ? yearB - yearA : yearA - yearB;
  });
  const featured = sortedWorks.slice(0, 3);

  return (
    <div className="flex basis-full min-w-full flex-shrink-0 bg-white" style={sectionStyle}>
      <div
        ref={setScrollNode}
        className="flex h-full w-full flex-col overflow-y-auto px-6 pb-8 pt-0 sm:px-10"
        style={{ paddingBottom: navVisible ? NAV_BAR_HEIGHT : 0 }}
      >
        <div
          className={`sticky top-0 z-10 -mx-6 border-b border-neutral-200 bg-white transition-transform duration-200 sm:-mx-10 ${toolbarVisible ? "translate-y-0" : "-translate-y-full"}`}
        >
          <div className="flex h-12 w-full divide-x divide-neutral-200 text-xs uppercase tracking-[0.2em] text-neutral-600">
            <button
              type="button"
              onClick={() => setWorksSort("newest")}
              className={`flex h-full flex-1 items-center justify-center ${
                worksSort === "newest" ? "bg-neutral-900 text-white" : "bg-white"
              }`}
            >
              Newest
            </button>
            <button
              type="button"
              onClick={() => setWorksSort("oldest")}
              className={`flex h-full flex-1 items-center justify-center ${
                worksSort === "oldest" ? "bg-neutral-900 text-white" : "bg-white"
              }`}
            >
              Oldest
            </button>
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className={`flex h-full flex-1 items-center justify-center ${
                showAll ? "bg-neutral-900 text-white" : "bg-white"
              }`}
            >
              {showAll ? "View less" : "View all"}
            </button>
          </div>
        </div>

        {showAll ? (
          <div className="mt-6 space-y-3">
            {sortedWorks.map((work) => (
              <div key={work.title} className="flex items-start gap-4 border border-neutral-200 p-3">
                <div className="shrink-0 w-20">
                  <Image
                    src={work.image}
                    alt={`${work.title} thumbnail`}
                    width={200}
                    height={200}
                    className="h-auto w-full object-contain"
                    sizes="80px"
                  />
                </div>
                <div className="flex flex-1 flex-col text-[13px] text-neutral-700">
                  <span className="text-base text-neutral-900">{work.title}</span>
                  <span>{work.year}</span>
                  <span>{work.medium}</span>
                  <span>{work.dimensions}</span>
                  <span>{work.price}</span>
                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        `mailto:${enquiriesEmail}?subject=Artwork enquiry: ${encodeURIComponent(
                          work.title,
                        )}`,
                      )
                    }
                    className="mt-3 w-fit border border-neutral-900 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-neutral-900"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 space-y-8">
            {featured.map((work) => (
              <article key={work.title} className="border border-neutral-200 bg-white">
                <div className="bg-neutral-100 p-4">
                  <Image
                    src={work.image}
                    alt={`${work.title} artwork`}
                    width={1600}
                    height={1200}
                    className="h-auto w-full object-contain"
                    sizes="(min-width: 768px) 720px, 100vw"
                  />
                </div>
                <div className="space-y-1 px-4 py-4 text-sm text-neutral-700">
                  <p className="text-lg text-neutral-900">{work.title}</p>
                  <p>{work.year}</p>
                  <p>{work.medium}</p>
                  <p>{work.dimensions}</p>
                  <p>{work.price}</p>
                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        `mailto:${enquiriesEmail}?subject=Artwork enquiry: ${encodeURIComponent(
                          work.title,
                        )}`,
                      )
                    }
                    className="mt-3 border border-neutral-900 px-4 py-2 text-xs uppercase tracking-[0.2em] text-neutral-900"
                  >
                    Enquire
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
