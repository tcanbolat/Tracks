release: python manage.py migrate
release: python manage.py collectstatic
web: gunicorn app.wsgi --log-file -