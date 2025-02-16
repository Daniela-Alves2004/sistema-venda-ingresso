const express = require("express");
const authRouter = require("./authRoutes");
const ticketRouter = require("./ticketRoutes");
const purchaseRouter = require("./purchaseRoutes");
const userRouter = require("./userRoutes");
const viewRouter = require("./viewRoutes");

const router = express.Router();

// Roteamento
router.use('/', viewRouter)
router.use("/auth", authRouter);
router.use("/tickets", ticketRouter);
router.use("/purchases", purchaseRouter);
router.use("/users", userRouter);

module.exports = router;
