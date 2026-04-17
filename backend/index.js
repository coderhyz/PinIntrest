import express from "express";
// 连接数据库
import connectDB from "./utils/connectDB.js";
// 配置跨域
import cors from "cors";
// 解析cookie
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/user.route.js";
import boardRouter from "./routes/board.route.js";
import pinRouter from "./routes/pin.route.js";
import commentRouter from "./routes/comment.route.js";


const app = express();
app.use(express.json());
// 配置 CORS 中间件，允许来自指定来源的请求，来源 URL 从环境变量中获取
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true // 允许携带cookie
}));
// 使用 cookie 解析中间件
app.use(cookieParser());
app.use(fileUpload());
// 使用用户路由
app.use("/users", userRouter);
// 使用看板路由
app.use("/boards", boardRouter);
// 使用Pin路由
app.use("/pins", pinRouter);
// 使用评论路由
app.use("/comments", commentRouter);
// 监听3000端口
app.listen(3000, () => {
    // 连接数据库
    connectDB();
    console.log("Server is running on port 3000");
});