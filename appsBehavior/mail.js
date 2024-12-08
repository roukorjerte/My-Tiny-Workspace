import { dialogues } from './mailDialogueText.js';

document.addEventListener("DOMContentLoaded", function() {
    const contacts = document.querySelectorAll(".person_contact");
    const placeholder = document.querySelector(".placeholder");
    const placeholderText = document.querySelector(".placeholder_choice")
    const nameTag = document.getElementById("name_tag");
    const nameTagText = document.getElementById("name_tag_text");
    const answerChoice = document.getElementById("answer_choice");

    contacts.forEach(contact => {
      contact.addEventListener("click", function() {
        placeholder.style.display = "none";

        nameTag.classList.remove("invisible_item");
        answerChoice.classList.remove("invisible_item");
        nameTagText.classList.remove("invisible_item");

        const contactName = contact.querySelector(".name").textContent;
        nameTag.querySelector("p").textContent = `Chat with ${contactName}`;
      });
    });

    let timer;
    let launchTime = 0;
    let messageTimer;
    let currentPerson = 'tyler'; // Set the current person dynamically
    let currentMessageIndex = 0; // To keep track of which message we're currently sending
    let answering = false; // To prevent sending the next message before the user answers

    function checkMailIconAndStartTimer() {
        const mailIcon = document.querySelector('.taskbar_icon[data-id="mail"]');
        if (mailIcon) {
            console.log("Mail icon detected. Starting timer..."); // Debug log
            startLaunchTimer();
            clearInterval(mailIconCheckInterval); // Stop the interval once the mail icon is found
        }
    }

    function startLaunchTimer(firstMessageOffset) {
        console.log("Timer starting..."); // Debug log
        launchTime = 0;
        timer = setInterval(() => {
            launchTime++;
            console.log("Launch Time: " + launchTime); // Debug log to check timer progress
            if (launchTime >= 2) {
                clearInterval(timer); // Stop the timer after 2 seconds
                console.log("Timer finished. Starting messages for tyler.");
                startMessagesForPerson(currentPerson); // Start tyler's messages after timer finishes
            }
        }, 1000); // Timer increments every second
    }

    // Function to start sending messages for a specific person
    function startMessagesForPerson(person) {
        const personDialogues = dialogues[person];
        const messages = personDialogues.messages;

        sendMessage(messages[currentMessageIndex]);

        // Start the message interval for subsequent messages
        messageTimer = setInterval(() => {
            if (!answering) { // Only proceed if the user hasn't answered
                currentMessageIndex++;
                if (currentMessageIndex < messages.length) {
                    sendMessage(messages[currentMessageIndex]);
                } else {
                    clearInterval(messageTimer); // Stop the interval once all messages are sent
                    console.log("All messages sent.");
                }
            }
        }, personDialogues.messageInterval * 1000); // Using messageInterval (in seconds)
    }

    // Function to send a message and handle user interaction if the message has options
    function sendMessage(message) {
        // Avoid sending the same message more than once
        if (message.sent) return; // Skip if the message has already been sent
        message.sent = true; // Mark the message as sent

        const messagesContainer = document.getElementById('messages');
        const messageElement = document.createElement('div');
        messageElement.classList.add('message_text', 'from_person');
        messageElement.textContent = message.text;
        messagesContainer.appendChild(messageElement);

        if (message.event) {
            // Show options and wait for the user to choose an option
            displayOptions(message.options);
        } else {
            // If no event, continue automatically after the message interval
            continueMessages();
        }
    }

    // Function to display options for the user to choose from
    function displayOptions(options) {
        const answerChoiceContainer = document.getElementById('answer_choice');
        answerChoiceContainer.classList.remove('invisible_item');
        answerChoiceContainer.innerHTML = ''; // Clear previous options

        options.forEach(option => {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('answer_option');
            optionDiv.textContent = option;
            optionDiv.addEventListener('click', () => handleAnswer(option));
            answerChoiceContainer.appendChild(optionDiv);
        });

        answering = true; // Prevent the next message from being sent until the user answers
    }

    // Function to handle the user's answer to the options
    function handleAnswer(answer) {
        console.log("User chose: " + answer);
        const messagesContainer = document.getElementById('messages');

        // Add the user's answer to the chat
        const userMessageElement = document.createElement('div');
        userMessageElement.classList.add('message_text', 'from_me');
        userMessageElement.textContent = answer;
        messagesContainer.appendChild(userMessageElement);

        // Hide the options after the user answers
        document.getElementById('answer_choice').classList.add('invisible_item');

        answering = false; // Allow the next message to be sent

        // Proceed to the next message after the user has answered
        continueMessages();
    }

    // Function to continue sending messages after the answer is given
    function continueMessages() {
        const personDialogues = dialogues[currentPerson];
        if (currentMessageIndex + 1 < personDialogues.messages.length) {
            setTimeout(() => {
                sendMessage(personDialogues.messages[currentMessageIndex + 1]);
            }, personDialogues.messageInterval * 1000); // Wait for the interval before sending the next message
        }
    }

    // Periodically check for the mail icon every 500ms
    const mailIconCheckInterval = setInterval(checkMailIconAndStartTimer, 500);
});
