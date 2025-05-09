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

      <div>
        <Modal
          className="!p-20 !w-100vh !h-[260vh]"
          open={isModalOpen}
          title="Поделись тестом с друзьями!"
          onCancel={handleCancel}
          footer={[]}
        >
          <Space direction="vertical" align="center">
            <QRCode
              type="canvas"
              className="!m-[3vh]"
              size={260}
              value={'https://tsi-indiv.vercel.app'}
            />
          </Space>
        </Modal>
      </div>
    </div>
  );
}
