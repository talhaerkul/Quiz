// OOP: Nesne Tabanlı Programlama

function Soru(soruMetni, cevapSecenekleri, dogruCevap) {
    this.soruMetni = soruMetni;
    this.cevapSecenekleri = cevapSecenekleri;
    this.dogruCevap = dogruCevap;
}

Soru.prototype.cevabiKontrolEt = function(cevap) {
    return cevap === this.dogruCevap
}

let soru1 = new Soru("Hangisi javascript paket yönetim uygulasıdır?", { a: "Node.js", b: "Typescript", c: "Npm" }, "c");
let soru2 = new Soru("Hangisi .net paket yönetim uygulasıdır?", { a: "Node.js", b: "Nuget", c: "Npm" }, "b");

let sorular = [
    new Soru("1-Hangisi javascript paket yönetim uygulasıdır?", { a: "Node.js", b: "Typescript", c: "Npm" }, "c"),
    new Soru("2-Hangisi javascript paket yönetim uygulasıdır?", { a: "Node.js", b: "Typescript", c: "Npm" }, "c"),
    new Soru("3-Hangisi javascript paket yönetim uygulasıdır?", { a: "Node.js", b: "Typescript", c: "Npm" }, "c"),
    new Soru("4-Hangisi javascript paket yönetim uygulasıdır?", { a: "Node.js", b: "Typescript", c: "Npm" }, "c")
];

function Quiz(sorular) {
    this.sorular = sorular;
    this.soruIndex = 0;
}

Quiz.prototype.soruGetir = function() {
    return this.sorular[this.soruIndex];
}

const quiz = new Quiz(sorular);

document.querySelector(".btn_start").addEventListener("click", function() {
    if (quiz.sorular.length != quiz.soruIndex) {
        document.querySelector(".quiz_box").classList.add("active");
        soruGoster(quiz.soruGetir());
        soruSayisiniGoster(quiz.soruIndex+1,quiz.sorular.length);
        document.querySelector(".next_btn").classList.remove("show");
    } else {
        console.log("quiz bitti");
    }
})


document.querySelector(".next_btn").addEventListener("click", function(){
    if (quiz.sorular.length != quiz.soruIndex+1) { 
        quiz.soruIndex += 1;
        soruGoster(quiz.soruGetir());
        soruSayisiniGoster(quiz.soruIndex+1,quiz.sorular.length);
        document.querySelector(".next_btn").classList.remove("show");
    } else {
        document.querySelector(".quiz_box").innerHTML = '<div style="background: #e7127d"><h1 style=" color: white; display: flex; justify-content: center; border: 5px solid ##ffd33d; border-radius: 5px;"> Quiz Bitti !</h1><div/>'
        console.log("quiz bitti");
    }
})

const option_list = document.querySelector(".option_list");
const correcticon = '<div class="icon"><i class="fas fa-check"></i></div>';
const incorrecticon = '<div class="icon"><i class="fas fa-times"></i></div>';


function soruGoster(soru){
    let question = `<span>${soru.soruMetni}</span>`;
    let options = '';

    for(let i in soru.cevapSecenekleri){
        options +=
        `
            <div class="option">
                <span><b>${i}</b>: ${soru.cevapSecenekleri[i]}</span>
            </div>
        `;

    }
    document.querySelector(".question_text").innerHTML = question;
    option_list.innerHTML = options;    

    const option = option_list.querySelectorAll(".option");

    for(let i of option){
        i.setAttribute("onclick","optionSelected(this)")
    }

}
function optionSelected(option){
    let cevap = option.querySelector("span b").textContent;
    let soru = quiz.soruGetir();

    if(soru.cevabiKontrolEt(cevap)){
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend",correcticon);
    }else{
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend",incorrecticon);
    }

    for(let i = 0; i < option_list.children.length; i++){
        option_list.children[i].classList.add("disabled");
    }
    document.querySelector(".next_btn").classList.add("show");
}

function soruSayisiniGoster(soruSirasi,toplamSoru){
    let tag = `<span class="badge"> ${soruSirasi} / ${toplamSoru} </span>`;
    document.querySelector(".quiz_box .question_index").innerHTML = tag;
}