import certificateBg from "public/images/bg-certificate.png";
import { useRef } from "react";
import * as htmlToImage from 'html-to-image';
import { useRouter } from "next/router";

interface CertificateComp {
    btnRef?: any,
    refCerti: any,
    name?: string
}

function CertificateCompDownload(props: CertificateComp) {
    const { btnRef, refCerti, name } = props
    const domEl = useRef<HTMLDivElement>(null);
    const btnEl = useRef<HTMLSpanElement>(null)
    const router = useRouter()

    const downloadImage = async () => {
        const dataUrl = await htmlToImage.toPng(domEl.current);
        // download image
        const link = document.createElement('a');
        link.download = "chung-nhan-song-khoe-gop-xanh.png";
        link.href = dataUrl;
        link.click();
    }

    return (
        <>
            <div className="certificateComp__download">
                <div ref={domEl}>
                    <div style={{ backgroundImage: `url(${certificateBg.src})` }} className="certificateComp__download-comp">
                        <span style={{ color: 'transparent' }} onClick={downloadImage} ref={btnRef ? btnRef : btnEl}></span>
                        <div className={`certificateComp__download-content`}>
                            <h2 className="certificateComp__show mb-2 text-[1.3rem] text-center">
                                Chương Trình
                            </h2>
                            <h1 className="color-text-4b font-bold text-[1.5rem] text-center">
                                Sống khỏe Góp Xanh Cùng Panasonic
                            </h1>
                            <div className="flex justify-center">
                                <label className="certificateComp__text-title color-text-414 my-3 text-[1rem] text-center">
                                    Vinh Danh Khách Hàng
                                </label>
                            </div>
                            <h1 className="color-primary font-bold color-text-4b text-center mb-3 text-[1.5rem]">
                                {/* Bà: <span className="text-[1.5rem]">
                                    {router?.query?.name ? router?.query?.name : name ? name : ''}
                                </span> */}
                            </h1>
                            <p className="text-center mb-3 text-[0.9rem] certificateComp__text">
                                Đã góp một cây xanh cho khu bảo tồn thiên nhiên Phong Điền<br /> <span className="uppercase text-[0.9rem]">Vì Một Việt Nam Xanh Khỏe Mạnh</span>
                            </p>
                            <p className="text-end text-[0.7rem] mb-1">Ngày...tháng...năm 2023</p>
                            <div className="flex justify-between items-center gap-5">
                                <div className="flex flex-col items-center justify-between">
                                    <h1 className="color-text-414 text-[0.6rem]">Đại diện Bộ TN&MT</h1>
                                </div>
                                <div className="flex flex-col items-center justify-between">
                                    <h1 className="color-text-414 text-[0.6rem]">Đại diện Panasonic Việt Nam</h1>
                                </div>
                                <div className="flex flex-col items-center justify-between">
                                    <h1 className="color-text-414 text-[0.6rem]">Đại diện Ban quản lý rừng địa phương</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );

}

export default CertificateCompDownload;
