from .models import Category, Product
from django.views.generic.base import TemplateView, View
from django.views.generic.list import ListView


class IndexView(TemplateView):
    template_name = "home.html"


class CategoryView(ListView):
    model = Category
    context_object_name = "categories"
    paginate_by = 4

    def get_template_names(self):
        if self.request.htmx:
            return "includes/category-list-items.html"
        return ["category.html"]

    def get_context_data(self, **kwargs):
        page_num = self.request.GET.get("page", "1")
        has_next_page = len(self.object_list) - (int(page_num) * self.paginate_by) > 0
        context = super().get_context_data(**kwargs)
        context['has_next_page'] = has_next_page
        return context


class ProductView(ListView):
    model = Product
    template_name = "product.html"
    context_object_name = "products"
