# Generated by Django 2.1.7 on 2019-03-05 21:03

from django.db import migrations, models
import visual.models


class Migration(migrations.Migration):

    dependencies = [
        ('visual', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='notebook',
            name='nodefile',
            field=models.FileField(blank=True, upload_to=visual.models.directory_path_notebook),
        ),
    ]
