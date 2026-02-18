from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    gross_salary = serializers.SerializerMethodField()
    net_salary = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = '__all__'

    def get_gross_salary(self, obj):
        return obj.gross_salary()

    def get_net_salary(self, obj):
        return obj.net_salary()