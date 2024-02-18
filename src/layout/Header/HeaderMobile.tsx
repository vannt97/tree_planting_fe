import Image from 'next/image';
import { useEffect, useState } from 'react';
import menuBarIcon from 'public/icons/menu-bar.svg';
import cartIcon from 'public/icons/cart.svg';
import logo from 'public/images/logo.png';
import HeaderSideMenu from './HeaderSideMenu';
import Link from 'next/link';
import decorLeaf2 from 'public/images/decor-leaf-2.png';
import useWindowSize from 'src/app/hooks/useWindowSize';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import ModalMaintaince from 'src/containers/home/ModalMaintaince/ModalMaintaince';
function HeaderMobile() {
  const [showNav, setShowNav] = useState<boolean>(false);

  useEffect(() => {
    if (showNav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showNav]);
  const width = useWindowSize()?.width;
  const router = useRouter();
  const [id, setId] = useState('');
  const [isShowModal, setShowModal] = useState(false);

  const handleRedirectToElement = (id: string) => {
    if (router.pathname !== '/') {
      router.push(`/#${id}`);
    }
    if (router.pathname === '/') {
      const header = document.getElementById('header');
      const titleElement = document.getElementById(id);
      window.scrollTo({
        top:
          titleElement.getBoundingClientRect().top - (header.clientHeight + 0) + window.scrollY,
        left: 0,
        behavior: 'smooth',
      });
    }
    setShowNav(false);
  };
  return (
    <>
      <header className="relative z-20 header py-4">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <Link href={'/'}>
              <a>
                <Image src={logo} alt="" layout="fixed" width={150} height={25} />
              </a>
            </Link>
            <span
              onClick={() => setShowNav(!showNav)}
              className="header__icon flex justify-center items-center"
            >
              <Image src={menuBarIcon} alt="" layout="fixed" width={25} height={25} />
            </span>

            {/* <a
              href="https://www.panasonic.com/vn/events-and-promotions/events/song-khoe-gop-xanh-cung-panasonic.html"
              target={'_blank'}
              className="header__icon flex justify-center items-center invisible"
              rel="noreferrer"
            >
              <Image src={cartIcon} alt="" width={30} height={30} layout="fixed" />
            </a> */}
          </div>
        </div>
      </header>
      <div
        className={`z-10 w-full top-0 left-0 fixed ${
          showNav ? `h-full` : `h-[0px]`
        } z-1 flex justify-center items-center ease-in-out duration-300 bg-white-500 overflow-hidden`}
      >
        <div className="-z-1 absolute top-0 left-0 w-full h-full bg-primary-10 opacity-80"></div>
        <ul className="relative z-10 text-center text-1xl relative text-white-500 w-[80%]">
          <li
            onClick={() => handleRedirectToElement('products-wrapper')}
            className="my-4 p-4 border-4 rounded-2xl border-white-500 "
          >
            Mỗi sản phẩm - Một cây xanh
          </li>
          <li
            onClick={() => {
              handleRedirectToElement('followTree');
              setShowModal(true)
            }}
            className="my-4 p-4 border-4 rounded-2xl border-white-500 "
          >
            Theo dõi cây
          </li>
          <li
            onClick={() => {
              router.push('/gallery');
              setShowNav(false);
            }}
            className="my-4 p-4 border-4 rounded-2xl border-white-500 "
          >
            Thư viện chuyện rừng
          </li>
          <li
            onClick={() => handleRedirectToElement('aboutProgram')}
            className="my-4 p-4 border-4 rounded-2xl border-white-500 "
          >
            Về chương trình
          </li>
        </ul>
        <img className='blur-md z-1 scale-[2] absolute top-[50%] -translate-y-1/2 right-[50%] ' src={decorLeaf2.src} alt="" />
      </div>
      {/* <HeaderSideMenu onClose={() => setShowNav(!showNav)} show={showNav} /> */}
      {/* <ModalMaintaince isShowModal={isShowModal} setShowModal={setShowModal}/> */}

    </>
  );
}

export default HeaderMobile;
