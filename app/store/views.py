from .models import Category, Product
from django.views.generic.base import TemplateView, View
from django.views.generic.list import ListView
from django.conf import settings
from django.templatetags.static import static
from django.urls import reverse_lazy
from django.http import JsonResponse
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect


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


class CheckoutView(TemplateView):
    template_name = "checkout.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["react_js_url"] = static('reactjs/bundle.js')
        context["react_css_url"] = static('reactjs/style.css')
        if settings.REACT_CHECKOUT_DEVELOPMENT:
            context["react_js_url"] = 'http://localhost:8002/static/js/bundle.js'
            context["react_css_url"] = ''
        context["react_api_url"] = settings.REACT_API_URL + reverse_lazy('cart')

        return context


class CartView(TemplateView):
    template_name = "checkout.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["react_js_url"] = static('reactjs/bundle.js')
        context["react_css_url"] = static('reactjs/style.css')
        if settings.REACT_CHECKOUT_DEVELOPMENT:
            context["react_js_url"] = 'http://localhost:8002/static/js/bundle.js'
            context["react_css_url"] = ''
        context["react_api_url"] = settings.REACT_API_URL + reverse_lazy('cart')

        return context


class CheckoutAPIView(View):
    def get(self, request):
        cart_items = Product.objects.all()
        data = [
            {'id': item.id, 'name': item.name, 'quantity': 1, 'price': item.price}
            for item in cart_items
        ]
        return JsonResponse(data, safe=False)


class DashboardView(LoginRequiredMixin, TemplateView):
    template_name = 'dashboard.html'
    success_url = reverse_lazy('dashboard')

    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('login')
        return super().get(request, *args, **kwargs)
