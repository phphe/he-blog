import{u as h,_ as g}from"./MyContentList.vue.vQRRefoA.js";import x from"./ContentList.tVrOEphV.js";import{v as y,z as C,A as B,B as t,o as $,c as b,a as n,t as a,s as r,b as c,w as p,l as q}from"./entry.p-VKExHG.js";import"./NuxtLinkLocale.58xrtBfP.js";import"./nuxt-link.I9VO6Lpm.js";import"./FormattedDate.vue.d3swgaZB.js";import"./ContentQuery.zDptbjls.js";import"./query.qcV67Opk.js";import"./preview.PAO7SCmu.js";const v={class:"page-tags pt-20 sm:px-10"},w={class:"text-3xl mb-8 font-medium"},N={class:"text-xl"},P=y({__name:"[tag]",setup(k){const m=q(),i=C(),u=B(),o=t(()=>i.path.match(/\/tag\/([^.\/?#]+)/)[1]),e=t(()=>u.t("postsForTag",[o.value]));h({title:e,description:""});const _=t(()=>({path:m.$localeContentPath("/blog"),where:[{tags:{$in:[o.value]}}],sort:[{date:-1}]}));return(s,A)=>{const l=g,d=x;return $(),b("main",v,[n("h1",w,a(r(e)),1),c(d,{query:r(_)},{default:p(({list:f})=>[c(l,{list:f},null,8,["list"])]),"not-found":p(()=>[n("p",N,a(s.$t("notFound")),1)]),_:1},8,["query"])])}}});export{P as default};