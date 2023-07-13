document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const winnerUrl = urlParams.get("winnerUrl");

  if (winnerUrl) {
      // Display the last clicked picture using the winnerUrl
      const imgWinner = document.getElementById("imgWinner");
      imgWinner.src = winnerUrl;
  }

  let roundCounter = 1;
  let arrayCounter = 0;
  const imageUrls = [];
  let winnerUrls = [];
  let zaehlerLinks = 0;
  let zaehlerRechts = 1;
  let zaehlerWinnerLinks = 0;
  let zaehlerWinnerRechts = 1;

  if (window.location.href.includes("index.html")) {
      document.getElementById("cardLeft").addEventListener("click", mouseClick);
      document.getElementById("cardRight").addEventListener("click", mouseClick);
      document.getElementById("restartButton").addEventListener("click", restart);
  } else {
      document.getElementById("restartButton").addEventListener("click", restart);
  }

  fetchRandomImages();

  async function fetchRandomImages() {
      try {
          for (let i = 0; i < 2; i++) {
              let validImageUrl = false;
              let imageUrl;

              while (!validImageUrl) {
                  const response = await fetch('https://dog.ceo/api/breeds/image/random');
                  if (!response.ok) {
                      throw new Error('Failed to fetch random images');
                  }
                  const data = await response.json();
                  if (data.status === "success" && data.message) {
                      imageUrl = data.message;
                      validImageUrl = true;
                  } else {
                      console.error('Invalid image URL:', data);
                  }
              }

              imageUrls.push(imageUrl);
              console.log("URL added:", imageUrl);
          }
          setImage(zaehlerLinks, zaehlerRechts);
      } catch (error) {
          console.error('Failed to fetch random images:', error);
      }
  }

  function setImage(zaehlerLinks, zaehlerRechts) {
      const imgLeft = document.getElementById("imgLeft");
      const imgRight = document.getElementById("imgRight");

      if (imgLeft && imgRight) {
          if (roundCounter >= 9) {
              imgLeft.src = winnerUrls[zaehlerWinnerLinks];
              imgRight.src = winnerUrls[zaehlerWinnerRechts];
          } else {
              imgLeft.src = imageUrls[zaehlerLinks];
              imgRight.src = imageUrls[zaehlerRechts];
          }
      }
  }

  function mouseClick(event) {
      const imgLeft = document.getElementById("imgLeft");
      const imgRight = document.getElementById("imgRight");

      if (event.target === imgLeft) {
          if (roundCounter >= 9 && roundCounter <= 15) {
              winnerUrls[arrayCounter] = imgLeft.src;
              roundCounter++;
              arrayCounter++;
              zaehlerWinnerLinks += 2;
              zaehlerWinnerRechts += 2;
              document.getElementById("rounds").innerHTML = "Round " + roundCounter + " / 15";
              console.log(roundCounter);
              if (roundCounter <= 15) {
                  roundOf8to15();
              } else {
                  console.log("Game finished");
                  winnerScreen();
                  // You can perform additional actions when the game is finished
              }
          } else {
              winnerUrls[arrayCounter] = imgLeft.src;
              console.log("Left image clicked");
              roundCounter++;
              arrayCounter++;
              zaehlerLinks += 2;
              zaehlerRechts += 2;
              document.getElementById("rounds").innerHTML = "Round " + roundCounter + " / 15";
              console.log(roundCounter);
              fetchRandomImages(zaehlerLinks, zaehlerRechts);
          }
      }

      if (event.target === imgRight) {
          if (roundCounter >= 9 && roundCounter <= 15) {
              winnerUrls[arrayCounter] = imgRight.src;
              roundCounter++;
              arrayCounter++;
              zaehlerWinnerLinks += 2;
              zaehlerWinnerRechts += 2;
              document.getElementById("rounds").innerHTML = "Round " + roundCounter + " / 15";
              console.log(roundCounter);
              if (roundCounter <= 15) {
                  roundOf8to15();
              } else {
                  console.log("Game finished");
                  winnerScreen();
                  // You can perform additional actions when the game is finished
              }
          } else {
              winnerUrls[arrayCounter] = imgRight.src;
              console.log("Right image clicked");
              roundCounter++;
              arrayCounter++;
              zaehlerLinks += 2;
              zaehlerRechts += 2;
              document.getElementById("rounds").innerHTML = "Round " + roundCounter + " / 15";
              console.log(roundCounter);
              fetchRandomImages(zaehlerLinks, zaehlerRechts);
          }
      }
  }

  function roundOf8to15() {
      const imgLeft = document.getElementById("imgLeft");
      const imgRight = document.getElementById("imgRight");

      imgLeft.src = winnerUrls[zaehlerWinnerLinks];
      imgRight.src = winnerUrls[zaehlerWinnerRechts];
  }

  function winnerScreen() {
      // Save the winnerUrls array or perform any additional actions

      // Get the last clicked picture URL
      const lastClickedPictureUrl = winnerUrls[arrayCounter - 1];

      // Open winner.html and pass the last clicked picture URL as a parameter
      const urlParams = new URLSearchParams();
      urlParams.append("winnerUrl", lastClickedPictureUrl);
      window.location.href = "winner.html?" + urlParams.toString();
  }

  function restart() {
      window.location.href = "index.html";
  }
  document.addEventListener("mouseover", mouseOver);

  function mouseOver(event) {
    if (event.target.id === "cardLeft") {
        console.log("Mouse is over the left card");
    } else if (event.target.id === "cardRight") {
        console.log("Mouse is over the right card");
    }
  }

  if (window.location.href.includes("index.html")) {
    document.getElementById("cardLeft").addEventListener("mouseover", function() {
      this.style.backgroundColor = "green";
      document.getElementById("cardRight").style.backgroundColor = "red";
    });

    document.getElementById("cardLeft").addEventListener("mouseout", function() {
      this.style.backgroundColor = "white";
      document.getElementById("cardRight").style.backgroundColor = "white";
    });

    document.getElementById("cardRight").addEventListener("mouseover", function() {
      this.style.backgroundColor = "green";
      document.getElementById("cardLeft").style.backgroundColor = "red";
    });

    document.getElementById("cardRight").addEventListener("mouseout", function() {
      this.style.backgroundColor = "white";
      document.getElementById("cardLeft").style.backgroundColor = "white";
    });
  }
});