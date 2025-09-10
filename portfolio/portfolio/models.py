from django.db import models

# Create your models here.
class Project (models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/')
    link = models.URLField()

    def __str__(self):
        return self.title
    
class Certificate(models.Model):
    title = models.CharField(max_length=200)
    organization = models.CharField(max_length=200)
    year = models.IntegerField()
    image = models.ImageField(upload_to='certificates/')
    link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title
    
class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"
    
    class Meta:
        ordering = ['-created_at']