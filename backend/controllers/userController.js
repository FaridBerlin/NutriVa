import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
    console.log("req.user =", req.user);
    try {
    const user = await User.findById(req.user.id).select("-password");

    //  const user = await User.findById(decoded.userId);
    //   console.log({decoded, user});

    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password;
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
