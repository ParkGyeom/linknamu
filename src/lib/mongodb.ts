import { MongoClient, type Collection, type Db } from "mongodb";

/**
 * MongoDB Atlas 연결.
 *
 * MONGODB_URI 가 없으면 null 을 돌려주고, 호출부는 클릭 수 없이 동작합니다.
 * (환경 변수 없이도 로컬에서 화면을 띄워 볼 수 있게 하기 위함)
 */

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "linknamu";

export type LinkClickDoc = {
  /** LinkItem.id 를 그대로 _id 로 사용합니다. */
  _id: string;
  count: number;
  updatedAt: Date;
};

// 개발 모드의 HMR 에서 커넥션이 계속 늘어나지 않도록 전역에 캐시합니다.
const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClientPromise(): Promise<MongoClient> | null {
  if (!uri) return null;

  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect();
  }

  return globalForMongo._mongoClientPromise;
}

export async function getDb(): Promise<Db | null> {
  const clientPromise = getClientPromise();
  if (!clientPromise) return null;

  const client = await clientPromise;
  return client.db(dbName);
}

export async function getLinkClicksCollection(): Promise<Collection<LinkClickDoc> | null> {
  const db = await getDb();
  return db ? db.collection<LinkClickDoc>("linkClicks") : null;
}
