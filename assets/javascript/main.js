var config = {
    apiKey: "AIzaSyD_niR-70BZtPtGFqcF_-pdhF4BvqGvnQo",
    authDomain: "train-scheduler-78ad0.firebaseapp.com",
    databaseURL: "https://train-scheduler-78ad0.firebaseio.com",
    projectId: "train-scheduler-78ad0",
    storageBucket: "",
    messagingSenderId: "106426095700"
  };
  firebase.initializeApp(config);

  var database = firebase.database().ref();

  var trainName = '';
  var destination = '';
  var firstTrain = '';
  var trainFrequency = '';

  $('#submit-train').on('click', function (event) {
    event.preventDefault();

    trainName = $('#train-name').val().trim();
    destination = $('#destination').val().trim();
    firstTrain = moment($("#first-train").val().trim(), "HH:mm").subtract(10, "years").format("X");
    trainFrequency = $('#frequency').val().trim();

    var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      trainFrequency: trainFrequency
    };

    database.push(newTrain);

    $('#train-name').val('');
    $('#destination').val('');
    $('#first-train').val('');
    $('#frequency').val('');

    return false;
  });


  database.on('child_added', function(childSnapshot, prevChildKey) {

    let data = childSnapshot.val();
    let trainName = data.name;
    let destination = data.destination;
    let frequency = data.frequency;
    let firstTrain = data.firstTrain;

    let timeDifference = moment().diff(moment.unix(firstTrain), 'minutes');
    let remainder = moment().diff(moment.unix(firstTrain), 'minutes');
    let minutes = frequency - remainder;

    let arrival = moment().add(minutes, 'm').format('hh:mm A');

    $('#train-table > tbody').append('<tr><td>' + trainName + '</td><td>' + destination + "</td><td id='min'>" + frequency + "</td><td id='min'>" + arrival + "</td><td id='min'>" + minutes + '</td></tr>');
  });

  $('#current-time').append(moment().format('hh:mm A'));