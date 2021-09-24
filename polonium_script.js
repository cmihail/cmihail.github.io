!function(){"use strict";function c(e){var n=r();return n[e]=n[e]||function(e){return{id:e,plugins:{},getPlugins:function(){var e=[];for(var n in this.plugins)e.push(this.plugins[n]);return e}}}(e),n[e]}function i(e,n){var t=c(e);return t.plugins[n]=t.plugins[n]||{},t.plugins[n]}function r(){var e=M();return e.r=e.r||{},e.r}P()&&(window.ldfdr.registerTracker=function(e,n,t,r,o,i){var a=c(e);return a.track=n,a.identify=t,a.pageview=r,a.getClientId=o,a.clearCachedCookies=i,a},window.ldfdr.setTrackerOption=function(e,n,t,r){c(e)[n]=void 0!==r?r:t},window.ldfdr.registerPlugin=function(e,n,t){var r=c(e),o=i(e,n);o.init=t,r.pluginsInitialized&&o.init()},window.ldfdr.registerPluginConfig=function(e,n,t,r){i(e,n).config=void 0!==r?r:t},window.ldfdr.acceptCookie=function(){return function(){var e=function(){for(var e=[],n=0,t=B();n<t.length;n++){var r=t[n];1==r.lfaCookieEnabled&&!0===r.consentManagementEnabled&&e.push(r)}return e}();if(0==e.length)return console.warn("* [leadfeeder][tracking] Leadfeeder cookie or consent management is not enabled"),!1;if(!0===z||!0===ye())return console.warn("* [leadfeeder][tracking] User has already accepted cookies."),!1;Ee(H());for(var n=0;n<e.length;n++){var t=e[n];t.clearCachedCookies(),t.pageview()}return!0}()});var e,n,t,o,g="lAxoEaKdNOA8OYGd",a="2.29.0",l="_lfa_debug_settings",d=["cookieDomain","enableAutoTracking","trackingCookieDurationDays"];if("undefined"!=typeof window&&void 0!==window.ldfdr){window.ldfdr=window.ldfdr||{},window.ldfdr.cfg=window.ldfdr.cfg||{};var u=function(){var n=Te(l)||"{}";try{return console.log("Found override settings",n),JSON.parse(n)}catch(e){return console.warn("Could not parse stored override settings",n),{}}}();e=window.ldfdr,n=g,t=a,o=u,e.setTrackerOption(n,"lfaCookieEnabled",true,o.enableCookie),e.setTrackerOption(n,"consentManagementEnabled",false,o.enableCm),e.setTrackerOption(n,"useSendBeaconApi",false,o.useBeacon),e.setTrackerOption(n,"foreignCookieSettings",{"hubspot":"hubspotutk","intercom":"intercom-id-.*"}),e.setTrackerOption(n,"crossDomainLinking",{"enabled":false}),e.setTrackerOption(n,"useDualStackEndpoint",false,o.useDs),e.setTrackerOption(n,"trackingCookieDurationDays",730),e.setTrackerOption(n,"version",t),e.registerPluginConfig(n,"file-downloads",{filesEnabled: true,filesToMatch:/(.pdf|(.docx))$/}),e.registerPluginConfig(n,"form-tracking",{formTrackingEnabled: true},o.trackForms),e.registerPluginConfig(n,"yt-playback",{ytPlaybackTrackingEnabled: true},o.trackYt),e.registerPluginConfig(n,"intercom-tracking",{intercomTrackingEnabled: true},o.trackIntercom),e.registerPluginConfig(n,"discover",{discoverEnabled: false,discoverApiKey:"afafafaf"}),function(e,n){e._q=e._q||[];for(var t=0;t<e._q.length;t++){var r=e._q[t];switch(r[0]){case"cfg":if(4!=r.length){console.warn("* [leadfeeder] invalid 'cfg' command",r);break}var o=r[1];if(-1==d.indexOf(o)){console.warn("* [leadfeeder] unsupported 'cfg' command",r);break}r[3]===n&&e.setTrackerOption(n,o,r[2])}}}(window.ldfdr,g)}var f={key:"__lf_discover",softRefresh:18e5,ttl:864e6,storedAt:null,get:function(){if(window.localStorage){var e=window.localStorage.getItem(this.key);if(null!==e){var n=null;try{n=JSON.parse(e),this.storedAt=n.storedAt,delete n.storedAt}catch(e){if(e instanceof SyntaxError)return;throw e}return n}}},set:function(e){window.localStorage&&(e.storedAt=Date.now(),window.localStorage.setItem(this.key,JSON.stringify(e)),delete e.storedAt)},clear:function(){window.localStorage&&(this.storedAt=null,window.localStorage.removeItem(this.key))},isExpired:function(){return null===this.storedAt||void 0===this.storedAt||Date.now()>=this.storedAt+this.ttl},isSoftExpired:function(){return null===this.storedAt||void 0===this.storedAt||Date.now()>=this.storedAt+this.softRefresh}},s={key:"discover",get:function(){return window[this.key]},set:function(e){window[this.key]=e},clear:function(){this.set(null)}};function v(e,n){var t=new XMLHttpRequest;t.open("GET",e,!0),t.onload=function(){if(200===this.status){var e=JSON.parse(this.response);n(e)}},t.send()}function p(){window.dataLayer=window.dataLayer||[],window.dataLayer.push({event:"discover.loaded"})}function m(e){200!==e.meta.status&&404!==e.meta.status||s.set(e)}function w(e){200!==e.meta.status&&404!==e.meta.status||f.set(e)}P()&&M().registerPlugin(g,"discover",function(){var e=M().getTracker(g).plugins.discover.config,n="__discoverInitialized";window[n]||(window[n]=!0,function(e){if(e.discoverEnabled&&e.discoverApiKey){var n="https://cs.lf-discover.com/companies/?api_key="+e.discoverApiKey,t=ie(window.location.href,"_lf_discover_demo");""!==t&&(n=oe(n,"demo",t));var r=f.get();""!==t?v(n,function(e){m(e),p()}):null==r?v(n,function(e){m(e),w(e),p()}):f.isExpired()?(f.clear(),v(n,function(e){m(e),w(e),p()})):f.isSoftExpired()?(m(r),p(),v(n,function(e){w(e)})):(m(r),p())}}(e))}),P()&&M().registerPlugin(g,"file-downloads",function(){var t=M().getTracker(g),e=t.plugins["file-downloads"].config;if(e.filesEnabled)for(var n=document.getElementsByTagName("a"),r=0;r<n.length;r++){var o=n[r];(o.getAttribute("href")+"").match(e.filesToMatch)&&i(o)}function i(e){function n(){e.removeEventListener("click",n),h(),t.track(function(e){var n=function(e){var n=e.replace(/https?\:\/\//,"").split("/"),t=n[n.length-1].replace(/[\?&].*/,"");return 1!=n.length&&t?t:null}(e.href);return{eventName:"file-download",properties:{url:e.href,filename:n},pageUrl:e.href,pageTitle:n}}(e))}e.addEventListener("click",n)}}),P()&&M().registerPlugin(g,"form-tracking",function(){var t=500,c=["email","text"],r=0,o=M().getTracker(g);function e(e){var n=e.target;console.log("* [leadfeeder][form-tracking] Form's submit handler called ",g,n,e),a(n)}function i(e){var n=e.target,t=n.tagName.toLowerCase();if("submit"===n.type||"button"===n.type||"button"===t){var r=n.form||n.closest("form");r&&(console.log("* [leadfeeder][form-tracking] Submit button clicked",g,r,n),a(r))}}function a(e){if(r+t>=(new Date).getTime())console.log("* [leadfeeder][form-tracking] Skipping duplicate event");else{var n=function(e){for(var n=e.querySelectorAll("input"),t=0;t<n.length;t++){var r=n[t],o=r.value;if(void 0,("text"===(i=r.type)||"email"===i||!i)&&Ue(o))return o}var i;return null}(e);r=(new Date).getTime(),console.log("* [leadfeeder][form-tracking] submitting event",g),h();try{o.track(function(e,n){var t={},r=e.getAttribute("id"),o=e.getAttribute("class"),i=e.getAttribute("action"),a=function(e){for(var n={},t=e.elements,r=0;r<t.length;r++){var o=t[r],i=o.name;i&&-1!=c.indexOf(o.type)&&(n[i]={name:i,type:o.type,value:o.value})}return ge(n)}(e);n&&(t.email=n);r&&(t.formId=r);o&&(t.formClass=o);i&&(t.formAction=i);a&&(t.inputValues=a);return{eventName:"form-submit",properties:t}}(e,n),function(){console.log("* [leadfeeder][form-tracking] track callback called",g)})}catch(e){console.log("* [leadfeeder][form-tracking] error happened when tracking",e)}}}function l(n){try{if(!n.contentDocument)return;n.contentDocument.addEventListener("submit",e),n.contentDocument.addEventListener("click",i)}catch(e){console.log("* [leadfeeder][form-tracking] error accessing iframe.contentDocument",e,n)}}function n(){console.log("* [leadfeeder][form-tracking] Setting up iframes for form tracking",g);for(var e=document.getElementsByTagName("iframe"),n=0;n<e.length;n++)d(e[n])}function d(e){var n="data-lf-form-tracking-inspected-"+g;e.getAttribute(n)||(e.setAttribute(n,"true"),console.log("* [leadfeeder][form-tracking] iframe initialized",e,g),l(e),e.addEventListener("load",function(){l(e)}))}o.plugins["form-tracking"].config.formTrackingEnabled&&(document.addEventListener("submit",e),document.addEventListener("click",i),n(),window.MutationObserver&&new MutationObserver(Le(n,100,{leading:!1})).observe(document.body,{childList:!0,subtree:!0}),console.log("* [leadfeeder][form-tracking] initialized",g))}),P()&&M().registerPlugin(g,"intercom-tracking",function(){var e=M().getTracker(g);e.plugins["intercom-tracking"].config.intercomTrackingEnabled&&function(e,n,t,r){var o;n=n||100,t=t||1.5,r=r||15e3;var i=setTimeout(function(){clearInterval(o)},r),a=function(){clearInterval(o),e()?clearTimeout(i):(n*=t,o=setInterval(a,n))};o=setInterval(a,n)}(function(){return!(void 0===window.Intercom||!window.Intercom.booted)&&(console.log("* [leadfeeder][intercom-tracking] Updating intercom for tracking",g),window.Intercom("update",{lfClientId:e.getClientId()}),!0)})}),P()&&M().registerPlugin(g,"yt-playback",function(){var i=M().getTracker(g);if(i.plugins["yt-playback"].config.ytPlaybackTrackingEnabled&&window.postMessage){var a={},n={},c=!1,l=0;e(),window.MutationObserver&&new MutationObserver(Le(e,100,{leading:!1})).observe(document.body,{childList:!0,subtree:!0})}function e(){var e=document.getElementsByTagName("iframe");if(e.length){!function(){if(c)return;console.log("* [leadfeeder][yt-playback] Initializing main message handler"),window.addEventListener("message",function(e){-1!==["https://www.youtube.com","https://www.youtube-nocookie.com"].indexOf(e.origin)&&void 0!==e.data&&function(e){var n;try{n=JSON.parse(e.data)}catch(e){return}var t=function(e,n){if(a[e])return a[e];for(var t=document.getElementsByTagName("iframe"),r=0;r<t.length;r++){var o=t[r];if(o.contentWindow===n.source||o.contentDocument&&o.contentDocument.defaultView===n.source)return a[e]=o}return null}(n.id,e);if(null===t)return console.warn("* [leadfeeder][yt-playback] Could not find a registered iframe",n);switch(n.event){case"initialDelivery":!function(e,n){var t=f(n.src);if(console.log("* [leadfeeder][yt-playback] iframe communication initialized",e,t),!e.info||!e.info.videoData||t.videoData)return;t.videoData=e.info.videoData}(n,t);break;case"onStateChange":!function(e,n){var t=f(n.src);if(console.log("* [leadfeeder][yt-playback] Received onStateChange event",e,t),-1!==e.info)return;if(t.tracked)return console.log("* [leadfeeder][yt-playback] Event already tracked",t);t.tracked=!0;var r=function(e){return"https://www.youtube.com/watch?v="+s(e)}(n);console.log("* [leadfeeder][yt-playback] Sending video-start event",r,t),i.track({eventName:"video-start",properties:{videoUrl:r,videoTitle:function(e){return e?e.title:void 0}(t.videoData)}})}(n,t)}}(e)}),c=!0}();for(var n=0;n<e.length;n++){var t=e[n],r="data-lf-yt-playback-inspected-"+g;if(!t.getAttribute(r)){t.setAttribute(r,"true");var o=++l+1e3;u(t,o),t.addEventListener("load",d(t,o))}}}}function d(e,n){return function(){console.log("* [leadfeeder][yt-playback] initial load handler.",n,e.src,e.id),u(e,n)}}function u(e,n){if(console.log("* [leadfeeder][yt-playback] setupIframe",n,e.src,e.id),function(e){return function(e){return Ne(e.src,"https://www.youtube.com/embed/")||Ne(e.src,"https://www.youtube-nocookie.com/embed/")}(e)&&function(e){return!!s(e)}(e)&&!function(e){return-1!==e.src.indexOf("enablejsapi=0")}(e)&&!function(e){return-1!==e.src.indexOf("autoplay=1")}(e)}(e))return function(e){return-1===e.src.indexOf("enablejsapi")}(e)?(console.log("* [leadfeeder][yt-playback] Enabling JS API and skipping",n,e.src,e.id),function(e){var n=-1===e.src.indexOf("?")?"?":"&";n+="enablejsapi=1",n+="&origin="+window.location.origin,e.src=e.src+n}(e)):void function(e,n){console.log("YOUTUBE",typeof YT,e.id,e,YT),"undefined"!=typeof YT&&(console.log("YOUTUBE0",typeof YT.get),console.log("YOUTUBE1",YT.get(e.id)));if("undefined"!=typeof YT&&("function"!=typeof YT.get||void 0!==YT.get(e.id)))return console.log("* [leadfeeder][yt-playback] do not setup iframe listener as iframe has an YT player",n,e.src,e.id);console.log("* [leadfeeder][yt-playback] register iframe listener via postMessage",n,e.src,e.id),t(e,{event:"listening",id:n,channel:"widget"}),t(e,{event:"command",func:"addEventListener",args:["onStateChange"],id:n,channel:"widget"})}(e,n);console.log("* [leadfeeder][yt-playback] Not eligible youtube iframe. Skipping.",n,e.src,e.id)}function f(e){return n[e]||(n[e]={src:e,tracked:!1,videoData:null}),n[e]}function s(e){return e.src.split("/")[4].split("?")[0]}function t(e,n){var t=JSON.stringify(n);console.log("* [leadfeeder][yt-playback] sending message",e.src,e.id,t),e.contentWindow.postMessage(t,"*")}});var k=250;function h(){!function(e){M().suppressUnloadUntil=e}((new Date).getTime()+k)}!P()||"suppressUnloadUntil"in M()||(M().suppressUnloadUntil=0,window.addEventListener("beforeunload",function(){var e=new Date,n=M().suppressUnloadUntil;if(n<e.getTime())console.log("* [leadfeeder][before-unload] no pending requests");else{console.log("* [leadfeeder][before-unload] waiting for pending requests",n-e.getTime());for(;n>=e.getTime();0)e=new Date}},!1));var b,y,T="_lfa",I=5;function E(e){e.crossDomainLinking.enabled&&e.lfaCookieEnabled&&(b=window.location.href,document.addEventListener("mousedown",function(e){!function(e){var n=function(e){var n,t=0;do{if(D(e))return e;n=e.parentNode,n=(e=n).parentNode,t++}while(null!==n&&t<100);return null}(e);if(!n)return;if(!function(e){var n=e.getAttribute("href");return!!n&&(!!function(e){return Ne(e,"//")||Ne(e,"http://")||Ne(e,"https://")}(n=String(n))&&function(e,n,t){if(A(e,n))return!1;for(var r=0;r<t.length;r++)if(!A(n,t[r])&&A(e,t[r]))return!0;return!1}(e.hostname,document.location.hostname,F().crossDomainLinking.allowedDomains))}(n))return;!function(e){var n=e.getAttribute("href");e.setAttribute("href",function(e){e=function(e,n){if(-1===(e=String(e)).indexOf("?"+n)&&-1===e.indexOf("&"+n))return e;var t=e.indexOf("?");if(-1===t)return e;var r=e.substr(t+1),o=e.substr(0,t);if(r){var i="",a=r.indexOf("#");-1!==a&&(i=r.substr(a+1),r=r.substr(0,a));for(var c=r.split("&"),l=c.length-1;0<=l;l--)c[l].split("=")[0]===n&&c.splice(l,1);var d=c.join("&");d&&(o=o+"?"+d),i&&(o+="#"+i)}return o}(e,T);var n=function(){var e=F().getClientId(),n=String(S()),t=O();return e+"-"+n+"-"+t}();return oe(e,T,n)}(n))}(n)}(e.target)}))}function C(){if(F().crossDomainLinking.enabled)return function(e){var n=ie(e,T);if(!n)return;var t=function(e){if(54!==e.length||!/^LF\d\.\d\.[0-9a-z]{16}\.\d{13}-\d{10}-[0-9a-z]{6}$/.test(e))return void console.log("* [leadfeeder][cross-domain-linking] _lfa URL param has invalid format",e);var n=e.split("-"),t=n[0],r=parseInt(n[1]),o=n[2],i=S();if(Math.abs(i-r)>I)return void console.log("* [leadfeeder][cross-domain-linking] Timestamp is not valid.","Timestamp from URL:",r,"Current timestamp:",i);var a=O();return o===a?t:void console.log("* [leadfeeder][cross-domain-linking] Different device used.","Link device:",o,"Current device:",a)}(n=String(n));return t?(console.log("* [leadfeeder][cross-domain-linking] Using client Id from URL param",t),t):void 0}(b)}function S(){return Math.floor((new Date).getTime()/1e3)}function O(){return De((navigator.userAgent||"")+(navigator.platform||"")+(navigator.language||"")).slice(0,6)}function A(e,n){e=e.toLowerCase(),n=n.toLowerCase();for(var t=e.split("."),r=n.split("."),o=1;o<=r.length;o++)if(r[r.length-o]!==t[t.length-o])return!1;return!0}function D(e){if(!e)return!1;var n=String(e.nodeName).toLowerCase();return-1!==["a","area"].indexOf(n)}function _(e,n){return(n=e.GoogleAnalyticsObject||"ga")&&e[n]?e[n]:null}function N(e){return e._gat||null}function L(e,n){for(var t=function(e){return e?"function"!=typeof e._getTrackers?(console.info("* [leadfeeder] Legacy GoogleAnalyticsObject not found"),[]):e._getTrackers():[]}(N(e)),r=0;r<t.length;r++)R(t[r]._getAccount(),n.trackingIds,!0)}function U(e,n){for(var t=function(e){return e?"function"!=typeof e.getAll?(console.info("* [leadfeeder] GoogleAnalyticsObject not found"),[]):e.getAll():[]}(_(e)),r=0;r<t.length;r++)R(t[r].get("clientId"),n.clientIds),R(t[r].get("trackingId"),n.trackingIds)}function R(e,n,t){void 0!==e&&-1===n.indexOf(e)&&(t&&"object"==typeof e&&"string"==typeof e.vtp_trackingId?n.push(e.vtp_trackingId):n.push(e))}function x(){var e={clientIds:[],trackingIds:[]};if(null!==_(window)?U(window,e):L(window,e),!e.clientIds.length){var n=function(){var e=Te("_ga");if(e){var n=e.split(".");if(!(n.length<2))return n[n.length-2]+"."+n[n.length-1]}}();n&&e.clientIds.push(n)}return e}function M(){return"undefined"==typeof window?null:window.ldfdr}function P(){return"undefined"!=typeof window&&void 0!==window.ldfdr}function J(n){var e=ge(r());return se(n)?e.map(function(e){return n(e)}):e}window.ldfdr.getTracker=function(e,n){var t=r()[e]||null;return se(n)?n(t):t},window.ldfdr.getAll=J,window.ldfdr.track=function(n){J(function(e){e.track(n)})},window.ldfdr.identify=function(n){J(function(e){e.identify(n)})},window.ldfdr.pageview=function(n){J(function(e){e.pageview(n)})},window.ldfdr.setDebugSettings=function(e){!function(e){pe(l,JSON.stringify(e),36e5)}(e)};var j,z=null;function G(){y=void 0,z=null}function Y(e){var n=y;return n||function(e){y=e}(n=e()),n}function F(){return M().getTracker(g)}function B(){return M().getAll()}function q(){var e=F().foreignCookieSettings,n=[];if(!e)return n;for(var t=function(){for(var e=document.cookie.split(";"),n={},t=0;t<e.length;t++){var r=e[t].split("=");n[(r[0]+"").trim()]=unescape(r.slice(1).join("="))}return n}(),r=Object.keys(t),o=Object.keys(e),i=0;i<o.length;i++)for(var a=o[i],c=e[a],l=0;l<r.length;l++){var d=r[l];if(d.match(c)){var u=t[d];n.push({type:a,value:u})}}return n}function K(e){return null===z&&(z=ye()),!1===e.lfaCookieEnabled&&!0===e.consentManagementEnabled&&console.warn("* [leadfeeder][tracking] Invalid state: lfaCookieEnabled is false, but consentManagementEnabled is true."),!0===e.lfaCookieEnabled&&"1"===function(){if(function(e){return void 0!==e}(navigator.cookieEnabled))return navigator.cookieEnabled?"1":"0";var e="testcookie";return Oe(e,"1"),"1"===Te(e)?"1":"0"}()&&(!1===e.consentManagementEnabled||!0===z)}function W(){return!0===F().useDualStackEndpoint}function V(e,n,t){var r=e+"?sid="+encodeURIComponent(n.scriptId),o=_e(JSON.stringify(n)),i=navigator.sendBeacon(r,o);return se(t)&&t({success:i}),i}function $(e,n,t){var r=e+"?sid="+encodeURIComponent(n.scriptId),o=_e(JSON.stringify(n)),i=document.createElement("img");return i.width=1,i.height=1,i.src=r+"&data="+o,i.onload=function(){se(t)&&t({success:!0})},i.onerror=function(){se(t)&&t({success:!1})},i}function H(){var e=null,n=F().trackingCookieDurationDays;return n&&(e=24*n*60*60*1e3),e}function X(){var e;if(K(F())){e=C()||be();var n=H();return e&&Ne(e,ue)?(Ie(e,n),console.log("* [leadfeeder][tracking] client id updated, value %s",e)):(e=Ie(null,n),console.log("* [leadfeeder][tracking] new client id saved, value %s",e)),e}return be()&&setTimeout(Q,1e3),e=ue+"."+Ae()+".NC",console.log("* [leadfeeder][tracking] cookies disabled, new client id generated %s",e),e}function Q(){be()&&(!function(){for(var e=0,n=B();e<n.length;e++)if(K(n[e]))return!1;return!0}()?console.log("* [leadfeeder][tracking] cannot clear stored client id as other trackers have cookies enabled"):(console.log("* [leadfeeder][tracking] cleared LF cookies, e.g. user consent and client id"),ke(he()),ke(de),ve(de),ke(fe),ve(fe)))}function Z(e){var n=F();void 0===n.gaInitRetries&&(n.gaInitRetries=0);var t=1<=n.gaInitRetries;return function(e){var n=_(e);return null!==n&&"function"==typeof n&&"function"==typeof n.getAll||null!==(n=N(e))&&"object"==typeof n&&"function"==typeof n._getTrackers}(window)?e():t?(console.log("* [leadfeeder][tracking] failed to get GA object for tracking, continuing without it"),e()):(setTimeout(function(){return Z(e)},100*Math.pow(2,n.gaInitRetries)),void(n.gaInitRetries+=1))}function ee(n,t){Z(function(){n=n||{};var e=function(e,n){var t=x(),r=new Date,o=(n=n||{}).eventName||"tracking-event",i=n.referrer||document.referrer;return"form-submit"===o&&(i=""),{gaTrackingIds:t.trackingIds,gaClientIds:t.clientIds,context:{library:{name:"lftracker",version:a},pageUrl:n.pageUrl||window.location.href,pageTitle:n.pageTitle||document.title,referrer:i},event:o,clientEventId:Ae(),clientTimestamp:r.toISOString(),clientTimezone:r.getTimezoneOffset(),scriptId:g,cookiesEnabled:K(F()),anonymizeIp:false,lfClientId:e,foreignCookies:q(),properties:n.properties||{}}}(re(),n);console.log("* [leadfeeder][tracking] event to track:",e),!0===F().useSendBeaconApi&&navigator&&navigator.sendBeacon?(V("https://tr.lfeeder.com",e,t),W()&&V("https://tr2.lfeeder.com",e)):($("https://tr.lfeeder.com",e,t),W()&&$("https://tr2.lfeeder.com",e))})}function ne(e,n){var t=(e=e||{}).email;if(Ue(t)){var r=e.firstName,o=e.lastName,i={email:t};r&&"string"==typeof r&&(i.firstName=r),o&&"string"==typeof o&&(i.lastName=o),ee({eventName:"identify",properties:i},n)}else console.warn("* [leadfeeder][tracking] Email is invalid in 'identify' payload")}function te(e,n){var t={eventName:"tracking-event"};(e=e||{}).pageUrl&&(t.pageUrl=e.pageUrl),e.pageTitle&&(t.pageTitle=e.pageTitle),ee(t,n)}function re(){return Y(X)}function oe(e,n,t){t=t||"";var r=(e=String(e)).indexOf("#"),o=e.length;-1===r&&(r=o);var i=e.substr(0,r),a=e.substr(r,o-r);return-1===i.indexOf("?")?i+="?":function(e,n){return-1!==(e=String(e)).indexOf(n,e.length-n.length)}(i,"?")||(i+="&"),i+window.encodeURIComponent(n)+"="+window.encodeURIComponent(t)+a}function ie(e,n){var t=new RegExp("[\\?&#]"+n+"=([^&#]*)").exec(e);return t?function(n){try{return window.decodeURIComponent(n)}catch(e){return unescape(n)}}(t[1]):""}var ae,ce,le,de="_lfa",ue="LF1.1",fe="_lfa_consent";function se(e){return"function"==typeof e}function ge(e){if(Object.values)return Object.values(e);var n=[];for(var t in e)"string"==typeof t&&e.propertyIsEnumerable(t)&&n.push(e[t]);return n}function ve(e){if(Te(e)){var n=window.ldfdr.cfg.cookieDomain;if(n)Se(e,n);else for(var t=Ce().reverse(),r=0;r<t.length;r++){if(Se(e,n=t[r]),!Te(e))return void console.log("* [leadfeeder][cookie] Deleted cookie for domain",n);console.warn("* [leadfeeder][cookie] Failed to delete cookie for domain",n)}}}function pe(e,n,t){var r=window.ldfdr.cfg.cookieDomain||j;if(r)Oe(e,n,t,"/",r);else for(var o=Ce(),i=0;i<o.length;i++){if(Oe(e,n,t,"/",r=o[i]),me(r)&&Te(e)===n)return console.log("* [leadfeeder][cookie] Stored cookie for domain",r),void(j=r);console.warn("* [leadfeeder][cookie] Failed to store cookie for domain",r)}}function me(e){var n="cookie-test",t=(new Date).getTime().toString()+"-"+Math.random().toString();Oe(n,t,1e3,"/",e);var r=Te(n)===t;return Se(n,e),r}function we(e,n,t){pe(e,n,t),localStorage.setItem(e,n);var r=new Date;r.setTime(r.getTime()+t),localStorage.setItem(he(),r.toISOString())}function ke(e){localStorage.removeItem(e)}function he(){return de+"_expiry"}function be(){return function(){var e=Te(de);if(!e)return;if(!Ne(e,ue)){var n=function(e){var n;try{n=function(e){if(!e)return 0;var n=function(n){try{return decodeURIComponent(window.atob(n).split("").map(function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)}).join(""))}catch(e){return console.warn("* [leadfeeder] can't base64 decode: "+n),0}}(e);return n?JSON.parse(n):0}(e)}catch(e){return console.warn("* [leadfeeder][cookie] Error while trying to read deprecated cookie",e),0}if(!n)return 0;var t=ge(n)[0];return console.log("* [leadfeeder][cookie] Found old-style cookie (clientId per scriptId). Returning first clientId",t),t}(e);if(n)return n}return e}()||function(){var e=localStorage.getItem(de);if(null!=e){var n=localStorage.getItem(he());null!=n&&(new Date).toISOString()>n&&(e=0)}else e=0;return e}()}function ye(){return"true"===(Te(fe)||localStorage.getItem(fe))}function Te(e){var n=new RegExp("(^|;)[ ]*"+e+"=([^;]*)").exec(document.cookie);return n?window.decodeURIComponent(n[2]):0}function Ie(e,n){e=e||function(e){return ue+"."+e+"."+(new Date).getTime()}(Ae());return we(de,e,n),!0===ye()&&Ee(n),e}function Ee(e){we(fe,"true",e)}function Ce(e){var n=e||document.location.hostname,t=(n=0===n.indexOf("www.")?n.substring(4):n).split(".");if(4===t.length){var r=t[t.length-1];if(parseInt(r,10)==r)return["none"]}for(var o=[],i=t.length-2;0<=i;i--)o.push(t.slice(i).join("."));return o.push("none"),o}function Se(e,n){Oe(e,"",-3600,"/",n)}function Oe(e,n,t,r,o,i){var a;t&&(a=new Date).setTime(a.getTime()+t),document.cookie=e+"="+window.encodeURIComponent(n)+(t?";expires="+a.toGMTString():"")+";path="+(r||"/")+(o&&"none"!==o?";domain="+o:"")+(i?";secure":"")+";SameSite=Lax"}function Ae(){return De((navigator.userAgent||"")+(navigator.platform||"")+(navigator.language||"")+(new Date).getTime()+Math.random()).slice(0,16)}function De(e){function n(e,n){return e<<n|e>>>32-n}function t(e){var n,t="";for(n=7;0<=n;n--)t+=(e>>>4*n&15).toString(16);return t}var r,o,i,a,c,l,d,u,f,s,g=[],v=1732584193,p=4023233417,m=2562383102,w=271733878,k=3285377520,h=[];for(s=(e=function(e){return unescape(window.encodeURIComponent(e))}(e)).length,o=0;o<s-3;o+=4)i=e.charCodeAt(o)<<24|e.charCodeAt(o+1)<<16|e.charCodeAt(o+2)<<8|e.charCodeAt(o+3),h.push(i);switch(3&s){case 0:o=2147483648;break;case 1:o=e.charCodeAt(s-1)<<24|8388608;break;case 2:o=e.charCodeAt(s-2)<<24|e.charCodeAt(s-1)<<16|32768;break;case 3:o=e.charCodeAt(s-3)<<24|e.charCodeAt(s-2)<<16|e.charCodeAt(s-1)<<8|128}for(h.push(o);14!=(15&h.length);)h.push(0);for(h.push(s>>>29),h.push(s<<3&4294967295),r=0;r<h.length;r+=16){for(o=0;o<16;o++)g[o]=h[r+o];for(o=16;o<=79;o++)g[o]=n(g[o-3]^g[o-8]^g[o-14]^g[o-16],1);for(a=v,c=p,l=m,d=w,u=k,o=0;o<=19;o++)f=n(a,5)+(c&l|~c&d)+u+g[o]+1518500249&4294967295,u=d,d=l,l=n(c,30),c=a,a=f;for(o=20;o<=39;o++)f=n(a,5)+(c^l^d)+u+g[o]+1859775393&4294967295,u=d,d=l,l=n(c,30),c=a,a=f;for(o=40;o<=59;o++)f=n(a,5)+(c&l|c&d|l&d)+u+g[o]+2400959708&4294967295,u=d,d=l,l=n(c,30),c=a,a=f;for(o=60;o<=79;o++)f=n(a,5)+(c^l^d)+u+g[o]+3395469782&4294967295,u=d,d=l,l=n(c,30),c=a,a=f;v=v+a&4294967295,p=p+c&4294967295,m=m+l&4294967295,w=w+d&4294967295,k=k+u&4294967295}return(f=t(v)+t(p)+t(m)+t(w)+t(k)).toLowerCase()}function _e(e){return window.btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,function(e,n){return String.fromCharCode("0x"+n)}))}function Ne(e,n){return e.substring(0,n.length)===n}function Le(t,r,o){var i,a,c,l,d=0;o=o||{};function u(){d=!1===o.leading?0:(new Date).getTime(),i=null,l=t.apply(a,c),i||(a=c=null)}function e(){var e=(new Date).getTime();d||!1!==o.leading||(d=e);var n=r-(e-d);return a=this,c=arguments,n<=0||r<n?(i&&(clearTimeout(i),i=null),d=e,l=t.apply(a,c),i||(a=c=null)):i||!1===o.trailing||(i=setTimeout(u,n)),l}return e.cancel=function(){clearTimeout(i),d=0,i=a=c=null},e}function Ue(e){return"string"==typeof e&&!!e.match(/^[^@\s]+@([^@\s]+\.)+[^@\W]+$/)}if(P()){"about:srcdoc"===location.href&&console.warn("* [leadfeeder] Embedding Leadfeeder tracker inside an iframe is not supported.");var Re=(function(e){for(var n=e.getPlugins(),t=0;t<n.length;t++){var r=n[t];r.initialized||r.init(),r.initialized=!0}e.pluginsInitialized=!0}(le=M().registerTracker(g,ee,ne,te,re,G)),E(le),ae=le,(ce=document.createEvent("Event")).tracker=ae,ce.initEvent("ldfdr.trackerReady",!0,!1),void document.dispatchEvent(ce),le);!1!==Re.enableAutoTracking&&Re.pageview()}}();