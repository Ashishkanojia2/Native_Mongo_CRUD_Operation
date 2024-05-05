const express = require("express");
const app = express();
const userModule = require("./Modules/user");

app.get("/", (req, res) => {
  res.send("hey it's Working");
});
app.get("/create", async (req, res) => {
  let { name, username, email } = req.body;
  if (!name || !username || !email) {
    console.log("user ka data nhi mill raha");
  }
  let user = await userModule.create({
    name: "Ashish Kanojia",
    username: "Ashishkanojia",
    email: "kanojiaashish02@gmail.com",
  });
  console.log(user);
});

// app.post("/create", async (req, res) => {
//   try {
//     let { name, username, email } = req.body;
//     if (!name || !username || !email) {
//       console.log("user ka data nhi mill raha");
//     } else {
//       console.log(name, username, email);
//       let user = await userModule.create(req.body);
//       console.log(user);
//       res.status(201).json(user); // Send back the created user as JSON response
//     }
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).send("Error creating user");
//   }
// });

app.use(express.json()); // Add this middleware to parse JSON request bodies

app.post("/create", async (req, res) => {
  let { name, username, email } = req.body;
  if (!name || !username || !email) {
    console.log("User data is missing or invalid");
    res.status(400).json("User data is missing or invalid");
    return;
  }
  try {
    let { name, username, email } = req.body;
    let user = await userModule.create({ name, username, email });
    console.log(user);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
});

app.post("/update", async (req, res) => {
  let { email, name, username } = req.body;
  let UpdatedUesr = await userModule
    .findOneAndUpdate(
      { email: email },
      { name: name, username: username },
      { new: true }
    )
    .then((res) => {
      console.log("=ye raha res ", res);
    });
  console.log("ye raha updated user", UpdatedUesr);
});
// app.post("/delete", async (req, res) => {
//   let { email } = req.body;
//   let deleteuser = await userModule
//     .findOneAndDelete({ email: email })
//     .then((res) => {
//       console.log("=ye raha res ", res);
//     });
//   console.log("ye raha delete user", deleteuser);
// });

app.post("/delete", async (req, res) => {
  try {
    let { email } = req.body;

    // Find and delete the user by email
    let deletedUser = await userModule.findOneAndDelete({ email: email });

    // Log the deleted user
    console.log("Deleted user:", deletedUser);

    // Send a success response
    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    // Handle errors
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
});

//NEW UPDAED CODE

// app.post("/update", async (req, res) => {
//   try {
//     let { email, name, username } = req.body;

//     // Find the user by email and update its name and username
//     let updatedUser = await userModule.findOneAndUpdate(
//       { email: email }, // Search criteria
//       { name: name, username: username }, // Updated fields
//       { new: true } // Return the updated document
//     );

//     // Check if the user was updated successfully
//     // if (updatedUser) {
//     //   console.log("Updated user:", updatedUser);
//     //   res
//     //     .status(200)
//     //     .json({ message: "User updated successfully", user: updatedUser });
//     // } else {
//     //   console.log("User not found or not updated");
//     //   res.status(404).json({ message: "User not found or not updated" });
//     // }
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(500).json({ message: "Error updating user" });
//   }
// });

app.get("/users", async (req, res) => {
  try {
    const users = await userModule.find();
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).send("Error retrieving users");
  }
});

app.listen(3000);
