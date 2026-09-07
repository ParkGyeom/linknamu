import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/lib/profile";

type Props = {
  links: LinkItem[];
  clickCounts: Record<string, number>;
  /** DB 연결이 없으면 클릭 수를 아예 표시하지 않습니다. */
  showClickCounts: boolean;
};

export default function LinkList({ links, clickCounts, showClickCounts }: Props) {
  return (
    <nav aria-label="링크 목록" className="flex flex-col gap-4 sm:gap-[18px]">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          clickCount={showClickCounts ? (clickCounts[link.id] ?? 0) : undefined}
        />
      ))}
    </nav>
  );
}
