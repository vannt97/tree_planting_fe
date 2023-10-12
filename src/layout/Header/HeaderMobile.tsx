import Image from 'next/image';
import { useState } from 'react';
import menuBarIcon from 'public/icons/menu-bar.svg';
import cartIcon from 'public/icons/cart.svg';
import logo from 'public/images/logo.png';
import HeaderSideMenu from './HeaderSideMenu';
import Link from 'next/link';

function HeaderMobile() {
  const [showNav, setShowNav] = useState<boolean>(false);

  return (
    <>
      <header className="header py-4">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <span
              onClick={() => setShowNav(!showNav)}
              className="header__icon flex justify-center items-center"
            >
              <Image src={menuBarIcon} alt="" layout="fixed" width={25} height={25} />
            </span>
            <Link href={'/'}>
              <a>
                <Image src={logo} alt="" layout="fixed" width={150} height={25} />
              </a>
            </Link>
            <a
              href="https://www.panasonic.com/vn/events-and-promotions/events/song-khoe-gop-xanh-cung-panasonic.html"
              target={'_blank'}
              className="header__icon flex justify-center items-center"
              rel="noreferrer"
            >
              <Image src={cartIcon} alt="" width={30} height={30} layout="fixed" />
            </a>
          </div>
        </div>
      </header>
      <HeaderSideMenu onClose={() => setShowNav(!showNav)} show={showNav} />
    </>
  );
}

export default HeaderMobile;
