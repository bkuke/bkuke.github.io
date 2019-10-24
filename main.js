//chenck button and save in loaclStorage
"use strict";
let rec=[];
let i=0;
const checkbox=document.querySelectorAll('input');
checkbox.forEach((list)=>{list.addEventListener('click',update);});
function update(){
	rec=[];
	for(i=0;i<checkbox.length;i++){
		rec.push(checkbox[i].checked);
	}
	localStorage.setItem('rec',JSON.stringify(rec));
}
function load(){
	rec=JSON.parse(localStorage.getItem('rec'));
	for(i=0;i<checkbox.length;i++){
		checkbox[i].checked=rec.shift();
	}
}
load();
