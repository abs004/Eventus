from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from events.models import Event
from .models import Registration
from .serializers import MyRegistrationSerializer


class RegisterForEventView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        event = Event.objects.get(id=id)

        if Registration.objects.filter(
            user=request.user,
            event=event
        ).exists():
            return Response(
                {"error": "Already registered for this event"},
                status=400
            )

        Registration.objects.create(
            user=request.user,
            event=event
        )

        return Response({
            "message": "Registered successfully"
        })


class MyRegistrationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        registrations = Registration.objects.filter(
            user=request.user
        )

        events = [registration.event for registration in registrations]

        serializer = MyRegistrationSerializer(
            events,
            many=True
        )

        return Response(serializer.data)