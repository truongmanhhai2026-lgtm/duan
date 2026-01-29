document.addEventListener("DOMContentLoaded", () => {
    const scene = document.querySelector('a-scene');
    const loader = document.getElementById('loader');
    const target = document.getElementById('mytarget');
    const audio = document.getElementById('narration');
    const soundBtn = document.getElementById('sound-btn');
    const scanFrame = document.querySelector('.scan-frame');

    let isAudioEnabled = false;

    // 1. Xử lý sự kiện MindAR đã sẵn sàng
    scene.addEventListener("arReady", (event) => {
        console.log("AR System Ready");
        // Ẩn màn hình loading
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    });

    // 2. Xử lý lỗi AR (Camera bị chặn hoặc lỗi thiết bị)
    scene.addEventListener("arError", (event) => {
        loader.innerHTML = '<p style="color:red">Lỗi: Không thể truy cập Camera.</p>';
    });

    // 3. Xử lý nút bật/tắt âm thanh
    soundBtn.addEventListener('click', () => {
        isAudioEnabled = !isAudioEnabled;
        if (isAudioEnabled) {
            soundBtn.innerHTML = "🔊 Đang bật";
            soundBtn.style.background = "#D4AF37";
            soundBtn.style.color = "black";
            // Nếu đang nhìn thấy target thì phát luôn
            if (!audio.paused) audio.play(); 
        } else {
            soundBtn.innerHTML = "🔇 Đã tắt";
            soundBtn.style.background = "transparent";
            soundBtn.style.color = "white";
            audio.pause();
        }
    });

    // 4. Khi tìm thấy ảnh (Target Found)
    target.addEventListener("targetFound", event => {
        console.log("Target Found");
        scanFrame.style.borderColor = "#D4AF37"; // Đổi màu khung quét thành vàng
        
        if (isAudioEnabled) {
            audio.play().catch(e => console.log("Audio play error:", e));
        }
    });

    // 5. Khi mất ảnh (Target Lost)
    target.addEventListener("targetLost", event => {
        console.log("Target Lost");
        scanFrame.style.borderColor = "rgba(255,255,255,0.3)"; // Trả lại màu trắng
        audio.pause();
        audio.currentTime = 0; // Reset lại từ đầu (tuỳ chọn)
    });
});