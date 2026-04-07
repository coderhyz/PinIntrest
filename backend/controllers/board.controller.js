
import Board from "../models/Board.model.js";
import Pin from "../models/pin.model.js";
// 根据用户id获取所有已经保存的board
export const getBoardsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const boards = await Board.find({ user: userId })
        const boardWithPinDetails = await Promise.all(boards.map(async (board) => {
            const pinCount = await Pin.countDocuments({ board: board._id }); // 获取该 Board 中的 Pin 数量
            const firstPin = await Pin.findOne({ board: board._id }); // 获取最新的 Pin
            return {
                ...board.toObject(),
                firstPin,
                pinCount
            };
        }));
        res.status(200).json(boardWithPinDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};