import { StateCreator, create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { UserStore } from './user.type'

const storeApi: StateCreator<
  UserStore,
  [['zustand/devtools', never], ['zustand/immer', never]]
> = (set) => ({
  email: '',
  setUser: (email: string) =>
    set({
      email,
    }),
})

export const useUserStore = create<UserStore>()(
  devtools(persist(immer(storeApi), { name: 'user-store' }))
)
