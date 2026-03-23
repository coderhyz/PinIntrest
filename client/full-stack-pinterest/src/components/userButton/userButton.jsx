import './userButton.css'
function UserButton() {
    return (
        <div className="userButton">
            <img src="/general/noAvatar.png" alt="User Avatar" />
            <img className="arrow" src="/general/arrow.svg" alt="Arrow" />
        </div>
    );
}

export default UserButton;