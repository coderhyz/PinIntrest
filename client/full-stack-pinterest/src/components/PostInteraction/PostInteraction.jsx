import React from 'react';
import './PostInteraction.css'
import ImageKit from '../ImageKit/ImageKit';
function PostInteraction() {
    return (
        <div className="postInteractions">
            <div className="interactionIcons">
                <ImageKit path={"/general/react.svg"} w={24} h={24}>
                </ImageKit>
                <span>273</span>
                <ImageKit path={"/general/share.svg"} w={24} h={24}></ImageKit>
                <ImageKit path={"/general/more.svg"} w={24} h={24}></ImageKit>

            </div>
            <button>保存</button>
        </div>
    );
}

export default PostInteraction;