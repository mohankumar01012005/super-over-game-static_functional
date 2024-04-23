var strikebutton = document.querySelector("#strike")
var resetbutton = document.querySelector("#reset")

var team1score_tag = document.getElementById('score-team1')
var team2score_tag = document.getElementById('score-team2')

var team1wicket_tag = document.getElementById('wicket-team1')
var team2wicket_tag = document.getElementById('wicket-team2')

var strikeaudio = new Audio('http://bit.ly/so-ball-hit')
var gameoveraudio = new Audio("http://bit.ly/so-crowd-cheer")

var team1score = 0
var team2score = 0
var team1wickets = 0
var team2wickets = 0
var team1ballsfaced = 0
var team2ballsfaced = 0
var turn = 1

var possibleoutcomes = [0,1,2,3,4,5,6,'w']

strikebutton.addEventListener('click',strkebuttonclicked)

function strkebuttonclicked(){
    gameover = false
    strikeaudio.pause() //pause the previus playing audio
    strikeaudio.currentTime = 0
    strikeaudio.play()
    var index = Math.floor(Math.random()*possibleoutcomes.length)
    var value = possibleoutcomes[index]
    if (turn==1){
        team1ballsfaced++
        var ball = document.querySelector(`#team1-superover div:nth-child(${team1ballsfaced})`)
        ball.innerHTML = value
        if (value=='w'){
            team1wickets += 1
        }
        else{
            team1score += value
        }
        team1score_tag.innerHTML = team1score
        team1wicket_tag.innerHTML = team1wickets
        if (team1ballsfaced == 6){
            turn = 0
        }
        if (team1wickets >= 2 && team2ballsfaced==0){
            turn = 0
        }else if(team1wickets>=2){
            gameover=true
        }
    }
    else{
        team2ballsfaced++
        var ball = document.querySelector(`#team2-superover div:nth-child(${team2ballsfaced})`)
        ball.innerHTML = value
        if (value=='w'){
            team2wickets += 1
        }
        else{
            team2score += value
        }
        team2score_tag.innerHTML = team2score
        team2wicket_tag.innerHTML = team2wickets
        if(team2ballsfaced >= 6 || team2wickets ==2 || team2score>team1score){
            gameover = true
        }
    }
    if (gameover){
        document.querySelectorAll(".ball").forEach(kalivum => {
            if (kalivum.innerHTML == "") {
                kalivum.innerHTML = "X"
                kalivum.style.color = "black"
                kalivum.style.backgroundColor="gray"
            }
        })
        gameoveraudio.play()
        if (team1score>team2score){
            window.alert('India Wins')
        }
        else if(team1score==team2score){
            window.alert("It's a Tie match")
        }
        else{
            window.alert("Pakisthan Wins")
        }
    }
}




resetbutton.addEventListener('click',resetFunction)
function resetFunction() {
    window.location.reload()
}