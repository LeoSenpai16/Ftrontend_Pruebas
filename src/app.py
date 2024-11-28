from flask import Flask
from api.extensions import db  
from api.controllers import Use, UserDetail
from flask_restful import Api

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
api = Api(app)

# Inicializar la base de datos con la app
db.init_app(app)

# Crear las tablas dentro del contexto de la aplicación
with app.app_context():
    db.create_all()

# Agregar los recursos de la API
api.add_resource(Use, "/api/users/")
api.add_resource(UserDetail, "/api/users/<int:user_id>")

@app.route("/")
def hello_world():
    return "<p>Hola Carlos tontín</p>"

if __name__ == "__main__":
    app.run(debug=True)
