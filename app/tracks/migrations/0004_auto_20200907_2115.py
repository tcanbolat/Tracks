# Generated by Django 3.1.1 on 2020-09-08 04:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tracks', '0003_auto_20200907_2114'),
    ]

    operations = [
        migrations.AddField(
            model_name='track',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='track',
            name='description',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='track',
            name='posted_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='track',
            name='title',
            field=models.CharField(default=django.utils.timezone.now, max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='track',
            name='url',
            field=models.URLField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]