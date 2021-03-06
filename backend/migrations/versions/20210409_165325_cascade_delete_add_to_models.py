"""cascade delete add to models

Revision ID: 6fa31706b6b2
Revises: d2679450ce54
Create Date: 2021-04-09 16:53:25.814447

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6fa31706b6b2'
down_revision = 'd2679450ce54'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('comments', 'task_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('tasks', 'list_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('tasks', 'list_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('comments', 'task_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###
