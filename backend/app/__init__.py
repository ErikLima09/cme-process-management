from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)

    CORS(app)

    # Configurações do banco de dados
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
    # Desabilitar notificações de modificações
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  
    # Chave secreta para sessões
    app.config['SECRET_KEY'] = 'sua-chave-secreta'

    db.init_app(app)

    from .routes import api
    app.register_blueprint(api, url_prefix='/api')

    with app.app_context():
        db.create_all() #Cria as tabelas no banco

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
