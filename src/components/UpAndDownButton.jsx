import { FloatButton } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import React from 'react';

export default function UpAndDownButton() {
  return (
    <div>
      <FloatButton
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        shape="square"
        type="primary"
        icon={<CaretUpOutlined />}
        style={{
          position: 'fixed',
          bottom: '53%',
          right: 24,
        }}
      />

      <FloatButton
        onClick={() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          });
        }}
        shape="square"
        type="primary"
        icon={<CaretDownOutlined />}
        style={{
          position: 'fixed',
          bottom: '46%',
          right: 24,
        }}
      />
    </div>
  );
}
