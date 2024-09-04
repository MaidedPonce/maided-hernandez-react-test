export interface User {
  email: string
  password: string
  confirmPassword: string
}

export interface UserStore extends User {
  setUser: (user: User) => void
}
