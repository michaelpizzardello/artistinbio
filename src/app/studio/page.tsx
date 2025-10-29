'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "profile", label: "Profile" },
  { id: "works", label: "Artworks" },
  { id: "exhibitions", label: "Exhibitions" },
  { id: "assets", label: "Assets" },
  { id: "settings", label: "Settings" },
];

const artistProfile = {
  name: "Ava Martinez",
  discipline: "Multidisciplinary Artist",
  location: "Brooklyn, NY",
  focusStatement:
    "Immersive installations translating archival light, modular sound, and sculpture into contemporary rituals of memory.",
  email: "ava@studio-example.com",
  representation: "Outsider Gallery AU",
  website: "https://ava-martinez.art",
  portrait:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
};

const quickStats = [
  { label: "Profile completion", value: "94%" },
  { label: "Published works", value: "12" },
  { label: "Upcoming shows", value: "3" },
];

const quickActions = [
  {
    title: "Upload new artwork",
    description: "Add images, video embeds, and catalogue details in one place.",
  },
  {
    title: "Create exhibition entry",
    description: "Schedule a new show and publish it to the public page.",
  },
  {
    title: "Preview public profile",
    description: "Open the live gallery view collectors see.",
  },
];

const artworks = [
  {
    title: "Signal Bloom",
    status: "Published",
    details: "Holographic resin · 140 × 80 × 80 cm",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1080&q=80",
  },
  {
    title: "Night Data",
    status: "Draft",
    details: "Custom LED array · Generative audio",
    image:
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1080&q=80",
  },
  {
    title: "Memory Field",
    status: "Published",
    details: "Interactive light sculpture",
    image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1080&q=80",
  },
];

const exhibitions = [
  {
    title: "Echo Light",
    venue: "Current Space · New York, NY",
    dates: "Nov 8 – Dec 12, 2024",
    status: "On view",
  },
  {
    title: "Sensors & Sentiments",
    venue: "Aurora Gallery · Toronto, CA",
    dates: "July 2024",
    status: "Archive",
  },
];

