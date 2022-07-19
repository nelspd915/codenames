from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

@api_view(["GET"])
def apiOverview(request):

    api_urls = {
        "Get Number": "/number",
    }

    return Response(api_urls)
    
@api_view(["POST"])
def getNumber(request):
    data = request.data

    return Response(data)