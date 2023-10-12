import Image from "next/image";
import cartIcon from "public/icons/cart.svg";

function HeaderTop() {
    return (
        <div className="flex justify-end items-center">
            <p className="text-end italic color-text-1e text-sl">
                <span className="uppercase font-medium color-primary">
                    Mua
                </span> sản phẩm -  <span className="uppercase font-medium color-primary">
                    trồng
                </span> cây xanh
            </p>
            <a href="https://www.panasonic.com/vn/events-and-promotions/events/song-khoe-gop-xanh-cung-panasonic.html" target={'_blank'} className="ml-2" rel="noreferrer">
                <Image
                    src={cartIcon}
                    height={25}
                    width={25}
                    alt=''
                />
            </a>
        </div>
    );
}

export default HeaderTop;