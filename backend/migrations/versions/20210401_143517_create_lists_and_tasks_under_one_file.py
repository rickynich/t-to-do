"""create lists and tasks under one file

Revision ID: 716a6208da9b
Revises: 900aad2f36b0
Create Date: 2021-04-01 14:35:17.363984

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '716a6208da9b'
down_revision = '900aad2f36b0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('lists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=60), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )

    
    user_table = op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.bulk_insert(user_table, [{"username" : "Demo User"}])

    op.create_table('tasks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('list_id', sa.Integer(), nullable=True),
    sa.Column('desc', sa.String(length=300), nullable=False),
    sa.Column('status', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['list_id'], ['lists.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tasks')
    op.drop_table('users')
    op.drop_table('lists')
    # ### end Alembic commands ###