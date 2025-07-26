import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  try {
    const token = jwt.sign({ id: userId }, process.env["JWT_SECRET"], {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure:true,
      
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
