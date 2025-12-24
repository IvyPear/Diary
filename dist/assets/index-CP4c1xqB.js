(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();const P="modulepreload",D=function(r){return"/Diary/"+r},S={},q=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),l=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));i=Promise.allSettled(t.map(a=>{if(a=D(a),a in S)return;S[a]=!0;const d=a.endsWith(".css"),c=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${c}`))return;const m=document.createElement("link");if(m.rel=d?"stylesheet":P,d||(m.as="script"),m.crossOrigin="",m.href=a,l&&m.setAttribute("nonce",l),document.head.appendChild(m),d)return new Promise((f,p)=>{m.addEventListener("load",f),m.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${a}`)))})}))}function o(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return i.then(s=>{for(const l of s||[])l.status==="rejected"&&o(l.reason);return e().catch(o)})};class h{static get(e,t=null){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch(n){return console.error(`Lỗi khi đọc ${e}:`,n),t}}static set(e,t){try{return localStorage.setItem(e,JSON.stringify(t)),!0}catch(n){return console.error(`Lỗi khi lưu ${e}:`,n),!1}}static remove(e){localStorage.removeItem(e)}static clear(){localStorage.clear()}static getAllData(){return{diaryEntries:this.get("diaryEntries",[]),moments:this.get("moments",[]),settings:this.get("diarySettings",{}),exportDate:new Date().toISOString()}}static initializeDefaults(){this.get("diaryEntries")||this.set("diaryEntries",[]),this.get("moments")||this.set("moments",[]),this.get("diarySettings")||this.set("diarySettings",{theme:"mint"})}}function M(){const r=h.get("diarySettings",{theme:"mint"}).theme;I(r)}function I(r){var n;console.log("Setting theme to:",r),document.body.classList.remove("theme-mint","theme-pink","theme-lavender","theme-ocean","theme-night"),document.body.classList.add(`theme-${r}`),window.APP_STATE&&(window.APP_STATE.currentTheme=r);const e=h.get("diarySettings",{});e.theme=r,h.set("diarySettings",e);const t=document.getElementById("theme-panel");t&&t.classList.add("hidden"),window.ChartManager&&((n=window.APP_STATE)==null?void 0:n.currentView)==="report"&&setTimeout(()=>{window.ChartManager.drawCharts()},100),V()}function V(){const r=getComputedStyle(document.body).getPropertyValue("--accent-light"),e=getComputedStyle(document.body).getPropertyValue("--button-bg");document.querySelectorAll(".mood-btn").forEach(t=>{t.classList.contains("ring-4")?t.style.backgroundColor=e:t.style.backgroundColor=r})}class u{static calculateStreak(){const e=h.get("diaryEntries",[]);if(e.length===0)return 0;const t=new Set(e.map(s=>s.date)),n=Array.from(t).map(s=>{const[l,a,d]=s.split("/").map(Number);return new Date(d,a-1,l)}).sort((s,l)=>l-s);let i=0;const o=new Date;o.setHours(0,0,0,0);for(let s=0;s<n.length;s++){const l=new Date(o);if(l.setDate(l.getDate()-s),l.setHours(0,0,0,0),n[s].getTime()===l.getTime())i++;else break}return i}static updateStreakCounter(){const e=this.calculateStreak(),t=document.getElementById("streak-counter");t&&(t.innerHTML=`🔥 ${e} ngày liên tiếp`,e>0&&t.classList.add("animate-pulse"))}static setupPhotoUpload(){document.querySelectorAll(".photo-upload").forEach((e,t)=>{e.onclick=null,!e.querySelector("img")&&e.addEventListener("click",()=>{const n=document.createElement("input");n.type="file",n.accept="image/*",n.multiple=!1,n.onchange=i=>{const o=i.target.files[0];if(o){const s=new FileReader;s.onload=l=>{e.innerHTML=`
                                <img src="${l.target.result}" 
                                     alt="Uploaded photo ${t+1}" 
                                     class="w-full h-full object-cover rounded-[16px] shadow-image">
                                <button class="delete-photo absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-70 hover:opacity-100 transition-opacity">
                                    <i data-lucide="x" class="w-3 h-3"></i>
                                </button>
                            `,e.classList.add("image-hover","has-image");const a=e.querySelector(".delete-photo");a.onclick=d=>{d.stopPropagation(),e.innerHTML=`
                                    <div class="w-full h-full flex flex-col items-center justify-center">
                                        <i data-lucide="plus" class="w-8 h-8 mb-1"></i>
                                        <span class="text-xs">Ảnh ${t+1}</span>
                                    </div>
                                `,e.classList.remove("image-hover","has-image"),lucide==null||lucide.createIcons()}},s.readAsDataURL(o)}},n.click()})})}static exportData(){try{const e=h.getAllData(),t=JSON.stringify(e,null,2),n=new Blob([t],{type:"application/json"}),i=URL.createObjectURL(n),o=document.createElement("a");return o.href=i,o.download=`diary-backup-${new Date().toISOString().split("T")[0]}.json`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(i),u.showNotification("Dữ liệu đã được xuất thành công! 📥","success"),!0}catch(e){return console.error("Lỗi khi xuất dữ liệu:",e),u.showNotification("Lỗi: Không thể xuất dữ liệu","error"),!1}}static showNotification(e,t="info"){let n=document.getElementById("notification-container");n||(n=document.createElement("div"),n.id="notification-container",n.className="fixed top-4 right-4 z-50 space-y-2",document.body.appendChild(n));const i=document.createElement("div");i.className=`p-4 rounded-lg shadow-lg mb-2 animate-slideInUp ${t==="success"?"bg-green-100 text-green-800 border border-green-200":t==="error"?"bg-red-100 text-red-800 border border-red-200":t==="warning"?"bg-yellow-100 text-yellow-800 border border-yellow-200":"bg-blue-100 text-blue-800 border border-blue-200"}`,i.innerHTML=`
            <div class="flex items-center space-x-2">
                <span>${e}</span>
            </div>
        `,n.appendChild(i),setTimeout(()=>{i.style.opacity="0",i.style.transform="translateX(100%)",i.style.transition="all 0.3s ease",setTimeout(()=>{i.remove()},300)},3e3)}}class y{static saveDailyEntry(){var l,a,d,c,m,f,p,E,x;const e=new Date,t=e.toLocaleDateString("vi-VN",{year:"numeric",month:"2-digit",day:"2-digit"}),n=document.getElementById("current-date");n&&(n.textContent=t);const i=document.querySelector(".mood-btn.ring-4"),o=i?i.dataset.mood:"😊",s={id:`entry_${e.getTime()}_${Math.random().toString(36).substr(2,9)}`,date:t,mood:o,achievements:((l=document.getElementById("achievements"))==null?void 0:l.value.trim())||"",stress:((a=document.getElementById("stress"))==null?void 0:a.value.trim())||"",gratitude1:((d=document.getElementById("gratitude1"))==null?void 0:d.value.trim())||"",gratitude2:((c=document.getElementById("gratitude2"))==null?void 0:c.value.trim())||"",gratitude3:((m=document.getElementById("gratitude3"))==null?void 0:m.value.trim())||"",selfCare:Array.from(document.querySelectorAll(".pastel-checkbox input:checked")).map(g=>g.value),highlight:((f=document.getElementById("highlight"))==null?void 0:f.value.trim())||"",photos:Array.from(document.querySelectorAll(".photo-upload img")).map(g=>g.src).filter(g=>!g.includes("plus")&&!g.includes("data:image/svg+xml")),content:((p=document.getElementById("content"))==null?void 0:p.value.trim())||"",timestamp:e.getTime(),theme:((E=document.body.className.match(/theme-(\w+)/))==null?void 0:E[1])||"mint"};if(!s.content||s.content.trim().length<5)return u.showNotification("Vui lòng viết nội dung nhật ký (ít nhất 5 ký tự)","warning"),(x=document.getElementById("content"))==null||x.focus(),!1;try{let g=h.get("diaryEntries",[]);const L=g.findIndex(A=>A.date===t);L>=0?(g[L]=s,u.showNotification("Đã cập nhật nhật ký hôm nay! ✨","success")):(g.unshift(s),u.showNotification("Nhật ký đã được lưu thành công! ✨","success")),h.set("diaryEntries",g),s.highlight&&s.highlight.trim().length>0&&this.saveHighlightAsMoment(s);const b=document.querySelector("#diary-page button");return b&&(b.classList.add("success-pulse"),setTimeout(()=>b.classList.remove("success-pulse"),2e3)),typeof window.APP_STATE<"u"&&window.APP_STATE.currentView==="timeline"&&setTimeout(()=>{typeof window.TimelineManager<"u"&&window.TimelineManager.loadTimelineEntries()},500),this.resetForm(),typeof window.Utils<"u"&&window.Utils.updateStreakCounter(),!0}catch(g){return console.error("Lỗi khi lưu entry:",g),u.showNotification("Lỗi: Không thể lưu nhật ký","error"),!1}}static saveHighlightAsMoment(e){const t={id:`moment_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,name:e.highlight.substring(0,50),description:`Từ nhật ký ngày ${e.date}: ${e.content.substring(0,100)}...`,date:e.date,mood:e.mood,type:"highlight",timestamp:e.timestamp};let n=h.get("moments",[]);n.unshift(t),h.set("moments",n)}static resetForm(){["achievements","stress","gratitude1","gratitude2","gratitude3","highlight","content"].forEach(o=>{const s=document.getElementById(o);s&&(s.value="")});const t=getComputedStyle(document.body).getPropertyValue("--accent-light");document.querySelectorAll(".mood-btn").forEach(o=>{o.style.backgroundColor=t,o.classList.remove("ring-4","ring-offset-2","ring-accent-light/50")});const n=document.querySelector('.mood-btn[data-mood="😊"]');if(n){const o=getComputedStyle(document.body).getPropertyValue("--button-bg");n.style.backgroundColor=o,n.classList.add("ring-4","ring-offset-2","ring-accent-light/50")}document.querySelectorAll('.pastel-checkbox input[type="checkbox"]').forEach(o=>{o.checked=!1}),document.querySelectorAll(".photo-upload").forEach((o,s)=>{o.innerHTML=`
                <div class="w-full h-full flex flex-col items-center justify-center">
                    <i data-lucide="plus" class="w-8 h-8 mb-1"></i>
                    <span class="text-xs">Ảnh ${s+1}</span>
                </div>
            `,o.classList.remove("image-hover","has-image")});const i=document.getElementById("save-status");i&&(i.textContent="Sẵn sàng cho ngày mới!",i.classList.add("text-green-500"),setTimeout(()=>{i.classList.remove("text-green-500"),i.textContent="Đã lưu tự động"},2e3)),setTimeout(()=>{var o;(o=document.getElementById("content"))==null||o.focus()},300),typeof lucide<"u"&&lucide.createIcons(),setTimeout(()=>{u.setupPhotoUpload()},100)}static loadTodayEntry(){const t=new Date().toLocaleDateString("vi-VN",{year:"numeric",month:"2-digit",day:"2-digit"}),n=document.getElementById("current-date");n&&(n.textContent=t);const o=h.get("diaryEntries",[]).find(s=>s.date===t);if(o){const s={achievements:o.achievements||"",stress:o.stress||"",gratitude1:o.gratitude1||"",gratitude2:o.gratitude2||"",gratitude3:o.gratitude3||"",highlight:o.highlight||"",content:o.content||""};Object.entries(s).forEach(([a,d])=>{const c=document.getElementById(a);c&&(c.value=d)});const l=document.querySelector(`.mood-btn[data-mood="${o.mood}"]`);if(l){const a=getComputedStyle(document.body).getPropertyValue("--button-bg"),d=getComputedStyle(document.body).getPropertyValue("--accent-light");document.querySelectorAll(".mood-btn").forEach(c=>{c.style.backgroundColor=d,c.classList.remove("ring-4","ring-offset-2","ring-accent-light/50")}),l.style.backgroundColor=a,l.classList.add("ring-4","ring-offset-2","ring-accent-light/50")}if(o.selfCare&&document.querySelectorAll('.pastel-checkbox input[type="checkbox"]').forEach(a=>{a.checked=o.selfCare.includes(a.value)}),o.photos&&o.photos.length>0){const a=document.querySelectorAll(".photo-upload");o.photos.slice(0,3).forEach((d,c)=>{if(a[c]){a[c].innerHTML=`
                            <img src="${d}" 
                                 alt="Uploaded photo ${c+1}" 
                                 class="w-full h-full object-cover rounded-[16px] shadow-image">
                            <button class="delete-photo absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-70 hover:opacity-100 transition-opacity">
                                <i data-lucide="x" class="w-3 h-3"></i>
                            </button>
                        `,a[c].classList.add("image-hover","has-image");const m=a[c].querySelector(".delete-photo");m&&(m.onclick=f=>{f.stopPropagation();const p=`
                                    <div class="w-full h-full flex flex-col items-center justify-center">
                                        <i data-lucide="plus" class="w-8 h-8 mb-1"></i>
                                        <span class="text-xs">Ảnh ${c+1}</span>
                                    </div>
                                `;a[c].innerHTML=p,a[c].classList.remove("image-hover","has-image"),typeof lucide<"u"&&lucide.createIcons()})}})}}else this.resetFormForNewDay();setTimeout(()=>{u.setupPhotoUpload()},100)}static resetFormForNewDay(){["achievements","stress","gratitude1","gratitude2","gratitude3","highlight","content"].forEach(i=>{const o=document.getElementById(i);o&&(o.value="")}),document.querySelectorAll('.pastel-checkbox input[type="checkbox"]').forEach(i=>{i.checked=!1}),document.querySelectorAll(".photo-upload").forEach((i,o)=>{i.innerHTML=`
                <div class="w-full h-full flex flex-col items-center justify-center">
                    <i data-lucide="plus" class="w-8 h-8 mb-1"></i>
                    <span class="text-xs">Ảnh ${o+1}</span>
                </div>
            `,i.classList.remove("image-hover","has-image")});const t=document.querySelector('.mood-btn[data-mood="😊"]');if(t){const i=getComputedStyle(document.body).getPropertyValue("--button-bg"),o=getComputedStyle(document.body).getPropertyValue("--accent-light");document.querySelectorAll(".mood-btn").forEach(s=>{s.style.backgroundColor=o,s.classList.remove("ring-4","ring-offset-2","ring-accent-light/50")}),t.style.backgroundColor=i,t.classList.add("ring-4","ring-offset-2","ring-accent-light/50")}const n=document.getElementById("save-status");n&&(n.textContent="Sẵn sàng viết nhật ký!",n.classList.add("text-blue-500"),setTimeout(()=>{n.classList.remove("text-blue-500"),n.textContent="Đã lưu tự động"},2e3)),setTimeout(()=>{var i;(i=document.getElementById("content"))==null||i.focus()},300),typeof lucide<"u"&&lucide.createIcons()}static deleteEntry(e){try{let t=h.get("diaryEntries",[]);const n=t.length;return t=t.filter(i=>i.id!==e),t.length<n?(h.set("diaryEntries",t),typeof window.APP_STATE<"u"&&window.APP_STATE.currentView==="timeline"&&setTimeout(()=>{typeof window.TimelineManager<"u"&&window.TimelineManager.loadTimelineEntries()},100),typeof window.APP_STATE<"u"&&window.APP_STATE.currentView==="report"&&setTimeout(()=>{typeof window.ChartManager<"u"&&window.ChartManager.drawCharts()},100),u.showNotification("Đã xóa nhật ký thành công","success"),!0):(u.showNotification("Không tìm thấy nhật ký để xóa","error"),!1)}catch(t){return console.error("Lỗi khi xóa entry:",t),u.showNotification("Lỗi: Không thể xóa nhật ký","error"),!1}}static loadEntryForEdit(e){try{const n=h.get("diaryEntries",[]).find(a=>a.id===e);if(!n)return u.showNotification("Không tìm thấy nhật ký","error"),!1;typeof window.switchView<"u"&&window.switchView("diary");const i=document.getElementById("current-date");i&&(i.textContent=n.date);const o={achievements:n.achievements||"",stress:n.stress||"",gratitude1:n.gratitude1||"",gratitude2:n.gratitude2||"",gratitude3:n.gratitude3||"",highlight:n.highlight||"",content:n.content||""};Object.entries(o).forEach(([a,d])=>{const c=document.getElementById(a);c&&(c.value=d)});const s=document.querySelector(`.mood-btn[data-mood="${n.mood}"]`);if(s){const a=getComputedStyle(document.body).getPropertyValue("--button-bg"),d=getComputedStyle(document.body).getPropertyValue("--accent-light");document.querySelectorAll(".mood-btn").forEach(c=>{c.style.backgroundColor=d,c.classList.remove("ring-4","ring-offset-2","ring-accent-light/50")}),s.style.backgroundColor=a,s.classList.add("ring-4","ring-offset-2","ring-accent-light/50")}if(document.querySelectorAll('.pastel-checkbox input[type="checkbox"]').forEach(a=>{var d;a.checked=((d=n.selfCare)==null?void 0:d.includes(a.value))||!1}),document.querySelectorAll(".photo-upload").forEach((a,d)=>{a.innerHTML=`
                    <div class="w-full h-full flex flex-col items-center justify-center">
                        <i data-lucide="plus" class="w-8 h-8 mb-1"></i>
                        <span class="text-xs">Ảnh ${d+1}</span>
                    </div>
                `,a.classList.remove("image-hover","has-image")}),n.photos&&n.photos.length>0){const a=document.querySelectorAll(".photo-upload");n.photos.slice(0,3).forEach((d,c)=>{if(a[c]){a[c].innerHTML=`
                            <img src="${d}" 
                                 alt="Uploaded photo ${c+1}" 
                                 class="w-full h-full object-cover rounded-[16px] shadow-image">
                            <button class="delete-photo absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-70 hover:opacity-100 transition-opacity">
                                <i data-lucide="x" class="w-3 h-3"></i>
                            </button>
                        `,a[c].classList.add("image-hover","has-image");const m=a[c].querySelector(".delete-photo");m&&(m.onclick=f=>{f.stopPropagation();const p=`
                                    <div class="w-full h-full flex flex-col items-center justify-center">
                                        <i data-lucide="plus" class="w-8 h-8 mb-1"></i>
                                        <span class="text-xs">Ảnh ${c+1}</span>
                                    </div>
                                `;a[c].innerHTML=p,a[c].classList.remove("image-hover","has-image"),typeof lucide<"u"&&lucide.createIcons()})}})}const l=document.getElementById("save-status");return l&&(l.textContent="Đang chỉnh sửa nhật ký cũ",l.classList.add("text-yellow-500")),setTimeout(()=>{var a;(a=document.getElementById("content"))==null||a.focus()},300),setTimeout(()=>{u.setupPhotoUpload()},100),!0}catch(t){return console.error("Lỗi khi tải entry để chỉnh sửa:",t),u.showNotification("Lỗi: Không thể tải nhật ký","error"),!1}}}class w{static loadTimelineEntries(){try{const e=document.querySelector(".timeline-container");if(!e)return;const t=document.getElementById("timeline-loading");t&&t.classList.remove("hidden");const n=h.get("diaryEntries",[]),i=h.get("moments",[]);let o=[...n.map(c=>({...c,type:"entry"})),...i.map(c=>({...c,type:"moment"}))].sort((c,m)=>(m.timestamp||0)-(c.timestamp||0));o=this.applyFilters(o);const s=e.querySelectorAll(".timeline-item"),l=Array.from(s).slice(0,2);Array.from(s).slice(2).forEach(c=>c.remove());let d=document.getElementById("timeline-items-container");if(d?d.innerHTML="":(d=document.createElement("div"),d.id="timeline-items-container",e.appendChild(d)),o.length===0){const c=document.createElement("div");c.className="timeline-item text-center p-8 text-soft",c.innerHTML=`
                    <i data-lucide="calendar" class="w-12 h-12 mx-auto mb-4 opacity-20"></i>
                    <p>Chưa có dữ liệu để hiển thị</p>
                `,d.appendChild(c),typeof lucide<"u"&&lucide.createIcons(),t&&t.classList.add("hidden");return}o.forEach((c,m)=>{const f=this.createTimelineItem(c,m);f.style.animationDelay=`${m*.1}s`,d.appendChild(f)}),t&&t.classList.add("hidden"),typeof lucide<"u"&&lucide.createIcons()}catch(e){console.error("Lỗi khi tải timeline:",e);const t=document.getElementById("timeline-loading");t&&t.classList.add("hidden")}}static applyFilters(e){const t=document.getElementById("search-input"),n=t?t.value.toLowerCase().trim():"",i=document.getElementById("mood-filter"),o=i?i.value:"",s=document.getElementById("type-filter"),l=s?s.value:"";return e.filter(a=>!(n&&![a.content||"",a.achievements||"",a.stress||"",a.highlight||"",a.name||"",a.description||"",a.gratitude1||"",a.gratitude2||"",a.gratitude3||""].join(" ").toLowerCase().includes(n)||o&&a.mood!==o||l&&(l==="entry"&&a.type!=="entry"||l==="moment"&&a.type!=="moment")))}static createTimelineItem(e,t){const n=e.type==="entry",i=document.createElement("div");return i.className="timeline-item",n?i.innerHTML=`
                <div class="bg-card p-6 rounded-card shadow-soft card-glow hover:transform hover:scale-[1.02] transition-all duration-300">
                    <div class="flex justify-between items-start mb-3">
                        <div>
                            <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-accent-light text-accent mb-2">
                                <i data-lucide="book-open" class="w-3 h-3 inline mr-1"></i> Nhật ký
                            </span>
                            <h3 class="font-bold text-lg">${e.date||"Không có ngày"}</h3>
                        </div>
                        <div class="flex flex-col items-end">
                            <span class="text-3xl">${e.mood||"😊"}</span>
                            <div class="flex space-x-2 mt-2">
                                <button onclick="editEntry('${e.id}')" class="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition">
                                    <i data-lucide="edit" class="w-3 h-3 inline mr-1"></i>Sửa
                                </button>
                                <button onclick="deleteEntry('${e.id}')" class="text-xs px-3 py-1 bg-red-100 text-red-800 rounded-full hover:bg-red-200 transition">
                                    <i data-lucide="trash-2" class="w-3 h-3 inline mr-1"></i>Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    ${e.highlight?`
                        <div class="mb-4 p-3 rounded-lg bg-yellow-50 border border-yellow-100">
                            <div class="flex items-center text-yellow-800 mb-1">
                                <i data-lucide="star" class="w-4 h-4 mr-2"></i>
                                <span class="font-semibold">Khoảnh khắc đẹp:</span>
                            </div>
                            <p class="text-sm">${e.highlight}</p>
                        </div>
                    `:""}
                    
                    ${e.achievements?`
                        <div class="mb-3">
                            <span class="font-semibold text-accent">🎯 Thành tựu:</span>
                            <p class="text-sm mt-1">${e.achievements}</p>
                        </div>
                    `:""}
                    
                    ${e.stress?`
                        <div class="mb-3">
                            <span class="font-semibold text-accent">⚠️ Căng thẳng:</span>
                            <p class="text-sm mt-1">${e.stress}</p>
                        </div>
                    `:""}
                    
                    ${e.content?`
                        <div class="mb-3">
                            <span class="font-semibold text-accent">📝 Nội dung:</span>
                            <p class="text-sm mt-1 line-clamp-3">${e.content}</p>
                        </div>
                    `:""}
                    
                    ${e.gratitude1||e.gratitude2||e.gratitude3?`
                        <div class="mb-3">
                            <span class="font-semibold text-accent">🙏 Biết ơn:</span>
                            <ul class="text-sm mt-1 space-y-1">
                                ${e.gratitude1?`<li>• ${e.gratitude1}</li>`:""}
                                ${e.gratitude2?`<li>• ${e.gratitude2}</li>`:""}
                                ${e.gratitude3?`<li>• ${e.gratitude3}</li>`:""}
                            </ul>
                        </div>
                    `:""}
                    
                    ${e.selfCare&&e.selfCare.length>0?`
                        <div class="mt-4 pt-3 border-t border-gray-100">
                            <span class="font-semibold text-accent">💆‍♀️ Self-care:</span>
                            <div class="flex flex-wrap gap-1 mt-2">
                                ${e.selfCare.map(o=>`
                                    <span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">${o}</span>
                                `).join("")}
                            </div>
                        </div>
                    `:""}
                    
                    ${e.photos&&e.photos.length>0?`
                        <div class="mt-4 pt-3 border-t border-gray-100">
                            <span class="font-semibold text-accent">📸 Ảnh:</span>
                            <div class="flex space-x-2 mt-2 overflow-x-auto">
                                ${e.photos.slice(0,3).map(o=>`
                                    <img src="${o}" alt="Photo" class="w-20 h-20 object-cover rounded-lg flex-shrink-0">
                                `).join("")}
                            </div>
                        </div>
                    `:""}
                    
                    <div class="mt-4 pt-3 border-t border-gray-100 text-xs text-soft">
                        <i data-lucide="clock" class="w-3 h-3 inline mr-1"></i>
                        ${e.timestamp?new Date(e.timestamp).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}):"Không có thời gian"}
                    </div>
                </div>
            `:i.innerHTML=`
                <div class="bg-card p-6 rounded-card shadow-soft card-glow hover:transform hover:scale-[1.02] transition-all duration-300">
                    <div class="flex justify-between items-start mb-3">
                        <div>
                            <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 mb-2">
                                <i data-lucide="sparkles" class="w-3 h-3 inline mr-1"></i> Khoảnh khắc
                            </span>
                            <h3 class="font-bold text-lg">${e.name||"Không có tên"}</h3>
                            <p class="text-sm text-soft">${e.date||"Không có ngày"}</p>
                        </div>
                        <span class="text-3xl">${e.mood||"⭐"}</span>
                    </div>
                    
                    ${e.description?`
                        <div class="mb-4">
                            <p class="text-sm">${e.description}</p>
                        </div>
                    `:""}
                    
                    <div class="mt-4 pt-3 border-t border-gray-100 text-xs text-soft">
                        <i data-lucide="clock" class="w-3 h-3 inline mr-1"></i>
                        ${e.timestamp?new Date(e.timestamp).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}):"Không có thời gian"}
                        ${e.type==="highlight"?' • <span class="text-yellow-600">Từ highlight nhật ký</span>':""}
                    </div>
                </div>
            `,i}static clearFilters(){const e=document.getElementById("search-input"),t=document.getElementById("mood-filter"),n=document.getElementById("type-filter");e&&(e.value=""),t&&(t.value=""),n&&(n.value=""),this.loadTimelineEntries(),u.showNotification("Đã xóa tất cả bộ lọc","info")}}class ${static saveReflection(){var e,t,n;try{const i=new Date,o=i.getMonth()+1,s=i.getFullYear(),l={id:`reflection_${s}_${o}_${Math.random().toString(36).substr(2,9)}`,month:o,year:s,learned:((e=document.getElementById("learned"))==null?void 0:e.value.trim())||"",proudOf:((t=document.getElementById("proud-of"))==null?void 0:t.value.trim())||"",improvement:((n=document.getElementById("improvement"))==null?void 0:n.value.trim())||"",timestamp:i.getTime()},a=`monthlyReflections_${s}_${o}`;return h.set(a,l),u.showNotification("Reflection đã được lưu! 📝","success"),!0}catch(i){return console.error("Lỗi khi lưu reflection:",i),u.showNotification("Lỗi: Không thể lưu reflection","error"),!1}}static loadReflection(){try{const e=new Date,t=e.getMonth()+1,i=`monthlyReflections_${e.getFullYear()}_${t}`,o=h.get(i,{}),s=["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"],l=document.querySelector("#reflection-page h1");return l&&(l.textContent=`Reflection ${s[t-1]}`),document.getElementById("learned").value=o.learned||"",document.getElementById("proud-of").value=o.proudOf||"",document.getElementById("improvement").value=o.improvement||"",o}catch(e){return console.error("Lỗi khi tải reflection:",e),{}}}}const v={currentView:"diary"};function N(){const r=y.saveDailyEntry();return r&&(u.updateStreakCounter(),setTimeout(()=>{u.showNotification("Nhật ký đã được lưu và reset sẵn sàng cho ngày mới! 🎉","success")},500)),r}function _(r){return y.loadEntryForEdit(r)}function j(r){return confirm("Bạn có chắc chắn muốn xóa nhật ký này không?")?y.deleteEntry(r):!1}function F(){var s,l;const r=(s=document.getElementById("moment-name"))==null?void 0:s.value.trim(),e=(l=document.getElementById("moment-desc"))==null?void 0:l.value.trim();if(!r)return u.showNotification("Vui lòng nhập tên khoảnh khắc","warning"),!1;const t=new Date,n=t.toLocaleDateString("vi-VN",{year:"numeric",month:"2-digit",day:"2-digit"}),i={id:`moment_${Date.now()}_${Math.random().toString(36).slice(2)}`,name:r,description:e,date:n,mood:"⭐",type:"manual",timestamp:t.getTime()},o=h.get("moments",[]);return o.unshift(i),h.set("moments",o),document.getElementById("moment-name").value="",document.getElementById("moment-desc").value="",document.getElementById("moment-input").classList.add("hidden"),u.showNotification("Khoảnh khắc đã được lưu! 🌟","success"),v.currentView==="timeline"&&w.loadTimelineEntries(),!0}function O(){return $.saveReflection()}function H(){return u.exportData()}function R(){return w.clearFilters()}function B(r){var t;v.currentView=r,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),(t=document.getElementById(`${r}-page`))==null||t.classList.remove("hidden"),document.querySelectorAll(".nav-item").forEach(n=>{n.classList.remove("bg-accent-light","font-bold"),n.style.backgroundColor=""});const e=document.querySelector(`.nav-item[data-view="${r}"]`);if(e){const n=getComputedStyle(document.body).getPropertyValue("--accent-light");e.classList.add("bg-accent-light","font-bold"),e.style.backgroundColor=n}r==="report"&&K(),r==="timeline"&&w.loadTimelineEntries(),r==="reflection"&&$.loadReflection(),window.scrollTo({top:0,behavior:window.innerWidth<768?"auto":"smooth"})}function U(){const r=document.getElementById("theme-panel");r&&(r.classList.contains("hidden")?(r.classList.remove("hidden"),window.innerWidth>=768&&r.classList.add("animate-fadeIn")):(r.classList.add("animate-fadeOut"),setTimeout(()=>{r.classList.add("hidden"),r.classList.remove("animate-fadeOut")},300)))}let T=!1;function K(){T||v.currentView!=="report"||(T=!0,q(async()=>{const{ChartManager:r}=await import("./chart-ChXeoeW0.js");return{ChartManager:r}},[]).then(({ChartManager:r})=>{r.drawCharts()}).catch(r=>console.error("Chart load error:",r)))}function z(){document.querySelectorAll(".mood-btn").forEach(r=>{r.addEventListener("click",e=>{const t=getComputedStyle(document.body).getPropertyValue("--button-bg"),n=getComputedStyle(document.body).getPropertyValue("--accent-light");document.querySelectorAll(".mood-btn").forEach(i=>{i.style.backgroundColor=n,i.classList.remove("ring-4","ring-offset-2")}),e.currentTarget.style.backgroundColor=t,e.currentTarget.classList.add("ring-4","ring-offset-2"),e.currentTarget.style.transform="scale(0.95)",setTimeout(()=>e.currentTarget.style.transform="",150)})})}function J(){document.querySelectorAll(".pastel-checkbox").forEach(r=>{const e=r.querySelector("input");r.addEventListener("click",()=>{if(e.checked){const t=r.querySelector(".checkbox-icon");t==null||t.classList.add("animate-bounce-once"),setTimeout(()=>{t==null||t.classList.remove("animate-bounce-once")},500)}})})}function W(){let r;document.addEventListener("input",e=>{e.target.matches('textarea, input[type="text"]')&&(clearTimeout(r),r=setTimeout(()=>{const t=document.getElementById("save-status");t&&(t.textContent="Đã lưu tự động")},2e3))})}function k(){var r;typeof lucide<"u"&&lucide.createIcons(),z(),J(),u.setupPhotoUpload(),img.alt="Ảnh nhật ký người dùng",W(),(r=document.getElementById("photo-journal"))==null||r.classList.remove("hidden")}function C(){document.documentElement.classList.add("preload"),window.addEventListener("load",()=>{document.documentElement.classList.remove("preload"),document.querySelectorAll("img").forEach(r=>r.loading="lazy")}),h.initializeDefaults(),M(),u.updateStreakCounter(),y.loadTodayEntry(),B(v.currentView),"requestIdleCallback"in window?requestIdleCallback(k):setTimeout(k,500)}window.switchView=B;window.toggleThemePanel=U;window.setTheme=I;window.saveDailyEntry=N;window.saveMoment=F;window.saveReflection=O;window.clearFilters=R;window.exportData=H;window.editEntry=_;window.deleteEntry=j;document.readyState==="loading"?document.addEventListener("DOMContentLoaded",C):C();export{h as S};
