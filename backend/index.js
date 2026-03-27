import express from "express";
const app = express();
app.use(express.json());
app.use('/test', (req, res) => {
    res.json({ message: "Hello from the backend!" });
});
// 监听3000端口
app.listen(3000, () => {
    console.log("Server is running on port 3000dw123");
});