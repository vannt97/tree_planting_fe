/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import treeIcon from 'public/icons/tree.svg';
import { useEffect } from 'react';
import AOS from 'aos';

interface PostItemProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

function PostItem(props: PostItemProps) {
  const { image, title, description, link } = props;

  return (
    <div className="postItem h-full flex flex-col">
      <div className="postItem__img w-full flex-1">
        <img style={{ objectFit: 'cover' }} width={'100%'} height="100%" src={image} alt="" />
      </div>
      <div className="postItem__body flex flex-col flex-1">
        <div className="h-[54px]">
          <h1 className="postItem__title color-text-33 text-1xl font-medium">{title}</h1>
        </div>
        <div className="flex-1">
          <p className="postItem__des color-text-55 text-justify text-[14px] laptop:text-[16px] tablet:text-[16px] h-max">
            {description}
          </p>
        </div>
        <a
          href={link}
          target="_blank"
          className="postItem__link flex items-end mt-1"
          rel="noreferrer"
        >
          <span className="postItem__link-icon flex items-center">
            <Image src={treeIcon} alt="" />
          </span>
          <span className="postItem__link-text color-primary ml-1">Xem Thêm</span>
        </a>
      </div>
    </div>
  );
}

export default PostItem;
