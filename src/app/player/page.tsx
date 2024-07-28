import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const MusicPlayer = dynamic(() => import('@/components/MusicPlayer'), { ssr: false });

const PlayerPage: React.FC = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <MusicPlayer />
    </Suspense>
);

export default PlayerPage;
