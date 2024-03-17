tbody=document.getElementById('tbody');
btnDeleteAll=document.getElementById('btnDeleteAll');
inputNom=document.querySelector('#inputNom');
inputPrenom=document.querySelector('#inputPrenom');
inputNote1=document.querySelector('#inputNote1');
inputNote2=document.querySelector('#inputNote2');

var tableauEtudiants;

apporterDepuisLocalStorage();
afficherDansHtml();



function apporterDepuisLocalStorage(){
    if(localStorage.length!=0){
        tableauEtudiants=JSON.parse(localStorage.getItem("tableEtudiantsLocalStorage"));
    }else{
        tableauEtudiants=[];
    }
}

function ajouterEtudiant(){
    if(inputNom.value!='' && inputPrenom.value!='' && inputNote1.value!='' && inputNote2.value!=''){
        if(!noteEstvalide(inputNote1.value) || !noteEstvalide(inputNote2.value)){
            alert('une note saisie est invalide');
        }else{
            var calculMoyenne=(parseFloat(inputNote1.value)+ parseFloat(inputNote2.value))/2;
            var unEtudiant={
                nom : inputNom.value,
                prenom: inputPrenom.value,
                note1 : inputNote1.value,
                note2: inputNote2.value,
                moyenne:calculMoyenne
            }
        }
       
        if(etuidantDejaExiste(unEtudiant)){
            alert("l'étudiant "+unEtudiant.nom+" existe deja");
        }else{
            tableauEtudiants.push(unEtudiant);
            console.log(tableauEtudiants);
        }
    }else {
        if(inputNom.value==''){
            alert("attention! vous n'avez pas saisi le nom de l'étudiant")
        }
        if(inputPrenom.value==''){
            alert("attention! vous n'avez pas saisi le prenom de l'étudiant");
        }
        if( inputNote1==''){
            alert("attention! vous n'avez pas saisi la note1 de l'étudiant");
        }
        if(inputNote2==''){
            alert("attention! vous n'avez pas saisi la note2 de l'étudiant");
        }
    }
    localStorage.setItem("tableEtudiantsLocalStorage",JSON.stringify(tableauEtudiants));
    afficherDansHtml();
}

//pagination : utilisé dans le cas ou votre tableau contient des centaines de lignes

function etuidantDejaExiste(nouveauEtudiant){
    console.log("tableauEtudiants: "+tableauEtudiants);
    for(let i=0;i<tableauEtudiants.length;i++){
        if(tableauEtudiants[i].nom==nouveauEtudiant.nom && tableauEtudiants[i].prenom==nouveauEtudiant.prenom)
            return true;
    }
    return false;
}



function afficherDansHtml(){
    tbody.innerHTML='';
    for(let i=0;i<tableauEtudiants.length;i++){
        var ligne=`
        <tr>
            <td>${tableauEtudiants[i].nom}</td>
            <td>${tableauEtudiants[i].prenom}</td>
            <td>${tableauEtudiants[i].note1}</td>
            <td>${tableauEtudiants[i].note2}</td>
            <td>${tableauEtudiants[i].moyenne}</td>
         </tr>       
        `;

        tbody.innerHTML+=ligne;
    }
}



function noteEstvalide(note){
    if(note>=0 && note<=20) return true;
    else return false;
}





function rechercherEtudiantNom(inputElmNom){
    console.log("hi")
    tbody.innerHTML='';
    for(let i=0;i<tableauEtudiants.length;i++){
        if(tableauEtudiants[i].nom.includes(inputElmNom.value)){
            ligne=`
            <tr>
            <td>${tableauEtudiants[i].nom}</td>
            <td>${tableauEtudiants[i].prenom}</td>
            <td>${tableauEtudiants[i].note1}</td>
            <td>${tableauEtudiants[i].note2}</td>
            <td>${tableauEtudiants[i].moyenne}</td>
         </tr>   
            `
            tbody.innerHTML+=ligne;
        }
    }
}

function rechercherEtudiantPrenom(inputElmPrenNom){
    tbody.innerHTML='';
    for(let i=0;i<tableauEtudiants.length;i++){
        if(tableauEtudiants[i].prenom.includes(inputElmPrenNom.value)){
            ligne=`
            <tr>
            <td>${tableauEtudiants[i].nom}</td>
            <td>${tableauEtudiants[i].prenom}</td>
            <td>${tableauEtudiants[i].note1}</td>
            <td>${tableauEtudiants[i].note2}</td>
            <td>${tableauEtudiants[i].moyenne}</td>
         </tr>   
            `
            tbody.innerHTML+=ligne;
        }
    }
}



