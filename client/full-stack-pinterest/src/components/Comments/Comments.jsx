import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCommentsByPinId } from '../../api/comment';
import './Comments.css'
import EmojiPicker from 'emoji-picker-react';
import Comment from './comment';
import request from '../../utils/request';
function Comments({ id }) {
    // 表情选择器状态
    const [open, setOpen] = useState(false);
    // 评论内容
    const [commentText, setCommentText] = useState('');
    // 添加评论
    const addComment = async (comment) => {
        try {
            const res = await request.post("/comments", comment);
            return res.data;
        } catch (error) {
            console.log(error)
            if (error.response.status === 401) {
                alert("请先登录！");
            }
        }
    };
    const queryClient = useQueryClient();
    // 使用突变来处理添加评论的操作
    const mutation = useMutation({
        // 突变操作
        mutationFn: addComment,
        // 成功后的回调函数，刷新评论列表
        onSuccess: () => {
            // 使与评论相关的查询无效，以便重新获取最新的评论数据
            queryClient.invalidateQueries({ queryKey: ["comments", id] });
            setCommentText("");
            setOpen(false);
        },
    });
    // 获取评论数据
    const getCommentsById = async (pinId) => {
        try {
            const response = await getCommentsByPinId(pinId);
            return response.data.data;

        } catch (error) {
            throw new Error('Failed to fetch comments: ' + error.message);
        }
    };
    // 表情选择处理
    const handleEmojiClick = (emojiData) => {
        // console.log(emojiData)
        setCommentText(prev => prev + " " + emojiData.emoji);
    }
    // 评论提交处理
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return; // 防止提交空评论
        // 调用突变函数来添加评论
        mutation.mutate({
            description: commentText,
            pinId: id,
        });
    }
    const { data, isPending, error } = useQuery({
        queryKey: ["comments", id], // 作品ID
        queryFn: () => getCommentsById(id) // 替换为实际的 Pin ID,
    })
    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    const allComments = data.map((comment) => {
        {/* 内容 */ }
        return <Comment comment={comment} key={comment._id} />
    });
    return (
        <div className="comments">
            <span className='commentCount'>{data?.length || 0} Comments</span>
            {/* 评论列表 */}
            <div className="commentsLists">

                {allComments.length > 0 ? allComments : <div className='noComments'>暂无评论</div>}
            </div>
            {/* 评论输入框 */}
            <form className='commentForm' onSubmit={handleCommentSubmit} >
                <input
                    type="text"
                    placeholder='Write a comment...'
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <div className='emoji' onClick={() => setOpen(prev => !prev)}>
                    😃
                    {/* <EmojiPicker /> */
                        open && <div className="emojiPicker">
                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                        </div>
                    }
                </div>
            </form>
        </div>
    );
}

export default Comments;