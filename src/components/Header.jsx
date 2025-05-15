import { Typography } from 'antd';
const { Title, Text } = Typography;

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg px-4 sm:px-8 py-4 sm:py-6 select-none border-b border-gray-200">
      <div className="max-w-7xl mx-auto text-center">
        <Title
          level={3}
          className="!text-2xl sm:!text-2xl md:!text-3xl !m-0 !font-medium"
        >
          Чеклист по внедрению стандартов информационной безопасности
        </Title>
        <Text className="block mt-4 text-lg sm:!text-2xl md:!text-2xl font-semibold text-gray-800">
          <u>ISO 27001</u> & <u>NIST</u>
        </Text>
      </div>
    </div>
  );
}
