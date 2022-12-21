from flask_sqlalchemy import SQLAlchemy

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
            "username": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Mascot(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    name = db.Column(db.String(20), nullable=False)
    date_of_birth = db.Column(db.DateTime, nullable=False)
    species = db.Column(db.String(20), default=['canine', 'feline'], nullable=False) 
    sex = db.Column(db.String(20), default=['male', 'female'])
    breed = db.Column(db.String(80)) # TO-DO: Add a default with the breeds provided by the API. default=<callable function>
    colour = db.Column(db.String(20))
    caracteristics = db.Column(db.String(400))

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "date_of birth": self.date_of_birth,
            "species": self.species,
            "sex": self.sex
            # do not serialize the password, its a security breach
        }

class Mascot_img(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mascot_id = db.Column(db.Integer, db.ForeignKey('mascot.id'))
    img = db.Column(db.String(80), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    mymetype = db.Column(db.String(10), nullable=False)
    

    def serialize(self):
        return {
            "id": self.id,
            "mascot_id": self.mascot_id,
            "img": self.img,
            "name": self.name,
            "mimetype": self.mimetype,
            # do not serialize the password, its a security breach
        }

class Diet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mascot_id = db.Column(db.Integer, db.ForeignKey('mascot.id'))
    foodname = db.Column(db.String(80), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    times_a_day = db.Column(db.Integer, nullable=False)
    

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
    

    def serialize(self):
        return {
            "id": self.id,
            "mascot_id": self.mascot_id,
            "center_id": self.center_id,
            "date": self.date,
            # do not serialize the password, its a security breach
        }

#### TO-DO: Migrate and upgrade database