RunDemos();

function RunDemos(){
    Demo1();
    Demo2();
    Demo3();
}

function Demo1(){
    let cvs = document.querySelector("#canvas-top.game-canvas");
    let ctx = cvs.getContext("2d");

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(50, 50, 200, 200);
}

function Demo2(){
    //to do....
}

function Demo3(){
    //to do....
}
