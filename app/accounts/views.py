from django.contrib.auth.views import LoginView as DjangoLoginView
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views import View
from django.contrib.auth import login, authenticate
from .forms import SignUpForm, LoginForm
from store.models import Customer


class LoginView(DjangoLoginView):
    template_name = 'accounts/login.html'
    form_class = LoginForm

    def get(self, request, *args, **kwargs):
        if self.request.user.is_authenticated:
            return redirect('dashboard')
        return super().get(request, *args, **kwargs)


class SignUpView(View):
    form_class = SignUpForm
    template_name = 'accounts/signup.html'
    success_url = reverse_lazy('dashboard')

    def get(self, request):
        if self.request.user.is_authenticated:
            return redirect('dashboard')
        form = self.form_class()
        return render(request, self.template_name, {'form': form})

    def post(self, request):
        form = self.form_class(request.POST)
        if form.is_valid():
            user = form.save()
            Customer.objects.create(user=user)
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                return render(
                    request, self.template_name, {'form': form, 'error': 'Authentication failed'}
                )

        return render(request, self.template_name, {'form': form})
