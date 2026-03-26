import { Image } from '@imagekit/react';

function ImageKit({ path, alt, w, h, className }) {
    /**
     * 参数
     * path: 图片路径
     * alt: 图片描述
     * w: 图片宽度
     * h: 图片高度
     * className: 图片样式
     * transformation: 图片变换参数，具体参数可以参考ImageKit文档
     */
    return (
        <Image
            urlEndpoint={import.meta.env.VITE_URL_IK_ENDPOINT}
            src={path}
            width={w}
            height={h}
            alt={alt}
            loading="lazy"
            transformation={[
                { width: w, height: h },
            ]}
            className={className}
        />
    );
}

export default ImageKit;