import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import logo from 'public/images/logo.png';
import HeaderSideMenu from './HeaderSideMenu';
import Link from 'next/link';
import HeaderMobile from './HeaderMobile';
import HeaderTop from './HeaderTop';
import { useRouter } from 'next/router';
import useWindowSize from 'src/app/hooks/useWindowSize';
import { Modal } from 'antd';
import ModalMaintaince from 'src/containers/home/ModalMaintaince/ModalMaintaince';

function Header() {
  const [showNav, setShowNav] = useState<boolean>(false);
  const [scroll, setScroll] = useState<number>(0);
  const router = useRouter();
  const [id, setId] = useState('');
  const width = useWindowSize()?.width;
  const [isShowModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   if (id !== '') {
  //     handleRedirectToElement(id);
  //   }
  // }, [id]);

  useEffect(() => {
    const handleScroll: EventListener = (e: Event) => {
      const window = e.currentTarget as Window;
      setScroll(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scroll]);

  const handleRedirectToElement = (id: string) => {
    if (router.pathname !== '/') {
      router.push(`/#${id}`);
    }
    if (router.pathname === '/') {
      const header = document.getElementById('header');
      const titleElement = document.getElementById(id);
      let paddingCustom = 10;
      if (id === 'aboutProgram' && width > 1023) {
        paddingCustom = -120;
      }
      window.scrollTo({
        top:
          titleElement.getBoundingClientRect().top -
          (header.clientHeight + paddingCustom) +
          window.scrollY,
        left: 0,
        behavior: 'smooth',
      });
    }
    setId(id);
  };

  const handleClickPath = (id: string) => {
    router.push(id);
    setId(id);
  };

  return (
    <>
      <header id="header" className={`header__container ${scroll > 200 ? 'float' : ''}`}>
        <div className="block tablet:hidden">
          <HeaderMobile />
        </div>
        <div className="hidden tablet:block">
          <header className="header py-4">
            <div className="container-custom">
              {/* {scroll < 200 && <HeaderTop />} */}
              <div className="flex justify-between items-center">
                <Link href={'/'} className="header__logo cursor-pointer">
                  <a className="header__logo">
                    <Image src={logo} alt="" layout="fixed" />
                  </a>
                </Link>

                <ul className="header__list flex items-center">
                  <li className="">
                    <span
                      onClick={() => handleRedirectToElement('products-wrapper')}
                      className={` block header__link color-text-1e cursor-pointer ${
                        id === 'products-wrapper'
                          ? 'border-b-2 border-green-primary text-green-primary'
                          : 'border-b-2 border-transparent'
                      }`}
                    >
                      Mỗi sản phẩm - Một cây xanh
                    </span>
                  </li>

                  <li className="">
                    <span
                      onClick={() => {
                        handleRedirectToElement('followTree');
                        // setShowModal(true)
                      }}
                      className={` block header__link color-text-1e cursor-pointer ${
                        id === 'followTree'
                          ? 'border-b-2 border-green-primary text-green-primary'
                          : 'border-b-2 border-transparent'
                      }`}
                    >
                      Theo Dõi Cây
                    </span>
                  </li>
                  <li className="">
                    <span
                      className={` block header__link color-text-1e cursor-pointer ${
                        id === 'gallery'
                          ? 'border-b-2 border-green-primary text-green-primary'
                          : 'border-b-2 border-transparent'
                      }`}
                      onClick={() => {
                        router.push('/gallery');
                        setId('gallery');
                      }}
                    >
                      Thư viện chuyện rừng
                    </span>
                  </li>
                  {/* <li className="">
                    <span
                      onClick={() => handleRedirectToElement('registerPlanting')}
                      className={` block header__link color-text-1e cursor-pointer ${
                        id === 'registerPlanting'
                          ? 'border-b-2 border-green-primary text-green-primary'
                          : 'border-b-2 border-transparent'
                      }`}
                    >
                      Góp Cây
                    </span>
                  </li> */}
                  {/* <li className="">
                    <span
                      onClick={() => handleRedirectToElement('partner')}
                      className={` block header__link color-text-1e cursor-pointer ${
                        id === 'partner'
                          ? 'border-b-2 border-green-primary text-green-primary'
                          : 'border-b-2 border-transparent'
                      }`}
                    >
                      Đối Tác
                    </span>
                  </li> */}
                  <li className="">
                    <span
                      onClick={() => handleRedirectToElement('aboutProgram')}
                      className={` block header__link color-text-1e cursor-pointer ${
                        id === 'aboutProgram'
                          ? 'border-b-2 border-green-primary text-green-primary'
                          : 'border-b-2 border-transparent'
                      }`}
                    >
                      Về chương trình
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </header>
        </div>
      </header>
      <HeaderSideMenu onClose={() => setShowNav(!showNav)} show={showNav} />
      {/* <ModalMaintaince isShowModal={isShowModal} setShowModal={setShowModal}/> */}
    </>
  );
}

export default Header;
