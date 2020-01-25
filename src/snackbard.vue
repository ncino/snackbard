<!-- eslint-disable -->
<template>
  <div
    :id="id"
    class="__snackbardContainer"
    :class="{ '__snackbardTop': position === 'top', '__snackbardBottom': position === 'bottom' }"
  >
    <transition-group name="fade">
      <div
        v-show="show"
        :key="`snackbard_key_${id}`"
        :style="computedBackgroundColor"
        class="__snackbardBox"
      >
        <div class="__snackbardText">
          <span v-if="loading">
            {{ computedLoadingText }}
          </span>
          <span v-else>
            {{ text }}
          </span>
        </div>
        <spinner
          v-if="loading"
          :size="spinnerSize"
          :line-fg-color="spinnerColor"
          :line-bg-color="backgroundColor"
          indeterminate
        />
        <div
          v-else
          :style="`color: ${buttonColor};`"
          class="__snackbardButton"
          @click="fireClickEvent()"
        >
          {{ buttonText }}
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import Spinner from 'vue-simple-spinner'
export default {
  name: 'Snackbard',
  components: { Spinner },
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
    position: {
      type: String,
      required: false,
      default: 'top',
      validator: function (value) {
        return ['top', 'bottom'].includes(value)
      }
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
      default: () => {}
    }
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    computedBackgroundColor () {
      return `background-color: ${this.backgroundColor};`
    },
    backgroundColor () {
      if (this.color === 'success') return ' #67ac5b'
      else if (this.color === 'error') return '#ed5f59'
      else if (this.color === 'warning') return '#f7c244'
      else if (this.color === 'info') return '#4496ec'
      else return '#2c2c2c'
    },
    computedLoadingText () {
      if (this.text) return this.text
      else return 'Loading...'
    },
    defaultText () {
      if (this.loading) return 'Loading...'
      else return ''
    }
  },
  created () {
    setTimeout(() => {
      this.show = true
      if (!this.loading && this.timeout !== 0) {
        setTimeout(() => {
          this.show = false
        }, this.timeout)
      }
    }, this.transitionTime)
  },
  methods: {
    fireClickEvent () {
      this.show = false
      this.onClick()
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');
.__snackbardContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  width: 500px;
  z-index: 1000;
  position: absolute;
  left: 50%;
  margin-left: -250px;
  position: fixed;
}
.__snackbardTop {
  top: 0px;
}
.__snackbardBottom {
  bottom: 0px;
}
.__snackbardBox {
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  min-width: 250px;
  max-width: 100vw;
  max-height: 80px;
  padding: 14px 24px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: auto;
  grid-gap: 24px;
  grid-template-areas:
    "text action";
  box-shadow: 0px 1px 10px 0px rgba(0,0,0,0.75);
}
.__snackbardText {
  grid-area: text;
  color: white;
}
.__snackbardButton {
  grid-area: action;
  text-transform: uppercase;
   cursor: pointer;
  user-select: none;
  text-align: center;
}
* {
  font-family: Roboto;
}
.fade-enter-active, .fade-leave-active {
  transition: all .4s ease;
}
.fade-enter, .fade-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
</style>
