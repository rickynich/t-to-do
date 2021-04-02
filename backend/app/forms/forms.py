from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, ValidationError, Length

class CreateListForm(FlaskForm):
    title = StringField('title', DataRequired(), Length(max=60)

class CreateTaskForm(FlaskForm):
    desc = StringField('desc', DataRequired(), Length(max=300)
    status = BooleanField('status')
    
class CreateTaskForm(FlaskForm):
    desc = StringField('desc', DataRequired(), Length(max=300)
    status = BooleanField('status')