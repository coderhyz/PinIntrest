import "./CreatePage.css"
import ImageKit from "../../components/ImageKit/ImageKit";
function CreatePage() {
    return (
        <div className="createPage">
            {/* Create PageTop */}
            <div className="createTop">
                <span className="createTitle">Create new Pin</span>
                <button className="createButton">PubLish</button>
            </div>
            {/* Create Page Content */}
            <div className="createBottom">
                <div className="upload">
                    <span className="uploadTitle">
                        <ImageKit path={"/general/upload.svg"} w={30} h={30}></ImageKit>
                        <span>选择图片上传</span>
                    </span>
                    <div className="uploadInfo">我们建议使用小于20MB的高质量图片,小于200MB的高质量.mp4文件</div>
                    {/* <input type="file" id="file" className="uploadInput" /> */}
                </div>
                <form className="createForm">
                    {/* 标题 */}
                    <div className="createFormItem">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" placeholder="Title" />
                    </div>
                    {/* 描述 */}
                    <div className="createFormItem">
                        <label htmlFor="description">Description</label>
                        <textarea
                            rows={6}
                            type="text"
                            placeholder="Add a detailed description"
                            name="description"
                            id="description"
                        />
                    </div>
                    {/* 链接 */}
                    <div className="createFormItem">
                        <label htmlFor="link">Link</label>
                        <input
                            type="text"
                            placeholder="Add a link"
                            name="link"
                            id="link"
                        />
                    </div>
                    {/* board */}
                    <div className="createFormItem">
                        <label htmlFor="board">Board</label>
                        <select name="board" id="board">
                            <option value="">Select a board</option>
                            <option value="1">Board 1</option>
                            <option value="2">Board 2</option>
                        </select>
                    </div>
                    {/* 标签 */}
                    <div className="createFormItem">
                        <label htmlFor="tags">Tagged topics</label>
                        <input type="text" placeholder="Add tags" name="tags" id="tags" />
                        <small>Don&apos;t worry, people won&apos;t see your tags</small>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreatePage;