// Replace this text after deploying google-apps-script/Code.gs as a Google Apps Script Web App.
const API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzORs13a2JHsetGoG960UgJNU1zHmGJRnY9zBZ6OGgQUg_ubn_Hp86QIQsSIOik95pfng/exec';

const courses = [
  {icon:"▣", title:"Introduction to computers", text:"Meet the computer, its parts, and what each one does.", level:"primary", meta:"6 short lessons", enrolled:true},
  {icon:"⌨", title:"Keyboard & mouse skills", text:"Click, type, select and move around with confidence.", level:"primary", meta:"8 practice activities"},
  {icon:"W", title:"Microsoft Word basics", text:"Create letters, homework and beautiful documents.", level:"secondary", meta:"7 guided lessons"},
  {icon:"▤", title:"Spreadsheets made simple", text:"Use tables, numbers and simple formulas in Excel.", level:"secondary", meta:"6 guided lessons"},
  {icon:"✉", title:"Email & internet essentials", text:"Browse, search, email and stay safe online.", level:"adult", meta:"5 guided lessons"},
  {icon:"◎", title:"Digital tools for everyday life", text:"Use cloud storage, video calls and online services.", level:"adult", meta:"7 practical lessons"},
  {icon:"◷", title:"The story of computers", text:"From early machines to smartphones, AI and tomorrow.", level:"primary", meta:"4 discovery lessons"},
  {icon:"⌁", title:"Create with digital media", text:"Make presentations, posters and simple designs.", level:"secondary", meta:"6 creative lessons"},
  {icon:"♙", title:"Digital citizenship", text:"Be smart, kind and safe wherever you go online.", level:"all", meta:"5 essential lessons"}
];
const schedule = [
  ["MONDAY", "10:00 AM", "Computer explorers", "Introduction to computers · Live class"],
  ["WEDNESDAY", "2:00 PM", "Microsoft Word workshop", "Write and format your first document"],
  ["FRIDAY", "10:00 AM", "Internet safety circle", "Passwords, privacy and smart choices"],
  ["SATURDAY", "11:00 AM", "Open practice lab", "Bring your questions · All learner groups"],
  ["ANYTIME", "Self-paced", "Computer history", "Discover the people and ideas behind technology"],
  ["ANYTIME", "Self-paced", "Digital tools", "Useful apps for communication and daily life"]
];
const courseCards = document.querySelector('#course-cards');
const catalogue = document.querySelector('#catalogue');
function courseHTML(c, catalog=false){return `<article class="course-card"><div class="icon">${c.icon}</div><h3>${c.title}</h3><p>${c.text}</p><span class="course-meta">${c.meta}</span>${catalog ? `<button class="quiet-button enrol" data-course="${c.title}">${c.enrolled?'Continue →':'Enrol now →'}</button>` : ''}</article>`}
function renderCourses(level="all"){catalogue.innerHTML=courses.filter(c=>level==="all"||c.level===level||c.level==="all").map(c=>courseHTML(c,true)).join("")}
courseCards.innerHTML=courses.slice(0,3).map(c=>courseHTML(c)).join("");renderCourses();
document.querySelector('#schedule-grid').innerHTML=schedule.map(s=>`<article class="schedule-item"><small>${s[0]} · ${s[1]}</small><h2>${s[2]}</h2><p>${s[3]}</p><button class="quiet-button">Add reminder →</button></article>`).join("");
const pages=document.querySelectorAll('.page'), navs=document.querySelectorAll('[data-view]');
function show(view){pages.forEach(p=>p.classList.toggle('active',p.id===view));document.querySelectorAll('.nav-link').forEach(n=>n.classList.toggle('active',n.dataset.view===view));document.querySelector('#page-label').textContent={home:'Learning dashboard',courses:'My learning',schedule:'Learning schedule',resources:'Digital library',observers:'Observer view'}[view];window.scrollTo({top:0,behavior:'smooth'})}
navs.forEach(b=>b.addEventListener('click',()=>show(b.dataset.view)));
document.querySelector('#filters').addEventListener('click',e=>{if(!e.target.matches('.filter'))return;document.querySelectorAll('.filter').forEach(b=>b.classList.remove('selected'));e.target.classList.add('selected');renderCourses(e.target.dataset.level)});
const dialog=document.querySelector('#enrol-dialog');
document.addEventListener('click',e=>{const button=e.target.closest('.enrol');if(button){document.querySelector('#dialog-course').textContent=`You are enrolling in ${button.dataset.course}.`;dialog.showModal()}});
document.querySelector('.close').onclick=()=>dialog.close();
document.querySelector('#confirm-enrol').onclick=async()=>{
  const name=document.querySelector('#learner-name').value.trim();
  const contact=document.querySelector('#learner-contact').value.trim();
  const course=document.querySelector('#dialog-course').textContent.replace('You are enrolling in ','').replace('.','');
  if(!name||!contact){document.querySelector('#toast').textContent='Please enter your name and contact details.';document.querySelector('#toast').classList.add('show');setTimeout(()=>document.querySelector('#toast').classList.remove('show'),3200);return}
  if(API_ENDPOINT.includes('PASTE_YOUR')){document.querySelector('#toast').textContent='Connect your Google Apps Script URL first.';document.querySelector('#toast').classList.add('show');setTimeout(()=>document.querySelector('#toast').classList.remove('show'),3600);return}
  const button=document.querySelector('#confirm-enrol');button.disabled=true;button.textContent='Saving…';
  try{
    // URLSearchParams makes this a simple request that Google Apps Script can accept.
    await fetch(API_ENDPOINT,{method:'POST',mode:'no-cors',body:new URLSearchParams({action:'enrol',name,contact,course})});
    dialog.close();document.querySelector('#learner-name').value='';document.querySelector('#learner-contact').value='';
    document.querySelector('#toast').textContent='Your place has been saved. Welcome aboard!';document.querySelector('#toast').classList.add('show');setTimeout(()=>document.querySelector('#toast').classList.remove('show'),3200);
  }catch(error){document.querySelector('#toast').textContent='We could not save your place. Please try again.';document.querySelector('#toast').classList.add('show');setTimeout(()=>document.querySelector('#toast').classList.remove('show'),3200)}
  finally{button.disabled=false;button.innerHTML='Save my place →'}
};
