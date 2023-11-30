//Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const comments = [
  { username: 'Todd', comment: 'lol that is so funny!' },
  { username: 'Sk8erBoi', comment: 'Plz delete your account, Todd' },
  { username: 'onlysayswoof', comment: 'woof woof woof' },
  { username: 'iliketurtles', comment: 'wut' },
  { username: 'fluffyrabbit', comment: 'meow' }
];
// Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Set up GET route
app.get('/comments', (req, res) => {
  res.json(comments);
});
// Set up POST route
app.post('/comments', (req, res) => {
  const newComment = { username: req.body.name, comment: req.body.comment };
  comments.push(newComment);
  res.json(comments);
});
// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// Path: comments.html
<!DOCTYPE html>
<html>
  <head>
    <title>Comments</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  </head>
  <body class="container">
    <h1>Comments</h1>
    <div id="comments"></div>
    <form id="comment-form">
      <div class="form-group">
        <label for="name">Username</label>
        <input id="name" class="form-control" type="text" name="name">
      </div>
      <div class="form-group">
        <label for="comment">Comment</label>
        <textarea id="comment" class="form-control" name="comment"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <script src="https://code.jquery.com/jquery-3.1.0.min.js"></script>
    <script>
      $(document).ready(function() {
        $.getJSON('/comments', function(comments) {
          $.each(comments, function(index, comment) {
            $('#comments').append('<p><strong>' + comment.username + '</strong>: ' + comment.comment + '</p>');