from django.urls import path
from . import views

urlpatterns = [
    path("", views.apiOverview, name="apiOverview"),
    path("number", views.getNumber, name="getNumber"),
    path("dummyData", views.getDummyData, name="getDummyData")
]
