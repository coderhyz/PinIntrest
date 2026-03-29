import { Schema } from "mongoose";
import mongoose from "mongoose";

const pinSchema = new Schema(
    {
        // 图片URL
        media: {
            type: String,
            required: true,
        },
        // 图片宽高
        width: {
            type: Number,
            required: true,
        },
        height: {
            type: Number,
            required: true,
        },
        // 标题
        title: {
            type: String,
            required: true,
        },
        // 描述
        description: {
            type: String,
            required: true,
        },
        // 链接
        link: {
            type: String,
        },
        // 所属board
        board: {
            type: Schema.Types.ObjectId,
            ref: "Board",
        },
        // 标签列表
        tags: {
            type: [String],
        },
        // 发布者
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Pin", pinSchema);