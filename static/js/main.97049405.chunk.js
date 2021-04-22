(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{30:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),s=n(10),c=n.n(s),i=n(3),r=n(7),u=n(40),d=n(5),l=n(6),p=function(){function e(){Object(d.a)(this,e),this.queue=void 0,this.queue=[]}return Object(l.a)(e,[{key:"front",value:function(){if(0!==this.queue.length)return this.queue[0]}},{key:"pop",value:function(){return this.queue.shift()}},{key:"push",value:function(e){this.queue.push(e)}},{key:"empty",value:function(){return 0===this.queue.length}}]),e}(),h=function(){function e(){Object(d.a)(this,e),this.stack=void 0,this.stack=[]}return Object(l.a)(e,[{key:"top",value:function(){if(0!==this.stack.length)return this.stack[0]}},{key:"pop",value:function(){return this.stack.shift()}},{key:"push",value:function(e){this.stack.unshift(e)}},{key:"empty",value:function(){return 0===this.stack.length}}]),e}();function f(e,t){return e<=t}var v=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f;Object(d.a)(this,e),this.pQueue=void 0,this.compare=void 0,this.pQueue=[],this.compare=t}return Object(l.a)(e,[{key:"getPos",value:function(e,t,n){for(;t<=n;){if(t===n)return this.compare(e,this.pQueue[t])?t:t+1;var o=Math.floor((t+n)/2);this.compare(e,this.pQueue[o])?n=o-1:t=o+1}return 0}},{key:"front",value:function(){if(0!==this.pQueue.length)return this.pQueue[0]}},{key:"pop",value:function(){return this.pQueue.shift()}},{key:"push",value:function(e){var t=this.getPos(e,0,this.pQueue.length-1);this.pQueue.splice(t,0,e)}},{key:"empty",value:function(){return 0===this.pQueue.length}}]),e}(),j=n(2),g=function(e){var t=Object(j.a)({},e);return t.visited=!0,t},b=function(e){var t=Object(j.a)({},e);return t.state="touched",t},O=function(e,t){if(e.rootID){console.log("Starting BFS");var n=new p;n.push(e.rootID);for(var o={},a=0,s=function(){var s=n.pop();console.log(s);var c=e.nodes[s];o[c.id]=!0,setTimeout((function(){t(g(c))}),a),a+=300,e.nodes[c.id].connections.forEach((function(s){var c=e.nodes[s.nodeID];o[s.nodeID]||(n.push(s.nodeID),setTimeout((function(){t(b(c))}),a))}))};!n.empty();)s();console.log("BFS finished")}else console.log("Root is not set")},D=function(e,t){if(e.rootID){console.log("Starting DFS");var n=new h;n.push(e.rootID);for(var o={},a=0,s=function(){var s=n.pop();console.log(s);var c=e.nodes[s];o[c.id]=!0,setTimeout((function(){t(g(c))}),a),a+=300,e.nodes[c.id].connections.forEach((function(s){var c=e.nodes[s.nodeID];o[s.nodeID]||(n.push(s.nodeID),setTimeout((function(){t(b(c))}),a))}))};!n.empty();)s();console.log("DFS finished")}else console.log("Root is not set")},y=function(e,t,n){if(e.rootID){console.log("Starting Dijkstra");var o={},a={},s=new v((function(e,t){return e.cost<=t.cost})),c={};c[e.rootID]={pathID:null,parentID:null},Object.values(e.nodes).forEach((function(e){o[e.id]=1/0})),o[e.rootID]=0,s.push({cost:0,nodeID:e.rootID});for(var i=0,r=function(){var n=s.pop();console.log(e.nodes[n.nodeID].data);var r=e.nodes[n.nodeID];if(a[n.nodeID]=!0,setTimeout((function(){t(g(r))}),i),i+=300,e.destinationID===n.nodeID)return"break";e.nodes[n.nodeID].connections.forEach((function(u){var d,l=null!==(d=e.paths[u.pathID].weight)&&void 0!==d?d:0;!a[u.nodeID]&&o[u.nodeID]>n.cost+l&&(o[u.nodeID]=n.cost+l,s.push({cost:o[u.nodeID],nodeID:u.nodeID}),setTimeout((function(){t(b(r))}),i),c[u.nodeID]={parentID:n.nodeID,pathID:u.pathID})}))};!s.empty();){if("break"===r())break}if(e.destinationID)for(var u=e.destinationID,d=function(){var t=c[u];if(!t)return console.log("Can't reach ",u),"break";setTimeout((function(){t.pathID&&n(function(e){var t=Object(j.a)({},e);return t.state="travel",t}(e.paths[t.pathID]))}),i),i+=300,u=t.parentID};u;){if("break"===d())break}Object.keys(o).forEach((function(t){console.log(e.nodes[t].data,o[t])})),console.log("Dijkstra finished")}else console.log("Root is not set")},I=function(e,t,n){console.log("Starting Grouping");var o={},a=0,s=-1;Object.values(e.nodes).forEach((function(c){if(!o[c.id]){++s;var i=t[s%t.length],r=new p;r.push(c.id);for(var u=function(){var t=r.pop();console.log(t);var c=e.nodes[t];o[c.id]=!0,setTimeout((function(){n(function(e,t,n){var o=Object(j.a)({},e);return o.state="grouped",o.group={id:t,color:n},o}(c,""+s,i))}),a),a+=150,e.nodes[c.id].connections.forEach((function(t){var s=e.nodes[t.nodeID];o[t.nodeID]||(r.push(t.nodeID),setTimeout((function(){n(b(s))}),a))}))};!r.empty();)u()}})),console.log("Grouping finished")},k="ADD_NODE",x="UPDATE_NODE",m="ADD_PATH",N="SET_ROOT",S="UNVISIT_ALL",C="UPDATE_PATH",w="SET_DESTINATION",T=function(e){return{type:x,payload:{updatedNode:e}}},P=(n(30),n(1)),E=function(e){var t="checkbox-input";return e.isChecked&&(t+=" checkbox-on"),Object(P.jsx)("div",{className:t,onClick:e.onClick})},M=(n(32),function(){return Object(P.jsx)("svg",{width:"17",height:"17",viewBox:"0 0 17 17",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:Object(P.jsx)("path",{d:"M16.7688 14.6976L13.4582 11.3876C13.3088 11.2382 13.1062 11.1552 12.8937 11.1552H12.3525C13.2689 9.9832 13.8135 8.50913 13.8135 6.90558C13.8135 3.09091 10.7221 0 6.90676 0C3.09144 0 0 3.09091 0 6.90558C0 10.7202 3.09144 13.8112 6.90676 13.8112C8.51058 13.8112 9.98491 13.2667 11.1571 12.3504V12.8915C11.1571 13.104 11.2401 13.3065 11.3895 13.4559L14.7001 16.7659C15.0122 17.078 15.517 17.078 15.8258 16.7659L16.7655 15.8264C17.0776 15.5143 17.0776 15.0097 16.7688 14.6976ZM6.90676 11.1552C4.55912 11.1552 2.65644 9.25613 2.65644 6.90558C2.65644 4.55834 4.5558 2.65599 6.90676 2.65599C9.25439 2.65599 11.1571 4.55502 11.1571 6.90558C11.1571 9.25281 9.25771 11.1552 6.90676 11.1552Z",fill:"#26408B"})})});var R=function(e){var t,n,a=Object(o.useState)(""),s=Object(i.a)(a,2),c=s[0],r=s[1],u=Object(o.useState)(),d=Object(i.a)(u,2),l=d[0],p=d[1],h=Object(o.useState)(!1),f=Object(i.a)(h,2),v=f[0],j=f[1],g=Object(o.createRef)(),b=Object(o.createRef)();t=b,n=function(){v&&j(!1)},Object(o.useEffect)((function(){var e=function(e){var o;(null===(o=t.current)||void 0===o?void 0:o.contains)&&!t.current.contains(e.target)&&n()};return document.addEventListener("mousedown",e),function(){document.removeEventListener("mousedown",e)}}),[t]),Object(o.useEffect)((function(){if(e.options.length>0&&void 0!=e.defaultSelectKey){var t=e.options.filter((function(t){if(t.key===e.defaultSelectKey)return t}));t.length>0&&p(t[0])}}),[]),Object(o.useEffect)((function(){var e;v&&(null===(e=g.current)||void 0===e||e.focus())}),[v]),Object(o.useEffect)((function(){e.setOptionState&&e.setOptionState(null===l||void 0===l?void 0:l.key)}),[l]);return Object(P.jsxs)("div",{className:"select-search",ref:b,onClick:function(){j(!v)},children:[Object(P.jsxs)("div",{className:"select-search-selected"+(v?" two-rounded":" all-rounded"),children:[Object(P.jsx)("div",{className:"select-search-selected-value",children:Object(P.jsx)("span",{children:(null===l||void 0===l?void 0:l.value)||e.defaultSlectText})}),Object(P.jsx)("div",{className:"select-search-selected-button"+(v?" down-arrow":" left-arrow")})]}),v&&Object(P.jsxs)("div",{className:"select-search-bar",children:[Object(P.jsxs)("div",{className:"input-box",children:[Object(P.jsx)("span",{children:Object(P.jsx)(M,{})}),Object(P.jsx)("input",{type:"text",onChange:function(e){return r(e.target.value)},ref:g,value:c})]}),e.options.filter((function(e){if(e.value.toLocaleLowerCase().includes(c.toLocaleLowerCase()))return e})).map((function(e){return Object(P.jsx)("div",{className:"select-search-option",onClick:function(){return p(e)},children:Object(P.jsx)("span",{children:e.value})},e.key)}))]})]})},L=(n(33),{updateNode:T}),A=Object(r.b)((function(){return{}}),L)((function(e){var t="selected"===e.gnode.state,n="touched"===e.gnode.state,o="gnode";o+=t?" gnode--selected":e.gnode.visited?" gnode--visited":n?" gnode--touched":"";var a="gnode-inner";a+=e.isRoot?" gnode--root":e.isDestination?" gnode--destination":"";var s={left:e.gnode.pos.x-50,top:e.gnode.pos.y-50},c={};if("grouped"===e.gnode.state){var i,r,u=null!==(i=null===(r=e.gnode.group)||void 0===r?void 0:r.color)&&void 0!==i?i:[0,0,0,0];c.backgroundColor="rgba(".concat(u[0],",").concat(u[1],",").concat(u[2],",").concat(u[3],")")}return Object(P.jsx)("div",{className:o,style:s,onClick:function(){e.onNodeSelect(e.gnode)},children:Object(P.jsx)("div",{className:a,style:c,children:Object(P.jsx)("span",{className:"gnode-inner-content",children:e.gnode.data})})})})),Q=(n(34),function(e){var t={stroke:"travel"===e.path.state?"var(--green)":"var(--primary-darker)"};return Object(P.jsxs)("div",{className:"path-wrapper",children:[Object(P.jsx)("svg",{className:"path",width:"100%",height:"100%",children:Object(P.jsx)("line",{x1:e.path.sourcePos.x,y1:e.path.sourcePos.y,x2:e.path.destinationPos.x,y2:e.path.destinationPos.y,style:t})}),Object(P.jsx)("span",{style:{position:"absolute",left:(e.path.sourcePos.x+e.path.destinationPos.x)/2,top:(e.path.sourcePos.y+e.path.destinationPos.y-20)/2,color:"var(--yellow)",fontSize:"20px"},children:e.path.weight})]})}),q=[[64,249,155,1],[38,64,139,1],[249,248,113,1],[15,8,75,1],[136,106,190,1],[0,219,203,1],[175,245,136,1],[252,126,139,1],[0,89,166,1],[149,74,0,1],[241,150,46,1],[8,178,227,1]],F=(n(35),{addGnode:function(e){return{type:k,payload:{gnode:e}}},addPath:function(e){return{type:m,payload:{path:e}}},setRoot:function(e){return{type:N,payload:{nodeID:e}}},updateNode:T,unvisitAll:function(){return{type:S}},updatePath:function(e){return{type:C,payload:{updatedPath:e}}},setDestination:function(e){return{type:w,payload:{nodeID:e}}}}),_=Object(r.b)((function(e){return{nodeManager:e.NodeManager}}),F)((function(e){var t=Object(o.useState)(""),n=Object(i.a)(t,2),a=n[0],s=n[1],c=Object(o.useRef)(null),r=Object(o.useState)(0),d=Object(i.a)(r,2),l=d[0],p=d[1],h=Object(o.useState)(0),f=Object(i.a)(h,2),v=f[0],j=f[1],g=Object(o.useState)(null),b=Object(i.a)(g,2),k=b[0],x=b[1],m=Object(o.useState)(!1),N=Object(i.a)(m,2),S=N[0],C=N[1],w=function(t,n){if(n.id===t.id)return console.log("No self loops"),void T();for(var o=e.nodeManager.graph.nodes[t.id].connections,s=0;s<o.length;s++){if(o[s].nodeID===n.id)return console.log("Path already exists"),void T()}var c,i,r,d=(c=t,i=n,r=parseInt(a),{id:Object(u.a)(),sourceId:c.id,destinationId:i.id,sourcePos:c.pos,destinationPos:i.pos,state:"default",weight:r||void 0});e.addPath(d),T()},T=function(){if(k){var t=e.nodeManager.graph.nodes[k.id];t.state="default",e.updateNode(t),x(null)}},M=function(t){switch(l){case 1:!function(t){if(!k)return x(t),t.state="selected",void e.updateNode(t);w(k,t)}(t);break;case 2:e.nodeManager.graph.rootID!==t.id?e.setRoot(t.id):e.setRoot(void 0);break;case 3:e.nodeManager.graph.destinationID!==t.id?e.setDestination(t.id):e.setDestination(void 0)}};return Object(P.jsxs)("div",{className:"nodemanager",children:[Object(P.jsxs)("div",{className:"left-panel",children:[Object(P.jsx)("input",{type:"text",className:"left-panel-input small-box",value:a,onChange:function(e){return s(e.target.value)}}),Object(P.jsxs)("div",{className:"left-panel-selection",children:[Object(P.jsx)("span",{children:"mode :"}),Object(P.jsx)(R,{options:[{key:0,value:"Create Node"},{key:1,value:"Create Path"},{key:2,value:"Set Root"},{key:3,value:"Set Destination"}],defaultSlectText:"Select Mode",defaultSelectKey:0,setOptionState:p})]}),Object(P.jsxs)("div",{className:"left-panel-selection",children:[Object(P.jsx)("span",{children:"algorithm :"}),Object(P.jsx)(R,{options:[{key:0,value:"BFS"},{key:1,value:"DFS"},{key:2,value:"Dijkstra"},{key:3,value:"Group graph"}],defaultSlectText:"Select Mode",defaultSelectKey:0,setOptionState:j})]}),Object(P.jsx)("button",{className:"left-panel-start small-box",onClick:function(){switch(v){case 0:O(e.nodeManager.graph,e.updateNode);break;case 1:D(e.nodeManager.graph,e.updateNode);break;case 2:y(e.nodeManager.graph,e.updateNode,e.updatePath);break;case 3:I(e.nodeManager.graph,q,e.updateNode)}},children:"start"}),Object(P.jsx)("button",{className:"small-box",onClick:function(){return e.unvisitAll()},children:"unvisit all"}),0===l&&Object(P.jsxs)("div",{className:"left-panel-checkbox-wrapper",children:[Object(P.jsx)("label",{htmlFor:"",children:"auto-increment"}),Object(P.jsx)(E,{isChecked:S,onClick:function(){return C(!S)}})]})]}),Object(P.jsxs)("div",{className:"right-panel",onClick:function(t){var n,o;if(0==l&&a){var i,r,d,p,h,f,v,j,g=parseInt(a),b=g||a;console.log(g,b,null!==g&&void 0!==g?g:a);var O=(n=b,o={x:t.pageX-(null!==(i=null===(r=c.current)||void 0===r?void 0:r.offsetLeft)&&void 0!==i?i:0)+(null!==(d=null===(p=c.current)||void 0===p?void 0:p.scrollLeft)&&void 0!==d?d:0),y:t.pageY-(null!==(h=null===(f=c.current)||void 0===f?void 0:f.offsetTop)&&void 0!==h?h:0)+(null!==(v=null===(j=c.current)||void 0===j?void 0:j.scrollTop)&&void 0!==v?v:0)},{id:Object(u.a)(),data:n,state:"default",visited:!1,connections:[],pos:o});e.addGnode(O),(0===g||g)&&S&&s(g+1+"")}},ref:c,children:[Object.values(e.nodeManager.graph.nodes).map((function(t){return Object(P.jsx)(A,{gnode:t,onNodeSelect:M,isRoot:t.id===e.nodeManager.graph.rootID,isDestination:t.id===e.nodeManager.graph.destinationID},t.id)})),Object.values(e.nodeManager.graph.paths).map((function(e){return Object(P.jsx)(Q,{path:e},e.id)}))]})]})})),B=(n(36),function(){return Object(P.jsx)(_,{})}),G=n(4),K=n(18),H=n(16),U=n(9),J={graph:{nodes:{},paths:{}}},V=Object(G.combineReducers)({NodeManager:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:J,t=arguments.length>1?arguments[1]:void 0,n=Object(j.a)({},e);switch(t.type){case k:var o=t.payload.gnode;return n.graph.nodes=Object(j.a)(Object(j.a)({},n.graph.nodes),{},Object(U.a)({},o.id,o)),n;case m:var a=t.payload.path;n.graph.paths=Object(j.a)(Object(j.a)({},n.graph.paths),{},Object(U.a)({},a.id,a));var s=n.graph.nodes[a.sourceId].connections;n.graph.nodes[a.sourceId].connections=[].concat(Object(H.a)(s),[{nodeID:a.destinationId,pathID:a.id}]);var c=n.graph.nodes[a.destinationId].connections;return n.graph.nodes[a.destinationId].connections=[].concat(Object(H.a)(c),[{nodeID:a.sourceId,pathID:a.id}]),n;case x:var i=t.payload.updatedNode,r=n.graph.nodes[i.id];return r?(n.graph.nodes[i.id]=Object(j.a)(Object(j.a)({},r),i),n):e;case C:var u=t.payload.updatedPath,d=n.graph.paths[u.id];return d?(n.graph.paths[u.id]=Object(j.a)(Object(j.a)({},d),u),n):e;case N:var l=t.payload.nodeID;return n.graph.rootID=l,n;case S:return Object.keys(n.graph.nodes).forEach((function(e){n.graph.nodes[e].visited=!1,n.graph.nodes[e].state="default"})),Object.keys(n.graph.paths).forEach((function(e){n.graph.paths[e].state="default"})),n;case w:var p=t.payload.nodeID;return n.graph.destinationID=p,n;default:return e}}}),Z=Object(G.createStore)(V,Object(K.composeWithDevTools)());n(37),n(38);c.a.render(Object(P.jsx)(a.a.StrictMode,{children:Object(P.jsx)(r.a,{store:Z,children:Object(P.jsx)(B,{})})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.97049405.chunk.js.map