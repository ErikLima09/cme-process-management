from flask import Blueprint, request, jsonify
from .models import User, Material, Process, Failure, db

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
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=data['password'],
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
            "validate": m.validate.strftime('%Y-%m-%d'),
            "serial": m.serial
        }
        for m in materials
    ]
    return jsonify(result), 200


@api.route('/materials/<int:id>', methods=['GET'])
def get_material(id):
    material = Material.query.get(id)

    if not material:
        return jsonify({"error": f"Material with ID {id} not found"}), 404
    
    return jsonify({"id": material.id, "name": material.name, "type": material.type, "validate": material.validate.strftime('%Y-%m-%d'), "serial": material.serial}), 200

@api.route('/materials', methods=['POST'])
def create_material():
    data = request.json
    new_material = Material(
        name=data['name'],
        type=data['type'],
        validate=data['validate'],
        serial=f"{data['name']}-{data['type']}-{len(Material.query.all()) + 1}"
    )
    db.session.add(new_material)
    db.session.commit()
    return jsonify({"message": "Material created successfully"}), 201

@api.route('/materials/<int:id>', methods=['PUT'])
def update_material(id):
    material = Material.query.get_or_404(id)
    data = request.json
    material.name = data.get('name', material.name)
    material.type = data.get('type', material.type)
    material.validate = data.get('validate', material.validate)
    db.session.commit()
    return jsonify({"message": "Material updated successfully"}), 200

@api.route('/materials/<int:id>', methods=['DELETE'])
def delete_material(id):
    material = Material.query.get_or_404(id)
    db.session.delete(material)
    db.session.commit()
    return jsonify({"message": "Material deleted successfully"}), 200


# - - - CRUD de Processos - - - #

@api.route('/processes', methods=['POST'])
def create_process():
    data = request.json
    new_process = Process(
        step=data['step'],
        status=data['status'],
        material_id=data['material_id'],
        user_id=data['user_id']
    )
    db.session.add(new_process)
    db.session.commit()
    return jsonify({"message": "Process created successfully"}), 201

@api.route('/processes/<int:material_id>', methods=['GET'])
def get_processes(material_id):
    processes = Process.query.filter_by(material_id=material_id).all()
    result = [
        {
            "id": p.id,
            "step": p.step,
            "timestamp": p.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
            "status": p.status,
            "material_id": p.material_id,
            "user_id": p.user_id
        }
        for p in processes
    ]
    return jsonify(result), 200

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
