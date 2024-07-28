'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/useAuthStore';
import FileList from '../../components/FileList';

const FileListPage: React.FC = () => {
    const router = useRouter();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/');
        }
    }, [isLoggedIn, router]);

    return <FileList />;
};

export default FileListPage;
