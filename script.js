(function () {
    // Encapsulate all variables and functions within the IIFE
    const yesBtn = document.querySelector('.yesBtn');
    const noBtn = document.querySelector('.noBtn');
    const selectDiv = document.querySelector('.select');
    const requestText = document.querySelector('.container h3'); // Get the request text element
    const responseText = document.querySelector('.response-text')
    const cycleMessage = document.querySelector('.cycle-message'); // Get the cycling message element
    const pidginButton = document.querySelector('.pidgin'); // Get the "Change to Pidgin" button

    // Arrays for original and Pidgin messages
    const originalMessages = [
        "I’ll be your best Valentine, just pick Yes!",
        "I promise it’ll be amazing, pick Yes!",
        "You won’t regret it, pick Yes!",
        "I’m waiting for you, pick Yes!",
        "Please, pick Yes!",
        "Make my day, pick Yes!",
        "Be my Valentine, please.",
        "I won’t take no for an answer, pick Yes!",
        "You are my heartbeat, pick Yes!",
        "Say Yes and make me happy!",
        "I believe you can do this, pick Yes!",
        "Are you sure? Pick Yes, please!",
        "Think about it carefully!",
        "Try thinking about it again!",
    ];
    const pidginMessages = [
        "I go be your best Valentine, just pick Yes!",
        "I promise say e go sweet, pick Yes!",
        "You no regret am, pick Yes!",
        "I dey wait for you, pick Yes!",
        "Biko, pick Yes!",
        "Make my day na, pick Yes!",
        "Be my val na, abeg",
        "I no go gree o, pick Yes!",
        "You be my heartbeat, pick Yes",
        "Say Yes, make I happy!",
        "I believe you fit do am, pick Yes!",
        "You sure so? pick Yes abeg!",
        "Think am well well!",
        "Try think am again!",
    ];

    let messageIndex = 0; // Track the current message index
    let isPidgin = false; // Track if Pidgin mode is active
    let isFirstClick = true; // Track if it's the first "No" button click
    let clickCounter = 0; // Track the number of "No" button clicks

    // Function to update the request text and cycling message
    const updateText = function () {
        if (isPidgin) {
            responseText.textContent = "Yes! why you con dey waste time before 💖";
            requestText.innerHTML = `Howfar, you go like be my Val? 🌹 <br> If you get mind, talk NO`;
            if (!isFirstClick) {
                cycleMessage.textContent = pidginMessages[messageIndex + 1]; // Subsequent messages are for cycling
            }
        } else {
            responseText.textContent = "Yes! why did you take so long 💖";
            requestText.innerHTML = `Will you be my valentine? 🌹 <br> I dare you to say NO`;
            if (!isFirstClick) {
                cycleMessage.textContent = originalMessages[messageIndex + 1]; // Subsequent messages are for cycling
            }
        }
    };

    // Function to handle the "No" button click
    const handleNoClick = (function () {
        let scaleFactor = 1.05; // Smaller scale factor (5% increase)

        return function () {
            // Increase the size of the "Yes" button only
            const currentWidth = yesBtn.offsetWidth;
            const currentHeight = yesBtn.offsetHeight;
            yesBtn.style.width = `${currentWidth * scaleFactor}px`;
            yesBtn.style.height = `${currentHeight * scaleFactor}px`;

            // Increment the click counter
            clickCounter++;

            // Swap positions every 2 clicks
            if (clickCounter % 1 === 0) {
                // Check current order and swap
                if (selectDiv.children[0] === noBtn) {
                    selectDiv.insertBefore(yesBtn, noBtn);
                } else {
                    selectDiv.insertBefore(noBtn, yesBtn);
                }
            }

            // Show the cycling message after the first click
            if (isFirstClick) {
                cycleMessage.style.display = "block"; // Show the cycling message
                isFirstClick = false; // Mark that the first click has happened
            }

            // Update the cycling message to the next message
            messageIndex = (messageIndex + 1) % (originalMessages.length - 1); // Cycle through the messages
            updateText();

            // Increase the scale factor for the next click
            scaleFactor *= 1.05; // Continue increasing by 5%
        };
    })();

    const createRainingHearts = function () {
        const heartsContainer = document.querySelector('.hearts-container');

        const createHeart = function () {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.textContent = '❤️'; // Heart emoji
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.animationDuration = `${Math.random() * 2 + 3}s`; // Random fall speed

            heartsContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 10000); // Adjust based on the animation duration
        };

        // Create hearts at regular intervals
        setInterval(createHeart, 150); // Adjust the interval for more/less hearts
    };

    // Function to handle the "Yes" button click
    const handleYesClick = function () {
        const valentineGif = document.querySelector('.valentine-gif');
        valentineGif.style.display = "none";

        selectDiv.style.display = "none";
        requestText.style.display = "none";
        cycleMessage.style.display = "none";

        const responseContainer = document.querySelector('.response-container');
        responseContainer.style.display = "flex";

        createRainingHearts();
    };

    // Function to handle the "Change to Pidgin" button click
    const handlePidginClick = function () {
        isPidgin = !isPidgin; // Toggle Pidgin mode
        pidginButton.textContent = isPidgin ? "Change to English" : "Change to Pidgin"; // Update button text
        updateText(); // Update all text to the current language
    };

    // Attach event listeners
    noBtn.addEventListener('click', handleNoClick);
    yesBtn.addEventListener('click', handleYesClick);
    pidginButton.addEventListener('click', handlePidginClick);

    // Initialize text
    cycleMessage.style.display = "none"; // Hide the cycling message initially
    updateText();
})();