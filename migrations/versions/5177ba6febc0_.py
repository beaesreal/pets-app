"""empty message

Revision ID: 5177ba6febc0
Revises: 8dd8753795e3
Create Date: 2023-01-04 11:06:51.580872

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5177ba6febc0'
down_revision = '8dd8753795e3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('mascot_img')
    with op.batch_alter_table('mascot', schema=None) as batch_op:
        batch_op.add_column(sa.Column('img_1', sa.String(length=120), nullable=True))
        batch_op.add_column(sa.Column('img_2', sa.String(length=120), nullable=True))
        batch_op.add_column(sa.Column('img_3', sa.String(length=120), nullable=True))
        batch_op.add_column(sa.Column('img_mimetype', sa.String(length=10), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('mascot', schema=None) as batch_op:
        batch_op.drop_column('img_mimetype')
        batch_op.drop_column('img_3')
        batch_op.drop_column('img_2')
        batch_op.drop_column('img_1')

    op.create_table('mascot_img',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('mascot_id', sa.INTEGER(), nullable=True),
    sa.Column('img', sa.VARCHAR(length=80), nullable=False),
    sa.Column('name', sa.VARCHAR(length=80), nullable=False),
    sa.Column('mymetype', sa.VARCHAR(length=10), nullable=False),
    sa.ForeignKeyConstraint(['mascot_id'], ['mascot.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###