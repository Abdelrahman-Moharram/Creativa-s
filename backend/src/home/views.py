from django.shortcuts import render
from rest_framework import response, status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from .Helper import IsAllowedFile
from .Regression import ApplyLinearRegression
@api_view(('POST','GET'))
@renderer_classes((JSONRenderer, ))
def index(request):
    if request.method == 'POST':
        ext = IsAllowedFile(request.FILES['file'].name)
        X, Y = None, None
        if 'X' in request.POST and 'Y' in request.POST:
            X = request.POST.getlist('X')
            Y = request.POST['Y']

        if not X or not Y:
            return response.Response(
                {
                    "message":"Invalid Selection either train or test columns"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        if ext:
            result =  ApplyLinearRegression(
                            request.FILES['file'], 
                            ext,
                            X, 
                            Y, 
                        )
            if result: 
                return response.Response(result, status=status.HTTP_200_OK)            
        return response.Response({"message":"Bad request invalid file type"}, status=status.HTTP_400_BAD_REQUEST)
    
    return render(request, 'index.html')