/**
 * 링크나무에 표시할 프로필과 링크 목록.
 *
 * 지금은 보여 주기용 더미 값입니다. 실제 내용으로 교체할 때
 * 이 파일만 수정하면 화면에 그대로 반영됩니다.
 */

export type Profile = {
  name: string;
  bio: string;
  /** 원형 프로필 사진. 비워 두면 이름 이니셜 아바타가 표시됩니다. */
  avatarUrl?: string;
};

export type LinkItem = {
  /** 클릭 수 집계 키로 쓰이므로 한 번 정하면 바꾸지 않습니다. */
  id: string;
  label: string;
  url: string;
};

export const profile: Profile = {
  name: "김클로",
  bio: "세계 최강 바이브 코더",
  // TODO: 실제 프로필 사진으로 교체
  avatarUrl: "/avatar-placeholder.png",
};

// TODO: 실제 링크 주소로 교체
export const links: LinkItem[] = [
  { id: "github", label: "GitHub", url: "https://github.com" },
  { id: "linkedin", label: "LinkedIn", url: "https://linkedin.com" },
  { id: "blog", label: "Blog", url: "https://blog.example.com" },
];

export function findLink(id: string): LinkItem | undefined {
  return links.find((link) => link.id === id);
}
