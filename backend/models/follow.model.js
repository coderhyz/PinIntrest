import { Schema } from "mongoose";
import mongoose from "mongoose";
// 关注的 模型
const followSchema = new Schema(
    {
        // 关注的用户
        follower: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // 被关注的用户
        following: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);
const Follow = mongoose.model("Follow", followSchema);
// 导出 Follow 模型
export default Follow;