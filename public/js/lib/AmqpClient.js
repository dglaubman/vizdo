/**
 * Copyright (c) 2007-2012, Kaazing Corporation. All rights reserved.
 */

var browser=null;
if(typeof(ActiveXObject)!="undefined"){browser="ie"
}else{if(Object.prototype.toString.call(window.opera)=="[object Opera]"){browser="opera"
}else{if(navigator.vendor.indexOf("Apple")!=-1){browser="safari";
if(navigator.userAgent.indexOf("iPad")!=-1||navigator.userAgent.indexOf("iPhone")!=-1){browser.ios=true
}}else{if(navigator.vendor.indexOf("Google")!=-1){if(navigator.userAgent.indexOf("Android")!=-1){browser="android"
}else{browser="chrome"
}}else{if(navigator.product=="Gecko"&&window.find&&!navigator.savePreferences){browser="firefox"
}else{throw new Error("couldn't detect browser")
}}}}}switch(browser){case"ie":(function(){if(document.createEvent===undefined){var a=function(){};
a.prototype.initEvent=function(h,j,g){this.type=h;
this.bubbles=j;
this.cancelable=g
};
document.createEvent=function(g){if(g!="Events"){throw new Error("Unsupported event name: "+g)
}return new a()
}
}document._w_3_c_d_o_m_e_v_e_n_t_s_createElement=document.createElement;
document.createElement=function(g){var j=this._w_3_c_d_o_m_e_v_e_n_t_s_createElement(g);
if(j.addEventListener===undefined){var h={};
j.addEventListener=function(l,m,k){j.attachEvent("on"+l,m);
return e(h,l,m,k)
};
j.removeEventListener=function(l,m,k){return d(h,l,m,k)
};
j.dispatchEvent=function(k){return f(h,k)
}
}return j
};
if(window.addEventListener===undefined){var b=document.createElement("div");
var c=(typeof(postMessage)==="undefined");
window.addEventListener=function(h,j,g){if(c&&h=="message"){b.addEventListener(h,j,g)
}else{window.attachEvent("on"+h,j)
}};
window.removeEventListener=function(h,j,g){if(c&&h=="message"){b.removeEventListener(h,j,g)
}else{window.detachEvent("on"+h,j)
}};
window.dispatchEvent=function(g){if(c&&g.type=="message"){b.dispatchEvent(g)
}else{window.fireEvent("on"+g.type,g)
}}
}function e(j,h,l,g){if(g){throw new Error("Not implemented")
}var k=j[h]||{};
j[h]=k;
k[l]=l
}function d(j,h,l,g){if(g){throw new Error("Not implemented")
}var k=j[h]||{};
delete k[l]
}function f(j,l){var g=l.type;
var k=j[g]||{};
for(var h in k){if(typeof(k[h])=="function"){try{k[h](l)
}catch(m){}}}}})();
break;
case"chrome":case"android":case"safari":if(typeof(window.postMessage)==="undefined"&&typeof(window.dispatchEvent)==="undefined"&&typeof(document.dispatchEvent)==="function"){window.dispatchEvent=function(a){document.dispatchEvent(a)
};
var addEventListener0=window.addEventListener;
window.addEventListener=function(b,c,a){if(b==="message"){document.addEventListener(b,c,a)
}else{addEventListener0.call(window,b,c,a)
}};
var removeEventListener0=window.removeEventListener;
window.removeEventListener=function(b,c,a){if(b==="message"){document.removeEventListener(b,c,a)
}else{removeEventListener0.call(window,b,c,a)
}}
}break;
case"opera":var addEventListener0=window.addEventListener;
window.addEventListener=function(b,d,a){var c=d;
if(b==="message"){c=function(f){if(f.origin===undefined&&f.uri!==undefined){var e=new URI(f.uri);
delete e.path;
delete e.query;
delete e.fragment;
f.origin=e.toString()
}return d(f)
};
d._$=c
}addEventListener0.call(window,b,c,a)
};
var removeEventListener0=window.removeEventListener;
window.removeEventListener=function(b,d,a){var c=d;
if(b==="message"){c=d._$
}removeEventListener0.call(window,b,c,a)
};
break
}function URI(h){h=h||"";
var b=0;
var e=h.indexOf("://");
if(e!=-1){this.scheme=h.slice(0,e);
b=e+3;
var d=h.indexOf("/",b);
if(d==-1){d=h.length;
h+="/"
}var f=h.slice(b,d);
this.authority=f;
b=d;
this.host=f;
var c=f.indexOf(":");
if(c!=-1){this.host=f.slice(0,c);
this.port=parseInt(f.slice(c+1),10);
if(isNaN(this.port)){throw new Error("Invalid URI syntax")
}}}var g=h.indexOf("?",b);
if(g!=-1){this.path=h.slice(b,g);
b=g+1
}var a=h.indexOf("#",b);
if(a!=-1){if(g!=-1){this.query=h.slice(b,a)
}else{this.path=h.slice(b,a)
}b=a+1;
this.fragment=h.slice(b)
}else{if(g!=-1){this.query=h.slice(b)
}else{this.path=h.slice(b)
}}}(function(){var a=URI.prototype;
a.toString=function(){var e=[];
var d=this.scheme;
if(d!==undefined){e.push(d);
e.push("://");
e.push(this.host);
var c=this.port;
if(c!==undefined){e.push(":");
e.push(c.toString())
}}if(this.path!==undefined){e.push(this.path)
}if(this.query!==undefined){e.push("?");
e.push(this.query)
}if(this.fragment!==undefined){e.push("#");
e.push(this.fragment)
}return e.join("")
};
var b={http:80,ws:80,https:443,wss:443};
URI.replaceProtocol=function(c,e){var d=c.indexOf("://");
if(d>0){return e+c.substr(d)
}else{return""
}}
})();
(function(){Base64={};
Base64.encode=function(g){var f=[];
var h;
var e;
var d;
while(g.length){switch(g.length){case 1:h=g.shift();
f.push(c[(h>>2)&63]);
f.push(c[((h<<4)&48)]);
f.push("=");
f.push("=");
break;
case 2:h=g.shift();
e=g.shift();
f.push(c[(h>>2)&63]);
f.push(c[((h<<4)&48)|((e>>4)&15)]);
f.push(c[(e<<2)&60]);
f.push("=");
break;
default:h=g.shift();
e=g.shift();
d=g.shift();
f.push(c[(h>>2)&63]);
f.push(c[((h<<4)&48)|((e>>4)&15)]);
f.push(c[((e<<2)&60)|((d>>6)&3)]);
f.push(c[d&63]);
break
}}return f.join("")
};
Base64.decode=function(j){if(j.length===0){return[]
}if(j.length%4!==0){throw new Error("Invalid base64 string (must be quads)")
}var o=[];
for(var d=0;
d<j.length;
d+=4){var l=j.charAt(d);
var h=j.charAt(d+1);
var f=j.charAt(d+2);
var e=j.charAt(d+3);
var n=a[l];
var m=a[h];
var k=a[f];
var g=a[e];
o.push(((n<<2)&252)|((m>>4)&3));
if(f!="="){o.push(((m<<4)&240)|((k>>2)&15));
if(e!="="){o.push(((k<<6)&192)|(g&63))
}}}return o
};
var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
var a={"=":0};
for(var b=0;
b<c.length;
b++){a[c[b]]=b
}if(typeof(window.btoa)==="undefined"){window.btoa=function(f){var d=f.split("");
for(var e=0;
e<d.length;
e++){d[e]=(d[e]).charCodeAt()
}return Base64.encode(d)
};
window.atob=function(d){var e=Base64.decode(d);
for(var f=0;
f<e.length;
f++){e[f]=String.fromCharCode(e[f])
}return e.join("")
}
}})();
var postMessage0=(function(){var g=new URI((browser=="ie")?document.URL:location.href);
var u={http:80,https:443};
if(g.port==null){g.port=u[g.scheme];
g.authority=g.host+":"+g.port
}var y=g.scheme+"://"+g.authority;
var s="/.kr";
if(typeof(postMessage)!=="undefined"){return function(E,D,C){if(typeof(D)!="string"){throw new Error("Unsupported type. Messages must be strings")
}if(C==="null"){C="*"
}switch(browser){case"ie":case"opera":case"firefox":setTimeout(function(){E.postMessage(D,C)
},0);
break;
default:E.postMessage(D,C);
break
}}
}else{function v(C){this.sourceToken=d(Math.floor(Math.random()*(Math.pow(2,32)-1)),8);
this.iframe=C;
this.bridged=false;
this.lastWrite=0;
this.lastRead=0;
this.lastReadIndex=2;
this.lastSyn=0;
this.lastAck=0;
this.queue=[];
this.escapedFragments=[]
}var w=v.prototype;
w.attach=function(I,D,E,C,H,G){this.target=I;
this.targetOrigin=D;
this.targetToken=E;
this.reader=C;
this.writer=H;
this.writerURL=G;
try{this._lastHash=C.location.hash;
this.poll=e
}catch(F){this._lastDocumentURL=C.document.URL;
this.poll=c
}if(I==parent){b(this,true)
}};
w.detach=function(){this.poll=function(){};
delete this.target;
delete this.targetOrigin;
delete this.reader;
delete this.lastFragment;
delete this.writer;
delete this.writerURL
};
w.poll=function(){};
function e(){var C=this.reader.location.hash;
if(this._lastHash!=C){l(this,C.substring(1));
this._lastHash=C
}}function c(){var D=this.reader.document.URL;
if(this._lastDocumentURL!=D){var C=D.indexOf("#");
if(C!=-1){l(this,D.substring(C+1));
this._lastDocumentURL=D
}}}w.post=function(G,F,C){p(this,G);
var I=1000;
var D=escape(F);
var H=[];
while(D.length>I){var E=D.substring(0,I);
D=D.substring(I);
H.push(E)
}H.push(D);
this.queue.push([C,H]);
if(this.writer!=null&&this.lastAck>=this.lastSyn){b(this,false)
}};
function p(N,M){if(N.lastWrite<1&&!N.bridged){if(M.parent==window){var C=N.iframe.src;
var G=C.split("#");
var Q=null;
var R=document.getElementsByTagName("meta");
for(var H=0;
H<R.length;
H++){if(R[H].name=="kaazing:resources"){alert('kaazing:resources is no longer supported. Please refer to the Administrator\'s Guide section entitled "Configuring a Web Server to Integrate with Kaazing Gateway"')
}}var E=y;
var K=E.toString()+s+"?.kr=xsp&.kv=10.05";
if(Q){var J=new URI(E.toString());
var G=Q.split(":");
J.host=G.shift();
if(G.length){J.port=G.shift()
}K=J.toString()+s+"?.kr=xsp&.kv=10.05"
}for(var H=0;
H<R.length;
H++){if(R[H].name=="kaazing:postMessageBridgeURL"){var F=R[H].content;
var L=new URI(F);
var D=new URI(location.toString());
if(!L.authority){L.host=D.host;
L.port=D.port;
L.scheme=D.scheme;
if(F.indexOf("/")!=0){var P=D.path.split("/");
P.pop();
P.push(F);
L.path=P.join("/")
}}n.BridgeURL=L.toString()
}}if(n.BridgeURL){K=n.BridgeURL
}var O=["I",E,N.sourceToken,escape(K)];
if(G.length>1){var I=G[1];
O.push(escape(I))
}G[1]=O.join("!");
setTimeout(function(){M.location.replace(G.join("#"))
},200);
N.bridged=true
}}}function q(E,D){var C=E.writerURL+"#"+D;
E.writer.location.replace(C)
}function x(C){return parseInt(C,16)
}function d(E,C){var D=E.toString(16);
var F=[];
C-=D.length;
while(C-->0){F.push("0")
}F.push(D);
return F.join("")
}function b(J,K){var H=J.queue;
var N=J.lastRead;
if((H.length>0||K)&&J.lastSyn>J.lastAck){var E=J.lastFrames;
var D=J.lastReadIndex;
if(x(E[D])!=N){E[D]=d(N,8);
q(J,E.join(""))
}}else{if(H.length>0){var L=H.shift();
var F=L[0];
if(F=="*"||F==J.targetOrigin){J.lastWrite++;
var M=L[1];
var G=M.shift();
var I=3;
var E=[J.targetToken,d(J.lastWrite,8),d(N,8),"F",d(G.length,4),G];
var D=2;
if(M.length>0){E[I]="f";
J.queue.unshift(L)
}if(J.resendAck){var C=[J.targetToken,d(J.lastWrite-1,8),d(N,8),"a"];
E=C.concat(E);
D+=C.length
}q(J,E.join(""));
J.lastFrames=E;
J.lastReadIndex=D;
J.lastSyn=J.lastWrite;
J.resendAck=false
}}else{if(K){J.lastWrite++;
var E=[J.targetToken,d(J.lastWrite,8),d(N,8),"a"];
var D=2;
if(J.resendAck){var C=[J.targetToken,d(J.lastWrite-1,8),d(N,8),"a"];
E=C.concat(E);
D+=C.length
}q(J,E.join(""));
J.lastFrames=E;
J.lastReadIndex=D;
J.resendAck=true
}}}}function l(G,J){var C=J.substring(0,8);
var M=x(J.substring(8,16));
var F=x(J.substring(16,24));
var H=J.charAt(24);
if(C!=G.sourceToken){throw new Error("postMessage emulation tampering detected")
}var K=G.lastRead;
var I=K+1;
if(M==I){G.lastRead=I
}if(M==I||M==K){G.lastAck=F
}if(M==I||(M==K&&H=="a")){switch(H){case"f":var E=J.substr(29,x(J.substring(25,29)));
G.escapedFragments.push(E);
b(G,true);
break;
case"F":var D=J.substr(29,x(J.substring(25,29)));
if(G.escapedFragments!==undefined){G.escapedFragments.push(D);
D=G.escapedFragments.join("");
G.escapedFragments=[]
}var L=unescape(D);
B(L,G.target,G.targetOrigin);
b(G,true);
break;
case"a":if(J.length>25){l(G,J.substring(25))
}else{b(G,false)
}break;
default:throw new Error("unknown postMessage emulation payload type: "+H)
}}}function B(E,F,D){var C=document.createEvent("Events");
C.initEvent("message",false,true);
C.data=E;
C.origin=D;
C.source=F;
dispatchEvent(C)
}var k={};
var A=[];
function f(){for(var E=0,C=A.length;
E<C;
E++){var D=A[E];
D.poll()
}setTimeout(f,20)
}function o(F){if(F==parent){return k.parent
}else{if(F.parent==window){var E=document.getElementsByTagName("iframe");
for(var C=0;
C<E.length;
C++){var D=E[C];
if(F==D.contentWindow){return m(D)
}}}else{throw new Error("Generic peer postMessage not yet implemented")
}}}function m(E){var D=E._name;
if(D===undefined){D="iframe$"+String(Math.random()).substring(2);
E._name=D
}var C=k[D];
if(C===undefined){C=new v(E);
k[D]=C
}return C
}function n(F,E,C){if(typeof(E)!="string"){throw new Error("Unsupported type. Messages must be strings")
}if(F==window){if(C=="*"||C==y){B(E,window,y)
}}else{var D=o(F);
D.post(F,E,C)
}}n.attach=function(I,D,F,C,H,G){var E=o(I);
E.attach(I,D,F,C,H,G);
A.push(E)
};
var a=function(E){var F=new URI((browser=="ie")?document.URL:location.href);
var G;
var S={http:80,https:443};
if(F.port==null){F.port=S[F.scheme];
F.authority=F.host+":"+F.port
}var J=unescape(F.fragment||"");
if(J.length>0){var D=J.split(",");
var O=D.shift();
var C=D.shift();
var U=D.shift();
var L=F.scheme+"://"+document.domain+":"+F.port;
var R=F.scheme+"://"+F.authority;
var H=O+"/.kr?.kr=xsc&.kv=10.05";
var N=document.location.toString().split("#")[0];
var K=H+"#"+escape([L,C,escape(N)].join(","));
if(typeof(ActiveXObject)!="undefined"){G=new ActiveXObject("htmlfile");
G.open();
try{G.parentWindow.opener=window
}catch(Q){if(E){G.domain=E
}G.parentWindow.opener=window
}G.write("<html>");
G.write("<body>");
if(E){G.write("<script>CollectGarbage();document.domain='"+E+"';<\/script>")
}G.write('<iframe src="'+H+'"></iframe>');
G.write("</body>");
G.write("</html>");
G.close();
var I=G.body.lastChild;
var P=G.parentWindow;
var V=parent;
var M=V.parent.postMessage0;
if(typeof(M)!="undefined"){I.onload=function(){var W=I.contentWindow;
W.location.replace(K);
M.attach(V,O,U,P,W,H)
}
}}else{var I=document.createElement("iframe");
I.src=K;
document.body.appendChild(I);
var P=window;
var T=I.contentWindow;
var V=parent;
var M=V.parent.postMessage0;
if(typeof(M)!="undefined"){M.attach(V,O,U,P,T,H)
}}}window.onunload=function(){try{var X=window.parent.parent.postMessage0;
if(typeof(X)!="undefined"){X.detach(V)
}}catch(W){}if(typeof(G)!=="undefined"){G.parentWindow.opener=null;
G.open();
G.close();
G=null;
CollectGarbage()
}}
};
n.__init__=function(D,E){var C=a.toString();
D.URI=URI;
D.browser=browser;
if(!E){E=""
}D.setTimeout("("+C+")('"+E+"')",0)
};
n.bridgeURL=false;
n.detach=function(E){var C=o(E);
for(var D=0;
D<A.length;
D++){if(A[D]==C){A.splice(D,1)
}}C.detach()
};
if(window!=top){k.parent=new v();
function h(){var G=new URI((browser=="ie")?document.URL:location.href);
var K=G.fragment||"";
if(document.body!=null&&K.length>0&&K.charAt(0)=="I"){var O=unescape(K);
var H=O.split("!");
if(H.shift()=="I"){var C=H.shift();
var F=H.shift();
var L=unescape(H.shift());
var I=y;
if(C==I){try{parent.location.hash
}catch(D){document.domain=document.domain
}}var J=H.shift()||"";
switch(browser){case"firefox":location.replace([location.href.split("#")[0],J].join("#"));
break;
default:location.hash=J;
break
}var E=o(parent);
E.targetToken=F;
var P=E.sourceToken;
var N=L+"#"+escape([I,F,P].join(","));
var M;
M=document.createElement("iframe");
M.src=N;
M.style.position="absolute";
M.style.left="-10px";
M.style.top="10px";
M.style.visibility="hidden";
M.style.width="0px";
M.style.height="0px";
document.body.appendChild(M);
return
}}setTimeout(h,20)
}h()
}var j=document.getElementsByTagName("meta");
for(var t=0;
t<j.length;
t++){if(j[t].name==="kaazing:postMessage"){if("immediate"==j[t].content){var r=function(){var F=document.getElementsByTagName("iframe");
for(var D=0;
D<F.length;
D++){var E=F[D];
if(E.style.KaaPostMessage=="immediate"){E.style.KaaPostMessage="none";
var C=m(E);
p(C,E.contentWindow)
}}setTimeout(r,20)
};
setTimeout(r,20)
}break
}}for(var t=0;
t<j.length;
t++){if(j[t].name==="kaazing:postMessagePrefix"){var z=j[t].content;
if(z!=null&&z.length>0){if(z.charAt(0)!="/"){z="/"+z
}s=z
}}}setTimeout(f,20);
return n
}})();
var XMLHttpRequest0=(function(){var e=new URI((browser=="ie")?document.URL:location.href);
var g={http:80,https:443};
if(e.port==null){e.port=g[e.scheme];
e.authority=e.host+":"+e.port
}var b={};
var a={};
var c=0;
function o(){}var h=o.prototype;
h.readyState=0;
h.responseText="";
h.status=0;
h.statusText="";
h.timeout=0;
h.onreadystatechange;
h.onerror;
h.onload;
h.onprogress;
h.open=function(u,p,r){if(!r){throw new Error("Asynchronous is required for cross-origin XMLHttpRequest emulation")
}switch(this.readyState){case 0:case 4:break;
default:throw new Error("Invalid ready state")
}var t=m(this);
var q=k(this,p);
q.attach(t);
this._pipe=q;
this._requestHeaders=[];
this._method=u;
this._location=p;
this._responseHeaders={};
this.readyState=1;
this.status=0;
this.statusText="";
this.responseText="";
var s=this;
setTimeout(function(){s.readyState=1;
n(s)
},0)
};
h.setRequestHeader=function(p,q){if(this.readyState!==1){throw new Error("Invalid ready state")
}this._requestHeaders.push([p,q])
};
h.send=function(q){if(this.readyState!==1){throw new Error("Invalid ready state")
}var p=this;
setTimeout(function(){p.readyState=2;
n(p)
},0);
l(this,q)
};
h.abort=function(){var p=this._pipe;
if(p!==undefined){p.post(["a",this._id].join(""));
p.detach(this._id)
}};
h.getResponseHeader=function(p){if(this.status==0){throw new Error("Invalid ready state")
}var q=this._responseHeaders;
return q[p]
};
h.getAllResponseHeaders=function(){if(this.status==0){throw new Error("Invalid ready state")
}return this._responseHeaders
};
function n(p){if(typeof(p.onreadystatechange)!=="undefined"){p.onreadystatechange()
}switch(p.readyState){case 3:if(typeof(p.onprogress)!=="undefined"){p.onprogress()
}break;
case 4:if(p.status<100||p.status>=500){if(typeof(p.onerror)!=="undefined"){p.onerror()
}}else{if(typeof(p.onprogress)!=="undefined"){p.onprogress()
}if(typeof(p.onload)!=="undefined"){p.onload()
}}break
}}function m(p){var q=j(c++,8);
a[q]=p;
p._id=q;
return q
}function l(s,u){if(typeof(u)!=="string"){u=""
}var p=s._method.substring(0,10);
var v=s._location;
var r=s._requestHeaders;
var t=j(s.timeout,4);
var w=(s.onprogress!==undefined)?"t":"f";
var y=["s",s._id,p.length,p,j(v.length,4),v,j(r.length,4)];
for(var q=0;
q<r.length;
q++){var x=r[q];
y.push(j(x[0].length,4));
y.push(x[0]);
y.push(j(x[1].length,4));
y.push(x[1])
}y.push(j(u.length,8),u,j(t,4),w);
s._pipe.post(y.join(""))
}function k(w,z){var q=new URI(z);
var r=(q.scheme!=null&&q.authority!=null);
var y=r?q.scheme:e.scheme;
var C=r?q.authority:e.authority;
if(C!=null&&q.port==null){C=q.host+":"+g[y]
}var u=y+"://"+C;
var s=b[u];
if(s!==undefined){if(!("iframe" in s&&"contentWindow" in s.iframe&&typeof s.iframe.contentWindow=="object")){s=b[u]=undefined
}}if(s===undefined){var t=document.createElement("iframe");
t.style.position="absolute";
t.style.left="-10px";
t.style.top="10px";
t.style.visibility="hidden";
t.style.width="0px";
t.style.height="0px";
var B=new URI(u);
B.query=".kr=xs";
B.path="/";
t.src=B.toString();
function A(D){this.buffer.push(D)
}function v(E){var D=this.attached[E];
if(D===undefined){D={};
this.attached[E]=D
}if(D.timerID!==undefined){clearTimeout(D.timerID);
delete D.timerID
}}function x(F){var D=this.attached[F];
if(D!==undefined&&D.timerID===undefined){var E=this;
D.timerID=setTimeout(function(){delete E.attached[F];
var G=a[F];
if(G._pipe==s){delete a[F];
delete G._id;
delete G._pipe
}postMessage0(s.iframe.contentWindow,["d",F].join(""),s.targetOrigin)
},0)
}}s={targetOrigin:u,iframe:t,buffer:[],post:A,attach:v,detach:x,attached:{count:0}};
b[u]=s;
function p(){var D=t.contentWindow;
if(!D){setTimeout(p,20)
}else{postMessage0(D,"I",u)
}}s.handshakeID=setTimeout(function(){b[u]=undefined;
s.post=function(D){w.readyState=4;
w.status=0;
n(w)
};
if(s.buffer.length>0){s.post()
}},30000);
document.body.appendChild(t);
if(typeof(postMessage)==="undefined"){p()
}}return s
}function d(E){var J=E.origin;
var F={http:":80",https:":443"};
var z=J.split(":");
if(z.length===2){J+=F[z[0]]
}var D=b[J];
if(D!==undefined&&D.iframe!==undefined&&E.source==D.iframe.contentWindow){if(E.data=="I"){clearTimeout(D.handshakeID);
var y;
while((y=D.buffer.shift())!==undefined){postMessage0(D.iframe.contentWindow,y,D.targetOrigin)
}D.post=function(N){postMessage0(D.iframe.contentWindow,N,D.targetOrigin)
}
}else{var y=E.data;
if(y.length>=9){var K=0;
var q=y.substring(K,K+=1);
var A=y.substring(K,K+=8);
var s=a[A];
if(s!==undefined){switch(q){case"r":var r={};
var H=f(y.substring(K,K+=2));
for(var G=0;
G<H;
G++){var v=f(y.substring(K,K+=4));
var u=y.substring(K,K+=v);
var t=f(y.substring(K,K+=4));
var B=y.substring(K,K+=t);
r[u]=B
}var C=f(y.substring(K,K+=4));
var M=f(y.substring(K,K+=2));
var I=y.substring(K,K+=M);
switch(C){case 301:case 302:case 307:var x=r.Location;
var A=m(s);
var D=k(s,x);
D.attach(A);
s._pipe=D;
s._method="GET";
s._location=x;
s._redirect=true;
break;
case 403:s.status=C;
n(s);
break;
default:s._responseHeaders=r;
s.status=C;
s.statusText=I;
break
}break;
case"p":var p=parseInt(y.substring(K,K+=1));
if(s._id===A){s.readyState=p;
var L=f(y.substring(K,K+=8));
var w=y.substring(K,K+=L);
if(w.length>0){s.responseText+=w
}n(s)
}else{if(s._redirect){s._redirect=false;
l(s,"")
}}if(p==4){D.detach(A)
}break;
case"e":if(s._id===A){s.status=0;
s.statusText="";
s.readyState=4;
n(s)
}D.detach(A);
break;
case"t":if(s._id===A){s.status=0;
s.statusText="";
s.readyState=4;
if(typeof(s.ontimeout)!=="undefined"){s.ontimeout()
}}D.detach(A);
break
}}}}}else{}}function f(p){return parseInt(p,16)
}function j(r,p){var q=r.toString(16);
var s=[];
p-=q.length;
while(p-->0){s.push("0")
}s.push(q);
return s.join("")
}window.addEventListener("message",d,false);
return o
})();
ByteOrder=function(){};
(function(){var g=ByteOrder.prototype;
g.toString=function(){throw new Error("Abstract")
};
var d=function(n){return(n&255)
};
var j=function(n){return(n&128)?(n|-256):n
};
var c=function(n){return[((n>>8)&255),(n&255)]
};
var m=function(n,o){return(j(n)<<8)|(o&255)
};
var b=function(n,o){return((n&255)<<8)|(o&255)
};
var e=function(n,o,p){return((n&255)<<16)|((o&255)<<8)|(p&255)
};
var k=function(n){return[((n>>16)&255),((n>>8)&255),(n&255)]
};
var l=function(n,o,p){return((n&255)<<16)|((o&255)<<8)|(p&255)
};
var f=function(n){return[((n>>24)&255),((n>>16)&255),((n>>8)&255),(n&255)]
};
var h=function(q,n,o,p){return(j(q)<<24)|((n&255)<<16)|((o&255)<<8)|(p&255)
};
var a=function(s,n,p,r){var o=b(s,n);
var q=b(p,r);
return(o*65536+q)
};
ByteOrder.BIG_ENDIAN=(function(){var o=function(){};
o.prototype=new ByteOrder();
var n=o.prototype;
n._toUnsignedByte=d;
n._toByte=j;
n._fromShort=c;
n._toShort=m;
n._toUnsignedShort=b;
n._toUnsignedMediumInt=e;
n._fromMediumInt=k;
n._toMediumInt=l;
n._fromInt=f;
n._toInt=h;
n._toUnsignedInt=a;
n.toString=function(){return"<ByteOrder.BIG_ENDIAN>"
};
return new o()
})();
ByteOrder.LITTLE_ENDIAN=(function(){var o=function(){};
o.prototype=new ByteOrder();
var n=o.prototype;
n._toByte=j;
n._toUnsignedByte=d;
n._fromShort=function(p){return c(p).reverse()
};
n._toShort=function(p,q){return m(q,p)
};
n._toUnsignedShort=function(p,q){return b(q,p)
};
n._toUnsignedMediumInt=function(p,q,r){return e(r,q,p)
};
n._fromMediumInt=function(p){return k(p).reverse()
};
n._toMediumInt=function(s,t,u,p,q,r){return l(r,q,p,u,t,s)
};
n._fromInt=function(p){return f(p).reverse()
};
n._toInt=function(s,p,q,r){return h(r,q,p,s)
};
n._toUnsignedInt=function(s,p,q,r){return a(r,q,p,s)
};
n.toString=function(){return"<ByteOrder.LITTLE_ENDIAN>"
};
return new o()
})()
})();
function ByteBuffer(a){this.array=a||[];
this._mark=-1;
this.limit=this.capacity=this.array.length;
this.order=ByteOrder.BIG_ENDIAN
}(function(){ByteBuffer.allocate=function(f){var g=new ByteBuffer();
g.capacity=f;
g.limit=f;
return g
};
ByteBuffer.wrap=function(f){return new ByteBuffer(f)
};
var a=ByteBuffer.prototype;
a.autoExpand=true;
a.capacity=0;
a.position=0;
a.limit=0;
a.order=ByteOrder.BIG_ENDIAN;
a.array=[];
a.mark=function(){this._mark=this.position;
return this
};
a.reset=function(){var f=this._mark;
if(f<0){throw new Error("Invalid mark")
}this.position=f;
return this
};
a.compact=function(){this.array.splice(0,this.position);
this.limit-=this.position;
this.position=0;
return this
};
a.duplicate=function(){var f=new ByteBuffer(this.array);
f.position=this.position;
f.limit=this.limit;
f.capacity=this.capacity;
return f
};
a.fill=function(f){d(this,f);
while(f-->0){this.put(0)
}return this
};
a.fillWith=function(f,g){d(this,g);
while(g-->0){this.put(f)
}return this
};
a.indexOf=function(f){var g=this.limit;
var j=this.array;
for(var h=this.position;
h<g;
h++){if(j[h]==f){return h
}}return -1
};
a.put=function(f){d(this,1);
this.putAt(this.position++,f);
return this
};
a.putAt=function(g,f){b(this,g,1);
this.array[g]=this.order._toUnsignedByte(f);
return this
};
a.putUnsigned=function(f){d(this,1);
this.putUnsignedAt(this.position,f&255);
this.position+=1;
return this
};
a.putUnsignedAt=function(g,f){b(this,g,1);
this.putAt(g,f&255);
return this
};
a.putShort=function(f){d(this,2);
this.putShortAt(this.position,f);
this.position+=2;
return this
};
a.putShortAt=function(g,f){b(this,g,2);
this.putBytesAt(g,this.order._fromShort(f));
return this
};
a.putUnsignedShort=function(f){d(this,2);
this.putUnsignedShortAt(this.position,f&65535);
this.position+=2;
return this
};
a.putUnsignedShortAt=function(g,f){b(this,g,2);
this.putShortAt(g,f&65535);
return this
};
a.putMediumInt=function(f){d(this,3);
this.putMediumIntAt(this.position,f);
this.position+=3;
return this
};
a.putMediumIntAt=function(g,f){this.putBytesAt(g,this.order._fromMediumInt(f));
return this
};
a.putInt=function(f){d(this,4);
this.putIntAt(this.position,f);
this.position+=4;
return this
};
a.putIntAt=function(g,f){b(this,g,4);
this.putBytesAt(g,this.order._fromInt(f));
return this
};
a.putUnsignedInt=function(f){d(this,4);
this.putUnsignedIntAt(this.position,f&4294967295);
this.position+=4;
return this
};
a.putUnsignedIntAt=function(g,f){b(this,g,4);
this.putIntAt(g,f&4294967295);
return this
};
a.putString=function(f,g){g.encode(f,this);
return this
};
a.putPrefixedString=function(g,h,j){if(typeof(j)==="undefined"||typeof(j.encode)==="undefined"){throw new Error("ByteBuffer.putPrefixedString: character set parameter missing")
}if(g===0){return this
}d(this,g);
var f=h.length;
switch(g){case 1:this.put(f);
break;
case 2:this.putShort(f);
break;
case 4:this.putInt(f);
break
}j.encode(h,this);
return this
};
a.putBytes=function(f){d(this,f.length);
this.putBytesAt(this.position,f);
this.position+=f.length;
return this
};
a.putBytesAt=function(m,h){b(this,m,h.length);
for(var l=0,g=m,f=h.length;
l<f;
l++,g++){this.putAt(g,h[l])
}return this
};
a.putBuffer=function(f){this.putBytes(f.array.slice(f.position,f.limit));
return this
};
a.putBufferAt=function(g,f){this.putBytesAt(g,f.array.slice(f.position,f.limit));
return this
};
a.get=function(){e(this,1);
return this.getAt(this.position++)
};
a.getAt=function(f){c(this,f,1);
return this.order._toByte(this.array[f])
};
a.getUnsigned=function(){e(this,1);
var f=this.getUnsignedAt(this.position);
this.position+=1;
return f
};
a.getUnsignedAt=function(f){c(this,f,1);
return this.order._toUnsignedByte(this.array[f])
};
a.getBytes=function(h){e(this,h);
var f=new Array();
for(var g=0;
g<h;
g++){f.push(this.order._toByte(this.array[g+this.position]))
}this.position+=h;
return f
};
a.getBytesAt=function(g,j){c(this,g,j);
var f=new Array();
this.position=g;
for(var h=0;
h<j;
h++){f.push(this.order._toByte(this.array[h+this.position]))
}this.position+=j;
return f
};
a.getShort=function(){e(this,2);
var f=this.getShortAt(this.position);
this.position+=2;
return f
};
a.getShortAt=function(f){c(this,f,2);
var g=this.array;
return this.order._toShort(g[f++],g[f++])
};
a.getUnsignedShort=function(){e(this,2);
var f=this.getUnsignedShortAt(this.position);
this.position+=2;
return f
};
a.getUnsignedShortAt=function(f){c(this,f,2);
var g=this.array;
return this.order._toUnsignedShort(g[f++],g[f++])
};
a.getUnsignedMediumInt=function(){var f=this.array;
return this.order._toUnsignedMediumInt(f[this.position++],f[this.position++],f[this.position++])
};
a.getMediumInt=function(){var f=this.getMediumIntAt(this.position);
this.position+=3;
return f
};
a.getMediumIntAt=function(f){var g=this.array;
return this.order._toMediumInt(g[f++],g[f++],g[f++])
};
a.getInt=function(){e(this,4);
var f=this.getIntAt(this.position);
this.position+=4;
return f
};
a.getIntAt=function(f){c(this,f,4);
var g=this.array;
return this.order._toInt(g[f++],g[f++],g[f++],g[f++])
};
a.getUnsignedInt=function(){e(this,4);
var f=this.getUnsignedIntAt(this.position);
this.position+=4;
return f
};
a.getUnsignedIntAt=function(f){c(this,f,4);
var g=this.array;
return this.order._toUnsignedInt(g[f++],g[f++],g[f++],g[f++]);
return val
};
a.getPrefixedString=function(g,h){var f=0;
switch(g||2){case 1:f=this.getUnsigned();
break;
case 2:f=this.getUnsignedShort();
break;
case 4:f=this.getInt();
break
}if(f===0){return""
}var j=this.limit;
try{this.limit=this.position+f;
return h.decode(this)
}finally{this.limit=j
}};
a.getString=function(g){var f=this.position;
var h=this.limit;
var j=this.array;
while(f<h&&j[f]!==0){f++
}try{this.limit=f;
return g.decode(this)
}finally{if(f!=h){this.limit=h;
this.position=f+1
}}};
a.slice=function(){return new ByteBuffer(this.array.slice(this.position,this.limit))
};
a.flip=function(){this.limit=this.position;
this.position=0;
this._mark=-1;
return this
};
a.rewind=function(){this.position=0;
this._mark=-1;
return this
};
a.clear=function(){this.position=0;
this.limit=this.capacity;
this._mark=-1;
return this
};
a.remaining=function(){return(this.limit-this.position)
};
a.hasRemaining=function(){return(this.limit>this.position)
};
a.skip=function(f){this.position+=f;
return this
};
a.getHexDump=function(){var l=this.array;
var k=this.position;
var f=this.limit;
if(k==f){return"empty"
}var j=[];
for(var g=k;
g<f;
g++){var h=(l[g]||0).toString(16);
if(h.length==1){h="0"+h
}j.push(h)
}return j.join(" ")
};
a.toString=a.getHexDump;
a.expand=function(f){return this.expandAt(this.position,f)
};
a.expandAt=function(g,h){var f=g+h;
if(f>this.capacity){this.capacity=f
}if(f>this.limit){this.limit=f
}return this
};
function d(g,f){if(g.autoExpand){g.expand(f)
}return g
}function e(h,g){var f=h.position+g;
if(f>h.limit){throw new Error("Buffer underflow")
}return h
}function c(j,g,h){var f=g+h;
if(g<0||f>j.limit){throw new Error("Index out of bounds")
}return j
}function b(j,g,h){var f=g+h;
if(g<0||f>j.limit){throw new Error("Index out of bounds")
}return j
}})();
function Charset(){}(function(){var a=Charset.prototype;
a.decode=function(b){};
a.encode=function(b){};
Charset.UTF8=(function(){function d(){}d.prototype=new Charset();
var c=d.prototype;
c.decode=function(h){var k=h.remaining()<10000;
var g=[];
while(h.hasRemaining()){var j=h.remaining();
var f=h.getUnsigned();
var l=b(f);
if(j<l){h.skip(-1);
break
}var e=null;
switch(l){case 1:e=f;
break;
case 2:e=((f&31)<<6)|(h.getUnsigned()&63);
break;
case 3:e=((f&15)<<12)|((h.getUnsigned()&63)<<6)|(h.getUnsigned()&63);
break;
case 4:e=((f&7)<<18)|((h.getUnsigned()&63)<<12)|((h.getUnsigned()&63)<<6)|(h.getUnsigned()&63);
break
}if(k){g.push(e)
}else{g.push(String.fromCharCode(e))
}}if(k){return String.fromCharCode.apply(null,g)
}else{return g.join("")
}};
c.encode=function(h,f){for(var g=0;
g<h.length;
g++){var e=h.charCodeAt(g);
if(e<128){f.put(e)
}else{if(e<2048){f.put((e>>6)|192);
f.put((e&63)|128)
}else{if(e<65536){f.put((e>>12)|224);
f.put(((e>>6)&63)|128);
f.put((e&63)|128)
}else{if(e<1114112){f.put((e>>18)|240);
f.put(((e>>12)&63)|128);
f.put(((e>>6)&63)|128);
f.put((e&63)|128)
}else{throw new Error("Invalid UTF-8 string")
}}}}}};
function b(e){if((e&128)===0){return 1
}if((e&32)===0){return 2
}if((e&16)===0){return 3
}if((e&8)===0){return 4
}throw new Error("Invalid UTF-8 bytes")
}return new d()
})()
})();
(function(){var r="AmqpClient";
var m=function(v){this._name=v;
this._level=m.Level.INFO
};
(function(){m.Level={OFF:8,SEVERE:7,WARNING:6,INFO:5,CONFIG:4,FINE:3,FINER:2,FINEST:1,ALL:0};
var B;
var D=document.getElementsByTagName("meta");
for(var y=0;
y<D.length;
y++){if(D[y].name==="kaazing:logging"){B=D[y].content;
break
}}m._logConf={};
if(B){var A=B.split(",");
for(var y=0;
y<A.length;
y++){var w=A[y].split("=");
m._logConf[w[0]]=w[1]
}}var v={};
m.getLogger=function(F){var E=v[F];
if(E===undefined){E=new m(F);
v[F]=E
}return E
};
var z=m.prototype;
z.setLevel=function(E){if(E&&E>=m.Level.ALL&&E<=m.Level.OFF){this._level=E
}};
z.isLoggable=function(G){for(var F in m._logConf){if(this._name.match(F)){var E=m._logConf[F];
if(E){return(m.Level[E]<=G)
}}}return(this._level<=G)
};
var C=function(){};
var x={};
x[m.Level.OFF]=C;
x[m.Level.SEVERE]=(window.console)?(console.error||console.log||C):C;
x[m.Level.WARNING]=(window.console)?(console.warn||console.log||C):C;
x[m.Level.INFO]=(window.console)?(console.info||console.log||C):C;
x[m.Level.CONFIG]=(window.console)?(console.info||console.log||C):C;
x[m.Level.FINE]=(window.console)?(console.debug||console.log||C):C;
x[m.Level.FINER]=(window.console)?(console.debug||console.log||C):C;
x[m.Level.FINEST]=(window.console)?(console.debug||console.log||C):C;
x[m.Level.ALL]=(window.console)?(console.log||C):C;
z.config=function(F,E){this.log(m.Level.CONFIG,F,E)
};
z.entering=function(G,E,H){if(this.isLoggable(m.Level.FINER)){if(browser=="chrome"||browser=="safari"){G=console
}var F=x[m.Level.FINER];
if(H){if(typeof(F)=="object"){F("ENTRY "+E,H)
}else{F.call(G,"ENTRY "+E,H)
}}else{if(typeof(F)=="object"){F("ENTRY "+E)
}else{F.call(G,"ENTRY "+E)
}}}};
z.exiting=function(H,E,G){if(this.isLoggable(m.Level.FINER)){var F=x[m.Level.FINER];
if(browser=="chrome"||browser=="safari"){H=console
}if(G){if(typeof(F)=="object"){F("RETURN "+E,G)
}else{F.call(H,"RETURN "+E,G)
}}else{if(typeof(F)=="object"){F("RETURN "+E)
}else{F.call(H,"RETURN "+E)
}}}};
z.fine=function(F,E){this.log(m.Level.FINE,F,E)
};
z.finer=function(F,E){this.log(m.Level.FINER,F,E)
};
z.finest=function(F,E){this.log(m.Level.FINEST,F,E)
};
z.info=function(F,E){this.log(m.Level.INFO,F,E)
};
z.log=function(H,G,F){if(this.isLoggable(H)){var E=x[H];
if(browser=="chrome"||browser=="safari"){G=console
}if(typeof(E)=="object"){E(F)
}else{E.call(G,F)
}}};
z.severe=function(F,E){this.log(m.Level.SEVERE,F,E)
};
z.warning=function(F,E){this.log(m.Level.WARNING,F,E)
}
})();
var c=m.getLogger("com.kaazing.gateway.client.loader.Utils");
var k=function(z){c.entering(this,"Utils.getMetaValue",z);
var x=document.getElementsByTagName("meta");
for(var y=0;
y<x.length;
y++){if(x[y].name===z){var w=x[y].content;
c.exiting(this,"Utils.getMetaValue",w);
return w
}}c.exiting(this,"Utils.getMetaValue")
};
var g=function(x){c.entering(this,"Utils.arrayCopy",x);
var v=[];
for(var w=0;
w<x.length;
w++){v.push(x[w])
}return v
};
var q=function(z,y){c.entering(this,"Utils.arrayFilter",{array:z,callback:y});
var v=[];
for(var x=0;
x<z.length;
x++){var w=z[x];
if(y(w)){v.push(z[x])
}}return v
};
var d=function(x,v){c.entering(this,"Utils.indexOf",{array:x,searchElement:v});
for(var w=0;
w<x.length;
w++){if(x[w]==v){c.exiting(this,"Utils.indexOf",w);
return w
}}c.exiting(this,"Utils.indexOf",-1);
return -1
};
var o=function(A){c.entering(this,"Utils.decodeByteString",A);
var w=[];
for(var z=0;
z<A.length;
z++){w.push(A.charCodeAt(z)&255)
}var y=new ByteBuffer(w);
var x=j(y,Charset.UTF8);
c.exiting(this,"Utils.decodeByteString",x);
return x
};
var h=function(z){c.entering(this,"Utils.decodeArrayBuffer",z);
var w=new Uint8Array(z);
var v=[];
for(var x=0;
x<w.length;
x++){v.push(w[x])
}var w=new ByteBuffer(v);
var y=j(w,Charset.UTF8);
c.exiting(this,"Utils.decodeArrayBuffer",y);
return y
};
var n=function(y){c.entering(this,"Utils.decodeArrayBuffer2ByteBuffer");
var w=new Uint8Array(y);
var v=[];
for(var x=0;
x<w.length;
x++){v.push(w[x])
}c.exiting(this,"Utils.decodeArrayBuffer2ByteBuffer");
return new ByteBuffer(v)
};
var p=String.fromCharCode(127);
var t=String.fromCharCode(0);
var l="\n";
var u=function(y){c.entering(this,"Utils.encodeEscapedByte",y);
var w=[];
while(y.remaining()){var A=y.getUnsigned();
var z=String.fromCharCode(A);
switch(z){case p:w.push(p);
w.push(p);
break;
case t:w.push(p);
w.push("0");
break;
case l:w.push(p);
w.push("n");
break;
default:w.push(z)
}}var x=w.join("");
c.exiting(this,"Utils.encodeEscapedBytes",x);
return x
};
var s=function(w,x){c.entering(this,"Utils.encodeByteString",{buf:w,requiresEscaping:x});
if(x){return u(w)
}else{var v=[];
while(w.remaining()){var z=w.getUnsigned();
v.push(String.fromCharCode(z))
}var y=v.join("");
c.exiting(this,"Utils.encodeByteString",y);
return y
}};
var j=function(w,x){var v=w.position;
var y=w.limit;
var z=w.array;
while(v<y){v++
}try{w.limit=v;
return x.decode(w)
}finally{if(v!=y){w.limit=y;
w.position=v+1
}}};
var b=window.WebSocket;
var a=(function(){var v=m.getLogger("WebSocketNativeProxy");
var E=function(){this.parent;
this._listener
};
var x=(browser=="safari"&&typeof(b.CLOSING)=="undefined");
var C=E.prototype;
C.connect=function(I,L){v.entering(this,"WebSocketNativeProxy.<init>",{location:I,protocol:L});
if(typeof(b)==="undefined"){D(this);
return
}if(I.indexOf("javascript:")==0){I=I.substr("javascript:".length)
}var J=I.indexOf("?");
if(J!=-1){if(!/[\?&]\.kl=Y/.test(I.substring(J))){I+="&.kl=Y"
}}else{I+="?.kl=Y"
}if(x){I+="&encoding=utf8"
}this._balanced=false;
this._sendQueue=[];
try{if(L){this._requestedProtocol=L;
this._delegate=new b(I,L)
}else{this._delegate=new b(I)
}this._delegate.binaryType="arraybuffer"
}catch(K){v.severe(this,"WebSocketNativeProxy.<init> "+K);
D(this);
return
}z(this)
};
C.onerror=function(){};
C.onmessage=function(){};
C.onopen=function(){};
C.onclose=function(){};
C.close=function(){v.entering(this,"WebSocketNativeProxy.close");
this._delegate.close()
};
C.send=function(I){v.entering(this,"WebSocketNativeProxy.send",I);
if(this._balanced==true){G(this,I)
}else{this._sendQueue.push(I)
}};
C.setListener=function(I){this._listener=I
};
function G(L,K){v.entering(this,"WebSocketNativeProxy.doSend",K);
if(typeof(K)=="string"){L._delegate.send(K)
}else{if(K.constructor==ByteBuffer){if(x){var M=s(K);
L._delegate.send(M)
}else{var I=new Uint8Array(K.remaining());
for(var J=0;
J<I.byteLength;
J++){I[J]=K.getUnsigned()
}L._delegate.send(I.buffer)
}}else{v.severe(this,"WebSocketNativeProxy.doSend called with unkown type "+typeof(K));
throw new Error("Cannot call send() with that type")
}}}function D(J,I){v.entering(this,"WebSocketNativeProxy.doError",I);
setTimeout(function(){J._listener.connectionFailed(J.parent)
},0)
}function y(L,K){var I;
if(typeof K.data.byteLength!=="undefined"){I=n(K.data)
}else{I=ByteBuffer.allocate(K.data.length);
if(L.parent._isBinary&&L.parent._balanced){for(var J=0;
J<K.data.length;
J++){I.put(K.data.charCodeAt(J))
}}else{I.putString(K.data,Charset.UTF8)
}I.flip()
}return I
}function H(O,N){v.entering(this,"WebSocketNativeProxy.messageHandler",N);
if(O._balanced==true){if(typeof N.data.byteLength!=="undefined"){N.decoder=h
}O._listener.messageReceived(O.parent,y(O,N))
}else{var M=N.data;
if(typeof N.data.byteLength!=="undefined"){M=h(N.data)
}if(M.match("^\uf0ff")=="\uf0ff"){var K=M.substring(1);
if(K.match("^R")=="R"){var J=K.substring(1);
if(J&&J!=""){v.finest(this,"WebSocketNativeProxy.messageHandler: redirectLoc = "+J);
var L=J.indexOf("?");
if(L!=-1){J+="&.kl=Y"
}else{J+="?.kl=Y"
}if(x){J+="&encoding=utf8"
}F(O);
O.close();
O._delegate=new b(J);
O._delegate.binaryType="arraybuffer";
z(O)
}else{v.warning(this,"WebSocketNativeProxy.messageHandler: No balancees");
O.close()
}}else{if(K.match("^N$")=="N"){v.finest(this,"WebSocketNativeProxy.messageHandler: Not balancer - service gateway");
O._balanced=true;
O._listener.connectionOpened(O.parent,O.parent.protocol);
var I;
while(I=O._sendQueue.shift()){G(O,I)
}}else{v.warning(this,"WebSocketNativeProxy.messageHandler: Unknown balancer control frame command "+N.data);
O._balanced=true;
O._listener.messageReceived(O.parent,y(O,N))
}}}else{v.warning(this,"WebSocketNativeProxy.messageHandler: Unknown balancer control frame "+N.data);
O._balanced=true;
O._listener.messageReceived(O.parent,y(O,N))
}}}function w(J,I){v.entering(this,"WebSocketNativeProxy.closeHandler",I);
F(J);
J._listener.connectionClosed(J.parent)
}function B(J,I){v.entering(this,"WebSocketNativeProxy.errorHandler",I);
F(J);
J._listener.connectionFailed(J.parent)
}function A(J,I){v.entering(this,"WebSocketNativeProxy.openHandler",I);
J.parent.protocol=J._delegate.protocol;
if(browser=="safari"){J.parent.protocol=J._requestedProtocol
}}function z(J){v.entering(this,"WebSocketNativeProxy.bindHandlers");
var I=J._delegate;
I.onopen=function(K){A(J,K)
};
I.onmessage=function(K){H(J,K)
};
I.onclose=function(K){w(J,K)
};
I.onerror=function(K){B(J,K)
};
J.readyState=function(){return I.readyState
}
}function F(J){v.entering(this,"WebSocketNativeProxy.unbindHandlers");
var I=J._delegate;
I.onmessage=undefined;
I.onclose=undefined;
I.onopen=undefined;
I.onerror=undefined;
J.readyState=3
}return E
})();
var f=(function(){var y=m.getLogger("WebSocketEmulatedFlashProxy");
var z=function(){this.parent;
this._listener
};
var v=z.prototype;
v.connect=function(B,D){y.entering(this,"WebSocketEmulatedFlashProxy.<init>",B);
this.URL=B;
try{w(this,B,D)
}catch(C){y.severe(this,"WebSocketEmulatedFlashProxy.<init> "+C);
x(this,C)
}this.constructor=z;
y.exiting(this,"WebSocketEmulatedFlashProxy.<init>")
};
v.setListener=function(B){this._listener=B
};
z._flashBridge={};
z._flashBridge.readyWaitQueue=[];
z._flashBridge.failWaitQueue=[];
z._flashBridge.flashHasLoaded=false;
z._flashBridge.flashHasFailed=false;
v.URL="";
v.readyState=0;
v.bufferedAmount=0;
v.connectionOpened=function(C,D){var D=D.split("\n");
for(var B=0;
B<D.length;
B++){var E=D[B].split(":");
C.responseHeaders[E[0]]=E[1]
}this._listener.connectionOpened(C,"")
};
v.connectionClosed=function(B){this._listener.connectionClosed(B)
};
v.connectionFailed=function(B){this._listener.connectionFailed(B)
};
v.messageReceived=function(B,C){this._listener.messageReceived(B,C)
};
v.redirected=function(C,B){this._listener.redirected(C,B)
};
v.authenticationRequested=function(D,B,C){this._listener.authenticationRequested(D,B,C)
};
v.send=function(D){y.entering(this,"WebSocketEmulatedFlashProxy.send",D);
switch(this.readyState){case 0:y.severe(this,"WebSocketEmulatedFlashProxy.send: readyState is 0");
throw new Error("INVALID_STATE_ERR");
break;
case 1:if(D===null){y.severe(this,"WebSocketEmulatedFlashProxy.send: Data is null");
throw new Error("data is null")
}if(typeof(D)=="string"){z._flashBridge.sendText(this._instanceId,D)
}else{if(typeof(D.array)=="object"){var E;
var C=[];
var B;
while(D.remaining()){B=D.get();
C.push(String.fromCharCode(B))
}var E=C.join("");
z._flashBridge.sendByteString(this._instanceId,E);
return
}else{y.severe(this,"WebSocketEmulatedFlashProxy.send: Data is on invalid type "+typeof(D));
throw new Error("Invalid type")
}}A(this);
return true;
break;
case 2:return false;
break;
default:y.severe(this,"WebSocketEmulatedFlashProxy.send: Invalid readyState "+this.readyState);
throw new Error("INVALID_STATE_ERR")
}};
v.close=function(){y.entering(this,"WebSocketEmulatedFlashProxy.close");
switch(this.readyState){case 1:case 2:z._flashBridge.disconnect(this._instanceId);
break
}};
v.disconnect=v.close;
var A=function(B){y.entering(this,"WebSocketEmulatedFlashProxy.updateBufferedAmount");
B.bufferedAmount=z._flashBridge.getBufferedAmount(B._instanceId);
if(B.bufferedAmount!=0){setTimeout(function(){A(B)
},1000)
}};
var w=function(E,C,G){y.entering(this,"WebSocketEmulatedFlashProxy.registerWebSocket",C);
var B=function(J,I){I[J]=E;
E._instanceId=J
};
var H=function(){x(E)
};
var F=[];
if(E.parent.requestHeaders&&E.parent.requestHeaders.length>0){for(var D=0;
D<E.parent.requestHeaders.length;
D++){F.push(E.parent.requestHeaders[D].label+":"+E.parent.requestHeaders[D].value)
}}z._flashBridge.registerWebSocketEmulated(C,F.join("\n"),B,H)
};
function x(C,B){y.entering(this,"WebSocketEmulatedFlashProxy.doError",B);
setTimeout(function(){C._listener.connectionFailed(C.parent)
},0)
}return z
})();
var e=(function(){var y=m.getLogger("WebSocketRtmpFlashProxy");
var A=function(){this.parent;
this._listener
};
var v=A.prototype;
v.connect=function(B,D){y.entering(this,"WebSocketRtmpFlashProxy.<init>",B);
this.URL=B;
try{w(this,B,D)
}catch(C){y.severe(this,"WebSocketRtmpFlashProxy.<init> "+C);
x(this,C)
}this.constructor=A;
y.exiting(this,"WebSocketRtmpFlashProxy.<init>")
};
v.setListener=function(B){this._listener=B
};
f._flashBridge={};
f._flashBridge.readyWaitQueue=[];
f._flashBridge.failWaitQueue=[];
f._flashBridge.flashHasLoaded=false;
f._flashBridge.flashHasFailed=false;
v.URL="";
v.readyState=0;
v.bufferedAmount=0;
v.connectionOpened=function(C,D){var D=D.split("\n");
for(var B=0;
B<D.length;
B++){var E=D[B].split(":");
C.responseHeaders[E[0]]=E[1]
}this._listener.connectionOpened(C,"")
};
v.connectionClosed=function(B){this._listener.connectionClosed(B)
};
v.connectionFailed=function(B){this._listener.connectionFailed(B)
};
v.messageReceived=function(B,C){this._listener.messageReceived(B,C)
};
v.redirected=function(C,B){this._listener.redirected(C,B)
};
v.authenticationRequested=function(D,B,C){this._listener.authenticationRequested(D,B,C)
};
v.send=function(D){y.entering(this,"WebSocketRtmpFlashProxy.send",D);
switch(this.readyState){case 0:y.severe(this,"WebSocketRtmpFlashProxy.send: readyState is 0");
throw new Error("INVALID_STATE_ERR");
break;
case 1:if(D===null){y.severe(this,"WebSocketRtmpFlashProxy.send: Data is null");
throw new Error("data is null")
}if(typeof(D)=="string"){f._flashBridge.sendText(this._instanceId,D)
}else{if(typeof(D.array)=="object"){var E;
var C=[];
var B;
while(D.remaining()){B=D.get();
C.push(String.fromCharCode(B))
}var E=C.join("");
f._flashBridge.sendByteString(this._instanceId,E);
return
}else{y.severe(this,"WebSocketRtmpFlashProxy.send: Data is on invalid type "+typeof(D));
throw new Error("Invalid type")
}}z(this);
return true;
break;
case 2:return false;
break;
default:y.severe(this,"WebSocketRtmpFlashProxy.send: Invalid readyState "+this.readyState);
throw new Error("INVALID_STATE_ERR")
}};
v.close=function(){y.entering(this,"WebSocketRtmpFlashProxy.close");
switch(this.readyState){case 1:case 2:f._flashBridge.disconnect(this._instanceId);
break
}};
v.disconnect=v.close;
var z=function(B){y.entering(this,"WebSocketRtmpFlashProxy.updateBufferedAmount");
B.bufferedAmount=f._flashBridge.getBufferedAmount(B._instanceId);
if(B.bufferedAmount!=0){setTimeout(function(){z(B)
},1000)
}};
var w=function(E,C,G){y.entering(this,"WebSocketRtmpFlashProxy.registerWebSocket",C);
var B=function(J,I){I[J]=E;
E._instanceId=J
};
var H=function(){x(E)
};
var F=[];
if(E.parent.requestHeaders&&E.parent.requestHeaders.length>0){for(var D=0;
D<E.parent.requestHeaders.length;
D++){F.push(E.parent.requestHeaders[D].label+":"+E.parent.requestHeaders[D].value)
}}f._flashBridge.registerWebSocketRtmp(C,F.join("\n"),B,H)
};
function x(C,B){y.entering(this,"WebSocketRtmpFlashProxy.doError",B);
setTimeout(function(){C._listener.connectionFailed(C.parent)
},0)
}return A
})();
(function(){var w=m.getLogger("com.kaazing.gateway.client.loader.FlashBridge");
var v={};
f._flashBridge.registerWebSocketEmulated=function(y,B,C,z){w.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.registerWebSocketEmulated",{location:y,callback:C,errback:z});
var A=function(){var D=f._flashBridge.doRegisterWebSocketEmulated(y,B);
C(D,v)
};
if(f._flashBridge.flashHasLoaded){if(f._flashBridge.flashHasFailed){z()
}else{A()
}}else{this.readyWaitQueue.push(A);
this.failWaitQueue.push(z)
}w.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.registerWebSocketEmulated")
};
f._flashBridge.doRegisterWebSocketEmulated=function(y,A){w.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.doRegisterWebSocketEmulated",{location:y,headers:A});
var z=f._flashBridge.elt.registerWebSocketEmulated(y,A);
w.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.doRegisterWebSocketEmulated",z);
return z
};
f._flashBridge.registerWebSocketRtmp=function(y,B,C,z){w.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.registerWebSocketRtmp",{location:y,callback:C,errback:z});
var A=function(){var D=f._flashBridge.doRegisterWebSocketRtmp(y,B);
C(D,v)
};
if(f._flashBridge.flashHasLoaded){if(f._flashBridge.flashHasFailed){z()
}else{A()
}}else{this.readyWaitQueue.push(A);
this.failWaitQueue.push(z)
}w.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.registerWebSocketEmulated")
};
f._flashBridge.doRegisterWebSocketRtmp=function(y,A){w.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.doRegisterWebSocketRtmp",{location:y,protocol:A});
var z=f._flashBridge.elt.registerWebSocketRtmp(y,A);
w.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.doRegisterWebSocketRtmp",z);
return z
};
f._flashBridge.onready=function(){w.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.onready");
var z=f._flashBridge.readyWaitQueue;
for(var y=0;
y<z.length;
y++){var A=z[y];
A()
}w.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.onready")
};
f._flashBridge.onfail=function(){w.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.onfail");
var A=f._flashBridge.failWaitQueue;
for(var z=0;
z<A.length;
z++){var y=A[z];
y()
}w.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.onfail")
};
f._flashBridge.connectionOpened=function(y,z){w.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.connectionOpened",y);
v[y].readyState=1;
v[y].connectionOpened(v[y].parent,z);
x();
w.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.connectionOpened")
};
f._flashBridge.connectionClosed=function(y){w.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.connectionClosed",y);
v[y].readyState=2;
v[y].connectionClosed(v[y].parent);
w.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.connectionClosed")
};
f._flashBridge.connectionFailed=function(y){w.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.connectionFailed",y);
v[y].connectionFailed(v[y].parent);
w.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.connectionFailed")
};
f._flashBridge.messageReceived=function(B,C){w.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.messageReceived",{key:B,data:C});
var A=v[B];
if(A.readyState==1){var y=ByteBuffer.allocate(C.length);
for(var z=0;
z<C.length;
z++){y.put(C[z])
}y.flip();
A.messageReceived(A.parent,y)
}w.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.messageReceived")
};
f._flashBridge.redirected=function(A,y){w.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.redirected",{key:A,data:y});
var z=v[A];
z.redirected(z.parent,y);
w.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.redirected")
};
f._flashBridge.authenticationRequested=function(B,y,A){w.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.authenticationRequested",{key:B,data:y});
var z=v[B];
z.authenticationRequested(z.parent,y,A);
w.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.authenticationRequested")
};
var x=function(){w.entering(this,"WebSocketEmulatedFlashProxy.killLoadingBar");
if(browser==="firefox"){var y=document.createElement("iframe");
y.style.display="none";
document.body.appendChild(y);
document.body.removeChild(y)
}};
f._flashBridge.sendText=function(y,z){w.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.sendText",{key:y,message:z});
this.elt.processTextMessage(y,escape(z));
setTimeout(x,200)
};
f._flashBridge.sendByteString=function(y,z){w.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.sendByteString",{key:y,message:z});
this.elt.processBinaryMessage(y,escape(z));
setTimeout(x,200)
};
f._flashBridge.disconnect=function(y){w.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.disconnect",y);
this.elt.processClose(y)
};
f._flashBridge.getBufferedAmount=function(z){w.entering(this,"WebSocketEmulatedFlashProxy._flashBridge.getBufferedAmount",z);
var y=this.elt.getBufferedAmount(z);
w.exiting(this,"WebSocketEmulatedFlashProxy._flashBridge.getBufferedAmount",y);
return y
}
})();
(function(){var y=function(aw){var ay=this;
var aq=3000;
var av="Loader";
var al=false;
var au=-1;
ay.elt=null;
var ar=function(){var aD=new RegExp(".*"+aw+".*.js$");
var az=document.getElementsByTagName("script");
for(var aB=0;
aB<az.length;
aB++){if(az[aB].src){var aA=(az[aB].src).match(aD);
if(aA){aA=aA.pop();
var aC=aA.split("/");
aC.pop();
if(aC.length>0){return aC.join("/")+"/"
}else{return""
}}}}};
var at=ar();
var ap=at+"Loader.swf";
ay.loader=function(){var aB="flash";
var az=document.getElementsByTagName("meta");
for(var aA=0;
aA<az.length;
aA++){if(az[aA].name==="kaazing:upgrade"){aB=az[aA].content
}}if(aB!="flash"||!am([9,0,115])){ak()
}else{au=setTimeout(ak,aq);
an()
}};
ay.clearFlashTimer=function(){clearTimeout(au);
au="cleared";
setTimeout(function(){ax(ay.elt.handshake(aw))
},0)
};
var ax=function(az){if(az){f._flashBridge.flashHasLoaded=true;
f._flashBridge.elt=ay.elt;
f._flashBridge.onready()
}else{ak()
}window.___Loader=undefined
};
var ak=function(){f._flashBridge.flashHasLoaded=true;
f._flashBridge.flashHasFailed=true;
f._flashBridge.onfail()
};
var ao=function(){var aA=null;
if(typeof(ActiveXObject)!="undefined"){try{al=true;
var aC=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
var az=aC.GetVariable("$version");
var aD=az.split(" ")[1].split(",");
aA=[];
for(var aB=0;
aB<aD.length;
aB++){aA[aB]=parseInt(aD[aB])
}}catch(aF){al=false
}}if(typeof navigator.plugins!="undefined"){if(typeof navigator.plugins["Shockwave Flash"]!="undefined"){var az=navigator.plugins["Shockwave Flash"].description;
az=az.replace(/\s*r/g,".");
var aD=az.split(" ")[2].split(".");
aA=[];
for(var aB=0;
aB<aD.length;
aB++){aA[aB]=parseInt(aD[aB])
}}}var aE=navigator.userAgent;
if(aA!==null&&aA[0]===10&&aA[1]===0&&aE.indexOf("Windows NT 6.0")!==-1){aA=null
}if(aE.indexOf("MSIE 6.0")==-1&&aE.indexOf("MSIE 7.0")==-1){aA=null
}return aA
};
var am=function(aB){var az=ao();
if(az==null){return false
}for(var aA=0;
aA<Math.max(az.length,aB.length);
aA++){var aC=az[aA]-aB[aA];
if(aC!=0){return(aC>0)?true:false
}}return true
};
var an=function(){if(al){var az=document.createElement("div");
document.body.appendChild(az);
az.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" height="0" width="0" id="'+av+'"><param name="movie" value="'+ap+'"></param></object>';
ay.elt=document.getElementById(av)
}else{var az=document.createElement("object");
az.setAttribute("type","application/x-shockwave-flash");
az.setAttribute("width",0);
az.setAttribute("height",0);
az.setAttribute("id",av);
az.setAttribute("data",ap);
document.body.appendChild(az);
ay.elt=az
}};
ay.attachToOnload=function(az){if(window.addEventListener){window.addEventListener("load",az,true)
}else{if(window.attachEvent){window.attachEvent("onload",az)
}else{onload=az
}}};
if(document.readyState==="complete"){ay.loader()
}else{ay.attachToOnload(ay.loader)
}};
var Q=(function(){var ak=function(al){this.HOST=new ak(0);
this.USERINFO=new ak(1);
this.PORT=new ak(2);
this.PATH=new ak(3);
this.ordinal=al
};
return ak
})();
var ah=(function(){var ak=function(){};
ak.getRealm=function(am){var ao=am.authenticationParameters;
if(ao==null){return null
}var an=/realm=(\"(.*)\")/i;
var al=an.exec(ao);
return(al!=null&&al.length>=3)?al[2]:null
};
return ak
})();
function D(){this.Keys=new Array()
}var ac=(function(){var al=function(am){this.weakKeys=am;
this.elements=[];
this.dictionary=new D()
};
var ak=al.prototype;
ak.getlength=function(){return this.elements.length
};
ak.getItemAt=function(am){return this.dictionary[this.elements[am]]
};
ak.get=function(an){var am=this.dictionary[an];
if(am==undefined){am=null
}return am
};
ak.remove=function(ao){for(var an=0;
an<this.elements.length;
an++){var am=(this.weakKeys&&(this.elements[an]==ao));
var ap=(!this.weakKeys&&(this.elements[an]===ao));
if(am||ap){this.elements.remove(an);
this.dictionary[this.elements[an]]=undefined;
break
}}};
ak.put=function(am,an){this.remove(am);
this.elements.push(am);
this.dictionary[am]=an
};
ak.isEmpty=function(){return this.length==0
};
ak.containsKey=function(ao){for(var an=0;
an<this.elements.length;
an++){var am=(this.weakKeys&&(this.elements[an]==ao));
var ap=(!this.weakKeys&&(this.elements[an]===ao));
if(am||ap){return true
}}return false
};
ak.keySet=function(){return this.elements
};
ak.getvalues=function(){var am=[];
for(var an=0;
an<this.elements.length;
an++){am.push(this.dictionary[this.elements[an]])
}return am
};
return al
})();
var O=(function(){var al=function(){this.name="";
this.kind="";
this.values=[];
this.children=new ac()
};
var ak=al.prototype;
ak.getWildcardChar=function(){return"*"
};
ak.addChild=function(an,ao){if(an==null||an.length==0){throw new ArgumentError("A node may not have a null name.")
}var am=al.createNode(an,this,ao);
this.children.put(an,am);
return am
};
ak.hasChild=function(am,an){return null!=this.getChild(am)&&an==this.getChild(am).kind
};
ak.getChild=function(am){return this.children.get(am)
};
ak.getDistanceFromRoot=function(){var am=0;
var an=this;
while(!an.isRootNode()){am++;
an=an.parent
}return am
};
ak.appendValues=function(){if(this.isRootNode()){throw new ArgumentError("Cannot set a values on the root node.")
}if(this.values!=null){for(var am=0;
am<arguments.length;
am++){var an=arguments[am];
this.values.push(an)
}}};
ak.removeValue=function(am){if(this.isRootNode()){return
}this.values.remove(am)
};
ak.getValues=function(){return this.values
};
ak.hasValues=function(){return this.values!=null&&this.values.length>0
};
ak.isRootNode=function(){return this.parent==null
};
ak.hasChildren=function(){return this.children!=null&&this.children.getlength()>0
};
ak.isWildcard=function(){return this.name!=null&&this.name==this.getWildcardChar()
};
ak.hasWildcardChild=function(){return this.hasChildren()&&this.children.containsKey(this.getWildcardChar())
};
ak.getFullyQualifiedName=function(){var am=new String();
var ao=[];
var ap=this;
while(!ap.isRootNode()){ao.push(ap.name);
ap=ap.parent
}ao=ao.reverse();
for(var an=0;
an<ao.length;
an++){am+=ao[an];
am+="."
}if(am.length>=1&&am.charAt(am.length-1)=="."){am=am.slice(0,am.length-1)
}return am.toString()
};
ak.getChildrenAsList=function(){return this.children.getvalues()
};
ak.findBestMatchingNode=function(ar,aq){var ap=this.findAllMatchingNodes(ar,aq);
var am=null;
var at=0;
for(var an=0;
an<ap.length;
an++){var ao=ap[an];
if(ao.getDistanceFromRoot()>at){at=ao.getDistanceFromRoot();
am=ao
}}return am
};
ak.findAllMatchingNodes=function(au,at){var aw=[];
var am=this.getChildrenAsList();
for(var ar=0;
ar<am.length;
ar++){var ao=am[ar];
var ap=ao.matches(au,at);
if(ap<0){continue
}if(ap>=au.length){do{if(ao.hasValues()){aw.push(ao)
}if(ao.hasWildcardChild()){var an=ao.getChild(this.getWildcardChar());
if(an.kind!=this.kind){ao=null
}else{ao=an
}}else{ao=null
}}while(ao!=null)
}else{var av=ao.findAllMatchingNodes(au,ap);
for(var aq=0;
aq<av.length;
aq++){aw.push(av[aq])
}}}return aw
};
ak.matches=function(an,am){if(am<0||am>=an.length){return -1
}if(this.matchesToken(an[am])){return am+1
}if(!this.isWildcard()){return -1
}else{if(this.kind!=an[am].kind){return -1
}do{am++
}while(am<an.length&&this.kind==an[am].kind);
return am
}};
ak.matchesToken=function(am){return this.name==am.name&&this.kind==am.kind
};
al.createNode=function(am,ao,an){var ap=new al();
ap.name=am;
ap.parent=ao;
ap.kind=an;
return ap
};
return al
})();
var x=(function(){var ak=function(al,am){this.kind=am;
this.name=al
};
return ak
})();
window.Oid=(function(){var al=function(am){this.rep=am
};
var ak=al.prototype;
ak.asArray=function(){return this.rep
};
ak.asString=function(){var an="";
for(var am=0;
am<this.rep.length;
am++){an+=(this.rep[am].toString());
an+="."
}if(an.length>0&&an.charAt(an.length-1)=="."){an=an.slice(0,an.length-1)
}return an
};
al.create=function(am){return new al(am.split("."))
};
return al
})();
var A=(function(){var ak=function(){};
ak.create=function(ar,an,aq){var ap=ar+":"+an;
var al=[];
for(var ao=0;
ao<ap.length;
++ao){al.push(ap.charCodeAt(ao))
}var am="Basic "+Base64.encode(al);
return new ChallengeResponse(am,aq)
};
return ak
})();
function ai(){this.canHandle=function(ak){return false
};
this.handle=function(ak,al){al(null)
}
}window.PasswordAuthentication=(function(){function ak(am,al){this.username=am;
this.password=al
}ak.prototype.clear=function(){this.username=null;
this.password=null
};
return ak
})();
window.ChallengeRequest=(function(){var ak=function(al,am){if(al==null){throw new Error("location is not defined.")
}if(am==null){return
}var an="Application ";
if(am.indexOf(an)==0){am=am.substring(an.length)
}this.location=al;
this.authenticationParameters=null;
var ao=am.indexOf(" ");
if(ao==-1){this.authenticationScheme=am
}else{this.authenticationScheme=am.substring(0,ao);
if(am.length>ao+1){this.authenticationParameters=am.substring(ao+1)
}}};
return ak
})();
window.ChallengeResponse=(function(){var al=function(am,an){this.credentials=am;
this.nextChallengeHandler=an
};
var ak=al.prototype;
ak.clearCredentials=function(){if(this.credentials!=null){this.credentials=null
}};
return al
})();
window.BasicChallengeHandler=(function(){var al=function(){this.loginHandler=undefined;
this.loginHandlersByRealm={}
};
var ak=al.prototype;
ak.setRealmLoginHandler=function(am,an){if(am==null){throw new ArgumentError("null realm")
}if(an==null){throw new ArgumentError("null loginHandler")
}this.loginHandlersByRealm[am]=an;
return this
};
ak.canHandle=function(am){return am!=null&&"Basic"==am.authenticationScheme
};
ak.handle=function(an,aq){if(an.location!=null){var ao=this.loginHandler;
var am=ah.getRealm(an);
if(am!=null&&this.loginHandlersByRealm[am]!=null){ao=this.loginHandlersByRealm[am]
}var ap=this;
if(ao!=null){ao(function(ar){if(ar!=null&&ar.username!=null){aq(A.create(ar.username,ar.password,ap))
}else{aq(null)
}});
return
}}aq(null)
};
ak.loginHandler=function(am){am(null)
};
return al
})();
window.DispatchChallengeHandler=(function(){var au=function(){this.rootNode=new O();
var aw="^(.*)://(.*)";
this.SCHEME_URI_PATTERN=new RegExp(aw)
};
function am(ax,aB,aw){var aA=ar(aB);
var aC=ax;
for(var az=0;
az<aA.length;
az++){var ay=aA[az];
if(!aC.hasChild(ay.name,ay.kind)){return
}else{aC=aC.getChild(ay.name())
}}aC.removeValue(aw)
}function ak(ax,aB,aw){var aA=ar(aB);
var aC=ax;
for(var az=0;
az<aA.length;
az++){var ay=aA[az];
if(!aC.hasChild(ay.name,ay.kind)){aC=aC.addChild(ay.name,ay.kind)
}else{aC=aC.getChild(ay.name)
}}aC.appendValues(aw)
}function at(az,ax){var aw=new Array();
if(ax!=null){var ay=an(az,ax);
if(ay!=null){return ay.values
}}return aw
}function aq(aB,aC){var aw=null;
var ax=aC.location;
if(ax!=null){var aA=an(aB,ax);
if(aA!=null){var az=aA.getValues();
if(az!=null){for(var aD=0;
aD<az.length;
aD++){var ay=az[aD];
if(ay.canHandle(aC)){aw=ay;
break
}}}}}return aw
}function an(ax,aw){var az=ar(aw);
var ay=0;
return ax.findBestMatchingNode(az,ay)
}function ar(aD){var aF=new Array();
if(aD==null||aD.length==0){return aF
}var aO=new RegExp("^(([^:/?#]+):(//))?([^/?#]*)?([^?#]*)(\\?([^#]*))?(#(.*))?");
var ax=aO.exec(aD);
if(ax==null){return aF
}var aG=ax[2]||"http";
var aC=ax[4];
var aK=ax[5];
var az=null;
var aA=null;
var aE=null;
var ay=null;
if(aC!=null){var aI=aC;
var aB=aI.indexOf("@");
if(aB>=0){aA=aI.substring(0,aB);
aI=aI.substring(aB+1);
var aN=aA.indexOf(":");
if(aN>=0){aE=aA.substring(0,aN);
ay=aA.substring(aN+1)
}}var aw=aI.indexOf(":");
if(aw>=0){az=aI.substring(aw+1);
aI=aI.substring(0,aw)
}}else{throw new ArgumentError("Hostname is required.")
}var aL=aI.split(/\./);
aL.reverse();
for(var aM=0;
aM<aL.length;
aM++){aF.push(new x(aL[aM],Q.HOST))
}if(az!=null){aF.push(new x(az,Q.PORT))
}else{if(al(aG)>0){aF.push(new x(al(aG).toString(),Q.PORT))
}}if(aA!=null){if(aE!=null){aF.push(new x(aE,Q.USERINFO))
}if(ay!=null){aF.push(new x(ay,Q.USERINFO))
}if(aE==null&&ay==null){aF.push(new x(aA,Q.USERINFO))
}}if(av(aK)){if(aK.charAt(0)=="/"){aK=aK.substring(1)
}if(av(aK)){var aP=aK.split("/");
for(var aJ=0;
aJ<aP.length;
aJ++){var aH=aP[aJ];
aF.push(new x(aH,Q.PATH))
}}}return aF
}function al(aw){if(ao[aw.toLowerCase()]!=null){return ao[aw]
}else{return -1
}}function ao(){http=80;
ws=80;
wss=443;
https=443
}function av(aw){return aw!=null&&aw.length>0
}var ap=au.prototype;
ap.clear=function(){this.rootNode=new O()
};
ap.canHandle=function(aw){return aq(aw)!=null
};
ap.handle=function(ax,ay){var aw=aq(this.rootNode,ax);
if(aw==null){return null
}return aw.handle(ax,ay)
};
ap.register=function(ax,aw){if(ax==null||ax.length==0){throw new Error("Must specify a location to handle challenges upon.")
}if(aw==null){throw new Error("Must specify a handler to handle challenges.")
}ak(this.rootNode,ax,aw);
return this
};
ap.unregister=function(ax,aw){if(ax==null||ax.length==0){throw new Error("Must specify a location to un-register challenge handlers upon.")
}if(aw==null){throw new Error("Must specify a handler to un-register.")
}am(this.rootNode,ax,aw);
return this
};
return au
})();
window.NegotiableChallengeHandler=(function(){var al=function(){this.candidateChallengeHandlers=new Array()
};
var am=function(an){var ao=new Array();
for(var ap=0;
ap<an.length;
ap++){ao.push(Oid.create(an[ap]).asArray())
}var aq=GssUtils.sizeOfSpnegoInitialContextTokenWithOids(null,ao);
var ar=ByteBuffer.allocate(aq);
ar.skip(aq);
GssUtils.encodeSpnegoInitialContextTokenWithOids(null,ao,ar);
return ByteArrayUtils.arrayToByteArray(Base64Util.encodeBuffer(ar))
};
var ak=al.prototype;
ak.register=function(ao){if(ao==null){throw new Error("handler is null")
}for(var an=0;
an<this.candidateChallengeHandlers.length;
an++){if(ao===this.candidateChallengeHandlers[an]){return this
}}this.candidateChallengeHandlers.push(ao);
return this
};
ak.canHandle=function(an){return an!=null&&an.authenticationScheme=="Negotiate"&&an.authenticationParameters==null
};
ak.handle=function(ar,au){if(ar==null){throw Error(new ArgumentError("challengeRequest is null"))
}var aw=new ac();
for(var aq=0;
aq<candidateChallengeHandlers.length;
aq++){var av=candidateChallengeHandlers[aq];
if(av.canHandle(ar)){try{var ao=av.getSupportedOids();
for(var ap=0;
ap<ao.length;
ap++){var an=new Oid(ao[ap]).asString();
if(!aw.containsKey(an)){aw.put(an,av)
}}}catch(at){}}}if(aw.isEmpty()){au(null);
return
}};
return al
})();
window.NegotiableChallengeHandler=(function(){var ak=function(){this.loginHandler=undefined
};
ak.prototype.getSupportedOids=function(){return new Array()
};
return ak
})();
window.NegotiableChallengeHandler=(function(){var ak=function(){this.loginHandler=undefined
};
ak.prototype.getSupportedOids=function(){return new Array()
};
return ak
})();
window.ChallengeHandlers=(function(){var ak=function(){};
ak._definedDefault=new ai();
ak.setDefault=function(al){if(al==null){throw new Error("challengeHandler not defined")
}ak._definedDefault=al
};
ak.getDefault=function(){return ak._definedDefault
};
return ak
})();
var G={};
(function(){var an=m.getLogger("com.kaazing.gateway.client.html5.Windows1252");
var ap={8364:128,129:129,8218:130,402:131,8222:132,8230:133,8224:134,8225:135,710:136,8240:137,352:138,8249:139,338:140,141:141,381:142,143:143,144:144,8216:145,8217:146,8220:147,8221:148,8226:149,8211:150,8212:151,732:152,8482:153,353:154,8250:155,339:156,157:157,382:158,376:159};
var am={128:8364,129:129,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,141:141,142:381,143:143,144:144,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,157:157,158:382,159:376};
G.toCharCode=function(au){if(au<128||(au>159&&au<256)){return au
}else{var at=am[au];
if(typeof(at)=="undefined"){an.severe(this,"Windows1252.toCharCode: Error: Could not find "+au);
throw new Error("Windows1252.toCharCode could not find: "+au)
}return at
}};
G.fromCharCode=function(au){if(au<256){return au
}else{var at=ap[au];
if(typeof(at)=="undefined"){an.severe(this,"Windows1252.fromCharCode: Error: Could not find "+au);
throw new Error("Windows1252.fromCharCode could not find: "+au)
}return at
}};
var aq=String.fromCharCode(127);
var ao=String.fromCharCode(0);
var ar="\n";
var al=function(av){an.entering(this,"Windows1252.escapedToArray",av);
var at=[];
for(var au=0;
au<av.length;
au++){var ax=G.fromCharCode(av.charCodeAt(au));
if(ax==127){au++;
if(au==av.length){at.hasRemainder=true;
break
}var aw=G.fromCharCode(av.charCodeAt(au));
switch(aw){case 127:at.push(127);
break;
case 48:at.push(0);
break;
case 110:at.push(10);
break;
case 114:at.push(13);
break;
default:an.severe(this,"Windows1252.escapedToArray: Error: Escaping format error");
throw new Error("Escaping format error")
}}else{at.push(ax)
}}return at
};
var ak=function(au){an.entering(this,"Windows1252.toEscapedByteString",au);
var at=[];
while(au.remaining()){var aw=au.getUnsigned();
var av=String.fromCharCode(G.toCharCode(aw));
switch(av){case aq:at.push(aq);
at.push(aq);
break;
case ao:at.push(aq);
at.push("0");
break;
case ar:at.push(aq);
at.push("n");
break;
default:at.push(av)
}}return at.join("")
};
G.toArray=function(av,aw){an.entering(this,"Windows1252.toArray",{s:av,escaped:aw});
if(aw){return al(av)
}else{var at=[];
for(var au=0;
au<av.length;
au++){at.push(G.fromCharCode(av.charCodeAt(au)))
}return at
}};
G.toByteString=function(au,av){an.entering(this,"Windows1252.toByteString",{buf:au,escaped:av});
if(av){return ak(au)
}else{var at=[];
while(au.remaining()){var aw=au.getUnsigned();
at.push(String.fromCharCode(G.toCharCode(aw)))
}return at.join("")
}}
})();
var Z=(function(){var ak=function(al,am){this.label=al;
this.value=am
};
return ak
})();
var ag=(function(){var al=function(an){var ao=new URI(an);
if(am(ao.scheme)){this._uri=ao
}else{throw new Error("HttpURI - invalid scheme: "+an)
}};
function am(an){return"http"==an||"https"==an
}var ak=al.prototype;
ak.getURI=function(){return this._uri
};
ak.duplicate=function(an){try{return new al(an)
}catch(ao){throw ao
}return null
};
ak.isSecure=function(){return("https"==this._uri.scheme)
};
ak.toString=function(){return this._uri.toString()
};
al.replaceScheme=function(an,ao){var ap=URI.replaceProtocol(an,ao);
return new al(ap)
};
return al
})();
var af=(function(){var al=function(aq){var ar=new URI(aq);
if(ap(ar.scheme)){this._uri=ar;
if(ar.port==undefined){this._uri=new URI(al.addDefaultPort(aq))
}}else{throw new Error("WSURI - invalid scheme: "+aq)
}};
function ap(aq){return"ws"==aq||"wss"==aq
}function ao(aq){try{return new al(aq)
}catch(ar){throw ar
}return null
}var ak=al.prototype;
ak.getAuthority=function(){return this._uri.authority
};
ak.isSecure=function(){return"wss"==this._uri.scheme
};
ak.getHttpEquivalentScheme=function(){return this.isSecure()?"https":"http"
};
ak.toString=function(){return this._uri.toString()
};
var am=80;
var an=443;
al.setDefaultPort=function(aq){if(aq.port==0){if(aq.scheme=="ws"){aq.port=am
}else{if(aq.scheme=="wss"){aq.port=an
}else{if(aq.scheme=="http"){aq.port=80
}else{if(aq.schemel=="https"){aq.port=443
}else{throw new Error("Unknown protocol: "+aq.scheme)
}}}}aq.authority=aq.host+":"+aq.port
}};
al.addDefaultPort=function(aq){var ar=new URI(aq);
if(ar.port==undefined){al.setDefaultPort(ar)
}return ar.toString()
};
al.replaceScheme=function(aq,ar){var at=URI.replaceProtocol(aq,ar);
return new al(at)
};
return al
})();
var z=(function(){var al={};
al.ws="ws";
al.wss="wss";
al["javascript:wse"]="ws";
al["javascript:wse+ssl"]="wss";
al["javascript:ws"]="ws";
al["javascript:wss"]="wss";
al["flash:wsr"]="ws";
al["flash:wsr+ssl"]="wss";
al["flash:wse"]="ws";
al["flash:wse+ssl"]="wss";
var am=function(ar){var aq=an(ar);
if(ap(aq)){this._uri=new URI(URI.replaceProtocol(ar,al[aq]));
this._compositeScheme=aq;
this._location=ar
}else{throw new Error("WSCompositeURI - invalid composite scheme: "+an(ar))
}};
function an(aq){var ar=aq.indexOf("://");
if(ar>0){return aq.substr(0,ar)
}else{return""
}}function ap(aq){return al[aq]!=null
}function ao(aq){try{return new am(aq)
}catch(ar){throw ar
}return null
}var ak=am.prototype;
ak.isSecure=function(){var aq=this._uri.scheme;
return"wss"==al[aq]
};
ak.getWSEquivalent=function(){try{var aq=al[this._compositeScheme];
return af.replaceScheme(this._location,aq)
}catch(ar){throw ar
}return null
};
ak.getPlatformPrefix=function(){if(this._compositeScheme.indexOf("javascript:")===0){return"javascript"
}else{if(this._compositeScheme.indexOf("flash:")===0){return"flash"
}else{return""
}}};
ak.toString=function(){return this._location
};
return am
})();
var W=(function(){var ak=function(){this._parent=null;
this._challengeResponse=new ChallengeResponse(null,null)
};
ak.prototype.toString=function(){return"[Channel]"
};
return ak
})();
var w=(function(){var al=function(am,ao,an){this._location=am;
this._protocol=ao;
this._isBinary=an;
this._controlFrames={};
this._handshakePayload;
this._isEscape=false;
this._bufferedAmount=0
};
var ak=al.prototype=new W();
ak.getBufferedAmount=function(){return this._bufferedAmount
};
ak.toString=function(){return"[WebSocketChannel "+_location+" "+_protocol!=null?_protocol:"- binary:"+isBinary+"]"
};
return al
})();
var B=(function(){var al=function(){this._nextHandler;
this._listener
};
var ak=al.prototype;
ak.processConnect=function(an,am,ao){this._nextHandler.processConnect(an,am,ao)
};
ak.processAuthorize=function(an,am){this._nextHandler.processAuthorize(an,am)
};
ak.processTextMessage=function(am,an){this._nextHandler.processTextMessage(am,an)
};
ak.processBinaryMessage=function(an,am){this._nextHandler.processBinaryMessage(an,am)
};
ak.processClose=function(am){this._nextHandler.processClose(am)
};
ak.setListener=function(am){this._listener=am
};
ak.setNextHandler=function(am){this._nextHandler=am
};
return al
})();
var M=(function(){var ak=function(){var al="";
var am=""
};
ak.KAAZING_EXTENDED_HANDSHAKE="x-kaazing-handshake";
ak.KAAZING_SEC_EXTENSION_REVALIDATE="x-kaazing-http-revalidate";
ak.HEADER_SEC_EXTENSIONS="X-WebSocket-Extensions";
return ak
})();
var ae=(function(){var al=function(am,ao,an){this._location=am;
this._protocol=ao;
this._isBinary=an;
this.requestHeaders=[];
this.responseHeaders={};
this.readyState=0;
this.authenticationReceived=false
};
var ak=al.prototype=new w();
return al
})();
var H=(function(){var al=function(){};
var ak=al.prototype;
ak.createChannel=function(am,ap,ao){var an=new ae(am,ap,ao);
if(ap){an.requestHeaders.push(new Z("X-WebSocket-Protocol",ap))
}an.requestHeaders.push(new Z(M.HEADER_SEC_EXTENSIONS,M.KAAZING_SEC_EXTENSION_REVALIDATE));
return an
};
return al
})();
var C=(function(){var al=function(){};
var ak=al.prototype;
ak.createChannel=function(am,ap,ao){var an=new ae(am,ap,ao);
return an
};
return al
})();
var N=(function(){var al=function(am,ao,an){this._location=am.getWSEquivalent();
this._protocol=ao;
this._isBinary=an;
this._webSocket;
this._compositeScheme=am._compositeScheme;
this._connectionStrategies=[];
this._selectedChannel;
this.readyState=0;
this._closing=false;
this._compositeScheme=am._compositeScheme
};
var ak=al.prototype=new w();
ak.getReadyState=function(){return this.readyState
};
ak.getWebSocket=function(){return this._webSocket
};
ak.getCompositeScheme=function(){return this._compositeScheme
};
ak.getNextStrategy=function(){if(this._connectionStrategies.length<=0){return null
}else{return this._connectionStrategies.shift()
}};
return al
})();
var ad=(function(){var ao="WebSocketControlFrameHandler";
var am=m.getLogger(ao);
var an=function(){am.finest(ao,"<init>")
};
var al=function(at,aq){var ap=0;
for(var ar=aq;
ar<aq+4;
ar++){ap=(ap<<8)+at.get()
}return ap
};
var ak=an.prototype=new B();
ak.handleConnectionOpened=function(av,ax){am.finest(ao,"handleConnectionOpened");
var aw=av.responseHeaders;
if(aw["X-WebSocket-Protocol"]!=null){av.protocol=aw["X-WebSocket-Protocol"]
}if(aw[M.HEADER_SEC_EXTENSIONS]!=null){var at=aw[M.HEADER_SEC_EXTENSIONS];
if(at!=null&&at.length>0){var ar=at.split(",");
for(var ap=0;
ap<ar.length;
ap++){var aq=ar[ap].split(";");
if(aq.length>1){var au=aq[1].replace(/^\s+|\s+$/g,"");
av._controlFrames[parseInt(au,16)]=aq[0].replace(/^\s+|\s+$/g,"")
}}}}this._listener.connectionOpened(av,ax)
};
ak.handleMessageReceived=function(au,at){am.finest(ao,"handleMessageReceived",at);
if(au._isEscape){au._isEscape=false;
this._listener.messageReceived(au,at);
return
}if(at==null||at.limit<4){this._listener.messageReceived(au,at);
return
}var ap=at.position;
var av=al(at,0);
if(au._controlFrames[av]!=null){if(at.limit==4){au._isEscape=true;
return
}else{if(M.KAAZING_SEC_EXTENSION_REVALIDATE==au._controlFrames[av]){var ar=at.getString(Charset.UTF8).substr(1);
if(au._redirectUri!=null){if(typeof(au._redirectUri)=="string"){var aq=new URI(au._redirectUri);
ar=aq.scheme+"://"+aq.authority+ar
}else{ar=au._redirectUri.getHttpEquivalentScheme()+"://"+au._redirectUri.getAuthority()+ar
}}else{ar=au._location.getHttpEquivalentScheme()+"://"+au._location.getAuthority()+ar
}this._listener.authenticationRequested(au,ar,M.KAAZING_SEC_EXTENSION_REVALIDATE)
}}}else{at.position=ap;
this._listener.messageReceived(au,at)
}};
ak.setNextHandler=function(aq){this._nextHandler=aq;
var ar={};
var ap=this;
ar.connectionOpened=function(at,au){ap.handleConnectionOpened(at,au)
};
ar.messageReceived=function(au,at){ap.handleMessageReceived(au,at)
};
ar.connectionClosed=function(at){ap._listener.connectionClosed(at)
};
ar.connectionFailed=function(at){ap._listener.connectionFailed(at)
};
ar.authenticationRequested=function(av,at,au){ap._listener.authenticationRequested(av,at,au)
};
ar.redirected=function(au,at){ap._listener.redirected(au,at)
};
aq.setListener(ar)
};
ak.setListener=function(ap){this._listener=ap
};
return an
})();
var aj=(function(){var al=m.getLogger("RevalidateHandler");
var am=function(an){al.finest("ENTRY Revalidate.<init>");
this.channel=an
};
var ak=am.prototype;
ak.connect=function(an){al.finest("ENTRY Revalidate.connect with {0}",an);
var ap=this;
var ao=new XMLHttpRequest0();
ao.open("GET",an+"&.kr="+Math.random(),true);
if(ap.channel._challengeResponse!=null&&ap.channel._challengeResponse.credentials!=null){ao.setRequestHeader("Authorization",ap.channel._challengeResponse.credentials);
this.clearAuthenticationData(ap.channel)
}ao.onreadystatechange=function(){switch(ao.readyState){case 2:if(ao.status==403){ao.abort()
}break;
case 4:if(ao.status==401){ap.handle401(ap.channel,an,ao.getResponseHeader("WWW-Authenticate"));
return
}break
}};
ao.send(null)
};
ak.clearAuthenticationData=function(an){if(an._challengeResponse!=null){an._challengeResponse.clearCredentials()
}};
ak.handle401=function(ar,an,aq){var at=this;
var au=an;
if(au.indexOf("/;a/")>0){au=au.substring(0,au.indexOf("/;a/"))
}else{if(au.indexOf("/;ae/")>0){au=au.substring(0,au.indexOf("/;ae/"))
}else{if(au.indexOf("/;ar/")>0){au=au.substring(0,au.indexOf("/;ar/"))
}}}var ap=new ChallengeRequest(au,aq);
var ao;
if(this.channel._challengeResponse.nextChallengeHandler!=null){ao=this.channel._challengeResponse.nextChallengeHandler
}else{ao=ChallengeHandlers.getDefault()
}if(ao!=null&&ao.canHandle(ap)){ao.handle(ap,function(av){try{if(av!=null&&av.credentials!=null){at.channel._challengeResponse=av;
at.connect(an)
}}catch(aw){}})
}};
return am
})();
var T=(function(){var an="WebSocketNativeDelegateHandler";
var am=m.getLogger(an);
var al=function(){am.finest(an,"<init>")
};
var ak=al.prototype=new B();
ak.processConnect=function(ar,aq,at){am.finest(an,"connect",ar);
if(ar.readyState==2){throw new Error("WebSocket is already closed")
}if(ar._delegate==null){var ap=new a();
ap.parent=ar;
ar._delegate=ap;
ao(ap,this)
}ar._delegate.connect(aq.toString(),at)
};
ak.processTextMessage=function(ap,aq){am.finest(an,"connect",ap);
if(ap._delegate.readyState()==1){ap._delegate.send(aq)
}else{throw new Error("WebSocket is already closed")
}};
ak.processBinaryMessage=function(aq,ap){am.finest(an,"connect",aq);
if(aq._delegate.readyState()==1){aq._delegate.send(ap)
}else{throw new Error("WebSocket is already closed")
}};
ak.processClose=function(ap){am.finest(an,"close",ap);
try{ap._delegate.close()
}catch(aq){}};
var ao=function(ap,ar){var aq={};
aq.connectionOpened=function(at,au){ar._listener.connectionOpened(at,au)
};
aq.messageReceived=function(au,at){ar._listener.messageReceived(au,at)
};
aq.connectionClosed=function(at){ar._listener.connectionClosed(at)
};
aq.connectionFailed=function(at){ar._listener.connectionFailed(at)
};
aq.authenticationRequested=function(av,at,au){ar._listener.authenticationRequested(av,at,au)
};
aq.redirected=function(au,at){ar._listener.redirected(au,at)
};
ap.setListener(aq)
};
return al
})();
var E=(function(){var ao="WebSocketNativeBalancingHandler";
var am=m.getLogger(ao);
var an=function(){am.finest(ao,"<init>")
};
var al=function(aq,ap,ar){ap._redirecting=true;
ap._redirectUri=ar;
aq._nextHandler.processClose(ap)
};
var ak=an.prototype=new B();
ak.processConnect=function(aq,ap,ar){aq._balanced=false;
this._nextHandler.processConnect(aq,ap,ar)
};
ak.handleConnectionClosed=function(ap){if(ap._redirecting==true){ap._redirecting=false;
ap._redirected=true;
ap.handshakePayload.clear();
var aq=ap._protocol;
if(aq==null||aq.length==0){aq=M.KAAZING_EXTENDED_HANDSHAKE
}else{if(aq.indexOf(M.KAAZING_EXTENDED_HANDSHAKE)<0){aq+=","+M.KAAZING_EXTENDED_HANDSHAKE
}}this.processConnect(ap,ap._redirectUri,aq)
}else{this._listener.connectionClosed(ap)
}};
ak.handleMessageReceived=function(ar,aq){am.finest(ao,"handleMessageReceived",aq);
if(ar._balanced||aq.remaining()<4){this._listener.messageReceived(ar,aq);
return
}var ap=aq.position;
var at=aq.getBytes(3);
if(at[0]==-17&&at[1]==-125){var au=aq.getString(Charset.UTF8);
if(au.match("N$")){ar._balanced=true;
this._listener.connectionOpened(ar,"")
}else{if(au.indexOf("R")==0){var av=new af(au.substring(1));
al(this,ar,av)
}else{am.warning(ao,"Invalidate balancing message: "+au)
}}return
}else{aq.position=ap;
this._listener.messageReceived(ar,aq)
}};
ak.setNextHandler=function(aq){this._nextHandler=aq;
var ar={};
var ap=this;
ar.connectionOpened=function(at,au){ap._listener.connectionOpened(at,au)
};
ar.messageReceived=function(au,at){ap.handleMessageReceived(au,at)
};
ar.connectionClosed=function(at){ap.handleConnectionClosed(at)
};
ar.connectionFailed=function(at){ap._listener.connectionFailed(at)
};
ar.authenticationRequested=function(av,at,au){ap._listener.authenticationRequested(av,at,au)
};
ar.redirected=function(au,at){ap._listener.redirected(au,at)
};
aq.setListener(ar)
};
ak.setListener=function(ap){this._listener=ap
};
return an
})();
var L=(function(){var ak="WebSocketNativeHandshakeHandler";
var at=m.getLogger(ak);
var an="Sec-WebSocket-Protocol";
var ao="Sec-WebSocket-Extensions";
var ap="Authorization";
var ar="WWW-Authenticate";
var ay="Set-Cookie";
var au="GET";
var az="HTTP/1.1";
var aC=":";
var aD=" ";
var aw="\r\n";
var ax=function(){at.finest(ak,"<init>")
};
var aA=function(aF,aH){at.finest(ak,"sendCookieRequest with {0}",aH);
var aE=new XMLHttpRequest0();
var aG=aF._location.getHttpEquivalentScheme()+"://"+aF._location.getAuthority()+(aF._location._uri.path||"");
aG=aG.replace(/[\/]?$/,"/;api/set-cookies");
aE.open("POST",aG,true);
aE.setRequestHeader("Content-Type","text/plain; charset=utf-8");
aE.onreadystatechange=function(){};
aE.send(aH)
};
var al=function(aJ,aH,aF){var aG=[];
var aE=[];
aG.push("WebSocket-Protocol");
aE.push("");
aG.push(an);
aE.push(aH._protocol);
aG.push(ao);
aE.push(M.KAAZING_SEC_EXTENSION_REVALIDATE);
aG.push(ap);
aE.push(aF);
var aI=am(aH._location,aG,aE);
aJ._nextHandler.processTextMessage(aH,aI)
};
var am=function(aF,aJ,aK){at.entering(ak,"encodeGetRequest");
var aM=[];
aM.push(au);
aM.push(aD);
var aL=[];
if(aF._uri.path!=undefined){aL.push(aF._uri.path)
}if(aF._uri.query!=undefined){aL.push("?");
aL.push(aF._uri.query)
}aM.push(aL.join(""));
aM.push(aD);
aM.push(az);
aM.push(aw);
for(var aG=0;
aG<aJ.length;
aG++){var aH=aJ[aG];
var aI=aK[aG];
if(aH!=null&&aI!=null){aM.push(aH);
aM.push(aC);
aM.push(aD);
aM.push(aI);
aM.push(aw)
}}aM.push(aw);
var aE=aM.join("");
return aE
};
var av=function(aE){var aF=aE.getString(Charset.UTF8);
return aF.split("\n")
};
var aq=function(aK,aI,aE){aI.handshakePayload.putBuffer(aE);
if(aE.capacity>0){return
}aI.handshakePayload.flip();
var aQ=av(aI.handshakePayload);
aI.handshakePayload.clear();
var aH="";
for(var aG=aQ.length-1;
aG>=0;
aG--){if(aQ[aG].indexOf("HTTP/1.1")==0){var aO=aQ[aG].split(" ");
aH=aO[1];
break
}}if("101"==aH){var aM="";
for(var aG in aQ){var aP=aQ[aG];
if(aP!=null&&aP.indexOf(ao)==0){aM=aP.substring(ao.length+2)
}else{if(aP!=null&&aP.indexOf(an)==0){aI.protocol=aP.substring(an.length+2)
}else{if(aP!=null&&aP.indexOf(ay)==0){aA(aI,aP.substring(ay.length+2))
}}}}if(aM.length>0){var aJ=aM.split(", ");
for(var aG in aJ){var aF=aJ[aG].split("; ");
if(aF.length>1){var aN=aF[1];
aI._controlFrames[parseInt(aN,16)]=aF[0]
}}}return
}else{if("401"==aH){var aL="";
for(var aG in aQ){if(aQ[aG].indexOf(ar)==0){aL=aQ[aG].substring(ar.length+2);
break
}}aK._listener.authenticationRequested(aI,aI._location.toString(),aL)
}else{aK._listener.connectionFailed(aI)
}}};
var aB=ax.prototype=new B();
aB.processConnect=function(aF,aE,aG){aF.handshakePayload=new ByteBuffer();
if(aG==null||aG.length==0){aG=M.KAAZING_EXTENDED_HANDSHAKE
}else{if(aG.indexOf(M.KAAZING_EXTENDED_HANDSHAKE)<0){aG+=","+M.KAAZING_EXTENDED_HANDSHAKE
}}this._nextHandler.processConnect(aF,aE,aG)
};
aB.processAuthorize=function(aF,aE){al(this,aF,aE)
};
aB.handleConnectionOpened=function(aE,aF){at.finest(ak,"handleConnectionOpened");
if(M.KAAZING_EXTENDED_HANDSHAKE==aF){al(this,aE,null)
}else{aE._balanced=true;
this._listener.connectionOpened(aE,aE.protocol)
}};
aB.handleMessageReceived=function(aF,aE){at.finest(ak,"handleMessageReceived",aE);
if(aF.readyState==1){aF._isEscape=false;
this._listener.messageReceived(aF,aE)
}else{aq(this,aF,aE)
}};
aB.setNextHandler=function(aE){this._nextHandler=aE;
var aG=this;
var aF={};
aF.connectionOpened=function(aH,aI){aG.handleConnectionOpened(aH,aI)
};
aF.messageReceived=function(aI,aH){aG.handleMessageReceived(aI,aH)
};
aF.connectionClosed=function(aH){aG._listener.connectionClosed(aH)
};
aF.connectionFailed=function(aH){aG._listener.connectionFailed(aH)
};
aF.authenticationRequested=function(aJ,aH,aI){aG._listener.authenticationRequested(aJ,aH,aI)
};
aF.redirected=function(aI,aH){aG._listener.redirected(aI,aH)
};
aE.setListener(aF)
};
aB.setListener=function(aE){this._listener=aE
};
return ax
})();
var v=(function(){var am="WebSocketNativeAuthenticationHandler";
var al=m.getLogger(am);
var an=function(){al.finest(am,"<init>")
};
var ak=an.prototype=new B();
ak.handleClearAuthenticationData=function(ao){if(ao._challengeResponse!=null){ao._challengeResponse.clearCredentials()
}};
ak.handleRemoveAuthenticationData=function(ao){this.handleClearAuthenticationData(ao);
ao._challengeResponse=new ChallengeResponse(null,null)
};
ak.handle401=function(av,ao,au){var aw=this;
var at=av._location;
if(av.redirectUri!=null){at=av._redirectUri
}if(M.KAAZING_SEC_EXTENSION_REVALIDATE==au){var ar=new aj(new ae(at,av._protocol,av._isBinary));
ar.connect(ao)
}else{var aq=new ChallengeRequest(at.toString(),au);
var ap;
if(av._challengeResponse.nextChallengeHandler!=null){ap=av._challengeResponse.nextChallengeHandler
}else{ap=ChallengeHandlers.getDefault()
}if(ap!=null&&ap.canHandle(aq)){ap.handle(aq,function(ax){try{if(ax==null||ax.credentials==null){aw.handleClearAuthenticationData(av);
aw._listener.connectionFailed(av)
}else{av._challengeResponse=ax;
aw._nextHandler.processAuthorize(av,ax.credentials)
}}catch(ay){aw.handleClearAuthenticationData(av);
aw._listener.connectionFailed(av)
}})
}else{this.handleClearAuthenticationData(av);
this._listener.connectionFailed(av)
}}};
ak.handleAuthenticate=function(aq,ao,ap){aq.authenticationReceived=true;
this.handle401(aq,ao,ap)
};
ak.setNextHandler=function(ap){this._nextHandler=ap;
var aq={};
var ao=this;
aq.connectionOpened=function(ar,at){ao._listener.connectionOpened(ar,at)
};
aq.messageReceived=function(at,ar){ao._listener.messageReceived(at,ar)
};
aq.connectionClosed=function(ar){ao._listener.connectionClosed(ar)
};
aq.connectionFailed=function(ar){ao._listener.connectionFailed(ar)
};
aq.authenticationRequested=function(au,ar,at){ao.handleAuthenticate(au,ar,at)
};
aq.redirected=function(at,ar){ao._listener.redirected(at,ar)
};
ap.setListener(aq)
};
ak.setListener=function(ao){this._listener=ao
};
return an
})();
var F=(function(){var ak="WebSocketNativeHandler";
var ay=m.getLogger(ak);
var al=function(){var aA=new v();
return aA
};
var ao=function(){var aA=new L();
return aA
};
var am=function(){var aA=new ad();
return aA
};
var az=function(){var aA=new E();
return aA
};
var aq=function(){var aA=new T();
return aA
};
var aw=al();
var ax=ao();
var at=am();
var an=az();
var av=aq();
var ap=function(){ay.finest(ak,"<init>");
this.setNextHandler(aw);
aw.setNextHandler(ax);
ax.setNextHandler(at);
at.setNextHandler(an);
an.setNextHandler(av)
};
var ar=function(aA,aB){ay.finest(ak,"<init>")
};
var au=ap.prototype=new B();
au.setNextHandler=function(aA){this._nextHandler=aA;
var aC=this;
var aB={};
aB.connectionOpened=function(aD,aE){aC._listener.connectionOpened(aD,aE)
};
aB.messageReceived=function(aE,aD){aC._listener.messageReceived(aE,aD)
};
aB.connectionClosed=function(aD){aC._listener.connectionClosed(aD)
};
aB.connectionFailed=function(aD){aC._listener.connectionFailed(aD)
};
aB.authenticationRequested=function(aF,aD,aE){aC._listener.authenticationRequested(aF,aD,aE)
};
aB.redirected=function(aE,aD){aC._listener.redirected(aE,aD)
};
aA.setListener(aB)
};
au.setListener=function(aA){this._listener=aA
};
return ap
})();
var Y=(function(){var an=m.getLogger("com.kaazing.gateway.client.html5.WebSocketEmulatedProxyDownstream");
var az=512*1024;
var ar=1;
var aC=function(aG){an.entering(this,"WebSocketEmulatedProxyDownstream.<init>",aG);
this.retry=3000;
if(browser=="opera"||browser=="ie"){this.requiresEscaping=true
}var aJ=new URI(aG);
var aH={http:80,https:443};
if(aJ.port==undefined){aJ.port=aH[aJ.scheme];
aJ.authority=aJ.host+":"+aJ.port
}this.origin=aJ.scheme+"://"+aJ.authority;
this.location=aG;
this.activeXhr=null;
this.reconnectTimer=null;
this.buf=new ByteBuffer();
var aI=this;
setTimeout(function(){al(aI,true);
aI.activeXhr=aI.mostRecentXhr;
aF(aI,aI.mostRecentXhr)
},0);
an.exiting(this,"WebSocketEmulatedProxyDownstream.<init>")
};
var ax=aC.prototype;
var aq=0;
var ao=255;
var aB=1;
var aE=128;
var au=127;
var av=3000;
ax.readyState=0;
function al(aJ,aG){an.entering(this,"WebSocketEmulatedProxyDownstream.connect");
if(aJ.reconnectTimer!==null){aJ.reconnectTimer=null
}var aI=new URI(aJ.location);
var aH=[];
switch(browser){case"ie":aH.push(".kns=1");
break;
case"safari":aH.push(".kp=256");
break;
case"firefox":aH.push(".kp=1025");
break;
case"android":aH.push(".kp=4096");
aH.push(".kbp=4096");
break
}if(browser=="android"||browser.ios){aH.push(".kkt=20")
}aH.push(".kc=text/plain;charset=windows-1252");
aH.push(".kb=4096");
aH.push(".kid="+String(Math.random()).substring(2));
if(aH.length>0){if(aI.query===undefined){aI.query=aH.join("&")
}else{aI.query+="&"+aH.join("&")
}}var aK=new XMLHttpRequest0();
aK.id=ar++;
aK.position=0;
aK.opened=false;
aK.reconnect=false;
aK.requestClosing=false;
aK.onprogress=function(){if(aK==aJ.activeXhr&&aJ.readyState!=2){setTimeout(function(){ak(aJ)
},0)
}};
aK.onload=function(){if(aK==aJ.activeXhr&&aJ.readyState!=2){ak(aJ);
aK.onerror=function(){};
aK.ontimeout=function(){};
aK.onreadystatechange=function(){};
if(!aK.reconnect){at(aJ)
}else{if(aK.requestClosing){ap(aJ)
}else{if(aJ.activeXhr==aJ.mostRecentXhr){al(aJ);
aJ.activeXhr=aJ.mostRecentXhr;
aF(aJ,aJ.activeXhr)
}else{var aL=aJ.mostRecentXhr;
aJ.activeXhr=aL;
switch(aL.readyState){case 1:case 2:aF(aJ,aL);
break;
case 3:ak(aJ);
break;
case 4:aJ.activeXhr.onload();
break;
default:}}}}}};
aK.ontimeout=function(){an.entering(this,"WebSocketEmulatedProxyDownstream.connect.xhr.ontimeout");
at(aJ)
};
aK.onerror=function(){an.entering(this,"WebSocketEmulatedProxyDownstream.connect.xhr.onerror");
at(aJ)
};
aK.open("GET",aI.toString(),true);
aK.send("");
aJ.mostRecentXhr=aK
}function aF(aG,aH){if(aG.location.indexOf("&.ki=p")==-1){setTimeout(function(){if(aH&&aH.readyState<3&&aG.readyState<2){aG.location+="&.ki=p";
al(aG,false)
}},av)
}}ax.disconnect=function(){an.entering(this,"WebSocketEmulatedProxyDownstream.disconnect");
if(this.readyState!==2){ay(this)
}};
function ay(aG){an.entering(this,"WebSocketEmulatedProxyDownstream._disconnect");
if(aG.reconnectTimer!==null){clearTimeout(aG.reconnectTimer);
aG.reconnectTimer=null
}if(aG.mostRecentXhr!==null){aG.mostRecentXhr.onprogress=function(){};
aG.mostRecentXhr.onload=function(){};
aG.mostRecentXhr.onerror=function(){};
aG.mostRecentXhr.abort()
}if(aG.activeXhr!=aG.mostRecentXhr&&aG.activeXhr!==null){aG.activeXhr.onprogress=function(){};
aG.activeXhr.onload=function(){};
aG.activeXhr.onerror=function(){};
aG.activeXhr.abort()
}aG.lineQueue=[];
aG.lastEventId=null;
aG.location=null;
aG.readyState=2
}function ak(aP){var aU=aP.activeXhr;
var aO=aU.responseText;
if(aO.length>=az){if(aP.activeXhr==aP.mostRecentXhr){al(aP,false)
}}var aK=aO.slice(aU.position);
aU.position=aO.length;
var aI=aP.buf;
var aV=G.toArray(aK,aP.requiresEscaping);
if(aV.hasRemainder){aU.position--
}aI.position=aI.limit;
aI.putBytes(aV);
aI.position=0;
aI.mark();
parse:while(true){if(!aI.hasRemaining()){break
}var aQ=aI.getUnsigned();
switch(aQ&128){case aq:var aT=aI.indexOf(ao);
if(aT==-1){break parse
}var aJ=aI.array.slice(aI.position,aT);
var aL=new ByteBuffer(aJ);
var aG=aT-aI.position;
aI.skip(aG+1);
aI.mark();
if(aQ==aB){am(aP,aL)
}else{aw(aP,aL)
}break;
case aE:var aH=0;
var aM=false;
while(aI.hasRemaining()){var aR=aI.getUnsigned();
aH=aH<<7;
aH|=(aR&127);
if((aR&128)!=128){aM=true;
break
}}if(!aM){break parse
}if(aI.remaining()<aH){break parse
}var aN=aI.array.slice(aI.position,aI.position+aH);
var aS=new ByteBuffer(aN);
aI.skip(aH);
aI.mark();
aA(aP,aS);
break;
default:throw new Error("Emulation protocol error. Unknown frame type: "+aQ)
}}aI.reset();
aI.compact()
}function am(aH,aG){while(aG.remaining()){var aI=String.fromCharCode(aG.getUnsigned());
switch(aI){case"0":break;
case"1":aH.activeXhr.reconnect=true;
break;
case"2":aH.activeXhr.requestClosing=true;
break;
default:throw new Error("Protocol decode error. Unknown command: "+aI)
}}}function aA(aI,aG){var aH=document.createEvent("Events");
aH.initEvent("message",true,true);
aH.lastEventId=aI.lastEventId;
aH.data=aG;
aH.decoder=o;
aH.origin=aI.origin;
if(aH.source!==null){aH.source=null
}if(typeof(aI.onmessage)==="function"){aI.onmessage(aH)
}}function aw(aI,aG){var aH=document.createEvent("Events");
aH.initEvent("message",true,true);
aH.lastEventId=aI.lastEventId;
aH.text=aG;
aH.origin=aI.origin;
if(aH.source!==null){aH.source=null
}if(typeof(aI.onmessage)==="function"){aI.onmessage(aH)
}}function ap(aG){at(aG)
}function at(aG){if(aG.readyState!=2){aG.disconnect();
aD(aG)
}}function aD(aH){var aG=document.createEvent("Events");
aG.initEvent("error",true,true);
if(typeof(aH.onerror)==="function"){aH.onerror(aG)
}}return aC
})();
var S=(function(){var ao=m.getLogger("WebSocketEmulatedProxy");
var aA=function(){this.parent;
this._listener
};
var ay=aA.prototype;
ay.connect=function(aE,aF){ao.entering(this,"WebSocketEmulatedProxy.connect",{location:aE,subprotocol:aF});
this.URL=aE.replace("ws","http");
this.protocol=aF;
if(browser=="opera"||browser=="ie"){ao.config(this,"WebSocketEmulatedProxy.<init>: browser is "+browser);
this.requiresEscaping=true
}this._sendQueue=[];
ak(this);
ao.exiting(this,"WebSocketEmulatedProxy.<init>")
};
ay.readyState=0;
ay.bufferedAmount=0;
ay.URL="";
ay.onopen=function(){};
ay.onerror=function(){};
ay.onmessage=function(aE){};
ay.onclose=function(){};
var aD=128;
var av=0;
var ap=255;
var aC=1;
var am=[aC,48,49,ap];
var az=[aC,48,50,ap];
ay.send=function(aF){ao.entering(this,"WebSocketEmulatedProxy.send",{data:aF});
switch(this.readyState){case 0:ao.severe(this,"WebSocketEmulatedProxy.send: Error: readyState is 0");
throw new Error("INVALID_STATE_ERR");
case 1:if(aF===null){ao.severe(this,"WebSocketEmulatedProxy.send: Error: data is null");
throw new Error("data is null")
}var aE=new ByteBuffer();
if(typeof aF=="string"){ao.finest(this,"WebSocketEmulatedProxy.send: Data is string");
aE.put(av);
aE.putString(aF,Charset.UTF8);
aE.put(ap)
}else{if(aF.constructor==ByteBuffer){ao.finest(this,"WebSocketEmulatedProxy.send: Data is ByteBuffer");
aE.put(aD);
aB(aE,aF.remaining());
aE.putBuffer(aF)
}else{ao.severe(this,"WebSocketEmulatedProxy.send: Error: Invalid type for send");
throw new Error("Invalid type for send")
}}aE.flip();
an(this,aE);
return true;
case 2:return false;
default:ao.severe(this,"WebSocketEmulatedProxy.send: Error: invalid readyState");
throw new Error("INVALID_STATE_ERR")
}ao.exiting(this,"WebSocketEmulatedProxy.send")
};
ay.close=function(){ao.entering(this,"WebSocketEmulatedProxy.close");
switch(this.readyState){case 0:au(this);
break;
case 1:an(this,new ByteBuffer(az));
au(this);
break
}};
ay.setListener=function(aE){this._listener=aE
};
function an(aF,aE){ao.entering(this,"WebSocketEmulatedProxy.doSend",aE);
aF.bufferedAmount+=aE.remaining();
aF._sendQueue.push(aE);
if(!aF._writeSuspended){aw(aF)
}}function aw(aH){ao.entering(this,"WebSocketEmulatedProxy.doFlush");
var aF=aH._sendQueue;
var aG=aF.length;
aH._writeSuspended=(aG>0);
if(aG>0){var aI=new XMLHttpRequest0();
aI.open("POST",aH._upstream,true);
aI.onreadystatechange=function(){if(aI.readyState==4){ao.finest(this,"WebSocketEmulatedProxy.doFlush: xhr.status="+aI.status);
switch(aI.status){case 200:setTimeout(function(){aw(aH)
},0);
break;
default:au(aH);
break
}}};
var aE=new ByteBuffer();
while(aF.length){aE.putBuffer(aF.shift())
}aE.putBytes(am);
aE.flip();
if(browser=="firefox"){if(aI.sendAsBinary){ao.finest(this,"WebSocketEmulatedProxy.doFlush: xhr.sendAsBinary");
aI.setRequestHeader("Content-Type","application/octet-stream");
aI.sendAsBinary(s(aE))
}else{aI.send(s(aE))
}}else{aI.setRequestHeader("Content-Type","text/plain; charset=utf-8");
aI.send(s(aE,aH.requiresEscaping))
}}aH.bufferedAmount=0
}var aq=function(aE){if(aE.challengeResponse==null){return
}aE.challengeResponse.clearCredentials()
};
var ak=function(aL){ao.entering(this,"WebSocketEmulatedProxy.connect");
var aG=new URI(aL.URL);
aG.scheme=aG.scheme.replace("ws","http");
var aH=aL.requiresEscaping?"/;e/cte":"/;e/ct";
aG.path=aG.path.replace(/[\/]?$/,aH);
var aE=aG.toString();
var aM=aE.indexOf("?");
if(aM==-1){aE+="?"
}else{aE+="&"
}aE+=".kn="+String(Math.random()).substring(2);
ao.finest(this,"WebSocketEmulatedProxy.connect: Connecting to "+aE);
var aK=new XMLHttpRequest0();
var aI=false;
aK.open("GET",aE,true);
aK.setRequestHeader("X-WebSocket-Version","wseb-1.0");
for(var aJ=0;
aJ<aL.parent.requestHeaders.length;
aJ++){var aF=aL.parent.requestHeaders[aJ];
aK.setRequestHeader(aF.label,aF.value)
}if(aL.challengeResponse!=null&&aL.challengeResponse.credentials!=null){aK.setRequestHeader("Authorization",aL.challengeResponse.credentials);
aq(aL)
}aK.onreadystatechange=function(){switch(aK.readyState){case 2:if(aK.status==403){ax(aL)
}else{timer=setTimeout(function(){if(!aI){ax(aL)
}},5000)
}break;
case 4:aI=true;
if(aK.status==401){aL._listener.authenticationRequested(aL.parent,aK._location,aK.getResponseHeader("WWW-Authenticate"));
return
}if(aL.readyState<2){if(aK.status==201){var aN=aK.responseText.split("\n");
aL._upstream=aN[0];
var aO=aN[1];
aL._downstream=new Y(aO);
var aP=aO.substring(0,aO.indexOf("/;e/"));
if(aP!=aL.parent._location.toString().replace("ws","http")){aL.parent._redirectUri=aP
}ar(aL,aL._downstream);
aL.parent.responseHeaders=aK.getAllResponseHeaders();
at(aL)
}else{ax(aL)
}}break
}};
aK.send(null);
ao.exiting(this,"WebSocketEmulatedProxy.connect")
};
var aB=function(aE,aF){ao.entering(this,"WebSocketEmulatedProxy.encodeLength",{buf:aE,length:aF});
var aI=0;
var aG=0;
do{aG<<=8;
aG|=(aF&127);
aF>>=7;
aI++
}while(aF>0);
do{var aH=aG&255;
aG>>=8;
if(aI!=1){aH|=128
}aE.put(aH)
}while(--aI>0)
};
var at=function(aE){ao.entering(this,"WebSocketEmulatedProxy.doOpen");
aE.readyState=1;
aE._listener.connectionOpened(aE.parent,"")
};
function ax(aE){aq(aE);
if(aE.readyState<2){ao.entering(this,"WebSocketEmulatedProxy.doError");
aE.readyState=2;
if(aE.onerror!=null){aE._listener.connectionFailed(aE.parent)
}}}var au=function(aE){ao.entering(this,"WebSocketEmulatedProxy.doClose");
switch(aE.readyState){case 2:break;
case 0:case 1:aE.readyState=2;
aE._listener.connectionClosed(aE.parent);
break;
default:}};
var al=function(aH,aG){ao.finest("WebSocket.handleMessage: A WebSocket binary frame received on a WebSocket");
var aF;
if(aG.text){var aE=aG.text;
aF=ByteBuffer.allocate(aE.length);
aF.putString(aE,Charset.UTF8);
aF.position=0
}else{if(aG.data){aF=aG.data
}}aH._listener.messageReceived(aH.parent,aF)
};
var ar=function(aF,aE){ao.entering(this,"WebSocketEmulatedProxy.bindHandlers");
aE.onmessage=function(aG){switch(aG.type){case"message":if(aF.readyState==1){al(aF,aG)
}break
}};
aE.onerror=function(){try{aE.disconnect()
}finally{au(aF)
}}
};
return aA
})();
var aa=(function(){var an="WebSocketEmulatedDelegateHandler";
var al=m.getLogger(an);
var am=function(){al.finest(an,"<init>")
};
var ak=am.prototype=new B();
ak.processConnect=function(ar,aq,at){al.finest(an,"connect",ar);
if(ar.readyState==2){throw new Error("WebSocket is already closed")
}var ap=new S();
ap.parent=ar;
ar._delegate=ap;
ao(ap,this);
ap.connect(aq.toString(),at)
};
ak.processTextMessage=function(ap,aq){al.finest(an,"connect",ap);
if(ap.readyState==1){ap._delegate.send(aq)
}else{throw new Error("WebSocket is already closed")
}};
ak.processBinaryMessage=function(aq,ap){al.finest(an,"connect",aq);
if(aq.readyState==1){aq._delegate.send(ap)
}else{throw new Error("WebSocket is already closed")
}};
ak.processClose=function(ap){try{ap._delegate.close()
}catch(aq){listener.connectionClosed(ap)
}};
var ao=function(ap,ar){var aq={};
aq.connectionOpened=function(at,au){ar._listener.connectionOpened(at,au)
};
aq.messageReceived=function(au,at){ar._listener.messageReceived(au,at)
};
aq.connectionClosed=function(at){ar._listener.connectionClosed(at)
};
aq.connectionFailed=function(at){ar._listener.connectionFailed(at)
};
aq.authenticationRequested=function(av,at,au){ar._listener.authenticationRequested(av,at,au)
};
aq.redirected=function(au,at){ar._listener.redirected(au,at)
};
ap.setListener(aq)
};
return am
})();
var X=(function(){var an="WebSocketEmulatedAuthenticationHandler";
var al=m.getLogger(an);
var am=function(){al.finest(an,"<init>")
};
var ak=am.prototype=new B();
ak.handleClearAuthenticationData=function(ao){if(ao._challengeResponse!=null){ao._challengeResponse.clearCredentials()
}};
ak.handleRemoveAuthenticationData=function(ao){this.handleClearAuthenticationData(ao);
ao._challengeResponse=new ChallengeResponse(null,null)
};
ak.handle401=function(ar,ax,aw){var au=this;
if(M.KAAZING_SEC_EXTENSION_REVALIDATE==aw){var at=new aj(ar);
at.connect(ax)
}else{var av=ax;
if(av.indexOf("/;e/")>0){av=av.substring(0,av.indexOf("/;e/"))
}var ap=new af(av.replace("http","ws"));
var aq=new ChallengeRequest(av,aw);
var ao;
if(ar._challengeResponse.nextChallengeHandler!=null){ao=ar._challengeResponse.nextChallengeHandler
}else{ao=ChallengeHandlers.getDefault()
}if(ao!=null&&ao.canHandle(aq)){ao.handle(aq,function(ay){try{if(ay==null||ay.credentials==null){au.handleClearAuthenticationData(ar);
au._listener.connectionFailed(ar)
}else{ar._challengeResponse=ay;
au.processConnect(ar,ap,ar._protocol)
}}catch(az){au.handleClearAuthenticationData(ar);
au._listener.connectionFailed(ar)
}})
}else{this.handleClearAuthenticationData(ar);
this._listener.connectionFailed(ar)
}}};
ak.processConnect=function(ar,ao,at){if(ar._challengeResponse!=null&&ar._challengeResponse.credentials!=null){var ap=ar._challengeResponse.credentials.toString();
var aq=new Z("Authorization",ap);
ar.requestHeaders.push(aq);
this.handleClearAuthenticationData(ar)
}this._nextHandler.processConnect(ar,ao,at)
};
ak.handleAuthenticate=function(aq,ao,ap){aq.authenticationReceived=true;
this.handle401(aq,ao,ap)
};
ak.setNextHandler=function(ap){this._nextHandler=ap;
var aq={};
var ao=this;
aq.connectionOpened=function(ar,at){ao._listener.connectionOpened(ar,at)
};
aq.messageReceived=function(at,ar){ao._listener.messageReceived(at,ar)
};
aq.connectionClosed=function(ar){ao._listener.connectionClosed(ar)
};
aq.connectionFailed=function(ar){ao._listener.connectionFailed(ar)
};
aq.authenticationRequested=function(au,ar,at){ao.handleAuthenticate(au,ar,at)
};
aq.redirected=function(at,ar){ao._listener.redirected(at,ar)
};
ap.setListener(aq)
};
ak.setListener=function(ao){this._listener=ao
};
return am
})();
var K=(function(){var ak="WebSocketEmulatedHandler";
var av=m.getLogger(ak);
var al=function(){var aw=new X();
return aw
};
var am=function(){var aw=new ad();
return aw
};
var ao=function(){var aw=new aa();
return aw
};
var au=al();
var aq=am();
var at=ao();
var an=function(){av.finest(ak,"<init>");
this.setNextHandler(au);
au.setNextHandler(aq);
aq.setNextHandler(at)
};
var ap=function(aw,ax){av.finest(ak,"<init>")
};
var ar=an.prototype=new B();
ar.setNextHandler=function(aw){this._nextHandler=aw;
var ay=this;
var ax={};
ax.connectionOpened=function(az,aA){ay._listener.connectionOpened(az,aA)
};
ax.messageReceived=function(aA,az){ay._listener.messageReceived(aA,az)
};
ax.connectionClosed=function(az){ay._listener.connectionClosed(az)
};
ax.connectionFailed=function(az){ay._listener.connectionFailed(az)
};
ax.authenticationRequested=function(aB,az,aA){ay._listener.authenticationRequested(aB,az,aA)
};
ax.redirected=function(aA,az){ay._listener.redirected(aA,az)
};
aw.setListener(ax)
};
ar.setListener=function(aw){this._listener=aw
};
return an
})();
var I=(function(){var am="WebSocketFlashEmulatedDelegateHandler";
var al=m.getLogger(am);
var ao=function(){al.finest(am,"<init>")
};
var ak=ao.prototype=new B();
ak.processConnect=function(ar,aq,at){al.finest(am,"connect",ar);
if(ar.readyState==2){throw new Error("WebSocket is already closed")
}var ap=new f();
ap.parent=ar;
ar._delegate=ap;
an(ap,this);
ap.connect(aq.toString(),at)
};
ak.processTextMessage=function(ap,aq){al.finest(am,"connect",ap);
if(ap.readyState==1){ap._delegate.send(aq)
}else{throw new Error("WebSocket is already closed")
}};
ak.processBinaryMessage=function(aq,ap){al.finest(am,"connect",aq);
if(aq.readyState==1){aq._delegate.send(ap)
}else{throw new Error("WebSocket is already closed")
}};
ak.processClose=function(ap){al.finest(am,"close",ap);
if(ap.readyState==1){ap._delegate.close()
}else{throw new Error("WebSocket is already closed")
}};
var an=function(ap,ar){var aq={};
aq.connectionOpened=function(at,au){ar._listener.connectionOpened(at,au)
};
aq.messageReceived=function(au,at){ar._listener.messageReceived(au,at)
};
aq.connectionClosed=function(at){ar._listener.connectionClosed(at)
};
aq.connectionFailed=function(at){ar._listener.connectionFailed(at)
};
aq.authenticationRequested=function(av,at,au){ar._listener.authenticationRequested(av,at,au)
};
aq.redirected=function(au,at){au._redirectUri=at
};
ap.setListener(aq)
};
return ao
})();
var U=(function(){var ak="WebSocketFlashEmulatedHandler";
var av=m.getLogger(ak);
var al=function(){var aw=new X();
return aw
};
var am=function(){var aw=new ad();
return aw
};
var ao=function(){var aw=new I();
return aw
};
var au=al();
var aq=am();
var at=ao();
var an=function(){av.finest(ak,"<init>");
this.setNextHandler(au);
au.setNextHandler(aq);
aq.setNextHandler(at)
};
var ap=function(aw,ax){av.finest(ak,"<init>")
};
var ar=an.prototype=new B();
ar.setNextHandler=function(aw){this._nextHandler=aw;
var ay=this;
var ax={};
ax.connectionOpened=function(az,aA){ay._listener.connectionOpened(az,aA)
};
ax.messageReceived=function(aA,az){ay._listener.messageReceived(aA,az)
};
ax.connectionClosed=function(az){ay._listener.connectionClosed(az)
};
ax.connectionFailed=function(az){ay._listener.connectionFailed(az)
};
ax.authenticationRequested=function(aB,az,aA){ay._listener.authenticationRequested(aB,az,aA)
};
ax.redirected=function(aA,az){ay._listener.redirected(aA,az)
};
aw.setListener(ax)
};
ar.setListener=function(aw){this._listener=aw
};
return an
})();
var R=(function(){var an="WebSocketFlashRtmpDelegateHandler";
var al=m.getLogger(an);
var ap;
var am=function(){al.finest(an,"<init>");
ap=this
};
var ak=am.prototype=new B();
ak.processConnect=function(at,ar,au){al.finest(an,"connect",at);
if(at.readyState==2){throw new Error("WebSocket is already closed")
}var aq=new e();
aq.parent=at;
at._delegate=aq;
ao(aq,this);
aq.connect(ar.toString(),au)
};
ak.processTextMessage=function(aq,ar){al.finest(an,"connect",aq);
if(aq.readyState==1){aq._delegate.send(ar)
}else{throw new Error("WebSocket is already closed")
}};
ak.processBinaryMessage=function(ar,aq){al.finest(an,"connect",ar);
if(ar.readyState==1){ar._delegate.send(aq)
}else{throw new Error("WebSocket is already closed")
}};
ak.processClose=function(aq){al.finest(an,"close",aq);
if(aq.readyState==1){aq._delegate.close()
}else{throw new Error("WebSocket is already closed")
}};
var ao=function(aq,at){var ar={};
ar.connectionOpened=function(au,av){at._listener.connectionOpened(au,av)
};
ar.messageReceived=function(av,au){at._listener.messageReceived(av,au)
};
ar.connectionClosed=function(au){at._listener.connectionClosed(au)
};
ar.connectionFailed=function(au){at._listener.connectionFailed(au)
};
ar.authenticationRequested=function(aw,au,av){at._listener.authenticationRequested(aw,au,av)
};
ar.redirected=function(av,au){av._redirectUri=au
};
aq.setListener(ar)
};
return am
})();
var V=(function(){var ak="WebSocketFlashRtmpHandler";
var av=m.getLogger(ak);
var al=function(){var aw=new X();
return aw
};
var am=function(){var aw=new ad();
return aw
};
var an=function(){var aw=new R();
return aw
};
var au=al();
var ap=am();
var at=an();
var aq=function(){av.finest(ak,"<init>");
this.setNextHandler(au);
au.setNextHandler(ap);
ap.setNextHandler(at)
};
var ao=function(aw,ax){av.finest(ak,"<init>")
};
var ar=aq.prototype=new B();
ar.setNextHandler=function(aw){this._nextHandler=aw;
var ay=this;
var ax={};
ax.connectionOpened=function(az,aA){ay._listener.connectionOpened(az,aA)
};
ax.messageReceived=function(aA,az){ay._listener.messageReceived(aA,az)
};
ax.connectionClosed=function(az){ay._listener.connectionClosed(az)
};
ax.connectionFailed=function(az){ay._listener.connectionFailed(az)
};
ax.authenticationRequested=function(aB,az,aA){ay._listener.authenticationRequested(aB,az,aA)
};
ax.redirected=function(aA,az){ay._listener.redirected(aA,az)
};
aw.setListener(ax)
};
ar.setListener=function(aw){this._listener=aw
};
return aq
})();
var ab=(function(){var an="WebSocketSelectedHandler";
var al=m.getLogger(an);
var am=function(){al.fine(an,"<init>")
};
var ak=am.prototype=new B();
ak.processConnect=function(ap,ao,aq){al.fine(an,"connect",ap);
if(ap.readyState==2){throw new Error("WebSocket is already closed")
}this._nextHandler.processConnect(ap,ao,aq)
};
ak.handleConnectionOpened=function(ap,aq){al.fine(an,"handleConnectionOpened");
var ao=ap;
if(ao.readyState==0){ao.readyState=1;
this._listener.connectionOpened(ap,aq)
}};
ak.handleMessageReceived=function(ap,ao){al.fine(an,"handleMessageReceived",ao);
if(ap.readyState!=1){return
}this._listener.messageReceived(ap,ao)
};
ak.handleConnectionClosed=function(ap){al.fine(an,"handleConnectionClosed");
var ao=ap;
if(ao.readyState!=2){ao.readyState=2;
this._listener.connectionClosed(ap)
}};
ak.handleConnectionFailed=function(ao){al.fine(an,"connectionFailed");
if(ao.readyState!=2){ao.readyState=2;
this._listener.connectionFailed(ao)
}};
ak.setNextHandler=function(ao){this._nextHandler=ao;
var ap={};
var aq=this;
ap.connectionOpened=function(ar,at){aq.handleConnectionOpened(ar,at)
};
ap.redirected=function(at,ar){throw new Error("invalid event received")
};
ap.authenticationRequested=function(au,ar,at){throw new Error("invalid event received")
};
ap.messageReceived=function(at,ar){aq.handleMessageReceived(at,ar)
};
ap.connectionClosed=function(ar){aq.handleConnectionClosed(ar)
};
ap.connectionFailed=function(ar){aq.handleConnectionFailed(ar)
};
ao.setListener(ap)
};
ak.setListener=function(ao){this._listener=ao
};
return am
})();
var P=(function(){var ak=function(am,an,al){this._nativeEquivalent=am;
this._handler=an;
this._channelFactory=al
};
return ak
})();
var J=(function(){var al="WebSocketCompositeHandler";
var aB=m.getLogger(al);
var ay="javascript:ws";
var ao="javascript:wss";
var ax="javascript:wse";
var aE="javascript:wse+ssl";
var az="flash:wse";
var at="flash:wse+ssl";
var aq="flash:wsr";
var au="flash:wsr+ssl";
var aH={};
var an={};
var am=new C();
var ak=new H();
var av=function(){this._handlerListener=ar(this);
this._nativeHandler=aA(this);
this._emulatedHandler=aC(this);
this._emulatedFlashHandler=ap(this);
this._rtmpFlashHandler=aF(this);
aB.finest(al,"<init>");
aw();
aH[ay]=new P("ws",this._nativeHandler,am);
aH[ao]=new P("wss",this._nativeHandler,am);
aH[ax]=new P("ws",this._emulatedHandler,ak);
aH[aE]=new P("wss",this._emulatedHandler,ak);
aH[az]=new P("ws",this._emulatedFlashHandler,ak);
aH[at]=new P("wss",this._emulatedFlashHandler,ak);
aH[aq]=new P("ws",this._rtmpFlashHandler,ak);
aH[au]=new P("wss",this._rtmpFlashHandler,ak)
};
function aw(){switch(browser){case"android":case"opera":an.ws=new Array(ay,ax);
an.wss=new Array(ao,aE);
case"ie":var aI=navigator.appVersion;
if(aI.indexOf("MSIE 6.0")>=0||aI.indexOf("MSIE 7.0")>=0){an.ws=new Array(ay,az,ax);
an.wss=new Array(ao,at,aE)
}else{an.ws=new Array(ay,ax,az);
an.wss=new Array(ao,aE,at)
}case"firefox":case"chrome":case"safari":default:an.ws=new Array(ay,ax,az);
an.wss=new Array(ao,aE,at)
}}function ar(aJ){var aI={};
aI.connectionOpened=function(aK,aL){aJ.handleConnectionOpened(aK,aL)
};
aI.messageReceived=function(aL,aK){aJ.handleMessageReceived(aL,aK)
};
aI.connectionClosed=function(aK){aJ.handleConnectionClosed(aK)
};
aI.connectionFailed=function(aK){aJ.handleConnectionFailed(aK)
};
aI.authenticationRequested=function(aM,aK,aL){};
aI.redirected=function(aL,aK){};
return aI
}function aA(aJ){var aI=new ab();
var aK=new F();
aI.setListener(aJ._handlerListener);
aI.setNextHandler(aK);
return aI
}function aC(aJ){var aI=new ab();
var aK=new K();
aI.setListener(aJ._handlerListener);
aI.setNextHandler(aK);
return aI
}function ap(aK){var aI=new ab();
var aJ=new U();
aI.setListener(aK._handlerListener);
aI.setNextHandler(aJ);
return aI
}function aF(aK){var aI=new ab();
var aJ=new V();
aI.setListener(aK._handlerListener);
aI.setNextHandler(aJ);
return aI
}var aD=function(aM,aL){var aP=aH[aL];
var aK=aP._channelFactory;
var aI=aM._location;
var aO=aM._protocol;
var aN=aM._isBinary;
var aJ=aK.createChannel(aI,aO,aN);
aM._selectedChannel=aJ;
aJ.parent=aM;
aJ._handler=aP._handler;
aJ._handler.processConnect(aM._selectedChannel,aI,aO)
};
var aG=av.prototype;
aG.fallbackNext=function(aJ){aB.finest(al,"fallbackNext");
var aI=aJ.getNextStrategy();
if(aI==null){this.doClose(aJ)
}else{aD(aJ,aI)
}};
aG.doOpen=function(aI){if(aI.readyState==0){aI.readyState=1;
aI._webSocket.handleOpen()
}};
aG.doClose=function(aI){if(aI.readyState==0||aI.readyState==1){aI.readyState=2;
aI._webSocket.handleClose()
}};
aG.processConnect=function(aN,aJ,aP){aB.finest(al,"connect",aN);
var aI=aN;
aB.finest("Current ready state = "+aI.readyState);
if(aI.readyState==1){aB.fine("Attempt to reconnect an existing open WebSocket to a different location");
throw new Error("Attempt to reconnect an existing open WebSocket to a different location")
}var aK=aI._compositeScheme;
if(aK!="ws"&&aK!="wss"){var aO=aH[aK];
if(aO==null){throw new Error("Invalid connection scheme: "+aK)
}aB.finest("Turning off fallback since the URL is prefixed with java:");
aI._connectionStrategies.push(aK)
}else{var aM=an[aK];
if(aM!=null){for(var aL=0;
aL<aM.length;
aL++){aI._connectionStrategies.push(aM[aL])
}}else{throw new Error("Invalid connection scheme: "+aK)
}}this.fallbackNext(aI)
};
aG.processTextMessage=function(aL,aK){aB.finest(al,"send",aK);
var aJ=aL;
if(aJ.readyState!=1){aB.fine("Attempt to post message on unopened or closed web socket");
throw new Error("Attempt to post message on unopened or closed web socket")
}var aI=aJ._selectedChannel;
aI._handler.processTextMessage(aI,aK)
};
aG.processBinaryMessage=function(aL,aK){aB.finest(al,"send",aK);
var aJ=aL;
if(aJ.readyState!=1){aB.fine("Attempt to post message on unopened or closed web socket");
throw new Error("Attempt to post message on unopened or closed web socket")
}var aI=aJ._selectedChannel;
aI._handler.processBinaryMessage(aI,aK)
};
aG.processClose=function(aK){aB.finest(al,"close");
var aJ=aK;
if(aJ&&aJ.readyState==2){aB.fine("WebSocket already closed");
throw new Error("WebSocket already closed")
}if(aJ&&!aJ._closing){aJ._closing=true;
var aI=aJ._selectedChannel;
aI._handler.processClose(aI)
}};
aG.setListener=function(aI){this._listener=aI
};
aG.handleConnectionOpened=function(aJ,aK){var aI=aJ.parent;
this.doOpen(aI)
};
aG.handleMessageReceived=function(aK,aI){var aJ=aK.parent;
aJ._webSocket.handleMessage(aI)
};
aG.handleConnectionClosed=function(aJ){var aI=aJ.parent;
if(aI._closing){this.doClose(aI)
}else{if(aI.readyState==0&&!aJ.authenticationReceived){this.fallbackNext(aI)
}else{this.doClose(aI)
}}};
aG.handleConnectionFailed=function(aJ){var aI=aJ.parent;
if(aI._closing){this.doClose(aI)
}else{if(aI.readyState==0&&!aJ.authenticationReceived){this.fallbackNext(aI)
}else{this.doClose(aI)
}}};
return av
})();
(function(){var ak=new J();
window.WebSocket=(function(){var al="WebSocket";
var at=m.getLogger(al);
var ao=function(av,aw){at.entering(this,"WebSocket.<init>",{url:av,protocol:aw});
this.readyState=0;
this.location=av;
this.protocol=aw;
this._queue=[];
au(this,av,aw)
};
var au=function(ax,av,ay){var aw=new z(av);
ax._channel=new N(aw,ay,false);
ax._channel._webSocket=ax;
ak.processConnect(ax._channel,aw.getWSEquivalent(),ay)
};
function ap(ax,av){at.entering(this,"WebSocket.doOpen");
if(ax.readyState<1){ax.readyState=1;
if(typeof(ax.onopen)!=="undefined"){if(!av){try{av=document.createEvent("Events");
av.initEvent("open",true,true)
}catch(ay){av={type:"open",bubbles:true,cancelable:true}
}}try{ax.onopen(av)
}catch(aw){at.severe(this,"WebSocket.onopen: Error thrown from application")
}}}}var an=ao.prototype;
an.getURL=function(){return this.location
};
an.getProtocol=function(){return this._channel.protocol||""
};
an.getReadyState=function(){return this.readyState
};
an.send=function(av){switch(this.readyState){case 0:at.error("WebSocket.send: Error: Attempt to send message on unopened or closed WebSocket");
throw new Error("Attempt to send message on unopened or closed WebSocket");
case 1:ak.processTextMessage(this._channel,av);
return true;
case 2:return false;
default:at.error("WebSocket.send: Illegal state error");
throw new Error("Illegal state error")
}};
an.close=function(){ak.processClose(this._channel)
};
an.handleOpen=function(aw){switch(this.readyState){case 0:ap(this,aw);
break;
case 1:case 2:var av=(aw?" from "+aw.target:"");
at.severe(this,"WebSocket.openHandler: Error: Invalid readyState for open event"+av);
throw new Error("Invalid readyState for open event"+av);
default:at.severe(this,"WebSocket.openHandler: Error: Invalid readyState "+_readyState);
throw new Error("Socket has invalid readyState: "+_readyState)
}};
var am=function(ax,av){if(typeof(ax.onmessage)==="function"){var aw;
try{aw=document.createEvent("Events");
aw.initEvent("message",true,true)
}catch(ay){aw={type:"message",bubbles:true,cancelable:true}
}aw.data=j(av,Charset.UTF8);
aw.source=ax;
ax.onmessage(aw)
}};
var ar=function(ay){var az=new Date().getTime();
var aw=az+50;
while(ay._queue.length>0){if(new Date().getTime()>aw){setTimeout(function(){ar(ay)
},0);
return
}var av=ay._queue.shift();
var ax=false;
try{am(ay,av);
ax=true
}finally{if(!ax){if(ay._queue.length==0){ay._delivering=false
}else{setTimeout(function(){ar(ay)
},0)
}}}}ay._delivering=false
};
an.handleMessage=function(av){switch(this.readyState){case 1:this._queue.push(av);
if(!this._delivering){this._delivering=true;
ar(this)
}break;
case 0:case 2:break;
default:throw new Error("Socket has invalid readyState: "+$this.readyState)
}};
var aq=function(aw,av){at.entering(aw,"WebSocket.doClose");
if(aw.readyState<2){aw.readyState=2;
delete aw._channel;
if(typeof(aw.onclose)!=="undefined"){setTimeout(function(){if(!av){try{av=document.createEvent("Events");
av.initEvent("close",true,true)
}catch(ay){av={type:"close",bubbles:true,cancelable:true}
}}try{aw.onclose(av)
}catch(ax){at.severe(this,"WebSocket.onclose: Error thrown from application")
}},0)
}}};
an.handleClose=function(av){aq(this,av)
};
an.handleError=function(av){aq(this,av)
};
return ao
})();
window.WebSocket.__impls__={};
window.WebSocket.__impls__["flash:wse"]=f
}());
(function(){window.ByteSocket=(function(){var al="ByteSocket";
var ap=m.getLogger(al);
var av=new J();
var aq=function(az,aA){ap.entering(this,"ByteSocket.<init>",{url:az,subprotocol:aA});
$this=this;
this.readyState=0;
this.location=az;
this.protocol=aA;
this._queue=[];
ay(this,az,aA)
};
var ay=function(aB,az,aC){var aA=new z(az);
aB._channel=new N(aA,aC,true);
aB._channel._webSocket=aB;
av.processConnect(aB._channel,aA.getWSEquivalent(),aC)
};
var ar=aq.prototype;
ar.send=function(az){ap.entering(this,"ByteSocket.send",az);
if(az.constructor!=window.ByteBuffer){throw new Error("ByteSocket.send must be called with a ByteBuffer argument")
}switch(this.readyState){case 0:ap.severe(this,"ByteSocket.send: Error: readyState is 0");
throw new Error("INVALID_STATE_ERR");
case 1:if(az===null){ap.severe(this,"ByteSocket.send: Error: data is null");
throw new Error("data is null")
}av.processBinaryMessage(this._channel,az);
an(this);
return true;
case 2:return false;
default:ap.severe(this,"ByteSocket.send: Error: Invalid readyState "+readyState);
throw new Error("INVALID_STATE_ERR")
}};
ar.handleOpen=function(aA){switch(this.readyState){case 0:au(this,aA);
break;
case 1:case 2:var az=(aA?" from "+aA.target:"");
WSLOG.severe(this,"WebSocket.openHandler: Error: Invalid readyState for open event"+az);
throw new Error("Invalid readyState for open event"+az);
default:WSLOG.severe(this,"WebSocket.openHandler: Error: Invalid readyState "+_readyState);
throw new Error("Socket has invalid readyState: "+_readyState)
}};
var an=function(az){};
ar.postMessage=ar.send;
ar.disconnect=ar.close;
ar.close=function(){ap.entering(this,"ByteSocket.close");
av.processClose(this._channel)
};
function au(aB,az){ap.entering(aB,"ByteSocket.doOpen");
if(aB.readyState<1){aB.readyState=1;
if(typeof(aB.onopen)!=="undefined"){if(!az){try{az=document.createEvent("Events");
az.initEvent("open",true,true)
}catch(aC){az={type:"open",bubbles:true,cancelable:true}
}}try{aB.onopen(az)
}catch(aA){ap.severe(aB,"ByteSocket.doOpen: Error thrown from application")
}}}}function ao(aB,aA){ap.entering(aB,"ByteSocket.openHandler",aA);
switch(aB.readyState){case 0:au(aB,aA);
break;
case 1:case 2:var az=(aA?" from "+aA.target:"");
ap.severe(aB,"ByteSocket.openHandler: Error: Invalid readyState for open event"+az);
throw new Error("Invalid readyState for open event"+az);
default:ap.severe(aB,"ByteSocket.openHandler: Error: Invalid readyState "+aB.readyState);
throw new Error("Socket has invalid readyState: "+aB.readyState)
}}function ak(aC,az){if(typeof(aC.onmessage)==="function"){ap.entering(this,"ByteSocket.messageHandler");
var aB;
try{aB=document.createEvent("Events");
aB.initEvent("message",true,true)
}catch(aD){aB={type:"message",bubbles:true,cancelable:true}
}aB.data=az;
aB.source=aC;
try{aC.onmessage(aB)
}catch(aA){ap.severe(aC,"ByteSocket.doOpen: Error thrown from application message handler")
}}}function ax(aC){var aD=new Date().getTime();
var aA=aD+50;
while(aC._queue.length>0){if(new Date().getTime()>aA){setTimeout(function(){ax(aC)
},0);
return
}var az=aC._queue.shift();
var aB=false;
try{ak(aC,az);
aB=true
}finally{if(!aB){if(aC._queue.length==0){aC._delivering=false
}else{setTimeout(function(){ax(aC)
},0)
}}}}aC._delivering=false
}function at(aA,az){switch(aA.readyState){case 1:aA._queue.push(az);
if(!aA._delivering){aA._delivering=true;
setTimeout(function(){ax(aA)
},0)
}break;
case 0:case 2:break;
default:throw new Error("Socket has invalid readyState: "+aA.readyState)
}}function aw(aA,az){ap.entering(aA,"ByteSocket.doClose");
if(aA.readyState<2){aA.readyState=2;
if(typeof(aA.onclose)!=="undefined"){setTimeout(function(){if(!az){try{az=document.createEvent("Events");
az.initEvent("close",true,true)
}catch(aC){az={type:"close",bubbles:true,cancelable:true}
}}try{aA.onclose(az)
}catch(aB){ap.severe(aA,"ByteSocket.doClose: Error thrown from application")
}},0)
}}}function am(aB,aA){ap.entering(aB,"ByteSocket.closeHandler",aA);
switch(aB.readyState){case 0:unbindHandlers(aB);
fallbackNext(aB);
break;
case 1:aw(aB,aA);
break;
case 2:var az=(aA?" from "+aA.target:"");
ap.severe(aB,"ByteSocket.closeHandler: Error: Invalid readyState for close event"+az);
throw new Error("Invalid readyState for close event"+az);
break;
default:ap.severe(aB,"ByteSocket.closeHandler: Error: Invalid readyState "+aB.readyState);
throw new Error("Socket has invalid readyState: "+aB.readyState)
}}ar.handleMessage=function(az){switch(this.readyState){case 1:var aA=this;
this._queue.push(az);
if(!this._delivering){this._delivering=true;
setTimeout(function(){ax(aA)
},0)
}break;
case 0:case 2:break;
default:throw new Error("Socket has invalid readyState: "+aA.readyState)
}};
ar.handleClose=function(az){aw(this,az)
};
ar.handleError=function(az){aw(this,az)
};
return aq
})()
}());
window.___Loader=new y(r)
})()
})();
var EventDispatcher=function(){};
(function(){var a=EventDispatcher.prototype;
a._initEventDispatcher=function(){this._eventListeners={}
};
a.addEventListener=function(c,d){var b=this._eventListeners[c];
if(b){b.push(d)
}else{this._eventListeners[c]=[d]
}};
a.removeEventListener=function(e,f){var d=this._eventListeners[e];
if(d){var b=[];
for(var c=0;
c<d.length;
c++){if(d[c]!==f){b.push(d[c])
}}this._eventListeners[e]=new Listeners
}};
a.hasEventListener=function(c){var b=this._eventListeners[c];
return Boolean(b)
};
a.dispatchEvent=function(d){var c=this._eventListeners[d.type];
if(c){for(var b=0;
b<c.length;
b++){c[b](d)
}}if(this["on"+d.type]){this["on"+d.type](d)
}}
})();
var AmqpClient=function(){this._options={};
this._readyState=0;
this._init()
};
(function(){var v=function(az){this.context=az;
this.states={}
};
(function(){var az=v.prototype;
var aA=function aA(){};
az.enterState=function(aF,aC,aD){if(this.currentState){this.currentState.exitBehavior(this.context,aC,aD,aF)
}var aE=this.states[aF];
this.currentState=aE;
try{aE.entryBehavior(this.context,aC,aD,aF)
}catch(aG){var aB=new Error("Could not call behavior for state "+aE.stateName+"\n\n"+aG.message);
aB.innerException=aG;
throw (aB)
}};
az.addState=function(aK,aD,aI,aC){var aB={};
aB.stateName=aK;
aB.entryBehavior=aI||aA;
aB.exitBehavior=aC||aA;
this.states[aK]=(aB);
aB.rules={};
var aJ=aD||[];
for(var aF=0;
aF<aJ.length;
aF++){var aG=aJ[aF];
for(var aE=0;
aE<aG.inputs.length;
aE++){var aH=aG.inputs[aE];
aB.rules[aH]=aG.targetState
}}};
az.feedInput=function(aB,aC){var aE=this.currentState;
if(aE.rules[aB]){var aF=this;
var aD=function(){aF.enterState(aE.rules[aB],aB,aC)
};
aD();
return true
}else{return false
}}
})();
var e=function(){};
(function(){e.prototype=new EventDispatcher();
var aC=e.prototype;
var az=function az(){};
var aB=function aB(aE){throw aE
};
aC._stateMachine=null;
aC.onerror=function(aE){};
aC._actions=[];
aC._processActions=function aA(){if(!this._actions.length){return
}var aG=this._actions[0];
var aF=this._stateMachine.feedInput(aG.actionName+"Action",aG);
if(aF){var aE=this;
setTimeout(function(){try{aG.func.apply(aE,aG.args)
}catch(aH){aG.error(aH)
}},0);
this._actions.shift()
}};
aC._enqueueAction=function aD(aF,aJ,aH,aE,aG){var aK={};
aK.actionName=aF||"";
aK.func=aJ||az;
aK.args=aH||null;
aK.continuation=aE||az;
aK.error=aG||aB;
this._actions.push(aK);
var aI=this;
var aJ=function(){aI._processActions()
};
setTimeout(aJ,0)
};
aC._initAsyncClient=function(){this._initEventDispatcher();
this._stateMachine=new v(this);
this._actions=[];
this._buffer=null;
this._socket=null
};
aC._send=null;
aC._readHandler=null
})();
var M={};
M.FRAME_METHOD={value:1,message:""};
M.FRAME_HEADER={value:2,message:""};
M.FRAME_BODY={value:3,message:""};
M.FRAME_HEARTBEAT={value:8,message:""};
M.FRAME_MIN_SIZE={value:4096,message:""};
M.FRAME_END={value:206,message:""};
M.REPLY_SUCCESS={value:200,message:"Indicates that the method completed successfully. This reply code is reserved for future use - the current protocol design does not use positive confirmation and reply codes are sent only in case of an error."};
M.CONTENT_TOO_LARGE={value:311,message:"The client attempted to transfer content larger than the server could accept at the present time. The client may retry at a later time."};
M.NO_CONSUMERS={value:313,message:"When the exchange cannot deliver to a consumer when the immediate flag is set. As a result of pending data on the queue or the absence of any consumers of the queue."};
M.CONNECTION_FORCED={value:320,message:"An operator intervened to close the connection for some reason. The client may retry at some later date."};
M.INVALID_PATH={value:402,message:"The client tried to work with an unknown virtual host."};
M.ACCESS_REFUSED={value:403,message:"The client attempted to work with a server entity to which it has no access due to security settings."};
M.NOT_FOUND={value:404,message:"The client attempted to work with a server entity that does not exist."};
M.RESOURCE_LOCKED={value:405,message:"The client attempted to work with a server entity to which it has no access because another client is working with it."};
M.PRECONDITION_FAILED={value:406,message:"The client requested a method that was not allowed because some precondition failed."};
M.FRAME_ERROR={value:501,message:"The sender sent a malformed frame that the recipient could not decode. This strongly implies a programming error in the sending peer."};
M.SYNTAX_ERROR={value:502,message:"The sender sent a frame that contained illegal values for one or more fields. This strongly implies a programming error in the sending peer."};
M.COMMAND_INVALID={value:503,message:"The client sent an invalid sequence of frames, attempting to perform an operation that was considered invalid by the server. This usually implies a programming error in the client."};
M.CHANNEL_ERROR={value:504,message:"The client attempted to work with a channel that had not been correctly opened. This most likely indicates a fault in the client layer."};
M.UNEXPECTED_FRAME={value:505,message:"The peer sent a frame that was not expected, usually in the context of a content header and body.  This strongly indicates a fault in the peer's content processing."};
M.RESOURCE_ERROR={value:506,message:"The server could not complete the method because it lacked sufficient resources. This may be due to the client creating too many of some type of entity."};
M.NOT_ALLOWED={value:530,message:"The client tried to work with some entity in a manner that is prohibited by the server, due to security settings or by some other criteria."};
M.NOT_IMPLEMENTED={value:540,message:"The client tried to use functionality that is not implemented in the server."};
M.INTERNAL_ERROR={value:541,message:"The server could not complete the method because of an internal error. The server may require intervention by an operator in order to resume normal operations."};
var g={ClassId:{type:"short",asserts:[]},ConsumerTag:{type:"shortstr",asserts:[]},DeliveryTag:{type:"longlong",asserts:[]},ExchangeName:{type:"shortstr",asserts:[]},MethodId:{type:"short",asserts:[]},NoAck:{type:"bit",asserts:[]},NoLocal:{type:"bit",asserts:[]},NoWait:{type:"bit",asserts:[]},Path:{type:"shortstr",asserts:[]},PeerProperties:{type:"table",asserts:[]},QueueName:{type:"shortstr",asserts:[]},Redelivered:{type:"bit",asserts:[]},MessageCount:{type:"long",asserts:[]},ReplyCode:{type:"short",asserts:[]},ReplyText:{type:"shortstr",asserts:[]},Bit:{type:"bit",asserts:[]},Octet:{type:"octet",asserts:[]},Short:{type:"short",asserts:[]},Long:{type:"long",asserts:[]},Longlong:{type:"longlong",asserts:[]},Shortstr:{type:"shortstr",asserts:[]},Longstr:{type:"longstr",asserts:[]},Timestamp:{type:"timestamp",asserts:[]},Table:{type:"table",asserts:[]}};
var U={};
U.Connection={};
U.Connection.startConnection={};
U.Connection.startConnection.allParameters=[{name:"versionMajor",type:"Octet"},{name:"versionMinor",type:"Octet"},{name:"serverProperties",type:"PeerProperties"},{name:"mechanisms",type:"Longstr"},{name:"locales",type:"Longstr"}];
U.Connection.startConnection.returnType="StartOkConnection";
U.Connection.startConnection.index=10;
U.Connection.startConnection.classIndex=10;
U.Connection.startConnection.synchronous=true;
U.Connection.startConnection.hasContent=false;
U.Connection.startOkConnection={};
U.Connection.startOkConnection.allParameters=[{name:"clientProperties",type:"PeerProperties"},{name:"mechanism",type:"Shortstr"},{name:"response",type:"Longstr"},{name:"locale",type:"Shortstr"}];
U.Connection.startOkConnection.returnType="voidConnection";
U.Connection.startOkConnection.index=11;
U.Connection.startOkConnection.classIndex=10;
U.Connection.startOkConnection.synchronous=true;
U.Connection.startOkConnection.hasContent=false;
U.Connection.secureConnection={};
U.Connection.secureConnection.allParameters=[{name:"challenge",type:"Longstr"}];
U.Connection.secureConnection.returnType="SecureOkConnection";
U.Connection.secureConnection.index=20;
U.Connection.secureConnection.classIndex=10;
U.Connection.secureConnection.synchronous=true;
U.Connection.secureConnection.hasContent=false;
U.Connection.secureOkConnection={};
U.Connection.secureOkConnection.allParameters=[{name:"response",type:"Longstr"}];
U.Connection.secureOkConnection.returnType="voidConnection";
U.Connection.secureOkConnection.index=21;
U.Connection.secureOkConnection.classIndex=10;
U.Connection.secureOkConnection.synchronous=true;
U.Connection.secureOkConnection.hasContent=false;
U.Connection.tuneConnection={};
U.Connection.tuneConnection.allParameters=[{name:"channelMax",type:"Short"},{name:"frameMax",type:"Long"},{name:"heartbeat",type:"Short"}];
U.Connection.tuneConnection.returnType="TuneOkConnection";
U.Connection.tuneConnection.index=30;
U.Connection.tuneConnection.classIndex=10;
U.Connection.tuneConnection.synchronous=true;
U.Connection.tuneConnection.hasContent=false;
U.Connection.tuneOkConnection={};
U.Connection.tuneOkConnection.allParameters=[{name:"channelMax",type:"Short"},{name:"frameMax",type:"Long"},{name:"heartbeat",type:"Short"}];
U.Connection.tuneOkConnection.returnType="voidConnection";
U.Connection.tuneOkConnection.index=31;
U.Connection.tuneOkConnection.classIndex=10;
U.Connection.tuneOkConnection.synchronous=true;
U.Connection.tuneOkConnection.hasContent=false;
U.Connection.openConnection={};
U.Connection.openConnection.allParameters=[{name:"virtualHost",type:"Path"},{name:"reserved1",type:"Shortstr"},{name:"reserved2",type:"Bit"}];
U.Connection.openConnection.returnType="OpenOkConnection";
U.Connection.openConnection.index=40;
U.Connection.openConnection.classIndex=10;
U.Connection.openConnection.synchronous=true;
U.Connection.openConnection.hasContent=false;
U.Connection.openOkConnection={};
U.Connection.openOkConnection.allParameters=[{name:"reserved1",type:"Shortstr"}];
U.Connection.openOkConnection.returnType="voidConnection";
U.Connection.openOkConnection.index=41;
U.Connection.openOkConnection.classIndex=10;
U.Connection.openOkConnection.synchronous=true;
U.Connection.openOkConnection.hasContent=false;
U.Connection.closeConnection={};
U.Connection.closeConnection.allParameters=[{name:"replyCode",type:"ReplyCode"},{name:"replyText",type:"ReplyText"},{name:"classId",type:"ClassId"},{name:"methodId",type:"MethodId"}];
U.Connection.closeConnection.returnType="CloseOkConnection";
U.Connection.closeConnection.index=50;
U.Connection.closeConnection.classIndex=10;
U.Connection.closeConnection.synchronous=true;
U.Connection.closeConnection.hasContent=false;
U.Connection.closeOkConnection={};
U.Connection.closeOkConnection.allParameters=[];
U.Connection.closeOkConnection.returnType="voidConnection";
U.Connection.closeOkConnection.index=51;
U.Connection.closeOkConnection.classIndex=10;
U.Connection.closeOkConnection.synchronous=true;
U.Connection.closeOkConnection.hasContent=false;
U.Connection.methodLookup={10:"startConnection",11:"startOkConnection",20:"secureConnection",21:"secureOkConnection",30:"tuneConnection",31:"tuneOkConnection",40:"openConnection",41:"openOkConnection",50:"closeConnection",51:"closeOkConnection"};
U.Connection.className="Connection";
U.Channel={};
U.Channel.openChannel={};
U.Channel.openChannel.allParameters=[{name:"reserved1",type:"Shortstr"}];
U.Channel.openChannel.returnType="OpenOkChannel";
U.Channel.openChannel.index=10;
U.Channel.openChannel.classIndex=20;
U.Channel.openChannel.synchronous=true;
U.Channel.openChannel.hasContent=false;
U.Channel.openOkChannel={};
U.Channel.openOkChannel.allParameters=[{name:"reserved1",type:"Longstr"}];
U.Channel.openOkChannel.returnType="voidChannel";
U.Channel.openOkChannel.index=11;
U.Channel.openOkChannel.classIndex=20;
U.Channel.openOkChannel.synchronous=true;
U.Channel.openOkChannel.hasContent=false;
U.Channel.flowChannel={};
U.Channel.flowChannel.allParameters=[{name:"active",type:"Bit"}];
U.Channel.flowChannel.returnType="FlowOkChannel";
U.Channel.flowChannel.index=20;
U.Channel.flowChannel.classIndex=20;
U.Channel.flowChannel.synchronous=true;
U.Channel.flowChannel.hasContent=false;
U.Channel.flowOkChannel={};
U.Channel.flowOkChannel.allParameters=[{name:"active",type:"Bit"}];
U.Channel.flowOkChannel.returnType="voidChannel";
U.Channel.flowOkChannel.index=21;
U.Channel.flowOkChannel.classIndex=20;
U.Channel.flowOkChannel.synchronous=false;
U.Channel.flowOkChannel.hasContent=false;
U.Channel.closeChannel={};
U.Channel.closeChannel.allParameters=[{name:"replyCode",type:"ReplyCode"},{name:"replyText",type:"ReplyText"},{name:"classId",type:"ClassId"},{name:"methodId",type:"MethodId"}];
U.Channel.closeChannel.returnType="CloseOkChannel";
U.Channel.closeChannel.index=40;
U.Channel.closeChannel.classIndex=20;
U.Channel.closeChannel.synchronous=true;
U.Channel.closeChannel.hasContent=false;
U.Channel.closeOkChannel={};
U.Channel.closeOkChannel.allParameters=[];
U.Channel.closeOkChannel.returnType="voidChannel";
U.Channel.closeOkChannel.index=41;
U.Channel.closeOkChannel.classIndex=20;
U.Channel.closeOkChannel.synchronous=true;
U.Channel.closeOkChannel.hasContent=false;
U.Channel.methodLookup={10:"openChannel",11:"openOkChannel",20:"flowChannel",21:"flowOkChannel",40:"closeChannel",41:"closeOkChannel"};
U.Channel.className="Channel";
U.Exchange={};
U.Exchange.declareExchange={};
U.Exchange.declareExchange.allParameters=[{name:"reserved1",type:"Short"},{name:"exchange",type:"ExchangeName"},{name:"type",type:"Shortstr"},{name:"passive",type:"Bit"},{name:"durable",type:"Bit"},{name:"reserved2",type:"Bit"},{name:"reserved3",type:"Bit"},{name:"noWait",type:"NoWait"},{name:"arguments",type:"Table"}];
U.Exchange.declareExchange.returnType="DeclareOkExchange";
U.Exchange.declareExchange.index=10;
U.Exchange.declareExchange.classIndex=40;
U.Exchange.declareExchange.synchronous=true;
U.Exchange.declareExchange.hasContent=false;
U.Exchange.declareOkExchange={};
U.Exchange.declareOkExchange.allParameters=[];
U.Exchange.declareOkExchange.returnType="voidExchange";
U.Exchange.declareOkExchange.index=11;
U.Exchange.declareOkExchange.classIndex=40;
U.Exchange.declareOkExchange.synchronous=true;
U.Exchange.declareOkExchange.hasContent=false;
U.Exchange.deleteExchange={};
U.Exchange.deleteExchange.allParameters=[{name:"reserved1",type:"Short"},{name:"exchange",type:"ExchangeName"},{name:"ifUnused",type:"Bit"},{name:"noWait",type:"NoWait"}];
U.Exchange.deleteExchange.returnType="DeleteOkExchange";
U.Exchange.deleteExchange.index=20;
U.Exchange.deleteExchange.classIndex=40;
U.Exchange.deleteExchange.synchronous=true;
U.Exchange.deleteExchange.hasContent=false;
U.Exchange.deleteOkExchange={};
U.Exchange.deleteOkExchange.allParameters=[];
U.Exchange.deleteOkExchange.returnType="voidExchange";
U.Exchange.deleteOkExchange.index=21;
U.Exchange.deleteOkExchange.classIndex=40;
U.Exchange.deleteOkExchange.synchronous=true;
U.Exchange.deleteOkExchange.hasContent=false;
U.Exchange.methodLookup={10:"declareExchange",11:"declareOkExchange",20:"deleteExchange",21:"deleteOkExchange"};
U.Exchange.className="Exchange";
U.Queue={};
U.Queue.declareQueue={};
U.Queue.declareQueue.allParameters=[{name:"reserved1",type:"Short"},{name:"queue",type:"QueueName"},{name:"passive",type:"Bit"},{name:"durable",type:"Bit"},{name:"exclusive",type:"Bit"},{name:"autoDelete",type:"Bit"},{name:"noWait",type:"NoWait"},{name:"arguments",type:"Table"}];
U.Queue.declareQueue.returnType="DeclareOkQueue";
U.Queue.declareQueue.index=10;
U.Queue.declareQueue.classIndex=50;
U.Queue.declareQueue.synchronous=true;
U.Queue.declareQueue.hasContent=false;
U.Queue.declareOkQueue={};
U.Queue.declareOkQueue.allParameters=[{name:"queue",type:"QueueName"},{name:"messageCount",type:"MessageCount"},{name:"consumerCount",type:"Long"}];
U.Queue.declareOkQueue.returnType="voidQueue";
U.Queue.declareOkQueue.index=11;
U.Queue.declareOkQueue.classIndex=50;
U.Queue.declareOkQueue.synchronous=true;
U.Queue.declareOkQueue.hasContent=false;
U.Queue.bindQueue={};
U.Queue.bindQueue.allParameters=[{name:"reserved1",type:"Short"},{name:"queue",type:"QueueName"},{name:"exchange",type:"ExchangeName"},{name:"routingKey",type:"Shortstr"},{name:"noWait",type:"NoWait"},{name:"arguments",type:"Table"}];
U.Queue.bindQueue.returnType="BindOkQueue";
U.Queue.bindQueue.index=20;
U.Queue.bindQueue.classIndex=50;
U.Queue.bindQueue.synchronous=true;
U.Queue.bindQueue.hasContent=false;
U.Queue.bindOkQueue={};
U.Queue.bindOkQueue.allParameters=[];
U.Queue.bindOkQueue.returnType="voidQueue";
U.Queue.bindOkQueue.index=21;
U.Queue.bindOkQueue.classIndex=50;
U.Queue.bindOkQueue.synchronous=true;
U.Queue.bindOkQueue.hasContent=false;
U.Queue.unbindQueue={};
U.Queue.unbindQueue.allParameters=[{name:"reserved1",type:"Short"},{name:"queue",type:"QueueName"},{name:"exchange",type:"ExchangeName"},{name:"routingKey",type:"Shortstr"},{name:"arguments",type:"Table"}];
U.Queue.unbindQueue.returnType="UnbindOkQueue";
U.Queue.unbindQueue.index=50;
U.Queue.unbindQueue.classIndex=50;
U.Queue.unbindQueue.synchronous=true;
U.Queue.unbindQueue.hasContent=false;
U.Queue.unbindOkQueue={};
U.Queue.unbindOkQueue.allParameters=[];
U.Queue.unbindOkQueue.returnType="voidQueue";
U.Queue.unbindOkQueue.index=51;
U.Queue.unbindOkQueue.classIndex=50;
U.Queue.unbindOkQueue.synchronous=true;
U.Queue.unbindOkQueue.hasContent=false;
U.Queue.purgeQueue={};
U.Queue.purgeQueue.allParameters=[{name:"reserved1",type:"Short"},{name:"queue",type:"QueueName"},{name:"noWait",type:"NoWait"}];
U.Queue.purgeQueue.returnType="PurgeOkQueue";
U.Queue.purgeQueue.index=30;
U.Queue.purgeQueue.classIndex=50;
U.Queue.purgeQueue.synchronous=true;
U.Queue.purgeQueue.hasContent=false;
U.Queue.purgeOkQueue={};
U.Queue.purgeOkQueue.allParameters=[{name:"messageCount",type:"MessageCount"}];
U.Queue.purgeOkQueue.returnType="voidQueue";
U.Queue.purgeOkQueue.index=31;
U.Queue.purgeOkQueue.classIndex=50;
U.Queue.purgeOkQueue.synchronous=true;
U.Queue.purgeOkQueue.hasContent=false;
U.Queue.deleteQueue={};
U.Queue.deleteQueue.allParameters=[{name:"reserved1",type:"Short"},{name:"queue",type:"QueueName"},{name:"ifUnused",type:"Bit"},{name:"ifEmpty",type:"Bit"},{name:"noWait",type:"NoWait"}];
U.Queue.deleteQueue.returnType="DeleteOkQueue";
U.Queue.deleteQueue.index=40;
U.Queue.deleteQueue.classIndex=50;
U.Queue.deleteQueue.synchronous=true;
U.Queue.deleteQueue.hasContent=false;
U.Queue.deleteOkQueue={};
U.Queue.deleteOkQueue.allParameters=[{name:"messageCount",type:"MessageCount"}];
U.Queue.deleteOkQueue.returnType="voidQueue";
U.Queue.deleteOkQueue.index=41;
U.Queue.deleteOkQueue.classIndex=50;
U.Queue.deleteOkQueue.synchronous=true;
U.Queue.deleteOkQueue.hasContent=false;
U.Queue.methodLookup={10:"declareQueue",11:"declareOkQueue",20:"bindQueue",21:"bindOkQueue",50:"unbindQueue",51:"unbindOkQueue",30:"purgeQueue",31:"purgeOkQueue",40:"deleteQueue",41:"deleteOkQueue"};
U.Queue.className="Queue";
U.Basic={};
U.Basic.qosBasic={};
U.Basic.qosBasic.allParameters=[{name:"prefetchSize",type:"Long"},{name:"prefetchCount",type:"Short"},{name:"global",type:"Bit"}];
U.Basic.qosBasic.returnType="QosOkBasic";
U.Basic.qosBasic.index=10;
U.Basic.qosBasic.classIndex=60;
U.Basic.qosBasic.synchronous=true;
U.Basic.qosBasic.hasContent=false;
U.Basic.qosOkBasic={};
U.Basic.qosOkBasic.allParameters=[];
U.Basic.qosOkBasic.returnType="voidBasic";
U.Basic.qosOkBasic.index=11;
U.Basic.qosOkBasic.classIndex=60;
U.Basic.qosOkBasic.synchronous=true;
U.Basic.qosOkBasic.hasContent=false;
U.Basic.consumeBasic={};
U.Basic.consumeBasic.allParameters=[{name:"reserved1",type:"Short"},{name:"queue",type:"QueueName"},{name:"consumerTag",type:"ConsumerTag"},{name:"noLocal",type:"NoLocal"},{name:"noAck",type:"NoAck"},{name:"exclusive",type:"Bit"},{name:"noWait",type:"NoWait"},{name:"arguments",type:"Table"}];
U.Basic.consumeBasic.returnType="ConsumeOkBasic";
U.Basic.consumeBasic.index=20;
U.Basic.consumeBasic.classIndex=60;
U.Basic.consumeBasic.synchronous=true;
U.Basic.consumeBasic.hasContent=false;
U.Basic.consumeOkBasic={};
U.Basic.consumeOkBasic.allParameters=[{name:"consumerTag",type:"ConsumerTag"}];
U.Basic.consumeOkBasic.returnType="voidBasic";
U.Basic.consumeOkBasic.index=21;
U.Basic.consumeOkBasic.classIndex=60;
U.Basic.consumeOkBasic.synchronous=true;
U.Basic.consumeOkBasic.hasContent=false;
U.Basic.cancelBasic={};
U.Basic.cancelBasic.allParameters=[{name:"consumerTag",type:"ConsumerTag"},{name:"noWait",type:"NoWait"}];
U.Basic.cancelBasic.returnType="CancelOkBasic";
U.Basic.cancelBasic.index=30;
U.Basic.cancelBasic.classIndex=60;
U.Basic.cancelBasic.synchronous=true;
U.Basic.cancelBasic.hasContent=false;
U.Basic.cancelOkBasic={};
U.Basic.cancelOkBasic.allParameters=[{name:"consumerTag",type:"ConsumerTag"}];
U.Basic.cancelOkBasic.returnType="voidBasic";
U.Basic.cancelOkBasic.index=31;
U.Basic.cancelOkBasic.classIndex=60;
U.Basic.cancelOkBasic.synchronous=true;
U.Basic.cancelOkBasic.hasContent=false;
U.Basic.publishBasic={};
U.Basic.publishBasic.allParameters=[{name:"reserved1",type:"Short"},{name:"exchange",type:"ExchangeName"},{name:"routingKey",type:"Shortstr"},{name:"mandatory",type:"Bit"},{name:"immediate",type:"Bit"}];
U.Basic.publishBasic.returnType="voidBasic";
U.Basic.publishBasic.index=40;
U.Basic.publishBasic.classIndex=60;
U.Basic.publishBasic.synchronous=false;
U.Basic.publishBasic.hasContent=true;
U.Basic.returnBasic={};
U.Basic.returnBasic.allParameters=[{name:"replyCode",type:"ReplyCode"},{name:"replyText",type:"ReplyText"},{name:"exchange",type:"ExchangeName"},{name:"routingKey",type:"Shortstr"}];
U.Basic.returnBasic.returnType="voidBasic";
U.Basic.returnBasic.index=50;
U.Basic.returnBasic.classIndex=60;
U.Basic.returnBasic.synchronous=false;
U.Basic.returnBasic.hasContent=true;
U.Basic.deliverBasic={};
U.Basic.deliverBasic.allParameters=[{name:"consumerTag",type:"ConsumerTag"},{name:"deliveryTag",type:"DeliveryTag"},{name:"redelivered",type:"Redelivered"},{name:"exchange",type:"ExchangeName"},{name:"routingKey",type:"Shortstr"}];
U.Basic.deliverBasic.returnType="voidBasic";
U.Basic.deliverBasic.index=60;
U.Basic.deliverBasic.classIndex=60;
U.Basic.deliverBasic.synchronous=false;
U.Basic.deliverBasic.hasContent=true;
U.Basic.getBasic={};
U.Basic.getBasic.allParameters=[{name:"reserved1",type:"Short"},{name:"queue",type:"QueueName"},{name:"noAck",type:"NoAck"}];
U.Basic.getBasic.returnType="GetOkBasic";
U.Basic.getBasic.index=70;
U.Basic.getBasic.classIndex=60;
U.Basic.getBasic.synchronous=true;
U.Basic.getBasic.hasContent=false;
U.Basic.getOkBasic={};
U.Basic.getOkBasic.allParameters=[{name:"deliveryTag",type:"DeliveryTag"},{name:"redelivered",type:"Redelivered"},{name:"exchange",type:"ExchangeName"},{name:"routingKey",type:"Shortstr"},{name:"messageCount",type:"MessageCount"}];
U.Basic.getOkBasic.returnType="voidBasic";
U.Basic.getOkBasic.index=71;
U.Basic.getOkBasic.classIndex=60;
U.Basic.getOkBasic.synchronous=true;
U.Basic.getOkBasic.hasContent=true;
U.Basic.getEmptyBasic={};
U.Basic.getEmptyBasic.allParameters=[{name:"reserved1",type:"Shortstr"}];
U.Basic.getEmptyBasic.returnType="voidBasic";
U.Basic.getEmptyBasic.index=72;
U.Basic.getEmptyBasic.classIndex=60;
U.Basic.getEmptyBasic.synchronous=true;
U.Basic.getEmptyBasic.hasContent=false;
U.Basic.ackBasic={};
U.Basic.ackBasic.allParameters=[{name:"deliveryTag",type:"DeliveryTag"},{name:"multiple",type:"Bit"}];
U.Basic.ackBasic.returnType="voidBasic";
U.Basic.ackBasic.index=80;
U.Basic.ackBasic.classIndex=60;
U.Basic.ackBasic.synchronous=false;
U.Basic.ackBasic.hasContent=false;
U.Basic.rejectBasic={};
U.Basic.rejectBasic.allParameters=[{name:"deliveryTag",type:"DeliveryTag"},{name:"requeue",type:"Bit"}];
U.Basic.rejectBasic.returnType="voidBasic";
U.Basic.rejectBasic.index=90;
U.Basic.rejectBasic.classIndex=60;
U.Basic.rejectBasic.synchronous=false;
U.Basic.rejectBasic.hasContent=false;
U.Basic.recoverAsyncBasic={};
U.Basic.recoverAsyncBasic.allParameters=[{name:"requeue",type:"Bit"}];
U.Basic.recoverAsyncBasic.returnType="voidBasic";
U.Basic.recoverAsyncBasic.index=100;
U.Basic.recoverAsyncBasic.classIndex=60;
U.Basic.recoverAsyncBasic.synchronous=false;
U.Basic.recoverAsyncBasic.hasContent=false;
U.Basic.recoverBasic={};
U.Basic.recoverBasic.allParameters=[{name:"requeue",type:"Bit"}];
U.Basic.recoverBasic.returnType="voidBasic";
U.Basic.recoverBasic.index=110;
U.Basic.recoverBasic.classIndex=60;
U.Basic.recoverBasic.synchronous=false;
U.Basic.recoverBasic.hasContent=false;
U.Basic.recoverOkBasic={};
U.Basic.recoverOkBasic.allParameters=[];
U.Basic.recoverOkBasic.returnType="voidBasic";
U.Basic.recoverOkBasic.index=111;
U.Basic.recoverOkBasic.classIndex=60;
U.Basic.recoverOkBasic.synchronous=true;
U.Basic.recoverOkBasic.hasContent=false;
U.Basic.methodLookup={10:"qosBasic",11:"qosOkBasic",20:"consumeBasic",21:"consumeOkBasic",30:"cancelBasic",31:"cancelOkBasic",40:"publishBasic",50:"returnBasic",60:"deliverBasic",70:"getBasic",71:"getOkBasic",72:"getEmptyBasic",80:"ackBasic",90:"rejectBasic",100:"recoverAsyncBasic",110:"recoverBasic",111:"recoverOkBasic"};
U.Basic.className="Basic";
U.Tx={};
U.Tx.selectTx={};
U.Tx.selectTx.allParameters=[];
U.Tx.selectTx.returnType="SelectOkTx";
U.Tx.selectTx.index=10;
U.Tx.selectTx.classIndex=90;
U.Tx.selectTx.synchronous=true;
U.Tx.selectTx.hasContent=false;
U.Tx.selectOkTx={};
U.Tx.selectOkTx.allParameters=[];
U.Tx.selectOkTx.returnType="voidTx";
U.Tx.selectOkTx.index=11;
U.Tx.selectOkTx.classIndex=90;
U.Tx.selectOkTx.synchronous=true;
U.Tx.selectOkTx.hasContent=false;
U.Tx.commitTx={};
U.Tx.commitTx.allParameters=[];
U.Tx.commitTx.returnType="CommitOkTx";
U.Tx.commitTx.index=20;
U.Tx.commitTx.classIndex=90;
U.Tx.commitTx.synchronous=true;
U.Tx.commitTx.hasContent=false;
U.Tx.commitOkTx={};
U.Tx.commitOkTx.allParameters=[];
U.Tx.commitOkTx.returnType="voidTx";
U.Tx.commitOkTx.index=21;
U.Tx.commitOkTx.classIndex=90;
U.Tx.commitOkTx.synchronous=true;
U.Tx.commitOkTx.hasContent=false;
U.Tx.rollbackTx={};
U.Tx.rollbackTx.allParameters=[];
U.Tx.rollbackTx.returnType="RollbackOkTx";
U.Tx.rollbackTx.index=30;
U.Tx.rollbackTx.classIndex=90;
U.Tx.rollbackTx.synchronous=true;
U.Tx.rollbackTx.hasContent=false;
U.Tx.rollbackOkTx={};
U.Tx.rollbackOkTx.allParameters=[];
U.Tx.rollbackOkTx.returnType="voidTx";
U.Tx.rollbackOkTx.index=31;
U.Tx.rollbackOkTx.classIndex=90;
U.Tx.rollbackOkTx.synchronous=true;
U.Tx.rollbackOkTx.hasContent=false;
U.Tx.methodLookup={10:"selectTx",11:"selectOkTx",20:"commitTx",21:"commitOkTx",30:"rollbackTx",31:"rollbackOkTx"};
U.Tx.className="Tx";
var I={10:U.Connection,20:U.Channel,40:U.Exchange,50:U.Queue,60:U.Basic,90:U.Tx};
var X={startConnection:U.Connection.startConnection,startOkConnection:U.Connection.startOkConnection,secureConnection:U.Connection.secureConnection,secureOkConnection:U.Connection.secureOkConnection,tuneConnection:U.Connection.tuneConnection,tuneOkConnection:U.Connection.tuneOkConnection,openConnection:U.Connection.openConnection,openOkConnection:U.Connection.openOkConnection,closeConnection:U.Connection.closeConnection,closeOkConnection:U.Connection.closeOkConnection,openChannel:U.Channel.openChannel,openOkChannel:U.Channel.openOkChannel,flowChannel:U.Channel.flowChannel,flowOkChannel:U.Channel.flowOkChannel,closeChannel:U.Channel.closeChannel,closeOkChannel:U.Channel.closeOkChannel,declareExchange:U.Exchange.declareExchange,declareOkExchange:U.Exchange.declareOkExchange,deleteExchange:U.Exchange.deleteExchange,deleteOkExchange:U.Exchange.deleteOkExchange,declareQueue:U.Queue.declareQueue,declareOkQueue:U.Queue.declareOkQueue,bindQueue:U.Queue.bindQueue,bindOkQueue:U.Queue.bindOkQueue,unbindQueue:U.Queue.unbindQueue,unbindOkQueue:U.Queue.unbindOkQueue,purgeQueue:U.Queue.purgeQueue,purgeOkQueue:U.Queue.purgeOkQueue,deleteQueue:U.Queue.deleteQueue,deleteOkQueue:U.Queue.deleteOkQueue,qosBasic:U.Basic.qosBasic,qosOkBasic:U.Basic.qosOkBasic,consumeBasic:U.Basic.consumeBasic,consumeOkBasic:U.Basic.consumeOkBasic,cancelBasic:U.Basic.cancelBasic,cancelOkBasic:U.Basic.cancelOkBasic,publishBasic:U.Basic.publishBasic,returnBasic:U.Basic.returnBasic,deliverBasic:U.Basic.deliverBasic,getBasic:U.Basic.getBasic,getOkBasic:U.Basic.getOkBasic,getEmptyBasic:U.Basic.getEmptyBasic,ackBasic:U.Basic.ackBasic,rejectBasic:U.Basic.rejectBasic,recoverAsyncBasic:U.Basic.recoverAsyncBasic,recoverBasic:U.Basic.recoverBasic,recoverOkBasic:U.Basic.recoverOkBasic,selectTx:U.Tx.selectTx,selectOkTx:U.Tx.selectOkTx,commitTx:U.Tx.commitTx,commitOkTx:U.Tx.commitOkTx,rollbackTx:U.Tx.rollbackTx,rollbackOkTx:U.Tx.rollbackOkTx};
var ap=function(az){this.array=az||[];
this._mark=-1;
this.limit=this.capacity=this.array.length;
this.order=ByteOrder.BIG_ENDIAN;
this.bitCount=0
};
ap.prototype=new ByteBuffer();
var w=function(aA,az){if(!aA){throw (new Error(az))
}};
var q={octet:"Unsigned","short":"UnsignedShort","long":"UnsignedInt",longlong:"UnsignedLong","int":"Int",table:"Table",longstr:"LongString",shortstr:"ShortString",bit:"Bit",fieldtable:"FieldTable"};
var O={F:"fieldtable",S:"longstr",I:"int"};
var ac={longstr:"S","int":"I"};
var F=function(aE,aB){var aA=new ap();
aA.putShortString("LOGIN");
aA.putTypeIdentifier("longstr");
aA.putLongString(aE);
aA.putShortString("PASSWORD");
aA.putTypeIdentifier("longstr");
aA.putLongString(aB);
aA.rewind();
var az=aA.remaining();
var aD=[];
for(var aC=0;
aC<az;
aC++){aD.push(String.fromCharCode(aA.getUnsigned()))
}return aD.join("")
};
var D=function(aA,az){throw (new Error("not implemented"))
};
ap.prototype.getLongString=function(){var az=this.getUnsignedInt();
var aB=[];
for(var aA=0;
aA<az;
aA++){aB.push(String.fromCharCode(this.getUnsigned()))
}return aB.join("")
};
ap.prototype.getShortString=function(){var az=this.getUnsigned();
var aB=[];
for(var aA=0;
aA<az;
aA++){aB.push(String.fromCharCode(this.getUnsigned()))
}return aB.join("")
};
ap.prototype.getTypeIdentifier=function(){var az=this.getUnsigned();
return O[String.fromCharCode(az)]
};
ap.prototype.putTypeIdentifier=function(aA){var az=ac[aA];
this.putUnsigned(az.charCodeAt(0))
};
ap.prototype.getFieldValue=function(){var az=this.getUnsigned();
switch(String.fromCharCode(az)){case"t":return !!this.getUnsigned();
default:throw new Error("Decoding Error in AmqpBuffer: cannot decode field value")
}};
ap.prototype.getFieldTable=function(){var az=this.getUnsignedInt();
var aD={};
var aA=this.position;
while(az>(this.position-aA)){var aB=this.getShortString();
var aC=this.getFieldValue();
aD[aB]=aC
}return aD
};
ap.prototype.getTable=function(){var aC=[];
var az=this.getUnsignedInt();
var aA=new ap(this.array.slice(this.position,this.position+az));
this.position+=az;
while(aA.remaining()){var aD={};
aD.key=aA.getShortString();
var aB=aA.getTypeIdentifier();
aD.value=aA["get"+q[aB]]();
aC.push(aD)
}return aC
};
ap.prototype.getBit=function(az){return this.getUnsigned()
};
ap.prototype.putBit=function(aA){if(this.bitCount>0){var az=this.array[this.position-1];
az=aA<<this.bitCount|az;
this.array[this.position-1]=az
}else{this.putUnsigned(aA)
}};
ap.prototype.putUnsignedLong=function(az){this.putInt(0);
return this.putUnsignedInt(az)
};
ap.prototype.getUnsignedLong=function(az){this.getInt();
return this.getUnsignedInt()
};
ap.prototype.putLongString=function(aA){this.putUnsignedInt(aA.length);
for(var az=0;
az<aA.length;
az++){this.putUnsigned(aA.charCodeAt(az))
}};
ap.prototype.putShortString=function(aA){this.putUnsigned(aA.length);
for(var az=0;
az<aA.length;
az++){this.putUnsigned(aA.charCodeAt(az))
}};
ap.prototype.putTable=function(aC){if(!aC){this.putUnsignedInt(0);
return this
}var az=new ap();
for(var aA=0;
aA<aC.length;
aA++){var aB=aC[aA];
az.putShortString(aB.key);
az.putTypeIdentifier(aB.type);
az["put"+q[aB.type]](aB.value)
}az.rewind();
this.putUnsignedInt(az.remaining());
this.putBuffer(az);
return this
};
ap.prototype.getFrameHeader=function(){var az=this.getUnsigned();
var aB=this.getUnsignedShort();
var aA=this.getUnsignedInt();
var aC={};
aC.type=az;
aC.size=aA;
aC.channel=aB;
return aC
};
ap.prototype.getFrame=function(){var aH=this.position;
var aB={};
if(this.remaining()>7){aB.header=this.getFrameHeader();
aB.channel=aB.header.channel;
aB.type=aB.header.type;
if(this.remaining()>=aB.header.size+1){switch(aB.type){case M.FRAME_BODY.value:var aF=new ap(this.array.slice(this.position,this.position+aB.header.size));
this.position+=aB.header.size;
aB.body=aF;
aB.methodName="body";
break;
case M.FRAME_HEADER.value:var aJ=this.getUnsignedShort();
var aE=this.getUnsignedShort();
var aA=this.getUnsignedLong();
aB.contentProperties=this.getContentProperties();
aB.methodName="header";
break;
case M.FRAME_METHOD.value:var aJ=this.getUnsignedShort();
var aG=this.getUnsignedShort();
var aD=I[aJ].className;
var aI=I[aJ].methodLookup[aG];
var az=I[aJ][aI];
var aC=I[aJ][aI].allParameters;
aB.methodName=aI;
aB.args=this.getMethodArguments(aC);
break;
default:throw (new Error("getFrame: This AMQP frame type is unknown or has not been implemented"))
}w((this.getUnsigned()===M.FRAME_END.value),"AMQP: Frame terminator missing")
}else{this.position=aH;
return null
}return aB
}return null
};
ap.prototype.putFrame=function(aA,aB,aC){this.putUnsigned(aA);
this.putUnsignedShort(aB);
var az=aC.remaining();
this.putUnsignedInt(az);
this.putBuffer(aC);
this.putUnsigned(M.FRAME_END.value);
return this
};
ap.prototype.putMethodFrame=function(aC,aA,az){var aB=new ap();
aB.putUnsignedShort(aC.classIndex);
aB.putUnsignedShort(aC.index);
aB.putMethodArguments(az,aC.allParameters);
aB.flip();
return this.putFrame(M.FRAME_METHOD.value,aA,aB)
};
ap.prototype.putHeaderFrame=function(aC,aB,aD,az,aA){var aE=new ap();
aE.putUnsignedShort(aB);
aE.putUnsignedShort(aD);
aE.putUnsignedLong(az);
aE.putContentProperties(aA);
aE.flip();
return this.putFrame(M.FRAME_HEADER.value,aC,aE)
};
ap.prototype.putBodyFrame=function(az,aA){return this.putFrame(M.FRAME_BODY.value,az,aA)
};
ap.prototype.putHeartbeat=function(){throw (new Error("not implemented"))
};
ap.prototype.putMethodArguments=function(aA,aD){for(var aB=0;
aB<aD.length;
aB++){var aF=aD[aB];
var az=aF.type;
var aE=g[az];
if(aE){var aC=aE.type
}else{throw (new Error("Unknown AMQP domain "+az))
}this["put"+q[aC]](aA[aB]);
this.bitCount=(aC==="bit")?this.bitCount+1:0
}return this
};
ap.prototype.getMethodArguments=function(aA){var aE=[];
for(var aB=0;
aB<aA.length;
aB++){var az=aA[aB];
var aH=az.type;
var aD=g[aH].type;
var aG={};
aG.type=aD;
aG.name=az.name;
try{var aF=this["get"+q[aD]]()
}catch(aC){throw (new Error("type codec failed for type "+aD+" for domain "+aH))
}this.bitCount=(aD==="bit")?this.bitCount+1:0;
aG.value=aF;
aE.push(aG)
}return aE
};
ap.prototype.putArgument=function(aA,az){var aC=g[aA];
if(aC){var aB=aC.type
}else{throw (new Error("Unknown AMQP domain "+dtype))
}this["put"+q[aB]](az)
};
ap.prototype.getArgument=function(az){try{return this["get"+q[az]]()
}catch(aA){throw (new Error("type codec failed for type "+az+" for domain "+dtype))
}};
ap.prototype.getContentProperties=function(){var aH={};
var aG=[];
var aB=this.getUnsignedShort();
for(var aD=0;
aD<=16;
aD++){var aF=(aB>>(aD))&1;
if(aF){aG.unshift(aD+1)
}}for(var aD=0;
aD<aG.length;
aD++){var aC=16-aG[aD];
var aE=_basicProperties[aC].name;
var aA=_basicProperties[aC].domain;
var az=g[aA];
aH[aE]=this.getArgument(az.type)
}return aH
};
ap.prototype.putContentProperties=function(aG){if(!aG){return this.putUnsignedShort(0)
}var aA=0;
var aF=[];
for(var aD=0;
aD<_basicProperties.length;
aD++){var aE=_basicProperties[aD].name;
var aC=_basicProperties[aD].domain;
var aB=aG[aE];
if(typeof(aB)!=="undefined"){aF.push({propertyName:aE,propertyValue:aB,domain:aC});
aA=aA<<1|1
}else{aA=aA<<1
}}aA=aA<<2;
this.putUnsignedShort(aA);
for(var aD=0;
aD<aF.length;
aD++){var aH=aF[aD];
var az=aH.domain;
this.putArgument(az,aH.propertyValue)
}return this
};
AmqpClient.prototype=new e();
var ai=AmqpClient.prototype;
ai.CLOSED=0;
ai.OPEN=1;
ai.CONNECTING=2;
ai.getReadyState=function(){return this._readyState
};
ai.setReadyState=function(az){this._readyState=az
};
ai.onopen=function(az){};
ai.onclose=function(az){};
ai.onerror=function(az){};
var w=function(aA,az){if(!aA){throw (new Error(az))
}};
ai._init=function(){this._initAsyncClient();
this._buffer=new ap();
this._channels={};
this._channelCount=0;
this._stateMachine.addState("handshaking",[{inputs:["startConnectionFrame"],targetState:"starting"},{inputs:["closeConnectionFrame"],targetState:"closing"}],ad);
this._stateMachine.addState("starting",[{inputs:["startOkConnectionAction"],targetState:"started"}],B);
this._stateMachine.addState("started",[{inputs:["tuneConnectionFrame"],targetState:"tuning"}]);
this._stateMachine.addState("tuning",[{inputs:["tuneOkConnectionAction"],targetState:"tuned"}],N,o);
this._stateMachine.addState("tuned",[{inputs:["openConnectionAction"],targetState:"opening"}]);
this._stateMachine.addState("opening",[{inputs:["openOkConnectionFrame"],targetState:"ready"}],n,au);
this._stateMachine.addState("ready",[{inputs:["openOkChannelFrame","closeChannelFrame","closeOkChannelFrame","flowOkChannelFrame","flowChannelFrame","declareOkExchangeFrame","declareOkQueueFrame","bindOkQueueFrame","unbindOkQueueFrame","deleteOkQueueFrame","deleteOkExchangeFrame","commitOkTxFrame","rollbackOkTxFrame","selectOkTxFrame","purgeOkQueueFrame","cancelOkBasicFrame","getOkBasicFrame","getEmptyBasicFrame","consumeOkBasicFrame","recoverOkBasicFrame","rejectOkBasicFrame","deliverBasicFrame","bodyFrame","headerFrame"],targetState:"ready"},{inputs:["closeConnectionFrame","closeConnectionAction"],targetState:"closing"}],aw);
this._stateMachine.addState("closing",[{inputs:["closeOkConnectionFrame","closeOkConnectionAction"],targetState:"closed"}],au,null);
this._stateMachine.addState("closed",[],y,null)
};
var J={"0-9-1":[65,77,81,80,0,0,9,1]};
ai.connect=function at(aB,az,aC,aE){if(this._socket){throw (new Error("AmqpClient already connected."))
}var aD;
if(typeof(aB)==="string"){aD=[aB]
}else{aD=aB
}this.setReadyState(this.CONNECTING);
var aA={url:aD[0],virtualHost:az,credentials:aC};
this._openContinuation=aE;
this._hasNegotiated=false;
ak(this,aD[0],az,aC)
};
var E=ai.connect;
ai.connect=function(aB,aD){if(typeof aB=="object"){myConfig=aB||{};
var aA=myConfig.url;
var az=myConfig.virtualHost;
var aC=myConfig.credentials;
if(!aA||typeof aA!="string"){throw new Error("AmqpClient.connect(): Parameter 'url' is required")
}if(!az||typeof aA!="string"){throw new Error("AmqpClient.connect(): Parameter 'virtualHost' is required")
}if(!aC||!aC.username||!aC.password||typeof aC.username!="string"||typeof aC.password!="string"){throw new Error("AmqpClient.connect(): credentials are required")
}E.call(this,aA,az,aC,aD)
}else{E.apply(this,arguments)
}};
ai.disconnect=function Y(){if(this.getReadyState()==this.OPEN){p(this,0,"",0,0)
}if(this.getReadyState()==this.CONNECTING){var aA={};
aA.methodName="closeConnection";
aA.type="closeConnection";
aA.args="";
var az=new AmqpEvent(this,aA);
this.dispatchEvent(az)
}this.setReadyState(this.CLOSED)
};
ai.openChannel=function m(aB){var aA=++this._channelCount;
var az=new ay();
K(az,aA,this,aB);
this._channels[aA]=az;
return az
};
var h=function(az){var aA=new ByteBuffer(J["0-9-1"]);
az._socket.send(aA)
};
var t=function(az){y(az)
};
var al=function(aB,az){if(az.remaining()<aB.length){return false
}else{var aC=az.limit;
az.limit=aB.length;
var aA=az.getString(Charset.UTF8);
az.limit=aC;
return aB===aA
}};
var ag=function(aB,aF){var aD=aB._buffer;
aD.mark();
aD.position=aD.limit;
aD.putBuffer(aF.data);
aD.reset();
if(!aB._hasNegotiated&&aD.remaining()>7){if(al("AMQP",aD)){var aA=[aD.get(),aD.get(),aD.get(),aD.get()];
var aC={args:[{name:"replyText",value:"Server does not support AMQP protocol versions after "+aA[2]+"-"+aA[3]}],methodName:"closeOkConnection"};
var az={};
az.methodName="error";
az.args=aC.args;
aB.dispatchEvent(new AmqpEvent(aB,az));
y(aB,"",aC);
return
}else{aD.reset();
aB._hasNegotiated=true
}}var aG=null;
while(aG=aD.getFrame()){var aE=aG;
aB._stateMachine.feedInput(aE.methodName+"Frame",aE)
}aD.compact()
};
var af=function(aA,az){aA._socket.send(az)
};
var Z=function an(aA,az,aE,aC){var aB=new ap();
var aD=az.classIndex;
aB.putMethodFrame(az,aE,aC);
aB.flip();
af(aA,aB)
};
var ad=function ad(aB,aA,aC,aD){var az=new ByteSocket(aC.url);
az.onopen=function(){h(aB)
};
az.onclose=function(){t(aB)
};
az.onmessage=function(aE){ag(aB,aE)
};
aB._socket=az;
aB._virtualHost=aC.virtualHost;
aB._credentialsOrKey=aC.credentials
};
var Q=null;
var B=function(aD,aG,az){w((az.channel===0),M.UNEXPECTED_FRAME.message);
var aB=new ap();
var aC=new AmqpArguments();
aC.addLongString("library","KaazingAmqpClient");
aC.addLongString("library_version","3.3.0");
aC.addLongString("library_platform","JavaScript");
var aH=aD._locale||"en_US";
var aF="AMQPLAIN";
var aA=aD._credentialsOrKey;
if(typeof(aA.resolve)!="function"){var aE=F(aA.username,aA.password);
Q(aD,aC,aF,aE,aH)
}else{aA.resolve(function(aJ){var aI=F(aJ.username,aJ.password);
Q(aD,aC,aF,aI,aH)
})
}};
var N=function(az,aA,aE){w((aE.channel===0),M.UNEXPECTED_FRAME.message);
var aB=aE.args[0].value;
var aD=aE.args[1].value;
var aC=0;
C(az,aB,aD,aC);
T(az,az._virtualHost,az._openContinuation,az._openErrorCb)
};
var au=function au(aC,aB,aE){if(aE){if(aE.actionName&&(aE.actionName=="closeConnection")){return
}}if(aB==="nowaitAction"){aC._waitingAction=null;
return
}var aA={};
if(!aA._connection){aA=aC
}else{aA=aC._connection
}var aD=new AmqpEvent(aC,aE);
if(aC._waitingAction){if(aB==="closeChannelFrame"){aC._waitingAction.error(aD)
}else{if(aE.methodName=="closeConnection"){var az={};
az.methodName="error";
az.args=aE.args;
aA.dispatchEvent(new AmqpEvent(aA,az));
y(aA,"",aE);
return
}else{if(aE.methodName=="openOkConnection"){aA.setReadyState(aA.OPEN)
}else{aC._waitingAction.continuation(aD)
}}}}else{throw (new Error("AmqpClient not in waiting state: protocol violation"))
}aC.dispatchEvent(aD);
if(aE.methodName=="openOkConnection"){aA._openContinuation()
}};
var o=function o(az,aA,aC){var aB=az;
setTimeout(function(){aB._processActions()
},0)
};
var aw=function L(az,aA,aC){if(aC.channel===0){}else{if(az._channels[aC.channel]){var aB=az._channels[aC.channel];
z(aB,aA,aC)
}else{}}};
var f=function f(aA,az,aB){};
var y=function y(aB,az,aE){if(!(aB.getReadyState()==aB.CONNECTING)){var aD;
if(typeof(aE)==="undefined"){aD=new AmqpEvent(aB,{args:[],methodName:"closeOkConnection"})
}else{aE.methodName="closeOkConnection";
aD=new AmqpEvent(aB,aE)
}aB.dispatchEvent(aD)
}aB.setReadyState(aB.CLOSED);
if(typeof(aB._channels)!=="undefined"){for(var aA in aB._channels){var aC=aB._channels[aA];
aC.dispatchEvent(aD)
}aB._socket.onclose=function(){};
aB._socket.close()
}if(typeof(aB._openErrorCb)!=="undefined"){aB._openErrorCb(aD)
}};
function ak(aD,aB,az,aC){var aA={url:aB,virtualHost:az,credentials:aC};
aD._stateMachine.enterState("handshaking","",aA)
}var K=function K(aB,aC,aA,az){aB._id=aC;
aB._callbacks=az;
aB._connection=aA;
aB._transacted=false;
aB._waitingAction=null;
aB._initAsyncClient();
aB._stateMachine.addState("channelReady",[{inputs:["openChannelAction","closeChannelAction","consumeBasicAction","flowChannelAction","declareExchangeAction","declareQueueAction","bindQueueAction","unbindQueueAction","deleteQueueAction","deleteExchangeAction","purgeQueueAction","cancelBasicAction","recoverBasicAction","rejectBasicAction","selectTxAction","commitTxAction","rollbackTxAction",],targetState:"waiting"},{inputs:["publishBasicAction","ackBasicAction"],targetState:"channelReady"},{inputs:["getBasicAction"],targetState:"getting"},{inputs:["deliverBasicFrame"],targetState:"readingContentHeader"}],o);
aB._stateMachine.addState("getting",[{inputs:["getOkBasicFrame"],targetState:"readingContentHeader"},{inputs:["getEmptyBasicFrame"],targetState:"channelReady"},{inputs:["closeChannelFrame"],targetState:"closing"}],n,V);
aB._stateMachine.addState("waiting",[{inputs:["openOkChannelFrame","closeOkChannelFrame","flowOkChannelFrame","declareOkExchangeFrame","declareOkQueueFrame","bindOkQueueFrame","unbindOkQueueFrame","deleteOkQueueFrame","deleteOkExchangeFrame","purgeOkQueueFrame","cancelOkBasicFrame","recoverOkBasicFrame","rejectOkBasicFrame","commitOkTxFrame","rollbackOkTxFrame","selectOkTxFrame","getOkBasicFrame","getEmptyBasicFrame","consumeOkBasicFrame","nowaitAction"],targetState:"channelReady"},{inputs:["closeChannelFrame"],targetState:"closing"}],n,au);
aB._stateMachine.addState("readingContentHeader",[{inputs:["headerFrame"],targetState:"readingContentBody"}],W,H);
aB._stateMachine.addState("readingContentBody",[{inputs:["bodyFrame"],targetState:"channelReady"}],null,av);
aB._stateMachine.addState("closing",[{inputs:["closeOkChannelAction"],targetState:"closed"}],null);
aB._stateMachine.addState("closed",null,null);
if(aA.getReadyState()==aA.OPEN){m(aB,[az])
}};
var ay=function(){};
ay.prototype=new e();
var ai=ay.prototype;
ai._init=function(az){};
var b=function b(aE,aG,aB,aF,aD,aA){var az=new ap();
var aH=aG.classIndex;
az.putMethodFrame(aG,aB,aF);
if(aG.hasContent){var aC=0;
az.putHeaderFrame(aB,aH,aC,aD.remaining(),aA);
if(aD.remaining()>0){az.putBodyFrame(aB,aD)
}}az.flip();
af(aE._connection,az)
};
var z=function z(aC,aB,aD){if(aD){var aA=aD.methodName||"";
if(aA=="closeChannel"){var az={};
az.methodName="error";
az.type="error";
az.args=aD.args;
aC.dispatchEvent(new AmqpEvent(aC,az));
aC.dispatchEvent(new AmqpEvent(aC,aD));
return
}}aC._stateMachine.feedInput(aB,aD)
};
var av=function av(az,aA,aC){aC.args=az._headerFrame.args;
aC.methodName=az._headerFrame.methodName;
var aB=new AmqpEvent(az,aC,az._headerFrame.contentProperties);
if(aC.methodName==="getOkBasic"){az._waitingAction.continuation(aB)
}az.dispatchEvent(aB)
};
var W=function W(az,aA,aB){az._headerFrame=aB
};
var H=function H(az,aA,aB){az._headerFrame.contentProperties=aB.contentProperties
};
var V=function(aA,az,aC){var aB=new AmqpEvent(aA,aC);
if(aA._waitingAction){if(az==="closeChannelFrame"){aA._waitingAction.error(aB);
aA.dispatchEvent(aB);
aA._waitingAction=null
}else{if(az==="getEmptyBasicFrame"){aA._waitingAction.continuation(aB);
aA.dispatchEvent(aB);
aA._waitingAction=null
}}}else{throw new Error("AmqpClient not in waiting state: protocol violation")
}};
var n=function n(aA,az,aB){var aC=aB.args[1];
if(aC.synchronous){aA._waitingAction=aB
}else{throw (new Error("AMQP: trying to enter wait state for method that is not sychronous"))
}};
ay.prototype.flowFlag=true;
ay.prototype.onmessage=function(az){};
ay.prototype.onclose=function(az){};
ay.prototype.onerror=function(az){};
ay.prototype.onopen=function(az){};
ay.prototype.ondeclarequeue=function(az){};
ay.prototype.ondeclareexchange=function(az){};
ay.prototype.onflow=function(az){};
ay.prototype.onbindqueue=function(az){};
ay.prototype.onunbindqueue=function(az){};
ay.prototype.ondeletequeue=function(az){};
ay.prototype.ondeleteexchange=function(az){};
ay.prototype.onconsume=function(az){};
ay.prototype.oncancel=function(az){};
ay.prototype.oncommittransaction=function(az){};
ay.prototype.onrollbacktransaction=function(az){};
ay.prototype.onselecttransaction=function(az){};
ay.prototype.onget=function(az){};
ay.prototype.onpurgequeue=function(az){};
ay.prototype.onrecover=function(az){};
ay.prototype.onreject=function(az){};
var Q=function(aG,aF,aD,aB,az,aE){var aC=[aF,aD,aB,az];
var aA="startOkConnection";
aG._enqueueAction(aA,Z,[aG,X[aA],0,aC],aE);
return aG
};
var A=function(aD,aA,aC){var aB=[aA];
var az="secureOkConnection";
aD._enqueueAction(az,Z,[aD,X[az],0,aB],aC);
return aD
};
var C=function(aF,aB,aD,aC,aE){var aA=[aB,aD,aC];
var az="tuneOkConnection";
aF._enqueueAction(az,Z,[aF,X[az],0,aA],aE);
return aF
};
var T=function(aD,az,aC){var aB=[az,0,0];
var aA="openConnection";
aD._enqueueAction(aA,Z,[aD,X[aA],0,aB],aC);
return aD
};
var p=function(aG,aE,aA,aD,az,aF){var aC=[aE,aA,aD,az];
var aB="closeConnection";
aG._enqueueAction(aB,Z,[aG,X[aB],0,aC],aF);
return aG
};
var u=function(aC,aB){var aA=[];
var az="closeOkConnection";
aC._enqueueAction(az,Z,[aC,X[az],0,aA],aB);
return aC
};
ay.prototype.openChannel=function(aD){var aC=[0];
var aA="openChannel";
var az=X[aA];
var aB=false;
if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aA,b,[this,az,this._id,aC],aD)
}if(aA=="flowChannel"){ay.prototype.flowFlag=active
}if(aB){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
ay.prototype.flowChannel=function(aF,aG){var aD=[aF];
var aB="flowChannel";
var az=X[aB];
var aC=false;
for(var aE=0;
aE<az.allParameters.length;
aE++){var aA=az.allParameters[aE].name;
if(aA="noWait"){aC=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aB,b,[this,az,this._id,aD],aG)
}if(aB=="flowChannel"){ay.prototype.flowFlag=aF
}if(aC){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
ay.prototype.flowOkChannel=function(aF,aG){var aD=[aF];
var aB="flowOkChannel";
var az=X[aB];
var aC=false;
for(var aE=0;
aE<az.allParameters.length;
aE++){var aA=az.allParameters[aE].name;
if(aA="noWait"){aC=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aB,b,[this,az,this._id,aD],aG)
}if(aB=="flowChannel"){ay.prototype.flowFlag=aF
}if(aC){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
ay.prototype.closeChannel=function(aJ,aF,aD,aG,aI){var aB=[aJ,aF,aD,aG];
var aH="closeChannel";
var aE=X[aH];
var aA=false;
for(var az=0;
az<aE.allParameters.length;
az++){var aC=aE.allParameters[az].name;
if(aC="noWait"){aA=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aH,b,[this,aE,this._id,aB],aI)
}if(aH=="flowChannel"){ay.prototype.flowFlag=active
}if(aA){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
ay.prototype.closeOkChannel=function(aD){var aC=[];
var aA="closeOkChannel";
var az=X[aA];
var aB=false;
if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aA,b,[this,az,this._id,aC],aD)
}if(aA=="flowChannel"){ay.prototype.flowFlag=active
}if(aB){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
ay.prototype.declareExchange=function(aC,aH,aJ,aA,aL,az,aK){var aE=[0,aC,aH,aJ,aA,0,0,aL,az];
var aI="declareExchange";
var aG=X[aI];
var aD=false;
for(var aB=0;
aB<aG.allParameters.length;
aB++){var aF=aG.allParameters[aB].name;
if(aF="noWait"){aD=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aI,b,[this,aG,this._id,aE],aK)
}if(aI=="flowChannel"){ay.prototype.flowFlag=active
}if(aD){if(typeof(aL)!=="undefined"&&aL){this._enqueueAction("nowait")
}}return this
};
ay.prototype.deleteExchange=function(aA,aI,aH,aG){var aC=[0,aA,aI,aH];
var aF="deleteExchange";
var aE=X[aF];
var aB=false;
for(var az=0;
az<aE.allParameters.length;
az++){var aD=aE.allParameters[az].name;
if(aD="noWait"){aB=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aF,b,[this,aE,this._id,aC],aG)
}if(aF=="flowChannel"){ay.prototype.flowFlag=active
}if(aB){if(typeof(aH)!=="undefined"&&aH){this._enqueueAction("nowait")
}}return this
};
ay.prototype.declareQueue=function(aD,aJ,aB,az,aM,aL,aA,aK){var aF=[0,aD,aJ,aB,az,aM,aL,aA];
var aI="declareQueue";
var aH=X[aI];
var aE=false;
for(var aC=0;
aC<aH.allParameters.length;
aC++){var aG=aH.allParameters[aC].name;
if(aG="noWait"){aE=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aI,b,[this,aH,this._id,aF],aK)
}if(aI=="flowChannel"){ay.prototype.flowFlag=active
}if(aE){if(typeof(aL)!=="undefined"&&aL){this._enqueueAction("nowait")
}}return this
};
ay.prototype.bindQueue=function(aC,aD,aB,aK,az,aJ){var aF=[0,aC,aD,aB,aK,az];
var aI="bindQueue";
var aH=X[aI];
var aE=false;
for(var aA=0;
aA<aH.allParameters.length;
aA++){var aG=aH.allParameters[aA].name;
if(aG="noWait"){aE=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aI,b,[this,aH,this._id,aF],aJ)
}if(aI=="flowChannel"){ay.prototype.flowFlag=active
}if(aE){if(typeof(aK)!=="undefined"&&aK){this._enqueueAction("nowait")
}}return this
};
ay.prototype.unbindQueue=function(aC,aD,aB,az,aJ){var aF=[0,aC,aD,aB,az];
var aI="unbindQueue";
var aH=X[aI];
var aE=false;
for(var aA=0;
aA<aH.allParameters.length;
aA++){var aG=aH.allParameters[aA].name;
if(aG="noWait"){aE=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aI,b,[this,aH,this._id,aF],aJ)
}if(aI=="flowChannel"){ay.prototype.flowFlag=active
}if(aE){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
ay.prototype.purgeQueue=function(aA,aH,aG){var aC=[0,aA,aH];
var aF="purgeQueue";
var aE=X[aF];
var aB=false;
for(var az=0;
az<aE.allParameters.length;
az++){var aD=aE.allParameters[az].name;
if(aD="noWait"){aB=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aF,b,[this,aE,this._id,aC],aG)
}if(aF=="flowChannel"){ay.prototype.flowFlag=active
}if(aB){if(typeof(aH)!=="undefined"&&aH){this._enqueueAction("nowait")
}}return this
};
ay.prototype.deleteQueue=function(aB,aJ,aA,aI,aH){var aD=[0,aB,aJ,aA,aI];
var aG="deleteQueue";
var aF=X[aG];
var aC=false;
for(var az=0;
az<aF.allParameters.length;
az++){var aE=aF.allParameters[az].name;
if(aE="noWait"){aC=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aG,b,[this,aF,this._id,aD],aH)
}if(aG=="flowChannel"){ay.prototype.flowFlag=active
}if(aC){if(typeof(aI)!=="undefined"&&aI){this._enqueueAction("nowait")
}}return this
};
ay.prototype.qosBasic=function(aA,aH,az,aI){var aD=[aA,aH,az];
var aG="qosBasic";
var aF=X[aG];
var aC=false;
for(var aB=0;
aB<aF.allParameters.length;
aB++){var aE=aF.allParameters[aB].name;
if(aE="noWait"){aC=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aG,b,[this,aF,this._id,aD],aI)
}if(aG=="flowChannel"){ay.prototype.flowFlag=active
}if(aC){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
ay.prototype.consumeBasic=function(aF,az,aC,aE,aA,aM,aB,aL){var aH=[0,aF,az,aC,aE,aA,aM,aB];
var aK="consumeBasic";
var aJ=X[aK];
var aG=false;
for(var aD=0;
aD<aJ.allParameters.length;
aD++){var aI=aJ.allParameters[aD].name;
if(aI="noWait"){aG=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aK,b,[this,aJ,this._id,aH],aL)
}if(aK=="flowChannel"){ay.prototype.flowFlag=active
}if(aG){if(typeof(aM)!=="undefined"&&aM){this._enqueueAction("nowait")
}}return this
};
ay.prototype.cancelBasic=function(az,aH,aG){var aC=[az,aH];
var aF="cancelBasic";
var aE=X[aF];
var aB=false;
for(var aA=0;
aA<aE.allParameters.length;
aA++){var aD=aE.allParameters[aA].name;
if(aD="noWait"){aB=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aF,b,[this,aE,this._id,aC],aG)
}if(aF=="flowChannel"){ay.prototype.flowFlag=active
}if(aB){if(typeof(aH)!=="undefined"&&aH){this._enqueueAction("nowait")
}}return this
};
ay.prototype.publishBasic=function(aE,az,aF,aC,aD,aA,aL){var aH=[0,aF,aC,aD,aA];
var aK="publishBasic";
var aJ=X[aK];
var aG=false;
for(var aB=0;
aB<aJ.allParameters.length;
aB++){var aI=aJ.allParameters[aB].name;
if(aI="noWait"){aG=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aK,b,[this,aJ,this._id,aH,aE,az],aL)
}if(aK=="flowChannel"){ay.prototype.flowFlag=active
}if(aG){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
ay.prototype.getBasic=function(aB,aA,aH){var aD=[0,aB,aA];
var aG="getBasic";
var aF=X[aG];
var aC=false;
for(var az=0;
az<aF.allParameters.length;
az++){var aE=aF.allParameters[az].name;
if(aE="noWait"){aC=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aG,b,[this,aF,this._id,aD],aH)
}if(aG=="flowChannel"){ay.prototype.flowFlag=active
}if(aC){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
ay.prototype.ackBasic=function(aE,aH,aG){var aB=[aE,aH];
var aF="ackBasic";
var aD=X[aF];
var aA=false;
for(var az=0;
az<aD.allParameters.length;
az++){var aC=aD.allParameters[az].name;
if(aC="noWait"){aA=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aF,b,[this,aD,this._id,aB],aG)
}if(aF=="flowChannel"){ay.prototype.flowFlag=active
}if(aA){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
ay.prototype.rejectBasic=function(aF,az,aH){var aC=[aF,az];
var aG="rejectBasic";
var aE=X[aG];
var aB=false;
for(var aA=0;
aA<aE.allParameters.length;
aA++){var aD=aE.allParameters[aA].name;
if(aD="noWait"){aB=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aG,b,[this,aE,this._id,aC],aH)
}if(aG=="flowChannel"){ay.prototype.flowFlag=active
}if(aB){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
ay.prototype.recoverBasic=function(aE,aG){var aD=[aE];
var aB="recoverBasic";
var az=X[aB];
var aC=false;
for(var aF=0;
aF<az.allParameters.length;
aF++){var aA=az.allParameters[aF].name;
if(aA="noWait"){aC=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aB,b,[this,az,this._id,aD],aG)
}if(aB=="flowChannel"){ay.prototype.flowFlag=active
}if(aC){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
_basicProperties=[{name:"contentType",domain:"Shortstr",label:"MIME content type"},{name:"contentEncoding",domain:"Shortstr",label:"MIME content encoding"},{name:"headers",domain:"Table",label:"message header field table"},{name:"deliveryMode",domain:"Octet",label:"non-persistent (1) or persistent (2)"},{name:"priority",domain:"Octet",label:"message priority, 0 to 9"},{name:"correlationId",domain:"Shortstr",label:"application correlation identifier"},{name:"replyTo",domain:"Shortstr",label:"address to reply to"},{name:"expiration",domain:"Shortstr",label:"message expiration specification"},{name:"messageId",domain:"Shortstr",label:"application message identifier"},{name:"timestamp",domain:"Timestamp",label:"message timestamp"},{name:"type",domain:"Shortstr",label:"message type name"},{name:"userId",domain:"Shortstr",label:"creating user id"},{name:"appId",domain:"Shortstr",label:"creating application id"},{name:"reserved",domain:"Shortstr",label:"reserved, must be empty"}];
ay.prototype.selectTx=function(aD){var aC=[];
var aA="selectTx";
var az=X[aA];
var aB=false;
if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aA,b,[this,az,this._id,aC],aD)
}if(aA=="flowChannel"){ay.prototype.flowFlag=active
}if(aB){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
ay.prototype.commitTx=function(aD){var aC=[];
var aA="commitTx";
var az=X[aA];
var aB=false;
if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aA,b,[this,az,this._id,aC],aD)
}if(aA=="flowChannel"){ay.prototype.flowFlag=active
}if(aB){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
ay.prototype.rollbackTx=function(aD){var aC=[];
var aA="rollbackTx";
var az=X[aA];
var aB=false;
if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aA,b,[this,az,this._id,aC],aD)
}if(aA=="flowChannel"){ay.prototype.flowFlag=active
}if(aB){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
var S=ay.prototype.openChannel;
var m=function(aA,az){aA._stateMachine.enterState("channelReady","",null);
S.apply(aA,az)
};
delete ay.prototype.openChannel;
var d=ay.prototype.closeOkChannel;
var ar=function(aA,az){d.apply(aA,az)
};
delete ay.prototype.closeOkChannel;
var R=ay.prototype.closeChannel;
ay.prototype.closeChannel=function(aB,aE){if(typeof aB=="object"){myConfig=aB||{};
var aD=myConfig.replyCode||0;
var aA=myConfig.replyText||"";
var aC=myConfig.classId||0;
var az=myConfig.methodId||0;
if(typeof aD!="number"){throw new Error("AmqpChannel.closeChannel(): Parameter 'replyCode' is expected to be of numeric type")
}if(typeof aA!="string"){throw new Error("AmqpChannel.closeChannel(): Parameter 'replyText' is expected to be a string")
}if(typeof aC!="number"){throw new Error("AmqpChannel.closeChannel(): Parameter 'classId' is expected to be of numeric type")
}if(typeof az!="number"){throw new Error("AmqpChannel.closeChannel(): Parameter 'methodId' is expected to be of numeric type")
}return R.call(this,aD,aA,aC,az,aE)
}else{return R.apply(this,arguments)
}};
var ah=ay.prototype.declareExchange;
ay.prototype.declareExchange=function(aC,aG){if(typeof aC=="object"){myConfig=aC||{};
var aA=myConfig.exchange;
var aE=myConfig.type;
var aD=myConfig.passive||false;
var aF=myConfig.durable||false;
var az=myConfig.noWait||false;
var aB=myConfig.args||null;
if(!aA||typeof aA!="string"){throw new Error("AmqpChannel.declareExchange(): String parameter 'exchange' is required")
}if(!aE||typeof aE!="string"||((aE!="fanout")&&(aE!="direct")&&(aE!="topic")&&(aE!="headers"))){throw new Error("AmqpChannel.declareExchange(): Legal values of parameter 'type' are direct | fanout | headers | topic")
}if(typeof aD!="boolean"){throw new Error("AmqpChannel.declareExchange(): Parameter 'passive' only accepts boolean values")
}if(typeof aF!="boolean"){throw new Error("AmqpChannel.declareExchange(): Parameter 'durable' only accepts boolean values")
}if(typeof az!="boolean"){throw new Error("AmqpChannel.declareExchange(): Parameter 'noWait' only accepts boolean values")
}return ah.call(this,aA,aE,aD,aF,az,aB,aG)
}else{return ah.apply(this,arguments)
}};
var ae=ay.prototype.deleteExchange;
ay.prototype.deleteExchange=function(aB,aD){if(typeof aB=="object"){myConfig=aB||{};
var aA=myConfig.exchange;
var aC=myConfig.ifUnused||false;
var az=myConfig.noWait||false;
if(!aA||typeof aA!="string"){throw new Error("AmqpChannel.deleteExchange(): String parameter 'exchange' is required")
}if(typeof aC!="boolean"){throw new Error("AmqpChannel.deleteExchange(): Parameter 'ifUnused' only accepts boolean values")
}if(typeof az!="boolean"){throw new Error("AmqpChannel.deleteExchange(): Parameter 'noWait' only accepts boolean values")
}return ae.call(this,aA,aC,az,aD)
}else{return ae.apply(this,arguments)
}};
var x=ay.prototype.declareQueue;
ay.prototype.declareQueue=function(aB,aF){if(typeof aB=="object"){myConfig=aB||{};
var aC=myConfig.queue;
var aE=myConfig.passive||false;
var aA=myConfig.durable||false;
var az=myConfig.exclusive||false;
var aH=myConfig.autoDelete||false;
var aG=myConfig.noWait||false;
var aD=myConfig.args||null;
if(!aC||typeof aC!="string"){throw new Error("AmqpChannel.declareQueue(): String parameter 'queue' is required")
}if(typeof aE!="boolean"){throw new Error("AmqpChannel.declareQueue(): Parameter 'passive' only accepts boolean values")
}if(typeof aA!="boolean"){throw new Error("AmqpChannel.declareQueue(): Parameter 'durable' only accepts boolean values")
}if(typeof az!="boolean"){throw new Error("AmqpChannel.declareQueue(): Parameter 'exclusive' only accepts boolean values")
}if(typeof aH!="boolean"){throw new Error("AmqpChannel.declareQueue(): Parameter 'autoDelete' only accepts boolean values")
}if(typeof aG!="boolean"){throw new Error("AmqpChannel.declareQueue(): Parameter 'noWait' only accepts boolean values")
}return x.call(this,aC,aE,aA,az,aH,aG,aD,aF)
}else{return x.apply(this,arguments)
}};
var P=ay.prototype.bindQueue;
ay.prototype.bindQueue=function(aD,aF){if(typeof aD=="object"){myConfig=aD||{};
var az=myConfig.queue;
var aB=myConfig.exchange;
var aE=myConfig.routingKey;
var aA=myConfig.noWait||false;
var aC=myConfig.args||null;
if(!az||typeof az!="string"){throw new Error("AmqpChannel.bindQueue(): String parameter 'queue' is required")
}if(!aB||typeof aB!="string"){throw new Error("AmqpChannel.bindQueue(): String parameter 'exchange' is required")
}if(!aE||typeof aE!="string"){throw new Error("AmqpChannel.bindQueue(): String parameter 'routingKey' is required")
}if(typeof aA!="boolean"){throw new Error("AmqpChannel.bindQueue(): Parameter 'noWait' only accepts boolean values")
}return P.call(this,az,aB,aE,aA,aC,aF)
}else{return P.apply(this,arguments)
}};
var ab=ay.prototype.unbindQueue;
ay.prototype.unbindQueue=function(aC,aE){if(typeof aC=="object"){myConfig=aC||{};
var az=myConfig.queue;
var aA=myConfig.exchange;
var aD=myConfig.routingKey;
var aB=myConfig.args||null;
if(!az||typeof az!="string"){throw new Error("AmqpChannel.unbindQueue(): String parameter 'queue' is required")
}if(!aA||typeof aA!="string"){throw new Error("AmqpChannel.unbindQueue(): String parameter 'exchange' is required")
}if(!aD||typeof aD!="string"){throw new Error("AmqpChannel.unbindQueue(): String parameter 'routingKey' is required")
}return ab.call(this,az,aA,aD,aB,aE)
}else{return ab.apply(this,arguments)
}};
var G=ay.prototype.purgeQueue;
ay.prototype.purgeQueue=function(aB,aC){if(typeof aB=="object"){myConfig=aB||{};
var az=myConfig.queue;
var aA=myConfig.noWait||false;
if(!az||typeof az!="string"){throw new Error("AmqpChannel.purgeQueue(): String parameter 'queue' is required")
}if(typeof aA!="boolean"){throw new Error("AmqpChannel.purgeQueue(): Parameter 'noWait' only accepts boolean values")
}return G.call(this,az,aA,aC)
}else{return G.apply(this,arguments)
}};
var aj=ay.prototype.deleteQueue;
ay.prototype.deleteQueue=function(aC,aE){if(typeof aC=="object"){myConfig=aC||{};
var aA=myConfig.queue;
var aD=myConfig.ifUnused||false;
var az=myConfig.ifEmpty||false;
var aB=myConfig.noWait||false;
if(!aA||typeof aA!="string"){throw new Error("AmqpChannel.deleteQueue(): String parameter 'queue' is required")
}if(typeof aD!="boolean"){throw new Error("AmqpChannel.deleteQueue(): Parameter 'ifUnused' only accepts boolean values")
}if(typeof az!="boolean"){throw new Error("AmqpChannel.deleteQueue(): Parameter 'ifEmpty' only accepts boolean values")
}if(typeof aB!="boolean"){throw new Error("AmqpChannel.deleteQueue(): Parameter 'noWait' only accepts boolean values")
}return aj.call(this,aA,aD,az,aB,aE)
}else{return aj.apply(this,arguments)
}};
var am=ay.prototype.qosBasic;
ay.prototype.qosBasic=function(az,aD){if(typeof az=="object"){myConfig=az||{};
var aC=myConfig.prefetchSize||0;
var aA=myConfig.prefetchCount||0;
var aB=myConfig.global||false;
if(typeof aC!="number"){throw new Error("AmqpChannel.qosBasic(): Parameter 'prefetchSize' is expected to be of numeric type")
}if(typeof aA!="number"){throw new Error("AmqpChannel.qosBasic(): Parameter 'prefetchCount' is expected to be of numeric type")
}if(typeof aB!="boolean"){throw new Error("AmqpChannel.qosBasic(): Parameter 'global' only accepts boolean values")
}return am.call(this,aC,aA,aB,aD)
}else{return am.apply(this,arguments)
}};
var aq=ay.prototype.consumeBasic;
ay.prototype.consumeBasic=function(aC,aG){if(typeof aC=="object"){myConfig=aC||{};
var aE=myConfig.queue;
var az=myConfig.consumerTag;
var aB=myConfig.noLocal||false;
var aD=myConfig.noAck||false;
var aA=myConfig.exclusive||false;
var aH=myConfig.noWait||false;
var aF=myConfig.args||null;
if(!aE||typeof aE!="string"){throw new Error("AmqpChannel.consumeBasic(): String parameter 'queue' is required")
}if(!az||typeof az!="string"){throw new Error("AmqpChannel.consumeBasic(): String parameter 'consumerTag' is required")
}if(typeof aB!="boolean"){throw new Error("AmqpChannel.consumeBasic(): Parameter 'noLocal' only accepts boolean values")
}if(typeof aD!="boolean"){throw new Error("AmqpChannel.consumeBasic(): Parameter 'noAck' only accepts boolean values")
}if(typeof aA!="boolean"){throw new Error("AmqpChannel.consumeBasic(): Parameter 'exclusive' only accepts boolean values")
}if(typeof aH!="boolean"){throw new Error("AmqpChannel.consumeBasic(): Parameter 'noWait' only accepts boolean values")
}return aq.call(this,aE,az,aB,aD,aA,aH,aF,aG)
}else{return aq.apply(this,arguments)
}};
var aa=ay.prototype.cancelBasic;
ay.prototype.cancelBasic=function(aA,aC){if(typeof aA=="object"){myConfig=aA||{};
var aB=myConfig.consumerTag;
var az=myConfig.noWait||false;
if(!aB||typeof aB!="string"){throw new Error("AmqpChannel.cancelBasic(): String parameter 'consumerTag' is required")
}if(typeof az!="boolean"){throw new Error("AmqpChannel.cancelBasic(): Parameter 'noWait' only accepts boolean values")
}return aa.call(this,aB,az,aC)
}else{return aa.apply(this,arguments)
}};
var l=ay.prototype.publishBasic;
ay.prototype.publishBasic=function(aC,aG){if(typeof aC=="object"&&aC.body){myConfig=aC||{};
var az=myConfig.body;
var aE=myConfig.headers||{};
var aB=myConfig.exchange;
var aF=myConfig.routingKey;
var aD=myConfig.mandatory||false;
var aA=myConfig.immediate||false;
if(!az){throw new Error("AmqpChannel.publishBasic(): ByteBuffer parameter 'body' is required")
}if(!aB||typeof aB!="string"){throw new Error("AmqpChannel.publishBasic(): String parameter 'exchange' is required")
}if(!aF||typeof aF!="string"){throw new Error("AmqpChannel.publishBasic(): String parameter 'routingKey' is required")
}if(typeof aD!="boolean"){throw new Error("AmqpChannel.publishBasic(): Parameter 'mandatory' only accepts boolean values")
}if(typeof aA!="boolean"){throw new Error("AmqpChannel.publishBasic(): Parameter 'immediate' only accepts boolean values")
}return l.call(this,az,aE,aB,aF,aD,aA,aG)
}else{return l.apply(this,arguments)
}};
var a=ay.prototype.getBasic;
ay.prototype.getBasic=function(aB,aC){if(typeof aB=="object"){myConfig=aB||{};
var az=myConfig.queue;
var aA=myConfig.noAck||false;
if(!az||typeof az!="string"){throw new Error("AmqpChannel.getBasic(): String parameter 'queue' is required")
}if(typeof aA!="boolean"){throw new Error("AmqpChannel.getBasic(): Parameter 'noAck' only accepts boolean values")
}return a.call(this,az,aA,aC)
}else{return a.apply(this,arguments)
}};
var c=ay.prototype.ackBasic;
ay.prototype.ackBasic=function(aA,aC){if(typeof aA=="object"){myConfig=aA||{};
var aB=myConfig.deliveryTag;
var az=myConfig.multiple||false;
if(!aB||typeof aB!="string"){throw new Error("AmqpChannel.ackBasic(): String parameter 'deliveryTag' is required")
}if(typeof az!="boolean"){throw new Error("AmqpChannel.ackBasic(): Parameter 'multiple' only accepts boolean values")
}return c.call(this,aB,az,aC)
}else{return c.apply(this,arguments)
}};
var ax=ay.prototype.rejectBasic;
ay.prototype.rejectBasic=function(aA,aC){if(typeof aA=="object"){myConfig=aA||{};
var aB=myConfig.deliveryTag;
var az=myConfig.requeue||false;
if(!aB||typeof aB!="string"){throw new Error("AmqpChannel.rejectBasic(): String parameter 'deliveryTag' is required")
}if(typeof az!="boolean"){throw new Error("AmqpChannel.rejectBasic(): Parameter 'requeue' only accepts boolean values")
}return ax.call(this,aB,az,aC)
}else{return ax.apply(this,arguments)
}};
var s=function(){this._actionList=new Array();
this.currentAction=0;
this._replayLength=0
};
s.prototype.getActionList=function(){return this._actionList
};
s.prototype.setReplayLength=function(az){this._replayLength=az
};
s.prototype._processActions=function r(){if(!this._actionList.length){return
}if(this.currentAction==this._actionList.length){this.currentAction=0
}var az=this._actionList[this.currentAction];
this.currentAction++;
az.func.apply(az.object,az.args)
};
s.prototype._processAllActions=function k(){for(i=0;
i<this._replayLength;
i++){var az=this._actionList[i];
az.func.apply(az.object,az.args)
}};
s.prototype._processAllNewActions=function ao(){for(i=this._replayLength;
i<this._actionList.length;
i++){var az=this._actionList[i];
az.func.apply(az.object,az.args)
}};
s.prototype._addAction=function j(aA,aC,aD,aB){switch(aA){case"declareExchange":break;
case"declareQueue":break;
case"bindQueue":break;
case"consumeBasic":break;
default:return
}var az=function az(){};
var aE={};
aE.object=aC;
aE.func=aD||az;
aE.args=aB||null;
this._actionList.push(aE)
}
})();
var AmqpArguments=function(){};
AmqpArguments.prototype=new Array();
(function(){var a=AmqpArguments.prototype;
var b=function(g,c,f,d){var e={};
e.key=c;
e.value=f;
e.type=d;
g.push(e)
};
a.addLongString=function(c,d){b(this,c,d,"longstr");
return this
};
a.addInteger=function(c,d){b(this,c,d,"int");
return this
}
})();
(function(){var b=function(c){switch(c){case"deliverBasic":return"message";
case"closeOkChannel":case"closeChannel":case"closeOkConnection":case"closeConnection":return"close";
case"getOkBasic":case"getEmptyBasic":return"get";
case"consumeOkBasic":return"consume";
case"cancelOkBasic":return"cancel";
case"openOkConnection":case"openOkChannel":return"open";
case"declareOkQueue":return"declarequeue";
case"declareOkExchange":return"declareexchange";
case"flowOkChannel":return"flow";
case"bindOkQueue":return"bindqueue";
case"unbindOkQueue":return"unbindqueue";
case"deleteOkQueue":return"deletequeue";
case"deleteOkExchange":return"deleteexchange";
case"commitOkTx":return"committransaction";
case"rollbackOkTx":return"rollbacktransaction";
case"selectOkTx":return"selecttransaction";
case"purgeOkQueue":return"purgequeue";
case"recoverOkBasic":return"recover";
case"rejectOkBasic":return"reject";
case"error":return"error";
default:throw (new Error("AMQP: unknown event name "+c))
}};
AmqpEvent=function(d,f,e){this.type=f.methodName;
this.type=b(this.type);
this.args={};
for(var c=0;
c<f.args.length;
c++){this.args[f.args[c].name]=f.args[c].value
}this.headers=e;
this.body=f.body;
this.target=d;
if(this.type=="error"){this.message=this.args.replyText
}};
var a=AmqpEvent.prototype;
a.type;
a.message;
a.body;
a.headers;
a.target
})();