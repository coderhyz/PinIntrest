import "./app.css";
import LeftBar from "./components/leftBar/leftBar";
import TopBar from "./components/topBar/topBar";
import Gallery from "./components/gallery/gallery";
function App() {
  return (
    <>
      <div className="app">
        {/* 左边栏 */}
        <LeftBar></LeftBar>
        <div className="content">
          {/* 顶部栏 */}
          <TopBar></TopBar>
          {/* 图片展示 */}
          <Gallery></Gallery>
        </div>
      </div>


    </>
  );
}

export default App;