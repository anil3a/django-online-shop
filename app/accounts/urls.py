from django.urls import path
from accounts.views import LoginView, SignUpView

urlpatterns = [
    path("", LoginView.as_view(), name="account"),
    path('login/', LoginView.as_view(), name='login'),
    path('signup/', SignUpView.as_view(), name='signup'),
]
