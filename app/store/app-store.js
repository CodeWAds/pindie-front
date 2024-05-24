import { create } from 'zustand';
import { removeJWT, setJWT, getJWT, getMe } from '../api/api-utils';
import { endpoints } from '../api/config';

export const useStore = create((set) => ({
    isAuth: false,
    popupIsOpened: false,
    typeForm: null,
    user: null,
    token: null,
    login: (user, token) => {
        set({ isAuth: true, user, token });
        setJWT(token);
    },
    logout: () => {
        set({ isAuth: false, user: null, token: null });
        removeJWT();
    },
    checkAuth: async () => {
        const jwt = getJWT();
        if (jwt) {
            const user = await getMe(endpoints.me, jwt);
            if (user instanceof Error) {
                set({ isAuth: false, user: null, token: null });
                removeJWT();
            } else {
                set({ isAuth: true, user, token: jwt });
                setJWT(jwt);
            }
        }
    },
    openPopup: (typeForm) => {
        set({ popupIsOpened: true, typeForm })
    },
    closePopup: () => {
        set({ popupIsOpened: false, typeForm: null })
    },

})); 