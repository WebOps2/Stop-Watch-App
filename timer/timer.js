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
        this.play = document.querySelector('#start')
        this.stop = document.querySelector('#pause')
        this.input = document.querySelector('input')
        this.input.addEventListener('keypress',(e) =>{
            if(e.key === 'Enter'){
                this.onDuration.value = this.input.value
            }
           
        })
    }

    start = ()=>{
        
        if(this.input.value === ''){
            alert('Input Number')
        }
        else{
            if(this.onStart){
                this.onStart(this.onDuration.value)
            }

            this.interval = setInterval(this.tick, 50)
        this.play.style.display = 'none'
        this.stop.style.display = 'inline-block'
        }
        // this.tick
        
   
    }

    
    
    pause = ()=>{
        clearInterval(this.interval)
        this.play.style.display = 'inline-block'
        this.stop.style.display = 'none'

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
                this.onTick(this.input.value)
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

    onTick(num){

        if(this.timeRemaining == num){
            this.time = this.p/num * 0.05  
          }
    
      
         this.t = (this.t - this.time)
        this.circle.setAttribute('stroke-dashoffset', this.t)
        if(this.timeRemaining === this.input.value/2){
            this.circle.setAttribute('stroke', 'yellow')
            this.circle.setAttribute('class', 'transition')
            console.log('Timer has almost completed')
        }
        else if(this.timeRemaining === this.input.value/4){
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

 document.querySelector('#pause').style.display = 'none'


// p * timeRemaining / duration - p  
let duration;

const timer = new Timer(onDuration, startButton, pauseButton)