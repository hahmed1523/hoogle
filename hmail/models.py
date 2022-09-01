from django.db import models

# Create your models here.
class Inbox(models.Model):
    from_address = models.CharField(max_length=50)
    subject = models.CharField(max_length = 100)
    body = models.CharField(max_length = 1000)
    received_date = models.DateTimeField(auto_now_add=True)

class Sent(models.Model):
    to = models.CharField(max_length=50)
    subject = models.CharField(max_length = 100)
    body = models.CharField(max_length = 1000)
    sent_date = models.DateTimeField(auto_now_add=True)
