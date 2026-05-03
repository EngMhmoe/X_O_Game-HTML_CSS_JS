let title = document.getElementById('runCod');

let turnMode = 'x';

function Games(id){
    let element = document.getElementById(id);

    if(turnMode == 'x' && element.innerHTML == ''){
        element.innerHTML = 'X';
        element.style.background = 'rgb(131, 1, 125)';
        element.style.color = 'rgb(163, 253, 74)';

        turnMode = 'o';
        title.innerHTML = 'O';
        title.style.color = 'wheat';
    }

    else if(turnMode == 'o' && element.innerHTML == ''){
        element.innerHTML = 'O';
        element.style.background = 'rgb(51, 112, 244)';
        element.style.color = 'wheat';

        turnMode = 'x'
        title.innerHTML = 'X'
        title.style.color = 'rgb(163, 253, 74)';
    }
    winner();
}












let winners = [];
function winner(){
    for(let i = 1; i<10; i++){
        winners[i] = document.getElementById('itam' + i).innerHTML;
    }

    if(winners[1] == winners[2]  &&  winners[2] == winners[3]  &&  winners[3] != ''){
        start(1,2,3);
    }        
    else if(winners[4] == winners[5]  &&  winners[5] == winners[6]  &&  winners[6] != ''){
        start(4,5,6);
    }

    else if(winners[7] == winners[8]  &&  winners[8] == winners[9]  &&  winners[9] != ''){
        start(7,8,9);
    }

    else if(winners[1] == winners[4]  &&  winners[4] == winners[7]  &&  winners[4] != ''){
        start(1,4,7);
    }

    else if(winners[2] == winners[5]  &&  winners[5] == winners[8]  &&  winners[5] != ''){
        start(2,5,8);
    }

    else if(winners[3] == winners[6]  &&  winners[6] == winners[9]  &&  winners[6] != ''){
        start(3,6,9);
    }

    else if(winners[1] == winners[5]  &&  winners[5] == winners[9]  &&  winners[5] != ''){
        start(1,5,9);
    }

    else if(winners[3] == winners[5]  &&  winners[5] == winners[7]  &&  winners[5] != ''){
        start(3,5,7);
    }
}

function start(num1,num2,num3){
    let element1 = document.getElementById('itam' + num1);
    element1.style.background = 'black';
    element1.style.color = 'red';
    element1.style.border = '3px solid rgb(253, 0, 190)';

    let element2 = document.getElementById('itam' + num2);
    element2.style.background = 'black';
    element2.style.color = 'red';
    element2.style.border = '3px solid rgb(253, 0, 190)';

    let element3 = document.getElementById('itam' + num3);
    element3.style.background = 'black';
    element3.style.color = 'red';
    element3.style.border = '3px solid rgb(253, 0, 190)';


    title.innerHTML = `${winners[num1]} winner`;
    setInterval(function(){title.innerHTML += `.`},1000);
    setTimeout(function(){location.reload()},4000);
}