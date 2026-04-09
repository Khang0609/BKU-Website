"""Remove redundant fields from student sub-models

Revision ID: e62d8a264f71
Revises: fd969289292a
Create Date: 2026-03-14 03:40:52.237664

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e62d8a264f71'
down_revision: Union[str, Sequence[str], None] = 'fd969289292a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # SQLite requires batch_alter_table for dropping columns and changing nullability
    
    # --- student_academics ---
    with op.batch_alter_table('student_academics', schema=None) as batch_op:
        batch_op.alter_column('anchor_id', existing_type=sa.INTEGER(), nullable=False)
        batch_op.drop_index(batch_op.f('ix_student_academics_student_code'))
        batch_op.drop_constraint('student_academics_major_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('student_academics_unit_id_fkey', type_='foreignkey')
        batch_op.drop_column('student_code')
        batch_op.drop_column('major_id')
        batch_op.drop_column('unit_id')

    # --- student_decisions ---
    with op.batch_alter_table('student_decisions', schema=None) as batch_op:
        batch_op.alter_column('anchor_id', existing_type=sa.INTEGER(), nullable=False)

    # --- student_extra_curriculars ---
    with op.batch_alter_table('student_extra_curriculars', schema=None) as batch_op:
        batch_op.alter_column('anchor_id', existing_type=sa.INTEGER(), nullable=False)

    # --- student_finances ---
    with op.batch_alter_table('student_finances', schema=None) as batch_op:
        batch_op.alter_column('anchor_id', existing_type=sa.INTEGER(), nullable=False)

    # --- student_guardians ---
    with op.batch_alter_table('student_guardians', schema=None) as batch_op:
        batch_op.alter_column('anchor_id', existing_type=sa.INTEGER(), nullable=False)

    # --- student_parents ---
    with op.batch_alter_table('student_parents', schema=None) as batch_op:
        batch_op.alter_column('anchor_id', existing_type=sa.INTEGER(), nullable=False)

    # --- student_personals ---
    with op.batch_alter_table('student_personals', schema=None) as batch_op:
        batch_op.alter_column('anchor_id', existing_type=sa.INTEGER(), nullable=False)

    # --- student_programs ---
    with op.batch_alter_table('student_programs', schema=None) as batch_op:
        batch_op.drop_constraint('student_programs_major_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('student_programs_unit_id_fkey', type_='foreignkey')
        batch_op.drop_column('major_id')
        batch_op.drop_column('unit_id')
        batch_op.drop_column('student_status')

    # --- student_training_points ---
    with op.batch_alter_table('student_training_points', schema=None) as batch_op:
        batch_op.alter_column('anchor_id', existing_type=sa.INTEGER(), nullable=False)


def downgrade() -> None:
    """Downgrade schema."""
    
    # --- student_training_points ---
    with op.batch_alter_table('student_training_points', schema=None) as batch_op:
        batch_op.alter_column('anchor_id', existing_type=sa.INTEGER(), nullable=True)

    # --- student_programs ---
    with op.batch_alter_table('student_programs', schema=None) as batch_op:
        batch_op.add_column(sa.Column('student_status', sa.VARCHAR(length=50), nullable=True))
        batch_op.add_column(sa.Column('unit_id', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('major_id', sa.INTEGER(), nullable=True))
        batch_op.create_foreign_key('student_programs_unit_id_fkey', 'management_units', ['unit_id'], ['id'])
        batch_op.create_foreign_key('student_programs_major_id_fkey', 'majors', ['major_id'], ['id'])

    # --- student_personals ---
    with op.batch_alter_table('student_personals', schema=None) as batch_op:
        batch_op.alter_column('anchor_id', existing_type=sa.INTEGER(), nullable=True)

    # --- student_parents ---
    with op.batch_alter_table('student_parents', schema=None) as batch_op:
        batch_op.alter_column('anchor_id', existing_type=sa.INTEGER(), nullable=True)

    # --- student_guardians ---
    with op.batch_alter_table('student_guardians', schema=None) as batch_op:
        batch_op.alter_column('anchor_id', existing_type=sa.INTEGER(), nullable=True)

    # --- student_finances ---
    with op.batch_alter_table('student_finances', schema=None) as batch_op:
        batch_op.alter_column('anchor_id', existing_type=sa.INTEGER(), nullable=True)

    # --- student_extra_curriculars ---
    with op.batch_alter_table('student_extra_curriculars', schema=None) as batch_op:
        batch_op.alter_column('anchor_id', existing_type=sa.INTEGER(), nullable=True)

    # --- student_decisions ---
    with op.batch_alter_table('student_decisions', schema=None) as batch_op:
        batch_op.alter_column('anchor_id', existing_type=sa.INTEGER(), nullable=True)

    # --- student_academics ---
    with op.batch_alter_table('student_academics', schema=None) as batch_op:
        batch_op.add_column(sa.Column('unit_id', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('major_id', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('student_code', sa.VARCHAR(length=20), nullable=False))
        batch_op.create_foreign_key('student_academics_unit_id_fkey', 'management_units', ['unit_id'], ['id'])
        batch_op.create_foreign_key('student_academics_major_id_fkey', 'majors', ['major_id'], ['id'])
        batch_op.create_index('ix_student_academics_student_code', ['student_code'], unique=True)
        batch_op.alter_column('anchor_id', existing_type=sa.INTEGER(), nullable=True)
