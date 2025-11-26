
#!/bin/bash
# Example: use psql to run the SQL schema and import CSVs (assuming DATABASE_URL set)
psql "$DATABASE_URL" -f sql/schema.sql
python3 scripts/import_csv_to_db.py
