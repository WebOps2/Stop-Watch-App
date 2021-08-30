class Timer{
    constructor(onDuration, startButton, pauseButton, editbtn){
        this.onDuration = onDuration
        this.startButton = startButton
        this.pauseButton = pauseButton
        this.editbtn = editbtn
        this.startButton.addEventListener('click',this.start)
        this.pauseButton.addEventListener('click',this.pause)
        this.circle = document.querySelector('circle')
        this.p = this.circle.getAttribute('r')*2* Math.PI
        this.circle.setAttribute('stroke-dasharray', this.p)
        this.t = 0
        this.reloadBtn = document.querySelector('#redo')
        this.editbtn = document.querySelector('#editbtn')
        this.play = document.querySelector('#start')
        this.stop = document.querySelector('#pause')
        this.input = document.querySelector('input')
      
        // })
        this.editbtn.addEventListener('click', ()=>{
            this.person = prompt("Enter a Value", "0");
            if (this.person == null || this.person == "") {
              console.log('User cancelled the prompt.')
              document.querySelector('#editbtn').style.display = 'inline-block'
              document.querySelector('#redo').style.display = 'none'
            } else {
                this.onDuration.value = this.person + '.' + '00'
                this.start()
                this.input.value = this.person
               if(this.person > 1000){
                   this.timeRemaining = 0.00
                   alert('Number is to large')
                   location.reload()
               }
              
            }      
        })

        this.reloadBtn.addEventListener('click', function(){
            location.reload()
        })
    }
   

    start = ()=>{
    
        if(this.timeRemaining < 0.00){
            alert('Number is Negative')
            this.timeRemaining = 0.00
            this.input.value = ''
        }
        else{
            if(this.onStart){
                this.onStart(this.onDuration.value)
            }
            // alert('h')
            this.interval = setInterval(this.tick, 50)
            this.play.style.display = 'none'
            this.stop.style.display = 'inline-block'
            if(this.timeRemaining === 0.00){
                // alert('Input number')
            }
            if(this.timeRemaining != 0.00){
                document.querySelector('#editbtn').style.display = 'none'
                document.querySelector('#redo').style.display = 'inline-block'
            } 
           
        }
      
        
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
            }
        }
        else{
            if(this.onTick){
                this.onTick(this.person)
            }
            this.timeRemaining = this.timeRemaining - .05   
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
        if(this.timeRemaining === this.person/2){
            this.circle.setAttribute('stroke', 'yellow')
            this.circle.setAttribute('class', 'transition')
            console.log('Timer has almost completed')
        }
        else if(this.timeRemaining === this.person/4){
             this.circle.setAttribute('stroke', 'red')
             this.circle.setAttribute('class', 'transition')
           
        }      
    }

    timeInterval(){
        setTimeout(() => {
            alert('Timer is 0, set timer')
            location.reload()
        }, 500);
    }

    onComplete(){
        console.log('Timer completed')
    }

}

const onDuration = document.querySelector('#duration')
const startButton = document.querySelector('#start')
const pauseButton = document.querySelector('#pause')
const cancelButton = document.querySelector('#redo').style.display = 'none'
const editButton = document.querySelector('#editbtn').style.display = 'inline-block'

 document.querySelector('#pause').style.display = 'none'

// p * timeRemaining / duration - p  
let duration;

const timer = new Timer(onDuration, startButton, pauseButton, cancelButton)