(this.webpackJsonpsorting_visualizer=this.webpackJsonpsorting_visualizer||[]).push([[0],[,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var c=n(1),o=n.n(c),r=n(4),s=n.n(r),a=(n(9),n(10),n(2));n(11);function l(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return i(e.slice(),0,e.length-1,t,n)}function i(e,t,n,c){var o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],r=Math.floor((t+n)/2),s=t,a=r,l=r+1,u=n,h=e.slice(),b=e.slice();a-s>0&&(h=i(e,s,a,c,o)),u-l>0&&(b=i(e,l,u,c,o));for(var d=e.slice(),f=s,j=l,m=f;f<=a&&j<=u;)c.push([f,j]),c.push([f,j]),h[f]>b[j]&&o||h[f]<=b[j]&&!o?(c.push([m,b[j]]),d[m++]=b[j++]):(c.push([m,h[f]]),d[m++]=h[f++]);for(;j<=u;)c.push([j,j]),c.push([j,j]),c.push([m,b[j]]),d[m++]=b[j++];for(;f<=a;)c.push([f,f]),c.push([f,f]),c.push([m,h[f]]),d[m++]=h[f++];return d}function u(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],c=e.slice();return b(c,0,c.length,t,n),c}var h=function(e,t,n,c){if(!(t===n&&t<e.length)){c.push([t,n]),c.push([t,n]),c.push([t,e[n],n,e[t]]);var o=e[t];e[t]=e[n],e[n]=o}},b=function e(t,n,c,o,r){if(c-n>1){var s=Math.floor((n+c)/2),a=t[s];h(t,n,s,o),o.push([n,"green",!0]);for(var l=n+1,i=c-1;;){for(;l<=i&&(r&&t[l]<=a||!r&&t[l]>=a);)o.push([l,l]),o.push([l,l]),++l;for(;l<=i&&(r&&t[i]>=a||!r&&t[i]<=a);)o.push([i,i]),o.push([i,i]),--i;if(l>i)return o.push([n,"green",!1]),h(t,n,i,o),e(t,n,i,o,r),void e(t,i+1,c,o,r);h(t,l,i,o),l++,i--}}};function d(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],c=[];if(e.length){c.push(e[0]);for(var o=1;o<e.length;++o){t.push([o,"green",!0]);for(var r=0;r<c.length&&(e[o]>c[r]&&n||e[o]<c[r]&&!n);)t.push([r,"red",!0]),t.push([r,"red",!1]),++r;c.splice(r,0,e[o]),t.push([r,c[r]]);for(var s=r+1;s<c.length;++s)t[t.length-1].push(s),t[t.length-1].push(c[s]);t.push([o,"green",!1])}}return c}function f(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],c=e.slice();if(c.length)for(var o=1/0,r=0,s=n?0:c.length-1,a=n?1:-1,l=n?0:c.length+1,i=s;i!==c.length-s-1;i+=a){t.push([i,"green",!0]),o=1/0,r=s;for(var u=i;u!==c.length-l;u+=a)u!==i&&(t.push([u,"red",!0]),t.push([u,"red",!1])),c[u]<o&&(o=c[u],r=u);t.push([i,"green",!1]),r!==i&&(c[r]=c[i],c[i]=o,t.push([r,c[r],i,o]))}return c}function j(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],c=e.slice(),o=c.length-1,r=0;r<o;r++)for(var s=0;s<o-r;s++){var a=n?c[s]>c[s+1]:c[s]<c[s+1];a&&h(c,s,s+1,t)}return c}function m(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],c=e.slice(),o=c.length,r=Math.floor(o/2-1);r>=0;r--)t.push([r,r]),t.push([r,r]),g(c,o,r,t,n);for(var s=o-1;s>=0;s--)t.push([s,s]),t.push([s,s]),h(c,0,s,t),g(c,s,0,t,n);return c}var g=function e(t,n,c,o,r){var s=c,a=2*c+1,l=2*c+2,i=r?t[a]>t[s]:t[a]<t[s];a<n&&i&&(s=a),i=r?t[l]>t[s]:t[l]<t[s],l<n&&i&&(s=l),s!==c&&(h(t,c,s,o),e(t,n,s,o,r))},v=(n(12),n(0)),p=function(e){return Object(v.jsx)("div",{className:"popup-box",children:Object(v.jsx)("div",{className:"box",style:{borderColor:e.border_colour},children:e.content})})},O=(n(14),function(e){var t=e.progress;return Object(v.jsxs)("div",{className:"progress",children:[Object(v.jsx)("div",{className:"progress__fill",id:"fill",style:{"--width":"".concat(t)}}),Object(v.jsxs)("span",{className:"progress__text",id:"text",children:[t,"%"]})]})}),x=1e3,N="white",w="red",y="green",C=100;function k(){var e=Object(c.useState)([]),t=Object(a.a)(e,2),n=t[0],o=t[1],r=Object(c.useState)([]),s=Object(a.a)(r,2),i=s[0],h=s[1],b=Object(c.useState)(!0),g=Object(a.a)(b,2),k=g[0],S=g[1],D=Object(c.useState)(!1),E=Object(a.a)(D,2),T=E[0],B=E[1],M=Object(c.useState)(!1),P=Object(a.a)(M,2),A=P[0],_=P[1],F=Object(c.useState)(!1),q=Object(a.a)(F,2),I=q[0],L=q[1],z=Object(c.useState)(300),J=Object(a.a)(z,2),R=J[0],H=J[1],Q="rgb(".concat(51/190*R-255/19,",").concat(-2/1805*Math.pow(R-525,2)+250,",").concat(-51/190*R+5100/19,")"),V=Object(c.useState)(300),G=Object(a.a)(V,2),K=G[0],U=G[1],W=Object(c.useState)(Q),X=Object(a.a)(W,2),Y=X[0],Z=X[1],$=Object(c.useState)("slow"),ee=Object(a.a)($,2),te=ee[0],ne=ee[1],ce="slow"===te?"#fa8072":"medium"===te?"#ffa500":"#3cb371",oe=Object(c.useState)("Slow"),re=Object(a.a)(oe,2),se=re[0],ae=re[1],le=Object(c.useState)(ce),ie=Object(a.a)(le,2),ue=ie[0],he=ie[1],be=Object(c.useState)(""),de=Object(a.a)(be,2),fe=de[0],je=de[1],me=Object(c.useState)("white"),ge=Object(a.a)(me,2),ve=ge[0],pe=ge[1],Oe=Object(c.useState)(0),xe=Object(a.a)(Oe,2),Ne=xe[0],we=xe[1],ye=function(e){return R<=100?"slow"===te?10:"medium"===te?6:3:"merge"===e||"quick"===e||"heap"===e?"slow"===te?1.5:"medium"===te?1:.5:"slow"===te?1:"medium"===te?.1:.01};Object(c.useEffect)((function(){Ce()}),[]);var Ce=function(){qe(!0);for(var e=[],t=0;t<R;++t)e.push(Me(1e3,10));je(""),o(e),h(e)},ke=function(e,t,n,c,o){var r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,s=Object(a.a)(e[c],2),l=s[0],i=s[1],u=t[l].style,h=t[i].style,b=n?N:w;setTimeout((function(){u.backgroundColor=b,h.backgroundColor=b}),c*o+r+C)},Se=function(e,t,n){n[e].style.height="".concat(t/10,"%")},De=function(e,t,n,c){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0;setTimeout((function(){var c=Object(a.a)(e[n],4),o=c[0],r=c[1],s=c[2],l=c[3];Se(o,r,t),Se(s,l,t)}),n*c+o+C)},Ee=function(e,t,n,c){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,r=Object(a.a)(e[n],3),s=r[0],l=r[1],i=r[2],u=t[s].style;"green"===l?setTimeout((function(){u.backgroundColor=i?y:N}),n*c+o+C):setTimeout((function(){u.backgroundColor=i?w:N}),n*c+o+C)},Te=function(e,t,n){var c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,r=document.getElementsByClassName("array-bar"),s=2;e.forEach((function(e,o){setTimeout((function(){r[o].style.backgroundColor=y}),t*n+o*s+c+C)})),setTimeout((function(){o(e),B(!1),console.log(Be(e,i))}),t*n+e.length*s+c+C)},Be=function(e,t){var n=k?t.slice().sort((function(e,t){return e-t})):t.slice().sort((function(e,t){return t-e}));if(n.length!==e.length)return!1;for(var c=0;c<n.length;c++)if(n[c]!==e[c])return!1;return!0},Me=function(e,t){return Math.floor(Math.random()*(e-t+1)+t)},Pe=function(){if(pe("white"),!T){if(I&&R>=50&&R<=x)Ce(),L(!1);else if(R<50||R>x)return void alert("Please ensure number of elements is between 150 and 1500");A&&(qe(I),ae("slow"===te?"Slow":"medium"===te?"Medium":"Fast"),U(R),Z(Q),he(ce)),_(!A)}},Ae=function(e){var t=e.target.value;t<=x&&t!==R&&(H(t),L(!0))},_e=function(e){ne(e)},Fe=function(e,t){pe(e?t:"white")},qe=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];e||o(i),je("");var t=document.getElementsByClassName("array-bar");n.forEach((function(e,n){t[n].style.backgroundColor=N}))},Ie=function(){!function(){for(var e=0;e<100;e++){for(var t=[],n=Me(1e3,1),c=0;c<n;c++)t.push(Me(-1e3,1e3));var o=[],r=l(t.slice(),[],k);o.push(r);var s=u(t.slice(),[],k);o.push(s);var a=d(t.slice(),[],k);o.push(a);var i=f(t.slice(),[],k);o.push(i);var h=j(t.slice(),[],k);o.push(h);var b=m(t.slice(),[],k);o.push(b);for(var g=0;g<o.length;g++)if(!Be(o[g],t))return!1}return!0}()?alert("Testing Failed"):alert("Testing Passed")},Le=T||i!==n?"unclickable":"",ze=T?"unclickable":"",Je={color:"white",backgroundColor:"#4caf50",pointerEvents:"none"};return Object(v.jsxs)("div",{children:[Object(v.jsx)("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"}),Object(v.jsx)("div",{className:"array-container",children:n.map((function(e,t){return Object(v.jsx)("div",{className:"array-bar",style:{backgroundColor:N,height:"".concat(e/10,"%"),"--numBars":"".concat(K)}},t)}))}),Object(v.jsx)("br",{}),Object(v.jsxs)("div",{className:"button-container",children:[Object(v.jsxs)("div",{className:"button-set control",children:[Object(v.jsx)("h3",{className:"header",children:"Controls"}),Object(v.jsxs)("span",{className:"unclickable"===ze?"not-allowed-cursor":"",children:[Object(v.jsx)("button",{className:"button control-button ".concat(ze),onClick:function(){return Ce()},children:"New Array"}),Object(v.jsx)("button",{className:"button control-button ".concat(ze),onClick:function(){return qe()},children:"Reset Array"}),Object(v.jsx)("button",{className:"button control-button ".concat(ze),onClick:function(){return Ie()},children:"Test Sorting Algorithms"})]})]}),Object(v.jsxs)("div",{className:"button-set sorting",children:[Object(v.jsx)("h3",{className:"header",children:"Algorithms"}),Object(v.jsxs)("span",{className:"unclickable"===Le?"not-allowed-cursor":"",children:[Object(v.jsx)("button",{className:"button sorting-button ".concat("merge"!==fe&&Le),style:"merge"===fe?Je:null,onClick:function(){return function(){var e=[],t=new Date,c=l(n,e,k);B(!0),je("merge");for(var o=ye("merge"),r=function(n){var c=document.getElementsByClassName("array-bar"),r=n%3!==2,s=new Date-t;r?ke(e,c,n%3!==0,n,o,s):setTimeout((function(){var t=Object(a.a)(e[n],2),o=t[0],r=t[1];Se(o,r,c)}),n*o+s+C)},s=0;s<e.length;s++)r(s);Te(c,e.length,o,new Date-t)}()},children:"Merge Sort"}),Object(v.jsx)("button",{className:"button sorting-button ".concat("quick"!==fe&&Le),style:"quick"===fe?Je:null,onClick:function(){return function(){var e=[],t=new Date,c=u(n,e,k);B(!0),je("quick");for(var o=ye("quick"),r=!0,s=0;s<e.length;s++){var a=document.getElementsByClassName("array-bar"),l=2===e[s].length,i=new Date-t;l?ke(e,a,r=!r,s,o,i):3===e[s].length?Ee(e,a,s,o,i):De(e,a,s,o,i)}Te(c,e.length,o,new Date-t)}()},children:"Quick Sort"}),Object(v.jsx)("button",{className:"button sorting-button ".concat("heap"!==fe&&Le),style:"heap"===fe?Je:null,onClick:function(){return function(){var e=[],t=new Date,c=m(n,e,k);B(!0),je("heap");for(var o=ye("heap"),r=!0,s=0;s<e.length;s++){var a=document.getElementsByClassName("array-bar"),l=2===e[s].length,i=new Date-t;l?ke(e,a,r=!r,s,o,i):De(e,a,s,o,i)}Te(c,e.length,o,new Date-t)}()},children:"Heap Sort"}),Object(v.jsx)("button",{className:"button sorting-button ".concat("bubble"!==fe&&Le),style:"bubble"===fe?Je:null,onClick:function(){return function(){var e=[],t=new Date,c=j(n,e,k);B(!0),je("bubble");var o=ye("bubble"),r=!0;if(R<700){for(var s=0;s<e.length;s++){var a=document.getElementsByClassName("array-bar"),l=2===e[s].length,i=new Date-t;l?ke(e,a,r=!r,s,o,i):De(e,a,s,o,i)}Te(c,e.length,o,new Date-t)}else new Promise((function(e){we(1),e()})).then((function(){for(var n=function(n){var c=document.getElementsByClassName("array-bar"),s=2===e[n].length;new Promise((function(t){setTimeout((function(){we(n===e.length-1?0:Math.round(n/e.length*100))}),0),t()})).then((function(){var a=new Date-t;s?ke(e,c,r=!r,n,o,a):De(e,c,n,o,a)}))},c=0;c<e.length;c++)n(c)})).then((function(){Te(c,e.length,o,new Date-t)}))}()},children:"Bubble Sort"}),Object(v.jsx)("button",{className:"button sorting-button ".concat("selection"!==fe&&Le),style:"selection"===fe?Je:null,onClick:function(){return function(){var e=[],t=new Date,c=f(n,e,k);B(!0),je("selection");var o=ye("selection");if(R<700){for(var r=0;r<e.length;r++){var s=document.getElementsByClassName("array-bar"),a=3===e[r].length,l=new Date-t;a?Ee(e,s,r,o,l):De(e,s,r,o,l)}Te(c,e.length,o,new Date-t)}else new Promise((function(e){we(1),e()})).then((function(){for(var n=function(n){var c=document.getElementsByClassName("array-bar"),r=3===e[n].length;new Promise((function(t){setTimeout((function(){we(n===e.length-1?0:Math.round(n/e.length*100))}),0),t()})).then((function(){var s=new Date-t;r?Ee(e,c,n,o,s):De(e,c,n,o,s)}))},c=0;c<e.length;c++)n(c)})).then((function(){Te(c,e.length,o,new Date-t)}))}()},children:"Selection Sort"}),Object(v.jsx)("button",{className:"button sorting-button ".concat("insertion"!==fe&&Le),style:"insertion"===fe?Je:null,onClick:function(){return function(){var e=[],t=new Date,c=d(n,e,k);B(!0),je("insertion");var o=ye("insertion");if(R<700){for(var r=function(n){var c=document.getElementsByClassName("array-bar"),r="string"===typeof e[n][1],s=new Date-t;r?Ee(e,c,n,o,s):setTimeout((function(){for(var t=0;t<e[n].length-1;t+=2){var o=e[n][t],r=e[n][t+1];Se(o,r,c)}}),n*o+s+C)},s=0;s<e.length;s++)r(s);Te(c,e.length,o,new Date-t)}else new Promise((function(e){we(1),e()})).then((function(){for(var n=function(n){var c=document.getElementsByClassName("array-bar"),r="string"===typeof e[n][1];new Promise((function(t){setTimeout((function(){we(n===e.length-1?0:Math.round(n/e.length*100))}),0),t()})).then((function(){var s=new Date-t;r?Ee(e,c,n,o,s):setTimeout((function(){for(var t=0;t<e[n].length-1;t+=2){var o=e[n][t],r=e[n][t+1];Se(o,r,c)}}),n*o+s+C)}))},c=0;c<e.length;c++)n(c)})).then((function(){Te(c,e.length,o,new Date-t)}))}()},children:"Insertion Sort"})]})]}),Object(v.jsxs)("div",{className:"button-set ascending-control",style:{borderColor:k?"#ff00ff":"#ff00a1"},children:[Object(v.jsxs)("h3",{className:"header",children:["Sort: ",k?Object(v.jsx)("i",{style:{color:"#BA55D3"},children:"Ascending"}):Object(v.jsx)("i",{style:{color:"#C71585"},children:"Descending"})]}),Object(v.jsxs)("label",{className:"switch",children:[Object(v.jsx)("input",{type:"checkbox",onClick:function(){S(!k)}}),Object(v.jsx)("span",{className:"slider-sortOrder round"})]})]}),Object(v.jsxs)("div",{className:"button-set speed-elements",style:{borderImage:"linear-gradient(45deg, ".concat(Y,", ").concat(ue,") 1")},children:[Object(v.jsxs)("h3",{className:"header",children:["Speed: ",Object(v.jsx)("i",{style:{color:ue},children:se})]}),Object(v.jsxs)("h3",{className:"header",children:["Elements: ",Object(v.jsx)("i",{style:{color:Y},children:K})]})]}),Object(v.jsxs)("div",{className:"button-set settings",children:[Object(v.jsx)("h3",{className:"header",children:"Settings"}),Object(v.jsx)("button",{onClick:function(){return Pe()},className:"cog",children:Object(v.jsx)("span",{className:"fa fa-gears fa-2x"})})]})]}),A&&Object(v.jsx)(p,{border_colour:ce,content:Object(v.jsxs)("div",{children:[Object(v.jsx)("h3",{children:"Animation Speed"}),Object(v.jsxs)("div",{className:"popup-row",children:[Object(v.jsx)("div",{className:"popup-column column-triple",children:Object(v.jsx)("button",{className:"button slow-button",onClick:function(){return _e("slow")},style:"slow"===te?{backgroundColor:"#fa8072",color:"white",pointerEvents:"none"}:null,children:"Slow"})}),Object(v.jsx)("div",{className:"popup-column column-triple",children:Object(v.jsx)("button",{className:"button medium-button",onClick:function(){return _e("medium")},style:"medium"===te?{backgroundColor:"#ffa500",color:"white",pointerEvents:"none"}:null,children:"Medium"})}),Object(v.jsx)("div",{className:"popup-column column-triple",children:Object(v.jsx)("button",{className:"button fast-button",onClick:function(){return _e("fast")},style:"fast"===te?{backgroundColor:"#3cb371",color:"white",pointerEvents:"none"}:null,children:"Fast"})})]}),Object(v.jsx)("br",{}),Object(v.jsx)("h3",{children:"Number of Elements"}),Object(v.jsxs)("div",{className:"popup-row",children:[Object(v.jsx)("div",{className:"popup-column column-double",children:Object(v.jsx)("div",{className:"slidecontainer",children:Object(v.jsx)("input",{type:"range",min:50,max:x,value:R,className:"slider",id:"myRange",onChange:function(e){return Ae(e)}})})}),Object(v.jsx)("div",{className:"popup-column column-double",children:Object(v.jsxs)("span",{children:["Value:",Object(v.jsx)("input",{className:"numElements-input",type:"number",min:50,max:x,style:{color:Q},value:R,onChange:function(e){return Ae(e)}})]})})]}),Object(v.jsxs)("div",{className:"popup-row",children:[Object(v.jsx)("div",{className:"popup-column",children:Object(v.jsx)("div",{children:50})}),Object(v.jsx)("div",{className:"popup-column fifty",children:Object(v.jsx)("div",{children:x})})]}),Object(v.jsx)("br",{}),Object(v.jsx)("div",{children:Object(v.jsx)("button",{className:"button done-button",onClick:function(){return Pe()},style:{border:"2px solid ".concat(ce),backgroundColor:ve},onMouseEnter:function(){return Fe(!0,ce)},onMouseLeave:function(){return Fe(!1,ce)},children:"Done"})})]})}),Ne>0&&Ne<=100&&Object(v.jsx)(O,{progress:Ne})]})}var S=function(){return Object(v.jsx)("div",{className:"App",children:Object(v.jsx)(k,{})})},D=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,16)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),c(e),o(e),r(e),s(e)}))};s.a.render(Object(v.jsx)(o.a.StrictMode,{children:Object(v.jsx)(S,{})}),document.getElementById("root")),D()}],[[15,1,2]]]);
//# sourceMappingURL=main.d2294bf1.chunk.js.map