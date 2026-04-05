/* navigation.js - Shared Menu Logic */
const menuTrigger = document.getElementById('mobile-menu-trigger');
const navMenu = document.getElementById('nav-menu');

if (menuTrigger && navMenu) {
    menuTrigger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuTrigger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuTrigger.querySelector('i').classList.add('fa-bars');
            menuTrigger.querySelector('i').classList.remove('fa-times');
        });
    });
}