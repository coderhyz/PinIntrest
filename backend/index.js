import express from "express";
import userRouter from "./routes/user.route.js";
import boardRouter from "./routes/board.route.js";
import pinRouter from "./routes/pin.route.js";
import commentRouter from "./routes/comment.route.js";
import connectDB from "./utils/connectDB.js";
const app = express();
app.use(express.json());
// 使用用户路由
app.use("/user", userRouter);
// 使用看板路由
app.use("/board", boardRouter);
// 使用Pin路由
app.use("/pin", pinRouter);
// 使用评论路由
app.use("/comment", commentRouter);
// 监听3000端口
app.listen(3000, () => {
    connectDB();
    console.log("Server is running on port 3000");
});