from django.views import generic
from .models import Category, Product


class IndexView(generic.TemplateView):
    template_name = "home.html"


class CategoryView(generic.ListView):
    model = Category
    template_name = "category.html"
    context_object_name = "categories"


class ProductView(generic.ListView):
    model = Product
    template_name = "product.html"
    context_object_name = "products"
