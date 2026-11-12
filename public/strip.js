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
if(a[b]!==s){A.jL(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.w(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.eI(b)
return new s(c,this)}:function(){if(s===null)s=A.eI(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.eI(a).prototype
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
eO(a,b,c,d){return{i:a,p:b,e:c,x:d}},
eL(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.eM==null){A.jw()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.e(A.fj("Return interceptor for "+A.c(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.dS
if(o==null)o=$.dS=A.e6(n)
p=q[o]}if(p!=null)return p
p=A.jC(a)
if(p!=null)return p
if(typeof a=="function")return B.A
s=Object.getPrototypeOf(a)
if(s==null)return B.p
if(s===Object.prototype)return B.p
if(typeof q=="function"){o=$.dS
if(o==null)o=$.dS=A.e6(n)
Object.defineProperty(q,o,{value:B.m,enumerable:false,writable:true,configurable:true})
return B.m}return B.m},
hL(a,b){if(a>4294967295)throw A.e(A.ac(a,0,4294967295,"length",null))
return J.hN(new Array(a),b)},
hM(a,b){return A.w(new Array(a),b.h("t<0>"))},
hN(a,b){var s=A.w(a,b.h("t<0>"))
s.$flags=1
return s},
f0(a,b){var s=t.U
return J.hl(s.a(a),s.a(b))},
f1(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
hO(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.f1(r))break;++b}return b},
hP(a,b){var s,r,q
for(s=a.length;b>0;b=r){r=b-1
if(!(r<s))return A.k(a,r)
q=a.charCodeAt(r)
if(q!==32&&q!==13&&!J.f1(q))break}return b},
az(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.b3.prototype
return J.c8.prototype}if(typeof a=="string")return J.a9.prototype
if(a==null)return J.b4.prototype
if(typeof a=="boolean")return J.c7.prototype
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aa.prototype
if(typeof a=="symbol")return J.b7.prototype
if(typeof a=="bigint")return J.b5.prototype
return a}if(a instanceof A.j)return a
return J.eL(a)},
eK(a){if(typeof a=="string")return J.a9.prototype
if(a==null)return a
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aa.prototype
if(typeof a=="symbol")return J.b7.prototype
if(typeof a=="bigint")return J.b5.prototype
return a}if(a instanceof A.j)return a
return J.eL(a)},
fU(a){if(a==null)return a
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aa.prototype
if(typeof a=="symbol")return J.b7.prototype
if(typeof a=="bigint")return J.b5.prototype
return a}if(a instanceof A.j)return a
return J.eL(a)},
js(a){if(typeof a=="number")return J.aE.prototype
if(typeof a=="string")return J.a9.prototype
if(a==null)return a
if(!(a instanceof A.j))return J.ar.prototype
return a},
fV(a){if(typeof a=="string")return J.a9.prototype
if(a==null)return a
if(!(a instanceof A.j))return J.ar.prototype
return a},
a0(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.az(a).C(a,b)},
eT(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string"||A.jz(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.eK(a).j(a,b)},
hi(a,b){return J.fU(a).q(a,b)},
hj(a,b){return J.fV(a).ag(a,b)},
hk(a,b,c){return J.fV(a).Y(a,b,c)},
hl(a,b){return J.js(a).F(a,b)},
n(a){return J.az(a).gu(a)},
eh(a){return J.fU(a).gt(a)},
ei(a){return J.eK(a).gm(a)},
hm(a){return J.az(a).gv(a)},
ah(a){return J.az(a).i(a)},
c5:function c5(){},
c7:function c7(){},
b4:function b4(){},
b6:function b6(){},
ab:function ab(){},
ck:function ck(){},
ar:function ar(){},
aa:function aa(){},
b5:function b5(){},
b7:function b7(){},
t:function t(a){this.$ti=a},
c6:function c6(){},
cQ:function cQ(a){this.$ti=a},
aZ:function aZ(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aE:function aE(){},
b3:function b3(){},
c8:function c8(){},
a9:function a9(){}},A={em:function em(){},
hq(a,b,c){if(t.O.b(a))return new A.bv(a,b.h("@<0>").p(c).h("bv<1,2>"))
return new A.aj(a,b.h("@<0>").p(c).h("aj<1,2>"))},
hQ(a){return new A.b9("Field '"+a+"' has not been initialized.")},
r(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
bq(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
cI(a,b,c){return a},
eN(a){var s,r
for(s=$.O.length,r=0;r<s;++r)if(a===$.O[r])return!0
return!1},
f6(a,b,c,d){if(t.O.b(a))return new A.b1(a,b,c.h("@<0>").p(d).h("b1<1,2>"))
return new A.ap(a,b,c.h("@<0>").p(d).h("ap<1,2>"))},
f_(){return new A.bo("No element")},
aK:function aK(){},
b_:function b_(a,b){this.a=a
this.$ti=b},
aj:function aj(a,b){this.a=a
this.$ti=b},
bv:function bv(a,b){this.a=a
this.$ti=b},
ak:function ak(a,b){this.a=a
this.$ti=b},
cM:function cM(a,b){this.a=a
this.b=b},
b9:function b9(a){this.a=a},
cZ:function cZ(){},
i:function i(){},
bd:function bd(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
ap:function ap(a,b,c){this.a=a
this.b=b
this.$ti=c},
b1:function b1(a,b,c){this.a=a
this.b=b
this.$ti=c},
be:function be(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
bs:function bs(a,b){this.a=a
this.$ti=b},
bt:function bt(a,b){this.a=a
this.$ti=b},
H:function H(){},
h4(a){var s=A.h3(a)
if(s!=null)return s
return"minified:"+a},
jz(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.p.b(a)},
c(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.ah(a)
return s},
bk(a){var s,r=$.f7
if(r==null)r=$.f7=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
fb(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.k(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
hZ(a){var s,r
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return null
s=parseFloat(a)
if(isNaN(s)){r=B.f.b3(a)
if(r==="NaN"||r==="+NaN"||r==="-NaN")return s
return null}return s},
cl(a){var s,r,q,p
if(a instanceof A.j)return A.N(A.bU(a),null)
s=J.az(a)
if(s===B.z||s===B.B||t.B.b(a)){r=B.n(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.N(A.bU(a),null)},
fc(a){var s,r,q
if(a==null||typeof a=="number"||A.eD(a))return J.ah(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.a8)return a.i(0)
if(a instanceof A.Z)return a.aT(!0)
s=$.hh()
for(r=0;r<1;++r){q=s[r].bL(a)
if(q!=null)return q}return"Instance of '"+A.cl(a)+"'"},
i_(a,b,c,d,e,f,g,h,i){var s,r,q,p=b-1
if(0<=a&&a<100){a+=400
p-=4800}s=B.c.ar(h,1000)
g+=B.c.aQ(h-s,1000)
r=i?Date.UTC(a,p,c,d,e,f,g):new Date(a,p,c,d,e,f,g).valueOf()
q=!0
if(!isNaN(r))if(!(r<-864e13))if(!(r>864e13))q=r===864e13&&s!==0
if(q)return null
return r},
L(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
fa(a){return a.c?A.L(a).getUTCFullYear()+0:A.L(a).getFullYear()+0},
f9(a){return a.c?A.L(a).getUTCMonth()+1:A.L(a).getMonth()+1},
f8(a){return a.c?A.L(a).getUTCDate()+0:A.L(a).getDate()+0},
hV(a){return a.c?A.L(a).getUTCHours()+0:A.L(a).getHours()+0},
hX(a){return a.c?A.L(a).getUTCMinutes()+0:A.L(a).getMinutes()+0},
hY(a){return a.c?A.L(a).getUTCSeconds()+0:A.L(a).getSeconds()+0},
hW(a){return a.c?A.L(a).getUTCMilliseconds()+0:A.L(a).getMilliseconds()+0},
hU(a){var s=a.$thrownJsError
if(s==null)return null
return A.aU(s)},
fd(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.C(a,s)
a.$thrownJsError=s
s.stack=b.i(0)}},
fX(a){throw A.e(A.fO(a))},
k(a,b){if(a==null)J.ei(a)
throw A.e(A.fS(a,b))},
fS(a,b){var s,r="index"
if(!A.eF(b))return new A.X(!0,b,r,null)
s=J.ei(a)
if(b<0||b>=s)return A.hG(b,s,a,r)
return A.i0(b,r)},
fO(a){return new A.X(!0,a,null,null)},
e(a){return A.C(a,new Error())},
C(a,b){var s
if(a==null)a=new A.a3()
b.dartException=a
s=A.jM
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
jM(){return J.ah(this.dartException)},
eR(a,b){throw A.C(a,b==null?new Error():b)},
ef(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.eR(A.iI(a,b,c),s)},
iI(a,b,c){var s,r,q,p,o,n,m,l,k
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
return new A.br("'"+s+"': Cannot "+o+" "+l+k+n)},
a7(a){throw A.e(A.a1(a))},
a4(a){var s,r,q,p,o,n
a=A.h0(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.w([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.dA(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
dB(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
fi(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
en(a,b){var s=b==null,r=s?null:b.method
return new A.c9(a,r,s?null:b.receiver)},
aW(a){var s
if(a==null)return new A.cW(a)
if(a instanceof A.b2){s=a.a
return A.ag(a,s==null?A.aO(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.ag(a,a.dartException)
return A.jh(a)},
ag(a,b){if(t.C.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
jh(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.bp(r,16)&8191)===10)switch(q){case 438:return A.ag(a,A.en(A.c(s)+" (Error "+q+")",null))
case 445:case 5007:A.c(s)
return A.ag(a,new A.bj())}}if(a instanceof TypeError){p=$.h7()
o=$.h8()
n=$.h9()
m=$.ha()
l=$.hd()
k=$.he()
j=$.hc()
$.hb()
i=$.hg()
h=$.hf()
g=p.D(s)
if(g!=null)return A.ag(a,A.en(A.I(s),g))
else{g=o.D(s)
if(g!=null){g.method="call"
return A.ag(a,A.en(A.I(s),g))}else if(n.D(s)!=null||m.D(s)!=null||l.D(s)!=null||k.D(s)!=null||j.D(s)!=null||m.D(s)!=null||i.D(s)!=null||h.D(s)!=null){A.I(s)
return A.ag(a,new A.bj())}}return A.ag(a,new A.cr(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.bn()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.ag(a,new A.X(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.bn()
return a},
aU(a){var s
if(a instanceof A.b2)return a.b
if(a==null)return new A.bJ(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.bJ(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
cK(a){if(a==null)return J.n(a)
if(typeof a=="object")return A.bk(a)
return J.n(a)},
jm(a){if(typeof a=="number")return B.b.gu(a)
if(a instanceof A.cF)return A.bk(a)
if(a instanceof A.Z)return a.gu(a)
return A.cK(a)},
jq(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.B(0,a[s],a[r])}return b},
jr(a,b){var s,r=a.length
for(s=0;s<r;++s)b.q(0,a[s])
return b},
iT(a,b,c,d,e,f){t.Z.a(a)
switch(A.af(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.e(new A.dH("Unsupported number of arguments for wrapped closure"))},
aT(a,b){var s=a.$identity
if(!!s)return s
s=A.jn(a,b)
a.$identity=s
return s},
jn(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.iT)},
hw(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.cn().constructor.prototype):Object.create(new A.aB(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.eY(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.hs(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.eY(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
hs(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.e("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.ho)}throw A.e("Error in functionType of tearoff")},
ht(a,b,c,d){var s=A.eX
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
eY(a,b,c,d){if(c)return A.hv(a,b,d)
return A.ht(b.length,d,a,b)},
hu(a,b,c,d){var s=A.eX,r=A.hp
switch(b?-1:a){case 0:throw A.e(new A.cm("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
hv(a,b,c){var s,r
if($.eV==null)$.eV=A.eU("interceptor")
if($.eW==null)$.eW=A.eU("receiver")
s=b.length
r=A.hu(s,c,a,b)
return r},
eI(a){return A.hw(a)},
ho(a,b){return A.bO(v.typeUniverse,A.bU(a.a),b)},
eX(a){return a.a},
hp(a){return a.b},
eU(a){var s,r,q,p=new A.aB("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.e(A.aY("Field name "+a+" not found.",null))},
e6(a){return v.getIsolateTag(a)},
jC(a){var s,r,q,p,o,n=A.I($.fW.$1(a)),m=$.e3[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.ea[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.cG($.fN.$2(a,n))
if(q!=null){m=$.e3[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.ea[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.ec(s)
$.e3[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.ea[n]=s
return s}if(p==="-"){o=A.ec(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.fY(a,s)
if(p==="*")throw A.e(A.fj(n))
if(v.leafTags[n]===true){o=A.ec(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.fY(a,s)},
fY(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.eO(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
ec(a){return J.eO(a,!1,null,!!a.$iK)},
jE(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.ec(s)
else return J.eO(s,c,null,null)},
jw(){if(!0===$.eM)return
$.eM=!0
A.jx()},
jx(){var s,r,q,p,o,n,m,l
$.e3=Object.create(null)
$.ea=Object.create(null)
A.jv()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.h_.$1(o)
if(n!=null){m=A.jE(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
jv(){var s,r,q,p,o,n,m=B.r()
m=A.aS(B.t,A.aS(B.u,A.aS(B.o,A.aS(B.o,A.aS(B.v,A.aS(B.w,A.aS(B.x(B.n),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.fW=new A.e7(p)
$.fN=new A.e8(o)
$.h_=new A.e9(n)},
aS(a,b){return a(b)||b},
jo(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
f2(a,b,c,d,e,f){var s=b?"m":"",r=c?"":"i",q=d?"u":"",p=e?"s":"",o=function(g,h){try{return new RegExp(g,h)}catch(n){return n}}(a,s+r+q+p+f)
if(o instanceof RegExp)return o
throw A.e(A.c3("Illegal RegExp pattern ("+String(o)+")",a))},
jG(a,b,c){var s=a.indexOf(b,c)
return s>=0},
eJ(a){if(a.indexOf("$",0)>=0)return a.replace(/\$/g,"$$$$")
return a},
jJ(a,b,c,d){var s=b.aJ(a,d)
if(s==null)return a
return A.eQ(a,s.b.index,s.gO(),c)},
h0(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
m(a,b,c){var s
if(typeof b=="string")return A.jI(a,b,c)
if(b instanceof A.aF){s=b.gaM()
s.lastIndex=0
return a.replace(s,A.eJ(c))}return A.jH(a,b,c)},
jH(a,b,c){var s,r,q,p
for(s=J.hj(b,a),s=s.gt(s),r=0,q="";s.k();){p=s.gl()
q=q+a.substring(r,p.ga1())+c
r=p.gO()}s=q+a.substring(r)
return s.charCodeAt(0)==0?s:s},
jI(a,b,c){var s,r,q
if(b===""){if(a==="")return c
s=a.length
for(r=c,q=0;q<s;++q)r=r+a[q]+c
return r.charCodeAt(0)==0?r:r}if(a.indexOf(b,0)<0)return a
if(a.length<500||c.indexOf("$",0)>=0)return a.split(b).join(c)
return a.replace(new RegExp(A.h0(b),"g"),A.eJ(c))},
jK(a,b,c,d){var s,r,q,p,o,n
if(typeof b=="string"){s=a.indexOf(b,d)
if(s<0)return a
return A.eQ(a,s,s+b.length,c)}if(b instanceof A.aF)return d===0?a.replace(b.b,A.eJ(c)):A.jJ(a,b,c,d)
r=J.hk(b,a,d)
q=r.gt(r)
if(!q.k())return a
p=q.gl()
r=p.ga1()
o=p.gO()
n=A.fe(r,o,a.length)
return A.eQ(a,r,n,c)},
eQ(a,b,c,d){return a.substring(0,b)+d+a.substring(c)},
a5:function a5(a,b){this.a=a
this.b=b},
bH:function bH(a,b,c){this.a=a
this.b=b
this.c=c},
aC:function aC(){},
b0:function b0(a,b,c){this.a=a
this.b=b
this.$ti=c},
bA:function bA(a,b){this.a=a
this.$ti=b},
bB:function bB(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aD:function aD(a,b){this.a=a
this.$ti=b},
bm:function bm(){},
dA:function dA(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
bj:function bj(){},
c9:function c9(a,b,c){this.a=a
this.b=b
this.c=c},
cr:function cr(a){this.a=a},
cW:function cW(a){this.a=a},
b2:function b2(a,b){this.a=a
this.b=b},
bJ:function bJ(a){this.a=a
this.b=null},
a8:function a8(){},
bZ:function bZ(){},
c_:function c_(){},
cp:function cp(){},
cn:function cn(){},
aB:function aB(a,b){this.a=a
this.b=b},
cm:function cm(a){this.a=a},
an:function an(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
cR:function cR(a,b){this.a=a
this.b=b
this.c=null},
ao:function ao(a,b){this.a=a
this.$ti=b},
bc:function bc(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
ba:function ba(a,b){this.a=a
this.$ti=b},
bb:function bb(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
b8:function b8(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
e7:function e7(a){this.a=a},
e8:function e8(a){this.a=a},
e9:function e9(a){this.a=a},
Z:function Z(){},
aM:function aM(){},
aN:function aN(){},
aF:function aF(a,b){var _=this
_.a=a
_.b=b
_.e=_.c=null},
bC:function bC(a){this.b=a},
cs:function cs(a,b,c){this.a=a
this.b=b
this.c=c},
ct:function ct(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
co:function co(a,b){this.a=a
this.c=b},
cC:function cC(a,b,c){this.a=a
this.b=b
this.c=c},
cD:function cD(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
aH:function aH(){},
bh:function bh(){},
ca:function ca(){},
aI:function aI(){},
bf:function bf(){},
bg:function bg(){},
cb:function cb(){},
cc:function cc(){},
cd:function cd(){},
ce:function ce(){},
cf:function cf(){},
cg:function cg(){},
ch:function ch(){},
bi:function bi(){},
ci:function ci(){},
bD:function bD(){},
bE:function bE(){},
bF:function bF(){},
bG:function bG(){},
es(a,b){var s=b.c
return s==null?b.c=A.bM(a,"am",[b.x]):s},
ff(a){var s=a.w
if(s===6||s===7)return A.ff(a.x)
return s===11||s===12},
i2(a){return a.as},
bS(a){return A.dX(v.typeUniverse,a,!1)},
ax(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.ax(a1,s,a3,a4)
if(r===s)return a2
return A.ft(a1,r,!0)
case 7:s=a2.x
r=A.ax(a1,s,a3,a4)
if(r===s)return a2
return A.fs(a1,r,!0)
case 8:q=a2.y
p=A.aR(a1,q,a3,a4)
if(p===q)return a2
return A.bM(a1,a2.x,p)
case 9:o=a2.x
n=A.ax(a1,o,a3,a4)
m=a2.y
l=A.aR(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.ey(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.aR(a1,j,a3,a4)
if(i===j)return a2
return A.fu(a1,k,i)
case 11:h=a2.x
g=A.ax(a1,h,a3,a4)
f=a2.y
e=A.je(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.fr(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.aR(a1,d,a3,a4)
o=a2.x
n=A.ax(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.ez(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.e(A.bW("Attempted to substitute unexpected RTI kind "+a0))}},
aR(a,b,c,d){var s,r,q,p,o=b.length,n=A.dY(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.ax(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
jf(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.dY(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.ax(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
je(a,b,c,d){var s,r=b.a,q=A.aR(a,r,c,d),p=b.b,o=A.aR(a,p,c,d),n=b.c,m=A.jf(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.cy()
s.a=q
s.b=o
s.c=m
return s},
w(a,b){a[v.arrayRti]=b
return a},
fQ(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.ju(s)
return a.$S()}return null},
jy(a,b){var s
if(A.ff(b))if(a instanceof A.a8){s=A.fQ(a)
if(s!=null)return s}return A.bU(a)},
bU(a){if(a instanceof A.j)return A.x(a)
if(Array.isArray(a))return A.aw(a)
return A.eC(J.az(a))},
aw(a){var s=a[v.arrayRti],r=t.b
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
x(a){var s=a.$ti
return s!=null?s:A.eC(a)},
eC(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.iP(a,s)},
iP(a,b){var s=a instanceof A.a8?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.iw(v.typeUniverse,s.name)
b.$ccache=r
return r},
ju(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.dX(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
jt(a){return A.ay(A.x(a))},
eH(a){var s
if(a instanceof A.Z)return A.jp(a.$r,a.ab())
s=a instanceof A.a8?A.fQ(a):null
if(s!=null)return s
if(t.R.b(a))return J.hm(a).a
if(Array.isArray(a))return A.aw(a)
return A.bU(a)},
ay(a){var s=a.r
return s==null?a.r=new A.cF(a):s},
jp(a,b){var s,r,q=b,p=q.length
if(p===0)return t.h
if(0>=p)return A.k(q,0)
s=A.bO(v.typeUniverse,A.eH(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.k(q,r)
s=A.fw(v.typeUniverse,s,A.eH(q[r]))}return A.bO(v.typeUniverse,s,a)},
W(a){return A.ay(A.dX(v.typeUniverse,a,!1))},
iO(a){var s=this
s.b=A.jc(s)
return s.b(a)},
jc(a){var s,r,q,p,o
if(a===t.K)return A.iZ
if(A.aA(a))return A.j2
s=a.w
if(s===6)return A.iM
if(s===1)return A.fH
if(s===7)return A.iU
r=A.jb(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.aA)){a.f="$i"+q
if(q==="o")return A.iX
if(a===t.m)return A.iW
return A.j1}}else if(s===10){p=A.jo(a.x,a.y)
o=p==null?A.fH:p
return o==null?A.aO(o):o}return A.iK},
jb(a){if(a.w===8){if(a===t.S)return A.eF
if(a===t.i||a===t.o)return A.iY
if(a===t.N)return A.j0
if(a===t.y)return A.eD}return null},
iN(a){var s=this,r=A.iJ
if(A.aA(s))r=A.iB
else if(s===t.K)r=A.aO
else if(A.aV(s)){r=A.iL
if(s===t.a3)r=A.iA
else if(s===t.aD)r=A.cG
else if(s===t.u)r=A.iy
else if(s===t.ae)r=A.fA
else if(s===t.I)r=A.iz
else if(s===t.aQ)r=A.p}else if(s===t.S)r=A.af
else if(s===t.N)r=A.I
else if(s===t.y)r=A.eA
else if(s===t.o)r=A.fz
else if(s===t.i)r=A.eB
else if(s===t.m)r=A.f
s.a=r
return s.a(a)},
iK(a){var s=this
if(a==null)return A.aV(s)
return A.jA(v.typeUniverse,A.jy(a,s),s)},
iM(a){if(a==null)return!0
return this.x.b(a)},
j1(a){var s,r=this
if(a==null)return A.aV(r)
s=r.f
if(a instanceof A.j)return!!a[s]
return!!J.az(a)[s]},
iX(a){var s,r=this
if(a==null)return A.aV(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.j)return!!a[s]
return!!J.az(a)[s]},
iW(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.j)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
fG(a){if(typeof a=="object"){if(a instanceof A.j)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
iJ(a){var s=this
if(a==null){if(A.aV(s))return a}else if(s.b(a))return a
throw A.C(A.fC(a,s),new Error())},
iL(a){var s=this
if(a==null||s.b(a))return a
throw A.C(A.fC(a,s),new Error())},
fC(a,b){return new A.bK("TypeError: "+A.fl(a,A.N(b,null)))},
fl(a,b){return A.cP(a)+": type '"+A.N(A.eH(a),null)+"' is not a subtype of type '"+b+"'"},
R(a,b){return new A.bK("TypeError: "+A.fl(a,b))},
iU(a){var s=this
return s.x.b(a)||A.es(v.typeUniverse,s).b(a)},
iZ(a){return a!=null},
aO(a){if(a!=null)return a
throw A.C(A.R(a,"Object"),new Error())},
j2(a){return!0},
iB(a){return a},
fH(a){return!1},
eD(a){return!0===a||!1===a},
eA(a){if(!0===a)return!0
if(!1===a)return!1
throw A.C(A.R(a,"bool"),new Error())},
iy(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.C(A.R(a,"bool?"),new Error())},
eB(a){if(typeof a=="number")return a
throw A.C(A.R(a,"double"),new Error())},
iz(a){if(typeof a=="number")return a
if(a==null)return a
throw A.C(A.R(a,"double?"),new Error())},
eF(a){return typeof a=="number"&&Math.floor(a)===a},
af(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.C(A.R(a,"int"),new Error())},
iA(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.C(A.R(a,"int?"),new Error())},
iY(a){return typeof a=="number"},
fz(a){if(typeof a=="number")return a
throw A.C(A.R(a,"num"),new Error())},
fA(a){if(typeof a=="number")return a
if(a==null)return a
throw A.C(A.R(a,"num?"),new Error())},
j0(a){return typeof a=="string"},
I(a){if(typeof a=="string")return a
throw A.C(A.R(a,"String"),new Error())},
cG(a){if(typeof a=="string")return a
if(a==null)return a
throw A.C(A.R(a,"String?"),new Error())},
f(a){if(A.fG(a))return a
throw A.C(A.R(a,"JSObject"),new Error())},
p(a){if(a==null)return a
if(A.fG(a))return a
throw A.C(A.R(a,"JSObject?"),new Error())},
fK(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.N(a[q],b)
return s},
j6(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.fK(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.N(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
fD(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.w([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.a.q(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.k(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.N(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.N(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.N(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.N(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.N(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
N(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.N(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.N(a.x,b)+">"
if(l===8){p=A.jg(a.x)
o=a.y
return o.length>0?p+("<"+A.fK(o,b)+">"):p}if(l===10)return A.j6(a,b)
if(l===11)return A.fD(a,b,null)
if(l===12)return A.fD(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.k(b,n)
return b[n]}return"?"},
jg(a){var s=A.h3(a)
if(s!=null)return s
return"minified:"+a},
ix(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
iw(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.dX(a,b,!1)
else if(typeof m=="number"){s=m
r=A.bN(a,5,"#")
q=A.dY(s)
for(p=0;p<s;++p)q[p]=r
o=A.bM(a,b,q)
n[b]=o
return o}else return m},
iv(a,b){return A.fx(a.tR,b)},
iu(a,b){return A.fx(a.eT,b)},
dX(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.fv(a,null,b,!1)
r.set(b,s)
return s},
bO(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.fv(a,b,c,!0)
q.set(c,r)
return r},
fw(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.ey(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
fv(a,b,c,d){return A.il(A.ie(a,b,c,d))},
ae(a,b){b.a=A.iN
b.b=A.iO
return b},
bN(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.V(null,null)
s.w=b
s.as=c
r=A.ae(a,s)
a.eC.set(c,r)
return r},
ft(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.is(a,b,r,c)
a.eC.set(r,s)
return s},
is(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.aA(b))if(!(b===t.P||b===t.T))if(s!==6)r=s===7&&A.aV(b.x)
if(r)return b
else if(s===1)return t.P}q=new A.V(null,null)
q.w=6
q.x=b
q.as=c
return A.ae(a,q)},
fs(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.iq(a,b,r,c)
a.eC.set(r,s)
return s},
iq(a,b,c,d){var s,r
if(d){s=b.w
if(A.aA(b)||b===t.K)return b
else if(s===1)return A.bM(a,"am",[b])
else if(b===t.P||b===t.T)return t.bc}r=new A.V(null,null)
r.w=7
r.x=b
r.as=c
return A.ae(a,r)},
it(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.V(null,null)
s.w=13
s.x=b
s.as=q
r=A.ae(a,s)
a.eC.set(q,r)
return r},
bL(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
ip(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
bM(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.bL(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.V(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.ae(a,r)
a.eC.set(p,q)
return q},
ey(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.bL(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.V(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.ae(a,o)
a.eC.set(q,n)
return n},
fu(a,b,c){var s,r,q="+"+(b+"("+A.bL(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.V(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.ae(a,s)
a.eC.set(q,r)
return r},
fr(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.bL(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.bL(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.ip(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.V(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.ae(a,p)
a.eC.set(r,o)
return o},
ez(a,b,c,d){var s,r=b.as+("<"+A.bL(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.ir(a,b,c,r,d)
a.eC.set(r,s)
return s},
ir(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.dY(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.ax(a,b,r,0)
m=A.aR(a,c,r,0)
return A.ez(a,n,m,c!==m)}}l=new A.V(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.ae(a,l)},
ie(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
il(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.ih(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.fp(a,r,l,k,!1)
else if(q===46)r=A.fp(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.av(a.u,a.e,k.pop()))
break
case 94:k.push(A.it(a.u,k.pop()))
break
case 35:k.push(A.bN(a.u,5,"#"))
break
case 64:k.push(A.bN(a.u,2,"@"))
break
case 126:k.push(A.bN(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.ij(a,k)
break
case 38:A.ii(a,k)
break
case 63:p=a.u
k.push(A.ft(p,A.av(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.fs(p,A.av(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.ig(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.fq(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.im(a.u,a.e,o)
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
return A.av(a.u,a.e,m)},
ih(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
fp(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.ix(s,o.x)[p]
if(n==null)A.eR('No "'+p+'" in "'+A.i2(o)+'"')
d.push(A.bO(s,o,n))}else d.push(p)
return m},
ij(a,b){var s,r=a.u,q=A.fo(a,b),p=b.pop()
if(typeof p=="string")b.push(A.bM(r,p,q))
else{s=A.av(r,a.e,p)
switch(s.w){case 11:b.push(A.ez(r,s,q,a.n))
break
default:b.push(A.ey(r,s,q))
break}}},
ig(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.fo(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.av(p,a.e,o)
q=new A.cy()
q.a=s
q.b=n
q.c=m
b.push(A.fr(p,r,q))
return
case-4:b.push(A.fu(p,b.pop(),s))
return
default:throw A.e(A.bW("Unexpected state under `()`: "+A.c(o)))}},
ii(a,b){var s=b.pop()
if(0===s){b.push(A.bN(a.u,1,"0&"))
return}if(1===s){b.push(A.bN(a.u,4,"1&"))
return}throw A.e(A.bW("Unexpected extended operation "+A.c(s)))},
fo(a,b){var s=b.splice(a.p)
A.fq(a.u,a.e,s)
a.p=b.pop()
return s},
av(a,b,c){if(typeof c=="string")return A.bM(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.ik(a,b,c)}else return c},
fq(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.av(a,b,c[s])},
im(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.av(a,b,c[s])},
ik(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.e(A.bW("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.e(A.bW("Bad index "+c+" for "+b.i(0)))},
jA(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.B(a,b,null,c,null)
r.set(c,s)}return s},
B(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.aA(d))return!0
s=b.w
if(s===4)return!0
if(A.aA(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.B(a,c[b.x],c,d,e))return!0
q=d.w
p=t.P
if(b===p||b===t.T){if(q===7)return A.B(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.B(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.B(a,b.x,c,d,e))return!1
return A.B(a,A.es(a,b),c,d,e)}if(s===6)return A.B(a,p,c,d,e)&&A.B(a,b.x,c,d,e)
if(q===7){if(A.B(a,b,c,d.x,e))return!0
return A.B(a,b,c,A.es(a,d),e)}if(q===6)return A.B(a,b,c,p,e)||A.B(a,b,c,d.x,e)
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
if(!A.B(a,j,c,i,e)||!A.B(a,i,e,j,c))return!1}return A.fF(a,b.x,c,d.x,e)}if(q===11){if(b===t.g)return!0
if(p)return!1
return A.fF(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.iV(a,b,c,d,e)}if(o&&q===10)return A.j_(a,b,c,d,e)
return!1},
fF(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
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
iV(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.bO(a,b,r[o])
return A.fy(a,p,null,c,d.y,e)}return A.fy(a,b.y,null,c,d.y,e)},
fy(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.B(a,b[s],d,e[s],f))return!1
return!0},
j_(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.B(a,r[s],c,q[s],e))return!1
return!0},
aV(a){var s=a.w,r=!0
if(!(a===t.P||a===t.T))if(!A.aA(a))if(s!==6)r=s===7&&A.aV(a.x)
return r},
aA(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
fx(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
dY(a){return a>0?new Array(a):v.typeUniverse.sEA},
V:function V(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
cy:function cy(){this.c=this.b=this.a=null},
cF:function cF(a){this.a=a},
cx:function cx(){},
bK:function bK(a){this.a=a},
ia(){var s,r,q
if(self.scheduleImmediate!=null)return A.jj()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.aT(new A.dD(s),1)).observe(r,{childList:true})
return new A.dC(s,r,q)}else if(self.setImmediate!=null)return A.jk()
return A.jl()},
ib(a){self.scheduleImmediate(A.aT(new A.dE(t.M.a(a)),0))},
ic(a){self.setImmediate(A.aT(new A.dF(t.M.a(a)),0))},
id(a){t.M.a(a)
A.io(0,a)},
io(a,b){var s=new A.dV()
s.b9(a,b)
return s},
j4(a){return new A.cu(new A.F($.y,a.h("F<0>")),a.h("cu<0>"))},
iE(a,b){a.$2(0,null)
b.b=!0
return b.a},
fB(a,b){A.iF(a,b)},
iD(a,b){b.ah(a)},
iC(a,b){b.ai(A.aW(a),A.aU(a))},
iF(a,b){var s,r,q=new A.dZ(b),p=new A.e_(b)
if(a instanceof A.F)a.aR(q,p,t.z)
else{s=t.z
if(a instanceof A.F)a.b2(q,p,s)
else{r=new A.F($.y,t._)
r.a=8
r.c=a
r.aR(q,p,s)}}},
ji(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.y.b_(new A.e1(s),t.H,t.S,t.z)},
ek(a){var s
if(t.C.b(a)){s=a.gN()
if(s!=null)return s}return B.i},
iQ(a,b){if($.y===B.e)return null
return null},
iR(a,b){if($.y!==B.e)A.iQ(a,b)
if(b==null)if(t.C.b(a)){b=a.gN()
if(b==null){A.fd(a,B.i)
b=B.i}}else b=B.i
else if(t.C.b(a))A.fd(a,b)
return new A.Q(a,b)},
eu(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t._;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.i4()
b.a4(new A.Q(new A.X(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.aN(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.V()
b.S(o.a)
A.aL(b,p)
return}b.a^=2
A.cH(null,null,b.b,t.M.a(new A.dL(o,b)))},
aL(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.t,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.eG(m.a,m.b)}return}q.a=b
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
A.eG(j.a,j.b)
return}g=$.y
if(g!==h)$.y=h
else g=null
c=c.c
if((c&15)===8)new A.dP(q,d,n).$0()
else if(o){if((c&1)!==0)new A.dO(q,j).$0()}else if((c&2)!==0)new A.dN(d,q).$0()
if(g!=null)$.y=g
c=q.c
if(c instanceof A.F){p=q.a.$ti
p=p.h("am<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.W(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.eu(c,f,!0)
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
j7(a,b){var s
if(t.Q.b(a))return b.b_(a,t.z,t.K,t.l)
s=t.v
if(s.b(a))return s.a(a)
throw A.e(A.ej(a,"onError",u.c))},
j5(){var s,r
for(s=$.aQ;s!=null;s=$.aQ){$.bR=null
r=s.b
$.aQ=r
if(r==null)$.bQ=null
s.a.$0()}},
jd(){$.eE=!0
try{A.j5()}finally{$.bR=null
$.eE=!1
if($.aQ!=null)$.eS().$1(A.fP())}},
fL(a){var s=new A.cv(a),r=$.bQ
if(r==null){$.aQ=$.bQ=s
if(!$.eE)$.eS().$1(A.fP())}else $.bQ=r.b=s},
ja(a){var s,r,q,p=$.aQ
if(p==null){A.fL(a)
$.bR=$.bQ
return}s=new A.cv(a)
r=$.bR
if(r==null){s.b=p
$.aQ=$.bR=s}else{q=r.b
s.b=q
$.bR=r.b=s
if(q==null)$.bQ=s}},
jU(a,b){A.cI(a,"stream",t.K)
return new A.cB(b.h("cB<0>"))},
eG(a,b){A.ja(new A.e0(a,b))},
fJ(a,b,c,d,e){var s,r=$.y
if(r===c)return d.$0()
$.y=c
s=r
try{r=d.$0()
return r}finally{$.y=s}},
j9(a,b,c,d,e,f,g){var s,r=$.y
if(r===c)return d.$1(e)
$.y=c
s=r
try{r=d.$1(e)
return r}finally{$.y=s}},
j8(a,b,c,d,e,f,g,h,i){var s,r=$.y
if(r===c)return d.$2(e,f)
$.y=c
s=r
try{r=d.$2(e,f)
return r}finally{$.y=s}},
cH(a,b,c,d){t.M.a(d)
if(B.e!==c){d=c.bt(d)
d=d}A.fL(d)},
dD:function dD(a){this.a=a},
dC:function dC(a,b,c){this.a=a
this.b=b
this.c=c},
dE:function dE(a){this.a=a},
dF:function dF(a){this.a=a},
dV:function dV(){},
dW:function dW(a,b){this.a=a
this.b=b},
cu:function cu(a,b){this.a=a
this.b=!1
this.$ti=b},
dZ:function dZ(a){this.a=a},
e_:function e_(a){this.a=a},
e1:function e1(a){this.a=a},
Q:function Q(a,b){this.a=a
this.b=b},
cw:function cw(){},
bu:function bu(a,b){this.a=a
this.$ti=b},
as:function as(a,b,c,d,e){var _=this
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
dI:function dI(a,b){this.a=a
this.b=b},
dM:function dM(a,b){this.a=a
this.b=b},
dL:function dL(a,b){this.a=a
this.b=b},
dK:function dK(a,b){this.a=a
this.b=b},
dJ:function dJ(a,b){this.a=a
this.b=b},
dP:function dP(a,b,c){this.a=a
this.b=b
this.c=c},
dQ:function dQ(a,b){this.a=a
this.b=b},
dR:function dR(a){this.a=a},
dO:function dO(a,b){this.a=a
this.b=b},
dN:function dN(a,b){this.a=a
this.b=b},
cv:function cv(a){this.a=a
this.b=null},
cB:function cB(a){this.$ti=a},
bP:function bP(){},
cA:function cA(){},
dU:function dU(a,b){this.a=a
this.b=b},
e0:function e0(a,b){this.a=a
this.b=b},
fm(a,b){var s=a[b]
return s===a?null:s},
ew(a,b,c){if(c==null)a[b]=a
else a[b]=c},
ev(){var s=Object.create(null)
A.ew(s,"<non-identifier-key>",s)
delete s["<non-identifier-key>"]
return s},
eo(a,b){return new A.an(a.h("@<0>").p(b).h("an<1,2>"))},
hR(a){return new A.at(a.h("at<0>"))},
ep(a,b){return b.h("f3<0>").a(A.jr(a,new A.at(b.h("at<0>"))))},
ex(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
fn(a,b,c){var s=new A.au(a,b,c.h("au<0>"))
s.c=a.e
return s},
er(a){var s,r
if(A.eN(a))return"{...}"
s=new A.bp("")
try{r={}
B.a.q($.O,a)
s.a+="{"
r.a=!0
a.G(0,new A.cU(r,s))
s.a+="}"}finally{if(0>=$.O.length)return A.k($.O,-1)
$.O.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
bw:function bw(){},
bz:function bz(a){var _=this
_.a=0
_.e=_.d=_.c=_.b=null
_.$ti=a},
bx:function bx(a,b){this.a=a
this.$ti=b},
by:function by(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
at:function at(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
cz:function cz(a){this.a=a
this.b=null},
au:function au(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
v:function v(){},
A:function A(){},
cU:function cU(a,b){this.a=a
this.b=b},
aJ:function aJ(){},
bI:function bI(){},
cJ(a){var s=A.fb(a,null)
if(s!=null)return s
throw A.e(A.c3(a,null))},
fT(a){var s=A.hZ(a)
if(s!=null)return s
throw A.e(A.c3("Invalid double",a))},
hC(a,b){a=A.C(a,new Error())
if(a==null)a=A.aO(a)
a.stack=b.i(0)
throw a},
f4(a,b,c,d){var s,r=c?J.hM(a,d):J.hL(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
hS(a,b,c){var s,r,q=A.w([],c.h("t<0>"))
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.a7)(a),++r)B.a.q(q,c.a(a[r]))
q.$flags=1
return q},
eq(a,b){var s,r
if(Array.isArray(a))return A.w(a.slice(0),b.h("t<0>"))
s=A.w([],b.h("t<0>"))
for(r=J.eh(a);r.k();)B.a.q(s,r.gl())
return s},
Y(a,b){return new A.aF(a,A.f2(a,!1,b,!1,!1,""))},
fg(a,b,c){var s=J.eh(b)
if(!s.k())return a
if(c.length===0){do a+=A.c(s.gl())
while(s.k())}else{a+=A.c(s.gl())
while(s.k())a=a+c+A.c(s.gl())}return a},
i4(){return A.aU(new Error())},
hx(a,b,c,d,e,f,g,h,i){var s=A.i_(a,b,c,d,e,f,g,h,i)
if(s==null)return null
return new A.a2(A.hz(s,h,i),h,i)},
hA(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=$.h6().aW(a)
if(c!=null){s=new A.cN()
r=c.b
if(1>=r.length)return A.k(r,1)
q=r[1]
q.toString
p=A.cJ(q)
if(2>=r.length)return A.k(r,2)
q=r[2]
q.toString
o=A.cJ(q)
if(3>=r.length)return A.k(r,3)
q=r[3]
q.toString
n=A.cJ(q)
if(4>=r.length)return A.k(r,4)
m=s.$1(r[4])
if(5>=r.length)return A.k(r,5)
l=s.$1(r[5])
if(6>=r.length)return A.k(r,6)
k=s.$1(r[6])
if(7>=r.length)return A.k(r,7)
j=new A.cO().$1(r[7])
i=B.c.aQ(j,1000)
q=r.length
if(8>=q)return A.k(r,8)
h=r[8]!=null
if(h){if(9>=q)return A.k(r,9)
g=r[9]
if(g!=null){f=g==="-"?-1:1
if(10>=q)return A.k(r,10)
q=r[10]
q.toString
e=A.cJ(q)
if(11>=r.length)return A.k(r,11)
l-=f*(s.$1(r[11])+60*e)}}d=A.hx(p,o,n,m,l,k,i,j%1000,h)
if(d==null)throw A.e(A.c3("Time out of range",a))
return d}else throw A.e(A.c3("Invalid date format",a))},
hB(a){var s,r
try{s=A.hA(a)
return s}catch(r){if(A.aW(r) instanceof A.c2)return null
else throw r}},
hz(a,b,c){var s="microsecond"
if(b>999)throw A.e(A.ac(b,0,999,s,null))
if(a<-864e13||a>864e13)throw A.e(A.ac(a,-864e13,864e13,"millisecondsSinceEpoch",null))
if(a===864e13&&b!==0)throw A.e(A.ej(b,s,"Time including microseconds is outside valid range"))
A.cI(c,"isUtc",t.y)
return a},
hy(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
eZ(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
c1(a){if(a>=10)return""+a
return"0"+a},
cP(a){if(typeof a=="number"||A.eD(a)||a==null)return J.ah(a)
if(typeof a=="string")return JSON.stringify(a)
return A.fc(a)},
hD(a,b){A.cI(a,"error",t.K)
A.cI(b,"stackTrace",t.l)
A.hC(a,b)},
bW(a){return new A.bV(a)},
aY(a,b){return new A.X(!1,null,b,a)},
ej(a,b,c){return new A.X(!0,a,b,c)},
i0(a,b){return new A.bl(null,null,!0,a,b,"Value not in range")},
ac(a,b,c,d,e){return new A.bl(b,c,!0,a,d,"Invalid value")},
fe(a,b,c){if(0>a||a>c)throw A.e(A.ac(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.e(A.ac(b,a,c,"end",null))
return b}return c},
hG(a,b,c,d){return new A.c4(b,!0,a,d,"Index out of range")},
et(a){return new A.br(a)},
fj(a){return new A.cq(a)},
ds(a){return new A.bo(a)},
a1(a){return new A.c0(a)},
c3(a,b){return new A.c2(a,b)},
hK(a,b,c){var s,r
if(A.eN(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.w([],t.s)
B.a.q($.O,a)
try{A.j3(a,s)}finally{if(0>=$.O.length)return A.k($.O,-1)
$.O.pop()}r=A.fg(b,t.V.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
el(a,b,c){var s,r
if(A.eN(a))return b+"..."+c
s=new A.bp(b)
B.a.q($.O,a)
try{r=s
r.a=A.fg(r.a,a,", ")}finally{if(0>=$.O.length)return A.k($.O,-1)
$.O.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
j3(a,b){var s,r,q,p,o,n,m,l=a.gt(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.k())return
s=A.c(l.gl())
B.a.q(b,s)
k+=s.length+2;++j}if(!l.k()){if(j<=5)return
if(0>=b.length)return A.k(b,-1)
r=b.pop()
if(0>=b.length)return A.k(b,-1)
q=b.pop()}else{p=l.gl();++j
if(!l.k()){if(j<=4){B.a.q(b,A.c(p))
return}r=A.c(p)
if(0>=b.length)return A.k(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gl();++j
for(;l.k();p=o,o=n){n=l.gl();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.k(b,-1)
k-=b.pop().length+2;--j}B.a.q(b,"...")
return}}q=A.c(p)
r=A.c(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.k(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.a.q(b,m)
B.a.q(b,q)
B.a.q(b,r)},
f5(a,b,c,d,e){return new A.ak(a,b.h("@<0>").p(c).p(d).p(e).h("ak<1,2,3,4>"))},
cX(a,b,c,d,e,f,g){var s
if(B.d===c){s=J.n(a)
b=J.n(b)
return A.bq(A.r(A.r($.aX(),s),b))}if(B.d===d){s=J.n(a)
b=J.n(b)
c=J.n(c)
return A.bq(A.r(A.r(A.r($.aX(),s),b),c))}if(B.d===e){s=J.n(a)
b=J.n(b)
c=J.n(c)
d=J.n(d)
return A.bq(A.r(A.r(A.r(A.r($.aX(),s),b),c),d))}if(B.d===f){s=J.n(a)
b=J.n(b)
c=J.n(c)
d=J.n(d)
e=J.n(e)
return A.bq(A.r(A.r(A.r(A.r(A.r($.aX(),s),b),c),d),e))}if(B.d===g){s=J.n(a)
b=J.n(b)
c=J.n(c)
d=J.n(d)
e=J.n(e)
f=J.n(f)
return A.bq(A.r(A.r(A.r(A.r(A.r(A.r($.aX(),s),b),c),d),e),f))}s=J.n(a)
b=J.n(b)
c=J.n(c)
d=J.n(d)
e=J.n(e)
f=J.n(f)
g=J.n(g)
g=A.bq(A.r(A.r(A.r(A.r(A.r(A.r(A.r($.aX(),s),b),c),d),e),f),g))
return g},
a2:function a2(a,b,c){this.a=a
this.b=b
this.c=c},
cN:function cN(){},
cO:function cO(){},
dG:function dG(){},
q:function q(){},
bV:function bV(a){this.a=a},
a3:function a3(){},
X:function X(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bl:function bl(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
c4:function c4(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
br:function br(a){this.a=a},
cq:function cq(a){this.a=a},
bo:function bo(a){this.a=a},
c0:function c0(a){this.a=a},
cj:function cj(){},
bn:function bn(){},
dH:function dH(a){this.a=a},
c2:function c2(a,b){this.a=a
this.b=b},
b:function b(){},
U:function U(a,b,c){this.a=a
this.b=b
this.$ti=c},
D:function D(){},
j:function j(){},
cE:function cE(){},
bp:function bp(a){this.a=a},
cV:function cV(a){this.a=a},
aP(a){var s
if(typeof a=="function")throw A.e(A.aY("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(){return b(c)}}(A.iG,a)
s[$.eg()]=a
return s},
fE(a){var s
if(typeof a=="function")throw A.e(A.aY("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(d){return b(c,d,arguments.length)}}(A.iH,a)
s[$.eg()]=a
return s},
iG(a){return t.Z.a(a).$0()},
iH(a,b,c){t.Z.a(a)
if(A.af(c)>=1)return a.$1(b)
return a.$0()},
eP(a,b){var s=new A.F($.y,b.h("F<0>")),r=new A.bu(s,b.h("bu<0>"))
a.then(A.aT(new A.ed(r,b),1),A.aT(new A.ee(r),1))
return s},
fI(a){return a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string"||a instanceof Int8Array||a instanceof Uint8Array||a instanceof Uint8ClampedArray||a instanceof Int16Array||a instanceof Uint16Array||a instanceof Int32Array||a instanceof Uint32Array||a instanceof Float32Array||a instanceof Float64Array||a instanceof ArrayBuffer||a instanceof DataView},
fR(a){if(A.fI(a))return a
return new A.e2(new A.bz(t.dd)).$1(a)},
ed:function ed(a,b){this.a=a
this.b=b},
ee:function ee(a){this.a=a},
e2:function e2(a){this.a=a},
i5(a){return B.a.bC(B.F,new A.dt(a),new A.du())},
hn(a){var s=a.a,r=a.$ti.h("4?"),q=r.a(s.j(0,"rejection")),p=t.f.b(q)?q.K(0,t.N,t.X):B.N,o=new A.cL(),n=o.$1(r.a(s.j(0,"source"))),m=o.$1(r.a(s.j(0,"by"))),l=o.$1(r.a(s.j(0,"role")))
o.$1(r.a(s.j(0,"basis")))
return new A.bX(n,m,l,o.$1(r.a(s.j(0,"verified"))),o.$1(r.a(s.j(0,"model"))),o.$1(r.a(s.j(0,"rationale"))),o.$1(p.j(0,"by")),o.$1(p.j(0,"reason")),o.$1(p.j(0,"reviewed")))},
hr(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=a5.a,e=a5.$ti.h("4?"),d=t.f,c=t.N,b=t.X,a=d.a(e.a(f.j(0,"bands"))).K(0,c,b),a0=e.a(f.j(0,"attestation")),a1=e.a(f.j(0,"variant")),a2=A.c(e.a(f.j(0,"name"))),a3=typeof a1=="string"&&a1.length!==0?a1:null,a4=e.a(f.j(0,"group"))
a4=A.c(a4==null?"":a4)
f=A.i5(e.a(f.j(0,"status")))
e=d.b(a0)?A.hn(a0.K(0,c,b)):B.q
d=a.a
b=a.$ti.h("4?")
s=A.h2(b.a(d.j(0,"lmF")))
r=A.h2(b.a(d.j(0,"hmF")))
q=J.a0(b.a(d.j(0,"hpf")),"IN")
p=B.c.A(B.b.n(A.e4(b.a(d.j(0,"hf")))[0]),-15,15)
o=r!=null
n=!o||isNaN(r)?3000:B.b.A(r,500,15e3)
o=!o||isNaN(r)?0:B.c.A(B.b.n(A.e4(b.a(d.j(0,"hmD")))[0]),-15,15)
m=s!=null
l=!m||isNaN(s)?300:B.b.A(s,35,1000)
m=!m||isNaN(s)?0:B.c.A(B.b.n(A.e4(b.a(d.j(0,"lmD")))[0]),-15,15)
k=B.c.A(B.b.n(A.e4(b.a(d.j(0,"lf")))[0]),-15,15)
c=A.eo(c,c)
for(j=0;j<4;++j){i=B.E[j]
h=i.a
if(typeof b.a(d.j(0,h))=="string"){g=A.c(b.a(d.j(0,h)))
c.B(0,i.b,A.m(g,"-","\u2212"))}}return new A.bY(a2,a3,a4,f,e,new A.E(q,p,n,o,l,m,k),c)},
h2(a){var s,r,q,p
if(a==null||J.a0(a,"0 dB"))return null
if(typeof a=="number")return a
s=A.c(a)
if(s==="park 15k")return 15e3
r=A.Y("^\\s*[+-]?(\\d+(\\.\\d*)?|\\.\\d+)",!0).aW(s)
if(r==null)return 0/0
q=r.b
if(0>=q.length)return A.k(q,0)
q=q[0]
q.toString
p=A.fT(q)
q=A.Y("k",!1)
return q.b.test(s)?p*1000:p},
e4(a){var s,r,q
if(typeof a=="number")return A.w([a,a],t.n)
s=A.Y("[\u2212+-]?\\d+(\\.\\d+)?",!0).ag(0,A.c(a))
r=A.x(s)
r=A.f6(s,r.h("d(b.E)").a(new A.e5()),r.h("b.E"),t.i)
q=A.eq(r,A.x(r).h("b.E"))
if(q.length===0)return A.w([0,0],t.n)
s=B.a.gP(q)
return A.w([s,q.length>1?q[1]:B.a.gP(q)],t.n)},
M:function M(a,b,c){this.c=a
this.a=b
this.b=c},
dt:function dt(a){this.a=a},
du:function du(){},
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
cL:function cL(){},
bY:function bY(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
e5:function e5(){},
jB(a){var s,r,q=A.hB(a)
if(q==null)return null
s=q.bK()
r=new A.eb()
return B.f.aZ(B.c.i(A.fa(s)),4,"0")+"-"+A.c(r.$1(A.f9(s)))+"-"+A.c(r.$1(A.f8(s)))},
eb:function eb(){},
fZ(a,b){var s=Math.pow(10,b/40),r=6.283185307179586*a/96e3,q=Math.cos(r),p=Math.sin(r)/3.6,o=p*s,n=-2*q,m=p/s
return new A.ai(1+o,n,1-o,1+m,n,1-m)},
fM(a,b){var s=Math.pow(10,b/40),r=6.283185307179586*a/96e3,q=Math.sin(r)
return new A.bH(s,Math.cos(r),2*Math.sqrt(s)*(q/2*1.4142135623730951))},
ai:function ai(a,b,c,d,e,f){var _=this
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
fh(a,b,c){var s,r,q,p,o,n=t.i,m=A.ep([a,b],n),l=A.eq(B.G,n)
B.a.af(l,c)
s=l.length
r=0
for(;r<l.length;l.length===s||(0,A.a7)(l),++r){q=l[r]
if(q>=a&&q<=b)m.q(0,q)}l=b/a
p=B.b.n(Math.log(l)/0.6931471805599453*24)
n=A.hR(n)
n.af(0,m)
for(o=1;o<p;++o){q=A.h1(a*Math.pow(l,o/p))
if(m.bB(0,new A.dw(q)))n.q(0,q)}n=A.eq(n,A.x(n).c)
B.a.b5(n)
return new A.dv(n)},
h1(a){var s,r
if(a<100)s=1
else if(a<1000)s=5
else{if(a<2000)r=50
else r=a<1e4?100:500
s=r}return B.b.n(a/s)*s},
bT(a){var s,r,q
if(a<1000)return""+B.b.n(a)+" Hz"
s=a/1000
if(s===B.b.ao(s))r=""+B.b.n(s)
else{q=B.b.a0(s,2)
r=B.f.aj(q,".")?B.f.b0(q,A.Y("\\.?0+$",!0),""):q}return r+" kHz"},
a6(a){var s=A.eF(a)?a:B.b.n(a*10)/10,r=B.b.ao(s),q=Math.abs(s),p=s===r?""+B.b.n(q):A.c(q)
if(s>0)return"+"+p
if(s<0)return"\u2212"+p
return"0"},
jF(a,b){var s,r,q,p=Math.log(b/a)/0.6931471805599453,o=B.b.n(Math.abs(p)*10)/10
if(o===0)return"same frequency"
s=o===B.b.ao(o)?""+B.b.n(o):A.c(o)
r=o<=1?"octave":"octaves"
q=p>0?"higher":"lower"
return s+" "+r+" "+q},
dv:function dv(a){this.a=a},
dw:function dw(a){this.a=a},
P(a){var s=A.m(a,"&","&amp;")
s=A.m(s,"<","&lt;")
s=A.m(s,">","&gt;")
return A.m(s,'"',"&quot;")},
jD(){var s=v.G
new A.dx(A.p(A.f(s.document).getElementById("mode")),A.p(A.f(s.document).getElementById("modeLabel"))).aq()
if(A.p(A.f(s.document).getElementById("sim-body"))==null)return
A.hT().M()},
hT(){var s,r=v.G,q=A.p(A.f(r.document).getElementById("sim-loading"))
q.toString
s=A.p(A.f(r.document).getElementById("sim-loading-text"))
s.toString
r=A.p(A.f(r.document).getElementById("sim-retry"))
r.toString
r=new A.cS(q,s,r)
r.b8()
return r},
i3(a1,a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=v.G,a0=A.p(A.f(a.document).getElementById("sim-channel"))
a0.toString
s=A.p(A.f(a.document).getElementById("sim-trust"))
s.toString
r=A.p(A.f(a.document).getElementById("sim-plot"))
r.toString
q=A.p(A.f(a.document).getElementById("sim-curve"))
q.toString
p=A.p(A.f(a.document).getElementById("sim-legend-start"))
p.toString
o=A.p(A.f(a.document).getElementById("sim-summary"))
o.toString
n=A.p(A.f(a.document).getElementById("sim-changed"))
n.toString
m=A.p(A.f(a.document).getElementById("sim-reset"))
m.toString
l=A.p(A.f(a.document).getElementById("hpf"))
l.toString
k=A.p(A.f(a.document).getElementById("hpf-state"))
k.toString
j=A.p(A.f(a.document).getElementById("hf-gain"))
j.toString
i=A.p(A.f(a.document).getElementById("lf-gain"))
i.toString
h=A.p(A.f(a.document).getElementById("hm-freq"))
h.toString
g=A.p(A.f(a.document).getElementById("hm-gain"))
g.toString
f=A.p(A.f(a.document).getElementById("lm-freq"))
f.toString
a=A.p(A.f(a.document).getElementById("lm-gain"))
a.toString
e=t.n
d=A.w([],e)
for(c=a1.length,b=0;b<a1.length;a1.length===c||(0,A.a7)(a1),++b)d.push(a1[b].f.e)
d=A.fh(35,1000,d)
e=A.w([],e)
for(c=a1.length,b=0;b<a1.length;a1.length===c||(0,A.a7)(a1),++b)e.push(a1[b].f.c)
return new A.d0(a1,a2,d,A.fh(500,15e3,e),A.eo(t.N,t.E),a0,s,r,q,p,o,n,m,l,k,j,i,h,g,f,a)},
cS:function cS(a,b,c){this.a=a
this.b=b
this.c=c},
cT:function cT(a){this.a=a},
d0:function d0(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1){var _=this
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
df:function df(a){this.a=a},
dg:function dg(a){this.a=a},
dq:function dq(a){this.a=a},
dr:function dr(a,b,c){this.a=a
this.b=b
this.c=c},
dh:function dh(){},
di:function di(a){this.a=a},
dj:function dj(){},
dk:function dk(a){this.a=a},
dl:function dl(){},
dm:function dm(){},
dn:function dn(a){this.a=a},
dp:function dp(a,b){this.a=a
this.b=b},
de:function de(a,b){this.a=a
this.b=b},
dd:function dd(){},
d4:function d4(a){this.a=a},
d5:function d5(a){this.a=a},
d2:function d2(){},
d3:function d3(a,b,c){this.a=a
this.b=b
this.c=c},
d1:function d1(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
d6:function d6(){},
d8:function d8(a){this.a=a},
d9:function d9(a){this.a=a},
da:function da(a,b){this.a=a
this.b=b},
d7:function d7(){},
dc:function dc(){},
db:function db(a,b){this.a=a
this.b=b},
dx:function dx(a,b){this.a=a
this.b=b},
dy:function dy(a){this.a=a},
dz:function dz(a){this.a=a},
h3(a){return v.mangledGlobalNames[a]},
jL(a){throw A.C(new A.b9("Field '"+a+"' has been assigned during initialization."),new Error())},
J(){throw A.C(A.hQ(""),new Error())}},B={}
var w=[A,J,B]
var $={}
A.em.prototype={}
J.c5.prototype={
C(a,b){return a===b},
gu(a){return A.bk(a)},
i(a){return"Instance of '"+A.cl(a)+"'"},
gv(a){return A.ay(A.eC(this))}}
J.c7.prototype={
i(a){return String(a)},
gu(a){return a?519018:218159},
gv(a){return A.ay(t.y)},
$il:1,
$ia_:1}
J.b4.prototype={
C(a,b){return null==b},
i(a){return"null"},
gu(a){return 0},
$il:1}
J.b6.prototype={$iu:1}
J.ab.prototype={
gu(a){return 0},
i(a){return String(a)}}
J.ck.prototype={}
J.ar.prototype={}
J.aa.prototype={
i(a){var s=a[$.h5()]
if(s==null)s=a[$.eg()]
if(s==null)return this.b7(a)
return"JavaScript function for "+J.ah(s)},
$ial:1}
J.b5.prototype={
gu(a){return 0},
i(a){return String(a)}}
J.b7.prototype={
gu(a){return 0},
i(a){return String(a)}}
J.t.prototype={
q(a,b){A.aw(a).c.a(b)
a.$flags&1&&A.ef(a,29)
a.push(b)},
af(a,b){A.aw(a).h("b<1>").a(b)
a.$flags&1&&A.ef(a,"addAll",2)
this.bb(a,b)
return},
bb(a,b){var s,r
t.b.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.e(A.a1(a))
for(r=0;r<s;++r)a.push(b[r])},
L(a,b){var s,r=A.f4(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.B(r,s,A.c(a[s]))
return r.join(b)},
aY(a){return this.L(a,"")},
bC(a,b,c){var s,r,q,p=A.aw(a)
p.h("a_(1)").a(b)
p.h("1()?").a(c)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.e(A.a1(a))}p=c.$0()
return p},
gP(a){if(a.length>0)return a[0]
throw A.e(A.f_())},
gbF(a){var s=a.length
if(s>0)return a[s-1]
throw A.e(A.f_())},
b5(a){var s,r,q,p,o,n
a.$flags&2&&A.ef(a,"sort")
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
p=J.f0(r,q)
if(typeof p!=="number")return p.b4()
if(p>0){a[0]=q
a[1]=r}return}o=0
if(A.aw(a).c.b(null))for(n=0;n<a.length;++n)if(a[n]===void 0){a[n]=null;++o}a.sort(A.aT(J.iS(),2))
if(o>0)this.bm(a,o)},
bm(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
i(a){return A.el(a,"[","]")},
gt(a){return new J.aZ(a,a.length,A.aw(a).h("aZ<1>"))},
gu(a){return A.bk(a)},
gm(a){return a.length},
B(a,b,c){A.aw(a).c.a(c)
a.$flags&2&&A.ef(a)
if(!(b>=0&&b<a.length))throw A.e(A.fS(a,b))
a[b]=c},
$ii:1,
$ib:1,
$io:1}
J.c6.prototype={
bL(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.cl(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.cQ.prototype={}
J.aZ.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.a7(q)
throw A.e(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iz:1}
J.aE.prototype={
F(a,b){var s
A.fz(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.ga_(b)
if(this.ga_(a)===s)return 0
if(this.ga_(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
ga_(a){return a===0?1/a<0:a<0},
n(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.e(A.et(""+a+".round()"))},
ao(a){if(a<0)return-Math.round(-a)
else return Math.round(a)},
A(a,b,c){if(B.c.F(b,c)>0)throw A.e(A.fO(b))
if(this.F(a,b)<0)return b
if(this.F(a,c)>0)return c
return a},
a0(a,b){var s
if(b>20)throw A.e(A.ac(b,0,20,"fractionDigits",null))
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
ar(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
aQ(a,b){return(a|0)===a?a/b|0:this.br(a,b)},
br(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.e(A.et("Result of truncating division is "+A.c(s)+": "+A.c(a)+" ~/ "+b))},
bp(a,b){var s
if(a>0)s=this.bo(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
bo(a,b){return b>31?0:a>>>b},
gv(a){return A.ay(t.o)},
$iS:1,
$id:1,
$iG:1}
J.b3.prototype={
gv(a){return A.ay(t.S)},
$il:1,
$ia:1}
J.c8.prototype={
gv(a){return A.ay(t.i)},
$il:1}
J.a9.prototype={
Y(a,b,c){var s=b.length
if(c>s)throw A.e(A.ac(c,0,s,null,null))
return new A.cC(b,a,c)},
ag(a,b){return this.Y(a,b,0)},
b0(a,b,c){return A.jK(a,b,c,0)},
b6(a,b,c){return a.substring(b,A.fe(b,c,a.length))},
b3(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(0>=o)return A.k(p,0)
if(p.charCodeAt(0)===133){s=J.hO(p,1)
if(s===o)return""}else s=0
r=o-1
if(!(r>=0))return A.k(p,r)
q=p.charCodeAt(r)===133?J.hP(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
au(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.e(B.y)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
aZ(a,b,c){var s=b-a.length
if(s<=0)return a
return this.au(c,s)+a},
aj(a,b){return A.jG(a,b,0)},
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
gv(a){return A.ay(t.N)},
gm(a){return a.length},
$il:1,
$iS:1,
$icY:1,
$ih:1}
A.aK.prototype={
gt(a){var s=this.a
return new A.b_(s.gt(s),A.x(this).h("b_<1,2>"))},
gm(a){var s=this.a
return s.gm(s)},
i(a){return this.a.i(0)}}
A.b_.prototype={
k(){return this.a.k()},
gl(){return this.$ti.y[1].a(this.a.gl())},
$iz:1}
A.aj.prototype={}
A.bv.prototype={$ii:1}
A.ak.prototype={
K(a,b,c){return new A.ak(this.a,this.$ti.h("@<1,2>").p(b).p(c).h("ak<1,2,3,4>"))},
j(a,b){return this.$ti.h("4?").a(this.a.j(0,b))},
G(a,b){this.a.G(0,new A.cM(this,this.$ti.h("~(3,4)").a(b)))},
gI(){var s=this.$ti
return A.hq(this.a.gI(),s.c,s.y[2])},
gm(a){var s=this.a
return s.gm(s)}}
A.cM.prototype={
$2(a,b){var s=this.a.$ti
s.c.a(a)
s.y[1].a(b)
this.b.$2(s.y[2].a(a),s.y[3].a(b))},
$S(){return this.a.$ti.h("~(1,2)")}}
A.b9.prototype={
i(a){return"LateInitializationError: "+this.a}}
A.cZ.prototype={}
A.i.prototype={}
A.bd.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s,r=this,q=r.a,p=J.eK(q),o=p.gm(q)
if(r.b!==o)throw A.e(A.a1(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.bA(q,s);++r.c
return!0},
$iz:1}
A.ap.prototype={
gt(a){var s=this.a
return new A.be(s.gt(s),this.b,A.x(this).h("be<1,2>"))},
gm(a){var s=this.a
return s.gm(s)}}
A.b1.prototype={$ii:1}
A.be.prototype={
k(){var s=this,r=s.b
if(r.k()){s.a=s.c.$1(r.gl())
return!0}s.a=null
return!1},
gl(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iz:1}
A.bs.prototype={
gt(a){return new A.bt(J.eh(this.a),this.$ti.h("bt<1>"))}}
A.bt.prototype={
k(){var s,r
for(s=this.a,r=this.$ti.c;s.k();)if(r.b(s.gl()))return!0
return!1},
gl(){return this.$ti.c.a(this.a.gl())},
$iz:1}
A.H.prototype={}
A.a5.prototype={$r:"+(1,2)",$s:1}
A.bH.prototype={$r:"+(1,2,3)",$s:2}
A.aC.prototype={
K(a,b,c){var s=A.x(this)
return A.f5(this,s.c,s.y[1],b,c)},
i(a){return A.er(this)},
$iT:1}
A.b0.prototype={
gm(a){return this.b.length},
gaL(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
ak(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
j(a,b){if(!this.ak(b))return null
return this.b[this.a[b]]},
G(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gaL()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
gI(){return new A.bA(this.gaL(),this.$ti.h("bA<1>"))}}
A.bA.prototype={
gm(a){return this.a.length},
gt(a){var s=this.a
return new A.bB(s,s.length,this.$ti.h("bB<1>"))}}
A.bB.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iz:1}
A.aD.prototype={
U(){var s=this,r=s.$map
if(r==null){r=new A.b8(s.$ti.h("b8<1,2>"))
A.jq(s.a,r)
s.$map=r}return r},
j(a,b){return this.U().j(0,b)},
G(a,b){this.$ti.h("~(1,2)").a(b)
this.U().G(0,b)},
gI(){var s=this.U()
return new A.ao(s,A.x(s).h("ao<1>"))},
gm(a){return this.U().a}}
A.bm.prototype={}
A.dA.prototype={
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
A.bj.prototype={
i(a){return"Null check operator used on a null value"}}
A.c9.prototype={
i(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.cr.prototype={
i(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.cW.prototype={
i(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.b2.prototype={}
A.bJ.prototype={
i(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$iad:1}
A.a8.prototype={
i(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.h4(r==null?"unknown":r)+"'"},
$ial:1,
gbN(){return this},
$C:"$1",
$R:1,
$D:null}
A.bZ.prototype={$C:"$0",$R:0}
A.c_.prototype={$C:"$2",$R:2}
A.cp.prototype={}
A.cn.prototype={
i(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.h4(s)+"'"}}
A.aB.prototype={
C(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.aB))return!1
return this.$_target===b.$_target&&this.a===b.a},
gu(a){return(A.cK(this.a)^A.bk(this.$_target))>>>0},
i(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.cl(this.a)+"'")}}
A.cm.prototype={
i(a){return"RuntimeError: "+this.a}}
A.an.prototype={
gm(a){return this.a},
gI(){return new A.ao(this,A.x(this).h("ao<1>"))},
j(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.bE(b)},
bE(a){var s,r,q=this.d
if(q==null)return null
s=this.bl(q,a)
r=this.am(s,a)
if(r<0)return null
return s[r].b},
B(a,b,c){var s,r,q,p,o,n,m=this,l=A.x(m)
l.c.a(b)
l.y[1].a(c)
if(typeof b=="string"){s=m.b
m.av(s==null?m.b=m.ac():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=m.c
m.av(r==null?m.c=m.ac():r,b,c)}else{q=m.d
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
if(r!==q.r)throw A.e(A.a1(q))
s=s.c}},
av(a,b,c){var s,r=A.x(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.ad(b,c)
else s.b=c},
ad(a,b){var s=this,r=A.x(s),q=new A.cR(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else s.f=s.f.c=q;++s.a
s.r=s.r+1&1073741823
return q},
al(a){return J.n(a)&1073741823},
bl(a,b){return a[this.al(b)]},
am(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.a0(a[r].a,b))return r
return-1},
i(a){return A.er(this)},
ac(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s}}
A.cR.prototype={}
A.ao.prototype={
gm(a){return this.a.a},
gt(a){var s=this.a
return new A.bc(s,s.r,s.e,this.$ti.h("bc<1>"))}}
A.bc.prototype={
gl(){return this.d},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.e(A.a1(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iz:1}
A.ba.prototype={
gm(a){return this.a.a},
gt(a){var s=this.a
return new A.bb(s,s.r,s.e,this.$ti.h("bb<1,2>"))}}
A.bb.prototype={
gl(){var s=this.d
s.toString
return s},
k(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.e(A.a1(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.U(s.a,s.b,r.$ti.h("U<1,2>"))
r.c=s.c
return!0}},
$iz:1}
A.b8.prototype={
al(a){return A.jm(a)&1073741823},
am(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.a0(a[r].a,b))return r
return-1}}
A.e7.prototype={
$1(a){return this.a(a)},
$S:11}
A.e8.prototype={
$2(a,b){return this.a(a,b)},
$S:19}
A.e9.prototype={
$1(a){return this.a(A.I(a))},
$S:12}
A.Z.prototype={
i(a){return this.aT(!1)},
aT(a){var s,r,q,p,o,n=this.bi(),m=this.ab(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.k(m,q)
o=m[q]
l=a?l+A.fc(o):l+A.c(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
bi(){var s,r=this.$s
while($.dT.length<=r)B.a.q($.dT,null)
s=$.dT[r]
if(s==null){s=this.be()
B.a.B($.dT,r,s)}return s},
be(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=A.w(new Array(l),t.G)
for(s=0;s<l;++s)k[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.B(k,q,r[s])}}k=A.hS(k,!1,t.K)
k.$flags=3
return k}}
A.aM.prototype={
ab(){return[this.a,this.b]},
C(a,b){if(b==null)return!1
return b instanceof A.aM&&this.$s===b.$s&&J.a0(this.a,b.a)&&J.a0(this.b,b.b)},
gu(a){return A.cX(this.$s,this.a,this.b,B.d,B.d,B.d,B.d)}}
A.aN.prototype={
ab(){return[this.a,this.b,this.c]},
C(a,b){var s=this
if(b==null)return!1
return b instanceof A.aN&&s.$s===b.$s&&J.a0(s.a,b.a)&&J.a0(s.b,b.b)&&J.a0(s.c,b.c)},
gu(a){var s=this
return A.cX(s.$s,s.a,s.b,s.c,B.d,B.d,B.d)}}
A.aF.prototype={
i(a){return"RegExp/"+this.a+"/"+this.b.flags},
gaM(){var s=this,r=s.c
if(r!=null)return r
r=s.b
return s.c=A.f2(s.a,r.multiline,!r.ignoreCase,r.unicode,r.dotAll,"g")},
aW(a){var s=this.b.exec(a)
if(s==null)return null
return new A.bC(s)},
Y(a,b,c){var s=b.length
if(c>s)throw A.e(A.ac(c,0,s,null,null))
return new A.cs(this,b,c)},
ag(a,b){return this.Y(0,b,0)},
aJ(a,b){var s,r=this.gaM()
if(r==null)r=A.aO(r)
r.lastIndex=b
s=r.exec(a)
if(s==null)return null
return new A.bC(s)},
$icY:1,
$ii1:1}
A.bC.prototype={
ga1(){return this.b.index},
gO(){var s=this.b
return s.index+s[0].length},
$iaG:1,
$iaq:1}
A.cs.prototype={
gt(a){return new A.ct(this.a,this.b,this.c)}}
A.ct.prototype={
gl(){var s=this.d
return s==null?t.d.a(s):s},
k(){var s,r,q,p,o,n,m=this,l=m.b
if(l==null)return!1
s=m.c
r=l.length
if(s<=r){q=m.a
p=q.aJ(l,s)
if(p!=null){m.d=p
o=p.gO()
if(p.b.index===o){s=!1
if(q.b.unicode){q=m.c
n=q+1
if(n<r){if(!(q>=0&&q<r))return A.k(l,q)
q=l.charCodeAt(q)
if(q>=55296&&q<=56319){if(!(n>=0))return A.k(l,n)
s=l.charCodeAt(n)
s=s>=56320&&s<=57343}}}o=(s?o+1:o)+1}m.c=o
return!0}}m.b=m.d=null
return!1},
$iz:1}
A.co.prototype={
gO(){return this.a+this.c.length},
$iaG:1,
ga1(){return this.a}}
A.cC.prototype={
gt(a){return new A.cD(this.a,this.b,this.c)}}
A.cD.prototype={
k(){var s,r,q=this,p=q.c,o=q.b,n=o.length,m=q.a,l=m.length
if(p+n>l){q.d=null
return!1}s=m.indexOf(o,p)
if(s<0){q.c=l+1
q.d=null
return!1}r=s+n
q.d=new A.co(s,o)
q.c=r===q.c?r+1:r
return!0},
gl(){var s=this.d
s.toString
return s},
$iz:1}
A.aH.prototype={
gv(a){return B.T},
$il:1}
A.bh.prototype={}
A.ca.prototype={
gv(a){return B.U},
$il:1}
A.aI.prototype={
gm(a){return a.length},
$iK:1}
A.bf.prototype={$ii:1,$ib:1,$io:1}
A.bg.prototype={$ii:1,$ib:1,$io:1}
A.cb.prototype={
gv(a){return B.V},
$il:1}
A.cc.prototype={
gv(a){return B.W},
$il:1}
A.cd.prototype={
gv(a){return B.X},
$il:1}
A.ce.prototype={
gv(a){return B.Y},
$il:1}
A.cf.prototype={
gv(a){return B.Z},
$il:1}
A.cg.prototype={
gv(a){return B.a0},
$il:1}
A.ch.prototype={
gv(a){return B.a1},
$il:1}
A.bi.prototype={
gv(a){return B.a2},
gm(a){return a.length},
$il:1}
A.ci.prototype={
gv(a){return B.a3},
gm(a){return a.length},
$il:1}
A.bD.prototype={}
A.bE.prototype={}
A.bF.prototype={}
A.bG.prototype={}
A.V.prototype={
h(a){return A.bO(v.typeUniverse,this,a)},
p(a){return A.fw(v.typeUniverse,this,a)}}
A.cy.prototype={}
A.cF.prototype={
i(a){return A.N(this.a,null)}}
A.cx.prototype={
i(a){return this.a}}
A.bK.prototype={$ia3:1}
A.dD.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:6}
A.dC.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:21}
A.dE.prototype={
$0(){this.a.$0()},
$S:3}
A.dF.prototype={
$0(){this.a.$0()},
$S:3}
A.dV.prototype={
b9(a,b){if(self.setTimeout!=null)self.setTimeout(A.aT(new A.dW(this,b),0),a)
else throw A.e(A.et("`setTimeout()` not found."))}}
A.dW.prototype={
$0(){this.b.$0()},
$S:0}
A.cu.prototype={
ah(a){var s,r=this,q=r.$ti
q.h("1/?").a(a)
if(a==null)a=q.c.a(a)
if(!r.b)r.a.aw(a)
else{s=r.a
if(q.h("am<1>").b(a))s.aA(a)
else s.aF(a)}},
ai(a,b){var s=this.a
if(this.b)s.a6(new A.Q(a,b))
else s.a4(new A.Q(a,b))}}
A.dZ.prototype={
$1(a){return this.a.$2(0,a)},
$S:4}
A.e_.prototype={
$2(a,b){this.a.$2(1,new A.b2(a,t.l.a(b)))},
$S:22}
A.e1.prototype={
$2(a,b){this.a(A.af(a),b)},
$S:9}
A.Q.prototype={
i(a){return A.c(this.a)},
$iq:1,
gN(){return this.b}}
A.cw.prototype={
ai(a,b){var s=this.a
if((s.a&30)!==0)throw A.e(A.ds("Future already completed"))
s.a4(A.iR(a,b))},
aU(a){return this.ai(a,null)}}
A.bu.prototype={
ah(a){var s,r=this.$ti
r.h("1/?").a(a)
s=this.a
if((s.a&30)!==0)throw A.e(A.ds("Future already completed"))
s.aw(r.h("1/").a(a))}}
A.as.prototype={
bG(a){if((this.c&15)!==6)return!0
return this.b.b.ap(t.bG.a(this.d),a.a,t.y,t.K)},
bD(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.Q.b(q))p=l.bI(q,m,a.b,o,n,t.l)
else p=l.ap(t.v.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.c.b(A.aW(s))){if((r.c&1)!==0)throw A.e(A.aY("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.e(A.aY("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.F.prototype={
b2(a,b,c){var s,r,q=this.$ti
q.p(c).h("1/(2)").a(a)
s=$.y
if(s===B.e){if(!t.Q.b(b)&&!t.v.b(b))throw A.e(A.ej(b,"onError",u.c))}else{c.h("@<0/>").p(q.c).h("1(2)").a(a)
b=A.j7(b,s)}r=new A.F(s,c.h("F<0>"))
this.a2(new A.as(r,3,a,b,q.h("@<1>").p(c).h("as<1,2>")))
return r},
aR(a,b,c){var s,r=this.$ti
r.p(c).h("1/(2)").a(a)
s=new A.F($.y,c.h("F<0>"))
this.a2(new A.as(s,19,a,b,r.h("@<1>").p(c).h("as<1,2>")))
return s},
bn(a){this.a=this.a&1|16
this.c=a},
S(a){this.a=a.a&30|this.a&1
this.c=a.c},
a2(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t._.a(r.c)
if((s.a&24)===0){s.a2(a)
return}r.S(s)}A.cH(null,null,r.b,t.M.a(new A.dI(r,a)))}},
aN(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t._.a(m.c)
if((n.a&24)===0){n.aN(a)
return}m.S(n)}l.a=m.W(a)
A.cH(null,null,m.b,t.M.a(new A.dM(l,m)))}},
V(){var s=t.F.a(this.c)
this.c=null
return this.W(s)},
W(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
aF(a){var s,r=this
r.$ti.c.a(a)
s=r.V()
r.a=8
r.c=a
A.aL(r,s)},
bd(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.V()
q.S(a)
A.aL(q,r)},
a6(a){var s=this.V()
this.bn(a)
A.aL(this,s)},
aw(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("am<1>").b(a)){this.aA(a)
return}this.bc(a)},
bc(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.cH(null,null,s.b,t.M.a(new A.dK(s,a)))},
aA(a){A.eu(this.$ti.h("am<1>").a(a),this,!1)
return},
a4(a){this.a^=2
A.cH(null,null,this.b,t.M.a(new A.dJ(this,a)))},
$iam:1}
A.dI.prototype={
$0(){A.aL(this.a,this.b)},
$S:0}
A.dM.prototype={
$0(){A.aL(this.b,this.a.a)},
$S:0}
A.dL.prototype={
$0(){A.eu(this.a.a,this.b,!0)},
$S:0}
A.dK.prototype={
$0(){this.a.aF(this.b)},
$S:0}
A.dJ.prototype={
$0(){this.a.a6(this.b)},
$S:0}
A.dP.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.bH(t.bd.a(q.d),t.z)}catch(p){s=A.aW(p)
r=A.aU(p)
if(k.c&&t.t.a(k.b.a.c).a===s){q=k.a
q.c=t.t.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.ek(q)
n=k.a
n.c=new A.Q(q,o)
q=n}q.b=!0
return}if(j instanceof A.F&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.t.a(j.c)
q.b=!0}return}if(j instanceof A.F){m=k.b.a
l=new A.F(m.b,m.$ti)
j.b2(new A.dQ(l,m),new A.dR(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:0}
A.dQ.prototype={
$1(a){this.a.bd(this.b)},
$S:6}
A.dR.prototype={
$2(a,b){A.aO(a)
t.l.a(b)
this.a.a6(new A.Q(a,b))},
$S:10}
A.dO.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.ap(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.aW(l)
r=A.aU(l)
q=s
p=r
if(p==null)p=A.ek(q)
o=this.a
o.c=new A.Q(q,p)
o.b=!0}},
$S:0}
A.dN.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.t.a(l.a.a.c)
p=l.b
if(p.a.bG(s)&&p.a.e!=null){p.c=p.a.bD(s)
p.b=!1}}catch(o){r=A.aW(o)
q=A.aU(o)
p=t.t.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.ek(p)
m=l.b
m.c=new A.Q(p,n)
p=m}p.b=!0}},
$S:0}
A.cv.prototype={}
A.cB.prototype={}
A.bP.prototype={$ifk:1}
A.cA.prototype={
bJ(a){var s,r,q
t.M.a(a)
try{if(B.e===$.y){a.$0()
return}A.fJ(null,null,this,a,t.H)}catch(q){s=A.aW(q)
r=A.aU(q)
A.eG(A.aO(s),t.l.a(r))}},
bt(a){return new A.dU(this,t.M.a(a))},
bH(a,b){b.h("0()").a(a)
if($.y===B.e)return a.$0()
return A.fJ(null,null,this,a,b)},
ap(a,b,c,d){c.h("@<0>").p(d).h("1(2)").a(a)
d.a(b)
if($.y===B.e)return a.$1(b)
return A.j9(null,null,this,a,b,c,d)},
bI(a,b,c,d,e,f){d.h("@<0>").p(e).p(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.y===B.e)return a.$2(b,c)
return A.j8(null,null,this,a,b,c,d,e,f)},
b_(a,b,c,d){return b.h("@<0>").p(c).p(d).h("1(2,3)").a(a)}}
A.dU.prototype={
$0(){return this.a.bJ(this.b)},
$S:0}
A.e0.prototype={
$0(){A.hD(this.a,this.b)},
$S:0}
A.bw.prototype={
gm(a){return this.a},
gI(){return new A.bx(this,this.$ti.h("bx<1>"))},
ak(a){var s,r
if(typeof a=="string"&&a!=="__proto__"){s=this.b
return s==null?!1:s[a]!=null}else if(typeof a=="number"&&(a&1073741823)===a){r=this.c
return r==null?!1:r[a]!=null}else return this.bg(a)},
bg(a){var s=this.d
if(s==null)return!1
return this.J(this.aE(s,a),a)>=0},
j(a,b){var s,r,q
if(typeof b=="string"&&b!=="__proto__"){s=this.b
r=s==null?null:A.fm(s,b)
return r}else if(typeof b=="number"&&(b&1073741823)===b){q=this.c
r=q==null?null:A.fm(q,b)
return r}else return this.bk(b)},
bk(a){var s,r,q=this.d
if(q==null)return null
s=this.aE(q,a)
r=this.J(s,a)
return r<0?null:s[r+1]},
B(a,b,c){var s,r,q,p,o,n,m=this,l=m.$ti
l.c.a(b)
l.y[1].a(c)
if(typeof b=="string"&&b!=="__proto__"){s=m.b
m.aD(s==null?m.b=A.ev():s,b,c)}else if(typeof b=="number"&&(b&1073741823)===b){r=m.c
m.aD(r==null?m.c=A.ev():r,b,c)}else{q=m.d
if(q==null)q=m.d=A.ev()
p=A.cK(b)&1073741823
o=q[p]
if(o==null){A.ew(q,p,[b,c]);++m.a
m.e=null}else{n=m.J(o,b)
if(n>=0)o[n+1]=c
else{o.push(b,c);++m.a
m.e=null}}}},
G(a,b){var s,r,q,p,o,n,m=this,l=m.$ti
l.h("~(1,2)").a(b)
s=m.aH()
for(r=s.length,q=l.c,l=l.y[1],p=0;p<r;++p){o=s[p]
q.a(o)
n=m.j(0,o)
b.$2(o,n==null?l.a(n):n)
if(s!==m.e)throw A.e(A.a1(m))}},
aH(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.e
if(h!=null)return h
h=A.f4(i.a,null,!1,t.z)
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
aD(a,b,c){var s=this.$ti
s.c.a(b)
s.y[1].a(c)
if(a[b]==null){++this.a
this.e=null}A.ew(a,b,c)},
aE(a,b){return a[A.cK(b)&1073741823]}}
A.bz.prototype={
J(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;r+=2){q=a[r]
if(q==null?b==null:q===b)return r}return-1}}
A.bx.prototype={
gm(a){return this.a.a},
gt(a){var s=this.a
return new A.by(s,s.aH(),this.$ti.h("by<1>"))}}
A.by.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.b,q=s.c,p=s.a
if(r!==p.e)throw A.e(A.a1(p))
else if(q>=r.length){s.d=null
return!1}else{s.d=r[q]
s.c=q+1
return!0}},
$iz:1}
A.at.prototype={
gt(a){var s=this,r=new A.au(s,s.r,A.x(s).h("au<1>"))
r.c=s.e
return r},
gm(a){return this.a},
aj(a,b){var s
if((b&1073741823)===b){s=this.c
if(s==null)return!1
return t.L.a(s[b])!=null}else return this.bf(b)},
bf(a){var s=this.d
if(s==null)return!1
return this.J(s[this.aG(a)],a)>=0},
q(a,b){var s,r,q=this
A.x(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.aC(s==null?q.b=A.ex():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.aC(r==null?q.c=A.ex():r,b)}else return q.ba(b)},
ba(a){var s,r,q,p=this
A.x(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.ex()
r=p.aG(a)
q=s[r]
if(q==null)s[r]=[p.a5(a)]
else{if(p.J(q,a)>=0)return!1
q.push(p.a5(a))}return!0},
aC(a,b){A.x(this).c.a(b)
if(t.L.a(a[b])!=null)return!1
a[b]=this.a5(b)
return!0},
a5(a){var s=this,r=new A.cz(A.x(s).c.a(a))
if(s.e==null)s.e=s.f=r
else s.f=s.f.b=r;++s.a
s.r=s.r+1&1073741823
return r},
aG(a){return J.n(a)&1073741823},
J(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.a0(a[r].a,b))return r
return-1},
$if3:1}
A.cz.prototype={}
A.au.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
k(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.e(A.a1(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iz:1}
A.v.prototype={
gt(a){return new A.bd(a,a.length,A.bU(a).h("bd<v.E>"))},
bA(a,b){if(!(b<a.length))return A.k(a,b)
return a[b]},
i(a){return A.el(a,"[","]")}}
A.A.prototype={
K(a,b,c){var s=A.x(this)
return A.f5(this,s.h("A.K"),s.h("A.V"),b,c)},
G(a,b){var s,r,q,p=A.x(this)
p.h("~(A.K,A.V)").a(b)
for(s=this.gI(),s=s.gt(s),p=p.h("A.V");s.k();){r=s.gl()
q=this.j(0,r)
b.$2(r,q==null?p.a(q):q)}},
gm(a){var s=this.gI()
return s.gm(s)},
i(a){return A.er(this)},
$iT:1}
A.cU.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.c(a)
r.a=(r.a+=s)+": "
s=A.c(b)
r.a+=s},
$S:8}
A.aJ.prototype={
af(a,b){var s,r,q
A.x(this).h("b<1>").a(b)
for(s=A.fn(b,b.r,A.x(b).c),r=s.$ti.c;s.k();){q=s.d
this.q(0,q==null?r.a(q):q)}},
i(a){return A.el(this,"{","}")},
bB(a,b){var s,r,q=A.x(this)
q.h("a_(1)").a(b)
for(q=A.fn(this,this.r,q.c),s=q.$ti.c;q.k();){r=q.d
if(!b.$1(r==null?s.a(r):r))return!1}return!0},
$ii:1,
$ib:1,
$id_:1}
A.bI.prototype={}
A.a2.prototype={
C(a,b){if(b==null)return!1
return b instanceof A.a2&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gu(a){return A.cX(this.a,this.b,B.d,B.d,B.d,B.d,B.d)},
F(a,b){var s
t.k.a(b)
s=B.c.F(this.a,b.a)
if(s!==0)return s
return B.c.F(this.b,b.b)},
bK(){var s=this
if(s.c)return new A.a2(s.a,s.b,!1)
return s},
i(a){var s=this,r=A.hy(A.fa(s)),q=A.c1(A.f9(s)),p=A.c1(A.f8(s)),o=A.c1(A.hV(s)),n=A.c1(A.hX(s)),m=A.c1(A.hY(s)),l=A.eZ(A.hW(s)),k=s.b,j=k===0?"":A.eZ(k)
k=r+"-"+q
if(s.c)return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j},
$iS:1}
A.cN.prototype={
$1(a){if(a==null)return 0
return A.cJ(a)},
$S:7}
A.cO.prototype={
$1(a){var s,r,q
if(a==null)return 0
for(s=a.length,r=0,q=0;q<6;++q){r*=10
if(q<s){if(!(q<s))return A.k(a,q)
r+=a.charCodeAt(q)^48}}return r},
$S:7}
A.dG.prototype={
i(a){return this.bh()}}
A.q.prototype={
gN(){return A.hU(this)}}
A.bV.prototype={
i(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.cP(s)
return"Assertion failed"}}
A.a3.prototype={}
A.X.prototype={
ga9(){return"Invalid argument"+(!this.a?"(s)":"")},
ga8(){return""},
i(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+p,n=s.ga9()+q+o
if(!s.a)return n
return n+s.ga8()+": "+A.cP(s.gan())},
gan(){return this.b}}
A.bl.prototype={
gan(){return A.fA(this.b)},
ga9(){return"RangeError"},
ga8(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.c(q):""
else if(q==null)s=": Not greater than or equal to "+A.c(r)
else if(q>r)s=": Not in inclusive range "+A.c(r)+".."+A.c(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.c(r)
return s}}
A.c4.prototype={
gan(){return A.af(this.b)},
ga9(){return"RangeError"},
ga8(){if(A.af(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gm(a){return this.f}}
A.br.prototype={
i(a){return"Unsupported operation: "+this.a}}
A.cq.prototype={
i(a){return"UnimplementedError: "+this.a}}
A.bo.prototype={
i(a){return"Bad state: "+this.a}}
A.c0.prototype={
i(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.cP(s)+"."}}
A.cj.prototype={
i(a){return"Out of Memory"},
gN(){return null},
$iq:1}
A.bn.prototype={
i(a){return"Stack Overflow"},
gN(){return null},
$iq:1}
A.dH.prototype={
i(a){return"Exception: "+this.a}}
A.c2.prototype={
i(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException",q=this.b
if(typeof q=="string"){if(q.length>78)q=B.f.b6(q,0,75)+"..."
return r+"\n"+q}else return r}}
A.b.prototype={
L(a,b){var s,r,q=this.gt(this)
if(!q.k())return""
s=J.ah(q.gl())
if(!q.k())return s
if(b.length===0){r=s
do r+=J.ah(q.gl())
while(q.k())}else{r=s
do r=r+b+J.ah(q.gl())
while(q.k())}return r.charCodeAt(0)==0?r:r},
gm(a){var s,r=this.gt(this)
for(s=0;r.k();)++s
return s},
i(a){return A.hK(this,"(",")")}}
A.U.prototype={
i(a){return"MapEntry("+A.c(this.a)+": "+A.c(this.b)+")"}}
A.D.prototype={
gu(a){return A.j.prototype.gu.call(this,0)},
i(a){return"null"}}
A.j.prototype={$ij:1,
C(a,b){return this===b},
gu(a){return A.bk(this)},
i(a){return"Instance of '"+A.cl(this)+"'"},
gv(a){return A.jt(this)},
toString(){return this.i(this)}}
A.cE.prototype={
i(a){return""},
$iad:1}
A.bp.prototype={
gm(a){return this.a.length},
i(a){var s=this.a
return s.charCodeAt(0)==0?s:s}}
A.cV.prototype={
i(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.ed.prototype={
$1(a){return this.a.ah(this.b.h("0/?").a(a))},
$S:4}
A.ee.prototype={
$1(a){if(a==null)return this.a.aU(new A.cV(a===undefined))
return this.a.aU(a)},
$S:4}
A.e2.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(A.fI(a))return a
s=this.a
a.toString
if(s.ak(a))return s.j(0,a)
if(a instanceof Date){r=a.getTime()
if(r<-864e13||r>864e13)A.eR(A.ac(r,-864e13,864e13,"millisecondsSinceEpoch",null))
A.cI(!0,"isUtc",t.y)
return new A.a2(r,0,!0)}if(a instanceof RegExp)throw A.e(A.aY("structured clone of RegExp",null))
if(a instanceof Promise)return A.eP(a,t.X)
q=Object.getPrototypeOf(a)
if(q===Object.prototype||q===null){p=t.X
o=A.eo(p,p)
s.B(0,a,o)
n=Object.keys(a)
m=[]
for(s=n.length,l=0;l<n.length;n.length===s||(0,A.a7)(n),++l)m.push(A.fR(n[l]))
for(k=0;k<n.length;++k){j=n[k]
if(!(k<m.length))return A.k(m,k)
i=m[k]
if(j!=null)o.B(0,i,this.$1(a[j]))}return o}if(a instanceof Array){h=a
o=[]
s.B(0,a,o)
g=A.af(a.length)
for(k=0;k<g;++k){if(!(k<h.length))return A.k(h,k)
o.push(this.$1(h[k]))}return o}return a},
$S:13}
A.M.prototype={
bh(){return"Status."+this.b}}
A.dt.prototype={
$1(a){return t.D.a(a).b===this.a},
$S:14}
A.du.prototype={
$0(){return B.h},
$S:15}
A.bX.prototype={}
A.cL.prototype={
$1(a){return typeof a=="string"&&B.f.b3(a).length!==0?a:null},
$S:16}
A.bY.prototype={
gZ(){var s=this.b,r=this.a
return s==null?r:r+" ("+s+")"},
gR(){var s=this.gZ(),r=A.Y("[^a-z0-9]+",!0)
s=A.m(s.toLowerCase(),r,"-")
r=A.Y("^-+|-+$",!0)
return A.m(s,r,"")}}
A.e5.prototype={
$1(a){var s=t.d.a(a).b
if(0>=s.length)return A.k(s,0)
s=s[0]
s.toString
return A.fT(A.m(s,"\u2212","-"))},
$S:17}
A.eb.prototype={
$1(a){return B.f.aZ(B.c.i(a),2,"0")},
$S:18}
A.ai.prototype={}
A.E.prototype={
H(a,b,c,d,e,f,g){var s=this,r=d==null?s.a:d,q=B.c.A(B.c.n(a==null?s.b:a),-15,15),p=B.b.A(c==null?s.c:c,500,15e3),o=B.c.A(B.c.n(b==null?s.d:b),-15,15),n=B.b.A(g==null?s.e:g,35,1000),m=B.c.A(B.c.n(f==null?s.f:f),-15,15)
return new A.E(r,q,p,o,n,m,B.c.A(B.c.n(e==null?s.r:e),-15,15))},
aV(a){var s=null
return this.H(s,s,s,a,s,s,s)},
bx(a){var s=null
return this.H(s,s,s,s,a,s,s)},
by(a){var s=null
return this.H(s,s,s,s,s,a,s)},
bz(a){var s=null
return this.H(s,s,s,s,s,s,a)},
bv(a){var s=null
return this.H(s,a,s,s,s,s,s)},
bw(a){var s=null
return this.H(s,s,a,s,s,s,s)},
bu(a){var s=null
return this.H(a,s,s,s,s,s,s)},
E(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=this,a4=A.w([],t.q)
if(a3.a){s=Math.cos(0.005235987755982988)
r=Math.sin(0.005235987755982988)/1.4142
q=1+s
p=q/2
a4.push(new A.ai(p,-q,p,1+r,-2*s,1-r))}q=a3.r
if(q!==0){o=A.fM(80,q)
n=o.a
s=o.b
m=o.c
q=n+1
p=n-1
l=p*s
k=q-l
j=q*s
l=q+l
a4.push(new A.ai(n*(k+m),2*n*(p-j),n*(k-m),l+m,-2*(p+j),l-m))}q=a3.f
if(q!==0)a4.push(A.fZ(a3.e,q))
q=a3.d
if(q!==0)a4.push(A.fZ(a3.c,q))
q=a3.b
if(q!==0){o=A.fM(12e3,q)
n=o.a
s=o.b
m=o.c
q=n+1
p=n-1
l=p*s
k=q+l
j=q*s
l=q-l
a4.push(new A.ai(n*(k+m),-2*n*(p+j),n*(k-m),l+m,2*(p-j),l-m))}q=a4.length
i=6.283185307179586*a5/96e3
p=2*i
h=0
g=0
for(;g<a4.length;a4.length===q||(0,A.a7)(a4),++g){f=a4[g]
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
return A.cX(s.a,s.b,s.c,s.d,s.e,s.f,s.r)}}
A.dv.prototype={
aX(a,b){var s,r,q,p,o
for(s=this.a,r=0,q=1/0,p=0;p<s.length;++p){o=Math.abs(Math.log(s[p]/b))
if(o<q){q=o
r=p}}return r}}
A.dw.prototype={
$1(a){return Math.abs(Math.log(this.a/A.eB(a))/0.6931471805599453)>0.020833333333333332},
$S:20}
A.cS.prototype={
b8(){this.c.addEventListener("click",A.aP(new A.cT(this)))},
M(){var s=0,r=A.j4(t.H),q=1,p=[],o=this,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$M=A.ji(function(a2,a3){if(a2===1){p.push(a3)
s=q}for(;;)switch(s){case 0:q=3
i=v.G
s=6
return A.fB(A.eP(A.f(i.fetch("api/channels.json")),t.m),$async$M)
case 6:n=a3
if(!A.eA(n.ok)){l=A.ds("status")
throw A.e(l)}h=t.X
g=t.f
a0=g
a1=A
s=7
return A.fB(A.eP(A.f(n.json()),h),$async$M)
case 7:m=a0.a(a1.fR(a3))
l=A.w([],t.J)
for(f=t.j.a(J.eT(m,"channels")),e=f.length,d=t.N,c=0;c<f.length;f.length===e||(0,A.a7)(f),++c){k=f[c]
J.hi(l,A.hr(g.a(k).K(0,d,h)))}j=l
if(J.ei(j)===0){l=A.ds("empty")
throw A.e(l)}o.a.hidden=!0
l=A.p(A.f(i.document).getElementById("sim-body"))
l.toString
l.hidden=!1
l=J.eT(m,"generated")
A.i3(j,A.c(l==null?"":l)).aq()
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
case 5:return A.iD(null,r)
case 1:return A.iC(p.at(-1),r)}})
return A.iE($async$M,r)}}
A.cT.prototype={
$0(){var s=this.a
s.c.hidden=!0
s.b.textContent="Loading the channels\u2026"
s.M()},
$S:3}
A.d0.prototype={
aq(){var s,r,q,p,o,n=this,m={}
n.bj()
s=v.G
r=A.p(A.f(s.document).getElementById("lm-freq-ticks"))
r.toString
q=n.c
p=t.i
n.aS(r,q,B.C,A.ep([35,250,1000],p))
r=A.p(A.f(s.document).getElementById("hm-freq-ticks"))
r.toString
o=n.d
n.aS(r,o,B.J,A.ep([500,1000,4000,15e3],p))
p=n.dx
p.setAttribute("max",""+(q.a.length-1))
q=n.cy
q.setAttribute("max",""+(o.a.length-1))
n.w.addEventListener("change",A.aP(new A.df(n)))
n.ay.addEventListener("click",A.aP(new A.dg(n)))
o=new A.dq(n)
o.$2(n.CW,new A.dh())
o.$2(q,new A.di(n))
o.$2(n.db,new A.dj())
o.$2(p,new A.dk(n))
o.$2(n.dy,new A.dl())
o.$2(n.cx,new A.dm())
n.ax.addEventListener("click",A.aP(new A.dn(n)))
m.a=!1
A.f(s.window).addEventListener("resize",A.aP(new A.dp(m,n)))
s=n.az(B.f.b0(A.I(A.f(A.f(s.window).location).hash),"#",""))
n.aB(s==null?B.a.gP(n.a):s,!1)},
az(a){var s,r,q,p,o,n
for(s=this.a,r=s.length,q=0;q<s.length;s.length===r||(0,A.a7)(s),++q){p=s[q]
o=p.b
n=p.a
o=o==null?n:n+" ("+o+")"
n=A.Y("[^a-z0-9]+",!0)
o=A.m(o.toLowerCase(),n,"-")
n=A.Y("^-+|-+$",!0)
if(A.m(o,n,"")===a)return p}return null},
bj(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f="&amp;",e="&lt;",d="&gt;",c="&quot;"
for(s=this.a,r=s.length,q=null,p=0,o="";p<s.length;s.length===r||(0,A.a7)(s),++p){n=s[p]
m=n.c
if(m!==q){if(q!=null)o+="</optgroup>"
l=A.m(m,"&",f)
l=A.m(l,"<",e)
l=A.m(l,">",d)
o+='<optgroup label="'+A.m(l,'"',c)+'">'
q=m}l=n.d
k=l===B.j?"":" \u2014 "+l.c
l=n.b
j=l==null
i=n.a
h=j?i:i+" ("+l+")"
g=A.Y("[^a-z0-9]+",!0)
h=A.m(h.toLowerCase(),g,"-")
g=A.Y("^-+|-+$",!0)
h=A.m(h,g,"")
h=A.m(h,"&",f)
h=A.m(h,"<",e)
h=A.m(h,">",d)
h=A.m(h,'"',c)
l=j?i:i+" ("+l+")"
l=A.m(l,"&",f)
l=A.m(l,"<",e)
l=A.m(l,">",d)
l=A.m(l,'"',c)
j=A.m(k,"&",f)
j=A.m(j,"<",e)
j=A.m(j,">",d)
o+='<option value="'+h+'">'+l+A.m(j,'"',c)+"</option>"}s=q!=null?o+"</optgroup>":o
this.w.innerHTML=s.charCodeAt(0)==0?s:s},
aS(a,b,c,d){var s,r,q,p,o,n,m
t.w.a(c)
t.a.a(d)
s=A.w([],t.s)
for(r=b.a,q=0;q<7;++q){p=c[q]
o=d.aj(0,p)?"":"minor"
n=B.b.a0(Math.log(p/B.a.gP(r))/Math.log(B.a.gbF(r)/B.a.gP(r)),4)
m=p<1000?""+B.c.n(p):""+B.b.n(p/1000)+"k"
m=A.m(m,"&","&amp;")
m=A.m(m,"<","&lt;")
m=A.m(m,">","&gt;")
s.push('<span class="'+o+'" style="--p:'+n+'">'+A.m(m,'"',"&quot;")+"</span>")}a.innerHTML=B.a.aY(s)},
aB(a,b){var s,r,q=this
q.f=a
q.w.value=a.gR()
s=q.e.j(0,a.gR())
r=v.G
A.f(A.f(r.window).history).replaceState(null,"",A.I(A.f(A.f(r.window).location).pathname)+A.I(A.f(A.f(r.window).location).search)+"#"+a.gR())
q.bs()
q.Q.textContent="Starting point \xb7 "+a.d.c
r=s==null
q.aO(r?a.f:s,!0)
if(!b)r=q.a7()
else r=!r&&!s.C(0,a.f)?a.gZ()+": your earlier changes are back. "+q.a7():a.gZ()+": at the starting point."
q.at.textContent=r},
aO(a,b){var s,r,q,p,o,n,m,l,k,j,i=this
i.r=a
s=i.f
s===$&&A.J()
i.e.B(0,s.gR(),a)
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
i.aK(i.cy,"hm-freq-out",i.d,m)
s=s.e
i.aK(i.dx,"lm-freq-out",i.c,s)
l=r.b
k=A.a6(l)
q=l===q?null:A.a6(q-l)+" dB"
i.X("hf-was","Start "+(k+" dB"),q)
q=r.r
k=A.a6(q)
q=q===o?null:A.a6(o-q)+" dB"
i.X("lf-was","Start "+(k+" dB"),q)
i.aP("hm-was",r.c,r.d,m,p)
i.aP("lm-was",r.e,r.f,s,n)
i.aI()
if(!b){j=i.a7()
s=i.at
if(A.I(s.textContent)!==j)s.textContent=j}},
ae(a){return this.aO(a,!1)},
bs(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f="a practitioner",e=this.f
e===$&&A.J()
s=e.e
r=new A.bs(A.w([s.b,s.c],t.r),t.ab).L(0,", ")
q=A.jB(this.b)
p=q==null?"":" Status as of "+q+"."
o=e.d
switch(o.a){case 0:n=A.P(r.length===0?f:r)
m=s.e
l="Signed by "+n+", checked "+A.P(m==null?"":m)+". A starting point to work from; the room still decides."
break
case 2:n=A.P(r.length===0?f:r)
m=s.e
l="Signed by "+n+" on "+A.P(m==null?"an earlier date":m)+", but its shelf life has run out. Re-check it in a room before you work from it."
break
case 1:if(s.a==="model"){n=s.f
n="A model"+(n==null?"":" ("+A.P(n)+")")+" proposed these values."}else n="These values are proposed."
l=n+" No practitioner has checked them at a console. Treat the starting point as a guess to test at soundcheck."
break
case 3:n=s.w
k=n==null?"A practitioner":A.P(n)
n=s.y
j=n==null?"":" on "+A.P(n)
n=s.x
i=n==null?"":": "+A.P(n)
l=k+" turned these values down"+j+i+" They are loaded so you can see what was tried. Don\u2019t work from them."
break
default:l=null}if(o===B.h&&s.r!=null){n=s.r
n.toString
h='<details class="sim-why"><summary>Why it was proposed</summary><p>'+A.P(n)+"</p></details>"}else h=""
e=e.r
if(e.a===0)g=""
else{n=A.x(e).h("ba<1,2>")
g='<p class="sim-range">This record gives a range for '+A.f6(new A.ba(e,n),n.h("h(b.E)").a(new A.dd()),n.h("b.E"),t.N).L(0," and ")+". The starting point uses the low end, as the channel list draws it.</p>"}e=this.x
e.setAttribute("style","--edge:"+A.c(B.M.j(0,o)))
e.setAttribute("data-status",o.b)
e.innerHTML='<span class="mark">'+A.c(B.L.j(0,o))+o.c+"</span><p>"+A.c(l)+A.P(p)+"</p>"+h+g},
a7(){var s,r,q,p,o=this.r
o===$&&A.J()
s=this.f
s===$&&A.J()
r=s.f
s=A.w([],t.s)
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
a.setAttribute("aria-valuetext",A.a6(c)+" dB")
s=(c+15)/30*100
a.setAttribute("style","--a:"+A.c(Math.min(50,s))+"%;--b:"+A.c(Math.max(50,s))+"%")
r=A.p(A.f(v.G.document).getElementById(b))
r.toString
r.innerHTML=A.a6(c)+'<span class="u">\u2009dB</span>'},
aK(a,b,c,d){var s,r,q,p,o=""+c.aX(0,d)
if(A.I(a.value)!==o)a.value=o
a.setAttribute("aria-valuetext",A.bT(d))
a.setAttribute("style","--a:0%;--b:"+B.b.a0(c.aX(0,d)/(c.a.length-1)*100,2)+"%")
s=A.bT(d).split(" ")
r=s.length
if(0>=r)return A.k(s,0)
q=s[0]
if(1>=r)return A.k(s,1)
p=s[1]
r=A.p(A.f(v.G.document).getElementById(b))
r.toString
r.innerHTML=q+'<span class="u">\u2009'+p+"</span>"},
aP(a,b,c,d,e){var s=c===0,r=s?"Start flat, 0 dB":"Start "+A.bT(b)+", "+(A.a6(c)+" dB"),q=A.w([],t.s)
if(e!==c)q.push(A.a6(e-c)+" dB")
if(!s&&e!==0&&d!==b)q.push(A.jF(b,d))
this.X(a,r,q.length===0?null:B.a.L(q,", "))},
X(a,b,c){var s=c==null?'<span class="same">same as start</span>':'<span class="delta"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M5 1 9 5 5 9 1 5z"/></svg>Changed: '+A.P(c)+"</span>",r=A.p(A.f(v.G.document).getElementById(a))
r.toString
r.innerHTML='<span class="start">'+A.P(b)+"</span> "+s},
aI(){var s,r,q,p,o,n,m,l,k,j,i=this,h='<text class="ax" x="',g=Math.max(220,A.af(i.y.clientWidth)),f=g<600?140:200,e=B.b.A(g*0.48,f,320),d=g-40-10,c=e-10-28,b=new A.d4(d),a=new A.d5(c),a0=new A.d2(),a1=new A.d3(a0,b,a),a2=new A.bp("")
a2.a='<defs><clipPath id="sim-clip"><rect x="40" y="10" width="'+A.c(a0.$1(d))+'" height="'+A.c(a0.$1(c))+'"/></clipPath></defs>'
for(f=10+c,s=0;s<26;++s){r=B.I[s]
q=r===100||r===1000||r===1e4?"g-major":"g-minor"
q='<line class="'+q+'" x1="'+A.c(a0.$1(b.$1(r)))+'" x2="'+A.c(a0.$1(b.$1(r)))+'" y1="10" y2="'+A.c(a0.$1(f))+'"/>'
a2.a+=q}p=d<420?B.D:B.K
for(f=p.length,q=e-8,s=0;s<f;++s){r=p[s]
o=r<1000?""+B.c.n(r):""+B.b.n(r/1000)+"k"
n=h+A.c(a0.$1(b.$1(r)))+'" y="'+A.c(a0.$1(q))+'" text-anchor="middle">'+o+"</text>"
a2.a+=n}f=h+A.c(a0.$1(34))+'" y="'+A.c(a0.$1(q))+'" text-anchor="end">Hz</text>'
a2.a+=f
for(f=!(c>=180),q=40+d,s=0;s<7;++s){m=B.H[s]
n=m===0?"g-zero":"g-minor"
n='<line class="'+n+'" x1="40" x2="'+A.c(a0.$1(q))+'" y1="'+A.c(a0.$1(a.$1(m)))+'" y2="'+A.c(a0.$1(a.$1(m)))+'"/>'
a2.a+=n
if(!f||B.c.ar(m,10)===0){n=A.c(a0.$1(34))
l=a.$1(m)
if(typeof l!=="number")return l.bM()
l=h+n+'" y="'+A.c(a0.$1(l+5))+'" text-anchor="end">'+A.a6(B.c.n(m))+"</text>"
a2.a+=l}}f=i.r
f===$&&A.J()
k=a1.$1(f)
f=i.f
f===$&&A.J()
j=a1.$1(f.f)
a2.a+='<g clip-path="url(#sim-clip)">'
q='<path class="c-area" d="'+k+"L"+A.c(a0.$1(q))+","+A.c(a0.$1(a.$1(0)))+"L40,"+A.c(a0.$1(a.$1(0)))+'Z"/>'
q=(a2.a+=q)+('<path class="c-start" d="'+j+'"/>')
a2.a=q
a2.a=q+('<path class="c-live" d="'+k+'"/>')
q=new A.d1(i,a2,a0,b,a)
if(i.r.a)q.$2("hpf",80)
if(i.r.r!==0)q.$2("lf",50)
f=i.r
if(f.f!==0)q.$2("lm",f.e)
f=i.r
if(f.d!==0)q.$2("hm",f.c)
if(i.r.b!==0)q.$2("hf",12e3)
a2.a+="</g>"
f=i.z
f.setAttribute("viewBox","0 0 "+A.c(a0.$1(g))+" "+A.c(a0.$1(e)))
f.setAttribute("width",a0.$1(g))
f.setAttribute("height",a0.$1(e))
q=a2.a
f.innerHTML=q.charCodeAt(0)==0?q:q
i.bq()},
aa(a){var s,r,q,p,o,n,m,l,k,j,i
t.e.a(a)
s=new A.d6()
for(r=0,q=1;q<=160;++q){p=a.$1(s.$1(q))
o=a.$1(s.$1(r))
if(typeof p!=="number")return p.b4()
if(typeof o!=="number")return A.fX(o)
if(p>o)r=q}n=Math.max(0,r-1)
m=Math.min(160,r+1)
for(l=0;l<40;++l){p=(m-n)/3
k=n+p
j=m-p
p=a.$1(s.$1(k))
o=a.$1(s.$1(j))
if(typeof p!=="number")return p.bO()
if(typeof o!=="number")return A.fX(o)
if(p<o)n=k
else m=j}i=s.$1((n+m)/2)
return new A.a5(a.$1(i),i)},
bq(){var s,r,q,p,o,n,m,l,k=this,j=k.r
j===$&&A.J()
s=j.aV(!1)
j=k.f
j===$&&A.J()
r=j.f
q=k.aa(new A.d8(s))
p=k.aa(new A.d9(s))
o=k.aa(new A.da(k,r))
j=new A.d7()
n=new A.dc()
m=n.$2("Biggest EQ boost",q.a<0.05?"None":j.$2(q,s.gb1()))
l=n.$2("Biggest EQ cut",p.a<0.05?"None":j.$2(p,s.gb1()))
k.as.innerHTML=B.a.aY(A.w([m,l,n.$2("Furthest from the start",o.a<0.05?"Same as the start":j.$2(o,new A.db(k,r)))],t.s))}}
A.df.prototype={
$0(){var s=this.a,r=s.az(A.I(s.w.value))
r.toString
return s.aB(r,!0)},
$S:0}
A.dg.prototype={
$0(){var s=this.a,r=s.r
r===$&&A.J()
return s.ae(r.aV(!r.a))},
$S:0}
A.dq.prototype={
$2(a,b){a.addEventListener("input",A.aP(new A.dr(this.a,t.x.a(b),a)))},
$S:33}
A.dr.prototype={
$0(){var s,r=this.a,q=r.r
q===$&&A.J()
s=A.fb(A.I(this.c.value),null)
if(s==null)s=0
return r.ae(this.b.$2(q,s))},
$S:0}
A.dh.prototype={
$2(a,b){return a.bu(b)},
$S:2}
A.di.prototype={
$2(a,b){var s=this.a.d.a,r=B.c.A(b,0,s.length-1)
if(!(r>=0&&r<s.length))return A.k(s,r)
return a.bw(s[r])},
$S:2}
A.dj.prototype={
$2(a,b){return a.bv(b)},
$S:2}
A.dk.prototype={
$2(a,b){var s=this.a.c.a,r=B.c.A(b,0,s.length-1)
if(!(r>=0&&r<s.length))return A.k(s,r)
return a.bz(s[r])},
$S:2}
A.dl.prototype={
$2(a,b){return a.by(b)},
$S:2}
A.dm.prototype={
$2(a,b){return a.bx(b)},
$S:2}
A.dn.prototype={
$0(){var s,r,q=this.a,p=q.r
p===$&&A.J()
s=q.f
s===$&&A.J()
r=p.C(0,s.f)
q.ae(q.f.f)
p=r?"Already at the starting point.":"Back at the starting point for "+q.f.gZ()+"."
q.at.textContent=p},
$S:3}
A.dp.prototype={
$0(){var s=this.a
if(s.a)return
s.a=!0
A.af(v.G.requestAnimationFrame(A.fE(new A.de(s,this.b))))},
$S:3}
A.de.prototype={
$1(a){A.eB(a)
this.a.a=!1
this.b.aI()},
$S:23}
A.dd.prototype={
$1(a){t.W.a(a)
return a.a+" ("+A.P(a.b)+")"},
$S:24}
A.d4.prototype={
$1(a){return 40+Math.log(a/20)/Math.log(1000)*this.a},
$S:1}
A.d5.prototype={
$1(a){return 10+(1-(B.b.A(a,-22,22)+18)/36)*this.a},
$S:1}
A.d2.prototype={
$1(a){return B.b.a0(a,1)},
$S:25}
A.d3.prototype={
$1(a){var s,r,q,p,o,n=A.w([],t.s)
for(s=this.a,r=this.b,q=this.c,p=0;p<=180;++p){o=20*Math.pow(1000,p/180)
B.a.q(n,A.c(s.$1(r.$1(o)))+","+A.c(s.$1(q.$1(a.E(o)))))}return"M"+B.a.L(n,"L")},
$S:26}
A.d1.prototype={
$2(a,b){var s=this,r=s.b,q=s.c,p=A.c(q.$1(s.d.$1(b))),o=s.a.r
o===$&&A.J()
o='<circle class="c-dot '+a+'" cx="'+p+'" cy="'+A.c(q.$1(s.e.$1(o.E(b))))+'" r="5"/>'
r.a+=o
return null},
$S:27}
A.d6.prototype={
$1(a){return 25*Math.pow(640,a/160)},
$S:28}
A.d8.prototype={
$1(a){return this.a.E(a)},
$S:1}
A.d9.prototype={
$1(a){return-this.a.E(a)},
$S:1}
A.da.prototype={
$1(a){var s=this.a.r
s===$&&A.J()
return Math.abs(s.E(a)-this.b.E(a))},
$S:1}
A.d7.prototype={
$2(a,b){var s,r,q
t.e.a(b)
s=a.b
if(s<=25.25)r="at "+A.bT(25)+" and below"
else r=s>=15840?"at "+A.bT(16e3)+" and above":"at "+A.bT(A.h1(s))
q=b.$1(s)
if(typeof q!=="number")return q.au()
return A.a6(B.b.n(q*10)/10)+" dB "+r},
$S:29}
A.dc.prototype={
$2(a,b){return"<div><dt>"+a+"</dt><dd>"+A.P(b)+"</dd></div>"},
$S:30}
A.db.prototype={
$1(a){var s=this.a.r
s===$&&A.J()
return s.E(a)-this.b.E(a)},
$S:1}
A.dx.prototype={
aq(){var s,r,q=this,p=q.a
if(p==null)return
s=v.G
r=A.cG(A.f(A.f(s.document).documentElement).getAttribute("data-mode"))
q.a3(r==null?"dark":r)
p.addEventListener("click",A.aP(new A.dy(q)))
A.f(A.f(s.window).matchMedia("(prefers-color-scheme: light)")).addEventListener("change",A.fE(new A.dz(q)))},
a3(a){var s,r
A.f(A.f(v.G.document).documentElement).setAttribute("data-mode",a)
s=a==="dark"?"light":"dark"
r=this.b
if(r!=null)r.textContent="Switch to "+s
r=this.a
if(r!=null)r.setAttribute("aria-label","Switch to "+s+" theme")}}
A.dy.prototype={
$0(){var s,r=v.G,q=A.cG(A.f(A.f(r.document).documentElement).getAttribute("data-mode"))==="dark"?"light":"dark"
try{A.f(A.f(r.window).localStorage).setItem("eq-sop-theme",q)}catch(s){}this.a.a3(q)},
$S:3}
A.dz.prototype={
$1(a){var s,r,q
A.f(a)
s=null
try{s=A.cG(A.f(A.f(v.G.window).localStorage).getItem("eq-sop-theme"))}catch(r){}if(s==null){q=A.eA(A.f(A.f(v.G.window).matchMedia("(prefers-color-scheme: light)")).matches)?"light":"dark"
this.a.a3(q)}},
$S:31};(function aliases(){var s=J.ab.prototype
s.b7=s.i})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._static_1,q=hunkHelpers._static_0,p=hunkHelpers._instance_1u
s(J,"iS","f0",32)
r(A,"jj","ib",5)
r(A,"jk","ic",5)
r(A,"jl","id",5)
q(A,"fP","jd",0)
p(A.E.prototype,"gb1","E",1)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.j,null)
q(A.j,[A.em,J.c5,A.bm,J.aZ,A.b,A.b_,A.A,A.a8,A.q,A.cZ,A.bd,A.be,A.bt,A.H,A.Z,A.aC,A.bB,A.dA,A.cW,A.b2,A.bJ,A.cR,A.bc,A.bb,A.aF,A.bC,A.ct,A.co,A.cD,A.V,A.cy,A.cF,A.dV,A.cu,A.Q,A.cw,A.as,A.F,A.cv,A.cB,A.bP,A.by,A.aJ,A.cz,A.au,A.v,A.a2,A.dG,A.cj,A.bn,A.dH,A.c2,A.U,A.D,A.cE,A.bp,A.cV,A.bX,A.bY,A.ai,A.E,A.dv,A.cS,A.d0,A.dx])
q(J.c5,[J.c7,J.b4,J.b6,J.b5,J.b7,J.aE,J.a9])
q(J.b6,[J.ab,J.t,A.aH,A.bh])
q(J.ab,[J.ck,J.ar,J.aa])
r(J.c6,A.bm)
r(J.cQ,J.t)
q(J.aE,[J.b3,J.c8])
q(A.b,[A.aK,A.i,A.ap,A.bs,A.bA,A.cs,A.cC])
r(A.aj,A.aK)
r(A.bv,A.aj)
q(A.A,[A.ak,A.an,A.bw])
q(A.a8,[A.c_,A.bZ,A.cp,A.e7,A.e9,A.dD,A.dC,A.dZ,A.dQ,A.cN,A.cO,A.ed,A.ee,A.e2,A.dt,A.cL,A.e5,A.eb,A.dw,A.de,A.dd,A.d4,A.d5,A.d2,A.d3,A.d6,A.d8,A.d9,A.da,A.db,A.dz])
q(A.c_,[A.cM,A.e8,A.e_,A.e1,A.dR,A.cU,A.dq,A.dh,A.di,A.dj,A.dk,A.dl,A.dm,A.d1,A.d7,A.dc])
q(A.q,[A.b9,A.a3,A.c9,A.cr,A.cm,A.cx,A.bV,A.X,A.br,A.cq,A.bo,A.c0])
r(A.b1,A.ap)
q(A.Z,[A.aM,A.aN])
r(A.a5,A.aM)
r(A.bH,A.aN)
q(A.aC,[A.b0,A.aD])
r(A.bj,A.a3)
q(A.cp,[A.cn,A.aB])
q(A.i,[A.ao,A.ba,A.bx])
r(A.b8,A.an)
q(A.bh,[A.ca,A.aI])
q(A.aI,[A.bD,A.bF])
r(A.bE,A.bD)
r(A.bf,A.bE)
r(A.bG,A.bF)
r(A.bg,A.bG)
q(A.bf,[A.cb,A.cc])
q(A.bg,[A.cd,A.ce,A.cf,A.cg,A.ch,A.bi,A.ci])
r(A.bK,A.cx)
q(A.bZ,[A.dE,A.dF,A.dW,A.dI,A.dM,A.dL,A.dK,A.dJ,A.dP,A.dO,A.dN,A.dU,A.e0,A.du,A.cT,A.df,A.dg,A.dr,A.dn,A.dp,A.dy])
r(A.bu,A.cw)
r(A.cA,A.bP)
r(A.bz,A.bw)
r(A.bI,A.aJ)
r(A.at,A.bI)
q(A.X,[A.bl,A.c4])
r(A.M,A.dG)
s(A.bD,A.v)
s(A.bE,A.H)
s(A.bF,A.v)
s(A.bG,A.H)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{a:"int",d:"double",G:"num",h:"String",a_:"bool",D:"Null",o:"List",j:"Object",T:"Map",u:"JSObject"},mangledNames:{},types:["~()","d(d)","E(E,a)","D()","~(@)","~(~())","D(@)","a(h?)","~(j?,j?)","~(a,@)","D(j,ad)","@(@)","@(h)","j?(j?)","a_(M)","M()","h?(j?)","d(aq)","h(a)","@(@,h)","a_(d)","D(~())","D(@,ad)","D(d)","h(U<h,h>)","h(d)","h(E)","~(h,d)","d(G)","h(+(d,d),d(d))","h(h,h)","D(u)","a(@,@)","~(u,E(E,a))"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.a5&&a.b(c.a)&&b.b(c.b),"3;":(a,b,c)=>d=>d instanceof A.bH&&a.b(d.a)&&b.b(d.b)&&c.b(d.c)}}
A.iv(v.typeUniverse,JSON.parse('{"ck":"ab","ar":"ab","aa":"ab","jS":"aH","c7":{"a_":[],"l":[]},"b4":{"l":[]},"b6":{"u":[]},"ab":{"u":[]},"t":{"o":["1"],"i":["1"],"u":[],"b":["1"]},"c6":{"bm":[]},"cQ":{"t":["1"],"o":["1"],"i":["1"],"u":[],"b":["1"]},"aZ":{"z":["1"]},"aE":{"d":[],"G":[],"S":["G"]},"b3":{"d":[],"a":[],"G":[],"S":["G"],"l":[]},"c8":{"d":[],"G":[],"S":["G"],"l":[]},"a9":{"h":[],"S":["h"],"cY":[],"l":[]},"aK":{"b":["2"]},"b_":{"z":["2"]},"aj":{"aK":["1","2"],"b":["2"],"b.E":"2"},"bv":{"aj":["1","2"],"aK":["1","2"],"i":["2"],"b":["2"],"b.E":"2"},"ak":{"A":["3","4"],"T":["3","4"],"A.K":"3","A.V":"4"},"b9":{"q":[]},"i":{"b":["1"]},"bd":{"z":["1"]},"ap":{"b":["2"],"b.E":"2"},"b1":{"ap":["1","2"],"i":["2"],"b":["2"],"b.E":"2"},"be":{"z":["2"]},"bs":{"b":["1"],"b.E":"1"},"bt":{"z":["1"]},"a5":{"aM":[],"Z":[]},"bH":{"aN":[],"Z":[]},"aC":{"T":["1","2"]},"b0":{"aC":["1","2"],"T":["1","2"]},"bA":{"b":["1"],"b.E":"1"},"bB":{"z":["1"]},"aD":{"aC":["1","2"],"T":["1","2"]},"bj":{"a3":[],"q":[]},"c9":{"q":[]},"cr":{"q":[]},"bJ":{"ad":[]},"a8":{"al":[]},"bZ":{"al":[]},"c_":{"al":[]},"cp":{"al":[]},"cn":{"al":[]},"aB":{"al":[]},"cm":{"q":[]},"an":{"A":["1","2"],"T":["1","2"],"A.K":"1","A.V":"2"},"ao":{"i":["1"],"b":["1"],"b.E":"1"},"bc":{"z":["1"]},"ba":{"i":["U<1,2>"],"b":["U<1,2>"],"b.E":"U<1,2>"},"bb":{"z":["U<1,2>"]},"b8":{"an":["1","2"],"A":["1","2"],"T":["1","2"],"A.K":"1","A.V":"2"},"aM":{"Z":[]},"aN":{"Z":[]},"aF":{"i1":[],"cY":[]},"bC":{"aq":[],"aG":[]},"cs":{"b":["aq"],"b.E":"aq"},"ct":{"z":["aq"]},"co":{"aG":[]},"cC":{"b":["aG"],"b.E":"aG"},"cD":{"z":["aG"]},"aH":{"u":[],"l":[]},"bh":{"u":[]},"ca":{"u":[],"l":[]},"aI":{"K":["1"],"u":[]},"bf":{"v":["d"],"o":["d"],"K":["d"],"i":["d"],"u":[],"b":["d"],"H":["d"]},"bg":{"v":["a"],"o":["a"],"K":["a"],"i":["a"],"u":[],"b":["a"],"H":["a"]},"cb":{"v":["d"],"o":["d"],"K":["d"],"i":["d"],"u":[],"b":["d"],"H":["d"],"l":[],"v.E":"d"},"cc":{"v":["d"],"o":["d"],"K":["d"],"i":["d"],"u":[],"b":["d"],"H":["d"],"l":[],"v.E":"d"},"cd":{"v":["a"],"o":["a"],"K":["a"],"i":["a"],"u":[],"b":["a"],"H":["a"],"l":[],"v.E":"a"},"ce":{"v":["a"],"o":["a"],"K":["a"],"i":["a"],"u":[],"b":["a"],"H":["a"],"l":[],"v.E":"a"},"cf":{"v":["a"],"o":["a"],"K":["a"],"i":["a"],"u":[],"b":["a"],"H":["a"],"l":[],"v.E":"a"},"cg":{"v":["a"],"o":["a"],"K":["a"],"i":["a"],"u":[],"b":["a"],"H":["a"],"l":[],"v.E":"a"},"ch":{"v":["a"],"o":["a"],"K":["a"],"i":["a"],"u":[],"b":["a"],"H":["a"],"l":[],"v.E":"a"},"bi":{"v":["a"],"o":["a"],"K":["a"],"i":["a"],"u":[],"b":["a"],"H":["a"],"l":[],"v.E":"a"},"ci":{"v":["a"],"o":["a"],"K":["a"],"i":["a"],"u":[],"b":["a"],"H":["a"],"l":[],"v.E":"a"},"cx":{"q":[]},"bK":{"a3":[],"q":[]},"Q":{"q":[]},"bu":{"cw":["1"]},"F":{"am":["1"]},"bP":{"fk":[]},"cA":{"bP":[],"fk":[]},"bw":{"A":["1","2"],"T":["1","2"]},"bz":{"bw":["1","2"],"A":["1","2"],"T":["1","2"],"A.K":"1","A.V":"2"},"bx":{"i":["1"],"b":["1"],"b.E":"1"},"by":{"z":["1"]},"at":{"aJ":["1"],"f3":["1"],"d_":["1"],"i":["1"],"b":["1"]},"au":{"z":["1"]},"A":{"T":["1","2"]},"aJ":{"d_":["1"],"i":["1"],"b":["1"]},"bI":{"aJ":["1"],"d_":["1"],"i":["1"],"b":["1"]},"a2":{"S":["a2"]},"d":{"G":[],"S":["G"]},"a":{"G":[],"S":["G"]},"o":{"i":["1"],"b":["1"]},"G":{"S":["G"]},"aq":{"aG":[]},"h":{"S":["h"],"cY":[]},"bV":{"q":[]},"a3":{"q":[]},"X":{"q":[]},"bl":{"q":[]},"c4":{"q":[]},"br":{"q":[]},"cq":{"q":[]},"bo":{"q":[]},"c0":{"q":[]},"cj":{"q":[]},"bn":{"q":[]},"cE":{"ad":[]},"hJ":{"o":["a"],"i":["a"],"b":["a"]},"i9":{"o":["a"],"i":["a"],"b":["a"]},"i8":{"o":["a"],"i":["a"],"b":["a"]},"hH":{"o":["a"],"i":["a"],"b":["a"]},"i6":{"o":["a"],"i":["a"],"b":["a"]},"hI":{"o":["a"],"i":["a"],"b":["a"]},"i7":{"o":["a"],"i":["a"],"b":["a"]},"hE":{"o":["d"],"i":["d"],"b":["d"]},"hF":{"o":["d"],"i":["d"],"b":["d"]}}'))
A.iu(v.typeUniverse,JSON.parse('{"aI":1,"bI":1}'))
var u={c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.bS
return{t:s("Q"),U:s("S<@>"),k:s("a2"),O:s("i<@>"),C:s("q"),Z:s("al"),A:s("aD<M,h>"),V:s("b<@>"),q:s("t<ai>"),J:s("t<bY>"),G:s("t<j>"),s:s("t<h>"),n:s("t<d>"),b:s("t<@>"),r:s("t<h?>"),T:s("b4"),m:s("u"),g:s("aa"),p:s("K<@>"),w:s("o<d>"),j:s("o<@>"),W:s("U<h,h>"),f:s("T<@,@>"),P:s("D"),K:s("j"),Y:s("jT"),h:s("+()"),d:s("aq"),a:s("d_<d>"),l:s("ad"),D:s("M"),N:s("h"),E:s("E"),x:s("E(E,a)"),R:s("l"),c:s("a3"),B:s("ar"),ab:s("bs<h>"),_:s("F<@>"),dd:s("bz<j?,j?>"),y:s("a_"),bG:s("a_(j)"),i:s("d"),e:s("d(d)"),z:s("@"),bd:s("@()"),v:s("@(j)"),Q:s("@(j,ad)"),S:s("a"),bc:s("am<D>?"),aQ:s("u?"),X:s("j?"),aD:s("h?"),F:s("as<@,@>?"),L:s("cz?"),u:s("a_?"),I:s("d?"),a3:s("a?"),ae:s("G?"),o:s("G"),H:s("~"),M:s("~()")}})();(function constants(){var s=hunkHelpers.makeConstList
B.z=J.c5.prototype
B.a=J.t.prototype
B.c=J.b3.prototype
B.b=J.aE.prototype
B.f=J.a9.prototype
B.A=J.aa.prototype
B.B=J.b6.prototype
B.p=J.ck.prototype
B.m=J.ar.prototype
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

B.y=new A.cj()
B.d=new A.cZ()
B.e=new A.cA()
B.i=new A.cE()
B.C=s([35,45,70,180,250,400,1000],t.n)
B.D=s([100,1000,1e4],t.n)
B.P=new A.a5("hf","HF")
B.Q=new A.a5("hmD","HM")
B.S=new A.a5("lmD","LM")
B.R=new A.a5("lf","LF")
B.E=s([B.P,B.Q,B.S,B.R],A.bS("t<+(h,h)>"))
B.j=new A.M("Attested",0,"attested")
B.h=new A.M("Proposed",1,"proposed")
B.k=new A.M("Lapsed",2,"expired")
B.l=new A.M("Rejected",3,"rejected")
B.F=s([B.j,B.h,B.k,B.l],A.bS("t<M>"))
B.G=s([35,45,70,180,250,400,1000,500,700,3000,4000,6000,15e3,40,50,63,80,100,125,160,200,315,630,800,1250,1600,2000,2500,3150,5000,6300,8000,1e4,12500],t.n)
B.a4=s([],t.n)
B.H=s([-15,-10,-5,0,5,10,15],t.n)
B.I=s([30,40,50,60,70,80,90,100,200,300,400,500,600,700,800,900,1000,2000,3000,4000,5000,6000,7000,8000,9000,1e4],t.n)
B.J=s([500,700,1000,3000,4000,6000,15e3],t.n)
B.K=s([50,100,200,500,1000,2000,5000,1e4],t.n)
B.L=new A.aD([B.j,'<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.2 3.2L13 5"/></svg>',B.h,'<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3.6" y="3.6" width="8.8" height="8.8" rx="1.4" transform="rotate(45 8 8)"/></svg>',B.k,'<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="8" cy="8" r="5.6"/><path d="M8 4.8V8.4M8 11h.01"/></svg>',B.l,'<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4.4 4.4l7.2 7.2M11.6 4.4l-7.2 7.2"/></svg>'],t.A)
B.M=new A.aD([B.j,"var(--att)",B.h,"var(--prop)",B.k,"var(--exp)",B.l,"var(--rej)"],t.A)
B.O={}
B.N=new A.b0(B.O,[],A.bS("b0<h,j?>"))
B.T=A.W("jN")
B.U=A.W("jO")
B.V=A.W("hE")
B.W=A.W("hF")
B.X=A.W("hH")
B.Y=A.W("hI")
B.Z=A.W("hJ")
B.a_=A.W("j")
B.a0=A.W("i6")
B.a1=A.W("i7")
B.a2=A.W("i8")
B.a3=A.W("i9")})();(function staticFields(){$.dS=null
$.O=A.w([],t.G)
$.f7=null
$.eW=null
$.eV=null
$.fW=null
$.fN=null
$.h_=null
$.e3=null
$.ea=null
$.eM=null
$.dT=A.w([],A.bS("t<o<j>?>"))
$.aQ=null
$.bQ=null
$.bR=null
$.eE=!1
$.y=B.e})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"jQ","h5",()=>A.e6("_$dart_dartClosure"))
s($,"jP","eg",()=>A.e6("_$dart_dartClosure_dartJSInterop"))
s($,"k6","hh",()=>A.w([new J.c6()],A.bS("t<bm>")))
s($,"jV","h7",()=>A.a4(A.dB({
toString:function(){return"$receiver$"}})))
s($,"jW","h8",()=>A.a4(A.dB({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"jX","h9",()=>A.a4(A.dB(null)))
s($,"jY","ha",()=>A.a4(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"k0","hd",()=>A.a4(A.dB(void 0)))
s($,"k1","he",()=>A.a4(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"k_","hc",()=>A.a4(A.fi(null)))
s($,"jZ","hb",()=>A.a4(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"k3","hg",()=>A.a4(A.fi(void 0)))
s($,"k2","hf",()=>A.a4(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"k4","eS",()=>A.ia())
s($,"jR","h6",()=>A.Y("^([+-]?\\d{4,6})-?(\\d\\d)-?(\\d\\d)(?:[ T](\\d\\d)(?::?(\\d\\d)(?::?(\\d\\d)(?:[.,](\\d+))?)?)?( ?[zZ]| ?([-+])(\\d\\d)(?::?(\\d\\d))?)?)?$",!0))
s($,"k5","aX",()=>A.cK(B.a_))})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.aH,SharedArrayBuffer:A.aH,ArrayBufferView:A.bh,DataView:A.ca,Float32Array:A.cb,Float64Array:A.cc,Int16Array:A.cd,Int32Array:A.ce,Int8Array:A.cf,Uint16Array:A.cg,Uint32Array:A.ch,Uint8ClampedArray:A.bi,CanvasPixelArray:A.bi,Uint8Array:A.ci})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.aI.$nativeSuperclassTag="ArrayBufferView"
A.bD.$nativeSuperclassTag="ArrayBufferView"
A.bE.$nativeSuperclassTag="ArrayBufferView"
A.bf.$nativeSuperclassTag="ArrayBufferView"
A.bF.$nativeSuperclassTag="ArrayBufferView"
A.bG.$nativeSuperclassTag="ArrayBufferView"
A.bg.$nativeSuperclassTag="ArrayBufferView"})()
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
var s=A.jD
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()