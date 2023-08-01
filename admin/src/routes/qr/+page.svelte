<script lang=ts>
  import qr from "qr-scanner";
    import { writable } from "svelte/store";
  
  let isValid = writable(false)
  let videoElement: HTMLVideoElement
  let tracks: MediaStreamTrack[] = []
    
  async function startCapture() {
    
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { frameRate: 30 },  });
      videoElement.srcObject = stream;
      tracks.push(...stream.getVideoTracks())
      // const res = await createImageBitmap( videoElement )
      videoElement.addEventListener('loadedmetadata', async e=>{
        videoElement.play()
        
        const qrScanner = new qr(
          videoElement,
          result => $isValid = true,
          err => $isValid = false,
          // { returnDetailedScanResult: true },
        );
        await qrScanner.start()
        console.log("stater")
      })
      
      
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }
  
  
  
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video src="" bind:this={videoElement}></video>
<button on:click={startCapture}>start</button>
<button on:click={()=>{
  videoElement.pause()
  tracks[0].stop()
  tracks = []
}}>stop</button>
<br>
<h1 class="text-2xl font-bold {$isValid ? "text-green-500" : "text-red-500"}">{$isValid ? "OK" : "no"}</h1>