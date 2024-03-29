FROM python:2.7
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code



EXPOSE 8000

CMD [ "gunicorn", "refritect.wsgi:application", "--bind", "0.0.0.0:8000"]
