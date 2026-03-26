import './PostPage.css'
import ImageKit from "../../components/ImageKit/ImageKit";
import PostInteraction from "../../components/PostInteraction/PostInteraction";
import { Link } from 'react-router';
import Comments from '../../components/Comments/Comments';
function PostPage() {
    return (
        <div className="postPage">
            {/* Back button */}
            <svg
                height="20"
                viewBox="0 0 24 24"
                width="20"
                style={{ cursor: "pointer" }}
            >
                <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
            </svg>
            {/* Post container */}
            <div className="postContainer">
                <div className="postImg">
                    <ImageKit
                        path="/pins/pin1.jpeg"
                        alt="post image"
                        w={736}
                    />
                </div>
                <div className="postDetail">
                    <PostInteraction />
                    <Link className='postUser' to="/john">
                        <ImageKit
                            path="/general/noAvatar.png"
                            alt="User image"
                            w={50}
                            h={50}
                        />
                        <span>John Doe</span>
                    </Link>
                    <Comments />
                </div>

            </div>
        </div>
    );
}

export default PostPage;