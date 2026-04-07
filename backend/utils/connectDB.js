import mongoose from "mongoose";
// 连接MongoDB数据库
const connectDB = async () => {
    try {
        // 使用 mongoose.connect 方法连接到 MongoDB 数据库，连接字符串从环境变量中获取
        await mongoose.connect(process.env.MONGO)
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        // process.exit(1); // 退出进程
    }
}
export default connectDB;