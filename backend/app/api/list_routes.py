from flask import Blueprint, jsonify
from app.models import List

list_routes = Blueprint('lists', __name__)


@list_routes.route('/')
def lists():
    lists = List.query.all()
    return {"lists": [list.to_dict() for list in lists]}

@list_routes.route('/<int:id>')
def user(id):
    list = List.query.get(id)
    return list.to_dict()