export default function Studio() {
  const [activeTab, setActiveTab] = useState<string>("overview");

  return (
    <div className="bg-white text-neutral-900">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 pb-20 pt-16 md:px-8 lg:px-12">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.36em] text-neutral-400">Artist studio</p>
          <h1 className="text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl">
            Manage your presentation
          </h1>
          <p className="max-w-2xl text-base leading-7 text-neutral-600">
            Update portfolio content, review upcoming exhibitions, and keep your public profile in
            sync. Designed for quick edits on mobile or desktop.
          </p>
        </header>

        <div className="sticky top-0 z-20 -mx-6 border-y border-neutral-200 bg-white/95 px-6 py-3 text-xs uppercase tracking-[0.28em] text-neutral-500 backdrop-blur md:-mx-8 md:px-8 lg:-mx-12 lg:px-12">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-4 py-2 transition ${
                  activeTab === tab.id
                    ? "bg-neutral-900 text-white"
                    : "border border-transparent hover:border-neutral-300 hover:text-neutral-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "overview" && <OverviewSection />}
        {activeTab === "profile" && <ProfileSection />}
        {activeTab === "works" && <WorksSection />}
        {activeTab === "exhibitions" && <ExhibitionsSection />}
        {activeTab === "assets" && <AssetsSection />}
        {activeTab === "settings" && <SettingsSection />}
      </main>
    </div>
  );
}

function OverviewSection() {
  return (
    <section className="space-y-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <article className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6">
          <div className="flex items-center gap-5">
            <div className="relative h-20 w-20 overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white">
              <Image
                src={artistProfile.portrait}
                alt={`${artistProfile.name} portrait`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900">{artistProfile.name}</p>
              <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
                {artistProfile.discipline}
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {quickStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.25rem] border border-neutral-200 bg-white px-4 py-4 text-sm"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">{stat.label}</p>
                <p className="mt-2 text-lg font-medium text-neutral-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6">
          <p className="text-xs uppercase tracking-[0.32em] text-neutral-400">Quick actions</p>
          <div className="mt-4 space-y-2">
            {quickActions.map((action) => (
              <details
                key={action.title}
                className="group rounded-2xl border border-neutral-200 bg-white px-4 py-3 transition open:shadow-[0_20px_45px_rgba(15,15,15,0.06)]"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-medium text-neutral-900">
                  <span>{action.title}</span>
                  <span className="text-neutral-400 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-xs text-neutral-500">{action.description}</p>
              </details>
            ))}
          </div>
        </article>
      </div>

      <article className="rounded-[2rem] border border-neutral-200 bg-white p-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.32em] text-neutral-400">Latest updates</p>
            <h2 className="text-2xl font-light text-neutral-900">Keep your public page current</h2>
            <p className="text-sm text-neutral-600">
              Upload documentation, confirm exhibition details, and publish with one tap.
            </p>
          </div>
          <div className="space-y-3 text-sm text-neutral-600">
            <details className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
              <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-medium text-neutral-900">
                Echo Light catalogue PDF
                <span className="text-neutral-400">Tap to view</span>
              </summary>
              <p className="mt-2 text-xs text-neutral-500">
                Uploaded 2 hours ago · ready to share with press and collectors.
              </p>
            </details>
            <details className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
              <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-medium text-neutral-900">
                Night Data artwork draft
                <span className="text-neutral-400">Tap to resume</span>
              </summary>
              <p className="mt-2 text-xs text-neutral-500">
                Metadata incomplete · tap “Edit” in the Artworks tab to finalise dimensions and audio credits.
              </p>
            </details>
          </div>
        </div>
      </article>
    </section>
  );
}

function ProfileSection() {
  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-neutral-400">Profile</p>
          <h2 className="text-2xl font-light text-neutral-900">Primary information</h2>
        </div>
        <button className="rounded-full border border-neutral-900 px-6 py-2 text-xs uppercase tracking-[0.24em] transition hover:bg-neutral-900 hover:text-white">
          Save changes
        </button>
      </div>

      <form className="space-y-8 rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField label="Name" defaultValue={artistProfile.name} />
          <FormField label="Discipline" defaultValue={artistProfile.discipline} />
          <FormField label="Location" defaultValue={artistProfile.location} />
          <FormField label="Representation" defaultValue={artistProfile.representation} />
          <FormField label="Contact email" type="email" defaultValue={artistProfile.email} />
          <FormField label="Website" type="url" defaultValue={artistProfile.website} />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.28em] text-neutral-500">
            Focus statement
          </label>
          <textarea
            className="min-h-[140px] w-full resize-none rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
            defaultValue={artistProfile.focusStatement}
          />
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-[0.28em] text-neutral-500">
              Portrait asset
            </label>
            <div className="flex items-center gap-4 rounded-2xl border border-dashed border-neutral-300 bg-white/70 px-4 py-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-[1.25rem] border border-neutral-200 bg-white">
                <Image
                  src={artistProfile.portrait}
                  alt="Portrait preview"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="space-y-1 text-sm">
                <p className="font-medium text-neutral-900">portrait.jpg</p>
                <p className="text-xs text-neutral-500">Tap to replace · 1200 × 1500</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-[0.28em] text-neutral-500">
              CV highlight
            </label>
            <textarea
              className="min-h-[120px] w-full resize-none rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
              defaultValue="Artist in Residence — Waveform Labs (2024)"
            />
          </div>
        </div>
      </form>
    </section>
  );
}

type FormFieldProps = {
  label: string;
  defaultValue?: string;
  type?: string;
};

function FormField({ label, defaultValue, type = "text" }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-[0.28em] text-neutral-500">{label}</label>
      <input
        type={type}
        className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
        defaultValue={defaultValue}
      />
    </div>
  );
}

