export interface User {
  email: string
  password: string
  confirmPassword: string
}

export interface UserStore {
  email: string
  password: string
  isLogged: boolean
  setUser: (email: string, password: string) => void
  setIsLogged: (isLogged: boolean) => void
}
