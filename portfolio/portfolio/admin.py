from django.contrib import admin
from .models import Project,Certificate,ContactMessage
# Register your models here.

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'link')

    
@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('title', 'organization', 'year')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')  # Listede görünecek sütunlar
    search_fields = ('name', 'email', 'message')    # Arama özelliği
    readonly_fields = ('name', 'email', 'message', 'created_at')  
    def has_add_permission(self, request):
        return False
    def has_change_permission(self, request, obj=None):
        return False
        