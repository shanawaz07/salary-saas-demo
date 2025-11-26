
# Salary SaaS — MVP Scaffold (Next.js + Supabase)

This repository is an MVP scaffold for a SaaS payroll + HR platform based on your Excel file.
It includes:
- Next.js frontend (TypeScript)
- Server API routes that use Supabase service role key
- SQL schema for Supabase/Postgres
- Import script to seed the database from the CSV exports of your Excel
- Simple employee CRUD and payroll endpoints

## Quick start (local)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a Supabase project (or Postgres) and run the SQL migration in `sql/schema.sql`.
   - In Supabase: open SQL editor -> paste `sql/schema.sql` -> run.

3. Create `.env.local` from `.env.local.example` and fill the values.

4. Seed data:
   - Export CSVs from your Excel and place them in `/scripts/data/` named `employees.csv` and `salary_records.csv`.
   - Run `python3 scripts/import_csv_to_db.py` (requires `psycopg2-binary` or use supabase client).

5. Run the app:
   ```bash
   npm run dev
   ```

## What is included
- `/pages` — Next.js pages (home, employees, payroll)
- `/pages/api` — serverless API routes for employees and payroll using SUPABASE_SERVICE_ROLE_KEY
- `/lib/supabaseClient.ts` — client for public usage
- `/sql/schema.sql` — database schema (employees, salary_records, salary_structure, payment_file, audit_logs)
- `/scripts/import_csv_to_db.py` — CSV import helper (Postgres)
- `/scripts/data/` — place CSVs here to import

## Next steps
- Deploy to Vercel + Supabase; set env vars in Vercel project to match `.env.local`.
- Implement RBAC, file uploads (payslips), email notifications, and billing (Stripe).
