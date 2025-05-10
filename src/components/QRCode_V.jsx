import React, { useState } from 'react';
import { FloatButton, Modal, QRCode } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';

export default function QRCode_V() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <FloatButton
        onClick={showModal}
        shape="square"
        type="primary"
        style={{ insetInlineEnd: 24 }}
        icon={<QrcodeOutlined />}
      />

      <Modal
        className="!p-4 sm:!p-8 md:!p-12 !w-full sm:!w-[90%] md:!w-[60%] lg:!w-[40%] !h-auto"
        open={isModalOpen}
        title="Поделись тестом с друзьями!"
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <div className="flex justify-center items-center">
          <QRCode
            type="canvas"
            size={240}
            value="https://tsi-indiv.vercel.app"
          />
        </div>
      </Modal>
    </div>
  );
}
