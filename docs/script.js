import SippyPup from './SippyPup.js';
import {SippyPupList} from './SippyPupStables.js';

let SippyPupRacersList = SippyPupList;
let leaderboardBody; // Declare leaderboardBody at the top
let startSippyPupRacersList = SippyPupRacersList.slice(); // Create a copy of the original list

document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const resetButton = document.getElementById("reset-button");
    const getInfoButton = document.getElementById("get-info-button"); // Add getInfoButton
    leaderboardBody = document.getElementById("leaderboard-body"); // Initialize leaderboardBody
    const raceTrack = document.getElementById("race-track");

    // Populate the race track with images
    SippyPupRacersList.forEach((sippyPup, index) => {
        const pupContainer = document.createElement("div");
        pupContainer.classList.add("pup-container");

        const img = document.createElement("img");
        img.src = `SippyPups/${sippyPup.imageName}`;
        img.alt = sippyPup.name;
        img.classList.add("race-sippyPup");

        // Flip the image if iSlookingRight is false
        if (!sippyPup.iSlookingRight) {
            img.style.transform = "scaleX(-1)";
        }

        pupContainer.appendChild(img);
        raceTrack.appendChild(pupContainer);
        sippyPup.img = img; // Assign the image element to the pup object

        // Create leaderboard entry
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="position">${index + 1}</td>
            <td class="name">
                <img src="SippyPups/${sippyPup.imageName}" alt="${sippyPup.name}" class="leaderboard-img">
                ${sippyPup.name}
            </td>
            <td class="speed">0</td>
            <td class="distance">0%</td>
            <td class="time">0.000s</td>
        `;
        leaderboardBody.appendChild(row);
        sippyPup.leaderboardRow = row;

        // Flip the leaderboard image if iSlookingRight is false
        const leaderboardImg = row.querySelector(".leaderboard-img");
        if (!sippyPup.iSlookingRight) {
            leaderboardImg.style.transform = "scaleX(-1)";
        }
    });

    startButton.addEventListener("click", startRace);
    resetButton.addEventListener("click", resetRace);
    getInfoButton.addEventListener("click", getInfo); // Add event listener for getInfoButton
});

function startRace() {
    console.log("Race started!");
    startSippyPupRacersList = SippyPupRacersList.slice(); // Create a copy of the original list

    SippyPupRacersList.forEach(sippyPup => {
        sippyPup.start();
        sippyPup.onMove = function() {
            updateTimeAndDistance(sippyPup);
            updateLeaderboard();
        }; // Update leaderboard on move
    });
}

function resetRace() {
    console.log("Race reset!");
    SippyPupRacersList.forEach(sippyPup => {
        sippyPup.reset();
    });

    // Reset the order of the SippyPup racers to the original order
    SippyPupRacersList = startSippyPupRacersList.slice(); // Create a copy of the original list

    // Update the leaderboard to reflect the original order
    SippyPupRacersList.forEach((sippyPup, index) => {
        const row = sippyPup.leaderboardRow;
        if (row) {
            row.querySelector(".position").textContent = index + 1;
            row.querySelector(".speed").textContent = "0";
            row.querySelector(".distance").textContent = "0%";
            row.querySelector(".time").textContent = "0.000s";
            leaderboardBody.appendChild(row); // Move row to the correct position
        }
    });
}

function updateTimeAndDistance(sippyPup) {
    const row = sippyPup.leaderboardRow;
    if (row) {
        row.querySelector(".speed").textContent = sippyPup.speedDisplay;
        row.querySelector(".distance").textContent = sippyPup.distanceDisplay;
        row.querySelector(".time").textContent = sippyPup.timeDisplay + 's';
    }
}

function updateLeaderboard() {
    SippyPupRacersList.sort((a, b) => {
        if (parseFloat(a.distanceDisplay) === parseFloat(b.distanceDisplay)) {
            return parseFloat(a.timeDisplay) - parseFloat(b.timeDisplay);
        }
        return parseFloat(b.distanceDisplay) - parseFloat(a.distanceDisplay);
    }); // Sort by distance first, then by time

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
                row.classList.add('move-up-from-bottom');
                nextRow.classList.add('move-down-from-top');
            } 
            if (currentIndex < index){
                // row.classList.add('move-down');
                // nextRow.classList.add('move-up');
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
        row.querySelector(".time").textContent = sippyPup.timeDisplay + 's';
    });
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
