import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Button, Container, TextField, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
});

const StyledPaper = styled(Paper)({
    padding: '2rem',
    textAlign: 'center',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
    animation: 'fadeIn 1s ease-in-out',
    '@keyframes fadeIn': {
        from: { opacity: 0 },
        to: { opacity: 1 },
    },
});

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const login = useAuthStore((state) => state.login);

    const handleLogin = () => {
        login(username, password);
    };

    return (
        <StyledContainer maxWidth="sm">
            <StyledPaper elevation={3}>
                <Typography variant="h4" component="h1" gutterBottom>
                    로그인
                </Typography>
                <TextField
                    label="아이디"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="비밀번호"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
                    로그인
                </Button>
            </StyledPaper>
        </StyledContainer>
    );
};

export default Login;
