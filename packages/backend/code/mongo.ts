import { Db, MongoClient } from "mongodb";

/**
 * Sets up the MongoDB database.
 */
export async function setupMongoDatabase(): Promise<Db | undefined> {
  const localUrl = `mongodb://0.0.0.0:27017/`;
  const atlasUrl = `mongodb+srv://codenames:${process.env.MONGO_PASSWORD}@codenames.z041u.mongodb.net/?retryWrites=true&w=majority`;
  const mongoUrl = process.argv[2] === "dev" ? localUrl : atlasUrl;
  let db: Db | undefined;

  try {
    const mongoClient = await MongoClient.connect(mongoUrl);
    db = mongoClient?.db("codenamesdb");
  } catch (error) {
    throw error;
  }

  return db;
}
