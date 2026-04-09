import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCommentsByPinId } from '../../api/comment';
import { format } from "timeago.js";
import './Comments.css'
import EmojiPicker from 'emoji-picker-react';
import ImageKit from '../ImageKit/ImageKit';
import Comment from './comment';
import { Link } from 'react-router';
function Comments({ id }) {
    // 表情选择器状态
    const [open, setOpen] = useState(false);
    // 获取评论数据
    const getCommentsById = async (pinId) => {
        try {
            const response = await getCommentsByPinId(pinId);
            // console.log(response.data)
            return response.data;

        } catch (error) {
            throw new Error('Failed to fetch comments: ' + error.message);
        }
    };
    const { data, isPending, error } = useQuery({
        queryKey: ["comments", id], // 作品ID
        queryFn: () => getCommentsById(id) // 替换为实际的 Pin ID,
    })
    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    const allComments = data.map((comment) => {
        {/* 内容 */ }
        return <Comment comment={comment} key={comment._id} />
    })
    return (
        <div className="comments">
            {/* 评论列表 */}
            <div className="commentsLists">
                <span className='commentCount'>{data?.length || 0} Comments</span>
                {allComments.length > 0 ? allComments : <div className='noComments'>暂无评论</div>}
            </div>
            {/* 评论输入框 */}
            <form className='commentForm'>
                <input type="text" placeholder='Write a comment...' />
                <div className='emoji' onClick={() => setOpen(prev => !prev)}>
                    emoji
                    {/* <EmojiPicker /> */
                        open && <div className="emojiPicker">
                            <EmojiPicker onEmojiClick={(emoji) => console.log(emoji)} />
                        </div>
                    }
                </div>

            </form>
        </div>
    );
}

export default Comments;