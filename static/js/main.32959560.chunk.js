/*! For license information please see main.32959560.chunk.js.LICENSE.txt */
(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{30:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),c=n(7),r=n.n(c),i=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,38)).then((function(t){var n=t.getCLS,o=t.getFID,a=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),o(e),a(e),c(e),r(e)}))},d=n(9),s=n(4),u=n(37),l=n(2),p=n(15),h=n(16),f=function(){function e(){Object(p.a)(this,e),this.queue=void 0,this.queue=[]}return Object(h.a)(e,[{key:"front",value:function(){if(0!==this.queue.length)return this.queue[0]}},{key:"pop",value:function(){return this.queue.shift()}},{key:"push",value:function(e){this.queue.push(e)}},{key:"empty",value:function(){return 0===this.queue.length}}]),e}(),j=function(e,t){if(e.rootID){console.log("Starting BFS");var n=new f;n.push(e.rootID);for(var o={},a=0,c=function(){var c=n.pop();console.log(c);var r=e.nodes[c];o[r.id]=!0,setTimeout((function(){t(function(e){var t=Object(l.a)({},e);return t.visited=!0,t}(r))}),a),a+=300,e.nodes[r.id].connections.forEach((function(e){o[e.nodeID]||n.push(e.nodeID)}))};!n.empty();)c();console.log("BFS finished")}else console.log("Root is not set")},b="ADD_NODE",g="UPDATE_NODE",v="ADD_PATH",O="SET_ROOT",y=function(e){return{type:g,payload:{updatedNode:e}}},x=(n(30),n(1)),D=function(e){var t={left:e.gnode.pos.x,top:e.gnode.pos.y,backgroundColor:e.gnode.visited?"green":"red"};return Object(x.jsx)("div",{className:"gnode",style:t,onClick:function(){e.onNodeSelect(e.gnode)},children:Object(x.jsx)("span",{className:"gnode-content",children:e.gnode.data})})},I={updateNode:y},N=(Object(s.b)((function(){return{}}),I)(D),function(e){return Object(x.jsx)("svg",{width:"100%",height:"100%",children:Object(x.jsx)("line",{x1:e.path.sourcePos.x+50,y1:e.path.sourcePos.y+50,x2:e.path.destinationPos.x+50,y2:e.path.destinationPos.y+50,style:{stroke:"rgb(255,0,0)",strokeWidth:"2"}})})}),k=(n(32),{addGnode:function(e){return{type:b,payload:{gnode:e}}},addPath:function(e){return{type:v,payload:{path:e}}},setRoot:function(e){return{type:O,payload:{nodeID:e}}},updateNode:y}),m=Object(s.b)((function(e){return{nodeManager:e.NodeManager}}),k)((function(e){var t=Object(o.useState)(""),n=Object(d.a)(t,2),a=n[0],c=n[1],r=Object(o.useState)(0),i=Object(d.a)(r,2),s=i[0],l=i[1],p=Object(o.useRef)(null),h=Object(o.useState)(null),f=Object(d.a)(h,2),b=f[0],g=f[1],v=function(t){if(1==s)if(b){e.nodeManager.graph.nodes[b.id].connections.forEach((function(e){e.nodeID!==t.id||g(null)}));var n,o,a=(n=b,o=t,{id:Object(u.a)(),sourceId:n.id,destinationId:o.id,sourcePos:n.pos,destinationPos:o.pos});e.addPath(a),g(null)}else g(t)},O=function(t){switch(s){case 1:v(t);break;case 2:e.setRoot(t.id)}};return Object(x.jsxs)("div",{className:"nodemanager",children:[Object(x.jsxs)("div",{className:"panel",children:[Object(x.jsx)("input",{type:"text",value:a,onChange:function(e){return c(e.target.value)}}),Object(x.jsx)("button",{onClick:function(){return l(0)},children:"create node"}),Object(x.jsx)("button",{onClick:function(){return l(1)},children:"create path"}),Object(x.jsx)("button",{onClick:function(){return l(2)},children:"set root"}),Object(x.jsx)("button",{onClick:function(){return j(e.nodeManager.graph,e.updateNode)},children:"bfs"})]}),Object(x.jsxs)("div",{className:"board",onClick:function(t){var n,o;if(0==s&&a){var c,r,i,d,l,h,f,j,b=parseInt(a);if(!b)return;var g=(n=b,o={x:t.pageX-(null!==(c=null===(r=p.current)||void 0===r?void 0:r.offsetLeft)&&void 0!==c?c:0)-50+(null!==(i=null===(d=p.current)||void 0===d?void 0:d.scrollLeft)&&void 0!==i?i:0),y:t.pageY-(null!==(l=null===(h=p.current)||void 0===h?void 0:h.offsetTop)&&void 0!==l?l:0)-50+(null!==(f=null===(j=p.current)||void 0===j?void 0:j.scrollTop)&&void 0!==f?f:0)},{id:Object(u.a)(),data:n,visited:!1,connections:[],pos:o});e.addGnode(g)}},ref:p,children:[Object.values(e.nodeManager.graph.nodes).map((function(e){return Object(x.jsx)(D,{gnode:e,onNodeSelect:O,updateNode:y},e.id)})),Object.values(e.nodeManager.graph.paths).map((function(e){return Object(x.jsx)(N,{path:e},e.id)}))]})]})})),P=(n(33),function(){return Object(x.jsx)(m,{})}),S=n(3),C=n(17),T=n(18),M=n(6),q={graph:{nodes:{},paths:{}}},E=Object(S.combineReducers)({NodeManager:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,t=arguments.length>1?arguments[1]:void 0,n=Object(l.a)({},e);switch(t.type){case b:var o=t.payload.gnode;return n.graph.nodes=Object(l.a)(Object(l.a)({},n.graph.nodes),{},Object(M.a)({},o.id,o)),n;case v:var a=t.payload.path;n.graph.paths=Object(l.a)(Object(l.a)({},n.graph.paths),{},Object(M.a)({},a.id,a));var c=n.graph.nodes[a.sourceId].connections;return n.graph.nodes[a.sourceId].connections=[].concat(Object(T.a)(c),[{nodeID:a.destinationId,pathID:a.id}]),n;case g:var r=t.payload.updatedNode,i=n.graph.nodes[r.id];return i?(n.graph.nodes[r.id]=Object(l.a)(Object(l.a)({},i),r),n):e;case O:var d=t.payload.nodeID;return n.graph.nodes[d]?(n.graph.rootID=d,n):e;default:return e}}}),w=Object(S.createStore)(E,Object(C.composeWithDevTools)());n(34),n(35);r.a.render(Object(x.jsx)(a.a.StrictMode,{children:Object(x.jsx)(s.a,{store:w,children:Object(x.jsx)(P,{})})}),document.getElementById("root")),i(console.log)}},[[36,1,2]]]);
//# sourceMappingURL=main.32959560.chunk.js.map