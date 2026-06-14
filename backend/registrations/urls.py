from django.urls import path
from .views import (
    RegisterForEventView,
    MyRegistrationsView
)

urlpatterns = [
    path(
        'events/<int:id>/register/',
        RegisterForEventView.as_view()
    ),
    path(
        'my-registrations/',
        MyRegistrationsView.as_view()
    ),
]