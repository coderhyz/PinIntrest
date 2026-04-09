import { Link } from "react-router";
import { format } from "timeago.js";
import ImageKit from "../ImageKit/ImageKit";
function Comment({ comment }) {
    return (
        <div className="comment">
            <ImageKit className="commentAvatar" path={comment.user.img} alt="User image" w={40} h={40}></ImageKit>
            <div className="commentContent">
                {/* 导航到用户主页 */}
                <Link className='commentUser' to={`/${comment.user.username}`} >
                    {comment.user.username}
                </Link>
                <p className='commentText'>{comment.description}</p>
                <span className='commentTime'>{format(comment.createdAt)}</span>
            </div>
        </div>
    );
}

export default Comment;