import './galleryItem.css'
import { Link } from 'react-router';
function GalleryItem({ item }) {
    return (
        //  gridRowEnd: `span ${Math.ceil(item.height / 100)} 
        <div className="galleryItem" style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}>
            <img src={item.media} alt={item.title} />
            <Link className='linkOverLay' to={`/post/${item.id}`}></Link>
            <button className='saveBtn'>Save</button>
            <div className="overlayBtn">
                <button>
                    <img src="/general/share.svg" alt="" />
                </button>
                <button>
                    <img src="/general/more.svg" alt="" />
                </button>
            </div>
        </div>
    );
}

export default GalleryItem;