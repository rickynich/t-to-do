"""empty message

Revision ID: 3d9b8dc210c3
Revises: e098db647db8
Create Date: 2021-04-01 13:21:32.781310

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3d9b8dc210c3'
down_revision = 'e098db647db8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    # op.create_table('users',
    # sa.Column('id', sa.Integer(), nullable=False),
    # sa.Column('username', sa.String(length=40), nullable=False),
    # sa.PrimaryKeyConstraint('id'),
    # sa.UniqueConstraint('username')
    # )
    # ### end Alembic commands ###
    pass


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    # op.drop_table('users')
    pass
    # ### end Alembic commands ###
