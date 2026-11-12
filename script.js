
const usernameInput = document.querySelector("#username");
const searchBtn = document.querySelector("#searchBtn");
const profile = document.querySelector("#profile");
const message = document.querySelector("#message");

async function getProfile() {

    const username = usernameInput.value.trim();

    if (username === "") {
        message.textContent = "Please enter a username";
        profile.innerHTML = "";
        return;
    }

    try {

        // Show loading message
        message.textContent = "Loading...";
        profile.innerHTML = "";

        // Fetch API data
        const response = await fetch(
            `https://api.github.com/users/${username}`
        );

        // Check HTTP response
        if (!response.ok) {
            throw new Error("User not found!");
        }

        // Convert JSON into JavaScript object
        const data = await response.json();

        // Display profile data
        profile.innerHTML = `
            <div class="profile-card">

                <img src="${data.avatar_url}" alt="Profile">

                <h2>${data.name || data.login}</h2>

                <p class="bio">
                    ${data.bio || "No bio available"}
                </p>

                <p>Location: ${data.location || "Not available"}</p>

                <div class="stats">

                    <div>
                        <strong>${data.followers}</strong>
                        <span>Followers</span>
                    </div>

                    <div>
                        <strong>${data.following}</strong>
                        <span>Following</span>
                    </div>

                    <div>
                        <strong>${data.public_repos}</strong>
                        <span>Repositories</span>
                    </div>

                </div>

                <a class="profile-link"
                   href="${data.html_url}"
                   target="_blank">
                   View GitHub Profile
                </a>

            </div>
        `;

        message.textContent = "";

    } catch (error) {

        message.textContent = error.message;
        profile.innerHTML = "";

    }
}

searchBtn.addEventListener("click", getProfile);
