from django.urls import path
from . import views

urlpatterns = [
    path('api/add-employee/', views.add_employee),
    path('api/employees/', views.employee_list),
    path('api/generate-payslip/', views.generate_payslip),
    path('api/update-employee/<int:pk>/', views.update_employee),
    path('api/delete-employee/<int:pk>/', views.delete_employee),
]