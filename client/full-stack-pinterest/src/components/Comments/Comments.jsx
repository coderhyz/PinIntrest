import React from 'react';
import './Comments.css'
import ImageKit from '../ImageKit/ImageKit';
function Comments() {
    return (
        <div className="comments">
            {/* 评论列表 */}
            <div className="commentsLists">
                <span className='commentCount'>5 Comments</span>
                {/* 内容 */}
                <div className="comment">
                    <ImageKit className="commentAvatar" path="/general/noAvatar.png" alt="User image" w={40} h={40}></ImageKit>
                    <div className="commentContent">
                        <a className='commentUser' href="#">Jane Doe</a>
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
                <div className='emoji'>123</div>
            </form>
        </div>
    );
}

export default Comments;