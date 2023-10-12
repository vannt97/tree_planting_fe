import { useRouter } from "next/router";
import certificateBg from "public/images/bg-certificate.png";
import { useRef } from "react";
import CertificateCompDownload from "./CertificateCompDownload";

interface CertificateComp {
    marginMobile?: boolean,
    btnRef?: any,
    refCerti?: any,
    name?: string
}

function CertificateComp(props: CertificateComp) {
    const { marginMobile, btnRef, refCerti, name } = props
    const domEl = useRef<HTMLDivElement>(null);
    const router = useRouter()


    return (
        <>
            <div ref={domEl} style={{ backgroundImage: `url(${certificateBg.src})` }} className="certificateComp">
                <div className={`certificateComp__content ${marginMobile ? 'w-5rem' : ''}`}>
                    <h2 className="certificateComp__show uppercase f-oswald mb-2 text-[0.75rem] tablet:text-[1.3rem] text-center">
                        Chương Trình
                    </h2>
                    <h1 className="color-text-4b font-bold f-oswald text-[0.8rem] tablet:text-[1.5rem] text-center">
                        Sống khỏe Góp Xanh Cùng Panasonic
                    </h1>
                    <div className="flex justify-center">
                        <label className="certificateComp__text-title f-oswald color-text-414 my-1 tablet:my-2 laptop:my-3 text-[0.6rem] tablet:text-[1rem] text-center">
                            Vinh Danh Khách Hàng
                        </label>
                    </div>
                    <h1 className="color-primary f-oswald font-bold color-text-4b text-center mb-3 text-[0.8rem] tablet:text-[1.5rem]">
                        Bà: <span className="text-[0.8rem] f-oswald tablet:text-[1.5rem]">{router?.query?.name ? router?.query?.name : name ? name : ''}</span>
                    </h1>
                    <p className="text-center text-[0.6rem] uppercase f-oswald mb-3 tablet:text-[0.9rem] certificateComp__text">
                        <span className="whitespace-nowrap">Đã góp một cây xanh cho khu bảo tồn thiên nhiên Phong Điền</span><br /> <span className="uppercase  text-[0.6rem] tablet:text-[0.9rem]">Vì Một Việt Nam Xanh Khỏe Mạnh</span>
                    </p>

                    <p className="text-end text-[0.5rem] tablet:text-[0.7rem] mb-1">Ngày...tháng...năm 2023</p>
                    <div className="flex justify-between items-center gap-5">
                        <div className="flex flex-col items-center justify-between">
                            <h1 className="color-text-414 text-[0.3rem] tablet:text-[0.5rem] laptop:text-[0.6rem]">Đại diện Bộ TN&MT</h1>
                        </div>
                        <div className="flex flex-col items-center justify-between">
                            <h1 className="color-text-414 text-[0.3rem] tablet:text-[0.5rem] laptop:text-[0.6rem]">Đại diện Panasonic Việt Nam</h1>
                        </div>
                        <div className="flex flex-col items-center justify-between">
                            <h1 className="color-text-414 text-[0.3rem] tablet:text-[0.5rem] laptop:text-[0.6rem]">Đại diện Ban quản lý rừng địa phương</h1>
                        </div>
                    </div>
                </div>
            </div>
            <CertificateCompDownload
                btnRef={btnRef}
                refCerti={refCerti}
                name={name}
            />

        </>
    );

}

export default CertificateComp;
