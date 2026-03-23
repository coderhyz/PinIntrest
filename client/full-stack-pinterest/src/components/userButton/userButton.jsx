import './userButton.css'
import { useState } from 'react';
function UserButton() {
    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(true)
    return (currentUser ?
        <div className="userButton">
            <img src="/general/noAvatar.png" alt="User Avatar" />
            <img onClick={() => setOpen(prev => !prev)} className="arrow" src="/general/arrow.svg" alt="Arrow" />
            {
                open && <div className="userOptions">
                    <div className="userOption">Profile</div>
                    <div className="userOption">Setting</div>
                    <div className="userOption">Logout</div>
                </div>
            }
        </div>

        : (
            <p className='loginLink'>
                Login/SingUP
            </p>
        )

    );
}

export default UserButton;