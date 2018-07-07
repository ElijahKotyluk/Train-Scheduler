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
    let trainNames = data.name;
    let tDestination = data.destination;
    let trainFrequency = data.trainFrequency;
    let theFirstTrain = data.firstTrain;

    let timeDifference = moment().diff(moment.unix(theFirstTrain), 'minutes');
    let remainder = timeDifference % trainFrequency;
    let minutes = trainFrequency - remainder;

    let arrival = moment().add(minutes, 'm').format('hh:mm A');

    $('#train-table > tbody').append("<tr><td>" + trainNames + 
    '</td><td>' + tDestination + 
    "</td><td id='min'>" + trainFrequency + 
    "</td><td id='min'>" + arrival + 
    "</td><td id='min'>" + minutes + 
    "</td<td>" + 
    '</td></td>');
  });

  $('#current-time').append(moment().format('hh:mm A'));