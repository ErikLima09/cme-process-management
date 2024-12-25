from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

# Inicializando a variável db com SQLAlchemy
db = SQLAlchemy


def create_app():
    app = Flask(__name__)

    # Configurações do banco de dados
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')

    # Desabilitar notificações de modificações
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  

    # Chave secreta para sessões
    app.config['SECRET_KEY'] = 'sua-chave-secreta'

    db.init_app(app)

    # Importando e registrando as rotas
    from .routes import main
    app.register_blueprint(main)

    return app
