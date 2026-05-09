import { Router, Request, Response } from "express";

const router = Router();

// Dummy endpoint for super admin
router.get("/super-admin", (_req: Request, res: Response) => {
  res.json({
    role: "super-admin",
    message: "Welcome, Super Admin. You have unrestricted access.",
    permissions: ["manage:all", "configure:system", "audit:logs", "impersonate:users"],
    secretCode: "SA-9001-OMEGA",
  });
});

// Dummy endpoint for admin
router.get("/admin", (_req: Request, res: Response) => {
  res.json({
    role: "admin",
    message: "Welcome, Admin. You can manage users and content.",
    permissions: ["manage:users", "manage:content", "view:reports"],
    dashboard: { pendingApprovals: 4, activeUsers: 128 },
  });
});

// Dummy endpoint for user
router.get("/user", (_req: Request, res: Response) => {
  res.json({
    role: "user",
    message: "Welcome, User. Enjoy your personalized feed.",
    permissions: ["view:content", "edit:profile"],
    feed: ["Welcome aboard!", "Check out today's highlights", "Update your profile picture"],
  });
});

export default router;
