;(function() {
"use strict";

//

function _buildTracker(scriptId) {
  return {
    id: scriptId,
    plugins: {},
    getPlugins: function() {
      var pluginsList = [];
      for (var pluginName in this.plugins) {
        pluginsList.push(this.plugins[pluginName]);
      }
      return pluginsList;
    }
  };
}

function _getScriptRegistry(scriptId) {
  var registry = getRegistry();
  registry[scriptId] = registry[scriptId] || _buildTracker(scriptId);
  return registry[scriptId];
}

function registerTracker(scriptId, trackFn, identifyFn, pageviewFn, getClientIdFn, clearCachedCookiesFn) {
  var tracker = _getScriptRegistry(scriptId);

  tracker.track = trackFn;
  tracker.identify = identifyFn;
  tracker.pageview = pageviewFn;
  tracker.getClientId = getClientIdFn;
  tracker.clearCachedCookies = clearCachedCookiesFn;

  return tracker;
}

function setTrackerOption(scriptId, option, value, override) {
  _getScriptRegistry(scriptId)[option] =
    typeof(override) !== "undefined" ? override : value;
}

function _getScriptPluginRegistry(scriptId, pluginName) {
  var scriptRegistry = _getScriptRegistry(scriptId);
  scriptRegistry.plugins[pluginName] = scriptRegistry.plugins[pluginName] || {};
  return scriptRegistry.plugins[pluginName];
}

function registerPlugin(scriptId, name, initFn) {
  var scriptRegistry = _getScriptRegistry(scriptId);
  var plugin = _getScriptPluginRegistry(scriptId, name);
  plugin.init = initFn;

  // IF general plugin initalization has been ran,
  // we need to initialize our new plugin
  if (scriptRegistry.pluginsInitialized) {
    plugin.init();
  }
}

function registerPluginConfig(scriptId, name, config, override) {
  _getScriptPluginRegistry(scriptId, name).config =
    typeof(override) !== "undefined" ? override : config;
}

function acceptCookie() {
  return acceptTrackingCookie();
}

function getRegistry() {
  var global = getGlobal();
  global.r = global.r || {};
  return global.r;
}

if (globalIsReady()) {
  window.ldfdr.registerTracker = registerTracker;
  window.ldfdr.setTrackerOption = setTrackerOption;
  window.ldfdr.registerPlugin = registerPlugin;
  window.ldfdr.registerPluginConfig = registerPluginConfig;
  window.ldfdr.acceptCookie = acceptCookie;
}


function initPlugins(tracker) {
  var plugins = tracker.getPlugins();

  for (var i = 0; i < plugins.length; i++) {
    var plugin = plugins[i];
    if (!plugin.initialized) {
      plugin.init();
    }
    plugin.initialized = true;
  }

  tracker.pluginsInitialized = true;
}


var lfScriptId = "bElvO73ekrVaZMqj";
var libraryVersion = "2.28.1";
var lfOverrideSettingsCookieName = "_lfa_debug_settings";

var ALLOWED_COMMANDS = [
  "cookieDomain",
  "enableAutoTracking",
  "trackingCookieDurationDays"
];

// Initializes dynamic tracker settings (by reading and parsing commands from
// the queue).
//
// Some script-specific behavior can be overridden by setting special
// configuration options. These settings are applied before scripts are loaded
// and allow hooks into tracker lifecycle.
// One good example would be disabling automatically sending the tracking event
// on the page load, something quite well suited for the SPAs.
//
// The settings are supposed to be used with the tracking script loading code
// and look like this:
// window.ldfdr('<command>', '<setting>', '<value>')
//
// For the moment, we support only the 'cfg' command and these settings:
// - `cookieDomain` [String] - if defined the Leadfeeder cookie will be stored
//   under the specified domain.
// - `enableAutoTracking` [Boolean] - if set to `false` the script won't track
//   any events and the tracking cookie/local storage entries will be dropped.
// - `trackingCookieDurationDays` [Number] - if defined the number of days until
//   the Leadfeeder cookie expires in case Leadfeeder cookie is enabled.
//
// Here's how the whole loading scripts looks like, with enableAutoTracking
// settings turned off:
//
// <script>
//   (function(ss){
//     window.ldfdr=function(){(ldfdr._q=ldfdr._q||[]).push([].slice.call(arguments).concat(ss));};
//
//     window.ldfdr('cfg', 'enableAutoTracking', false);
//
//     (function(d, s){
//       fs = d.getElementsByTagName(s)[0];
//       function ce(src){
//         var cs = d.createElement(s);
//         cs.src = src;
//         setTimeout(function(){fs.parentNode.insertBefore(cs,fs)}, 1);
//       }
//       ce('https://sc.lfeeder.com/lftracker_v1_'+ss+'.js');
//     })(document, 'script');
//   })('9k315xMGrN3dlB0m');
// </script>
function initCommands(ldfdr, lfScriptId) {
  ldfdr._q = ldfdr._q || [];
  for (var command = 0; command < ldfdr._q.length; command++) {
    var options = ldfdr._q[command];
    // Options array contains a command and a number of command-related options.
    // 'cfg' command will contain setting's name, value and script id i.e.
    // ['cfg', 'enableAutoTracking', false, '9k315xMGrN3dlB0m']
    switch (options[0]) {
    case 'cfg':
      if (options.length != 4) {
        console.warn("* [leadfeeder] invalid 'cfg' command", options) /* RemoveLogging:skip */;
        break;
      }

      var setting = options[1];
      if (ALLOWED_COMMANDS.indexOf(setting) == -1) {
        console.warn("* [leadfeeder] unsupported 'cfg' command", options) /* RemoveLogging:skip */;
        break;
      }

      // apply only if command's script matches the current script id
      if (options[3] === lfScriptId) {
        ldfdr.setTrackerOption(lfScriptId, setting, options[2]);
      }
      break;
    }
  }
}

// Initializes static tracker settings.
//
// Various tracker settings are defined in the database by the liidio app.
// Special placeholders starting and ending with ### are used to inject these
// settings with the db values. These injections are performed whenever a
// setting is being changed inside the web app and result in re-generating
// tracking scripts with a specific script id. These injections are being
// performed even on minimized scripts.
function initTrackerOptions(ldfdr, lfScriptId, libraryVersion, overrideSettings) {
  // Using !0 and !1 instead of true and false in order to have consistent behavior
  // in test-bench when building testing scripts. Note that there is no space between
  // elements to replace as that is the behavior of JS uglify.

  ldfdr.setTrackerOption(lfScriptId, "lfaCookieEnabled",true, overrideSettings.enableCookie);

  ldfdr.setTrackerOption(lfScriptId, "consentManagementEnabled",false, overrideSettings.enableCm);

  ldfdr.setTrackerOption(lfScriptId, "useSendBeaconApi",false, overrideSettings.useBeacon);

  ldfdr.setTrackerOption(
    lfScriptId,
    "foreignCookieSettings",
    { "hubspot":"hubspotutk","intercom":"intercom-id-.*" }
  );

  ldfdr.setTrackerOption(
    lfScriptId,
    "crossDomainLinking",
    { "enabled":false }
  );

  ldfdr.setTrackerOption(lfScriptId, "useDualStackEndpoint",false, overrideSettings.useDs);

  ldfdr.setTrackerOption(lfScriptId, "trackingCookieDurationDays",
    730);

  // burn-in script version as well
  ldfdr.setTrackerOption(lfScriptId, "version", libraryVersion);

  ldfdr.registerPluginConfig(lfScriptId, "file-downloads", {
    filesEnabled: true,
    filesToMatch: /(.pdf|(.docx))$/ });

  ldfdr.registerPluginConfig(
    lfScriptId,
    "form-tracking",
    { formTrackingEnabled: true },
    overrideSettings.trackForms
  );

  ldfdr.registerPluginConfig(
    lfScriptId,
    "yt-playback",
    { ytPlaybackTrackingEnabled: true },
    overrideSettings.trackYt
  );

  ldfdr.registerPluginConfig(
    lfScriptId,
    "intercom-tracking",
    { intercomTrackingEnabled: true },
    overrideSettings.trackIntercom
  );

  ldfdr.registerPluginConfig(lfScriptId, "discover", {
    discoverEnabled: false,
    discoverApiKey: "afafafaf"
  });
}

function getOverrideSettings() {
  var overrideSettings = getCookie(lfOverrideSettingsCookieName) || "{}";
  try {
    console.log("Found override settings", overrideSettings);
    return JSON.parse(overrideSettings);
  } catch (e) {
    console.warn("Could not parse stored override settings", overrideSettings);
    return {};
  }
}

/**
 * Overrides settings in order to debug client websites.
 *
 * Used via the SDK internal API.
 **/
function setOverrideSettings(settings) {
  setCookieInAvailableDomain(
    lfOverrideSettingsCookieName,
    JSON.stringify(settings),
    60 * 60 * 1000 // 1 hour
  );
}

if (typeof(window) !== "undefined" && typeof(window["ldfdr"]) !== "undefined") {
  window.ldfdr = window.ldfdr || {};
  window.ldfdr.cfg = window.ldfdr.cfg || {};

  var overrideSettings = getOverrideSettings();

  // User defined commands have priority over liidio DB options,
  // so execute the user commands at the end.
  initTrackerOptions(window.ldfdr, lfScriptId, libraryVersion, overrideSettings);
  initCommands(window.ldfdr, lfScriptId);
}


/* helper for localStorage cache */
var cache = {
  key: "__lf_discover",
  softRefresh: 30 * 60 * 1000,   // 30 minutes
  ttl: 10 * 24 * 60 * 60 * 1000, // 10 days
  storedAt: null,

  get: function() {
    if (!window.localStorage) { return; }

    var json = window.localStorage.getItem(this.key);

    if (json === null) { return; }

    var value = null;

    try {
      value = JSON.parse(json);
      this.storedAt = value.storedAt;
      delete(value.storedAt);
    } catch (e) {
      if (e instanceof SyntaxError) { return; }

      throw e;
    }

    return value;
  },

  set: function(value) {
    if (!window.localStorage) { return; }

    value.storedAt = Date.now();

    window.localStorage.setItem(this.key, JSON.stringify(value));

    delete(value.storedAt);
  },

  clear: function() {
    if (!window.localStorage) { return; }

    this.storedAt = null;

    window.localStorage.removeItem(this.key);
  },

  /* The caller should discard the value and reload the data */
  isExpired: function() {
    if (this.storedAt === null || this.storedAt === undefined) { return true; }

    var now = Date.now();

    return now >= this.storedAt + this.ttl;
  },

  /* The caller can use the value, but should reload the data to refresh it */
  isSoftExpired: function() {
    if (this.storedAt === null || this.storedAt === undefined) { return true; }

    var now = Date.now();

    return now >= this.storedAt + this.softRefresh;
  }
};

/* helper for global variable */
var discoverGlobal = {
  key: "discover",
  get: function() {
    return window[this.key];
  },
  set: function(data) {
    window[this.key] = data;
  },
  clear: function() {
    this.set(null);
  }
};

function fetchDiscoverData(url, callback) {
  var r = new XMLHttpRequest();
  r.open("GET", url, true);
  r.onload = function() {
    if (this.status !== 200) { return; }

    var data = JSON.parse(this.response);

    callback(data);
  };
  r.send();
}

function pushDataLayerEvent() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "event": "discover.loaded" });
}

