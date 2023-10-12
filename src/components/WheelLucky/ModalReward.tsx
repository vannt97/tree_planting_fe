import { Modal } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import bigGiftCircle from 'public/images/big-gift-circle.png';
import noGift from 'public/images/no-gift.png';
import shoppingCart from 'public/images/ShoppingCart.png';
import { useEffect, useState } from 'react';
import ModalImage from './ModalImage';
const ModalReward = ({ open, onCancel, result, width }) => {
  const [openModalImage, setOpenModalImage] = useState(false);
  useEffect(() => {
    setOpenModalImage(false);
  }, []);
  const router = useRouter();

  return (
    <>
      <Modal
        closable={true}
        onCancel={onCancel}
        open={open}
        footer={false}
        className={`modal-reward ${result?.isWin && 'isWin'}`}
        centered
      >
        {!result?.isWin ? (
          <div>
            <p className="text-[13px] laptop:text-[16px] tablet:[text-16px] text-sorry">Rất Tiếc</p>
            <p className="text-center text-white-500 text-[18px] laptop:text-[24px] tablet:[text-24px] uppercase tracking-wide">
              Chúc bạn may mắn lần sau
            </p>
            <div className="text-center mt-5 mb-10">
              <Image src={noGift} alt="No Gift" />
            </div>
            <p className="text-desc text-[13px] laptop:text-[16px] tablet:[text-16px]">
              Để tham gia Vòng quay Xanh khỏe mạnh, khách hàng cần chia sẻ Chứng nhận trồng cây lên
              trang Facebook cá nhân ở chế độ công khai. Đối với mỗi sản phẩm, khách hàng sẽ có 01
              lượt quay mỗi ngày
            </p>
            <div className="text-more text-[13px] laptop:text-[16px] tablet:[text-16px] inline-block">
              <span className="mr-2">
                Tham khảo thêm sản phẩm thuộc Bộ giải pháp sức khỏe toàn diện của Panasonic bạn nhé!
              </span>
              <a
                href=" https://www.panasonic.com/vn/events-and-promotions/events/song-khoe-gop-xanh-cung-panasonic.html"
                target="blank"
                className="shopping-cart"
              >
                <Image src={shoppingCart} width={20} height={20} alt="Shopping Cart" />
              </a>
            </div>
            <div
              className="w-full"
              onClick={() => router.push(`/my-garden?key=${localStorage.getItem('pn')}`)}
            >
              <p className="uppercase text-green-primary mx-auto w-max bg-white-500 rounded-[40px] mt-3 button-shadow font-[600] cursor-pointer">
                Quay Về Vườn Cây
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center text-white-500">
              <p className="text-[13px] laptop:text-[16px] tablet:[text-16px] text-sorry">
                Chúc Mừng Bạn Đã Trúng
              </p>
              <p className="text-center text-white-500 text-[18px] laptop:text-[24px] tablet:[text-24px] uppercase tracking-wide">
                01 {result?.reward?.giftName}
              </p>
            </div>
            <div>
              <div className="relative text-center mx-auto">
                <Image
                  src={result?.reward?.imageLink}
                  width={width < 650 ? 120 : 180}
                  height={width < 650 ? 120 : 180}
                  alt="Gift Image"
                />
                <div className="absolute top-0 left-0 right-0">
                  <Image
                    src={bigGiftCircle}
                    width={width < 650 ? 120 : 180}
                    height={width < 650 ? 120 : 180}
                    alt="Big Circle"
                  />
                </div>
              </div>
              <div className="text-white-500 text-[13px] laptop:text-[16px] tablet:[text-16px] font-[400]">
                <p className="text-[13px] laptop:text-[16px] tablet:[text-16px] font-[500]">
                  Để nhận quà khách hàng thực hiện các bước sau:
                </p>
                <p className="text-[13px] laptop:text-[16px] tablet:[text-16px]">
                  Bước 1: Khách hàng chụp màn hình chúc mừng trúng quà đang hiển thị trên website
                </p>
                <p className="text-[13px] laptop:text-[16px] tablet:[text-16px]">
                  Bước 2: Inbox thông tin nhận quà cho{' '}
                  <span>
                    <a
                      href="https://www.facebook.com/PanasonicVietnam"
                      target="blank"
                      className="cursor-pointer fanPage-hover"
                    >
                      <span className="font-[600]">Fanpage Panasonic Việt Nam.&nbsp;</span>
                    </a>
                  </span>
                  Các thông tin yêu cầu gồm:
                </p>
                <ul className="list-disc pl-8 font-[400] mb-2">
                  <li> Họ và tên</li>
                  <li> Số điện thoại</li>
                  <li> Địa chỉ nhận quà để BTC có thể liên lạc khi cần thiết.</li>
                  <li>Hình ảnh chụp 2 mặt CMND/Căn cước công dân/Hộ chiếu.</li>
                </ul>
              </div>
              <div className="laptop:text-[16px] tablet:text-[16px] text-[13px] text-white-500 font-[400]">
                Khách hàng vui lòng gửi thông tin nhận quà về &nbsp;
                <span>
                  <a
                    href="https://www.facebook.com/PanasonicVietnam"
                    target="blank"
                    className="cursor-pointer fanPage-hover"
                  >
                    <span className="font-[600]">Fanpage Panasonic Việt Nam&nbsp;</span>
                  </a>
                </span>
                trong vòng 3 ngày kể từ khi trúng quà. BTC sẽ hủy kết quả nếu sau 3 ngày chưa nhận
                được thông tin nhận quà.&nbsp;
              </div>
              <p className="text-more text-[13px] laptop:text-[16px] tablet:[text-16px] mt-2">
                Tên model/ mã sản phẩm làm giải thưởng có thể thay đổi tại thời điểm trả thưởng. Sản
                phẩm thay thế đảm bảo có giá trị tương đương
              </p>
            </div>
            <a
              target="blank"
              href="https://www.panasonic.com/vn/corporate/news/articles/20221208-cong-bo-chuong-trinh-vong-quay-xanh-khoe-manh.html"
              className="w-full"
            >
              <p className="uppercase text-green-primary mx-auto w-max bg-white-500 rounded-[40px] mt-3 button-shadow font-[600] cursor-pointer">
                Thời gian trao thưởng
              </p>
            </a>
          </div>
        )}
      </Modal>
      <ModalImage open={openModalImage} onClose={() => setOpenModalImage(false)} />
    </>
  );
};

export default ModalReward;
