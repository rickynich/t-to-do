from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, ValidationError, Length

class CreateListForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()]) #add length limiter as well

class CreateTaskForm(FlaskForm):
    desc = StringField('desc', validators=[DataRequired()])
    status = BooleanField('status')
    
# class CreateTaskForm(FlaskForm):
#     desc = StringField('desc', DataRequired(), Length(max=300)
#     status = BooleanField('status')