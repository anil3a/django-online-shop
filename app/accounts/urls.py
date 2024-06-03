from django.urls import path
from django.contrib.auth import views as auth_views
from accounts.views import LoginView, SignUpView

urlpatterns = [
    path("", LoginView.as_view(), name="account"),
    path('login/', LoginView.as_view(), name='login'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('logout/', auth_views.LogoutView.as_view(next_page='login'), name='logout'),
]
