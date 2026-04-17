import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getUserByUserName } from '../../api/user';
import './ProfilePage.css';
import ImageKit from '../../components/ImageKit/ImageKit';
import Gallery from '../../components/gallery/gallery';
import FollowButton from './FollowButton';
import Board from '../../components/boards/Boards';
function ProfilePage() {
    const [type, setType] = useState('created');
    const { username } = useParams(); // 从 URL 中获取用户名

    const getUserProfile = async (username) => {
        try {
            // 调用 API 获取用户信息
            const response = await getUserByUserName(username);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch user data: ' + error.message);
        }
    };
    const { data, isPending, error } = useQuery({
        queryKey: ["user", username], // 用户名
        queryFn: () => getUserProfile(username) // 替换为实际的用户名
    });
    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    console.log(data)
    if (!data) return <div>No data found</div>;
    console.log(data)
    return (
        <>
            <div className="profilePage">
                <ImageKit path="/general/noAvatar.png" alt="User image" w={200} h={200} />
                <span className='profileUserName'>{data.displayName}</span>
                <span className='profileUserHandle'>@{data.username}</span>
                <span className='followCounts'>
                    <span className='followers'>{data.followersCount || 0} Followers</span>
                    *
                    <span className='following'>{data.followingCount || 0} Following</span>

                </span>
                {/* Profile Interaction */}
                <div className="profileInteraction">
                    <ImageKit path="/general/upload.svg" alt="Follow icon" />
                    <div className="profileButton">
                        <button>Message</button>
                        {/* 关注按钮 */}
                        <FollowButton isFollowing={data.isFollowing} username={data.username} />
                    </div>
                    <ImageKit path="/general/more.svg" alt="More icon" />
                </div>
                {/* Profile Options */}
                <div className="profileOptions">
                    <span className={type === 'created' ? 'active' : ''} onClick={() => setType('created')}>
                        Created
                    </span>
                    <span className={type === 'saved' ? 'active' : ''} onClick={() => setType('saved')}>
                        Saved
                    </span>
                </div>
            </div>

            <div className="profileContent">
                {/* <Gallery></Gallery> */
                    // 传递userId
                    type === 'created' ? <Gallery userId={data._id} /> : <Board userId={data._id} />
                }
            </div>
        </>
    );
}

export default ProfilePage;