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
      {profile.avatarUrl ? (
        <Image
          src={profile.avatarUrl}
          alt={`${profile.name} 프로필 사진`}
          width={160}
          height={160}
          className="size-40 rounded-full object-cover ring-2 ring-black/5 dark:ring-white/10"
          priority
        />
      ) : (
        <div
          aria-hidden
          className="flex size-40 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-4xl font-semibold text-white ring-2 ring-black/5 dark:ring-white/10"
        >
          {initialsOf(profile.name)}
        </div>
      )}

      <h1 className="mt-6 text-xl font-bold tracking-tight">{profile.name}</h1>
      <p className="mt-1.5 text-sm text-black/60 dark:text-white/60">
        {profile.bio}
      </p>
    </header>
  );
}
