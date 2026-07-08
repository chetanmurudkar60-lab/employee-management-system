from sqlalchemy.orm import Session

from app import models
from app import schemas


def create_employee(db: Session, employee: schemas.EmployeeCreate):

    db_employee = models.Employee(

        name=employee.name,

        email=employee.email,

        department=employee.department,

        salary=employee.salary

    )

    db.add(db_employee)

    db.commit()

    db.refresh(db_employee)

    return db_employee


def get_all_employees(db: Session):

    return db.query(models.Employee).all()

def get_employee_by_id(db: Session, employee_id: int):
    return db.query(models.Employee).filter(models.Employee.id == employee_id).first()


def update_employee(db: Session, employee_id: int, employee: schemas.EmployeeCreate):

    db_employee = db.query(models.Employee).filter(
        models.Employee.id == employee_id
    ).first()

    if db_employee is None:
        return None

    db_employee.name = employee.name
    db_employee.email = employee.email
    db_employee.department = employee.department
    db_employee.salary = employee.salary

    db.commit()
    db.refresh(db_employee)

    return db_employee


def delete_employee(db: Session, employee_id: int):

    db_employee = db.query(models.Employee).filter(
        models.Employee.id == employee_id
    ).first()

    if db_employee is None:
        return None

    db.delete(db_employee)

    db.commit()

    return db_employee