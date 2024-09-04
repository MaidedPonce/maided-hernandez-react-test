const validatePassword = (password: string): boolean => {
  const regex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/
  return regex.test(password)
}

export const isSamePassword = (passwordOne: string, passwordTwo: string) => {
  return passwordOne === passwordTwo
}
export default validatePassword
