import SippyPup from './SippyPup.js';
import {SippyPupList} from './SippyPupStables.js';

let SippyPupRacersList = []; // Initialize as an empty list
let leaderboardBody; // Declare leaderboardBody at the top
let leaderboardBodyPosition; // Declare leaderboardBody at the top
let startSippyPupRacersList = []; // Initialize as an empty list

leaderboardBody = document.getElementById("leaderboard-body"); // Initialize leaderboardBody
leaderboardBodyPosition = document.getElementById("position-leaderboard-body"); // Initialize leaderboardBody

const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const clearButton = document.getElementById("clear-button");
const getInfoButton = document.getElementById("get-info-button"); // Add getInfoButton
const raceTrack = document.getElementById("race-track");
const addSippyPupButton = document.getElementById("add-sippypup-button");
const addSippyPupModal = document.getElementById("add-sippypup-modal");
const closeModalButton = document.getElementById("close-modal");
const modalContent = addSippyPupModal.querySelector(".modal-content");

document.addEventListener("DOMContentLoaded", function() {
    addSippyPupButton.addEventListener("click", () => {
        // Refresh button states before displaying the modal
        const buttons = modalContent.querySelectorAll(".sippypup-button");
        buttons.forEach((button, index) => {
            const sippyPup = SippyPupList[index];
            button.disabled = SippyPupRacersList.includes(sippyPup);
        });

        addSippyPupModal.style.display = "flex";
    });

    closeModalButton.addEventListener("click", () => {
        addSippyPupModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target.classList.contains("modal-overlay")) {
            addSippyPupModal.style.display = "none";
        }
    });

    // Populate modal with SippyPup images as buttons
    const sippyPupButtonsContainer = document.createElement("div");
    sippyPupButtonsContainer.classList.add("sippypup-buttons-container");


    // Populate the race track with images
    SippyPupList.slice(0, 3).forEach((sippyPup, index) => {
        createSippyPupElements(sippyPup, index);
    });


    SippyPupList.forEach((sippyPup) => {
        const button = document.createElement("button");
        button.classList.add("sippypup-button");

        const img = document.createElement("img");
        img.src = `SippyPups/${sippyPup.imageName}`;
        img.alt = sippyPup.name;
        img.classList.add("sippypup-button-img");

        button.appendChild(img);

        // Disable the button if the SippyPup is already in the list
        button.disabled = SippyPupRacersList.includes(sippyPup);

        button.addEventListener("click", () => {
            console.log(`Selected SippyPup: ${sippyPup.name}`);
            if (!SippyPupRacersList.includes(sippyPup)) {
                createSippyPupElements(sippyPup, SippyPupRacersList.length);
                button.disabled = true; // Disable the button after adding
            } else {
                console.log(`${sippyPup.name} is already in the race.`);
            }
        });

        sippyPupButtonsContainer.appendChild(button);
    });

    modalContent.appendChild(sippyPupButtonsContainer);


    // startSippyPupRacersList = SippyPupRacersList.slice(); // Create a copy of the original list

    startButton.addEventListener("click", startRace);
    resetButton.addEventListener("click", resetRace);
    clearButton.addEventListener("click", clearRace);
});