function rechercherEtudiantNote(inputElmNote){
   tbody.innerHTML='';
   noteCherche=inputElmNote.value.toString();
   for(let i=0;i<tableauEtudiants.length;i++){
    noteEtudiant=tableauEtudiants[i].moyenne.toString();
     if(noteEtudiant.includes(noteCherche)){
        ligne=`
            <tr>
            <td>${tableauEtudiants[i].nom}</td>
            <td>${tableauEtudiants[i].prenom}</td>
            <td>${tableauEtudiants[i].note1}</td>
            <td>${tableauEtudiants[i].note2}</td>
            <td>${tableauEtudiants[i].moyenne}</td>
         </tr>   
            `
            tbody.innerHTML+=ligne;
     }
   }
}






afficherEtudiantsValides();
function afficherEtudiantsValides(){
    if(tbody.classList.contains("Valider")){
        tbody.innerHTML='';
        for(let i=0;i<tableauEtudiants.length;i++){
             if(tableauEtudiants[i].moyenne>=10){
                ligne=`
                    <tr>
                    <td>${tableauEtudiants[i].nom}</td>
                    <td>${tableauEtudiants[i].prenom}</td>
                    <td>${tableauEtudiants[i].note1}</td>
                    <td>${tableauEtudiants[i].note2}</td>
                    <td>${tableauEtudiants[i].moyenne}</td>
                 </tr>   
                    `
                    tbody.innerHTML+=ligne;
             }
           }
    }
    
}




afficherEtudiantsNonValides();
function afficherEtudiantsNonValides(){
    if(tbody.classList.contains("NonValider")){
        tbody.innerHTML='';
        for(let i=0;i<tableauEtudiants.length;i++){
             if(tableauEtudiants[i].moyenne<10){
                ligne=`
                    <tr>
                    <td>${tableauEtudiants[i].nom}</td>
                    <td>${tableauEtudiants[i].prenom}</td>
                    <td>${tableauEtudiants[i].note1}</td>
                    <td>${tableauEtudiants[i].note2}</td>
                    <td>${tableauEtudiants[i].moyenne}</td>
                 </tr>   
                    `
                    tbody.innerHTML+=ligne;
             }
           }
    }
    
}






supprimerEtudiant();
function supprimerEtudiant(){
    if(tbody.classList.contains("supprimer")){
        tbody.innerHTML='';
        for(let i=0;i<tableauEtudiants.length;i++){
               ligne=`
                   <tr>
                   <td>${tableauEtudiants[i].nom}</td>
                   <td>${tableauEtudiants[i].prenom}</td>
                   <td>${tableauEtudiants[i].note1}</td>
                   <td>${tableauEtudiants[i].note2}</td>
                   <td>${tableauEtudiants[i].moyenne}</td>
                   <td class="iconDelete"><i onclick="supprimerE(${i})" class="fa-solid fa-ban" style="color:#ec4646;"></i></td>
                </tr>   
                   `
                   tbody.innerHTML+=ligne;
          }
   }
   actualiserBtnDeleteAll();
}

function supprimerTous(){
    tableauEtudiants=[];
    localStorage.clear();
    tbody.innerHTML='';
    actualiserBtnDeleteAll();
}

function supprimerE(index){
    tableauEtudiants.splice(index,1);
    localStorage.setItem("tableEtudiantsLocalStorage",JSON.stringify(tableauEtudiants));
    if(tbody.classList.contains("supprimer")){
        tbody.innerHTML='';
        for(let i=0;i<tableauEtudiants.length;i++){
               ligne=`
                   <tr>
                   <td>${tableauEtudiants[i].nom}</td>
                   <td>${tableauEtudiants[i].prenom}</td>
                   <td>${tableauEtudiants[i].note1}</td>
                   <td>${tableauEtudiants[i].note2}</td>
                   <td>${tableauEtudiants[i].moyenne}</td>
                   <td class="iconDelete"><i onclick="supprimerE(${i})" class="fa-solid fa-ban" style="color:#ec4646;"></i></td>
                </tr>   
                   `
                   tbody.innerHTML+=ligne;
          }
   }
   actualiserBtnDeleteAll();
}

actualiserBtnDeleteAll();
function actualiserBtnDeleteAll(){
    if(tableauEtudiants.length==0){
    btnDeleteAll.style.display='none';
    }else{
        btnDeleteAll.style.display='block';
    }
}
