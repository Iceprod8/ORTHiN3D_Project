# records/views.py
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Record
from .serializers import RecordSerializer

class RecordViewSet(viewsets.ModelViewSet):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