function createSippyPupElements(sippyPup, index) {
    const pupContainer = document.createElement("div");
    pupContainer.classList.add("pup-container");
    SippyPupRacersList.push(sippyPup); // Add to startSippyPupRacersList
    startSippyPupRacersList.push(sippyPup); // Add to startSippyPupRacersList
    const img = document.createElement("img");
    img.src = `SippyPups/${sippyPup.imageName}`;
    img.alt = sippyPup.name;
    img.classList.add("race-sippyPup");

    // Flip the image if iSlookingRight is false
    if (!sippyPup.isFacingRight) {
        img.style.transform = "scaleX(-1)";
    }

    pupContainer.appendChild(img);
    raceTrack.appendChild(pupContainer);
    sippyPup.img = img; // Assign the image element to the pup object

    // Create leaderboard entry
    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="position" hidden>${index + 1}</td>
        <td class="name">
            <img src="SippyPups/${sippyPup.imageName}" alt="${sippyPup.name}" class="leaderboard-img">
            ${sippyPup.name}
        </td>
        <td class="speed">0 MPH</td>
        <td class="distance">0%</td>
        <td class="time">0.000s</td>
        <td class="actions">
            <button class="remove-button">Remove</button>
        </td>
    `;
    leaderboardBody.appendChild(row);
    sippyPup.leaderboardRow = row;

    // Add event listener to the remove button
    const removeButton = row.querySelector(".remove-button");
    removeButton.addEventListener("click", () => {
        // Remove the SippyPup from the leaderboard and race
        leaderboardBody.removeChild(row);
        SippyPupRacersList = SippyPupRacersList.filter(pup => pup !== sippyPup);
        startSippyPupRacersList = startSippyPupRacersList.filter(pup => pup !== sippyPup);

        // Remove the last entry in leaderboardBodyPosition
        if (leaderboardBodyPosition.lastChild) {
            leaderboardBodyPosition.removeChild(leaderboardBodyPosition.lastChild);
        }

        // Remove the image from the raceTrack
        if (sippyPup.img && sippyPup.img.parentElement) {
            raceTrack.removeChild(sippyPup.img.parentElement);
        }

        console.log(`Removed SippyPup: ${sippyPup.name}`);
    });

    const rowPosition = document.createElement("tr");
    rowPosition.innerHTML = `
        <td class="position ${
            index === 0 ? 'gold' :
            index === 1 ? 'silver' :
            index === 2 ? 'bronze' : ''
        }">${index + 1}</td>
    `;
    leaderboardBodyPosition.appendChild(rowPosition);

    // Flip the leaderboard image if iSlookingRight is false
    const leaderboardImg = row.querySelector(".leaderboard-img");
    if (!sippyPup.isFacingRight) {
        leaderboardImg.style.transform = "scaleX(-1)";
    }
}

function startRace() {
    console.log("Race started!");
    startSippyPupRacersList = SippyPupRacersList.slice(); // Create a copy of the original list

    // Reset positions to the original order
    SippyPupRacersList.forEach((sippyPup, index) => {
        const row = sippyPup.leaderboardRow;
        if (row) {
            row.querySelector(".position").textContent = index + 1;
        }
    });

    // Hide all remove buttons
    document.querySelectorAll(".remove-button").forEach(button => {
        button.style.display = "none";
    });

    SippyPupRacersList.forEach(sippyPup => {
        sippyPup.start();
        sippyPup.onMove = function() {
            updateTimeAndDistance(sippyPup);
            updateLeaderboard();
        };
    });
}

function resetRace() {
    console.log("Race reset!");
    SippyPupRacersList.forEach(sippyPup => {
        sippyPup.reset();
    });

    // Reset the order of the SippyPup racers to the original order
    SippyPupRacersList = startSippyPupRacersList.slice(); // Create a copy of the original list

    // Show all remove buttons
    document.querySelectorAll(".remove-button").forEach(button => {
        button.style.display = "inline-block";
    });

    // Update the leaderboard to reflect the original order
    SippyPupRacersList.forEach((sippyPup, index) => {
        const row = sippyPup.leaderboardRow;
        if (row) {
            row.querySelector(".position").textContent = index + 1;
            row.querySelector(".speed").textContent = "0 MPH";
            row.querySelector(".distance").textContent = "0%";
            row.querySelector(".time").textContent = "0.000s";
            leaderboardBody.appendChild(row); // Move row to the correct position
        }
    });
}

function clearRace() {
    resetRace();

    // Click all remove buttons
    document.querySelectorAll('.remove-button').forEach(button => {
        button.click();
    });

    console.log(SippyPupRacersList, leaderboardBody, startSippyPupRacersList);
}

function updateTimeAndDistance(sippyPup) {
    const row = sippyPup.leaderboardRow;
    if (row) {
        row.querySelector(".speed").textContent = sippyPup.speedDisplay;
        row.querySelector(".distance").textContent = sippyPup.distanceDisplay;
        row.querySelector(".time").textContent = parseFloat(sippyPup.timeDisplay).toFixed(3) + 's';
    }
}

function updateLeaderboard() {
    const sortedList = [...SippyPupRacersList].sort((a, b) => {
        if (parseFloat(a.distanceDisplay) === parseFloat(b.distanceDisplay)) {
            return parseFloat(a.timeDisplay) - parseFloat(b.timeDisplay);
        }
        return parseFloat(b.distanceDisplay) - parseFloat(a.distanceDisplay);
    }); // Sort by distance first, then by time

    if (JSON.stringify(sortedList) !== JSON.stringify(SippyPupRacersList)) {
        SippyPupRacersList = sortedList;

        SippyPupRacersList.forEach((sippyPup, index) => {
            const row = sippyPup.leaderboardRow;
            // Update position
            const currentIndex = parseInt(row.querySelector(".position").textContent) - 1;

            if (currentIndex !== index) {
                // Add animation class for position change
                row.classList.add('position-changed');
                const nextRow = leaderboardBody.children[index];
                leaderboardBody.insertBefore(row, nextRow);
                if (currentIndex > index) {
                    if (!row.classList.contains('move-up-from-bottom') && !row.classList.contains('move-down-from-top')) {
                        row.classList.add('move-up-from-bottom');
                    }
                    if (!nextRow.classList.contains('move-up-from-bottom') && !nextRow.classList.contains('move-down-from-top')) {
                        nextRow.classList.add('move-down-from-top');
                    }
                }
                const animationEndHandler = () => {
                    row.classList.remove('position-changed', 'move-up', 'move-down', 'move-up-from-bottom', 'move-down-from-top');
                    nextRow.classList.remove('position-changed', 'move-up', 'move-down', 'move-up-from-bottom', 'move-down-from-top');
                    row.removeEventListener('animationend', animationEndHandler);
                };
                row.addEventListener('animationend', animationEndHandler);
            }
            row.querySelector(".position").textContent = index + 1;

            // Update speed, distance, and time
            row.querySelector(".speed").textContent = sippyPup.speedDisplay;
            row.querySelector(".distance").textContent = sippyPup.distanceDisplay;
            row.querySelector(".time").textContent =  parseFloat(sippyPup.timeDisplay).toFixed(3) + 's';
        });
    }
}

function getInfo() {
    console.log("Getting SippyPup information...");
    console.table(SippyPupRacersList.map((sippyPup, index) => ({
        Name: sippyPup.name,
        Speed: sippyPup.speedDisplay,
        Distance: sippyPup.distanceDisplay,
        Time: sippyPup.timeDisplay + 's',
        Row: sippyPup.leaderboardRow ? sippyPup.leaderboardRow.outerHTML : 'N/A',
        'Current Index': index,
        Position: sippyPup.leaderboardRow ? sippyPup.leaderboardRow.querySelector(".position").textContent : 'N/A'
    })));
}
