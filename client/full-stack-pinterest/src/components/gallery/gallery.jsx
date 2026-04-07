import './gallery.css'
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from "react-infinite-scroll-component";
import GalleryItem from '../galleryItem/galleryItem';
// TEMPORARY
// const items = [
//     {
//         id: 1,
//         media: "/pins/pin1.jpeg",
//         width: 1260,
//         height: 1000,
//     },
//     {
//         id: 2,
//         media: "/pins/pin2.jpeg",
//         width: 1260,
//         height: 1400,
//     },
//     {
//         id: 3,
//         media: "/pins/pin3.jpeg",
//         width: 1260,
//         height: 1400,
//     },
//     {
//         id: 4,
//         media: "/pins/pin4.jpeg",
//         width: 1260,
//         height: 1000,
//     },
//     {
//         id: 5,
//         media: "/pins/pin5.jpeg",
//         width: 1260,
//         height: 1243,
//     },
//     {
//         id: 6,
//         media: "/pins/pin6.jpeg",
//         width: 1260,
//         height: 1568,
//     },
//     {
//         id: 7,
//         media: "/pins/pin7.jpeg",
//         width: 1260,
//         height: 1234,
//     },
//     {
//         id: 8,
//         media: "/pins/pin8.jpeg",
//         width: 1260,
//         height: 1400,
//     },
//     {
//         id: 9,
//         media: "/pins/pin9.jpeg",
//         width: 1260,
//         height: 1000,
//     },
//     {
//         id: 10,
//         media: "/pins/pin10.jpeg",
//         width: 1260,
//         height: 1000,
//     },
//     {
//         id: 11,
//         media: "/pins/pin11.jpeg",
//         width: 1260,
//         height: 1000,
//     },
//     {
//         id: 12,
//         media: "/pins/pin12.jpeg",
//         width: 1260,
//         height: 1400,
//     },
//     {
//         id: 13,
//         media: "/pins/pin13.jpeg",
//         width: 1260,
//         height: 1400,
//     },
//     {
//         id: 14,
//         media: "/pins/pin14.jpeg",
//         width: 1260,
//         height: 1600,
//     },
//     {
//         id: 15,
//         media: "/pins/pin15.jpeg",
//         width: 1260,
//         height: 1000,
//     },
//     {
//         id: 16,
//         media: "/pins/pin16.jpeg",
//         width: 1260,
//         height: 1260,
//     },
//     {
//         id: 17,
//         media: "/pins/pin17.jpeg",
//         width: 1260,
//         height: 1000,
//     },
//     {
//         id: 18,
//         media: "/pins/pin18.jpeg",
//         width: 1260,
//         height: 1260,
//     },
//     {
//         id: 19,
//         media: "/pins/pin19.jpeg",
//         width: 1260,
//         height: 1400,
//     },
//     {
//         id: 20,
//         media: "/pins/pin20.jpeg",
//         width: 1260,
//         height: 1260,
//     },
//     {
//         id: 21,
//         media: "/pins/pin21.jpeg",
//         width: 1260,
//         height: 1400,
//     },
//     {
//         id: 22,
//         media: "/pins/pin22.jpeg",
//         width: 1260,
//         height: 1890,
//     },
//     {
//         id: 23,
//         media: "/pins/pin23.jpeg",
//         width: 1260,
//         height: 1260,
//     },
//     {
//         id: 24,
//         media: "/pins/pin24.jpeg",
//         width: 1260,
//         height: 1260,
//     },
//     {
//         id: 25,
//         media: "/pins/pin25.jpeg",
//         width: 1260,
//         height: 1260,
//     },
//     {
//         id: 26,
//         media: "/pins/pin26.jpeg",
//         width: 1260,
//         height: 1260,
//     },
//     {
//         id: 27,
//         media: "/pins/pin27.jpeg",
//         width: 1260,
//         height: 1260,
//     },
// ];

function Gallery({ searchKeyword, userId, boardId }) {
    // 获取 Pins 数据
    const fetchPins = async ({ pageParam = 0, searchKeyword, userId, boardId }) => {
        // 发送 GET 请求到后端 API，获取 Pins 数据，传递分页参数和搜索关键词
        const res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/pins?cursor=${pageParam}&searchKeyword=${searchKeyword || ''}&userId=${userId || ''}&boardId=${boardId || ''}`);
        // console.log(res.data)
        return res.data;
    };
    // 使用 useInfiniteQuery 来获取分页数据
    const { data, fetchNextPage, hasNextPage, status, error } = useInfiniteQuery({
        // queryKey 用于标识这个查询，通常是一个数组，可以包含查询的名称和参数
        queryKey: ['pins', searchKeyword, userId, boardId],
        // 查询函数，用于获取数据
        queryFn: ({ pageParam }) => fetchPins({ pageParam, searchKeyword, userId, boardId }),
        // 初始的分页参数，默认为 0
        initialPageParam: 0,
        // 下一页的参数获取函数，接收上一次查询返回的数据作为参数，返回下一页的分页参数
        getNextPageParam: (lastPage) => {
            return lastPage.nextCursor;

        },
    });
    // 如果数据正在加载，显示加载状态
    if (status === 'loading') return <h2>Loading...</h2>;
    // 如果发生错误，显示错误信息
    if (status === 'error') return <div>Error: {error.message}</div>;
    // 将所有页面的 Pins 合并成一个数组
    const allPins = data?.pages.flatMap((page) => page.pins) || [];
    if (!allPins) {
        return <h2 style={{ textAlign: 'center' }}>No pins found</h2>;
    }
    // console.log(allPins)
    // 渲染 Pins
    const renderGalleryItem = allPins.map((item) => {
        return (
            // 每个 GalleryItem 组件 
            <GalleryItem key={item._id} item={item} />
        );
    });
    return (
        // 使用 InfiniteScroll 组件来实现无限滚动加载
        <InfiniteScroll
            // 数据长度，
            dataLength={allPins.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            // 当加载更多数据时显示的加载状态
            loader={<h2 style={{ textAlign: 'center' }}>Loading more pins</h2>}
            // 当没有更多数据时显示的结束消息
            endMessage={!allPins.length ? <h2 style={{ textAlign: 'center' }}>No pins found</h2> : <h2 style={{ textAlign: 'center' }}>You have seen all pins</h2>}
        >
            <>
                <div className="gallery">{renderGalleryItem}</div>
            </>
        </InfiniteScroll>
    );
}


export default Gallery; 