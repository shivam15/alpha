from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import sendSms,sendEmail
from .views import CreateView_vendor, CreateView_admin
from .views import CreateView_user,CreateView_userDetails
from .views import DetailsView_vendor,ListView_user, ListView_vendor
from .views import ListView_admin,DetailsView_userDetails, DetailsView_user
from .views import blockTesting

urlpatterns = {
	url(r'^user/$', CreateView_user.as_view(), name="create user"),
	url(r'^blockTesting/$',blockTesting,name="send Sms"),
	url(r'^userDetails/$', CreateView_userDetails.as_view(), name="create userDetails"),
	url(r'^vendor/$', CreateView_vendor.as_view(), name="create vendor"),
	url(r'^admin/$', CreateView_admin.as_view(), name="create vendor"),
    url(r'^user/(?P<pk>[0-9]+)$',
        DetailsView_user.as_view(), name="details user"),
	url(r'^userDetails/(?P<pk>[0-9]+)$',
	    DetailsView_userDetails.as_view(), name="details user"),
	url(r'^vendor/(?P<pk>[0-9]+)/$',
        DetailsView_vendor.as_view(), name="details vendor"),
	url('^get_user/$', ListView_user.as_view()),
	url('^get_vendor/$', ListView_vendor.as_view()),
	url('^get_admin/$', ListView_admin.as_view()),
}

urlpatterns = format_suffix_patterns(urlpatterns)