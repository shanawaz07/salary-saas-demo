
-- Salary SaaS schema (minimal MVP)

CREATE TABLE IF NOT EXISTS departments (
  id serial PRIMARY KEY,
  name text UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS designations (
  id serial PRIMARY KEY,
  name text UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS employees (
  id serial PRIMARY KEY,
  employee_id text UNIQUE,
  name text NOT NULL,
  department_id integer REFERENCES departments(id),
  designation_id integer REFERENCES designations(id),
  etin text,
  gender text,
  grade text,
  job_station text,
  join_date date,
  bank_name text,
  bank_account text,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS salary_structure (
  id serial PRIMARY KEY,
  name text,
  basic numeric,
  gross numeric,
  house_rent numeric,
  medical numeric,
  conveyance numeric,
  other_allowance numeric,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS salary_records (
  id serial PRIMARY KEY,
  employee_id integer REFERENCES employees(id) ON DELETE SET NULL,
  pay_month date,
  gross numeric,
  basic numeric,
  allowances numeric,
  deductions numeric,
  pf_employee numeric,
  pf_employer numeric,
  ait numeric,
  net_pay numeric,
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS payment_files (
  id serial PRIMARY KEY,
  generated_at timestamptz DEFAULT now(),
  filename text,
  content text
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id serial PRIMARY KEY,
  user_id text,
  action text,
  payload jsonb,
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_salary_emp_month ON salary_records(employee_id, pay_month);
CREATE INDEX IF NOT EXISTS idx_employees_dept ON employees(department_id);
