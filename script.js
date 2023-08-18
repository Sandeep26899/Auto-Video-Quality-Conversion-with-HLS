const videoElement = document.getElementById('video');

if (Hls.isSupported()) {
  const hls = new Hls();
  hls.loadSource('./videos/playlist.m3u8');
  hls.attachMedia(videoElement);

  function updateVideoQuality() {
    const connectionSpeed = navigator.connection ? navigator.connection.downlink : null;

    console.log('connectionSpeed:', connectionSpeed);

    let qualityLevel = 'high'; // Default to high quality

    if (connectionSpeed && connectionSpeed < 1) {
      qualityLevel = 'low';
    } else if (connectionSpeed && connectionSpeed < 2) {
      qualityLevel = 'medium';
    }

    hls.loadSource(`./videos/${qualityLevel}_quality_video.m3u8`);
  }

  window.addEventListener('connectionchange', updateVideoQuality);
} else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
  videoElement.src = './videos/playlist.m3u8';
}
