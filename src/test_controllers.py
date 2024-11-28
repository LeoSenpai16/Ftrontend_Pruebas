import pytest
from flask import Flask, json
from flask_sqlalchemy import SQLAlchemy
from api.controllers import Use, UserDetail
from api.models import User, db

@pytest.fixture
def app_fixture():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['TESTING'] = True

    db.init_app(app)
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app_fixture):
    return app_fixture.test_client()

def test_user_get_not_found(client):
    response = client.get('/users/ggg')
    assert response.status_code == 404

def test_users_post(client):
    response = client.post('/users/', json={
        'username': 'testuser', 
        'email': 'test@example.com'
        })
    print(f"Response status: {response.status_code}")
    print(f"Response data: {response.data}")
    assert response.status_code == 201
    data = json.loads(response.data)    
    assert 'id' in data
    assert data['username'] == 'testuser'
    assert data['email'] == 'test@example.com'


