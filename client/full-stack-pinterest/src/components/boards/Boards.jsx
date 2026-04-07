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

    if (isPending) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    console.log(data);

    return (
        <div className="collections">
            {/* COLLECTION */}
            {data?.map((board) => (
                <Link
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