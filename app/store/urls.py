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
    path('profile/edit', views.CustomerProfileEditView.as_view(), name='profile_edit'),
    path('profile/', views.CustomerProfileView.as_view(), name='profile_detail'),
    path('addresses/', views.AddressListView.as_view(), name='address_list'),
    path('addresses/<int:pk>', views.CustomerAddressEditView.as_view(), name='address_update'),
    path('addresses/new', views.CustomerAddressCreateView.as_view(), name='address_create'),
]
