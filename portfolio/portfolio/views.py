from django.shortcuts import render,redirect
from django.core.mail import send_mail
from django.conf import settings
from .forms import ContactForm
from django.contrib import messages
from .models import Project,Certificate,ContactMessage
# Create your views here.
def index(request):
    projects = Project.objects.all()
    certificates = Certificate.objects.all()
    context = {
        'projects': projects,
        'certificates': certificates
    }
    
    return render(request, 'index.html', context)

def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')

        ContactMessage.objects.create(name=name, email=email, message=message)

        try:
            send_mail(
                f"Yeni Mesaj - {name}",
                f"{message}\n\nGönderen: {email}",
                settings.EMAIL_HOST_USER,
                [settings.EMAIL_HOST_USER], 
                fail_silently=False,
            )
            messages.success(request, 'Mesajınız başarıyla gönderildi!')
        except Exception as e:
            messages.error(request, f'Mesaj gönderilemedi: {e}')

        return redirect('index')  

    return render(request, 'index.html')