function storeDiscoverData(data) {
  /* Ignore errors, but store not found */
  if (data.meta.status !== 200 && data.meta.status !== 404) {
    return;
  }

  discoverGlobal.set(data);
}

function cacheDiscoverData(data) {
  /* Ignore errors, but store not found */
  if (data.meta.status !== 200 && data.meta.status !== 404) {
    return;
  }

  cache.set(data);
}

function loadDiscover(config) {
  if (!config.discoverEnabled || !config.discoverApiKey) {
    return;
  }

  var url = "https://cs.lf-discover.com/companies/?api_key=" + config.discoverApiKey;

  // getUrlParameter returns "" for a missing param
  var demoName = getUrlParameter(window.location.href, "_lf_discover_demo");

  if (demoName !== "") { url = addUrlParameter(url, "demo", demoName); }

  var cachedData = cache.get();

  /*
   * Demo mode is special, it never caches in localStorage, so that different
   * responses can be tested.
   */
  if (demoName !== "") {
    fetchDiscoverData(url, function(data) {
      storeDiscoverData(data);
      pushDataLayerEvent();
    });
  } else if (cachedData === null || cachedData === undefined) {
    /* No data read/stored. Fetch it, cache it, then ping GTM. */
    fetchDiscoverData(url, function(data) {
      storeDiscoverData(data);
      cacheDiscoverData(data);
      pushDataLayerEvent();
    });
  } else if (cache.isExpired()) {
    /* Cache expired, nuke it and refresh. */
    cache.clear();

    fetchDiscoverData(url, function(data) {
      storeDiscoverData(data);
      cacheDiscoverData(data);
      pushDataLayerEvent();
    });
  } else if (cache.isSoftExpired()) {
    /*
     * Data is semi-stale. We can still use it, so notify dataLayer/GTM first,
     * but do a refresh anyway.
     * */
    storeDiscoverData(cachedData);
    pushDataLayerEvent();
    fetchDiscoverData(url, function(data) {
      cacheDiscoverData(data);
    });
  } else {
    /* Data is fresh, fire GTM immediately. */
    storeDiscoverData(cachedData);
    pushDataLayerEvent();
  }
}

if (globalIsReady()) {
  getGlobal().registerPlugin(lfScriptId, 'discover', function() {
    var tracker = getGlobal().getTracker(lfScriptId);
    var config = tracker.plugins["discover"].config;

    var initFlag = "__discoverInitialized";
    var pluginInitialized = window[initFlag];

    /* Prevent the plugin from running multiple times */
    if (pluginInitialized) { return; }

    window[initFlag] = true;

    loadDiscover(config);
  });
}


if (globalIsReady()) {
  getGlobal().registerPlugin(lfScriptId, 'file-downloads', function() {
    var tracker = getGlobal().getTracker(lfScriptId);
    var config = tracker.plugins['file-downloads'].config;

    if (!config.filesEnabled) {
      return;
    }

    function trackLink(link) {
      function addHandler() {
        link.addEventListener('click', clickHandler);
      }
      function removeHandler() {
        link.removeEventListener('click', clickHandler);
      }

      function clickHandler() {
        removeHandler();

        // This'll give the browser some additional time to send the request in case
        // when clicking a file link causes a transition between pages.
        suppresUnload();

        tracker.track(
          getLinkTrackPayload(link)
        );
      }

      addHandler();
    }

    var links = document.getElementsByTagName('a');

    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var href = link.getAttribute('href') + '';
      if(href.match(config.filesToMatch)) {
        trackLink(link);
      }
    }
  });
}

function getLinkTrackPayload(link) {
  var title = extractFilenameFromUrl(link.href);

  return {
    eventName: 'file-download',
    properties: {url: link.href, filename: title},
    pageUrl: link.href,
    pageTitle: title
  };
}

function extractFilenameFromUrl(url) {
  var chunks = url.
    replace(/https?\:\/\//, ''). //Strip protocol
      split('/');

  var lastChunk = chunks[chunks.length - 1].
    replace(/[\?&].*/, ''); //Strip query params

  if(chunks.length == 1 || !lastChunk) {
    return null;
  }
  return lastChunk;
}


if (globalIsReady()) {
  getGlobal().registerPlugin(lfScriptId, 'form-tracking', function() {
    var DUPLICATE_TIMEOUT = 500;//ms
    var ALLOWED_INPUT_TYPES = ["email", "text"];
    var lastSubmitAt = 0;

    var tracker = getGlobal().getTracker(lfScriptId);
    var config = tracker.plugins['form-tracking'].config;

    if (!config.formTrackingEnabled) {
      return;
    }

    function onFormSubmit(event) {
      var form = event.target;

      console.log('* [leadfeeder][form-tracking] Form\'s submit handler called ',
                  lfScriptId, form, event);

      trackFormSubmission(form);
    }

    // Some companies use non-standard forms e.g. when sending form data via AJAX.
    // Usually in such cases the default behavior is prevented, so 'submit'
    // event is not emitted.
    // Most of the forms however have some kind of submit button, so we can still
    // track submission of such non-standard forms.
    //
    // Let's listen to clicks and assume that if a button within a form got clicked
    // then it's a submit button.
    //
    // In rare cases it may happen that the button isn't really the submit button.
    // Let's still track the parent form if the form data got filled. Some info
    // is better than no info...
    //
    // NOTE: 'click' event is also emitted when user submits a form by pressing
    // ENTER when any of form's inputs is focused.
    function onClick(event) {
      var clickedElement = event.target;
      var clickedTag = clickedElement.tagName.toLowerCase();

      var isButton = clickedElement.type === 'submit' ||
                       clickedElement.type === 'button' ||
                       clickedTag === 'button';

      if (!isButton) { return; }

      var form = clickedElement.form || clickedElement.closest('form');

      if (!form) { return; }

      console.log('* [leadfeeder][form-tracking] Submit button clicked',
                  lfScriptId, form, clickedElement);

      trackFormSubmission(form);
    }

    function trackFormSubmission(form) {
      // It may happen that this method is called a few times one after another
      // because e.g. form's 'submit' event followed submit buttons 'click' event
      // or user double-clicked the submit button.
      // Let's skip tracking in such case to prevent duplicate events.
      if (lastSubmitAt + DUPLICATE_TIMEOUT >= new Date().getTime()) {
        console.log('* [leadfeeder][form-tracking] Skipping duplicate event');
        return;
      }

      var email = extractEmail(form);

      lastSubmitAt = new Date().getTime();

      console.log('* [leadfeeder][form-tracking] submitting event', lfScriptId);

      // This'll give the browser some additional time to send the request in case
      // when e.g. event is sent when transitioning between pages
      // (e.g. when sending a form to another page).
      suppresUnload();

      try {
        tracker.track(buildEventPayload(form, email), function() {
          console.log('* [leadfeeder][form-tracking] track callback called', lfScriptId);
        });
      } catch (e) {
        console.log('* [leadfeeder][form-tracking] error happened when tracking', e);
      }
    }

    function buildEventPayload(form, email) {
      var properties = {};
      var formId = form.getAttribute("id");
      var formClass = form.getAttribute("class");
      var formAction = form.getAttribute("action");
      var inputValues = getInputValues(form);

      if (email) { properties.email = email; }
      if (formId) { properties.formId = formId; }
      if (formClass) { properties.formClass = formClass; }
      if (formAction) { properties.formAction = formAction; }
      if (inputValues) { properties.inputValues = inputValues; }

      return {
        eventName: 'form-submit',
        properties: properties
      };
    }

    /**
     * @argument {HTMLFormElement} form
     * @returns {Array.<Map>} List of input values.
     **/
    function getInputValues(form) {
      // Use a map to prevent duplicates
      var inputValues = {};
      var inputs = form.elements;

      for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        var name = input.name;
        if (!name || ALLOWED_INPUT_TYPES.indexOf(input.type) == -1) {
          continue;
        }

        inputValues[name] = {
          name: name,
          type: input.type,
          value: input.value
        };
      }

      return objectValues(inputValues);
    }

    function addIframeSubmitHandler(iframe) {
      // Do not add handlers for cross-domain iframes.
      // In most browsers `iframe.contentDocument` should return `null` if the iframe
      // is a cross-domain iframe. On IE it throws an error. Let's catch the
      // error not to pollute the console.
      try {
        if (!iframe.contentDocument) {
          return;
        }

        iframe.contentDocument.addEventListener('submit', onFormSubmit);
        iframe.contentDocument.addEventListener('click', onClick);
      } catch (e) {
        console.log("* [leadfeeder][form-tracking] error accessing iframe.contentDocument", e, iframe);
      }
    }

    function setupIframes() {
      console.log('* [leadfeeder][form-tracking] Setting up iframes for form tracking', lfScriptId);

      var iframes = document.getElementsByTagName('iframe');
      for (var i = 0; i < iframes.length; i++) {
        setupIframe(iframes[i]);
      }
    }

    function setupIframe(iframe) {
      var attrName = "data-lf-form-tracking-inspected-" + lfScriptId;
      if (iframe.getAttribute(attrName)) { return; }

      iframe.setAttribute(attrName, "true");

      console.log('* [leadfeeder][form-tracking] iframe initialized', iframe, lfScriptId);

      // Add the handler in case when the iframe was already loaded
      addIframeSubmitHandler(iframe);

      // Listen to `load` event and add the handler.
      // addEventListener guarantees that if the handler was already added
      // then it won't be added again.
      iframe.addEventListener("load", function() {
        addIframeSubmitHandler(iframe);
      });
    }

    function setupSubmitEventListeners() {
      document.addEventListener('submit', onFormSubmit);
      document.addEventListener('click', onClick);

      setupIframes();

      if (!window.MutationObserver) { return; }

      // Some form iframes can be lazily added to the DOM. This happens e.g.
      // when using Hubspot forms. Let's observe DOM changes and attach 'submit'
      // handlers to lazily loaded forms.
      //
      // Notice a few optimizations here (mostly suggested in https://stackoverflow.com/a/39332340/3578099):
      // 1. Instead of iterating over `mutation.addedNodes` (there can be lots of them depending on the website)
      //    we're simply searching the DOM for all iframes.
      //    `getElementsByTagName` is a fast operation, so it shouldn't rendering lags.
      // 2. If the number of mutations on a page is huge the callback might be
      //    called a lot of times causing rendering lags. Let's ignore all consequent
      //    calls for 100ms and run the callback then.
      new MutationObserver(
        throttle(setupIframes, 100, { leading: false })
      ).observe(document.body, { childList: true, subtree: true });
    }

    setupSubmitEventListeners();

    console.log('* [leadfeeder][form-tracking] initialized', lfScriptId);
  });
}

function isTextInput(input) {
  var type = input.type;
  return type === "text" || type === "email" || !type;
}

function extractEmail(form) {
  var inputs = form.querySelectorAll("input");

  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    var value = input.value;

    if (isTextInput(input) && isEmail(value)) {
      return value;
    }
  }

  return null;
}


