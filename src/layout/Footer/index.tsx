import Image from "next/image";
import facebookIcon from "public/icons/facebook.svg";
import bgFooter from "public/images/bg-footer.png";

function Footer() {
    return (
        <footer className="footer relative ">
            <img className="w-full" src={bgFooter.src} alt="" />
            <div className="absolute top-[60%] left-[50%] -translate-y-1/2 -translate-x-1/2 w-full">
            <div className="container-custom">
                <div className="flex justify-between items-center">
                    <div className="text-3xl flex justify-center items-center flex-nowrap">
                        <span className="footer__text pr-8">
                            Copyright &copy; 2022 <strong>Panasonic Vietnam</strong>
                        </span>
                        <a href="mailto:customer@vn.panasonic.com" className="footer__text-link hover:text-white-500 pl-8">Liên Hệ</a>
                    </div>
                    <div className="flex items-center footer__social">
                        {/* <span>
                            <a target={'_blank'} href="https://www.facebook.com/PanasonicVietnam" rel="noreferrer">
                                <Image
                                    src={facebookIcon}
                                    alt=''
                                    layout="fixed"
                                />
                            </a>
                        </span> */}
                        {/* <span className="mx-2 flex items-center justify-center footer__social">
                            <Image
                                src={instagramIcon}
                                alt=''
                                className="mx-4"
                                layout="fixed"
                            />
                        </span>
                        <span className="footer__social">
                            <Image
                                src={zaloIcon}
                                alt=''
                                layout="fixed"
                            />
                        </span> */}
                    </div>
                </div>
            </div>
            </div>
            
        </footer>
    );
}

export default Footer;