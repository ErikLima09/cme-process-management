from flask import Flask
from flask_sqlalchemy import SQLAlchemy

import os

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Configurações do banco de dados
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')

    # Desabilitar notificações de modificações
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  

    # Chave secreta para sessões
    app.config['SECRET_KEY'] = 'sua-chave-secreta'

    db.init_app(app)

    with app.app_context():
        from . import models, routes
        db.create_all() #Cria as tabelas no banco

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
