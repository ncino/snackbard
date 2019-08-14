'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopDefault(e){return(e&&(typeof e==='object')&&'default'in e)?e['default']:e}var Vue=_interopDefault(require('vue')),Spinner=_interopDefault(require('vue-simple-spinner'));//
var script = {
  name: 'SnackbarPlugin',
  components: { Spinner: Spinner },
  extends: Vue,
  props: {
    buttonText: {
      type: String,
      required: false,
      default: 'close'
    },
    buttonColor: {
      type: String,
      required: false,
      default: 'white'
    },
    color: {
      type: String,
      required: false,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    spinnerColor: {
      type: String,
      required: false,
      default: '#ffffff'
    },
    spinnerSize: {
      type: String,
      required: false,
      default: '24'
    },
    text: {
      type: String,
      required: false,
      default: ''
    },
    timeout: {
      type: Number,
      required: false,
      default: 3000
    },
    transitionTime: {
      type: Number,
      required: true
    },
    onClick: {
      type: Function,
      required: false,
      default: function () {}
    }
  },
  data: function data () {
    return {
      show: false
    }
  },
  computed: {
    computedBackgroundColor: function computedBackgroundColor () {
      return ("background-color: " + (this.backgroundColor) + ";")
    },
    backgroundColor: function backgroundColor () {
      if (this.color === 'success') { return ' #67ac5b' }
      else if (this.color === 'error') { return '#ed5f59' }
      else if (this.color === 'warning') { return '#f7c244' }
      else if (this.color === 'info') { return '#4496ec' }
      else { return '#2c2c2c' }
    },
    computedLoadingText: function computedLoadingText () {
      if (this.text) { return this.text }
      else { return 'Loading...' }
    },
    defaultText: function defaultText () {
      if (this.loading) { return 'Loading...' }
      else { return '' }
    }
  },
  created: function created () {
    var this$1 = this;

    setTimeout(function () {
      this$1.show = true;
      if (!this$1.loading && this$1.timeout !== 0) {
        setTimeout(function () {
          this$1.show = false;
        }, this$1.timeout);
      }
    }, this.transitionTime);
  },
  methods: {
    fireClickEvent: function fireClickEvent () {
      this.show = false;
      this.onClick();
      this.$emit('close');
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;function createInjectorSSR(context) {
  if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
    context = __VUE_SSR_CONTEXT__;
  }

  if (!context) { return function () {}; }

  if (!('styles' in context)) {
    context._styles = context._styles || {};
    Object.defineProperty(context, 'styles', {
      enumerable: true,
      get: function get() {
        return context._renderStyles(context._styles);
      }
    });
    context._renderStyles = context._renderStyles || renderStyles;
  }

  return function (id, style) {
    return addStyle(id, style, context);
  };
}

function addStyle(id, css, context) {
  var group =  css.media || 'default' ;
  var style = context._styles[group] || (context._styles[group] = {
    ids: [],
    css: ''
  });

  if (!style.ids.includes(id)) {
    style.media = css.media;
    style.ids.push(id);
    var code = css.source;

    style.css += code + '\n';
  }
}

function renderStyles(styles) {
  var css = '';

  for (var key in styles) {
    var style = styles[key];
    css += '<style data-vue-ssr-id="' + Array.from(style.ids).join(' ') + '"' + (style.media ? ' media="' + style.media + '"' : '') + '>' + style.css + '</style>';
  }

  return css;
}

var server = createInjectorSSR;/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"__snackbarContainer",attrs:{"id":_vm.id}},[_c('transition-group',{attrs:{"name":"fade"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],key:("snackbar_key_" + _vm.id),staticClass:"__snackbarBox",style:(_vm.computedBackgroundColor)},[_c('div',{staticClass:"__snackbarText"},[(_vm.loading)?_c('span',[_vm._v("\n          "+_vm._s(_vm.computedLoadingText)+"\n        ")]):_c('span',[_vm._v("\n          "+_vm._s(_vm.text)+"\n        ")])]),_vm._v(" "),(_vm.loading)?_c('spinner',{attrs:{"size":_vm.spinnerSize,"line-fg-color":_vm.spinnerColor,"line-bg-color":_vm.backgroundColor,"indeterminate":""}}):_c('div',{staticClass:"__snackbarButton",style:(("color: " + _vm.buttonColor + ";")),on:{"click":function($event){return _vm.fireClickEvent()}}},[_vm._v("\n        "+_vm._s(_vm.buttonText)+"\n      ")])],1)])],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-5f299027_0", { source: "@import url(https://fonts.googleapis.com/css?family=Roboto);.__snackbarContainer[data-v-5f299027]{display:flex;flex-direction:row;justify-content:center;align-content:center;top:0;width:500px;z-index:1000;position:absolute;left:50%;margin-left:-250px;position:fixed}.__snackbarBox[data-v-5f299027]{border-radius:3px;display:inline-flex;align-items:center;min-width:250px;max-width:500px;max-height:80px;padding:14px 24px;display:grid;grid-template-columns:3fr 1fr;grid-template-rows:auto;grid-gap:24px;grid-template-areas:\"text action\";box-shadow:0 1px 10px 0 rgba(0,0,0,.75)}.__snackbarText[data-v-5f299027]{grid-area:text;color:#fff}.__snackbarButton[data-v-5f299027]{grid-area:action;text-transform:uppercase;cursor:pointer;user-select:none;text-align:center}*[data-v-5f299027]{font-family:Roboto}.fade-enter-active[data-v-5f299027],.fade-leave-active[data-v-5f299027]{transition:all .4s ease}.fade-enter[data-v-5f299027],.fade-leave-to[data-v-5f299027]{transform:translateY(-30px);opacity:0}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-5f299027";
  /* module identifier */
  var __vue_module_identifier__ = "data-v-5f299027";
  /* functional template */
  var __vue_is_functional_template__ = false;

  
  var snSnackbar = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    server
  );// Import vue component
