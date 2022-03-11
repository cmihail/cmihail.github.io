!function(){"use strict";function l(e){var n=r();return n[e]=n[e]||function(e){return{id:e,plugins:{},getPlugins:function(){var e=[];for(var n in this.plugins)e.push(this.plugins[n]);return e}}}(e),n[e]}function i(e,n){var t=l(e);return t.plugins[n]=t.plugins[n]||{},t.plugins[n]}function r(){var e=q();return e.r=e.r||{},e.r}Y()&&(window.ldfdr.registerTracker=function(e,n,t,r,o,i,a){var c=l(e);return c.track=n,c.identify=t,c.pageview=r,c.getClientId=o,c.acceptCookie=i,c.rejectCookie=a,c},window.ldfdr.setTrackerOption=function(e,n,t,r){l(e)[n]=void 0!==r?r:t},window.ldfdr.registerPlugin=function(e,n,t){var r=l(e),o=i(e,n);o.init=t,r.pluginsInitialized&&o.init()},window.ldfdr.registerPluginConfig=function(e,n,t,r){i(e,n).config=void 0!==r?r:t});var e,n,t,o,g="testing",a="2.39.5",c="_lfa_debug_settings",d=["cookieDomain","enableAutoTracking","trackingCookieDurationDays"];if("undefined"!=typeof window&&void 0!==window.ldfdr){window.ldfdr=window.ldfdr||{},window.ldfdr.cfg=window.ldfdr.cfg||{};var u=function(){var n=en(c)||"{}";try{return console.log("Found override settings",n),JSON.parse(n)}catch(e){return console.warn("Could not parse stored override settings",n),{}}}();e=window.ldfdr,n=g,t=a,o=u,e.setTrackerOption(n,"lfaCookieEnabled",true,o.enableCookie),e.setTrackerOption(n,"consentManagementEnabled",false,o.enableCm),e.setTrackerOption(n,"useSendBeaconApi",false,o.useBeacon),e.setTrackerOption(n,"autoTrackingMode","default",o.atMode),e.setTrackerOption(n,"foreignCookieSettings",{"hubspot":"hubspotutk","intercom":"intercom-id-.*"}),e.setTrackerOption(n,"crossDomainLinking",{"enabled":false}),e.setTrackerOption(n,"useDualStackEndpoint",false,o.useDs),e.setTrackerOption(n,"trackingCookieDurationDays",730),e.setTrackerOption(n,"version",t),e.registerPluginConfig(n,"file-downloads",{filesEnabled: true,filesToMatch:/(.pdf|(.docx))(\?|$)/}),e.registerPluginConfig(n,"form-tracking",{formTrackingEnabled: true},o.trackForms),e.registerPluginConfig(n,"yt-playback",{ytPlaybackTrackingEnabled: true},o.trackYt),e.registerPluginConfig(n,"intercom-tracking",{intercomTrackingEnabled: true},o.trackIntercom),e.registerPluginConfig(n,"discover",{jsConnectorConfigs:[]}),e.registerPluginConfig(n,"spa-tracking",{}),e.registerPluginConfig(n,"ga-connector",{gaConnectorSettings:[]}),function(e,n){e._q=e._q||[];for(var t=0;t<e._q.length;t++){var r=e._q[t];switch(r[0]){case"cfg":if(4!=r.length){console.warn("* [leadfeeder] invalid 'cfg' command",r);break}var o=r[1];if(-1==d.indexOf(o)){console.warn("* [leadfeeder] unsupported 'cfg' command",r);break}r[3]===n&&e.setTrackerOption(n,o,r[2])}}}(window.ldfdr,g)}var s="__discoverLoadEventEmitted",f={get:function(e){return window[e]},set:function(e,n){window[n]=e},clear:function(e){this.set(null,e)}};function v(n,t){if(!n[s])return function(n,e,t){var r=""===e?Fe:e;return r=function(e){return e===Fe||e[e.length-1]!==Fe?e:e.slice(0,-1)}(r),t.some(function(e){return function(e,n,t){var r=function(e){return e.split(/\/(.*)/).filter(function(e){return""!==e})}(t),o=r[0],i=Fe+(2<=r.length?r[1]:"");return o===e&&(i===n||function(e,n){if(0<=n.indexOf("*")&&0===e.indexOf(n.replace("/*","").replace("*","")))return!0;return n===Fe}(n,i))}(n,r,e)})}(window.location.hostname,window.location.pathname,n.paths)?void M(n.api_key,function(e){!function(e,n){200!==e.meta.status&&404!==e.meta.status||f.set(e,n)}(e,n.js_object_name),function(n){window.dataLayer=window.dataLayer||[],window.dataLayer.some(function(e){return e.event===n})||(window[s]=!0,console.log("* [leadfeeder][js-connector] Pushing datalayer event",n),window.dataLayer.push({event:n}))}(n.event_name),n[s]=!0,t()}):(console.log("* [leadfeeder][js-connector] Page not permitted for connector"),t());console.log("* [leadfeeder][js-connector] Event already emitted")}Y()&&q().registerPlugin(g,"discover",function(){!function(e){e.jsConnectorConfigs&&0!==e.jsConnectorConfigs.length&&sn(e.jsConnectorConfigs.map(function(n){return function(e){v(n,e)}}),0)}(q().getTracker(g).plugins.discover.config)}),Y()&&q().registerPlugin(g,"file-downloads",function(){var t=q().getTracker(g),e=t.plugins["file-downloads"].config;if(e.filesEnabled)for(var n=document.getElementsByTagName("a"),r=0;r<n.length;r++){var o=n[r];(o.getAttribute("href")+"").match(e.filesToMatch)&&i(o)}function i(e){function n(){e.removeEventListener("click",n),S(),t.track(function(e){var n=function(e){var n=e.replace(/https?\:\/\//,"").split("/"),t=n[n.length-1].replace(/[\?&].*/,"");return 1!=n.length&&t?t:null}(e.href),t=window.location.href;return{eventType:"file-download",properties:{url:function(e,n){return"/"==e.href.charAt(0)?function(e){return"/"==e.charAt(e.length-1)?e.substr(0,e.length-1):e}(n)+e.href:e.href}(e,t),filename:n},pageUrl:t,pageTitle:n}}(e))}e.addEventListener("click",n)}}),Y()&&q().registerPlugin(g,"form-tracking",function(){var t=500,c=["button","hidden","image","password","reset","submit"],r=0,o=q().getTracker(g);function e(e){var n=e.target;console.log("* [leadfeeder][form-tracking] Form's submit handler called ",g,n,e),a(n)}function i(e){console.log("* [leadfeeder][form-tracking] onClick");var n=e.target,t=n.tagName.toLowerCase();if("submit"===n.type||"button"===n.type||"button"===t){var r=n.form||n.closest("form");if(!r)return console.log("* [leadfeeder][form-tracking] No form element",g,r,n),void(window.LF_TESTING=n);console.log("* [leadfeeder][form-tracking] Submit button clicked",g,r,n),a(r)}else console.log("* [leadfeeder][form-tracking] Not a button",g,n)}function a(e){if(r+t>=(new Date).getTime())console.log("* [leadfeeder][form-tracking] Skipping duplicate event");else{var n=function(e){for(var n=e.querySelectorAll("input"),t=0;t<n.length;t++){var r=n[t],o=r.value;if(void 0,("text"===(i=r.type)||"email"===i||!i)&&wn(o))return o}var i;return null}(e);r=(new Date).getTime(),console.log("* [leadfeeder][form-tracking] submitting event",g),S();try{o.track(function(e,n){var t={},r=e.getAttribute("id"),o=e.getAttribute("class"),i=e.getAttribute("action"),a=function(e){for(var n={},t=e.elements,r=0;r<t.length;r++){var o=t[r],i=o.name;!i||0<=c.indexOf(o.type)||(n[i]={name:i,type:o.type})}return Be(n)}(e);n&&(t.email=n);r&&(t.formId=r);o&&(t.formClass=o);i&&(t.formAction=i);a&&(t.inputFields=a);return{eventType:"form-submit",properties:t}}(e,n),function(){console.log("* [leadfeeder][form-tracking] track callback called",g)})}catch(e){console.log("* [leadfeeder][form-tracking] error happened when tracking",e)}}}function l(n){try{if(!n.contentDocument)return;n.contentDocument.addEventListener("submit",e),n.contentDocument.addEventListener("click",i)}catch(e){console.log("* [leadfeeder][form-tracking] error accessing iframe.contentDocument",e,n)}}function n(){console.log("* [leadfeeder][form-tracking] Setting up iframes for form tracking",g);for(var e=document.getElementsByTagName("iframe"),n=0;n<e.length;n++)d(e[n])}function d(e){var n="data-lf-form-tracking-inspected-"+g;e.getAttribute(n)||(e.setAttribute(n,"true"),console.log("* [leadfeeder][form-tracking] iframe initialized",e,g),l(e),e.addEventListener("load",function(){l(e)}))}o.plugins["form-tracking"].config.formTrackingEnabled&&(document.addEventListener("submit",e),document.addEventListener("click",i),n(),window.MutationObserver&&new MutationObserver(pn(n,100,{leading:!1})).observe(document.body,{childList:!0,subtree:!0}),console.log("* [leadfeeder][form-tracking] initialized",g))});var p=null,w="__gaConnectorEventsEmitted";function m(e,n,t,r){var o=P(window),i=function(r,e){var o={};return e.forEach(function(e){var n=function(e,n){var t=n.split(".");for(;t.length&&(e=e[t.shift()]););return e}(r,e.attribute),t=e.dimension;o[t]=n||"(not set)"}),Be(o).some(function(e){return"(not set)"!==e})?o:null}(r.data,t);if(null!==i){console.log("* [leadfeeder][ga-connector] Pushing dimensions to",n);var a=e.get("name");o(a+".set",i),o(a+".send",{hitType:"event",eventCategory:"LFvisitorInfo",eventAction:"LFcompanyData",nonInteraction:!0}),-1===window[w].indexOf(n)&&window[w].push(n)}else console.log("* [leadfeeder][ga-connector] No dimensions to send for",n)}function k(n,t){var r=function(e){var n=P(window),t=e.toLowerCase();return n.getAll().filter(function(e){return e.get("trackingId").toLowerCase()==t})[0]}(n.ga_id);if(!r)return console.log("* [leadfeeder][ga-connector] No tracker detected",n.ga_id),t();M(n.api_key,function(e){m(r,n.ga_id,n.mappings,e),t()})}function h(e){e.gaConnectorSettings&&0!==e.gaConnectorSettings.length?(console.log("* [leadfeeder][ga-connector] Waiting for GA to be ready"),p=setInterval(function(){!function(e){P(window)&&(clearInterval(p),console.log("* [leadfeeder][ga-connector] GA has been detected. Running connectors"),sn(e.map(function(n){return function(e){k(n,e)}}),0))}(e.gaConnectorSettings)},300),setTimeout(function(){clearInterval(p)},1e4)):console.log("* [leadfeeder][ga-connector] No GA connector settings set. Exiting.")}window[w]=[],Y()&&q().registerPlugin(g,"ga-connector",function(){h(q().getTracker(g).plugins["ga-connector"].config)}),Y()&&q().registerPlugin(g,"intercom-tracking",function(){var e=q().getTracker(g);e.plugins["intercom-tracking"].config.intercomTrackingEnabled&&function(e,n,t,r){var o;n=n||100,t=t||1.5,r=r||15e3;var i=setTimeout(function(){clearInterval(o)},r),a=function(){clearInterval(o),e()?clearTimeout(i):(n*=t,o=setInterval(a,n))};o=setInterval(a,n)}(function(){return!(void 0===window.Intercom||!window.Intercom.booted)&&(console.log("* [leadfeeder][intercom-tracking] Updating intercom for tracking",g),window.Intercom("update",{lfClientId:e.getClientId()}),!0)})});var y=null,b=null;function T(n,t,r){setTimeout(function(){r&&(y=b);var e={pageUrl:b=t};y&&(e.referrer=y),console.log("* [leadfeeder][spa] location.href change",e),n.pageview(e)},0)}function C(e){window.history?(function(o,i){var a=i.pushState;i.pushState=function(e,n,t){console.log("* [leadfeeder][spa] history push state",n,t);var r=a.apply(i,arguments);return T(o,window.location.href,!0),r};var c=i.replaceState;i.replaceState=function(e,n,t){console.log("* [leadfeeder][spa] history replace state",n,t);var r=c.apply(i,arguments);return T(o,window.location.href,!1),r}}(e,window.history),window.addEventListener("popstate",function(){console.log("* [leadfeeder][spa] popstate change",window.location.href),T(e,window.location.href,!0)}),window.addEventListener("hashchange",function(){console.log("* [leadfeeder][spa] hash change",window.location.href),T(e,window.location.href,!0)})):console.warn("* [leadfeeder][spa] history API is not available")}Y()&&q().registerPlugin(g,"spa-tracking",function(){!function(e){switch(b=window.location.href,console.log("* [leadfeeder][spa] Set up spa auto tracking",e.autoTrackingMode),e.autoTrackingMode){case"spa":C(e)}}(q().getTracker(g))}),Y()&&q().registerPlugin(g,"yt-playback",function(){var i=q().getTracker(g);if(i.plugins["yt-playback"].config.ytPlaybackTrackingEnabled&&window.postMessage){var a={},n={},c=!1,l=0;e(),window.MutationObserver&&new MutationObserver(pn(e,100,{leading:!1})).observe(document.body,{childList:!0,subtree:!0})}function e(){var e=document.getElementsByTagName("iframe");if(e.length){!function(){if(c)return;console.log("* [leadfeeder][yt-playback] Initializing main message handler"),window.addEventListener("message",function(e){-1!==["https://www.youtube.com","https://www.youtube-nocookie.com"].indexOf(e.origin)&&void 0!==e.data&&function(e){var n;try{n=JSON.parse(e.data)}catch(e){return console.warn("* [leadfeeder][yt-playback] Could not parse YT data",e.data)}var t=function(e,n){if(a[e])return a[e];for(var t=document.getElementsByTagName("iframe"),r=0;r<t.length;r++){var o=t[r];if(o.contentWindow===n.source||o.contentDocument&&o.contentDocument.defaultView===n.source)return a[e]=o}return null}(n.id,e);if(null===t)return console.warn("* [leadfeeder][yt-playback] Could not find a registered iframe",n);switch(n.event){case"initialDelivery":!function(e,n){var t=s(n.src);if(console.log("* [leadfeeder][yt-playback] iframe communication initialized",e,t),!e.info||!e.info.videoData||t.videoData)return;t.videoData=e.info.videoData}(n,t);break;case"onStateChange":!function(e,n){var t=s(n.src);if(console.log("* [leadfeeder][yt-playback] Received onStateChange event",e,t),-1!==e.info)return;if(t.tracked)return console.log("* [leadfeeder][yt-playback] Event already tracked",t);t.tracked=!0;var r=function(e){return"https://www.youtube.com/watch?v="+f(e)}(n);console.log("* [leadfeeder][yt-playback] Sending video-start event",r,t),i.track({eventType:"video-start",properties:{videoUrl:r,videoTitle:function(e){return e?e.title:void 0}(t.videoData)}})}(n,t)}}(e)}),c=!0}();for(var n=0;n<e.length;n++){var t=e[n],r="data-lf-yt-playback-inspected-"+g;if(!t.getAttribute(r)){t.setAttribute(r,"true");var o=++l+1e3;u(t,o),t.addEventListener("load",d(t,o))}}}}function d(e,n){return function(){console.log("* [leadfeeder][yt-playback] initial load handler.",n,e.src,e.id),u(e,n)}}function u(e,n){if(console.log("* [leadfeeder][yt-playback] setupIframe",n,e.src,e.id),function(e){return function(e){return gn(e.src,"https://www.youtube.com/embed/")||gn(e.src,"https://www.youtube-nocookie.com/embed/")}(e)&&function(e){return!!f(e)}(e)&&!function(e){return-1!==e.src.indexOf("enablejsapi=0")}(e)&&!function(e){return-1!==e.src.indexOf("autoplay=1")}(e)}(e))return function(e){return-1===e.src.indexOf("enablejsapi")}(e)?(console.log("* [leadfeeder][yt-playback] Enabling JS API and skipping",n,e.src,e.id),function(e){var n=-1===e.src.indexOf("?")?"?":"&";n+="enablejsapi=1",n+="&origin="+window.location.origin,e.src=e.src+n}(e)):void function(e,n){if("undefined"!=typeof YT&&("function"!=typeof YT.get||!e.id||void 0!==YT.get(e.id)))return console.log("* [leadfeeder][yt-playback] do not setup iframe listener as iframe has an YT player",n,e.src,e.id);console.log("* [leadfeeder][yt-playback] register iframe listener via postMessage",n,e.src,e.id),t(a[n]=e,{event:"listening",id:n,channel:"widget"}),t(e,{event:"command",func:"addEventListener",args:["onStateChange"],id:n,channel:"widget"})}(e,n);console.log("* [leadfeeder][yt-playback] Not eligible youtube iframe. Skipping.",n,e.src,e.id)}function s(e){return n[e]||(n[e]={src:e,tracked:!1,videoData:null}),n[e]}function f(e){return e.src.split("/")[4].split("?")[0]}function t(e,n){var t=JSON.stringify(n);console.log("* [leadfeeder][yt-playback] sending message",e.src,e.id,t),e.contentWindow.postMessage(t,"*")}});var I=250;function S(){!function(e){q().suppressUnloadUntil=e}((new Date).getTime()+I)}!Y()||"suppressUnloadUntil"in q()||(q().suppressUnloadUntil=0,window.addEventListener("beforeunload",function(){var e=new Date,n=q().suppressUnloadUntil;if(n<e.getTime())console.log("* [leadfeeder][before-unload] no pending requests");else{console.log("* [leadfeeder][before-unload] waiting for pending requests",n-e.getTime());for(;n>=e.getTime();0)e=new Date}},!1));var E,_="_lfa",O=5;function A(e){e.crossDomainLinking.enabled&&e.lfaCookieEnabled&&(E=window.location.href,document.addEventListener("mousedown",function(e){!function(e){var n=function(e){var n,t=0;do{if(x(e))return e;n=e.parentNode,n=(e=n).parentNode,t++}while(null!==n&&t<100);return null}(e);if(!n)return;if(!function(e){var n=e.getAttribute("href");return!!n&&(!!Oe(n=String(n))&&function(e,n,t){if(L(e,n))return!1;for(var r=0;r<t.length;r++)if(!L(n,t[r])&&L(e,t[r]))return!0;return!1}(e.hostname,document.location.hostname,ne().crossDomainLinking.allowedDomains))}(n))return;!function(e){var n=e.getAttribute("href");e.setAttribute("href",function(e){e=Ee(e,_);var n=function(){var e=ne().getClientId(),n=String(D());return e+"-"+n}();return Se(e,_,n)}(n))}(n)}(e.target)}))}function N(){if(ne().crossDomainLinking.enabled)return function(e){var n=_e(e,_);if(!n)return;var t=function(e){if(47!==e.length||!/^LF\d\.\d\.[0-9a-z]{16}\.\d{13}-\d{10}$/.test(e))return void console.log("* [leadfeeder][cross-domain-linking] _lfa URL param has invalid format",e);var n=e.split("-"),t=n[0],r=parseInt(n[1]),o=D();if(Math.abs(o-r)>O)return void console.log("* [leadfeeder][cross-domain-linking] Timestamp is not valid.","Timestamp from URL:",r,"Current timestamp:",o);return t}(n=String(n));return t?(console.log("* [leadfeeder][cross-domain-linking] Using client Id from URL param",t),t):void 0}(E)}function D(){return Math.floor((new Date).getTime()/1e3)}function L(e,n){e=e.toLowerCase(),n=n.toLowerCase();for(var t=e.split("."),r=n.split("."),o=1;o<=r.length;o++)if(r[r.length-o]!==t[t.length-o])return!1;return!0}function x(e){if(!e)return!1;var n=String(e.nodeName).toLowerCase();return-1!==["a","area"].indexOf(n)}var R={key:"__lf_discover",softRefresh:18e5,ttl:864e6,storedAt:null,get:function(){if(dn()){var e=window.localStorage.getItem(this.key);if(null!==e){var n=null;try{n=JSON.parse(e),this.storedAt=n.storedAt,delete n.storedAt}catch(e){if(e instanceof SyntaxError)return;throw e}return n}}},set:function(e){dn()&&(e.storedAt=Date.now(),window.localStorage.setItem(this.key,JSON.stringify(e)),delete e.storedAt)},clear:function(){dn()&&(this.storedAt=null,window.localStorage.removeItem(this.key))},isExpired:function(){return null===this.storedAt||void 0===this.storedAt||Date.now()>=this.storedAt+this.ttl},isSoftExpired:function(){return null===this.storedAt||void 0===this.storedAt||Date.now()>=this.storedAt+this.softRefresh}};function U(e){200!==e.meta.status&&404!==e.meta.status||R.set(e)}function j(e,n){var t=new XMLHttpRequest;t.open("GET",e,!0),t.onload=function(){if(200===this.status){var e=JSON.parse(this.response);n(e)}},t.send()}function M(e,n){var t="https://cs.lf-discover.com/companies/?api_key="+e,r=_e(window.location.href,"_lf_discover_demo");""!==r&&(t=Se(t,"demo",r));var o=R.get();""!==r?j(t,function(e){n(e)}):null==o?j(t,function(e){U(e),n(e)}):R.isExpired()?(R.clear(),j(t,function(e){U(e),n(e)})):R.isSoftExpired()?(n(o),j(t,function(e){U(e)})):n(o)}function P(e,n){return(n=e.GoogleAnalyticsObject||"ga")&&e[n]?e[n]:null}function G(e){return e._gat||null}function J(e,n){for(var t=function(e){return e?"function"!=typeof e._getTrackers?(console.info("* [leadfeeder] Legacy GoogleAnalyticsObject not found"),[]):e._getTrackers():[]}(G(e)),r=0;r<t.length;r++)z(t[r]._getAccount(),n.trackingIds,!0)}function F(e,n){for(var t=function(e){return e?"function"!=typeof e.getAll?(console.info("* [leadfeeder] GoogleAnalyticsObject not found"),[]):e.getAll():[]}(P(e)),r=0;r<t.length;r++)z(t[r].get("clientId"),n.clientIds),z(t[r].get("trackingId"),n.trackingIds)}function z(e,n,t){void 0!==e&&-1===n.indexOf(e)&&(t&&"object"==typeof e&&"string"==typeof e.vtp_trackingId?n.push(e.vtp_trackingId):n.push(e))}function B(){var e={clientIds:[],trackingIds:[]};if(null!==P(window)?F(window,e):J(window,e),!e.clientIds.length){var n=function(){var e=en("_ga");if(e){var n=e.split(".");if(!(n.length<2))return n[n.length-2]+"."+n[n.length-1]}}();n&&e.clientIds.push(n)}return e}function q(){return"undefined"==typeof window?null:window.ldfdr}function Y(){return"undefined"!=typeof window&&void 0!==window.ldfdr}function W(n){var e=Be(r());return ze(n)?e.map(function(e){return n(e)}):e}window.ldfdr.getTracker=function(e,n){var t=r()[e]||null;return ze(n)?n(t):t},window.ldfdr.getAll=W,window.ldfdr.track=function(n){W(function(e){e.track(n)})},window.ldfdr.identify=function(n){W(function(e){e.identify(n)})},window.ldfdr.pageview=function(n){W(function(e){e.pageview(n)})},window.ldfdr.acceptCookie=function(n){return W(function(e){return e.acceptCookie(n)}).some(function(e){return!0===e})},window.ldfdr.rejectCookie=function(n){return W(function(e){return e.rejectCookie(n)}).some(function(e){return!0===e})},window.ldfdr.setDebugSettings=function(e){!function(e){We(c,JSON.stringify(e),36e5)}(e)};var K,$=1e3,H=/^0_([0-9a-f]+)-([0-9a-f]+)-([0-9]*)$/,V=null,X=[],Q=null,Z={success:!1},ee=0;function ne(){return q().getTracker(g)}function te(){var e=ne(),n=e.foreignCookieSettings,t=[];if(!n||!we(e))return t;for(var r=function(){for(var e=document.cookie.split(";"),n={},t=0;t<e.length;t++){var r=e[t].split("=");n[(r[0]+"").trim()]=unescape(r.slice(1).join("="))}return n}(),o=Object.keys(r),i=Object.keys(n),a=0;a<i.length;a++)for(var c=i[a],l=n[c],d=0;d<o.length;d++){var u=o[d];if(u.match(l)){var s=r[u];t.push({type:c,value:s})}}return t}function re(e){return null===V&&(V=Ze()),!(!oe(e)||!ln())&&(ie(e)?function(e){switch(e){case Ue:case Re:return!0;default:return!1}}(V):V!==xe)}function oe(e){return!0===e.lfaCookieEnabled}function ie(e){return!0===e.consentManagementEnabled}function ae(){return!0===ne().useDualStackEndpoint}function ce(e,n){n=n||{};var t=B(),r=new Date,o=n.eventType||"tracking-event",i=ne();return{gaTrackingIds:t.trackingIds,gaClientIds:t.clientIds,context:function(e,n){var t=e.referrer||document.referrer;"form-submit"===n&&(t="");return{library:{name:"lftracker",version:a},pageUrl:function(e){if(we(ne()))return e;return null===_e(e,"utm_term").match(H)?e:Ee(e,"utm_term")}(le(e)),pageTitle:e.pageTitle||document.title,referrer:t}}(n,o),event:o,clientEventId:un(),clientTimestamp:r.toISOString(),clientTimezone:0,scriptId:g,cookiesEnabled:re(i),consentLevel:V||xe,anonymizeIp:false,lfClientId:e,foreignCookies:te(),properties:n.properties||{},autoTrackingEnabled:!1!==i.enableAutoTracking}}function le(e){return e.pageUrl||window.location.href}function de(e,n,t){var r=e+"?sid="+encodeURIComponent(n.scriptId),o=fn(JSON.stringify(n)),i=navigator.sendBeacon(r,o);return he(t,{success:i}),i}function ue(e,n,t){var r=e+"?sid="+encodeURIComponent(n.scriptId),o=fn(JSON.stringify(n)),i=document.createElement("img");return i.width=1,i.height=1,i.src=r+"&data="+o,i.onload=function(){he(t,{success:!0})},i.onerror=function(){he(t,{success:!1})},i}function se(){var e=null,n=ne().trackingCookieDurationDays;return n&&(e=24*n*60*60*1e3),e}function fe(){var e;if(re(ne())){e=Xe();var n=se();return e&&gn(e,Ge)?(nn(e,n),console.log("* [leadfeeder][tracking] client id updated, value %s",e)):(e=nn(null,n),console.log("* [leadfeeder][tracking] new client id saved, value %s",e)),e}return Qe()&&setTimeout(ge,1e3),e=function(e){return ie(e)&&V!==xe}(ne())?function(){if(!window[Me]){var e=on(un())+".CM";window[Me]=e}return window[Me]}():Ge+"."+un()+".NC",console.log("* [leadfeeder][tracking] cookies disabled, new client id generated %s",e),e}function ge(){Qe()&&(!function(){for(var e=0,n=q().getAll();e<n.length;e++)if(re(n[e]))return!1;return!0}()?console.log("* [leadfeeder][tracking] cannot clear stored client id as other trackers have cookies enabled"):(console.log("* [leadfeeder][tracking] cleared LF cookies, e.g. user consent and client id"),qe()))}function ve(e){var n=ne();void 0===n.gaInitRetries&&(n.gaInitRetries=0);var t=1<=n.gaInitRetries;return function(e){var n=P(e);return null!==n&&"function"==typeof n&&"function"==typeof n.getAll||null!==(n=G(e))&&"object"==typeof n&&"function"==typeof n._getTrackers}(window)?e():t?(console.log("* [leadfeeder][tracking] failed to get GA object for tracking, continuing without it"),e()):(setTimeout(function(){return ve(e)},100*Math.pow(2,n.gaInitRetries)),void(n.gaInitRetries+=1))}function pe(n,t){!function(e){switch(e){case"form-submit":case"identify":return we(ne());default:return!0}}((n=n||{}).eventType)?X.push({args:n,doneCallback:t}):ve(function(){var e=ce(ye(),n);console.log("* [leadfeeder][tracking] event to track:",e),!0===ne().useSendBeaconApi&&navigator&&navigator.sendBeacon?(de("https://tr.lfeeder.com",e,t),ae()&&de("https://tr2.lfeeder.com",e)):(ue("https://tr.lfeeder.com",e,t),ae()&&ue("https://tr2.lfeeder.com",e))})}function we(e){return!!re(e)&&(!ie(e)||V===Ue)}function me(e,n){var t=(e=e||{}).email;if(wn(t)){var r=e.firstName,o=e.lastName,i={email:t};r&&"string"==typeof r&&(i.firstName=r),o&&"string"==typeof o&&(i.lastName=o),pe({eventType:"identify",properties:i},n)}else console.warn("* [leadfeeder][tracking] Email is invalid in 'identify' payload")}function ke(e,n){var t=function(e){var n={eventType:"tracking-event"};(e=e||{}).pageUrl&&(n.pageUrl=e.pageUrl);e.pageTitle&&(n.pageTitle=e.pageTitle);e.referrer&&(n.referrer=e.referrer);return n}(e),r=le(t);!Oe(r)&&gn(r,"/")&&(r=window.location.protocol+"//"+window.location.host+r),r===Q&&ee+$>=(new Date).getTime()?(console.log("* [leadfeeder][tracking] duplicated pageview",r,Q),he(n,Z)):(Q=r,ee=(new Date).getTime(),Z={success:!0},pe(t,function(e){he(n,Z=e)}))}function he(e,n){ze(e)?e(n):void 0!==e&&console.warn("* [leadfeeder][tracking] expected function argument",e)}function ye(){return function(e){return K=K||e()}(fe)}function be(e){var n=ne();return!!Ce(n)&&(void 0===e&&(e=Ue),console.log("* [leadfeeder][tracking] cookie accepted",e),function(e,n){switch(e){case Ue:return function(e){Ie(Ue),e.track({eventType:"consent"});for(var n=0;n<X.length;n++){var t=X[n];pe(t.args,t.doneCallback)}return X=[],!0}(n);case Re:return function(e){return Ie(Re),e.track({eventType:"consent"}),X=[],!0}(n);case xe:console.warn("* [leadfeeder][tracking] 'none' consent level should be called via rejectCookie()")}return console.warn("* [leadfeeder] invalid consent level",e),!1}(e,n))}function Te(){var e=ne();return!!Ce(e)&&(console.log("* [leadfeeder][tracking] cookie rejected"),K=void 0,Q=V=null,Z={success:!(X=[])},ee=0,qe(),V=tn(xe,se()),e.track({eventType:"consent"}),!0)}function Ce(e){return ln()?!!function(e){return oe(e)&&ie(e)}(e)||(console.log("* [leadfeeder][tracking] consent management not enabled for tracker:",e.id),!1):(console.log("* [leadfeeder][tracking] disabled cookies for browser",e.id),!1)}function Ie(e){var n=se();K=V!==e&&Ze()!==e?(console.log("* [leadfeeder][tracking] save CM lf client and user consent"),vn(K,".NC")&&(console.log("* [leadfeeder][tracking] clear previous anonymous cookie"),K=void 0),V=tn(e,n),nn(ye(),n)):(console.log("* [leadfeeder][tracking] cookies updated via another script or by another acceptCookie call"),V=Ze(),Xe())}function Se(e,n,t){t=t||"";var r=(e=String(e)).indexOf("#"),o=e.length;-1===r&&(r=o);var i=e.substr(0,r),a=e.substr(r,o-r);return-1===i.indexOf("?")?i+="?":vn(i,"?")||(i+="&"),i+window.encodeURIComponent(n)+"="+window.encodeURIComponent(t)+a}function Ee(e,n){if(-1===(e=String(e)).indexOf("?"+n)&&-1===e.indexOf("&"+n))return e;var t=e.indexOf("?");if(-1===t)return e;var r=e.substr(t+1),o=e.substr(0,t);if(r){var i="",a=r.indexOf("#");-1!==a&&(i=r.substr(a+1),r=r.substr(0,a));for(var c=r.split("&"),l=c.length-1;0<=l;l--)c[l].split("=")[0]===n&&c.splice(l,1);var d=c.join("&");d&&(o=o+"?"+d),i&&(o+="#"+i)}return o}function _e(e,n){var t=new RegExp("[\\?&#]"+n+"=([^&#]*)").exec(e);return t?function(n){try{return window.decodeURIComponent(n)}catch(e){return unescape(n)}}(t[1]):""}function Oe(e){return gn(e,"//")||gn(e,"http://")||gn(e,"https://")}var Ae,Ne,De,Le,xe="none",Re="basic",Ue="all",je=[xe,Re,Ue],Me="__lfaCmClientId",Pe="_lfa",Ge="LF1.1",Je="_lfa_consent",Fe="/";function ze(e){return"function"==typeof e}function Be(e){if(Object.values)return Object.values(e);var n=[];for(var t in e)"string"==typeof t&&e.propertyIsEnumerable(t)&&n.push(e[t]);return n}function qe(){He(Ve()),He(Pe),Ye(Pe),He(Je),Ye(Je)}function Ye(e){if(en(e)){var n=window.ldfdr.cfg.cookieDomain;if(n)an(e,n);else for(var t=rn().reverse(),r=0;r<t.length;r++){if(an(e,n=t[r]),!en(e))return void console.log("* [leadfeeder][cookie] Deleted cookie for domain",n);console.warn("* [leadfeeder][cookie] Failed to delete cookie for domain",n)}}}function We(e,n,t){var r=window.ldfdr.cfg.cookieDomain||Ae;if(r)cn(e,n,t,"/",r);else for(var o=rn(),i=0;i<o.length;i++){if(cn(e,n,t,"/",r=o[i]),Ke(r)&&en(e)===n)return console.log("* [leadfeeder][cookie] Stored cookie for domain",r),void(Ae=r);console.warn("* [leadfeeder][cookie] Failed to store cookie for domain",r)}}function Ke(e){var n="_lfa_test_cookie_stored",t=(new Date).getTime().toString()+"-"+Math.random().toString();cn(n,t,1e3,"/",e);var r=en(n)===t;return an(n,e),r}function $e(e,n,t){if(We(e,n,t),dn()){window.localStorage.setItem(e,n);var r=new Date;r.setTime(r.getTime()+t),window.localStorage.setItem(Ve(),r.toISOString())}}function He(e){dn()&&window.localStorage.removeItem(e)}function Ve(){return Pe+"_expiry"}function Xe(){return N()||Qe()}function Qe(){return function(){var e=en(Pe);if(!e)return;if(!gn(e,Ge)){var n=function(e){var n;try{n=function(e){if(!e)return 0;var n=function(n){try{return decodeURIComponent(window.atob(n).split("").map(function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)}).join(""))}catch(e){return console.warn("* [leadfeeder] can't base64 decode: "+n),0}}(e);return n?JSON.parse(n):0}(e)}catch(e){return console.warn("* [leadfeeder][cookie] Error while trying to read deprecated cookie",e),0}if(!n)return 0;var t=Be(n)[0];return console.log("* [leadfeeder][cookie] Found old-style cookie (clientId per scriptId). Returning first clientId",t),t}(e);if(n)return n}return e}()||function(){if(!dn())return 0;var e=window.localStorage.getItem(Pe);if(null==e)return 0;var n=window.localStorage.getItem(Ve());null!=n&&(new Date).toISOString()>n&&(e=0);return e}()}function Ze(){var e=en(Je);return!e&&dn()&&(e=window.localStorage.getItem(Je)),e?"true"===e?Ue:-1==je.indexOf(e)?(console.warn("* [tracking][cookie] invalid stored user consent",e),null):e:null}function en(e){var n=new RegExp("(^|;)[ ]*"+e+"=([^;]*)").exec(document.cookie);return n?window.decodeURIComponent(n[2]):0}function nn(e,n){e=e||on(un());return $e(Pe,e,n),e}function tn(e,n){return-1==je.indexOf(e)?(console.warn("* [leadfeeder] invalid user consent level",e),Ze()):($e(Je,e,n),e)}function rn(e){var n=e||document.location.hostname,t=(n=0===n.indexOf("www.")?n.substring(4):n).split(".");if(4===t.length){var r=t[t.length-1];if(parseInt(r,10)==r)return["none"]}for(var o=[],i=t.length-2;0<=i;i--)o.push(t.slice(i).join("."));return o.push("none"),o}function on(e){return Ge+"."+e+"."+(new Date).getTime()}function an(e,n){cn(e,"",-3600,"/",n)}function cn(e,n,t,r,o,i){var a;t&&(a=new Date).setTime(a.getTime()+t),document.cookie=e+"="+window.encodeURIComponent(n)+(t?";expires="+a.toGMTString():"")+";path="+(r||"/")+(o&&"none"!==o?";domain="+o:"")+(i?";secure":"")+";SameSite=Lax"}function ln(){return Ke(null)}function dn(){try{return!!window.localStorage}catch(e){return console.warn("* [leadfeeder] local storage is disabled",e),!1}}function un(){return function(e){function n(e,n){return e<<n|e>>>32-n}function t(e){var n,t="";for(n=7;0<=n;n--)t+=(e>>>4*n&15).toString(16);return t}var r,o,i,a,c,l,d,u,s,f,g=[],v=1732584193,p=4023233417,w=2562383102,m=271733878,k=3285377520,h=[];for(e=function(e){return unescape(window.encodeURIComponent(e))}(e),f=e.length,o=0;o<f-3;o+=4)i=e.charCodeAt(o)<<24|e.charCodeAt(o+1)<<16|e.charCodeAt(o+2)<<8|e.charCodeAt(o+3),h.push(i);switch(3&f){case 0:o=2147483648;break;case 1:o=e.charCodeAt(f-1)<<24|8388608;break;case 2:o=e.charCodeAt(f-2)<<24|e.charCodeAt(f-1)<<16|32768;break;case 3:o=e.charCodeAt(f-3)<<24|e.charCodeAt(f-2)<<16|e.charCodeAt(f-1)<<8|128}h.push(o);for(;14!=(15&h.length);)h.push(0);for(h.push(f>>>29),h.push(f<<3&4294967295),r=0;r<h.length;r+=16){for(o=0;o<16;o++)g[o]=h[r+o];for(o=16;o<=79;o++)g[o]=n(g[o-3]^g[o-8]^g[o-14]^g[o-16],1);for(a=v,c=p,l=w,d=m,u=k,o=0;o<=19;o++)s=n(a,5)+(c&l|~c&d)+u+g[o]+1518500249&4294967295,u=d,d=l,l=n(c,30),c=a,a=s;for(o=20;o<=39;o++)s=n(a,5)+(c^l^d)+u+g[o]+1859775393&4294967295,u=d,d=l,l=n(c,30),c=a,a=s;for(o=40;o<=59;o++)s=n(a,5)+(c&l|c&d|l&d)+u+g[o]+2400959708&4294967295,u=d,d=l,l=n(c,30),c=a,a=s;for(o=60;o<=79;o++)s=n(a,5)+(c^l^d)+u+g[o]+3395469782&4294967295,u=d,d=l,l=n(c,30),c=a,a=s;v=v+a&4294967295,p=p+c&4294967295,w=w+l&4294967295,m=m+d&4294967295,k=k+u&4294967295}return(s=t(v)+t(p)+t(w)+t(m)+t(k)).toLowerCase()}(""+(new Date).getTime()+Math.random()).slice(0,16)}function sn(e,n){n!=e.length&&e[n](function(){sn(e,n+1)})}function fn(e){return window.btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,function(e,n){return String.fromCharCode("0x"+n)}))}function gn(e,n){return e.substring(0,n.length)===n}function vn(e,n){return-1!==(e=String(e)).indexOf(n,e.length-n.length)}function pn(t,r,o){var i,a,c,l,d=0;o=o||{};function u(){d=!1===o.leading?0:(new Date).getTime(),i=null,l=t.apply(a,c),i||(a=c=null)}function e(){var e=(new Date).getTime();d||!1!==o.leading||(d=e);var n=r-(e-d);return a=this,c=arguments,n<=0||r<n?(i&&(clearTimeout(i),i=null),d=e,l=t.apply(a,c),i||(a=c=null)):i||!1===o.trailing||(i=setTimeout(u,n)),l}return e.cancel=function(){clearTimeout(i),d=0,i=a=c=null},e}function wn(e){return"string"==typeof e&&!!e.match(/^[^@\s]+@([^@\s]+\.)+[^@\W]+$/)}if(Y()){"about:srcdoc"===location.href&&console.warn("* [leadfeeder] Embedding Leadfeeder tracker inside an iframe is not supported.");var mn=(function(e){for(var n=e.getPlugins(),t=0;t<n.length;t++){var r=n[t];r.initialized||r.init(),r.initialized=!0}e.pluginsInitialized=!0}(Le=q().registerTracker(g,pe,me,ke,ye,be,Te)),A(Le),!0===ie(Le)&&null!==(V=Ze())&&tn(V,se()),Ne=Le,(De=document.createEvent("Event")).tracker=Ne,De.initEvent("ldfdr.trackerReady",!0,!1),void document.dispatchEvent(De),Le);"disabled"===mn.autoTrackingMode||"default"===mn.autoTrackingMode&&!1===mn.enableAutoTracking||mn.pageview()}}();