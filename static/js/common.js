const menu = document.querySelector('.header__nav')
const buttonOpenMenu = document.querySelector('.header__navopen')
const buttonCloseMenu = document.querySelector('.header__navclose')

buttonOpenMenu.addEventListener('click', () => {
    menu.classList.add('header__nav--active')
})

buttonCloseMenu.addEventListener('click', () => {
    menu.classList.remove('header__nav--active')
})

const productsBuys = document.querySelectorAll('.products__itembuy')
productsBuys.forEach((item) => {
    console.log('teste')
    item.addEventListener('click', (e) => {
        e.preventDefault()
        window.location = '/cart.html'
    })
})