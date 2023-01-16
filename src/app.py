"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import re
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from sqlalchemy import or_
from api.utils import APIException, generate_sitemap
from api.models import db, User, Mascot, Diet, Medicine, Appointment, Veterinarian
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

#from models import Person

ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# Token configuration

app.config["JWT_SECRET_KEY"] = "abra-kadabra"  # Change this "super secret" with something else!
jwt = JWTManager(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response

regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')

@app.route('/signup', methods=['POST'])
def handle_signup():
    body = request.get_json()
    print(body)

    if re.fullmatch(regex, body['email']):
        print("Valid email")
    
        user = User(
            username = body['username'],
            email = body['email'],
            password = body['password'],
            is_active = True
        )

        db.session.add(user)
        db.session.commit()

        response_body = {
            "msg": "Hello, user added successfully!"
            }

        return jsonify(response_body), 200

    else:
        response_body = {
            "msg": "Invalid email!"
            }

        return jsonify(response_body), 400

# METODO PARA LOGIN Y TOKEN

@app.route('/login', methods=['POST'])
def handle_login():
    body = request.get_json()

    if body['username']:
        username = body['username']
        password = body['password']
        user = User.query.filter_by(username=username, password=password).first()

    if body['email']:
        email = body['email']
        password = body['password']
        user = User.query.filter_by(email=email, password=password).first()


    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id }), 200

@app.route('/private', methods=['GET'])
@jwt_required()
def handle_private():

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "username": user.email }), 200

@app.route('/delete_user', methods=['DELETE'])
@jwt_required()
def handle_delete_user():

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
        
    User.query.filter_by(id=user.id).delete()
    db.session.commit()

    response_body = {
        "msg": "Hello, user deleted successfully!",
    }

    return jsonify(response_body), 200


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
