from flask import Blueprint, jsonify
from app.models import *
from app.forms import *

list_routes = Blueprint('lists', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@list_routes.route('/', methods=["GET"])
def lists():
    lists = List.query.all()
    return {"lists": [list.to_dict() for list in lists]}

@list_routes.route('/', methods=["POST"])
def makeNewList():
    form = CreateListForm()
    if form.validate_on_submit():
        newList = List(title = form.data['title'])
        db.session.add(newList)
        db.session.commit()
        return newList.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@list_routes.route('/<int:id>')
def user(id):
    list = List.query.get(id)
    return list.to_dict()