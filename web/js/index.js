/**
 * Created by guyuqing on 2017/5/14.
 */
window.onload = function () {
    drawRect();
    addChessClick();
}

function getEventPosition(ev){
    var x, y;
    if (ev.layerX || ev.layerX == 0) {
        x = ev.layerX;
        y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
        x = ev.offsetX;
        y = ev.offsetY;
    }
    return {x: x, y: y};
}

function drawRect() {
    //创建棋盘背景
    var canvas = document.getElementById("GoBangCanvas");
    var context = canvas.getContext("2d");
    context.fillStyle = '#ebddb8';
    context.fillRect(0, 0, 1200, 768);
    //标题
    context.fillStyle = '#00f';
    context.font = '40px Arial';
    context.strokeText('五子棋', 405, 50);
    //新游戏
    context.strokeRect(990, 140, 120, 30);
    context.fillStyle = '#00f';
    context.font = '25px Arial';
    context.strokeText('再来一局', 1000, 165);
    //游戏说明
   /* context.fillStyle = '#00f';
    context.font = '15px Arial';
    context.strokeText('游戏规则：玩家执黑色', 780, 200);
    context.strokeText('棋子先手，电脑执白色棋子', 750, 220);
    context.strokeText('后手，任何一方形成五子连', 750, 240);
    context.strokeText('珠，游戏终止。', 750, 260);*/


    //棋盘纵横线
    //画边框
    context.beginPath();
    context.lineWidth = 3;
    context.strokeRect(170,70,580,580);
    context.closePath();
    context.stroke();
    //画线
    for (var i = 1; i < 16; i++) {
        context.beginPath();
        context.lineWidth = 2;
        context.moveTo(40 * i+140, 80);
        context.lineTo(40 * i+140, 640);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.lineWidth = 2;
        context.moveTo(180, 40 * i+40);
        context.lineTo(740, 40 * i+40);
        context.closePath();
        context.stroke();
    }
    //画圆
    context.beginPath();
    context.arc(40*8+140, 40*8+40, 6, 0, 2*Math.PI, true);//中心圆
    context.fillStyle="#000009";
    context.fill();
    context.closePath();
    context.stroke();

    context.beginPath();
    context.arc(40*4+140, 40*4+40, 6, 0, 2*Math.PI, true);//左上角圆
    context.fillStyle="#000009";
    context.fill();
    context.closePath();
    context.stroke();

    context.beginPath();
    context.arc(40*12+140, 40*4+40, 6, 0, 2*Math.PI, true);//右上角圆
    context.fillStyle="#000009";
    context.fill();
    context.closePath();
    context.stroke();

    context.beginPath();
    context.arc(40*4+140, 40*12+40, 6, 0, 2*Math.PI, true);//左下角圆
    context.fillStyle="#000009";
    context.fill();
    context.closePath();
    context.stroke();

    context.beginPath();
    context.arc(40*12+140, 40*12+40, 6, 0, 2*Math.PI, true);//右下角圆
    context.fillStyle="#000009";
    context.fill();
    context.closePath();
    context.stroke();
}
var num = 0;
function addChessClick() {
    var canvas = document.getElementById("GoBangCanvas");
    var context = canvas.getContext("2d");
    canvas.addEventListener('click', function(e){
        var pos = getEventPosition(e);
        $.ajax({
            url:"/GobangService/src/ChessPoint",
            type:'POST',
            dataType: 'jsonp',
            data:{
                point:pos,
                color:num%2
            },
            jsonp: "callbackparam",
            success: function (data) {
                if (data.code == "1000") {
                    alert("success");
                }else {
                    alert(data.message);
                }
            }
        });
    }, false);
}