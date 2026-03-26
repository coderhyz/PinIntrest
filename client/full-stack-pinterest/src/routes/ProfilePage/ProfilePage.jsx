import React from 'react';
import './ProfilePage.css';
import ImageKit from '../../components/ImageKit/ImageKit';
function ProfilePage() {

    const [type, setType] = React.useState('created');
    return (
        <div className="profilePage">
            <ImageKit path="/general/noAvatar.png" alt="User image" w={200} h={200} />
            <span className='profileUserName'>Jane Doe</span>
            <span className='followCounts'>2 followers : 5 following</span>

            <div className="profileInteraction">
                <ImageKit path="/general/upload.svg" alt="Follow icon" />
                <div className="profileButton">
                    <button>Message</button>
                    <button>Follow</button>
                </div>
                <ImageKit path="/general/more.svg" alt="More icon" />
            </div>

            <div className="profileOptions">
                <span className={type === 'created' ? 'active' : ''} onClick={() => setType('created')}>
                    Created
                </span>
                <span className={type === 'saved' ? 'active' : ''} onClick={() => setType('saved')}>
                    Saved
                </span>
            </div>
        </div>
    );
}

export default ProfilePage;