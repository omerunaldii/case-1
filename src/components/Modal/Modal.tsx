import React, { ReactElement } from 'react';
import Button from '../Button';
import { Cross } from '../../assets';

interface ModalProps {
  isOpened: boolean;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  onClose: () => void;
}

const Modal = ({ isOpened, title, body, footer, onClose }: ModalProps) => {

  const renderBody = () => {
    return body ? body : <></>;
  }

  const renderFooter = () => {
    return footer ? footer : <></>;
  }

  if (!isOpened) {
    return <></>;
  }

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content">
        <div className="header">
          <div className="title">{title ? title : 'Modal Title'}</div>
          <Button activeClass="cross" child={<Cross />} onClick={onClose} />
        </div>
        <div className="body">{renderBody()}</div>
        <div className={`${ footer ? 'footer' : '' }`}>{renderFooter()}</div>
      </div>
    </div>
  )
}

export default Modal;
