import "server-only";

import { getLinkClicksCollection } from "@/lib/mongodb";

/** 링크 id → 클릭 수. DB 가 연결되지 않았으면 빈 객체를 돌려줍니다. */
export async function getClickCounts(): Promise<Record<string, number>> {
  try {
    const collection = await getLinkClicksCollection();
    if (!collection) return {};

    const docs = await collection.find({}).toArray();
    return Object.fromEntries(docs.map((doc) => [doc._id, doc.count]));
  } catch (error) {
    // 집계는 부가 기능이므로, 실패해도 페이지 자체는 정상적으로 보여 줍니다.
    console.error("[linknamu] 클릭 수를 불러오지 못했습니다:", error);
    return {};
  }
}

/** 링크 클릭 1회를 기록하고, 누적 클릭 수를 돌려줍니다. */
export async function recordClick(linkId: string): Promise<number | null> {
  const collection = await getLinkClicksCollection();
  if (!collection) return null;

  const result = await collection.findOneAndUpdate(
    { _id: linkId },
    { $inc: { count: 1 }, $set: { updatedAt: new Date() } },
    { upsert: true, returnDocument: "after" },
  );

  return result?.count ?? null;
}
