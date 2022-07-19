from django.urls import path
from . import views

urlpatterns = [
    path("", views.apiOverview, name="api_overview"),
    path("number", views.getNumber, name="getNumber")
]