//generate nav
'use strict';
const h2=document.querySelectorAll('main h2');
const ul=document.createElement('ul');
const nav=document.querySelector('nav');
nav.appendChild(ul);
let len=h2.length;
for(let i=0;i<len;i++)
{
	h2[i].setAttribute('id','id-'+i);
	let li=document.createElement('li');
	let ad=document.createElement('h3');
	let aa=document.createElement('a');
	ad.textContent=(i+1)+'.'+h2[i].textContent;
	aa.appendChild(ad);
	aa.href='#'+h2[i].id;
	li.appendChild(aa);
	ul.appendChild(li);
}

