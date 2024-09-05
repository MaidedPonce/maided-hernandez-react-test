import { StateCreator, create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { UserStore } from './user.type'
import { USER } from 'constants/user'
import { handleEncrypt } from 'utils/encrypt'

const storeApi: StateCreator<
  UserStore,
  [['zustand/devtools', never], ['zustand/immer', never]]
> = (set) => ({
  email: handleEncrypt(USER.email),
  password: handleEncrypt(USER.password),
  isLogged: false,
  setUser: (email: string) =>
    set({
      email,
    }),
  setPassword: (password: string) => {
    set({ password })
  },
  setIsLogged: (isLogged: boolean) => {
    set({ isLogged })
  },
})

export const useUserStore = create<UserStore>()(
  devtools(persist(immer(storeApi), { name: 'user-store' }))
)
