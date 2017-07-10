# Express REST API

Practice building an Express REST API

### Stack used
* Node (server-side JS)
* Express (server and routing)
* MongoDB (database)
* Mongoose (JS client for Mongo)
* Morgan (helps with error logging)

### Functionality and routing
* `GET /questions` view all questions
* `POST /questions` create a new question
  * Fields for `title` and `text`
* `GET /questions/:question_id` view a specific question
* `POST /questions/:question_id/answers` create a new answer to a question
  * Again, fields for `title` and `text`
* `PUT /questions/:question_id/answers/:answer_id` update an answer
* `DELETE /questions/:question_id/answers/:answer_id` delete an answer
* `POST /questions/:question_id/answers/:answer_id/upvote` upvote an answer
* `POST /questions/:question_id/answers/:answer_id/downvote` downvote an answer

### Todo
[ ] Implement the API with a web app with React
[ ] Implement the API with an application via React Native
[ ] Implement a `Users` model with proper authentication
[ ] Add ability to edit and delete questions
[ ] Deploy the API and its database in a production environment
