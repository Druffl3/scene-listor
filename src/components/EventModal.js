import { Modal  } from 'antd';
import React from 'react';

const EventModal = ({isModalVisible, handleOk, handleCancel, modalData }) => {
    return(
        <Modal title={modalData.title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>{modalData.description}</p>
            <p>{modalData.content}</p>
            <p>{modalData.contact}</p>
            <p>{modalData.email}</p>
        </Modal>
  );
}

export default EventModal;