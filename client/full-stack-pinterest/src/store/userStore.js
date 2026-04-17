import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const useUserStore = create(
    persist(
        (set) => ({
            user: null,
            // 设置用户信息
            setUser: (newUser) => set({ user: newUser }),
            // 清除用户信息
            clearUser: () => set({ user: null }),
            // 更新用户信息
            updateUser: (updatedInfo) => set((state) => ({ user: { ...state.user, ...updatedInfo } }))
        })
    )
);
export default useUserStore;