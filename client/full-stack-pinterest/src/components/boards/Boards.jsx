import "./boards.css";
import ImageKit from "../ImageKit/ImageKit";
import { useQuery } from "@tanstack/react-query";
import request from "../../utils/request";
import { format } from "timeago.js";
import { Link } from "react-router";

const Boards = ({ userId }) => {
    const { isPending, error, data } = useQuery({
        queryKey: ["boards", userId],
        queryFn: () => request.get(`/boards/${userId}`).then((res) => res.data),
    });

    if (isPending) return "加载中...";

    if (error) return "发生了一个错误: " + error.message;

    console.log(data);

    return (
        <div className="collections">
            {/* COLLECTION */}
            {data?.map((board) => (

                <Link
                    // 点击收藏夹时，跳转到搜索结果页面，并传递收藏夹ID作为参数
                    to={`/search?boardId=${board._id}`}
                    className="collection"
                    key={board._id}
                >
                    <ImageKit path={board.firstPin.media} />
                    <div className="collectionInfo">
                        <h1>{board.title}</h1>
                        <span>
                            {board.pinCount} Pins · {format(board.updatedAt)} {/* 这里可以使用 format(board.updatedAt) 来显示相对时间 */}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Boards;