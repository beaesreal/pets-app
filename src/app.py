"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import re
#import bcrypt
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
from api.models import db, User, Mascot, Diet, Medicine, Appointment, Veterinarian, Event
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from datetime import date, datetime, timedelta

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

        #pass_encode = body['password'].encode('utf-8')
        #mySalt = bcrypt.gensalt()

        #hashed = bcrypt.hashpw(pass_encode, mySalt)
        #print(hashed)
    
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
        #checkpass = bcrypt.checkpw(password, user.password)
        

    if body['email']:
        email = body['email']
        password = body['password']
        user = User.query.filter_by(email=email, password=password).first()
        #checkpass = bcrypt.checkpw(password, user.password)


    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401

    else:
        access_token = create_access_token(identity=user.id)
        return jsonify({ "token": access_token, "user_id": user.id }), 200

    #else:
    #    return jsonify({'msg': "Email or password incorrect"}), 401


@app.route('/passwordreset', methods=['POST'])
def handle_resetPassword():
    body = request.get_json()
    email = body['email']
    #current_date = datetime.now()
    if (email):

        request_user = User.query.filter_by(email=email).first()
        
        #secret = f'{request_user.password}-{current_date}'
        reset_token = create_access_token(
            identity=request_user.id,
            expires_delta= timedelta(
                minutes=1
            )
        )

        print(reset_token)

        return jsonify(reset_token)

    else:
        response_body = {
            'msg': 'E-mail adress is missing'
        }

        return jsonify(response_body), 400


@app.route('/passwordreset/<string:id>', methods=['POST'])
def handle_resetPasswordForm(id):
    
    
    if (id):

        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        #secret = f'{request_user.password}-{current_date}'
        reset_token = create_access_token(
            identity=request_user.id,
            expires_delta= timedelta(
                minutes=1
            )
        )

        print(reset_token)

        return jsonify(reset_token)

    else:
        response_body = {
            'msg': 'E-mail adress is missing'
        }

        return jsonify(response_body), 400


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

@app.route('/pet/create', methods=['POST'])
@jwt_required()
def handle_create_pet():
    body = request.get_json()
    print(body)

    current_user_id = get_jwt_identity()
    
    veterinarian = Veterinarian.query.filter_by(
        clinic_name = body['clinic_name'] 
    ).first()
    if not veterinarian:
        veterinarian = Veterinarian(
            clinic_name = body['clinic_name'],
            adress = body['adress']
        )
        db.session.add(veterinarian)
        db.session.commit()

    else: 
        mascot = Mascot(
            # puede faltar id y user id
            user_id = current_user_id,
            veterinarian_id = veterinarian.id,
            name = body['name'],
            date_of_birth = body['date_of_birth'],
            species = body['species'],
            gender = body['gender'],
            breed = body['breed'],
            colour = body['colour'],
            caracteristics = body['caracteristics'],
            img_1 = body['img_1'],
            img_2 = body['img_2'],
            img_3 = body['img_3'],
            img_mimetype = body['img_mimeType'],
        )

        db.session.add(mascot)
        db.session.commit()
    
    

    return jsonify({"message": "Mascota creada con exito" }), 200

# Editar mascota
@app.route('/pet/edit/<string:id>', methods=['PUT'])
@jwt_required()
def handle_update_pet(id):

    current_user_id = get_jwt_identity()
    user = Mascot.query.get(current_user_id)
    

    body=request.get_json()


    user.name = body['name'],
    user.date_of_birth = body['date_of_birth'],
    user.species = body['species'],
    user.gender = body['gender'],
    user.breed = body['breed'],
    user.colour = body['colour'],
    user.caracteristics = body['caracteristics'],
    # img_1 = body['img_1'],
    # img_2 = body['img_2'],
    # img_3 = body['img_3'],
    # img_mimetype = body['img_mimeType'],

    db.session.commit()

    response_body = {
        "msg": "Mascot updated correctly!"
        }

    return jsonify(response_body), 200



# Get Pet info

@app.route('/pet', methods=['GET'])
@jwt_required()
def handle_pet():

    current_user_id = get_jwt_identity()
    user = Mascot.query.get(current_user_id)
    all_mascot = Mascot.query.filter_by(user_id=user.id)

    #all_mascot = Mascot.query.all()

    
    all_mascot =list(map(lambda x: x.serialize(), all_mascot))
    response_body = all_mascot
    return jsonify(response_body), 200

# CREANDO RUTA PARA IMPORTACION INDIVIDUAL MASCOTA
@app.route('/pet/edit/<string:id>', methods=['GET'])
@jwt_required()
def handle_pet_with_id(id):

    current_user_id = get_jwt_identity()
    user = Mascot.query.get(current_user_id)

    print(id)
    single_pet = Mascot.query.filter_by(id = id)
    single_pet = list(map(lambda x: x.serialize(), single_pet))
    response_body = single_pet
    return jsonify(response_body), 200

# Get User info

@app.route('/user', methods=['GET'])
@jwt_required()
def handle_user():

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    all_user = User.query.filter_by(id=user.id)
    all_user =list(map(lambda x: x.serialize(), all_user))
    print(all_user)
    response_body = all_user
    return jsonify(response_body), 200


