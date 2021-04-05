from flask import Blueprint, jsonify
from app.models import *
from app.forms.forms import CreateListForm, CreateTaskForm

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
    print("IN MAKE NEW LIST________________________________________________")
    form = CreateListForm()
    # if form.validate_on_submit():
    newList = List(title = form.data['title'], desc = form.data['desc'])
    print('new list: {}'.format(newList))
    db.session.add(newList)
    db.session.commit()
    return newList.to_dict()
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@list_routes.route('/<int:list_id>', methods=["DELETE"])
def deleteList(list_id):
    if list_id:
        list = List.query.get(list_id)
        db.session.delete(list)
        db.session.commit()
        return "List deleted"
    return {'errors': "There was an error with your delete request"}, 400

@list_routes.route('/<int:id>')
def user(id):
    list = List.query.get(id)
    return list.to_dict()

# Adds a new task to a list:
@list_routes.route('/<int:list_id>', methods=["POST"])
def makeNewTask(list_id):
    print("IN MAKE NEW TASK~~~~~~~~~~~~~~~", list_id)
    if list_id:
        list = List.query.get(list_id)
        print("List:", list)
        form = CreateTaskForm()
        newTask = Task(list_id = list.id, title = form.data['title'], desc = form.data['desc'], status = False)
        print('new task: {}'.format(newTask))
        db.session.add(newTask)
        db.session.commit()
        return list.to_dict()
    return {'errors': "There was an error with your POST request for Task add"}, 400
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401