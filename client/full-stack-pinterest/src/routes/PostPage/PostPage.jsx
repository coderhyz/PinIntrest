import './PostPage.css'
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getPinById } from "../../api/pin.js";
import ImageKit from "../../components/ImageKit/ImageKit";
import PostInteraction from "../../components/PostInteraction/PostInteraction";
import { Link } from 'react-router';
import Comments from '../../components/Comments/Comments';
// 作品主页
function PostPage() {
    const { id } = useParams(); // 从 URL 中获取 Pin ID
    const getPinData = async (pinId) => {
        try {
            const response = await getPinById(pinId);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch pin data: ' + error.message);
        }
    };
    // TODO: 获取作品数据
    const { data, isPending, error } = useQuery({
        queryKey: ["pin", id], // 作品ID
        queryFn: () => getPinData(id) // 替换为实际的 Pin ID,
    });
    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No data found</div>;
    console.log(data)
    return (
        <div className="postPage">
            {/* Back button */}
            <svg
                height="30"
                viewBox="0 0 24 24"
                width="20"
                style={{ cursor: "pointer" }}
            >
                <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
            </svg>
            {/* Post container */}
            <div className="postContainer">
                {/* 图片 */}
                <div className="postImg">
                    <ImageKit
                        path={data.media}
                        alt={data.description}
                        w={736}
                    />
                </div>
                {/* 作品详情 */}
                <div className="postDetail">
                    {/* 互动区域 */}
                    <PostInteraction />
                    {/* 用户信息 */}
                    <Link className='postUser' to={`/${data.user.username}`}>
                        <ImageKit
                            path={data.user.img || '/gen/noAvatar.png'}
                            alt="User image"
                            w={50}
                            h={50}
                        />
                        <span>{data.user.displayName}</span>
                    </Link>
                    {/* 评论 */}
                    <Comments id={data._id} />
                </div>

            </div>
        </div>
    );
}

export default PostPage;