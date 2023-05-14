# Generated by Django 4.1.8 on 2023-05-13 20:27

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import mission.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Agency',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('address', models.CharField(max_length=255)),
                ('phone', models.CharField(max_length=12)),
            ],
        ),
        migrations.CreateModel(
            name='Demand',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_modified', models.DateTimeField(auto_now=True)),
                ('assignee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='assigned_demands', to=settings.AUTH_USER_MODEL)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_demands', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Direction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='StateDemand',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='TypeDemand',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='TypeMission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='WorkFlow',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('version', models.CharField(max_length=10)),
                ('demand_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mission.typedemand')),
            ],
        ),
        migrations.CreateModel(
            name='Transition',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=255)),
                ('action', models.CharField(max_length=25)),
                ('end_state', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='end_point', to='mission.statedemand')),
                ('start_state', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='start_point', to='mission.statedemand')),
                ('workflow', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mission.workflow')),
            ],
        ),
        migrations.AddField(
            model_name='statedemand',
            name='workflow',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mission.workflow'),
        ),
        migrations.CreateModel(
            name='MissionOrder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('trip_purpose', models.TextField()),
                ('use_personal_vehicle', models.BooleanField()),
                ('departing', models.DateTimeField()),
                ('returning', models.DateTimeField()),
                ('observation_manager', models.CharField(max_length=255)),
                ('observation_HR', models.CharField(max_length=255)),
                ('agency', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mission.agency')),
                ('demand', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='mission.demand')),
                ('mission_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mission.typemission')),
            ],
        ),
        migrations.CreateModel(
            name='MissionFee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('demand', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='mission.demand')),
                ('mission_order', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='mission.missionorder')),
            ],
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('group_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='auth.group')),
                ('profile', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='group', to='mission.profile')),
            ],
            bases=('auth.group',),
            managers=[
                ('objects', django.contrib.auth.models.GroupManager()),
            ],
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=30)),
                ('phone', models.CharField(blank=True, max_length=10, null=True)),
                ('grade', models.CharField(max_length=50)),
                ('function', models.CharField(blank=True, max_length=50, null=True)),
                ('direction', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mission.direction')),
                ('manager', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='mission.employee')),
            ],
        ),
        migrations.AddField(
            model_name='demand',
            name='state',
            field=models.ForeignKey(default=mission.models.get_init_state_demand, on_delete=django.db.models.deletion.CASCADE, to='mission.statedemand'),
        ),
        migrations.AddField(
            model_name='demand',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mission.typedemand'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='employee',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='mission.employee'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='main_profile',
            field=models.ForeignKey(default=mission.models.get_profile_missionaire, on_delete=django.db.models.deletion.SET_DEFAULT, to='mission.profile'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions'),
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time_event', models.DateTimeField(auto_now_add=True)),
                ('demand', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mission.demand')),
                ('transition', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mission.transition')),
                ('trigger_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('demand', 'trigger_user', 'transition')},
            },
        ),
    ]
