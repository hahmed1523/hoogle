# Generated by Django 4.1 on 2022-08-26 21:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Inbox',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_address', models.CharField(max_length=50)),
                ('subject', models.CharField(max_length=100)),
                ('body', models.CharField(max_length=1000)),
                ('received_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Sent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('to', models.CharField(max_length=50)),
                ('subject', models.CharField(max_length=100)),
                ('body', models.CharField(max_length=1000)),
                ('sent_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]