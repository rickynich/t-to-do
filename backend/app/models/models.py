from .db import db

class User(db.Model):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.username,
    }

class List(db.Model):
    __tablename__ = 'lists'

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(60), nullable = False )

    tasks = db.relationship("Task", back_populates="lists")

    def to_dict(self):
        return {
        "id": self.id,
        "title": self.title,
        "tasks": [task.to_dict() for task in self.tasks]
        }

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key = True)
    list_id = db.Column(db.Integer, db.ForeignKey('lists.id'))
    desc = db.Column(db.String(300), nullable = False )
    status = db.Column(db.Boolean)

    list = db.relationship('List', back_populates='tasks')

    def to_dict(self):
        return {
        "id": self.id,
        "desc": self.desc,
        "status": self.status,
        }

class Comment(db.Model):
    __tablename__="comments"

    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'))
    text = db.Column(db.String(300))

    task = db.relationship('Task', back_populates='comments')
    
    def to_dict(self):
        return {
        "id": self.id,
        "text": self.text,