var transitionTime = 300;
var openSnackbar = {};

// install function executed by Vue.use()
function install (Vue) {
  Vue.prototype.$snackbar = {
    show: function (config) {
      show(Vue, config);
    },
    loading: function (config) {
      if ( config === void 0 ) config = {};

      config.loading = true;
      show(Vue, config);
    },
    cancel: function (config) {
      if ( config === void 0 ) config = {};

      if (config.text && openSnackbar.component) {
        openSnackbar.component.loading = false;
        openSnackbar.component.text = config.text;
        if (config.color) { openSnackbar.component.color = config.color; }
        setTimeout(function () {
          if (openSnackbar.component) { openSnackbar.component.show = false; }
          if (openSnackbar.id) { destroy({ id: openSnackbar.id, force: true }); }
        }, 3000);
        destroy({ id: openSnackbar.id });
      } else {
        if (openSnackbar.component) { openSnackbar.component.show = false; }
        if (openSnackbar.id && snackbarIsAlreadyOpen()) {
          destroy({ id: openSnackbar.id, force: true });
        }
      }
    },
    success: function (config) {
      if ( config === void 0 ) config = {};

      if (!config.text) { config.text = 'Success!'; }
      config.color = 'success';
      show(Vue, config);
    },
    error: function (config) {
      if ( config === void 0 ) config = {};

      if (!config.text) { config.text = 'Error!'; }
      config.color = 'error';
      show(Vue, config);
    }
  };
}

function show (Vue, config) {
  if (!snackbarIsAlreadyOpen()) {
    var snackbarDivId = '__sn_snackbar';
    var snackbarDiv = document.createElement('div');
    snackbarDiv.id = snackbarDivId;
    document.body.appendChild(snackbarDiv);
    var Snackbar = Vue.extend(snSnackbar);
    var component = new Snackbar({
      propsData: {
        buttonColor: config.buttonColor,
        buttonText: config.buttonText,
        color: config.color,
        id: snackbarDivId,
        loading: config.loading,
        spinnerSize: config.spinnerSize,
        spinnerColor: config.spinnerColor,
        text: config.text,
        timeout: config.timeout,
        transitionTime: transitionTime,
        onClick: config.onClick
      }
    });
    openSnackbar.id = snackbarDivId;
    openSnackbar.component = component;
    component.$on('close', function (_) { return destroy({ id: snackbarDivId, force: true }); });
    component.$mount(("#" + snackbarDivId));
    if (!config.loading && config.timeout !== 0) { destroy({ id: snackbarDivId, timeout: config.timeout }); }
  }
}

function destroy (ref) {
  var id = ref.id;
  var timeout = ref.timeout; if ( timeout === void 0 ) timeout = 4000;
  var force = ref.force; if ( force === void 0 ) force = false;

  var deleteTimeout;
  if (force) { deleteTimeout = transitionTime; }
  else if (timeout) { deleteTimeout = timeout + transitionTime; }
  var el = document.getElementById(id);
  if (el) {
    setTimeout(function () {
      if (!('remove' in Element.prototype)) {
        if (el.parentNode) { el.parentNode.removeChild(el); }
      } else { el.remove(); }
      openSnackbar = {};
    }, deleteTimeout);
  }
}

function snackbarIsAlreadyOpen () {
  return document.querySelectorAll('[id^="__sn_snackbar"]').length > 0
}

// Create module definition for Vue.use()
var plugin = {
  install: install,
};

// To auto-install when vue is found
/* global window global */
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
snSnackbar.install = install;

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=snSnackbar;