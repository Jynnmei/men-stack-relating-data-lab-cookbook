import User from "../models/User.js";

export const seedUserFood = async (req, res) => {
  try {
    await User.deleteMany({});

    const defaultPantry = [
      { name: "Apple" },
      { name: "Rice" },
      { name: "Chicken Breast" },
      { name: "Broccoli" },
      { name: "Eggs" },
      { name: "Almonds" },
      { name: "Salmon" },
      { name: "Milk" },
      { name: "Potato" },
      { name: "Tofu" },
    ];

    const user = await User.create({
      pantry: defaultPantry,
    });

    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "seeding error" });
  }
};

export const getAllFood = async (req, res) => {
  const allFood = await User.find();
  res.json(allFood);
};

// // AAU, I want to add new items to my pantry and after submission to receive
// // confirmation that the item has been saved in my pantry.
export const addUserNewFood = async (req, res) => {
  try {
    console.log("Decoded User ID: ", req.decoded.id);

    const user = await User.findById(req.decoded.id);

    if (!user) {
      return res.status(404).json({ status: "error", msg: "User not found" });
    }

    const newFood = { name: req.body.name };
    user.pantry.push(newFood);
    await user.save();

    res.json({ status: "ok", msg: "food saved" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error saving food" });
  }
};

// AAU, I need a to view all items in my pantry, to easily manage and review what I have stored.
export const getUserFood = async (req, res) => {
  try {
    const userFood = await User.findById(req.params.userId);
    res.json(userFood);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Error getting food" });
  }
};

// // AAU, I need the ability to edit and delete items in my pantry,
// // allowing me full control over managing my stored items.
export const deleteUserFood = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ status: "error", msg: "User not found" });
    }

    user.pantry = user.pantry.filter((item) => item.name !== req.body.name);

    await user.save();

    res.json({ status: "ok", msg: "Food item deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(400).json({ status: "error", msg: "Error deleting food" });
  }
};

export const putFood = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ status: "error", msg: "User not found" });
    }

    const foodItem = user.pantry.id(req.params.itemId);

    if (!foodItem) {
      return res
        .status(404)
        .json({ status: "error", msg: "Food item not found" });
    }

    foodItem.name = req.body.name;

    await user.save();

    res.json({ status: "ok", msg: "Food updated" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Error updating food" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ status: "ok", users });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Error fetching users" });
  }
};

export const getUserPantry = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ status: "error", msg: "User not found" });
    }

    res.json({ status: "ok", pantry: user.pantry });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Server error" });
  }
};
