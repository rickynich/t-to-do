"""create user table

Revision ID: e098db647db8
Revises: 
Create Date: 2021-04-01 13:08:54.374185

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e098db647db8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    # user_table = op.create_table('users',
    # sa.Column('id', sa.Integer(), nullable=False),
    # sa.Column('username', sa.String(length=40), nullable=False),
    # sa.PrimaryKeyConstraint('id'),
    # sa.UniqueConstraint('username')
    # )
    # op.bulk_insert(user_table, [{"username" : "Demo User"}])
    # ### end Alembic commands ###
    pass

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    # ### end Alembic commands ###