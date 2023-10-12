import Image, { StaticImageData } from "next/image";
import { formatMoney } from "src/utils/helpers/common";

interface ProductItemProps {
  title: string,
  image: StaticImageData
  price: number,
  small?: boolean,
  description?: string,
}

function ProductItem(props: ProductItemProps) {
  const { description, title, price, image, small } = props

  return (
    <article className="productItem p-3">
      {/* <div
        className="productItem__image"
        style={{ backgroundImage: `url(${image.src})` }}
      >
      </div> */}
      <Image
        src={image}
        alt=''
        sizes="100%"
      />

      <h2 className="productItem__title text-center my-4">
        {title}
      </h2>

      <p className="productItem__des color-text-44">
        {description ? description : ''}
      </p>

      {
        !small &&
        <div className="productItem__price my-4">
          <span className="productItem__price-text">Giá tham khảo:</span>
          <span className="font-semibold productItem__price-number">
            {formatMoney(price)}
            <span className="uppercase text-xl ml-1">VND</span>
          </span>
        </div>
      }

      <button
        className={`productItem__btn bg-primary px-3 py-2 mb-1 ${small ? 'productItem__btn--green' : ''}`}
      >
        Mua Ngay
      </button>

      {
        !small &&
        <p className="productItem__tax color-text-55">
          * Giá trên đã bao gồm thuế VAT
        </p>
      }
    </article>
  );
}

export default ProductItem;
