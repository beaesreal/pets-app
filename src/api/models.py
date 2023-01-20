from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy import Enum
import enum

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Species(enum.Enum):
    canine = "Canine"
    feline = "Feline"

class Gender(enum.Enum):
    male = "Male"
    female = "Female"

class Mascot(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    name = db.Column(db.String(20), nullable=False)
    date_of_birth = db.Column(db.DateTime, nullable=False)
    species = db.Column(db.Enum(Species))
    gender = db.Column(db.Enum(Gender))
    breed = db.Column(db.String(80)) 
    colour = db.Column(db.String(20))
    caracteristics = db.Column(db.String(400))
    img_1 = db.Column(db.String(120))
    img_2 = db.Column(db.String(120))
    img_3 = db.Column(db.String(120))
    img_mimetype = db.Column(db.String(10))
    rel_user = db.relationship(User)
    

    def serialize(self):
        
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "date_of_birth": self.date_of_birth,
            "colour": self.colour,
            "img": self.img_mimetype,
            "species": self.species.value,
            "gender": self.gender.value,
            # do not serialize the password, its a security breach
        }

class Veterinarian(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    clinic_name = db.Column(db.String(120), unique=True, nullable=False)
    adress = db.Column(db.String(280), unique=True, nullable=False)


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "clinic_name": self.clinic_name,
            "adress": self.adress,
            # do not serialize the password, its a security breach
        }

#class Mascot_img(db.Model):
#    id = db.Column(db.Integer, primary_key=True)
#    mascot_id = db.Column(db.Integer, db.ForeignKey('mascot.id'))
#    img = db.Column(db.String(80), nullable=False)
#    name = db.Column(db.String(80), nullable=False)
#    mimetype = db.Column(db.String(10), nullable=False)
    

#    def serialize(self):
#        return {
#            "id": self.id,
#            "mascot_id": self.mascot_id,
#            "img": self.img,
#            "name": self.name,
#            "mimetype": self.mimetype,
            # do not serialize the password, its a security breach
#        }

class Diet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mascot_id = db.Column(db.Integer, db.ForeignKey('mascot.id'))
    foodname = db.Column(db.String(80), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    times_a_day = db.Column(db.Integer, nullable=False)
    rel_mascot = db.relationship(Mascot)
    

    def serialize(self):
        return {
            "id": self.id,
            "mascot_id": self.mascot_id,
            "foodname": self.foodname,
            "quantity": self.quantity,
            "times_a_day": self.times_a_day,
            # do not serialize the password, its a security breach
        }

class Medicine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mascot_id = db.Column(db.Integer, db.ForeignKey('mascot.id'))
    name = db.Column(db.String(80), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    times_a_day = db.Column(db.Integer, nullable=False)
    rel_mascot = db.relationship(Mascot)


    def serialize(self):
        return {
            "id": self.id,
            "mascot_id": self.mascot_id,
            "name": self.name,
            "quantity": self.quantity,
            "times_a_day": self.times_a_day,
            # do not serialize the password, its a security breach
        }

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mascot_id = db.Column(db.Integer, db.ForeignKey('mascot.id'))
    center_id = db.Column(db.Integer, db.ForeignKey('veterinarian.id'))
    date = db.Column(db.DateTime, nullable=False)
    rel_mascot = db.relationship(Mascot)
    rel_veterinarian = db.relationship(Veterinarian)

    def serialize(self):
        return {
            "id": self.id,
            "mascot_id": self.mascot_id,
            "center_id": self.center_id,
            "date": self.date,
            # do not serialize the password, its a security breach
        }

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    title = db.Column(db.String(80), nullable=False)
    start = db.Column(db.DateTime, nullable=False)
    end = db.Column(db.DateTime, nullable=False)
    rel_user = db.relationship(User)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "start": self.start,
            "end": self.end,
            "title": self.title,
        }
