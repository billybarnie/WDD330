export async function setup() {
    
    const menu_but = document.querySelector('.hamburger');
    const mob_menu = document.querySelector('.mobile-nav');

    menu_but.addEventListener('click', function() {
        menu_but.classList.toggle('is-active');
        mob_menu.classList.toggle('is-active');
    });

    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mob_menu.classList.remove('is-active');
            menu_but.classList.remove('is-active');
        });
    });
}