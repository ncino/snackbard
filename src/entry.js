// Import vue component
import snSnackbar from './snackbard.vue';
const transitionTime = 300
let openSnackbar = {}

// install function executed by Vue.use()
function install (Vue) {
  Vue.prototype.$snackbar = {
    show: (config) => {
      show(Vue, config)
    },
    loading: (config = {}) => {
      config.loading = true
      show(Vue, config)
    },
    cancel: (config = {}) => {
      if (config.text && openSnackbar.component) {
        openSnackbar.component.loading = false
        openSnackbar.component.text = config.text
        if (config.color) openSnackbar.component.color = config.color
        setTimeout(() => {
          if (openSnackbar.component) openSnackbar.component.show = false
          if (openSnackbar.id) destroy({ id: openSnackbar.id, force: true })
        }, 3000)
        destroy({ id: openSnackbar.id })
      } else {
        if (openSnackbar.component) openSnackbar.component.show = false
        if (openSnackbar.id && snackbarIsAlreadyOpen()) {
          destroy({ id: openSnackbar.id, force: true })
        }
      }
    },
    success: (config = {}) => {
      if (!config.text) config.text = 'Success!'
      config.color = 'success'
      show(Vue, config)
    },
    error: (config = {}) => {
      if (!config.text) config.text = 'Error!'
      config.color = 'error'
      show(Vue, config)
    }
  }
}

function show (Vue, config) {
  if (!snackbarIsAlreadyOpen()) {
    let snackbarDivId = '__sn_snackbar'
    let snackbarDiv = document.createElement('div')
    snackbarDiv.id = snackbarDivId
    document.body.appendChild(snackbarDiv)
    let Snackbar = Vue.extend(snSnackbar)
    let component = new Snackbar({
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
    })
    openSnackbar.id = snackbarDivId
    openSnackbar.component = component
    component.$on('close', _ => destroy({ id: snackbarDivId, force: true }))
    component.$mount(`#${snackbarDivId}`)
    if (!config.loading && config.timeout !== 0) destroy({ id: snackbarDivId, timeout: config.timeout })
  }
}

function destroy ({ id, timeout = 4000, force = false }) {
  let deleteTimeout
  if (force) deleteTimeout = transitionTime
  else if (timeout) deleteTimeout = timeout + transitionTime
  let el = document.getElementById(id)
  if (el) {
    setTimeout(() => {
      if (!('remove' in Element.prototype)) {
        if (el.parentNode) el.parentNode.removeChild(el)
      } else el.remove()
      openSnackbar = {}
    }, deleteTimeout)
  }
}

function snackbarIsAlreadyOpen () {
  return document.querySelectorAll('[id^="__sn_snackbar"]').length > 0
}

// Create module definition for Vue.use()
const plugin = {
  install,
};

// To auto-install when vue is found
/* global window global */
let GlobalVue = null;
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

// Export component by default
export default snSnackbar;

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
