/*! For license information please see main.85d05889.chunk.js.LICENSE.txt */
(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{30:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),s=n(10),c=n.n(s),i=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,40)).then((function(t){var n=t.getCLS,o=t.getFID,a=t.getFCP,s=t.getLCP,c=t.getTTFB;n(e),o(e),a(e),s(e),c(e)}))},r=n(3),u=n(7),d=n(39),l=n(5),p=n(6),h=function(){function e(){Object(l.a)(this,e),this.queue=void 0,this.queue=[]}return Object(p.a)(e,[{key:"front",value:function(){if(0!==this.queue.length)return this.queue[0]}},{key:"pop",value:function(){return this.queue.shift()}},{key:"push",value:function(e){this.queue.push(e)}},{key:"empty",value:function(){return 0===this.queue.length}}]),e}(),f=function(){function e(){Object(l.a)(this,e),this.stack=void 0,this.stack=[]}return Object(p.a)(e,[{key:"top",value:function(){if(0!==this.stack.length)return this.stack[0]}},{key:"pop",value:function(){return this.stack.shift()}},{key:"push",value:function(e){this.stack.unshift(e)}},{key:"empty",value:function(){return 0===this.stack.length}}]),e}();function v(e,t){return e<=t}var j=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v;Object(l.a)(this,e),this.pQueue=void 0,this.compare=void 0,this.pQueue=[],this.compare=t}return Object(p.a)(e,[{key:"getPos",value:function(e,t,n){for(;t<=n;){if(t===n)return this.compare(e,this.pQueue[t])?t:t+1;var o=Math.floor((t+n)/2);this.compare(e,this.pQueue[o])?n=o-1:t=o+1}return 0}},{key:"front",value:function(){if(0!==this.pQueue.length)return this.pQueue[0]}},{key:"pop",value:function(){return this.pQueue.shift()}},{key:"push",value:function(e){var t=this.getPos(e,0,this.pQueue.length-1);this.pQueue.splice(t,0,e)}},{key:"empty",value:function(){return 0===this.pQueue.length}}]),e}(),b=n(2),g=function(e){var t=Object(b.a)({},e);return t.visited=!0,t},O=function(e,t){if(e.rootID){console.log("Starting BFS");var n=new h;n.push(e.rootID);for(var o={},a=0,s=function(){var s=n.pop();console.log(s);var c=e.nodes[s];o[c.id]=!0,setTimeout((function(){t(g(c))}),a),a+=300,e.nodes[c.id].connections.forEach((function(e){o[e.nodeID]||n.push(e.nodeID)}))};!n.empty();)s();console.log("BFS finished")}else console.log("Root is not set")},y=function(e,t){if(e.rootID){console.log("Starting DFS");var n=new f;n.push(e.rootID);for(var o={},a=0,s=function(){var s=n.pop();console.log(s);var c=e.nodes[s];o[c.id]=!0,setTimeout((function(){t(g(c))}),a),a+=300,e.nodes[c.id].connections.forEach((function(e){o[e.nodeID]||n.push(e.nodeID)}))};!n.empty();)s();console.log("DFS finished")}else console.log("Root is not set")},D=function(e,t,n){if(e.rootID){console.log("Starting Dijkstra");var o={},a={},s=new j((function(e,t){return e.cost>=t.cost})),c={};c[e.rootID]={pathID:null,parentID:null},Object.values(e.nodes).forEach((function(e){o[e.id]=1/0})),o[e.rootID]=0,s.push({cost:0,nodeID:e.rootID});for(var i=0,r=function(){var n=s.pop();console.log(n.nodeID);var r=e.nodes[n.nodeID];a[n.nodeID]=!0,setTimeout((function(){t(g(r))}),i),i+=300,e.nodes[n.nodeID].connections.forEach((function(t){var i,r=null!==(i=e.paths[t.pathID].weight)&&void 0!==i?i:10;!a[t.nodeID]&&o[t.nodeID]>n.cost+r&&(o[t.nodeID]=n.cost+r,s.push({cost:o[t.nodeID],nodeID:t.nodeID}),c[t.nodeID]={parentID:n.nodeID,pathID:t.pathID})}))};!s.empty();)r();if(e.destinationID)for(var u=e.destinationID,d=function(){var t=c[u];if(!t)return console.log("Can't reach ",u),"break";setTimeout((function(){t.pathID&&n(function(e){var t=Object(b.a)({},e);return t.state="travel",t}(e.paths[t.pathID]))}),i),i+=300,u=t.parentID};u;){if("break"===d())break}console.log(o),console.log("Dijkstra finished")}else console.log("Root is not set")},I="ADD_NODE",x="UPDATE_NODE",m="ADD_PATH",k="SET_ROOT",N="UNVISIT_ALL",S="UPDATE_PATH",C="SET_DESTINATION",w=function(e){return{type:x,payload:{updatedNode:e}}},P=(n(30),n(1)),T=function(){return Object(P.jsx)("svg",{width:"17",height:"17",viewBox:"0 0 17 17",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:Object(P.jsx)("path",{d:"M16.7688 14.6976L13.4582 11.3876C13.3088 11.2382 13.1062 11.1552 12.8937 11.1552H12.3525C13.2689 9.9832 13.8135 8.50913 13.8135 6.90558C13.8135 3.09091 10.7221 0 6.90676 0C3.09144 0 0 3.09091 0 6.90558C0 10.7202 3.09144 13.8112 6.90676 13.8112C8.51058 13.8112 9.98491 13.2667 11.1571 12.3504V12.8915C11.1571 13.104 11.2401 13.3065 11.3895 13.4559L14.7001 16.7659C15.0122 17.078 15.517 17.078 15.8258 16.7659L16.7655 15.8264C17.0776 15.5143 17.0776 15.0097 16.7688 14.6976ZM6.90676 11.1552C4.55912 11.1552 2.65644 9.25613 2.65644 6.90558C2.65644 4.55834 4.5558 2.65599 6.90676 2.65599C9.25439 2.65599 11.1571 4.55502 11.1571 6.90558C11.1571 9.25281 9.25771 11.1552 6.90676 11.1552Z",fill:"#26408B"})})};var E=function(e){var t,n,a=Object(o.useState)(""),s=Object(r.a)(a,2),c=s[0],i=s[1],u=Object(o.useState)(),d=Object(r.a)(u,2),l=d[0],p=d[1],h=Object(o.useState)(!1),f=Object(r.a)(h,2),v=f[0],j=f[1],b=Object(o.createRef)(),g=Object(o.createRef)();t=g,n=function(){v&&j(!1)},Object(o.useEffect)((function(){var e=function(e){var o;(null===(o=t.current)||void 0===o?void 0:o.contains)&&!t.current.contains(e.target)&&n()};return document.addEventListener("mousedown",e),function(){document.removeEventListener("mousedown",e)}}),[t]),Object(o.useEffect)((function(){if(e.options.length>0&&void 0!=e.defaultSelectKey){var t=e.options.filter((function(t){if(t.key===e.defaultSelectKey)return t}));t.length>0&&p(t[0])}}),[]),Object(o.useEffect)((function(){var e;v&&(null===(e=b.current)||void 0===e||e.focus())}),[v]),Object(o.useEffect)((function(){e.setOptionState&&e.setOptionState(null===l||void 0===l?void 0:l.key)}),[l]);return Object(P.jsxs)("div",{className:"select-search",ref:g,onClick:function(){j(!v)},children:[Object(P.jsxs)("div",{className:"select-search-selected"+(v?" two-rounded":" all-rounded"),children:[Object(P.jsx)("div",{className:"select-search-selected-value",children:Object(P.jsx)("span",{children:(null===l||void 0===l?void 0:l.value)||e.defaultSlectText})}),Object(P.jsx)("div",{className:"select-search-selected-button"+(v?" down-arrow":" left-arrow")})]}),v&&Object(P.jsxs)("div",{className:"select-search-bar",children:[Object(P.jsxs)("div",{className:"input-box",children:[Object(P.jsx)("span",{children:Object(P.jsx)(T,{})}),Object(P.jsx)("input",{type:"text",onChange:function(e){return i(e.target.value)},ref:b,value:c})]}),e.options.filter((function(e){if(e.value.toLocaleLowerCase().includes(c.toLocaleLowerCase()))return e})).map((function(e){return Object(P.jsx)("div",{className:"select-search-option",onClick:function(){return p(e)},children:Object(P.jsx)("span",{children:e.value})},e.key)}))]})]})},M=(n(32),function(e){var t="gnode";t+="selected"===e.gnode.state?" gnode--selected":e.gnode.visited?" gnode--visited":"";var n={left:e.gnode.pos.x,top:e.gnode.pos.y};return Object(P.jsx)("div",{className:t,style:n,onClick:function(){e.onNodeSelect(e.gnode)},children:Object(P.jsx)("div",{className:"gnode-inner",children:Object(P.jsx)("span",{className:"gnode-inner-content",children:e.gnode.data})})})}),L={updateNode:w},R=(Object(u.b)((function(){return{}}),L)(M),n(33),function(e){var t={stroke:"travel"===e.path.state?"var(--green)":"var(--primary-darker)"};return Object(P.jsx)("svg",{className:"path",width:"100%",height:"100%",children:Object(P.jsx)("line",{x1:e.path.sourcePos.x+50,y1:e.path.sourcePos.y+50,x2:e.path.destinationPos.x+50,y2:e.path.destinationPos.y+50,style:t})})}),A=(n(34),{addGnode:function(e){return{type:I,payload:{gnode:e}}},addPath:function(e){return{type:m,payload:{path:e}}},setRoot:function(e){return{type:k,payload:{nodeID:e}}},updateNode:w,unvisitAll:function(){return{type:N}},updatePath:function(e){return{type:S,payload:{updatedPath:e}}},setDestination:function(e){return{type:C,payload:{nodeID:e}}}}),F=Object(u.b)((function(e){return{nodeManager:e.NodeManager}}),A)((function(e){var t=Object(o.useState)(""),n=Object(r.a)(t,2),a=n[0],s=n[1],c=Object(o.useRef)(null),i=Object(o.useState)(0),u=Object(r.a)(i,2),l=u[0],p=u[1],h=Object(o.useState)(0),f=Object(r.a)(h,2),v=f[0],j=f[1],b=Object(o.useState)(null),g=Object(r.a)(b,2),I=g[0],x=g[1],m=function(){if(I){var t=e.nodeManager.graph.nodes[I.id];t.state="default",e.updateNode(t),x(null)}},k=function(t){if(!I)return x(t),t.state="selected",void e.updateNode(t);if(t.id===I.id)return console.log("No self loops"),void m();for(var n=e.nodeManager.graph.nodes[I.id].connections,o=0;o<n.length;o++){if(n[o].nodeID===t.id)return console.log("Path already exists"),void m()}var a,s,c=(a=I,s=t,{id:Object(d.a)(),sourceId:a.id,destinationId:s.id,sourcePos:a.pos,destinationPos:s.pos,state:"default"});e.addPath(c),m()},N=function(t){switch(l){case 1:k(t);break;case 2:e.setRoot(t.id);break;case 3:e.setDestination(t.id)}};return Object(P.jsxs)("div",{className:"nodemanager",children:[Object(P.jsxs)("div",{className:"left-panel",children:[Object(P.jsx)("input",{type:"text",className:"left-panel-input small-box",value:a,onChange:function(e){return s(e.target.value)}}),Object(P.jsxs)("div",{className:"left-panel-selection",children:[Object(P.jsx)("span",{children:"mode :"}),Object(P.jsx)(E,{options:[{key:0,value:"Create Node"},{key:1,value:"Create Path"},{key:2,value:"Set Root"},{key:3,value:"Set Destination"}],defaultSlectText:"Select Mode",defaultSelectKey:0,setOptionState:p})]}),Object(P.jsxs)("div",{className:"left-panel-selection",children:[Object(P.jsx)("span",{children:"algorithm :"}),Object(P.jsx)(E,{options:[{key:0,value:"BFS"},{key:1,value:"DFS"},{key:2,value:"Dijkstra"}],defaultSlectText:"Select Mode",defaultSelectKey:0,setOptionState:j})]}),Object(P.jsx)("button",{className:"left-panel-start small-box",onClick:function(){switch(v){case 0:O(e.nodeManager.graph,e.updateNode);break;case 1:y(e.nodeManager.graph,e.updateNode);break;case 2:D(e.nodeManager.graph,e.updateNode,e.updatePath)}},children:"start"}),Object(P.jsx)("button",{className:"small-box",onClick:function(){return e.unvisitAll()},children:"unvisit all"})]}),Object(P.jsxs)("div",{className:"right-panel",onClick:function(t){var n,o;if(0==l&&a){var s,i,r,u,p,h,f,v,j=parseInt(a);if(!j)return;var b=(n=j,o={x:t.pageX-(null!==(s=null===(i=c.current)||void 0===i?void 0:i.offsetLeft)&&void 0!==s?s:0)-50+(null!==(r=null===(u=c.current)||void 0===u?void 0:u.scrollLeft)&&void 0!==r?r:0),y:t.pageY-(null!==(p=null===(h=c.current)||void 0===h?void 0:h.offsetTop)&&void 0!==p?p:0)-50+(null!==(f=null===(v=c.current)||void 0===v?void 0:v.scrollTop)&&void 0!==f?f:0)},{id:Object(d.a)(),data:n,state:"default",visited:!1,connections:[],pos:o});e.addGnode(b)}},ref:c,children:[Object.values(e.nodeManager.graph.nodes).map((function(e){return Object(P.jsx)(M,{gnode:e,onNodeSelect:N,updateNode:w},e.id)})),Object.values(e.nodeManager.graph.paths).map((function(e){return Object(P.jsx)(R,{path:e},e.id)}))]})]})})),Q=(n(35),function(){return Object(P.jsx)(F,{})}),q=n(4),B=n(17),_=n(18),K=n(9),H={graph:{nodes:{},paths:{}}},U=Object(q.combineReducers)({NodeManager:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:H,t=arguments.length>1?arguments[1]:void 0,n=Object(b.a)({},e);switch(t.type){case I:var o=t.payload.gnode;return n.graph.nodes=Object(b.a)(Object(b.a)({},n.graph.nodes),{},Object(K.a)({},o.id,o)),n;case m:var a=t.payload.path;n.graph.paths=Object(b.a)(Object(b.a)({},n.graph.paths),{},Object(K.a)({},a.id,a));var s=n.graph.nodes[a.sourceId].connections;return n.graph.nodes[a.sourceId].connections=[].concat(Object(_.a)(s),[{nodeID:a.destinationId,pathID:a.id}]),n;case x:var c=t.payload.updatedNode,i=n.graph.nodes[c.id];return i?(n.graph.nodes[c.id]=Object(b.a)(Object(b.a)({},i),c),n):e;case S:var r=t.payload.updatedPath,u=n.graph.paths[r.id];return u?(n.graph.paths[r.id]=Object(b.a)(Object(b.a)({},u),r),n):e;case k:var d=t.payload.nodeID;return n.graph.nodes[d]?(n.graph.rootID=d,n):e;case N:return Object.keys(n.graph.nodes).forEach((function(e){n.graph.nodes[e].visited=!1})),Object.keys(n.graph.paths).forEach((function(e){n.graph.paths[e].state="default"})),n;case C:var l=t.payload.nodeID;return n.graph.nodes[l]?(n.graph.destinationID=l,n):e;default:return e}}}),G=Object(q.createStore)(U,Object(B.composeWithDevTools)());n(36),n(37);c.a.render(Object(P.jsx)(a.a.StrictMode,{children:Object(P.jsx)(u.a,{store:G,children:Object(P.jsx)(Q,{})})}),document.getElementById("root")),i(console.log)}},[[38,1,2]]]);
//# sourceMappingURL=main.85d05889.chunk.js.map