if (globalIsReady()) {
  getGlobal().registerPlugin(lfScriptId, "intercom-tracking", function() {
    var tracker = getGlobal().getTracker(lfScriptId);
    var config = tracker.plugins["intercom-tracking"].config;

    if (!config.intercomTrackingEnabled) {
      return;
    }

    periodicallyRetry(function() {
      if (window.Intercom !== undefined && window.Intercom.booted) {
        console.log("* [leadfeeder][intercom-tracking] Updating intercom for tracking", lfScriptId);
        window.Intercom("update", { "lfClientId": tracker.getClientId() });
        return true;
      }
      return false;
    });
  });
}

//endRemoveIf(noExport)

if (globalIsReady()) {
  getGlobal().registerPlugin(lfScriptId, 'yt-playback', function() {
    var tracker = getGlobal().getTracker(lfScriptId);
    var config = tracker.plugins['yt-playback'].config;

    if (!config.ytPlaybackTrackingEnabled || !window.postMessage) {
      return;
    }

    var registeredIframes = {};
    var registeredIframesById = {};
    var trackedVideos = {};
    var mainHandlerInitialized = false;
    var initializedFrames = 0;

    // In case when the website has both LF tracker AND YouTube Iframe API
    // then iframe API generates its own `widgetid`s that start from `1`.
    // If we detect any widgetid's, then assign IDs from 1001 by assuming
    // that a website doesn't have more than 1000 videos. But if there isn't
    // any widgetid in any iframe URL, then start from 1. This is required
    // to avoid YT iframe API collisions.
    //
    // Note: iframeIdOffset is calculated only once, no matter if some YT videos
    // are loaded at a later time. If this proves to be a problem then we should
    // recalculate it.
    var iframeIdOffset = null;

    function calcIframeIdOffset(iframes) {
      if (iframeIdOffset !== null || !iframes.length) {
        return;
      }

      var numIframesWithWidgetId = 0;
      for (var i = 0; i < iframes.length; i++) {
        var widgetId = extractWidgetIdFromIframeUrl(iframes[i]);
        if (widgetId) {
          numIframesWithWidgetId++;
        }
      }

      if (numIframesWithWidgetId > 0 && numIframesWithWidgetId < iframes.length) {
        console.warn("There are iframes with and without widget id in the same page");
      }

      iframeIdOffset = numIframesWithWidgetId > 0 ? 1000 : 0;
    }

    function setupIframes() {
      var iframes = document.getElementsByTagName('iframe');

      if (!iframes.length) {
        return;
      }

      setupMainMessageHandler();
      calcIframeIdOffset(iframes);

      for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes[i];

        // Add an attribute to the iframe to prevent double initialization
        var attrName = "data-lf-yt-playback-inspected-" + lfScriptId;
        if (iframe.getAttribute(attrName)) { continue; }
        iframe.setAttribute(attrName, "true");

        var iframeId = ++initializedFrames + iframeIdOffset;

        // iframe's "load" event might already have been emitted.
        // Let's call `setupIframe` here just in case. Even if it gets executed
        // again in "load" handler nothing bad will happen.
        setupIframe(iframe, iframeId);
        iframe.addEventListener("load", iframeLoadHandler(iframe, iframeId));
      }
    }

    function iframeLoadHandler(iframe, iframeId) {
      return function() {
        console.log('* [leadfeeder][yt-playback] initial load handler.',
                    iframeId, iframe.src, iframe.id);
        setupIframe(iframe, iframeId);
      };
    }

    function setupIframe(iframe, iframeId) {
      console.log('* [leadfeeder][yt-playback] setupIframe', iframeId, iframe.src, iframe.id);

      if (!isEligibleYouTubeIframe(iframe)) {
        console.log('* [leadfeeder][yt-playback] Not eligible youtube iframe. Skipping.',
                    iframeId, iframe.src, iframe.id);
        return;
      }

      // If API param isn't present add it in order to allow receiving playback events.
      // Adding the param will retrigger "load" event so let's return here.
      if (isJsApiParamMissing(iframe)) {
        console.log('* [leadfeeder][yt-playback] Enabling JS API and skipping',
                    iframeId, iframe.src, iframe.id);
        return enableJsApi(iframe);
      }

      // Sometimes iframe's `load` handler gets called after we had received `videoData`.
      // This can cause `videoData` to be reset back to `null`.
      // Let's prevent that by checking if an entry for `iframeId` already exists.
      if (!registeredIframesById[iframeId]) {
        registeredIframesById[iframeId] = { iframe: iframe, videoData: null };
      }
      if (!registeredIframes[iframe.src]) {
        registeredIframes[iframe.src] = { iframe: iframe, videoData: null };
      }

      // In case when the website has both LF tracker AND YouTube Iframe API
      // then iframe API generates its own `widgetid`s that take precedence
      // over the ones generated by the Leadfeeder tracker.
      // In order to be able to later identify the iframe by `widgetid` let's add
      // a reference to the iframe registered using the LF id.
      var widgetId = extractWidgetIdFromIframeUrl(iframe);
      if (widgetId) {
        console.log('* [leadfeeder][yt-playback] widgetid param found in src:', widgetId, ' Registering an alias', iframeId, iframe.src);
        registeredIframesById[widgetId] = registeredIframesById[iframeId];

        // This shouldn't ever happen, but if it does it can cause some headache.
        // Let's log it just in case...
        if (widgetId > iframeIdOffset) {
          console.warn('* [leadfeeder][yt-playback] widgetid is > 1000.', widgetId, iframeId, iframe.src);
        }
      }

      addYoutubeEventListener(iframe, iframeId);
    }

    function extractWidgetIdFromIframeUrl(iframe) {
      var widgetId = getUrlParameter(iframe.src, 'widgetid');

      return parseInt(widgetId);
    }

    function setupMainMessageHandler() {
      if (mainHandlerInitialized) {
        return;
      }

      console.log('* [leadfeeder][yt-playback] Initializing main message handler');

      window.addEventListener("message", function (e) {
        if (["https://www.youtube.com", "https://www.youtube-nocookie.com"].indexOf(e.origin) === -1 || e.data === undefined) { return; }

        try {
          var data = JSON.parse(e.data);

          var targetIframeData = null;
          // Based on https://stackoverflow.com/questions/19134311/detect-which-iframe-sent-post-message
          var values = Object.values(registeredIframes); // TODO: does not work in IE
          for (var i = 0; i < values.length; i++) {
            var iframeData = values[i];
            var iframe = iframeData.iframe;
            if (iframe.contentWindow === event.source || iframe.contentDocument.defaultView === event.source) {
              targetIframeData = iframeData;
              break;
            }
          }

          if (targetIframeData === null) {
            console.warn("Could not find a registered iframe", data)
            return;
          }

          switch (data.event) {
          case 'initialDelivery':
            handleInitialDeliveryEvent(data, targetIframeData);
            break;
          case 'onStateChange':
            handleOnStateChangeEvent(data, targetIframeData);
            break;
          }
        }
        catch (e) { /* [yt-playback] noop */ }
      });

      mainHandlerInitialized = true;
    }

    function handleOnStateChangeEvent(eventData, iframeData) {
      var iframe = iframeData.iframe;
      console.log('* [leadfeeder][yt-playback] Received onStateChange event', eventData, iframe.src);

      // `-1` is a code for the start of playback. Check out:
      // https://developers.google.com/youtube/iframe_api_reference
      if (eventData.info !== -1) {
        return;
      }

      // Sometimes the iframe fires playback started event twice:
      // https://github.com/videojs/videojs-youtube/issues/437
      // Let's block multiple tracking of the same video. Anyways, it should be
      // enough to track playback once per pageview.
      if (!!trackedVideos[iframe.src]) {
        return console.log('* [leadfeeder][yt-playback] Event already tracked', iframe.src);
      }

      trackedVideos[iframe.src] = true;

      console.log('* [leadfeeder][yt-playback] Sending video-start event', iframe.src);

      tracker.track({
        eventName: 'video-start',
        properties: {
          videoUrl: getYtVideoUrl(iframe),
          videoTitle: getYtVideoTitle(iframeData),
        }
      });
    }

    function handleInitialDeliveryEvent(eventData, iframeData) {
      console.log('* [leadfeeder][yt-playback] iframe communication initialized', eventData, iframeData.iframe.src);

      if (!eventData.info || !eventData.info.videoData || iframeData.videoData) {
        return;
      }

      iframeData.videoData = videoData;
    }

    function addYoutubeEventListener(iframe, iframeId) {
      /*
      // sendMessage to frame to start receiving messages
      sendMessageToIframe(iframe, {
        event: "listening",
        id: iframeId,
        channel: "widget"
      });

      sendMessageToIframe(iframe, {
        event: "command",
        func: "addEventListener",
        args: ["onStateChange"],
        id: iframeId,
        channel: "widget"
      });*/
    }

    function isEligibleYouTubeIframe(iframe) {
      return isYouTubeIframe(iframe) && hasYtVideoId(iframe) &&
        !isJsApiDisabled(iframe) && !hasAutoplay(iframe);
    }

    function isYouTubeIframe(iframe) {
      return startsWith(iframe.src, 'https://www.youtube.com/embed/') ||
             startsWith(iframe.src, 'https://www.youtube-nocookie.com/embed/');
    }

    function isJsApiDisabled(iframe) {
      return iframe.src.indexOf('enablejsapi=0') !== -1;
    }

    function hasAutoplay(iframe) {
      return iframe.src.indexOf('autoplay=1') !== -1;
    }

    function isJsApiParamMissing(iframe) {
      return iframe.src.indexOf('enablejsapi') === -1;
    }

    function enableJsApi(iframe) {
      var stringToAdd = iframe.src.indexOf('?') === -1 ? '?' : '&';
      stringToAdd += 'enablejsapi=1';

      // We need to also add the origin:
      // https://developers.google.com/youtube/player_parameters#origin
      stringToAdd += '&origin=' + window.location.origin;

      iframe.src = iframe.src + stringToAdd;
    }

    function getYtVideoUrl(iframe) {
      var id = extractYtVideoId(iframe);
      return 'https://www.youtube.com/watch?v=' + id;
    }

    function getYtVideoTitle(iframeData) {
      if (!iframeData.videoData) { return; }

      return iframeData.videoData.title;
    }

    function hasYtVideoId(iframe) {
      return !!extractYtVideoId(iframe);
    }

    // Extracts YT video id from an iframe src:
    // e.g. "https://www.youtube.com/embed/hPzUSL8JC_0?enablejsapi=1&rel=0&showinfo=0&origin=http://localhost:4567"
    // gets converted to "hPzUSL8JC_0"
    function extractYtVideoId(iframe) {
      return iframe.src.split("/")[4].split("?")[0];
    }

    function sendMessageToIframe(iframe, payload) {
      var message = JSON.stringify(payload);
      console.log("* [leadfeeder][yt-playback] sending message", iframe.src, iframe.id, message);
      // Send to '*', because sending to www.youtube.com may end up in an uncatchable
      // error in case when the iframe has not yet finished initializing.
      // https://html.spec.whatwg.org/multipage/web-messaging.html#posting-messages
      iframe.contentWindow.postMessage(message, '*');
    }

    setupIframes();

    if (!window.MutationObserver) { return; }

    // Some iframes can be lazily added to the DOM. This happens e.g. when using
    // elementor. Let's observe DOM changes and if a change happens initialize
    // the newly appeared iframes.
    //
    // Notice a few optimizations here (mostly suggested in https://stackoverflow.com/a/39332340/3578099):
    // 1. Instead of iterating over `mutation.addedNodes` (there can be lots of them depending on the website)
    //    we're simply searching the DOM for all iframes.
    //    `getElementsByTagName` is a fast operation, so it shouldn't rendering lags.
    // 2. If the number of mutations on a page is huge the callback might be
    //    called a lot of times and causing rendering lags.
    //    Let's ignore all consequent calls for 100ms and run the callback then.
    new MutationObserver(
      throttle(setupIframes, 100, { leading: false })
    ).observe(document.body, { childList: true, subtree: true });
  });
}

