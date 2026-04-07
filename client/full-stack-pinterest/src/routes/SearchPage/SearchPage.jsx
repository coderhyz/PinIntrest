import { useSearchParams } from 'react-router';
import Gallery from '../../components/gallery/gallery';
// 搜索结果页面
function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    // 得到参数
    const searchKeyword = searchParams.get('searchKeyword');
    const boardId = searchParams.get('boardId');
    return (
        <Gallery searchKeyword={searchKeyword} boardId={boardId} />
    );
}

export default SearchPage;