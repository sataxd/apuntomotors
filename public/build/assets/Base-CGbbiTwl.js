import{j as e}from"./AboutHeader-B0xeqd_u.js";import{r as t}from"./index-B80Lgev0.js";const p="/build/logovitromax.webp",g=t.createContext(),h=({progress:o})=>e.jsxs("div",{className:"fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#fff]",children:[e.jsx("style",{children:`
                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-15px); }
                        100% { transform: translateY(0px); }
                    }
                    .animate-float {
                        animation: float 3s ease-in-out infinite;
                    }
                `}),e.jsx("img",{src:p,alt:"Logo",className:"w-full mb-8 max-w-xs md:max-w-sm animate-float"}),e.jsx("div",{className:"w-64 h-2 bg-gray-200 rounded-full overflow-hidden",children:e.jsx("div",{className:"h-full bg-[#ff9003] transition-all duration-300 ease-out",style:{width:`${o}%`}})}),e.jsxs("p",{className:"mt-2 text-sm font-sora text-gray-500",children:[Math.round(o),"%"]})]}),y=({children:o})=>{const[s,d]=t.useState(0),[n,l]=t.useState(0),[c,f]=t.useState(!0),u=t.useCallback((a="Desconocida")=>{console.log(`[Preloader] ⏳ Iniciando API: ${a}`),d(i=>i+1)},[]),x=t.useCallback((a="Desconocida")=>{console.log(`[Preloader] ✅ Completada API: ${a}`),l(i=>i+1)},[]);t.useEffect(()=>{const a=setTimeout(()=>f(!1),1e3);return()=>clearTimeout(a)},[]),t.useEffect(()=>{const a=setTimeout(()=>{s>n&&(console.warn("⚠️ [Preloader] Forzando cierre: Alguna API no respondió a tiempo."),l(s))},8e3);return()=>clearTimeout(a)},[s,n]);let r=0;s>0?r=n/s*100:c||(r=100);const m=c||s>0&&n<s;return e.jsx(g.Provider,{value:{registerTask:u,completeTask:x},children:e.jsxs("section",{className:"relative min-h-screen",children:[m&&e.jsx(h,{progress:r}),e.jsx("div",{className:m?"h-screen overflow-hidden opacity-0":"animate-fadeIn opacity-100 transition-opacity duration-500",children:o})]})})};export{y as B,g as L};
