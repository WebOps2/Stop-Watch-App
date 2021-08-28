class Timer{
    constructor(onDuration, startButton, pauseButton){
        this.onDuration = onDuration
        this.startButton = startButton
        this.pauseButton = pauseButton
        this.startButton.addEventListener('click',this.start)
        this.pauseButton.addEventListener('click',this.pause)
        this.circle = document.querySelector('circle')
        this.p = this.circle.getAttribute('r')*2* Math.PI
        this.circle.setAttribute('stroke-dasharray', this.p)
        this.t = 0
        this.btn = document.querySelector('#btn')
        this.btn.style.display = 'none'
    }

    start = ()=>{
        if(this.onStart){
            this.onStart(this.timeRemaining)
        }
        // this.tick
        this.interval = setInterval(this.tick, 50)
    }
    
    pause = ()=>{
        clearInterval(this.interval)
    }

    tick = ()=>{
        // let timeRemaining = parseFloat(this.onDuration.value)
        // this.onDuration.value = timeRemaining - 1
        if(this.timeRemaining === 0.00){
            this.pause()
            if(this.onComplete){
                this.onComplete()
                if(this.timeRemaining == 0.00){
                    this.timeInterval()
                }
            }
        }
        else{
            if(this.onTick){
                this.onTick()
            }
        
            this.timeRemaining = this.timeRemaining - .05
            
        }
        if(this.timeRemaining > 60){
            location.reload()
            alert('error TImer is above 60')
        }
    }

    get timeRemaining(){
        return parseFloat(this.onDuration.value)
    }

    set timeRemaining(time){
        this.onDuration.value = time.toFixed(2)
    }

    onStart(totalDuration){
        duration = totalDuration
    
    }

    onTick(){
        let timeRemaining = this.p/duration * 0.05
         this.t = (this.t - timeRemaining)
        this.circle.setAttribute('stroke-dashoffset', this.t)
        if(this.timeRemaining === duration/2){
            this.circle.setAttribute('stroke', 'yellow')
            this.circle.setAttribute('class', 'transition')
            console.log('Timer has almost completed')
        }
        else if(this.timeRemaining === duration/4){
             this.circle.setAttribute('stroke', 'red')
             this.circle.setAttribute('class', 'transition')
           
        }
        
    }

    timeInterval(){
        setTimeout(() => {
            alert('Would you like to reset timer')
            location.reload()
        }, 1000);
    }

    onComplete(){
        console.log('Timer completed')
    }

  

}

const onDuration = document.querySelector('#duration')
const startButton = document.querySelector('#start')
const pauseButton = document.querySelector('#pause')
// p * timeRemaining / duration - p  
let duration;

const timer = new Timer(onDuration, startButton, pauseButton)