from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from api.models import User, db
import json
import re


User_args = reqparse.RequestParser()
User_args.add_argument("username", type=str, help="Username is required", required=True)
User_args.add_argument("email", type=str, help="Email is required", required=True)

# serealiza los datos
userFields = {
    "id": fields.Integer,
    "username": fields.String,
    "email": fields.String
}

class Use(Resource):
    @marshal_with(userFields)
    def post(self):
        args = User_args.parse_args()

        if not args['username'] or args['username'].isspace():
            response = Response( json.dumps({'error': 'Username cannot be empty or contain'}),
            status=400,
            mimetype='application/json')
            return abort(response)
        if not args['email'] or args['email'].isspace():
            response = Response( json.dumps({'error': 'Email cannot be empty or containt'}),
            status=400,
            mimetype='application/json')
            return abort(response)
        
        email=args['email'].strip()
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            response = Response(json.dumps({'error': 'Invalid email format'}))
            status=400
            mimetype='application/json'
            return abort(response)

        user = User(username=args["username"], email=args["email"])
        db.session.add(user)
        db.session.commit()
        return user, 201
        

    @marshal_with(userFields)
    def get(self):
        users = User.query.all()
        return users

class UserDetail(Resource):
    @marshal_with(userFields)
    def get(self, user_id):
        user = User.query.filter_by(id=user_id).first()
        if not user:
            abort(404, message="User not found")
        return user

    @marshal_with(userFields)
    def patch(self, user_id):
        args = User_args.parse_args()
        user = User.query.filter_by(id=user_id).first()
        if not user:
            abort(404, message="User not found")
        user.username = args["username"]
        user.email = args["email"]
        db.session.commit()
        return user, 200

    @marshal_with(userFields)
    def delete(self, user_id):
        user = User.query.filter_by(id=user_id).first()
        if not user:
            abort(404, message="User not found")
        db.session.delete(user)
        db.session.commit()
        return '', 204