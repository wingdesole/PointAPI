const jwt_decode = require ('jwt-decode');

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmQ2YjY4M2RjOWM3ZDBmOWM3YTc0ZGIiLCJpYXQiOjE1NDA3OTg4ODF9.vKi9HdQmgLZ16G2hWiqVczNTzn6UKb2eW1wU0Qh5ybM';

var decoded = jwt_decode(token);

var userID = decoded._id

console.log(userID);