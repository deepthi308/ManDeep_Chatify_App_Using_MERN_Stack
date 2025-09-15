import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Checking if all the values are entered
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Checking if the email is valid or not
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // Checking if the password length is >= 6 characters
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be atleast 6 characters",
      });
    }

    // Checking if the user already exists
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // If all the checks are satisfied, hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    // Once the user is created, generating the token
    if (newUser) {
      //Saving the user to DB
      await newUser.save();
      //Generating the token
      generateToken(newUser._id, res);

      //Returning the newly created user data as a response
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });

      //Todo: Send a welcome email to the user
    } else {
      res.status(400).json({
        message: "Invalid user data",
      });
    }
  } catch (error) {
    console.log(`Error in Sign Up Controller: ${error}`);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const signIn = async (req, res) => {
  res.status(200).json({
    message: "Sign In Route",
  });
};

export const signOut = (req, res) => {
  res.status(200).json({
    message: "Sign Out Route",
  });
};
