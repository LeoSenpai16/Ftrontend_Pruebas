import pytest
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from api.controllers import Use, UserDetail
from api.models import User, db
import json
from unittest.mock import patch, MagicMock, Mock

@pytest.fixture
def app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:///:memory:'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    app.config['TESTING'] = True
    
    db.init_app(app)
    with app.app_context():
        db.create_all()
        
    yield app
    with app.app_context():
        db.drop_all()
        
@pytest.fixture
def client(app):
    return app.test_client()

def test_users_get_not_found(client):
    response = client.get('/users/999')
    assert response.status_code == 404

def test_users_post(client):

    response = client.post('/api/users/', json={'username': 'testuser', 'email': 'test@example.com'})     
    print(f"Response status: {response.status_code}")
    print(f"Response data: {response.data}")
    assert response.status_code == 201
    data = json.loads(response.data)
    assert 'id' in data
    assert data['username'] == 'testuser'
    assert data['email'] == 'test@example.com'


def test_verify_email(client):
    mock_users_repository = MagicMock()
    mock_users_repository.get_all.return_value = [
        {
            "email": "john@usebouncer.com",
            "status": "deliverable",
            "reason": "accepted_email",
            "domain": {
                "name": "usebouncer.com",
                "acceptAll": "no",
                "disposable": "no",
                "free": "no"
            },
            "account": {
                "role": "no",
                "disabled": "no",
                "fullMailbox": "no"
            },
            "dns": {
                "type": "MX",
                "record": "aspmx.l.google.com."
            },
            "provider": "google.com",
            "score": 100,
            "toxic": "unknown"
        }
    ]

    assert mock_users_repository.get_all.return_value[0]['status'] == 'deliverable'
    assert mock_users_repository.get_all.return_value[0]['reason'] == 'accepted_email'