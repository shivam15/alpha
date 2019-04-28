from rest_framework import serializers
from .models import Admin,vendor, User,userDetails

class userSerializer(serializers.ModelSerializer):
    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = User
        fields = ('id','name','username','email','mobile','password','confirm','type','address','state','city')

class userDetailsSerializer(serializers.ModelSerializer):
	User = serializers.SlugRelatedField(slug_field='username', read_only=True)
	class Meta:
		"""Meta class to map serializer's fields with the model fields."""
		model = userDetails
		fields = ('id','User','first_name','last_name','email','alternate_email','password','new_password','confirm_password','mobile','country')

class vendorSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = vendor
        fields = ('id','first_name','last_name','password','address','email','pincode','mobile_number','company_name','unique_code','country','account_manager','select_group','date_created','date_modified','gst_number','pan_number','refdesignation','refphone','refname','acctype','bankname','ifc','accno','accname','active')
        read_only_fields = ('date_created','date_modified')

class adminSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Admin
        fields = ('id','username','password','email','mobile','password')
        read_only_fields = ('date_created','date_modified')
