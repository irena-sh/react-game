export const fetchMode = async () => {
  return await fetch('https://demo1030918.mockable.io/')
    .then(res => res.json())
    .then(result => result)
    .catch(error => alert(error.message))
}
