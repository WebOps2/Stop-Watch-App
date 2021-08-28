class Timer{
    constructor(onDuration, startButton, pauseButton, callBacks){
        this.onDuration = onDuration
        this.startButton = startButton
        this.pauseButton = pauseButton
        if(callBacks){
            this.onStart = callBacks.onStart
            this.onTick = callBacks.onTick
            this.onComplete = callBacks.onComplete
        }
        this.startButton.addEventListener('click',this.start)
        this.pauseButton.addEventListener('click',this.pause)
    }

    start = ()=>{
        if(this.onStart){
            this.onStart(this.timeRemaining)
        }
        this.tick()
        this.interval = setInterval(this.tick, 50)
    }
    
    pause = ()=>{
        clearInterval(this.interval)
    }

    tick = ()=>{
        // let timeRemaining = parseFloat(this.onDuration.value)
        // this.onDuration.value = timeRemaining - 1
        if(this.timeRemaining === 0){
            this.pause()
            if(this.onComplete){
                this.onComplete()
            }
        }
        else{
            if(this.onTick){
                this.onTick(this.timeRemaining)
            }
            this.timeRemaining = this.timeRemaining - 0.05
        }
    }

    get timeRemaining(){
        return parseFloat(this.onDuration.value)
    }

    set timeRemaining(time){
        this.onDuration.value = time.toFixed(2)
    }
}

const onDuration = document.querySelector('#duration')
const startButton = document.querySelector('#start')
const pauseButton = document.querySelector('#pause')

const circle = document.querySelector('circle')
const p = circle.getAttribute('r')*2* Math.PI

circle.setAttribute('stroke-dasharray', p)

let duration;

const timer = new Timer(onDuration, startButton, pauseButton, {
    onStart(totalDuration){
        duration = totalDuration
        console.log('Timer has started')
    },

    onTick(timeRemaining){
        console.log('Timer has started clciking')
        circle.setAttribute('stroke-dashoffset',
            p * timeRemaining / duration - p      
        )
        
    }, 

    onComplete(){
        console.log('Timer completed')
    }
})