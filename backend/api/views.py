import json

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from pathlib import Path

from backend.settings import BASE_DIR

# Create your views here.


@api_view(["GET"])
def apiOverview(request):

    apiUrls = {
        "Get Number": "/number",
        "Get Dummy Data: ": "/dummyData"
    }
    return Response(apiUrls)


@api_view(["POST"])
def getNumber(request):
    data = request.data

    return Response(data)


@api_view(["GET"])
def getDummyData(request):
    """Gets dummy data for testing cell data request.
    @param request
    """

    # Opening JSON file
    f = open(str(BASE_DIR) + '/api/utils/data/dummyData.json')

    # returns JSON object as
    # a dictionary
    data = json.load(f)

    # Closing file
    f.close()
    return JsonResponse(data, safe=False)
