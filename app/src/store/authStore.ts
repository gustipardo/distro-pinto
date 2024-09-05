import { login as loginService } from '@/services/login';
import { logout as logoutService } from '@/services/logout';
import { refreshToken as refreshTokenService } from '@/services/refreshAccessToken';
import { validateAccessToken as validateAccessTokenService } from '@/services/validateAcessToken';

import { create } from 'zustand'


interface UserData {
    id: string
    username: string;
    role_name: string
}

type Store = {
    accessToken: string | null
    isAuthenticated: boolean
    userData: UserData | null
    login: ({ username, password }: { username: string, password: string }) => void
    setAuthenticated: (isAthenticated: boolean) => void
    logout: () => void
    setAccessToken: (accessToken: string) => void
    refreshAcessToken: () => Promise<void>
    validateAccessToken: () => Promise<void>
}

export const authStore = create<Store>()((set) => ({
    isAuthenticated: false,
    userData: null,
    accessToken: null,


    setAuthenticated: (isAuthenticated) => set({ isAuthenticated: isAuthenticated }),

    setAccessToken: (accessToken) => set({ accessToken: accessToken }),
    login: async ({ username, password }: { username: string; password: string }): Promise<UserData> => {
        try {
            const userData = await loginService({ username, password });
            set({ isAuthenticated: true });
            const { user, accessToken } = userData
            set({ isAuthenticated: true, userData: user, accessToken });
            return userData;
        } catch (error) {
            console.error(error);
            throw new Error('Invalid username or password');
        }
    },
    logout: async (): Promise<void> => {
        try {
            const response = await logoutService();
            set({ isAuthenticated: false, userData: null, accessToken: null });
            return response; // Response.message?
        } catch (error) {
            console.error(error);
            throw new Error('Invalid username or password');
        }
    },
    refreshAcessToken: async (): Promise<void> => {
        try {
            const response = await refreshTokenService();
            set({ accessToken: response.accessToken });
            return response;
        } catch (error) {
            console.error("error", error);
            throw new Error('Error refreshing access token');
        }
    },
    validateAccessToken: async (): Promise<void> => {
        try {
            const response = await validateAccessTokenService();
            if (response.status !== 401) {
                set({ isAuthenticated: true, userData: response.user });
            }
            return response;
        } catch (error) {
            console.error("error", error);
            throw new Error('Error refreshing access token');
        }
    }
}))
