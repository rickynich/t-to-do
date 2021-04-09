from flask import Blueprint, jsonify
from app.models import *
from app.forms.forms import CreateListForm, CreateTaskForm, CreateCommentForm

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

# Get all tasks and listsfor home page
@list_routes.route('/', methods=["GET"])
def lists():
    lists = List.query.all()
    tasks = Task.query.all()
    # comments = Comment.query.all() "comments": [comment.to_dict() for comment in comments]
    return {"lists": [list.to_dict() for list in lists], "tasks": [task.to_dict() for task in tasks]}

# Create a new list
@list_routes.route('/', methods=["POST"])
def makeNewList():
    form = CreateListForm()
    # if form.validate_on_submit():
    newList = List(title = form.data['title'])
    print('new list: {}'.format(newList))
    db.session.add(newList)
    db.session.commit()
    return newList.to_dict()
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# delete a list
@list_routes.route('/<int:list_id>', methods=["DELETE"])
def deleteList(list_id):
    if list_id:
        list = List.query.get(list_id)
        # tasks = Task.query.filter_by(list_id=list_id).all() # to delete related tasks
        # print("tasks {}".format(tasks))
        db.session.delete(list)
        # db.session.delete(tasks)
        db.session.commit()
        return "List deleted"
    return {'errors': "There was an error with your delete request"}, 400

# Edit a list title 
@list_routes.route('/<int:list_id>', methods=["PUT"])
def edit_list_title(list_id):
    if list_id:
        list = List.query.get(list_id)
        form = CreateListForm()
        list.title = form.data['title']
        db.session.commit()
        return list.to_dict()
    return {'errors': "There was an error with your PUT request for List title edit"}, 400


# Get all tasks for a list:
@list_routes.route('/<int:list_id>/tasks', methods=["GET"])
def get_all_tasks(list_id):
    if list_id:
        tasks = Task.query.filter_by(list_id=list_id).all()
        return {"tasks": [task.to_dict() for task in tasks]}

# Get an individual task:
@list_routes.route('/<int:list_id>/tasks/<int:task_id>', methods=["GET"])
def get_a_task(list_id, task_id):
    if task_id:
        task = Task.query.get(task_id)
        return task.to_dict()


# Adds a new task to a list:
@list_routes.route('/<int:list_id>', methods=["POST"])
def make_new_task(list_id):
    if list_id:
        list = List.query.get(list_id)
        form = CreateTaskForm()
        newTask = Task(list_id = list.id, title = form.data['title'], desc = form.data['desc'], status = False)
        db.session.add(newTask)
        db.session.commit()
        return list.to_dict()
    return {'errors': "There was an error with your POST request for Task add"}, 400

# Delete a task from a list
@list_routes.route('/<int:list_id>/tasks/<int:task_id>', methods=["DELETE"])
def delete_task(list_id, task_id):
    if task_id:
        task = Task.query.get(task_id)
        db.session.delete(task)
        db.session.commit()
        return "Task deleted"
    return {'errors': "There was an error with your delete request"}, 400

# Updates the status of a task
@list_routes.route('/<int:list_id>/tasks/<int:task_id>', methods=["PUT"])
def change_task_status(list_id, task_id):
    print("IN TASK STATUS TOGGLER~~~")
    if task_id:
        task = Task.query.get(task_id)
        task.status = not task.status
        db.session.commit()
        return task.to_dict()
    return {'errors': 'There was an error with your request'}, 400

# Get all comments for a task:
@list_routes.route('/<int:list_id>/tasks/<int:task_id>/comments)', methods=["GET"])
def get_all_comments(list_id, task_id):
    # print('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~IN GET ALL COMMENTS! {}~~~~~~~~~~~~~~'.format(task_id))
    if task_id:
        comments = Comment.query.filter_by(task_id=task_id).all()
        return {"comments": [comment.to_dict() for comment in comments]}
    return {'errors': "There was an error with your GET request for all comments"}, 400

# Adds a new comment to a task: 
@list_routes.route('/<int:list_id>/tasks/<int:task_id>', methods=["POST"])
def make_new_comment(list_id, task_id):
    print("IN MAKE NEW COMMENT~~~~~~~~~~~~~~~", task_id)
    if task_id:
        task = Task.query.get(task_id)
        form = CreateCommentForm()
        newComment = Comment(task_id = task.id, text = form.data['text'])
        print('**************************new comment: {}, form data: {}'.format(newComment, form.data))
        db.session.add(newComment)
        db.session.commit()
        return task.to_dict()
    return {'errors': "There was an error with your POST request for Comment add"}, 400

# Edits a comment 
@list_routes.route('/<int:list_id>/tasks/<int:task_id>/comments/<int:comment_id>', methods=["PUT"])
def edit_comment(list_id, task_id, comment_id):
    if comment_id:
        comment = Comment.query.get(comment_id)
        form = CreateCommentForm()
        comment.text = form.data['text']
        db.session.commit()
        return comment.to_dict()
    return {'errors': "There was an error with your PUT request for Comment edit"}, 400


# Delete a comment from a task: 
@list_routes.route('/<int:list_id>/tasks/<int:task_id>/comments/<int:comment_id>', methods=["DELETE"])
def delete_comment(list_id, task_id, comment_id):
    if comment_id:
        comment = Comment.query.get(comment_id)
        db.session.delete(comment)
        db.session.commit()
        return "Comment deleted"
    return {'errors': "There was an error with your delete request"}, 400

