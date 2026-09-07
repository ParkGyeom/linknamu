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

/**
 * 메일 주소를 아이디와 도메인으로 쪼개 둡니다. 서버가 내려보내는 HTML에
 * "a@b" 형태가 한 번도 등장하지 않아, 정규식으로 훑는 스팸 수집기에 걸리지
 * 않습니다. 실제 mailto: 주소는 브라우저에서 조립합니다.
 */
export type MailAddress = { user: string; domain: string };

export type LinkItem = {
  /** 클릭 수 집계 키로 쓰이므로 한 번 정하면 바꾸지 않습니다. */
  id: string;
  label: string;
} & (
  | { url: string; mail?: never }
  | { url?: never; mail: MailAddress }
);

export const profile: Profile = {
  name: "박 겸",
  bio: "풀스택 개발자 | 요즘에는 AI 개발에 관심이 많아요",
  avatarUrl: "/profile.jpg",
};

export const links: LinkItem[] = [
  { id: "github", label: "🐙 깃허브", url: "https://github.com/ParkGyeom" },
  {
    id: "instagram",
    label: "📸 인스타",
    url: "https://www.instagram.com/dhdldx/",
  },
  {
    id: "email",
    label: "📮 이메일",
    mail: { user: "pg08100830", domain: "gmail.com" },
  },
];

export function findLink(id: string): LinkItem | undefined {
  return links.find((link) => link.id === id);
}
