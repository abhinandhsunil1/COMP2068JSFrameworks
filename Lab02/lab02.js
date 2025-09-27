const prompt = require("prompt");
prompt.start();

// Ask user for input
prompt.get(["userinput"], function (err, result) {
  if (err) {
    console.error(err);
    return;
  }

  // Generate computer selection using Math.random()
  let randomnumber = Math.random();
  let computerchoose = "";

  if (randomnumber <= 0.34) {
    computerchoose = "PAPER";
  } else if (randomnumber <= 0.67) {
    computerchoose = "SCISSORS";
  } else {
    computerchoose = "ROCK";
  }
  console.log("User chose: " + userinput);
  console.log("Computer chose: " + computerchoose);

  // Decide who win
  if (userinput === computerchoose) {
    console.log("It's a tie");
  } else if (
    (userinput === "ROCK" && computerchoose === "SCISSORS") ||
    (userinput === "PAPER" && computerchoose === "ROCK") ||
    (userinput === "SCISSORS" && computerchoose === "PAPER")
  ) {
    console.log("User Wins");
  } else {
    console.log("Computer Wins");
  }
});