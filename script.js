let addbtn=document.querySelector('.add-btn');
let removebtn=document.querySelector('.remove-btn');
let modalcont=document.querySelector('.modal-cont');
let textareacont=document.querySelector('.textarea-cont');
let allprioritycolors=document.querySelectorAll('.priority-color');
let colors=["lightpink","lightgreen","lightblue","black"];
let modalprioritycolor=colors[colors.length-1];
let toolboxcolors=document.querySelectorAll('.color');
let addtaskflag=false;
let removetaskflag=false;
let lockclass='fa-lock';
let unlockclass='fa-lock-open';
let ticketarr=[];
let maincontainer=document.querySelector('.main-cont');

for(let i=0;i<toolboxcolors.length;i++){
    toolboxcolors[i].addEventListener('click',function(){
        let selectedtoolboxcolor=toolboxcolors[i].classList[0];
        let filteredtickets=ticketarr.filter(function(ticket){
            return selectedtoolboxcolor===ticket.ticketcolor;
        })
        let alltickets=document.querySelectorAll('.ticket-cont');
        for(let j=0;j<alltickets.length;j++){
            alltickets[j].remove();
        }
        filteredtickets.forEach(function(filteredticket){
            createticket(filteredticket.ticketcolor,filteredticket.tickettask,filteredticket.ticketid);
        })
    })
    toolboxcolors[i].addEventListener('dblclick',function(){
        let alltickets=document.querySelectorAll('.ticket-cont');
        for(let j=0;j<alltickets.length;j++){
            alltickets[j].remove();
        }
        ticketarr.forEach(function(ticketobj){
            createticket(ticketobj.ticketcolor,ticketobj.tickettask,ticketobj.ticketid);
        })
    })
    
}

addbtn.addEventListener('click',function(){
    addtaskflag=!addtaskflag;
    if(addtaskflag === true){
        //flex
        modalcont.style.display='flex';
    }
    else{
        //none
        modalcont.style.display='none';
    }
});

removebtn.addEventListener('click',function(){
    removetaskflag=!removetaskflag;
    if(removetaskflag === true){
        //flex
        alert('remove button activated');
        removebtn.style.color='red';
    }
    else{
        //none
        removebtn.style.color='white';
    }
});

allprioritycolors.forEach(function(colorelem){
    colorelem.addEventListener('click',function(){
        allprioritycolors.forEach(function(prioritycolorelem){
            prioritycolorelem.classList.remove('active');
        })
        colorelem.classList.add('active');
        modalprioritycolor=colorelem.classList[0];
        console.log(colorelem.classList);
    })
 })
modalcont.addEventListener('keydown',function(e){
    let key=e.key;
    if(key==='Enter'){
        console.log(textareacont.value);
        createticket(modalprioritycolor,textareacont.value)
        modalcont.style.display='none';
        textareacont.value='';
    }
})

function createticket(ticketcolor,tickettask,ticketid){
    let id=ticketid||shortid();
    let ticketcont=document.createElement('div');
    ticketcont.setAttribute('class','ticket-cont');
    ticketcont.innerHTML=`
    <div class="ticket-color ${ticketcolor}"></div>
    <div class="ticket-id">${id}</div>
    <div class="task-area">${tickettask}</div>
    <div class="ticket-lock">
        <i class="fa-solid fa-lock"></i>
    </div>`;
    maincontainer.appendChild(ticketcont);
    handlelock(ticketcont,id);
    handleremove(ticketcont, id)
    if(!ticketid){
    ticketarr.push({ticketcolor,tickettask,ticketid: id});
    }
}
function handlelock(ticket,id){
    let ticketlockelem=ticket.querySelector('.ticket-lock');
    let ticketlockicon=ticketlockelem.children[0];
    let tickettaskarea=ticket.querySelector('.task-area');
    ticketlockicon.addEventListener('click',function(){
        let ticketidx=getticketidx(id);
        if(ticketlockicon.classList.contains(lockclass)){
            ticketlockicon.classList.add(unlockclass);
            ticketlockicon.classList.remove(lockclass);
            tickettaskarea.setAttribute('contenteditable',true);
        }
        else{
            ticketlockicon.classList.add(lockclass);
            ticketlockicon.classList.remove(unlockclass);
            tickettaskarea.setAttribute('contenteditable',false);
        }
        ticketarr[ticketidx].tickettask=tickettaskarea.innerText;
    })
}
function handlecolor(){

}
function handleremove(ticket, id){
    ticket.addEventListener('click',function(){
        if(!removetaskflag)return;
        else
        ticket.remove();
        let idx=getticketidx(id);
        let deletedelem=ticketarr.splice(idx,1);
        console.log(deletedelem);
    })
}
function getticketidx(id){
    let ticketid=ticketarr.findIndex(function(ticketobj){
        return ticketobj.ticketid===id;
    })
    return ticketid;
}