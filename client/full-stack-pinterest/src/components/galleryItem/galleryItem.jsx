import './galleryItem.css'
import ImageKit from '../ImageKit/ImageKit';
import { Link } from 'react-router';
function GalleryItem({ item }) {
    return (
        //  gridRowEnd: `span ${Math.ceil(item.height / 100)} 
        <div className="galleryItem" style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}>
            <ImageKit path={item.media} alt={item.title} w={372} h={item.height}></ImageKit>
            <Link className='linkOverLay' to={`/pin/${item._id}`}></Link>
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