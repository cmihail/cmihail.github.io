!function(){"use strict";function c(e){var n=P();return n[e]=n[e]||{id:e,plugins:{},getPlugins:function(){var e,n=[];for(e in this.plugins)n.push(this.plugins[e]);return n},autoTrackingInitialized:!1},n[e]}function j(e,n){e=c(e);return e.plugins[n]=e.plugins[n]||{},e.plugins[n]}function P(){var e=w();return e.r=e.r||{},e.r}u()&&(window.ldfdr.registerTracker=function(e,n,t,o,r,i,a){return(e=c(e)).track=n,e.identify=t,e.pageview=o,e.getClientId=r,e.acceptCookie=i,e.rejectCookie=a,e},window.ldfdr.setTrackerOption=function(e,n,t,o){c(e)[n]=void 0!==o?o:t},window.ldfdr.registerPlugin=function(e,n,t){var o=c(e),r=j(e,n);r.init=function(){try{t()}catch(e){console.error("Error during plugin initialization",r,e)}},o.pluginsInitialized&&r.init()},window.ldfdr.registerPluginConfig=function(e,n,t,o){j(e,n).config=void 0!==o?o:t});var e,n,U,v="testing",J="2.61.3",G="_lfa_debug_settings",F=["cookieDomain","enableAutoTracking","trackingCookieDurationDays"];if("undefined"!=typeof window&&void 0!==window.ldfdr){window.ldfdr=window.ldfdr||{},window.ldfdr.cfg=window.ldfdr.cfg||{};var t=function(){var n=T(G)||"{}";try{return console.log("Found override settings",n),JSON.parse(n)}catch(e){return console.warn("Could not parse stored override settings",n),{}}}(),o=(e=window.ldfdr,n=v,U=J,t=t,e.setTrackerOption(n,"lfaCookieEnabled",true,t.enableCookie),e.setTrackerOption(n,"consentManagementEnabled",false,t.enableCm),e.setTrackerOption(n,"useSendBeaconApi",false,t.useBeacon),e.setTrackerOption(n,"autoTrackingMode","on_script_load",t.atMode),e.setTrackerOption(n,"foreignCookieSettings",{"hubspot":"^hubspotutk$","intercom":"^intercom-id-.*"}),e.setTrackerOption(n,"crossDomainLinking",{"enabled":false}),e.setTrackerOption(n,"useDualStackEndpoint",false,t.useDs),e.setTrackerOption(n,"trackingCookieDurationDays",365),e.setTrackerOption(n,"version",U),e.registerPluginConfig(n,"file-downloads",{filesEnabled: true,filesToMatch:/(.pdf|(.docx))(\?|$)/}),e.registerPluginConfig(n,"form-tracking",{formTrackingMode:"disabled",fields:[],excluded:[]},t.trackForms),e.registerPluginConfig(n,"yt-playback",{ytPlaybackTrackingEnabled: true},t.trackYt),e.registerPluginConfig(n,"vimeo-playback",{vimeoPlaybackTrackingEnabled: true},t.trackVimeo),e.registerPluginConfig(n,"intercom-tracking",{intercomTrackingEnabled: true},t.trackIntercom),e.registerPluginConfig(n,"discover",{jsConnectorConfigs:[]}),e.registerPluginConfig(n,"spa-tracking",{}),e.registerPluginConfig(n,"ga-connector",{gaConnectorSettings:[]}),window.ldfdr),z=v;o._q=o._q||[];for(var B=0;B<o._q.length;B++){var W,r=o._q[B];"cfg"===r[0]&&(4!=r.length?console.warn("* [leadfeeder] invalid 'cfg' command",r):(W=r[1],-1==F.indexOf(W)?console.warn("* [leadfeeder] unsupported 'cfg' command",r):r[3]===z&&o.setTrackerOption(z,W,r[2])))}}var q="__discoverLoadEventEmitted",V={get:function(e){return window[e]},set:function(e,n){window[n]=e},clear:function(e){this.set(null,e)}};function Y(o,r){var i,e,n,a;if(!o[q])return i=window.location.hostname,e=window.location.pathname,n=o.paths,a=function(e){return e===x||e[e.length-1]!==x?e:e.slice(0,-1)}(a=""===e?x:e),n.some(function(e){return n=i,t=a,e=function(e){return e.split(/\/(.*)/).filter(function(e){return""!==e})}(e=e),o=e[0],e=x+(2<=e.length?e[1]:""),o===n&&(e===t||(o=t,0<=(n=e).indexOf("*")&&0===o.indexOf(n.replace("/*","").replace("*","")))||n===x);var n,t,o})?void Ie(o.api_key,function(e){var n,t;e=e,n=o.js_object_name,200!==e.meta.status&&404!==e.meta.status||V.set(e,n),t=o.event_name,window.dataLayer=window.dataLayer||[],window.dataLayer.some(function(e){return e.event===t})||(window[q]=!0,console.log("* [leadfeeder][js-connector] Pushing datalayer event",t),window.dataLayer.push({event:t})),o[q]=!0,r()}):(console.log("* [leadfeeder][js-connector] Page not permitted for connector"),r());console.log("* [leadfeeder][js-connector] Event already emitted")}u()&&w().registerPlugin(v,"discover",function(){var e=w().getTracker(v).plugins.discover.config;(e=e).jsConnectorConfigs&&0!==e.jsConnectorConfigs.length&&Dn(e.jsConnectorConfigs.map(function(n){return function(e){Y(n,e)}}),0)}),u()&&w().registerPlugin(v,"file-downloads",function(){var i=w().getTracker(v),r=i.plugins["file-downloads"].config;function a(o){function r(){var e,n,t;o.removeEventListener("click",r),fe(),i.track((n=function(e){var e=e.replace(/https?\:\/\//,"").split("/"),n=e[e.length-1].replace(/[\?&].*/,"");return 1!=e.length&&n?n:null}((e=o).href),t=window.location.href,{eventType:"file-download",properties:{url:function(e,n){return"/"==e.href.charAt(0)?function(e){return"/"==e.charAt(e.length-1)?e.substr(0,e.length-1):e}(n)+e.href:e.href}(e,t),filename:n},pageUrl:t,pageTitle:n}))}o.addEventListener("click",r)}function e(){for(var e=document.getElementsByTagName("a"),n=0;n<e.length;n++){var t,o=e[n];!(o.getAttribute("href")+"").match(r.filesToMatch)||o.getAttribute(t="data-lf-fd-inspected-"+v)||(o.setAttribute(t,"true"),a(o))}}r.filesEnabled&&(e(),M(e))}),u()&&w().registerPlugin(v,"form-tracking",function(){var e,n,t,o=500,l=["button","hidden","image","password","reset","submit"],r=0,i=w().getTracker(v),d=(e=i.plugins["form-tracking"].config,n=(e.fields||[]).map(function(e){return{nameRegex:new RegExp(e.nameRegex,"i"),type:e.type,lfProperty:e.lfProperty}}),t=(e.excluded||[]).map(function(e){var n,t={};for(n in e)t[n]=new RegExp(e[n],"i");return t}),{formTrackingMode:e.formTrackingMode,fields:n,excluded:t});function a(e){var n=e.target;console.log("* [leadfeeder][form-tracking] Form's submit handler called ",v,n,e),f(n,"submit-event")}function c(e){var n;return e?(n=e.type,e=e.tagName.toLowerCase(),"submit"===n?"submit-button":"button"===n||"button"===e?"normal-button":null):null}function s(e){var n,e=e.target,t=c(e)||c(e.parentElement);t&&-1==(n=((n=e).innerText||n.value||"").toLowerCase()).indexOf("prev")&&-1==n.indexOf("next")&&(n=e.form||e.closest("form"))&&(console.log("* [leadfeeder][form-tracking] Submit button clicked",v,n,e),f(n,t))}function u(r){var i=window.location.href;return d.excluded.some(function(e){return t=i,(o=e).pageUrl&&t.match(o.pageUrl)||function(e,n){if(n.inputName)for(var t=e.elements,o=0;o<t.length;o++){var r=t[o];if(r.name&&r.name.match(n.inputName))return!0}return!1}(r,e)||(t=r,(o=e).formId&&t.id.match(o.formId))||(t=r,!!(n=e).formClass&&t.className.split(/\s+/).some(function(e){return e&&e.match(n.formClass)}));var n,t,o})}function f(e,n){if(u(e))console.log("* [leadfeeder][form-tracking] Skpping event as form is in exclusion rules.");else if(r+o>=(new Date).getTime())console.log("* [leadfeeder][form-tracking] Skipping duplicate event");else{var t=function(e){for(var n={},t=e.elements,o=d.fields?d.fields.filter(function(e){return!!e.lfProperty}):[],r=0;r<t.length;r++){var i=t[r],a=i.name,c=!!i.style&&"none"==i.style.display;!a||0<=l.indexOf(i.type)||c||(n[a]={name:a,type:i.type},function(e){return"text"===(e=e.type)||"email"===e||!e}(i)&&Mn(i.value)&&(n[a].suggestedLfProperty="email"),function(n){switch(d.formTrackingMode){case"configured_fields":return d.fields.some(function(e){return g(n,e)});case"all_but_excluded":return 1;default:return}}(i)&&(n[a].value=i.value,c=function(e,n){for(var t=0;t<n.length;t++){var o=n[t];if(g(e,o))return o.lfProperty}return null}(i,o))&&(n[a].lfProperty=c))}return console.log("TO SEND",n),On(n)}(e);if(t&&0!=t.length){r=(new Date).getTime(),console.log("* [leadfeeder][form-tracking] submitting event",v),fe();try{i.track(function(e,n,t){var n={formTrackingMode:d.formTrackingMode,formEventType:n},o=e.getAttribute("id"),r=e.getAttribute("class"),e=e.getAttribute("action");o&&(n.formId=o);r&&(n.formClass=r);e&&(n.formAction=e);t&&(n.inputFields=t);return{eventType:"form-submit",properties:n}}(e,n,t),function(){console.log("* [leadfeeder][form-tracking] track callback called",v)})}catch(e){console.log("* [leadfeeder][form-tracking] error happened when tracking",e)}}else console.log("* [leadfeeder][form-tracking] Skipping event without input fields")}}function g(e,n){return(!n.type||n.type===e.type)&&e.name.match(n.nameRegex)}function p(n){try{n.contentDocument&&(n.contentDocument.addEventListener("submit",a),n.contentDocument.addEventListener("click",s,!0))}catch(e){console.log("* [leadfeeder][form-tracking] error accessing iframe.contentDocument",e,n)}}function m(){console.log("* [leadfeeder][form-tracking] Setting up iframes for form tracking",v);for(var e=document.getElementsByTagName("iframe"),n=0;n<e.length;n++)!function(e){var n="data-lf-form-tracking-inspected-"+v;e.getAttribute(n)||(e.setAttribute(n,"true"),console.log("* [leadfeeder][form-tracking] iframe initialized",e,v),p(e),e.addEventListener("load",function(){p(e)}))}(e[n])}switch(d.formTrackingMode){case"disabled":return void console.log("* [leadfeeder][form-tracking] form plugin is disabled",v);case"metadata":case"configured_fields":case"all_but_excluded":return document.addEventListener("submit",a),document.addEventListener("click",s,!0),m(),M(m),void console.log("* [leadfeeder][form-tracking] initialized form plugin",v,d.formTrackingMode);default:return void console.warn("Unsupported tracking mode:",d.formTrackingMode)}});var K=null,$="__gaConnectorEventsEmitted",X="LFcompanyData",H="LFvisitorInfo";function Z(e){-1===window[$].indexOf(e)&&window[$].push(e)}function Q(i,a){console.log("* [leadfeeder][ga-connector] Running for analytics.js",i.ga_id),setTimeout(function(){var e,n,t;e=i.ga_id,n=function(r){if(!r)return console.log("* [leadfeeder][ga-connector] No tracker detected",i.ga_id),a();Ie(i.api_key,function(e){var n,t,o,e=Te(e.data,i.mappings);n=r,t=i.ga_id,e=e,o=d(window),null===e?console.log("* [leadfeeder][ga-connector] No dimensions to send for",t):(console.log("* [leadfeeder][ga-connector] Pushing dimensions to",t),o((n=n.get("name"))+".set",e),o(n+".send",{hitType:"event",eventCategory:H,eventAction:X,nonInteraction:!0}),Z(t)),a()})},t=e.toLowerCase(),d(window)(function(){if(void 0===d(window).getAll)return console.log("* [leadfeeder][ga-connector] getAll() is not defined. Exiting."),n(null);var e=d(window).getAll().filter(function(e){return e.get("trackingId").toLowerCase()==t})[0];n(e)})},100)}function ee(e,n){var t,o,r;console.log("* [leadfeeder][ga-connector] Injecting gtag.js"),t="https://www.googletagmanager.com/gtag/js?id="+e,o=function(){window.dataLayer=window.dataLayer||[],window.gtag=function(){window.dataLayer.push(arguments)},window.gtag("js",new Date),window.gtag("config",e,{send_page_view:!1}),n()},(r=document.createElement("script")).type="text/javascript",r.src=t,r.onload=function(){o&&o()},document.getElementsByTagName("head")[0].appendChild(r)}function ne(r,i){function e(){Ie(r.api_key,function(e){var n,t,o,e=Te(e.data,r.mappings);n=r.ga_id,e=e,o=Ce(window),null===e?console.log("* [leadfeeder][ga-connector] No dimensions to send for",n):(console.log("* [leadfeeder][ga-connector] Sending gtag event",n),(t=JSON.parse(JSON.stringify(e))).user_properties=e,t.event_category=H,t.non_interaction=!0,t.send_to=n,o("event",X,t),Z(n)),i()})}console.log("* [leadfeeder][ga-connector] Running for gtag.js",r.ga_id),Ce(window)?e():ee(r.ga_id,e)}function te(e){(d(window)||Ce(window)||_e(window))&&(clearInterval(K),console.log("* [leadfeeder][ga-connector] GA has been detected. Running connectors"),Dn(e.map(function(t){return function(e){var n;e=e,Ae((n=t).ga_id)?ne(n,e):d(window)?Q(n,e):console.log("* [leadfeeder][ga-connector] ga is missing, Exiting")}}),0))}window[$]=[],u()&&w().registerPlugin(v,"ga-connector",function(){var e,n=w().getTracker(v).plugins["ga-connector"].config;(e=n).gaConnectorSettings&&0!==e.gaConnectorSettings.length?(console.log("* [leadfeeder][ga-connector] Waiting for GA to be ready"),K=setInterval(function(){te(e.gaConnectorSettings)},300),setTimeout(function(){clearInterval(K)},1e4)):console.log("* [leadfeeder][ga-connector] No GA connector settings set. Exiting.")}),u()&&w().registerPlugin(v,"intercom-tracking",function(){var e,n,t,o,r,i,a=w().getTracker(v);function c(){clearInterval(r),e()?clearTimeout(i):(n*=t,r=setInterval(c,n))}a.plugins["intercom-tracking"].config.intercomTrackingEnabled&&(e=function(){return void 0!==window.Intercom&&window.Intercom.booted&&(console.log("* [leadfeeder][intercom-tracking] Updating intercom for tracking",v),window.Intercom("update",{lfClientId:a.getClientId()}),1)},n=n||100,t=t||1.5,o=o||15e3,i=setTimeout(function(){clearInterval(r)},o),r=setInterval(c,n))});var oe=null,re=null;function l(n,t,o){setTimeout(function(){o&&(oe=re);var e={pageUrl:re=t};oe&&(e.referrer=oe),console.log("* [leadfeeder][spa] location.href change",e),n.pageview(e)},0)}function ie(e){var o,r,i,a;window.history?(o=e,r=window.history,i=r.pushState,r.pushState=function(e,n,t){console.log("* [leadfeeder][spa] history push state",n,t);n=i.apply(r,arguments);return l(o,window.location.href,!0),n},a=r.replaceState,r.replaceState=function(e,n,t){console.log("* [leadfeeder][spa] history replace state",n,t);n=a.apply(r,arguments);return l(o,window.location.href,!1),n},window.addEventListener("popstate",function(){console.log("* [leadfeeder][spa] popstate change",window.location.href),l(e,window.location.href,!0)}),window.addEventListener("hashchange",function(){console.log("* [leadfeeder][spa] hash change",window.location.href),l(e,window.location.href,!0)})):console.warn("* [leadfeeder][spa] history API is not available")}function ae(e){return e.src.replace("/?","?").split("/").pop().split("?")[0]}function ce(e,n,t){n={method:n},t&&(n.value=t),t=JSON.stringify(n);e.contentWindow.postMessage(t,"*")}function le(e){return(R(e.src,"http://player.vimeo.com")||R(e.src,"https://player.vimeo.com"))&&!!ae(e)}function de(e){console.log("* [leadfeeder][vimeo-playback] setupVimeoIframe",e.src,e.id),le(e)?(ce(e,"addEventListener","play"),ce(e,"getVideoTitle","")):console.log("* [leadfeeder][vimeo-playback] Not eligible Vimeo iframe. Skipping.",e.src,e.id)}function se(){var e=document.getElementsByTagName("iframe");if(e.length)for(var n=0;n<e.length;n++){var t=e[n],o="data-lf-vimeo-playback-inspected-"+v;t.getAttribute(o)||(t.setAttribute(o,"true"),de(t),t.addEventListener("load",function(){de(t)}))}}u()&&w().registerPlugin(v,"spa-tracking",function(){var e=w().getTracker(v);e=e,re=window.location.href,console.log("* [leadfeeder][spa] Set up spa auto tracking",e.autoTrackingMode),"spa"===e.autoTrackingMode&&ie(e)}),u()&&w().registerPlugin(v,"vimeo-playback",function(){var n,t=w().getTracker(v);function o(e){return n[e]||(n[e]={src:e,tracked:!1,videoData:null}),n[e]}function r(e){var n=o(e.src);n.tracked?console.log("* [leadfeeder][vimeo-playback] Event already tracked",n):(n.tracked=!0,e="https://vimeo.com/"+ae(e),console.log("* [leadfeeder][vimeo-playback] Sending video-start event",e,n),t.track({eventType:"video-start",properties:{videoUrl:e,videoTitle:n.title}}))}function e(e){if(!/^https?:\/\/player.vimeo.com/.test(e.origin))return!1;var n=function(n){try{return JSON.parse(n.data)}catch(e){return n.data}}(e),t=function(e){for(var n=document.getElementsByTagName("iframe"),t=0;t<n.length;t++)if(e.source===n[t].contentWindow)return n[t];return null}(e);if(null==t)return console.warn("* [leadfeeder][vimeo-playback] Missing iframe for vimeo video",e),!1;switch(n.event){case"ready":de(t);break;case"play":r(t)}"getVideoTitle"==n.method&&(o(t.src).title=n.value,-1!==t.src.indexOf("autoplay=1"))&&r(t)}t.plugins["vimeo-playback"].config.vimeoPlaybackTrackingEnabled&&window.postMessage&&(n={},window.addEventListener?window.addEventListener("message",e,!1):window.attachEvent("onmessage",e,!1),se(),M(se))}),u()&&w().registerPlugin(v,"yt-playback",function(){var i,n,r,a,t=w().getTracker(v);function e(){var e=document.getElementsByTagName("iframe");if(e.length){r||(console.log("* [leadfeeder][yt-playback] Initializing main message handler"),window.addEventListener("message",function(e){if(-1!==["https://www.youtube.com","https://www.youtube-nocookie.com"].indexOf(e.origin)&&void 0!==e.data){var n,t=e;try{n=JSON.parse(t.data)}catch(t){return void console.warn("* [leadfeeder][yt-playback] Could not parse YT data",t.data)}var o=function(e,n){if(i[e])return i[e];for(var t=document.getElementsByTagName("iframe"),o=0;o<t.length;o++){var r=t[o];if(r.contentWindow===n.source||r.contentDocument&&r.contentDocument.defaultView===n.source)return i[e]=r}return null}(n.id,t);if(null===o)console.warn("* [leadfeeder][yt-playback] Could not find a registered iframe",n);else switch(n.event){case"initialDelivery":!function(e,n){n=d(n.src);console.log("* [leadfeeder][yt-playback] iframe communication initialized",e,n),e.info&&e.info.videoData&&!n.videoData&&(n.videoData=e.info.videoData)}(n,o);break;case"onStateChange":!function(e,n){console.log("* [leadfeeder][yt-playback] Received onStateChange event",e,n),-1===e.info&&l(n)}(n,o)}}}),r=!0);for(var n=0;n<e.length;n++){var t=e[n],o="data-lf-yt-playback-inspected-"+v;t.getAttribute(o)||(t.setAttribute(o,"true"),c(t,o=++a+1e3),t.addEventListener("load",function(e,n){return function(){console.log("* [leadfeeder][yt-playback] initial load handler.",n,e.src,e.id),c(e,n)}}(t,o)))}}}function c(e,n){if(console.log("* [leadfeeder][yt-playback] setupIframe",n,e.src,e.id),function(e){return R(e.src,"https://www.youtube.com/embed/")||R(e.src,"https://www.youtube-nocookie.com/embed/")}(t=e)&&function(e){return s(e)}(t)&&-1===t.src.indexOf("enablejsapi=0")){var t,o;if(-1===e.src.indexOf("autoplay=1"))return-1===e.src.indexOf("enablejsapi")?(console.log("* [leadfeeder][yt-playback] Enabling JS API and skipping",n,e.src,e.id),o=-1===(t=e).src.indexOf("?")?"?":"&",o=(o+="enablejsapi=1")+"&origin="+window.location.origin,t.src=t.src+o):(t=e,o=n,void("undefined"==typeof YT||"function"==typeof YT.get&&t.id&&void 0===YT.get(t.id)?(console.log("* [leadfeeder][yt-playback] register iframe listener via postMessage",o,t.src,t.id),u(i[o]=t,{event:"listening",id:o,channel:"widget"}),u(t,{event:"command",func:"addEventListener",args:["onStateChange"],id:o,channel:"widget"})):console.log("* [leadfeeder][yt-playback] do not setup iframe listener as iframe has an YT player",o,t.src,t.id)));console.log("* [leadfeeder][yt-playback] Track youtube video that has autoplay.",n,e.src,e.id),l(e)}else console.log("* [leadfeeder][yt-playback] Not eligible youtube iframe. Skipping.",n,e.src,e.id)}function l(e){var n=d(e.src);n.tracked?console.log("* [leadfeeder][yt-playback] Event already tracked",n):(n.tracked=!0,e="https://www.youtube.com/watch?v="+s(e),console.log("* [leadfeeder][yt-playback] Sending video-start event",e,n),t.track({eventType:"video-start",properties:{videoUrl:e,videoTitle:function(e){if(e)return e.title}(n.videoData)}}))}function d(e){return n[e]||(n[e]={src:e,tracked:!1,videoData:null}),n[e]}function s(e){return e.src.split("/")[4].split("?")[0]}function u(e,n){n=JSON.stringify(n);console.log("* [leadfeeder][yt-playback] sending message",e.src,e.id,n),e.contentWindow.postMessage(n,"*")}t.plugins["yt-playback"].config.ytPlaybackTrackingEnabled&&window.postMessage&&(i={},r=!(n={}),a=0,e(),M(e))});var ue=250;function fe(){var e;e=(new Date).getTime()+ue,w().suppressUnloadUntil=e}function ge(){var e=new Date,n=w().suppressUnloadUntil;if(n<e.getTime())console.log("* [leadfeeder][before-unload] no pending requests");else{console.log("* [leadfeeder][before-unload] waiting for pending requests",n-e.getTime());for(;n>=e.getTime();0)e=new Date}}!u()||"suppressUnloadUntil"in w()||(w().suppressUnloadUntil=0,window.addEventListener("beforeunload",ge,!1));var pe,me="_lfa",ve=5;function we(e){e.crossDomainLinking.enabled&&e.lfaCookieEnabled&&(pe=window.location.href,document.addEventListener("mousedown",function(e){var n;(e=function(e){var n,t=0;do{if(function(e){return e&&(e=String(e.nodeName).toLowerCase(),-1!==["a","area"].indexOf(e))}(e))return e}while(n=e.parentNode,n=(e=n)?e.parentNode:null,t++,null!==n&&t<100);return null}(e=e.target))&&function(e){var n=e.getAttribute("href");if(!n)return;if(En(n=String(n))){var t=e.hostname,o=document.location.hostname,r=A().crossDomainLinking.allowedDomains;if(!ye(t,o))for(var i=0;i<r.length;i++)if(!ye(o,r[i])&&ye(t,r[i]))return 1}return}(e)&&(n=(e=e).getAttribute("href"),e.setAttribute("href",function(e){e=Cn(e,me);var n=function(){var e=A().getClientId(),n=String(he());return e+"-"+n}();return In(e,me,n)}(n)))}))}function ke(){if(A().crossDomainLinking.enabled){var e=pe;if(e=_n(e,me)){e=function(e){if(47===e.length&&/^LF\d\.\d\.[0-9a-z]{16}\.\d{13}-\d{10}$/.test(e)){var n=e.split("-"),t=n[0],n=parseInt(n[1]),o=he();if(!(Math.abs(o-n)>ve))return t;console.log("* [leadfeeder][cross-domain-linking] Timestamp is not valid.","Timestamp from URL:",n,"Current timestamp:",o)}else console.log("* [leadfeeder][cross-domain-linking] _lfa URL param has invalid format",e)}(e=String(e));if(e)return console.log("* [leadfeeder][cross-domain-linking] Using client Id from URL param",e),e}}}function he(){return Math.floor((new Date).getTime()/1e3)}function ye(e,n){e=e.toLowerCase(),n=n.toLowerCase();for(var t=e.split("."),o=n.split("."),r=1;r<=o.length;r++)if(o[o.length-r]!==t[t.length-r])return;return 1}var i={key:"__lf_discover",softRefresh:18e5,ttl:864e6,storedAt:null,get:function(){if(C()){var e=window.localStorage.getItem(this.key);if(null!==e){var n=null;try{n=JSON.parse(e),this.storedAt=n.storedAt,delete n.storedAt}catch(e){if(e instanceof SyntaxError)return;throw e}return n}}},set:function(e){C()&&(e.storedAt=Date.now(),window.localStorage.setItem(this.key,JSON.stringify(e)),delete e.storedAt)},clear:function(){C()&&(this.storedAt=null,window.localStorage.removeItem(this.key))},isExpired:function(){return null===this.storedAt||void 0===this.storedAt||Date.now()>=this.storedAt+this.ttl},isSoftExpired:function(){return null===this.storedAt||void 0===this.storedAt||Date.now()>=this.storedAt+this.softRefresh}};function be(e){200!==e.meta.status&&404!==e.meta.status||i.set(e)}function a(e,n){var t=new XMLHttpRequest;t.open("GET",e,!0),t.onload=function(){var e;200===this.status&&(e=function(e){try{return JSON.parse(e)}catch(e){if(e instanceof SyntaxError)return{meta:{status:404}};throw e}}(this.response),n(e))},t.send()}function Te(o,e){var n,r;return e&&o&&(n="attribute",e.map(function(e){return An(e,n)}).map(function(e){return An(o,e)}).some(function(e){return null!=e&&""!==e}))?(r={},e.forEach(function(e){var n=An(o,e.attribute),t=e.dimension;r[t]=n||e.fallback_value}),r):null}function Ie(e,n){var e="https://cs.lf-discover.com/companies/?api_key="+e,t=_n(window.location.href,"_lf_discover_demo"),o=(""!==t&&(e=In(e,"demo",t)),i.get());""!==t?a(e,function(e){n(e)}):null==o?a(e,function(e){be(e),n(e)}):i.isExpired()?(i.clear(),a(e,function(e){be(e),n(e)})):i.isSoftExpired()?(n(o),a(e,function(e){be(e)})):n(o)}function Ce(e){return e.gtag||null}function _e(e){return e.google_tag_manager||{}}function d(e,n){return(n=e.GoogleAnalyticsObject||"ga")&&e[n]?e[n]:null}function Ee(e){return e._gat||null}function Se(e,n){for(var t=(e=Ee(e))?"function"!=typeof e._getTrackers?(console.info("* [leadfeeder] Legacy GoogleAnalyticsObject not found"),[]):e._getTrackers():[],o=0;o<t.length;o++)s(t[o]._getAccount(),n.trackingIds,!0)}function Oe(e,n){for(var t=(e=d(e))?"function"!=typeof e.getAll?(console.info("* [leadfeeder] GoogleAnalyticsObject not found"),[]):e.getAll():[],o=0;o<t.length;o++)s(t[o].get("clientId"),n.clientIds),s(t[o].get("trackingId"),n.trackingIds)}function s(e,n,t){void 0!==e&&-1===n.indexOf(e)&&(t&&"object"==typeof e&&"string"==typeof e.vtp_trackingId?n.push(e.vtp_trackingId):n.push(e))}function Ae(e){return/^G-[A-Z0-9]*/.test(e)}function Ne(){for(var e=0,n=[],t=(window.dataLayer||[]).filter(function(e){return"config"==e[0]}).map(function(e){return e[1]}),o=Object.keys(_e(window)).filter(Ae),e=0;e<t.length;e++)s(t[e],n);for(e=0;e<o.length;e++)s(o[e],n);return n}function De(){var e,n={clientIds:[],trackingIds:[],measurementIds:Ne()};return(null!==d(window)?Oe:Se)(window,n),n.clientIds.length||(e=function(){var e=T("_ga");if(e){e=e.split(".");if(!(e.length<2))return e[e.length-2]+"."+e[e.length-1]}}())&&n.clientIds.push(e),n}function w(){return"undefined"==typeof window?null:window.ldfdr}function u(){return"undefined"!=typeof window&&void 0!==window.ldfdr}function f(n){var e=On(P());return Sn(n)?e.map(function(e){return n(e)}):e}window.ldfdr.getTracker=function(e,n){return e=P()[e]||null,Sn(n)?n(e):e},window.ldfdr.getAll=f,window.ldfdr.track=function(n){f(function(e){e.track(n)})},window.ldfdr.identify=function(n){f(function(e){e.identify(n)})},window.ldfdr.pageview=function(n){f(function(e){e.pageview(n)})},window.ldfdr.acceptCookie=function(n){return f(function(e){return e.acceptCookie(n)}).some(function(e){return!0===e})},window.ldfdr.rejectCookie=function(n){return f(function(e){return e.rejectCookie(n)}).some(function(e){return!0===e})},window.ldfdr.setDebugSettings=function(e){Pe(G,JSON.stringify(e),36e5)};var Le,g="none",p="basic",m="all",xe=[g,p,m],Re="__lfaCmClientId",k="_lfa",h="LF1.1",y="_lfa_consent";function Me(){Ge(Fe()),Ge(k),je(k),Ge(y),je(y)}function je(e){if(T(e)){var n=window.ldfdr.cfg.cookieDomain;if(n)Ye(e,n);else for(var t=qe().reverse(),o=0;o<t.length;o++){if(Ye(e,n=t[o]),!T(e))return void console.log("* [leadfeeder][storage] Deleted cookie for domain",n);console.warn("* [leadfeeder][storage] Failed to delete cookie for domain",n)}}}function Pe(e,n,t){var o=window.ldfdr.cfg.cookieDomain||Le;if(o)I(e,n,t,"/",o);else for(var r=qe(),i=0;i<r.length;i++){if(I(e,n,t,"/",o=r[i]),Ue(o)&&T(e)===n)return console.log("* [leadfeeder][storage] Stored cookie for domain",o),void(Le=o);console.warn("* [leadfeeder][storage] Failed to store cookie for domain",o)}}function Ue(e){var n="_lfa_test_cookie_stored",t=(new Date).getTime().toString()+"-"+Math.random().toString(),t=(I(n,t,1e3,"/",e),T(n)===t);return Ye(n,e),t}function Je(e,n,t){Pe(e,n,t),C()&&(window.localStorage.setItem(e,n),(e=new Date).setTime(e.getTime()+t),window.localStorage.setItem(Fe(),e.toISOString()))}function Ge(e){C()&&window.localStorage.removeItem(e)}function Fe(){return k+"_expiry"}function ze(){return function(){var e=T(k);if(e){if(!R(e,h)){var n=function(e){var n;try{n=function(e){return e&&(e=function(n){try{return decodeURIComponent(window.atob(n).split("").map(function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)}).join(""))}catch(e){return console.warn("* [leadfeeder][utils] can't base64 decode: "+n),0}}(e))?JSON.parse(e):0}(e)}catch(e){return console.warn("* [leadfeeder][storage] Error while trying to read deprecated cookie",e),0}return n?(e=On(n)[0],console.log("* [leadfeeder][storage] Found old-style cookie (clientId per scriptId). Returning first clientId",e),e):0}(e);if(n)return n}return e}}()||function(){if(!C())return 0;var e=window.localStorage.getItem(k);if(null==e)return 0;var n=window.localStorage.getItem(Fe());null!=n&&(new Date).toISOString()>n&&(e=0);return e}()}function b(){var e=T(y);return(e=!e&&C()?window.localStorage.getItem(y):e)?"true"===e?m:-1==xe.indexOf(e)?(console.warn("* [tracking][cookie] invalid stored user consent",e),null):e:null}function T(e){e=new RegExp("(^|;)[ ]*"+e+"=([^;]*)").exec(document.cookie);return e?window.decodeURIComponent(e[2]):0}function Be(e,n){return e&&R(e,h)?console.log("* [leadfeeder][storage] client id updated, value %s",e):(e=Ve(Nn()),console.log("* [leadfeeder][storage] new client id saved, value %s",e)),Je(k,e,n),e}function We(e,n){return-1==xe.indexOf(e)?(console.warn("* [leadfeeder] invalid user consent level",e),b()):(Je(y,e,n),e)}function qe(e){var e=e||document.location.hostname,n=(e=0===e.indexOf("www.")?e.substring(4):e).split(".");if(4===n.length){e=n[n.length-1];if(parseInt(e,10)==e)return["none"]}for(var t=[],o=n.length-2;0<=o;o--)t.push(n.slice(o).join("."));return t.push("none"),t}function Ve(e){return h+"."+e+"."+(new Date).getTime()}function Ye(e,n){I(e,"",-3600,"/",n)}function I(e,n,t,o,r,i){var a;t&&(a=new Date).setTime(a.getTime()+t),document.cookie=e+"="+window.encodeURIComponent(n)+(t?";expires="+a.toGMTString():"")+";path="+(o||"/")+(r&&"none"!==r?";domain="+r:"")+(i?";secure":"")+";SameSite=Lax"}function Ke(){return Ue(null)}function C(){try{return window.localStorage}catch(e){console.warn("* [leadfeeder] local storage is disabled",e)}}var _,$e=1e3,Xe=/^0_([0-9a-f]+)-([0-9a-f]+)-([0-9]*)$/,E=null,S=[],O=null,He={success:!1},Ze=0;function A(){return w().getTracker(v)}function Qe(){var e=A(),n=e.foreignCookieSettings,t=[];if(n&&pn(e))for(var o=function(){for(var e=document.cookie.split(";"),n={},t=0;t<e.length;t++){var o=e[t].split("=");n[(o[0]+"").trim()]=unescape(o.slice(1).join("="))}return n}(),r=Object.keys(o),i=Object.keys(n),a=0;a<i.length;a++)for(var c=i[a],l=n[c],d=0;d<r.length;d++){var s=r[d];s.match(l)&&(s=o[s],t.push({type:c,value:s}))}return t}function en(){return ke()||ze()}function nn(e){if(null===E&&(E=b()),!tn(e)||!Ke())return!1;if(!N(e))return E!==g;switch(E){case m:case p:return!0;default:return!1}}function tn(e){return!0===e.lfaCookieEnabled}function N(e){return!0===e.consentManagementEnabled}function on(){return!0===A().useDualStackEndpoint}function rn(e,n){n=n||{};var t=De(),o=n.eventType||"tracking-event",r=A();return{gaTrackingIds:t.trackingIds,gaMeasurementIds:t.measurementIds,gaClientIds:t.clientIds,context:function(e,n){var t=e.referrer||document.referrer;"form-submit"===n&&(t="");return{library:{name:"lftracker",version:J},pageUrl:function(e){if(pn(A()))return e;return null===_n(e,"utm_term").match(Xe)?e:Cn(e,"utm_term")}(an(e)),pageTitle:e.pageTitle||document.title,referrer:t}}(n,o),event:o,clientEventId:Nn(),scriptId:v,cookiesEnabled:nn(r),consentLevel:E||g,anonymizeIp:false,lfClientId:e,foreignCookies:Qe(),properties:n.properties||{},autoTrackingEnabled:!1!==r.enableAutoTracking,autoTrackingMode:r.autoTrackingMode}}function an(e){return e.pageUrl||window.location.href}function cn(e,n,t){e=e+"?sid="+encodeURIComponent(n.scriptId),n=Ln(JSON.stringify(n)),e=navigator.sendBeacon(e,n);D(t,{success:e})}function ln(e,n,t){var e=e+"?sid="+encodeURIComponent(n.scriptId),n=Ln(JSON.stringify(n)),o=document.createElement("img");o.width=1,o.height=1,o.src=e+"&data="+n,o.onload=function(){D(t,{success:!0})},o.onerror=function(){D(t,{success:!1})}}function dn(){var e=null,n=A().trackingCookieDurationDays;return e=n?24*n*60*60*1e3:e}function sn(){var e;return nn(A())?Be(en(),dn()):(ze()&&setTimeout(un,1e3),e=N(A())&&E!==g?(window[Re]||(e=Ve(Nn())+".CM",window[Re]=e),window[Re]):h+"."+Nn()+".NC",console.log("* [leadfeeder][tracking] cookies disabled, new client id generated %s",e),e)}function un(){ze()&&(!function(){for(var e=0,n=w().getAll();e<n.length;e++)if(nn(n[e]))return;return 1}()?console.log("* [leadfeeder][tracking] cannot clear stored client id as other trackers have cookies enabled"):(console.log("* [leadfeeder][tracking] cleared LF cookies, e.g. user consent and client id"),Me()))}function fn(e){var n,t,o=A(),r=(void 0===o.gaInitRetries&&(o.gaInitRetries=0),1<=o.gaInitRetries);return n=window,null!==(t=d(n))&&"function"==typeof t&&"function"==typeof t.getAll||null!==(t=Ee(n))&&"object"==typeof t&&"function"==typeof t._getTrackers?e():r?(console.log("* [leadfeeder][tracking] failed to get GA object for tracking, continuing without it"),e()):(setTimeout(function(){return fn(e)},100*Math.pow(2,o.gaInitRetries)),void(o.gaInitRetries+=1))}function gn(n,t){!function(e){switch(e){case"form-submit":case"identify":return pn(A());default:return 1}}((n=n||{}).eventType)?S.push({args:n,doneCallback:t}):fn(function(){var e=rn(wn(),n);console.log("* [leadfeeder][tracking] event to track:",e),!0===A().useSendBeaconApi&&navigator&&navigator.sendBeacon?(cn("https://tr.lfeeder.com",e,t),on()&&cn("https://tr2.lfeeder.com",e)):(ln("https://tr.lfeeder.com",e,t),on()&&ln("https://tr2.lfeeder.com",e))})}function pn(e){return!(!nn(e)||N(e)&&E!==m)}function mn(e,n){var t,o=(e=e||{}).email;Mn(o)?(t=e.firstName,e=e.lastName,o={email:o},t&&"string"==typeof t&&(o.firstName=t),e&&"string"==typeof e&&(o.lastName=e),gn({eventType:"identify",properties:o},n)):console.warn("* [leadfeeder][tracking] Email is invalid in 'identify' payload")}function vn(e,n){var e=function(e){var n={eventType:"tracking-event"};(e=e||{}).pageUrl&&(n.pageUrl=e.pageUrl);e.pageTitle&&(n.pageTitle=e.pageTitle);e.referrer&&(n.referrer=e.referrer);return n}(e),t=an(e);(t=!En(t)&&R(t,"/")?window.location.protocol+"//"+window.location.host+t:t)===O&&Ze+$e>=(new Date).getTime()?(console.log("* [leadfeeder][tracking] duplicated pageview",t,O),D(n,He)):(O=t,Ze=(new Date).getTime(),He={success:!0},gn(e,function(e){D(n,He=e)}))}function D(e,n){Sn(e)?e(n):void 0!==e&&console.warn("* [leadfeeder][tracking] expected function argument",e)}function wn(){return e=sn,_=_||e();var e}function kn(e){var n=A();if(yn(n)){void 0===e&&(e=m),console.log("* [leadfeeder][tracking] cookie accepted",e);var t=n;switch(e){case m:return function(e){bn(m),e.track({eventType:"consent"});for(var n=0;n<S.length;n++){var t=S[n];gn(t.args,t.doneCallback)}return S=[],!0}(t);case p:return function(e){return bn(p),e.track({eventType:"consent"}),S=[],!0}(t);case g:console.warn("* [leadfeeder][tracking] 'none' consent level should be called via rejectCookie()")}console.warn("* [leadfeeder] invalid consent level",e)}return!1}function hn(){var e=A();return!!yn(e)&&(console.log("* [leadfeeder][tracking] cookie rejected"),_=void 0,O=E=null,He={success:!(S=[])},Ze=0,Me(),E=We(g,dn()),e.track({eventType:"consent"}),!0)}function yn(e){if(Ke()){var n;if(tn(n=e)&&N(n))return 1;console.log("* [leadfeeder][tracking] consent management not enabled for tracker:",e.id)}else console.log("* [leadfeeder][tracking] disabled cookies for browser",e.id)}function bn(e){var n=dn();_=E!==e&&b()!==e?(console.log("* [leadfeeder][tracking] save CM lf client and user consent"),xn(_,".NC")&&(console.log("* [leadfeeder][tracking] clear previous anonymous cookie"),_=void 0),E=We(e,n),Be(wn(),n)):(console.log("* [leadfeeder][tracking] cookies updated via another script or by another acceptCookie call"),E=b(),en())}function Tn(){for(var e,n=w().registerTracker(v,gn,mn,vn,wn,kn,hn),t=n,o=t.getPlugins(),r=0;r<o.length;r++){var i=o[r];i.initialized||i.init(),i.initialized=!0}return t.pluginsInitialized=!0,we(n),!0===N(n)&&null!==(E=b())&&We(E,dn()),t=n,(e=document.createEvent("Event")).tracker=t,e.initEvent("ldfdr.trackerReady",!0,!1),document.dispatchEvent(e),n}function In(e,n,t){t=t||"";var o=(e=String(e)).indexOf("#"),r=e.length,i=e.substr(0,o=-1===o?r:o),e=e.substr(o,r-o);return-1===i.indexOf("?")?i+="?":xn(i,"?")||(i+="&"),i+window.encodeURIComponent(n)+"="+window.encodeURIComponent(t)+e}function Cn(e,n){if(-1===(e=String(e)).indexOf("?"+n)&&-1===e.indexOf("&"+n))return e;var t=e.indexOf("?");if(-1===t)return e;var o=e.substr(t+1),e=e.substr(0,t);if(o){for(var t="",r=o.indexOf("#"),i=(-1!==r&&(t=o.substr(r+1),o=o.substr(0,r)),o.split("&")),a=i.length-1;0<=a;a--)i[a].split("=")[0]===n&&i.splice(a,1);r=i.join("&");r&&(e=e+"?"+r),t&&(e+="#"+t)}return e}function _n(n,e){e=new RegExp("[\\?&#]"+e+"=([^&#]*)").exec(n);if(!e)return"";n=e[1];try{return window.decodeURIComponent(n)}catch(e){return unescape(n)}}function En(e){return R(e,"//")||R(e,"http://")||R(e,"https://")}var L,x="/";function Sn(e){return"function"==typeof e}function On(e){if(Object.values)return Object.values(e);var n,t=[];for(n in e)"string"==typeof n&&e.propertyIsEnumerable(n)&&t.push(e[n]);return t}function An(e,n){for(var t=n.split(".");e&&t.length&&(e=e[t.shift()]););return e}function Nn(){return function(e){function n(e,n){return e<<n|e>>>32-n}function t(e){for(var n="",t=7;0<=t;t--)n+=(e>>>4*t&15).toString(16);return n}var o,r,i,a,c,l,d,s,u,f,g=[],p=1732584193,m=4023233417,v=2562383102,w=271733878,k=3285377520,h=[];for(e=function(e){return unescape(window.encodeURIComponent(e))}(e),f=e.length,r=0;r<f-3;r+=4)i=e.charCodeAt(r)<<24|e.charCodeAt(r+1)<<16|e.charCodeAt(r+2)<<8|e.charCodeAt(r+3),h.push(i);switch(3&f){case 0:r=2147483648;break;case 1:r=e.charCodeAt(f-1)<<24|8388608;break;case 2:r=e.charCodeAt(f-2)<<24|e.charCodeAt(f-1)<<16|32768;break;case 3:r=e.charCodeAt(f-3)<<24|e.charCodeAt(f-2)<<16|e.charCodeAt(f-1)<<8|128}h.push(r);for(;14!=(15&h.length);)h.push(0);for(h.push(f>>>29),h.push(f<<3&4294967295),o=0;o<h.length;o+=16){for(r=0;r<16;r++)g[r]=h[o+r];for(r=16;r<=79;r++)g[r]=n(g[r-3]^g[r-8]^g[r-14]^g[r-16],1);for(a=p,c=m,l=v,d=w,s=k,r=0;r<=19;r++)u=n(a,5)+(c&l|~c&d)+s+g[r]+1518500249&4294967295,s=d,d=l,l=n(c,30),c=a,a=u;for(r=20;r<=39;r++)u=n(a,5)+(c^l^d)+s+g[r]+1859775393&4294967295,s=d,d=l,l=n(c,30),c=a,a=u;for(r=40;r<=59;r++)u=n(a,5)+(c&l|c&d|l&d)+s+g[r]+2400959708&4294967295,s=d,d=l,l=n(c,30),c=a,a=u;for(r=60;r<=79;r++)u=n(a,5)+(c^l^d)+s+g[r]+3395469782&4294967295,s=d,d=l,l=n(c,30),c=a,a=u;p=p+a&4294967295,m=m+c&4294967295,v=v+l&4294967295,w=w+d&4294967295,k=k+s&4294967295}return(u=t(p)+t(m)+t(v)+t(w)+t(k)).toLowerCase()}(""+(new Date).getTime()+Math.random()).slice(0,16)}function Dn(e,n){n!=e.length&&e[n](function(){Dn(e,n+1)})}function Ln(e){return window.btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,function(e,n){return String.fromCharCode("0x"+n)}))}function R(e,n){return e?e.substring(0,n.length)===n:(console.warn("* [leadfeeder][utils] startsWith called with blank value"),!1)}function xn(e,n){return-1!==(e=String(e)).indexOf(n,e.length-n.length)}function Rn(t,o,r){function i(){s=!1===r.leading?0:(new Date).getTime(),a=null,d=t.apply(c,l),a||(c=l=null)}function e(){var e=(new Date).getTime(),n=(s||!1!==r.leading||(s=e),o-(e-s));return c=this,l=arguments,n<=0||o<n?(a&&(clearTimeout(a),a=null),s=e,d=t.apply(c,l),a||(c=l=null)):a||!1===r.trailing||(a=setTimeout(i,n)),d}var a,c,l,d,s=0;r=r||{};return e.cancel=function(){clearTimeout(a),s=0,a=c=l=null},e}function Mn(e){return"string"==typeof e&&e.match(/^[^@\s]+@([^@\s]+\.)+[^@\W]+$/)}function M(e,n){n=n?n++:1,window.MutationObserver?10<=n?console.log("* [leadfeeder][setup-mutation-observer] number of attempts to setup mutation observer exceeded"):document.body?new MutationObserver(Rn(e,100,{leading:!1})).observe(document.body,{childList:!0,subtree:!0}):(console.log("* [leadfeeder][setup-mutation-observer] unable to setup mutation observer, document.body is missing, retry with a delay,",n),setTimeout(M.bind(null,e,n),100)):console.log("* [leadfeeder][setup-mutation-observer] MutationObserver not available, skipping")}u()&&("about:srcdoc"===location.href&&console.warn("* [leadfeeder] Embedding Leadfeeder tracker inside an iframe is not supported."),"disabled"===(L=Tn()).autoTrackingMode||"on_script_load"===L.autoTrackingMode&&!1===L.enableAutoTracking||L.pageview({},function(){L.autoTrackingInitialized=!0}))}();