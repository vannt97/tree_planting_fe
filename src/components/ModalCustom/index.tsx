import { ReactNode } from "react";
import closeIcon from "public/icons/close.svg";
import Image from "next/image";

interface Modal {
    show: boolean,
    onClose: () => void
    position: 'center' | 'left' | 'right' | 'bottom' | 'full',
    children: ReactNode,
    close?: boolean,
    className?: string,
    zIndexOverlay?: number,
    zIndexModal?: number,
}

function ModalCustom(props: Modal) {
    const { position, show, onClose, children, close, zIndexOverlay, className, zIndexModal } = props

    return (
        <>
            <div style={{ zIndex: zIndexOverlay ? zIndexOverlay : '15' }} onClick={onClose} className={`overlay ${show && position !== "full" ? 'active' : ''}`}></div>
            <div style={{ zIndex: zIndexModal ? zIndexModal : '20' }} className={`modalCustom__${position} ${show ? 'active' : ''} ${className}`}>
                {close && <span onClick={onClose} className="modalCustom__close cursor-pointer mb-3">
                    <Image
                        src={closeIcon}
                        alt=''
                        height={15}
                        width={15}
                    />
                </span>
                }
                {children}
            </div>
        </>
    );
}

export default ModalCustom;