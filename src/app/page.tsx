'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // next/router 대신 next/navigation 사용
import { useAuthStore } from '../store/useAuthStore';
import Login from '../components/Login';

const IndexPage: React.FC = () => {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/filelist');
    }
  }, [isLoggedIn, router]);

  return <Login />;
};

export default IndexPage;