var UNLOAD_TIMEOUT = 250;//ms

function getSuppressUnloadUntil() {
  return getGlobal().suppressUnloadUntil;
}

function setSuppressUnloadUntil(value) {
  return getGlobal().suppressUnloadUntil = value;
}

function suppresUnload() {
  setSuppressUnloadUntil(new Date().getTime() + UNLOAD_TIMEOUT);
}

function waitForPendingRequests() {
  var now = new Date();
  var suppressUnloadUntil = getSuppressUnloadUntil();

  if (suppressUnloadUntil < now.getTime()) {
    console.log('* [leadfeeder][before-unload] no pending requests');
    return;
  }

  console.log('* [leadfeeder][before-unload] waiting for pending requests',
              suppressUnloadUntil - now.getTime());

  /*
   * Subject to Safari's "Runaway JavaScript Timer" and
   * Chrome V8 extension that terminates JS that exhibits
   * "slow unload", i.e., calling getTime() > 1000 times
   *
   * https://what.thedailywtf.com/topic/7913/i-hate-chrome?_=1607434025983
   */
  for (var i = 0; suppressUnloadUntil >= now.getTime(); i++) {
    now = new Date();
  }
}

// Prevent setting this up multiple times if there are more trackers on the page
if (globalIsReady() && !('suppressUnloadUntil' in getGlobal())) {
  getGlobal().suppressUnloadUntil = 0;

  // `false` to make sure that we call the handler as the last one.
  window.addEventListener('beforeunload', waitForPendingRequests, false);
}


/**
 * This module is responsible for cross-domain clientId linking.

 * If a customer wants to use our tracker across multiple domains there's
 * no other way of sharing the clientId than by passing it in an URL.

 * Once a list of allowed domains is configured in script's config the script will
 * modify links pointing to allowed domains by enriching `href`s with `_lfa` param
 * when the link is clicked.

 * When initializing the clientId tracker will first check if URL contains a valid
 * `_lfa` param and if it does it'll use that clientId without checking the cookie
 * or local storage.
 **/

var clientIdUrlParamName = "_lfa";
var clientIdUrlParamTimeoutInSeconds = 5;

var originalLocationHref;

function setupCrossDomainLinking(tracker) {
  // If the tracker has the cookie option disabled there's no point in cross-domain
  // linking because the user will always get the same anonymous client id,
  // irrelevant of the domain the tracker was installed for.
  if (!tracker.crossDomainLinking.enabled || !tracker.lfaCookieEnabled) {
    return;
  }

  // Store the location at the moment of loading the script, so that if it later
  // changes (e.g. `history.pushState` can do that) we can still use it for
  // loading cross-domain client id.
  originalLocationHref = window.location.href;

  document.addEventListener("mousedown", function(e) { tryEnrichingHrefWithClientId(e.target); });
}

/**
 * Extracts clientId from the originally visited URL
 *
 * @returns {string} Client ID or null
 **/
function getCrossDomainClientIdFromUrl() {
  if (!getCurrentTracker().crossDomainLinking.enabled) {
    return;
  }

  return getClientIdFromUrl(originalLocationHref);
}

/**
 * Extracts clientId from the provided URL
 *
 * @argument {string} url - URL string
 * @returns {string} Client ID or null if param is blank/invalid.
 **/
function getClientIdFromUrl(url) {
  var clientIdParam = getUrlParameter(url, clientIdUrlParamName);

  if (!clientIdParam) {
    return;
  }

  clientIdParam = String(clientIdParam);

  var result = validateClientIdFromUrl(clientIdParam);

  if (!result) {
    return;
  }

  console.log("* [leadfeeder][cross-domain-linking] Using client Id from URL param", result);

  return result;
}

/**
 * Checks if extracted cross-domain param is valid and extracts clientId if so.
 *
 * @argument {string} clientIdParam - `_lfa` URL param value
 * @returns {string} Client ID or null if param is blank/invalid.
 **/
function validateClientIdFromUrl(clientIdParam) {
  // clientId-timestampInSeconds-deviceId
  // For example: LF1.1.d6273c502da7e501.1611229246986-1611315631-977dc1
  var clientIdParamRegex = /^LF\d\.\d\.[0-9a-z]{16}\.\d{13}-\d{10}-[0-9a-z]{6}$/;

  if (clientIdParam.length !== 54 || !clientIdParamRegex.test(clientIdParam)) {
    console.log("* [leadfeeder][cross-domain-linking] _lfa URL param has invalid format",
                clientIdParam);
    return;
  }

  var parts = clientIdParam.split("-");
  var clientId = parts[0];
  var linkTimestamp = parseInt(parts[1]);
  var deviceHash = parts[2];

  // Param should be invalidated quickly (5s) to prevent using someone else's
  // client id when a link was shared.
  // We're using an absolute difference to prevent a situation when someone from
  // another timezone shares a link.
  var now = getCurrentTimestampInSeconds();
  if (Math.abs(now - linkTimestamp) > clientIdUrlParamTimeoutInSeconds) {
    console.log("* [leadfeeder][cross-domain-linking] Timestamp is not valid.",
                "Timestamp from URL:", linkTimestamp, "Current timestamp:", now);
    return;
  }

  var currentDeviceHash = generateBrowserSpecificId();
  if (deviceHash !== currentDeviceHash) {
    console.log("* [leadfeeder][cross-domain-linking] Different device used.",
                "Link device:", deviceHash, "Current device:", currentDeviceHash);
    return;
  }

  return clientId;
}

/**
 * Checks if a clicked DOM element (or one of its parents) is a link element.
 * If a linked got clicked and `href` points to a domain allowed for cross-domain
 * linking it'll add `_lfa` param to link's address.
 *
 * @argument {HTMLElement} clickedElement
 **/
function tryEnrichingHrefWithClientId(clickedElement) {
  var linkElement = findLinkElement(clickedElement);

  if (!linkElement) {
    return;
  }

  if (!shouldAddCrossDomainClientId(linkElement)) {
    return;
  }

  addCrossDomainClientIdToLinkElement(linkElement);
}

/**
 * Checks if link's `href` points to a domain allowed for cross-domain linking.
 *
 * @argument {HTMLLinkElement} element - link element
 * @returns {boolean} True if link should be enriched. False otherwise.
 **/
function shouldAddCrossDomainClientId(element) {
  var targetLink = element.getAttribute('href');

  if (!targetLink) {
    return false;
  }

  targetLink = String(targetLink);

  // Non-absolute URL can never point to another domain
  if (!isAbsoluteUrl(targetLink)) {
    return false;
  }

  return isAllowedHostnameForLinking(
    element.hostname,
    document.location.hostname,
    getCurrentTracker().crossDomainLinking.allowedDomains
  );
}

/**
 * Returns true if provided string is an absolute URL
 *
 * @argument {HTMLLinkElement} element - link element
 * @returns {boolean} True if link should be enriched. False otherwise.
 **/
function isAbsoluteUrl(href) {
  // Double-slash is a scheme-relative protocol:
  // https://stackoverflow.com/questions/11881054/is-a-url-starting-with-valid
  return startsWith(href, '//') ||
         startsWith(href, 'http://') ||
         startsWith(href, 'https://');
}

/**
 * Checks if provided hostname is equal to one of domains allowed for linking.
 * Subdomains of allowed domains are valid as well.
 *
 * @argument {string} hostname - clicked link's hostname
 * @argument {string} currentHostname - current document's hostname
 * @argument {array<String>} allowedDomains - domains allowed for linking
 * @returns {boolean} True if hostname is allowed for cross-domain linking.
 **/
function isAllowedHostnameForLinking(hostname, currentHostname, allowedDomains) {
  // If link's hostname belongs to current hostname there's no point in
  // enriching the URL, because the id can be shared by cookie.
  if (hostBelongsToDomain(hostname, currentHostname)) {
    return false;
  }

  for (var i = 0; i < allowedDomains.length; i++) {
    // If current hostname a part of a whitelisted domain then do not do any
    // further checks. Client id will be shared in a same-domain cookie, no point
    // in adding URL params.
    if (hostBelongsToDomain(currentHostname, allowedDomains[i])) {
      continue;
    }

    if (hostBelongsToDomain(hostname, allowedDomains[i])) {
      return true;
    }
  }

  return false;
}

/**
 * Enriches link element's `href` with `_lfa` param.
 *
 * @argument {HTMLAnchorElement/HTMLAreaElement} element - link element
 **/
function addCrossDomainClientIdToLinkElement(element) {
  var url = element.getAttribute('href');

  element.setAttribute('href', enrichUrlWithCrossDomainClientIdParam(url));
}

/**
 * Adds `_lfa` param to a provided URL or replaces the `_lfa` param with a new
 * one if already present.
 *
 * @argument {String} url - original link's URL
 * @returns {String} Enriched URL
 **/
function enrichUrlWithCrossDomainClientIdParam(url) {
  // We need to remove the parameter and add it again if needed to make sure
  // we have latest timestamp and clientId.
  url = removeUrlParameter(url, clientIdUrlParamName);

  var clientIdParam = generateCrossDomainClientId();

  return addUrlParameter(url, clientIdUrlParamName, clientIdParam);
}

/**
 * Creates a param for cross-domain linking by joining tracker's clientId,
 * current timestamp in seconds and current device's fingerprint.
 *
 * @returns {String} Generated param value
 **/
function generateCrossDomainClientId() {
  var clientId = getCurrentTracker().getClientId();
  var timestamp = String(getCurrentTimestampInSeconds());
  var deviceId = generateBrowserSpecificId();

  return clientId + "-" + timestamp + "-" + deviceId;
}

function getCurrentTimestampInSeconds() {
  return Math.floor((new Date()).getTime() / 1000);
}

/**
 * @returns {String} 6-character device fingerprint
 **/
function generateBrowserSpecificId() {
  return sha1(
    (navigator.userAgent || '') +
    (navigator.platform || '') +
    (navigator.language || '')
  ).slice(0, 6);
}

/**
 * Checks if host belongs to a domain.
 *
 * @returns {bool} True if provided host is a part of given domain
 **/
function hostBelongsToDomain(host, domain) {
  host = host.toLowerCase();
  domain = domain.toLowerCase();

  var hostParts = host.split(".");
  var domainParts = domain.split(".");

  for (var i = 1; i <= domainParts.length; i++) {
    if (domainParts[domainParts.length - i] !== hostParts[hostParts.length - i]) {
      return false;
    }
  }

  return true;
}

