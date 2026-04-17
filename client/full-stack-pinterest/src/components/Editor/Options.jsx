import useEditorStore from "../../store/editorStore";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { useState } from "react";
// 选项
function Options({ previewImg }) {
    const { selectedLayer, setTextOptions, textOptions, canvasOptions, setCanvasOptions } = useEditorStore();
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    // 竖向尺寸选项
    const portraitSizes = [
        {
            name: "1:2",
            width: 1,
            height: 2,
        },
        {
            name: "9:16",
            width: 9,
            height: 16,
        },
        {
            name: "2:3",
            width: 2,
            height: 3,
        },
        {
            name: "3:4",
            width: 3,
            height: 4,
        },
        {
            name: "4:5",
            width: 4,
            height: 5,
        },
        {
            name: "1:1",
            width: 1,
            height: 1,
        },
    ];
    // 横向尺寸选项
    const landscapeSizes = [
        {
            name: "2:1",
            width: 2,
            height: 1,
        },
        {
            name: "16:9",
            width: 16,
            height: 9,
        },
        {
            name: "3:2",
            width: 3,
            height: 2,
        },
        {
            name: "4:3",
            width: 4,
            height: 3,
        },
        {
            name: "5:4",
            width: 5,
            height: 4,
        },
        {
            name: "1:1",
            width: 1,
            height: 1,
        },
    ];
    // 原始图片的方向
    const originalOrientation = previewImg.width < previewImg.height ? "portrait" : "landscape";
    //处理尺寸变化
    function handleSizeClick(size) {
        let newHeight;

        if (size === "original") {
            if (
                originalOrientation === canvasOptions.orientation
            ) {
                newHeight = (375 * previewImg.height) / previewImg.width;
            } else {
                newHeight = (375 * previewImg.width) / previewImg.height;
            }
        } else {
            newHeight = (375 * size.height) / size.width;
        }

        setCanvasOptions({
            ...canvasOptions,
            size: size === "original" ? "original" : size.name,
            height: newHeight,
        });
    }
    function handleOrientationClick(orientation) {
        console.log(orientation)
        let newHeight;
        if (
            originalOrientation === orientation
        ) {
            newHeight = (375 * previewImg.height) / previewImg.width;
        } else {
            newHeight = (375 * previewImg.width) / previewImg.height;
        }

        setCanvasOptions({
            ...canvasOptions,
            orientation,
            size: "original",
            height: newHeight,
        });
    }

    return (
        <div className="options">
            {selectedLayer === 'text' ? (
                // 文本图层编辑选项
                <div className="">
                    <div className="editingOption">
                        <span>Text</span>
                        <input type="number" value={textOptions.fontSize} onChange={(e) => setTextOptions({ ...textOptions, fontSize: parseInt(e.target.value) })} />
                    </div>
                    <div className="editingOption">
                        <span>Color</span>
                        <div className="textColor">
                            <div className="colorPreview" style={{ backgroundColor: textOptions.color }} onClick={() => setIsColorPickerOpen(prev => !prev)}></div>
                            {isColorPickerOpen && (
                                <div className="colorPicker">
                                    <HexColorPicker color={textOptions.color} onChange={(color) => setTextOptions({ ...textOptions, color })} />
                                    <HexColorInput color={textOptions.color} onChange={(color) => setTextOptions({ ...textOptions, color })} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                // 方向
                <div className="">
                    <div className="editingOption">
                        <span>Position</span>
                        <div className="orientations">
                            <div onClick={() => handleOrientationClick('portrait')} className={`orientation ${canvasOptions.orientation === "portrait" ? "selected" : ""}`}>P</div>
                            <div onClick={() => handleOrientationClick('landscape')} className={`orientation ${canvasOptions.orientation === "landscape" ? "selected" : ""}`}>L</div>
                        </div>
                    </div>
                    <div className="editingOption">
                        <span>Size</span>
                        {/* canvas尺寸选择 */}
                        <div className="sizes">
                            <div
                                className={`size ${canvasOptions.size === "original" ? "selected" : ""}`}
                                onClick={() => handleSizeClick('original')}>
                                原始
                            </div>
                            {canvasOptions.orientation === "portrait" ? (
                                portraitSizes.map((size) => (
                                    <div
                                        key={size.name}
                                        className={`size ${canvasOptions.size === size.name ? "selected" : ""}`}
                                        onClick={() => handleSizeClick(size)}
                                    >
                                        {size.name}
                                    </div>
                                ))
                            ) : (
                                landscapeSizes.map((size) => (
                                    <div
                                        key={size.name}
                                        className={`size ${canvasOptions.size === size.name ? "selected" : ""}`}
                                        onClick={() => handleSizeClick(size)}
                                    >
                                        {size.name}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    {/* 背景颜色 */}
                    <div className="editingOption">
                        <span>BackgroundColor</span>
                        <div className="textColor">
                            <div className="colorPreview" style={{ backgroundColor: canvasOptions.backgroundColor }} onClick={() => setIsColorPickerOpen(prev => !prev)}></div>
                            {isColorPickerOpen && (
                                <div className="colorPicker">
                                    <HexColorPicker color={canvasOptions.backgroundColor} onChange={(color) => setCanvasOptions({ ...canvasOptions, backgroundColor: color })} />
                                    <HexColorInput color={canvasOptions.backgroundColor} onChange={(color) => setCanvasOptions({ ...canvasOptions, backgroundColor: color })} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Options;