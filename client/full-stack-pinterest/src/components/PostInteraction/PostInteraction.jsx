import React from 'react';
import './PostInteraction.css'
import ImageKit from '../ImageKit/ImageKit';
// 帖子交互组件 包含点赞、分享、更多选项和保存按钮
function PostInteraction() {
    return (
        <>
            <div className="postInteractions">
                <div className="interactionIcons">
                    <div>
                        <ImageKit path={"/general/react.svg"} w={24} h={24}></ImageKit>
                    </div>
                    <span>273</span>
                    <div>
                        <ImageKit path={"/general/share.svg"} w={24} h={24}></ImageKit>
                    </div>
                    <div>
                        <ImageKit path={"/general/more.svg"} w={24} h={24}></ImageKit>
                    </div>
                </div>
                <button>保存</button>
            </div>
        </>
    );
}

export default PostInteraction;