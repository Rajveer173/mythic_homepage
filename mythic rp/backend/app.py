from flask import Flask


def create_app():
    """Application factory for the How-to-play demo app."""
    app = Flask(__name__, static_folder="static", template_folder="templates")

    try:
        from .routes import main_bp
    except ImportError:
    
        from routes import main_bp

    app.register_blueprint(main_bp)

    return app


if __name__ == "__main__":
 
    app = create_app()
    app.run(debug=True, host="127.0.0.1", port=5000)