function WorksSection() {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-neutral-400">Artworks</p>
          <h2 className="text-2xl font-light text-neutral-900">Published and drafts</h2>
        </div>
        <button className="rounded-full border border-neutral-900 px-6 py-2 text-xs uppercase tracking-[0.24em] transition hover:bg-neutral-900 hover:text-white">
          + Add artwork
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {artworks.map((work) => (
          <article
            key={work.title}
            className="space-y-4 rounded-[2rem] border border-neutral-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,15,15,0.08)]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem]">
              <Image
                src={work.image}
                alt={`${work.title} artwork`}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 360px, 90vw"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs uppercase tracking-[0.24em] text-neutral-600">
                {work.status}
              </span>
            </div>
            <div className="space-y-1 text-sm text-neutral-600">
              <p className="font-medium text-neutral-900">{work.title}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{work.details}</p>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 rounded-full border border-neutral-200 px-4 py-2 text-xs uppercase tracking-[0.2em] text-neutral-500 transition hover:border-neutral-900 hover:text-neutral-900">
                Edit
              </button>
              <button className="flex-1 rounded-full border border-neutral-900 px-4 py-2 text-xs uppercase tracking-[0.2em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white">
                Publish
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExhibitionsSection() {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-neutral-400">Exhibitions</p>
          <h2 className="text-2xl font-light text-neutral-900">Schedule and archive</h2>
        </div>
        <button className="rounded-full border border-neutral-900 px-6 py-2 text-xs uppercase tracking-[0.24em] transition hover:bg-neutral-900 hover:text-white">
          + Add exhibition
        </button>
      </div>
      <div className="space-y-4 rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6">
        {exhibitions.map((show) => (
          <article
            key={show.title}
            className="flex flex-wrap items-center gap-4 rounded-[1.5rem] border border-neutral-200 bg-white px-4 py-4 text-sm text-neutral-600"
          >
            <div className="min-w-[180px] space-y-1">
              <p className="font-medium text-neutral-900">{show.title}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{show.venue}</p>
            </div>
            <div className="min-w-[160px] space-y-1">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Dates</p>
              <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">{show.dates}</p>
            </div>
            <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs uppercase tracking-[0.2em] text-neutral-500">
              {show.status}
            </span>
            <div className="ml-auto flex gap-2">
              <button className="rounded-full border border-neutral-200 px-4 py-2 text-xs uppercase tracking-[0.2em] text-neutral-500 transition hover:border-neutral-900 hover:text-neutral-900">
                Edit
              </button>
              <button className="rounded-full border border-neutral-200 px-4 py-2 text-xs uppercase tracking-[0.2em] text-neutral-500 transition hover:border-neutral-900 hover:text-neutral-900">
                Preview
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AssetsSection() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.32em] text-neutral-400">Assets</p>
        <h2 className="text-2xl font-light text-neutral-900">Press materials</h2>
      </div>
      <div className="rounded-[2rem] border border-dashed border-neutral-300 bg-neutral-50 p-8 text-sm text-neutral-600">
        <p>Drag images, videos, or PDFs here, or tap to browse files from your device.</p>
        <button className="mt-4 rounded-full border border-neutral-900 px-6 py-2 text-xs uppercase tracking-[0.24em] transition hover:bg-neutral-900 hover:text-white">
          Upload assets
        </button>
      </div>
    </section>
  );
}

function SettingsSection() {
  return (
    <section className="space-y-6 text-sm text-neutral-600">
      <div>
        <p className="text-xs uppercase tracking-[0.32em] text-neutral-400">Settings</p>
        <h2 className="text-2xl font-light text-neutral-900">Account preferences</h2>
      </div>
      <div className="space-y-4 rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6">
        <p>
          Manage notifications, connect social accounts, and update billing details. Contact the
          Outsider Gallery team for support.
        </p>
        <Link
          href="mailto:support@outsidergallery.au"
          className="inline-flex items-center gap-3 rounded-full border border-neutral-900 px-6 py-2 text-xs uppercase tracking-[0.24em] transition hover:bg-neutral-900 hover:text-white"
        >
          Email support
          <span aria-hidden>↗</span>
        </Link>
      </div>
    </section>
  );
}
