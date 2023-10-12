import { Modal } from "antd";
import Image from "next/image";
import iconClose from "public/icons/close.svg";
import styled from "styled-components";

interface HomePolicyProps {
    show: boolean,
    onClose: () => void,
}
function HomePolicy(props: HomePolicyProps) {
    const { show, onClose } = props
    return (
        <ModalCustomStyle title="Điều khoản:" centered closeIcon={<Image height={15} width={15} src={iconClose} alt="" />} footer={null} open={show} onCancel={onClose}>
            <ul>
                <li className="color-text-1e">1. Đồng ý nhận thông tin chăm sóc khách hàng từ Panasonic Việt Nam.</li>
                <li className="color-text-1e">2. Cho phép Panasonic sử dụng tư liệu và hình ảnh nhằm mục đích truyền thông.</li>
            </ul>
        </ModalCustomStyle>
    );
}

export default HomePolicy;

const ModalCustomStyle = styled(Modal)`
    .ant-modal-header{
        border-bottom: none;
        padding: 16px 24px 0px;
        .ant-modal-title{
            font-weight: 700;
        }
    }
    .ant-modal-body{
        padding: 10px 24px 16px;
    }
`