/**
 * Checks if a provided DOM element (or one of its parents) is a link element
 * and returns it.
 *
 * @argument {HTMLElement} clickedElement
 * @returns {HTMLAnchorElement/HTMLAreaElement} link element or null
 **/
function findLinkElement(clickedElement) {
  var parentElement;
  var i = 0;

  do {
    if (isLinkElement(clickedElement)) {
      return clickedElement;
    }

    parentElement = clickedElement.parentNode;

    clickedElement = parentElement;
    parentElement = clickedElement.parentNode;
    i++;
  } while (parentElement !== null && i < 100);

  return null;
}

/**
 * Checks if a DOM element is a link element.
 *
 * @argument {HTMLElement} node - DOM element to check
 * @returns {bool} True if element is a link element.
 **/
function isLinkElement(node) {
  if (!node) {
    return false;
  }

  var elementName = String(node.nodeName).toLowerCase();
  var linkElementNames = ['a', 'area'];

  return linkElementNames.indexOf(elementName) !== -1;
}


/**
 * Looks up for a GA object (analytics.js) and returns it.
 * @argument {window} w
 * @argument undefined gaObjectRef
 * @returns GoogleAnalytics `ga` object or null
 **/
function getGa(w, gaObjectRef) {
  gaObjectRef = w.GoogleAnalyticsObject || "ga";
  return gaObjectRef && w[gaObjectRef] ? w[gaObjectRef] : null;
}

/**
 * Looks up for a legacy GA object (ga.js) and returns it.
 * @argument {window} w
 * @returns GoogleAnalytics `ga` object or null
 **/
function getGaLegacy(w) {
  return w._gat || null;
}

/**
 * Get all GA trackers from GaObject
 * @argument {ga} gaObj
 * @returns {array} trackers
 **/
function getTrackersFromGaObject(gaObj) {
  if (!gaObj) {
    return [];
  }

  if (typeof(gaObj.getAll) !== "function") {
    /* This can happen only when we have both GA enhancement and tracking
       active and for some reason we're not able to get GA object. In such
       case we will continue with tracking and simply return empty array
       for GA properties.
    */
    console.info("* [leadfeeder] GoogleAnalyticsObject not found");
    return [];
  }

  return gaObj.getAll();
}

/**
 * Get all GA trackers from legacy GaObject
 * @argument {ga} gaObj
 * @returns {array} trackers
 **/
function getTrackersFromGaLegacyObject(gaObj) {
  if (!gaObj) {
    return [];
  }

  if (typeof(gaObj._getTrackers) !== "function") {
    /* This can happen only when we have both GA enhancement and tracking
       active and for some reason we're not able to get GA object. In such
       case we will continue with tracking and simply return empty array
       for GA properties.
    */
    console.info("* [leadfeeder] Legacy GoogleAnalyticsObject not found");
    return [];
  }

  return gaObj._getTrackers();
}

function getGaClientIdFromCookie() {
  var value = getCookie("_ga");

  if (!value) {
    return;
  }

  // Cookie contains client id prefixed with GA script version
  // We have to strip the script version, so:
  // "GA1.2.1280830754.1572526102" becomes "1280830754.1572526102"
  var parts = value.split(".");
  if (parts.length < 2) {
    return;
  }

  return parts[parts.length - 2] + "." + parts[parts.length - 1];
}

/**
 * Checks if Google Analytics trackers have already been initialized
 * @argument {window} w
 * @returns {Boolean}
 **/
function isGaReady(w) {
  var ga = getGa(w);
  if (ga !== null && typeof(ga) === "function" && typeof(ga.getAll) === "function") {
    return true;
  }

  ga = getGaLegacy(w);
  if (ga !== null && typeof(ga) === "object" && typeof(ga._getTrackers) === "function") {
    return true;
  }

  return false;
}

/**
 * Extracts client and tracking ids from Google Analytics legacy trackers
 * @argument {window} w
 * @argument {array} an array of client and tracking ids
 **/
function extractIdsFromLegacyTrackers(w, ids) {
  var trackers = getTrackersFromGaLegacyObject(getGaLegacy(w));

  for (var i = 0; i < trackers.length; i++) {
    addObjIfValid(trackers[i]._getAccount(), ids.trackingIds, true);
  }
}

/**
 * Extracts client and tracking ids from Google Analytics trackers
 * @argument {window} w
 * @argument {array} ids an array of client and tracking ids
 **/
function extractIdsFromTrackers(w, ids) {
  var trackers = getTrackersFromGaObject(getGa(w));

  for (var i = 0; i < trackers.length; i++) {
    addObjIfValid(trackers[i].get("clientId"), ids.clientIds);
    addObjIfValid(trackers[i].get("trackingId"), ids.trackingIds);
  }
}

/**
 * Adds new object to array if it's valid and not previously contained in it
 * @argument {object} el
 * @argument {array} ids an array of client and tracking ids
 * @argument {boolean} deep true if we need to dig deeper into el (for ga.js)
 **/
function addObjIfValid(el, ids, deep) {
  if (typeof(el) === "undefined" || ids.indexOf(el) !== -1) {
    return;
  }

  // Having tracking id in vtp_trackingId is not guaranteed but according to the
  // logs, we're still getting it.
  if (deep && typeof(el) === "object" && typeof(el.vtp_trackingId) === "string") {
    ids.push(el.vtp_trackingId);
    return;
  }

  ids.push(el);
}

/*
 * Return an object containing relevant GA IDs.
 * return {array} an array of GA ids
 */
function getGaIds() {
  var ids = {
    clientIds: [],
    trackingIds: []
  };

  // If case both google scripts are present, prefer newer analytics.js to read
  // the tracking ids from.
  if (getGa(window) !== null) {
    extractIdsFromTrackers(window, ids);
  }
  else {
    extractIdsFromLegacyTrackers(window, ids);
  }

  if (!ids.clientIds.length) {
    var cookieClientId = getGaClientIdFromCookie();
    if (cookieClientId) {
      ids.clientIds.push(cookieClientId);
    }
  }

  return ids;
}


function getGlobal() {
  if (typeof(window) === "undefined") {
    return null;
  }
  return window.ldfdr;
}

function globalIsReady() {
  return typeof(window) !== "undefined"
    && typeof(window.ldfdr) !== "undefined";
}


function getTracker(scriptId, callback) {
  var tracker = getRegistry()[scriptId] || null;

  if (isFunction(callback)) {
    return callback(tracker);
  }
  return tracker;
}

function getAll(callback) {
  var trackers = objectValues(getRegistry());

  if (isFunction(callback)) {
    return trackers.map(function(tracker) {
      return callback(tracker);
    });
  }

  return trackers;
}

function trackAll(args) {
  getAll(function(tracker) {
    tracker.track(args);
  });
}

function identifyAll(args) {
  getAll(function(tracker) {
    tracker.identify(args);
  });
}

function pageviewAll(args) {
  getAll(function(tracker) {
    tracker.pageview(args);
  });
}

function setDebugSettings(settings) {
  setOverrideSettings(settings);
}

window.ldfdr.getTracker = getTracker;
window.ldfdr.getAll = getAll;
window.ldfdr.track = trackAll;
window.ldfdr.identify = identifyAll;
window.ldfdr.pageview = pageviewAll;
window.ldfdr.setDebugSettings = setDebugSettings;


var cachedLfClientId;
var cachedUserConsent = null;

function setCachedLfClientId(value) {
  cachedLfClientId = value;
  return value;
}

function clearCachedLfClientId() {
  cachedLfClientId = undefined;
}

function clearCachedUserConsent() {
  cachedUserConsent = null;
}

function clearCachedCookies() {
  clearCachedLfClientId();
  clearCachedUserConsent();
}

function getCachedLfClientId() {
  return cachedLfClientId;
}

function fetchCachedLfClientId(computeClientIdFunction) {
  var id = getCachedLfClientId();

  if (!id) {
    id = computeClientIdFunction();
    setCachedLfClientId(id);
  }

  return id;
}

function getCurrentTracker() {
  return getGlobal().getTracker(lfScriptId);
}

function getAllTrackers() {
  return getGlobal().getAll();
}

/*
 * Returns an array of objects containing foreign cookie values.
 * Example:
 * [
    {
      "type": "hubspot",
      "value": "43798013325c841efb5d346080fbc379"
    },
    {
      "type": "intercom",
      "value": "4969f03b-a3aa-48a8-abfb-dac30f86129e"
    }
  ]
*/
function getForeignCookies() {
  var fcs = getCurrentTracker().foreignCookieSettings;
  var result = [];

  if (!fcs) { return result; }

  var allCookies = getAllCookies();
  var allCookieNames = Object.keys(allCookies);
  var foreignCookieTypes = Object.keys(fcs);

  for (var i = 0; i < foreignCookieTypes.length; i++) {
    var type = foreignCookieTypes[i];
    var pattern = fcs[type];

    for (var j = 0; j < allCookieNames.length; j++) {
      var cookieName = allCookieNames[j];

      if (!cookieName.match(pattern)) {
        continue;
      }

      var value = allCookies[cookieName];
      result.push({ type: type, value: value });
    }
  }

  return result;
}

/*
 * Returns true if sendBeacon API should be used and is supported
 */
function sendBeaconEnabled() {
  var tracker = getCurrentTracker();
  return tracker.useSendBeaconApi === true && navigator && navigator.sendBeacon;
}

/*
 * Returns true if cookies are enabled, both by a script and by a browser setting.
 */
function cookiesEnabled(tracker) {
  // Cache the user consent to avoid jank from reading a cookie multiple times.
  // For more details about cookie read jank see async cookie docs,
  // though async cookie is not supported in all browsers:
  // https://developers.google.com/web/updates/2018/09/asynchronous-access-to-http-cookies#reading_a_cookie_and_eliminating_jank
  if (cachedUserConsent === null) {
    cachedUserConsent = loadStoredUserCookieConsent();
  }

  if (tracker.lfaCookieEnabled === false && tracker.consentManagementEnabled === true) {
    console.warn("* [leadfeeder][tracking] Invalid state: lfaCookieEnabled is false, but consentManagementEnabled is true.");
  }
  return tracker.lfaCookieEnabled === true && hasCookies() === "1" &&
    (tracker.consentManagementEnabled === false || cachedUserConsent === true);
}

/*
 * Returns true if we should deal with the dual stack endpoint as well.
 */
function dualStackEndpointEnabled() {
  var tracker = getCurrentTracker();
  return tracker.useDualStackEndpoint === true;
}

/*
 * Creates event data
 * @argument {string} lfClientId
 * @argument {object} args
 * @returns {object} hash with event data
 */
