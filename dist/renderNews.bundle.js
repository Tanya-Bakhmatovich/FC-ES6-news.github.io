webpackJsonp([0],{45:function(e,t,a){"use strict";function r(e){var t=e.articles;document.querySelector(".menu").style.display="none",document.querySelector(".menu-small").style.display="block",document.querySelector(".main-section")&&document.body.removeChild(document.querySelector(".main-section"));var a=(0,l.default)({attrs:{class:"main-section"}});t.forEach(function(e){var t=e.author,r=e.description,s=e.publishedAt,n=e.title,c=e.url,i=e.urlToImage,u=(0,l.default)({parent:a,tagName:"a",attrs:{href:""+c,target:"_blank",class:"article"}});(0,l.default)({tagName:"img",parent:u,attrs:{class:"preview",src:""+i,style:{height:"200px"}}}),(0,l.default)({parent:u,tagName:"h1",attrs:{class:"title",href:""+c,target:"_blank"},props:{innerHTML:""+n}}),(0,l.default)({parent:u,attrs:{class:"author"},props:{innerHTML:""+t}});var o=(0,l.default)({parent:u,attrs:{class:"date-time"}});(0,l.default)({parent:o,attrs:{class:"date"},props:{innerHTML:""+s.slice(0,10)}}),(0,l.default)({parent:o,attrs:{class:"time",title:""+c},props:{innerHTML:""+s.slice(12,-1)}}),(0,l.default)({parent:u,attrs:{class:"description"},props:{innerHTML:""+r}})})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var s=a(44),l=function(e){return e&&e.__esModule?e:{default:e}}(s)}});