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

    # tasks = db.relationship("Task", back_populates="lists")

    def to_dict(self):
        tasks = [task.to_dict() for task in self.tasks]
        return {
        "id": self.id,
        "title": self.title,
        "tasks": tasks
        }

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(100), nullable = False )
    desc = db.Column(db.String(300), nullable = False )
    status = db.Column(db.Boolean)
    list_id = db.Column(db.Integer, db.ForeignKey('lists.id'), nullable=False)

    list = db.relationship('List', backref='tasks')

    def __repr__(self):
      return '<Task %r>' % self.title

    def to_dict(self):
        comments = [comment.to_dict() for comment in self.comments]
        return {
        "id": self.id,
        "title": self.title,
        "desc": self.desc,
        "status": self.status,
        "comments" : comments
        }

class Comment(db.Model):
    __tablename__="comments"

    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=False)
    text = db.Column(db.String(300))

    task = db.relationship('Task', backref='comments')
    
    def to_dict(self):
        return {
        "id": self.id,
        "text": self.text
        }