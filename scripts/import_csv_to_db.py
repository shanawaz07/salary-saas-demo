
"""Import CSV exports (employees.csv and salary_records.csv) into Postgres using DATABASE_URL"""
import os, csv, psycopg2, sys
from datetime import datetime

DB = os.getenv('DATABASE_URL')
if not DB:
    print('Set DATABASE_URL env var to your Postgres/Supabase DB connection string')
    sys.exit(1)

def parse_date(s):
    if not s: return None
    for fmt in ('%Y-%m-%d','%d-%m-%Y','%d/%m/%Y','%m/%d/%Y'):
        try:
            return datetime.strptime(s, fmt).date()
        except:
            pass
    return None

conn = psycopg2.connect(DB)
cur = conn.cursor()

def import_employees(path):
    with open(path, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for r in reader:
            cur.execute("""INSERT INTO employees (employee_id,name,job_station,etin,gender,grade,bank_name,bank_account,status)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)
            ON CONFLICT (employee_id) DO UPDATE SET name=EXCLUDED.name, job_station=EXCLUDED.job_station""", (
                r.get('EMP ID') or r.get('Employee ID') or r.get('employee_id'),
                r.get('Name') or r.get('name'),
                r.get('Job Station') or r.get('job_station'),
                r.get('ETIN') or r.get('etin'),
                r.get('Gender') or r.get('gender'),
                r.get('Grade') or r.get('grade'),
                r.get('Bank Name') or r.get('bank_name'),
                r.get('Bank Account') or r.get('bank_account'),
                r.get('Status') or 'active'
            ))

def import_salary(path):
    with open(path, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for r in reader:
            # attempt to find employee by employee_id string - expects employees.employee_id populated
            cur.execute("SELECT id FROM employees WHERE employee_id = %s", (r.get('EMP ID') or r.get('Employee ID') or r.get('employee_id'),))
            emp = cur.fetchone()
            emp_id = emp[0] if emp else None
            cur.execute("""INSERT INTO salary_records (employee_id,pay_month,gross,basic,allowances,deductions,net_pay,status)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s)""", (
                emp_id,
                parse_date(r.get('Pay Month') or r.get('Month')),
                r.get('Gross') or r.get('gross') or 0,
                r.get('Basic') or r.get('basic') or 0,
                r.get('Allowances') or r.get('allowance') or 0,
                r.get('Deductions') or r.get('deduction') or 0,
                r.get('Net Pay') or r.get('net') or 0,
                'draft'
            ))

if __name__ == '__main__':
    os.makedirs('scripts/data', exist_ok=True)
    emp_csv = 'scripts/data/employees.csv'
    sal_csv = 'scripts/data/salary_records.csv'
    if os.path.exists(emp_csv):
        import_employees(emp_csv)
        print('Imported employees')
    else:
        print('Place employees.csv in scripts/data/ to import')
    if os.path.exists(sal_csv):
        import_salary(sal_csv)
        print('Imported salary records')
    else:
        print('Place salary_records.csv in scripts/data/ to import')
    conn.commit()
    cur.close()
    conn.close()
