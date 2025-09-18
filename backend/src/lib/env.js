import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  DB_USER: process.env.DB_USER,
  DB_PWD: process.env.DB_PWD,
  JWT_SECRET: process.env.JWT_SECRET,
  RESEND_KEY: process.env.RESEND_KEY,
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
  EMAIL_FROM: process.env.EMAIL_FROM,
  CLIENT_URL: process.env.CLIENT_URL,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  ARCJET_KEY: process.env.ARCJET_KEY,
  ARCJET_ENV: process.env.ARCJET_ENV,
};
