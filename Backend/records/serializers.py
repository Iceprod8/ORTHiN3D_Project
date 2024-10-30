# serializers.py
from rest_framework import serializers
from .models import Record
from django.contrib.auth.models import User

class RecordSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')
    created_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M", read_only=True)

    class Meta:
        model = Record
        fields = ['id', 'text', 'created_by', 'created_at']