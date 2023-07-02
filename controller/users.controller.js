import express from "express";
import * as service from "../services/users.service.js";

const router = express.Router();
// using promises
// router.get('/users',  (req, res, next) => {
//   db.query("SELECT * FROM users")
// .then((data) => res.send(data[0]))
// .catch((err) => console.log(err))
// // res.send("get users")
// });

// get users
router.get("/", async (req, res) => {
  const users = await service.getUsers();
  res.status(201).json({ message: "Success", data: users });
});

//get user by id
router.get("/:id", async (req, res) => {
  const user = await service.getUserbyId(req.params.id);
  if (user == undefined)
    return res
      .status(400)
      .json({ message: "No record with this Id: " + req.params.id });
  res.send(user);
});

// delete user
router.delete("/:id", async (req, res) => {
  const affectedRows = await service.deleteUser(req.params.id);
  // console.log(affectedRows);
  if (affectedRows == 0)
    return res
      .status(400)
      .json({ message: "No record with this Id: " + req.params.id });
  res.status(201).json({ message: "Deleted Successfully", data: true });
});

// add/create user
router.post("/", async (req, res) => {
  await service.CreateOrEditUser(req.body);
  res.status(201).json({ message: "user created successfully", data: true });
});

// edit/update user
router.put("/:id", async (req, res) => {
  const affectedRows = await service.CreateOrEditUser(req.body, req.params.id);
  if (affectedRows == 0)
    return res
      .status(400)
      .json({ message: "No record with this Id:" + req.params.id });
  res.status(201).json({ message: "Updated Successfully", data: true });
  // res.send(data);
});

export default router;
