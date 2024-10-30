from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        last_name = request.data.get('lastname')
        first_name = request.data.get('firstname')
        password = request.data.get('password')
        email = request.data.get('email')

        if not last_name or not first_name or not password or not email:
            return Response({'error': 'Tous les champs sont obligatoires.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'Cet email est déjà utilisé.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create(
            last_name=last_name,
            first_name=first_name,
            password=make_password(password),
            email=email,
            username=email
        )

        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)
