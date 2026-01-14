# Full-stack Blog

Referenced Net Ninja Modern React Tutorial on YouTube for ui, added python backend logic with flask api to access sqlite database

## Structure
/frontend - React application
/backend - Flask API, Python venv and sqlite database

## Set up front
1. `cd frontend`
2. `npm install`
3. `npm run start`

## Set up back
1. `cd backend`
2. `python -m venv venv`
3. `.\venv\Scripts\activate`
4. `pip install -r requirements.txt`
5. `python app.py`

## Create database
Run following commands in python shell:
```python
from app import app, db
with app.app_context():
  db.create_all()
exit()
