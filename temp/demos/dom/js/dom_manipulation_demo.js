//run the demos
RunDemos();

function RunDemos() {

    let demoNumber = prompt("Enter demo number: ", "1");
    demoNumber = Number.parseInt(demoNumber);
    switch (demoNumber) {
        case 1:
            SetDemoTitle("Manipulates the HTML body element");
            BodyDemo();
            break;

        case 2:
            SetDemoTitle("Select an element using querySelector");
            SelectorInDemo();
            break;

        case 3:
            SetDemoTitle("Select an element using querySelector with AND and OR");
            SelectorAndOrDemo();
            break;

        case 4:
            SetDemoTitle("Select all the descendents of the node matching the selector");
            SelectorAllDemo();
            break;

        case 5:
            SetDemoTitle("Add/remove CSS styling to a DOM element");
            StyleDemo();
            break;

        case 6:
            SetDemoTitle("Add event listeners to a DOM element");
            EventListenerDemo();
            break;

        case 8:
            SetDemoTitle("Perform a batch addition/edit/deletion of elements to the DOM");
            DocumentFragmentDemo();
            break;

        case 8:
            SetDemoTitle("Dynamically add, style and draw to a canvas");
            CanvasDemo();
            break;

        default:
            break;
    }
}

function SetDemoTitle(demoTitle) {
    let title_div = document.querySelector('#demo_title');
    title_div.innerHTML = "<h2><u>" + demoTitle + "</u></h2>";

    //change the line above for this line...
    //title_div.innerText = "<h2><u>" + demoTitle + "</u></h2>";
}

function BodyDemo() {
    let element = document.querySelector('body');
    element.innerText = "This is inner text in the body tag";
    element.style.backgroundColor = "red";
    element.style.backgroundImage = "url('assets/checkerboard.jpg')";
    console.log("Body:\n" + getComputedStyle(element));
}

function SelectorInDemo() {
    //select the first <b> tagged element
    let element = document.querySelector('b');
    element.innerText = "Texted set using query selector(b)";

    //select the first <i> tagged element inside parent <p>
    element = document.querySelector('p > i');
    element.innerText = "Texted set using query selector(p > i)";
}

function SelectorAndOrDemo() {
    //select the first <b> tagged element
    let element = document.querySelector('h2, h3');
    element.innerText = "Headings set using query selector(h2, h3)";
}

function SelectorAllDemo() {
  /*
  try the following combinations: 
    h2
    h2,h3
    h3.description
    h3#some_id_2
    h2+h3
  */
  let headings = document.querySelectorAll('h2');

  for(let h of headings)
        h.style.color = 'blue';
}

function StyleDemo() {
    let element = document.querySelector('#dkit_link');
    element.setAttribute("class", "button"); 
}

function clickMessage(){
    alert("You interacted with the title!");
}
function EventListenerDemo() {
    let element = document.querySelector('#demo_title');

    element.addEventListener("click", clickMessage);

    //we can add multiple listeners to an element
    //element.addEventListener("mouseover", clickMessage);

    //we remove an event by doing the opposite
    //element.removeEventListener("click", clickMessage);
}

function DocumentFragmentDemo() {

    var table = document.querySelector("table#leaderboard_table");
    var df = document.createDocumentFragment();
    for(var i=0; i<5; i++) {
     var td = document.createElement("td");
     var tr = document.createElement("tr");
     td.textContent = i;
     tr.appendChild(td)
     df.appendChild(tr);
    }
    table.appendChild(df);
}

function CanvasDemo() {
    //instanciate it - note how we can very specifically use the id (canvas_parent) and class (game) to uniquely identify the canvas div
    let parentDiv = document.querySelector('#canvas_parent.game');
    let cvs = document.createElement("canvas");
    let ctx = cvs.getContext("2d");

    //style it
    cvs.width = 640; //we can set the width attribute directly
    cvs.setAttribute("height", 480); //or we can set using setAttribute with the attribute name and value
    cvs.setAttribute("style", "background-color: green; border-style: dotted");
    //cvs.style="background-color: rgb(0, 255, 0); border-style: dotted;"; //or we can set the style attribute directly

    //add canvas to the parent - very important - otherwise no canvas on screen!
    parentDiv.appendChild(cvs);

    //use it - draw a rectangle
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(50, 50, 200, 200);

    //use it - draw a circle
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "blue";
    ctx.arc(320, 240, 50, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}
