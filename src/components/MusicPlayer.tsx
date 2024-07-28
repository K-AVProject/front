'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import Paper from '@mui/material/Paper';
import { Suspense, useEffect, useRef, useState } from "react";
import Image from 'next/image';

const StyledContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
    padding: '2rem',
});

const StyledPaper = styled(Paper)({
    width: '100%',
    maxWidth: '800px',
    padding: '1rem',
    textAlign: 'center',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
});

const WallPaper = styled('div')({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    overflow: 'hidden',
    background: 'transparent',
    transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
});

const Widget = styled('div')(({ theme }) => ({
    padding: 24,
    borderRadius: 16,
    width: 343,
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)',
    backdropFilter: 'blur(40px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
}));

const CoverImage = styled('div')({
    width: 100,
    height: 100,
    objectFit: 'cover',
    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
});

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.6,
    fontWeight: 500,
    letterSpacing: 0.2,
});

const MusicPlayer: React.FC = () => {
    const theme = useTheme();
    const router = useRouter();
    const searchParams = useSearchParams();
    const file = searchParams.get('file');

    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [paused, setPaused] = useState(true);
    const audioRef = useRef<any>(null);

    useEffect(() => {
        if (!file) {
            router.push('/filelist');
        }
    }, [file, router]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const handleTimeUpdate = () => {
                setPosition(audio.currentTime);
            };

            const handleLoadedMetadata = () => {
                setDuration(audio.duration);
            };

            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);

            return () => {
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            };
        }
    }, []);

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = newValue as number;
            setPosition(newValue as number);
        }
    };

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (audio) {
            if (paused) {
                audio.play();
            } else {
                audio.pause();
            }
            setPaused(!paused);
        }
    };

    const formatDuration = (value: number) => {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    };

    const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
    const lightIconColor = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

    return (
        <StyledContainer>
            <StyledPaper>
                <Suspense fallback={<div>Loading...</div>}>
                    <Box sx={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
                        {file && <audio ref={audioRef} src={`/path/to/your/audio/files/${file}`} />}
                        <Widget>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CoverImage>
                                    <Image alt="Album cover" src="/static/images/sliders/chilling-sunday.jpg" layout="fill" objectFit="cover" />
                                </CoverImage>
                                <Box sx={{ ml: 1.5, minWidth: 0 }}>
                                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                        Jun Pulse
                                    </Typography>
                                    <Typography noWrap>
                                        <b>{file}</b>
                                    </Typography>
                                </Box>
                            </Box>
                            <Slider
                                aria-label="time-indicator"
                                size="small"
                                value={position}
                                min={0}
                                step={1}
                                max={duration}
                                onChange={handleSliderChange}
                                sx={{
                                    color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                                    height: 4,
                                    '& .MuiSlider-thumb': {
                                        width: 8,
                                        height: 8,
                                        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                                        '&::before': {
                                            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                                        },
                                        '&:hover, &.Mui-focusVisible': {
                                            boxShadow: `0px 0px 0px 8px ${
                                                theme.palette.mode === 'dark' ? 'rgb(255 255 255 / 16%)' : 'rgb(0 0 0 / 16%)'
                                            }`,
                                        },
                                        '&.Mui-active': {
                                            width: 20,
                                            height: 20,
                                        },
                                    },
                                    '& .MuiSlider-rail': {
                                        opacity: 0.28,
                                    },
                                }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: -2 }}>
                                <TinyText>{formatDuration(position)}</TinyText>
                                <TinyText>-{formatDuration(duration - position)}</TinyText>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: -1 }}>
                                <IconButton aria-label="previous song">
                                    <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
                                </IconButton>
                                <IconButton aria-label={paused ? 'play' : 'pause'} onClick={togglePlayPause}>
                                    {paused ? (
                                        <PlayArrowRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
                                    ) : (
                                        <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
                                    )}
                                </IconButton>
                                <IconButton aria-label="next song">
                                    <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
                                </IconButton>
                            </Box>
                            <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
                                <VolumeDownRounded htmlColor={lightIconColor} />
                                <Slider
                                    aria-label="Volume"
                                    defaultValue={30}
                                    sx={{
                                        color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                                        '& .MuiSlider-track': {
                                            border: 'none',
                                        },
                                        '& .MuiSlider-thumb': {
                                            width: 24,
                                            height: 24,
                                            backgroundColor: '#fff',
                                            '&::before': {
                                                boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                                            },
                                            '&:hover, &.Mui-focusVisible, &.Mui-active': {
                                                boxShadow: 'none',
                                            },
                                        },
                                    }}
                                />
                                <VolumeUpRounded htmlColor={lightIconColor} />
                            </Stack>
                        </Widget>
                        <WallPaper />
                    </Box>
                </Suspense>
            </StyledPaper>
        </StyledContainer>
    );
};

export default MusicPlayer;