# Get Vet info

@app.route('/veterinarian', methods=['GET'])
#@jwt_required()
def handle_veterinarian():

    #current_user_id = get_jwt_identity()
    #user = User.query.get(current_user_id)
    #all_veterinarian = Veterinarian.query.filter_by(id=user.id)

    all_veterinarian = Veterinarian.query.all()
    
    all_veterinarian =list(map(lambda x: x.serialize(), all_veterinarian))
    print(all_veterinarian)
    response_body = all_veterinarian
    return jsonify(response_body), 200


# Update USER Info

@app.route('/user', methods=['PUT'])
@jwt_required()
def update_user():

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    body = request.get_json()
    print(body)

    user.username = body['username']
    user.password = body['password']
    user.email = body['email']
    user.is_active = True

    db.session.commit()

    response_body = {
        "msg": "User updated correctly!"
        }

    return jsonify(response_body), 200


# Add event from the calendar

@app.route('/event/create', methods=['POST'])
@jwt_required()
def handle_all_events():

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    body = request.get_json()
    print(body)

    event = Event(
        user_id = current_user_id,      
        title = body['title'],
        start = body['start'],
        end = body['end'],
    )

    db.session.add(event)
    db.session.commit()

    response_body = {
        "msg": "Event added correctly!"
        }

    return jsonify(response_body), 200


# Show events

@app.route('/events', methods=['GET'])
#@jwt_required()
def handle_event():

    #current_user_id = get_jwt_identity()
    #user = User.query.get(current_user_id)
    #all_events = Event.query.filter_by(id=user.id)
    all_events = Event.query.all()
    
    all_events =list(map(lambda x: x.serialize(), all_events))
    print(all_events)
    response_body = all_events
    return jsonify(response_body), 200


# Delete events

@app.route('/delete_event/<int:id>', methods=['DELETE'])
#@jwt_required()
def delete_event(id):

    #current_user_id = get_jwt_identity()
    #user = User.query.get(current_user_id)

    event_delete = Event.query.get(id)

    if not delete_event:
        response_body = {
            "msg" : "This event does not exist, can't be deleted."
        }
        return jsonify(response_body), 200
        
    db.session.delete(event_delete)
    db.session.commit()
    response_body = {
        "msg" : "Event deleted correctly."
    }

    return jsonify(response_body), 200


# Add pet DIET

@app.route('/diet/create', methods=['POST'])
@jwt_required()
def handle_all_diets():

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    body = request.get_json()
    print(body)

    diet = Diet(
        mascot_id = body['mascot_id'],     
        foodname = body['foodname'],
        quantity = body['quantity'],
        times_a_day = body['times_a_day'],
    )

    db.session.add(diet)
    db.session.commit()

    response_body = {
        "msg": "Diet added correctly!"
        }

    return jsonify(response_body), 200

# Show pet DIET

@app.route('/diet', methods=['GET'])
@jwt_required()
def handle_diet():

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    all_diets = Diet.query.filter_by(id=user.id)
    all_diets = Diet.query.all()
    
    all_diets =list(map(lambda x: x.serialize(), all_diets))
    print(all_diets)
    response_body = all_diets
    return jsonify(response_body), 200



# Add pet MEDICINE

@app.route('/medicine/create', methods=['POST'])
@jwt_required()
def handle_all_medicine():

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    

    body = request.get_json()
    print(body)

    medicine = Medicine(
        mascot_id = body['mascot_id'],     
        name = body['name'],
        quantity = body['quantity'],
        times_a_day = body['times_a_day'],
    )

    db.session.add(medicine)
    db.session.commit()

    response_body = {
        "msg": "Treatment added correctly!"
        }

    return jsonify(response_body), 200

# Show pet MEDICINE

@app.route('/medicine', methods=['GET'])
@jwt_required()
def handle_medicine():

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    all_medicines = Medicine.query.filter_by(id=user.id)
    all_medicines = Medicine.query.all()
    
    all_medicines =list(map(lambda x: x.serialize(), all_medicines))
    print(all_medicines)
    response_body = all_medicines
    return jsonify(response_body), 200


# Add pet VET APPOINTMENT

@app.route('/appointment/create', methods=['POST'])
@jwt_required()
def handle_all_appointments():

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    body = request.get_json()
    print(body)

    appointment = Appointment(
        mascot_id = body['mascot_id'],     
        center_id = body['center_id'],
        date = body['date'],
        
    )

    db.session.add(appointment)
    db.session.commit()

    response_body = {
        "msg": "Appointment added correctly!"
        }

    return jsonify(response_body), 200


# Show pet APPOINTMENTS

@app.route('/appointment', methods=['GET'])
@jwt_required()
def handle_appointment():

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    all_appointments = Appointment.query.filter_by(id=user.id)
    all_appointments = Appointment.query.all()
    
    all_appointments =list(map(lambda x: x.serialize(), all_appointments))
    print(all_appointments)
    response_body = all_appointments
    return jsonify(response_body), 200



# ------------------- LAST LINES -------------------->>

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
