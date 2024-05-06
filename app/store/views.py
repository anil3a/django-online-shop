from .models import Category, Product
from django.views.generic.base import TemplateView, View
from django.views.generic.list import ListView
from django.utils.functional import cached_property


class HTMXListView(ListView):
    template_name = None
    template_item_name = None

    def get_template_names(self):
        if self.request.htmx:
            return [self.template_item_name]
        return [self.template_name]

    def get_context_data(self, **kwargs):
        page_num = self.request.GET.get("page", "1")
        has_next_page = len(self.object_list) - (int(page_num) * self.paginate_by) > 0
        context = super().get_context_data(**kwargs)
        context['has_next_page'] = has_next_page
        return context


class IndexView(TemplateView):
    template_name = "home.html"


class CategoryView(HTMXListView):
    model = Category
    context_object_name = "categories"
    template_name = "category.html"
    template_item_name = "includes/category-list-items.html"
    paginate_by = 4


class ProductView(HTMXListView):
    model = Product
    context_object_name = "products"
    template_name = "product.html"
    template_item_name = "includes/product-list-items.html"
    paginate_by = 4

