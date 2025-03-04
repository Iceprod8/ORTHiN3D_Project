from rest_framework import serializers
from .models import Record
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'last_name', 'first_name', 'email'] 
