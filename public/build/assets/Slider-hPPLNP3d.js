import"./AboutHeader-B0xeqd_u.js";import"./index-B80Lgev0.js";import"./swiper-react-BT1YUSjq.js";import"./Strengths-DQH1YOf6.js";/* empty css               */function $(e){let t=e[0],i=e[1],s=e[2];return Math.sqrt(t*t+i*i+s*s)}function L(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e}function Ct(e,t,i,s){return e[0]=t,e[1]=i,e[2]=s,e}function tt(e,t,i){return e[0]=t[0]+i[0],e[1]=t[1]+i[1],e[2]=t[2]+i[2],e}function et(e,t,i){return e[0]=t[0]-i[0],e[1]=t[1]-i[1],e[2]=t[2]-i[2],e}function Tt(e,t,i){return e[0]=t[0]*i[0],e[1]=t[1]*i[1],e[2]=t[2]*i[2],e}function bt(e,t,i){return e[0]=t[0]/i[0],e[1]=t[1]/i[1],e[2]=t[2]/i[2],e}function j(e,t,i){return e[0]=t[0]*i,e[1]=t[1]*i,e[2]=t[2]*i,e}function It(e,t){let i=t[0]-e[0],s=t[1]-e[1],r=t[2]-e[2];return Math.sqrt(i*i+s*s+r*r)}function Gt(e,t){let i=t[0]-e[0],s=t[1]-e[1],r=t[2]-e[2];return i*i+s*s+r*r}function it(e){let t=e[0],i=e[1],s=e[2];return t*t+i*i+s*s}function St(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e}function Yt(e,t){return e[0]=1/t[0],e[1]=1/t[1],e[2]=1/t[2],e}function H(e,t){let i=t[0],s=t[1],r=t[2],n=i*i+s*s+r*r;return n>0&&(n=1/Math.sqrt(n)),e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e}function yt(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function st(e,t,i){let s=t[0],r=t[1],n=t[2],a=i[0],h=i[1],o=i[2];return e[0]=r*o-n*h,e[1]=n*a-s*o,e[2]=s*h-r*a,e}function zt(e,t,i,s){let r=t[0],n=t[1],a=t[2];return e[0]=r+s*(i[0]-r),e[1]=n+s*(i[1]-n),e[2]=a+s*(i[2]-a),e}function Bt(e,t,i){let s=t[0],r=t[1],n=t[2],a=i[3]*s+i[7]*r+i[11]*n+i[15];return a=a||1,e[0]=(i[0]*s+i[4]*r+i[8]*n+i[12])/a,e[1]=(i[1]*s+i[5]*r+i[9]*n+i[13])/a,e[2]=(i[2]*s+i[6]*r+i[10]*n+i[14])/a,e}function Dt(e,t,i){let s=t[0],r=t[1],n=t[2],a=i[3]*s+i[7]*r+i[11]*n+i[15];return a=a||1,e[0]=(i[0]*s+i[4]*r+i[8]*n)/a,e[1]=(i[1]*s+i[5]*r+i[9]*n)/a,e[2]=(i[2]*s+i[6]*r+i[10]*n)/a,e}function Kt(e,t,i){let s=t[0],r=t[1],n=t[2];return e[0]=s*i[0]+r*i[3]+n*i[6],e[1]=s*i[1]+r*i[4]+n*i[7],e[2]=s*i[2]+r*i[5]+n*i[8],e}function kt(e,t,i){let s=t[0],r=t[1],n=t[2],a=i[0],h=i[1],o=i[2],l=i[3],c=h*n-o*r,d=o*s-a*n,g=a*r-h*s,f=h*g-o*d,m=o*c-a*g,u=a*d-h*c,p=l*2;return c*=p,d*=p,g*=p,f*=2,m*=2,u*=2,e[0]=s+c+f,e[1]=r+d+m,e[2]=n+g+u,e}const Qt=function(){const e=[0,0,0],t=[0,0,0];return function(i,s){L(e,i),L(t,s),H(e,e),H(t,t);let r=yt(e,t);return r>1?0:r<-1?Math.PI:Math.acos(r)}}();function Nt(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]}class G extends Array{constructor(t=0,i=t,s=t){return super(t,i,s),this}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}set x(t){this[0]=t}set y(t){this[1]=t}set z(t){this[2]=t}set(t,i=t,s=t){return t.length?this.copy(t):(Ct(this,t,i,s),this)}copy(t){return L(this,t),this}add(t,i){return i?tt(this,t,i):tt(this,this,t),this}sub(t,i){return i?et(this,t,i):et(this,this,t),this}multiply(t){return t.length?Tt(this,this,t):j(this,this,t),this}divide(t){return t.length?bt(this,this,t):j(this,this,1/t),this}inverse(t=this){return Yt(this,t),this}len(){return $(this)}distance(t){return t?It(this,t):$(this)}squaredLen(){return it(this)}squaredDistance(t){return t?Gt(this,t):it(this)}negate(t=this){return St(this,t),this}cross(t,i){return i?st(this,t,i):st(this,this,t),this}scale(t){return j(this,this,t),this}normalize(){return H(this,this),this}dot(t){return yt(this,t)}equals(t){return Nt(this,t)}applyMatrix3(t){return Kt(this,this,t),this}applyMatrix4(t){return Bt(this,this,t),this}scaleRotateMatrix4(t){return Dt(this,this,t),this}applyQuaternion(t){return kt(this,this,t),this}angle(t){return Qt(this,t)}lerp(t,i){return zt(this,this,t,i),this}clone(){return new G(this[0],this[1],this[2])}fromArray(t,i=0){return this[0]=t[i],this[1]=t[i+1],this[2]=t[i+2],this}toArray(t=[],i=0){return t[i]=this[0],t[i+1]=this[1],t[i+2]=this[2],t}transformDirection(t){const i=this[0],s=this[1],r=this[2];return this[0]=t[0]*i+t[4]*s+t[8]*r,this[1]=t[1]*i+t[5]*s+t[9]*r,this[2]=t[2]*i+t[6]*s+t[10]*r,this.normalize()}}const rt=new G;let jt=1,Pt=1,nt=!1;class vt{constructor(t,i={}){t.canvas||console.error("gl not passed as first argument to Geometry"),this.gl=t,this.attributes=i,this.id=jt++,this.VAOs={},this.drawRange={start:0,count:0},this.instancedCount=0,this.gl.renderer.bindVertexArray(null),this.gl.renderer.currentGeometry=null,this.glState=this.gl.renderer.state;for(let s in i)this.addAttribute(s,i[s])}addAttribute(t,i){if(this.attributes[t]=i,i.id=Pt++,i.size=i.size||1,i.type=i.type||(i.data.constructor===Float32Array?this.gl.FLOAT:i.data.constructor===Uint16Array?this.gl.UNSIGNED_SHORT:this.gl.UNSIGNED_INT),i.target=t==="index"?this.gl.ELEMENT_ARRAY_BUFFER:this.gl.ARRAY_BUFFER,i.normalized=i.normalized||!1,i.stride=i.stride||0,i.offset=i.offset||0,i.count=i.count||(i.stride?i.data.byteLength/i.stride:i.data.length/i.size),i.divisor=i.instanced||0,i.needsUpdate=!1,i.usage=i.usage||this.gl.STATIC_DRAW,i.buffer||this.updateAttribute(i),i.divisor){if(this.isInstanced=!0,this.instancedCount&&this.instancedCount!==i.count*i.divisor)return console.warn("geometry has multiple instanced buffers of different length"),this.instancedCount=Math.min(this.instancedCount,i.count*i.divisor);this.instancedCount=i.count*i.divisor}else t==="index"?this.drawRange.count=i.count:this.attributes.index||(this.drawRange.count=Math.max(this.drawRange.count,i.count))}updateAttribute(t){const i=!t.buffer;i&&(t.buffer=this.gl.createBuffer()),this.glState.boundBuffer!==t.buffer&&(this.gl.bindBuffer(t.target,t.buffer),this.glState.boundBuffer=t.buffer),i?this.gl.bufferData(t.target,t.data,t.usage):this.gl.bufferSubData(t.target,0,t.data),t.needsUpdate=!1}setIndex(t){this.addAttribute("index",t)}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}setInstancedCount(t){this.instancedCount=t}createVAO(t){this.VAOs[t.attributeOrder]=this.gl.renderer.createVertexArray(),this.gl.renderer.bindVertexArray(this.VAOs[t.attributeOrder]),this.bindAttributes(t)}bindAttributes(t){t.attributeLocations.forEach((i,{name:s,type:r})=>{if(!this.attributes[s]){console.warn(`active attribute ${s} not being supplied`);return}const n=this.attributes[s];this.gl.bindBuffer(n.target,n.buffer),this.glState.boundBuffer=n.buffer;let a=1;r===35674&&(a=2),r===35675&&(a=3),r===35676&&(a=4);const h=n.size/a,o=a===1?0:a*a*a,l=a===1?0:a*a;for(let c=0;c<a;c++)this.gl.vertexAttribPointer(i+c,h,n.type,n.normalized,n.stride+o,n.offset+c*l),this.gl.enableVertexAttribArray(i+c),this.gl.renderer.vertexAttribDivisor(i+c,n.divisor)}),this.attributes.index&&this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.attributes.index.buffer)}draw({program:t,mode:i=this.gl.TRIANGLES}){this.gl.renderer.currentGeometry!==`${this.id}_${t.attributeOrder}`&&(this.VAOs[t.attributeOrder]||this.createVAO(t),this.gl.renderer.bindVertexArray(this.VAOs[t.attributeOrder]),this.gl.renderer.currentGeometry=`${this.id}_${t.attributeOrder}`),t.attributeLocations.forEach((s,{name:r})=>{const n=this.attributes[r];n.needsUpdate&&this.updateAttribute(n)}),this.isInstanced?this.attributes.index?this.gl.renderer.drawElementsInstanced(i,this.drawRange.count,this.attributes.index.type,this.attributes.index.offset+this.drawRange.start*2,this.instancedCount):this.gl.renderer.drawArraysInstanced(i,this.drawRange.start,this.drawRange.count,this.instancedCount):this.attributes.index?this.gl.drawElements(i,this.drawRange.count,this.attributes.index.type,this.attributes.index.offset+this.drawRange.start*2):this.gl.drawArrays(i,this.drawRange.start,this.drawRange.count)}getPosition(){const t=this.attributes.position;if(t.data)return t;if(!nt)return console.warn("No position buffer data found to compute bounds"),nt=!0}computeBoundingBox(t){t||(t=this.getPosition());const i=t.data,s=t.stride?t.stride/i.BYTES_PER_ELEMENT:t.size;this.bounds||(this.bounds={min:new G,max:new G,center:new G,scale:new G,radius:1/0});const r=this.bounds.min,n=this.bounds.max,a=this.bounds.center,h=this.bounds.scale;r.set(1/0),n.set(-1/0);for(let o=0,l=i.length;o<l;o+=s){const c=i[o],d=i[o+1],g=i[o+2];r.x=Math.min(c,r.x),r.y=Math.min(d,r.y),r.z=Math.min(g,r.z),n.x=Math.max(c,n.x),n.y=Math.max(d,n.y),n.z=Math.max(g,n.z)}h.sub(n,r),a.add(r,n).divide(2)}computeBoundingSphere(t){t||(t=this.getPosition());const i=t.data,s=t.stride?t.stride/i.BYTES_PER_ELEMENT:t.size;this.bounds||this.computeBoundingBox(t);let r=0;for(let n=0,a=i.length;n<a;n+=s)rt.fromArray(i,n),r=Math.max(r,this.bounds.center.squaredDistance(rt));this.bounds.radius=Math.sqrt(r)}remove(){for(let t in this.VAOs)this.gl.renderer.deleteVertexArray(this.VAOs[t]),delete this.VAOs[t];for(let t in this.attributes)this.gl.deleteBuffer(this.attributes[t].buffer),delete this.attributes[t]}}let Ot=1;const at={};class Vt{constructor(t,{vertex:i,fragment:s,uniforms:r={},transparent:n=!1,cullFace:a=t.BACK,frontFace:h=t.CCW,depthTest:o=!0,depthWrite:l=!0,depthFunc:c=t.LESS}={}){t.canvas||console.error("gl not passed as fist argument to Program"),this.gl=t,this.uniforms=r,this.id=Ot++,i||console.warn("vertex shader not supplied"),s||console.warn("fragment shader not supplied"),this.transparent=n,this.cullFace=a,this.frontFace=h,this.depthTest=o,this.depthWrite=l,this.depthFunc=c,this.blendFunc={},this.blendEquation={},this.transparent&&!this.blendFunc.src&&(this.gl.renderer.premultipliedAlpha?this.setBlendFunc(this.gl.ONE,this.gl.ONE_MINUS_SRC_ALPHA):this.setBlendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA));const d=t.createShader(t.VERTEX_SHADER);t.shaderSource(d,i),t.compileShader(d),t.getShaderInfoLog(d)!==""&&console.warn(`${t.getShaderInfoLog(d)}
Vertex Shader
${ht(i)}`);const g=t.createShader(t.FRAGMENT_SHADER);if(t.shaderSource(g,s),t.compileShader(g),t.getShaderInfoLog(g)!==""&&console.warn(`${t.getShaderInfoLog(g)}
Fragment Shader
${ht(s)}`),this.program=t.createProgram(),t.attachShader(this.program,d),t.attachShader(this.program,g),t.linkProgram(this.program),!t.getProgramParameter(this.program,t.LINK_STATUS))return console.warn(t.getProgramInfoLog(this.program));t.deleteShader(d),t.deleteShader(g),this.uniformLocations=new Map;let f=t.getProgramParameter(this.program,t.ACTIVE_UNIFORMS);for(let p=0;p<f;p++){let x=t.getActiveUniform(this.program,p);this.uniformLocations.set(x,t.getUniformLocation(this.program,x.name));const y=x.name.match(/(\w+)/g);x.uniformName=y[0],y.length===3?(x.isStructArray=!0,x.structIndex=Number(y[1]),x.structProperty=y[2]):y.length===2&&isNaN(Number(y[1]))&&(x.isStruct=!0,x.structProperty=y[1])}this.attributeLocations=new Map;const m=[],u=t.getProgramParameter(this.program,t.ACTIVE_ATTRIBUTES);for(let p=0;p<u;p++){const x=t.getActiveAttrib(this.program,p),y=t.getAttribLocation(this.program,x.name);y!==-1&&(m[y]=x.name,this.attributeLocations.set(x,y))}this.attributeOrder=m.join("")}setBlendFunc(t,i,s,r){this.blendFunc.src=t,this.blendFunc.dst=i,this.blendFunc.srcAlpha=s,this.blendFunc.dstAlpha=r,t&&(this.transparent=!0)}setBlendEquation(t,i){this.blendEquation.modeRGB=t,this.blendEquation.modeAlpha=i}applyState(){this.depthTest?this.gl.renderer.enable(this.gl.DEPTH_TEST):this.gl.renderer.disable(this.gl.DEPTH_TEST),this.cullFace?this.gl.renderer.enable(this.gl.CULL_FACE):this.gl.renderer.disable(this.gl.CULL_FACE),this.blendFunc.src?this.gl.renderer.enable(this.gl.BLEND):this.gl.renderer.disable(this.gl.BLEND),this.cullFace&&this.gl.renderer.setCullFace(this.cullFace),this.gl.renderer.setFrontFace(this.frontFace),this.gl.renderer.setDepthMask(this.depthWrite),this.gl.renderer.setDepthFunc(this.depthFunc),this.blendFunc.src&&this.gl.renderer.setBlendFunc(this.blendFunc.src,this.blendFunc.dst,this.blendFunc.srcAlpha,this.blendFunc.dstAlpha),this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB,this.blendEquation.modeAlpha)}use({flipFaces:t=!1}={}){let i=-1;this.gl.renderer.state.currentProgram===this.id||(this.gl.useProgram(this.program),this.gl.renderer.state.currentProgram=this.id),this.uniformLocations.forEach((r,n)=>{let a=n.uniformName,h=this.uniforms[a];if(n.isStruct&&(h=h[n.structProperty],a+=`.${n.structProperty}`),n.isStructArray&&(h=h[n.structIndex][n.structProperty],a+=`[${n.structIndex}].${n.structProperty}`),!h)return ot(`Active uniform ${a} has not been supplied`);if(h&&h.value===void 0)return ot(`${a} uniform is missing a value parameter`);if(h.value.texture)return i=i+1,h.value.update(i),P(this.gl,n.type,r,i);if(h.value.length&&h.value[0].texture){const o=[];return h.value.forEach(l=>{i=i+1,l.update(i),o.push(i)}),P(this.gl,n.type,r,o)}P(this.gl,n.type,r,h.value)}),this.applyState(),t&&this.gl.renderer.setFrontFace(this.frontFace===this.gl.CCW?this.gl.CW:this.gl.CCW)}remove(){this.gl.deleteProgram(this.program)}}function P(e,t,i,s){s=s.length?Zt(s):s;const r=e.renderer.state.uniformLocations.get(i);if(s.length)if(r===void 0||r.length!==s.length)e.renderer.state.uniformLocations.set(i,s.slice(0));else{if(Jt(r,s))return;r.set?r.set(s):Lt(r,s),e.renderer.state.uniformLocations.set(i,r)}else{if(r===s)return;e.renderer.state.uniformLocations.set(i,s)}switch(t){case 5126:return s.length?e.uniform1fv(i,s):e.uniform1f(i,s);case 35664:return e.uniform2fv(i,s);case 35665:return e.uniform3fv(i,s);case 35666:return e.uniform4fv(i,s);case 35670:case 5124:case 35678:case 35680:return s.length?e.uniform1iv(i,s):e.uniform1i(i,s);case 35671:case 35667:return e.uniform2iv(i,s);case 35672:case 35668:return e.uniform3iv(i,s);case 35673:case 35669:return e.uniform4iv(i,s);case 35674:return e.uniformMatrix2fv(i,!1,s);case 35675:return e.uniformMatrix3fv(i,!1,s);case 35676:return e.uniformMatrix4fv(i,!1,s)}}function ht(e){let t=e.split(`
`);for(let i=0;i<t.length;i++)t[i]=i+1+": "+t[i];return t.join(`
`)}function Zt(e){const t=e.length,i=e[0].length;if(i===void 0)return e;const s=t*i;let r=at[s];r||(at[s]=r=new Float32Array(s));for(let n=0;n<t;n++)r.set(e[n],n*i);return r}function Jt(e,t){if(e.length!==t.length)return!1;for(let i=0,s=e.length;i<s;i++)if(e[i]!==t[i])return!1;return!0}function Lt(e,t){for(let i=0,s=e.length;i<s;i++)e[i]=t[i]}let O=0;function ot(e){O>100||(console.warn(e),O++,O>100&&console.warn("More than 100 program warnings - stopping logs."))}const V=new G;let Ht=1;class Wt{constructor({canvas:t=document.createElement("canvas"),width:i=300,height:s=150,dpr:r=1,alpha:n=!1,depth:a=!0,stencil:h=!1,antialias:o=!1,premultipliedAlpha:l=!1,preserveDrawingBuffer:c=!1,powerPreference:d="default",autoClear:g=!0,webgl:f=2}={}){const m={alpha:n,depth:a,stencil:h,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d};this.dpr=r,this.alpha=n,this.color=!0,this.depth=a,this.stencil=h,this.premultipliedAlpha=l,this.autoClear=g,this.id=Ht++,f===2&&(this.gl=t.getContext("webgl2",m)),this.isWebgl2=!!this.gl,this.gl||(this.gl=t.getContext("webgl",m)),this.gl||console.error("unable to create webgl context"),this.gl.renderer=this,this.setSize(i,s),this.state={},this.state.blendFunc={src:this.gl.ONE,dst:this.gl.ZERO},this.state.blendEquation={modeRGB:this.gl.FUNC_ADD},this.state.cullFace=null,this.state.frontFace=this.gl.CCW,this.state.depthMask=!0,this.state.depthFunc=this.gl.LESS,this.state.premultiplyAlpha=!1,this.state.flipY=!1,this.state.unpackAlignment=4,this.state.framebuffer=null,this.state.viewport={x:0,y:0,width:null,height:null},this.state.textureUnits=[],this.state.activeTextureUnit=0,this.state.boundBuffer=null,this.state.uniformLocations=new Map,this.state.currentProgram=null,this.extensions={},this.isWebgl2?(this.getExtension("EXT_color_buffer_float"),this.getExtension("OES_texture_float_linear")):(this.getExtension("OES_texture_float"),this.getExtension("OES_texture_float_linear"),this.getExtension("OES_texture_half_float"),this.getExtension("OES_texture_half_float_linear"),this.getExtension("OES_element_index_uint"),this.getExtension("OES_standard_derivatives"),this.getExtension("EXT_sRGB"),this.getExtension("WEBGL_depth_texture"),this.getExtension("WEBGL_draw_buffers")),this.getExtension("WEBGL_compressed_texture_astc"),this.getExtension("EXT_texture_compression_bptc"),this.getExtension("WEBGL_compressed_texture_s3tc"),this.getExtension("WEBGL_compressed_texture_etc1"),this.getExtension("WEBGL_compressed_texture_pvrtc"),this.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),this.vertexAttribDivisor=this.getExtension("ANGLE_instanced_arrays","vertexAttribDivisor","vertexAttribDivisorANGLE"),this.drawArraysInstanced=this.getExtension("ANGLE_instanced_arrays","drawArraysInstanced","drawArraysInstancedANGLE"),this.drawElementsInstanced=this.getExtension("ANGLE_instanced_arrays","drawElementsInstanced","drawElementsInstancedANGLE"),this.createVertexArray=this.getExtension("OES_vertex_array_object","createVertexArray","createVertexArrayOES"),this.bindVertexArray=this.getExtension("OES_vertex_array_object","bindVertexArray","bindVertexArrayOES"),this.deleteVertexArray=this.getExtension("OES_vertex_array_object","deleteVertexArray","deleteVertexArrayOES"),this.drawBuffers=this.getExtension("WEBGL_draw_buffers","drawBuffers","drawBuffersWEBGL"),this.parameters={},this.parameters.maxTextureUnits=this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),this.parameters.maxAnisotropy=this.getExtension("EXT_texture_filter_anisotropic")?this.gl.getParameter(this.getExtension("EXT_texture_filter_anisotropic").MAX_TEXTURE_MAX_ANISOTROPY_EXT):0}setSize(t,i){this.width=t,this.height=i,this.gl.canvas.width=t*this.dpr,this.gl.canvas.height=i*this.dpr,Object.assign(this.gl.canvas.style,{width:t+"px",height:i+"px"})}setViewport(t,i,s=0,r=0){this.state.viewport.width===t&&this.state.viewport.height===i||(this.state.viewport.width=t,this.state.viewport.height=i,this.state.viewport.x=s,this.state.viewport.y=r,this.gl.viewport(s,r,t,i))}setScissor(t,i,s=0,r=0){this.gl.scissor(s,r,t,i)}enable(t){this.state[t]!==!0&&(this.gl.enable(t),this.state[t]=!0)}disable(t){this.state[t]!==!1&&(this.gl.disable(t),this.state[t]=!1)}setBlendFunc(t,i,s,r){this.state.blendFunc.src===t&&this.state.blendFunc.dst===i&&this.state.blendFunc.srcAlpha===s&&this.state.blendFunc.dstAlpha===r||(this.state.blendFunc.src=t,this.state.blendFunc.dst=i,this.state.blendFunc.srcAlpha=s,this.state.blendFunc.dstAlpha=r,s!==void 0?this.gl.blendFuncSeparate(t,i,s,r):this.gl.blendFunc(t,i))}setBlendEquation(t,i){t=t||this.gl.FUNC_ADD,!(this.state.blendEquation.modeRGB===t&&this.state.blendEquation.modeAlpha===i)&&(this.state.blendEquation.modeRGB=t,this.state.blendEquation.modeAlpha=i,i!==void 0?this.gl.blendEquationSeparate(t,i):this.gl.blendEquation(t))}setCullFace(t){this.state.cullFace!==t&&(this.state.cullFace=t,this.gl.cullFace(t))}setFrontFace(t){this.state.frontFace!==t&&(this.state.frontFace=t,this.gl.frontFace(t))}setDepthMask(t){this.state.depthMask!==t&&(this.state.depthMask=t,this.gl.depthMask(t))}setDepthFunc(t){this.state.depthFunc!==t&&(this.state.depthFunc=t,this.gl.depthFunc(t))}activeTexture(t){this.state.activeTextureUnit!==t&&(this.state.activeTextureUnit=t,this.gl.activeTexture(this.gl.TEXTURE0+t))}bindFramebuffer({target:t=this.gl.FRAMEBUFFER,buffer:i=null}={}){this.state.framebuffer!==i&&(this.state.framebuffer=i,this.gl.bindFramebuffer(t,i))}getExtension(t,i,s){return i&&this.gl[i]?this.gl[i].bind(this.gl):(this.extensions[t]||(this.extensions[t]=this.gl.getExtension(t)),i?this.extensions[t]?this.extensions[t][s].bind(this.extensions[t]):null:this.extensions[t])}sortOpaque(t,i){return t.renderOrder!==i.renderOrder?t.renderOrder-i.renderOrder:t.program.id!==i.program.id?t.program.id-i.program.id:t.zDepth!==i.zDepth?t.zDepth-i.zDepth:i.id-t.id}sortTransparent(t,i){return t.renderOrder!==i.renderOrder?t.renderOrder-i.renderOrder:t.zDepth!==i.zDepth?i.zDepth-t.zDepth:i.id-t.id}sortUI(t,i){return t.renderOrder!==i.renderOrder?t.renderOrder-i.renderOrder:t.program.id!==i.program.id?t.program.id-i.program.id:i.id-t.id}getRenderList({scene:t,camera:i,frustumCull:s,sort:r}){let n=[];if(i&&s&&i.updateFrustum(),t.traverse(a=>{if(!a.visible)return!0;a.draw&&(s&&a.frustumCulled&&i&&!i.frustumIntersectsMesh(a)||n.push(a))}),r){const a=[],h=[],o=[];n.forEach(l=>{l.program.transparent?l.program.depthTest?h.push(l):o.push(l):a.push(l),l.zDepth=0,!(l.renderOrder!==0||!l.program.depthTest||!i)&&(l.worldMatrix.getTranslation(V),V.applyMatrix4(i.projectionViewMatrix),l.zDepth=V.z)}),a.sort(this.sortOpaque),h.sort(this.sortTransparent),o.sort(this.sortUI),n=a.concat(h,o)}return n}render({scene:t,camera:i,target:s=null,update:r=!0,sort:n=!0,frustumCull:a=!0,clear:h}){s===null?(this.bindFramebuffer(),this.setViewport(this.width*this.dpr,this.height*this.dpr)):(this.bindFramebuffer(s),this.setViewport(s.width,s.height)),(h||this.autoClear&&h!==!1)&&(this.depth&&(!s||s.depth)&&(this.enable(this.gl.DEPTH_TEST),this.setDepthMask(!0)),this.gl.clear((this.color?this.gl.COLOR_BUFFER_BIT:0)|(this.depth?this.gl.DEPTH_BUFFER_BIT:0)|(this.stencil?this.gl.STENCIL_BUFFER_BIT:0))),r&&t.updateMatrixWorld(),i&&i.updateMatrixWorld(),this.getRenderList({scene:t,camera:i,frustumCull:a,sort:n}).forEach(l=>{l.draw({camera:i})})}}function wt(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e}function Et(e,t,i,s,r){return e[0]=t,e[1]=i,e[2]=s,e[3]=r,e}function qt(e,t,i){return e[0]=t[0]*i,e[1]=t[1]*i,e[2]=t[2]*i,e[3]=t[3]*i,e}function Ut(e,t){let i=t[0],s=t[1],r=t[2],n=t[3],a=i*i+s*s+r*r+n*n;return a>0&&(a=1/Math.sqrt(a)),e[0]=i*a,e[1]=s*a,e[2]=r*a,e[3]=n*a,e}function Ft(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]+e[3]*t[3]}function Xt(e){return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e}function _t(e,t,i){i=i*.5;let s=Math.sin(i);return e[0]=s*t[0],e[1]=s*t[1],e[2]=s*t[2],e[3]=Math.cos(i),e}function lt(e,t,i){let s=t[0],r=t[1],n=t[2],a=t[3],h=i[0],o=i[1],l=i[2],c=i[3];return e[0]=s*c+a*h+r*l-n*o,e[1]=r*c+a*o+n*h-s*l,e[2]=n*c+a*l+s*o-r*h,e[3]=a*c-s*h-r*o-n*l,e}function $t(e,t,i){i*=.5;let s=t[0],r=t[1],n=t[2],a=t[3],h=Math.sin(i),o=Math.cos(i);return e[0]=s*o+a*h,e[1]=r*o+n*h,e[2]=n*o-r*h,e[3]=a*o-s*h,e}function te(e,t,i){i*=.5;let s=t[0],r=t[1],n=t[2],a=t[3],h=Math.sin(i),o=Math.cos(i);return e[0]=s*o-n*h,e[1]=r*o+a*h,e[2]=n*o+s*h,e[3]=a*o-r*h,e}function ee(e,t,i){i*=.5;let s=t[0],r=t[1],n=t[2],a=t[3],h=Math.sin(i),o=Math.cos(i);return e[0]=s*o+r*h,e[1]=r*o-s*h,e[2]=n*o+a*h,e[3]=a*o-n*h,e}function ie(e,t,i,s){let r=t[0],n=t[1],a=t[2],h=t[3],o=i[0],l=i[1],c=i[2],d=i[3],g,f,m,u,p;return f=r*o+n*l+a*c+h*d,f<0&&(f=-f,o=-o,l=-l,c=-c,d=-d),1-f>1e-6?(g=Math.acos(f),m=Math.sin(g),u=Math.sin((1-s)*g)/m,p=Math.sin(s*g)/m):(u=1-s,p=s),e[0]=u*r+p*o,e[1]=u*n+p*l,e[2]=u*a+p*c,e[3]=u*h+p*d,e}function se(e,t){let i=t[0],s=t[1],r=t[2],n=t[3],a=i*i+s*s+r*r+n*n,h=a?1/a:0;return e[0]=-i*h,e[1]=-s*h,e[2]=-r*h,e[3]=n*h,e}function re(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=t[3],e}function ne(e,t){let i=t[0]+t[4]+t[8],s;if(i>0)s=Math.sqrt(i+1),e[3]=.5*s,s=.5/s,e[0]=(t[5]-t[7])*s,e[1]=(t[6]-t[2])*s,e[2]=(t[1]-t[3])*s;else{let r=0;t[4]>t[0]&&(r=1),t[8]>t[r*3+r]&&(r=2);let n=(r+1)%3,a=(r+2)%3;s=Math.sqrt(t[r*3+r]-t[n*3+n]-t[a*3+a]+1),e[r]=.5*s,s=.5/s,e[3]=(t[n*3+a]-t[a*3+n])*s,e[n]=(t[n*3+r]+t[r*3+n])*s,e[a]=(t[a*3+r]+t[r*3+a])*s}return e}function ae(e,t,i="YXZ"){let s=Math.sin(t[0]*.5),r=Math.cos(t[0]*.5),n=Math.sin(t[1]*.5),a=Math.cos(t[1]*.5),h=Math.sin(t[2]*.5),o=Math.cos(t[2]*.5);return i==="XYZ"?(e[0]=s*a*o+r*n*h,e[1]=r*n*o-s*a*h,e[2]=r*a*h+s*n*o,e[3]=r*a*o-s*n*h):i==="YXZ"?(e[0]=s*a*o+r*n*h,e[1]=r*n*o-s*a*h,e[2]=r*a*h-s*n*o,e[3]=r*a*o+s*n*h):i==="ZXY"?(e[0]=s*a*o-r*n*h,e[1]=r*n*o+s*a*h,e[2]=r*a*h+s*n*o,e[3]=r*a*o-s*n*h):i==="ZYX"?(e[0]=s*a*o-r*n*h,e[1]=r*n*o+s*a*h,e[2]=r*a*h-s*n*o,e[3]=r*a*o+s*n*h):i==="YZX"?(e[0]=s*a*o+r*n*h,e[1]=r*n*o+s*a*h,e[2]=r*a*h-s*n*o,e[3]=r*a*o-s*n*h):i==="XZY"&&(e[0]=s*a*o-r*n*h,e[1]=r*n*o-s*a*h,e[2]=r*a*h+s*n*o,e[3]=r*a*o+s*n*h),e}const he=wt,oe=Et,le=Ft,ce=Ut;class ge extends Array{constructor(t=0,i=0,s=0,r=1){return super(t,i,s,r),this.onChange=()=>{},this}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}get w(){return this[3]}set x(t){this[0]=t,this.onChange()}set y(t){this[1]=t,this.onChange()}set z(t){this[2]=t,this.onChange()}set w(t){this[3]=t,this.onChange()}identity(){return Xt(this),this.onChange(),this}set(t,i,s,r){return t.length?this.copy(t):(oe(this,t,i,s,r),this.onChange(),this)}rotateX(t){return $t(this,this,t),this.onChange(),this}rotateY(t){return te(this,this,t),this.onChange(),this}rotateZ(t){return ee(this,this,t),this.onChange(),this}inverse(t=this){return se(this,t),this.onChange(),this}conjugate(t=this){return re(this,t),this.onChange(),this}copy(t){return he(this,t),this.onChange(),this}normalize(t=this){return ce(this,t),this.onChange(),this}multiply(t,i){return i?lt(this,t,i):lt(this,this,t),this.onChange(),this}dot(t){return le(this,t)}fromMatrix3(t){return ne(this,t),this.onChange(),this}fromEuler(t){return ae(this,t,t.order),this}fromAxisAngle(t,i){return _t(this,t,i),this}slerp(t,i){return ie(this,this,t,i),this}fromArray(t,i=0){return this[0]=t[i],this[1]=t[i+1],this[2]=t[i+2],this[3]=t[i+3],this}toArray(t=[],i=0){return t[i]=this[0],t[i+1]=this[1],t[i+2]=this[2],t[i+3]=this[3],t}}const de=1e-6;function fe(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e}function pe(e,t,i,s,r,n,a,h,o,l,c,d,g,f,m,u,p){return e[0]=t,e[1]=i,e[2]=s,e[3]=r,e[4]=n,e[5]=a,e[6]=h,e[7]=o,e[8]=l,e[9]=c,e[10]=d,e[11]=g,e[12]=f,e[13]=m,e[14]=u,e[15]=p,e}function me(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function ue(e,t){let i=t[0],s=t[1],r=t[2],n=t[3],a=t[4],h=t[5],o=t[6],l=t[7],c=t[8],d=t[9],g=t[10],f=t[11],m=t[12],u=t[13],p=t[14],x=t[15],y=i*h-s*a,v=i*o-r*a,M=i*l-n*a,w=s*o-r*h,A=s*l-n*h,I=r*l-n*o,b=c*u-d*m,T=c*p-g*m,U=c*x-f*m,C=d*p-g*u,R=d*x-f*u,F=g*x-f*p,E=y*F-v*R+M*C+w*U-A*T+I*b;return E?(E=1/E,e[0]=(h*F-o*R+l*C)*E,e[1]=(r*R-s*F-n*C)*E,e[2]=(u*I-p*A+x*w)*E,e[3]=(g*A-d*I-f*w)*E,e[4]=(o*U-a*F-l*T)*E,e[5]=(i*F-r*U+n*T)*E,e[6]=(p*M-m*I-x*v)*E,e[7]=(c*I-g*M+f*v)*E,e[8]=(a*R-h*U+l*b)*E,e[9]=(s*U-i*R-n*b)*E,e[10]=(m*A-u*M+x*y)*E,e[11]=(d*M-c*A-f*y)*E,e[12]=(h*T-a*C-o*b)*E,e[13]=(i*C-s*T+r*b)*E,e[14]=(u*v-m*w-p*y)*E,e[15]=(c*w-d*v+g*y)*E,e):null}function xe(e){let t=e[0],i=e[1],s=e[2],r=e[3],n=e[4],a=e[5],h=e[6],o=e[7],l=e[8],c=e[9],d=e[10],g=e[11],f=e[12],m=e[13],u=e[14],p=e[15],x=t*a-i*n,y=t*h-s*n,v=t*o-r*n,M=i*h-s*a,w=i*o-r*a,A=s*o-r*h,I=l*m-c*f,b=l*u-d*f,T=l*p-g*f,U=c*u-d*m,C=c*p-g*m,R=d*p-g*u;return x*R-y*C+v*U+M*T-w*b+A*I}function ct(e,t,i){let s=t[0],r=t[1],n=t[2],a=t[3],h=t[4],o=t[5],l=t[6],c=t[7],d=t[8],g=t[9],f=t[10],m=t[11],u=t[12],p=t[13],x=t[14],y=t[15],v=i[0],M=i[1],w=i[2],A=i[3];return e[0]=v*s+M*h+w*d+A*u,e[1]=v*r+M*o+w*g+A*p,e[2]=v*n+M*l+w*f+A*x,e[3]=v*a+M*c+w*m+A*y,v=i[4],M=i[5],w=i[6],A=i[7],e[4]=v*s+M*h+w*d+A*u,e[5]=v*r+M*o+w*g+A*p,e[6]=v*n+M*l+w*f+A*x,e[7]=v*a+M*c+w*m+A*y,v=i[8],M=i[9],w=i[10],A=i[11],e[8]=v*s+M*h+w*d+A*u,e[9]=v*r+M*o+w*g+A*p,e[10]=v*n+M*l+w*f+A*x,e[11]=v*a+M*c+w*m+A*y,v=i[12],M=i[13],w=i[14],A=i[15],e[12]=v*s+M*h+w*d+A*u,e[13]=v*r+M*o+w*g+A*p,e[14]=v*n+M*l+w*f+A*x,e[15]=v*a+M*c+w*m+A*y,e}function Ae(e,t,i){let s=i[0],r=i[1],n=i[2],a,h,o,l,c,d,g,f,m,u,p,x;return t===e?(e[12]=t[0]*s+t[4]*r+t[8]*n+t[12],e[13]=t[1]*s+t[5]*r+t[9]*n+t[13],e[14]=t[2]*s+t[6]*r+t[10]*n+t[14],e[15]=t[3]*s+t[7]*r+t[11]*n+t[15]):(a=t[0],h=t[1],o=t[2],l=t[3],c=t[4],d=t[5],g=t[6],f=t[7],m=t[8],u=t[9],p=t[10],x=t[11],e[0]=a,e[1]=h,e[2]=o,e[3]=l,e[4]=c,e[5]=d,e[6]=g,e[7]=f,e[8]=m,e[9]=u,e[10]=p,e[11]=x,e[12]=a*s+c*r+m*n+t[12],e[13]=h*s+d*r+u*n+t[13],e[14]=o*s+g*r+p*n+t[14],e[15]=l*s+f*r+x*n+t[15]),e}function Me(e,t,i){let s=i[0],r=i[1],n=i[2];return e[0]=t[0]*s,e[1]=t[1]*s,e[2]=t[2]*s,e[3]=t[3]*s,e[4]=t[4]*r,e[5]=t[5]*r,e[6]=t[6]*r,e[7]=t[7]*r,e[8]=t[8]*n,e[9]=t[9]*n,e[10]=t[10]*n,e[11]=t[11]*n,e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e}function ye(e,t,i,s){let r=s[0],n=s[1],a=s[2],h=Math.hypot(r,n,a),o,l,c,d,g,f,m,u,p,x,y,v,M,w,A,I,b,T,U,C,R,F,E,Y;return Math.abs(h)<de?null:(h=1/h,r*=h,n*=h,a*=h,o=Math.sin(i),l=Math.cos(i),c=1-l,d=t[0],g=t[1],f=t[2],m=t[3],u=t[4],p=t[5],x=t[6],y=t[7],v=t[8],M=t[9],w=t[10],A=t[11],I=r*r*c+l,b=n*r*c+a*o,T=a*r*c-n*o,U=r*n*c-a*o,C=n*n*c+l,R=a*n*c+r*o,F=r*a*c+n*o,E=n*a*c-r*o,Y=a*a*c+l,e[0]=d*I+u*b+v*T,e[1]=g*I+p*b+M*T,e[2]=f*I+x*b+w*T,e[3]=m*I+y*b+A*T,e[4]=d*U+u*C+v*R,e[5]=g*U+p*C+M*R,e[6]=f*U+x*C+w*R,e[7]=m*U+y*C+A*R,e[8]=d*F+u*E+v*Y,e[9]=g*F+p*E+M*Y,e[10]=f*F+x*E+w*Y,e[11]=m*F+y*E+A*Y,t!==e&&(e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e)}function ve(e,t){return e[0]=t[12],e[1]=t[13],e[2]=t[14],e}function Rt(e,t){let i=t[0],s=t[1],r=t[2],n=t[4],a=t[5],h=t[6],o=t[8],l=t[9],c=t[10];return e[0]=Math.hypot(i,s,r),e[1]=Math.hypot(n,a,h),e[2]=Math.hypot(o,l,c),e}function we(e){let t=e[0],i=e[1],s=e[2],r=e[4],n=e[5],a=e[6],h=e[8],o=e[9],l=e[10];const c=t*t+i*i+s*s,d=r*r+n*n+a*a,g=h*h+o*o+l*l;return Math.sqrt(Math.max(c,d,g))}const Ee=function(){const e=[0,0,0];return function(t,i){let s=e;Rt(s,i);let r=1/s[0],n=1/s[1],a=1/s[2],h=i[0]*r,o=i[1]*n,l=i[2]*a,c=i[4]*r,d=i[5]*n,g=i[6]*a,f=i[8]*r,m=i[9]*n,u=i[10]*a,p=h+d+u,x=0;return p>0?(x=Math.sqrt(p+1)*2,t[3]=.25*x,t[0]=(g-m)/x,t[1]=(f-l)/x,t[2]=(o-c)/x):h>d&&h>u?(x=Math.sqrt(1+h-d-u)*2,t[3]=(g-m)/x,t[0]=.25*x,t[1]=(o+c)/x,t[2]=(f+l)/x):d>u?(x=Math.sqrt(1+d-h-u)*2,t[3]=(f-l)/x,t[0]=(o+c)/x,t[1]=.25*x,t[2]=(g+m)/x):(x=Math.sqrt(1+u-h-d)*2,t[3]=(o-c)/x,t[0]=(f+l)/x,t[1]=(g+m)/x,t[2]=.25*x),t}}();function Ue(e,t,i,s){let r=t[0],n=t[1],a=t[2],h=t[3],o=r+r,l=n+n,c=a+a,d=r*o,g=r*l,f=r*c,m=n*l,u=n*c,p=a*c,x=h*o,y=h*l,v=h*c,M=s[0],w=s[1],A=s[2];return e[0]=(1-(m+p))*M,e[1]=(g+v)*M,e[2]=(f-y)*M,e[3]=0,e[4]=(g-v)*w,e[5]=(1-(d+p))*w,e[6]=(u+x)*w,e[7]=0,e[8]=(f+y)*A,e[9]=(u-x)*A,e[10]=(1-(d+m))*A,e[11]=0,e[12]=i[0],e[13]=i[1],e[14]=i[2],e[15]=1,e}function Fe(e,t){let i=t[0],s=t[1],r=t[2],n=t[3],a=i+i,h=s+s,o=r+r,l=i*a,c=s*a,d=s*h,g=r*a,f=r*h,m=r*o,u=n*a,p=n*h,x=n*o;return e[0]=1-d-m,e[1]=c+x,e[2]=g-p,e[3]=0,e[4]=c-x,e[5]=1-l-m,e[6]=f+u,e[7]=0,e[8]=g+p,e[9]=f-u,e[10]=1-l-d,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function Re(e,t,i,s,r){let n=1/Math.tan(t/2),a=1/(s-r);return e[0]=n/i,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=n,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=(r+s)*a,e[11]=-1,e[12]=0,e[13]=0,e[14]=2*r*s*a,e[15]=0,e}function Ce(e,t,i,s,r,n,a){let h=1/(t-i),o=1/(s-r),l=1/(n-a);return e[0]=-2*h,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=-2*o,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=2*l,e[11]=0,e[12]=(t+i)*h,e[13]=(r+s)*o,e[14]=(a+n)*l,e[15]=1,e}function Te(e,t,i,s){let r=t[0],n=t[1],a=t[2],h=s[0],o=s[1],l=s[2],c=r-i[0],d=n-i[1],g=a-i[2],f=c*c+d*d+g*g;f===0?g=1:(f=1/Math.sqrt(f),c*=f,d*=f,g*=f);let m=o*g-l*d,u=l*c-h*g,p=h*d-o*c;return f=m*m+u*u+p*p,f===0&&(l?h+=1e-6:o?l+=1e-6:o+=1e-6,m=o*g-l*d,u=l*c-h*g,p=h*d-o*c,f=m*m+u*u+p*p),f=1/Math.sqrt(f),m*=f,u*=f,p*=f,e[0]=m,e[1]=u,e[2]=p,e[3]=0,e[4]=d*p-g*u,e[5]=g*m-c*p,e[6]=c*u-d*m,e[7]=0,e[8]=c,e[9]=d,e[10]=g,e[11]=0,e[12]=r,e[13]=n,e[14]=a,e[15]=1,e}class z extends Array{constructor(t=1,i=0,s=0,r=0,n=0,a=1,h=0,o=0,l=0,c=0,d=1,g=0,f=0,m=0,u=0,p=1){return super(t,i,s,r,n,a,h,o,l,c,d,g,f,m,u,p),this}get x(){return this[12]}get y(){return this[13]}get z(){return this[14]}get w(){return this[15]}set x(t){this[12]=t}set y(t){this[13]=t}set z(t){this[14]=t}set w(t){this[15]=t}set(t,i,s,r,n,a,h,o,l,c,d,g,f,m,u,p){return t.length?this.copy(t):(pe(this,t,i,s,r,n,a,h,o,l,c,d,g,f,m,u,p),this)}translate(t,i=this){return Ae(this,i,t),this}rotate(t,i,s=this){return ye(this,s,t,i),this}scale(t,i=this){return Me(this,i,typeof t=="number"?[t,t,t]:t),this}multiply(t,i){return i?ct(this,t,i):ct(this,this,t),this}identity(){return me(this),this}copy(t){return fe(this,t),this}fromPerspective({fov:t,aspect:i,near:s,far:r}={}){return Re(this,t,i,s,r),this}fromOrthogonal({left:t,right:i,bottom:s,top:r,near:n,far:a}){return Ce(this,t,i,s,r,n,a),this}fromQuaternion(t){return Fe(this,t),this}setPosition(t){return this.x=t[0],this.y=t[1],this.z=t[2],this}inverse(t=this){return ue(this,t),this}compose(t,i,s){return Ue(this,t,i,s),this}getRotation(t){return Ee(t,this),this}getTranslation(t){return ve(t,this),this}getScaling(t){return Rt(t,this),this}getMaxScaleOnAxis(){return we(this)}lookAt(t,i,s){return Te(this,t,i,s),this}determinant(){return xe(this)}fromArray(t,i=0){return this[0]=t[i],this[1]=t[i+1],this[2]=t[i+2],this[3]=t[i+3],this[4]=t[i+4],this[5]=t[i+5],this[6]=t[i+6],this[7]=t[i+7],this[8]=t[i+8],this[9]=t[i+9],this[10]=t[i+10],this[11]=t[i+11],this[12]=t[i+12],this[13]=t[i+13],this[14]=t[i+14],this[15]=t[i+15],this}toArray(t=[],i=0){return t[i]=this[0],t[i+1]=this[1],t[i+2]=this[2],t[i+3]=this[3],t[i+4]=this[4],t[i+5]=this[5],t[i+6]=this[6],t[i+7]=this[7],t[i+8]=this[8],t[i+9]=this[9],t[i+10]=this[10],t[i+11]=this[11],t[i+12]=this[12],t[i+13]=this[13],t[i+14]=this[14],t[i+15]=this[15],t}}function be(e,t,i="YXZ"){return i==="XYZ"?(e[1]=Math.asin(Math.min(Math.max(t[8],-1),1)),Math.abs(t[8])<.99999?(e[0]=Math.atan2(-t[9],t[10]),e[2]=Math.atan2(-t[4],t[0])):(e[0]=Math.atan2(t[6],t[5]),e[2]=0)):i==="YXZ"?(e[0]=Math.asin(-Math.min(Math.max(t[9],-1),1)),Math.abs(t[9])<.99999?(e[1]=Math.atan2(t[8],t[10]),e[2]=Math.atan2(t[1],t[5])):(e[1]=Math.atan2(-t[2],t[0]),e[2]=0)):i==="ZXY"?(e[0]=Math.asin(Math.min(Math.max(t[6],-1),1)),Math.abs(t[6])<.99999?(e[1]=Math.atan2(-t[2],t[10]),e[2]=Math.atan2(-t[4],t[5])):(e[1]=0,e[2]=Math.atan2(t[1],t[0]))):i==="ZYX"?(e[1]=Math.asin(-Math.min(Math.max(t[2],-1),1)),Math.abs(t[2])<.99999?(e[0]=Math.atan2(t[6],t[10]),e[2]=Math.atan2(t[1],t[0])):(e[0]=0,e[2]=Math.atan2(-t[4],t[5]))):i==="YZX"?(e[2]=Math.asin(Math.min(Math.max(t[1],-1),1)),Math.abs(t[1])<.99999?(e[0]=Math.atan2(-t[9],t[5]),e[1]=Math.atan2(-t[2],t[0])):(e[0]=0,e[1]=Math.atan2(t[8],t[10]))):i==="XZY"&&(e[2]=Math.asin(-Math.min(Math.max(t[4],-1),1)),Math.abs(t[4])<.99999?(e[0]=Math.atan2(t[6],t[5]),e[1]=Math.atan2(t[8],t[0])):(e[0]=Math.atan2(-t[9],t[10]),e[1]=0)),e}const gt=new z;class Ie extends Array{constructor(t=0,i=t,s=t,r="YXZ"){return super(t,i,s),this.order=r,this.onChange=()=>{},this}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}set x(t){this[0]=t,this.onChange()}set y(t){this[1]=t,this.onChange()}set z(t){this[2]=t,this.onChange()}set(t,i=t,s=t){return t.length?this.copy(t):(this[0]=t,this[1]=i,this[2]=s,this.onChange(),this)}copy(t){return this[0]=t[0],this[1]=t[1],this[2]=t[2],this.onChange(),this}reorder(t){return this.order=t,this.onChange(),this}fromRotationMatrix(t,i=this.order){return be(this,t,i),this}fromQuaternion(t,i=this.order){return gt.fromQuaternion(t),this.fromRotationMatrix(gt,i)}toArray(t=[],i=0){return t[i]=this[0],t[i+1]=this[1],t[i+2]=this[2],t}}class W{constructor(){this.parent=null,this.children=[],this.visible=!0,this.matrix=new z,this.worldMatrix=new z,this.matrixAutoUpdate=!0,this.position=new G,this.quaternion=new ge,this.scale=new G(1),this.rotation=new Ie,this.up=new G(0,1,0),this.rotation.onChange=()=>this.quaternion.fromEuler(this.rotation),this.quaternion.onChange=()=>this.rotation.fromQuaternion(this.quaternion)}setParent(t,i=!0){this.parent&&t!==this.parent&&this.parent.removeChild(this,!1),this.parent=t,i&&t&&t.addChild(this,!1)}addChild(t,i=!0){~this.children.indexOf(t)||this.children.push(t),i&&t.setParent(this,!1)}removeChild(t,i=!0){~this.children.indexOf(t)&&this.children.splice(this.children.indexOf(t),1),i&&t.setParent(null,!1)}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.worldMatrixNeedsUpdate||t)&&(this.parent===null?this.worldMatrix.copy(this.matrix):this.worldMatrix.multiply(this.parent.worldMatrix,this.matrix),this.worldMatrixNeedsUpdate=!1,t=!0);for(let i=0,s=this.children.length;i<s;i++)this.children[i].updateMatrixWorld(t)}updateMatrix(){this.matrix.compose(this.quaternion,this.position,this.scale),this.worldMatrixNeedsUpdate=!0}traverse(t){if(!t(this))for(let i=0,s=this.children.length;i<s;i++)this.children[i].traverse(t)}decompose(){this.matrix.getTranslation(this.position),this.matrix.getRotation(this.quaternion),this.matrix.getScaling(this.scale),this.rotation.fromQuaternion(this.quaternion)}lookAt(t,i=!1){i?this.matrix.lookAt(this.position,t,this.up):this.matrix.lookAt(t,this.position,this.up),this.matrix.getRotation(this.quaternion),this.rotation.fromQuaternion(this.quaternion)}}const Ge=new z,Se=new G,Ye=new G;class ze extends W{constructor(t,{near:i=.1,far:s=100,fov:r=45,aspect:n=1,left:a,right:h,bottom:o,top:l,zoom:c=1}={}){super(),Object.assign(this,{near:i,far:s,fov:r,aspect:n,left:a,right:h,bottom:o,top:l,zoom:c}),this.projectionMatrix=new z,this.viewMatrix=new z,this.projectionViewMatrix=new z,this.worldPosition=new G,this.type=a||h?"orthographic":"perspective",this.type==="orthographic"?this.orthographic():this.perspective()}perspective({near:t=this.near,far:i=this.far,fov:s=this.fov,aspect:r=this.aspect}={}){return Object.assign(this,{near:t,far:i,fov:s,aspect:r}),this.projectionMatrix.fromPerspective({fov:s*(Math.PI/180),aspect:r,near:t,far:i}),this.type="perspective",this}orthographic({near:t=this.near,far:i=this.far,left:s=this.left,right:r=this.right,bottom:n=this.bottom,top:a=this.top,zoom:h=this.zoom}={}){return Object.assign(this,{near:t,far:i,left:s,right:r,bottom:n,top:a,zoom:h}),s/=h,r/=h,n/=h,a/=h,this.projectionMatrix.fromOrthogonal({left:s,right:r,bottom:n,top:a,near:t,far:i}),this.type="orthographic",this}updateMatrixWorld(){return super.updateMatrixWorld(),this.viewMatrix.inverse(this.worldMatrix),this.worldMatrix.getTranslation(this.worldPosition),this.projectionViewMatrix.multiply(this.projectionMatrix,this.viewMatrix),this}lookAt(t){return super.lookAt(t,!0),this}project(t){return t.applyMatrix4(this.viewMatrix),t.applyMatrix4(this.projectionMatrix),this}unproject(t){return t.applyMatrix4(Ge.inverse(this.projectionMatrix)),t.applyMatrix4(this.worldMatrix),this}updateFrustum(){this.frustum||(this.frustum=[new G,new G,new G,new G,new G,new G]);const t=this.projectionViewMatrix;this.frustum[0].set(t[3]-t[0],t[7]-t[4],t[11]-t[8]).constant=t[15]-t[12],this.frustum[1].set(t[3]+t[0],t[7]+t[4],t[11]+t[8]).constant=t[15]+t[12],this.frustum[2].set(t[3]+t[1],t[7]+t[5],t[11]+t[9]).constant=t[15]+t[13],this.frustum[3].set(t[3]-t[1],t[7]-t[5],t[11]-t[9]).constant=t[15]-t[13],this.frustum[4].set(t[3]-t[2],t[7]-t[6],t[11]-t[10]).constant=t[15]-t[14],this.frustum[5].set(t[3]+t[2],t[7]+t[6],t[11]+t[10]).constant=t[15]+t[14];for(let i=0;i<6;i++){const s=1/this.frustum[i].distance();this.frustum[i].multiply(s),this.frustum[i].constant*=s}}frustumIntersectsMesh(t){if(!t.geometry.attributes.position||((!t.geometry.bounds||t.geometry.bounds.radius===1/0)&&t.geometry.computeBoundingSphere(),!t.geometry.bounds))return!0;const i=Se;i.copy(t.geometry.bounds.center),i.applyMatrix4(t.worldMatrix);const s=t.geometry.bounds.radius*t.worldMatrix.getMaxScaleOnAxis();return this.frustumIntersectsSphere(i,s)}frustumIntersectsSphere(t,i){const s=Ye;for(let r=0;r<6;r++){const n=this.frustum[r];if(s.copy(n).dot(t)+n.constant<-i)return!1}return!0}}function Be(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[4],e[4]=t[5],e[5]=t[6],e[6]=t[8],e[7]=t[9],e[8]=t[10],e}function De(e,t){let i=t[0],s=t[1],r=t[2],n=t[3],a=i+i,h=s+s,o=r+r,l=i*a,c=s*a,d=s*h,g=r*a,f=r*h,m=r*o,u=n*a,p=n*h,x=n*o;return e[0]=1-d-m,e[3]=c-x,e[6]=g+p,e[1]=c+x,e[4]=1-l-m,e[7]=f-u,e[2]=g-p,e[5]=f+u,e[8]=1-l-d,e}function Ke(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e}function ke(e,t,i,s,r,n,a,h,o,l){return e[0]=t,e[1]=i,e[2]=s,e[3]=r,e[4]=n,e[5]=a,e[6]=h,e[7]=o,e[8]=l,e}function Qe(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1,e}function Ne(e,t){let i=t[0],s=t[1],r=t[2],n=t[3],a=t[4],h=t[5],o=t[6],l=t[7],c=t[8],d=c*a-h*l,g=-c*n+h*o,f=l*n-a*o,m=i*d+s*g+r*f;return m?(m=1/m,e[0]=d*m,e[1]=(-c*s+r*l)*m,e[2]=(h*s-r*a)*m,e[3]=g*m,e[4]=(c*i-r*o)*m,e[5]=(-h*i+r*n)*m,e[6]=f*m,e[7]=(-l*i+s*o)*m,e[8]=(a*i-s*n)*m,e):null}function dt(e,t,i){let s=t[0],r=t[1],n=t[2],a=t[3],h=t[4],o=t[5],l=t[6],c=t[7],d=t[8],g=i[0],f=i[1],m=i[2],u=i[3],p=i[4],x=i[5],y=i[6],v=i[7],M=i[8];return e[0]=g*s+f*a+m*l,e[1]=g*r+f*h+m*c,e[2]=g*n+f*o+m*d,e[3]=u*s+p*a+x*l,e[4]=u*r+p*h+x*c,e[5]=u*n+p*o+x*d,e[6]=y*s+v*a+M*l,e[7]=y*r+v*h+M*c,e[8]=y*n+v*o+M*d,e}function je(e,t,i){let s=t[0],r=t[1],n=t[2],a=t[3],h=t[4],o=t[5],l=t[6],c=t[7],d=t[8],g=i[0],f=i[1];return e[0]=s,e[1]=r,e[2]=n,e[3]=a,e[4]=h,e[5]=o,e[6]=g*s+f*a+l,e[7]=g*r+f*h+c,e[8]=g*n+f*o+d,e}function Pe(e,t,i){let s=t[0],r=t[1],n=t[2],a=t[3],h=t[4],o=t[5],l=t[6],c=t[7],d=t[8],g=Math.sin(i),f=Math.cos(i);return e[0]=f*s+g*a,e[1]=f*r+g*h,e[2]=f*n+g*o,e[3]=f*a-g*s,e[4]=f*h-g*r,e[5]=f*o-g*n,e[6]=l,e[7]=c,e[8]=d,e}function Oe(e,t,i){let s=i[0],r=i[1];return e[0]=s*t[0],e[1]=s*t[1],e[2]=s*t[2],e[3]=r*t[3],e[4]=r*t[4],e[5]=r*t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e}function Ve(e,t){let i=t[0],s=t[1],r=t[2],n=t[3],a=t[4],h=t[5],o=t[6],l=t[7],c=t[8],d=t[9],g=t[10],f=t[11],m=t[12],u=t[13],p=t[14],x=t[15],y=i*h-s*a,v=i*o-r*a,M=i*l-n*a,w=s*o-r*h,A=s*l-n*h,I=r*l-n*o,b=c*u-d*m,T=c*p-g*m,U=c*x-f*m,C=d*p-g*u,R=d*x-f*u,F=g*x-f*p,E=y*F-v*R+M*C+w*U-A*T+I*b;return E?(E=1/E,e[0]=(h*F-o*R+l*C)*E,e[1]=(o*U-a*F-l*T)*E,e[2]=(a*R-h*U+l*b)*E,e[3]=(r*R-s*F-n*C)*E,e[4]=(i*F-r*U+n*T)*E,e[5]=(s*U-i*R-n*b)*E,e[6]=(u*I-p*A+x*w)*E,e[7]=(p*M-m*I-x*v)*E,e[8]=(m*A-u*M+x*y)*E,e):null}class Ze extends Array{constructor(t=1,i=0,s=0,r=0,n=1,a=0,h=0,o=0,l=1){return super(t,i,s,r,n,a,h,o,l),this}set(t,i,s,r,n,a,h,o,l){return t.length?this.copy(t):(ke(this,t,i,s,r,n,a,h,o,l),this)}translate(t,i=this){return je(this,i,t),this}rotate(t,i=this){return Pe(this,i,t),this}scale(t,i=this){return Oe(this,i,t),this}multiply(t,i){return i?dt(this,t,i):dt(this,this,t),this}identity(){return Qe(this),this}copy(t){return Ke(this,t),this}fromMatrix4(t){return Be(this,t),this}fromQuaternion(t){return De(this,t),this}fromBasis(t,i,s){return this.set(t[0],t[1],t[2],i[0],i[1],i[2],s[0],s[1],s[2]),this}inverse(t=this){return Ne(this,t),this}getNormalMatrix(t){return Ve(this,t),this}}let Je=0;class Z extends W{constructor(t,{geometry:i,program:s,mode:r=t.TRIANGLES,frustumCulled:n=!0,renderOrder:a=0}={}){super(),t.canvas||console.error("gl not passed as first argument to Mesh"),this.gl=t,this.id=Je++,this.geometry=i,this.program=s,this.mode=r,this.frustumCulled=n,this.renderOrder=a,this.modelViewMatrix=new z,this.normalMatrix=new Ze,this.beforeRenderCallbacks=[],this.afterRenderCallbacks=[]}onBeforeRender(t){return this.beforeRenderCallbacks.push(t),this}onAfterRender(t){return this.afterRenderCallbacks.push(t),this}draw({camera:t}={}){this.beforeRenderCallbacks.forEach(s=>s&&s({mesh:this,camera:t})),t&&(this.program.uniforms.modelMatrix||Object.assign(this.program.uniforms,{modelMatrix:{value:null},viewMatrix:{value:null},modelViewMatrix:{value:null},normalMatrix:{value:null},projectionMatrix:{value:null},cameraPosition:{value:null}}),this.program.uniforms.projectionMatrix.value=t.projectionMatrix,this.program.uniforms.cameraPosition.value=t.worldPosition,this.program.uniforms.viewMatrix.value=t.viewMatrix,this.modelViewMatrix.multiply(t.viewMatrix,this.worldMatrix),this.normalMatrix.getNormalMatrix(this.modelViewMatrix),this.program.uniforms.modelMatrix.value=this.worldMatrix,this.program.uniforms.modelViewMatrix.value=this.modelViewMatrix,this.program.uniforms.normalMatrix.value=this.normalMatrix);let i=this.program.cullFace&&this.worldMatrix.determinant()<0;this.program.use({flipFaces:i}),this.geometry.draw({mode:this.mode,program:this.program}),this.afterRenderCallbacks.forEach(s=>s&&s({mesh:this,camera:t}))}}const ft=new Uint8Array(4);function pt(e){return(e&e-1)===0}let Le=1;class mt{constructor(t,{image:i,target:s=t.TEXTURE_2D,type:r=t.UNSIGNED_BYTE,format:n=t.RGBA,internalFormat:a=n,wrapS:h=t.CLAMP_TO_EDGE,wrapT:o=t.CLAMP_TO_EDGE,generateMipmaps:l=!0,minFilter:c=l?t.NEAREST_MIPMAP_LINEAR:t.LINEAR,magFilter:d=t.LINEAR,premultiplyAlpha:g=!1,unpackAlignment:f=4,flipY:m=s==t.TEXTURE_2D,anisotropy:u=0,level:p=0,width:x,height:y=x}={}){this.gl=t,this.id=Le++,this.image=i,this.target=s,this.type=r,this.format=n,this.internalFormat=a,this.minFilter=c,this.magFilter=d,this.wrapS=h,this.wrapT=o,this.generateMipmaps=l,this.premultiplyAlpha=g,this.unpackAlignment=f,this.flipY=m,this.anisotropy=Math.min(u,this.gl.renderer.parameters.maxAnisotropy),this.level=p,this.width=x,this.height=y,this.texture=this.gl.createTexture(),this.store={image:null},this.glState=this.gl.renderer.state,this.state={},this.state.minFilter=this.gl.NEAREST_MIPMAP_LINEAR,this.state.magFilter=this.gl.LINEAR,this.state.wrapS=this.gl.REPEAT,this.state.wrapT=this.gl.REPEAT,this.state.anisotropy=0}bind(){this.glState.textureUnits[this.glState.activeTextureUnit]!==this.id&&(this.gl.bindTexture(this.target,this.texture),this.glState.textureUnits[this.glState.activeTextureUnit]=this.id)}update(t=0){const i=!(this.image===this.store.image&&!this.needsUpdate);if((i||this.glState.textureUnits[t]!==this.id)&&(this.gl.renderer.activeTexture(t),this.bind()),!!i){if(this.needsUpdate=!1,this.flipY!==this.glState.flipY&&(this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,this.flipY),this.glState.flipY=this.flipY),this.premultiplyAlpha!==this.glState.premultiplyAlpha&&(this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,this.premultiplyAlpha),this.glState.premultiplyAlpha=this.premultiplyAlpha),this.unpackAlignment!==this.glState.unpackAlignment&&(this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT,this.unpackAlignment),this.glState.unpackAlignment=this.unpackAlignment),this.minFilter!==this.state.minFilter&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_MIN_FILTER,this.minFilter),this.state.minFilter=this.minFilter),this.magFilter!==this.state.magFilter&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_MAG_FILTER,this.magFilter),this.state.magFilter=this.magFilter),this.wrapS!==this.state.wrapS&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_S,this.wrapS),this.state.wrapS=this.wrapS),this.wrapT!==this.state.wrapT&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_T,this.wrapT),this.state.wrapT=this.wrapT),this.anisotropy&&this.anisotropy!==this.state.anisotropy&&(this.gl.texParameterf(this.target,this.gl.renderer.getExtension("EXT_texture_filter_anisotropic").TEXTURE_MAX_ANISOTROPY_EXT,this.anisotropy),this.state.anisotropy=this.anisotropy),this.image){if(this.image.width&&(this.width=this.image.width,this.height=this.image.height),this.target===this.gl.TEXTURE_CUBE_MAP)for(let s=0;s<6;s++)this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+s,this.level,this.internalFormat,this.format,this.type,this.image[s]);else if(ArrayBuffer.isView(this.image))this.gl.texImage2D(this.target,this.level,this.internalFormat,this.width,this.height,0,this.format,this.type,this.image);else if(this.image.isCompressedTexture)for(let s=0;s<this.image.length;s++)this.gl.compressedTexImage2D(this.target,s,this.internalFormat,this.image[s].width,this.image[s].height,0,this.image[s].data);else this.gl.texImage2D(this.target,this.level,this.internalFormat,this.format,this.type,this.image);this.generateMipmaps&&(!this.gl.renderer.isWebgl2&&(!pt(this.image.width)||!pt(this.image.height))?(this.generateMipmaps=!1,this.wrapS=this.wrapT=this.gl.CLAMP_TO_EDGE,this.minFilter=this.gl.LINEAR):this.gl.generateMipmap(this.target)),this.onUpdate&&this.onUpdate()}else if(this.target===this.gl.TEXTURE_CUBE_MAP)for(let s=0;s<6;s++)this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+s,0,this.gl.RGBA,1,1,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,ft);else this.width?this.gl.texImage2D(this.target,this.level,this.internalFormat,this.width,this.height,0,this.format,this.type,null):this.gl.texImage2D(this.target,0,this.gl.RGBA,1,1,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,ft);this.store.image=this.image}}}class He extends Array{constructor(t=0,i=t,s=t,r=t){return super(t,i,s,r),this}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}get w(){return this[3]}set x(t){this[0]=t}set y(t){this[1]=t}set z(t){this[2]=t}set w(t){this[3]=t}set(t,i,s,r){return t.length?this.copy(t):(Et(this,t,i,s,r),this)}copy(t){return wt(this,t),this}normalize(){return Ut(this,this),this}multiply(t){return qt(this,this,t),this}dot(t){return Ft(this,t)}fromArray(t,i=0){return this[0]=t[i],this[1]=t[i+1],this[2]=t[i+2],this[3]=t[i+3],this}toArray(t=[],i=0){return t[i]=this[0],t[i+1]=this[1],t[i+2]=this[2],t[i+3]=this[3],t}}class q extends vt{constructor(t,{width:i=1,height:s=1,widthSegments:r=1,heightSegments:n=1,attributes:a={}}={}){const h=r,o=n,l=(h+1)*(o+1),c=h*o*6,d=new Float32Array(l*3),g=new Float32Array(l*3),f=new Float32Array(l*2),m=c>65536?new Uint32Array(c):new Uint16Array(c);q.buildPlane(d,g,f,m,i,s,0,h,o),Object.assign(a,{position:{size:3,data:d},normal:{size:3,data:g},uv:{size:2,data:f},index:{data:m}}),super(t,a)}static buildPlane(t,i,s,r,n,a,h,o,l,c=0,d=1,g=2,f=1,m=-1,u=0,p=0){const x=u,y=n/o,v=a/l;for(let M=0;M<=l;M++){let w=M*v-a/2;for(let A=0;A<=o;A++,u++){let I=A*y-n/2;if(t[u*3+c]=I*f,t[u*3+d]=w*m,t[u*3+g]=h/2,i[u*3+c]=0,i[u*3+d]=0,i[u*3+g]=h>=0?1:-1,s[u*2]=A/o,s[u*2+1]=1-M/l,M===l||A===o)continue;let b=x+A+M*(o+1),T=x+A+(M+1)*(o+1),U=x+A+(M+1)*(o+1)+1,C=x+A+M*(o+1)+1;r[p*6]=b,r[p*6+1]=T,r[p*6+2]=C,r[p*6+3]=T,r[p*6+4]=U,r[p*6+5]=C,p++}}}}const We="data:image/jpeg;base64,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",qe=.5*(Math.sqrt(3)-1),D=(3-Math.sqrt(3))/6,ut=e=>Math.floor(e)|0,xt=new Float64Array([1,1,-1,1,1,-1,-1,-1,1,0,-1,0,1,0,-1,0,0,1,0,-1,0,1,0,-1]);function Xe(e=Math.random){const t=_e(e),i=new Float64Array(t).map(r=>xt[r%12*2]),s=new Float64Array(t).map(r=>xt[r%12*2+1]);return function(n,a){let h=0,o=0,l=0;const c=(n+a)*qe,d=ut(n+c),g=ut(a+c),f=(d+g)*D,m=d-f,u=g-f,p=n-m,x=a-u;let y,v;p>x?(y=1,v=0):(y=0,v=1);const M=p-y+D,w=x-v+D,A=p-1+2*D,I=x-1+2*D,b=d&255,T=g&255;let U=.5-p*p-x*x;if(U>=0){const F=b+t[T],E=i[F],Y=s[F];U*=U,h=U*U*(E*p+Y*x)}let C=.5-M*M-w*w;if(C>=0){const F=b+y+t[T+v],E=i[F],Y=s[F];C*=C,o=C*C*(E*M+Y*w)}let R=.5-A*A-I*I;if(R>=0){const F=b+1+t[T+1],E=i[F],Y=s[F];R*=R,l=R*R*(E*A+Y*I)}return 70*(h+o+l)}}function _e(e){const i=new Uint8Array(512);for(let s=0;s<512/2;s++)i[s]=s;for(let s=0;s<512/2-1;s++){const r=s+~~(e()*(256-s)),n=i[s];i[s]=i[r],i[r]=n}for(let s=256;s<512;s++)i[s]=i[s-256];return i}function At(e){return e*(.5-Math.random())}function Q(e,t){return e+Math.random()*(t-e)}const Mt=Xe(Math.random);function K(e){return Math.max(0,Math.min(1,e))}function $e(e,t,i){i=i||0;const s=t,r=2,n=2,a=r/s,h=a*Math.sqrt(3)/2,o=n/h,l=[],c=[],d=[],g=[],f=[],m=[],u=[];let p=0;const x=[];let y=0;const v=2;for(let w=0;w<o;w+=1){y=w*h,w%2===1?p=-a/2:p=0;for(let A=0;A<=s;A+=1){const I=Math.sign(A*a+p-r/2);c.push(A*a+p-r/2,y-n/2,0),u.push((A*a+p)/r,y/n),c.push(A*a+a/2+p-r/2,h+y-n/2,0),u.push((A*a+a/2+p)/r,(h+y)/n),c.push(A*a-a/2+p-r/2,h+y-n/2,0),u.push((A*a-a/2+p)/r,(h+y)/n);let b=Mt(A/o,w/o)+Math.random();const T=K(y/n+2*b/t);let U=Math.random();l.push(T,K(T+.1*i),K(T+.1*i)),m.push(U,U,U);const C=[A*a+p-r/2,y-n/2,0];d.push(...C,...C,...C);const R=[v*I*Q(-.3,.3),-v*Q(-.3,.3)*1.5,-At(.5)],F=[v*I*Q(.3,.6),-v*Q(.3,.6)*1.5,-At(.5)];g.push(...R,...R,...R),f.push(...F,...F,...F),x.push(0,0,1,0,1,0,1,0,0),c.push(A*a+p-r/2,y-n/2,0),u.push((A*a+p)/r,y/n),c.push(A*a+a+p-r/2,y-n/2,0),u.push((A*a+a+p)/r,y/n),c.push(A*a+a/2+p-r/2,h+y-n/2,0),u.push((A*a+a/2+p)/r,(h+y)/n),b=Mt((A+1)/o,w/o)+Math.random();const E=K(y/n+2*b/t);U=Math.random(),l.push(E,E,K(E+.1*i)),m.push(U,U,U);const Y=[A*a+p-r/2,y-n/2,0];g.push(...R,...R,...R),f.push(...F,...F,...F),d.push(...Y,...Y,...Y),x.push(0,0,1,0,1,0,1,0,0)}}const M=new vt(e);return M.addAttribute("position",{size:3,data:new Float32Array(c)}),M.addAttribute("bary",{size:3,data:new Float32Array(x)}),M.addAttribute("uv",{size:2,data:new Float32Array(u)}),M.addAttribute("offset",{size:1,data:new Float32Array(l)}),M.addAttribute("centroid1",{size:3,data:new Float32Array(d)}),M.addAttribute("control0",{size:3,data:new Float32Array(g)}),M.addAttribute("control1",{size:3,data:new Float32Array(f)}),M.addAttribute("random",{size:1,data:new Float32Array(m)}),M}const B="float PI = 3.141592653589793238;",S=`
#extension GL_OES_standard_derivatives : enable
precision highp float;

uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform vec4 resolution;
varying vec2 vUv;
`,X=`
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute float offset;
attribute vec3 bary;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float progress;
uniform vec4 resolution;

varying vec2 vUv;
varying float vProgress;
varying float vProgress1;
varying vec3 vBary;
`,_=`
mat4 rotationMatrix(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;

  return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
              oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
              oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
              0.0,                                0.0,                                0.0,                                1.0);
}
vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotationMatrix(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}
`,ti={uniforms:{intensity:{value:1,type:"f",min:0,max:3}},fragment:`
  ${S}
  uniform float intensity;
  uniform sampler2D displacement;
  mat2 getRotM(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }
  const float PI = 3.1415;
  const float angle1 = PI *0.25;
  const float angle2 = -PI *0.75;
  void main()	{
    vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
    vec4 disp = texture2D(displacement, newUV);
    vec2 dispVec = vec2(disp.r, disp.g);
    vec2 distortedPosition1 = newUV + getRotM(angle1) * dispVec * intensity * progress;
    vec4 t1 = texture2D(texture1, distortedPosition1);
    vec2 distortedPosition2 = newUV + getRotM(angle2) * dispVec * intensity * (1.0 - progress);
    vec4 t2 = texture2D(texture2, distortedPosition2);
    gl_FragColor = mix(t1, t2, progress);
  }
`},ei={uniforms:{intensity:{value:.3,type:"f",min:0,max:2}},fragment:`
  ${S}
  uniform float intensity;
  uniform sampler2D displacement;
  void main()	{
    vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
    vec4 d1 = texture2D(texture1, newUV);
    vec4 d2 = texture2D(texture2, newUV);
    float displace1 = (d1.r + d1.g + d1.b)*0.33;
    float displace2 = (d2.r + d2.g + d2.b)*0.33;

    vec4 t1 = texture2D(texture1, vec2(newUV.x, newUV.y + progress * (displace2 * intensity)));
    vec4 t2 = texture2D(texture2, vec2(newUV.x, newUV.y + (1.0 - progress) * (displace1 * intensity)));
    gl_FragColor = mix(t1, t2, progress);
  }
`},ii={uniforms:{},fragment:`
    ${S}
    const float MIN_AMOUNT = -0.16;
    const float MAX_AMOUNT = 1.5;

    const float PI = 3.141592653589793;

    const float scale = 512.0;
    const float sharpness = 3.0;

    const float cylinderRadius = 1.0 / PI / 2.0;

    vec4 getFromColor(vec2 p) {
      return texture2D(texture1, p);
    }

    vec4 getToColor(vec2 p) {
      return texture2D(texture2, p);
    }

    vec3 hitPoint(float hitAngle, float yc, vec3 point, mat3 rrotation) {
      float hitPoint = hitAngle / (2.0 * PI);
      point.y = hitPoint;
      return rrotation * point;
    }

    vec4 antiAlias(vec4 color1, vec4 color2, float distanc) {
      distanc *= scale;
      if(distanc < 0.0)
        return color2;
      if(distanc > 2.0)
        return color1;
      float dd = pow(1.0 - distanc / 2.0, sharpness);
      return ((color2 - color1) * dd) + color1;
    }

    float distanceToEdge(vec3 point) {
      float dx = abs(point.x > 0.5 ? 1.0 - point.x : point.x);
      float dy = abs(point.y > 0.5 ? 1.0 - point.y : point.y);
      if(point.x < 0.0)
        dx = -point.x;
      if(point.x > 1.0)
        dx = point.x - 1.0;
      if(point.y < 0.0)
        dy = -point.y;
      if(point.y > 1.0)
        dy = point.y - 1.0;
      if((point.x < 0.0 || point.x > 1.0) && (point.y < 0.0 || point.y > 1.0))
        return sqrt(dx * dx + dy * dy);
      return min(dx, dy);
    }

    vec4 seeThrough(float yc, vec2 p, mat3 rotation, mat3 rrotation, float cylinderAngle) {
      float hitAngle = PI - (acos(yc / cylinderRadius) - cylinderAngle);
      vec3 point = hitPoint(hitAngle, yc, rotation * vec3(p, 1.0), rrotation);
      if(yc <= 0.0 && (point.x < 0.0 || point.y < 0.0 || point.x > 1.0 || point.y > 1.0)) {
        return getToColor(p);
      }

      if(yc > 0.0)
        return getFromColor(p);

      vec4 color = getFromColor(point.xy);
      vec4 tcolor = vec4(0.0);

      return antiAlias(color, tcolor, distanceToEdge(point));
    }

    vec4 seeThroughWithShadow(float yc, vec2 p, vec3 point, mat3 rotation, mat3 rrotation, float cylinderAngle, float amount) {
      float shadow = distanceToEdge(point) * 30.0;
      shadow = (1.0 - shadow) / 3.0;

      if(shadow < 0.0)
        shadow = 0.0;
      else
        shadow *= amount;

      vec4 shadowColor = seeThrough(yc, p, rotation, rrotation, cylinderAngle);
      shadowColor.r -= shadow;
      shadowColor.g -= shadow;
      shadowColor.b -= shadow;

      return shadowColor;
    }

    vec4 backside(float yc, vec3 point) {
      vec4 color = getFromColor(point.xy);
      float gray = (color.r + color.b + color.g) / 15.0;
      gray += (8.0 / 10.0) * (pow(1.0 - abs(yc / cylinderRadius), 2.0 / 10.0) / 2.0 + (5.0 / 10.0));
      color.rgb = vec3(gray);
      return color;
    }

    vec4 behindSurface(vec2 p, float yc, vec3 point, mat3 rrotation, float cylinderAngle, float amount) {
      float shado = (1.0 - ((-cylinderRadius - yc) / amount * 7.0)) / 6.0;
      shado *= 1.0 - abs(point.x - 0.5);

      yc = (-cylinderRadius - cylinderRadius - yc);

      float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;
      point = hitPoint(hitAngle, yc, point, rrotation);

      if(yc < 0.0 && point.x >= 0.0 && point.y >= 0.0 && point.x <= 1.0 && point.y <= 1.0 && (hitAngle < PI || amount > 0.5)) {
        shado = 1.0 - (sqrt(pow(point.x - 0.5, 2.0) + pow(point.y - 0.5, 2.0)) / (71.0 / 100.0));
        shado *= pow(-yc / cylinderRadius, 3.0);
        shado *= 0.5;
      } else {
        shado = 0.0;
      }
      return vec4(getToColor(p).rgb - shado, 1.0);
    }

    void main() {
      vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);

      float amount = progress * (MAX_AMOUNT - MIN_AMOUNT) + MIN_AMOUNT;
      float cylinderCenter = amount;
          // 360 degrees * amount
      float cylinderAngle = 2.0 * PI * amount;

      const float angle = 100.0 * PI / 180.0;
      float c = cos(-angle);
      float s = sin(-angle);

      mat3 rotation = mat3(c, s, 0, -s, c, 0, -0.801, 0.8900, 1);
      c = cos(angle);
      s = sin(angle);

      mat3 rrotation = mat3(c, s, 0, -s, c, 0, 0.98500, 0.985, 1);

      vec3 point = rotation * vec3(newUV, 1.0);

      float yc = point.y - cylinderCenter;

      if(yc < -cylinderRadius) {
                        // Behind surface
        gl_FragColor = behindSurface(newUV, yc, point, rrotation, cylinderAngle, amount);
        return;
      }

      if(yc > cylinderRadius) {
                        // Flat surface
        gl_FragColor = getFromColor(newUV);
        return;
      }

      float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;

      float hitAngleMod = mod(hitAngle, 2.0 * PI);
      if((hitAngleMod > PI && amount < 0.5) || (hitAngleMod > PI / 2.0 && amount < 0.0)) {
        gl_FragColor = seeThrough(yc, newUV, rotation, rrotation, cylinderAngle);
        return;
      }

      point = hitPoint(hitAngle, yc, point, rrotation);

      if(point.x < 0.0 || point.y < 0.0 || point.x > 1.0 || point.y > 1.0) {
        gl_FragColor = seeThroughWithShadow(yc, newUV, point, rotation, rrotation, cylinderAngle, amount);
        return;
      }

      vec4 color = backside(yc, point);

      vec4 otherColor;
      if(yc < 0.0) {
        float shado = 1.0 - (sqrt(pow(point.x - 0.5, 2.0) + pow(point.y - 0.5, 2.0)) / 0.71);
        shado *= pow(-yc / cylinderRadius, 3.0);
        shado *= 0.5;
        otherColor = vec4(0.0, 0.0, 0.0, shado);
      } else {
        otherColor = getFromColor(newUV);
      }

      color = antiAlias(color, otherColor, cylinderRadius - abs(yc));

      vec4 cl = seeThroughWithShadow(yc, newUV, point, rotation, rrotation, cylinderAngle, amount);
      float dist = distanceToEdge(point);

      gl_FragColor = antiAlias(color, cl, dist);
    }
  `},si={uniforms:{},fragment:`
    ${S}
    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
      vec2 p = newUV;
      float x = progress;
      x = smoothstep(.0,1.0,(x*2.0+p.x-1.0));
      vec4 f = mix(
        texture2D(texture1, (p-.5)*(1.-x)+.5),
        texture2D(texture2, (p-.5)*x+.5),
        x);
      gl_FragColor = f;
    }
  `},ri={uniforms:{},fragment:`
    ${S}
    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
      vec2 p = newUV;
      float x = progress;
      x = smoothstep(.0,1.0,(x*2.0+p.y-1.0));
      vec4 f = mix(
        texture2D(texture1, (p-.5)*(1.-x)+.5),
        texture2D(texture2, (p-.5)*x+.5),
        x);
      gl_FragColor = f;
    }
  `},ni={uniforms:{},fragment:`
    ${S}
    ivec2 squaresMin = ivec2(50);
    int steps = 20;

    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      float d = min(progress, 1.0 - progress);
      float dist = steps>0 ? ceil(d * float(steps)) / float(steps) : d;
      vec2 squareSize = 2.0 * dist / vec2(squaresMin);

      vec2 p = dist>0.0 ? (floor(newUV / squareSize) + 0.5) * squareSize : newUV;

      vec2 uv1 = newUV;
      vec2 uv2 = newUV;

      vec4 t1 = texture2D(texture1,p);
      vec4 t2 = texture2D(texture2,p);

      gl_FragColor = mix(t1, t2, progress);
    }
  `},ai={uniforms:{},detail:12,offsetTop:0,vertex:`
    ${X}
    attribute vec3 centroid1;

    ${_}

    void main() {
      ${B}
      vUv = uv;
      vBary = bary;

      vec3 newpos = position;

      float o = 1. - offset;
      float pr = (progress - 0.5) * (0. + resolution.y / resolution.x) + 0.5;
      pr = progress;
      float prog = clamp((pr - o * 0.9) / 0.1, 0., 1.);
      vProgress = prog;
      vProgress1 = clamp((pr - clamp(o - 0.1, 0., 1.) * 0.9) / 0.1, 0., 1.);
      newpos = rotate((newpos - centroid1), vec3(1., 0., 0.), -prog * PI) + centroid1 + vec3(0., -1., 0.) * prog * 0.;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
    }
  `,fragment:`
    ${S}
    varying float vProgress;
    varying float vProgress1;
    ${B}
    varying vec3 vBary;

    void main()	{
      float width = 2.5 * vProgress1;
      vec3 d;
      #ifdef GL_OES_standard_derivatives
        d = fwidth(vBary);
      #endif
      vec3 s = smoothstep(d * (width + 0.5), d * (width - 0.5), vBary);
      float alpha = max(max(s.x, s.y), s.z);
      vec3 color = vec3(alpha);
      vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
      vec4 t = texture2D(texture1, newUV);
      float opa = smoothstep(1., 0.5, vProgress);
      opa = 1. - vProgress;
      gl_FragColor = vec4(vUv, 0.0, opa);
      gl_FragColor = vec4(t.rgb + .5 * color * vProgress1, opa);
    }
  `},hi={uniforms:{},detail:20,offsetTop:.4,vertex:`
    ${X}
    ${_}

    void main() {
      ${B}
      vUv = uv;
      vBary = bary;

      vec3 newpos = position;

      float o = 1. - offset;
      float prog = clamp((progress - o * 0.6) / 0.4, 0., 1.);
      vProgress = prog;
      vProgress1 = clamp((progress - clamp(o - 0.1, -0., 1.) * 0.9) / 0.1, 0., 1.);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
    }
  `,fragment:`
    ${S}
    varying float vProgress;
    varying float vProgress1;
    ${B}
    varying vec3 vBary;
    void main()	{
      float width = 2.5 * vProgress1;
      vec3 d;
      #ifdef GL_OES_standard_derivatives
        d = fwidth(vBary);
      #endif
      vec3 s = smoothstep(d * (width + 0.5), d * (width - 0.5), vBary);
      float alpha = max(max(s.x, s.y), s.z);
      vec3 color = vec3(alpha);

      vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
      vec4 t = texture2D(texture1, newUV);
      float opa = smoothstep(1., 0.5, vProgress);
      opa = 1. - vProgress;
      gl_FragColor = vec4(t.rgb + 1. * color * vProgress1, opa);
    }
  `},oi={uniforms:{},detail:40,offsetTop:1,vertex:`
    ${X}
    attribute vec3 control0;
    attribute vec3 control1;

    ${_}

    float easeOut(float t){
      return  t * t * t;
    }

    vec3 bezier4(vec3 a, vec3 b, vec3 c, vec3 d, float t) {
      return mix(mix(mix(a, b, t), mix(b, c, t), t), mix(mix(b, c, t), mix(c, d, t), t), t);
    }

    void main() {
      ${B}
      vUv = uv;
      vBary = bary;

      vec3 newpos = position;

      float o = 1. - offset;
      float prog = clamp((progress - o * 0.6) / 0.4, 0., 1.);
      vProgress = prog;
      vProgress1 = clamp((progress - clamp(o - 0.2, -0., 1.) * 0.6) / 0.4, 0., 1.);
      newpos = bezier4(newpos, control0, control1, newpos, easeOut(prog));
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
    }
  `,fragment:`
    ${S}
    varying float vProgress;
    varying float vProgress1;
    ${B}
    varying vec3 vBary;
    void main()	{
      float width = 2.5 * vProgress1;
      vec3 d;
      #ifdef GL_OES_standard_derivatives
        d = fwidth(vBary);
      #endif
      vec3 s = smoothstep(d * (width + 0.5), d * (width - 0.5), vBary);
      float alpha = max(max(s.x, s.y), s.z);
      vec3 color = vec3(alpha);

      vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
      vec4 t = texture2D(texture1, newUV);
      float opa = smoothstep(1., 0.5, vProgress);
      opa = 1. - vProgress;
      gl_FragColor = vec4(vUv, 0.0, opa);
      opa = smoothstep(0.5, 1., opa);
      gl_FragColor = vec4(t.rgb + 1. * color * vProgress1, opa);
    }
  `},li={uniforms:{radius:{value:.9,type:"f",min:.1,max:2},width:{value:.35,type:"f",min:0,max:1}},fragment:`
    ${S}
    uniform float width;
    uniform float radius;
    uniform sampler2D displacement;
    float parabola( float x, float k ) {
      return pow( 4. * x * ( 1. - x ), k );
    }
    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
      vec2 p = newUV;
      vec2 start = vec2(0.5,0.5);
      vec2 aspect = resolution.wz;
      vec2 uv = newUV;
      float dt = parabola(progress, 1.);
      vec4 noise = texture2D(displacement, fract(vUv+time*0.04));
      float prog = progress*0.66 + noise.g * 0.04;
      float circ = 1. - smoothstep(-width, 0.0, radius * distance(start*aspect, uv*aspect) - prog*(1.+width));
      float intpl = pow(abs(circ), 1.);
      vec4 t1 = texture2D( texture1, (uv - 0.5) * (1.0 - intpl) + 0.5 ) ;
      vec4 t2 = texture2D( texture2, (uv - 0.5) * intpl + 0.5 );
      gl_FragColor = mix( t1, t2, intpl );
    }
  `},ci={uniforms:{intensity:{value:50,type:"f",min:1,max:100}},fragment:`
    ${S}
    uniform float intensity;
    mat2 rotate(float a) {
      float s = sin(a);
      float c = cos(a);
      return mat2(c, -s, s, c);
    }
    const float PI = 3.1415;
    const float angle1 = PI *0.25;
    const float angle2 = PI *0.25;

    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      vec2 uvDivided = fract(newUV*vec2(intensity,1.));

      vec2 uvDisplaced1 = newUV + rotate(angle1)*uvDivided*progress*0.1;
      vec2 uvDisplaced2 = newUV + rotate(angle2)*uvDivided*(1. - progress)*0.1;

      vec4 t1 = texture2D(texture1,uvDisplaced1);
      vec4 t2 = texture2D(texture2,uvDisplaced2);

      gl_FragColor = mix(t1, t2, progress);
    }

  `},gi={uniforms:{size:{value:.25,type:"f",min:.1,max:1}},fragment:`
    ${S}
    uniform float size; // = 0.2
    float count = 20.; // = 10.0
    float smoothness = .5; // = 0.5
    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      float pr = smoothstep(-smoothness, 0.0, newUV.x - progress * (1.0 + smoothness));
      float s = step(pr, fract(count * newUV.x));

      vec2 uv1 = newUV;
      vec2 uv2 = newUV;

      vec4 t1 = texture2D(texture1,uv1);
      vec4 t2 = texture2D(texture2,uv2);
      gl_FragColor = mix(t1, t2, s);

    }
  `},di={uniforms:{},fragment:`
    ${S}
    ivec2 squares = ivec2(10,10);
    vec2 direction = vec2(1.0, -0.5);
    float smoothness = 1.6;

    const vec2 center = vec2(0.5, 0.5);
    void main() {
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      vec2 v = normalize(direction);
      v /= abs(v.x)+abs(v.y);
      float d = v.x * center.x + v.y * center.y;
      float offset = smoothness;
      float pr = smoothstep(-offset, 0.0, v.x * newUV.x + v.y * newUV.y - (d-0.5+progress*(1.+offset)));
      vec2 squarep = fract(newUV*vec2(squares));
      vec2 squaremin = vec2(pr/2.0);
      vec2 squaremax = vec2(1.0 - pr/2.0);
      float a = (1.0 - step(progress, 0.0)) * step(squaremin.x, squarep.x) * step(squaremin.y, squarep.y) * step(squarep.x, squaremax.x) * step(squarep.y, squaremax.y);

      vec2 uv1 = newUV;
      vec2 uv2 = newUV;

      vec4 t1 = texture2D(texture1,newUV);
      vec4 t2 = texture2D(texture2,newUV);

      gl_FragColor = mix(t1, t2, a);
    }
  `},fi={uniforms:{intensity:{value:50,type:"f",min:1,max:100}},fragment:`
    ${S}
    uniform float intensity;
    mat2 rotate(float a) {
      float s = sin(a);
      float c = cos(a);
      return mat2(c, -s, s, c);
    }
    const float PI = 3.1415;
    const float angle1 = PI *0.25;
    const float angle2 = -PI *0.75;
    const float noiseSeed = 2.;
    float random() {
      return fract(sin(noiseSeed + dot(gl_FragCoord.xy / resolution.xy / 10.0, vec2(12.9898, 4.1414))) * 43758.5453);
    }
    float hash(float n) { return fract(sin(n) * 1e4); }
    float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }
    float hnoise(vec2 x) {
      vec2 i = floor(x);
      vec2 f = fract(x);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      float hn = hnoise(newUV.xy * resolution.xy / 100.0);
      vec2 d = vec2(0.,normalize(vec2(0.5,0.5) - newUV.xy).y);
      vec2 uv1 = newUV + d * progress / 5.0 * (1.0 + hn / 2.0);
      vec2 uv2 = newUV - d * (1.0 - progress) / 5.0 * (1.0 + hn / 2.0);
      vec4 t1 = texture2D(texture1,uv1);
      vec4 t2 = texture2D(texture2,uv2);
      gl_FragColor = mix(t1, t2, progress);
    }
  `},pi={uniforms:{},fragment:`
  ${S}
  uniform sampler2D displacement;
  vec2 mirrored(vec2 v) {
    vec2 m = mod(v,2.);
    return mix(m,2.0 - m, step(1.0 ,m));
  }
  void main()	{
    vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
    vec4 noise = texture2D(displacement, mirrored(newUV+time*0.04));
    float prog = (1.0 - progress)*0.8 -0.05 + noise.g * 0.06;
    float intpl = pow(abs(smoothstep(0., 1., (prog*2. - vUv.x + 0.5))), 10.);

    vec4 t1 = texture2D( texture2, (newUV - 0.5) * (1.0 - intpl) + 0.5 ) ;
    vec4 t2 = texture2D( texture1, (newUV - 0.5) * intpl + 0.5 );
    gl_FragColor = mix( t1, t2, intpl );
  }
  `},mi={uniforms:{},fragment:`
    ${S}
    float size = 0.2;

    float rand (vec2 co) {
      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      float r = rand(vec2(0, newUV.y));
      float m = smoothstep(0.0, -size, newUV.x*(1.0-size) + size*r - ((progress) * (1.0 + size)));

      vec2 uv1 = newUV;
      vec2 uv2 = newUV;

      vec4 t1 = texture2D(texture1,uv1);
      vec4 t2 = texture2D(texture2,uv2);
      gl_FragColor = mix(t1, t2, m);

    }
  `},ui={uniforms:{},fragment:`
    ${S}
    const float SQRT_2 = 1.414213562373;
    const vec2 center = vec2(0, 0);// = vec2(0, 0);
    const float dots = 20.0;// = 20.0;

    vec4 getFromColor(vec2 p) {
      return texture2D(texture1, p);
    }

    vec4 getToColor(vec2 p) {
      return texture2D(texture2, p);
    }

    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      bool nextImage = distance(fract(newUV * dots), vec2(0.5, 0.5)) < ( progress / distance(newUV, center));
      gl_FragColor = nextImage ? getToColor(newUV) : getFromColor(newUV);
    }

  `},xi={uniforms:{},fragment:`
    ${S}
    const float size = 0.04; // = 0.04
    const float zoom = 100.0; // = 50.0
    const float colorSeparation = 0.3; // = 0.3

    vec4 getFromColor(vec2 p) {
      return texture2D(texture1, p);
    }

    vec4 getToColor(vec2 p) {
      return texture2D(texture2, p);
    }

    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      float inv = 1. - progress;
      vec2 disp = size*vec2(cos(zoom*newUV.x), sin(zoom*newUV.y));
      vec4 texTo = getToColor(newUV + inv*disp);
      vec4 texFrom = vec4(
        getFromColor(newUV + progress*disp*(1.0 - colorSeparation)).r,
        getFromColor(newUV + progress*disp).g,
        getFromColor(newUV + progress*disp*(1.0 + colorSeparation)).b,
        1.0);
      gl_FragColor = texTo*progress + texFrom*inv;
    }

  `},k={dots:ui,flyeye:xi,"morph-x":ti,"morph-y":ei,"page-curl":ii,"peel-x":si,"peel-y":ri,"polygons-fall":ai,"polygons-morph":hi,"polygons-wind":oi,pixelize:ni,ripple:li,shutters:ci,slices:gi,squares:di,stretch:fi,"wave-x":pi,wind:mi},N=`
attribute vec2 uv;
attribute vec3 position;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,J=()=>{const e=Math.floor(Math.random()*Object.keys(k).length);return k[Object.keys(k)[e]]};class Ai{constructor(t){const i=t.shader==="random"?J():k[t.shader];this.shader=i,this.scene=new W,this.swiper=t.swiper,this.vertex=i.vertex||N,this.fragment=i.fragment,this.uniforms=i.uniforms||{},this.renderer=new Wt({dpr:2,webgl:2}),this.gl=this.renderer.gl,this.width=window.innerWidth,this.height=window.innerHeight,this.renderer.setSize(this.width,this.height),this.gl.clearColor(1,1,1,1),this.container=this.swiper.el,this.images=[],this.displacementTexture=null,this.container.querySelectorAll(".swiper-gl-image").forEach(s=>{this.images.push(s.src)}),this.width=this.swiper.width,this.height=this.swiper.height,this.container.prepend(this.gl.canvas),this.camera=new ze(this.gl,{fov:45}),this.camera.perspective({aspect:this.gl.canvas.width/this.gl.canvas.height}),this.camera.position.set(0,0,2),this.time=0,this.current=0,this.textures=[],this.init(()=>{this.addObjects(),this.resize(),this.render()})}animateUniform(t,i,s){const r=t.value;let n=null,a;window.cancelAnimationFrame(this.animateUniformFrame);const h=i>t.value?"next":"prev",o=(c,d)=>h==="next"&&c>=d||h==="prev"&&c<=d,l=()=>{a=new Date().getTime(),n===null&&(n=a);const c=Math.max(Math.min((a-n)/this.swiper.params.speed,1),0),d=.5-Math.cos(c*Math.PI)/2;let g=r+d*(i-r);if(o(g,i)&&(g=i),t.value=g,o(g,i)){cancelAnimationFrame(this.animateUniformFrame),s&&s();return}this.animateUniformFrame=requestAnimationFrame(l)};l()}init(t){const i=[],s=this;this.images.forEach((r,n)=>{const a=new Promise(h=>{const o=new Image,l=new mt(this.gl);o.onload=()=>{l.image=o,s.textures[n]=l,h()},o.src=r});i.push(a)}),i.push(new Promise(r=>{const n=new Image,a=new mt(this.gl);n.onload=()=>{a.image=n,s.displacementTexture=a,r()},n.src=We})),Promise.all(i).then(()=>{this.initialized=!0,this.onInit&&this.onInit(),t()})}resize(){if(!this.initialized||this.destroyed)return;const{width:t,height:i}=this.swiper;this.width=t,this.height=i,this.renderer.setSize(t,i);const s=this.camera.position.z;if(this.camera.perspective({aspect:t/i,fov:2*(180/Math.PI)*Math.atan(1/(2*s))}),!this.textures[0].image)return;const r=this.textures[0].image.height/this.textures[0].image.width;let n,a;i/t>r?(n=t/i*r,a=1):(n=1,a=i/t/r),this.material.uniforms.resolution.value.x=t,this.material.uniforms.resolution.value.y=i,this.material.uniforms.resolution.value.z=n,this.material.uniforms.resolution.value.w=a,this.shader.vertex&&this.vertexMaterial&&(this.vertexMaterial.uniforms.resolution.value.x=t,this.vertexMaterial.uniforms.resolution.value.y=i,this.vertexMaterial.uniforms.resolution.value.z=n,this.vertexMaterial.uniforms.resolution.value.w=a),this.shader.vertex?(this.nextMesh.scale.set(this.camera.aspect/2,1/2,1/2),this.currentMesh.scale.set(this.camera.aspect/2,1/2,1/2)):(this.plane.scale.x=this.camera.aspect,this.plane.scale.y=1)}createMaterial(){return new Vt(this.gl,{extensions:{derivatives:"#extension GL_OES_standard_derivatives : disabled"},uniforms:{time:{type:"f",value:0},progress:{type:"f",value:0},intensity:{type:"f",value:0},width:{type:"f",value:0},radius:{type:"f",value:0},size:{type:"f",value:0},texture1:{type:"f",value:this.textures[0]},texture2:{type:"f",value:this.textures[1]},displacement:{type:"f",value:this.displacementTexture},resolution:{type:"v4",value:new He}},vertex:this.shader.vertex||N,fragment:this.shader.fragment,...this.shader.vertex?{transparent:!0,depthWrite:!1}:{}})}addObjects(){if(this.scene.children.forEach(t=>{this.scene.removeChild(t)}),this.scene.children.forEach(t=>{this.scene.removeChild(t)}),this.material=this.createMaterial(),this.shader.vertex){const t=$e(this.gl,this.shader.detail,this.shader.offsetTop),i=this.textures[1];this.vertexMaterial=this.createMaterial(),this.vertexMaterial.uniforms.texture1.value=i,this.currentMesh=new Z(this.gl,{geometry:t,program:this.material}),this.nextMesh=new Z(this.gl,{geometry:t,program:this.vertexMaterial}),this.nextMesh.position.z=-1e-4,this.currentMesh.setParent(this.scene),this.nextMesh.setParent(this.scene)}else{const t=new q(this.gl,{width:1,height:1,widthSegments:2,heightSegments:2});this.plane=new Z(this.gl,{geometry:t,program:this.material}),this.plane.setParent(this.scene)}}replaceShader(t){let i,s;this.shader.vertex?(i=this.material.uniforms.texture1.value,s=this.vertexMaterial.uniforms.texture1.value):(i=this.material.uniforms.texture1.value,s=this.material.uniforms.texture2.value);const r=t==="random"?J():k[t],{fragment:n,uniforms:a,vertex:h}=r;this.shader=r,this.vertex=h||N,this.fragment=n||"",this.uniforms=a||{},this.addObjects(),this.shader.vertex?(this.material.uniforms.texture1.value=s,this.vertexMaterial.uniforms.texture1.value=s):(this.material.uniforms.texture1.value=i,this.material.uniforms.texture2.value=s,this.material.uniforms.progress.value=1),this.resize(),this.swiper.params.gl.shader=t}replaceRandomShader(){const t=J(),{fragment:i,uniforms:s,vertex:r}=t;this.shader=t,this.fragment=i||"",this.uniforms=s||{},this.vertex=r||N,this.addObjects(),this.resize()}setProgress(t,i,s,r){if(!this.initialized){this.onInit=()=>{requestAnimationFrame(()=>{this.setProgress(t,i,s,r)})};return}const n=this.textures[i],a=this.textures[t];this.material.uniforms.texture1.value=a,this.shader.vertex?this.vertexMaterial.uniforms.texture1.value=n:this.material.uniforms.texture2.value=n,r?(s===0&&this.material.uniforms.progress.value===0&&(this.material.uniforms.progress.value=1),s===1&&this.material.uniforms.progress.value===1&&(this.material.uniforms.progress.value=0),this.animateUniform(this.material.uniforms.progress,s,()=>{this.swiper.params.gl.shader==="random"&&(this.replaceRandomShader(),this.material.uniforms.texture1.value=a,this.material.uniforms.texture2.value=n,this.material.uniforms.progress.value=s),s===1&&(this.material.uniforms.texture1.value=n),this.material.uniforms.progress.value=0})):this.material.uniforms.progress.value=Math.abs(s)}render(){this.swiper.destroyed||this.destroyed||(this.time+=.05,this.material.uniforms.time.value=this.time,Object.keys(this.uniforms).forEach(t=>{this.material.uniforms[t].value=this.uniforms[t].value}),requestAnimationFrame(this.render.bind(this)),this.renderer.render({scene:this.scene,camera:this.camera}))}destroy(){this.initialized=!1,this.destroyed=!0,this.renderer.clear(),this.renderer.dispose(),this.renderer.domElement.remove()}}function Ui({swiper:e,on:t,extendParams:i}){e.gl=null;let s=!1;function r(){try{const o=document.createElement("canvas");return!!window.WebGLRenderingContext&&(o.getContext("webgl")||o.getContext("experimental-webgl"))}catch{return!1}}i({gl:{shader:"random"}});const n=()=>{e.gl=new Ai({debug:!0,swiper:e,shader:e.params.gl.shader})};let a,h;t("beforeInit",()=>{if(e.params.effect!=="gl")return;if(!r()){s=!0;return}e.classNames.push(`${e.params.containerModifierClass}gl`);const o={watchSlidesProgress:!0};Object.assign(e.params,o),Object.assign(e.originalParams,o)}),t("init",()=>{e.params.effect!=="gl"||s||e.gl||n()}),t("resize",()=>{e.params.effect!=="gl"||s||e.gl.resize()}),t("setTranslate",()=>{if(e.params.effect!=="gl"||s)return;e.gl||n();let o,l,c;e.slides.forEach((d,g)=>{const f=d.progress;(f>0&&f<1||f===0&&e.progress<h)&&(o=g,l=g+1,c=f),(f<0&&f>-1||f===0&&e.progress>h)&&(o=g-1,l=g,c=1+f)}),h=e.progress||0,!(typeof o>"u"&&typeof l>"u")&&e.gl.setProgress(o,l,c,a)}),t("setTransition",(o,l)=>{e.params.effect!=="gl"||s||(a=l>0&&!e.params.cssMode)}),t("destroy",()=>{e.params.effect!=="gl"||s||e.gl&&(e.gl.destroy(),e.gl=null)})}export{Ui as S};
