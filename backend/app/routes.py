from flask import Blueprint, request, jsonify
from .models import User, Material, Process, Failure, db
from werkzeug.security import check_password_hash, generate_password_hash

api = Blueprint('api', __name__)


# - - - CRUD de Usuários - - - #

@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    result = [{
        "id": u.id, 
        "username": u.username,
        "email": u.email,
        "role": u.role
        }
        for u in users
    ]
    return jsonify(result), 200

@api.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    
    if not user:
        return jsonify({"error": f"User with ID {id} not found"}), 404
    
    return jsonify({"id": user.id, "username": user.username, "email": user.email, "role": user.role}), 200

@api.route('/users', methods=['POST'])
def create_user():
    data = request.json

    hashed_password = generate_password_hash(data['password'])

    new_user = User(
        username=data['username'],
        email=data['email'],
        password=hashed_password,
        role=data['role']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created succesfully"}), 201

@api.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get_or_404(id)
    data = request.json
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    user.password = data.get('password', user.password)
    user.role = data.get('role', user.role)
    db.session.commit()
    return jsonify({"message": "User updated successfully"}), 200

@api.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200


# - - - CRUD de Materiais- - - #

@api.route('/materials', methods=['GET'])
def get_materials():
    materials = Material.query.all()
    result = [
        {
            "id": m.id,
            "name": m.name,
            "type": m.type,
            "expiration_date": m.expiration_date.strftime('%Y-%m-%d'),
            "serial": m.serial,
            "status": m.status
        }
        for m in materials
    ]
    return jsonify(result), 200

@api.route('/materials/<int:id>', methods=['GET'])
def get_material(id):
    material = Material.query.get(id)

    if not material:
        return jsonify({"error": f"Material with ID {id} not found"}), 404
    
    return jsonify({"id": material.id, "name": material.name, "type": material.type, "expiration_date": material.expiration_date.strftime('%Y-%m-%d'), "serial": material.serial, "status": material.status}), 200

@api.route('/materials', methods=['POST'])
def create_material():
    data = request.json

    prefix = data.get('type', 'GEN').upper()[:3]  # Usa as 3 primeiras letras do tipo ou 'GEN' como padrão

    # Recupera o último material com o mesmo prefixo para gerar o próximo serial
    last_material = Material.query.filter(Material.serial.like(f"{prefix}%")).order_by(Material.id.desc()).first()

    # Gera o próximo número do serial
    next_id = 1
    if last_material:
        # Extrai a parte numérica do serial e incrementa
        last_serial_number = int(last_material.serial[len(prefix):])
        next_id = last_serial_number + 1
    
    serial = f"{prefix}{str(next_id).zfill(3)}"  # Ex: CON001, TEC002, etc.
    
    new_material = Material(
        name=data['name'],
        type=data['type'],
        expiration_date=data['expiration_date'],
        serial=serial,
        status = ''
    )
    
    db.session.add(new_material)
    # return jsonify({"message": "teste", "data": data, "new_material": serial}), 201
    db.session.commit()
    return jsonify({"message": "Material created successfully"}), 201

@api.route('/materials/<int:id>', methods=['PUT'])
def update_material(id):
    material = Material.query.get_or_404(id)
    data = request.json
    material.name = data.get('name', material.name)
    material.type = data.get('type', material.type)
    material.expiration_date = data.get('expiration_date', material.expiration_date)
    db.session.commit()
    return jsonify({"message": "Material updated successfully"}), 200

@api.route('/materials/<int:id>', methods=['DELETE'])
def delete_material(id):
    material = Material.query.get_or_404(id)
    db.session.delete(material)
    db.session.commit()
    return jsonify({"message": "Material deleted successfully"}), 200


# - - - CRUD de Processos - - - #

@api.route('/processes/<int:material_id>', methods=['GET'])
def get_processes(material_id):
    processes = Process.query.filter_by(material_id=material_id).all()
    result = [
        {
            "id": p.id,
            "step": p.step,
            "timestamp": p.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
            "status": p.status,
            "material_id": p.material_id
        }
        for p in processes
    ]
    return jsonify(result), 200



@api.route('/processes/serial/<string:serial>', methods=['GET'])
def get_processes_reports(serial):

    # Consulta que retorna o processo a partir do serial do material
    processes = db.session.query(Process).join(Material).filter(Material.serial == serial).all()

    result = [
        {
            "id": p.id,
            "step": p.step,
            "timestamp": p.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
            "status": p.status,
            "material_id": p.material_id
        }
        for p in processes
    ]
    return jsonify(result), 200

@api.route('/processes', methods=['POST'])
def create_process():
    data = request.json
    new_process = Process(
        step=data['step'],
        status=data['status'],
        material_id=data['material_id']
    )
    db.session.add(new_process)
    db.session.commit()
    return jsonify({"message": "Process created successfully"}), 201

# - - - Failure - - - #

@api.route('/failures', methods=['POST'])
def create_failure():
    data = request.json
    new_failure = Failure(
        description=data['description'],
        material_id=data['material_id']
    )
    db.session.add(new_failure)
    db.session.commit()
    return jsonify({"message": "Failure recorded successfully"}), 201


# - - - Login - - - #

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email e senha são obrigatórios"}), 400

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password): # Valida a senha criptografada
        # Retorna os dados do usuário, não incluindo a senha
        print("Login bem-sucedido")
        return jsonify({
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }), 200
    else:
        print("Credenciais inválidas")
        return jsonify({"message": "Credenciais inválidas"}), 401
