import inquirer from 'inquirer';
const scenarios = [
    {
        name: 'intro',
        message: 'You wake up in a dark room. You know that you need to escape from this room. What do you do?',
        choices: [
            { name: 'Look around', nextScenario: 'lookAround' },
            { name: 'Go back to sleep', nextScenario: 'goToSleep' }
        ]
    },
    {
        name: 'lookAround',
        message: 'You can see old cabinet and closed wooden door. What do you do?',
        choices: [
            { name: 'Try to open the door', nextScenario: 'openDoor' },
            { name: 'Search old cabinet', nextScenario: 'searchCabinet' },
        ]
    },
    {
        name: 'goToSleep',
        message: "You went back to sleep. You don't want to escape. Your slumber is eternal.",
        choices: []
    },
    {
        name: 'openDoor',
        message: 'You tried to open the door. The door is locked. Try to find a key. What dou you do?',
        choices: [
            { name: 'Search old cabinet', nextScenario: 'searchCabinet' },
            { name: 'Go back to sleep', nextScenario: 'goToSleep' },
        ]
    },
    {
        name: 'searchCabinet',
        message: 'You searched old cabinet and found old key. What do you do?',
        choices: [
            { name: 'Open the door with a key', nextScenario: 'openDoorWithKey' },
            { name: 'Go back to sleep', nextScenario: 'goToSleep' },
        ]
    },
    {
        name: 'openDoorWithKey',
        message: 'You unlocked the door and can exit a room. What do you do?',
        choices: [
            { name: 'Exit the room', nextScenario: 'exit' },
            { name: 'Go back to sleep', nextScenario: 'goToSleep' },
        ]
    },
    {
        name: 'exit',
        message: 'You enterd a long hallway. What do you do?',
        choices: [
            { name: 'Finish the adventure', nextScenario: 'finish' },
            { name: 'Go back to room', nextScenario: 'goBackToRoom' },
        ]
    },
    {
        name: 'finish',
        message: 'You manage to escape... But maybe you need to comeback..',
        choices: []
    },
    {
        name: 'goBackToRoom',
        message: 'You went back to a room. You see a dark figure next to your bed... What do you do?',
        choices: [
            { name: 'RUN AWAY!', nextScenario: 'finish' },
            { name: 'go back to sleep', nextScenario: 'goToSleep' }
        ]
    }
];
document.getElementById('submit').addEventListener('click', function () {
    const playerChoice = document.getElementById('choices').value;
    handleChoice(playerChoice);
});

const presentScenario = async (scenario) => {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: scenario.message,
            choices: scenario.choices.map(choice => choice.name),
        }
    ]);

    return answers.choice;
};

const startGame = async () => {
    let currentScenario = scenarios.find(scenario => scenario.name === 'intro');

    while (currentScenario) {
        const playerChoice = await presentScenario(currentScenario);
        currentScenario = scenarios.find(scenario => scenario.name === currentScenario.choices.find(choice => choice.name === playerChoice).nextScenario);
    }
    //TODO inventory system
    console.log('Thanks for playing! Goodbye.');
};
startGame();