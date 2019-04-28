from django.db import models
# Create your models here.
#User table model
class User(models.Model):
	"""This class represents the user model."""
	name = models.CharField(max_length=50)
	username = models.CharField(max_length=50)
	email = models.EmailField(max_length=70, unique=True)
	mobile = models.CharField(max_length=50, blank=False)
	password = models.CharField(max_length=50)
	confirm = models.CharField(max_length=50)
	type = models.PositiveIntegerField(default=1)
	address = models.CharField(max_length=100)
	city = models.CharField(max_length=50)
	state = models.CharField(max_length=50)

	def __unicode__(self):
           return self.username

#user details model
class userDetails(models.Model):
	"""This class represents the userDetails model."""
	User = models.ForeignKey(User, on_delete=models.CASCADE,blank=False)
	first_name = models.CharField(max_length=50)
	last_name = models.CharField(max_length=50)
	email = models.EmailField(max_length=70, unique=True)
	alternate_email = models.EmailField(max_length=70, unique=True)
	password =  models.CharField(max_length=50)
	new_password = models.CharField(max_length=50)
	confirm_password = models.CharField(max_length=50)
	mobile = models.CharField(max_length=50, blank=False)
	country = models.CharField(max_length=50)

	def __unicode__(self):
           return self.first_name

#Vendor table model
class vendor(models.Model):
	"""This class represents the vendor model."""
	first_name = models.CharField(max_length=50)
	last_name = models.CharField(max_length=50)
	password = models.CharField(max_length=50)
	address = models.CharField(max_length=100)
	email = models.EmailField(max_length=70,blank=True)
	pincode = models.PositiveIntegerField()
	mobile_number = models.CharField(max_length=100)
	company_name = models.CharField(max_length=50)
	countries = (
   ('India', 'INDIA'),
   ('Other', 'OTHER')
	)
	country = models.CharField(choices=countries, max_length=128,blank=True)
	account_manager = models.CharField(max_length=50,blank=True)
	groups = (
   ('Electronics', 'ELECTRONICS'),
   ('agriculture', 'AGRICULTURE'),
   ('consumer goods', 'CONSUMER GOODS'),
   ('stationary', 'STATIONARY'),
   ('electricals', 'ELECTRICALS')
	)
	select_group = models.CharField(choices=groups, max_length=128,blank=True)
	date_created = models.DateTimeField(auto_now_add=True)
	unique_code = models.CharField(max_length=10)
	date_modified = models.DateTimeField(auto_now=True)
	active = models.PositiveIntegerField(default=1)
	gst_number = models.CharField(max_length=50,blank=True)
	pan_number = models.CharField(max_length=50,blank=True)
	accname = models.CharField(max_length=50,blank=True)
	accno = models.CharField(max_length=50,blank=True)
	ifc = models.CharField(max_length=50,blank=True)
	bankname = models.CharField(max_length=50,blank=True)
	acctype = models.CharField(max_length=50,blank=True)
	refname = models.CharField(max_length=50,blank=True)
	refphone = models.CharField(max_length=50,blank=True)
	refdesignation = models.CharField(max_length=50,blank=True)
	def __unicode__(self):
		return self.first_name

class Admin(models.Model):
	"""This class represents the vendor model."""
	username = models.CharField(max_length=50)
	email = models.EmailField(max_length=70, unique=True)
	mobile = models.CharField(max_length=50, blank=False)
	password = models.CharField(max_length=50)
	confirm = models.CharField(max_length=50)
	def __unicode__(self):
		return self.first_name
