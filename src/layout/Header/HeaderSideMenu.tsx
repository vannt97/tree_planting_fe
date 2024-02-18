import { Drawer } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import closeIcon from '../../../public/icons/close-icon.svg';
import { Link as LinkScroll, animateScroll as scroll, Element } from 'react-scroll';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useWindowSize from 'src/app/hooks/useWindowSize';

interface HeaderSideMenuProps {
  onClose: () => void;
  show: boolean;
}
function HeaderSideMenu(props: HeaderSideMenuProps) {
  const width = useWindowSize()?.width;
  const { show, onClose } = props;
  const router = useRouter();
  const [id, setId] = useState('');

  const handleRedirectToElement = (id: string) => {
    if (router.pathname === '/') {
      const header = document.getElementById('header');
      const titleElement = document.getElementById(id);
      window.scrollTo({
        top: titleElement?.getBoundingClientRect().top - header.clientHeight - 50 + window.scrollY,
        left: 0,
        behavior: 'smooth',
      });
    } else if (router.pathname === '/my-garden' || router.pathname === '/wheel/[id]') {
      localStorage.setItem('redirect', id);
      router.push('/');
    } else {
      router.push('/');
    }

    setId(id);
  };

  return (
    <Drawer
      closeIcon={<Image src={closeIcon} alt="" layout="fixed" width={20} height={20} />}
      className="header__nav"
      onClose={onClose}
      open={show}
      placement="left"
      width={width < 800 ? '80vw' : 300}
    >
      <nav>
        <ul onClick={onClose} className="header__nav-list">
          
          <li className="header__nav-list-item">
            <span
              onClick={() => handleRedirectToElement('products-wrapper')}
              className={`header__nav-list-item-link cursor-pointer py-3 pl-5 block ${
                id === 'products-wrapper' && 'bg-green-29'
              }`}
            >
              Mỗi sản phẩm Một cây xanh
            </span>
          </li>
         
          <li className="header__nav-list-item">
            <span
              onClick={() => handleRedirectToElement('followTree')}
              className={`header__nav-list-item-link cursor-pointer py-3 pl-5 block ${
                id === 'followTree' && 'bg-green-29'
              }`}
            >
              Theo Dõi Cây
            </span>
          </li>
          <li className="header__nav-list-item">
            <span
              className={`header__nav-list-item-link cursor-pointer py-3 pl-5 block ${
                id === 'show' && 'bg-green-29'
              }`}
              onClick={() => {
                router.push('/gallery')
              }}
            >
              Thư viện chuyện rừng
            </span>
          </li>
          {/* <li className="header__nav-list-item">
            <span
              onClick={() => handleRedirectToElement('registerPlanting')}
              className={`header__nav-list-item-link cursor-pointer py-3 pl-5 block ${
                id === 'registerPlanting' && 'bg-green-29'
              }`}
            >
              Góp Cây
            </span>
          </li>
          <li className="header__nav-list-item">
            <span
              onClick={() => handleRedirectToElement('partner')}
              className={`header__nav-list-item-link cursor-pointer py-3 pl-5 block ${
                id === 'partner' && 'bg-green-29'
              }`}
            >
              Đối Tác
            </span>
          </li> */}
          <li className="header__nav-list-item">
            <span
              onClick={() => handleRedirectToElement('aboutProgram')}
              className={`header__nav-list-item-link cursor-pointer py-3 pl-5 block ${
                id === 'aboutProgram' && 'bg-green-29'
              }`}
            >
              Về chương trình
            </span>
          </li>
        </ul>
      </nav>
    </Drawer>
  );
}

export default HeaderSideMenu;
