from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, ValidationError, Length

class CreateListForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()]) #add length limiter as well

class CreateTaskForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    desc = StringField('desc')
    status = BooleanField('status')
    
class CreateCommentForm(FlaskForm):
    text = StringField('text', DataRequired(), Length(max=300))