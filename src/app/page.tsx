'use client';

import type { ReactElement, TouchEvent } from "react";
import { useRef, useState } from "react";
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
  name: "Ava Martinez",
  birthYear: 1991,
  location: "Brooklyn, New York",
  summary:
    "Interdisciplinary artist working with light, sound, and projection to translate private archives into live environments.",
  coverImage:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80",
  enquiriesEmail: "studio@ava-martinez.art",
};

const bioCopy = [
  "Ava Martinez develops light-based installations that react to visitor presence and archival footage. Her practice merges sculptural glass, projection mapping, and responsive audio to examine how memory occupies physical space.",
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
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Night Data",
    year: "2023",
    medium: "Custom LED array, multichannel audio",
    dimensions: "Room-responsive installation",
    price: "Edition of 3",
    image:
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Memory Field",
    year: "2022",
    medium: "Etched glass, projection, live capture",
    dimensions: "620 × 420 cm installation",
    price: "Commission only",
    image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Aperture Study",
    year: "2021",
    medium: "Backlit glass, archival film, sound",
    dimensions: "140 × 90 cm",
    price: "Sold",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80",
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
    image:
      "https://images.unsplash.com/photo-1526402469554-49ae4e56c5b8?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Sensors & Sentiments",
    venue: "Aurora Gallery",
    location: "Toronto, CA",
    dates: "July 2024",
    status: "Recent",
    summary:
      "Group exhibition focused on intimate technologies. Presented Night Data with live sensor-responsive performance.",
    image:
      "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Signal Festival Commission",
    venue: "Public Installation",
    location: "Prague, CZ",
    dates: "October 2023",
    status: "Archive",
    summary:
      "Projection mapping commission translating family photo archives into dynamic street-scale visuals across historic facades.",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80",
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

export default function Page() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAllWorks, setShowAllWorks] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const goToIndex = (index: number) => {
    if (index < 0 || index >= sections.length) return;
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

  const sliderStyle = {
    transform: `translateX(-${activeIndex * 100}%)`,
  };

  const sectionStyle = {
    minHeight: "calc(100vh - 72px)",
  };

  const renderBio = () => (
    <div className="flex min-w-full flex-col px-6 pb-24 pt-10 sm:px-10" style={sectionStyle}>
      <div className="relative h-64 w-full border border-neutral-200 bg-neutral-100 sm:h-80">
        <Image
          src={profile.coverImage}
          alt={`${profile.name} cover`}
          fill
          className="object-cover"
          priority
          sizes="(min-width: 768px) 720px, 100vw"
        />
      </div>
      <div className="mt-6 space-y-3">
        <h1 className="text-4xl font-light tracking-tight sm:text-5xl">{profile.name}</h1>
        <p className="text-sm uppercase tracking-[0.28em] text-neutral-500">
          b. {profile.birthYear}, {profile.location}
        </p>
        <p className="text-base leading-7 text-neutral-700">{profile.summary}</p>
      </div>
      <div className="mt-10 space-y-4 text-base leading-7 text-neutral-700">
        {bioCopy.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );

  const renderCV = () => (
    <div className="flex min-w-full flex-col px-6 pb-24 pt-10 sm:px-10" style={sectionStyle}>
      <h2 className="text-2xl uppercase tracking-[0.2em] text-neutral-600">CV</h2>
      <div className="mt-6 space-y-4">
        {cvSections.map((section) => (
          <details key={section.title} className="border border-neutral-200">
            <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-neutral-800">
              {section.title}
            </summary>
            <ul className="space-y-2 border-t border-neutral-200 px-4 py-3 text-sm text-neutral-600">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </div>
  );

  const renderWorks = () => {
    if (showAllWorks) {
      return (
        <div className="flex min-w-full flex-col px-6 pb-24 pt-10 sm:px-10" style={sectionStyle}>
          <h2 className="text-2xl uppercase tracking-[0.2em] text-neutral-600">Works</h2>
          <div className="mt-6 space-y-3">
            {works.map((work) => (
              <div key={work.title} className="flex items-start gap-3 border border-neutral-200 p-3">
                <div className="relative h-20 w-20 bg-neutral-100">
                  <Image
                    src={work.image}
                    alt={`${work.title} thumbnail`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex flex-1 flex-col text-[13px] text-neutral-700">
                  <span className="text-base text-neutral-900">{work.title}</span>
                  <span>{work.year}</span>
                  <span>{work.medium}</span>
                  <span>{work.dimensions}</span>
                  <span>{work.price}</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      `mailto:${profile.enquiriesEmail}?subject=Artwork enquiry: ${encodeURIComponent(
                        work.title,
                      )}`,
                    )
                  }
                  className="border border-neutral-900 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-neutral-900"
                >
                  Enquire
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowAllWorks(false)}
            className="mt-6 border border-neutral-900 px-5 py-2 text-xs uppercase tracking-[0.2em] text-neutral-900"
          >
            Show featured view
          </button>
        </div>
      );
    }

    const featured = works.slice(0, 3);

    return (
      <div className="flex min-w-full flex-col px-6 pb-24 pt-10 sm:px-10" style={sectionStyle}>
        <h2 className="text-2xl uppercase tracking-[0.2em] text-neutral-600">Works</h2>
        <div className="mt-6 space-y-8">
          {featured.map((work) => (
            <article key={work.title} className="border border-neutral-200">
              <div className="relative aspect-[3/2] bg-neutral-100">
                <Image
                  src={work.image}
                  alt={`${work.title} artwork`}
                  fill
                  className="object-cover"
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
                      `mailto:${profile.enquiriesEmail}?subject=Artwork enquiry: ${encodeURIComponent(
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
        <button
          type="button"
          onClick={() => setShowAllWorks(true)}
          className="mt-8 border border-neutral-900 px-5 py-2 text-xs uppercase tracking-[0.2em] text-neutral-900"
        >
          View more works
        </button>
      </div>
    );
  };

  const renderExhibitions = () => (
    <div className="flex min-w-full flex-col px-6 pb-24 pt-10 sm:px-10" style={sectionStyle}>
      <h2 className="text-2xl uppercase tracking-[0.2em] text-neutral-600">Exhibitions</h2>
      <div className="mt-6 space-y-4">
        {exhibitions.map((show, index) => (
          <details key={show.title} open={index === 0} className="border border-neutral-200">
            <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-neutral-800">
              {show.title} · {show.status}
            </summary>
            <div className="space-y-3 border-t border-neutral-200 px-4 py-3 text-sm text-neutral-600">
              <div className="relative h-48 w-full border border-neutral-200 bg-neutral-100">
                <Image
                  src={show.image}
                  alt={`${show.title} installation view`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 720px, 100vw"
                />
              </div>
              <p>
                {show.venue} · {show.location}
              </p>
              <p>{show.dates}</p>
              <p>{show.summary}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="flex min-w-full flex-col px-6 pb-24 pt-10 sm:px-10" style={sectionStyle}>
      <h2 className="text-2xl uppercase tracking-[0.2em] text-neutral-600">Contact</h2>
      <div className="mt-6 grid gap-3 text-sm text-neutral-700 sm:grid-cols-3">
        {contacts.map((item) => (
          <Link key={item.label} href={item.href} className="border border-neutral-200 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{item.label}</p>
            <p className="mt-1 text-neutral-900">{item.value}</p>
          </Link>
        ))}
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
    <main className="bg-white text-neutral-900 pb-[72px]">
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={sliderStyle}
        >
          {sections.map((section) => {
            const SectionContent = contentById[section.id];
            return <SectionContent key={section.id} />;
          })}
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-neutral-200 bg-white">
        <div className="mx-auto flex w-full max-w-md divide-x divide-neutral-200 text-xs uppercase tracking-[0.2em] text-neutral-600">
          {sections.map((section, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => goToIndex(index)}
                className={`flex-1 py-3 text-center ${
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
