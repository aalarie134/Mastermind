 

class Game {
    constructor(answer){
        this.answer = answer;
        this.essaies = [];
        this.lastclick =0;
    }
    
    get reponse(){
        return this._answer;
    }

    get essaies(){
        return this._essaies;
    }

    get lastClick1(){
        return this.lastclick;
    }

    set answer(x){
        this._answer = x 
    }

    set essaies(x){
        this._essaies = x;
    }

    set lastClick2(x){
        this.lastclick = x;
    }

    addEssaies( x ){
        this.essaies = this.essaies.push(x);
    }
}

// retourne un array de 4 couleur comme reponse du jeu

function randomAnswer() {
 let answer = [];
 for (let i = 0 ; i < 4 ; i++){
     answer[i] = randomColor();
 }

 return answer;

}

// retourne une couleur aleatoire entre les 5 possibles

function randomColor() {
    let x = Math.random();
    if( x <= 0.2)
        return "rgb(112, 214, 255)";
    else if( 0.2 < x && x <= 0.4)
        return "rgb(255, 112, 166)";
    else if( 0.4 < x && x <= 0.6)
        return "rgb(255, 150, 112)";
    else if( 0.6 < x && x <= 0.8)
        return "rgb(255, 215, 112)";
    else
        return "rgb(233, 255, 112)";
}

// choisi la couleur a changer dans les cases des tentatives(en bas)

function chooseColor(x,partie) {
    document.getElementById("colors_dropdown").style.display = "flex";
    partie.lastClick2 = x;
}

//change la couleur des case de la tentative(en bas)

function changeColor(x , color){
    document.getElementById(x).style.backgroundColor = color;
    document.getElementById("colors_dropdown").style.display = "none";

}

//retourne un array avec les 4 couleurs de la tentative

function getColor(){
    let color = [];
    
    for(i=0 ; i<4 ; i++){
        color.push(document.getElementById(`G${i+1}`).style.backgroundColor);
    }
    return color;

}

// s active lorsque l'on pese sur guess, ajoute une tentative dans information avec les bonnes couleurs
// et calcul si la reponse est bonne et les indices a retourner.

function guess(partie){

    let reponse  = getColor();
    console.log(reponse);
    console.log(partie.reponse);
    let indication  = compareColors(reponse,partie.reponse);
    
    const row = document.createElement('tr');
    
    row.classname = "row";

    row.innerHTML = 
    `<tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class = "return">${indication}</td>
    </tr>`
    ;
    document.getElementById("information").appendChild(row);
    let childrow = row.children;
    for(i = 0 ; i < 4 ; i++){
             childrow[i].style.backgroundColor = reponse[i];
    }
   

}

// compare 2 array de 4 couleur et retourne les indices
// x : tentative  ; y : reponse

function compareColors (x,y){
    let perfect = 0;
    let misplaced = 0;
    let countx = countColors(x);
    let county = countColors(y);

    for(i = 0 ; i < 4 ; i ++){
        if(x[i] == y[i])
            perfect += 1 ; 
    }

    if( perfect == 4){
        win();
    }

    for(i = 0 ; i < 5 ; i++){
        if(countx[i] == county[i] && countx[i] > 0)
            misplaced += countx[i];
        else if(countx[i] > county[i] && county[i] > 0)
            misplaced += county[i];
        else if(countx[i] < county[i] && countx[i] > 0)
            misplaced += countx[i];
    }
    misplaced = misplaced - perfect;
    
    return(  perfect +  ' &#x2713 ' + misplaced + ' &#x2715 ');
}

// compte le nombre de chaque couleur dans un array

function countColors(x){
    let count = [0,0,0,0,0];
    for (i = 0 ; i < 4 ; i++){
        if(x[i] == "rgb(112, 214, 255)")
            count[0] += 1;
        if(x[i] == "rgb(255, 112, 166)")
            count[1] += 1;
        if(x[i] == "rgb(255, 150, 112)")
            count[2] += 1;
        if(x[i] == "rgb(255, 215, 112)")
            count[3] += 1;
        if(x[i] == "rgb(233, 255, 112)")
            count[4] += 1;
    }
    return count;
}

//fonction qui s active lors d une victoire
function win(){
    alert("vous avez gagné!!!!");
}

// retourne la reponse de la partie comme une tentative
function giveAnswer(partie){

    const row = document.createElement('tr');
    
    const indication = " voici la réponse !!";

    row.classname = "row";

    row.innerHTML = 
    `<tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class = "return">${indication}</td>
    </tr>`
    ;
    document.getElementById("information").appendChild(row);
    let childrow = row.children;
    for(i = 0 ; i < 4 ; i++){
             childrow[i].style.backgroundColor = partie.reponse[i];
    }



}


//  debut du jeu sur la page 

let partie = new Game(randomAnswer());




