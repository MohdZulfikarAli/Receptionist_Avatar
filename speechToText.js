const startButton = document.getElementById('startButton');
const helpVideo = document.getElementById('help_video');

// Creating a SpeechRecognition object
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

let result = "";

recognition.lang = 'en-US'; // Set the language for recognition

// Event handler when recognition starts
recognition.onstart = () => {
    // startButton.textContent = 'Listening...';
};


// Event handler when recognition produces a result
recognition.onresult = (event) => {
    result = event.results[0][0].transcript;
    const ans = recognition.stop();
    if(result)
    {
        switchVideo(result);
    }
};


// Event handler when recognition ends
recognition.onend = () => {
    if(!result)
    {
       recognition.start();
    } 
};
function loadVideo()
{
    helpVideo.setAttribute("src","help.mp4");
    helpVideo.load();
}

// Event listener for the button clicks
startButton.addEventListener('click', () => {
    playVideo("help.mp4")
    startButton.style.display = "none"
});

function playVideo(source)
{
    helpVideo.setAttribute("src",source);
    helpVideo.load();
    helpVideo.play();
    helpVideo.onpause = () =>{
        recognition.start();
        result = ""
    }
}

function switchVideo(result)
{
    if(result.toLowerCase() === "who are you")
    {
        playVideo("reception_video.mp4")
    }
    else if(result.toLowerCase() == "can i meet with harry")
    {
        playVideo("harry.mp4")
    }
    else
    {
        playVideo("not understood.mp4")
    }
}
