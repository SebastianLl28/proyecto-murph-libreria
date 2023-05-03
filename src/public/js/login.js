const logo = document.querySelector('#logo')

logo.addEventListener('mouseover', () => {
  logo.src = '/img/logo-gif.gif'
  logo.classList.add('picture__img-active')
})

logo.addEventListener('mouseout', () => {
  logo.src = '/img/logo.png'
  logo.classList.remove('picture__img-active')
})

window.addEventListener('load', () => {
  const errors = document.querySelectorAll('.errors__message')

  if (!errors.length > 0) {
    return
  }

  const arreglo = Array.from(errors)
  arreglo.forEach((error) => {
    const inputText = document.querySelector(`input#${error.getAttribute('data-parent')}`)
    inputText.classList.add('is-invalid')
    inputText.parentElement.classList.add('animate__animated', 'animate__shakeX')
  })

  const errorsContainer = document.querySelector('.errors')
  setTimeout(() => {
    errorsContainer.remove()
  }, 3500)
})
