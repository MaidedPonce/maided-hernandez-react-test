export interface User {
  email: string
  password: string
  confirmPassword: string
}

export interface UserStore {
  email: string
  setUser: (email: string) => void
}
