	'use strict';
// Create needed constants
const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
let db;
let request=window.indexedDB.open('notes',1);

request.onerror = function() {
  console.log('Database failed to open');
};
request.onsuccess = function() {
  console.log('Database opened successfully');
	db=request.result;
	 displayData();
};
request.onupgradeneeded = function(e) {
  let db = e.target.result;
  let objectStore = db.createObjectStore('notes', { keyPath: 'id', autoIncrement:true });
  objectStore.createIndex('title', 'title', { unique: false });
  objectStore.createIndex('body', 'body', { unique: false });

  console.log('Database setup complete');
};
form.addEventListener('submit',addData);
function addData(e){
	e.preventDefault();
	let newItem={title:titleInput.value,body:bodyInput.value};
	let transaction=db.transaction(['notes'],'readwrite');
	let objectStore=transaction.objectStore('notes');
	var request = objectStore.add(newItem);
	request.onsuccess = function() {
		titleInput.value = '';
		bodyInput.value = '';
	};
	transaction.oncomplete = function() {
		console.log('Transaction completed: database modification finished.');
		displayData();
	};
	transaction.onerror = function() {
		console.log('Transaction not opened due to error');
	};
}
function displayData(){
	while (list.firstChild) {
		list.removeChild(list.firstChild);
	}
	let objectStore=db.transaction('notes').objectStore('notes');
	objectStore.openCursor().onsuccess=function (e){
		let cursor=e.target.result;
		if(cursor){
			let listItem = document.createElement('li');
			let h3 = document.createElement('h3');
			let para = document.createElement('p');
			listItem.setAttribute('data-note-id',cursor.value.id);
			listItem.appendChild(h3);
			listItem.appendChild(para);
			list.appendChild(listItem);
			h3.textContent = cursor.value.title;
			para.textContent = cursor.value.body;
			let delbtn=document.createElement('button');
			delbtn.textContent='删除';
			delbtn.addEventListener('click',deleteItem);
			listItem.appendChild(delbtn);
			cursor.continue();
		}
		else{
			if(!list.firstChild){
				let listItem=document.createElement('li');
				listItem.textContent='Notes';
				list.appendChild(listItem);
			}
		}
	};
}
function deleteItem(e){
	let noteId=Number(e.target.parentNode.getAttribute('data-note-id'));
	let transaction=db.transaction(['notes'],'readwrite');
	let request=transaction.objectStore('notes').delete(noteId);
	request.onsuccess=function(){
		console.log('success');
	};
	transaction.oncomplete=function(){
		e.target.parentNode.parentNode.removeChild(e.target.parentNode);
		if(!list.firstChild){
			let listItem=document.createElement('li');
			listItem.textContent='Notes';
			list.appendChild(listItem);
		}
	};
}

