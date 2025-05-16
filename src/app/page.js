'use client';

import { useRouter } from 'next/navigation';
import { Start } from '@/components/pages';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Start />
    </>
  );
}
