const burgerBtn = document.querySelector('.menu__burger')
const menuList = document.querySelector('.menu__list')

burgerBtn.addEventListener('click', () => {
    menuList.classList.toggle('menu__list--active')
})