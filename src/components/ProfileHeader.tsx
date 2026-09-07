import Image from "next/image";

import type { Profile } from "@/lib/profile";

/** 이름에서 아바타에 쓸 이니셜(최대 2글자)을 뽑습니다. */
function initialsOf(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2);
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="relative">
        {/* 사진 뒤에 깔리는 차가운 번짐 — 살짝 떠 있는 느낌만 줍니다. */}
        <div
          aria-hidden
          className="absolute -inset-4 rounded-full bg-[radial-gradient(closest-side,rgb(125_211_252/0.28),transparent)] blur-xl"
        />
        {profile.avatarUrl ? (
          <Image
            src={profile.avatarUrl}
            alt={`${profile.name} 프로필 사진`}
            width={144}
            height={144}
            className="relative size-36 rounded-full object-cover shadow-avatar ring-1 ring-white/15"
            priority
          />
        ) : (
          <div
            aria-hidden
            className="relative flex size-36 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-4xl font-semibold text-white shadow-avatar ring-1 ring-white/15"
          >
            {initialsOf(profile.name)}
          </div>
        )}
      </div>

      <h1 className="mt-7 text-2xl font-bold tracking-tight">{profile.name}</h1>
      <p className="mt-2.5 text-[13px] leading-relaxed text-muted">
        {profile.bio}
      </p>
    </header>
  );
}
