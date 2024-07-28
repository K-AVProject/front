import create from 'zustand';

interface AuthState {
    isLoggedIn: boolean;
    username: string | null;
    login: (username: string, password: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    username: null,
    login: (username, password) => {
        // 여기에 실제 로그인 로직 추가
        if (username === 'admin' && password === 'password') {
            set({ isLoggedIn: true, username });
        }
    },
    logout: () => set({ isLoggedIn: false, username: null }),
}));
