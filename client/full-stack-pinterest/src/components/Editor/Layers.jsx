import ImageKit from "../ImageKit/ImageKit";
import useEditorStore from "../../store/editorStore";
function Layers() {
  const { selectedLayer, setSelectedLayer, addText, canvasOptions, } = useEditorStore();
  // 
  function handleSelectText() {
    setSelectedLayer('text');
    addText();
  }
  function handleSelectCanvas() {
    setSelectedLayer('canvas');
  }
  return (
    // 图层组件
    <div className="layers">
      <h3>Layers</h3>
      <p>Select a Layer to edit</p>
      {/* 选择文本图层 */}
      <div
        className={`layer ${selectedLayer === 'text' ? 'selected' : ''}`}
        onClick={handleSelectText}
      >
        <div className="layerImage">
          <ImageKit w={48} h={48} path="/general/text.png"></ImageKit>
        </div>
        <span> Add text</span>
      </div>
      {/* 选择画布层 */}
      <div
        className={`layer ${selectedLayer === 'canvas' ? 'selected' : ''}`}
        onClick={handleSelectCanvas}
      >
        <div className="layerImage" style={{ backgroundColor: canvasOptions.backgroundColor }}>
        </div>
        <span> Canvas</span>
      </div>
    </div>
  );
}

export default Layers;