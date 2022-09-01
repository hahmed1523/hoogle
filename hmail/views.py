from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core.serializers import serialize
import json 
from .models import Inbox, Sent 

# Create your views here.
def root(request):
    return render(request, "hmail/index.html")


def inbox(request):
    qs = Inbox.objects.all()
    data = serialize("json", qs, fields=("from_address", "subject", "body"))
    return HttpResponse(data, content_type="application/json")


def sent(request):
    qs = Sent.objects.all()
    data = serialize("json", qs, fields=("to", "subject", "body"))
    return HttpResponse(data, content_type="application/json")