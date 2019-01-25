(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{118:function(e,t,a){e.exports=a(273)},123:function(e,t,a){},127:function(e,t,a){},132:function(e,t,a){},134:function(e,t,a){},136:function(e,t,a){},138:function(e,t,a){},140:function(e,t,a){},142:function(e,t,a){},273:function(e,t,a){"use strict";a.r(t);var n,r=a(1),i=a.n(r),c=a(116),l=a.n(c),s=(a(123),a(2)),o=a(4),u=a(15),h=a(13),p=a(14),d=(a(125),a(127),i.a.createContext({})),m=d.Provider,b=d.Consumer,v=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.showWhenEmpty,a=e.path,n=e.block;return i.a.createElement(b,null,function(e){return t&&""===e||e===a?i.a.createElement(n):null})}}]),t}(r.Component),f=function(e){function t(e){var a;function n(){return window.location.hash.replace("#","")}return Object(s.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).hashListener=void 0,a.state={hash:n()},a.hashListener=function(){a.setState({hash:n()})},a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return i.a.createElement(m,{value:this.state.hash},this.props.children)}},{key:"componentDidMount",value:function(){window.addEventListener("hashchange",this.hashListener)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("hashchange",this.hashListener)}}]),t}(r.Component),y=a(45);!function(e){e[e.Default=0]="Default",e[e.Group=1]="Group",e[e.Tile=2]="Tile",e[e.Table=3]="Table"}(n||(n={}));var O=n,j=a(80),w=a.n(j),k=a(117),g=a(20),E=a(28),_=a(29),N=(a(131),[]);N[0]="Unmanaged",N[1]="Managers",N[2]="Sales",N[3]="Human resources",N[4]="Financials",N[5]="CEO";var C,T,S,L,D,z,G,J,P,I,U,W,x,B,R,M,q=N,F=Object(g.CacheKey)("GroupsDeserializer")(C=function e(){Object(s.a)(this,e),this.deserialize=function(e){return q[e]||""}})||C,H=(T=Object(g.JsonProperty)({type:String,name:"id"}),S=Object(g.JsonProperty)({type:Number,name:"groupId",deserializer:F}),L=Object(g.JsonProperty)({type:Number,name:"groupId"}),D=Object(g.JsonProperty)({type:String,name:"name"}),z=Object(g.JsonProperty)({type:String,name:"company"}),G=Object(g.JsonProperty)({type:String,name:"email"}),J=Object(g.JsonProperty)({type:String,name:"phone"}),P=function e(){Object(s.a)(this,e),Object(E.a)(this,"id",I,this),Object(E.a)(this,"group",U,this),Object(E.a)(this,"groupId",W,this),Object(E.a)(this,"name",x,this),Object(E.a)(this,"company",B,this),Object(E.a)(this,"email",R,this),Object(E.a)(this,"phone",M,this),this.id="",this.group="",this.groupId=0,this.name="",this.company="",this.email="",this.phone=""},I=Object(_.a)(P.prototype,"id",[T],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),U=Object(_.a)(P.prototype,"group",[S],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),W=Object(_.a)(P.prototype,"groupId",[L],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),x=Object(_.a)(P.prototype,"name",[D],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),B=Object(_.a)(P.prototype,"company",[z],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),R=Object(_.a)(P.prototype,"email",[G],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),M=Object(_.a)(P.prototype,"phone",[J],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),P);var A=Symbol(),K=Symbol(),X=function(){function e(t){if(Object(s.a)(this,e),this.data=void 0,t!==A)throw new Error("Data provider manual construction is not allowed")}return Object(o.a)(e,[{key:"onDataReady",value:function(){}},{key:"requestUsersData",value:function(t){var a=this;this.data=void 0,e.downloadString(t).then(function(e){var t;a.data=(t=e,JSON.parse(t).filter(function(e){return e.id}).map(function(e){return g.ObjectMapper.deserialize(H,e)})),a.onDataReady()}).catch(function(e){alert(e.message),a.data=void 0})}},{key:"userData",get:function(){return this.data||[]}}],[{key:"downloadString",value:function(){var e=Object(k.a)(w.a.mark(function e(t){return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(e,a){var n=new XMLHttpRequest;n.open("GET",t),n.onload=function(){if(200===this.status)e(this.response);else{var t=new Error("Status: ".concat(this.statusText,". Code: ").concat(this.status));a(t)}},n.onerror=function(){a(new Error("Failed to download string. Ready state was: "+n.readyState))},n.send()}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"instance",get:function(){return this[K]||(this[K]=new e(A)),this[K]},set:function(e){}}]),e}(),$=(a(132),function(){function e(){Object(s.a)(this,e),this.groups=[]}return Object(o.a)(e,[{key:"setup",value:function(e){var t=this,a=!0,n=!1,r=void 0;try{for(var i,c=function(){var e=i.value,a=t.groups.filter(function(t){return t[0]===e.group}),n=void 0;0===a.length?(n=[e.group,[]],t.groups.push(n)):n=a[0],n[1].push(e)},l=e[Symbol.iterator]();!(a=(i=l.next()).done);a=!0)c()}catch(s){n=!0,r=s}finally{try{a||null==l.return||l.return()}finally{if(n)throw r}}}},{key:"render",value:function(){var e=this;return i.a.createElement("ul",{className:"user-groups"},this.groups.map(function(t){return e.renderGroup(t[0],t)}))}},{key:"renderGroup",value:function(e,t){return i.a.createElement(Q,{key:e,valueObject:t})}}]),e}()),Q=function(e){return i.a.createElement("li",{className:"user-groups__group"},e.valueObject[0])},V=(a(134),function(){function e(){Object(s.a)(this,e),this.data=[]}return Object(o.a)(e,[{key:"setup",value:function(e){this.data=e}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"users-table"},this.data.map(function(t){return e.renderLine(t.id,t)}))}},{key:"renderLine",value:function(e,t){return i.a.createElement(Y,{key:e,valueObject:t,isUnmanaged:0===t.groupId})}}]),e}()),Y=function(e){var t="users-table__row "+(e.isUnmanaged?"users-table__row_unmanaged":"");return i.a.createElement("div",{className:t},i.a.createElement("div",{className:"users-table__cell"},e.valueObject.name),i.a.createElement("div",{className:"users-table__cell"},e.valueObject.company),i.a.createElement("div",{className:"users-table__cell"},e.valueObject.email),i.a.createElement("div",{className:"users-table__cell"},e.valueObject.group),i.a.createElement("div",{className:"users-table__cell"},e.valueObject.phone))},Z=(a(136),function(){function e(){Object(s.a)(this,e),this.placeholders=void 0,this.data=[];var t=new Array(10).fill(0);this.placeholders=t.map(function(e,t){return i.a.createElement("li",{key:"placeholder"+t,className:"user-tiles__placeholder"})})}return Object(o.a)(e,[{key:"setup",value:function(e){this.data=e}},{key:"render",value:function(){var e=this,t=this.data.map(function(t){return e.renderTile(t.id,t)}).concat(this.placeholders);return i.a.createElement("ul",{className:"user-tiles"},t)}},{key:"renderTile",value:function(e,t){return i.a.createElement(ee,{key:e,valueObject:t})}}]),e}()),ee=function(e){return i.a.createElement("li",{className:"user-tiles__tile"},e.valueObject.name)},te=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).tableLayout=void 0,a.groupsLayout=void 0,a.tilesLayout=void 0,a.state={data:X.instance.userData},X.instance.onDataReady=function(){a.setState({data:X.instance.userData})},a.tableLayout=new V,a.groupsLayout=new $,a.tilesLayout=new Z,a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){switch(this.props.viewType){case O.Table:return this.renderLayout(this.tableLayout);case O.Group:return this.renderLayout(this.groupsLayout);case O.Tile:default:return this.renderLayout(this.tilesLayout)}}},{key:"renderLayout",value:function(e){return e.setup(this.state.data),i.a.createElement("div",{className:"users-container__content-panel"},e.render())}}]),t}(r.Component),ae=(a(138),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).handleGroupClick=void 0,a.handleTileClick=void 0,a.handleTableClick=void 0,a.handleGroupClick=t.handleClick.bind(null,a.props.onSwitch,O.Group),a.handleTileClick=t.handleClick.bind(null,a.props.onSwitch,O.Tile),a.handleTableClick=t.handleClick.bind(null,a.props.onSwitch,O.Table),a}return Object(p.a)(t,e),Object(o.a)(t,null,[{key:"getButtonClassName",value:function(e,t){return"switcher__button switcher__button_type_".concat(e," ").concat(t?"switcher__button_active":"")}},{key:"handleClick",value:function(e,t){e(t)}}]),Object(o.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"switcher"},i.a.createElement("div",{className:t.getButtonClassName("group",this.props.viewType===O.Group),onClick:this.handleGroupClick}),i.a.createElement("div",{className:t.getButtonClassName("tile",this.props.viewType===O.Tile),onClick:this.handleTileClick}),i.a.createElement("div",{className:t.getButtonClassName("table",this.props.viewType===O.Table),onClick:this.handleTableClick}))}}]),t}(r.Component)),ne=(a(140),function(){return i.a.createElement("div",{className:"search"},i.a.createElement("label",{className:"search__label"},"Search:"),i.a.createElement("input",{className:"search__input",type:"search",placeholder:"text"}))}),re=(a(142),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).state={viewType:O.Tile},a.handleSwitch=a.handleSwitch.bind(Object(y.a)(Object(y.a)(a))),a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"users-container"},i.a.createElement("div",{className:"users-container__header-panel"},i.a.createElement(ne,null),i.a.createElement(ae,{viewType:this.state.viewType,onSwitch:this.handleSwitch})),i.a.createElement(te,{viewType:this.state.viewType}))}},{key:"handleSwitch",value:function(e){this.setState({viewType:e})}}]),t}(r.Component)),ie=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return i.a.createElement("div",null,"Welcome")}}]),t}(r.Component),ce=function(e){function t(e){var a;return Object(s.a)(this,t),a=Object(u.a)(this,Object(h.a)(t).call(this,e)),X.instance.requestUsersData("https://api.myjson.com/bins/z1hb8"),a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"app"},i.a.createElement("header",{className:"app__header"},i.a.createElement("div",{className:"app__link-container"},i.a.createElement("a",{className:"app__link",href:"#welcome"},"Welcome"),i.a.createElement("a",{className:"app__link",href:"#users"},"Users"))),i.a.createElement(f,null,i.a.createElement(v,{path:"welcome",showWhenEmpty:!0,block:ie}),i.a.createElement(v,{path:"users",block:re})))}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(144),a(147),a(164),a(170),a(172),a(174),a(187),a(206),a(230),a(238),a(263),a(266),a(268),a(271);l.a.render(i.a.createElement(ce,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[118,2,1]]]);
//# sourceMappingURL=main.af0818c5.chunk.js.map