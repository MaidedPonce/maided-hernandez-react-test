import { StateCreator, create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { UserStore } from './user.type'

const storeApi: StateCreator<
  UserStore,
  [['zustand/devtools', never], ['zustand/immer', never]]
> = (set) => ({
  email: '',
  password: '',
  confirmPassword: '',
  setUser: (user) =>
    set({
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
    }),
})

export const useUserStore = create<UserStore>()(
  devtools(persist(immer(storeApi), { name: 'user-store' }))
)
