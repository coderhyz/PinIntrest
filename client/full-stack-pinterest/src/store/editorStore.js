import { create } from "zustand";
// 编辑器状态管理
const useEditorStore = create((set) => ({
    selectedLayer: "canvas", // 默认选中画布层
    // 文本图层的属性
    textOptions: {
        text: "",
        fontSize: 48,
        color: "#000000",
        top: 48,
        left: 0,
    },
    // canvas图层的属性
    canvasOptions: {
        height: 0,
        orientation: "portrait", // 默认竖屏
        size: "original", // 默认原始尺寸
        backgroundColor: "#008080",
    },
    setSelectedLayer: (newLayer) => set({ selectedLayer: newLayer }),
    setTextOptions: (newOptions) => set({ textOptions: newOptions }),
    setCanvasOptions: (newOptions) => set({ canvasOptions: newOptions }),
    // 添加文本图层，设置默认属性
    addText: () => set({
        textOptions: {
            text: "Add Text",
            fontSize: 48,
            color: "#000000",
            top: 48,
            left: 0,
        }
    })
}));
export default useEditorStore;