import React from 'react';
import './Comments.css'
import EmojiPicker from 'emoji-picker-react';
import ImageKit from '../ImageKit/ImageKit';
import { Link } from 'react-router';
function Comments() {
    const [open, setOpen] = React.useState(false);
    return (
        <div className="comments">
            {/* 评论列表 */}
            <div className="commentsLists">
                <span className='commentCount'>5 Comments</span>
                {/* 内容 */}
                <div className="comment">
                    <ImageKit className="commentAvatar" path="/general/noAvatar.png" alt="User image" w={40} h={40}></ImageKit>
                    <div className="commentContent">
                        {/* 导航到用户主页 */}
                        <Link className='commentUser' to={"/123"} >Jane Doe</Link>
                        <p className='commentText'>This is a sample comment.This is a sample comment.This is a sample comment.This is a sample comment.This is a sample comment.This is a sample comment.This is a sample comment.This is a sample comment.</p>
                        <span className='commentTime'>2 hours ago</span>
                    </div>
                </div>
                {/* 内容 */}
                <div className="comment">
                    <ImageKit className="commentAvatar" path="/general/noAvatar.png" alt="User image" w={40} h={40}></ImageKit>
                    <div className="commentContent">
                        <a className='commentUser' href="#">Jane Doe</a>
                        <p className='commentText'>This is a sample comment.</p>
                        <span className='commentTime'>2 hours ago</span>
                    </div>
                </div>
                {/* 内容 */}
                <div className="comment">
                    <ImageKit className="commentAvatar" path="/general/noAvatar.png" alt="User image" w={40} h={40}></ImageKit>
                    <div className="commentContent">
                        <a className='commentUser' href="#">Jane Doe</a>
                        <p className='commentText'>This is a sample comment.</p>
                        <span className='commentTime'>2 hours ago</span>
                    </div>
                </div>
                {/* 内容 */}
                <div className="comment">
                    <ImageKit className="commentAvatar" path="/general/noAvatar.png" alt="User image" w={40} h={40}></ImageKit>
                    <div className="commentContent">
                        <a className='commentUser' href="#">Jane Doe</a>
                        <p className='commentText'>This is a sample comment.</p>
                        <span className='commentTime'>2 hours ago</span>
                    </div>
                </div>
                {/* 内容 */}
                <div className="comment">
                    <ImageKit className="commentAvatar" path="/general/noAvatar.png" alt="User image" w={40} h={40}></ImageKit>
                    <div className="commentContent">
                        <a className='commentUser' href="#">Jane Doe</a>
                        <p className='commentText'>This is a sample comment.</p>
                        <span className='commentTime'>2 hours ago</span>
                    </div>
                </div>
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