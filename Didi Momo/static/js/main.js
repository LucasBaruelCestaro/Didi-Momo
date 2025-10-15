// static/js/main.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado - inicializando aplicação...');
    
    // Verifica se os elementos necessários existem
    const navLinks = document.querySelector('.nav-links');
    const main = document.querySelector('main');
    
    if (!navLinks) {
        console.error('Elemento .nav-links não encontrado!');
        return;
    }
    
    if (!main) {
        console.error('Elemento main não encontrado!');
        return;
    }
    
    console.log('Elementos HTML encontrados, inicializando router...');
    
    const router = new Router();
    const navigation = new Navigation(router);
    
    console.log('Aplicação inicializada com sucesso!');
});