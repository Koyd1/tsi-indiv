'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useCompanyNameForm() {
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();

  const handleChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleSubmit = () => {
    const trimmed = companyName.trim();
    if (!trimmed) return;

    setLoading(true);
    localStorage.setItem('companyName', trimmed);

    setTimeout(() => {
      router.push('/survey');
    }, 300);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return {
    inputRef,
    companyName,
    loading,
    handleChange,
    handleSubmit,
  };
}
