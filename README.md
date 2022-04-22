# CRUD utilizando Nestjs
  

## 
```bash
# Clonar o repositório
git clone

# Navegue até o repositório
cd crud-school

# Instalar as dependências
npm install

# Rodar o projeto
npm run start:dev

```

## Tecnologias utilizadas
  - Nestjs
  - Nodejs
  - Typescript
  - Mongodb

## Rotas

  - Student
    - GET `http://localhost:PORT/api/v1/student/`
    - GET `http://localhost:PORT/api/v1/student/:id`
    - DELETE `http://localhost:PORT/api/v1/student/:id`
    - POST `http://localhost:PORT/api/v1/student/`
      - Body: 
        ```typescript
            {
              "name": string,
              "email": string,
              "address": string,
              "birthDate": string //formato YY-MM-DD
            }
        ```
    - PUT `http://localhost:PORT/api/v1/student/:id`
      - Body: 
        ```typescript
            {
              "name": string,
              "email": string,
              "address": string,
              "birthDate": string //formato YY-MM-DD
            }
        ```
  - Teacher
    - GET `http://localhost:PORT/api/v1/teacher/`
    - GET `http://localhost:PORT/api/v1/teacher/:id`
    - DELETE `http://localhost:PORT/api/v1/teacher/:id`
    - POST `http://localhost:PORT/api/v1/teacher/`
      - Body: 
          ```typescript
              {
                "name": string,
                "email": string,
                "address": string,
                "birthDate": string, //formato YY-MM-DD
                "subject": string,
              }
          ```
    - PUT `http://localhost:PORT/api/v1/teacher/:id`
      - Body: 
          ```typescript
              {
                "name": string,
                "email": string,
                "address": string,
                "birthDate": string, //formato YY-MM-DD
                "subject": string,
              }
          ```
  - School Class
    - GET `http://localhost:PORT/api/v1/schoolclass/`
    - GET `http://localhost:PORT/api/v1/schoolclass/:id`
    - DELETE `http://localhost:PORT/api/v1/schoolclass/:id`
    - PATCH `http://localhost:PORT/api/v1/schoolclass/:id/student`
      - Body:
         ```typescript
              {
                "students": string[], // array com id dos alunos
              }
          ```
    - DELETE `http://localhost:PORT/api/v1/schoolclass/:id/student?idStudent="id do aluno"`
    - PATCH `http://localhost:PORT/api/v1/schoolclass/:id/teacher?idTeacher="id do professor"`
    - PATCH `http://localhost:PORT/api/v1/schoolclass/:id`
      - Body:
         ```typescript
            {
              "startTime": string, //formato hour:min:sec
              "endTime": string //formato hour:min:sec
            }
          ```
    - POST `http://localhost:PORT/api/v1/schoolclass/`
      - Body:
         ```typescript
            {
              "teacher": string, //id professor
              "students": string[], // array com id dos alunos
              "startTime": string, //formato hour:min:sec
              "endTime": string //formato hour:min:sec
            }
          ```