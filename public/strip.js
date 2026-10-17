(function dartProgram(){function copyProperties(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
b[q]=a[q]}}function mixinPropertiesHard(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
if(!b.hasOwnProperty(q)){b[q]=a[q]}}}function mixinPropertiesEasy(a,b){Object.assign(b,a)}var z=function(){var s=function(){}
s.prototype={p:{}}
var r=new s()
if(!(Object.getPrototypeOf(r)&&Object.getPrototypeOf(r).p===s.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var q=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(q))return true}}catch(p){}return false}()
function inherit(a,b){a.prototype.constructor=a
a.prototype["$i"+a.name]=a
if(b!=null){if(z){Object.setPrototypeOf(a.prototype,b.prototype)
return}var s=Object.create(b.prototype)
copyProperties(a.prototype,s)
a.prototype=s}}function inheritMany(a,b){for(var s=0;s<b.length;s++){inherit(b[s],a)}}function mixinEasy(a,b){mixinPropertiesEasy(b.prototype,a.prototype)
a.prototype.constructor=a}function mixinHard(a,b){mixinPropertiesHard(b.prototype,a.prototype)
a.prototype.constructor=a}function lazy(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){a[b]=d()}a[c]=function(){return this[b]}
return a[b]}}function lazyFinal(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){var r=d()
if(a[b]!==s){A.jy(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.v(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.eA(b)
return new s(c,this)}:function(){if(s===null)s=A.eA(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.eA(a).prototype
return s}}var x=0
function tearOffParameters(a,b,c,d,e,f,g,h,i,j){if(typeof h=="number"){h+=x}return{co:a,iS:b,iI:c,rC:d,dV:e,cs:f,fs:g,fT:h,aI:i||0,nDA:j}}function installStaticTearOff(a,b,c,d,e,f,g,h){var s=tearOffParameters(a,true,false,c,d,e,f,g,h,false)
var r=staticTearOffGetter(s)
a[b]=r}function installInstanceTearOff(a,b,c,d,e,f,g,h,i,j){c=!!c
var s=tearOffParameters(a,false,c,d,e,f,g,h,i,!!j)
var r=instanceTearOffGetter(c,s)
a[b]=r}function setOrUpdateInterceptorsByTag(a){var s=v.interceptorsByTag
if(!s){v.interceptorsByTag=a
return}copyProperties(a,s)}function setOrUpdateLeafTags(a){var s=v.leafTags
if(!s){v.leafTags=a
return}copyProperties(a,s)}function updateTypes(a){var s=v.types
var r=s.length
s.push.apply(s,a)
return r}function updateHolder(a,b){copyProperties(b,a)
return a}var hunkHelpers=function(){var s=function(a,b,c,d,e){return function(f,g,h,i){return installInstanceTearOff(f,g,a,b,c,d,[h],i,e,false)}},r=function(a,b,c,d){return function(e,f,g,h){return installStaticTearOff(e,f,a,b,c,[g],h,d)}}
return{inherit:inherit,inheritMany:inheritMany,mixin:mixinEasy,mixinHard:mixinHard,installStaticTearOff:installStaticTearOff,installInstanceTearOff:installInstanceTearOff,_instance_0u:s(0,0,null,["$0"],0),_instance_1u:s(0,1,null,["$1"],0),_instance_2u:s(0,2,null,["$2"],0),_instance_0i:s(1,0,null,["$0"],0),_instance_1i:s(1,1,null,["$1"],0),_instance_2i:s(1,2,null,["$2"],0),_static_0:r(0,null,["$0"],0),_static_1:r(1,null,["$1"],0),_static_2:r(2,null,["$2"],0),makeConstList:makeConstList,lazy:lazy,lazyFinal:lazyFinal,updateHolder:updateHolder,convertToFastObject:convertToFastObject,updateTypes:updateTypes,setOrUpdateInterceptorsByTag:setOrUpdateInterceptorsByTag,setOrUpdateLeafTags:setOrUpdateLeafTags}}()
function initializeDeferredHunk(a){x=v.types.length
a(hunkHelpers,v,w,$)}var J={
eG(a,b,c,d){return{i:a,p:b,e:c,x:d}},
eD(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.eE==null){A.jk()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.f(A.f9("Return interceptor for "+A.d(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.dM
if(o==null)o=$.dM=A.e1(n)
p=q[o]}if(p!=null)return p
p=A.jp(a)
if(p!=null)return p
if(typeof a=="function")return B.z
s=Object.getPrototypeOf(a)
if(s==null)return B.p
if(s===Object.prototype)return B.p
if(typeof q=="function"){o=$.dM
if(o==null)o=$.dM=A.e1(n)
Object.defineProperty(q,o,{value:B.m,enumerable:false,writable:true,configurable:true})
return B.m}return B.m},
hx(a,b){if(a>4294967295)throw A.f(A.aI(a,0,4294967295,"length",null))
return J.hz(new Array(a),b)},
hy(a,b){return A.v(new Array(a),b.h("r<0>"))},
hz(a,b){var s=A.v(a,b.h("r<0>"))
s.$flags=1
return s},
eV(a,b){var s=t.U
return J.hb(s.a(a),s.a(b))},
eW(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
hA(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.eW(r))break;++b}return b},
hB(a,b){var s,r,q
for(s=a.length;b>0;b=r){r=b-1
if(!(r<s))return A.p(a,r)
q=a.charCodeAt(r)
if(q!==32&&q!==13&&!J.eW(q))break}return b},
ax(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.b2.prototype
return J.c6.prototype}if(typeof a=="string")return J.a7.prototype
if(a==null)return J.b3.prototype
if(typeof a=="boolean")return J.c5.prototype
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.a8.prototype
if(typeof a=="symbol")return J.b6.prototype
if(typeof a=="bigint")return J.b4.prototype
return a}if(a instanceof A.j)return a
return J.eD(a)},
eC(a){if(typeof a=="string")return J.a7.prototype
if(a==null)return a
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.a8.prototype
if(typeof a=="symbol")return J.b6.prototype
if(typeof a=="bigint")return J.b4.prototype
return a}if(a instanceof A.j)return a
return J.eD(a)},
fL(a){if(a==null)return a
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.a8.prototype
if(typeof a=="symbol")return J.b6.prototype
if(typeof a=="bigint")return J.b4.prototype
return a}if(a instanceof A.j)return a
return J.eD(a)},
jg(a){if(typeof a=="number")return J.aC.prototype
if(typeof a=="string")return J.a7.prototype
if(a==null)return a
if(!(a instanceof A.j))return J.ap.prototype
return a},
fM(a){if(typeof a=="string")return J.a7.prototype
if(a==null)return a
if(!(a instanceof A.j))return J.ap.prototype
return a},
Z(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.ax(a).C(a,b)},
eL(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string"||A.jn(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.eC(a).j(a,b)},
h8(a,b){return J.fL(a).q(a,b)},
h9(a,b){return J.fM(a).ag(a,b)},
ha(a,b,c){return J.fM(a).Y(a,b,c)},
hb(a,b){return J.jg(a).F(a,b)},
m(a){return J.ax(a).gu(a)},
eb(a){return J.fL(a).gt(a)},
ec(a){return J.eC(a).gm(a)},
hc(a){return J.ax(a).gv(a)},
ae(a){return J.ax(a).i(a)},
c3:function c3(){},
c5:function c5(){},
b3:function b3(){},
b5:function b5(){},
a9:function a9(){},
ch:function ch(){},
ap:function ap(){},
a8:function a8(){},
b4:function b4(){},
b6:function b6(){},
r:function r(a){this.$ti=a},
c4:function c4(){},
cK:function cK(a){this.$ti=a},
aY:function aY(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aC:function aC(){},
b2:function b2(){},
c6:function c6(){},
a7:function a7(){}},A={ef:function ef(){},
hg(a,b,c){if(t.O.b(a))return new A.bu(a,b.h("@<0>").p(c).h("bu<1,2>"))
return new A.ag(a,b.h("@<0>").p(c).h("ag<1,2>"))},
hC(a){return new A.b8("Field '"+a+"' has not been initialized.")},
q(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
bp(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
dX(a,b,c){return a},
eF(a){var s,r
for(s=$.N.length,r=0;r<s;++r)if(a===$.N[r])return!0
return!1},
f0(a,b,c,d){if(t.O.b(a))return new A.b0(a,b,c.h("@<0>").p(d).h("b0<1,2>"))
return new A.an(a,b,c.h("@<0>").p(d).h("an<1,2>"))},
eU(){return new A.bn("No element")},
aK:function aK(){},
aZ:function aZ(a,b){this.a=a
this.$ti=b},
ag:function ag(a,b){this.a=a
this.$ti=b},
bu:function bu(a,b){this.a=a
this.$ti=b},
ah:function ah(a,b){this.a=a
this.$ti=b},
cH:function cH(a,b){this.a=a
this.b=b},
b8:function b8(a){this.a=a},
cT:function cT(){},
h:function h(){},
bc:function bc(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
an:function an(a,b,c){this.a=a
this.b=b
this.$ti=c},
b0:function b0(a,b,c){this.a=a
this.b=b
this.$ti=c},
bd:function bd(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
br:function br(a,b){this.a=a
this.$ti=b},
bs:function bs(a,b){this.a=a
this.$ti=b},
H:function H(){},
fW(a){var s=A.fV(a)
if(s!=null)return s
return"minified:"+a},
jn(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.p.b(a)},
d(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.ae(a)
return s},
bj(a){var s,r=$.f1
if(r==null)r=$.f1=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
hP(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.p(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
hO(a){var s,r
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return null
s=parseFloat(a)
if(isNaN(s)){r=B.f.b_(a)
if(r==="NaN"||r==="+NaN"||r==="-NaN")return s
return null}return s},
ci(a){var s,r,q,p
if(a instanceof A.j)return A.M(A.bT(a),null)
s=J.ax(a)
if(s===B.y||s===B.A||t.B.b(a)){r=B.n(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.M(A.bT(a),null)},
f2(a){var s,r,q
if(a==null||typeof a=="number"||A.ev(a))return J.ae(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.a6)return a.i(0)
if(a instanceof A.X)return a.aR(!0)
s=$.h7()
for(r=0;r<1;++r){q=s[r].bG(a)
if(q!=null)return q}return"Instance of '"+A.ci(a)+"'"},
aH(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
hN(a){var s=A.aH(a).getUTCFullYear()+0
return s},
hL(a){var s=A.aH(a).getUTCMonth()+1
return s},
hH(a){var s=A.aH(a).getUTCDate()+0
return s},
hI(a){var s=A.aH(a).getUTCHours()+0
return s},
hK(a){var s=A.aH(a).getUTCMinutes()+0
return s},
hM(a){var s=A.aH(a).getUTCSeconds()+0
return s},
hJ(a){var s=A.aH(a).getUTCMilliseconds()+0
return s},
hG(a){var s=a.$thrownJsError
if(s==null)return null
return A.aU(s)},
f3(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.C(a,s)
a.$thrownJsError=s
s.stack=b.i(0)}},
fO(a){throw A.f(A.fF(a))},
p(a,b){if(a==null)J.ec(a)
throw A.f(A.fJ(a,b))},
fJ(a,b){var s,r="index"
if(!A.ex(b))return new A.W(!0,b,r,null)
s=J.ec(a)
if(b<0||b>=s)return A.hs(b,s,a,r)
return new A.bk(null,null,!0,b,r,"Value not in range")},
fF(a){return new A.W(!0,a,null,null)},
f(a){return A.C(a,new Error())},
C(a,b){var s
if(a==null)a=new A.a1()
b.dartException=a
s=A.jz
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
jz(){return J.ae(this.dartException)},
eJ(a,b){throw A.C(a,b==null?new Error():b)},
e9(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.eJ(A.iw(a,b,c),s)},
iw(a,b,c){var s,r,q,p,o,n,m,l,k
if(typeof b=="string")s=b
else{r="[]=;add;removeWhere;retainWhere;removeRange;setRange;setInt8;setInt16;setInt32;setUint8;setUint16;setUint32;setFloat32;setFloat64".split(";")
q=r.length
p=b
if(p>q){c=p/q|0
p%=q}s=r[p]}o=typeof c=="string"?c:"modify;remove from;add to".split(";")[c]
n=t.j.b(a)?"list":"ByteData"
m=a.$flags|0
l="a "
if((m&4)!==0)k="constant "
else if((m&2)!==0){k="unmodifiable "
l="an "}else k=(m&1)!==0?"fixed-length ":""
return new A.bq("'"+s+"': Cannot "+o+" "+l+k+n)},
a5(a){throw A.f(A.a_(a))},
a2(a){var s,r,q,p,o,n
a=A.fS(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.v([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.du(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
dv(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
f8(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
eg(a,b){var s=b==null,r=s?null:b.method
return new A.c7(a,r,s?null:b.receiver)},
bU(a){var s
if(a==null)return new A.cQ(a)
if(a instanceof A.b1){s=a.a
return A.ad(a,s==null?A.aO(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.ad(a,a.dartException)
return A.j5(a)},
ad(a,b){if(t.C.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
j5(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.bl(r,16)&8191)===10)switch(q){case 438:return A.ad(a,A.eg(A.d(s)+" (Error "+q+")",null))
case 445:case 5007:A.d(s)
return A.ad(a,new A.bi())}}if(a instanceof TypeError){p=$.fY()
o=$.fZ()
n=$.h_()
m=$.h0()
l=$.h3()
k=$.h4()
j=$.h2()
$.h1()
i=$.h6()
h=$.h5()
g=p.D(s)
if(g!=null)return A.ad(a,A.eg(A.I(s),g))
else{g=o.D(s)
if(g!=null){g.method="call"
return A.ad(a,A.eg(A.I(s),g))}else if(n.D(s)!=null||m.D(s)!=null||l.D(s)!=null||k.D(s)!=null||j.D(s)!=null||m.D(s)!=null||i.D(s)!=null||h.D(s)!=null){A.I(s)
return A.ad(a,new A.bi())}}return A.ad(a,new A.co(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.bm()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.ad(a,new A.W(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.bm()
return a},
aU(a){var s
if(a instanceof A.b1)return a.b
if(a==null)return new A.bI(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.bI(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
cF(a){if(a==null)return J.m(a)
if(typeof a=="object")return A.bj(a)
return J.m(a)},
ja(a){if(typeof a=="number")return B.b.gu(a)
if(a instanceof A.cC)return A.bj(a)
if(a instanceof A.X)return a.gu(a)
return A.cF(a)},
je(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.B(0,a[s],a[r])}return b},
jf(a,b){var s,r=a.length
for(s=0;s<r;++s)b.q(0,a[s])
return b},
iH(a,b,c,d,e,f){t.Z.a(a)
switch(A.ac(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.f(new A.dB("Unsupported number of arguments for wrapped closure"))},
aT(a,b){var s=a.$identity
if(!!s)return s
s=A.jb(a,b)
a.$identity=s
return s},
jb(a,b){var s
switch(b){case 0:s=a.$0
break
case 1:s=a.$1
break
case 2:s=a.$2
break
case 3:s=a.$3
break
case 4:s=a.$4
break
default:s=null}if(s!=null)return s.bind(a)
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.iH)},
hm(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.ck().constructor.prototype):Object.create(new A.az(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.eR(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.hi(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.eR(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
hi(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.f("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.he)}throw A.f("Error in functionType of tearoff")},
hj(a,b,c,d){var s=A.eQ
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
eR(a,b,c,d){if(c)return A.hl(a,b,d)
return A.hj(b.length,d,a,b)},
hk(a,b,c,d){var s=A.eQ,r=A.hf
switch(b?-1:a){case 0:throw A.f(new A.cj("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
hl(a,b,c){var s,r
if($.eO==null)$.eO=A.eN("interceptor")
if($.eP==null)$.eP=A.eN("receiver")
s=b.length
r=A.hk(s,c,a,b)
return r},
eA(a){return A.hm(a)},
he(a,b){return A.bN(v.typeUniverse,A.bT(a.a),b)},
eQ(a){return a.a},
hf(a){return a.b},
eN(a){var s,r,q,p=new A.az("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.f(A.aX("Field name "+a+" not found.",null))},
e1(a){return v.getIsolateTag(a)},
jp(a){var s,r,q,p,o,n=A.I($.fN.$1(a)),m=$.dZ[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.e5[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.cD($.fE.$2(a,n))
if(q!=null){m=$.dZ[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.e5[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.e6(s)
$.dZ[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.e5[n]=s
return s}if(p==="-"){o=A.e6(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.fP(a,s)
if(p==="*")throw A.f(A.f9(n))
if(v.leafTags[n]===true){o=A.e6(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.fP(a,s)},
fP(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.eG(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
e6(a){return J.eG(a,!1,null,!!a.$iK)},
jr(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.e6(s)
else return J.eG(s,c,null,null)},
jk(){if(!0===$.eE)return
$.eE=!0
A.jl()},
jl(){var s,r,q,p,o,n,m,l
$.dZ=Object.create(null)
$.e5=Object.create(null)
A.jj()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.fR.$1(o)
if(n!=null){m=A.jr(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
jj(){var s,r,q,p,o,n,m=B.r()
m=A.aS(B.t,A.aS(B.u,A.aS(B.o,A.aS(B.o,A.aS(B.v,A.aS(B.w,A.aS(B.x(B.n),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.fN=new A.e2(p)
$.fE=new A.e3(o)
$.fR=new A.e4(n)},
aS(a,b){return a(b)||b},
jc(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
eX(a,b,c,d,e,f){var s=b?"m":"",r=c?"":"i",q=d?"u":"",p=e?"s":"",o=function(g,h){try{return new RegExp(g,h)}catch(n){return n}}(a,s+r+q+p+f)
if(o instanceof RegExp)return o
throw A.f(A.eT("Illegal RegExp pattern ("+String(o)+")",a))},
jt(a,b,c){var s=a.indexOf(b,c)
return s>=0},
eB(a){if(a.indexOf("$",0)>=0)return a.replace(/\$/g,"$$$$")
return a},
jw(a,b,c,d){var s=b.aI(a,d)
if(s==null)return a
return A.eI(a,s.b.index,s.gN(),c)},
fS(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
l(a,b,c){var s
if(typeof b=="string")return A.jv(a,b,c)
if(b instanceof A.aD){s=b.gaL()
s.lastIndex=0
return a.replace(s,A.eB(c))}return A.ju(a,b,c)},
ju(a,b,c){var s,r,q,p
for(s=J.h9(b,a),s=s.gt(s),r=0,q="";s.k();){p=s.gl()
q=q+a.substring(r,p.ga1())+c
r=p.gN()}s=q+a.substring(r)
return s.charCodeAt(0)==0?s:s},
jv(a,b,c){var s,r,q
if(b===""){if(a==="")return c
s=a.length
for(r=c,q=0;q<s;++q)r=r+a[q]+c
return r.charCodeAt(0)==0?r:r}if(a.indexOf(b,0)<0)return a
if(a.length<500||c.indexOf("$",0)>=0)return a.split(b).join(c)
return a.replace(new RegExp(A.fS(b),"g"),A.eB(c))},
jx(a,b,c,d){var s,r,q,p,o,n
if(typeof b=="string"){s=a.indexOf(b,d)
if(s<0)return a
return A.eI(a,s,s+b.length,c)}if(b instanceof A.aD)return d===0?a.replace(b.b,A.eB(c)):A.jw(a,b,c,d)
r=J.ha(b,a,d)
q=r.gt(r)
if(!q.k())return a
p=q.gl()
r=p.ga1()
o=p.gN()
n=A.f4(r,o,a.length)
return A.eI(a,r,n,c)},
eI(a,b,c,d){return a.substring(0,b)+d+a.substring(c)},
a3:function a3(a,b){this.a=a
this.b=b},
bG:function bG(a,b,c){this.a=a
this.b=b
this.c=c},
aA:function aA(){},
b_:function b_(a,b,c){this.a=a
this.b=b
this.$ti=c},
bz:function bz(a,b){this.a=a
this.$ti=b},
bA:function bA(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aB:function aB(a,b){this.a=a
this.$ti=b},
bl:function bl(){},
du:function du(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
bi:function bi(){},
c7:function c7(a,b,c){this.a=a
this.b=b
this.c=c},
co:function co(a){this.a=a},
cQ:function cQ(a){this.a=a},
b1:function b1(a,b){this.a=a
this.b=b},
bI:function bI(a){this.a=a
this.b=null},
a6:function a6(){},
bZ:function bZ(){},
c_:function c_(){},
cm:function cm(){},
ck:function ck(){},
az:function az(a,b){this.a=a
this.b=b},
cj:function cj(a){this.a=a},
al:function al(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
cL:function cL(a,b){this.a=a
this.b=b
this.c=null},
am:function am(a,b){this.a=a
this.$ti=b},
bb:function bb(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
b9:function b9(a,b){this.a=a
this.$ti=b},
ba:function ba(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
b7:function b7(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
e2:function e2(a){this.a=a},
e3:function e3(a){this.a=a},
e4:function e4(a){this.a=a},
X:function X(){},
aM:function aM(){},
aN:function aN(){},
aD:function aD(a,b){var _=this
_.a=a
_.b=b
_.e=_.c=null},
bB:function bB(a){this.b=a},
cp:function cp(a,b,c){this.a=a
this.b=b
this.c=c},
cq:function cq(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
cl:function cl(a,b){this.a=a
this.c=b},
cz:function cz(a,b,c){this.a=a
this.b=b
this.c=c},
cA:function cA(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
aF:function aF(){},
bg:function bg(){},
c8:function c8(){},
aG:function aG(){},
be:function be(){},
bf:function bf(){},
c9:function c9(){},
ca:function ca(){},
cb:function cb(){},
cc:function cc(){},
cd:function cd(){},
ce:function ce(){},
cf:function cf(){},
bh:function bh(){},
cg:function cg(){},
bC:function bC(){},
bD:function bD(){},
bE:function bE(){},
bF:function bF(){},
el(a,b){var s=b.c
return s==null?b.c=A.bL(a,"ak",[b.x]):s},
f5(a){var s=a.w
if(s===6||s===7)return A.f5(a.x)
return s===11||s===12},
hR(a){return a.as},
bR(a){return A.dR(v.typeUniverse,a,!1)},
av(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.av(a1,s,a3,a4)
if(r===s)return a2
return A.fk(a1,r,!0)
case 7:s=a2.x
r=A.av(a1,s,a3,a4)
if(r===s)return a2
return A.fj(a1,r,!0)
case 8:q=a2.y
p=A.aR(a1,q,a3,a4)
if(p===q)return a2
return A.bL(a1,a2.x,p)
case 9:o=a2.x
n=A.av(a1,o,a3,a4)
m=a2.y
l=A.aR(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.eq(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.aR(a1,j,a3,a4)
if(i===j)return a2
return A.fl(a1,k,i)
case 11:h=a2.x
g=A.av(a1,h,a3,a4)
f=a2.y
e=A.j2(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.fi(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.aR(a1,d,a3,a4)
o=a2.x
n=A.av(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.er(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.f(A.bW("Attempted to substitute unexpected RTI kind "+a0))}},
aR(a,b,c,d){var s,r,q,p,o=b.length,n=A.dS(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.av(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
j3(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.dS(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.av(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
j2(a,b,c,d){var s,r=b.a,q=A.aR(a,r,c,d),p=b.b,o=A.aR(a,p,c,d),n=b.c,m=A.j3(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.cv()
s.a=q
s.b=o
s.c=m
return s},
v(a,b){a[v.arrayRti]=b
return a},
fH(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.ji(s)
return a.$S()}return null},
jm(a,b){var s
if(A.f5(b))if(a instanceof A.a6){s=A.fH(a)
if(s!=null)return s}return A.bT(a)},
bT(a){if(a instanceof A.j)return A.x(a)
if(Array.isArray(a))return A.au(a)
return A.eu(J.ax(a))},
au(a){var s=a[v.arrayRti],r=t.b
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
x(a){var s=a.$ti
return s!=null?s:A.eu(a)},
eu(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.iD(a,s)},
iD(a,b){var s=a instanceof A.a6?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.ij(v.typeUniverse,s.name)
b.$ccache=r
return r},
ji(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.dR(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
jh(a){return A.aw(A.x(a))},
ez(a){var s
if(a instanceof A.X)return A.jd(a.$r,a.ab())
s=a instanceof A.a6?A.fH(a):null
if(s!=null)return s
if(t.R.b(a))return J.hc(a).a
if(Array.isArray(a))return A.au(a)
return A.bT(a)},
aw(a){var s=a.r
return s==null?a.r=new A.cC(a):s},
jd(a,b){var s,r,q=b,p=q.length
if(p===0)return t.h
if(0>=p)return A.p(q,0)
s=A.bN(v.typeUniverse,A.ez(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.p(q,r)
s=A.fn(v.typeUniverse,s,A.ez(q[r]))}return A.bN(v.typeUniverse,s,a)},
V(a){return A.aw(A.dR(v.typeUniverse,a,!1))},
iC(a){var s=this
s.b=A.j0(s)
return s.b(a)},
j0(a){var s,r,q,p,o
if(a===t.K)return A.iN
if(A.ay(a))return A.iR
s=a.w
if(s===6)return A.iA
if(s===1)return A.fy
if(s===7)return A.iI
r=A.j_(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.ay)){a.f="$i"+q
if(q==="n")return A.iL
if(a===t.m)return A.iK
return A.iQ}}else if(s===10){p=A.jc(a.x,a.y)
o=p==null?A.fy:p
return o==null?A.aO(o):o}return A.iy},
j_(a){if(a.w===8){if(a===t.S)return A.ex
if(a===t.i||a===t.o)return A.iM
if(a===t.N)return A.iP
if(a===t.y)return A.ev}return null},
iB(a){var s=this,r=A.ix
if(A.ay(s))r=A.ip
else if(s===t.K)r=A.aO
else if(A.aV(s)){r=A.iz
if(s===t.a3)r=A.io
else if(s===t.aD)r=A.cD
else if(s===t.u)r=A.il
else if(s===t.ae)r=A.fr
else if(s===t.I)r=A.im
else if(s===t.aQ)r=A.o}else if(s===t.S)r=A.ac
else if(s===t.N)r=A.I
else if(s===t.y)r=A.es
else if(s===t.o)r=A.fq
else if(s===t.i)r=A.et
else if(s===t.m)r=A.e
s.a=r
return s.a(a)},
iy(a){var s=this
if(a==null)return A.aV(s)
return A.jo(v.typeUniverse,A.jm(a,s),s)},
iA(a){if(a==null)return!0
return this.x.b(a)},
iQ(a){var s,r=this
if(a==null)return A.aV(r)
s=r.f
if(a instanceof A.j)return!!a[s]
return!!J.ax(a)[s]},
iL(a){var s,r=this
if(a==null)return A.aV(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.j)return!!a[s]
return!!J.ax(a)[s]},
iK(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.j)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
fx(a){if(typeof a=="object"){if(a instanceof A.j)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
ix(a){var s=this
if(a==null){if(A.aV(s))return a}else if(s.b(a))return a
throw A.C(A.ft(a,s),new Error())},
iz(a){var s=this
if(a==null||s.b(a))return a
throw A.C(A.ft(a,s),new Error())},
ft(a,b){return new A.bJ("TypeError: "+A.fc(a,A.M(b,null)))},
fc(a,b){return A.cI(a)+": type '"+A.M(A.ez(a),null)+"' is not a subtype of type '"+b+"'"},
Q(a,b){return new A.bJ("TypeError: "+A.fc(a,b))},
iI(a){var s=this
return s.x.b(a)||A.el(v.typeUniverse,s).b(a)},
iN(a){return a!=null},
aO(a){if(a!=null)return a
throw A.C(A.Q(a,"Object"),new Error())},
iR(a){return!0},
ip(a){return a},
fy(a){return!1},
ev(a){return!0===a||!1===a},
es(a){if(!0===a)return!0
if(!1===a)return!1
throw A.C(A.Q(a,"bool"),new Error())},
il(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.C(A.Q(a,"bool?"),new Error())},
et(a){if(typeof a=="number")return a
throw A.C(A.Q(a,"double"),new Error())},
im(a){if(typeof a=="number")return a
if(a==null)return a
throw A.C(A.Q(a,"double?"),new Error())},
ex(a){return typeof a=="number"&&Math.floor(a)===a},
ac(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.C(A.Q(a,"int"),new Error())},
io(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.C(A.Q(a,"int?"),new Error())},
iM(a){return typeof a=="number"},
fq(a){if(typeof a=="number")return a
throw A.C(A.Q(a,"num"),new Error())},
fr(a){if(typeof a=="number")return a
if(a==null)return a
throw A.C(A.Q(a,"num?"),new Error())},
iP(a){return typeof a=="string"},
I(a){if(typeof a=="string")return a
throw A.C(A.Q(a,"String"),new Error())},
cD(a){if(typeof a=="string")return a
if(a==null)return a
throw A.C(A.Q(a,"String?"),new Error())},
e(a){if(A.fx(a))return a
throw A.C(A.Q(a,"JSObject"),new Error())},
o(a){if(a==null)return a
if(A.fx(a))return a
throw A.C(A.Q(a,"JSObject?"),new Error())},
fB(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.M(a[q],b)
return s},
iV(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.fB(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.M(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
fu(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.v([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.a.q(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.p(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.M(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.M(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.M(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.M(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.M(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
M(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.M(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.M(a.x,b)+">"
if(l===8){p=A.j4(a.x)
o=a.y
return o.length>0?p+("<"+A.fB(o,b)+">"):p}if(l===10)return A.iV(a,b)
if(l===11)return A.fu(a,b,null)
if(l===12)return A.fu(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.p(b,n)
return b[n]}return"?"},
j4(a){var s=A.fV(a)
if(s!=null)return s
return"minified:"+a},
ik(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
ij(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.dR(a,b,!1)
else if(typeof m=="number"){s=m
r=A.bM(a,5,"#")
q=A.dS(s)
for(p=0;p<s;++p)q[p]=r
o=A.bL(a,b,q)
n[b]=o
return o}else return m},
ii(a,b){return A.fo(a.tR,b)},
ih(a,b){return A.fo(a.eT,b)},
dR(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.fm(a,null,b,!1)
r.set(b,s)
return s},
bN(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.fm(a,b,c,!0)
q.set(c,r)
return r},
fn(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.eq(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
fm(a,b,c,d){return A.i8(A.i2(a,b,c,d))},
ab(a,b){b.a=A.iB
b.b=A.iC
return b},
bM(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.U(null,null)
s.w=b
s.as=c
r=A.ab(a,s)
a.eC.set(c,r)
return r},
fk(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.ie(a,b,r,c)
a.eC.set(r,s)
return s},
ie(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.ay(b))if(!(b===t.P||b===t.T))if(s!==6)r=s===7&&A.aV(b.x)
if(r)return b
else if(s===1)return t.P}q=new A.U(null,null)
q.w=6
q.x=b
q.as=c
return A.ab(a,q)},
fj(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.ic(a,b,r,c)
a.eC.set(r,s)
return s},
ic(a,b,c,d){var s,r
if(d){s=b.w
if(A.ay(b)||b===t.K)return b
else if(s===1)return A.bL(a,"ak",[b])
else if(b===t.P||b===t.T)return t.bc}r=new A.U(null,null)
r.w=7
r.x=b
r.as=c
return A.ab(a,r)},
ig(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.U(null,null)
s.w=13
s.x=b
s.as=q
r=A.ab(a,s)
a.eC.set(q,r)
return r},
bK(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
ib(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
bL(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.bK(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.U(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.ab(a,r)
a.eC.set(p,q)
return q},
eq(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.bK(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.U(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.ab(a,o)
a.eC.set(q,n)
return n},
fl(a,b,c){var s,r,q="+"+(b+"("+A.bK(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.U(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.ab(a,s)
a.eC.set(q,r)
return r},
fi(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.bK(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.bK(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.ib(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.U(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.ab(a,p)
a.eC.set(r,o)
return o},
er(a,b,c,d){var s,r=b.as+("<"+A.bK(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.id(a,b,c,r,d)
a.eC.set(r,s)
return s},
id(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.dS(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.av(a,b,r,0)
m=A.aR(a,c,r,0)
return A.er(a,n,m,c!==m)}}l=new A.U(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.ab(a,l)},
i2(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
i8(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.i4(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.fg(a,r,l,k,!1)
else if(q===46)r=A.fg(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.at(a.u,a.e,k.pop()))
break
case 94:k.push(A.ig(a.u,k.pop()))
break
case 35:k.push(A.bM(a.u,5,"#"))
break
case 64:k.push(A.bM(a.u,2,"@"))
break
case 126:k.push(A.bM(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.i6(a,k)
break
case 38:A.i5(a,k)
break
case 63:p=a.u
k.push(A.fk(p,A.at(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.fj(p,A.at(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.i3(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.fh(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.i9(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-2)
break
case 43:n=l.indexOf("(",r)
k.push(l.substring(r,n))
k.push(-4)
k.push(a.p)
a.p=k.length
r=n+1
break
default:throw"Bad character "+q}}}m=k.pop()
return A.at(a.u,a.e,m)},
i4(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
fg(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.ik(s,o.x)[p]
if(n==null)A.eJ('No "'+p+'" in "'+A.hR(o)+'"')
d.push(A.bN(s,o,n))}else d.push(p)
return m},
i6(a,b){var s,r=a.u,q=A.ff(a,b),p=b.pop()
if(typeof p=="string")b.push(A.bL(r,p,q))
else{s=A.at(r,a.e,p)
switch(s.w){case 11:b.push(A.er(r,s,q,a.n))
break
default:b.push(A.eq(r,s,q))
break}}},
i3(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.ff(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.at(p,a.e,o)
q=new A.cv()
q.a=s
q.b=n
q.c=m
b.push(A.fi(p,r,q))
return
case-4:b.push(A.fl(p,b.pop(),s))
return
default:throw A.f(A.bW("Unexpected state under `()`: "+A.d(o)))}},
i5(a,b){var s=b.pop()
if(0===s){b.push(A.bM(a.u,1,"0&"))
return}if(1===s){b.push(A.bM(a.u,4,"1&"))
return}throw A.f(A.bW("Unexpected extended operation "+A.d(s)))},
ff(a,b){var s=b.splice(a.p)
A.fh(a.u,a.e,s)
a.p=b.pop()
return s},
at(a,b,c){if(typeof c=="string")return A.bL(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.i7(a,b,c)}else return c},
fh(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.at(a,b,c[s])},
i9(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.at(a,b,c[s])},
i7(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.f(A.bW("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.f(A.bW("Bad index "+c+" for "+b.i(0)))},
jo(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.B(a,b,null,c,null)
r.set(c,s)}return s},
B(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.ay(d))return!0
s=b.w
if(s===4)return!0
if(A.ay(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.B(a,c[b.x],c,d,e))return!0
q=d.w
p=t.P
if(b===p||b===t.T){if(q===7)return A.B(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.B(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.B(a,b.x,c,d,e))return!1
return A.B(a,A.el(a,b),c,d,e)}if(s===6)return A.B(a,p,c,d,e)&&A.B(a,b.x,c,d,e)
if(q===7){if(A.B(a,b,c,d.x,e))return!0
return A.B(a,b,c,A.el(a,d),e)}if(q===6)return A.B(a,b,c,p,e)||A.B(a,b,c,d.x,e)
if(r)return!1
p=s!==11
if((!p||s===12)&&d===t.Z)return!0
o=s===10
if(o&&d===t.Y)return!0
if(q===12){if(b===t.g)return!0
if(s!==12)return!1
n=b.y
m=d.y
l=n.length
if(l!==m.length)return!1
c=c==null?n:n.concat(c)
e=e==null?m:m.concat(e)
for(k=0;k<l;++k){j=n[k]
i=m[k]
if(!A.B(a,j,c,i,e)||!A.B(a,i,e,j,c))return!1}return A.fw(a,b.x,c,d.x,e)}if(q===11){if(b===t.g)return!0
if(p)return!1
return A.fw(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.iJ(a,b,c,d,e)}if(o&&q===10)return A.iO(a,b,c,d,e)
return!1},
fw(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.B(a3,a4.x,a5,a6.x,a7))return!1
s=a4.y
r=a6.y
q=s.a
p=r.a
o=q.length
n=p.length
if(o>n)return!1
m=n-o
l=s.b
k=r.b
j=l.length
i=k.length
if(o+j<n+i)return!1
for(h=0;h<o;++h){g=q[h]
if(!A.B(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.B(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.B(a3,k[h],a7,g,a5))return!1}f=s.c
e=r.c
d=f.length
c=e.length
for(b=0,a=0;a<c;a+=3){a0=e[a]
for(;;){if(b>=d)return!1
a1=f[b]
b+=3
if(a0<a1)return!1
a2=f[b-2]
if(a1<a0){if(a2)return!1
continue}g=e[a+1]
if(a2&&!g)return!1
g=f[b-1]
if(!A.B(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
iJ(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.bN(a,b,r[o])
return A.fp(a,p,null,c,d.y,e)}return A.fp(a,b.y,null,c,d.y,e)},
fp(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.B(a,b[s],d,e[s],f))return!1
return!0},
iO(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.B(a,r[s],c,q[s],e))return!1
return!0},
aV(a){var s=a.w,r=!0
if(!(a===t.P||a===t.T))if(!A.ay(a))if(s!==6)r=s===7&&A.aV(a.x)
return r},
ay(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
fo(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
dS(a){return a>0?new Array(a):v.typeUniverse.sEA},
U:function U(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
cv:function cv(){this.c=this.b=this.a=null},
cC:function cC(a){this.a=a},
cu:function cu(){},
bJ:function bJ(a){this.a=a},
hZ(){var s,r,q
if(self.scheduleImmediate!=null)return A.j7()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.aT(new A.dx(s),1)).observe(r,{childList:true})
return new A.dw(s,r,q)}else if(self.setImmediate!=null)return A.j8()
return A.j9()},
i_(a){self.scheduleImmediate(A.aT(new A.dy(t.M.a(a)),0))},
i0(a){self.setImmediate(A.aT(new A.dz(t.M.a(a)),0))},
i1(a){t.M.a(a)
A.ia(0,a)},
ia(a,b){var s=new A.dP()
s.b5(a,b)
return s},
iT(a){return new A.cr(new A.F($.y,a.h("F<0>")),a.h("cr<0>"))},
is(a,b){a.$2(0,null)
b.b=!0
return b.a},
fs(a,b){A.it(a,b)},
ir(a,b){b.ah(a)},
iq(a,b){b.ai(A.bU(a),A.aU(a))},
it(a,b){var s,r,q=new A.dT(b),p=new A.dU(b)
if(a instanceof A.F)a.aP(q,p,t.z)
else{s=t.z
if(a instanceof A.F)a.aZ(q,p,s)
else{r=new A.F($.y,t._)
r.a=8
r.c=a
r.aP(q,p,s)}}},
j6(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.y.aW(new A.dW(s),t.H,t.S,t.z)},
ed(a){var s
if(t.C.b(a)){s=a.gR()
if(s!=null)return s}return B.i},
iE(a,b){if($.y===B.e)return null
return null},
iF(a,b){if($.y!==B.e)A.iE(a,b)
if(b==null)if(t.C.b(a)){b=a.gR()
if(b==null){A.f3(a,B.i)
b=B.i}}else b=B.i
else if(t.C.b(a))A.f3(a,b)
return new A.P(a,b)},
em(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t._;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.hT()
b.a4(new A.P(new A.W(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.aM(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.V()
b.S(o.a)
A.aL(b,p)
return}b.a^=2
A.cE(null,null,b.b,t.M.a(new A.dF(o,b)))},
aL(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.t,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.ey(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.aL(d.a,c)
q.a=l
k=l.a}p=d.a
j=p.c
q.b=n
q.c=j
if(o){i=c.c
i=(i&1)!==0||(i&15)===8}else i=!0
if(i){h=c.b.b
if(n){p=p.b===h
p=!(p||p)}else p=!1
if(p){s.a(j)
A.ey(j.a,j.b)
return}g=$.y
if(g!==h)$.y=h
else g=null
c=c.c
if((c&15)===8)new A.dJ(q,d,n).$0()
else if(o){if((c&1)!==0)new A.dI(q,j).$0()}else if((c&2)!==0)new A.dH(d,q).$0()
if(g!=null)$.y=g
c=q.c
if(c instanceof A.F){p=q.a.$ti
p=p.h("ak<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.W(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.em(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.W(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
iW(a,b){var s
if(t.Q.b(a))return b.aW(a,t.z,t.K,t.l)
s=t.v
if(s.b(a))return s.a(a)
throw A.f(A.eM(a,"onError",u.c))},
iU(){var s,r
for(s=$.aQ;s!=null;s=$.aQ){$.bQ=null
r=s.b
$.aQ=r
if(r==null)$.bP=null
s.a.$0()}},
j1(){$.ew=!0
try{A.iU()}finally{$.bQ=null
$.ew=!1
if($.aQ!=null)$.eK().$1(A.fG())}},
fC(a){var s=new A.cs(a),r=$.bP
if(r==null){$.aQ=$.bP=s
if(!$.ew)$.eK().$1(A.fG())}else $.bP=r.b=s},
iZ(a){var s,r,q,p=$.aQ
if(p==null){A.fC(a)
$.bQ=$.bP
return}s=new A.cs(a)
r=$.bQ
if(r==null){s.b=p
$.aQ=$.bQ=s}else{q=r.b
s.b=q
$.bQ=r.b=s
if(q==null)$.bP=s}},
jG(a,b){A.dX(a,"stream",t.K)
return new A.cy(b.h("cy<0>"))},
ey(a,b){A.iZ(new A.dV(a,b))},
fA(a,b,c,d,e){var s,r=$.y
if(r===c)return d.$0()
$.y=c
s=r
try{r=d.$0()
return r}finally{$.y=s}},
iY(a,b,c,d,e,f,g){var s,r=$.y
if(r===c)return d.$1(e)
$.y=c
s=r
try{r=d.$1(e)
return r}finally{$.y=s}},
iX(a,b,c,d,e,f,g,h,i){var s,r=$.y
if(r===c)return d.$2(e,f)
$.y=c
s=r
try{r=d.$2(e,f)
return r}finally{$.y=s}},
cE(a,b,c,d){t.M.a(d)
if(B.e!==c){d=c.bo(d)
d=d}A.fC(d)},
dx:function dx(a){this.a=a},
dw:function dw(a,b,c){this.a=a
this.b=b
this.c=c},
dy:function dy(a){this.a=a},
dz:function dz(a){this.a=a},
dP:function dP(){},
dQ:function dQ(a,b){this.a=a
this.b=b},
cr:function cr(a,b){this.a=a
this.b=!1
this.$ti=b},
dT:function dT(a){this.a=a},
dU:function dU(a){this.a=a},
dW:function dW(a){this.a=a},
P:function P(a,b){this.a=a
this.b=b},
ct:function ct(){},
bt:function bt(a,b){this.a=a
this.$ti=b},
aq:function aq(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
F:function F(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
dC:function dC(a,b){this.a=a
this.b=b},
dG:function dG(a,b){this.a=a
this.b=b},
dF:function dF(a,b){this.a=a
this.b=b},
dE:function dE(a,b){this.a=a
this.b=b},
dD:function dD(a,b){this.a=a
this.b=b},
dJ:function dJ(a,b,c){this.a=a
this.b=b
this.c=c},
dK:function dK(a,b){this.a=a
this.b=b},
dL:function dL(a){this.a=a},
dI:function dI(a,b){this.a=a
this.b=b},
dH:function dH(a,b){this.a=a
this.b=b},
cs:function cs(a){this.a=a
this.b=null},
cy:function cy(a){this.$ti=a},
bO:function bO(){},
cx:function cx(){},
dO:function dO(a,b){this.a=a
this.b=b},
dV:function dV(a,b){this.a=a
this.b=b},
fd(a,b){var s=a[b]
return s===a?null:s},
eo(a,b,c){if(c==null)a[b]=a
else a[b]=c},
en(){var s=Object.create(null)
A.eo(s,"<non-identifier-key>",s)
delete s["<non-identifier-key>"]
return s},
eh(a,b){return new A.al(a.h("@<0>").p(b).h("al<1,2>"))},
hD(a){return new A.ar(a.h("ar<0>"))},
ei(a,b){return b.h("eY<0>").a(A.jf(a,new A.ar(b.h("ar<0>"))))},
ep(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
fe(a,b,c){var s=new A.as(a,b,c.h("as<0>"))
s.c=a.e
return s},
ek(a){var s,r
if(A.eF(a))return"{...}"
s=new A.bo("")
try{r={}
B.a.q($.N,a)
s.a+="{"
r.a=!0
a.G(0,new A.cO(r,s))
s.a+="}"}finally{if(0>=$.N.length)return A.p($.N,-1)
$.N.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
bv:function bv(){},
by:function by(a){var _=this
_.a=0
_.e=_.d=_.c=_.b=null
_.$ti=a},
bw:function bw(a,b){this.a=a
this.$ti=b},
bx:function bx(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
ar:function ar(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
cw:function cw(a){this.a=a
this.b=null},
as:function as(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
u:function u(){},
A:function A(){},
cO:function cO(a,b){this.a=a
this.b=b},
aJ:function aJ(){},
bH:function bH(){},
fK(a){var s=A.hO(a)
if(s!=null)return s
throw A.f(A.eT("Invalid double",a))},
ho(a,b){a=A.C(a,new Error())
if(a==null)a=A.aO(a)
a.stack=b.i(0)
throw a},
eZ(a,b,c,d){var s,r=c?J.hy(a,d):J.hx(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
hE(a,b,c){var s,r,q=A.v([],c.h("r<0>"))
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.a5)(a),++r)B.a.q(q,c.a(a[r]))
q.$flags=1
return q},
ej(a,b){var s,r
if(Array.isArray(a))return A.v(a.slice(0),b.h("r<0>"))
s=A.v([],b.h("r<0>"))
for(r=J.eb(a);r.k();)B.a.q(s,r.gl())
return s},
a0(a,b){return new A.aD(a,A.eX(a,!1,b,!1,!1,""))},
f6(a,b,c){var s=J.eb(b)
if(!s.k())return a
if(c.length===0){do a+=A.d(s.gl())
while(s.k())}else{a+=A.d(s.gl())
while(s.k())a=a+c+A.d(s.gl())}return a},
hT(){return A.aU(new Error())},
hn(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
eS(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
c1(a){if(a>=10)return""+a
return"0"+a},
cI(a){if(typeof a=="number"||A.ev(a)||a==null)return J.ae(a)
if(typeof a=="string")return JSON.stringify(a)
return A.f2(a)},
hp(a,b){A.dX(a,"error",t.K)
A.dX(b,"stackTrace",t.l)
A.ho(a,b)},
bW(a){return new A.bV(a)},
aX(a,b){return new A.W(!1,null,b,a)},
eM(a,b,c){return new A.W(!0,a,b,c)},
aI(a,b,c,d,e){return new A.bk(b,c,!0,a,d,"Invalid value")},
f4(a,b,c){if(0>a||a>c)throw A.f(A.aI(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.f(A.aI(b,a,c,"end",null))
return b}return c},
hs(a,b,c,d){return new A.c2(b,!0,a,d,"Index out of range")},
fa(a){return new A.bq(a)},
f9(a){return new A.cn(a)},
dl(a){return new A.bn(a)},
a_(a){return new A.c0(a)},
eT(a,b){return new A.cJ(a,b)},
hw(a,b,c){var s,r
if(A.eF(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.v([],t.s)
B.a.q($.N,a)
try{A.iS(a,s)}finally{if(0>=$.N.length)return A.p($.N,-1)
$.N.pop()}r=A.f6(b,t.V.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
ee(a,b,c){var s,r
if(A.eF(a))return b+"..."+c
s=new A.bo(b)
B.a.q($.N,a)
try{r=s
r.a=A.f6(r.a,a,", ")}finally{if(0>=$.N.length)return A.p($.N,-1)
$.N.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
iS(a,b){var s,r,q,p,o,n,m,l=a.gt(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.k())return
s=A.d(l.gl())
B.a.q(b,s)
k+=s.length+2;++j}if(!l.k()){if(j<=5)return
if(0>=b.length)return A.p(b,-1)
r=b.pop()
if(0>=b.length)return A.p(b,-1)
q=b.pop()}else{p=l.gl();++j
if(!l.k()){if(j<=4){B.a.q(b,A.d(p))
return}r=A.d(p)
if(0>=b.length)return A.p(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gl();++j
for(;l.k();p=o,o=n){n=l.gl();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.p(b,-1)
k-=b.pop().length+2;--j}B.a.q(b,"...")
return}}q=A.d(p)
r=A.d(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.p(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.a.q(b,m)
B.a.q(b,q)
B.a.q(b,r)},
f_(a,b,c,d,e){return new A.ah(a,b.h("@<0>").p(c).p(d).p(e).h("ah<1,2,3,4>"))},
cR(a,b,c,d,e,f,g){var s
if(B.d===c){s=J.m(a)
b=J.m(b)
return A.bp(A.q(A.q($.aW(),s),b))}if(B.d===d){s=J.m(a)
b=J.m(b)
c=J.m(c)
return A.bp(A.q(A.q(A.q($.aW(),s),b),c))}if(B.d===e){s=J.m(a)
b=J.m(b)
c=J.m(c)
d=J.m(d)
return A.bp(A.q(A.q(A.q(A.q($.aW(),s),b),c),d))}if(B.d===f){s=J.m(a)
b=J.m(b)
c=J.m(c)
d=J.m(d)
e=J.m(e)
return A.bp(A.q(A.q(A.q(A.q(A.q($.aW(),s),b),c),d),e))}if(B.d===g){s=J.m(a)
b=J.m(b)
c=J.m(c)
d=J.m(d)
e=J.m(e)
f=J.m(f)
return A.bp(A.q(A.q(A.q(A.q(A.q(A.q($.aW(),s),b),c),d),e),f))}s=J.m(a)
b=J.m(b)
c=J.m(c)
d=J.m(d)
e=J.m(e)
f=J.m(f)
g=J.m(g)
g=A.bp(A.q(A.q(A.q(A.q(A.q(A.q(A.q($.aW(),s),b),c),d),e),f),g))
return g},
ai:function ai(a,b,c){this.a=a
this.b=b
this.c=c},
dA:function dA(){},
w:function w(){},
bV:function bV(a){this.a=a},
a1:function a1(){},
W:function W(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bk:function bk(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
c2:function c2(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
bq:function bq(a){this.a=a},
cn:function cn(a){this.a=a},
bn:function bn(a){this.a=a},
c0:function c0(a){this.a=a},
bm:function bm(){},
dB:function dB(a){this.a=a},
cJ:function cJ(a,b){this.a=a
this.b=b},
b:function b(){},
T:function T(a,b,c){this.a=a
this.b=b
this.$ti=c},
D:function D(){},
j:function j(){},
cB:function cB(){},
bo:function bo(a){this.a=a},
cP:function cP(a){this.a=a},
aP(a){var s
if(typeof a=="function")throw A.f(A.aX("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(){return b(c)}}(A.iu,a)
s[$.ea()]=a
return s},
fv(a){var s
if(typeof a=="function")throw A.f(A.aX("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(d){return b(c,d,arguments.length)}}(A.iv,a)
s[$.ea()]=a
return s},
iu(a){return t.Z.a(a).$0()},
iv(a,b,c){t.Z.a(a)
if(A.ac(c)>=1)return a.$1(b)
return a.$0()},
eH(a,b){var s=new A.F($.y,b.h("F<0>")),r=new A.bt(s,b.h("bt<0>"))
a.then(A.aT(new A.e7(r,b),1),A.aT(new A.e8(r),1))
return s},
fz(a){return a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string"||a instanceof Int8Array||a instanceof Uint8Array||a instanceof Uint8ClampedArray||a instanceof Int16Array||a instanceof Uint16Array||a instanceof Int32Array||a instanceof Uint32Array||a instanceof Float32Array||a instanceof Float64Array||a instanceof ArrayBuffer||a instanceof DataView},
fI(a){if(A.fz(a))return a
return new A.dY(new A.by(t.dd)).$1(a)},
e7:function e7(a,b){this.a=a
this.b=b},
e8:function e8(a){this.a=a},
dY:function dY(a){this.a=a},
hU(a){return B.a.by(B.E,new A.dm(a),new A.dn())},
hd(a){var s=a.a,r=a.$ti.h("4?"),q=r.a(s.j(0,"rejection")),p=t.f.b(q)?q.K(0,t.N,t.X):B.M,o=new A.cG(),n=o.$1(r.a(s.j(0,"source"))),m=o.$1(r.a(s.j(0,"by"))),l=o.$1(r.a(s.j(0,"role")))
o.$1(r.a(s.j(0,"basis")))
return new A.bX(n,m,l,o.$1(r.a(s.j(0,"verified"))),o.$1(r.a(s.j(0,"model"))),o.$1(r.a(s.j(0,"rationale"))),o.$1(p.j(0,"by")),o.$1(p.j(0,"reason")),o.$1(p.j(0,"reviewed")))},
hh(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=a5.a,e=a5.$ti.h("4?"),d=t.f,c=t.N,b=t.X,a=d.a(e.a(f.j(0,"bands"))).K(0,c,b),a0=e.a(f.j(0,"attestation")),a1=e.a(f.j(0,"variant")),a2=A.d(e.a(f.j(0,"name"))),a3=typeof a1=="string"&&a1.length!==0?a1:null,a4=e.a(f.j(0,"group"))
a4=A.d(a4==null?"":a4)
f=A.hU(e.a(f.j(0,"status")))
e=d.b(a0)?A.hd(a0.K(0,c,b)):B.q
d=a.a
b=a.$ti.h("4?")
s=A.fU(b.a(d.j(0,"lmF")))
r=A.fU(b.a(d.j(0,"hmF")))
q=J.Z(b.a(d.j(0,"hpf")),"IN")
p=B.c.A(B.b.n(A.e_(b.a(d.j(0,"hf")))[0]),-15,15)
o=r!=null
n=!o||isNaN(r)?3000:B.b.A(r,500,15e3)
o=!o||isNaN(r)?0:B.c.A(B.b.n(A.e_(b.a(d.j(0,"hmD")))[0]),-15,15)
m=s!=null
l=!m||isNaN(s)?300:B.b.A(s,35,1000)
m=!m||isNaN(s)?0:B.c.A(B.b.n(A.e_(b.a(d.j(0,"lmD")))[0]),-15,15)
k=B.c.A(B.b.n(A.e_(b.a(d.j(0,"lf")))[0]),-15,15)
c=A.eh(c,c)
for(j=0;j<4;++j){i=B.D[j]
h=i.a
if(typeof b.a(d.j(0,h))=="string"){g=A.d(b.a(d.j(0,h)))
c.B(0,i.b,A.l(g,"-","\u2212"))}}return new A.bY(a2,a3,a4,f,e,new A.E(q,p,n,o,l,m,k),c)},
fU(a){var s,r,q,p
if(a==null||J.Z(a,"0 dB"))return null
if(typeof a=="number")return a
s=A.d(a)
if(s==="park 15k")return 15e3
r=A.a0("^\\s*[+-]?(\\d+(\\.\\d*)?|\\.\\d+)",!0).bx(s)
if(r==null)return 0/0
q=r.b
if(0>=q.length)return A.p(q,0)
q=q[0]
q.toString
p=A.fK(q)
q=A.a0("k",!1)
return q.b.test(s)?p*1000:p},
e_(a){var s,r,q
if(typeof a=="number")return A.v([a,a],t.n)
s=A.a0("[\u2212+-]?\\d+(\\.\\d+)?",!0).ag(0,A.d(a))
r=A.x(s)
r=A.f0(s,r.h("c(b.E)").a(new A.e0()),r.h("b.E"),t.i)
q=A.ej(r,A.x(r).h("b.E"))
if(q.length===0)return A.v([0,0],t.n)
s=B.a.gO(q)
return A.v([s,q.length>1?q[1]:B.a.gO(q)],t.n)},
L:function L(a,b,c){this.c=a
this.a=b
this.b=c},
dm:function dm(a){this.a=a},
dn:function dn(){},
bX:function bX(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.e=d
_.f=e
_.r=f
_.w=g
_.x=h
_.y=i},
cG:function cG(){},
bY:function bY(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
e0:function e0(){},
fQ(a,b){var s=Math.pow(10,b/40),r=6.283185307179586*a/96e3,q=Math.cos(r),p=Math.sin(r)/3.6,o=p*s,n=-2*q,m=p/s
return new A.af(1+o,n,1-o,1+m,n,1-m)},
fD(a,b){var s=Math.pow(10,b/40),r=6.283185307179586*a/96e3,q=Math.sin(r)
return new A.bG(s,Math.cos(r),2*Math.sqrt(s)*(q/2*1.4142135623730951))},
af:function af(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
E:function E(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
f7(a,b,c){var s,r,q,p,o,n=t.i,m=A.ei([a,b],n),l=A.ej(B.F,n)
B.a.af(l,c)
s=l.length
r=0
for(;r<l.length;l.length===s||(0,A.a5)(l),++r){q=l[r]
if(q>=a&&q<=b)m.q(0,q)}l=b/a
p=B.b.n(Math.log(l)/0.6931471805599453*24)
n=A.hD(n)
n.af(0,m)
for(o=1;o<p;++o){q=A.fT(a*Math.pow(l,o/p))
if(m.bw(0,new A.dq(q)))n.q(0,q)}n=A.ej(n,A.x(n).c)
B.a.b2(n)
return new A.dp(n)},
fT(a){var s,r
if(a<100)s=1
else if(a<1000)s=5
else{if(a<2000)r=50
else r=a<1e4?100:500
s=r}return B.b.n(a/s)*s},
bS(a){var s,r,q
if(a<1000)return""+B.b.n(a)+" Hz"
s=a/1000
if(s===B.b.ao(s))r=""+B.b.n(s)
else{q=B.b.a0(s,2)
r=B.f.aj(q,".")?B.f.aX(q,A.a0("\\.?0+$",!0),""):q}return r+" kHz"},
a4(a){var s=A.ex(a)?a:B.b.n(a*10)/10,r=B.b.ao(s),q=Math.abs(s),p=s===r?""+B.b.n(q):A.d(q)
if(s>0)return"+"+p
if(s<0)return"\u2212"+p
return"0"},
js(a,b){var s,r,q,p=Math.log(b/a)/0.6931471805599453,o=B.b.n(Math.abs(p)*10)/10
if(o===0)return"same frequency"
s=o===B.b.ao(o)?""+B.b.n(o):A.d(o)
r=o<=1?"octave":"octaves"
q=p>0?"higher":"lower"
return s+" "+r+" "+q},
dp:function dp(a){this.a=a},
dq:function dq(a){this.a=a},
O(a){var s=A.l(a,"&","&amp;")
s=A.l(s,"<","&lt;")
s=A.l(s,">","&gt;")
return A.l(s,'"',"&quot;")},
jq(){var s=v.G
new A.dr(A.o(A.e(s.document).getElementById("mode")),A.o(A.e(s.document).getElementById("modeLabel"))).aq()
if(A.o(A.e(s.document).getElementById("sim-body"))==null)return
A.hF().M()},
hF(){var s,r=v.G,q=A.o(A.e(r.document).getElementById("sim-loading"))
q.toString
s=A.o(A.e(r.document).getElementById("sim-loading-text"))
s.toString
r=A.o(A.e(r.document).getElementById("sim-retry"))
r.toString
r=new A.cM(q,s,r)
r.b4()
return r},
hS(a1,a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=v.G,a0=A.o(A.e(a.document).getElementById("sim-channel"))
a0.toString
s=A.o(A.e(a.document).getElementById("sim-trust"))
s.toString
r=A.o(A.e(a.document).getElementById("sim-plot"))
r.toString
q=A.o(A.e(a.document).getElementById("sim-curve"))
q.toString
p=A.o(A.e(a.document).getElementById("sim-legend-start"))
p.toString
o=A.o(A.e(a.document).getElementById("sim-summary"))
o.toString
n=A.o(A.e(a.document).getElementById("sim-changed"))
n.toString
m=A.o(A.e(a.document).getElementById("sim-reset"))
m.toString
l=A.o(A.e(a.document).getElementById("hpf"))
l.toString
k=A.o(A.e(a.document).getElementById("hpf-state"))
k.toString
j=A.o(A.e(a.document).getElementById("hf-gain"))
j.toString
i=A.o(A.e(a.document).getElementById("lf-gain"))
i.toString
h=A.o(A.e(a.document).getElementById("hm-freq"))
h.toString
g=A.o(A.e(a.document).getElementById("hm-gain"))
g.toString
f=A.o(A.e(a.document).getElementById("lm-freq"))
f.toString
a=A.o(A.e(a.document).getElementById("lm-gain"))
a.toString
e=t.n
d=A.v([],e)
for(c=a1.length,b=0;b<a1.length;a1.length===c||(0,A.a5)(a1),++b)d.push(a1[b].f.e)
d=A.f7(35,1000,d)
e=A.v([],e)
for(c=a1.length,b=0;b<a1.length;a1.length===c||(0,A.a5)(a1),++b)e.push(a1[b].f.c)
return new A.cV(a1,a2,d,A.f7(500,15e3,e),A.eh(t.N,t.E),a0,s,r,q,p,o,n,m,l,k,j,i,h,g,f,a)},
cM:function cM(a,b,c){this.a=a
this.b=b
this.c=c},
cN:function cN(a){this.a=a},
cV:function cV(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.r=_.f=$
_.w=f
_.x=g
_.y=h
_.z=i
_.Q=j
_.as=k
_.at=l
_.ax=m
_.ay=n
_.ch=o
_.CW=p
_.cx=q
_.cy=r
_.db=s
_.dx=a0
_.dy=a1},
d9:function d9(a){this.a=a},
da:function da(a){this.a=a},
dj:function dj(a){this.a=a},
dk:function dk(a,b,c){this.a=a
this.b=b
this.c=c},
db:function db(){},
dc:function dc(a){this.a=a},
dd:function dd(){},
de:function de(a){this.a=a},
df:function df(){},
dg:function dg(){},
dh:function dh(a){this.a=a},
di:function di(a,b){this.a=a
this.b=b},
d8:function d8(a,b){this.a=a
this.b=b},
d7:function d7(){},
cZ:function cZ(a){this.a=a},
d_:function d_(a){this.a=a},
cX:function cX(){},
cY:function cY(a,b,c){this.a=a
this.b=b
this.c=c},
cW:function cW(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
d0:function d0(){},
d2:function d2(a){this.a=a},
d3:function d3(a){this.a=a},
d4:function d4(a,b){this.a=a
this.b=b},
d1:function d1(){},
d6:function d6(){},
d5:function d5(a,b){this.a=a
this.b=b},
dr:function dr(a,b){this.a=a
this.b=b},
ds:function ds(a){this.a=a},
dt:function dt(a){this.a=a},
fV(a){return v.mangledGlobalNames[a]},
jy(a){throw A.C(new A.b8("Field '"+a+"' has been assigned during initialization."),new Error())},
J(){throw A.C(A.hC(""),new Error())}},B={}
var w=[A,J,B]
var $={}
A.ef.prototype={}
J.c3.prototype={
C(a,b){return a===b},
gu(a){return A.bj(a)},
i(a){return"Instance of '"+A.ci(a)+"'"},
gv(a){return A.aw(A.eu(this))}}
J.c5.prototype={
i(a){return String(a)},
gu(a){return a?519018:218159},
gv(a){return A.aw(t.y)},
$ik:1,
$iY:1}
J.b3.prototype={
C(a,b){return null==b},
i(a){return"null"},
gu(a){return 0},
$ik:1}
J.b5.prototype={$it:1}
J.a9.prototype={
gu(a){return 0},
i(a){return String(a)}}
J.ch.prototype={}
J.ap.prototype={}
J.a8.prototype={
i(a){var s=a[$.fX()]
if(s==null)s=a[$.ea()]
if(s==null)return this.b3(a)
return"JavaScript function for "+J.ae(s)},
$iaj:1}
J.b4.prototype={
gu(a){return 0},
i(a){return String(a)}}
J.b6.prototype={
gu(a){return 0},
i(a){return String(a)}}
J.r.prototype={
q(a,b){A.au(a).c.a(b)
a.$flags&1&&A.e9(a,29)
a.push(b)},
af(a,b){A.au(a).h("b<1>").a(b)
a.$flags&1&&A.e9(a,"addAll",2)
this.b7(a,b)
return},
b7(a,b){var s,r
t.b.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.f(A.a_(a))
for(r=0;r<s;++r)a.push(b[r])},
L(a,b){var s,r=A.eZ(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.B(r,s,A.d(a[s]))
return r.join(b)},
aV(a){return this.L(a,"")},
by(a,b,c){var s,r,q,p=A.au(a)
p.h("Y(1)").a(b)
p.h("1()?").a(c)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.f(A.a_(a))}p=c.$0()
return p},
gO(a){if(a.length>0)return a[0]
throw A.f(A.eU())},
gbB(a){var s=a.length
if(s>0)return a[s-1]
throw A.f(A.eU())},
b2(a){var s,r,q,p,o,n
a.$flags&2&&A.e9(a,"sort")
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
p=J.eV(r,q)
if(typeof p!=="number")return p.b0()
if(p>0){a[0]=q
a[1]=r}return}o=0
if(A.au(a).c.b(null))for(n=0;n<a.length;++n)if(a[n]===void 0){a[n]=null;++o}a.sort(A.aT(J.iG(),2))
if(o>0)this.bi(a,o)},
bi(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
i(a){return A.ee(a,"[","]")},
gt(a){return new J.aY(a,a.length,A.au(a).h("aY<1>"))},
gu(a){return A.bj(a)},
gm(a){return a.length},
B(a,b,c){A.au(a).c.a(c)
a.$flags&2&&A.e9(a)
if(!(b>=0&&b<a.length))throw A.f(A.fJ(a,b))
a[b]=c},
$ih:1,
$ib:1,
$in:1}
J.c4.prototype={
bG(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.ci(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.cK.prototype={}
J.aY.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.a5(q)
throw A.f(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iz:1}
J.aC.prototype={
F(a,b){var s
A.fq(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.ga_(b)
if(this.ga_(a)===s)return 0
if(this.ga_(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
ga_(a){return a===0?1/a<0:a<0},
n(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.f(A.fa(""+a+".round()"))},
ao(a){if(a<0)return-Math.round(-a)
else return Math.round(a)},
A(a,b,c){if(B.c.F(b,c)>0)throw A.f(A.fF(b))
if(this.F(a,b)<0)return b
if(this.F(a,c)>0)return c
return a},
a0(a,b){var s
if(b>20)throw A.f(A.aI(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.ga_(a))return"-"+s
return s},
i(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gu(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
b1(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
bl(a,b){var s
if(a>0)s=this.bk(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
bk(a,b){return b>31?0:a>>>b},
gv(a){return A.aw(t.o)},
$iR:1,
$ic:1,
$iG:1}
J.b2.prototype={
gv(a){return A.aw(t.S)},
$ik:1,
$ia:1}
J.c6.prototype={
gv(a){return A.aw(t.i)},
$ik:1}
J.a7.prototype={
Y(a,b,c){var s=b.length
if(c>s)throw A.f(A.aI(c,0,s,null,null))
return new A.cz(b,a,c)},
ag(a,b){return this.Y(a,b,0)},
aX(a,b,c){return A.jx(a,b,c,0)},
ar(a,b,c){return a.substring(b,A.f4(b,c,a.length))},
b_(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(0>=o)return A.p(p,0)
if(p.charCodeAt(0)===133){s=J.hA(p,1)
if(s===o)return""}else s=0
r=o-1
if(!(r>=0))return A.p(p,r)
q=p.charCodeAt(r)===133?J.hB(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
aj(a,b){return A.jt(a,b,0)},
F(a,b){var s
A.I(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
i(a){return a},
gu(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gv(a){return A.aw(t.N)},
gm(a){return a.length},
$ik:1,
$iR:1,
$icS:1,
$ii:1}
A.aK.prototype={
gt(a){var s=this.a
return new A.aZ(s.gt(s),A.x(this).h("aZ<1,2>"))},
gm(a){var s=this.a
return s.gm(s)},
i(a){return this.a.i(0)}}
A.aZ.prototype={
k(){return this.a.k()},
gl(){return this.$ti.y[1].a(this.a.gl())},
$iz:1}
A.ag.prototype={}
A.bu.prototype={$ih:1}
A.ah.prototype={
K(a,b,c){return new A.ah(this.a,this.$ti.h("@<1,2>").p(b).p(c).h("ah<1,2,3,4>"))},
j(a,b){return this.$ti.h("4?").a(this.a.j(0,b))},
G(a,b){this.a.G(0,new A.cH(this,this.$ti.h("~(3,4)").a(b)))},
gI(){var s=this.$ti
return A.hg(this.a.gI(),s.c,s.y[2])},
gm(a){var s=this.a
return s.gm(s)}}
A.cH.prototype={
$2(a,b){var s=this.a.$ti
s.c.a(a)
s.y[1].a(b)
this.b.$2(s.y[2].a(a),s.y[3].a(b))},
$S(){return this.a.$ti.h("~(1,2)")}}
A.b8.prototype={
i(a){return"LateInitializationError: "+this.a}}
A.cT.prototype={}
A.h.prototype={}
A.bc.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=J.eC(q),o=p.gm(q)
if(r.b!==o)throw A.f(A.a_(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.bv(q,s);++r.c
return!0},
$iz:1}
A.an.prototype={
gt(a){var s=this.a
return new A.bd(s.gt(s),this.b,A.x(this).h("bd<1,2>"))},
gm(a){var s=this.a
return s.gm(s)}}
A.b0.prototype={$ih:1}
A.bd.prototype={
k(){var s=this,r=s.b
if(r.k()){s.a=s.c.$1(r.gl())
return!0}s.a=null
return!1},
gl(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iz:1}
A.br.prototype={
gt(a){return new A.bs(J.eb(this.a),this.$ti.h("bs<1>"))}}
A.bs.prototype={
k(){var s,r
for(s=this.a,r=this.$ti.c;s.k();)if(r.b(s.gl()))return!0
return!1},
gl(){return this.$ti.c.a(this.a.gl())},
$iz:1}
A.H.prototype={}
A.a3.prototype={$r:"+(1,2)",$s:1}
A.bG.prototype={$r:"+(1,2,3)",$s:2}
A.aA.prototype={
K(a,b,c){var s=A.x(this)
return A.f_(this,s.c,s.y[1],b,c)},
i(a){return A.ek(this)},
$iS:1}
A.b_.prototype={
gm(a){return this.b.length},
gaK(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
ak(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
j(a,b){if(!this.ak(b))return null
return this.b[this.a[b]]},
G(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gaK()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
gI(){return new A.bz(this.gaK(),this.$ti.h("bz<1>"))}}
A.bz.prototype={
gm(a){return this.a.length},
gt(a){var s=this.a
return new A.bA(s,s.length,this.$ti.h("bA<1>"))}}
A.bA.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iz:1}
A.aB.prototype={
U(){var s=this,r=s.$map
if(r==null){r=new A.b7(s.$ti.h("b7<1,2>"))
A.je(s.a,r)
s.$map=r}return r},
j(a,b){return this.U().j(0,b)},
G(a,b){this.$ti.h("~(1,2)").a(b)
this.U().G(0,b)},
gI(){var s=this.U()
return new A.am(s,A.x(s).h("am<1>"))},
gm(a){return this.U().a}}
A.bl.prototype={}
A.du.prototype={
D(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
if(p==null)return null
s=Object.create(null)
r=q.b
if(r!==-1)s.arguments=p[r+1]
r=q.c
if(r!==-1)s.argumentsExpr=p[r+1]
r=q.d
if(r!==-1)s.expr=p[r+1]
r=q.e
if(r!==-1)s.method=p[r+1]
r=q.f
if(r!==-1)s.receiver=p[r+1]
return s}}
A.bi.prototype={
i(a){return"Null check operator used on a null value"}}
A.c7.prototype={
i(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.co.prototype={
i(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.cQ.prototype={
i(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.b1.prototype={}
A.bI.prototype={
i(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$iaa:1}
A.a6.prototype={
i(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.fW(r==null?"unknown":r)+"'"},
$iaj:1,
gbI(){return this},
$C:"$1",
$R:1,
$D:null}
A.bZ.prototype={$C:"$0",$R:0}
A.c_.prototype={$C:"$2",$R:2}
A.cm.prototype={}
A.ck.prototype={
i(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.fW(s)+"'"}}
A.az.prototype={
C(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.az))return!1
return this.$_target===b.$_target&&this.a===b.a},
gu(a){return(A.cF(this.a)^A.bj(this.$_target))>>>0},
i(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.ci(this.a)+"'")}}
A.cj.prototype={
i(a){return"RuntimeError: "+this.a}}
A.al.prototype={
gm(a){return this.a},
gI(){return new A.am(this,A.x(this).h("am<1>"))},
j(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.bA(b)},
bA(a){var s,r,q=this.d
if(q==null)return null
s=this.bh(q,a)
r=this.am(s,a)
if(r<0)return null
return s[r].b},
B(a,b,c){var s,r,q,p,o,n,m=this,l=A.x(m)
l.c.a(b)
l.y[1].a(c)
if(typeof b=="string"){s=m.b
m.au(s==null?m.b=m.ac():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=m.c
m.au(r==null?m.c=m.ac():r,b,c)}else{q=m.d
if(q==null)q=m.d=m.ac()
p=m.al(b)
o=q[p]
if(o==null)q[p]=[m.ad(b,c)]
else{n=m.am(o,b)
if(n>=0)o[n].b=c
else o.push(m.ad(b,c))}}},
G(a,b){var s,r,q=this
A.x(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.f(A.a_(q))
s=s.c}},
au(a,b,c){var s,r=A.x(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.ad(b,c)
else s.b=c},
ad(a,b){var s=this,r=A.x(s),q=new A.cL(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else s.f=s.f.c=q;++s.a
s.r=s.r+1&1073741823
return q},
al(a){return J.m(a)&1073741823},
bh(a,b){return a[this.al(b)]},
am(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.Z(a[r].a,b))return r
return-1},
i(a){return A.ek(this)},
ac(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s}}
A.cL.prototype={}
A.am.prototype={
gm(a){return this.a.a},
gt(a){var s=this.a
return new A.bb(s,s.r,s.e,this.$ti.h("bb<1>"))}}
A.bb.prototype={
gl(){return this.d},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.f(A.a_(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iz:1}
A.b9.prototype={
gm(a){return this.a.a},
gt(a){var s=this.a
return new A.ba(s,s.r,s.e,this.$ti.h("ba<1,2>"))}}
A.ba.prototype={
gl(){var s=this.d
s.toString
return s},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.f(A.a_(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.T(s.a,s.b,r.$ti.h("T<1,2>"))
r.c=s.c
return!0}},
$iz:1}
A.b7.prototype={
al(a){return A.ja(a)&1073741823},
am(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.Z(a[r].a,b))return r
return-1}}
A.e2.prototype={
$1(a){return this.a(a)},
$S:7}
A.e3.prototype={
$2(a,b){return this.a(a,b)},
$S:8}
A.e4.prototype={
$1(a){return this.a(A.I(a))},
$S:9}
A.X.prototype={
i(a){return this.aR(!1)},
aR(a){var s,r,q,p,o,n=this.be(),m=this.ab(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.p(m,q)
o=m[q]
l=a?l+A.f2(o):l+A.d(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
be(){var s,r=this.$s
while($.dN.length<=r)B.a.q($.dN,null)
s=$.dN[r]
if(s==null){s=this.ba()
B.a.B($.dN,r,s)}return s},
ba(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=A.v(new Array(l),t.G)
for(s=0;s<l;++s)k[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.B(k,q,r[s])}}k=A.hE(k,!1,t.K)
k.$flags=3
return k}}
A.aM.prototype={
ab(){return[this.a,this.b]},
C(a,b){if(b==null)return!1
return b instanceof A.aM&&this.$s===b.$s&&J.Z(this.a,b.a)&&J.Z(this.b,b.b)},
gu(a){return A.cR(this.$s,this.a,this.b,B.d,B.d,B.d,B.d)}}
A.aN.prototype={
ab(){return[this.a,this.b,this.c]},
C(a,b){var s=this
if(b==null)return!1
return b instanceof A.aN&&s.$s===b.$s&&J.Z(s.a,b.a)&&J.Z(s.b,b.b)&&J.Z(s.c,b.c)},
gu(a){var s=this
return A.cR(s.$s,s.a,s.b,s.c,B.d,B.d,B.d)}}
A.aD.prototype={
i(a){return"RegExp/"+this.a+"/"+this.b.flags},
gaL(){var s=this,r=s.c
if(r!=null)return r
r=s.b
return s.c=A.eX(s.a,r.multiline,!r.ignoreCase,r.unicode,r.dotAll,"g")},
bx(a){var s=this.b.exec(a)
if(s==null)return null
return new A.bB(s)},
Y(a,b,c){var s=b.length
if(c>s)throw A.f(A.aI(c,0,s,null,null))
return new A.cp(this,b,c)},
ag(a,b){return this.Y(0,b,0)},
aI(a,b){var s,r=this.gaL()
if(r==null)r=A.aO(r)
r.lastIndex=b
s=r.exec(a)
if(s==null)return null
return new A.bB(s)},
$icS:1,
$ihQ:1}
A.bB.prototype={
ga1(){return this.b.index},
gN(){var s=this.b
return s.index+s[0].length},
$iaE:1,
$iao:1}
A.cp.prototype={
gt(a){return new A.cq(this.a,this.b,this.c)}}
A.cq.prototype={
gl(){var s=this.d
return s==null?t.d.a(s):s},
k(){var s,r,q,p,o,n,m=this,l=m.b
if(l==null)return!1
s=m.c
r=l.length
if(s<=r){q=m.a
p=q.aI(l,s)
if(p!=null){m.d=p
o=p.gN()
if(p.b.index===o){s=!1
if(q.b.unicode){q=m.c
n=q+1
if(n<r){if(!(q>=0&&q<r))return A.p(l,q)
q=l.charCodeAt(q)
if(q>=55296&&q<=56319){if(!(n>=0))return A.p(l,n)
s=l.charCodeAt(n)
s=s>=56320&&s<=57343}}}o=(s?o+1:o)+1}m.c=o
return!0}}m.b=m.d=null
return!1},
$iz:1}
A.cl.prototype={
gN(){return this.a+this.c.length},
$iaE:1,
ga1(){return this.a}}
A.cz.prototype={
gt(a){return new A.cA(this.a,this.b,this.c)}}
A.cA.prototype={
k(){var s,r,q=this,p=q.c,o=q.b,n=o.length,m=q.a,l=m.length
if(p+n>l){q.d=null
return!1}s=m.indexOf(o,p)
if(s<0){q.c=l+1
q.d=null
return!1}r=s+n
q.d=new A.cl(s,o)
q.c=r===q.c?r+1:r
return!0},
gl(){var s=this.d
s.toString
return s},
$iz:1}
A.aF.prototype={
gv(a){return B.S},
$ik:1}
A.bg.prototype={}
A.c8.prototype={
gv(a){return B.T},
$ik:1}
A.aG.prototype={
gm(a){return a.length},
$iK:1}
A.be.prototype={$ih:1,$ib:1,$in:1}
A.bf.prototype={$ih:1,$ib:1,$in:1}
A.c9.prototype={
gv(a){return B.U},
$ik:1}
A.ca.prototype={
gv(a){return B.V},
$ik:1}
A.cb.prototype={
gv(a){return B.W},
$ik:1}
A.cc.prototype={
gv(a){return B.X},
$ik:1}
A.cd.prototype={
gv(a){return B.Y},
$ik:1}
A.ce.prototype={
gv(a){return B.a_},
$ik:1}
A.cf.prototype={
gv(a){return B.a0},
$ik:1}
A.bh.prototype={
gv(a){return B.a1},
gm(a){return a.length},
$ik:1}
A.cg.prototype={
gv(a){return B.a2},
gm(a){return a.length},
$ik:1}
A.bC.prototype={}
A.bD.prototype={}
A.bE.prototype={}
A.bF.prototype={}
A.U.prototype={
h(a){return A.bN(v.typeUniverse,this,a)},
p(a){return A.fn(v.typeUniverse,this,a)}}
A.cv.prototype={}
A.cC.prototype={
i(a){return A.M(this.a,null)}}
A.cu.prototype={
i(a){return this.a}}
A.bJ.prototype={$ia1:1}
A.dx.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:6}
A.dw.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:10}
A.dy.prototype={
$0(){this.a.$0()},
$S:2}
A.dz.prototype={
$0(){this.a.$0()},
$S:2}
A.dP.prototype={
b5(a,b){if(self.setTimeout!=null)self.setTimeout(A.aT(new A.dQ(this,b),0),a)
else throw A.f(A.fa("`setTimeout()` not found."))}}
A.dQ.prototype={
$0(){this.b.$0()},
$S:0}
A.cr.prototype={
ah(a){var s,r=this,q=r.$ti
q.h("1/?").a(a)
if(a==null)a=q.c.a(a)
if(!r.b)r.a.av(a)
else{s=r.a
if(q.h("ak<1>").b(a))s.az(a)
else s.aE(a)}},
ai(a,b){var s=this.a
if(this.b)s.a6(new A.P(a,b))
else s.a4(new A.P(a,b))}}
A.dT.prototype={
$1(a){return this.a.$2(0,a)},
$S:4}
A.dU.prototype={
$2(a,b){this.a.$2(1,new A.b1(a,t.l.a(b)))},
$S:11}
A.dW.prototype={
$2(a,b){this.a(A.ac(a),b)},
$S:12}
A.P.prototype={
i(a){return A.d(this.a)},
$iw:1,
gR(){return this.b}}
A.ct.prototype={
ai(a,b){var s=this.a
if((s.a&30)!==0)throw A.f(A.dl("Future already completed"))
s.a4(A.iF(a,b))},
aS(a){return this.ai(a,null)}}
A.bt.prototype={
ah(a){var s,r=this.$ti
r.h("1/?").a(a)
s=this.a
if((s.a&30)!==0)throw A.f(A.dl("Future already completed"))
s.av(r.h("1/").a(a))}}
A.aq.prototype={
bC(a){if((this.c&15)!==6)return!0
return this.b.b.ap(t.bG.a(this.d),a.a,t.y,t.K)},
bz(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.Q.b(q))p=l.bE(q,m,a.b,o,n,t.l)
else p=l.ap(t.v.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.c.b(A.bU(s))){if((r.c&1)!==0)throw A.f(A.aX("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.f(A.aX("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.F.prototype={
aZ(a,b,c){var s,r,q=this.$ti
q.p(c).h("1/(2)").a(a)
s=$.y
if(s===B.e){if(!t.Q.b(b)&&!t.v.b(b))throw A.f(A.eM(b,"onError",u.c))}else{c.h("@<0/>").p(q.c).h("1(2)").a(a)
b=A.iW(b,s)}r=new A.F(s,c.h("F<0>"))
this.a2(new A.aq(r,3,a,b,q.h("@<1>").p(c).h("aq<1,2>")))
return r},
aP(a,b,c){var s,r=this.$ti
r.p(c).h("1/(2)").a(a)
s=new A.F($.y,c.h("F<0>"))
this.a2(new A.aq(s,19,a,b,r.h("@<1>").p(c).h("aq<1,2>")))
return s},
bj(a){this.a=this.a&1|16
this.c=a},
S(a){this.a=a.a&30|this.a&1
this.c=a.c},
a2(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t._.a(r.c)
if((s.a&24)===0){s.a2(a)
return}r.S(s)}A.cE(null,null,r.b,t.M.a(new A.dC(r,a)))}},
aM(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t._.a(m.c)
if((n.a&24)===0){n.aM(a)
return}m.S(n)}l.a=m.W(a)
A.cE(null,null,m.b,t.M.a(new A.dG(l,m)))}},
V(){var s=t.F.a(this.c)
this.c=null
return this.W(s)},
W(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
aE(a){var s,r=this
r.$ti.c.a(a)
s=r.V()
r.a=8
r.c=a
A.aL(r,s)},
b9(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.V()
q.S(a)
A.aL(q,r)},
a6(a){var s=this.V()
this.bj(a)
A.aL(this,s)},
av(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("ak<1>").b(a)){this.az(a)
return}this.b8(a)},
b8(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.cE(null,null,s.b,t.M.a(new A.dE(s,a)))},
az(a){A.em(this.$ti.h("ak<1>").a(a),this,!1)
return},
a4(a){this.a^=2
A.cE(null,null,this.b,t.M.a(new A.dD(this,a)))},
$iak:1}
A.dC.prototype={
$0(){A.aL(this.a,this.b)},
$S:0}
A.dG.prototype={
$0(){A.aL(this.b,this.a.a)},
$S:0}
A.dF.prototype={
$0(){A.em(this.a.a,this.b,!0)},
$S:0}
A.dE.prototype={
$0(){this.a.aE(this.b)},
$S:0}
A.dD.prototype={
$0(){this.a.a6(this.b)},
$S:0}
A.dJ.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.bD(t.bd.a(q.d),t.z)}catch(p){s=A.bU(p)
r=A.aU(p)
if(k.c&&t.t.a(k.b.a.c).a===s){q=k.a
q.c=t.t.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.ed(q)
n=k.a
n.c=new A.P(q,o)
q=n}q.b=!0
return}if(j instanceof A.F&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.t.a(j.c)
q.b=!0}return}if(j instanceof A.F){m=k.b.a
l=new A.F(m.b,m.$ti)
j.aZ(new A.dK(l,m),new A.dL(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:0}
A.dK.prototype={
$1(a){this.a.b9(this.b)},
$S:6}
A.dL.prototype={
$2(a,b){A.aO(a)
t.l.a(b)
this.a.a6(new A.P(a,b))},
$S:13}
A.dI.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.ap(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.bU(l)
r=A.aU(l)
q=s
p=r
if(p==null)p=A.ed(q)
o=this.a
o.c=new A.P(q,p)
o.b=!0}},
$S:0}
A.dH.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.t.a(l.a.a.c)
p=l.b
if(p.a.bC(s)&&p.a.e!=null){p.c=p.a.bz(s)
p.b=!1}}catch(o){r=A.bU(o)
q=A.aU(o)
p=t.t.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.ed(p)
m=l.b
m.c=new A.P(p,n)
p=m}p.b=!0}},
$S:0}
A.cs.prototype={}
A.cy.prototype={}
A.bO.prototype={$ifb:1}
A.cx.prototype={
bF(a){var s,r,q
t.M.a(a)
try{if(B.e===$.y){a.$0()
return}A.fA(null,null,this,a,t.H)}catch(q){s=A.bU(q)
r=A.aU(q)
A.ey(A.aO(s),t.l.a(r))}},
bo(a){return new A.dO(this,t.M.a(a))},
bD(a,b){b.h("0()").a(a)
if($.y===B.e)return a.$0()
return A.fA(null,null,this,a,b)},
ap(a,b,c,d){c.h("@<0>").p(d).h("1(2)").a(a)
d.a(b)
if($.y===B.e)return a.$1(b)
return A.iY(null,null,this,a,b,c,d)},
bE(a,b,c,d,e,f){d.h("@<0>").p(e).p(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.y===B.e)return a.$2(b,c)
return A.iX(null,null,this,a,b,c,d,e,f)},
aW(a,b,c,d){return b.h("@<0>").p(c).p(d).h("1(2,3)").a(a)}}
A.dO.prototype={
$0(){return this.a.bF(this.b)},
$S:0}
A.dV.prototype={
$0(){A.hp(this.a,this.b)},
$S:0}
A.bv.prototype={
gm(a){return this.a},
gI(){return new A.bw(this,this.$ti.h("bw<1>"))},
ak(a){var s,r
if(typeof a=="string"&&a!=="__proto__"){s=this.b
return s==null?!1:s[a]!=null}else if(typeof a=="number"&&(a&1073741823)===a){r=this.c
return r==null?!1:r[a]!=null}else return this.bc(a)},
bc(a){var s=this.d
if(s==null)return!1
return this.J(this.aD(s,a),a)>=0},
j(a,b){var s,r,q
if(typeof b=="string"&&b!=="__proto__"){s=this.b
r=s==null?null:A.fd(s,b)
return r}else if(typeof b=="number"&&(b&1073741823)===b){q=this.c
r=q==null?null:A.fd(q,b)
return r}else return this.bg(b)},
bg(a){var s,r,q=this.d
if(q==null)return null
s=this.aD(q,a)
r=this.J(s,a)
return r<0?null:s[r+1]},
B(a,b,c){var s,r,q,p,o,n,m=this,l=m.$ti
l.c.a(b)
l.y[1].a(c)
if(typeof b=="string"&&b!=="__proto__"){s=m.b
m.aC(s==null?m.b=A.en():s,b,c)}else if(typeof b=="number"&&(b&1073741823)===b){r=m.c
m.aC(r==null?m.c=A.en():r,b,c)}else{q=m.d
if(q==null)q=m.d=A.en()
p=A.cF(b)&1073741823
o=q[p]
if(o==null){A.eo(q,p,[b,c]);++m.a
m.e=null}else{n=m.J(o,b)
if(n>=0)o[n+1]=c
else{o.push(b,c);++m.a
m.e=null}}}},
G(a,b){var s,r,q,p,o,n,m=this,l=m.$ti
l.h("~(1,2)").a(b)
s=m.aG()
for(r=s.length,q=l.c,l=l.y[1],p=0;p<r;++p){o=s[p]
q.a(o)
n=m.j(0,o)
b.$2(o,n==null?l.a(n):n)
if(s!==m.e)throw A.f(A.a_(m))}},
aG(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.e
if(h!=null)return h
h=A.eZ(i.a,null,!1,t.z)
s=i.b
r=0
if(s!=null){q=Object.getOwnPropertyNames(s)
p=q.length
for(o=0;o<p;++o){h[r]=q[o];++r}}n=i.c
if(n!=null){q=Object.getOwnPropertyNames(n)
p=q.length
for(o=0;o<p;++o){h[r]=+q[o];++r}}m=i.d
if(m!=null){q=Object.getOwnPropertyNames(m)
p=q.length
for(o=0;o<p;++o){l=m[q[o]]
k=l.length
for(j=0;j<k;j+=2){h[r]=l[j];++r}}}return i.e=h},
aC(a,b,c){var s=this.$ti
s.c.a(b)
s.y[1].a(c)
if(a[b]==null){++this.a
this.e=null}A.eo(a,b,c)},
aD(a,b){return a[A.cF(b)&1073741823]}}
A.by.prototype={
J(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;r+=2){q=a[r]
if(q==null?b==null:q===b)return r}return-1}}
A.bw.prototype={
gm(a){return this.a.a},
gt(a){var s=this.a
return new A.bx(s,s.aG(),this.$ti.h("bx<1>"))}}
A.bx.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.b,q=s.c,p=s.a
if(r!==p.e)throw A.f(A.a_(p))
else if(q>=r.length){s.d=null
return!1}else{s.d=r[q]
s.c=q+1
return!0}},
$iz:1}
A.ar.prototype={
gt(a){var s=this,r=new A.as(s,s.r,A.x(s).h("as<1>"))
r.c=s.e
return r},
gm(a){return this.a},
aj(a,b){var s
if((b&1073741823)===b){s=this.c
if(s==null)return!1
return t.L.a(s[b])!=null}else return this.bb(b)},
bb(a){var s=this.d
if(s==null)return!1
return this.J(s[this.aF(a)],a)>=0},
q(a,b){var s,r,q=this
A.x(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.aB(s==null?q.b=A.ep():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.aB(r==null?q.c=A.ep():r,b)}else return q.b6(b)},
b6(a){var s,r,q,p=this
A.x(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.ep()
r=p.aF(a)
q=s[r]
if(q==null)s[r]=[p.a5(a)]
else{if(p.J(q,a)>=0)return!1
q.push(p.a5(a))}return!0},
aB(a,b){A.x(this).c.a(b)
if(t.L.a(a[b])!=null)return!1
a[b]=this.a5(b)
return!0},
a5(a){var s=this,r=new A.cw(A.x(s).c.a(a))
if(s.e==null)s.e=s.f=r
else s.f=s.f.b=r;++s.a
s.r=s.r+1&1073741823
return r},
aF(a){return J.m(a)&1073741823},
J(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.Z(a[r].a,b))return r
return-1},
$ieY:1}
A.cw.prototype={}
A.as.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.f(A.a_(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iz:1}
A.u.prototype={
gt(a){return new A.bc(a,a.length,A.bT(a).h("bc<u.E>"))},
bv(a,b){if(!(b<a.length))return A.p(a,b)
return a[b]},
i(a){return A.ee(a,"[","]")}}
A.A.prototype={
K(a,b,c){var s=A.x(this)
return A.f_(this,s.h("A.K"),s.h("A.V"),b,c)},
G(a,b){var s,r,q,p=A.x(this)
p.h("~(A.K,A.V)").a(b)
for(s=this.gI(),s=s.gt(s),p=p.h("A.V");s.k();){r=s.gl()
q=this.j(0,r)
b.$2(r,q==null?p.a(q):q)}},
gm(a){var s=this.gI()
return s.gm(s)},
i(a){return A.ek(this)},
$iS:1}
A.cO.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.d(a)
r.a=(r.a+=s)+": "
s=A.d(b)
r.a+=s},
$S:14}
A.aJ.prototype={
af(a,b){var s,r,q
A.x(this).h("b<1>").a(b)
for(s=A.fe(b,b.r,A.x(b).c),r=s.$ti.c;s.k();){q=s.d
this.q(0,q==null?r.a(q):q)}},
i(a){return A.ee(this,"{","}")},
bw(a,b){var s,r,q=A.x(this)
q.h("Y(1)").a(b)
for(q=A.fe(this,this.r,q.c),s=q.$ti.c;q.k();){r=q.d
if(!b.$1(r==null?s.a(r):r))return!1}return!0},
$ih:1,
$ib:1,
$icU:1}
A.bH.prototype={}
A.ai.prototype={
C(a,b){var s
if(b==null)return!1
s=!1
if(b instanceof A.ai)if(this.a===b.a)s=this.b===b.b
return s},
gu(a){return A.cR(this.a,this.b,B.d,B.d,B.d,B.d,B.d)},
F(a,b){var s
t.k.a(b)
s=B.c.F(this.a,b.a)
if(s!==0)return s
return B.c.F(this.b,b.b)},
i(a){var s=this,r=A.hn(A.hN(s)),q=A.c1(A.hL(s)),p=A.c1(A.hH(s)),o=A.c1(A.hI(s)),n=A.c1(A.hK(s)),m=A.c1(A.hM(s)),l=A.eS(A.hJ(s)),k=s.b,j=k===0?"":A.eS(k)
return r+"-"+q+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"},
$iR:1}
A.dA.prototype={
i(a){return this.bd()}}
A.w.prototype={
gR(){return A.hG(this)}}
A.bV.prototype={
i(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.cI(s)
return"Assertion failed"}}
A.a1.prototype={}
A.W.prototype={
ga9(){return"Invalid argument"+(!this.a?"(s)":"")},
ga8(){return""},
i(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+p,n=s.ga9()+q+o
if(!s.a)return n
return n+s.ga8()+": "+A.cI(s.gan())},
gan(){return this.b}}
A.bk.prototype={
gan(){return A.fr(this.b)},
ga9(){return"RangeError"},
ga8(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.d(q):""
else if(q==null)s=": Not greater than or equal to "+A.d(r)
else if(q>r)s=": Not in inclusive range "+A.d(r)+".."+A.d(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.d(r)
return s}}
A.c2.prototype={
gan(){return A.ac(this.b)},
ga9(){return"RangeError"},
ga8(){if(A.ac(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gm(a){return this.f}}
A.bq.prototype={
i(a){return"Unsupported operation: "+this.a}}
A.cn.prototype={
i(a){return"UnimplementedError: "+this.a}}
A.bn.prototype={
i(a){return"Bad state: "+this.a}}
A.c0.prototype={
i(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.cI(s)+"."}}
A.bm.prototype={
i(a){return"Stack Overflow"},
gR(){return null},
$iw:1}
A.dB.prototype={
i(a){return"Exception: "+this.a}}
A.cJ.prototype={
i(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException",q=this.b
if(q.length>78)q=B.f.ar(q,0,75)+"..."
return r+"\n"+q}}
A.b.prototype={
L(a,b){var s,r,q=this.gt(this)
if(!q.k())return""
s=J.ae(q.gl())
if(!q.k())return s
if(b.length===0){r=s
do r+=J.ae(q.gl())
while(q.k())}else{r=s
do r=r+b+J.ae(q.gl())
while(q.k())}return r.charCodeAt(0)==0?r:r},
gm(a){var s,r=this.gt(this)
for(s=0;r.k();)++s
return s},
i(a){return A.hw(this,"(",")")}}
A.T.prototype={
i(a){return"MapEntry("+A.d(this.a)+": "+A.d(this.b)+")"}}
A.D.prototype={
gu(a){return A.j.prototype.gu.call(this,0)},
i(a){return"null"}}
A.j.prototype={$ij:1,
C(a,b){return this===b},
gu(a){return A.bj(this)},
i(a){return"Instance of '"+A.ci(this)+"'"},
gv(a){return A.jh(this)},
toString(){return this.i(this)}}
A.cB.prototype={
i(a){return""},
$iaa:1}
A.bo.prototype={
gm(a){return this.a.length},
i(a){var s=this.a
return s.charCodeAt(0)==0?s:s}}
A.cP.prototype={
i(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.e7.prototype={
$1(a){return this.a.ah(this.b.h("0/?").a(a))},
$S:4}
A.e8.prototype={
$1(a){if(a==null)return this.a.aS(new A.cP(a===undefined))
return this.a.aS(a)},
$S:4}
A.dY.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(A.fz(a))return a
s=this.a
a.toString
if(s.ak(a))return s.j(0,a)
if(a instanceof Date){r=a.getTime()
if(r<-864e13||r>864e13)A.eJ(A.aI(r,-864e13,864e13,"millisecondsSinceEpoch",null))
A.dX(!0,"isUtc",t.y)
return new A.ai(r,0,!0)}if(a instanceof RegExp)throw A.f(A.aX("structured clone of RegExp",null))
if(a instanceof Promise)return A.eH(a,t.X)
q=Object.getPrototypeOf(a)
if(q===Object.prototype||q===null){p=t.X
o=A.eh(p,p)
s.B(0,a,o)
n=Object.keys(a)
m=[]
for(s=n.length,l=0;l<n.length;n.length===s||(0,A.a5)(n),++l)m.push(A.fI(n[l]))
for(k=0;k<n.length;++k){j=n[k]
if(!(k<m.length))return A.p(m,k)
i=m[k]
if(j!=null)o.B(0,i,this.$1(a[j]))}return o}if(a instanceof Array){h=a
o=[]
s.B(0,a,o)
g=A.ac(a.length)
for(k=0;k<g;++k){if(!(k<h.length))return A.p(h,k)
o.push(this.$1(h[k]))}return o}return a},
$S:15}
A.L.prototype={
bd(){return"Status."+this.b}}
A.dm.prototype={
$1(a){return t.D.a(a).b===this.a},
$S:16}
A.dn.prototype={
$0(){return B.h},
$S:17}
A.bX.prototype={}
A.cG.prototype={
$1(a){return typeof a=="string"&&B.f.b_(a).length!==0?a:null},
$S:18}
A.bY.prototype={
gZ(){var s=this.b,r=this.a
return s==null?r:r+" ("+s+")"},
gP(){var s=this.gZ(),r=A.a0("[^a-z0-9]+",!0)
s=A.l(s.toLowerCase(),r,"-")
r=A.a0("^-+|-+$",!0)
return A.l(s,r,"")}}
A.e0.prototype={
$1(a){var s=t.d.a(a).b
if(0>=s.length)return A.p(s,0)
s=s[0]
s.toString
return A.fK(A.l(s,"\u2212","-"))},
$S:19}
A.af.prototype={}
A.E.prototype={
H(a,b,c,d,e,f,g){var s=this,r=d==null?s.a:d,q=B.c.A(B.c.n(a==null?s.b:a),-15,15),p=B.b.A(c==null?s.c:c,500,15e3),o=B.c.A(B.c.n(b==null?s.d:b),-15,15),n=B.b.A(g==null?s.e:g,35,1000),m=B.c.A(B.c.n(f==null?s.f:f),-15,15)
return new A.E(r,q,p,o,n,m,B.c.A(B.c.n(e==null?s.r:e),-15,15))},
aT(a){var s=null
return this.H(s,s,s,a,s,s,s)},
bs(a){var s=null
return this.H(s,s,s,s,a,s,s)},
bt(a){var s=null
return this.H(s,s,s,s,s,a,s)},
bu(a){var s=null
return this.H(s,s,s,s,s,s,a)},
bq(a){var s=null
return this.H(s,a,s,s,s,s,s)},
br(a){var s=null
return this.H(s,s,a,s,s,s,s)},
bp(a){var s=null
return this.H(a,s,s,s,s,s,s)},
E(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=this,a4=A.v([],t.q)
if(a3.a){s=Math.cos(0.005235987755982988)
r=Math.sin(0.005235987755982988)/1.4142
q=1+s
p=q/2
a4.push(new A.af(p,-q,p,1+r,-2*s,1-r))}q=a3.r
if(q!==0){o=A.fD(80,q)
n=o.a
s=o.b
m=o.c
q=n+1
p=n-1
l=p*s
k=q-l
j=q*s
l=q+l
a4.push(new A.af(n*(k+m),2*n*(p-j),n*(k-m),l+m,-2*(p+j),l-m))}q=a3.f
if(q!==0)a4.push(A.fQ(a3.e,q))
q=a3.d
if(q!==0)a4.push(A.fQ(a3.c,q))
q=a3.b
if(q!==0){o=A.fD(12e3,q)
n=o.a
s=o.b
m=o.c
q=n+1
p=n-1
l=p*s
k=q+l
j=q*s
l=q-l
a4.push(new A.af(n*(k+m),-2*n*(p+j),n*(k-m),l+m,2*(p-j),l-m))}q=a4.length
i=6.283185307179586*a5/96e3
p=2*i
h=0
g=0
for(;g<a4.length;a4.length===q||(0,A.a5)(a4),++g){f=a4[g]
e=Math.cos(i)
d=Math.cos(p)
c=Math.sin(i)
b=Math.sin(p)
l=f.b
k=f.c
a=f.a+l*e+k*d
a0=l*c+k*b
k=f.e
l=f.f
a1=f.d+k*e+l*d
a2=k*c+l*b
h+=10*Math.log((a*a+a0*a0)/(a1*a1+a2*a2))/2.302585092994046}return h},
C(a,b){var s=this
if(b==null)return!1
return b instanceof A.E&&b.a===s.a&&b.b===s.b&&b.c===s.c&&b.d===s.d&&b.e===s.e&&b.f===s.f&&b.r===s.r},
gu(a){var s=this
return A.cR(s.a,s.b,s.c,s.d,s.e,s.f,s.r)}}
A.dp.prototype={
aU(a,b){var s,r,q,p,o
for(s=this.a,r=0,q=1/0,p=0;p<s.length;++p){o=Math.abs(Math.log(s[p]/b))
if(o<q){q=o
r=p}}return r}}
A.dq.prototype={
$1(a){return Math.abs(Math.log(this.a/A.et(a))/0.6931471805599453)>0.020833333333333332},
$S:20}
A.cM.prototype={
b4(){this.c.addEventListener("click",A.aP(new A.cN(this)))},
M(){var s=0,r=A.iT(t.H),q=1,p=[],o=this,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$M=A.j6(function(a2,a3){if(a2===1){p.push(a3)
s=q}for(;;)switch(s){case 0:q=3
i=v.G
s=6
return A.fs(A.eH(A.e(i.fetch("api/channels.json")),t.m),$async$M)
case 6:n=a3
if(!A.es(n.ok)){l=A.dl("status")
throw A.f(l)}h=t.X
g=t.f
a0=g
a1=A
s=7
return A.fs(A.eH(A.e(n.json()),h),$async$M)
case 7:m=a0.a(a1.fI(a3))
l=A.v([],t.J)
for(f=t.j.a(J.eL(m,"channels")),e=f.length,d=t.N,c=0;c<f.length;f.length===e||(0,A.a5)(f),++c){k=f[c]
J.h8(l,A.hh(g.a(k).K(0,d,h)))}j=l
if(J.ec(j)===0){l=A.dl("empty")
throw A.f(l)}o.a.hidden=!0
l=A.o(A.e(i.document).getElementById("sim-body"))
l.toString
l.hidden=!1
l=J.eL(m,"generated")
A.hS(j,A.d(l==null?"":l)).aq()
q=1
s=5
break
case 3:q=2
a=p.pop()
o.b.textContent="The channel data didn\u2019t load. Check your connection, then try again."
o.c.hidden=!1
s=5
break
case 2:s=1
break
case 5:return A.ir(null,r)
case 1:return A.iq(p.at(-1),r)}})
return A.is($async$M,r)}}
A.cN.prototype={
$0(){var s=this.a
s.c.hidden=!0
s.b.textContent="Loading the channels\u2026"
s.M()},
$S:2}
A.cV.prototype={
aq(){var s,r,q,p,o,n=this,m={}
n.bf()
s=v.G
r=A.o(A.e(s.document).getElementById("lm-freq-ticks"))
r.toString
q=n.c
p=t.i
n.aQ(r,q,B.B,A.ei([35,250,1000],p))
r=A.o(A.e(s.document).getElementById("hm-freq-ticks"))
r.toString
o=n.d
n.aQ(r,o,B.I,A.ei([500,1000,4000,15e3],p))
p=n.dx
p.setAttribute("max",""+(q.a.length-1))
q=n.cy
q.setAttribute("max",""+(o.a.length-1))
n.w.addEventListener("change",A.aP(new A.d9(n)))
n.ay.addEventListener("click",A.aP(new A.da(n)))
o=new A.dj(n)
o.$2(n.CW,new A.db())
o.$2(q,new A.dc(n))
o.$2(n.db,new A.dd())
o.$2(p,new A.de(n))
o.$2(n.dy,new A.df())
o.$2(n.cx,new A.dg())
n.ax.addEventListener("click",A.aP(new A.dh(n)))
m.a=!1
A.e(s.window).addEventListener("resize",A.aP(new A.di(m,n)))
s=n.aw(B.f.aX(A.I(A.e(A.e(s.window).location).hash),"#",""))
n.aA(s==null?B.a.gO(n.a):s,!1)},
aw(a){var s,r,q,p,o,n
for(s=this.a,r=s.length,q=0;q<s.length;s.length===r||(0,A.a5)(s),++q){p=s[q]
o=p.b
n=p.a
o=o==null?n:n+" ("+o+")"
n=A.a0("[^a-z0-9]+",!0)
o=A.l(o.toLowerCase(),n,"-")
n=A.a0("^-+|-+$",!0)
if(A.l(o,n,"")===a)return p}return null},
bf(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f="&amp;",e="&lt;",d="&gt;",c="&quot;"
for(s=this.a,r=s.length,q=null,p=0,o="";p<s.length;s.length===r||(0,A.a5)(s),++p){n=s[p]
m=n.c
if(m!==q){if(q!=null)o+="</optgroup>"
l=A.l(m,"&",f)
l=A.l(l,"<",e)
l=A.l(l,">",d)
o+='<optgroup label="'+A.l(l,'"',c)+'">'
q=m}l=n.d
k=l===B.j?"":" \u2014 "+l.c
l=n.b
j=l==null
i=n.a
h=j?i:i+" ("+l+")"
g=A.a0("[^a-z0-9]+",!0)
h=A.l(h.toLowerCase(),g,"-")
g=A.a0("^-+|-+$",!0)
h=A.l(h,g,"")
h=A.l(h,"&",f)
h=A.l(h,"<",e)
h=A.l(h,">",d)
h=A.l(h,'"',c)
l=j?i:i+" ("+l+")"
l=A.l(l,"&",f)
l=A.l(l,"<",e)
l=A.l(l,">",d)
l=A.l(l,'"',c)
j=A.l(k,"&",f)
j=A.l(j,"<",e)
j=A.l(j,">",d)
o+='<option value="'+h+'">'+l+A.l(j,'"',c)+"</option>"}s=q!=null?o+"</optgroup>":o
this.w.innerHTML=s.charCodeAt(0)==0?s:s},
aQ(a,b,c,d){var s,r,q,p,o,n,m
t.w.a(c)
t.a.a(d)
s=A.v([],t.s)
for(r=b.a,q=0;q<7;++q){p=c[q]
o=d.aj(0,p)?"":"minor"
n=B.b.a0(Math.log(p/B.a.gO(r))/Math.log(B.a.gbB(r)/B.a.gO(r)),4)
m=p<1000?""+B.c.n(p):""+B.b.n(p/1000)+"k"
m=A.l(m,"&","&amp;")
m=A.l(m,"<","&lt;")
m=A.l(m,">","&gt;")
s.push('<span class="'+o+'" style="--p:'+n+'">'+A.l(m,'"',"&quot;")+"</span>")}a.innerHTML=B.a.aV(s)},
aA(a,b){var s,r,q=this
q.f=a
q.w.value=a.gP()
s=q.e.j(0,a.gP())
r=v.G
A.e(A.e(r.window).history).replaceState(null,"",A.I(A.e(A.e(r.window).location).pathname)+A.I(A.e(A.e(r.window).location).search)+"#"+a.gP())
q.bn()
q.Q.textContent="Starting point \xb7 "+a.d.c
r=s==null
q.aN(r?a.f:s,!0)
if(!b)r=q.a7()
else r=!r&&!s.C(0,a.f)?a.gZ()+": your earlier changes are back. "+q.a7():a.gZ()+": at the starting point."
q.at.textContent=r},
aN(a,b){var s,r,q,p,o,n,m,l,k,j,i=this
i.r=a
s=i.f
s===$&&A.J()
i.e.B(0,s.gP(),a)
s=i.r
r=i.f.f
q=s.a
i.ay.setAttribute("aria-checked",""+q)
p=q?"IN":"OUT"
i.ch.textContent=p
p=r.a
o=p?"IN":"OUT"
if(q===p)q=null
else{p="switched "+(q?"in":"out")
q=p}i.X("hpf-was","Start "+o,q)
q=s.b
i.T(i.CW,"hf-gain-out",q)
o=s.r
i.T(i.cx,"lf-gain-out",o)
p=s.d
i.T(i.db,"hm-gain-out",p)
n=s.f
i.T(i.dy,"lm-gain-out",n)
m=s.c
i.aJ(i.cy,"hm-freq-out",i.d,m)
s=s.e
i.aJ(i.dx,"lm-freq-out",i.c,s)
l=r.b
k=A.a4(l)
q=l===q?null:A.a4(q-l)+" dB"
i.X("hf-was","Start "+(k+" dB"),q)
q=r.r
k=A.a4(q)
q=q===o?null:A.a4(o-q)+" dB"
i.X("lf-was","Start "+(k+" dB"),q)
i.aO("hm-was",r.c,r.d,m,p)
i.aO("lm-was",r.e,r.f,s,n)
i.aH()
if(!b){j=i.a7()
s=i.at
if(A.I(s.textContent)!==j)s.textContent=j}},
ae(a){return this.aN(a,!1)},
bn(){var s,r,q,p,o,n,m,l,k,j,i,h,g="a practitioner",f=this.f
f===$&&A.J()
s=f.e
r=new A.br(A.v([s.b,s.c],t.r),t.ab).L(0,", ")
q=this.b
p=q.length>=10?" Status as of "+B.f.ar(q,0,10)+".":""
q=f.d
switch(q.a){case 0:o=A.O(r.length===0?g:r)
n=s.e
m="Signed by "+o+", checked "+A.O(n==null?"":n)+". A starting point to work from; the room still decides."
break
case 2:o=A.O(r.length===0?g:r)
n=s.e
m="Signed by "+o+" on "+A.O(n==null?"an earlier date":n)+", but its shelf life has run out. Re-check it in a room before you work from it."
break
case 1:if(s.a==="model"){o=s.f
o="A model"+(o==null?"":" ("+A.O(o)+")")+" proposed these values."}else o="These values are proposed."
m=o+" No practitioner has checked them at a console. Treat the starting point as a guess to test at soundcheck."
break
case 3:o=s.w
l=o==null?"A practitioner":A.O(o)
o=s.y
k=o==null?"":" on "+A.O(o)
o=s.x
j=o==null?"":": "+A.O(o)
m=l+" turned these values down"+k+j+" They are loaded so you can see what was tried. Don\u2019t work from them."
break
default:m=null}if(q===B.h&&s.r!=null){o=s.r
o.toString
i='<details class="sim-why"><summary>Why it was proposed</summary><p>'+A.O(o)+"</p></details>"}else i=""
f=f.r
if(f.a===0)h=""
else{o=A.x(f).h("b9<1,2>")
h='<p class="sim-range">This record gives a range for '+A.f0(new A.b9(f,o),o.h("i(b.E)").a(new A.d7()),o.h("b.E"),t.N).L(0," and ")+". The starting point uses the low end, as the channel list draws it.</p>"}f=this.x
f.setAttribute("style","--edge:"+A.d(B.L.j(0,q)))
f.setAttribute("data-status",q.b)
f.innerHTML='<span class="mark">'+A.d(B.K.j(0,q))+q.c+"</span><p>"+A.d(m)+A.O(p)+"</p>"+i+h},
a7(){var s,r,q,p,o=this.r
o===$&&A.J()
s=this.f
s===$&&A.J()
r=s.f
s=A.v([],t.s)
if(o.a!==r.a)s.push("HPF")
if(o.b!==r.b)s.push("HF")
q=o.d
if(q===r.d)q=q!==0&&o.c!==r.c
else q=!0
if(q)s.push("HM")
q=o.f
if(q===r.f)q=q!==0&&o.e!==r.e
else q=!0
if(q)s.push("LM")
if(o.r!==r.r)s.push("LF")
p=s.length
if(p===0)return"At the starting point."
return""+p+" of 5 bands changed from the starting point."},
T(a,b,c){var s,r=""+c
if(A.I(a.value)!==r)a.value=r
a.setAttribute("aria-valuetext",A.a4(c)+" dB")
s=(c+15)/30*100
a.setAttribute("style","--a:"+A.d(Math.min(50,s))+"%;--b:"+A.d(Math.max(50,s))+"%")
r=A.o(A.e(v.G.document).getElementById(b))
r.toString
r.innerHTML=A.a4(c)+'<span class="u">\u2009dB</span>'},
aJ(a,b,c,d){var s,r,q,p,o=""+c.aU(0,d)
if(A.I(a.value)!==o)a.value=o
a.setAttribute("aria-valuetext",A.bS(d))
a.setAttribute("style","--a:0%;--b:"+B.b.a0(c.aU(0,d)/(c.a.length-1)*100,2)+"%")
s=A.bS(d).split(" ")
r=s.length
if(0>=r)return A.p(s,0)
q=s[0]
if(1>=r)return A.p(s,1)
p=s[1]
r=A.o(A.e(v.G.document).getElementById(b))
r.toString
r.innerHTML=q+'<span class="u">\u2009'+p+"</span>"},
aO(a,b,c,d,e){var s=c===0,r=s?"Start flat, 0 dB":"Start "+A.bS(b)+", "+(A.a4(c)+" dB"),q=A.v([],t.s)
if(e!==c)q.push(A.a4(e-c)+" dB")
if(!s&&e!==0&&d!==b)q.push(A.js(b,d))
this.X(a,r,q.length===0?null:B.a.L(q,", "))},
X(a,b,c){var s=c==null?'<span class="same">same as start</span>':'<span class="delta"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M5 1 9 5 5 9 1 5z"/></svg>Changed: '+A.O(c)+"</span>",r=A.o(A.e(v.G.document).getElementById(a))
r.toString
r.innerHTML='<span class="start">'+A.O(b)+"</span> "+s},
aH(){var s,r,q,p,o,n,m,l,k,j,i,h=this,g='<text class="ax" x="',f=Math.max(220,A.ac(h.y.clientWidth)),e=B.b.A(f*0.48,200,320),d=f-40-10,c=e-10-28,b=new A.cZ(d),a=new A.d_(c),a0=new A.cX(),a1=new A.cY(a0,b,a),a2=new A.bo("")
a2.a='<defs><clipPath id="sim-clip"><rect x="40" y="10" width="'+A.d(a0.$1(d))+'" height="'+A.d(a0.$1(c))+'"/></clipPath></defs>'
for(s=10+c,r=0;r<26;++r){q=B.H[r]
p=q===100||q===1000||q===1e4?"g-major":"g-minor"
p='<line class="'+p+'" x1="'+A.d(a0.$1(b.$1(q)))+'" x2="'+A.d(a0.$1(b.$1(q)))+'" y1="10" y2="'+A.d(a0.$1(s))+'"/>'
a2.a+=p}o=d<420?B.C:B.J
for(s=o.length,p=e-8,r=0;r<s;++r){q=o[r]
n=q<1000?""+B.c.n(q):""+B.b.n(q/1000)+"k"
m=g+A.d(a0.$1(b.$1(q)))+'" y="'+A.d(a0.$1(p))+'" text-anchor="middle">'+n+"</text>"
a2.a+=m}s=g+A.d(a0.$1(34))+'" y="'+A.d(a0.$1(p))+'" text-anchor="end">Hz</text>'
a2.a+=s
for(s=!(c>=180),p=40+d,r=0;r<7;++r){l=B.G[r]
m=l===0?"g-zero":"g-minor"
m='<line class="'+m+'" x1="40" x2="'+A.d(a0.$1(p))+'" y1="'+A.d(a0.$1(a.$1(l)))+'" y2="'+A.d(a0.$1(a.$1(l)))+'"/>'
a2.a+=m
if(!s||B.c.b1(l,10)===0){m=A.d(a0.$1(34))
k=a.$1(l)
if(typeof k!=="number")return k.bH()
k=g+m+'" y="'+A.d(a0.$1(k+5))+'" text-anchor="end">'+A.a4(B.c.n(l))+"</text>"
a2.a+=k}}s=h.r
s===$&&A.J()
j=a1.$1(s)
s=h.f
s===$&&A.J()
i=a1.$1(s.f)
a2.a+='<g clip-path="url(#sim-clip)">'
p='<path class="c-area" d="'+j+"L"+A.d(a0.$1(p))+","+A.d(a0.$1(a.$1(0)))+"L40,"+A.d(a0.$1(a.$1(0)))+'Z"/>'
p=(a2.a+=p)+('<path class="c-start" d="'+i+'"/>')
a2.a=p
a2.a=p+('<path class="c-live" d="'+j+'"/>')
p=new A.cW(h,a2,a0,b,a)
if(h.r.a)p.$2("hpf",80)
if(h.r.r!==0)p.$2("lf",50)
s=h.r
if(s.f!==0)p.$2("lm",s.e)
s=h.r
if(s.d!==0)p.$2("hm",s.c)
if(h.r.b!==0)p.$2("hf",12e3)
a2.a+="</g>"
s=h.z
s.setAttribute("viewBox","0 0 "+A.d(a0.$1(f))+" "+A.d(a0.$1(e)))
s.setAttribute("width",a0.$1(f))
s.setAttribute("height",a0.$1(e))
p=a2.a
s.innerHTML=p.charCodeAt(0)==0?p:p
h.bm()},
aa(a){var s,r,q,p,o,n,m,l,k,j,i
t.e.a(a)
s=new A.d0()
for(r=0,q=1;q<=160;++q){p=a.$1(s.$1(q))
o=a.$1(s.$1(r))
if(typeof p!=="number")return p.b0()
if(typeof o!=="number")return A.fO(o)
if(p>o)r=q}n=Math.max(0,r-1)
m=Math.min(160,r+1)
for(l=0;l<40;++l){p=(m-n)/3
k=n+p
j=m-p
p=a.$1(s.$1(k))
o=a.$1(s.$1(j))
if(typeof p!=="number")return p.bJ()
if(typeof o!=="number")return A.fO(o)
if(p<o)n=k
else m=j}i=s.$1((n+m)/2)
return new A.a3(a.$1(i),i)},
bm(){var s,r,q,p,o,n,m,l,k=this,j=k.r
j===$&&A.J()
s=j.aT(!1)
j=k.f
j===$&&A.J()
r=j.f
q=k.aa(new A.d2(s))
p=k.aa(new A.d3(s))
o=k.aa(new A.d4(k,r))
j=new A.d1()
n=new A.d6()
m=n.$2("Biggest EQ boost",q.a<0.05?"None":j.$2(q,s.gaY()))
l=n.$2("Biggest EQ cut",p.a<0.05?"None":j.$2(p,s.gaY()))
k.as.innerHTML=B.a.aV(A.v([m,l,n.$2("Furthest from the start",o.a<0.05?"Same as the start":j.$2(o,new A.d5(k,r)))],t.s))}}
A.d9.prototype={
$0(){var s=this.a,r=s.aw(A.I(s.w.value))
r.toString
return s.aA(r,!0)},
$S:0}
A.da.prototype={
$0(){var s=this.a,r=s.r
r===$&&A.J()
return s.ae(r.aT(!r.a))},
$S:0}
A.dj.prototype={
$2(a,b){a.addEventListener("input",A.aP(new A.dk(this.a,t.x.a(b),a)))},
$S:21}
A.dk.prototype={
$0(){var s,r=this.a,q=r.r
q===$&&A.J()
s=A.hP(A.I(this.c.value),null)
if(s==null)s=0
return r.ae(this.b.$2(q,s))},
$S:0}
A.db.prototype={
$2(a,b){return a.bp(b)},
$S:3}
A.dc.prototype={
$2(a,b){var s=this.a.d.a,r=B.c.A(b,0,s.length-1)
if(!(r>=0&&r<s.length))return A.p(s,r)
return a.br(s[r])},
$S:3}
A.dd.prototype={
$2(a,b){return a.bq(b)},
$S:3}
A.de.prototype={
$2(a,b){var s=this.a.c.a,r=B.c.A(b,0,s.length-1)
if(!(r>=0&&r<s.length))return A.p(s,r)
return a.bu(s[r])},
$S:3}
A.df.prototype={
$2(a,b){return a.bt(b)},
$S:3}
A.dg.prototype={
$2(a,b){return a.bs(b)},
$S:3}
A.dh.prototype={
$0(){var s,r,q=this.a,p=q.r
p===$&&A.J()
s=q.f
s===$&&A.J()
r=p.C(0,s.f)
q.ae(q.f.f)
p=r?"Already at the starting point.":"Back at the starting point for "+q.f.gZ()+"."
q.at.textContent=p},
$S:2}
A.di.prototype={
$0(){var s=this.a
if(s.a)return
s.a=!0
A.ac(v.G.requestAnimationFrame(A.fv(new A.d8(s,this.b))))},
$S:2}
A.d8.prototype={
$1(a){A.et(a)
this.a.a=!1
this.b.aH()},
$S:22}
A.d7.prototype={
$1(a){t.W.a(a)
return a.a+" ("+A.O(a.b)+")"},
$S:23}
A.cZ.prototype={
$1(a){return 40+Math.log(a/20)/Math.log(1000)*this.a},
$S:1}
A.d_.prototype={
$1(a){return 10+(1-(B.b.A(a,-22,22)+18)/36)*this.a},
$S:1}
A.cX.prototype={
$1(a){return B.b.a0(a,1)},
$S:24}
A.cY.prototype={
$1(a){var s,r,q,p,o,n=A.v([],t.s)
for(s=this.a,r=this.b,q=this.c,p=0;p<=180;++p){o=20*Math.pow(1000,p/180)
B.a.q(n,A.d(s.$1(r.$1(o)))+","+A.d(s.$1(q.$1(a.E(o)))))}return"M"+B.a.L(n,"L")},
$S:25}
A.cW.prototype={
$2(a,b){var s=this,r=s.b,q=s.c,p=A.d(q.$1(s.d.$1(b))),o=s.a.r
o===$&&A.J()
o='<circle class="c-dot '+a+'" cx="'+p+'" cy="'+A.d(q.$1(s.e.$1(o.E(b))))+'" r="5"/>'
r.a+=o
return null},
$S:26}
A.d0.prototype={
$1(a){return 25*Math.pow(640,a/160)},
$S:27}
A.d2.prototype={
$1(a){return this.a.E(a)},
$S:1}
A.d3.prototype={
$1(a){return-this.a.E(a)},
$S:1}
A.d4.prototype={
$1(a){var s=this.a.r
s===$&&A.J()
return Math.abs(s.E(a)-this.b.E(a))},
$S:1}
A.d1.prototype={
$2(a,b){var s,r,q
t.e.a(b)
s=a.b
if(s<=25.25)r="at "+A.bS(25)+" and below"
else r=s>=15840?"at "+A.bS(16e3)+" and above":"at "+A.bS(A.fT(s))
q=b.$1(s)
if(typeof q!=="number")return q.bK()
return A.a4(B.b.n(q*10)/10)+" dB "+r},
$S:28}
A.d6.prototype={
$2(a,b){return"<div><dt>"+a+"</dt><dd>"+A.O(b)+"</dd></div>"},
$S:29}
A.d5.prototype={
$1(a){var s=this.a.r
s===$&&A.J()
return s.E(a)-this.b.E(a)},
$S:1}
A.dr.prototype={
aq(){var s,r,q=this,p=q.a
if(p==null)return
s=v.G
r=A.cD(A.e(A.e(s.document).documentElement).getAttribute("data-mode"))
q.a3(r==null?"dark":r)
p.addEventListener("click",A.aP(new A.ds(q)))
A.e(A.e(s.window).matchMedia("(prefers-color-scheme: light)")).addEventListener("change",A.fv(new A.dt(q)))},
a3(a){var s,r
A.e(A.e(v.G.document).documentElement).setAttribute("data-mode",a)
s=a==="dark"?"light":"dark"
r=this.b
if(r!=null)r.textContent="Switch to "+s
r=this.a
if(r!=null)r.setAttribute("aria-label","Switch to "+s+" theme")}}
A.ds.prototype={
$0(){var s,r=v.G,q=A.cD(A.e(A.e(r.document).documentElement).getAttribute("data-mode"))==="dark"?"light":"dark"
try{A.e(A.e(r.window).localStorage).setItem("eq-sop-theme",q)}catch(s){}this.a.a3(q)},
$S:2}
A.dt.prototype={
$1(a){var s,r,q
A.e(a)
s=null
try{s=A.cD(A.e(A.e(v.G.window).localStorage).getItem("eq-sop-theme"))}catch(r){}if(s==null){q=A.es(A.e(A.e(v.G.window).matchMedia("(prefers-color-scheme: light)")).matches)?"light":"dark"
this.a.a3(q)}},
$S:30};(function aliases(){var s=J.a9.prototype
s.b3=s.i})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._static_1,q=hunkHelpers._static_0,p=hunkHelpers._instance_1u
s(J,"iG","eV",31)
r(A,"j7","i_",5)
r(A,"j8","i0",5)
r(A,"j9","i1",5)
q(A,"fG","j1",0)
p(A.E.prototype,"gaY","E",1)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.j,null)
q(A.j,[A.ef,J.c3,A.bl,J.aY,A.b,A.aZ,A.A,A.a6,A.w,A.cT,A.bc,A.bd,A.bs,A.H,A.X,A.aA,A.bA,A.du,A.cQ,A.b1,A.bI,A.cL,A.bb,A.ba,A.aD,A.bB,A.cq,A.cl,A.cA,A.U,A.cv,A.cC,A.dP,A.cr,A.P,A.ct,A.aq,A.F,A.cs,A.cy,A.bO,A.bx,A.aJ,A.cw,A.as,A.u,A.ai,A.dA,A.bm,A.dB,A.cJ,A.T,A.D,A.cB,A.bo,A.cP,A.bX,A.bY,A.af,A.E,A.dp,A.cM,A.cV,A.dr])
q(J.c3,[J.c5,J.b3,J.b5,J.b4,J.b6,J.aC,J.a7])
q(J.b5,[J.a9,J.r,A.aF,A.bg])
q(J.a9,[J.ch,J.ap,J.a8])
r(J.c4,A.bl)
r(J.cK,J.r)
q(J.aC,[J.b2,J.c6])
q(A.b,[A.aK,A.h,A.an,A.br,A.bz,A.cp,A.cz])
r(A.ag,A.aK)
r(A.bu,A.ag)
q(A.A,[A.ah,A.al,A.bv])
q(A.a6,[A.c_,A.bZ,A.cm,A.e2,A.e4,A.dx,A.dw,A.dT,A.dK,A.e7,A.e8,A.dY,A.dm,A.cG,A.e0,A.dq,A.d8,A.d7,A.cZ,A.d_,A.cX,A.cY,A.d0,A.d2,A.d3,A.d4,A.d5,A.dt])
q(A.c_,[A.cH,A.e3,A.dU,A.dW,A.dL,A.cO,A.dj,A.db,A.dc,A.dd,A.de,A.df,A.dg,A.cW,A.d1,A.d6])
q(A.w,[A.b8,A.a1,A.c7,A.co,A.cj,A.cu,A.bV,A.W,A.bq,A.cn,A.bn,A.c0])
r(A.b0,A.an)
q(A.X,[A.aM,A.aN])
r(A.a3,A.aM)
r(A.bG,A.aN)
q(A.aA,[A.b_,A.aB])
r(A.bi,A.a1)
q(A.cm,[A.ck,A.az])
q(A.h,[A.am,A.b9,A.bw])
r(A.b7,A.al)
q(A.bg,[A.c8,A.aG])
q(A.aG,[A.bC,A.bE])
r(A.bD,A.bC)
r(A.be,A.bD)
r(A.bF,A.bE)
r(A.bf,A.bF)
q(A.be,[A.c9,A.ca])
q(A.bf,[A.cb,A.cc,A.cd,A.ce,A.cf,A.bh,A.cg])
r(A.bJ,A.cu)
q(A.bZ,[A.dy,A.dz,A.dQ,A.dC,A.dG,A.dF,A.dE,A.dD,A.dJ,A.dI,A.dH,A.dO,A.dV,A.dn,A.cN,A.d9,A.da,A.dk,A.dh,A.di,A.ds])
r(A.bt,A.ct)
r(A.cx,A.bO)
r(A.by,A.bv)
r(A.bH,A.aJ)
r(A.ar,A.bH)
q(A.W,[A.bk,A.c2])
r(A.L,A.dA)
s(A.bC,A.u)
s(A.bD,A.H)
s(A.bE,A.u)
s(A.bF,A.H)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{a:"int",c:"double",G:"num",i:"String",Y:"bool",D:"Null",n:"List",j:"Object",S:"Map",t:"JSObject"},mangledNames:{},types:["~()","c(c)","D()","E(E,a)","~(@)","~(~())","D(@)","@(@)","@(@,i)","@(i)","D(~())","D(@,aa)","~(a,@)","D(j,aa)","~(j?,j?)","j?(j?)","Y(L)","L()","i?(j?)","c(ao)","Y(c)","~(t,E(E,a))","D(c)","i(T<i,i>)","i(c)","i(E)","~(i,c)","c(G)","i(+(c,c),c(c))","i(i,i)","D(t)","a(@,@)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.a3&&a.b(c.a)&&b.b(c.b),"3;":(a,b,c)=>d=>d instanceof A.bG&&a.b(d.a)&&b.b(d.b)&&c.b(d.c)}}
A.ii(v.typeUniverse,JSON.parse('{"ch":"a9","ap":"a9","a8":"a9","jE":"aF","c5":{"Y":[],"k":[]},"b3":{"k":[]},"b5":{"t":[]},"a9":{"t":[]},"r":{"n":["1"],"h":["1"],"t":[],"b":["1"]},"c4":{"bl":[]},"cK":{"r":["1"],"n":["1"],"h":["1"],"t":[],"b":["1"]},"aY":{"z":["1"]},"aC":{"c":[],"G":[],"R":["G"]},"b2":{"c":[],"a":[],"G":[],"R":["G"],"k":[]},"c6":{"c":[],"G":[],"R":["G"],"k":[]},"a7":{"i":[],"R":["i"],"cS":[],"k":[]},"aK":{"b":["2"]},"aZ":{"z":["2"]},"ag":{"aK":["1","2"],"b":["2"],"b.E":"2"},"bu":{"ag":["1","2"],"aK":["1","2"],"h":["2"],"b":["2"],"b.E":"2"},"ah":{"A":["3","4"],"S":["3","4"],"A.K":"3","A.V":"4"},"b8":{"w":[]},"h":{"b":["1"]},"bc":{"z":["1"]},"an":{"b":["2"],"b.E":"2"},"b0":{"an":["1","2"],"h":["2"],"b":["2"],"b.E":"2"},"bd":{"z":["2"]},"br":{"b":["1"],"b.E":"1"},"bs":{"z":["1"]},"a3":{"aM":[],"X":[]},"bG":{"aN":[],"X":[]},"aA":{"S":["1","2"]},"b_":{"aA":["1","2"],"S":["1","2"]},"bz":{"b":["1"],"b.E":"1"},"bA":{"z":["1"]},"aB":{"aA":["1","2"],"S":["1","2"]},"bi":{"a1":[],"w":[]},"c7":{"w":[]},"co":{"w":[]},"bI":{"aa":[]},"a6":{"aj":[]},"bZ":{"aj":[]},"c_":{"aj":[]},"cm":{"aj":[]},"ck":{"aj":[]},"az":{"aj":[]},"cj":{"w":[]},"al":{"A":["1","2"],"S":["1","2"],"A.K":"1","A.V":"2"},"am":{"h":["1"],"b":["1"],"b.E":"1"},"bb":{"z":["1"]},"b9":{"h":["T<1,2>"],"b":["T<1,2>"],"b.E":"T<1,2>"},"ba":{"z":["T<1,2>"]},"b7":{"al":["1","2"],"A":["1","2"],"S":["1","2"],"A.K":"1","A.V":"2"},"aM":{"X":[]},"aN":{"X":[]},"aD":{"hQ":[],"cS":[]},"bB":{"ao":[],"aE":[]},"cp":{"b":["ao"],"b.E":"ao"},"cq":{"z":["ao"]},"cl":{"aE":[]},"cz":{"b":["aE"],"b.E":"aE"},"cA":{"z":["aE"]},"aF":{"t":[],"k":[]},"bg":{"t":[]},"c8":{"t":[],"k":[]},"aG":{"K":["1"],"t":[]},"be":{"u":["c"],"n":["c"],"K":["c"],"h":["c"],"t":[],"b":["c"],"H":["c"]},"bf":{"u":["a"],"n":["a"],"K":["a"],"h":["a"],"t":[],"b":["a"],"H":["a"]},"c9":{"u":["c"],"n":["c"],"K":["c"],"h":["c"],"t":[],"b":["c"],"H":["c"],"k":[],"u.E":"c"},"ca":{"u":["c"],"n":["c"],"K":["c"],"h":["c"],"t":[],"b":["c"],"H":["c"],"k":[],"u.E":"c"},"cb":{"u":["a"],"n":["a"],"K":["a"],"h":["a"],"t":[],"b":["a"],"H":["a"],"k":[],"u.E":"a"},"cc":{"u":["a"],"n":["a"],"K":["a"],"h":["a"],"t":[],"b":["a"],"H":["a"],"k":[],"u.E":"a"},"cd":{"u":["a"],"n":["a"],"K":["a"],"h":["a"],"t":[],"b":["a"],"H":["a"],"k":[],"u.E":"a"},"ce":{"u":["a"],"n":["a"],"K":["a"],"h":["a"],"t":[],"b":["a"],"H":["a"],"k":[],"u.E":"a"},"cf":{"u":["a"],"n":["a"],"K":["a"],"h":["a"],"t":[],"b":["a"],"H":["a"],"k":[],"u.E":"a"},"bh":{"u":["a"],"n":["a"],"K":["a"],"h":["a"],"t":[],"b":["a"],"H":["a"],"k":[],"u.E":"a"},"cg":{"u":["a"],"n":["a"],"K":["a"],"h":["a"],"t":[],"b":["a"],"H":["a"],"k":[],"u.E":"a"},"cu":{"w":[]},"bJ":{"a1":[],"w":[]},"P":{"w":[]},"bt":{"ct":["1"]},"F":{"ak":["1"]},"bO":{"fb":[]},"cx":{"bO":[],"fb":[]},"bv":{"A":["1","2"],"S":["1","2"]},"by":{"bv":["1","2"],"A":["1","2"],"S":["1","2"],"A.K":"1","A.V":"2"},"bw":{"h":["1"],"b":["1"],"b.E":"1"},"bx":{"z":["1"]},"ar":{"aJ":["1"],"eY":["1"],"cU":["1"],"h":["1"],"b":["1"]},"as":{"z":["1"]},"A":{"S":["1","2"]},"aJ":{"cU":["1"],"h":["1"],"b":["1"]},"bH":{"aJ":["1"],"cU":["1"],"h":["1"],"b":["1"]},"ai":{"R":["ai"]},"c":{"G":[],"R":["G"]},"a":{"G":[],"R":["G"]},"n":{"h":["1"],"b":["1"]},"G":{"R":["G"]},"ao":{"aE":[]},"i":{"R":["i"],"cS":[]},"bV":{"w":[]},"a1":{"w":[]},"W":{"w":[]},"bk":{"w":[]},"c2":{"w":[]},"bq":{"w":[]},"cn":{"w":[]},"bn":{"w":[]},"c0":{"w":[]},"bm":{"w":[]},"cB":{"aa":[]},"hv":{"n":["a"],"h":["a"],"b":["a"]},"hY":{"n":["a"],"h":["a"],"b":["a"]},"hX":{"n":["a"],"h":["a"],"b":["a"]},"ht":{"n":["a"],"h":["a"],"b":["a"]},"hV":{"n":["a"],"h":["a"],"b":["a"]},"hu":{"n":["a"],"h":["a"],"b":["a"]},"hW":{"n":["a"],"h":["a"],"b":["a"]},"hq":{"n":["c"],"h":["c"],"b":["c"]},"hr":{"n":["c"],"h":["c"],"b":["c"]}}'))
A.ih(v.typeUniverse,JSON.parse('{"aG":1,"bH":1}'))
var u={c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.bR
return{t:s("P"),U:s("R<@>"),k:s("ai"),O:s("h<@>"),C:s("w"),Z:s("aj"),A:s("aB<L,i>"),V:s("b<@>"),q:s("r<af>"),J:s("r<bY>"),G:s("r<j>"),s:s("r<i>"),n:s("r<c>"),b:s("r<@>"),r:s("r<i?>"),T:s("b3"),m:s("t"),g:s("a8"),p:s("K<@>"),w:s("n<c>"),j:s("n<@>"),W:s("T<i,i>"),f:s("S<@,@>"),P:s("D"),K:s("j"),Y:s("jF"),h:s("+()"),d:s("ao"),a:s("cU<c>"),l:s("aa"),D:s("L"),N:s("i"),E:s("E"),x:s("E(E,a)"),R:s("k"),c:s("a1"),B:s("ap"),ab:s("br<i>"),_:s("F<@>"),dd:s("by<j?,j?>"),y:s("Y"),bG:s("Y(j)"),i:s("c"),e:s("c(c)"),z:s("@"),bd:s("@()"),v:s("@(j)"),Q:s("@(j,aa)"),S:s("a"),bc:s("ak<D>?"),aQ:s("t?"),X:s("j?"),aD:s("i?"),F:s("aq<@,@>?"),L:s("cw?"),u:s("Y?"),I:s("c?"),a3:s("a?"),ae:s("G?"),o:s("G"),H:s("~"),M:s("~()")}})();(function constants(){var s=hunkHelpers.makeConstList
B.y=J.c3.prototype
B.a=J.r.prototype
B.c=J.b2.prototype
B.b=J.aC.prototype
B.f=J.a7.prototype
B.z=J.a8.prototype
B.A=J.b5.prototype
B.p=J.ch.prototype
B.m=J.ap.prototype
B.q=new A.bX(null,null,null,null,null,null,null,null,null)
B.n=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.r=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof HTMLElement == "function";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
B.x=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var userAgent = navigator.userAgent;
    if (typeof userAgent != "string") return hooks;
    if (userAgent.indexOf("DumpRenderTree") >= 0) return hooks;
    if (userAgent.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
B.t=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.w=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
B.v=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
B.u=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
B.o=function(hooks) { return hooks; }

B.d=new A.cT()
B.e=new A.cx()
B.i=new A.cB()
B.B=s([35,45,70,180,250,400,1000],t.n)
B.C=s([100,1000,1e4],t.n)
B.O=new A.a3("hf","HF")
B.P=new A.a3("hmD","HM")
B.R=new A.a3("lmD","LM")
B.Q=new A.a3("lf","LF")
B.D=s([B.O,B.P,B.R,B.Q],A.bR("r<+(i,i)>"))
B.j=new A.L("Attested",0,"attested")
B.h=new A.L("Proposed",1,"proposed")
B.k=new A.L("Lapsed",2,"expired")
B.l=new A.L("Rejected",3,"rejected")
B.E=s([B.j,B.h,B.k,B.l],A.bR("r<L>"))
B.F=s([35,45,70,180,250,400,1000,500,700,3000,4000,6000,15e3,40,50,63,80,100,125,160,200,315,630,800,1250,1600,2000,2500,3150,5000,6300,8000,1e4,12500],t.n)
B.a3=s([],t.n)
B.G=s([-15,-10,-5,0,5,10,15],t.n)
B.H=s([30,40,50,60,70,80,90,100,200,300,400,500,600,700,800,900,1000,2000,3000,4000,5000,6000,7000,8000,9000,1e4],t.n)
B.I=s([500,700,1000,3000,4000,6000,15e3],t.n)
B.J=s([50,100,200,500,1000,2000,5000,1e4],t.n)
B.K=new A.aB([B.j,'<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.2 3.2L13 5"/></svg>',B.h,'<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3.6" y="3.6" width="8.8" height="8.8" rx="1.4" transform="rotate(45 8 8)"/></svg>',B.k,'<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="8" cy="8" r="5.6"/><path d="M8 4.8V8.4M8 11h.01"/></svg>',B.l,'<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4.4 4.4l7.2 7.2M11.6 4.4l-7.2 7.2"/></svg>'],t.A)
B.L=new A.aB([B.j,"var(--att)",B.h,"var(--prop)",B.k,"var(--exp)",B.l,"var(--rej)"],t.A)
B.N={}
B.M=new A.b_(B.N,[],A.bR("b_<i,j?>"))
B.S=A.V("jA")
B.T=A.V("jB")
B.U=A.V("hq")
B.V=A.V("hr")
B.W=A.V("ht")
B.X=A.V("hu")
B.Y=A.V("hv")
B.Z=A.V("j")
B.a_=A.V("hV")
B.a0=A.V("hW")
B.a1=A.V("hX")
B.a2=A.V("hY")})();(function staticFields(){$.dM=null
$.N=A.v([],t.G)
$.f1=null
$.eP=null
$.eO=null
$.fN=null
$.fE=null
$.fR=null
$.dZ=null
$.e5=null
$.eE=null
$.dN=A.v([],A.bR("r<n<j>?>"))
$.aQ=null
$.bP=null
$.bQ=null
$.ew=!1
$.y=B.e})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"jD","fX",()=>A.e1("_$dart_dartClosure"))
s($,"jC","ea",()=>A.e1("_$dart_dartClosure_dartJSInterop"))
s($,"jT","h7",()=>A.v([new J.c4()],A.bR("r<bl>")))
s($,"jH","fY",()=>A.a2(A.dv({
toString:function(){return"$receiver$"}})))
s($,"jI","fZ",()=>A.a2(A.dv({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"jJ","h_",()=>A.a2(A.dv(null)))
s($,"jK","h0",()=>A.a2(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"jN","h3",()=>A.a2(A.dv(void 0)))
s($,"jO","h4",()=>A.a2(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"jM","h2",()=>A.a2(A.f8(null)))
s($,"jL","h1",()=>A.a2(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"jQ","h6",()=>A.a2(A.f8(void 0)))
s($,"jP","h5",()=>A.a2(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"jR","eK",()=>A.hZ())
s($,"jS","aW",()=>A.cF(B.Z))})();(function nativeSupport(){!function(){var s=function(a){var m={}
m[a]=1
return Object.keys(hunkHelpers.convertToFastObject(m))[0]}
v.getIsolateTag=function(a){return s("___dart_"+a+v.isolateTag)}
var r="___dart_isolate_tags_"
var q=Object[r]||(Object[r]=Object.create(null))
var p="_ZxYxX"
for(var o=0;;o++){var n=s(p+"_"+o+"_")
if(!(n in q)){q[n]=1
v.isolateTag=n
break}}v.dispatchPropertyName=v.getIsolateTag("dispatch_record")}()
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.aF,SharedArrayBuffer:A.aF,ArrayBufferView:A.bg,DataView:A.c8,Float32Array:A.c9,Float64Array:A.ca,Int16Array:A.cb,Int32Array:A.cc,Int8Array:A.cd,Uint16Array:A.ce,Uint32Array:A.cf,Uint8ClampedArray:A.bh,CanvasPixelArray:A.bh,Uint8Array:A.cg})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.aG.$nativeSuperclassTag="ArrayBufferView"
A.bC.$nativeSuperclassTag="ArrayBufferView"
A.bD.$nativeSuperclassTag="ArrayBufferView"
A.be.$nativeSuperclassTag="ArrayBufferView"
A.bE.$nativeSuperclassTag="ArrayBufferView"
A.bF.$nativeSuperclassTag="ArrayBufferView"
A.bf.$nativeSuperclassTag="ArrayBufferView"})()
Function.prototype.$0=function(){return this()}
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$2$0=function(){return this()}
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q){s[q].removeEventListener("load",onLoad,false)}a(b.target)}for(var r=0;r<s.length;++r){s[r].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var s=A.jq
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()