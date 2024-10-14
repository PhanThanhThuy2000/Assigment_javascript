var x = document.getElementById('demo');

function getLocation() {

    if (navigator.geolocation) { // kiểm tra xem có hỗ trợ trinh duyệt không

        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "trình duyệt không hỗ trợ"
    }
}

function showPosition(position) { // in ra kinh độ và vĩ độ
    x.innerHTML =
        "Vĩ độ: " + position.coords.latitude + "<br>" +
        "Kinh độ: " + position.coords.longitude + "<br>" +
        "Độ chính xác: " + position.coords.accuracy + " mét";
}
var player = document.getElementById("myplayer");

function playPause() {
    if (player.paused) { // kiểm tra video có tạm dừng không
        player.play(); // nếu đang tạm dừng thì cho chạy
    } else {
        player.pause(); // nếu chạy thì cho dừng
    }
}

function stopVideo() {
    player.pause(); // dừng video
    if (player.currentTime) { // nếu video đang phát tua lại video về 0s 
        player.currentTime = 0;
    }
}

function replayVideo() {
    player.currentTime = 0; // nếu video đang phát tua lại video về 0s
    player.play(); // chạy video
}

function increaseVolume() {
    if (player.volume < 1) //âm thanh nhỏ hơn 1
        player.volume = parseFloat(player.volume + 0.1).toFixed(1); //tăng âm lượng lên 0.1
}

function decreaseVolume() {
    if (player.volume > 0) // lơn hơn 0
        player.volume = parseFloat(player.volume - 0.1).toFixed(1); // giảm âm lượng đi 1

}

function muteVolume() { // tăt âm
    if (player.muted) {
        player.muted = false;
    } else {
        player.muted = true;
    }
}