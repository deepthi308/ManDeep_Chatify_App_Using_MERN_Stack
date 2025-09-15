import jwt from "jsonwebtoken";

export const generateToken = async (userId, res) => {
  const token = jwt.sign(
    {
      userId: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 1000, // Milli Seconds
    httpOnly: true, // To prevent XSS Attacks: Cross-Site Scripting
    sameSite: "strict", // To prevent CSRF Attacks
    secure: process.env.NODE_ENV === "development" ? false : true,
  });

  return token;
};
