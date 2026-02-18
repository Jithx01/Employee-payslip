from django.db import models

class Employee(models.Model):
    name = models.CharField(max_length=100)
    emp_id = models.CharField(max_length=50)
    designation = models.CharField(max_length=100)
    joining_date = models.DateField()
    basic_salary = models.FloatField()
    hra_percent = models.FloatField()
    da_percent = models.FloatField()
    other_allowance_percent = models.FloatField()
    esi_percent = models.FloatField()
    pf_percent = models.FloatField()

    def gross_salary(self):
        hra = self.basic_salary * (self.hra_percent / 100)
        da = self.basic_salary * (self.da_percent / 100)
        other = self.basic_salary * (self.other_allowance_percent / 100)
        return self.basic_salary + hra + da + other

    def total_deduction(self):
        gross = self.gross_salary()
        esi = gross * (self.esi_percent / 100)
        pf = gross * (self.pf_percent / 100)
        return esi + pf

    def net_salary(self):
        return self.gross_salary() - self.total_deduction()

    def salary_after_leave(self, leave_count):
        per_day_salary = self.gross_salary() / 30
        leave_deduction = per_day_salary * leave_count
        return self.net_salary() - leave_deduction

    def __str__(self):
        return self.name