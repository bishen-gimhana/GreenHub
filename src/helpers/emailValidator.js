export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "Last Name can't be empty."
  if (!re.test(email)) return 'Ooops! We need a valid email address.'
  return ''
}
