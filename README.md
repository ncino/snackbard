# Snackbard

<p align="center">
  To share the briefest messages with all,<br>
  We introduce a plugin to be used.<br>
  Just simply ask The Bard your words to scrawl,<br>
  and none shall be mistaken or confused.<br>
</p>

<p align="center">
  <image src="https://github.com/SimpleNexus/snackbard/blob/master/assets/shakespeare-200w.jpg" alt="shakespeare" width=""/>
</p>

## Description

No need to know your iambs from your trochees to use this simple Vue plugin. After installing `snackbard`, you will have a global `$snackbard` prototype available in your script with which to manage a material-themed snackbar.

Here are a few examples to show how simple it is to use:
```
this.$snackbard.loading()
this.$snackbard.cancel()
this.$snackbard.success()
this.$snackbard.cancel()
this.$snackbard.show({ text: 'Heigh ho!' })
```

## Install

`npm install snackbard`, or `yarn add snackbard`

Then, copy the pattern in this example `main.js`:

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

import snackbard from 'snackbard' // import snackbard
Vue.use(snackbard) // tell Vue to use it

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

## Usage

The `$snackbar` prototype is built on 4 basic methods:

```
$snackbar.show(payload)

$snackbar.loading() // with an optional payload, see below

$snackbar.cancel() // with an optional payload, see below

$snackbar.success() // again, payload optional

$snackbar.error() // payload optional
```

Let's go over each method in greater detail.

### `$snackbar.show(payload)`

| Key Value    	|                                                                                                                                                                                       Description                                                                                                                                                                                      	| Default  	| Accepted Type                                                                                   	|
|--------------	|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:	|----------	|-------------------------------------------------------------------------------------------------	|
| buttonColor  	| This is the color that the text of the button will appear as. The "button" is always text.                                                                                                                                                                                                                                                                                             	| white    	| String (hex values or any of the 140 supported color names)                                     	|
| buttonText   	| This is the text of the button on the right hand side of the snackbar. The button is confined to a certain space, so longer buttonText values will wrap on to a new line. Also, the button will always be text-transformed to upper-case.                                                                                                                                              	| CLOSE    	| String                                                                                          	|
| color        	| The color of the background of the snackbar. This can be one of four predetermined colors: error, success, info,,or warning, or a custom hex string                                                                                                                                                                                                                                    	| #2c2c2c  	| String (hex values, 140 supported color names, or 4 predetermined colors described to the left) 	|
| loading      	| A boolean meaning whether or not an indeterminate spinning circle should be shown in the place of a button. Important: when this boolean is set to true, the snackbar will never timeout. It must be cancelled in the code in order for it to be dismissed.                                                                                                                            	| false    	| Boolean                                                                                         	|
| spinnerSize  	| The size of the diameter of the loading circle. This value does nothing if the loading value is false.                                                                                                                                                                                                                                                                                 	| 24       	| String | Number                                                                                 	|
| spinnerColor 	| The color of the loading circle. This value does nothing if the loading value is false.                                                                                                                                                                                                                                                                                                	| #ffffff  	| String (hex value, 140 supported color names)                                                   	|
| text         	| This is the text that will appear in the snackbar. There is no limit to how long it can be, but the maximum width of the entire snackbar is 500px so anything beyond that will wrap around onto a new line.                                                                                                                                                                            	| ''       	| String                                                                                          	|
| timeout      	| A number in milliseconds that the snackbar will persist before it will self-dismiss. Important: set this value to 0 if you want the snackbar to persist indefinitely (until the user closes it).                                                                                                                                                                                       	| 3000     	| Number (milliseconds)                                                                           	|
| onClick      	| The method that should be run when the button on the snackbar is pressed. Clicking this button will always dismiss the snackbar in addition to whatever other action you mandate it to perform. Remember: If you are passing in a predefined method, you must wrap that method in a parent method otherwise the method will be called whenever the object is examined. Examples below. 	| () => {} 	| Function                                                                                        	|


```
doSomeSuperForbiddenThing () {
	if (personIsAwesome) {
		this.$snackbar.show({ text: 'Congratulations! You are awesome. Enjoy this 10 second appreciation of your awesomeness', color: 'success', buttonText: 'OK!', timeout: 10000 })
	} else if (!personIsAwesome) {
		this.$snackbar.show({ text: 'You are not awesome. Admit it, and then learn how to become awesome.', color: 'error', buttonText: 'teach me', onClick: () => { this.teachUser() }, timeout: 0 })
	}
}
teachUser () {
	this.teachUserHowToBeAwesomeDialog = true
}
```
