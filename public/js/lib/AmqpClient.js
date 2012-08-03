/**
 * Copyright (c) 2007-2012, Kaazing Corporation. All rights reserved.
 */

var browser=null;
if(typeof (ActiveXObject)!="undefined"){
browser="ie";
}else{
if(Object.prototype.toString.call(window.opera)=="[object Opera]"){
browser="opera";
}else{
if(navigator.vendor.indexOf("Apple")!=-1){
browser="safari";
if(navigator.userAgent.indexOf("iPad")!=-1||navigator.userAgent.indexOf("iPhone")!=-1){
browser.ios=true;
}
}else{
if(navigator.vendor.indexOf("Google")!=-1){
if(navigator.userAgent.indexOf("Android")!=-1){
browser="android";
}else{
browser="chrome";
}
}else{
if(navigator.product=="Gecko"&&window.find&&!navigator.savePreferences){
browser="firefox";
}else{
throw new Error("couldn't detect browser");
}
}
}
}
}
switch(browser){
case "ie":
(function(){
if(document.createEvent===undefined){
var _1=function(){
};
_1.prototype.initEvent=function(_2,_3,_4){
this.type=_2;
this.bubbles=_3;
this.cancelable=_4;
};
document.createEvent=function(_5){
if(_5!="Events"){
throw new Error("Unsupported event name: "+_5);
}
return new _1();
};
}
document._w_3_c_d_o_m_e_v_e_n_t_s_createElement=document.createElement;
document.createElement=function(_6){
var _7=this._w_3_c_d_o_m_e_v_e_n_t_s_createElement(_6);
if(_7.addEventListener===undefined){
var _8={};
_7.addEventListener=function(_9,_a,_b){
_7.attachEvent("on"+_9,_a);
return addEventListener(_8,_9,_a,_b);
};
_7.removeEventListener=function(_c,_d,_e){
return removeEventListener(_8,_c,_d,_e);
};
_7.dispatchEvent=function(_f){
return dispatchEvent(_8,_f);
};
}
return _7;
};
if(window.addEventListener===undefined){
var _10=document.createElement("div");
var _11=(typeof (postMessage)==="undefined");
window.addEventListener=function(_12,_13,_14){
if(_11&&_12=="message"){
_10.addEventListener(_12,_13,_14);
}else{
window.attachEvent("on"+_12,_13);
}
};
window.removeEventListener=function(_15,_16,_17){
if(_11&&_15=="message"){
_10.removeEventListener(_15,_16,_17);
}else{
window.detachEvent("on"+_15,_16);
}
};
window.dispatchEvent=function(_18){
if(_11&&_18.type=="message"){
_10.dispatchEvent(_18);
}else{
window.fireEvent("on"+_18.type,_18);
}
};
}
function addEventListener(_19,_1a,_1b,_1c){
if(_1c){
throw new Error("Not implemented");
}
var _1d=_19[_1a]||{};
_19[_1a]=_1d;
_1d[_1b]=_1b;
};
function removeEventListener(_1e,_1f,_20,_21){
if(_21){
throw new Error("Not implemented");
}
var _22=_1e[_1f]||{};
delete _22[_20];
};
function dispatchEvent(_23,_24){
var _25=_24.type;
var _26=_23[_25]||{};
for(var key in _26){
if(typeof (_26[key])=="function"){
try{
_26[key](_24);
}
catch(e){
}
}
}
};
})();
break;
case "chrome":
case "android":
case "safari":
if(typeof (window.postMessage)==="undefined"&&typeof (window.dispatchEvent)==="undefined"&&typeof (document.dispatchEvent)==="function"){
window.dispatchEvent=function(_28){
document.dispatchEvent(_28);
};
var addEventListener0=window.addEventListener;
window.addEventListener=function(_29,_2a,_2b){
if(_29==="message"){
document.addEventListener(_29,_2a,_2b);
}else{
addEventListener0.call(window,_29,_2a,_2b);
}
};
var removeEventListener0=window.removeEventListener;
window.removeEventListener=function(_2c,_2d,_2e){
if(_2c==="message"){
document.removeEventListener(_2c,_2d,_2e);
}else{
removeEventListener0.call(window,_2c,_2d,_2e);
}
};
}
break;
case "opera":
var addEventListener0=window.addEventListener;
window.addEventListener=function(_2f,_30,_31){
var _32=_30;
if(_2f==="message"){
_32=function(_33){
if(_33.origin===undefined&&_33.uri!==undefined){
var uri=new URI(_33.uri);
delete uri.path;
delete uri.query;
delete uri.fragment;
_33.origin=uri.toString();
}
return _30(_33);
};
_30._$=_32;
}
addEventListener0.call(window,_2f,_32,_31);
};
var removeEventListener0=window.removeEventListener;
window.removeEventListener=function(_35,_36,_37){
var _38=_36;
if(_35==="message"){
_38=_36._$;
}
removeEventListener0.call(window,_35,_38,_37);
};
break;
}
function URI(str){
str=str||"";
var _3a=0;
var _3b=str.indexOf("://");
if(_3b!=-1){
this.scheme=str.slice(0,_3b);
_3a=_3b+3;
var _3c=str.indexOf("/",_3a);
if(_3c==-1){
_3c=str.length;
str+="/";
}
var _3d=str.slice(_3a,_3c);
this.authority=_3d;
_3a=_3c;
this.host=_3d;
var _3e=_3d.indexOf(":");
if(_3e!=-1){
this.host=_3d.slice(0,_3e);
this.port=parseInt(_3d.slice(_3e+1),10);
if(isNaN(this.port)){
throw new Error("Invalid URI syntax");
}
}
}
var _3f=str.indexOf("?",_3a);
if(_3f!=-1){
this.path=str.slice(_3a,_3f);
_3a=_3f+1;
}
var _40=str.indexOf("#",_3a);
if(_40!=-1){
if(_3f!=-1){
this.query=str.slice(_3a,_40);
}else{
this.path=str.slice(_3a,_40);
}
_3a=_40+1;
this.fragment=str.slice(_3a);
}else{
if(_3f!=-1){
this.query=str.slice(_3a);
}else{
this.path=str.slice(_3a);
}
}
};
(function(){
var _41=URI.prototype;
_41.toString=function(){
var sb=[];
var _43=this.scheme;
if(_43!==undefined){
sb.push(_43);
sb.push("://");
sb.push(this.host);
var _44=this.port;
if(_44!==undefined){
sb.push(":");
sb.push(_44.toString());
}
}
if(this.path!==undefined){
sb.push(this.path);
}
if(this.query!==undefined){
sb.push("?");
sb.push(this.query);
}
if(this.fragment!==undefined){
sb.push("#");
sb.push(this.fragment);
}
return sb.join("");
};
var _45={"http":80,"ws":80,"https":443,"wss":443};
})();
(function(){
Base64={};
Base64.encode=function(_46){
var _47=[];
var _48;
var _49;
var _4a;
while(_46.length){
switch(_46.length){
case 1:
_48=_46.shift();
_47.push(_4b[(_48>>2)&63]);
_47.push(_4b[((_48<<4)&48)]);
_47.push("=");
_47.push("=");
break;
case 2:
_48=_46.shift();
_49=_46.shift();
_47.push(_4b[(_48>>2)&63]);
_47.push(_4b[((_48<<4)&48)|((_49>>4)&15)]);
_47.push(_4b[(_49<<2)&60]);
_47.push("=");
break;
default:
_48=_46.shift();
_49=_46.shift();
_4a=_46.shift();
_47.push(_4b[(_48>>2)&63]);
_47.push(_4b[((_48<<4)&48)|((_49>>4)&15)]);
_47.push(_4b[((_49<<2)&60)|((_4a>>6)&3)]);
_47.push(_4b[_4a&63]);
break;
}
}
return _47.join("");
};
Base64.decode=function(_4c){
if(_4c.length===0){
return [];
}
if(_4c.length%4!==0){
throw new Error("Invalid base64 string (must be quads)");
}
var _4d=[];
for(var i=0;i<_4c.length;i+=4){
var _4f=_4c.charAt(i);
var _50=_4c.charAt(i+1);
var _51=_4c.charAt(i+2);
var _52=_4c.charAt(i+3);
var _53=_54[_4f];
var _55=_54[_50];
var _56=_54[_51];
var _57=_54[_52];
_4d.push(((_53<<2)&252)|((_55>>4)&3));
if(_51!="="){
_4d.push(((_55<<4)&240)|((_56>>2)&15));
if(_52!="="){
_4d.push(((_56<<6)&192)|(_57&63));
}
}
}
return _4d;
};
var _4b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
var _54={"=":0};
for(var i=0;i<_4b.length;i++){
_54[_4b[i]]=i;
}
if(typeof (window.btoa)==="undefined"){
window.btoa=function(s){
var _5a=s.split("");
for(var i=0;i<_5a.length;i++){
_5a[i]=(_5a[i]).charCodeAt();
}
return Base64.encode(_5a);
};
window.atob=function(_5c){
var _5d=Base64.decode(_5c);
for(var i=0;i<_5d.length;i++){
_5d[i]=String.fromCharCode(_5d[i]);
}
return _5d.join("");
};
}
})();
var postMessage0=(function(){
var _5f=new URI((browser=="ie")?document.URL:location.href);
var _60={"http":80,"https":443};
if(_5f.port==null){
_5f.port=_60[_5f.scheme];
_5f.authority=_5f.host+":"+_5f.port;
}
var _61=_5f.scheme+"://"+_5f.authority;
var _62="/.kr";
if(typeof (postMessage)!=="undefined"){
return function(_63,_64,_65){
if(typeof (_64)!="string"){
throw new Error("Unsupported type. Messages must be strings");
}
switch(browser){
case "ie":
case "opera":
case "firefox":
setTimeout(function(){
_63.postMessage(_64,_65);
},0);
break;
default:
_63.postMessage(_64,_65);
break;
}
};
}else{
function MessagePipe(_66){
this.sourceToken=toPaddedHex(Math.floor(Math.random()*(Math.pow(2,32)-1)),8);
this.iframe=_66;
this.bridged=false;
this.lastWrite=0;
this.lastRead=0;
this.lastReadIndex=2;
this.lastSyn=0;
this.lastAck=0;
this.queue=[];
this.escapedFragments=[];
};
var _67=MessagePipe.prototype;
_67.attach=function(_68,_69,_6a,_6b,_6c,_6d){
this.target=_68;
this.targetOrigin=_69;
this.targetToken=_6a;
this.reader=_6b;
this.writer=_6c;
this.writerURL=_6d;
try{
this._lastHash=_6b.location.hash;
this.poll=pollLocationHash;
}
catch(permissionDenied){
this._lastDocumentURL=_6b.document.URL;
this.poll=pollDocumentURL;
}
if(_68==parent){
dequeue(this,true);
}
};
_67.detach=function(){
this.poll=function(){
};
delete this.target;
delete this.targetOrigin;
delete this.reader;
delete this.lastFragment;
delete this.writer;
delete this.writerURL;
};
_67.poll=function(){
};
function pollLocationHash(){
var _6e=this.reader.location.hash;
if(this._lastHash!=_6e){
process(this,_6e.substring(1));
this._lastHash=_6e;
}
};
function pollDocumentURL(){
var _6f=this.reader.document.URL;
if(this._lastDocumentURL!=_6f){
var _70=_6f.indexOf("#");
if(_70!=-1){
process(this,_6f.substring(_70+1));
this._lastDocumentURL=_6f;
}
}
};
_67.post=function(_71,_72,_73){
bridgeIfNecessary(this,_71);
var _74=1000;
var _75=escape(_72);
var _76=[];
while(_75.length>_74){
var _77=_75.substring(0,_74);
_75=_75.substring(_74);
_76.push(_77);
}
_76.push(_75);
this.queue.push([_73,_76]);
if(this.writer!=null&&this.lastAck>=this.lastSyn){
dequeue(this,false);
}
};
function bridgeIfNecessary(_78,_79){
if(_78.lastWrite<1&&!_78.bridged){
if(_79.parent==window){
var src=_78.iframe.src;
var _7b=src.split("#");
var _7c=null;
var _7d=document.getElementsByTagName("meta");
for(var i=0;i<_7d.length;i++){
if(_7d[i].name=="kaazing:resources"){
alert("kaazing:resources is no longer supported. Please refer to the Administrator's Guide section entitled \"Configuring a Web Server to Integrate with Kaazing Gateway\"");
}
}
var _7f=_61;
var _80=_7f.toString()+_62+"?.kr=xsp&.kv=10.05";
if(_7c){
var _81=new URI(_7f.toString());
var _7b=_7c.split(":");
_81.host=_7b.shift();
if(_7b.length){
_81.port=_7b.shift();
}
_80=_81.toString()+_62+"?.kr=xsp&.kv=10.05";
}
for(var i=0;i<_7d.length;i++){
if(_7d[i].name=="kaazing:postMessageBridgeURL"){
var _82=_7d[i].content;
var _83=new URI(_82);
var _84=new URI(location.toString());
if(!_83.authority){
_83.host=_84.host;
_83.port=_84.port;
_83.scheme=_84.scheme;
if(_82.indexOf("/")!=0){
var _85=_84.path.split("/");
_85.pop();
_85.push(_82);
_83.path=_85.join("/");
}
}
postMessage0.BridgeURL=_83.toString();
}
}
if(postMessage0.BridgeURL){
_80=postMessage0.BridgeURL;
}
var _86=["I",_7f,_78.sourceToken,escape(_80)];
if(_7b.length>1){
var _87=_7b[1];
_86.push(escape(_87));
}
_7b[1]=_86.join("!");
setTimeout(function(){
_79.location.replace(_7b.join("#"));
},200);
_78.bridged=true;
}
}
};
function flush(_88,_89){
var _8a=_88.writerURL+"#"+_89;
_88.writer.location.replace(_8a);
};
function fromHex(_8b){
return parseInt(_8b,16);
};
function toPaddedHex(_8c,_8d){
var hex=_8c.toString(16);
var _8f=[];
_8d-=hex.length;
while(_8d-->0){
_8f.push("0");
}
_8f.push(hex);
return _8f.join("");
};
function dequeue(_90,_91){
var _92=_90.queue;
var _93=_90.lastRead;
if((_92.length>0||_91)&&_90.lastSyn>_90.lastAck){
var _94=_90.lastFrames;
var _95=_90.lastReadIndex;
if(fromHex(_94[_95])!=_93){
_94[_95]=toPaddedHex(_93,8);
flush(_90,_94.join(""));
}
}else{
if(_92.length>0){
var _96=_92.shift();
var _97=_96[0];
if(_97=="*"||_97==_90.targetOrigin){
_90.lastWrite++;
var _98=_96[1];
var _99=_98.shift();
var _9a=3;
var _94=[_90.targetToken,toPaddedHex(_90.lastWrite,8),toPaddedHex(_93,8),"F",toPaddedHex(_99.length,4),_99];
var _95=2;
if(_98.length>0){
_94[_9a]="f";
_90.queue.unshift(_96);
}
if(_90.resendAck){
var _9b=[_90.targetToken,toPaddedHex(_90.lastWrite-1,8),toPaddedHex(_93,8),"a"];
_94=_9b.concat(_94);
_95+=_9b.length;
}
flush(_90,_94.join(""));
_90.lastFrames=_94;
_90.lastReadIndex=_95;
_90.lastSyn=_90.lastWrite;
_90.resendAck=false;
}
}else{
if(_91){
_90.lastWrite++;
var _94=[_90.targetToken,toPaddedHex(_90.lastWrite,8),toPaddedHex(_93,8),"a"];
var _95=2;
if(_90.resendAck){
var _9b=[_90.targetToken,toPaddedHex(_90.lastWrite-1,8),toPaddedHex(_93,8),"a"];
_94=_9b.concat(_94);
_95+=_9b.length;
}
flush(_90,_94.join(""));
_90.lastFrames=_94;
_90.lastReadIndex=_95;
_90.resendAck=true;
}
}
}
};
function process(_9c,_9d){
var _9e=_9d.substring(0,8);
var _9f=fromHex(_9d.substring(8,16));
var _a0=fromHex(_9d.substring(16,24));
var _a1=_9d.charAt(24);
if(_9e!=_9c.sourceToken){
throw new Error("postMessage emulation tampering detected");
}
var _a2=_9c.lastRead;
var _a3=_a2+1;
if(_9f==_a3){
_9c.lastRead=_a3;
}
if(_9f==_a3||_9f==_a2){
_9c.lastAck=_a0;
}
if(_9f==_a3||(_9f==_a2&&_a1=="a")){
switch(_a1){
case "f":
var _a4=_9d.substr(29,fromHex(_9d.substring(25,29)));
_9c.escapedFragments.push(_a4);
dequeue(_9c,true);
break;
case "F":
var _a5=_9d.substr(29,fromHex(_9d.substring(25,29)));
if(_9c.escapedFragments!==undefined){
_9c.escapedFragments.push(_a5);
_a5=_9c.escapedFragments.join("");
_9c.escapedFragments=[];
}
var _a6=unescape(_a5);
dispatch(_a6,_9c.target,_9c.targetOrigin);
dequeue(_9c,true);
break;
case "a":
if(_9d.length>25){
process(_9c,_9d.substring(25));
}else{
dequeue(_9c,false);
}
break;
default:
throw new Error("unknown postMessage emulation payload type: "+_a1);
}
}
};
function dispatch(_a7,_a8,_a9){
var _aa=document.createEvent("Events");
_aa.initEvent("message",false,true);
_aa.data=_a7;
_aa.origin=_a9;
_aa.source=_a8;
dispatchEvent(_aa);
};
var _ab={};
var _ac=[];
function pollReaders(){
for(var i=0,len=_ac.length;i<len;i++){
var _af=_ac[i];
_af.poll();
}
setTimeout(pollReaders,20);
};
function findMessagePipe(_b0){
if(_b0==parent){
return _ab["parent"];
}else{
if(_b0.parent==window){
var _b1=document.getElementsByTagName("iframe");
for(var i=0;i<_b1.length;i++){
var _b3=_b1[i];
if(_b0==_b3.contentWindow){
return supplyIFrameMessagePipe(_b3);
}
}
}else{
throw new Error("Generic peer postMessage not yet implemented");
}
}
};
function supplyIFrameMessagePipe(_b4){
var _b5=_b4._name;
if(_b5===undefined){
_b5="iframe$"+String(Math.random()).substring(2);
_b4._name=_b5;
}
var _b6=_ab[_b5];
if(_b6===undefined){
_b6=new MessagePipe(_b4);
_ab[_b5]=_b6;
}
return _b6;
};
function postMessage0(_b7,_b8,_b9){
if(typeof (_b8)!="string"){
throw new Error("Unsupported type. Messages must be strings");
}
if(_b7==window){
if(_b9=="*"||_b9==_61){
dispatch(_b8,window,_61);
}
}else{
var _ba=findMessagePipe(_b7);
_ba.post(_b7,_b8,_b9);
}
};
postMessage0.attach=function(_bb,_bc,_bd,_be,_bf,_c0){
var _c1=findMessagePipe(_bb);
_c1.attach(_bb,_bc,_bd,_be,_bf,_c0);
_ac.push(_c1);
};
var _c2=function(_c3){
var _c4=new URI((browser=="ie")?document.URL:location.href);
var _c5;
var _c6={"http":80,"https":443};
if(_c4.port==null){
_c4.port=_c6[_c4.scheme];
_c4.authority=_c4.host+":"+_c4.port;
}
var _c7=unescape(_c4.fragment||"");
if(_c7.length>0){
var _c8=_c7.split(",");
var _c9=_c8.shift();
var _ca=_c8.shift();
var _cb=_c8.shift();
var _cc=_c4.scheme+"://"+document.domain+":"+_c4.port;
var _cd=_c4.scheme+"://"+_c4.authority;
var _ce=_c9+"/.kr?.kr=xsc&.kv=10.05";
var _cf=document.location.toString().split("#")[0];
var _d0=_ce+"#"+escape([_cc,_ca,escape(_cf)].join(","));
if(typeof (ActiveXObject)!="undefined"){
_c5=new ActiveXObject("htmlfile");
_c5.open();
try{
_c5.parentWindow.opener=window;
}
catch(domainError){
if(_c3){
_c5.domain=_c3;
}
_c5.parentWindow.opener=window;
}
_c5.write("<html>");
_c5.write("<body>");
if(_c3){
_c5.write("<script>CollectGarbage();document.domain='"+_c3+"';</"+"script>");
}
_c5.write("<iframe src=\""+_ce+"\"></iframe>");
_c5.write("</body>");
_c5.write("</html>");
_c5.close();
var _d1=_c5.body.lastChild;
var _d2=_c5.parentWindow;
var _d3=parent;
var _d4=_d3.parent.postMessage0;
if(typeof (_d4)!="undefined"){
_d1.onload=function(){
var _d5=_d1.contentWindow;
_d5.location.replace(_d0);
_d4.attach(_d3,_c9,_cb,_d2,_d5,_ce);
};
}
}else{
var _d1=document.createElement("iframe");
_d1.src=_d0;
document.body.appendChild(_d1);
var _d2=window;
var _d6=_d1.contentWindow;
var _d3=parent;
var _d4=_d3.parent.postMessage0;
if(typeof (_d4)!="undefined"){
_d4.attach(_d3,_c9,_cb,_d2,_d6,_ce);
}
}
}
window.onunload=function(){
try{
var _d7=window.parent.parent.postMessage0;
if(typeof (_d7)!="undefined"){
_d7.detach(_d3);
}
}
catch(permissionDenied){
}
if(typeof (_c5)!=="undefined"){
_c5.parentWindow.opener=null;
_c5.open();
_c5.close();
_c5=null;
CollectGarbage();
}
};
};
postMessage0.__init__=function(_d8,_d9){
var _da=_c2.toString();
_d8.URI=URI;
_d8.browser=browser;
if(!_d9){
_d9="";
}
_d8.setTimeout("("+_da+")('"+_d9+"')",0);
};
postMessage0.bridgeURL=false;
postMessage0.detach=function(_db){
var _dc=findMessagePipe(_db);
for(var i=0;i<_ac.length;i++){
if(_ac[i]==_dc){
_ac.splice(i,1);
}
}
_dc.detach();
};
if(window!=top){
_ab["parent"]=new MessagePipe();
function initializeAsTargetIfNecessary(){
var _de=new URI((browser=="ie")?document.URL:location.href);
var _df=_de.fragment||"";
if(document.body!=null&&_df.length>0&&_df.charAt(0)=="I"){
var _e0=unescape(_df);
var _e1=_e0.split("!");
if(_e1.shift()=="I"){
var _e2=_e1.shift();
var _e3=_e1.shift();
var _e4=unescape(_e1.shift());
var _e5=_61;
if(_e2==_e5){
try{
parent.location.hash;
}
catch(permissionDenied){
document.domain=document.domain;
}
}
var _e6=_e1.shift()||"";
switch(browser){
case "firefox":
location.replace([location.href.split("#")[0],_e6].join("#"));
break;
default:
location.hash=_e6;
break;
}
var _e7=findMessagePipe(parent);
_e7.targetToken=_e3;
var _e8=_e7.sourceToken;
var _e9=_e4+"#"+escape([_e5,_e3,_e8].join(","));
var _ea;
_ea=document.createElement("iframe");
_ea.src=_e9;
_ea.style.position="absolute";
_ea.style.left="-10px";
_ea.style.top="10px";
_ea.style.visibility="hidden";
_ea.style.width="0px";
_ea.style.height="0px";
document.body.appendChild(_ea);
return;
}
}
setTimeout(initializeAsTargetIfNecessary,20);
};
initializeAsTargetIfNecessary();
}
var _eb=document.getElementsByTagName("meta");
for(var i=0;i<_eb.length;i++){
if(_eb[i].name==="kaazing:postMessage"){
if("immediate"==_eb[i].content){
var _ed=function(){
var _ee=document.getElementsByTagName("iframe");
for(var i=0;i<_ee.length;i++){
var _f0=_ee[i];
if(_f0.style["KaaPostMessage"]=="immediate"){
_f0.style["KaaPostMessage"]="none";
var _f1=supplyIFrameMessagePipe(_f0);
bridgeIfNecessary(_f1,_f0.contentWindow);
}
}
setTimeout(_ed,20);
};
setTimeout(_ed,20);
}
break;
}
}
for(var i=0;i<_eb.length;i++){
if(_eb[i].name==="kaazing:postMessagePrefix"){
var _f2=_eb[i].content;
if(_f2!=null&&_f2.length>0){
if(_f2.charAt(0)!="/"){
_f2="/"+_f2;
}
_62=_f2;
}
}
}
setTimeout(pollReaders,20);
return postMessage0;
}
})();
var XMLHttpRequest0=(function(){
var _f3=new URI((browser=="ie")?document.URL:location.href);
var _f4={"http":80,"https":443};
if(_f3.port==null){
_f3.port=_f4[_f3.scheme];
_f3.authority=_f3.host+":"+_f3.port;
}
var _f5={};
var _f6={};
var _f7=0;
function XMLHttpRequest0(){
if(browser=="firefox"&&typeof (Object.getPrototypeOf)=="function"){
var xhr=new XMLHttpRequest();
xhr.withCredentials=true;
return xhr;
}
};
var _f9=XMLHttpRequest0.prototype;
_f9.readyState=0;
_f9.responseText="";
_f9.status=0;
_f9.statusText="";
_f9.timeout=0;
_f9.onreadystatechange;
_f9.onerror;
_f9.onload;
_f9.onprogress;
_f9.open=function(_fa,_fb,_fc){
if(!_fc){
throw new Error("Asynchronous is required for cross-origin XMLHttpRequest emulation");
}
switch(this.readyState){
case 0:
case 4:
break;
default:
throw new Error("Invalid ready state");
}
if(_fb.indexOf(".kv=")==-1){
_fb+=((_fb.indexOf("?")==-1)?"?":"&")+".kv=10.05";
}else{
_fb=_fb.replace(/\.kv=[^&]*(.*)/,".kv=10.05$1");
}
var id=register(this);
var _fe=supplyPipe(this,_fb);
_fe.attach(id);
this._pipe=_fe;
this._requestHeaders=[];
this._method=_fa;
this._location=_fb;
this._responseHeaders=null;
this.readyState=1;
this.status=0;
this.statusText="";
this.responseText="";
var _ff=this;
setTimeout(function(){
_ff.readyState=1;
onreadystatechange(_ff);
},0);
};
_f9.setRequestHeader=function(_100,_101){
if(this.readyState!==1){
throw new Error("Invalid ready state");
}
this._requestHeaders.push([_100,_101]);
};
_f9.send=function(_102){
if(this.readyState!==1){
throw new Error("Invalid ready state");
}
var _103=this;
setTimeout(function(){
_103.readyState=2;
onreadystatechange(_103);
},0);
doSend(this,_102);
};
_f9.abort=function(){
var pipe=this._pipe;
if(pipe!==undefined){
pipe.post(["a",this._id].join(""));
pipe.detach(this._id);
}
};
_f9.getResponseHeader=function(_105){
if(this.status==0){
throw new Error("Invalid ready state");
}
var _106=this._responseHeaders;
return _106[_105];
};
_f9.getAllResponseHeaders=function(){
if(this.status==0){
throw new Error("Invalid ready state");
}
return null;
};
function onreadystatechange(_107){
if(typeof (_107.onreadystatechange)!=="undefined"){
_107.onreadystatechange();
}
switch(_107.readyState){
case 3:
if(typeof (_107.onprogress)!=="undefined"){
_107.onprogress();
}
break;
case 4:
if(_107.status<100||_107.status>=500){
if(typeof (_107.onerror)!=="undefined"){
_107.onerror();
}
}else{
if(typeof (_107.onprogress)!=="undefined"){
_107.onprogress();
}
if(typeof (_107.onload)!=="undefined"){
_107.onload();
}
}
break;
}
};
function register(_108){
var id=toPaddedHex(_f7++,8);
_f6[id]=_108;
_108._id=id;
return id;
};
function doSend(_10a,_10b){
if(typeof (_10b)!=="string"){
_10b="";
}
var _10c=_10a._method.substring(0,10);
var _10d=_10a._location;
var _10e=_10a._requestHeaders;
var _10f=toPaddedHex(_10a.timeout,4);
var _110=(_10a.onprogress!==undefined)?"t":"f";
var _111=["s",_10a._id,_10c.length,_10c,toPaddedHex(_10d.length,4),_10d,toPaddedHex(_10e.length,4)];
for(var i=0;i<_10e.length;i++){
var _113=_10e[i];
_111.push(toPaddedHex(_113[0].length,4));
_111.push(_113[0]);
_111.push(toPaddedHex(_113[1].length,4));
_111.push(_113[1]);
}
_111.push(toPaddedHex(_10b.length,8),_10b,toPaddedHex(_10f,4),_110);
_10a._pipe.post(_111.join(""));
};
function supplyPipe(_114,_115){
var uri=new URI(_115);
var _117=(uri.scheme!=null&&uri.authority!=null);
var _118=_117?uri.scheme:_f3.scheme;
var _119=_117?uri.authority:_f3.authority;
if(_119!=null&&uri.port==null){
_119=uri.host+":"+_f4[_118];
}
var _11a=_118+"://"+_119;
var pipe=_f5[_11a];
if(pipe!==undefined){
if(!("iframe" in pipe&&"contentWindow" in pipe.iframe&&typeof pipe.iframe.contentWindow=="object")){
pipe=_f5[_11a]=undefined;
}
}
if(pipe===undefined){
var _11c=document.createElement("iframe");
_11c.style.position="absolute";
_11c.style.left="-10px";
_11c.style.top="10px";
_11c.style.visibility="hidden";
_11c.style.width="0px";
_11c.style.height="0px";
var _11d=new URI(_11a);
_11d.query=".kr=xs&.kv=10.05";
_11d.path="/";
_11c.src=_11d.toString();
function post(_11e){
this.buffer.push(_11e);
};
function attach(id){
var _120=this.attached[id];
if(_120===undefined){
_120={};
this.attached[id]=_120;
}
if(_120.timerID!==undefined){
clearTimeout(_120.timerID);
delete _120.timerID;
}
};
function detach(id){
var _122=this.attached[id];
if(_122!==undefined&&_122.timerID===undefined){
var _123=this;
_122.timerID=setTimeout(function(){
delete _123.attached[id];
var xhr=_f6[id];
if(xhr._pipe==pipe){
delete _f6[id];
delete xhr._id;
delete xhr._pipe;
}
postMessage0(pipe.iframe.contentWindow,["d",id].join(""),pipe.targetOrigin);
},10000);
}
};
pipe={"targetOrigin":_11a,"iframe":_11c,"buffer":[],"post":post,"attach":attach,"detach":detach,"attached":{count:0}};
_f5[_11a]=pipe;
function sendInitWhenReady(){
var _125=_11c.contentWindow;
if(!_125){
setTimeout(sendInitWhenReady,20);
}else{
postMessage0(_125,"I",_11a);
}
};
pipe.handshakeID=setTimeout(function(){
_f5[_11a]=undefined;
pipe.post=function(_126){
_114.readyState=4;
_114.status=0;
onreadystatechange(_114);
};
if(pipe.buffer.length>0){
pipe.post();
}
},30000);
document.body.appendChild(_11c);
sendInitWhenReady();
}
return pipe;
};
function onmessage(_127){
var _128=_127.origin;
var _129={"http":":80","https":":443"};
var _12a=_128.split(":");
if(_12a.length===2){
_128+=_129[_12a[0]];
}
var pipe=_f5[_128];
if(pipe!==undefined&&pipe.iframe!==undefined&&_127.source==pipe.iframe.contentWindow){
if(_127.data=="I"){
clearTimeout(pipe.handshakeID);
var _12c;
while((_12c=pipe.buffer.shift())!==undefined){
postMessage0(pipe.iframe.contentWindow,_12c,pipe.targetOrigin);
}
pipe.post=function(_12d){
postMessage0(pipe.iframe.contentWindow,_12d,pipe.targetOrigin);
};
}else{
var _12c=_127.data;
if(_12c.length>=9){
var _12e=0;
var type=_12c.substring(_12e,_12e+=1);
var id=_12c.substring(_12e,_12e+=8);
var _131=_f6[id];
if(_131!==undefined){
switch(type){
case "r":
var _132={};
var _133=fromHex(_12c.substring(_12e,_12e+=2));
for(var i=0;i<_133;i++){
var _135=fromHex(_12c.substring(_12e,_12e+=4));
var _136=_12c.substring(_12e,_12e+=_135);
var _137=fromHex(_12c.substring(_12e,_12e+=4));
var _138=_12c.substring(_12e,_12e+=_137);
_132[_136]=_138;
}
var _139=fromHex(_12c.substring(_12e,_12e+=4));
var _13a=fromHex(_12c.substring(_12e,_12e+=2));
var _13b=_12c.substring(_12e,_12e+=_13a);
switch(_139){
case 301:
case 302:
case 307:
var _13c=_132["Location"];
var id=register(_131);
var pipe=supplyPipe(_131,_13c);
pipe.attach(id);
_131._pipe=pipe;
_131._method="GET";
_131._location=_13c;
_131._redirect=true;
break;
default:
_131._responseHeaders=_132;
_131.status=_139;
_131.statusText=_13b;
break;
}
break;
case "p":
var _13d=parseInt(_12c.substring(_12e,_12e+=1));
if(_131._id===id){
_131.readyState=_13d;
var _13e=fromHex(_12c.substring(_12e,_12e+=8));
var _13f=_12c.substring(_12e,_12e+=_13e);
if(_13f.length>0){
_131.responseText+=_13f;
}
onreadystatechange(_131);
}else{
if(_131._redirect){
_131._redirect=false;
doSend(_131,"");
}
}
if(_13d==4){
pipe.detach(id);
}
break;
case "e":
if(_131._id===id){
_131.status=0;
_131.statusText="";
_131.readyState=4;
onreadystatechange(_131);
}
pipe.detach(id);
break;
case "t":
if(_131._id===id){
_131.status=0;
_131.statusText="";
_131.readyState=4;
if(typeof (_131.ontimeout)!=="undefined"){
_131.ontimeout();
}
}
pipe.detach(id);
break;
}
}
}
}
}else{
}
};
function fromHex(_140){
return parseInt(_140,16);
};
function toPaddedHex(_141,_142){
var hex=_141.toString(16);
var _144=[];
_142-=hex.length;
while(_142-->0){
_144.push("0");
}
_144.push(hex);
return _144.join("");
};
window.addEventListener("message",onmessage,false);
return XMLHttpRequest0;
})();
ByteOrder=function(){
};
(function(){
var _145=ByteOrder.prototype;
_145.toString=function(){
throw new Error("Abstract");
};
var _146=function(v){
return (v&255);
};
var _148=function(_149){
return (_149&128)?(_149|-256):_149;
};
var _14a=function(v){
return [((v>>8)&255),(v&255)];
};
var _14c=function(_14d,_14e){
return (_148(_14d)<<8)|(_14e&255);
};
var _14f=function(_150,_151){
return ((_150&255)<<8)|(_151&255);
};
var _152=function(_153,_154,_155){
return ((_153&255)<<16)|((_154&255)<<8)|(_155&255);
};
var _156=function(v){
return [((v>>16)&255),((v>>8)&255),(v&255)];
};
var _158=function(_159,_15a,_15b){
return ((_159&255)<<16)|((_15a&255)<<8)|(_15b&255);
};
var _15c=function(v){
return [((v>>24)&255),((v>>16)&255),((v>>8)&255),(v&255)];
};
var _15e=function(_15f,_160,_161,_162){
return (_148(_15f)<<24)|((_160&255)<<16)|((_161&255)<<8)|(_162&255);
};
var _163=function(_164,_165,_166,_167){
var _168=_14f(_164,_165);
var _169=_14f(_166,_167);
return (_168*65536+_169);
};
ByteOrder.BIG_ENDIAN=(function(){
var _16a=function(){
};
_16a.prototype=new ByteOrder();
var _16b=_16a.prototype;
_16b._toUnsignedByte=_146;
_16b._toByte=_148;
_16b._fromShort=_14a;
_16b._toShort=_14c;
_16b._toUnsignedShort=_14f;
_16b._toUnsignedMediumInt=_152;
_16b._fromMediumInt=_156;
_16b._toMediumInt=_158;
_16b._fromInt=_15c;
_16b._toInt=_15e;
_16b._toUnsignedInt=_163;
_16b.toString=function(){
return "<ByteOrder.BIG_ENDIAN>";
};
return new _16a();
})();
ByteOrder.LITTLE_ENDIAN=(function(){
var _16c=function(){
};
_16c.prototype=new ByteOrder();
var _16d=_16c.prototype;
_16d._toByte=_148;
_16d._toUnsignedByte=_146;
_16d._fromShort=function(v){
return _14a(v).reverse();
};
_16d._toShort=function(_16f,_170){
return _14c(_170,_16f);
};
_16d._toUnsignedShort=function(_171,_172){
return _14f(_172,_171);
};
_16d._toUnsignedMediumInt=function(_173,_174,_175){
return _152(_175,_174,_173);
};
_16d._fromMediumInt=function(v){
return _156(v).reverse();
};
_16d._toMediumInt=function(_177,_178,_179,_17a,_17b,_17c){
return _158(_17c,_17b,_17a,_179,_178,_177);
};
_16d._fromInt=function(v){
return _15c(v).reverse();
};
_16d._toInt=function(_17e,_17f,_180,_181){
return _15e(_181,_180,_17f,_17e);
};
_16d._toUnsignedInt=function(_182,_183,_184,_185){
return _163(_185,_184,_183,_182);
};
_16d.toString=function(){
return "<ByteOrder.LITTLE_ENDIAN>";
};
return new _16c();
})();
})();
function ByteBuffer(_186){
this.array=_186||[];
this._mark=-1;
this.limit=this.capacity=this.array.length;
this.order=ByteOrder.BIG_ENDIAN;
};
(function(){
ByteBuffer.allocate=function(_187){
var buf=new ByteBuffer();
buf.capacity=_187;
buf.limit=_187;
return buf;
};
ByteBuffer.wrap=function(_189){
return new ByteBuffer(_189);
};
var _18a=ByteBuffer.prototype;
_18a.autoExpand=true;
_18a.capacity=0;
_18a.position=0;
_18a.limit=0;
_18a.order=ByteOrder.BIG_ENDIAN;
_18a.array=[];
_18a.mark=function(){
this._mark=this.position;
return this;
};
_18a.reset=function(){
var m=this._mark;
if(m<0){
throw new Error("Invalid mark");
}
this.position=m;
return this;
};
_18a.compact=function(){
this.array.splice(0,this.position);
this.limit-=this.position;
this.position=0;
return this;
};
_18a.duplicate=function(){
var buf=new ByteBuffer(this.array);
buf.position=this.position;
buf.limit=this.limit;
buf.capacity=this.capacity;
return buf;
};
_18a.fill=function(size){
_autoExpand(this,size);
while(size-->0){
this.put(0);
}
return this;
};
_18a.fillWith=function(b,size){
_autoExpand(this,size);
while(size-->0){
this.put(b);
}
return this;
};
_18a.indexOf=function(b){
var _191=this.limit;
var _192=this.array;
for(var i=this.position;i<_191;i++){
if(_192[i]==b){
return i;
}
}
return -1;
};
_18a.put=function(v){
_autoExpand(this,1);
this.putAt(this.position++,v);
return this;
};
_18a.putAt=function(_195,v){
_checkForWriteAt(this,_195,1);
this.array[_195]=this.order._toUnsignedByte(v);
return this;
};
_18a.putUnsigned=function(v){
_autoExpand(this,1);
this.putUnsignedAt(this.position,v&255);
this.position+=1;
return this;
};
_18a.putUnsignedAt=function(_198,v){
_checkForWriteAt(this,_198,1);
this.putAt(_198,v&255);
return this;
};
_18a.putShort=function(v){
_autoExpand(this,2);
this.putShortAt(this.position,v);
this.position+=2;
return this;
};
_18a.putShortAt=function(_19b,v){
_checkForWriteAt(this,_19b,2);
this.putBytesAt(_19b,this.order._fromShort(v));
return this;
};
_18a.putUnsignedShort=function(v){
_autoExpand(this,2);
this.putUnsignedShortAt(this.position,v&65535);
this.position+=2;
return this;
};
_18a.putUnsignedShortAt=function(_19e,v){
_checkForWriteAt(this,_19e,2);
this.putShortAt(_19e,v&65535);
return this;
};
_18a.putMediumInt=function(v){
_autoExpand(this,3);
this.putMediumIntAt(this.position,v);
this.position+=3;
return this;
};
_18a.putMediumIntAt=function(_1a1,v){
this.putBytesAt(_1a1,this.order._fromMediumInt(v));
return this;
};
_18a.putInt=function(v){
_autoExpand(this,4);
this.putIntAt(this.position,v);
this.position+=4;
return this;
};
_18a.putIntAt=function(_1a4,v){
_checkForWriteAt(this,_1a4,4);
this.putBytesAt(_1a4,this.order._fromInt(v));
return this;
};
_18a.putUnsignedInt=function(v){
_autoExpand(this,4);
this.putUnsignedIntAt(this.position,v&4294967295);
this.position+=4;
return this;
};
_18a.putUnsignedIntAt=function(_1a7,v){
_checkForWriteAt(this,_1a7,4);
this.putIntAt(_1a7,v&4294967295);
return this;
};
_18a.putString=function(v,cs){
cs.encode(v,this);
return this;
};
_18a.putPrefixedString=function(_1ab,v,cs){
if(typeof (cs)==="undefined"||typeof (cs.encode)==="undefined"){
throw new Error("ByteBuffer.putPrefixedString: character set parameter missing");
}
if(_1ab===0){
return this;
}
_autoExpand(this,_1ab);
var len=v.length;
switch(_1ab){
case 1:
this.put(len);
break;
case 2:
this.putShort(len);
break;
case 4:
this.putInt(len);
break;
}
cs.encode(v,this);
return this;
};
_18a.putBytes=function(v){
_autoExpand(this,v.length);
this.putBytesAt(this.position,v);
this.position+=v.length;
return this;
};
_18a.putBytesAt=function(_1b0,v){
_checkForWriteAt(this,_1b0,v.length);
for(var j=0,k=_1b0,len=v.length;j<len;j++,k++){
this.putAt(k,v[j]);
}
return this;
};
_18a.putBuffer=function(v){
this.putBytes(v.array.slice(v.position,v.limit));
return this;
};
_18a.putBufferAt=function(_1b6,v){
this.putBytesAt(_1b6,v.array.slice(v.position,v.limit));
return this;
};
_18a.get=function(){
_checkForRead(this,1);
return this.getAt(this.position++);
};
_18a.getAt=function(_1b8){
_checkForReadAt(this,_1b8,1);
return this.order._toByte(this.array[_1b8]);
};
_18a.getUnsigned=function(){
_checkForRead(this,1);
var val=this.getUnsignedAt(this.position);
this.position+=1;
return val;
};
_18a.getUnsignedAt=function(_1ba){
_checkForReadAt(this,_1ba,1);
return this.order._toUnsignedByte(this.array[_1ba]);
};
_18a.getBytes=function(size){
_checkForRead(this,size);
var _1bc=new Array();
for(var i=0;i<size;i++){
_1bc.push(this.order._toByte(this.array[i+this.position]));
}
this.position+=size;
return _1bc;
};
_18a.getBytesAt=function(_1be,size){
_checkForReadAt(this,_1be,size);
var _1c0=new Array();
this.position=_1be;
for(var i=0;i<size;i++){
_1c0.push(this.order._toByte(this.array[i+this.position]));
}
this.position+=size;
return _1c0;
};
_18a.getShort=function(){
_checkForRead(this,2);
var val=this.getShortAt(this.position);
this.position+=2;
return val;
};
_18a.getShortAt=function(_1c3){
_checkForReadAt(this,_1c3,2);
var _1c4=this.array;
return this.order._toShort(_1c4[_1c3++],_1c4[_1c3++]);
};
_18a.getUnsignedShort=function(){
_checkForRead(this,2);
var val=this.getUnsignedShortAt(this.position);
this.position+=2;
return val;
};
_18a.getUnsignedShortAt=function(_1c6){
_checkForReadAt(this,_1c6,2);
var _1c7=this.array;
return this.order._toUnsignedShort(_1c7[_1c6++],_1c7[_1c6++]);
};
_18a.getUnsignedMediumInt=function(){
var _1c8=this.array;
return this.order._toUnsignedMediumInt(_1c8[this.position++],_1c8[this.position++],_1c8[this.position++]);
};
_18a.getMediumInt=function(){
var val=this.getMediumIntAt(this.position);
this.position+=3;
return val;
};
_18a.getMediumIntAt=function(i){
var _1cb=this.array;
return this.order._toMediumInt(_1cb[i++],_1cb[i++],_1cb[i++]);
};
_18a.getInt=function(){
_checkForRead(this,4);
var val=this.getIntAt(this.position);
this.position+=4;
return val;
};
_18a.getIntAt=function(_1cd){
_checkForReadAt(this,_1cd,4);
var _1ce=this.array;
return this.order._toInt(_1ce[_1cd++],_1ce[_1cd++],_1ce[_1cd++],_1ce[_1cd++]);
};
_18a.getUnsignedInt=function(){
_checkForRead(this,4);
var val=this.getUnsignedIntAt(this.position);
this.position+=4;
return val;
};
_18a.getUnsignedIntAt=function(_1d0){
_checkForReadAt(this,_1d0,4);
var _1d1=this.array;
return this.order._toUnsignedInt(_1d1[_1d0++],_1d1[_1d0++],_1d1[_1d0++],_1d1[_1d0++]);
return val;
};
_18a.getPrefixedString=function(_1d2,cs){
var len=0;
switch(_1d2||2){
case 1:
len=this.getUnsigned();
break;
case 2:
len=this.getUnsignedShort();
break;
case 4:
len=this.getInt();
break;
}
if(len===0){
return "";
}
var _1d5=this.limit;
try{
this.limit=this.position+len;
return cs.decode(this);
}
finally{
this.limit=_1d5;
}
};
_18a.getString=function(cs){
var _1d7=this.position;
var _1d8=this.limit;
var _1d9=this.array;
while(_1d7<_1d8&&_1d9[_1d7]!==0){
_1d7++;
}
try{
this.limit=_1d7;
return cs.decode(this);
}
finally{
if(_1d7!=_1d8){
this.limit=_1d8;
this.position=_1d7+1;
}
}
};
_18a.slice=function(){
return new ByteBuffer(this.array.slice(this.position,this.limit));
};
_18a.flip=function(){
this.limit=this.position;
this.position=0;
this._mark=-1;
return this;
};
_18a.rewind=function(){
this.position=0;
this._mark=-1;
return this;
};
_18a.clear=function(){
this.position=0;
this.limit=this.capacity;
this._mark=-1;
return this;
};
_18a.remaining=function(){
return (this.limit-this.position);
};
_18a.hasRemaining=function(){
return (this.limit>this.position);
};
_18a.skip=function(size){
this.position+=size;
return this;
};
_18a.getHexDump=function(){
var _1db=this.array;
var pos=this.position;
var _1dd=this.limit;
if(pos==_1dd){
return "empty";
}
var _1de=[];
for(var i=pos;i<_1dd;i++){
var hex=(_1db[i]||0).toString(16);
if(hex.length==1){
hex="0"+hex;
}
_1de.push(hex);
}
return _1de.join(" ");
};
_18a.toString=_18a.getHexDump;
_18a.expand=function(_1e1){
return this.expandAt(this.position,_1e1);
};
_18a.expandAt=function(i,_1e3){
var end=i+_1e3;
if(end>this.capacity){
this.capacity=end;
}
if(end>this.limit){
this.limit=end;
}
return this;
};
function _autoExpand(_1e5,_1e6){
if(_1e5.autoExpand){
_1e5.expand(_1e6);
}
return _1e5;
};
function _checkForRead(_1e7,_1e8){
var end=_1e7.position+_1e8;
if(end>_1e7.limit){
throw new Error("Buffer underflow");
}
return _1e7;
};
function _checkForReadAt(_1ea,_1eb,_1ec){
var end=_1eb+_1ec;
if(_1eb<0||end>_1ea.limit){
throw new Error("Index out of bounds");
}
return _1ea;
};
function _checkForWriteAt(_1ee,_1ef,_1f0){
var end=_1ef+_1f0;
if(_1ef<0||end>_1ee.limit){
throw new Error("Index out of bounds");
}
return _1ee;
};
})();
function Charset(){
};
(function(){
var _1f2=Charset.prototype;
_1f2.decode=function(buf){
};
_1f2.encode=function(text){
};
Charset.UTF8=(function(){
function UTF8(){
};
UTF8.prototype=new Charset();
var _1f5=UTF8.prototype;
_1f5.decode=function(buf){
var _1f7=[];
while(buf.hasRemaining()){
var _1f8=buf.remaining();
var _1f9=buf.getUnsigned();
var _1fa=charByteCount(_1f9);
if(_1f8<_1fa){
buf.skip(-1);
break;
}
var _1fb=null;
switch(_1fa){
case 1:
_1fb=_1f9;
break;
case 2:
_1fb=((_1f9&31)<<6)|(buf.getUnsigned()&63);
break;
case 3:
_1fb=((_1f9&15)<<12)|((buf.getUnsigned()&63)<<6)|(buf.getUnsigned()&63);
break;
case 4:
_1fb=((_1f9&7)<<18)|((buf.getUnsigned()&63)<<12)|((buf.getUnsigned()&63)<<6)|(buf.getUnsigned()&63);
break;
}
_1f7.push(_1fb);
}
return String.fromCharCode.apply(null,_1f7);
};
_1f5.encode=function(str,buf){
for(var i=0;i<str.length;i++){
var _1ff=str.charCodeAt(i);
if(_1ff<128){
buf.put(_1ff);
}else{
if(_1ff<2048){
buf.put((_1ff>>6)|192);
buf.put((_1ff&63)|128);
}else{
if(_1ff<65536){
buf.put((_1ff>>12)|224);
buf.put(((_1ff>>6)&63)|128);
buf.put((_1ff&63)|128);
}else{
if(_1ff<1114112){
buf.put((_1ff>>18)|240);
buf.put(((_1ff>>12)&63)|128);
buf.put(((_1ff>>6)&63)|128);
buf.put((_1ff&63)|128);
}else{
throw new Error("Invalid UTF-8 string");
}
}
}
}
}
};
function charByteCount(b){
if((b&128)===0){
return 1;
}
if((b&32)===0){
return 2;
}
if((b&16)===0){
return 3;
}
if((b&8)===0){
return 4;
}
throw new Error("Invalid UTF-8 bytes");
};
return new UTF8();
})();
})();
(function(){
var _201="AmqpClient";
var _202=function(name){
this._name=name;
this._level=_202.Level.INFO;
};
(function(){
_202.Level={OFF:8,SEVERE:7,WARNING:6,INFO:5,CONFIG:4,FINE:3,FINER:2,FINEST:1,ALL:0};
var _204;
var tags=document.getElementsByTagName("meta");
for(var i=0;i<tags.length;i++){
if(tags[i].name==="kaazing:logging"){
_204=tags[i].content;
break;
}
}
_202._logConf={};
if(_204){
var _207=_204.split(",");
for(var i=0;i<_207.length;i++){
var _208=_207[i].split("=");
_202._logConf[_208[0]]=_208[1];
}
}
var _209={};
_202.getLogger=function(name){
var _20b=_209[name];
if(_20b===undefined){
_20b=new _202(name);
_209[name]=_20b;
}
return _20b;
};
var _20c=_202.prototype;
_20c.setLevel=function(_20d){
if(_20d&&_20d>=_202.Level.ALL&&_20d<=_202.Level.OFF){
this._level=_20d;
}
};
_20c.isLoggable=function(_20e){
for(var _20f in _202._logConf){
if(this._name.match(_20f)){
var _210=_202._logConf[_20f];
if(_210){
return (_202.Level[_210]<=_20e);
}
}
}
return (this._level<=_20e);
};
var noop=function(){
};
var _212={};
_212[_202.Level.OFF]=noop;
_212[_202.Level.SEVERE]=(window.console)?(console.error||console.log||noop):noop;
_212[_202.Level.WARNING]=(window.console)?(console.warn||console.log||noop):noop;
_212[_202.Level.INFO]=(window.console)?(console.info||console.log||noop):noop;
_212[_202.Level.CONFIG]=(window.console)?(console.info||console.log||noop):noop;
_212[_202.Level.FINE]=(window.console)?(console.debug||console.log||noop):noop;
_212[_202.Level.FINER]=(window.console)?(console.debug||console.log||noop):noop;
_212[_202.Level.FINEST]=(window.console)?(console.debug||console.log||noop):noop;
_212[_202.Level.ALL]=(window.console)?(console.log||noop):noop;
_20c.config=function(_213,_214){
this.log(_202.Level.CONFIG,_213,_214);
};
_20c.entering=function(_215,name,_217){
if(this.isLoggable(_202.Level.FINER)){
if(browser=="chrome"||browser=="safari"){
_215=console;
}
var _218=_212[_202.Level.FINER];
if(_217){
if(typeof (_218)=="object"){
_218("ENTRY "+name,_217);
}else{
_218.call(_215,"ENTRY "+name,_217);
}
}else{
if(typeof (_218)=="object"){
_218("ENTRY "+name);
}else{
_218.call(_215,"ENTRY "+name);
}
}
}
};
_20c.exiting=function(_219,name,_21b){
if(this.isLoggable(_202.Level.FINER)){
var _21c=_212[_202.Level.FINER];
if(browser=="chrome"||browser=="safari"){
_219=console;
}
if(_21b){
if(typeof (_21c)=="object"){
_21c("RETURN "+name,_21b);
}else{
_21c.call(_219,"RETURN "+name,_21b);
}
}else{
if(typeof (_21c)=="object"){
_21c("RETURN "+name);
}else{
_21c.call(_219,"RETURN "+name);
}
}
}
};
_20c.fine=function(_21d,_21e){
this.log(_202.Level.FINE,_21d,_21e);
};
_20c.finer=function(_21f,_220){
this.log(_202.Level.FINER,_21f,_220);
};
_20c.finest=function(_221,_222){
this.log(_202.Level.FINEST,_221,_222);
};
_20c.info=function(_223,_224){
this.log(_202.Level.INFO,_223,_224);
};
_20c.log=function(_225,_226,_227){
if(this.isLoggable(_225)){
var _228=_212[_225];
if(browser=="chrome"||browser=="safari"){
_226=console;
}
if(typeof (_228)=="object"){
_228(_227);
}else{
_228.call(_226,_227);
}
}
};
_20c.severe=function(_229,_22a){
this.log(_202.Level.SEVERE,_229,_22a);
};
_20c.warning=function(_22b,_22c){
this.log(_202.Level.WARNING,_22b,_22c);
};
})();
var _22d=function(key){
var tags=document.getElementsByTagName("meta");
for(var i=0;i<tags.length;i++){
if(tags[i].name===key){
var v=tags[i].content;
return v;
}
}
};
var _232=function(_233){
var _234=[];
for(var i=0;i<_233.length;i++){
_234.push(_233[i]);
}
return _234;
};
var _236=function(_237,_238){
var _239=[];
for(var i=0;i<_237.length;i++){
var elt=_237[i];
if(_238(elt)){
_239.push(_237[i]);
}
}
return _239;
};
var _23c=function(_23d,_23e){
for(var i=0;i<_23d.length;i++){
if(_23d[i]==_23e){
return i;
}
}
return -1;
};
var _240=function(s){
var a=[];
for(var i=0;i<s.length;i++){
a.push(s.charCodeAt(i)&255);
}
var buf=new ByteBuffer(a);
var v=buf.getString(Charset.UTF8);
return v;
};
var _246=String.fromCharCode(127);
var NULL=String.fromCharCode(0);
var _248="\n";
var _249=function(buf){
var a=[];
while(buf.remaining()){
var n=buf.getUnsigned();
var chr=String.fromCharCode(n);
switch(chr){
case _246:
a.push(_246);
a.push(_246);
break;
case NULL:
a.push(_246);
a.push("0");
break;
case _248:
a.push(_246);
a.push("n");
break;
default:
a.push(chr);
}
}
var v=a.join("");
return v;
};
var _24f=function(buf,_251){
if(_251){
return _249(buf);
}else{
var _252=[];
while(buf.remaining()){
var n=buf.getUnsigned();
_252.push(String.fromCharCode(n));
}
var _254=_252.join("");
return _254;
}
};
var _255=window.WebSocket;
var _256=function(_257,_258){
if(typeof (_255)==="undefined"){
doError(this);
return;
}
if(_257.indexOf("javascript:")==0){
_257=_257.substr("javascript:".length);
}
var _259=_257.indexOf("?");
if(_259!=-1){
_257+="&.kl=Y";
}else{
_257+="?.kl=Y";
}
this._balanced=false;
this._sendQueue=[];
try{
if(_258){
this._delegate=new _255(_257,_258);
}else{
this._delegate=new _255(_257);
}
}
catch(e){
doError(this);
return;
}
bindHandlers(this);
};
var _25a=_256.prototype;
_25a.onerror=function(){
};
_25a.onmessage=function(){
};
_25a.onopen=function(){
};
_25a.onclose=function(){
};
_25a.close=function(){
this._delegate.close();
};
_25a.send=function(_25b){
if(this._balanced==true){
doSend(this,_25b);
}else{
this._sendQueue.push(_25b);
}
};
function doSend(_25c,_25d){
if(typeof (_25d)=="string"){
_25c._delegate.send(_25d);
}else{
if(_25d.constructor==ByteBuffer){
var _25e=_24f(_25d);
_25c._delegate.send(_25e);
}else{
throw new Error("Cannot call send() with that type");
}
}
};
function doError(_25f,e){
setTimeout(function(){
if(_25f.onerror){
_25f.onerror(e);
}
},0);
};
function messageHandler(_261,e){
if(_261._balanced==true){
_261.onmessage(e);
}else{
if(e.data.match("^\uf0ff")=="\uf0ff"){
var rest=e.data.substring(1);
if(rest.match("^R")=="R"){
var _264=rest.substring(1);
if(_264&&_264!=""){
var _265=_264.indexOf("?");
if(_265!=-1){
_264+="&.kl=Y";
}else{
_264+="?.kl=Y";
}
unbindHandlers(_261);
_261.close();
_261._delegate=new _255(_264);
bindHandlers(_261);
}else{
_261.close();
}
}else{
if(rest.match("^N$")=="N"){
_261._balanced=true;
var _266;
while(_266=_261._sendQueue.shift()){
doSend(_261,_266);
}
}else{
_261._balanced=true;
_261.onmessage(e);
}
}
}else{
_261._balanced=true;
_261.onmessage(e);
}
}
};
function closeHandler(_267,e){
_267.onclose(e);
};
function errorHandler(_269,e){
_269.onerror(e);
};
function openHandler(_26b,e){
_26b.onopen(e);
};
function bindHandlers(_26d){
var _26e=_26d._delegate;
_26e.onopen=function(e){
openHandler(_26d,e);
};
_26e.onmessage=function(e){
messageHandler(_26d,e);
};
_26e.onclose=function(e){
closeHandler(_26d,e);
};
_26e.onerror=function(e){
errorHandler(_26d,e);
};
};
function unbindHandlers(_273){
var _274=_273._delegate;
_274.onmessage=undefined;
_274.onclose=undefined;
_274.onopen=undefined;
_274.onerror=undefined;
};
var _275=function(_276,_277){
var _278;
if(_276.indexOf("?")==-1){
_278="?";
}else{
_278="&";
}
_276=_276+_278+"encoding=utf8";
return new _256(_276,_277);
};
var _279=(function(){
var _27a=function(_27b){
this.URL=_27b;
var _27c=this;
try{
_27d(_27c,_27b);
}
catch(e){
doError(_27c,e);
}
this.constructor=_27a;
};
var _27e=_27a.prototype;
_27a._flashBridge={};
_27a._flashBridge.readyWaitQueue=[];
_27a._flashBridge.failWaitQueue=[];
_27a._flashBridge.flashHasLoaded=false;
_27a._flashBridge.flashHasFailed=false;
_27e.URL="";
_27e.readyState=0;
_27e.bufferedAmount=0;
_27e.onopen=function(){
};
_27e.onmessage=function(_27f){
};
_27e.onclose=function(){
};
_27e.onerror=function(){
};
_27e.send=function(data){
switch(this.readyState){
case 0:
throw new Error("INVALID_STATE_ERR");
break;
case 1:
if(data===null){
throw new Error("data is null");
}
if(typeof (data)=="string"){
_27a._flashBridge.sendText(this._instanceId,data);
}else{
if(typeof (data.array)=="object"){
var _281;
var a=[];
var b;
while(data.remaining()){
b=data.get();
a.push(String.fromCharCode(b));
}
var _281=a.join("");
_27a._flashBridge.sendByteString(this._instanceId,_281);
return;
}else{
throw new Error("Invalid type");
}
}
_284(this);
return true;
break;
case 2:
return false;
break;
default:
throw new Error("INVALID_STATE_ERR");
}
};
_27e.close=function(){
switch(this.readyState){
case 1:
case 2:
_27a._flashBridge.disconnect(this._instanceId);
break;
}
};
_27e.disconnect=_27e.close;
var _284=function(_285){
_285.bufferedAmount=_27a._flashBridge.getBufferedAmount(_285._instanceId);
if(_285.bufferedAmount!=0){
setTimeout(function(){
_284(_285);
},1000);
}
};
var _27d=function(_286,_287){
var _288=function(key,_28a){
_28a[key]=_286;
_286._instanceId=key;
};
var _28b=function(){
doError(_286);
};
_27a._flashBridge.registerWebSocketEmulated(_287,_288,_28b);
};
function doError(_28c,e){
setTimeout(function(){
if(_28c.onerror){
_28c.onerror(e);
}
},0);
};
return _27a;
})();
var _28e=(function(){
var _28f=function(_290){
this.URL=_290;
var _291=this;
try{
_292(_291,_290);
}
catch(e){
doError(_291,e);
}
this.constructor=_28f;
};
var _293=_28f.prototype;
_279._flashBridge={};
_279._flashBridge.readyWaitQueue=[];
_279._flashBridge.failWaitQueue=[];
_279._flashBridge.flashHasLoaded=false;
_279._flashBridge.flashHasFailed=false;
_293.URL="";
_293.readyState=0;
_293.bufferedAmount=0;
_293.onopen=function(){
};
_293.onmessage=function(_294){
};
_293.onclose=function(){
};
_293.onerror=function(){
};
_293.send=function(data){
switch(this.readyState){
case 0:
throw new Error("INVALID_STATE_ERR");
break;
case 1:
if(data===null){
throw new Error("data is null");
}
if(typeof (data)=="string"){
_279._flashBridge.sendText(this._instanceId,data);
}else{
if(typeof (data.array)=="object"){
var _296;
var a=[];
var b;
while(data.remaining()){
b=data.get();
a.push(String.fromCharCode(b));
}
var _296=a.join("");
_279._flashBridge.sendByteString(this._instanceId,_296);
return;
}else{
throw new Error("Invalid type");
}
}
_299(this);
return true;
break;
case 2:
return false;
break;
default:
throw new Error("INVALID_STATE_ERR");
}
};
_293.close=function(){
switch(this.readyState){
case 1:
case 2:
_279._flashBridge.disconnect(this._instanceId);
break;
}
};
_293.disconnect=_293.close;
var _299=function(_29a){
_29a.bufferedAmount=_279._flashBridge.getBufferedAmount(_29a._instanceId);
if(_29a.bufferedAmount!=0){
setTimeout(function(){
_299(_29a);
},1000);
}
};
var _292=function(_29b,_29c){
var _29d=function(key,_29f){
_29f[key]=_29b;
_29b._instanceId=key;
};
var _2a0=function(){
doError(_29b);
};
_279._flashBridge.registerWebSocketRtmp(_29c,_29d,_2a0);
};
function doError(_2a1,e){
setTimeout(function(){
if(_2a1.onerror){
_2a1.onerror(e);
}
},0);
};
return _28f;
})();
(function(){
var _2a3={};
_279._flashBridge.registerWebSocketEmulated=function(_2a4,_2a5,_2a6){
var _2a7=function(){
var key=_279._flashBridge.doRegisterWebSocketEmulated(_2a4);
_2a5(key,_2a3);
};
if(_279._flashBridge.flashHasLoaded){
if(_279._flashBridge.flashHasFailed){
_2a6();
}else{
_2a7();
}
}else{
this.readyWaitQueue.push(_2a7);
this.failWaitQueue.push(_2a6);
}
};
_279._flashBridge.doRegisterWebSocketEmulated=function(_2a9,_2aa){
var key=_279._flashBridge.elt.registerWebSocketEmulated(_2a9,_2aa);
return key;
};
_279._flashBridge.registerWebSocketRtmp=function(_2ac,_2ad,_2ae){
var _2af=function(){
var key=_279._flashBridge.doRegisterWebSocketRtmp(_2ac);
_2ad(key,_2a3);
};
if(_279._flashBridge.flashHasLoaded){
if(_279._flashBridge.flashHasFailed){
_2ae();
}else{
_2af();
}
}else{
this.readyWaitQueue.push(_2af);
this.failWaitQueue.push(_2ae);
}
};
_279._flashBridge.doRegisterWebSocketRtmp=function(_2b1,_2b2){
var key=_279._flashBridge.elt.registerWebSocketRtmp(_2b1,_2b2);
return key;
};
_279._flashBridge.onready=function(){
var _2b4=_279._flashBridge.readyWaitQueue;
for(var i=0;i<_2b4.length;i++){
var _2b6=_2b4[i];
_2b6();
}
};
_279._flashBridge.onfail=function(){
var _2b7=_279._flashBridge.failWaitQueue;
for(var i=0;i<_2b7.length;i++){
var _2b9=_2b7[i];
_2b9();
}
};
_279._flashBridge.doOpen=function(key){
_2a3[key].readyState=1;
_2a3[key].onopen();
_2bb();
};
_279._flashBridge.doClose=function(key){
_2a3[key].readyState=2;
_2a3[key].onclose();
};
_279._flashBridge.doError=function(key){
_2a3[key].onerror();
};
_279._flashBridge.doMessage=function(key,data){
var _2c0=_2a3[key];
if(_2c0.readyState==1){
var e;
try{
e=document.createEvent("Events");
e.initEvent("message",true,true);
}
catch(ie){
e={type:"message",bubbles:true,cancelable:true};
}
e.data=unescape(data);
e.decoder=_240;
e.origin=document.domain;
e.source=null;
_2c0.onmessage(e);
}
};
var _2bb=function(){
if(browser==="firefox"){
var e=document.createElement("iframe");
e.style.display="none";
document.body.appendChild(e);
document.body.removeChild(e);
}
};
_279._flashBridge.sendText=function(key,_2c4){
this.elt.wsSend(key,escape(_2c4));
setTimeout(_2bb,200);
};
_279._flashBridge.sendByteString=function(key,_2c6){
this.elt.wsSendByteString(key,escape(_2c6));
setTimeout(_2bb,200);
};
_279._flashBridge.disconnect=function(key){
this.elt.wsDisconnect(key);
};
_279._flashBridge.getBufferedAmount=function(key){
var v=this.elt.getBufferedAmount(key);
return v;
};
})();
(function(){
var _2ca=function(_2cb){
var self=this;
var _2cd=3000;
var ID="Loader";
var ie=false;
var _2d0=-1;
self.elt=null;
var _2d1=function(){
var exp=new RegExp(".*"+_2cb+".*.js$");
var _2d3=document.getElementsByTagName("script");
for(var i=0;i<_2d3.length;i++){
if(_2d3[i].src){
var name=(_2d3[i].src).match(exp);
if(name){
name=name.pop();
var _2d6=name.split("/");
_2d6.pop();
if(_2d6.length>0){
return _2d6.join("/")+"/";
}else{
return "";
}
}
}
}
};
var _2d7=_2d1();
var _2d8=_2d7+"Loader.swf?.kv=10.05";
self.loader=function(){
var _2d9="flash";
var tags=document.getElementsByTagName("meta");
for(var i=0;i<tags.length;i++){
if(tags[i].name==="kaazing:upgrade"){
_2d9=tags[i].content;
}
}
if(_2d9!="flash"||!_2dc([9,0,115])){
_2dd();
}else{
_2d0=setTimeout(_2dd,_2cd);
_2de();
}
};
self.clearFlashTimer=function(){
clearTimeout(_2d0);
_2d0="cleared";
setTimeout(function(){
_2df(self.elt.handshake(_2cb));
},0);
};
var _2df=function(_2e0){
if(_2e0){
_279._flashBridge.flashHasLoaded=true;
_279._flashBridge.elt=self.elt;
_279._flashBridge.onready();
}else{
_2dd();
}
window.___Loader=undefined;
};
var _2dd=function(){
_279._flashBridge.flashHasLoaded=true;
_279._flashBridge.flashHasFailed=true;
_279._flashBridge.onfail();
};
var _2e1=function(){
var _2e2=null;
if(typeof (ActiveXObject)!="undefined"){
try{
ie=true;
var swf=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
var _2e4=swf.GetVariable("$version");
var _2e5=_2e4.split(" ")[1].split(",");
_2e2=[];
for(var i=0;i<_2e5.length;i++){
_2e2[i]=parseInt(_2e5[i]);
}
}
catch(e){
ie=false;
}
}
if(typeof navigator.plugins!="undefined"){
if(typeof navigator.plugins["Shockwave Flash"]!="undefined"){
var _2e4=navigator.plugins["Shockwave Flash"].description;
_2e4=_2e4.replace(/\s*r/g,".");
var _2e5=_2e4.split(" ")[2].split(".");
_2e2=[];
for(var i=0;i<_2e5.length;i++){
_2e2[i]=parseInt(_2e5[i]);
}
}
}
var _2e7=navigator.userAgent;
if(_2e2!==null&&_2e2[0]===10&&_2e2[1]===0&&_2e7.indexOf("Windows NT 6.0")!==-1){
_2e2=null;
}
return _2e2;
};
var _2dc=function(_2e8){
var _2e9=_2e1();
if(_2e9==null){
return false;
}
for(var i=0;i<Math.max(_2e9.length,_2e8.length);i++){
var _2eb=_2e9[i]-_2e8[i];
if(_2eb!=0){
return (_2eb>0)?true:false;
}
}
return true;
};
var _2de=function(){
if(ie){
var elt=document.createElement("div");
document.body.appendChild(elt);
elt.outerHTML="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" height=\"0\" width=\"0\" id=\""+ID+"\"><param name=\"movie\" value=\""+_2d8+"\"></param></object>";
self.elt=document.getElementById(ID);
}else{
var elt=document.createElement("object");
elt.setAttribute("type","application/x-shockwave-flash");
elt.setAttribute("width",0);
elt.setAttribute("height",0);
elt.setAttribute("id",ID);
elt.setAttribute("data",_2d8);
document.body.appendChild(elt);
self.elt=elt;
}
};
self.attachToOnload=function(_2ed){
if(window.addEventListener){
window.addEventListener("load",_2ed,true);
}else{
if(window.attachEvent){
window.attachEvent("onload",_2ed);
}else{
onload=_2ed;
}
}
};
if(document.readyState==="complete"){
self.loader();
}else{
self.attachToOnload(self.loader);
}
};
var _2ee={};
(function(){
var _2ef={8364:128,129:129,8218:130,402:131,8222:132,8230:133,8224:134,8225:135,710:136,8240:137,352:138,8249:139,338:140,141:141,381:142,143:143,144:144,8216:145,8217:146,8220:147,8221:148,8226:149,8211:150,8212:151,732:152,8482:153,353:154,8250:155,339:156,157:157,382:158,376:159};
var _2f0={128:8364,129:129,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,141:141,142:381,143:143,144:144,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,157:157,158:382,159:376};
_2ee.toCharCode=function(n){
if(n<128||(n>159&&n<256)){
return n;
}else{
var _2f2=_2f0[n];
if(typeof (_2f2)=="undefined"){
throw new Error("could not find: "+n);
}
return _2f2;
}
};
_2ee.fromCharCode=function(code){
if(code<128||(code>159&&code<256)){
return code;
}else{
var _2f4=_2ef[code];
if(typeof (_2f4)=="undefined"){
throw new Error("could not find: "+code);
}
return _2f4;
}
};
var _2f5=String.fromCharCode(127);
var NULL=String.fromCharCode(0);
var _2f7="\n";
var _2f8=function(s){
var a=[];
for(var i=0;i<s.length;i++){
var code=_2ee.fromCharCode(s.charCodeAt(i));
if(code==127){
i++;
if(i==s.length){
a.hasRemainder=true;
break;
}
var _2fd=_2ee.fromCharCode(s.charCodeAt(i));
switch(_2fd){
case 127:
a.push(127);
break;
case 48:
a.push(0);
break;
case 110:
a.push(10);
break;
case 114:
a.push(13);
break;
default:
throw new Error("Escaping format error");
}
}else{
a.push(code);
}
}
return a;
};
var _2fe=function(buf){
var a=[];
while(buf.remaining()){
var n=buf.getUnsigned();
var chr=String.fromCharCode(_2ee.toCharCode(n));
switch(chr){
case _2f5:
a.push(_2f5);
a.push(_2f5);
break;
case NULL:
a.push(_2f5);
a.push("0");
break;
case _2f7:
a.push(_2f5);
a.push("n");
break;
default:
a.push(chr);
}
}
return a.join("");
};
_2ee.toArray=function(s,_304){
if(_304){
return _2f8(s);
}else{
var a=[];
for(var i=0;i<s.length;i++){
a.push(_2ee.fromCharCode(s.charCodeAt(i)));
}
return a;
}
};
_2ee.toByteString=function(buf,_308){
if(_308){
return _2fe(buf);
}else{
var a=[];
while(buf.remaining()){
var n=buf.getUnsigned();
a.push(String.fromCharCode(_2ee.toCharCode(n)));
}
return a.join("");
}
};
})();
var _30b=(function(){
var _30c=function(_30d){
this.reconnectImmediately=false;
this.retry=3000;
if(browser=="opera"||browser=="ie"){
this.requiresEscaping=true;
}
if(_30d.indexOf(".kv="==-1)){
_30d+=((_30d.indexOf("?")==-1)?"?":"&")+".kv=10.05";
}else{
_30d=_30d.replace(/\.kv=[^&]*(.*)/,".kv=10.05$1");
}
var _30e=new URI(_30d);
var _30f={"http":80,"https":443};
if(_30e.port==null){
_30e.port=_30f[_30e.scheme];
_30e.authority=_30e.host+":"+_30e.port;
}
this.origin=_30e.scheme+"://"+_30e.authority;
this.location=_30d;
this.xhr=null;
this.reconnectTimer=null;
var _310=this;
setTimeout(function(){
connect(_310);
},0);
};
_25a=_30c.prototype;
var _311=0;
var _312=255;
var _313=1;
var _314=128;
var _315=127;
var _316=3000;
_25a.readyState=0;
function connect(_317){
if(_317.reconnectTimer!==null){
_317.reconnectTimer=null;
}
_317.buf=new ByteBuffer();
var _318=new URI(_317.location);
var _319=[];
if(_317.location.indexOf("&.kb=")===-1&&_317.location.indexOf("?.kb=")===-1){
_319.push(".kb=512");
}
switch(browser){
case "ie":
_319.push(".kns=1");
break;
case "safari":
_319.push(".kp=256");
break;
case "firefox":
_319.push(".kp=1025");
_319.push(String(Math.random()).substring(2));
break;
case "android":
_319.push(".kp=4096");
_319.push(".kbp=4096");
break;
}
_319.push(".kc=text/plain;charset=windows-1252");
if(_319.length>0){
if(_318.query===undefined){
_318.query=_319.join("&");
}else{
_318.query+="&"+_319.join("&");
}
}
var xhr=_317.xhr=new XMLHttpRequest0();
var _31b={"xhr":xhr,"position":0};
_317.nextMessageAt=0;
if(_317.location.indexOf(".ki=p")==-1||_317.location.indexOf("https://")==0){
xhr.onprogress=function(){
setTimeout(function(){
_process(_317,_31b);
},0);
};
}
xhr.onload=function(){
_process(_317,_31b);
if(_317.xhr==_31b.xhr&&_317.readyState!=2){
_317.xhr.onerror=function(){
};
_317.xhr.ontimeout=function(){
};
_317.xhr.onreadystatechange=function(){
};
if(_317.reconnectImmediately){
_317.reconnectImmediately=false;
connect(_317);
}else{
doError(_317);
}
}
};
xhr.onreadystatechange=function(){
if(!_317.reconnectImmediately&&xhr.readyStateChange>3){
_317.readyState=1;
doOpen(_317);
xhr.onreadystatechange=function(){
};
}
};
xhr.ontimeout=function(){
doClose(_317);
};
xhr.onerror=function(){
doClose(_317);
};
xhr.open("GET",_318.toString(),true);
xhr.send("");
if(_317.location.indexOf("&.ki=p")==-1){
setTimeout(function(){
if(xhr.readyState<3&&_317.readyState<2){
_317.location+="&.ki=p";
connect(_317);
}
},_316);
}
};
_25a.disconnect=function(){
if(this.readyState!==2){
_disconnect(this);
}
};
function _disconnect(_31c){
if(_31c.reconnectTimer!==null){
clearTimeout(_31c.reconnectTimer);
_31c.reconnectTimer=null;
}
if(_31c.xhr!==null){
_31c.xhr.onprogress=function(){
};
_31c.xhr.onload=function(){
};
_31c.xhr.onerror=function(){
};
_31c.xhr.abort();
}
_31c.lineQueue=[];
_31c.lastEventId=null;
_31c.location=null;
_31c.readyState=2;
};
function _process(_31d,_31e){
var _31f=_31e.xhr.responseText;
var _320=_31f.slice(_31e.position);
_31e.position=_31f.length;
var buf=_31d.buf;
var _322=_2ee.toArray(_320,_31d.requiresEscaping);
if(_322.hasRemainder){
_31e.position--;
}
buf.position=buf.limit;
buf.putBytes(_322);
buf.position=_31d.nextMessageAt;
buf.mark();
parse:
while(true){
if(!buf.hasRemaining()){
break;
}
var type=buf.getUnsigned();
switch(type&128){
case _311:
var _324=buf.indexOf(_312);
if(_324==-1){
break parse;
}
var _325=buf.array.slice(buf.position,_324);
var data=new ByteBuffer(_325);
var _327=_324-buf.position;
buf.skip(_327+1);
buf.mark();
if(type==_313){
handleCommandFrame(_31d,data);
}else{
dispatchText(_31d,data);
}
break;
case _314:
var _328=0;
var _329=false;
while(buf.hasRemaining()){
var b=buf.getUnsigned();
_328=_328<<7;
_328|=(b&127);
if((b&128)!=128){
_329=true;
break;
}
}
if(!_329){
break parse;
}
if(buf.remaining()<_328){
break parse;
}
var _32b=buf.array.slice(buf.position,buf.position+_328);
var _32c=new ByteBuffer(_32b);
buf.skip(_328);
buf.mark();
dispatchBytes(_31d,_32c);
break;
default:
throw new Error("Emulation protocol error. Unknown frame type: "+type);
}
}
buf.reset();
buf.compact();
nextMessageAt=buf.position;
};
function handleCommandFrame(_32d,data){
while(data.remaining()){
var _32f=String.fromCharCode(data.getUnsigned());
switch(_32f){
case "0":
break;
case "1":
_32d.reconnectImmediately=true;
break;
default:
throw new Error("Protocol decode error. Unknown command: "+_32f);
}
}
};
function dispatchBytes(_330,buf){
var e=document.createEvent("Events");
e.initEvent("message",true,true);
e.lastEventId=_330.lastEventId;
e.data=_24f(buf);
e.decoder=_240;
e.origin=_330.origin;
if(e.source!==null){
e.source=null;
}
if(typeof (_330.onmessage)==="function"){
_330.onmessage(e);
}
};
function dispatchText(data){
var e=document.createEvent("Events");
e.initEvent("message",true,true);
e.lastEventId=$this.lastEventId;
e.data=data;
e.origin=$this.origin;
if(e.source!==null){
e.source=null;
}
if(typeof ($this.onmessage)==="function"){
$this.onmessage(e);
}
};
function doOpen(_335){
if(typeof (_335.onopen)==="function"){
_335.onopen();
}
};
function doClose(_336){
if(_336.readyState!=2){
_336.disconnect();
doError(_336);
}
};
function doError(_337){
var e=document.createEvent("Events");
e.initEvent("error",true,true);
if(typeof (_337.onerror)==="function"){
_337.onerror(e);
}
};
return _30c;
})();
var _339=(function(){
var _33a=function(_33b,_33c){
this.URL=_33b;
if(_33b.indexOf(".kv=")==-1){
_33b+=((_33b.indexOf("?")==-1)?"?":"&")+".kv=10.05";
}else{
_33b=_33b.replace(/\.kv=[^&]*(.*)/,".kv=10.05$1");
}
if(browser=="opera"||browser=="ie"){
this.requiresEscaping=true;
}
this._sendQueue=[];
_33d(this);
};
_25a=_33a.prototype;
_25a.readyState=0;
_25a.bufferedAmount=0;
_25a.URL="";
_25a.onopen=function(){
};
_25a.onerror=function(){
};
_25a.onmessage=function(_33e){
};
_25a.onclose=function(){
};
var _33f=128;
var _340=0;
var _341=255;
var _342=1;
var _343=[_342,48,49,_341];
var _344=[_342,48,50,_341];
_25a.send=function(data){
switch(this.readyState){
case 0:
throw new Error("INVALID_STATE_ERR");
case 1:
if(data===null){
throw new Error("data is null");
}
var buf=new ByteBuffer();
if(typeof data=="string"){
buf.put(_340);
buf.putString(data,Charset.UTF8);
buf.put(_341);
}else{
if(data.constructor==ByteBuffer){
buf.put(_33f);
_347(buf,data.remaining());
buf.putBuffer(data);
}else{
throw new Error("Invalid type for send");
}
}
buf.flip();
doSend(this,buf);
return true;
case 2:
return false;
default:
throw new Error("INVALID_STATE_ERR");
}
};
_25a.close=function(){
switch(this.readyState){
case 1:
doSend(this,new ByteBuffer(_344));
_348(this);
break;
}
};
function doSend(_349,buf){
_349.bufferedAmount+=buf.remaining();
_349._sendQueue.push(buf);
if(!_349._writeSuspended){
doFlush(_349);
}
};
function doFlush(_34b){
var _34c=_34b._sendQueue;
var _34d=_34c.length;
_34b._writeSuspended=(_34d>0);
if(_34d>0){
var xhr=new XMLHttpRequest0();
xhr.open("POST",_34b._upstream,true);
xhr.onreadystatechange=function(){
if(xhr.readyState==4){
switch(xhr.status){
case 200:
setTimeout(function(){
doFlush(_34b);
},0);
break;
default:
_348(_34b);
break;
}
}
};
var out=new ByteBuffer();
while(_34c.length){
out.putBuffer(_34c.shift());
}
out.putBytes(_343);
out.flip();
if(xhr.sendAsBinary){
xhr.setRequestHeader("Content-Type","application/octet-stream");
xhr.sendAsBinary(_24f(out));
}else{
xhr.setRequestHeader("Content-Type","text/plain; charset=utf-8");
xhr.send(_24f(out,_34b.requiresEscaping));
}
}
_34b.bufferedAmount=0;
};
var _33d=function(_350){
var url=new URI(_350.URL);
url.scheme=url.scheme.replace("ws","http");
var _352=_350.requiresEscaping?"/;e/cte":"/;e/ct";
url.path=url.path.replace(/[\/]?$/,_352);
var _353=url.toString();
var _354=_353.indexOf("?");
if(_354==-1){
_353+="?";
}else{
_353+="&";
}
_353+=".kn="+String(Math.random()).substring(2);
if(browser=="android"||browser.ios){
_353+="&.kkt=30";
}
var _355=new XMLHttpRequest0();
var _356=false;
_355.open("GET",_353,true);
_355.onreadystatechange=function(){
switch(_355.readyState){
case 2:
timer=setTimeout(function(){
if(!_356){
_357(_350);
}
},5000);
break;
case 4:
_356=true;
if(_350.readyState<2){
if(_355.status==201){
var _358=_355.responseText.split("\n");
_350._upstream=_358[0];
var _359=_358[1];
_350._downstream=new _30b(_359);
_35a(_350,_350._downstream);
_35b(_350);
}else{
_357(_350);
}
}
break;
}
};
_355.send(null);
};
var _35a=function(_35c,_35d){
_35d.onmessage=function(_35e){
switch(_35e.type){
case "message":
if(_35c.readyState==1){
_35c.onmessage(_35e);
}
break;
}
};
_35d.onerror=function(){
_35d.disconnect();
_348(_35c);
};
};
var _347=function(buf,_360){
var _361=0;
var _362=0;
do{
_362<<=8;
_362|=(_360&127);
_360>>=7;
_361++;
}while(_360>0);
do{
var _363=_362&255;
_362>>=8;
if(_361!=1){
_363|=128;
}
buf.put(_363);
}while(--_361>0);
};
var _35b=function(_364){
_364.readyState=1;
_364.onopen();
};
var _357=function(_365){
if(_365.readyState<2){
_365.readyState=2;
_365.onerror();
}
};
var _348=function(_366){
switch(_366.readyState){
case 0:
case 2:
break;
case 1:
_366.readyState=2;
_366.onclose();
break;
default:
}
};
return _33a;
})();
(function(){
var _367="javascript:ws";
var _368="javascript:wss";
var _369="javascript:wse";
var _36a="javascript:wse+ssl";
var _36b="flash:wse";
var _36c="flash:wse+ssl";
var _36d="flash:wsr";
var _36e="flash:wsr+ssl";
var _36f={};
_36f[_367]=_256;
_36f[_368]=_256;
_36f[_369]=_339;
_36f[_36a]=_339;
_36f[_36b]=_279;
_36f[_36c]=_279;
_36f[_36d]=_28e;
_36f[_36e]=_28e;
window.WebSocket=function(url,_371){
var _372=new URI(url);
if(_372.port===undefined){
var _373=_372.scheme;
_372.port=((_373.indexOf("wss")==-1)&&(_373.indexOf("ssl")==-1))?80:443;
}
url=_372.toString();
this.URL=_372.toString();
this.readyState=0;
this._subprotocol=_371;
var _374=splitScheme(url);
var _375=_374.shift();
this._urlRemainder=_374.shift();
if(_375=="ws"||_375=="wse"||_375=="wss"||_375=="wse+ssl"){
var _376=_22d("kaazing:WebSocketConnectionStrategies");
var _377=null;
if(_376){
_377=_376.split(" ");
}
if(!_377){
if(_375=="ws"){
this._connectionStrategies=_236(WebSocket.connectionStrategies,function(_378){
return !(_378.match("wss")||_378.match("ssl"));
});
}else{
if(_375=="wss"){
this._connectionStrategies=_236(WebSocket.connectionStrategies,function(_379){
return (_379.match("wss")||_379.match("ssl"));
});
}else{
if(_375.match("wse")){
var _37a=function(s){
return s.match("wse");
};
this._connectionStrategies=_236(WebSocket.connectionStrategies,_37a);
}
}
}
}
}else{
if(_36f[_375]){
this._connectionStrategies=[_375];
}else{
throw new Error("Unsupported composite scheme: "+_375);
}
}
this.URL=url.replace("flash:","").replace("javascript:","").replace("wse+ssl:","wss:").replace("wse:","ws:").replace("wsr+ssl:","wss:").replace("wsr:","ws:");
fallbackNext(this);
};
function pickStrategies(){
switch(browser){
case "android":
case "opera":
return [_367,_369,_368,_36a];
case "ie":
var _37c=navigator.appVersion;
if(_37c.indexOf("MSIE 6.0")>=0||_37c.indexOf("MSIE 7.0")>=0){
return [_367,_36b,_369,_368,_36c,_36a];
}else{
return [_367,_369,_36b,_368,_36a,_36c];
}
case "firefox":
case "chrome":
case "safari":
default:
return [_367,_369,_36b,_368,_36a,_36c];
}
};
window.WebSocket.connectionStrategies=pickStrategies();
window.WebSocket.__impls__=_36f;
var _37d=WebSocket.prototype;
function splitScheme(url){
var _37f=url.split("://");
var _380=_37f.shift();
var _381=_37f.shift();
return [_380,_381];
};
_37d.send=function(data){
switch(this.readyState){
case 0:
throw new Error("INVALID_STATE_ERR");
case 1:
if(data===null){
throw new Error("data is null");
}
this._delegate.send(data);
_383(this);
return true;
case 2:
return false;
default:
throw new Error("INVALID_STATE_ERR");
}
};
var _383=function(_384){
_384.bufferedAmount=_384._delegate.bufferedAmount;
if(_384.bufferedAmount!=0){
setTimeout(function(){
_383(_384);
},1000);
}
};
_37d.postMessage=_37d.send;
_37d.disconnect=_37d.close;
_37d.close=function(){
switch(this.readyState){
case 1:
case 2:
this._delegate.close();
break;
}
};
function initDelegate(_385,_386){
if(typeof (_385._subprotocol)!=="undefined"){
_385._delegate=new _386(_385.URL,_385._subprotocol);
}else{
_385._delegate=new _386(_385.URL);
}
bindHandlers(_385);
};
function fallbackNext(_387){
var _388=_387._connectionStrategies.shift();
var _389=_36f[_388];
if(_389){
initDelegate(_387,_389);
}else{
doClose(_387);
}
};
function doOpen(_38a,ev){
if(_38a.readyState<1){
_38a.readyState=1;
if(typeof (_38a.onopen)!=="undefined"){
if(!ev){
try{
ev=document.createEvent("Events");
ev.initEvent("open",true,true);
}
catch(ie){
ev={type:"open",bubbles:true,cancelable:true};
}
}
try{
_38a.onopen(ev);
}
catch(e){
}
}
}
};
function doClose(_38c,ev){
if(_38c.readyState<2){
_38c.readyState=2;
if(typeof (_38c.onclose)!=="undefined"){
setTimeout(function(){
if(!ev){
try{
ev=document.createEvent("Events");
ev.initEvent("close",true,true);
}
catch(ie){
ev={type:"close",bubbles:true,cancelable:true};
}
}
try{
_38c.onclose(ev);
}
catch(e){
}
},0);
}
}
};
function errorHandler(_38e,ev){
unbindHandlers(_38e);
fallbackNext(_38e);
};
function openHandler(_390,ev){
switch(_390.readyState){
case 0:
doOpen(_390,ev);
break;
case 1:
case 2:
var _392=(ev?" from "+ev.target:"");
throw new Error("Invalid readyState for open event"+_392);
default:
throw new Error("Socket has invalid readyState: "+_390.readyState);
}
};
function closeHandler(_393,ev){
switch(_393.readyState){
case 0:
unbindHandlers(_393);
fallbackNext(_393);
break;
case 1:
doClose(_393,ev);
break;
case 2:
var _395=(ev?" from "+ev.target:"");
throw new Error("Invalid readyState for close event"+_395);
break;
default:
throw new Error("Socket has invalid readyState: "+_393.readyState);
}
};
function bindHandlers(_396){
var _397=_396._delegate;
_397.onmessage=function(e){
if(e.decoder){
var e2;
try{
e2=document.createEvent("Events");
e2.initEvent("message",true,true);
}
catch(ie){
e2={type:"message",bubbles:true,cancelable:true};
}
e2.data=e.decoder(e.data);
e2.origin=e.origin;
e2.source=_396;
_396.onmessage(e2);
}else{
_396.onmessage(e);
}
};
_397.onclose=function(e){
closeHandler(_396,e);
};
_397.onopen=function(e){
openHandler(_396,e);
};
_397.onerror=function(e){
errorHandler(_396,e);
};
};
function unbindHandlers(_39d){
var _39e=_39d._delegate;
if(_39e){
_39e.onerror=undefined;
_39e.onmessage=undefined;
_39e.onclose=undefined;
_39e.onopen=undefined;
}
};
}());
(function(){
var _39f="javascript:ws";
var _3a0="javascript:wss";
var _3a1="javascript:wse";
var _3a2="javascript:wse+ssl";
var _3a3="flash:wse";
var _3a4="flash:wse+ssl";
var _3a5="flash:wsr";
var _3a6="flash:wsr+ssl";
var _3a7={};
_3a7[_39f]=_275;
_3a7[_3a0]=_275;
_3a7[_3a1]=_339;
_3a7[_3a2]=_339;
_3a7[_3a3]=_279;
_3a7[_3a4]=_279;
_3a7[_3a5]=_28e;
_3a7[_3a6]=_28e;
window.ByteSocket=function(url,_3a9){
var _3aa=new URI(url);
if(_3aa.port===undefined){
var _3ab=_3aa.scheme;
_3aa.port=((_3ab.indexOf("wss")==-1)&&(_3ab.indexOf("ssl")==-1))?80:443;
}
url=_3aa.toString();
this.URL=_3aa.toString();
this.readyState=0;
this._subprotocol=_3a9;
var _3ac=splitScheme(url);
var _3ad=_3ac.shift();
this._urlRemainder=_3ac.shift();
if(_3ad=="ws"||_3ad=="wse"||_3ad=="wss"||_3ad=="wse+ssl"){
var _3ae=_22d("kaazing:ByteSocketConnectionStrategies");
var _3af=null;
if(_3ae){
_3af=_3ae.split(" ");
}
if(!_3af){
if(_3ad=="ws"){
this._connectionStrategies=_236(ByteSocket.connectionStrategies,function(_3b0){
return !(_3b0.match("wss")||_3b0.match("ssl"));
});
}else{
if(_3ad=="wss"){
this._connectionStrategies=_236(ByteSocket.connectionStrategies,function(_3b1){
return (_3b1.match("wss")||_3b1.match("ssl"));
});
}else{
if(_3ad.match("wse")){
var _3b2=function(s){
return s.match("wse");
};
this._connectionStrategies=_236(ByteSocket.connectionStrategies,_3b2);
}
}
}
}
}else{
if(_3a7[_3ad]){
this._connectionStrategies=[_3ad];
}else{
throw new Error("Unsupported composite scheme: "+_3ad);
}
}
this.URL=url.replace("flash:","").replace("javascript:","").replace("wse+ssl:","wss:").replace("wse:","ws:").replace("wsr+ssl:","wss:").replace("wsr:","ws:");
fallbackNext(this);
};
function pickStrategies(){
switch(browser){
case "android":
case "opera":
return [_39f,_3a1,_3a0,_3a2];
case "ie":
var _3b4=navigator.appVersion;
if(_3b4.indexOf("MSIE 6.0")>=0||_3b4.indexOf("MSIE 7.0")>=0){
return [_39f,_3a3,_3a1,_3a0,_3a4,_3a2];
}else{
return [_39f,_3a1,_3a3,_3a0,_3a2,_3a4];
}
case "firefox":
case "chrome":
case "safari":
default:
return [_39f,_3a1,_3a3,_3a0,_3a2,_3a4];
}
};
window.ByteSocket.connectionStrategies=pickStrategies();
window.ByteSocket.__impls__=_3a7;
var _3b5=ByteSocket.prototype;
function splitScheme(url){
var _3b7=url.split("://");
var _3b8=_3b7.shift();
var _3b9=_3b7.shift();
return [_3b8,_3b9];
};
_3b5.send=function(data){
if(data.constructor!=window.ByteBuffer){
throw new Error("ByteSocket.send must be called with a ByteBuffer argument");
}
switch(this.readyState){
case 0:
throw new Error("INVALID_STATE_ERR");
case 1:
if(data===null){
throw new Error("data is null");
}
this._delegate.send(data);
_3bb(this);
return true;
case 2:
return false;
default:
throw new Error("INVALID_STATE_ERR");
}
};
var _3bb=function(_3bc){
_3bc.bufferedAmount=_3bc._delegate.bufferedAmount;
if(_3bc.bufferedAmount!=0){
setTimeout(function(){
_3bb(_3bc);
},1000);
}
};
_3b5.postMessage=_3b5.send;
_3b5.disconnect=_3b5.close;
_3b5.close=function(){
switch(this.readyState){
case 1:
case 2:
this._delegate.close();
break;
}
};
function initDelegate(_3bd,_3be){
if(typeof (_3bd._subprotocol)!=="undefined"){
_3bd._delegate=new _3be(_3bd.URL,_3bd._subprotocol);
}else{
_3bd._delegate=new _3be(_3bd.URL);
}
bindHandlers(_3bd);
};
function fallbackNext(_3bf){
var _3c0=_3bf._connectionStrategies.shift();
var _3c1=_3a7[_3c0];
if(_3c1){
initDelegate(_3bf,_3c1);
}else{
doClose(_3bf);
}
};
function doClose(_3c2){
if(typeof (_3c2.onclose)!=="undefined"){
_3c2.onclose();
}
};
function errorHandler(_3c3,e){
unbindHandlers(_3c3);
fallbackNext(_3c3);
};
function openHandler(_3c5,e){
switch(_3c5.readyState){
case 0:
_3c5.readyState=1;
_3c5.onopen(e);
break;
case 1:
case 2:
var _3c7=(e?" from "+e.target:"");
throw new Error("Invalid readyState for open event"+_3c7);
break;
default:
throw new Error("Socket has invalid readyState: "+_3c5.readyState);
}
};
function closeHandler(_3c8,e){
switch(_3c8.readyState){
case 0:
unbindHandlers(_3c8);
fallbackNext(_3c8);
break;
case 1:
_3c8.readyState=2;
setTimeout(function(){
doClose(_3c8);
},0);
break;
case 2:
var _3ca=(e?" from "+e.target:"");
throw new Error("Invalid readyState for close event"+_3ca);
break;
default:
throw new Error("Socket has invalid readyState: "+_3c8.readyState);
}
};
function bindHandlers(_3cb){
var _3cc=_3cb._delegate;
_3cc.onmessage=function(e){
var a=[];
for(var i=0;i<e.data.length;i++){
a.push(e.data.charCodeAt(i)&255);
}
var e2;
try{
e2=document.createEvent("Events");
e2.initEvent("message",true,true);
}
catch(ie){
e2={type:"message",bubbles:true,cancelable:true};
}
e2.data=new ByteBuffer(a);
e2.origin=e.origin;
e2.source=_3cb;
_3cb.onmessage(e2);
};
_3cc.onclose=function(e){
closeHandler(_3cb,e);
};
_3cc.onopen=function(e){
openHandler(_3cb,e);
};
_3cc.onerror=function(e){
errorHandler(_3cb,e);
};
};
function unbindHandlers(_3d4){
var _3d5=_3d4._delegate;
if(_3d5){
_3d5.onerror=undefined;
_3d5.onmessage=undefined;
_3d5.onclose=undefined;
_3d5.onopen=undefined;
}
};
}());
window.___Loader=new _2ca(_201);
})();
})();
var EventDispatcher=function(){
};
(function(){
var _3d6=EventDispatcher.prototype;
_3d6._initEventDispatcher=function(){
this._eventListeners={};
};
_3d6.addEventListener=function(type,_3d8){
var _3d9=this._eventListeners[type];
if(_3d9){
_3d9.push(_3d8);
}else{
this._eventListeners[type]=[_3d8];
}
};
_3d6.removeEventListener=function(type,_3db){
var _3dc=this._eventListeners[type];
if(_3dc){
var _3dd=[];
for(var i=0;i<_3dc.length;i++){
if(_3dc[i]!==_3db){
_3dd.push(_3dc[i]);
}
}
this._eventListeners[type]=new Listeners;
}
};
_3d6.hasEventListener=function(type){
var _3e0=this._eventListeners[type];
return Boolean(_3e0);
};
_3d6.dispatchEvent=function(e){
var _3e2=this._eventListeners[e.type];
if(_3e2){
for(var i=0;i<_3e2.length;i++){
_3e2[i](e);
}
}
if(this["on"+e.type]){
this["on"+e.type](e);
}
};
})();
var AmqpClient=function(){
this._options={};
this._readyState=0;
this._init();
};
(function(){
var _3e4=function(_3e5){
this.context=_3e5;
this.states={};
};
(function(){
var _3e6=_3e4.prototype;
var _3e7=function _3e7(){
};
_3e6.enterState=function(_3e8,_3e9,args){
if(this.currentState){
this.currentState.exitBehavior(this.context,_3e9,args,_3e8);
}
var _3eb=this.states[_3e8];
this.currentState=_3eb;
try{
_3eb.entryBehavior(this.context,_3e9,args,_3e8);
}
catch(e){
var _3ec=new Error("Could not call behavior for state "+_3eb.stateName+"\n\n"+e.message);
_3ec.innerException=e;
throw (_3ec);
}
};
_3e6.addState=function(_3ed,_3ee,_3ef,_3f0){
var _3f1={};
_3f1.stateName=_3ed;
_3f1.entryBehavior=_3ef||_3e7;
_3f1.exitBehavior=_3f0||_3e7;
this.states[_3ed]=(_3f1);
_3f1.rules={};
var _3f2=_3ee||[];
for(var i=0;i<_3f2.length;i++){
var rule=_3f2[i];
for(var j=0;j<rule.inputs.length;j++){
var _3f6=rule.inputs[j];
_3f1.rules[_3f6]=rule.targetState;
}
}
};
_3e6.feedInput=function(_3f7,args){
var _3f9=this.currentState;
if(_3f9.rules[_3f7]){
var sm=this;
var func=function(){
sm.enterState(_3f9.rules[_3f7],_3f7,args);
};
func();
return true;
}else{
return false;
}
};
})();
var _3fc=function(){
};
(function(){
_3fc.prototype=new EventDispatcher();
var _3fd=_3fc.prototype;
var _3fe=function _3fe(){
};
var _3ff=function _3ff(ex){
throw ex;
};
_3fd._stateMachine=null;
_3fd.onerror=function(e){
};
_3fd._actions=[];
_3fd._processActions=function _processActions(){
if(!this._actions.length){
return;
}
var _402=this._actions[0];
var _403=this._stateMachine.feedInput(_402.actionName+"Action",_402);
if(_403){
var _404=this;
setTimeout(function(){
try{
_402.func.apply(_404,_402.args);
}
catch(ex1){
_402.error(ex1);
}
},0);
this._actions.shift();
}
};
_3fd._enqueueAction=function _enqueueAction(_405,func,args,_408,_409){
var _40a={};
_40a.actionName=_405||"";
_40a.func=func||_3fe;
_40a.args=args||null;
_40a.continuation=_408||_3fe;
_40a.error=_409||_3ff;
this._actions.push(_40a);
var _40b=this;
var func=function(){
_40b._processActions();
};
setTimeout(func,0);
};
_3fd._initAsyncClient=function(){
this._initEventDispatcher();
this._stateMachine=new _3e4(this);
this._actions=[];
this._buffer=null;
this._socket=null;
};
_3fd._send=null;
_3fd._readHandler=null;
})();
var _40c={};
_40c.FRAME_METHOD={"value":1,"message":""};
_40c.FRAME_HEADER={"value":2,"message":""};
_40c.FRAME_BODY={"value":3,"message":""};
_40c.FRAME_HEARTBEAT={"value":8,"message":""};
_40c.FRAME_MIN_SIZE={"value":4096,"message":""};
_40c.FRAME_END={"value":206,"message":""};
_40c.REPLY_SUCCESS={"value":200,"message":"Indicates that the method completed successfully. This reply code is reserved for future use - the current protocol design does not use positive confirmation and reply codes are sent only in case of an error."};
_40c.CONTENT_TOO_LARGE={"value":311,"message":"The client attempted to transfer content larger than the server could accept at the present time. The client may retry at a later time."};
_40c.NO_CONSUMERS={"value":313,"message":"When the exchange cannot deliver to a consumer when the immediate flag is set. As a result of pending data on the queue or the absence of any consumers of the queue."};
_40c.CONNECTION_FORCED={"value":320,"message":"An operator intervened to close the connection for some reason. The client may retry at some later date."};
_40c.INVALID_PATH={"value":402,"message":"The client tried to work with an unknown virtual host."};
_40c.ACCESS_REFUSED={"value":403,"message":"The client attempted to work with a server entity to which it has no access due to security settings."};
_40c.NOT_FOUND={"value":404,"message":"The client attempted to work with a server entity that does not exist."};
_40c.RESOURCE_LOCKED={"value":405,"message":"The client attempted to work with a server entity to which it has no access because another client is working with it."};
_40c.PRECONDITION_FAILED={"value":406,"message":"The client requested a method that was not allowed because some precondition failed."};
_40c.FRAME_ERROR={"value":501,"message":"The sender sent a malformed frame that the recipient could not decode. This strongly implies a programming error in the sending peer."};
_40c.SYNTAX_ERROR={"value":502,"message":"The sender sent a frame that contained illegal values for one or more fields. This strongly implies a programming error in the sending peer."};
_40c.COMMAND_INVALID={"value":503,"message":"The client sent an invalid sequence of frames, attempting to perform an operation that was considered invalid by the server. This usually implies a programming error in the client."};
_40c.CHANNEL_ERROR={"value":504,"message":"The client attempted to work with a channel that had not been correctly opened. This most likely indicates a fault in the client layer."};
_40c.UNEXPECTED_FRAME={"value":505,"message":"The peer sent a frame that was not expected, usually in the context of a content header and body.  This strongly indicates a fault in the peer's content processing."};
_40c.RESOURCE_ERROR={"value":506,"message":"The server could not complete the method because it lacked sufficient resources. This may be due to the client creating too many of some type of entity."};
_40c.NOT_ALLOWED={"value":530,"message":"The client tried to work with some entity in a manner that is prohibited by the server, due to security settings or by some other criteria."};
_40c.NOT_IMPLEMENTED={"value":540,"message":"The client tried to use functionality that is not implemented in the server."};
_40c.INTERNAL_ERROR={"value":541,"message":"The server could not complete the method because of an internal error. The server may require intervention by an operator in order to resume normal operations."};
var _40d={"ClassId":{"type":"short","asserts":[]},"ConsumerTag":{"type":"shortstr","asserts":[]},"DeliveryTag":{"type":"longlong","asserts":[]},"ExchangeName":{"type":"shortstr","asserts":[]},"MethodId":{"type":"short","asserts":[]},"NoAck":{"type":"bit","asserts":[]},"NoLocal":{"type":"bit","asserts":[]},"NoWait":{"type":"bit","asserts":[]},"Path":{"type":"shortstr","asserts":[]},"PeerProperties":{"type":"table","asserts":[]},"QueueName":{"type":"shortstr","asserts":[]},"Redelivered":{"type":"bit","asserts":[]},"MessageCount":{"type":"long","asserts":[]},"ReplyCode":{"type":"short","asserts":[]},"ReplyText":{"type":"shortstr","asserts":[]},"Bit":{"type":"bit","asserts":[]},"Octet":{"type":"octet","asserts":[]},"Short":{"type":"short","asserts":[]},"Long":{"type":"long","asserts":[]},"Longlong":{"type":"longlong","asserts":[]},"Shortstr":{"type":"shortstr","asserts":[]},"Longstr":{"type":"longstr","asserts":[]},"Timestamp":{"type":"timestamp","asserts":[]},"Table":{"type":"table","asserts":[]}};
var _40e={};
_40e.Connection={};
_40e.Connection.startConnection={};
_40e.Connection.startConnection.allParameters=[{"name":"versionMajor","type":"Octet"},{"name":"versionMinor","type":"Octet"},{"name":"serverProperties","type":"PeerProperties"},{"name":"mechanisms","type":"Longstr"},{"name":"locales","type":"Longstr"}];
_40e.Connection.startConnection.returnType="StartOkConnection";
_40e.Connection.startConnection.index=10;
_40e.Connection.startConnection.classIndex=10;
_40e.Connection.startConnection.synchronous=true;
_40e.Connection.startConnection.hasContent=false;
_40e.Connection.startOkConnection={};
_40e.Connection.startOkConnection.allParameters=[{"name":"clientProperties","type":"PeerProperties"},{"name":"mechanism","type":"Shortstr"},{"name":"response","type":"Longstr"},{"name":"locale","type":"Shortstr"}];
_40e.Connection.startOkConnection.returnType="voidConnection";
_40e.Connection.startOkConnection.index=11;
_40e.Connection.startOkConnection.classIndex=10;
_40e.Connection.startOkConnection.synchronous=true;
_40e.Connection.startOkConnection.hasContent=false;
_40e.Connection.secureConnection={};
_40e.Connection.secureConnection.allParameters=[{"name":"challenge","type":"Longstr"}];
_40e.Connection.secureConnection.returnType="SecureOkConnection";
_40e.Connection.secureConnection.index=20;
_40e.Connection.secureConnection.classIndex=10;
_40e.Connection.secureConnection.synchronous=true;
_40e.Connection.secureConnection.hasContent=false;
_40e.Connection.secureOkConnection={};
_40e.Connection.secureOkConnection.allParameters=[{"name":"response","type":"Longstr"}];
_40e.Connection.secureOkConnection.returnType="voidConnection";
_40e.Connection.secureOkConnection.index=21;
_40e.Connection.secureOkConnection.classIndex=10;
_40e.Connection.secureOkConnection.synchronous=true;
_40e.Connection.secureOkConnection.hasContent=false;
_40e.Connection.tuneConnection={};
_40e.Connection.tuneConnection.allParameters=[{"name":"channelMax","type":"Short"},{"name":"frameMax","type":"Long"},{"name":"heartbeat","type":"Short"}];
_40e.Connection.tuneConnection.returnType="TuneOkConnection";
_40e.Connection.tuneConnection.index=30;
_40e.Connection.tuneConnection.classIndex=10;
_40e.Connection.tuneConnection.synchronous=true;
_40e.Connection.tuneConnection.hasContent=false;
_40e.Connection.tuneOkConnection={};
_40e.Connection.tuneOkConnection.allParameters=[{"name":"channelMax","type":"Short"},{"name":"frameMax","type":"Long"},{"name":"heartbeat","type":"Short"}];
_40e.Connection.tuneOkConnection.returnType="voidConnection";
_40e.Connection.tuneOkConnection.index=31;
_40e.Connection.tuneOkConnection.classIndex=10;
_40e.Connection.tuneOkConnection.synchronous=true;
_40e.Connection.tuneOkConnection.hasContent=false;
_40e.Connection.openConnection={};
_40e.Connection.openConnection.allParameters=[{"name":"virtualHost","type":"Path"},{"name":"reserved1","type":"Shortstr"},{"name":"reserved2","type":"Bit"}];
_40e.Connection.openConnection.returnType="OpenOkConnection";
_40e.Connection.openConnection.index=40;
_40e.Connection.openConnection.classIndex=10;
_40e.Connection.openConnection.synchronous=true;
_40e.Connection.openConnection.hasContent=false;
_40e.Connection.openOkConnection={};
_40e.Connection.openOkConnection.allParameters=[{"name":"reserved1","type":"Shortstr"}];
_40e.Connection.openOkConnection.returnType="voidConnection";
_40e.Connection.openOkConnection.index=41;
_40e.Connection.openOkConnection.classIndex=10;
_40e.Connection.openOkConnection.synchronous=true;
_40e.Connection.openOkConnection.hasContent=false;
_40e.Connection.closeConnection={};
_40e.Connection.closeConnection.allParameters=[{"name":"replyCode","type":"ReplyCode"},{"name":"replyText","type":"ReplyText"},{"name":"classId","type":"ClassId"},{"name":"methodId","type":"MethodId"}];
_40e.Connection.closeConnection.returnType="CloseOkConnection";
_40e.Connection.closeConnection.index=50;
_40e.Connection.closeConnection.classIndex=10;
_40e.Connection.closeConnection.synchronous=true;
_40e.Connection.closeConnection.hasContent=false;
_40e.Connection.closeOkConnection={};
_40e.Connection.closeOkConnection.allParameters=[];
_40e.Connection.closeOkConnection.returnType="voidConnection";
_40e.Connection.closeOkConnection.index=51;
_40e.Connection.closeOkConnection.classIndex=10;
_40e.Connection.closeOkConnection.synchronous=true;
_40e.Connection.closeOkConnection.hasContent=false;
_40e.Connection.methodLookup={10:"startConnection",11:"startOkConnection",20:"secureConnection",21:"secureOkConnection",30:"tuneConnection",31:"tuneOkConnection",40:"openConnection",41:"openOkConnection",50:"closeConnection",51:"closeOkConnection"};
_40e.Connection.className="Connection";
_40e.Channel={};
_40e.Channel.openChannel={};
_40e.Channel.openChannel.allParameters=[{"name":"reserved1","type":"Shortstr"}];
_40e.Channel.openChannel.returnType="OpenOkChannel";
_40e.Channel.openChannel.index=10;
_40e.Channel.openChannel.classIndex=20;
_40e.Channel.openChannel.synchronous=true;
_40e.Channel.openChannel.hasContent=false;
_40e.Channel.openOkChannel={};
_40e.Channel.openOkChannel.allParameters=[{"name":"reserved1","type":"Longstr"}];
_40e.Channel.openOkChannel.returnType="voidChannel";
_40e.Channel.openOkChannel.index=11;
_40e.Channel.openOkChannel.classIndex=20;
_40e.Channel.openOkChannel.synchronous=true;
_40e.Channel.openOkChannel.hasContent=false;
_40e.Channel.flowChannel={};
_40e.Channel.flowChannel.allParameters=[{"name":"active","type":"Bit"}];
_40e.Channel.flowChannel.returnType="FlowOkChannel";
_40e.Channel.flowChannel.index=20;
_40e.Channel.flowChannel.classIndex=20;
_40e.Channel.flowChannel.synchronous=true;
_40e.Channel.flowChannel.hasContent=false;
_40e.Channel.flowOkChannel={};
_40e.Channel.flowOkChannel.allParameters=[{"name":"active","type":"Bit"}];
_40e.Channel.flowOkChannel.returnType="voidChannel";
_40e.Channel.flowOkChannel.index=21;
_40e.Channel.flowOkChannel.classIndex=20;
_40e.Channel.flowOkChannel.synchronous=false;
_40e.Channel.flowOkChannel.hasContent=false;
_40e.Channel.closeChannel={};
_40e.Channel.closeChannel.allParameters=[{"name":"replyCode","type":"ReplyCode"},{"name":"replyText","type":"ReplyText"},{"name":"classId","type":"ClassId"},{"name":"methodId","type":"MethodId"}];
_40e.Channel.closeChannel.returnType="CloseOkChannel";
_40e.Channel.closeChannel.index=40;
_40e.Channel.closeChannel.classIndex=20;
_40e.Channel.closeChannel.synchronous=true;
_40e.Channel.closeChannel.hasContent=false;
_40e.Channel.closeOkChannel={};
_40e.Channel.closeOkChannel.allParameters=[];
_40e.Channel.closeOkChannel.returnType="voidChannel";
_40e.Channel.closeOkChannel.index=41;
_40e.Channel.closeOkChannel.classIndex=20;
_40e.Channel.closeOkChannel.synchronous=true;
_40e.Channel.closeOkChannel.hasContent=false;
_40e.Channel.methodLookup={10:"openChannel",11:"openOkChannel",20:"flowChannel",21:"flowOkChannel",40:"closeChannel",41:"closeOkChannel"};
_40e.Channel.className="Channel";
_40e.Exchange={};
_40e.Exchange.declareExchange={};
_40e.Exchange.declareExchange.allParameters=[{"name":"reserved1","type":"Short"},{"name":"exchange","type":"ExchangeName"},{"name":"type","type":"Shortstr"},{"name":"passive","type":"Bit"},{"name":"durable","type":"Bit"},{"name":"reserved2","type":"Bit"},{"name":"reserved3","type":"Bit"},{"name":"noWait","type":"NoWait"},{"name":"arguments","type":"Table"}];
_40e.Exchange.declareExchange.returnType="DeclareOkExchange";
_40e.Exchange.declareExchange.index=10;
_40e.Exchange.declareExchange.classIndex=40;
_40e.Exchange.declareExchange.synchronous=true;
_40e.Exchange.declareExchange.hasContent=false;
_40e.Exchange.declareOkExchange={};
_40e.Exchange.declareOkExchange.allParameters=[];
_40e.Exchange.declareOkExchange.returnType="voidExchange";
_40e.Exchange.declareOkExchange.index=11;
_40e.Exchange.declareOkExchange.classIndex=40;
_40e.Exchange.declareOkExchange.synchronous=true;
_40e.Exchange.declareOkExchange.hasContent=false;
_40e.Exchange.deleteExchange={};
_40e.Exchange.deleteExchange.allParameters=[{"name":"reserved1","type":"Short"},{"name":"exchange","type":"ExchangeName"},{"name":"ifUnused","type":"Bit"},{"name":"noWait","type":"NoWait"}];
_40e.Exchange.deleteExchange.returnType="DeleteOkExchange";
_40e.Exchange.deleteExchange.index=20;
_40e.Exchange.deleteExchange.classIndex=40;
_40e.Exchange.deleteExchange.synchronous=true;
_40e.Exchange.deleteExchange.hasContent=false;
_40e.Exchange.deleteOkExchange={};
_40e.Exchange.deleteOkExchange.allParameters=[];
_40e.Exchange.deleteOkExchange.returnType="voidExchange";
_40e.Exchange.deleteOkExchange.index=21;
_40e.Exchange.deleteOkExchange.classIndex=40;
_40e.Exchange.deleteOkExchange.synchronous=true;
_40e.Exchange.deleteOkExchange.hasContent=false;
_40e.Exchange.methodLookup={10:"declareExchange",11:"declareOkExchange",20:"deleteExchange",21:"deleteOkExchange"};
_40e.Exchange.className="Exchange";
_40e.Queue={};
_40e.Queue.declareQueue={};
_40e.Queue.declareQueue.allParameters=[{"name":"reserved1","type":"Short"},{"name":"queue","type":"QueueName"},{"name":"passive","type":"Bit"},{"name":"durable","type":"Bit"},{"name":"exclusive","type":"Bit"},{"name":"autoDelete","type":"Bit"},{"name":"noWait","type":"NoWait"},{"name":"arguments","type":"Table"}];
_40e.Queue.declareQueue.returnType="DeclareOkQueue";
_40e.Queue.declareQueue.index=10;
_40e.Queue.declareQueue.classIndex=50;
_40e.Queue.declareQueue.synchronous=true;
_40e.Queue.declareQueue.hasContent=false;
_40e.Queue.declareOkQueue={};
_40e.Queue.declareOkQueue.allParameters=[{"name":"queue","type":"QueueName"},{"name":"messageCount","type":"MessageCount"},{"name":"consumerCount","type":"Long"}];
_40e.Queue.declareOkQueue.returnType="voidQueue";
_40e.Queue.declareOkQueue.index=11;
_40e.Queue.declareOkQueue.classIndex=50;
_40e.Queue.declareOkQueue.synchronous=true;
_40e.Queue.declareOkQueue.hasContent=false;
_40e.Queue.bindQueue={};
_40e.Queue.bindQueue.allParameters=[{"name":"reserved1","type":"Short"},{"name":"queue","type":"QueueName"},{"name":"exchange","type":"ExchangeName"},{"name":"routingKey","type":"Shortstr"},{"name":"noWait","type":"NoWait"},{"name":"arguments","type":"Table"}];
_40e.Queue.bindQueue.returnType="BindOkQueue";
_40e.Queue.bindQueue.index=20;
_40e.Queue.bindQueue.classIndex=50;
_40e.Queue.bindQueue.synchronous=true;
_40e.Queue.bindQueue.hasContent=false;
_40e.Queue.bindOkQueue={};
_40e.Queue.bindOkQueue.allParameters=[];
_40e.Queue.bindOkQueue.returnType="voidQueue";
_40e.Queue.bindOkQueue.index=21;
_40e.Queue.bindOkQueue.classIndex=50;
_40e.Queue.bindOkQueue.synchronous=true;
_40e.Queue.bindOkQueue.hasContent=false;
_40e.Queue.unbindQueue={};
_40e.Queue.unbindQueue.allParameters=[{"name":"reserved1","type":"Short"},{"name":"queue","type":"QueueName"},{"name":"exchange","type":"ExchangeName"},{"name":"routingKey","type":"Shortstr"},{"name":"arguments","type":"Table"}];
_40e.Queue.unbindQueue.returnType="UnbindOkQueue";
_40e.Queue.unbindQueue.index=50;
_40e.Queue.unbindQueue.classIndex=50;
_40e.Queue.unbindQueue.synchronous=true;
_40e.Queue.unbindQueue.hasContent=false;
_40e.Queue.unbindOkQueue={};
_40e.Queue.unbindOkQueue.allParameters=[];
_40e.Queue.unbindOkQueue.returnType="voidQueue";
_40e.Queue.unbindOkQueue.index=51;
_40e.Queue.unbindOkQueue.classIndex=50;
_40e.Queue.unbindOkQueue.synchronous=true;
_40e.Queue.unbindOkQueue.hasContent=false;
_40e.Queue.purgeQueue={};
_40e.Queue.purgeQueue.allParameters=[{"name":"reserved1","type":"Short"},{"name":"queue","type":"QueueName"},{"name":"noWait","type":"NoWait"}];
_40e.Queue.purgeQueue.returnType="PurgeOkQueue";
_40e.Queue.purgeQueue.index=30;
_40e.Queue.purgeQueue.classIndex=50;
_40e.Queue.purgeQueue.synchronous=true;
_40e.Queue.purgeQueue.hasContent=false;
_40e.Queue.purgeOkQueue={};
_40e.Queue.purgeOkQueue.allParameters=[{"name":"messageCount","type":"MessageCount"}];
_40e.Queue.purgeOkQueue.returnType="voidQueue";
_40e.Queue.purgeOkQueue.index=31;
_40e.Queue.purgeOkQueue.classIndex=50;
_40e.Queue.purgeOkQueue.synchronous=true;
_40e.Queue.purgeOkQueue.hasContent=false;
_40e.Queue.deleteQueue={};
_40e.Queue.deleteQueue.allParameters=[{"name":"reserved1","type":"Short"},{"name":"queue","type":"QueueName"},{"name":"ifUnused","type":"Bit"},{"name":"ifEmpty","type":"Bit"},{"name":"noWait","type":"NoWait"}];
_40e.Queue.deleteQueue.returnType="DeleteOkQueue";
_40e.Queue.deleteQueue.index=40;
_40e.Queue.deleteQueue.classIndex=50;
_40e.Queue.deleteQueue.synchronous=true;
_40e.Queue.deleteQueue.hasContent=false;
_40e.Queue.deleteOkQueue={};
_40e.Queue.deleteOkQueue.allParameters=[{"name":"messageCount","type":"MessageCount"}];
_40e.Queue.deleteOkQueue.returnType="voidQueue";
_40e.Queue.deleteOkQueue.index=41;
_40e.Queue.deleteOkQueue.classIndex=50;
_40e.Queue.deleteOkQueue.synchronous=true;
_40e.Queue.deleteOkQueue.hasContent=false;
_40e.Queue.methodLookup={10:"declareQueue",11:"declareOkQueue",20:"bindQueue",21:"bindOkQueue",50:"unbindQueue",51:"unbindOkQueue",30:"purgeQueue",31:"purgeOkQueue",40:"deleteQueue",41:"deleteOkQueue"};
_40e.Queue.className="Queue";
_40e.Basic={};
_40e.Basic.qosBasic={};
_40e.Basic.qosBasic.allParameters=[{"name":"prefetchSize","type":"Long"},{"name":"prefetchCount","type":"Short"},{"name":"global","type":"Bit"}];
_40e.Basic.qosBasic.returnType="QosOkBasic";
_40e.Basic.qosBasic.index=10;
_40e.Basic.qosBasic.classIndex=60;
_40e.Basic.qosBasic.synchronous=true;
_40e.Basic.qosBasic.hasContent=false;
_40e.Basic.qosOkBasic={};
_40e.Basic.qosOkBasic.allParameters=[];
_40e.Basic.qosOkBasic.returnType="voidBasic";
_40e.Basic.qosOkBasic.index=11;
_40e.Basic.qosOkBasic.classIndex=60;
_40e.Basic.qosOkBasic.synchronous=true;
_40e.Basic.qosOkBasic.hasContent=false;
_40e.Basic.consumeBasic={};
_40e.Basic.consumeBasic.allParameters=[{"name":"reserved1","type":"Short"},{"name":"queue","type":"QueueName"},{"name":"consumerTag","type":"ConsumerTag"},{"name":"noLocal","type":"NoLocal"},{"name":"noAck","type":"NoAck"},{"name":"exclusive","type":"Bit"},{"name":"noWait","type":"NoWait"},{"name":"arguments","type":"Table"}];
_40e.Basic.consumeBasic.returnType="ConsumeOkBasic";
_40e.Basic.consumeBasic.index=20;
_40e.Basic.consumeBasic.classIndex=60;
_40e.Basic.consumeBasic.synchronous=true;
_40e.Basic.consumeBasic.hasContent=false;
_40e.Basic.consumeOkBasic={};
_40e.Basic.consumeOkBasic.allParameters=[{"name":"consumerTag","type":"ConsumerTag"}];
_40e.Basic.consumeOkBasic.returnType="voidBasic";
_40e.Basic.consumeOkBasic.index=21;
_40e.Basic.consumeOkBasic.classIndex=60;
_40e.Basic.consumeOkBasic.synchronous=true;
_40e.Basic.consumeOkBasic.hasContent=false;
_40e.Basic.cancelBasic={};
_40e.Basic.cancelBasic.allParameters=[{"name":"consumerTag","type":"ConsumerTag"},{"name":"noWait","type":"NoWait"}];
_40e.Basic.cancelBasic.returnType="CancelOkBasic";
_40e.Basic.cancelBasic.index=30;
_40e.Basic.cancelBasic.classIndex=60;
_40e.Basic.cancelBasic.synchronous=true;
_40e.Basic.cancelBasic.hasContent=false;
_40e.Basic.cancelOkBasic={};
_40e.Basic.cancelOkBasic.allParameters=[{"name":"consumerTag","type":"ConsumerTag"}];
_40e.Basic.cancelOkBasic.returnType="voidBasic";
_40e.Basic.cancelOkBasic.index=31;
_40e.Basic.cancelOkBasic.classIndex=60;
_40e.Basic.cancelOkBasic.synchronous=true;
_40e.Basic.cancelOkBasic.hasContent=false;
_40e.Basic.publishBasic={};
_40e.Basic.publishBasic.allParameters=[{"name":"reserved1","type":"Short"},{"name":"exchange","type":"ExchangeName"},{"name":"routingKey","type":"Shortstr"},{"name":"mandatory","type":"Bit"},{"name":"immediate","type":"Bit"}];
_40e.Basic.publishBasic.returnType="voidBasic";
_40e.Basic.publishBasic.index=40;
_40e.Basic.publishBasic.classIndex=60;
_40e.Basic.publishBasic.synchronous=false;
_40e.Basic.publishBasic.hasContent=true;
_40e.Basic.returnBasic={};
_40e.Basic.returnBasic.allParameters=[{"name":"replyCode","type":"ReplyCode"},{"name":"replyText","type":"ReplyText"},{"name":"exchange","type":"ExchangeName"},{"name":"routingKey","type":"Shortstr"}];
_40e.Basic.returnBasic.returnType="voidBasic";
_40e.Basic.returnBasic.index=50;
_40e.Basic.returnBasic.classIndex=60;
_40e.Basic.returnBasic.synchronous=false;
_40e.Basic.returnBasic.hasContent=true;
_40e.Basic.deliverBasic={};
_40e.Basic.deliverBasic.allParameters=[{"name":"consumerTag","type":"ConsumerTag"},{"name":"deliveryTag","type":"DeliveryTag"},{"name":"redelivered","type":"Redelivered"},{"name":"exchange","type":"ExchangeName"},{"name":"routingKey","type":"Shortstr"}];
_40e.Basic.deliverBasic.returnType="voidBasic";
_40e.Basic.deliverBasic.index=60;
_40e.Basic.deliverBasic.classIndex=60;
_40e.Basic.deliverBasic.synchronous=false;
_40e.Basic.deliverBasic.hasContent=true;
_40e.Basic.getBasic={};
_40e.Basic.getBasic.allParameters=[{"name":"reserved1","type":"Short"},{"name":"queue","type":"QueueName"},{"name":"noAck","type":"NoAck"}];
_40e.Basic.getBasic.returnType="GetOkBasic";
_40e.Basic.getBasic.index=70;
_40e.Basic.getBasic.classIndex=60;
_40e.Basic.getBasic.synchronous=true;
_40e.Basic.getBasic.hasContent=false;
_40e.Basic.getOkBasic={};
_40e.Basic.getOkBasic.allParameters=[{"name":"deliveryTag","type":"DeliveryTag"},{"name":"redelivered","type":"Redelivered"},{"name":"exchange","type":"ExchangeName"},{"name":"routingKey","type":"Shortstr"},{"name":"messageCount","type":"MessageCount"}];
_40e.Basic.getOkBasic.returnType="voidBasic";
_40e.Basic.getOkBasic.index=71;
_40e.Basic.getOkBasic.classIndex=60;
_40e.Basic.getOkBasic.synchronous=true;
_40e.Basic.getOkBasic.hasContent=true;
_40e.Basic.getEmptyBasic={};
_40e.Basic.getEmptyBasic.allParameters=[{"name":"reserved1","type":"Shortstr"}];
_40e.Basic.getEmptyBasic.returnType="voidBasic";
_40e.Basic.getEmptyBasic.index=72;
_40e.Basic.getEmptyBasic.classIndex=60;
_40e.Basic.getEmptyBasic.synchronous=true;
_40e.Basic.getEmptyBasic.hasContent=false;
_40e.Basic.ackBasic={};
_40e.Basic.ackBasic.allParameters=[{"name":"deliveryTag","type":"DeliveryTag"},{"name":"multiple","type":"Bit"}];
_40e.Basic.ackBasic.returnType="voidBasic";
_40e.Basic.ackBasic.index=80;
_40e.Basic.ackBasic.classIndex=60;
_40e.Basic.ackBasic.synchronous=false;
_40e.Basic.ackBasic.hasContent=false;
_40e.Basic.rejectBasic={};
_40e.Basic.rejectBasic.allParameters=[{"name":"deliveryTag","type":"DeliveryTag"},{"name":"requeue","type":"Bit"}];
_40e.Basic.rejectBasic.returnType="voidBasic";
_40e.Basic.rejectBasic.index=90;
_40e.Basic.rejectBasic.classIndex=60;
_40e.Basic.rejectBasic.synchronous=false;
_40e.Basic.rejectBasic.hasContent=false;
_40e.Basic.recoverAsyncBasic={};
_40e.Basic.recoverAsyncBasic.allParameters=[{"name":"requeue","type":"Bit"}];
_40e.Basic.recoverAsyncBasic.returnType="voidBasic";
_40e.Basic.recoverAsyncBasic.index=100;
_40e.Basic.recoverAsyncBasic.classIndex=60;
_40e.Basic.recoverAsyncBasic.synchronous=false;
_40e.Basic.recoverAsyncBasic.hasContent=false;
_40e.Basic.recoverBasic={};
_40e.Basic.recoverBasic.allParameters=[{"name":"requeue","type":"Bit"}];
_40e.Basic.recoverBasic.returnType="voidBasic";
_40e.Basic.recoverBasic.index=110;
_40e.Basic.recoverBasic.classIndex=60;
_40e.Basic.recoverBasic.synchronous=false;
_40e.Basic.recoverBasic.hasContent=false;
_40e.Basic.recoverOkBasic={};
_40e.Basic.recoverOkBasic.allParameters=[];
_40e.Basic.recoverOkBasic.returnType="voidBasic";
_40e.Basic.recoverOkBasic.index=111;
_40e.Basic.recoverOkBasic.classIndex=60;
_40e.Basic.recoverOkBasic.synchronous=true;
_40e.Basic.recoverOkBasic.hasContent=false;
_40e.Basic.methodLookup={10:"qosBasic",11:"qosOkBasic",20:"consumeBasic",21:"consumeOkBasic",30:"cancelBasic",31:"cancelOkBasic",40:"publishBasic",50:"returnBasic",60:"deliverBasic",70:"getBasic",71:"getOkBasic",72:"getEmptyBasic",80:"ackBasic",90:"rejectBasic",100:"recoverAsyncBasic",110:"recoverBasic",111:"recoverOkBasic"};
_40e.Basic.className="Basic";
_40e.Tx={};
_40e.Tx.selectTx={};
_40e.Tx.selectTx.allParameters=[];
_40e.Tx.selectTx.returnType="SelectOkTx";
_40e.Tx.selectTx.index=10;
_40e.Tx.selectTx.classIndex=90;
_40e.Tx.selectTx.synchronous=true;
_40e.Tx.selectTx.hasContent=false;
_40e.Tx.selectOkTx={};
_40e.Tx.selectOkTx.allParameters=[];
_40e.Tx.selectOkTx.returnType="voidTx";
_40e.Tx.selectOkTx.index=11;
_40e.Tx.selectOkTx.classIndex=90;
_40e.Tx.selectOkTx.synchronous=true;
_40e.Tx.selectOkTx.hasContent=false;
_40e.Tx.commitTx={};
_40e.Tx.commitTx.allParameters=[];
_40e.Tx.commitTx.returnType="CommitOkTx";
_40e.Tx.commitTx.index=20;
_40e.Tx.commitTx.classIndex=90;
_40e.Tx.commitTx.synchronous=true;
_40e.Tx.commitTx.hasContent=false;
_40e.Tx.commitOkTx={};
_40e.Tx.commitOkTx.allParameters=[];
_40e.Tx.commitOkTx.returnType="voidTx";
_40e.Tx.commitOkTx.index=21;
_40e.Tx.commitOkTx.classIndex=90;
_40e.Tx.commitOkTx.synchronous=true;
_40e.Tx.commitOkTx.hasContent=false;
_40e.Tx.rollbackTx={};
_40e.Tx.rollbackTx.allParameters=[];
_40e.Tx.rollbackTx.returnType="RollbackOkTx";
_40e.Tx.rollbackTx.index=30;
_40e.Tx.rollbackTx.classIndex=90;
_40e.Tx.rollbackTx.synchronous=true;
_40e.Tx.rollbackTx.hasContent=false;
_40e.Tx.rollbackOkTx={};
_40e.Tx.rollbackOkTx.allParameters=[];
_40e.Tx.rollbackOkTx.returnType="voidTx";
_40e.Tx.rollbackOkTx.index=31;
_40e.Tx.rollbackOkTx.classIndex=90;
_40e.Tx.rollbackOkTx.synchronous=true;
_40e.Tx.rollbackOkTx.hasContent=false;
_40e.Tx.methodLookup={10:"selectTx",11:"selectOkTx",20:"commitTx",21:"commitOkTx",30:"rollbackTx",31:"rollbackOkTx"};
_40e.Tx.className="Tx";
var _40f={10:_40e.Connection,20:_40e.Channel,40:_40e.Exchange,50:_40e.Queue,60:_40e.Basic,90:_40e.Tx};
var _410={"startConnection":_40e.Connection.startConnection,"startOkConnection":_40e.Connection.startOkConnection,"secureConnection":_40e.Connection.secureConnection,"secureOkConnection":_40e.Connection.secureOkConnection,"tuneConnection":_40e.Connection.tuneConnection,"tuneOkConnection":_40e.Connection.tuneOkConnection,"openConnection":_40e.Connection.openConnection,"openOkConnection":_40e.Connection.openOkConnection,"closeConnection":_40e.Connection.closeConnection,"closeOkConnection":_40e.Connection.closeOkConnection,"openChannel":_40e.Channel.openChannel,"openOkChannel":_40e.Channel.openOkChannel,"flowChannel":_40e.Channel.flowChannel,"flowOkChannel":_40e.Channel.flowOkChannel,"closeChannel":_40e.Channel.closeChannel,"closeOkChannel":_40e.Channel.closeOkChannel,"declareExchange":_40e.Exchange.declareExchange,"declareOkExchange":_40e.Exchange.declareOkExchange,"deleteExchange":_40e.Exchange.deleteExchange,"deleteOkExchange":_40e.Exchange.deleteOkExchange,"declareQueue":_40e.Queue.declareQueue,"declareOkQueue":_40e.Queue.declareOkQueue,"bindQueue":_40e.Queue.bindQueue,"bindOkQueue":_40e.Queue.bindOkQueue,"unbindQueue":_40e.Queue.unbindQueue,"unbindOkQueue":_40e.Queue.unbindOkQueue,"purgeQueue":_40e.Queue.purgeQueue,"purgeOkQueue":_40e.Queue.purgeOkQueue,"deleteQueue":_40e.Queue.deleteQueue,"deleteOkQueue":_40e.Queue.deleteOkQueue,"qosBasic":_40e.Basic.qosBasic,"qosOkBasic":_40e.Basic.qosOkBasic,"consumeBasic":_40e.Basic.consumeBasic,"consumeOkBasic":_40e.Basic.consumeOkBasic,"cancelBasic":_40e.Basic.cancelBasic,"cancelOkBasic":_40e.Basic.cancelOkBasic,"publishBasic":_40e.Basic.publishBasic,"returnBasic":_40e.Basic.returnBasic,"deliverBasic":_40e.Basic.deliverBasic,"getBasic":_40e.Basic.getBasic,"getOkBasic":_40e.Basic.getOkBasic,"getEmptyBasic":_40e.Basic.getEmptyBasic,"ackBasic":_40e.Basic.ackBasic,"rejectBasic":_40e.Basic.rejectBasic,"recoverAsyncBasic":_40e.Basic.recoverAsyncBasic,"recoverBasic":_40e.Basic.recoverBasic,"recoverOkBasic":_40e.Basic.recoverOkBasic,"selectTx":_40e.Tx.selectTx,"selectOkTx":_40e.Tx.selectOkTx,"commitTx":_40e.Tx.commitTx,"commitOkTx":_40e.Tx.commitOkTx,"rollbackTx":_40e.Tx.rollbackTx,"rollbackOkTx":_40e.Tx.rollbackOkTx};
var _411=function(_412){
this.array=_412||[];
this._mark=-1;
this.limit=this.capacity=this.array.length;
this.order=ByteOrder.BIG_ENDIAN;
this.bitCount=0;
};
_411.prototype=new ByteBuffer();
var _413=function(_414,_415){
if(!_414){
throw (new Error(_415));
}
};
var _416={"octet":"Unsigned","short":"UnsignedShort","long":"UnsignedInt","longlong":"UnsignedLong","int":"Int","table":"Table","longstr":"LongString","shortstr":"ShortString","bit":"Bit","fieldtable":"FieldTable"};
var _417={"F":"fieldtable","S":"longstr","I":"int"};
var _418={"longstr":"S","int":"I"};
var _419=function(_41a,_41b){
var _41c=new _411();
_41c.putShortString("LOGIN");
_41c.putTypeIdentifier("longstr");
_41c.putLongString(_41a);
_41c.putShortString("PASSWORD");
_41c.putTypeIdentifier("longstr");
_41c.putLongString(_41b);
_41c.rewind();
var len=_41c.remaining();
var _41e=[];
for(var i=0;i<len;i++){
_41e.push(String.fromCharCode(_41c.getUnsigned()));
}
return _41e.join("");
};
var _420=function(_421,_422){
throw (new Error("not implemented"));
};
_411.prototype.getLongString=function(){
var len=this.getUnsignedInt();
var _424=[];
for(var i=0;i<len;i++){
_424.push(String.fromCharCode(this.getUnsigned()));
}
return _424.join("");
};
_411.prototype.getShortString=function(){
var len=this.getUnsigned();
var _427=[];
for(var i=0;i<len;i++){
_427.push(String.fromCharCode(this.getUnsigned()));
}
return _427.join("");
};
_411.prototype.getTypeIdentifier=function(){
var i=this.getUnsigned();
return _417[String.fromCharCode(i)];
};
_411.prototype.putTypeIdentifier=function(type){
var ti=_418[type];
this.putUnsigned(ti.charCodeAt(0));
};
_411.prototype.getFieldValue=function(){
var _42c=this.getUnsigned();
switch(String.fromCharCode(_42c)){
case "t":
return !!this.getUnsigned();
default:
throw new Error("Decoding Error in AmqpBuffer: cannot decode field value");
}
};
_411.prototype.getFieldTable=function(){
var l=this.getUnsignedInt();
var ft={};
var _42f=this.position;
while(l>(this.position-_42f)){
var key=this.getShortString();
var _431=this.getFieldValue();
ft[key]=_431;
}
return ft;
};
_411.prototype.getTable=function(){
var _432=[];
var len=this.getUnsignedInt();
var _434=new _411(this.array.slice(this.position,this.position+len));
this.position+=len;
while(_434.remaining()){
var kv={};
kv.key=_434.getShortString();
var ti=_434.getTypeIdentifier();
kv.value=_434["get"+_416[ti]]();
_432.push(kv);
}
return _432;
};
_411.prototype.getBit=function(_437){
return this.getUnsigned();
};
_411.prototype.putBit=function(v){
if(this.bitCount>0){
var _439=this.array[this.position-1];
_439=v<<this.bitCount|_439;
this.array[this.position-1]=_439;
}else{
this.putUnsigned(v);
}
};
_411.prototype.putUnsignedLong=function(v){
this.putInt(0);
return this.putUnsignedInt(v);
};
_411.prototype.getUnsignedLong=function(v){
this.getInt();
return this.getUnsignedInt();
};
_411.prototype.putLongString=function(s){
this.putUnsignedInt(s.length);
for(var i=0;i<s.length;i++){
this.putUnsigned(s.charCodeAt(i));
}
};
_411.prototype.putShortString=function(s){
this.putUnsigned(s.length);
for(var i=0;i<s.length;i++){
this.putUnsigned(s.charCodeAt(i));
}
};
_411.prototype.putTable=function(_440){
if(!_440){
this.putUnsignedInt(0);
return this;
}
var _441=new _411();
for(var i=0;i<_440.length;i++){
var _443=_440[i];
_441.putShortString(_443.key);
_441.putTypeIdentifier(_443.type);
_441["put"+_416[_443.type]](_443.value);
}
_441.rewind();
this.putUnsignedInt(_441.remaining());
this.putBuffer(_441);
return this;
};
_411.prototype.getFrameHeader=function(){
var _444=this.getUnsigned();
var _445=this.getUnsignedShort();
var size=this.getUnsignedInt();
var _447={};
_447.type=_444;
_447.size=size;
_447.channel=_445;
return _447;
};
_411.prototype.getFrame=function(){
var pos=this.position;
var _449={};
if(this.remaining()>7){
_449.header=this.getFrameHeader();
_449.channel=_449.header.channel;
_449.type=_449.header.type;
if(this.remaining()>=_449.header.size+1){
switch(_449.type){
case _40c.FRAME_BODY.value:
var body=new _411(this.array.slice(this.position,this.position+_449.header.size));
this.position+=_449.header.size;
_449.body=body;
_449.methodName="body";
break;
case _40c.FRAME_HEADER.value:
var _44b=this.getUnsignedShort();
var _44c=this.getUnsignedShort();
var _44d=this.getUnsignedLong();
_449.contentProperties=this.getContentProperties();
_449.methodName="header";
break;
case _40c.FRAME_METHOD.value:
var _44b=this.getUnsignedShort();
var _44e=this.getUnsignedShort();
var _44f=_40f[_44b].className;
var _450=_40f[_44b].methodLookup[_44e];
var _451=_40f[_44b][_450];
var _452=_40f[_44b][_450].allParameters;
_449.methodName=_450;
_449.args=this.getMethodArguments(_452);
break;
default:
throw (new Error("getFrame: This AMQP frame type is unknown or has not been implemented"));
}
_413((this.getUnsigned()===_40c.FRAME_END.value),"AMQP: Frame terminator missing");
}else{
this.position=pos;
return null;
}
return _449;
}
return null;
};
_411.prototype.putFrame=function(type,_454,_455){
this.putUnsigned(type);
this.putUnsignedShort(_454);
var size=_455.remaining();
this.putUnsignedInt(size);
this.putBuffer(_455);
this.putUnsigned(_40c.FRAME_END.value);
return this;
};
_411.prototype.putMethodFrame=function(_457,_458,args){
var _45a=new _411();
_45a.putUnsignedShort(_457.classIndex);
_45a.putUnsignedShort(_457.index);
_45a.putMethodArguments(args,_457.allParameters);
_45a.flip();
return this.putFrame(_40c.FRAME_METHOD.value,_458,_45a);
};
_411.prototype.putHeaderFrame=function(_45b,_45c,_45d,_45e,_45f){
var _460=new _411();
_460.putUnsignedShort(_45c);
_460.putUnsignedShort(_45d);
_460.putUnsignedLong(_45e);
_460.putContentProperties(_45f);
_460.flip();
return this.putFrame(_40c.FRAME_HEADER.value,_45b,_460);
};
_411.prototype.putBodyFrame=function(_461,_462){
return this.putFrame(_40c.FRAME_BODY.value,_461,_462);
};
_411.prototype.putHeartbeat=function(){
throw (new Error("not implemented"));
};
_411.prototype.putMethodArguments=function(args,_464){
for(var i=0;i<_464.length;i++){
var p=_464[i];
var _467=p.type;
var _468=_40d[_467];
if(_468){
var type=_468.type;
}else{
throw (new Error("Unknown AMQP domain "+_467));
}
this["put"+_416[type]](args[i]);
this.bitCount=(type==="bit")?this.bitCount+1:0;
}
return this;
};
_411.prototype.getMethodArguments=function(_46a){
var _46b=[];
for(var i=0;i<_46a.length;i++){
var p=_46a[i];
var _46e=p.type;
var type=_40d[_46e].type;
var arg={};
arg.type=type;
arg.name=p.name;
try{
var v=this["get"+_416[type]]();
}
catch(e){
throw (new Error("type codec failed for type "+type+" for domain "+_46e));
}
this.bitCount=(type==="bit")?this.bitCount+1:0;
arg.value=v;
_46b.push(arg);
}
return _46b;
};
_411.prototype.putArgument=function(_472,arg){
var _474=_40d[_472];
if(_474){
var type=_474.type;
}else{
throw (new Error("Unknown AMQP domain "+dtype));
}
this["put"+_416[type]](arg);
};
_411.prototype.getArgument=function(type){
try{
return this["get"+_416[type]]();
}
catch(e){
throw (new Error("type codec failed for type "+type+" for domain "+dtype));
}
};
_411.prototype.getContentProperties=function(){
var _477={};
var _478=[];
var _479=this.getUnsignedShort();
for(var i=0;i<=16;i++){
var bit=(_479>>(i))&1;
if(bit){
_478.unshift(i+1);
}
}
for(var i=0;i<_478.length;i++){
var k=16-_478[i];
var _47d=_basicProperties[k].name;
var _47e=_basicProperties[k].domain;
var _47f=_40d[_47e];
_477[_47d]=this.getArgument(_47f.type);
}
return _477;
};
_411.prototype.putContentProperties=function(_480){
if(!_480){
return this.putUnsignedShort(0);
}
var _481=0;
var _482=[];
for(var i=0;i<_basicProperties.length;i++){
var _484=_basicProperties[i].name;
var _485=_basicProperties[i].domain;
var _486=_480[_484];
if(typeof (_486)!=="undefined"){
_482.push({"propertyName":_484,"propertyValue":_486,"domain":_485});
_481=_481<<1|1;
}else{
_481=_481<<1;
}
}
_481=_481<<2;
this.putUnsignedShort(_481);
for(var i=0;i<_482.length;i++){
var _487=_482[i];
var _488=_487.domain;
this.putArgument(_488,_487.propertyValue);
}
return this;
};
AmqpClient.prototype=new _3fc();
var _489=AmqpClient.prototype;
_489.CLOSED=0;
_489.OPEN=1;
_489.CONNECTING=2;
_489.getReadyState=function(){
return this._readyState;
};
_489.setReadyState=function(_48a){
this._readyState=_48a;
};
_489.onopen=function(e){
};
_489.onclose=function(e){
};
_489.onerror=function(e){
};
var _413=function(_48e,_48f){
if(!_48e){
throw (new Error(_48f));
}
};
_489._init=function(){
this._initAsyncClient();
this._buffer=new _411();
this._channels={};
this._channelCount=0;
this._stateMachine.addState("handshaking",[{"inputs":["startConnectionFrame"],"targetState":"starting"},{"inputs":["closeConnectionFrame"],"targetState":"closing"}],_490);
this._stateMachine.addState("starting",[{"inputs":["startOkConnectionAction"],"targetState":"started"}],_491);
this._stateMachine.addState("started",[{"inputs":["tuneConnectionFrame"],"targetState":"tuning"}]);
this._stateMachine.addState("tuning",[{"inputs":["tuneOkConnectionAction"],"targetState":"tuned"}],_492,_493);
this._stateMachine.addState("tuned",[{"inputs":["openConnectionAction"],"targetState":"opening"}]);
this._stateMachine.addState("opening",[{"inputs":["openOkConnectionFrame"],"targetState":"ready"}],_494,_495);
this._stateMachine.addState("ready",[{"inputs":["openOkChannelFrame","closeChannelFrame","closeOkChannelFrame","flowOkChannelFrame","flowChannelFrame","declareOkExchangeFrame","declareOkQueueFrame","bindOkQueueFrame","unbindOkQueueFrame","deleteOkQueueFrame","deleteOkExchangeFrame","commitOkTxFrame","rollbackOkTxFrame","selectOkTxFrame","purgeOkQueueFrame","cancelOkBasicFrame","getOkBasicFrame","getEmptyBasicFrame","consumeOkBasicFrame","recoverOkBasicFrame","rejectOkBasicFrame","deliverBasicFrame","bodyFrame","headerFrame"],"targetState":"ready"},{"inputs":["closeConnectionFrame","closeConnectionAction"],"targetState":"closing"}],_496);
this._stateMachine.addState("closing",[{"inputs":["closeOkConnectionFrame","closeOkConnectionAction"],"targetState":"closed"}],_495,null);
this._stateMachine.addState("closed",[],_497,null);
};
var _498={"0-9-1":[65,77,81,80,0,0,9,1]};
_489.connect=function connect(url,_49a,_49b,_49c){
if(this._socket){
throw (new Error("AmqpClient already connected."));
}
var url0;
if(typeof (url)==="string"){
url0=[url];
}else{
url0=url;
}
this.setReadyState(this.CONNECTING);
var args={"url":url0[0],"virtualHost":_49a,"credentials":_49b};
this._openContinuation=_49c;
this._hasNegotiated=false;
_reconnect(this,url0[0],_49a,_49b);
};
var _49f=_489.connect;
_489.connect=function(_4a0,_4a1){
if(typeof _4a0=="object"){
myConfig=_4a0||{};
var url=myConfig.url;
var _4a3=myConfig.virtualHost;
var _4a4=myConfig.credentials;
if(!url||typeof url!="string"){
throw new Error("AmqpClient.connect(): Parameter 'url' is required");
}
if(!_4a3||typeof url!="string"){
throw new Error("AmqpClient.connect(): Parameter 'virtualHost' is required");
}
if(!_4a4||!_4a4.username||!_4a4.password||typeof _4a4.username!="string"||typeof _4a4.password!="string"){
throw new Error("AmqpClient.connect(): credentials are required");
}
_49f.call(this,url,_4a3,_4a4,_4a1);
}else{
_49f.apply(this,arguments);
}
};
_489.disconnect=function disconnect(){
if(this.getReadyState()==this.OPEN){
_4a5(this,0,"",0,0);
}
if(this.getReadyState()==this.CONNECTING){
var _4a6={};
_4a6.methodName="closeConnection";
_4a6.type="closeConnection";
_4a6.args="";
var e=new AmqpEvent(this,_4a6);
this.dispatchEvent(e);
}
this.setReadyState(this.CLOSED);
};
_489.openChannel=function _4a8(_4a9){
var id=++this._channelCount;
var _4ab=new _4ac();
_4ad(_4ab,id,this,_4a9);
this._channels[id]=_4ab;
return _4ab;
};
var _4ae=function(_4af){
var _4b0=new ByteBuffer(_498["0-9-1"]);
_4af._socket.send(_4b0);
};
var _4b1=function(_4b2){
_497(_4b2);
};
var _4b3=function(s,b){
if(b.remaining()<s.length){
return false;
}else{
var lim=b.limit;
b.limit=s.length;
var _4b7=b.getString(Charset.UTF8);
b.limit=lim;
return s===_4b7;
}
};
var _4b8=function(_4b9,e){
var buf=_4b9._buffer;
buf.mark();
buf.position=buf.limit;
buf.putBuffer(e.data);
buf.reset();
if(!_4b9._hasNegotiated&&buf.remaining()>7){
if(_4b3("AMQP",buf)){
var _4bc=[buf.get(),buf.get(),buf.get(),buf.get()];
var _4bd={"args":[{"name":"replyText","value":"Server does not support AMQP protocol versions after "+_4bc[2]+"-"+_4bc[3]}],"methodName":"closeOkConnection"};
var _4be={};
_4be.methodName="error";
_4be.args=_4bd.args;
_4b9.dispatchEvent(new AmqpEvent(_4b9,_4be));
_497(_4b9,"",_4bd);
return;
}else{
buf.reset();
_4b9._hasNegotiated=true;
}
}
var _4bf=null;
while(_4bf=buf.getFrame()){
var f=_4bf;
_4b9._stateMachine.feedInput(f.methodName+"Frame",f);
}
buf.compact();
};
var _4c1=function(_4c2,_4c3){
_4c2._socket.send(_4c3);
};
var _4c4=function write(_4c5,_4c6,_4c7,args){
var buf=new _411();
var _4ca=_4c6.classIndex;
buf.putMethodFrame(_4c6,_4c7,args);
buf.flip();
_4c1(_4c5,buf);
};
var _490=function _490(_4cb,_4cc,args,_4ce){
var _4cf=new ByteSocket(args.url);
_4cf.onopen=function(){
_4ae(_4cb);
};
_4cf.onclose=function(){
_4b1(_4cb);
};
_4cf.onmessage=function(e){
_4b8(_4cb,e);
};
_4cb._socket=_4cf;
_4cb._virtualHost=args.virtualHost;
_4cb._credentialsOrKey=args.credentials;
};
var _4d1=null;
var _491=function(_4d2,_4d3,_4d4){
_413((_4d4.channel===0),_40c.UNEXPECTED_FRAME.message);
var buf=new _411();
var _4d6=new AmqpArguments();
_4d6.addLongString("library","KaazingAmqpClient");
_4d6.addLongString("library_version","3.2.0");
_4d6.addLongString("library_platform","JavaScript");
var _4d7=_4d2._locale||"en_US";
var _4d8="AMQPLAIN";
var _4d9=_4d2._credentialsOrKey;
if(typeof (_4d9.resolve)!="function"){
var _4da=_419(_4d9.username,_4d9.password);
_4d1(_4d2,_4d6,_4d8,_4da,_4d7);
}else{
_4d9.resolve(function(_4db){
var _4dc=_419(_4db.username,_4db.password);
_4d1(_4d2,_4d6,_4d8,_4dc,_4d7);
});
}
};
var _492=function(_4dd,_4de,_4df){
_413((_4df.channel===0),_40c.UNEXPECTED_FRAME.message);
var _4e0=_4df.args[0].value;
var _4e1=_4df.args[1].value;
var _4e2=0;
_4e3(_4dd,_4e0,_4e1,_4e2);
_4e4(_4dd,_4dd._virtualHost,_4dd._openContinuation,_4dd._openErrorCb);
};
var _495=function _495(_4e5,_4e6,_4e7){
if(_4e7){
if(_4e7.actionName&&(_4e7.actionName=="closeConnection")){
return;
}
}
if(_4e6==="nowaitAction"){
_4e5._waitingAction=null;
return;
}
var _4e8={};
if(!_4e8._connection){
_4e8=_4e5;
}else{
_4e8=_4e5._connection;
}
var e=new AmqpEvent(_4e5,_4e7);
if(_4e5._waitingAction){
if(_4e6==="closeChannelFrame"){
_4e5._waitingAction.error(e);
}else{
if(_4e7.methodName=="closeConnection"){
var _4ea={};
_4ea.methodName="error";
_4ea.args=_4e7.args;
_4e8.dispatchEvent(new AmqpEvent(_4e8,_4ea));
_497(_4e8,"",_4e7);
return;
}else{
if(_4e7.methodName=="openOkConnection"){
_4e8.setReadyState(_4e8.OPEN);
}else{
_4e5._waitingAction.continuation(e);
}
}
}
}else{
throw (new Error("AmqpClient not in waiting state: protocol violation"));
}
_4e5.dispatchEvent(e);
if(_4e7.methodName=="openOkConnection"){
_4e8._openContinuation();
}
};
var _493=function _493(_4eb,_4ec,_4ed){
var _4ee=_4eb;
setTimeout(function(){
_4ee._processActions();
},0);
};
var _496=function openHandler(_4ef,_4f0,_4f1){
if(_4f1.channel===0){
}else{
if(_4ef._channels[_4f1.channel]){
var _4f2=_4ef._channels[_4f1.channel];
_4f3(_4f2,_4f0,_4f1);
}else{
}
}
};
var _4f4=function _4f4(_4f5,_4f6,_4f7){
};
var _497=function _497(_4f8,_4f9,_4fa){
if(!(_4f8.getReadyState()==_4f8.CONNECTING)){
var e;
if(typeof (_4fa)==="undefined"){
e=new AmqpEvent(_4f8,{"args":[],"methodName":"closeOkConnection"});
}else{
_4fa.methodName="closeOkConnection";
e=new AmqpEvent(_4f8,_4fa);
}
_4f8.dispatchEvent(e);
}
_4f8.setReadyState(_4f8.CLOSED);
if(typeof (_4f8._channels)!=="undefined"){
for(var i in _4f8._channels){
var _4fd=_4f8._channels[i];
_4fd.dispatchEvent(e);
}
_4f8._socket.onclose=function(){
};
_4f8._socket.close();
}
if(typeof (_4f8._openErrorCb)!=="undefined"){
_4f8._openErrorCb(e);
}
};
function _reconnect(_4fe,url,_500,_501){
var args={"url":url,"virtualHost":_500,"credentials":_501};
_4fe._stateMachine.enterState("handshaking","",args);
};
var _4ad=function _4ad(_503,id,_505,cb){
_503._id=id;
_503._callbacks=cb;
_503._connection=_505;
_503._transacted=false;
_503._waitingAction=null;
_503._initAsyncClient();
_503._stateMachine.addState("channelReady",[{"inputs":["openChannelAction","closeChannelAction","consumeBasicAction","flowChannelAction","declareExchangeAction","declareQueueAction","bindQueueAction","unbindQueueAction","deleteQueueAction","deleteExchangeAction","purgeQueueAction","cancelBasicAction","recoverBasicAction","rejectBasicAction","selectTxAction","commitTxAction","rollbackTxAction",],"targetState":"waiting"},{"inputs":["publishBasicAction","ackBasicAction"],"targetState":"channelReady"},{"inputs":["getBasicAction"],"targetState":"getting"},{"inputs":["deliverBasicFrame"],"targetState":"readingContentHeader"}],_493);
_503._stateMachine.addState("getting",[{"inputs":["getOkBasicFrame"],"targetState":"readingContentHeader"},{"inputs":["getEmptyBasicFrame"],"targetState":"channelReady"},{"inputs":["closeChannelFrame"],"targetState":"closing"}],_494,_507);
_503._stateMachine.addState("waiting",[{"inputs":["openOkChannelFrame","closeOkChannelFrame","flowOkChannelFrame","declareOkExchangeFrame","declareOkQueueFrame","bindOkQueueFrame","unbindOkQueueFrame","deleteOkQueueFrame","deleteOkExchangeFrame","purgeOkQueueFrame","cancelOkBasicFrame","recoverOkBasicFrame","rejectOkBasicFrame","commitOkTxFrame","rollbackOkTxFrame","selectOkTxFrame","getOkBasicFrame","getEmptyBasicFrame","consumeOkBasicFrame","nowaitAction"],"targetState":"channelReady"},{"inputs":["closeChannelFrame"],"targetState":"closing"}],_494,_495);
_503._stateMachine.addState("readingContentHeader",[{"inputs":["headerFrame"],"targetState":"readingContentBody"}],_508,_509);
_503._stateMachine.addState("readingContentBody",[{"inputs":["bodyFrame"],"targetState":"channelReady"}],null,_50a);
_503._stateMachine.addState("closing",[{"inputs":["closeOkChannelAction"],"targetState":"closed"}],null);
_503._stateMachine.addState("closed",null,null);
if(_505.getReadyState()==_505.OPEN){
_4a8(_503,[cb]);
}
};
var _4ac=function(){
};
_4ac.prototype=new _3fc();
var _489=_4ac.prototype;
_489._init=function(_50b){
};
var _50c=function _50c(_50d,_50e,_50f,args,body,_512){
var buf=new _411();
var _514=_50e.classIndex;
buf.putMethodFrame(_50e,_50f,args);
if(_50e.hasContent){
var _515=0;
buf.putHeaderFrame(_50f,_514,_515,body.remaining(),_512);
if(body.remaining()>0){
buf.putBodyFrame(_50f,body);
}
}
buf.flip();
_4c1(_50d._connection,buf);
};
var _4f3=function _4f3(_516,_517,_518){
if(_518){
var _519=_518.methodName||"";
if(_519=="closeChannel"){
var _51a={};
_51a.methodName="error";
_51a.type="error";
_51a.args=_518.args;
_516.dispatchEvent(new AmqpEvent(_516,_51a));
_516.dispatchEvent(new AmqpEvent(_516,_518));
return;
}
}
_516._stateMachine.feedInput(_517,_518);
};
var _50a=function _50a(_51b,_51c,_51d){
_51d.args=_51b._headerFrame.args;
_51d.methodName=_51b._headerFrame.methodName;
var e=new AmqpEvent(_51b,_51d,_51b._headerFrame.contentProperties);
if(_51d.methodName==="getOkBasic"){
_51b._waitingAction.continuation(e);
}
_51b.dispatchEvent(e);
};
var _508=function _508(_51f,_520,_521){
_51f._headerFrame=_521;
};
var _509=function _509(_522,_523,_524){
_522._headerFrame.contentProperties=_524.contentProperties;
};
var _507=function(_525,_526,_527){
var e=new AmqpEvent(_525,_527);
if(_525._waitingAction){
if(_526==="closeChannelFrame"){
_525._waitingAction.error(e);
_525.dispatchEvent(e);
_525._waitingAction=null;
}else{
if(_526==="getEmptyBasicFrame"){
_525._waitingAction.continuation(e);
_525.dispatchEvent(e);
_525._waitingAction=null;
}
}
}else{
throw new Error("AmqpClient not in waiting state: protocol violation");
}
};
var _494=function _494(_529,_52a,_52b){
var _52c=_52b.args[1];
if(_52c.synchronous){
_529._waitingAction=_52b;
}else{
throw (new Error("AMQP: trying to enter wait state for method that is not sychronous"));
}
};
_4ac.prototype.flowFlag=true;
_4ac.prototype.onmessage=function(e){
};
_4ac.prototype.onclose=function(e){
};
_4ac.prototype.onerror=function(e){
};
_4ac.prototype.onopen=function(e){
};
_4ac.prototype.ondeclarequeue=function(e){
};
_4ac.prototype.ondeclareexchange=function(e){
};
_4ac.prototype.onflow=function(e){
};
_4ac.prototype.onbindqueue=function(e){
};
_4ac.prototype.onunbindqueue=function(e){
};
_4ac.prototype.ondeletequeue=function(e){
};
_4ac.prototype.ondeleteexchange=function(e){
};
_4ac.prototype.onconsume=function(e){
};
_4ac.prototype.oncancel=function(e){
};
_4ac.prototype.oncommittransaction=function(e){
};
_4ac.prototype.onrollbacktransaction=function(e){
};
_4ac.prototype.onselecttransaction=function(e){
};
_4ac.prototype.onget=function(e){
};
_4ac.prototype.onpurgequeue=function(e){
};
_4ac.prototype.onrecover=function(e){
};
_4ac.prototype.onreject=function(e){
};
var _4d1=function(_541,_542,_543,_544,_545,_546){
var args=[_542,_543,_544,_545];
var _548="startOkConnection";
_541._enqueueAction(_548,_4c4,[_541,_410[_548],0,args],_546);
return _541;
};
var _549=function(_54a,_54b,_54c){
var args=[_54b];
var _54e="secureOkConnection";
_54a._enqueueAction(_54e,_4c4,[_54a,_410[_54e],0,args],_54c);
return _54a;
};
var _4e3=function(_54f,_550,_551,_552,_553){
var args=[_550,_551,_552];
var _555="tuneOkConnection";
_54f._enqueueAction(_555,_4c4,[_54f,_410[_555],0,args],_553);
return _54f;
};
var _4e4=function(_556,_557,_558){
var args=[_557,0,0];
var _55a="openConnection";
_556._enqueueAction(_55a,_4c4,[_556,_410[_55a],0,args],_558);
return _556;
};
var _4a5=function(_55b,_55c,_55d,_55e,_55f,_560){
var args=[_55c,_55d,_55e,_55f];
var _562="closeConnection";
_55b._enqueueAction(_562,_4c4,[_55b,_410[_562],0,args],_560);
return _55b;
};
var _563=function(_564,_565){
var args=[];
var _567="closeOkConnection";
_564._enqueueAction(_567,_4c4,[_564,_410[_567],0,args],_565);
return _564;
};
_4ac.prototype.openChannel=function(_568){
var args=[0];
var _56a="openChannel";
var _56b=_410[_56a];
var _56c=false;
if(this._connection._readyState==this._connection.OPEN){
this._enqueueAction(_56a,_50c,[this,_56b,this._id,args],_568);
}
if(_56a=="flowChannel"){
_4ac.prototype.flowFlag=active;
}
if(_56c){
if(typeof (noWait)!=="undefined"&&noWait){
this._enqueueAction("nowait");
}
}
return this;
};
_4ac.prototype.flowChannel=function(_56d,_56e){
var args=[_56d];
var _570="flowChannel";
var _571=_410[_570];
var _572=false;
for(var i=0;i<_571.allParameters.length;i++){
var _574=_571.allParameters[i].name;
if(_574="noWait"){
_572=true;
break;
}
}
if(this._connection._readyState==this._connection.OPEN){
this._enqueueAction(_570,_50c,[this,_571,this._id,args],_56e);
}
if(_570=="flowChannel"){
_4ac.prototype.flowFlag=_56d;
}
if(_572){
if(typeof (noWait)!=="undefined"&&noWait){
this._enqueueAction("nowait");
}
}
return this;
};
_4ac.prototype.flowOkChannel=function(_575,_576){
var args=[_575];
var _578="flowOkChannel";
var _579=_410[_578];
var _57a=false;
for(var i=0;i<_579.allParameters.length;i++){
var _57c=_579.allParameters[i].name;
if(_57c="noWait"){
_57a=true;
break;
}
}
if(this._connection._readyState==this._connection.OPEN){
this._enqueueAction(_578,_50c,[this,_579,this._id,args],_576);
}
if(_578=="flowChannel"){
_4ac.prototype.flowFlag=_575;
}
if(_57a){
if(typeof (noWait)!=="undefined"&&noWait){
this._enqueueAction("nowait");
}
}
return this;
};
_4ac.prototype.closeChannel=function(_57d,_57e,_57f,_580,_581){
var args=[_57d,_57e,_57f,_580];
var _583="closeChannel";
var _584=_410[_583];
var _585=false;
for(var i=0;i<_584.allParameters.length;i++){
var _587=_584.allParameters[i].name;
if(_587="noWait"){
_585=true;
break;
}
}
if(this._connection._readyState==this._connection.OPEN){
this._enqueueAction(_583,_50c,[this,_584,this._id,args],_581);
}
if(_583=="flowChannel"){
_4ac.prototype.flowFlag=active;
}
if(_585){
if(typeof (noWait)!=="undefined"&&noWait){
this._enqueueAction("nowait");
}
}
return this;
};
_4ac.prototype.closeOkChannel=function(_588){
var args=[];
var _58a="closeOkChannel";
var _58b=_410[_58a];
var _58c=false;
if(this._connection._readyState==this._connection.OPEN){
this._enqueueAction(_58a,_50c,[this,_58b,this._id,args],_588);
}
if(_58a=="flowChannel"){
_4ac.prototype.flowFlag=active;
}
if(_58c){
if(typeof (noWait)!=="undefined"&&noWait){
this._enqueueAction("nowait");
}
}
return this;
};
_4ac.prototype.declareExchange=function(_58d,type,_58f,_590,_591,_592,_593){
var args=[0,_58d,type,_58f,_590,0,0,_591,_592];
var _595="declareExchange";
var _596=_410[_595];
var _597=false;
for(var i=0;i<_596.allParameters.length;i++){
var _599=_596.allParameters[i].name;
if(_599="noWait"){
_597=true;
break;
}
}
if(this._connection._readyState==this._connection.OPEN){
this._enqueueAction(_595,_50c,[this,_596,this._id,args],_593);
}
if(_595=="flowChannel"){
_4ac.prototype.flowFlag=active;
}
if(_597){
if(typeof (_591)!=="undefined"&&_591){
this._enqueueAction("nowait");
}
}
return this;
};
_4ac.prototype.deleteExchange=function(_59a,_59b,_59c,_59d){
var args=[0,_59a,_59b,_59c];
var _59f="deleteExchange";
var _5a0=_410[_59f];
var _5a1=false;
for(var i=0;i<_5a0.allParameters.length;i++){
var _5a3=_5a0.allParameters[i].name;
if(_5a3="noWait"){
_5a1=true;
break;
}
}
if(this._connection._readyState==this._connection.OPEN){
this._enqueueAction(_59f,_50c,[this,_5a0,this._id,args],_59d);
}
if(_59f=="flowChannel"){
_4ac.prototype.flowFlag=active;
}
if(_5a1){
if(typeof (_59c)!=="undefined"&&_59c){
this._enqueueAction("nowait");
}
}
return this;
};
_4ac.prototype.declareQueue=function(_5a4,_5a5,_5a6,_5a7,_5a8,_5a9,_5aa,_5ab){
var args=[0,_5a4,_5a5,_5a6,_5a7,_5a8,_5a9,_5aa];
var _5ad="declareQueue";
var _5ae=_410[_5ad];
var _5af=false;
for(var i=0;i<_5ae.allParameters.length;i++){
var _5b1=_5ae.allParameters[i].name;
if(_5b1="noWait"){
_5af=true;
break;
}
}
if(this._connection._readyState==this._connection.OPEN){
this._enqueueAction(_5ad,_50c,[this,_5ae,this._id,args],_5ab);
}
if(_5ad=="flowChannel"){
_4ac.prototype.flowFlag=active;
}
if(_5af){
if(typeof (_5a9)!=="undefined"&&_5a9){
this._enqueueAction("nowait");
}
}
return this;
};
_4ac.prototype.bindQueue=function(_5b2,_5b3,_5b4,_5b5,_5b6,_5b7){
var args=[0,_5b2,_5b3,_5b4,_5b5,_5b6];
var _5b9="bindQueue";
var _5ba=_410[_5b9];
var _5bb=false;
for(var i=0;i<_5ba.allParameters.length;i++){
var _5bd=_5ba.allParameters[i].name;
if(_5bd="noWait"){
_5bb=true;
break;
}
}
if(this._connection._readyState==this._connection.OPEN){
this._enqueueAction(_5b9,_50c,[this,_5ba,this._id,args],_5b7);
}
if(_5b9=="flowChannel"){
_4ac.prototype.flowFlag=active;
}
if(_5bb){
if(typeof (_5b5)!=="undefined"&&_5b5){
this._enqueueAction("nowait");
}
}
return this;
};
_4ac.prototype.unbindQueue=function(_5be,_5bf,_5c0,_5c1,_5c2){
var args=[0,_5be,_5bf,_5c0,_5c1];
var _5c4="unbindQueue";
var _5c5=_410[_5c4];
var _5c6=false;
for(var i=0;i<_5c5.allParameters.length;i++){
var _5c8=_5c5.allParameters[i].name;
if(_5c8="noWait"){
_5c6=true;
break;
}
}
if(this._connection._readyState==this._connection.OPEN){
this._enqueueAction(_5c4,_50c,[this,_5c5,this._id,args],_5c2);
}
if(_5c4=="flowChannel"){
_4ac.prototype.flowFlag=active;
}
if(_5c6){
if(typeof (noWait)!=="undefined"&&noWait){
this._enqueueAction("nowait");
}
}
return this;
};
_4ac.prototype.purgeQueue=function(_5c9,_5ca,_5cb){
var args=[0,_5c9,_5ca];
var _5cd="purgeQueue";
var _5ce=_410[_5cd];
var _5cf=false;
for(var i=0;i<_5ce.allParameters.length;i++){
var _5d1=_5ce.allParameters[i].name;
if(_5d1="noWait"){
_5cf=true;
break;
}
}
if(this._connection._readyState==this._connection.OPEN){
this._enqueueAction(_5cd,_50c,[this,_5ce,this._id,args],_5cb);
}
if(_5cd=="flowChannel"){
_4ac.prototype.flowFlag=active;
}
if(_5cf){
if(typeof (_5ca)!=="undefined"&&_5ca){
this._enqueueAction("nowait");
}
}
return this;
};
_4ac.prototype.deleteQueue=function(_5d2,_5d3,_5d4,_5d5,_5d6){
var args=[0,_5d2,_5d3,_5d4,_5d5];
var _5d8="deleteQueue";
var _5d9=_410[_5d8];
var _5da=false;
for(var i=0;i<_5d9.allParameters.length;i++){
var _5dc=_5d9.allParameters[i].name;
if(_5dc="noWait"){
_5da=true;
break;
}
}
if(this._connection._readyState==this._connection.OPEN){
this._enqueueAction(_5d8,_50c,[this,_5d9,this._id,args],_5d6);
}
if(_5d8=="flowChannel"){
_4ac.prototype.flowFlag=active;
}
if(_5da){
if(typeof (_5d5)!=="undefined"&&_5d5){
this._enqueueAction("nowait");
}
}
return this;
};
_4ac.prototype.qosBasic=function(_5dd,_5de,_5df,_5e0){
var args=[_5dd,_5de,_5df];
var _5e2="qosBasic";
var _5e3=_410[_5e2];
var _5e4=false;
for(var i=0;i<_5e3.allParameters.length;i++){
var _5e6=_5e3.allParameters[i].name;
if(_5e6="noWait"){
_5e4=true;
break;
}
}
if(this._connection._readyState==this._connection.OPEN){
this._enqueueAction(_5e2,_50c,[this,_5e3,this._id,args],_5e0);
}
if(_5e2=="flowChannel"){
_4ac.prototype.flowFlag=active;
}
if(_5e4){
if(typeof (noWait)!=="undefined"&&noWait){
this._enqueueAction("nowait");
}
}
return this;
};
_4ac.prototype.consumeBasic=function(_5e7,_5e8,_5e9,_5ea,_5eb,_5ec,_5ed,_5ee){
var args=[0,_5e7,_5e8,_5e9,_5ea,_5eb,_5ec,_5ed];
var _5f0="consumeBasic";
var _5f1=_410[_5f0];
var _5f2=false;
for(var i=0;i<_5f1.allParameters.length;i++){
var _5f4=_5f1.allParameters[i].name;
if(_5f4="noWait"){
_5f2=true;
break;
}
}
if(this._connection._readyState==this._connection.OPEN){
this._enqueueAction(_5f0,_50c,[this,_5f1,this._id,args],_5ee);
}
if(_5f0=="flowChannel"){
_4ac.prototype.flowFlag=active;
}
if(_5f2){
if(typeof (_5ec)!=="undefined"&&_5ec){
this._enqueueAction("nowait");
}
}
return this;
};
_4ac.prototype.cancelBasic=function(_5f5,_5f6,_5f7){
var args=[_5f5,_5f6];
var _5f9="cancelBasic";
var _5fa=_410[_5f9];
var _5fb=false;
for(var i=0;i<_5fa.allParameters.length;i++){
var _5fd=_5fa.allParameters[i].name;
if(_5fd="noWait"){
_5fb=true;
break;
}
}
if(this._connection._readyState==this._connection.OPEN){
this._enqueueAction(_5f9,_50c,[this,_5fa,this._id,args],_5f7);
}
if(_5f9=="flowChannel"){
_4ac.prototype.flowFlag=active;
}
if(_5fb){
if(typeof (_5f6)!=="undefined"&&_5f6){
this._enqueueAction("nowait");
}
}
return this;
};
_4ac.prototype.publishBasic=function(body,_5ff,_600,_601,_602,_603,_604){
var args=[0,_600,_601,_602,_603];
var _606="publishBasic";
var _607=_410[_606];
var _608=false;
for(var i=0;i<_607.allParameters.length;i++){
var _60a=_607.allParameters[i].name;
if(_60a="noWait"){
_608=true;
break;
}
}
if(this._connection._readyState==this._connection.OPEN){
this._enqueueAction(_606,_50c,[this,_607,this._id,args,body,_5ff],_604);
}
if(_606=="flowChannel"){
_4ac.prototype.flowFlag=active;
}
if(_608){
if(typeof (noWait)!=="undefined"&&noWait){
this._enqueueAction("nowait");
}
}
return this;
};
_4ac.prototype.getBasic=function(_60b,_60c,_60d){
var args=[0,_60b,_60c];
var _60f="getBasic";
var _610=_410[_60f];
var _611=false;
for(var i=0;i<_610.allParameters.length;i++){
var _613=_610.allParameters[i].name;
if(_613="noWait"){
_611=true;
break;
}
}
if(this._connection._readyState==this._connection.OPEN){
this._enqueueAction(_60f,_50c,[this,_610,this._id,args],_60d);
}
if(_60f=="flowChannel"){
_4ac.prototype.flowFlag=active;
}
if(_611){
if(typeof (noWait)!=="undefined"&&noWait){
this._enqueueAction("nowait");
}
}
return this;
};
_4ac.prototype.ackBasic=function(_614,_615,_616){
var args=[_614,_615];
var _618="ackBasic";
var _619=_410[_618];
var _61a=false;
for(var i=0;i<_619.allParameters.length;i++){
var _61c=_619.allParameters[i].name;
if(_61c="noWait"){
_61a=true;
break;
}
}
if(this._connection._readyState==this._connection.OPEN){
this._enqueueAction(_618,_50c,[this,_619,this._id,args],_616);
}
if(_618=="flowChannel"){
_4ac.prototype.flowFlag=active;
}
if(_61a){
if(typeof (noWait)!=="undefined"&&noWait){
this._enqueueAction("nowait");
}
}
return this;
};
_4ac.prototype.rejectBasic=function(_61d,_61e,_61f){
var args=[_61d,_61e];
var _621="rejectBasic";
var _622=_410[_621];
var _623=false;
for(var i=0;i<_622.allParameters.length;i++){
var _625=_622.allParameters[i].name;
if(_625="noWait"){
_623=true;
break;
}
}
if(this._connection._readyState==this._connection.OPEN){
this._enqueueAction(_621,_50c,[this,_622,this._id,args],_61f);
}
if(_621=="flowChannel"){
_4ac.prototype.flowFlag=active;
}
if(_623){
if(typeof (noWait)!=="undefined"&&noWait){
this._enqueueAction("nowait");
}
}
return this;
};
_4ac.prototype.recoverBasic=function(_626,_627){
var args=[_626];
var _629="recoverBasic";
var _62a=_410[_629];
var _62b=false;
for(var i=0;i<_62a.allParameters.length;i++){
var _62d=_62a.allParameters[i].name;
if(_62d="noWait"){
_62b=true;
break;
}
}
if(this._connection._readyState==this._connection.OPEN){
this._enqueueAction(_629,_50c,[this,_62a,this._id,args],_627);
}
if(_629=="flowChannel"){
_4ac.prototype.flowFlag=active;
}
if(_62b){
if(typeof (noWait)!=="undefined"&&noWait){
this._enqueueAction("nowait");
}
}
return this;
};
_basicProperties=[{"name":"contentType","domain":"Shortstr","label":"MIME content type"},{"name":"contentEncoding","domain":"Shortstr","label":"MIME content encoding"},{"name":"headers","domain":"Table","label":"message header field table"},{"name":"deliveryMode","domain":"Octet","label":"non-persistent (1) or persistent (2)"},{"name":"priority","domain":"Octet","label":"message priority, 0 to 9"},{"name":"correlationId","domain":"Shortstr","label":"application correlation identifier"},{"name":"replyTo","domain":"Shortstr","label":"address to reply to"},{"name":"expiration","domain":"Shortstr","label":"message expiration specification"},{"name":"messageId","domain":"Shortstr","label":"application message identifier"},{"name":"timestamp","domain":"Timestamp","label":"message timestamp"},{"name":"type","domain":"Shortstr","label":"message type name"},{"name":"userId","domain":"Shortstr","label":"creating user id"},{"name":"appId","domain":"Shortstr","label":"creating application id"},{"name":"reserved","domain":"Shortstr","label":"reserved, must be empty"}];
_4ac.prototype.selectTx=function(_62e){
var args=[];
var _630="selectTx";
var _631=_410[_630];
var _632=false;
if(this._connection._readyState==this._connection.OPEN){
this._enqueueAction(_630,_50c,[this,_631,this._id,args],_62e);
}
if(_630=="flowChannel"){
_4ac.prototype.flowFlag=active;
}
if(_632){
if(typeof (noWait)!=="undefined"&&noWait){
this._enqueueAction("nowait");
}
}
return this;
};
_4ac.prototype.commitTx=function(_633){
var args=[];
var _635="commitTx";
var _636=_410[_635];
var _637=false;
if(this._connection._readyState==this._connection.OPEN){
this._enqueueAction(_635,_50c,[this,_636,this._id,args],_633);
}
if(_635=="flowChannel"){
_4ac.prototype.flowFlag=active;
}
if(_637){
if(typeof (noWait)!=="undefined"&&noWait){
this._enqueueAction("nowait");
}
}
return this;
};
_4ac.prototype.rollbackTx=function(_638){
var args=[];
var _63a="rollbackTx";
var _63b=_410[_63a];
var _63c=false;
if(this._connection._readyState==this._connection.OPEN){
this._enqueueAction(_63a,_50c,[this,_63b,this._id,args],_638);
}
if(_63a=="flowChannel"){
_4ac.prototype.flowFlag=active;
}
if(_63c){
if(typeof (noWait)!=="undefined"&&noWait){
this._enqueueAction("nowait");
}
}
return this;
};
var func=_4ac.prototype.openChannel;
var _4a8=function(_63e,args){
_63e._stateMachine.enterState("channelReady","",null);
func.apply(_63e,args);
};
delete _4ac.prototype.openChannel;
var _640=_4ac.prototype.closeOkChannel;
var _641=function(_642,args){
_640.apply(_642,args);
};
delete _4ac.prototype.closeOkChannel;
var _644=_4ac.prototype.closeChannel;
_4ac.prototype.closeChannel=function(_645,_646){
if(typeof _645=="object"){
myConfig=_645||{};
var _647=myConfig.replyCode||0;
var _648=myConfig.replyText||"";
var _649=myConfig.classId||0;
var _64a=myConfig.methodId||0;
if(typeof _647!="number"){
throw new Error("AmqpChannel.closeChannel(): Parameter 'replyCode' is expected to be of numeric type");
}
if(typeof _648!="string"){
throw new Error("AmqpChannel.closeChannel(): Parameter 'replyText' is expected to be a string");
}
if(typeof _649!="number"){
throw new Error("AmqpChannel.closeChannel(): Parameter 'classId' is expected to be of numeric type");
}
if(typeof _64a!="number"){
throw new Error("AmqpChannel.closeChannel(): Parameter 'methodId' is expected to be of numeric type");
}
return _644.call(this,_647,_648,_649,_64a,_646);
}else{
return _644.apply(this,arguments);
}
};
var _64b=_4ac.prototype.declareExchange;
_4ac.prototype.declareExchange=function(_64c,_64d){
if(typeof _64c=="object"){
myConfig=_64c||{};
var _64e=myConfig.exchange;
var type=myConfig.type;
var _650=myConfig.passive||false;
var _651=myConfig.durable||false;
var _652=myConfig.noWait||false;
var args=myConfig.args||null;
if(!_64e||typeof _64e!="string"){
throw new Error("AmqpChannel.declareExchange(): String parameter 'exchange' is required");
}
if(!type||typeof type!="string"||((type!="fanout")&&(type!="direct")&&(type!="topic")&&(type!="headers"))){
throw new Error("AmqpChannel.declareExchange(): Legal values of parameter 'type' are direct | fanout | headers | topic");
}
if(typeof _650!="boolean"){
throw new Error("AmqpChannel.declareExchange(): Parameter 'passive' only accepts boolean values");
}
if(typeof _651!="boolean"){
throw new Error("AmqpChannel.declareExchange(): Parameter 'durable' only accepts boolean values");
}
if(typeof _652!="boolean"){
throw new Error("AmqpChannel.declareExchange(): Parameter 'noWait' only accepts boolean values");
}
return _64b.call(this,_64e,type,_650,_651,_652,args,_64d);
}else{
return _64b.apply(this,arguments);
}
};
var _654=_4ac.prototype.deleteExchange;
_4ac.prototype.deleteExchange=function(_655,_656){
if(typeof _655=="object"){
myConfig=_655||{};
var _657=myConfig.exchange;
var _658=myConfig.ifUnused||false;
var _659=myConfig.noWait||false;
if(!_657||typeof _657!="string"){
throw new Error("AmqpChannel.deleteExchange(): String parameter 'exchange' is required");
}
if(typeof _658!="boolean"){
throw new Error("AmqpChannel.deleteExchange(): Parameter 'ifUnused' only accepts boolean values");
}
if(typeof _659!="boolean"){
throw new Error("AmqpChannel.deleteExchange(): Parameter 'noWait' only accepts boolean values");
}
return _654.call(this,_657,_658,_659,_656);
}else{
return _654.apply(this,arguments);
}
};
var _65a=_4ac.prototype.declareQueue;
_4ac.prototype.declareQueue=function(_65b,_65c){
if(typeof _65b=="object"){
myConfig=_65b||{};
var _65d=myConfig.queue;
var _65e=myConfig.passive||false;
var _65f=myConfig.durable||false;
var _660=myConfig.exclusive||false;
var _661=myConfig.autoDelete||false;
var _662=myConfig.noWait||false;
var args=myConfig.args||null;
if(!_65d||typeof _65d!="string"){
throw new Error("AmqpChannel.declareQueue(): String parameter 'queue' is required");
}
if(typeof _65e!="boolean"){
throw new Error("AmqpChannel.declareQueue(): Parameter 'passive' only accepts boolean values");
}
if(typeof _65f!="boolean"){
throw new Error("AmqpChannel.declareQueue(): Parameter 'durable' only accepts boolean values");
}
if(typeof _660!="boolean"){
throw new Error("AmqpChannel.declareQueue(): Parameter 'exclusive' only accepts boolean values");
}
if(typeof _661!="boolean"){
throw new Error("AmqpChannel.declareQueue(): Parameter 'autoDelete' only accepts boolean values");
}
if(typeof _662!="boolean"){
throw new Error("AmqpChannel.declareQueue(): Parameter 'noWait' only accepts boolean values");
}
return _65a.call(this,_65d,_65e,_65f,_660,_661,_662,args,_65c);
}else{
return _65a.apply(this,arguments);
}
};
var _664=_4ac.prototype.bindQueue;
_4ac.prototype.bindQueue=function(_665,_666){
if(typeof _665=="object"){
myConfig=_665||{};
var _667=myConfig.queue;
var _668=myConfig.exchange;
var _669=myConfig.routingKey;
var _66a=myConfig.noWait||false;
var args=myConfig.args||null;
if(!_667||typeof _667!="string"){
throw new Error("AmqpChannel.bindQueue(): String parameter 'queue' is required");
}
if(!_668||typeof _668!="string"){
throw new Error("AmqpChannel.bindQueue(): String parameter 'exchange' is required");
}
if(!_669||typeof _669!="string"){
throw new Error("AmqpChannel.bindQueue(): String parameter 'routingKey' is required");
}
if(typeof _66a!="boolean"){
throw new Error("AmqpChannel.bindQueue(): Parameter 'noWait' only accepts boolean values");
}
return _664.call(this,_667,_668,_669,_66a,args,_666);
}else{
return _664.apply(this,arguments);
}
};
var _66c=_4ac.prototype.unbindQueue;
_4ac.prototype.unbindQueue=function(_66d,_66e){
if(typeof _66d=="object"){
myConfig=_66d||{};
var _66f=myConfig.queue;
var _670=myConfig.exchange;
var _671=myConfig.routingKey;
var args=myConfig.args||null;
if(!_66f||typeof _66f!="string"){
throw new Error("AmqpChannel.unbindQueue(): String parameter 'queue' is required");
}
if(!_670||typeof _670!="string"){
throw new Error("AmqpChannel.unbindQueue(): String parameter 'exchange' is required");
}
if(!_671||typeof _671!="string"){
throw new Error("AmqpChannel.unbindQueue(): String parameter 'routingKey' is required");
}
return _66c.call(this,_66f,_670,_671,args,_66e);
}else{
return _66c.apply(this,arguments);
}
};
var _673=_4ac.prototype.purgeQueue;
_4ac.prototype.purgeQueue=function(_674,_675){
if(typeof _674=="object"){
myConfig=_674||{};
var _676=myConfig.queue;
var _677=myConfig.noWait||false;
if(!_676||typeof _676!="string"){
throw new Error("AmqpChannel.purgeQueue(): String parameter 'queue' is required");
}
if(typeof _677!="boolean"){
throw new Error("AmqpChannel.purgeQueue(): Parameter 'noWait' only accepts boolean values");
}
return _673.call(this,_676,_677,_675);
}else{
return _673.apply(this,arguments);
}
};
var _678=_4ac.prototype.deleteQueue;
_4ac.prototype.deleteQueue=function(_679,_67a){
if(typeof _679=="object"){
myConfig=_679||{};
var _67b=myConfig.queue;
var _67c=myConfig.ifUnused||false;
var _67d=myConfig.ifEmpty||false;
var _67e=myConfig.noWait||false;
if(!_67b||typeof _67b!="string"){
throw new Error("AmqpChannel.deleteQueue(): String parameter 'queue' is required");
}
if(typeof _67c!="boolean"){
throw new Error("AmqpChannel.deleteQueue(): Parameter 'ifUnused' only accepts boolean values");
}
if(typeof _67d!="boolean"){
throw new Error("AmqpChannel.deleteQueue(): Parameter 'ifEmpty' only accepts boolean values");
}
if(typeof _67e!="boolean"){
throw new Error("AmqpChannel.deleteQueue(): Parameter 'noWait' only accepts boolean values");
}
return _678.call(this,_67b,_67c,_67d,_67e,_67a);
}else{
return _678.apply(this,arguments);
}
};
var _67f=_4ac.prototype.qosBasic;
_4ac.prototype.qosBasic=function(_680,_681){
if(typeof _680=="object"){
myConfig=_680||{};
var _682=myConfig.prefetchSize||0;
var _683=myConfig.prefetchCount||0;
var _684=myConfig.global||false;
if(typeof _682!="number"){
throw new Error("AmqpChannel.qosBasic(): Parameter 'prefetchSize' is expected to be of numeric type");
}
if(typeof _683!="number"){
throw new Error("AmqpChannel.qosBasic(): Parameter 'prefetchCount' is expected to be of numeric type");
}
if(typeof _684!="boolean"){
throw new Error("AmqpChannel.qosBasic(): Parameter 'global' only accepts boolean values");
}
return _67f.call(this,_682,_683,_684,_681);
}else{
return _67f.apply(this,arguments);
}
};
var _685=_4ac.prototype.consumeBasic;
_4ac.prototype.consumeBasic=function(_686,_687){
if(typeof _686=="object"){
myConfig=_686||{};
var _688=myConfig.queue;
var _689=myConfig.consumerTag;
var _68a=myConfig.noLocal||false;
var _68b=myConfig.noAck||false;
var _68c=myConfig.exclusive||false;
var _68d=myConfig.noWait||false;
var args=myConfig.args||null;
if(!_688||typeof _688!="string"){
throw new Error("AmqpChannel.consumeBasic(): String parameter 'queue' is required");
}
if(!_689||typeof _689!="string"){
throw new Error("AmqpChannel.consumeBasic(): String parameter 'consumerTag' is required");
}
if(typeof _68a!="boolean"){
throw new Error("AmqpChannel.consumeBasic(): Parameter 'noLocal' only accepts boolean values");
}
if(typeof _68b!="boolean"){
throw new Error("AmqpChannel.consumeBasic(): Parameter 'noAck' only accepts boolean values");
}
if(typeof _68c!="boolean"){
throw new Error("AmqpChannel.consumeBasic(): Parameter 'exclusive' only accepts boolean values");
}
if(typeof _68d!="boolean"){
throw new Error("AmqpChannel.consumeBasic(): Parameter 'noWait' only accepts boolean values");
}
return _685.call(this,_688,_689,_68a,_68b,_68c,_68d,args,_687);
}else{
return _685.apply(this,arguments);
}
};
var _68f=_4ac.prototype.cancelBasic;
_4ac.prototype.cancelBasic=function(_690,_691){
if(typeof _690=="object"){
myConfig=_690||{};
var _692=myConfig.consumerTag;
var _693=myConfig.noWait||false;
if(!_692||typeof _692!="string"){
throw new Error("AmqpChannel.cancelBasic(): String parameter 'consumerTag' is required");
}
if(typeof _693!="boolean"){
throw new Error("AmqpChannel.cancelBasic(): Parameter 'noWait' only accepts boolean values");
}
return _68f.call(this,_692,_693,_691);
}else{
return _68f.apply(this,arguments);
}
};
var _694=_4ac.prototype.publishBasic;
_4ac.prototype.publishBasic=function(_695,_696){
if(typeof _695=="object"&&_695.body){
myConfig=_695||{};
var body=myConfig.body;
var _698=myConfig.headers||{};
var _699=myConfig.exchange;
var _69a=myConfig.routingKey;
var _69b=myConfig.mandatory||false;
var _69c=myConfig.immediate||false;
if(!body){
throw new Error("AmqpChannel.publishBasic(): ByteBuffer parameter 'body' is required");
}
if(!_699||typeof _699!="string"){
throw new Error("AmqpChannel.publishBasic(): String parameter 'exchange' is required");
}
if(!_69a||typeof _69a!="string"){
throw new Error("AmqpChannel.publishBasic(): String parameter 'routingKey' is required");
}
if(typeof _69b!="boolean"){
throw new Error("AmqpChannel.publishBasic(): Parameter 'mandatory' only accepts boolean values");
}
if(typeof _69c!="boolean"){
throw new Error("AmqpChannel.publishBasic(): Parameter 'immediate' only accepts boolean values");
}
return _694.call(this,body,_698,_699,_69a,_69b,_69c,_696);
}else{
return _694.apply(this,arguments);
}
};
var _69d=_4ac.prototype.getBasic;
_4ac.prototype.getBasic=function(_69e,_69f){
if(typeof _69e=="object"){
myConfig=_69e||{};
var _6a0=myConfig.queue;
var _6a1=myConfig.noAck||false;
if(!_6a0||typeof _6a0!="string"){
throw new Error("AmqpChannel.getBasic(): String parameter 'queue' is required");
}
if(typeof _6a1!="boolean"){
throw new Error("AmqpChannel.getBasic(): Parameter 'noAck' only accepts boolean values");
}
return _69d.call(this,_6a0,_6a1,_69f);
}else{
return _69d.apply(this,arguments);
}
};
var _6a2=_4ac.prototype.ackBasic;
_4ac.prototype.ackBasic=function(_6a3,_6a4){
if(typeof _6a3=="object"){
myConfig=_6a3||{};
var _6a5=myConfig.deliveryTag;
var _6a6=myConfig.multiple||false;
if(!_6a5||typeof _6a5!="string"){
throw new Error("AmqpChannel.ackBasic(): String parameter 'deliveryTag' is required");
}
if(typeof _6a6!="boolean"){
throw new Error("AmqpChannel.ackBasic(): Parameter 'multiple' only accepts boolean values");
}
return _6a2.call(this,_6a5,_6a6,_6a4);
}else{
return _6a2.apply(this,arguments);
}
};
var _6a7=_4ac.prototype.rejectBasic;
_4ac.prototype.rejectBasic=function(_6a8,_6a9){
if(typeof _6a8=="object"){
myConfig=_6a8||{};
var _6aa=myConfig.deliveryTag;
var _6ab=myConfig.requeue||false;
if(!_6aa||typeof _6aa!="string"){
throw new Error("AmqpChannel.rejectBasic(): String parameter 'deliveryTag' is required");
}
if(typeof _6ab!="boolean"){
throw new Error("AmqpChannel.rejectBasic(): Parameter 'requeue' only accepts boolean values");
}
return _6a7.call(this,_6aa,_6ab,_6a9);
}else{
return _6a7.apply(this,arguments);
}
};
var _6ac=function(){
this._actionList=new Array();
this.currentAction=0;
this._replayLength=0;
};
_6ac.prototype.getActionList=function(){
return this._actionList;
};
_6ac.prototype.setReplayLength=function(l){
this._replayLength=l;
};
_6ac.prototype._processActions=function _processActions(){
if(!this._actionList.length){
return;
}
if(this.currentAction==this._actionList.length){
this.currentAction=0;
}
var _6ae=this._actionList[this.currentAction];
this.currentAction++;
_6ae.func.apply(_6ae.object,_6ae.args);
};
_6ac.prototype._processAllActions=function _processAllActions(){
for(i=0;i<this._replayLength;i++){
var _6af=this._actionList[i];
_6af.func.apply(_6af.object,_6af.args);
}
};
_6ac.prototype._processAllNewActions=function _processAllNewActions(){
for(i=this._replayLength;i<this._actionList.length;i++){
var _6b0=this._actionList[i];
_6b0.func.apply(_6b0.object,_6b0.args);
}
};
_6ac.prototype._addAction=function _addAction(_6b1,_6b2,func,args){
switch(_6b1){
case "declareExchange":
break;
case "declareQueue":
break;
case "bindQueue":
break;
case "consumeBasic":
break;
default:
return;
}
var _6b5=function _6b5(){
};
var _6b6={};
_6b6.object=_6b2;
_6b6.func=func||_6b5;
_6b6.args=args||null;
this._actionList.push(_6b6);
};
})();
var AmqpArguments=function(){
};
AmqpArguments.prototype=new Array();
(function(){
var _6b7=AmqpArguments.prototype;
var _add=function(_6b9,key,_6bb,type){
var _6bd={};
_6bd.key=key;
_6bd.value=_6bb;
_6bd.type=type;
_6b9.push(_6bd);
};
_6b7.addLongString=function(key,_6bf){
_add(this,key,_6bf,"longstr");
return this;
};
_6b7.addInteger=function(key,_6c1){
_add(this,key,_6c1,"int");
return this;
};
})();
(function(){
var _6c2=function(type){
switch(type){
case "deliverBasic":
return "message";
case "closeOkChannel":
case "closeChannel":
case "closeOkConnection":
case "closeConnection":
return "close";
case "getOkBasic":
case "getEmptyBasic":
return "get";
case "consumeOkBasic":
return "consume";
case "cancelOkBasic":
return "cancel";
case "openOkConnection":
case "openOkChannel":
return "open";
case "declareOkQueue":
return "declarequeue";
case "declareOkExchange":
return "declareexchange";
case "flowOkChannel":
return "flow";
case "bindOkQueue":
return "bindqueue";
case "unbindOkQueue":
return "unbindqueue";
case "deleteOkQueue":
return "deletequeue";
case "deleteOkExchange":
return "deleteexchange";
case "commitOkTx":
return "committransaction";
case "rollbackOkTx":
return "rollbacktransaction";
case "selectOkTx":
return "selecttransaction";
case "purgeOkQueue":
return "purgequeue";
case "recoverOkBasic":
return "recover";
case "rejectOkBasic":
return "reject";
case "error":
return "error";
default:
throw (new Error("AMQP: unknown event name "+type));
}
};
AmqpEvent=function(_6c4,_6c5,_6c6){
this.type=_6c5.methodName;
this.type=_6c2(this.type);
this.args={};
for(var i=0;i<_6c5.args.length;i++){
this.args[_6c5.args[i].name]=_6c5.args[i].value;
}
this.headers=_6c6;
this.body=_6c5.body;
this.target=_6c4;
if(this.type=="error"){
this.message=this.args["replyText"];
}
};
var _6c8=AmqpEvent.prototype;
_6c8.type;
_6c8.message;
_6c8.body;
_6c8.headers;
_6c8.target;
})();
