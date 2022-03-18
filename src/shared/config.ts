import dotenv from "dotenv";
import Debug from "debug";

const debug = Debug("app:config");
debug.log = console.log.bind(console);
const path = require("path");

dotenv.config();

const rootDir = path.join(path.dirname(require.main?.filename), "../");

export const Environments = {
  production: "production",
  development: "development",
  test: "test",
};

export const config = {
  rootServerDirectory: rootDir,
  productionEnvironment: process.env.NODE_ENV === Environments.production,
  testEnvironment: process.env.NODE_ENV === Environments.test,
  developmentEnvironment: process.env.NODE_ENV === Environments.development,
  environment: process.env.NODE_ENV || Environments.development,
  security: {
    privateKey: process.env.APP_SECURITY_PRIVATE_KEY || "anythingCanBeUsedHere",
    tokenExpiry: process.env.NODE_ENV === Environments.production ? 3600 : 24 * 60 * 60,
    verificationCodeExpiryInMinutes: 10,
    jwtAlgorithm: "HS512",
    saltRounds: 10,
    issuer: "accounts.mediumclone.com",
    audience: "mediumclone.com",
    violationAlertsSentTo: "nbabekah@mun.ca",
  },
  tableNames: {
    files: "files",
    users: "users",
    articles: "articles",
    comments: "comments",
  },
  cors: {
    origin: process.env.NODE_ENV === Environments.production ? "https://mediumclone.ca" : "http://localhost:3000",
  },
  mongodb: {
    host: "mongodb://127.0.0.1:27017",
    dbName: "MediumClone",
  },
};
