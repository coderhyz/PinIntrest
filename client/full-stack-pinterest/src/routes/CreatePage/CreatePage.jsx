import "./CreatePage.css"
import ImageKit from "../../components/ImageKit/ImageKit";
import useUserStore from "../../store/userStore"; // 引入用户状态管理
import Editor from "../../components/Editor/Editor";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
function CreatePage() {
    const { user: currentUser } = useUserStore();
    // 选择的图片文件
    const [imgFile, setImgFile] = useState(null);
    // 是否编辑
    const [isEditing, setIsEditing] = useState(false);
    // 图片预览URL
    // const previewImg = imgFile ? URL.createObjectURL(imgFile) : null;
    const [previewImg, setPreviewImg] = useState({
        url: "",
        width: 0,
        height: 0
    });
    // 表单引用
    const formRef = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!currentUser) {
            navigate("/auth");
        }
    }, [currentUser, navigate]);

    useEffect(() => {
        // 情况 A：如果没有选择图片，清空预览状态并中断逻辑
        if (!imgFile) {
            setPreviewImg(null);
            return;
        }

        /**
         * 1. 生成内存 URL
         * URL.createObjectURL 会创建一个指向内存中文件对象的临时链接 (blob:...)。
         */
        const objectUrl = URL.createObjectURL(imgFile);

        // 2. 预加载图片以获取元数据
        const img = new Image();
        img.src = objectUrl;

        // 3. 图片加载完成后的回调
        img.onload = () => {
            // 将图片的 URL 以及读取到的原始宽高存入状态
            setPreviewImg({
                url: objectUrl,
                width: img.width,
                height: img.height
            });
        };

        /**
         * 4. 清理函数 (Cleanup Function)
         * 当组件卸载 (unmount) 或 imgFile 发生变化时执行。
         */
        return () => {
            URL.revokeObjectURL(objectUrl);
        };

    }, [imgFile]);

    return (
        <div className="createPage">
            {/* Create PageTop */}
            <div className="createTop">
                <span className="createTitle">{isEditing ? "Edit Pin" : "Create new Pin"}</span>
                <button className="createButton" onClick={() => setIsEditing(false)}>
                    {isEditing ? "Done" : "Publish"}
                </button>
            </div>
            {/* Create Page Content */}
            {isEditing ? (
                // 图片编辑器组件
                <Editor previewImg={previewImg} />
            ) : (
                <div className="createBottom">
                    {/* 图片预览 如果有预览图片， */}
                    {previewImg?.url ?
                        <div className="preview">
                            <img src={previewImg?.url} alt="预览图片" />
                            <div className="editIcon" onClick={() => setIsEditing(true)}>
                                <ImageKit path="/general/edit.svg" alt="编辑" />
                            </div>
                        </div>
                        : (<>
                            {/* 没有就上传图片 */}
                            <label className="upload" htmlFor="imgFile">
                                <span className="uploadTitle">
                                    <ImageKit path={"/general/upload.svg"} w={30} h={30}></ImageKit>
                                    <span>选择图片上传</span>
                                </span>
                                <div className="uploadInfo">我们建议使用小于20MB的高质量图片,小于200MB的高质量.mp4文件</div>
                            </label>
                            <input hidden type="file" name="imgFile" id="imgFile" onChange={(e) => {
                                // 选择文件后，更新状态以显示预览
                                setImgFile(e.target.files[0]);
                            }} />
                        </>)}
                    {/* 创建表单 */}
                    <form className="createForm" ref={formRef}>
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
            )}
        </div >
    );
}

export default CreatePage;