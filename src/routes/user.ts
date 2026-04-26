import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const router = Router();
const repo = () => AppDataSource.getRepository(User);

// Search users by nickname
router.get("/search", async (req: Request, res: Response) => {
  const { nickname } = req.query;
  if (!nickname || typeof nickname !== "string") {
    return res.status(400).json({ message: "nickname query param is required" });
  }
  const users = await repo()
    .createQueryBuilder("user")
    .where("user.nickname LIKE :nickname", { nickname: `%${nickname}%` })
    .getMany();
  res.json(users);
});

// Get all users
router.get("/", async (_req: Request, res: Response) => {
  const users = await repo().find();
  res.json(users);
});

// Get user by id
router.get("/:id", async (req: Request, res: Response) => {
  const user = await repo().findOneBy({ id: Number(req.params.id) });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// Create user
router.post("/", async (req: Request, res: Response) => {
  const { nickname, role } = req.body;
  if (!nickname || !role) return res.status(400).json({ message: "nickname and role are required" });
  const user = repo().create({ nickname, role });
  const result = await repo().save(user);
  res.status(201).json(result);
});

// Update user
router.put("/:id", async (req: Request, res: Response) => {
  const user = await repo().findOneBy({ id: Number(req.params.id) });
  if (!user) return res.status(404).json({ message: "User not found" });
  repo().merge(user, req.body);
  const result = await repo().save(user);
  res.json(result);
});

// Delete user
router.delete("/:id", async (req: Request, res: Response) => {
  const result = await repo().delete(Number(req.params.id));
  if (result.affected === 0) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted" });
});

export default router;
