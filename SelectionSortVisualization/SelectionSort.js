var oscStarted = false;

function beep(lengthInMs, frequencyInHerz){

    if(!oscStarted){
        oscillator.start();    
        oscStarted = true;
    }

    oscillator.frequency.setValueAtTime(frequencyInHerz, audiocontext.currentTime);
    oscillator.connect(audiocontext.destination);

    setTimeout(function () {
        oscillator.frequency.setValueAtTime(0, audiocontext.currentTime);
        oscillatorStarted = false;
    }, lengthInMs);
}

function selectionSort(){
    audiocontext.resume();
    // Canvas

    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.backgroundColor = "cornflowerblue";

    // Canvas Context

    var context = canvas.getContext("2d");
    context.fillStyle = "lightgrey";

    // Array

    var numberCount = 200;
    var arrayToSort = new Array(numberCount);
    for(var i = 0; i < arrayToSort.length; i++){
        arrayToSort[i] = Math.random() * (numberCount + 35);
    }

    // First Draw

    var distanceBetweenColumns = 2, 
        columnHeightToMultiply = (window.innerHeight-60)/(numberCount+35), 
        leftDistance = 30,
        columnWidth = (((window.innerWidth - leftDistance*2) - (distanceBetweenColumns*arrayToSort.length))/arrayToSort.length),  
        topDistance = 25;

    for(var i = 0; i < arrayToSort.length; i++){
        context.fillRect((columnWidth+distanceBetweenColumns)*i + leftDistance, topDistance, columnWidth, columnHeightToMultiply*arrayToSort[i]);
    }
    
    // Selection Sort    

    var i = 0;
    var finishInterval;
    const sortInterval = setInterval(

        function(){
            context.clearRect(0, 0, canvas.width, canvas.height);
            var min = i;
            for(var i2 = i+1; i2 < arrayToSort.length; i2++){
                if(arrayToSort[i2] < arrayToSort[min]){
                    min = i2; 
                }
            }
            if(i != min){
                var temp = arrayToSort[i];
                arrayToSort[i] = arrayToSort[min];
                arrayToSort[min] = temp;


                // Redraw
                for(var d = 0; d < arrayToSort.length; d++){
                    if(d != min & d != i){
                        context.fillStyle="grey";
                    }
                    else if(d == min){
                        context.fillStyle="orange";
                    }
                    else if(d == i){
                        context.fillStyle="lightgreen";
                    }
                    
                    context.fillRect((columnWidth+distanceBetweenColumns)*d + leftDistance, topDistance, columnWidth, columnHeightToMultiply*arrayToSort[d]);
                }        
            }
            i++;

            if(i >= arrayToSort.length-1){

                for(var d = 0; d < arrayToSort.length; d++){
                    context.fillStyle="grey";
                    context.fillRect((columnWidth+distanceBetweenColumns)*d + leftDistance, topDistance, columnWidth, columnHeightToMultiply*arrayToSort[d]);
                }   
                
                var d2 = 0;

                finishInterval = setInterval(function(){
                    
                    context.fillStyle="lightgreen";
                    d2--;
                    context.fillRect((columnWidth+distanceBetweenColumns)*d2 + leftDistance, topDistance, columnWidth, columnHeightToMultiply*arrayToSort[d2]);
                    
                    context.fillStyle="green";
                    d2++;
                    context.fillRect((columnWidth+distanceBetweenColumns)*d2 + leftDistance, topDistance, columnWidth, columnHeightToMultiply*arrayToSort[d2]);
                    

                    if(d2 < arrayToSort.length){
                        d2++;
                        beep(20, Math.abs(Math.round(arrayToSort[d2] + 110)));
                    }
                    else{
                        clearInterval(finishInterval);
                        oscillator.stop();
                        oscillator.disconnect();
                    }
                },25);

                
                clearInterval(sortInterval);
            }

            beep(100, Math.abs(Math.round(arrayToSort[i-1] + 110)));
            
        }, 
        150);

}