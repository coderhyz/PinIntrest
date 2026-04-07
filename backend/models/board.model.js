import { Schema } from "mongoose";
import mongoose from "mongoose";

const boardSchema = new Schema(
    {
        // 板块
        title: {
            type: String,
            required: true,
        },
        // 关联的用户
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);
const Board = mongoose.model("Board", boardSchema);
export default Board;