function createEvent(lfClientId, args) {
  var gaIds = getGaIds();
  var now = new Date();
  args = args || {};

  var eventType = args.eventName || "tracking-event";
  var referrer = args.referrer || document.referrer;
  // Drop referrer for form-submit as it may contain form input values.
  if (eventType === "form-submit") {
    referrer = "";
  }

  return {
    gaTrackingIds: gaIds.trackingIds,
    gaClientIds: gaIds.clientIds,
    context: {
      library: {
        name: "lftracker",
        version: libraryVersion
      },
      pageUrl: args.pageUrl || window.location.href,
      pageTitle: args.pageTitle || document.title,
      referrer: referrer
    },
    event: eventType,
    clientEventId: generateRandomUuid(),
    clientTimestamp: now.toISOString(),
    clientTimezone: now.getTimezoneOffset(),
    scriptId: lfScriptId,
    cookiesEnabled: cookiesEnabled(getCurrentTracker()),
    // Using !1 instead of false in order to have consistent behavior
    // in test-bench when building testing scripts.
    anonymizeIp:false,
    lfClientId: lfClientId,
    foreignCookies: getForeignCookies(),
    properties: args.properties || {}
  };
}

/*
 * Send the tracking payload using the sendBeacon API.
 * @argument {object} endpoint - URL beacon connects to
 * @argument {object} event
 */
function sendBeacon(endpoint, event, doneCallback) {
  var trkUrl = endpoint + "?sid=" + encodeURIComponent(event.scriptId);
  var data = utoa(JSON.stringify(event));
  var result = navigator.sendBeacon(trkUrl, data);

  // We can't hook into the sendBeacon callback, so notify the caller
  // immediately. sendBeacon returns a status, so that might be used as an
  // argument.
  if (isFunction(doneCallback)) {
    doneCallback({ success: result });
  }

  return result;
}

/*
 * Creates a tracking pixel containing event data base64 encoded in URL.
 * @argument {object} endpoint - URL beacon connects to
 * @argument {object} event
 */
function createTrackingPixel(endpoint, event, doneCallback) {
  var trkUrl = endpoint + "?sid=" + encodeURIComponent(event.scriptId);
  var data = utoa(JSON.stringify(event));
  var img = document.createElement("img");

  img.width = 1;
  img.height = 1;
  img.src = trkUrl + "&data=" + data;

  img.onload = function() {
    if (isFunction(doneCallback)) {
      doneCallback({ success: true });
    }
  };

  img.onerror = function() {
    if (isFunction(doneCallback)) {
      doneCallback({ success: false });
    }
  };

  return img;
}

function getTrackingCookieDurationMs() {
  var trackingCookieDurationMs = null;
  var trackingCookieDurationDays = getCurrentTracker().trackingCookieDurationDays;
  if (trackingCookieDurationDays) {
    trackingCookieDurationMs = trackingCookieDurationDays * 24 * 60 * 60 * 1000;
  }
  return trackingCookieDurationMs;
}

/*
 * Generates an lfClientId. Also, if configuration allows it, stores the value
 * in a cookie and localStorage.
 */
function prepareLfClientId() {
  var lfClientId;

  if (cookiesEnabled(getCurrentTracker())) {
    lfClientId = loadClientId();
    var trackingCookieDurationMs = getTrackingCookieDurationMs();

    if (!lfClientId || !startsWith(lfClientId, lfCookieVersion)) {
      lfClientId = saveClientId(null, trackingCookieDurationMs);
      console.log("* [leadfeeder][tracking] new client id saved, value %s", lfClientId);
    } else {
      saveClientId(lfClientId, trackingCookieDurationMs);
      console.log("* [leadfeeder][tracking] client id updated, value %s", lfClientId);
    }

    return lfClientId;
  }

  var storedClientId = loadStoredClientId();
  if (storedClientId) {
    // Delay the clearing of cookies by one second in order to wait for all
    // trackers to load when in the context of multi-trackers.
    setTimeout(clearCookiesIfDisabledForAllTrackers, 1000);
  }

  /*
   * If a browser doesn't have cookies enabled or if they were explicitly
   * disabled in the script settings, create new lfClientId for each
   * request. To insure a proper repeatability of lfClientId between request,
   * we would need to have end-user's IP address, something that's not
   * available from script running in browser. This is done in the
   * pre-sessionator lambda.
   */
  lfClientId = generateAnonClientId();
  console.log("* [leadfeeder][tracking] cookies disabled, new client id generated %s", lfClientId);

  return lfClientId;
}

function clearCookiesIfDisabledForAllTrackers() {
  if (!loadStoredClientId()) {
    // Cookies might have been cleared by another call so return early.
    return;
  }

  if (areCookiesDisabledForAllTrackers()) {
    console.log("* [leadfeeder][tracking] cleared LF cookies, e.g. user consent and client id");
    clearLfCookies();
  } else {
    console.log("* [leadfeeder][tracking] cannot clear stored client id as other trackers have cookies enabled");
  }
}

function areCookiesDisabledForAllTrackers() {
  for (var i = 0, trackers = getAllTrackers(); i < trackers.length; i++) {
    if (cookiesEnabled(trackers[i])) {
      return false;
    }
  }
  return true;
}

/*
 * Executes a provided function if GoogleAnalytics object is present. If not
 * retries with increasingly longer delays.
 *
 * @param {function} callback - Argumentless callback function to be called when
 *   GA has been initialized or retry limit has been reached.
 */
function waitForGa(callback) {
  var retryLimit = 1;
  var tracker = getCurrentTracker();

  if (typeof(tracker.gaInitRetries) === "undefined") {
    tracker.gaInitRetries = 0;
  }

  var retryLimitReached = (tracker.gaInitRetries >= retryLimit);
  var ready = isGaReady(window);

  if (ready) {
    return callback();
  } else if (retryLimitReached) {
    console.log("* [leadfeeder][tracking] failed to get GA object for tracking, continuing without it");
    return callback();
  } else {
    setTimeout(function() { return waitForGa(callback); }, Math.pow(2, tracker.gaInitRetries) * 100);
    tracker.gaInitRetries += 1;
  }
}

/**
 * Generic tracking function - creates the tracking cookie and sends tracking
 * events by calling a tracking pixel endpoint.
 *
 * @param {Object} args - Hash with custom arguments for the tracking event.
 * @param {String} args.pageUrl - If passed will override `context.pageUrl`
 * @param {String} args.pageTitle - If passed will override `context.pageTitle`
 * @param {String} args.eventName - If passed will override the default 'tracking-event' value.
 * @param {Object} args.properties - Custom key-value store for the event
 * @param {function} doneCallback - Argumentless callback function to be called when
 *   tracking request finishes.
 */
function track(args, doneCallback) {
  waitForGa(function() {
    args = args || {};

    var lfClientId = getClientId();
    var event = createEvent(lfClientId, args);
    console.log("* [leadfeeder][tracking] event to track:", event);

    if (sendBeaconEnabled()) {
      sendBeacon("https://tr.lfeeder.com", event, doneCallback);
      if (dualStackEndpointEnabled()) {
        sendBeacon("https://tr2.lfeeder.com", event);
      }
    } else {
      createTrackingPixel("https://tr.lfeeder.com", event, doneCallback);
      if (dualStackEndpointEnabled()) {
        createTrackingPixel("https://tr2.lfeeder.com", event);
      }
    }
  });
}

/**
 * Sends an event of `identify` type which allows matching person's data
 * (e.g. email/name collected via a form) with session's `lfClientId`.
 *
 * @param {Object} args - Hash with custom arguments for the tracking event.
 * @param {String} args.email - Person's email (required)
 * @param {String} args.firstName - Person's first name.
 * @param {Object} args.lastName - Custom key-value store for the event
 * @param {function} doneCallback - Argumentless callback function to be called when
 *   identify request finishes.
 */
function identify(args, doneCallback) {
  args = args || {};

  var email = args['email'];

  if (!isEmail(email)) {
    console.warn("* [leadfeeder][tracking] Email is invalid in 'identify' payload");
    return;
  }

  var firstName = args['firstName'];
  var lastName = args['lastName'];

  var properties = { email: email };
  if (firstName && typeof(firstName) === 'string') {
    properties.firstName = firstName;
  }
  if (lastName && typeof(lastName) === 'string') {
    properties.lastName = lastName;
  }

  track({ eventName: 'identify', properties: properties }, doneCallback);
}

/**
 * Sends a pageview event (`tracking-event` type for historical reasons).
 *
 * @param {Object} args - Hash with custom arguments for the tracking event.
 * @param {String} args.pageUrl - If passed will override `context.pageUrl`
 * @param {String} args.pageTitle - If passed will override `context.pageTitle`
 * @param {function} doneCallback - Argumentless callback function to be called when
 *   pageview request finishes.
 */
function pageview(args, doneCallback) {
  args = args || {};

  var options = { eventName: 'tracking-event' };
  if (args.pageUrl) {
    options.pageUrl = args.pageUrl;
  }
  if (args.pageTitle) {
    options.pageTitle = args.pageTitle;
  }

  track(options, doneCallback);
}

/*
 * Returns LF client id for current tracker
 */
function getClientId() {
  return fetchCachedLfClientId(prepareLfClientId);
}

/*
 * Accepts the LF cookie on behalf of the user and recalculates the client ID.
 */
function acceptTrackingCookie() {
  var trackers = getTrackersWithConsentManagement();
  if (trackers.length == 0) {
    console.warn("* [leadfeeder][tracking] Leadfeeder cookie or consent management is not enabled");
    return false;
  }

  if (cachedUserConsent === true || loadStoredUserCookieConsent() === true) {
    console.warn("* [leadfeeder][tracking] User has already accepted cookies.");
    return false;
  }

  saveUserCookieConsent(getTrackingCookieDurationMs());

  // Generate new page view using the accepted LF cookie.
  for (var i = 0; i < trackers.length; i++) {
    var t = trackers[i];
    t.clearCachedCookies();
    t.pageview();
  }
  return true;
}

function getTrackersWithConsentManagement() {
  var trackersWithConsentManagement = [];
  for (var i = 0, trackers = getAllTrackers(); i < trackers.length; i++) {
    var t = trackers[i];
    if (t.lfaCookieEnabled == true && t.consentManagementEnabled === true) {
      trackersWithConsentManagement.push(t);
    }
  }
  return trackersWithConsentManagement;
}

// Emits a custom JS event when a tracker gets initialized.
// The event has `tracker` as one of the properties and can be consumed like this:
// document.addEventListener('ldfdr.trackerReady', function(event) {
//   console.log('Tracker initialized! Client ID:', event.tracker.getClientId());
// });
function emitTrackerReadyEvent(tracker) {
  var event = document.createEvent('Event');
  event.tracker = tracker;

  // All params are required in IE. It throws an error if only name is used.
  event.initEvent('ldfdr.trackerReady', true, false);
  document.dispatchEvent(event);
}

function initTracker() {
  var tracker = getGlobal().registerTracker(
    lfScriptId, track, identify, pageview, getClientId, clearCachedCookies);

  initPlugins(tracker);
  setupCrossDomainLinking(tracker);

  emitTrackerReadyEvent(tracker);

  return tracker;
}


/**
 * Adds a parameter with given name and value to the URL and returns a new URL string.
 * It does not check whether URL already contains given url parameter.
 * If you need to replace a param please use removeUrlParameter() before calling this method.
 *
 * @argument {string} url - URL to enrich
 * @argument {string} name - parameter name
 * @argument {string} value - parameter value
 * @returns {string} A new URL
 **/
