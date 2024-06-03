from django.urls import path, include
from . import views

urlpatterns = [
    path("", views.IndexView.as_view(), name="home"),
    path("category", views.CategoryView.as_view(), name="category"),
    path("product", views.ProductView.as_view(), name="product"),
    path("api/checkout", views.CheckoutAPIView.as_view(), name="checkout_api"),
    path("checkout", views.CheckoutView.as_view(), name="checkout"),
    path("cart", views.CartView.as_view(), name="cart"),
    path('accounts/', include('accounts.urls')),
    path('dashboard/', views.DashboardView.as_view(), name='dashboard'),
]