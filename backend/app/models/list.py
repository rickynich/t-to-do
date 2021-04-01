from .db import db

class List(db.Model):
    __tablename__ = 'lists'

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(60), nullable = False )

    tasks = db.relationship("Task", back_populates="lists")

    def __repr__(self):
        return '<List %r>' % self.title

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

    def __repr__(self):
        return '<List %r>' % self.title

    def to_dict(self):
        return {
        "id": self.id,
        "desc": self.desc,
        "status": self.status,
        }