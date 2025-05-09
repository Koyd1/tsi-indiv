import React, { useState } from 'react';
import { FloatButton, Modal, QRCode, Space } from 'antd';
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
        className="!p-4 sm:!p-8 md:!p-20 !w-full sm:!w-[90%] md:!w-[60%] lg:!w-[40%] !h-auto sm:!h-auto md:!h-auto"
        open={isModalOpen}
        title="Поделись тестом с друзьями!"
        onCancel={handleCancel}
        footer={[]}
      >
        <Space direction="vertical" align="center">
          {/* Сдвигаем QR-код вправо с помощью ml-auto */}
          <QRCode
            type="canvas"
            className="!m-2 sm:!m-4 md:!m-8 ml-auto"
            size={280}
            value={'https://tsi-indiv.vercel.app'}
          />
        </Space>
      </Modal>
    </div>
  );
}
