if (window.location.href.includes("sharedfiles/filedetails")) {
  console.log("DOWNLOAD");
  let originalTag = document.querySelector("#SubscribeItemBtn"); 
  let newTag = document.createElement("a"); 
  newTag.innerText = "Download";
  newTag.id = "download-btn";
  wallpaperURL = window.location.href;

  newTag.target = "_blank";
  newTag.className = "btn_green_white_innerfade btn_border_2px btn_medium";
  newTag.style.padding = "10px";
  originalTag.parentNode.replaceChild(newTag, originalTag);


  // Trigger download when button is clicked
  document.getElementById("download-btn").addEventListener("click", () => {
    fetch("https://api.ggntw.com/steam.request", {
      method: "POST",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: wallpaperURL }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Set the color based on the status in the response
        if (data.status === 3) {
          alert("Choose another wallpaper");
        } else {
          console.log(data);
          const archiveUrl = data.url; // Assign the fetched URL here
          console.log(archiveUrl, "sending message to browser");
          browser.runtime.sendMessage({
            action: "download_archive",
            url: archiveUrl,
          });
        }

        // Now send a message to the background script with the URL
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  // Send a message to the background script with the URL
} else if (window.location.href.includes("steamcommunity.com")) {
  const items = document.querySelectorAll(".workshopItem");

  // Prepare an array of promises for all fetch requests
  const fetchPromises = Array.from(items).map((item) => {
    const wpUrl = item.querySelector("a").href;
    const wpText = item.querySelector(".workshopItemTitle");

    // Return the fetch promise
    return fetch("https://api.ggntw.com/steam.request", {
      method: "POST",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: wpUrl }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Set the color based on the status in the response
        if (data.status === 3) {
          wpText.style.color = "red";
        } else {
          wpText.style.color = "green";
          console.log("Changing text", data.url);
        }
      })
      .catch((error) => {
        // Handle any errors
        wpText.style.color = "red";
        console.error("Error:", error);
      });
  });

  // Use Promise.all to process all fetch requests in parallel
  Promise.all(fetchPromises)
    .then(() => {
      console.log("All requests completed");
    })
    .catch((error) => {
      console.error("Some requests failed", error);
    });
}