function addUrlParameter(url, name, value) {
  url = String(url);

  if (!value) {
    value = '';
  }

  var hashPos = url.indexOf('#');
  var urlLength = url.length;

  if (hashPos === -1) {
    hashPos = urlLength;
  }

  var baseUrl = url.substr(0, hashPos);
  var urlHash = url.substr(hashPos, urlLength - hashPos);

  if (baseUrl.indexOf('?') === -1) {
    baseUrl += '?';
  } else if (!endsWith(baseUrl, '?')) {
    baseUrl += '&';
  }

  return baseUrl + window.encodeURIComponent(name) + '=' + window.encodeURIComponent(value) + urlHash;
}

/**
 * Removes a parameter with given name from the URL and returns a new URL string.
 *
 * @argument {string} url - URL to modify
 * @argument {string} name - parameter name
 * @returns {string} A new URL
 **/
function removeUrlParameter(url, name) {
  url = String(url);

  if (url.indexOf('?' + name) === -1 && url.indexOf('&' + name) === -1) {
    // nothing to remove, url does not contain this parameter
    return url;
  }

  var searchPos = url.indexOf('?');
  if (searchPos === -1) {
    // nothing to remove, no query parameters
    return url;
  }

  var queryString = url.substr(searchPos + 1);
  var baseUrl = url.substr(0, searchPos);

  if (queryString) {
    var urlHash = '';
    var hashPos = queryString.indexOf('#');
    if (hashPos !== -1) {
      urlHash = queryString.substr(hashPos + 1);
      queryString = queryString.substr(0, hashPos);
    }

    var param;
    var paramsArr = queryString.split('&');
    var i = paramsArr.length - 1;

    for (i; i >= 0; i--) {
      param = paramsArr[i].split('=')[0];
      if (param === name) {
        paramsArr.splice(i, 1);
      }
    }

    var newQueryString = paramsArr.join('&');

    if (newQueryString) {
      baseUrl = baseUrl + '?' + newQueryString;
    }

    if (urlHash) {
      baseUrl += '#' + urlHash;
    }
  }

  return baseUrl;
}

/**
 * Returns a parameter with given name from the URL
 *
 * @argument {string} url - URL to modify
 * @argument {string} name - Parameter name
 * @returns {string} parameter value or empty string
 **/
function getUrlParameter(url, name) {
  var regexSearch = "[\\?&#]" + name + "=([^&#]*)";
  var regex = new RegExp(regexSearch);
  var results = regex.exec(url);
  return results ? safeUrlDecode(results[1]) : '';
}

/**
 * If a text contains a non UTF-8 encoded characters such as
 * an URL like `http://leadfeeder.com/test.html?%F6%E4%FC` (encoded iso-8859-1 URL)
 * then "Uncaught URIError: URI malformed" might happen.
 *
 * This function solves this problem by calling `unescape` function that converts
 * hex escape characters into characters that they represent.
 *
 * @argument {string} str - encoded URL part
 * @returns {string} decoded URL part
 */
function safeUrlDecode(str) {
  try {
    return window.decodeURIComponent(str);
  } catch (e) {
    return unescape(str);
  }
}


var cookieDomain;

var lfTrackingCookieName = "_lfa";
var lfCookieVersion = "LF1.1";
var lfTrackingCookieConsentName = "_lfa_consent";

/**
 * Checks if certain property is defined
 * @argument {object} property
 * @returns true or false
 **/
function isDefined(property) {
  return typeof(property) !== "undefined";
}

/**
 * Checks if certain property is a function
 * @argument {object} property
 * @returns true or false
 **/
function isFunction(property) {
  return typeof(property) === "function";
}

/**
 * Implements Object.values
 **/
function objectValues(o) {
  if (Object.values) {
    return Object.values(o);
  }

  var values = [];
  for (var p in o) {
    if (typeof p === 'string' && o.propertyIsEnumerable(p)) {
      values.push(o[p]);
    }
  }

  return values;
}

/**
 * Returns memoized cookie domain
 **/
function getCachedCookieDomain() {
  return cookieDomain;
}

/**
 * Memoizes the cookie domain for later use
 **/
function setCachedCookieDomain(domain) {
  cookieDomain = domain;
}

/**
 * Clears LF client id from cookie and local storage
 **/
function clearLfCookies() {
  clearLocalStorage(localStorageExpiryKey());
  clearLocalStorage(lfTrackingCookieName);
  clearCookieFromItsDomain(lfTrackingCookieName);
  clearLocalStorage(lfTrackingCookieConsentName);
  clearCookieFromItsDomain(lfTrackingCookieConsentName);
}

/**
 * Clears a cookie stored for a domain using setCookieInAvailableDomain()
 **/
function clearCookieFromItsDomain(cookieName) {
  if (!getCookie(cookieName)) {
    return;
  }

  var domain = window["ldfdr"].cfg.cookieDomain;

  if (domain) {
    deleteCookie(cookieName, domain);
    return;
  }

  // Try removing the cookie starting from the most specific domain (e.g. pipedrive.app.leadfeeder.com)
  // ending with the most generic one (e.g. leadfeeder.com)
  var domainParts = getCookieDomainParts().reverse();
  for (var i = 0; i < domainParts.length; i++) {
    domain = domainParts[i];
    deleteCookie(cookieName, domain);

    if (!getCookie(cookieName)) {
      console.log("* [leadfeeder][cookie] Deleted cookie for domain", domain);
      return;
    }

    console.warn("* [leadfeeder][cookie] Failed to delete cookie for domain", domain);
  }
}

/**
 * Sets value of the cookie in the first available domain.
 * The domain defined by the user via window["ldfdr"].cfg.cookieDomain has priority.
 * @argument {string} name
 * @argument {string} value
 * @argument {integer} cookieDurationMs
 **/
function setCookieInAvailableDomain(name, value, cookieDurationMs) {
  // Use domain from config or a memoized domain
  var domain = window["ldfdr"].cfg.cookieDomain || getCachedCookieDomain();

  if (domain) {
    setCookie(name, value, cookieDurationMs, "/", domain);
    return;
  }

  // Try setting the cookie starting from the most general domain (e.g. leadfeeder.com)
  // ending with the most specific one (e.g. pipedrive.app.leadfeeder.com)
  var domainParts = getCookieDomainParts();
  for (var i = 0; i < domainParts.length; i++) {
    domain = domainParts[i];
    setCookie(name, value, cookieDurationMs, "/", domain);

    if (isCookieStoredForDomain(domain) && getCookie(name) === value) {
      // memoize domain for further use
      console.log("* [leadfeeder][cookie] Stored cookie for domain", domain);
      setCachedCookieDomain(domain);
      return;
    }

    console.warn("* [leadfeeder][cookie] Failed to store cookie for domain", domain);
  }
}

function isCookieStoredForDomain(domain) {
  var testCookieName = "cookie-test";
  var value = new Date().getTime().toString() + "-" + Math.random().toString();

  setCookie(testCookieName, value, 1000, "/", domain);
  var stored = getCookie(testCookieName) === value;
  deleteCookie(testCookieName, domain);

  return stored;
}

/**
 * Sets a cookie with the given {name,value} for cookieDurationMs and
 * stores it in local storage
 * @argument {string} name
 * @argument {string} value
 * @argument {integer} cookieDurationMs
 **/
function setAndStoreCookie(name, value, cookieDurationMs) {
  setCookieInAvailableDomain(name, value, cookieDurationMs);

  localStorage.setItem(name, value);
  var now = new Date();
  now.setTime(now.getTime() + cookieDurationMs);
  localStorage.setItem(localStorageExpiryKey(), now.toISOString());
}

/**
 * Clears local storage for the given name
 * @argument {string} name
 **/
function clearLocalStorage(name) {
  localStorage.removeItem(name);
}

/**
 * Returns a local storage key where expiration info for the specific cookie is kept
 * @argument {string} baseKey
 **/
function localStorageExpiryKey() {
  return lfTrackingCookieName + "_expiry";
}

/**
 * Gets client id from URL, cookie or local storage. Using local storage is used
 * mostly for something called ITP in Safari. We use the first-party cookie for
 * tracking and this used to be treated ok by cookie tracking prevention
 * techniques in browsers (compared to third-party cookies). But ITP makes
 * things difficult even for 1st party ones. For instance, now persistent
 * first-party cookies (we create them to expire after 2 years) can only last
 * for 1 day, after which Safari deletes them. With this local storage trick,
 * we update such a cookie after it disappears.
 * Check https://webkit.org/blog/9521/intelligent-tracking-prevention-2-3/ for
 * details.
 * @returns client id or 0
 **/
function loadClientId() {
  return getCrossDomainClientIdFromUrl() || loadStoredClientId();
}

/**
 * Just like loadClientId(), but only checks cookie and storage.
 * @return client id or 0
 */
function loadStoredClientId() {
  return getClientIdFromCookie() || getClientIdFromLocalStorage();
}

/**
 * Gets the user consent from cookie or local storage.
 * Similarly to loadClientId(), the user consent is also persisted in local
 * storage for Safari ITP.
 **/
function loadStoredUserCookieConsent() {
  var userConsent = getCookie(lfTrackingCookieConsentName) ||
    localStorage.getItem(lfTrackingCookieConsentName);
  return userConsent === "true";
}

/*
 * Returns value of the cookie containing client id
 * @returns {string} client id or 0
 */
function getLfCookie() {
  return getCookie(lfTrackingCookieName);
}

function getClientIdFromCookie() {
  var cookieValue = getLfCookie();

  if (!cookieValue) { return; }

  // The cookie value doesn't look like a client id. Most probably it's in old format
  // (base64 encoded scriptId -> clientId hash).
  if (!startsWith(cookieValue, lfCookieVersion)) {
    var deprecated = getClientIdFromDeprecatedCookie(cookieValue);
    if (deprecated) { return deprecated; }
  }

  return cookieValue;
}

/*
 * Previously we used to store a hash of scriptId -> clientId values.
 * Now we store a single client id for all scripts. Let's just return the first
 * one in case when there's more than one.
 * @argument {string} cookieValue - cookie content
 * @returns {string} client id or 0
 */
function getClientIdFromDeprecatedCookie(cookieValue) {
  var cookiesHash;

  try {
    cookiesHash = getClientIdsFromDeprecatedCookie(cookieValue);
  } catch (e) {
    console.warn("* [leadfeeder][cookie] Error while trying to read deprecated cookie", e);
    return 0;
  }

  if (!cookiesHash) {
    return 0;
  }

  var id = objectValues(cookiesHash)[0];
  console.log("* [leadfeeder][cookie] Found old-style cookie (clientId per scriptId). Returning first clientId", id);

  return id;
}

/*
 * Returns a hash of all client ids stored in a cookie
 * @argument name
 */
function getClientIdsFromDeprecatedCookie(cookieValue) {
  if (!cookieValue) {
    return 0;
  }

  var decodedJson = atou(cookieValue);
  return decodedJson ? JSON.parse(decodedJson) : 0;
}

/*
 * Get cookie value
 * @argument {string} name - Cookie name
 * @returns {string|integer} cookie value or 0
 */
function getCookie(name) {
  var cookiePattern = new RegExp("(^|;)[ ]*" + name + "=([^;]*)"),
    cookieMatch = cookiePattern.exec(document.cookie);
  return cookieMatch ? window.decodeURIComponent(cookieMatch[2]) : 0;
}

