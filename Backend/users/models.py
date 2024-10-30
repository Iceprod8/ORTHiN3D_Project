from django.db import models
from django.contrib.auth.models import User

class Record(models.Model):
    text = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="users")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text
