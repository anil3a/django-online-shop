from django.contrib import admin

from .models import Category, Product, Customer, Address

admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Customer)


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('customer', 'street', 'city', 'state', 'postcode', 'is_billing')
    search_fields = ('customer__first_name', 'customer__last_name', 'street', 'suburb')
    list_filter = ('state', 'is_billing')
