FROM python:3.9.1
RUN mkdir /usr/app
COPY ./requirements.txt /usr/app/requirements.txt
WORKDIR /usr/app
RUN pip install -r requirements.txt
COPY . /usr/app
EXPOSE 8000
CMD [ "python3", "./app.py" ]