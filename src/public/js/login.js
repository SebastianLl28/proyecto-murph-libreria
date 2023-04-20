const logo = document.querySelector('#logo')

console.log('hola munndo')

logo.addEventListener('mouseover', () => {
  logo.src = '/img/logo-gif.gif'
  logo.classList.add('picture__img-active')
})

logo.addEventListener('mouseout', () => {
  logo.src = '/img/logo.png'
  logo.classList.remove('picture__img-active')
})
