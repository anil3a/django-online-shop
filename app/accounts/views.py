from django.contrib.auth.views import LoginView as DjangoLoginView
from django.shortcuts import render, redirect
from django.views import View
from django.contrib.auth import login, authenticate
from .forms import SignUpForm, LoginForm


class LoginView(DjangoLoginView):
    template_name = 'accounts/login.html'
    form_class = LoginForm


class SignUpView(View):
    form_class = SignUpForm
    template_name = 'accounts/signup.html'

    def get(self, request):
        form = self.form_class()
        return render(request, self.template_name, {'form': form})

    def post(self, request):
        form = self.form_class(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect('home')  # Redirect to home or another page

        return render(request, self.template_name, {'form': form})
