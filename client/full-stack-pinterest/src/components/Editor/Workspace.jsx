import useEditorStore from "../../store/editorStore";
import ImageKit from "../ImageKit/ImageKit";
import { useEffect, useRef } from "react";
// 工作区组件，显示画布和预览图

function Workspace({ previewImg }) {
    // 文本图层的属性
    const { textOptions, setTextOptions, canvasOptions, setCanvasOptions, setSelectedLayer } = useEditorStore();
    const canvasRef = useRef(null);
    const itemRef = useRef(null);
    const dragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });
    useEffect(() => {
        // console.log(previewImg)
        // console.log(canvasOptions.height)
        if (canvasOptions.height === 0) {
            // 初始化确定画布的高度和方向
            const canvasHeight = (375 * previewImg.height) / previewImg.width;
            setCanvasOptions({ ...canvasOptions, height: canvasHeight, orientation: canvasHeight > 375 ? "portrait" : "landscape" });
        }

    }, [canvasOptions, previewImg, setCanvasOptions]);
    // 处理文本图层的拖动
    function handleMouseDown(e) {
        setSelectedLayer("text");
        if (itemRef.current) {
            dragging.current = true;

            offset.current = {
                x: e.clientX - textOptions.left,
                y: e.clientY - textOptions.top
            };
        }
    }
    function handleMouseMove(e) {
        if (dragging.current) {

            setTextOptions({ ...textOptions, left: e.clientX - offset.current.x, top: e.clientY - offset.current.y });
        }
    }
    function handleMouseUp() {
        dragging.current = false;
    }
    function handleMouseLeave() {
        dragging.current = false;
    }
    return (
        <div className="workspace">
            <div className="canvas"
                style={{ height: canvasOptions.height, backgroundColor: canvasOptions.backgroundColor }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                ref={canvasRef}
            >
                <img src={previewImg.url} alt="" />
                {
                    textOptions.text && (
                        // 绝对定位的文本图层
                        <div className="text"
                            style={{
                                color: textOptions.color,
                                fontSize: textOptions.fontSize + 'px',
                                top: textOptions.top,
                                left: textOptions.left
                            }}
                            ref={itemRef}
                            onMouseDown={handleMouseDown}
                        >
                            <input type="text"
                                value={textOptions.text}
                                onChange={(e) => setTextOptions({ ...textOptions, text: e.target.value })}
                                style={{ color: textOptions.color, height: '100%' }}
                            />
                            <div className="deleteTextButton" onClick={() => setTextOptions({ ...textOptions, text: "" })}>
                                <ImageKit path={"/general/delete.svg"}></ImageKit>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Workspace;