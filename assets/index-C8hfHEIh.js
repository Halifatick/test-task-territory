import{C as y,z as o,D as b,j as E,E as F}from"./vue-BgMHtuE4.js";const i="formData",f="usersData";class r{static getDefaultConfig(){return{name:"",birthday:"",phone:"",email:""}}static save(a){localStorage.setItem(i,JSON.stringify(a))}static load(){const a=localStorage.getItem(i);return a?JSON.parse(a):this.getDefaultConfig()}static saveUsers(a){localStorage.setItem(f,JSON.stringify(a))}static loadUsers(){const a=localStorage.getItem(f);return a?JSON.parse(a):[]}static saveForm(a){localStorage.setItem(i,JSON.stringify(a))}static deleteForm(){localStorage.removeItem(i)}}const O=y("form",()=>{const t=o(r.load()),a=o(r.loadUsers()),n=o(!1),s=o({name:[],birthday:[],phone:[],email:[]}),l=o({name:!1,birthday:!1,phone:!1,email:!1}),v=e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),d=e=>{const S=e.replace(/[^\d+]/g,"");return/^\+7\d{10}$/.test(S)},h=e=>/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/.test(e),m=()=>{s.value.name=[],s.value.birthday=[],s.value.phone=[],s.value.email=[]},g=()=>{l.value.name=!1,l.value.birthday=!1,l.value.phone=!1,l.value.email=!1},u=()=>{let e=!0;return m(),t.value.name.trim().length===0&&(s.value.name.push("Это поле обязательно"),e=!1),t.value.birthday.trim().length===0?(s.value.birthday.push("Это поле обязательно"),e=!1):h(t.value.birthday)||(s.value.birthday.push("Неверный формат даты (ДД.MM.ГГГГ)"),e=!1),d(t.value.phone)||(s.value.phone.push("Некорректный номер телефона"),e=!1),v(t.value.email)||(s.value.email.push("Некорректный email"),e=!1),e};b(()=>{u()});const c=E(()=>u()),p=async()=>{if(!c.value){alert("Форма содержит ошибки!");return}n.value=!0,await new Promise(e=>setTimeout(e,1e3)),n.value=!1,a.value.push({...t.value}),r.saveUsers(a.value),alert("Данные успешно сохранены!"),m(),g(),r.deleteForm(),t.value=r.getDefaultConfig()};return F(t.value,e=>{e&&(r.saveForm(e),u())},{deep:!0}),{formConfig:t,usersConfig:a,isLoading:n,formErrors:s,isFormValid:c,formTouched:l,submitForm:p}});export{O as u};
