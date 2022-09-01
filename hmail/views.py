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
    if request.method == 'POST':
        data = json.loads(request.body)

        #Validate fields
        if data['to'] == '':
            errors = {'error': "Recipient can't be blank"}
            return HttpResponse(json.dumps(errors), content_type="application/json")
        
        if data['subject'] == '':
            errors = {'error': "Subject can't be blank"}
            return HttpResponse(json.dumps(errors), content_type="application/json")
    
        if data['body'] == '':
            errors = {'error': "Body can't be blank"}
            return HttpResponse(json.dumps(errors), content_type="application/json")
        
        # Post to db
        sent = Sent(to = data['to'], subject = data['subject'], body = data['body'])
        sent.save()
        post = serialize('json', [sent], fields=("to", "subject", "body"))
        return HttpResponse(post, content_type="application/json")
  
    qs = Sent.objects.all()
    data = serialize("json", qs, fields=("to", "subject", "body"))
    return HttpResponse(data, content_type="application/json")