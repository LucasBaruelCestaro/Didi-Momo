// static/js/router.js
class Router {
    constructor() {
        this.routes = {
            '/': 'index.html',
            '/about': 'about.html', 
            '/study': 'study.html',
            '/job': 'job.html',
            '/tourism': 'tourism.html'
        };
        this.init();
    }

    init() {
        console.log('Router inicializado. Rotas:', this.routes);
        window.addEventListener('popstate', () => {
            console.log('Popstate detectado:', window.location.pathname);
            this.loadRoute(window.location.pathname);
        });
        this.loadRoute(window.location.pathname);
    }

    navigate(path) {
        console.log('Navegando para:', path);
        history.pushState({}, '', path);
        this.loadRoute(path);
        this.updateActiveMenu(path);
    }

    async loadRoute(path) {
        const route = this.routes[path] || this.routes['/'];
        console.log('Carregando rota:', path, 'Template:', route);
        
        try {
            const response = await fetch(`/templates/${route}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            console.log('Template carregado com sucesso');
            
            // Substitui apenas o conteúdo do main, não o main inteiro
            const main = document.querySelector('main');
            main.innerHTML = html;
            
            document.title = this.getPageTitle(path);
            console.log('Página atualizada:', document.title);
            
        } catch (error) {
            console.error('Erro ao carregar rota:', error);
            // Fallback: recarrega a página normalmente
            window.location.href = path;
        }
    }

    updateActiveMenu(currentPath) {
        console.log('Atualizando menu ativo para:', currentPath);
        const menuItems = document.querySelectorAll('.nav-links a');
        menuItems.forEach(link => {
            link.style.fontWeight = 'normal';
            link.style.color = '';
        });
        
        const indexMap = {
            '/': 0,
            '/study': 1,
            '/job': 2, 
            '/tourism': 3,
            '/about': 4
        };
        
        const activeIndex = indexMap[currentPath];
        if (activeIndex !== undefined && menuItems[activeIndex]) {
            menuItems[activeIndex].style.fontWeight = 'bold';
            menuItems[activeIndex].style.color = '#ffd700';
            console.log('Menu ativo definido:', menuItems[activeIndex].textContent);
        }
    }

    getPageTitle(path) {
        const titles = {
            '/': 'Koala Guide - Home',
            '/about': 'Koala Guide - Sobre', 
            '/study': 'Koala Guide - Estudo',
            '/job': 'Koala Guide - Emprego',
            '/tourism': 'Koala Guide - Turismo'
        };
        return titles[path] || 'Koala Guide';
    }
}