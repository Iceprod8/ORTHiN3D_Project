# models.py
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Record(models.Model):
    text = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="records", null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.text} by {self.created_by.username}"
