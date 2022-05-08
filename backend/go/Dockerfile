FROM golang:alpine

RUN mkdir /usr/app

WORKDIR /usr/app

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY . .

RUN go build -o /backend-go

EXPOSE 8080

CMD [ "/backend-go" ]