

                           //notes.app

let notes=JSON.parse(localStorage.getItem("notes"))||[];

//add new notes function
function addnote(noteadd){
    let newnote={id:Date.now(),text:noteadd,timestamp:new Date().toLocaleString()};
    notes.push(newnote)
    return newnote;

}

//render  function
let notescontainer=document.querySelector("#notescontainer")

 function rendernotes(list=notes){
    notescontainer.innerHTML="";//make the container empty

    if (list.length === 0) {
    const empty = document.createElement("div");
    empty.classList.add("empty-state");
    empty.textContent = "No notes here, write to add.";
    notescontainer.appendChild(empty);
    return;}


    list.forEach(function(note)
    {
    const div=document.createElement("div")
    div.dataset.id=note.id;
    const p=document.createElement("p");
    p.textContent=note.text

    const small=document.createElement("small")
    small.textContent=note.timestamp;
       
        
    const deletebtn=document.createElement("button")
    deletebtn.textContent="delete"
    deletebtn.classList.add("delete-btn")
    
    const editbtn=document.createElement("button")
    editbtn.textContent="edit"
    editbtn.classList.add("edit-btn")
    
   
    div.appendChild(p);
    div.appendChild(small);
    div.appendChild(deletebtn);
    div.appendChild(editbtn);

notescontainer.appendChild(div);  });
     }
//save with storage

     function save(){
    localStorage.setItem("notes",JSON.stringify(notes))

 }
 

 //add note
 let addbtn=document.querySelector("#addbtn")
 let inputnote=document.querySelector("#noteinput")

 addbtn.addEventListener("click",function(){
    let input=inputnote.value.trim()
    if(input==="")return;
    addnote(input)
    inputnote.value="";
    save();
    rendernotes();
 })

 


//delete note
notescontainer.addEventListener("click",(e)=>{
    const id=Number(e.target.closest("div").dataset.id);
    if(e.target.classList.contains("delete-btn")){
        notes=notes.filter(note=>note.id!==id)
        save();
        rendernotes();
    }
    
})
//edit note

notescontainer.addEventListener("click",(e)=>{
    const id=Number(e.target.closest("div").dataset.id);
    if(e.target.classList.contains("edit-btn")){
       const note=notes.find(note=>note.id===id)
       const newtext=prompt("edit note:" ,note.text)
       if(!newtext||!newtext.trim()) return;
       note.text=newtext.trim();
        save();
        rendernotes();
    }

})

//search and filter


 let searchinput=document.querySelector("#searchinput")

 searchinput.addEventListener("input",()=>{
    const term=searchinput.value.trim().toLowerCase()
    const filtered=notes.filter(note=>note.text.toLowerCase().includes(term));
    rendernotes(filtered);
 })

 rendernotes()
        

    
