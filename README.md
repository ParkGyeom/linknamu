# 링크나무 🌳

내 모든 링크를 한 페이지에 모아 두고, 하나의 URL로 공유하는 서비스입니다.

## 기술 스택

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- MongoDB Atlas (링크별 클릭 수 저장)
- Vercel 배포

## 시작하기

```bash
npm install
cp .env.local.example .env.local   # MongoDB Atlas 연결 정보 입력
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

> `MONGODB_URI` 없이도 페이지는 정상 동작합니다. 이 경우 클릭 수만 기록·표시되지 않습니다.

## 프로필 / 링크 수정

`src/lib/profile.ts` 의 `profile`, `links` 를 수정하면 화면에 바로 반영됩니다.

- `profile.avatarUrl` 을 비워 두면 이름 이니셜 원형 아바타가 표시됩니다.
- `LinkItem.id` 는 클릭 수 집계 키이므로 한 번 정하면 바꾸지 않습니다.

## 구조

```
src/
├── app/
│   ├── layout.tsx                        # 루트 레이아웃, 메타데이터
│   ├── page.tsx                          # 프로필 + 링크 목록 페이지
│   └── api/links/[id]/click/route.ts     # POST — 클릭 수 +1
├── components/
│   ├── ProfileHeader.tsx                 # 원형 프로필 사진, 이름, 한 줄 소개
│   ├── LinkList.tsx                      # 링크 카드 목록
│   └── LinkCard.tsx                      # 링크 카드 (클릭 시 집계 요청)
└── lib/
    ├── profile.ts                        # 프로필·링크 데이터
    ├── mongodb.ts                        # MongoDB 연결 (개발 모드 커넥션 캐시)
    └── clicks.ts                         # 클릭 수 조회 / 기록
```

## 클릭 수 집계 방식

`linkClicks` 컬렉션에 링크 id 를 `_id` 로 하는 문서를 두고 `$inc` 로 누적합니다.

```json
{ "_id": "github", "count": 12, "updatedAt": "2026-09-07T11:39:10.020Z" }
```

카드를 클릭하면 링크 이동과 별개로 `POST /api/links/:id/click` 요청이 `keepalive` 로 전송되므로,
같은 탭에서 페이지를 떠나도 집계가 유실되지 않습니다. 집계에 실패해도 링크 이동은 그대로 동작합니다.

## 배포 (Vercel)

프로젝트를 Vercel 에 연결한 뒤 환경 변수 `MONGODB_URI`, `MONGODB_DB` 를 등록합니다.
MongoDB Atlas 의 Network Access 에서 Vercel 접근을 허용해야 합니다.
