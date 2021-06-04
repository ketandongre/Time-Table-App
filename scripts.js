let toggle=document.querySelector('.toggle');
let slider=document.querySelector('.slider');
let b=0;
let div1=document.querySelectorAll('.slot');
var bar=document.querySelector('.editbar');
var edit=document.querySelector('.edit');
var ts=document.querySelectorAll('.ts');
var cancelBtn=document.querySelector('.cancel');
var deleteBtn=document.querySelectorAll('.delete');
var submit=bar.querySelector('.submit');
var infobar=document.querySelector('.infobar');
var download=document.querySelector('.download');
var closebtn=document.querySelector('.fa-plus');
var form=document.querySelector('form');
// console.log(form);
closebtn.addEventListener('click',()=>{
    infobar.classList.add('hidden');
})
download.addEventListener('click',()=>{
    window.print();
    document.querySelector('action-button').click();
});
// toggle.addEventListener('click',()=>{
//     if(b==0)
//     {
//         slider.classList.add('dark');
//         b=1;
//     }
//     else
//     {
//         slider.classList.remove('dark');
//         b=0;
//     }
// })
ts[5].setAttribute("style","background: red");
var i=0;
for(i=5;i<div1.length;i+=10)
{
    div1[i].setAttribute("style","background: red; border-left:0");
}
edit.addEventListener('click',()=>{
    bar.classList.remove('hidden');
    infobar.classList.add('hidden');
});
function OpenBar(){
    bar.classList.remove('hidden');
}
var Class={code:"", name:"", Ins:"", CC:"", day:"", slot:"",ltp:""};
// new URLSearchParams(window.location.search).forEach((value,name)=>{
//      Class[`${name}`]=`${value}`;
// });
cancelBtn.addEventListener('click',()=>{
    bar.classList.add('hidden');
})
// localStorage.setItem(`Class[${Class.day}][${Class.slot}]`,JSON.stringify(Class));
submit.onclick=(e)=>{
    e.preventDefault();
    Class.code=form.querySelector('#code').value;
    // console.log(Class.code);
    if(Class.code.length==0)
    {
        alert("Please Enter Course Code");
    }
    else
    {
        Class.name=form.querySelector('#name').value;
       Class.Ins=form.querySelector('#ins').value;
        Class.ltp=form.querySelector('#ltp').value;
        Class.day=form.querySelector('#day').value;
        Class.slot=form.querySelector('#slot').value;
        Class.CC=form.querySelector('#CC').value;
        Class.notes=form.querySelector('#notes').value;
        localStorage.setItem(`Class[${Class.day}][${Class.slot}]`,JSON.stringify(Class));
        window.location.reload();
    }
    // console.log(Class);
}
// for(i=1;i<7;i++)
// {
//     for(j=1;j<10;j++)
//     {
//         if(localStorage.getItem(`Class[${i}][${j}]`))
//         {
//             console.log(localStorage.getItem(`Class[${i}][${j}]`));
//         }
//     }
// }
for(i=0;i<div1.length;i++)
{
    // console.log("i= ",i);
    let day=Math.floor(i/10) + 1;
    let slot=i%10+1;
    if(slot%10!=0&&slot%6==0)
    {
        continue;
    }
    else if(slot>6)
    {
         slot--;
    }
    // console.log(`${day} ${slot}`);
    // console.log(localStorage.getItem(`Class[${day}][${slot}]`));
    if(localStorage.getItem(`Class[${day}][${slot}]`))
    {
        // console.log("in")
        let obj=JSON.parse(localStorage.getItem(`Class[${day}][${slot}]`));
        div1[i].textContent=obj.code;
        // console.log(obj.ltp);
        switch(obj.ltp)
        {
            case '1':
                div1[i].classList.add('l');
                break;
            case '2':
                div1[i].classList.add('t');
                break;
            case '3':
                div1[i].classList.add('p');
                break;
        }
        div1[i].addEventListener('click',addinfo);
        function addinfo(){
            // console.log("in");
            infobar.classList.remove('hidden');
            bar.classList.add('hidden');
            infobar.querySelector('.course_code').textContent=`Courses Code: ${obj.code}`;
            infobar.querySelector('.name_of_course').textContent=`Name: ${obj.name}`;
            infobar.querySelector('.instructor').textContent=`Instructor: ${obj.Ins}`;
            infobar.querySelector('.course_Coordinator').textContent=`Courses Coordinator: ${obj.CC}`;
            infobar.querySelector('.notes').textContent=`${obj.notes}`;
            infobar.querySelector('.editinfo').addEventListener('click',()=>{
                // console.log('ketan');
                // localStorage.removeItem(`Class[${obj.day}][${obj.slot}]`);
                infobar.classList.add('hidden');
                bar.classList.remove('hidden');
                bar.querySelector('#ltp').value=obj.ltp;
                bar.querySelector('#name').value=obj.name;
                bar.querySelector('#code').value=obj.code;
                bar.querySelector('#ins').value=obj.Ins;
                bar.querySelector('#CC').value=obj.CC;
                bar.querySelector('#notes').value=obj.notes;
                bar.querySelector('#day').value=obj.day;
                bar.querySelector('#slot').value=obj.slot;
            })
            // console.log("here")
            // console.log(infobar.querySelector('.delete'));
            infobar.querySelector('.delete').onclick=func;
            // infobar.querySelector('.delete').addEventListener('click',func);
            function func(){
                // console.log("delete");
                localStorage.removeItem(`Class[${day}][${slot}]`);
                window.location.href='/';
            }
        }
        // const info=document.createElement('div');
        // info.classList.add('delete');
        // info.innerHTML=`
        //     <i class="fas fa-trash"></i>
        // `
        // info.addEventListener('click',()=>{
        //     localStorage.removeItem(`Class[${day}][${slot}]`);
        //     window.location.href='/'
        // })
        // div1[i].appendChild(info);
        // div1[i].textContent=/*`${day} ${slot}`*/i;
    }
    else{
        div1[i].textContent="";
    }
}