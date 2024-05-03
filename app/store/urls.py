from django.urls import path
from . import views

urlpatterns = [
    path("", views.IndexView.as_view(), name="home"),
    path("category", views.CategoryView.as_view(), name="category"),
    path("product", views.ProductView.as_view(), name="product"),
]