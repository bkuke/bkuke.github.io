'use strict';
let images=document.querySelectorAll('img');
for(let i=0;i<images.length;i++){
	images[i].setAttribute('uid',i+1);
}
let request=window.indexedDB.open('image',1);
request.onerror=function(){
	console.log('Database failed to open');
};
let db;
request.onsuccess=function(){
	console.log('Database opened successfully');
	db=request.result;
	init();
};
request.onupgradeneeded = function(e) {
  let db = e.target.result;
  let objectStore = db.createObjectStore('images', { keyPath: 'name'});
  objectStore.createIndex('blob', 'blob', { unique: false });
  console.log('Database setup complete');
};
function init(){
		console.log('start init');
	for(let i=0;i<images.length;i++){
		let obj=db.transaction('images').objectStore('images');
		let request=obj.get((i+1));
		request.onsuccess=function(){
			if(request.result){
				console.log('get image');
				place(request.result.name,request.result.blob);
			
			}
			else{
				console.log('fetch image');
				fetchImages((i+1));
			}
		};
	}
}
function fetchImages(rurl){
	let name=rurl+'.png';
	let url='/image/'+name;
	fetch(url).then((response)=>{return response.blob();}).then(instack).catch(console('erroe'));
function instack(blob){
	place(rurl,blob);
	let newItem={name:rurl,blob:blob};
	let trans=db.transaction(['images'],'readwrite').objectStore('images');
	let request=trans.add(newItem);
	request.onsuccess=function(){
		console.log('request success');
	};
	request.onerror=function(){
		console.log('request gg');
	};
}

}
function place(name,blob){
	let url=URL.createObjectURL(blob);
	for(let i=0;i<images.length;i++){
	let uid=images[i].getAttribute('uid');
	if(name===Number(uid)){
		images[i].setAttribute('src',url);
	}
}
}
