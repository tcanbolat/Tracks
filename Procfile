release: python manage.py migrate
release: ./manage.py collectstatic
web: gunicorn app.wsgi --log-file -