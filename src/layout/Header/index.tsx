import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import logo from 'public/images/logo.png';
import HeaderSideMenu from './HeaderSideMenu';
import Link from 'next/link';
import HeaderMobile from './HeaderMobile';
import HeaderTop from './HeaderTop';
import { useRouter } from 'next/router';

function Header() {
  const [showNav, setShowNav] = useState<boolean>(false);
  const [scroll, setScroll] = useState<number>(0);
  const router = useRouter();
  const [id, setId] = useState('');

  useEffect(() => {
    if (id !== '') {
      handleRedirectToElement(id);
    }
  }, [id]);

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
      window.scrollTo({
        top:
          titleElement.getBoundingClientRect().top - (header.clientHeight + 100) + window.scrollY,
        left: 0,
        behavior: 'smooth',
      });
    }
    setId(id);
  };

  return (
    <>
      <header id="header" className={`header__container ${scroll > 200 ? 'float' : ''}`}>
        <div className="block tablet:hidden">
          <HeaderMobile />
        </div>
        <div className="hidden tablet:block">
          <header className="header py-2">
            <div className="container-custom">
              {scroll < 200 && <HeaderTop />}
              <div className="flex justify-between items-center">
                <Link href={'/'} className="header__logo cursor-pointer">
                  <a className="header__logo">
                    <Image src={logo} alt="" layout="fixed" />
                  </a>
                </Link>

                <ul className="header__list flex items-center">
                  
                  <li className="">
                    <span
                      onClick={() => handleRedirectToElement('regiterWarranty')}
                      className={`py-3 block header__link color-text-1e cursor-pointer ${
                        id === 'regiterWarranty'
                          ? 'border-b-2 border-green-primary text-green-primary'
                          : 'border-b-2 border-transparent'
                      }`}
                    >
                      Đăng Ký Bảo Hành
                    </span>
                  </li>
                  <li className="">
                    <span
                      className={`py-3 block header__link color-text-1e cursor-pointer ${
                        id === 'show'
                          ? 'border-b-2 border-green-primary text-green-primary'
                          : 'border-b-2 border-transparent'
                      }`}
                      onClick={() => handleRedirectToElement('show')}
                    >
                      Về Chương Trình
                    </span>
                  </li>
                  <li className="">
                    <span
                      onClick={() => handleRedirectToElement('followTree')}
                      className={`py-3 block header__link color-text-1e cursor-pointer ${
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
                      onClick={() => handleRedirectToElement('registerPlanting')}
                      className={`py-3 block header__link color-text-1e cursor-pointer ${
                        id === 'registerPlanting'
                          ? 'border-b-2 border-green-primary text-green-primary'
                          : 'border-b-2 border-transparent'
                      }`}
                    >
                      Góp Cây
                    </span>
                  </li>
                  <li className="">
                    <span
                      onClick={() => handleRedirectToElement('partner')}
                      className={`py-3 block header__link color-text-1e cursor-pointer ${
                        id === 'partner'
                          ? 'border-b-2 border-green-primary text-green-primary'
                          : 'border-b-2 border-transparent'
                      }`}
                    >
                      Đối Tác
                    </span>
                  </li>
                  <li className="">
                    <span
                      onClick={() => handleRedirectToElement('news')}
                      className={`py-3 block header__link color-text-1e cursor-pointer ${
                        id === 'news'
                          ? 'border-b-2 border-green-primary text-green-primary'
                          : 'border-b-2 border-transparent'
                      }`}
                    >
                      Bản Tin Xanh
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </header>
        </div>
      </header>
      <HeaderSideMenu onClose={() => setShowNav(!showNav)} show={showNav} />
    </>
  );
}

export default Header;
