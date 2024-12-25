from . import db  # Importando db de __init__.py

class Material(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    tipo = db.Column(db.String(255), nullable=False)
    validade = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f"<Material {self.nome}>"
