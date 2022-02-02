// tab bar

const tabItems = document.getElementsByClassName("tab-item");
const tabBackground = document.getElementsByClassName("tab-bar-selected")[0];



function NewTabSelected(item, i)
{
    var transfromAmount = i * 6.7;
    tabBackground.style = "transform: translateX(" + transfromAmount + "rem);";
    var selectedTabItem = document.getElementsByClassName("active")[0];

    if(item == selectedTabItem) return;

    selectedTabItem.classList.remove("active");
    item.classList.add("active");
    selectedTabItem = item;
}

for(let i = 0;i < tabItems.length;i++)
{
    tabItems[i].addEventListener("click",() => NewTabSelected(tabItems[i],i));
}

// end tab bar


// slider

const slider = document.getElementsByClassName("slider")[0];
const handle = slider.getElementsByClassName("handle")[0];
const sliderColor = slider.getElementsByClassName("color")[0];
const sliderValue = slider.getElementsByClassName("tool-tip")[0];
var IsMouseDown = false;


slider.addEventListener("mousedown",(event) => SliderMouseDown(event));
handle.addEventListener("mousedown",() => HandleMouseDown());
document.addEventListener("mouseup",() => HandleMouseUp());
document.addEventListener("mousemove",(event) => MouseMove(event))


function SliderMouseDown(event)
{
    if(event.target == slider)
    {
        var positionX = event.layerX - 10;
        var sliderPosition = event.layerX - 15;
        var sliderColorWidth = ( (positionX + 10) / 220) * 100;

        handle.style = "left: " + positionX + "px;";
        sliderValue.style = "left: " + sliderPosition + "px;";
        sliderValue.innerHTML = Math.round(sliderColorWidth) + "%";
        sliderColor.style = "width: " + sliderColorWidth + "%;";
    }
}


function HandleMouseDown()
{
    IsMouseDown = true;
}

function HandleMouseUp()
{
    IsMouseDown = false;
}

function MouseMove(event)
{
    if(IsMouseDown)
    {
        var positionX = event.clientX - slider.getClientRects()[0].x - 10;
        
        if(positionX > -10 && positionX < 210)
        {
            var sliderPosition = event.clientX - slider.getClientRects()[0].x - 15;
            var sliderColorWidth = ( (positionX + 10) / 220) * 100;

            sliderValue.style = "left: " + sliderPosition + "px;";
            sliderValue.innerHTML = Math.round(sliderColorWidth) + "%";
            handle.style = "left: " + positionX + "px;";
            sliderColor.style = "width: " + sliderColorWidth + "%;";
        }
    }
}



// end slider


// play pause

const playContainer = document.getElementsByClassName("play")[0];
const playButton = playContainer.getElementsByTagName("label")[0];
const playHandle = playContainer.getElementsByTagName("input")[0];

playButton.addEventListener("mouseup",() => ChangeIcon());

function ChangeIcon()
{
    var playIcon = playButton.getElementsByTagName("i")[0];
    var pauseButton = playButton.getElementsByTagName("i")[1];
    
    setTimeout(() => {
        if(!playHandle.checked)
        {
            playIcon.classList.add("hidden");
            pauseButton.classList.remove("hidden");
        }else
        {
            playIcon.classList.remove("hidden");
            pauseButton.classList.add("hidden");
        }
    }, 30);
}

// end play pause

// clock

const hours = document.getElementsByClassName("hours")[0];
const minutes = document.getElementsByClassName("minutes")[0];
const seconds = document.getElementsByClassName("seconds")[0];

function clock()
{
    let time = new Date();
    let h = (time.getHours() % 12) + time.getMinutes() / 59;
    let m = time.getMinutes();
    let s = time.getSeconds(); 
  
    h *= 30;
    m *= 6;
    s *= 6;
  
    Rotation(hours, h);
    Rotation(minutes, m);
    Rotation(seconds, s);
  
    setTimeout(clock, 500);
}

function Rotation(target, val) {
    target.style.transform =  `rotate(${val}deg)`;
  }
  
  window.onload = clock();


// end clock