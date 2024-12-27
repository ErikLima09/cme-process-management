from . import db  # Importando db de __init__.py
from datetime import datetime, timezone

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

class Material(db.Model):
    __tablename__ = 'materials'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(100), nullable=False)
    validate = db.Column(db.Date, nullable=False)
    serial = db.Column(db.String(100), unique=True, nullable=False)

    def __repr__(self):
        return f"<Material {self.name}>"
    

class Process(db.Model):
    __tablename__ = 'processes'
    id = db.Column(db.Integer, primary_key=True)
    step = db.Column(db.String(100), nullable=False)  # Recebimento, Lavagem, etc.
    timestamp = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    status = db.Column(db.String(50), nullable=False)  # Sucesso, Falha
    material_id = db.Column(db.Integer, db.ForeignKey('materials.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    material = db.relationship('Material', backref='processes')
    user = db.relationship('User', backref='processes')

    def __repr__(self):
        return f"<Process {self.step} - {self.status}>"

class Failure(db.Model):
    __tablename__ = 'failures'
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    material_id = db.Column(db.Integer, db.ForeignKey('materials.id'), nullable=False)

    material = db.relationship('Material', backref='failures')

    def __repr__(self):
        return f"<Failure {self.description[:30]}... at {self.timestamp}>"

    
