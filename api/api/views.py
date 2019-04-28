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
import time
from .compile_solidity_utils import w3
import os
from .compile_solidity_utils import deploy_n_transact
from solc import link_code
import json
import os

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

@csrf_exempt
def blockTesting(request):
    w3.eth.defaultAccount = w3.eth.accounts[1]
    path = os.path.dirname(os.path.realpath(__file__))
    with open(os.path.join(path,"data.json"), 'r') as f:
        datastore = json.load(f)
    abi = datastore["abi"]
    contract_address = datastore["contract_address"]

    # Create the contract instance with the newly-deployed address
    user = w3.eth.contract(
        address=contract_address, abi=abi,
    )
    body = json.loads(request.body.decode('utf-8'))
    print(body)
    tx_hash = user.functions.newUser(
        10,body['name'].encode('utf-8'), body['username'].encode('utf-8'),
        body['email'].encode('utf-8'),body['mobile'].encode('utf-8'),
        body['password'].encode('utf-8'),body['confirm'].encode('utf-8'),
        int(body['type']),body['address'].encode('utf-8'),
        body['city'].encode('utf-8'),body['state'].encode('utf-8')
    )
    tx_hash = tx_hash.transact()
    print(tx_hash)
    # Wait for transaction to be mined...
    w3.eth.waitForTransactionReceipt(tx_hash)
    x = w3.eth.getBlock('latest')
    print(x)
    return HttpResponse(x)

@csrf_exempt
def getUserBlock(request):
    w3.eth.defaultAccount = w3.eth.accounts[1]
    path = os.path.dirname(os.path.realpath(__file__))
    with open(os.path.join(path,"data.json"), 'r') as f:
        datastore = json.load(f)
    abi = datastore["abi"]
    contract_address = datastore["contract_address"]

    # Create the contract instance with the newly-deployed address
    user = w3.eth.contract(
        address=contract_address, abi=abi,
    )
    user_data = user.functions.getUser().call()
    item = {}
    item['title'] = [t.decode('utf-8') for t in user_data]
    print(item)
    x = w3.eth.getBlock(w3.eth.getBlock('latest').number)
    print(x)
    print(str(x.hash))
    return HttpResponse(x)

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
            queryset = queryset.filter(email=email).filter(password=password)
            return queryset
