from rest_framework import serializers
from events.models import Event


class MyRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'