/*
 * Returns an object with all cookies
 * @returns {object} cookie key-value store
 */
function getAllCookies() {
  var pairs = document.cookie.split(";");
  var cookies = {};
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split("=");
    cookies[(pair[0] + '').trim()] = unescape(pair.slice(1).join('='));
  }
  return cookies;
}

/*
 * Get client id from local storage
 * @returns {string} client id or 0
 */
function getClientIdFromLocalStorage() {
  var clientId = localStorage.getItem(lfTrackingCookieName);
  if (clientId != null) {
    var clientIdExpiry = localStorage.getItem(localStorageExpiryKey());
    if (clientIdExpiry != null && new Date().toISOString() > clientIdExpiry) {
      clientId = 0;
    }
  }
  else {
    clientId = 0;
  }
  return clientId;
}

/**
 * Saves the client id in cookie/local storage
 * @argument {string} clientId
 * @argument {integer} lfTrackingCookieDurationMs
 */
function saveClientId(clientId, lfTrackingCookieDurationMs) {
  if (!clientId) {
    var cookieId = generateRandomUuid();
    clientId = createCookieContent(cookieId);
  }

  setAndStoreCookie(lfTrackingCookieName, clientId, lfTrackingCookieDurationMs);
  // In case the user accepted cookies, refresh the user consent in order to keep
  // its expiration in sync with the LF cookie.
  if (loadStoredUserCookieConsent() === true) {
    saveUserCookieConsent(lfTrackingCookieDurationMs);
  }

  return clientId;
}

/**
 * Saves the user cookie consent in cookie/local storage.
 * @argument {string} clientId
 * @argument {integer} lfTrackingCookieDurationMs
 */
function saveUserCookieConsent(lfTrackingCookieDurationMs) {
  setAndStoreCookie(lfTrackingCookieConsentName, "true", lfTrackingCookieDurationMs);
}

/**
 * This method replicates GA's 'auto' strategy for resolving cookie domain.
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#automatic_cookie_domain_configuration
 * For current hostname it'll return an array of domains sorted from the most general ones
 * to the most specific.
 * It'll also append "none" element at the end - if none of the previous domains
 * succeed the "none" element will tell the browser to use the default domain for
 * current hostname.
 *
 * Example:
 * For `pipedrive.app.leadfeeder.com` it'll return: ["leadfeeder.com", "app.leadfeeder.com", "pipedrive.app.leadfeeder.com", "none"]
 *
 * @argument {string} hostname - if not passed then `document.location.hostname` will be used
 * @returns {Array.<String>} Array of possible cookie domains
 */
function getCookieDomainParts(hostname) {
  var domain = hostname || document.location.hostname;
  domain = (domain.indexOf("www.") === 0) ? domain.substring(4) : domain;

  var parts = domain.split(".");

  // Return 'none' if hostname is an IP address
  if (parts.length === 4) {
    var lastPart = parts[parts.length - 1];
    if (parseInt(lastPart, 10) == lastPart) { return ["none"]; }
  }

  var result = [];

  for (var i = parts.length - 2; i >= 0; i--) {
    result.push(parts.slice(i).join("."));
  }

  result.push("none");

  return result;
}

/*
 * Create content for the _lfa cookie
 * @returns {string}
 */
function createCookieContent(val) {
  return lfCookieVersion + "." + val + "." + new Date().getTime();
}

/**
 * Deletes the cookie with given name
 * @argument {string} name
 **/
function deleteCookie(name, domain) {
  setCookie(name, "", -3600, "/", domain);
}

/**
 * Sets value of the cookie
 * @argument {string} name
 * @argument {string} value
 * @argument {integer} msToExpire (in ms)
 * @argument {string} path
 * @argument {string} domain
 * @argument {boolean} isSecure
 **/
function setCookie(name, value, msToExpire, path, domain, isSecure) {
  var expiryDate;
  if (msToExpire) {
    expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + msToExpire);
  }

  document.cookie = name + "=" +
    window.encodeURIComponent(value) +
    (msToExpire ? ";expires=" + expiryDate.toGMTString() : "") +
    ";path=" + (path || "/") +
    (domain && domain !== "none" ? ";domain=" + domain : "") +
    (isSecure ? ";secure" : "") +
    ";SameSite=Lax";
}

/*
 * Are cookies enabled in browser?
 * @returns {boolean}
 */
function hasCookies() {
  if (!isDefined(navigator.cookieEnabled)) {
    var testCookieName = "testcookie";
    setCookie(testCookieName, "1");

    return getCookie(testCookieName) === "1" ? "1" : "0";
  }

  return navigator.cookieEnabled ? "1" : "0";
}

/*
 * Generates a unique random string
 * @returns {string}
 */
function generateRandomUuid() {
  return sha1(
    (navigator.userAgent || "") +
    (navigator.platform || "") +
    (navigator.language || "") +
    (new Date()).getTime() +
    Math.random()
  ).slice(0, 16);
}

/*
 * Generates a random id for cases when cookies are disabled. Such client id
 * doesn't really matter - decorating it with the '.NC' suffix we are giving
 * instruction to edge lambda to re-generate the client id from scratch.
 * @returns {string}
 */
function generateAnonClientId() {
  return lfCookieVersion + "." + generateRandomUuid() + ".NC";
}

/*
 * Encodes string to UTF8
 * @argument {string} argString
 * @returns {string}
 */
function utf8Encode(argString) {
  return unescape(window.encodeURIComponent(argString));
}

/*
 * Creates SHA1 hash from the input string
 * @argument {string} str
 * @returns {string} SHA1 hash
 */
function sha1(str) {
  var
    rotateLeft = function(n, s) {
      return (n << s) | (n >>> (32 - s));
    },

    cvtHex = function(val) {
      var strout = "",
        i,
        v;

      for (i = 7; i >= 0; i--) {
        v = (val >>> (i * 4)) & 0x0f;
        strout += v.toString(16);
      }

      return strout;
    },

    blockstart,
    i,
    j,
    W = [],
    H0 = 0x67452301,
    H1 = 0xEFCDAB89,
    H2 = 0x98BADCFE,
    H3 = 0x10325476,
    H4 = 0xC3D2E1F0,
    A,
    B,
    C,
    D,
    E,
    temp,
    strLen,
    wordArray = [];

  str = utf8Encode(str);
  strLen = str.length;

  for (i = 0; i < strLen - 3; i += 4) {
    j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 |
      str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
    wordArray.push(j);
  }

  switch (strLen & 3) {
  case 0:
    i = 0x080000000;
    break;
  case 1:
    i = str.charCodeAt(strLen - 1) << 24 | 0x0800000;
    break;
  case 2:
    i = str.charCodeAt(strLen - 2) << 24 | str.charCodeAt(strLen - 1) << 16 | 0x08000;
    break;
  case 3:
    i = str.charCodeAt(strLen - 3) << 24 | str.charCodeAt(strLen - 2) << 16 | str.charCodeAt(strLen - 1) << 8 | 0x80;
    break;
  }

  wordArray.push(i);

  while ((wordArray.length & 15) !== 14) {
    wordArray.push(0);
  }

  wordArray.push(strLen >>> 29);
  wordArray.push((strLen << 3) & 0x0ffffffff);

  for (blockstart = 0; blockstart < wordArray.length; blockstart += 16) {
    for (i = 0; i < 16; i++) {
      W[i] = wordArray[blockstart + i];
    }

    for (i = 16; i <= 79; i++) {
      W[i] = rotateLeft(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
    }

    A = H0;
    B = H1;
    C = H2;
    D = H3;
    E = H4;

    for (i = 0; i <= 19; i++) {
      temp = (rotateLeft(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotateLeft(B, 30);
      B = A;
      A = temp;
    }

    for (i = 20; i <= 39; i++) {
      temp = (rotateLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotateLeft(B, 30);
      B = A;
      A = temp;
    }

    for (i = 40; i <= 59; i++) {
      temp = (rotateLeft(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotateLeft(B, 30);
      B = A;
      A = temp;
    }

    for (i = 60; i <= 79; i++) {
      temp = (rotateLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotateLeft(B, 30);
      B = A;
      A = temp;
    }

    H0 = (H0 + A) & 0x0ffffffff;
    H1 = (H1 + B) & 0x0ffffffff;
    H2 = (H2 + C) & 0x0ffffffff;
    H3 = (H3 + D) & 0x0ffffffff;
    H4 = (H4 + E) & 0x0ffffffff;
  }

  temp = cvtHex(H0) + cvtHex(H1) + cvtHex(H2) + cvtHex(H3) + cvtHex(H4);

  return temp.toLowerCase();
}

// Functions for working around btoa/atob supporting only latin1 charset
// For more context check:
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#Solution_4_%E2%80%93_escaping_the_string_before_encoding_it

// Get percent encoded UTF8, then convert to raw bytes, which btoa
// can handle.
function utoa(str) {
  return window.btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    function toSolidBytes(match, p1) {
      return String.fromCharCode('0x' + p1);
    }
  ));
}

// Get the byte stream, then percent encoding, then original string.
function atou(str) {
  try {
    return decodeURIComponent(window.atob(str).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (err) {
    console.warn("* [leadfeeder] can't base64 decode: " + str);
    return 0;
  }
}

function startsWith(string, search) {
  return string.substring(0, search.length) === search;
}

function endsWith(str, suffix) {
  str = String(str);
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

// Underscore.js throttle function
// https://underscorejs.org/docs/modules/throttle.html
function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) { options = {}; }

  var later = function() {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) { context = args = null; }
  };

  var throttled = function() {
    var _now = new Date().getTime();
    if (!previous && options.leading === false) { previous = _now; }
    var remaining = wait - (_now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = _now;
      result = func.apply(context, args);
      if (!timeout) { context = args = null; }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}

/**
 * Periodically retry running the provided callback function until it returns true
 * or the total duration expires.
 * @argument {function} callback, a callback function, return false to keep retrying
 * @argument {number} retryDelay, initial retry delay in ms
 * @argument {number} intervalMultiplier, a number by which initial retry delay gets multiplied on each retry
 * @argument {number} totalDuration, total number of ms retrying is allowed to run
 **/
function periodicallyRetry(callback, retryDelay, intervalMultiplier, totalDuration) {
  retryDelay = retryDelay || 100;
  intervalMultiplier = intervalMultiplier || 1.5;
  totalDuration = totalDuration || 15000;

  var interval;
  var timeout = setTimeout(function() { clearInterval(interval); }, totalDuration);

  var retryFunction = function() {
    clearInterval(interval);
    if (callback()) {
      clearTimeout(timeout);
    }
    else {
      retryDelay = retryDelay * intervalMultiplier;
      interval = setInterval(retryFunction, retryDelay);
    }
  };
  interval = setInterval(retryFunction, retryDelay);
}

function isEmail(text) {
  return (typeof(text) === 'string' && !!text.match(/^[^@\s]+@([^@\s]+\.)+[^@\W]+$/));
}


if (globalIsReady()) {
  if (location.href === "about:srcdoc") {
    console.warn("* [leadfeeder] Embedding Leadfeeder tracker inside an iframe is not supported.");
  }

  var tracker = initTracker();
  if (tracker.enableAutoTracking !== false) {
    tracker.pageview();
  }
}
}());
