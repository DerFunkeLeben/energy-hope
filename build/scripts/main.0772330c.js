(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{IhKj:function(e,t,n){"use strict";n.r(t);n("WMMs");function i(e,t,n,i,r,o,s){try{var a=e[o](s),u=a.value}catch(c){return void n(c)}a.done?t(u):Promise.resolve(u).then(i,r)}var r="https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",o="dde8a351a7c7874c95d7beab6ee8de9be7c608dc";function s(e,t,n,i){return a.apply(this,arguments)}function a(){var e;return e=function*(e,t,n,i){var s={method:"POST",mode:"cors",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:"Token "+o},body:JSON.stringify({query:e,from_bound:{value:t},to_bound:{value:n},locations:(()=>{const e={};return console.log(i),i&&(i.region.isReady&&(e.region_fias_id=i.region.id),i.area.isReady&&(e.area_fias_id=i.area.id),i.street.isReady&&(e.street_fias_id=i.street.id),i.settlement.isReady&&i.city.isReady?(e.settlement_fias_id=i.settlement.id,e.city_fias_id=i.city.id):!i.city.isReady&&i.settlement.isReady?(e.settlement_fias_id=i.settlement.id,e.city_fias_id=null):i.city.isReady&&!i.settlement.isReady&&(e.settlement_fias_id=null,e.city_fias_id=i.city.id)),console.log(e),Object.keys(e).length?[e]:null})(),restrict_value:!0})};try{const e=yield fetch(r,s);return yield e.json()}catch(a){console.error(a)}},(a=function(){var t=this,n=arguments;return new Promise(function(r,o){var s=e.apply(t,n);function a(e){i(s,r,o,a,u,"next",e)}function u(e){i(s,r,o,a,u,"throw",e)}a(void 0)})}).apply(this,arguments)}function u(e,t){return m(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var i,r,o=[],s=!0,a=!1;try{for(n=n.call(e);!(s=(i=n.next()).done)&&(o.push(i.value),!t||o.length!==t);s=!0);}catch(u){a=!0,r=u}finally{try{s||null==n.return||n.return()}finally{if(a)throw r}}return o}(e,t)||f(e,t)||y()}function c(e,t,n,i,r,o,s){try{var a=e[o](s),u=a.value}catch(c){return void n(c)}a.done?t(u):Promise.resolve(u).then(i,r)}function l(e){return function(){var t=this,n=arguments;return new Promise(function(i,r){var o=e.apply(t,n);function s(e){c(o,i,r,s,a,"next",e)}function a(e){c(o,i,r,s,a,"throw",e)}s(void 0)})}}function d(e){return m(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||f(e)||y()}function y(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function f(e,t){if(e){if("string"===typeof e)return g(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(e,t):void 0}}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function m(e){if(Array.isArray(e))return e}const v=document.querySelector(".suggestions__overlay"),p=document.querySelector("#region"),h=document.querySelector("#area"),_=document.querySelector("#settlement"),S=document.querySelector("#street"),R=document.querySelector("#house"),b=(document.querySelector("#postal_code"),d(document.querySelectorAll(".suggestions")).slice(0)),L=d(document.querySelectorAll(".input__data")).slice(0),q=document.querySelector(".suggestions-region"),w=document.querySelector(".suggestions-area"),j=document.querySelector(".suggestions-settlement"),A=document.querySelector(".suggestions-street"),E=document.querySelector(".suggestions-house");let k;const x={region:{id:"",isReady:!1},area:{id:"",isReady:!1},city:{id:"",isReady:!1},settlement:{id:"",isReady:!1},street:{id:"",isReady:!1},house:{id:"",isReady:!1}};function M(){return(M=l(function*(e){x.region.isReady=!1,k=e.target,C((yield s(this.value,"region","region")).suggestions,q)})).apply(this,arguments)}function O(){return(O=l(function*(e){if(!x.region.isReady){const e=yield s(p.value,"region","region");if(e.suggestions.length){const t=u(e.suggestions,1)[0];x.region.id=t.data.region_fias_id,x.region.isReady=!0}}const t=yield s(this.value,"area","area",x);x.area.isReady=!1,k=e.target,C(t.suggestions,w)})).apply(this,arguments)}function I(){return(I=l(function*(e){if(!x.region.isReady){const e=yield s(p.value+h.value,"region","area");if(e.suggestions.length){const t=u(e.suggestions,1)[0];x.region.id=t.data.region_fias_id,x.region.isReady=!0}}const t=yield s(this.value,"city","settlement",x);x.settlement.isReady=!1,x.city.isReady=!1,k=e.target,C(t.suggestions.filter(function(e){return"5"!==e.data.fias_level&&"65"!==e.data.fias_level}),j)})).apply(this,arguments)}function T(){return(T=l(function*(e){if(x.street.isReady=!1,k=e.target,!x.region.isReady||!x.settlement.isReady&&!x.city.isReady)return;C((yield s(this.value,"street","street",x)).suggestions,A)})).apply(this,arguments)}function P(){return(P=l(function*(e){if(!x.region.isReady||!x.street.isReady||!x.settlement.isReady&&!x.city.isReady)return;const t=yield s(this.value,"house","house",x);x.house.isReady=!1,k=e.target,C(t.suggestions,E)})).apply(this,arguments)}function C(e,t){const n=e.map(e=>{if("settlement"===k.id){const t=e.data;return[t.city_with_type,t.settlement_with_type].join(" ")}return"house"===k.id?e.value:e.data["".concat(k.id,"_with_type")]});t.classList.add("active"),v.classList.add("active"),t.innerHTML="",[...new Set(n)].map((n,i)=>(function(t,n,i){const r=document.createElement("div");if(r.classList.add("suggestion__option"),"settlement"===k.id){const t=e[i].data.city_fias_id,n=e[i].data.settlement_fias_id,o=t||"null",s=n||"null";r.id=[o,s].join("__")}else{const t=e[i].data["".concat(k.id,"_fias_id")];r.id=t}"null"!==r.id&&(r.textContent=n,t.append(r))})(t,n,i))}function H(e){if(e.target.classList.contains("suggestion__option")){const t=e.target.textContent;if(k.value=t,x[k.id].isReady=!0,x[k.id].id=e.target.id,"settlement"===k.id){const t=u(e.target.id.split("__"),2),n=t[0],i=t[1];x.city.id=n,x.city.isReady=!0,x.settlement.id=i,x.settlement.isReady=!0,"null"===n&&(x.city.id="",x.city.isReady=!1),"null"===i&&(x.settlement.id="",x.settlement.isReady=!1)}this.classList.remove("active"),v.classList.remove("active")}}function J(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var i,r,o=[],s=!0,a=!1;try{for(n=n.call(e);!(s=(i=n.next()).done)&&(o.push(i.value),!t||o.length!==t);s=!0);}catch(u){a=!0,r=u}finally{try{s||null==n.return||n.return()}finally{if(a)throw r}}return o}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return K(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return K(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function K(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function U(e,t,n,i,r,o,s){try{var a=e[o](s),u=a.value}catch(c){return void n(c)}a.done?t(u):Promise.resolve(u).then(i,r)}p.addEventListener("input",function(e){return M.apply(this,arguments)}),h.addEventListener("input",function(e){return O.apply(this,arguments)}),_.addEventListener("input",function(e){return I.apply(this,arguments)}),S.addEventListener("input",function(e){return T.apply(this,arguments)}),R.addEventListener("input",function(e){return P.apply(this,arguments)}),q.addEventListener("click",H),w.addEventListener("click",H),j.addEventListener("click",H),A.addEventListener("click",H),E.addEventListener("click",H),v.addEventListener("click",()=>{b.map(e=>e.classList.remove("active")),v.classList.remove("active")}),L.map(e=>e.addEventListener("click",e=>{k&&e.target.id===k.id||(b.map(e=>e.classList.remove("active")),v.classList.remove("active"))}));const W=document.querySelector(".btn_send"),$=document.querySelector(".fias_data"),z=document.querySelector(".summary_container"),N=document.querySelector(".summary_text"),B=document.querySelector("#postal_code");let D;function F(){var e;return e=function*(){$.classList.add("active"),z.classList.add("active"),$.textContent="";const e={region:document.querySelector("#region").value,area:document.querySelector("#area").value,settlement:document.querySelector("#settlement").value,street:document.querySelector("#street").value,house:document.querySelector("#house").value},t=Object.values(e).join(" "),n=yield s(t,"region","house");D=n.suggestions,N.innerHTML="\u041f\u043e \u044d\u0442\u043e\u043c\u0443 \u0430\u0434\u0440\u0435\u0441\u0443 \u043d\u0430\u0439\u0434\u0435\u043d\u043e \u0437\u0430\u043f\u0438\u0441\u0435\u0439 \u0432 \u0424\u0418\u0410\u0421: ".concat(D.length>=10?">10":D.length," <br> ").concat(0!==D.length?"\u041d\u0430\u0438\u0431\u043e\u043b\u0435\u0435 \u0442\u043e\u0447\u043d\u0430\u044f \u0437\u0430\u043f\u0438\u0441\u044c:":""),Object.entries(D[0].data).map(e=>{const t=J(e,2),n=t[0],i=t[1];i&&($.innerHTML+="".concat(n,": ").concat(i,"<br>"))}),B.value=D[0].data.postal_code},(F=function(){var t=this,n=arguments;return new Promise(function(i,r){var o=e.apply(t,n);function s(e){U(o,i,r,s,a,"next",e)}function a(e){U(o,i,r,s,a,"throw",e)}s(void 0)})}).apply(this,arguments)}W.addEventListener("click",function(){return F.apply(this,arguments)})},WMMs:function(e,t,n){}},[["IhKj",1]]]);