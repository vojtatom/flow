# Generated by Django 2.1.7 on 2019-04-15 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('visual', '0005_task_group'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notebook',
            name='data',
            field=models.TextField(blank=True, default='[]'),
        ),
    ]
