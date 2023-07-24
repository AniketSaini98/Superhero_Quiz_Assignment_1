import readline from 'readline-sync';
import chalk from 'chalk';

// Initialize the score
let score = 0;
let userName = ""; // Variable to store user's name

// Array to store high scores
const highScores = [];


// Function to take user name as input
function getUserName() {
  userName = readline.question(chalk.blue("Please enter your name: "));
}


// Define the quiz questions for each level
const levels = {
  level1: [
     {
      question: "Which superhero has a hammer called Mjolnir?",
      answer: "Thor",
    },
    {
      question: "What superhero has a shield made of vibranium?",
      answer: "Captain America",
    },
    {
      question: "Who is known as the Man of Steel?",
      answer: "Superman",
    },
    {
      question: "What superhero is a web-slinger?",
      answer: "Spiderman",
    },
    {
      question: "Which superhero is a king of Wakanda?",
      answer: "Black Panther",
    },
  ],
  level2: [
    {
      question: "Who is the Amazonian princess?",
      answer: "Wonder Woman",
    },
    {
      question: "What superhero is also known as the Dark Knight?",
      answer: "Batman",
    },
    {
      question: "Who is the fastest man alive?",
      answer: "Flash",
    },
    {
      question: "What superhero can shrink to the size of an ant?",
      answer: "Ant-Man",
    },
    {
      question: "Who is a mutant with optic blast powers?",
      answer: "Cyclops",
    },
  ],
  level3: [
    {
      question: "What superhero can control ice and cold?",
      answer: "Iceman",
    },
    {
      question: "Who is the Norse God of Mischief?",
      answer: "Loki",
    },
    {
      question: "What superhero is a green giant?",
      answer: "Hulk",
    },
    {
      question: "Who has a flaming skull and rides a motorcycle?",
      answer: "Ghost Rider",
    },
    {
      question: "What superhero can stretch his body?",
      answer: "Mr. Fantastic",
    },
    {
      question: "Who is the master of the mystic arts?",
      answer: "Doctor Strange",
    },
    {
      question: "What superhero is a member of the Fantastic Four and can turn invisible?",
      answer: "Invisible Woman",
    },
    {
      question: "Who is known for his adamantium claws?",
      answer: "Wolverine",
    },
    {
      question: "What superhero can communicate with sea creatures?",
      answer: "Aquaman",
    },
    {
      question: "Who is the protector of Hell's Kitchen?",
      answer: "Daredevil",
    },
  ],
};


// Function to run the quiz for a specific level
function runQuiz(level) {
  
  const questions = levels[level];

  if (level === "level1") {
    console.log(chalk.yellow(`Welcome to ${chalk.bold.red(level)}! Answer 5 questions right to move to the next level. \n`));
  } else if (level === "level2") {
    console.log(chalk.yellow(`Welcome to ${chalk.bold.red(level)}! Answer 5 more questions right to move to the next level. \n`));
  } else if (level === "level3") {
    console.log(chalk.yellow(`Welcome to ${chalk.bold.red(level)}! Answer 10 more questions to WIN the game. \n`));
  }

  
  for (const questionObj of questions) {
    
    const userAnswer = readline.question(`${chalk.bold.redBright(questionObj.question)} \n `);

    if (userAnswer.toLowerCase() === questionObj.answer.toLowerCase()) {
      console.log(chalk.green("Correct!\n"));
      score++;
    } else {
      console.log(chalk.hex('#FFA500').bold(`Wrong! The correct answer is "${chalk.bold.greenBright(questionObj.answer)}".\n`));
    }

    if (score === 5 && level === "level1") {
      console.log(chalk.bold.green("Congratulations! You have advanced to Level 2!\n"));
      console.log(chalk.redBright("Your Current Score is : " + chalk.bold.green(score)) + "\n");
      return true;
    }

    if (score === 10 && level === "level2") {
      console.log(chalk.green(`Congratulations! You have advanced to Level 3!\n`));
      console.log(chalk.redBright("Your Current Score is : " + chalk.green(score)) + "\n");
      return true;
    }

    if (score === 20 && level === "level3") {
      console.log(chalk.bgGreen.bold("Congratulations! You Won! \n"));
      return true;
    }
  }
}


// Main function to run the quiz levels
function main() {
  
  getUserName(); // Take user name as input

  let level = "level1";

  while (level) {
    const passedLevel = runQuiz(level);

    if (level === "level1" && passedLevel) {
      level = "level2";
    } else if (level === "level2" && passedLevel) {
      level = "level3";
    } else {
      level = null;
    }
  }

  
  // Display user's score and high scores
  console.log(chalk.red("Your Score is : ") + chalk.bold.green(score) + "\n");

  if (highScores.length > 0) {
    console.log(chalk.green("High Scores:") + "\n");

    highScores.forEach((entry, index) => {
      console.log(chalk.green(`${index + 1}. Name: ${entry.name}, Score: ${entry.score}`));
    });
  } else {
    console.log(chalk.yellow("No high scores yet. Be the first one to set a record! \n"));
  }

  
  // Check if user's score is a high score and ask for a screenshot
  if (highScores.length === 0 || score > highScores[highScores.length - 1].score) {
    const isNewHighScore = readline.keyInYN(chalk.blue("\nCongratulations! You've beaten the high score! Do you want to enter your name for the high score list? (Y/N) ") + "\n");
    if (isNewHighScore) {
      highScores.push({ name: userName, score });
      const isScreenshotSent = readline.keyInYN(chalk.blue("Would you like to send a screenshot as proof of your high score? (Y/N) ") + "\n");
      if (isScreenshotSent) {
        console.log(chalk.green("Thank you for sending the screenshot! Your high score will be verified."));
      }
    }
  }
  

  // Ask user to play again
  const playAgain = readline.keyInYN(chalk.blue("Do you want to play again? (Y/N) "));
  if (playAgain) {
    score = 0;
    main();
  } else {
    console.log(chalk.blue("Thank you for playing! Goodbye!"));
  }
}

main();
