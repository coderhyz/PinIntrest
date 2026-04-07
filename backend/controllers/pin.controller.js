import Pin from '../models/pin.model.js';
// 获取所有 Pins
export const getPins = async (req, res) => {
    // 从查询参数中获取 cursor页码 和 searchKeyword 搜索关键词
    const { cursor, searchKeyword, userId, boardId } = req.query;
    const pageNumber = Number(cursor) || 0;
    const LIMIT = 28; // 每页显示的 Pin 数量
    try {
        const pins = await Pin.find(searchKeyword ? {
            $or: [
                // $regex:使用正则表达式进行模糊搜索，
                // $options: 'i' 表示不区分大小写
                { title: { $regex: searchKeyword, $options: 'i' } },
                // $in:使用 $in 操作符检查 tags 数组中是否包含 searchKeyword
                { tags: { $in: [searchKeyword] } }
            ]
        } : userId ? { user: userId } : boardId ? { board: boardId } : {})
            .limit(LIMIT)
            .skip(pageNumber * LIMIT);
        // 是否还有下一页
        const hasNextPage = pins.length === LIMIT;
        // 返回 Pins 数据和下一页的 cursor（如果有的话）
        res.status(200).json({ pins, nextCursor: hasNextPage ? pageNumber + 1 : null });

    } catch (error) {
        // 如果发生错误，返回 500 状态码和错误信息
        res.status(500).json({ message: error.message });
    }
};
// 获取单个Pins
export const getPinById = async (req, res) => {
    const { id } = req.params;
    try {
        // 使用 populate 联合查询来填充关联的用户信息，只返回 username、displayName 和 img 字段
        const pin = await Pin.findById(id).populate("user", "username displayName img");
        if (!pin) {
            return res.status(404).json({ message: 'Pin not found' });
        }
        res.status(200).json(pin);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};