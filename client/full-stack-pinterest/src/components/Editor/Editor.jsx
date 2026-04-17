
import "./Editor.css";
import Workspace from "./Workspace";
import Layers from "./Layers";
import Options from "./Options";
// 编辑器组件
function Editor({ previewImg }) {
    return (
        <div className="editor">
            <Layers previewImg={previewImg} />
            <Workspace previewImg={previewImg} />
            <Options previewImg={previewImg} />
        </div>
    );
}

export default Editor;