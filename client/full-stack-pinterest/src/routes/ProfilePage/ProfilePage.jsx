import React from 'react';
import './ProfilePage.css';
import ImageKit from '../../components/ImageKit/ImageKit';
import Gallery from '../../components/gallery/gallery';
function ProfilePage() {

    const [type, setType] = React.useState('created');
    return (
        <>
            <div className="profilePage">
                <ImageKit path="/general/noAvatar.png" alt="User image" w={200} h={200} />
                <span className='profileUserName'>Jane Doe</span>
                <span className='followCounts'>
                    <span className='followers'>100 Followers</span>
                    *
                    <span className='following'>5 Following</span>

                </span>
                {/* Profile Interaction */}
                <div className="profileInteraction">
                    <ImageKit path="/general/upload.svg" alt="Follow icon" />
                    <div className="profileButton">
                        <button>Message</button>
                        <button>Follow</button>
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
                <Gallery></Gallery>
            </div>
        </>
    );
}

export default ProfilePage;