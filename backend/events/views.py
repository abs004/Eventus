from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Event
from .serializers import EventSerializer


class EventListView(APIView):
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)


class EventDetailView(APIView):
    def get(self, request, id):
        event = Event.objects.get(id=id)
        serializer = EventSerializer(event)
        return Response(serializer.data)