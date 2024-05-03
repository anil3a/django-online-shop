from django.db import models
from django.utils import timezone


class BaseModel(models.Model):
    """
    An abstract base class model that provides self-updating
    `created_at` and `updated_at` fields.
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ['-updated_at']


class Category(BaseModel):
    name = models.CharField(max_length=300)
    description = models.TextField(null=True, blank=True)

    class Meta(BaseModel.Meta):
        verbose_name_plural = "categories"
        ordering = ['-pk']

    def __str__(self):
        return f"Category {self.name}"


class Product(BaseModel):
    name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    cost = models.DecimalField(max_digits=12, decimal_places=2)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    quantity = models.IntegerField(default=0)
    categories = models.ManyToManyField(Category)
    sku = models.CharField(max_length=50, unique=True)

    class Meta(BaseModel.Meta):
        ordering = ['pk']

    def __str__(self):
        return f"Product {self.name}"


"""

class Customer():

class Address():

class Cart():

class CartItem():

class Order():

class OrderItem():

class Payment():



"""