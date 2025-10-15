// static/js/navigation.js
class Navigation {
    constructor(router) {
        this.router = router;
        this.routeMap = {
            'INÍCIO': '/',
            'ESTUDO': '/study', 
            'EMPREGO': '/job',
            'TURISMO': '/tourism',
            'SOBRE': '/about'
        };
        console.log('Navigation inicializado. Mapeamento:', this.routeMap);
        this.init();
    }

    init() {
        this.setupNavigation();
        console.log('Event listeners configurados');
    }

    setupNavigation() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('.nav-links a');
            if (link) {
                e.preventDefault();
                const linkText = link.textContent.trim();
                console.log('Link clicado:', linkText);
                
                const route = this.routeMap[linkText];
                console.log('Rota mapeada:', route);
                
                if (route) {
                    this.router.navigate(route);
                } else {
                    console.warn('Rota não encontrada para:', linkText);
                }
            }
        });

        // Logo clicável
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Logo clicado - indo para home');
                this.router.navigate('/');
            });
        }
    }
}