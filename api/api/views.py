from django.shortcuts import get_object_or_404,render
from django.db.models import Q, F
from rest_framework.generics import CreateAPIView
import socket, random
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
from rest_framework import generics
from .models import User, Admin, vendor,userDetails
from .serializers import vendorSerializer,adminSerializer, userSerializer, userDetailsSerializer
from django.conf.urls import url
from django.http import HttpResponse
from rest_framework_swagger.views import get_swagger_view
import requests
from django.views.decorators.csrf import csrf_exempt
import simplejson as json
import http.client, requests
from datetime import datetime, timedelta

schema_view = get_swagger_view(title='API', url='/api')

@csrf_exempt
def sendSms(request):
    conn = http.client.HTTPConnection("api.msg91.com")
    if request.method == 'POST':
        data  = json.loads(request.body.decode('utf-8'))
        Str = "/api/sendhttp.php?sender=&route=1&mobiles=91"+data['number']+"&authkey=&country=0&message="+data['message']
        conn.request("GET",Str)
        res = conn.getresponse()
        data = res.read()
    return HttpResponse(data.decode("utf-8"))

@csrf_exempt
def sendEmail(request):
    if request.method == 'POST':
        data  = json.loads(request.body.decode('utf-8'))
        msg = MIMEMultipart()        
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login("gmail", "******")
        body = data['message']
        msg['Subject'] = data['subject']
        msg.attach(MIMEText(body, 'plain'))
        text = msg.as_string()
        server.sendmail("****", data['to'], text)
        server.quit()
    return HttpResponse(data.decode("utf-8"))

class CreateView_user(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = User.objects.all()
    serializer_class = userSerializer

class CreateView_userDetails(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = userDetails.objects.all()
    serializer_class = userDetailsSerializer
    def perform_create(self, serializer):
        """Save the post data when creating a new cart."""
        userid = self.request.data.get("user_id")
        serializer.save(
            User=User.objects.get(pk=userid)
        )

class CreateView_vendor(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = vendor.objects.all()
    serializer_class = vendorSerializer

class CreateView_admin(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Admin.objects.all()
    serializer_class = adminSerializer


class DetailsView_user(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""

    queryset = User.objects.all()
    serializer_class = userSerializer


class DetailsView_userDetails(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""

    queryset = userDetails.objects.all()
    serializer_class = userDetailsSerializer

    def perform_update(self, serializer):
        userid = self.request.data.get('user_id', None)
        serializer.save(
            User = User.objects.get(pk=userid)
        )


class DetailsView_vendor(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""

    queryset = vendor.objects.all()
    serializer_class = vendorSerializer


class ListView_user(generics.ListAPIView):
    """This class defines the create behavior of our rest api."""
    serializer_class = userSerializer
	
    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()

    def get_queryset(self):
        queryset = User.objects.all()
        email = self.request.query_params.get('email', None)
        password = self.request.query_params.get('pwd', None)
        print(email)
        print(password)
        if email is not None:
            queryset = queryset.filter(email=email).filter(password=password)
            print(queryset)
            return queryset

class ListView_vendor(generics.ListAPIView):
    """This class defines the create behavior of our rest api."""
    serializer_class = vendorSerializer
    
    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = vendor.objects.all()
        email = self.request.query_params.get('email', None)
        password = self.request.query_params.get('pwd', None)
        if email is not None:
            queryset = queryset.filter(email=email).filter(password=password).filter(active=1)
            return queryset

class ListView_admin(generics.ListAPIView):
    """This class defines the create behavior of our rest api."""
    serializer_class = adminSerializer
    
    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Admin.objects.all()
        print(queryset)
        email = self.request.query_params.get('email', None)
        password = self.request.query_params.get('pwd', None)
        if email is not None:
            queryset = queryset.filter(email=email).filter(password=password).filter(active=1)
            return queryset
