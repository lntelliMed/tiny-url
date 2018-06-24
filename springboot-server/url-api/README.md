# Tiny URL Generator App: A basic Spring Boot server that will perform URL shortening similar to https://tinyurl.com

# Packaging and Running the Spring Boot Server
      One way to run this server is using a jar file:
      1. To generate the jar file, run the following command from the root directory where this application was extracted (e.g. directory url-api):
          $ mvn clean install
      2. Then you can run the generated jar via the command:
          $ java -jar target/url-api-0.0.1-SNAPSHOT.jar


# Sample Actuator Endpoint
      http://localhost:9000//actuator/health


# Sample RESTful API Endpoints

## GET: http://localhost:8080/api/urls

### Sample Input:
N/A

### Sample Output:
      [
          {
              "id": 1,
              "longUrl": "https://www.amazon.com/Amazon-Kindle-Paperwhite-6-Inch-4GB-eReader/dp/B00OQVZDJM/ref=sr_1_1?ie=UTF8&qid=1529624251&sr=8-1&keywords=kindle",
              "shortUrl": "e80d9e96"
          },
          {
              "id": 2,
              "longUrl": "https://docs.spring.io/spring/docs/current/spring-framework-reference/#mvc",
              "shortUrl": "d2fc53f3"
          }
      ]

---

## GET: http://localhost:8080/api/urls/1

### Sample Input:
N/A

### Sample Output:
      {
          "id": 1,
          "longUrl": "https://www.amazon.com/Amazon-Kindle-Paperwhite-6-Inch-4GB-eReader/dp/B00OQVZDJM/ref=sr_1_1?ie=UTF8&qid=1529624251&sr=8-1&keywords=kindle",
          "shortUrl": "e80d9e96"
      }

---

## DELETE: http://localhost:8080/api/urls/1

### Sample Input:
N/A

### Sample Output:
E.g. Status 200 OK will be returned if delete was successful.

---

## POST: http://localhost:8080/api/urls

### Sample Input (provided in the request body):
      {
          "longUrl": "https://www.amazon.com/Amazon-Kindle-Paperwhite-6-Inch-4GB-eReader/dp/B00OQVZDJM/ref=sr_1_1?ie=UTF8&qid=1529624251&sr=8-1&keywords=kindle"
      }

### Sample Output:
      http://localhost:8080/e80d9e96

---

## PUT: http://localhost:8080/api/urls/2

### Sample Input (URL ID needs to be supplied as a request parameter. Any URL ID supplied in the body is just ignored)
         {
              "longUrl": "https://docs.spring.io/spring/docs/current/spring-framework-reference/#mvc",
              "shortUrl": "MYNEWURL"
          }

### Sample Output:
E.g. Status 200 OK will be returned if update was successful.

