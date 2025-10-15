from flask import Flask, render_template, redirect

class Router:
    app = Flask(
            import_name = __name__,
            static_folder = '../static',
            template_folder = '../templates'  # change templates dir path
        )

    @app.route('/')
    def index():
        return render_template('index.html')
    
    @staticmethod
    def start(debug: bool = False):
        return Router.app.run(debug=debug)


