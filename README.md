# Snackbard
[![npm version](https://badge.fury.io/js/snackbard.svg)](https://badge.fury.io/js/snackbard)
[![Monthly Downloads](https://img.shields.io/npm/dm/snackbard.svg)](https://www.npmjs.com/package/snackbard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)



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

No need to know your iambs from your trochees to use this simple Vue plugin. After installing `snackbard`, you will have a global `$snackbard` prototype available in your script with which to programmatically manage a material-themed snackbar.

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

import Snackbard from 'snackbard' // import snackbard
Vue.use(Snackbard) // tell Vue to use it

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

## Usage

The `$snackbard` prototype is built on 4 basic methods:

```
$snackbard.show(payload)

$snackbard.loading() // with an optional payload, see below

$snackbard.cancel() // with an optional payload, see below

$snackbard.success() // again, payload optional

$snackbard.error() // payload optional
```

Let's go over each method in greater detail.

### `$snackbard.show(payload)`

| Key Value    	|                                                                                                                                                                                       Description                                                                                                                                                                                      	| Default  	| Accepted Type                                                                                   	|
|--------------	|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:	|----------	|-------------------------------------------------------------------------------------------------	|
| buttonColor  	| This is the color that the text of the button will appear as. The "button" is always text.                                                                                                                                                                                                                                                                                             	| white    	| String (hex values or any of the 140 supported color names)                                     	|
| buttonText   	| This is the text of the button on the right hand side of the snackbar. The button is confined to a certain space, so longer buttonText values will wrap on to a new line. Also, the button will always be text-transformed to upper-case.                                                                                                                                              	| CLOSE    	| String                                                                                          	|
| color        	| The color of the background of the snackbar. This can be one of four predetermined colors: error, success, info,,or warning, or a custom hex string                                                                                                                                                                                                                                    	| #2c2c2c  	| String (hex values, 140 supported color names, or 4 predetermined colors described to the left) 	|
| loading      	| A boolean meaning whether or not an indeterminate spinning circle should be shown in the place of a button. Important: when this boolean is set to true, the snackbar will never timeout. It must be cancelled in the code in order for it to be dismissed.                                                                                                                            	| false    	| Boolean                                                                                         	|
| position      | The position of the snack bar. Only top and bottom are supported.                                                                                                                                                                                                                                                                                                                       | 'top'     | String ('top' or 'bottom')                                                                        |
| spinnerSize  	| The size of the diameter of the loading circle. This value does nothing if the loading value is false.                                                                                                                                                                                                                                                                                 	| 24       	| String | Number                                                                                 	|
| spinnerColor 	| The color of the loading circle. This value does nothing if the loading value is false.                                                                                                                                                                                                                                                                                                	| #ffffff  	| String (hex value, 140 supported color names)                                                   	|
| text         	| This is the text that will appear in the snackbar. There is no limit to how long it can be, but the maximum width of the entire snackbar is 500px so anything beyond that will wrap around onto a new line.                                                                                                                                                                            	| ''       	| String                                                                                          	|
| timeout      	| A number in milliseconds that the snackbar will persist before it will self-dismiss. Important: set this value to 0 if you want the snackbar to persist indefinitely (until the user closes it).                                                                                                                                                                                       	| 3000     	| Number (milliseconds)                                                                           	|
| onClick      	| The method that should be run when the button on the snackbar is pressed. Clicking this button will always dismiss the snackbar in addition to whatever other action you mandate it to perform. Remember: If you are passing in a predefined method, you must wrap that method in a parent method otherwise the method will be called whenever the object is examined. Examples below. 	| () => {} 	| Function                                                                                        	|


```
doSomeSuperForbiddenThing () {
	if (personIsAwesome) {
		this.$snackbard.show({ text: 'Congratulations! You are awesome. Enjoy this 10 second appreciation of your awesomeness', color: 'success', buttonText: 'OK!', timeout: 10000 })
	} else if (!personIsAwesome) {
		this.$snackbard.show({ text: 'You are not awesome. Admit it, and then learn how to become awesome.', color: 'error', buttonText: 'teach me', onClick: () => { this.teachUser() }, timeout: 0 })
	}
}
teachUser () {
	this.teachUserHowToBeAwesomeDialog = true
}
```

The above information should be most of what you need to know in order to operate the plugin. The following methods are subsets of that method made available for convenience.

### `snackbard.loading()`

This method is a quick and easy way to display a loading snackbar with default text (Loading...) and a spinner. Programatically, the following two expressions are identical:

```
this.$snackbard.loading() === this.$snackbard.show({ text: 'Loading...', loading: true })
```

If you are satisfied with default, then you can simply call this.$snackbard.loading() to display it.

However, you can modify the loading snackbar with any of the above parameters in a payload. For example, if you wanted to change the text that is displayed when loading, you would run:

```
$snackbard.loading({ text: 'Fetching your info...' })
```

Or, if you wanted to keep the default text, but wanted the spinner to be larger and the background color to be different, you would run:

```
$snackbard.loading({ spinnerSize: 50, color: 'darkgrey' })
```

Important notes:

* When you call loading, the timeout parameter is nullified. Setting loading = true will override any value you pass in for timeout. As such...
* Loading snackbars must always be manually closed programmatically using this.$snackbard.cancel()


### `snackbard.cancel()`

The purpose of this method is to cancel a loading snackbar that is called earlier in the code. An example of what this would look like is as follows:

```
created () {
	this.$snackbard.loading()
	this.$axios.get('/some/info/from/api').then(response => {
		this.$snackbard.cancel()
		this.foo = response.data.foo
		this.bar = response.data.bar
	})
}
```

There might be times when you want to notify the user after their information is done loading. In these instances, you can pass the text parameter into an optional payload, along with a color parameter, and when the loading is complete, the information in the snackbar will change to show the color and text provided, and then the snackbar will self-dismiss after the default 3000 milliseconds.

For example, in addition to code above, if you wanted to notify the user that there was actually an error downloading your information, you might add something like this:

```
	this.$snackbard.loading()
	this.$axios.get('/some/info/from/api').then(response => {
		this.$snackbard.cancel()
		this.foo = response.data.foo
		this.bar = response.data.bar
	}).catch(err => {
		this.$snackbard.cancel({ text: 'There was a problem getting your info!', color: 'error' })
		console.log(err)
	})
}
```

Important notes:

* The only parameters you can pass to a $snackbard.cancel payload are text and color, all others will be ignored.

### `$snackbard.success()`

```
$snackbard.success() === $snackbard.show({ text: 'Success!', color: 'success' })
```

### `$snackbard.error()`

```
$snackbard.error() === $snackbard.show({ text: 'Error!', color: 'error' })
```

## Gotchas

### `onClick()`
parameter
As mentioned above, you should not pass a predefined method directly as a value for this parameter. Doing so will cause that method to be run whenever the payload object is used at all. Instead, you should wrap it in a parent method.

For example, this will cause unexpected results:

```

created () {
	this.$snackbard.show({ text: 'Click here for more info.', buttonText: 'INFO', onClick: this.showMoreInfo() })
}
methods: {
	showMoreInfo () {
		console.log('These are not the droids you\'re looking for')
	}
}
```

Instead, you should pass the method in as such:

```

created () {
	this.$snackbard.show({ text: 'Click here for more info.', buttonText: 'INFO', onClick: () => { this.showMoreInfo() } })
}
methods: {
	showMoreInfo () {
		console.log('These are not the droids you\'re looking for')
	}
}
```

## Contributing

An informal list of things that need to be done:

* Write tests & integrate with TravisCI
* The plugin currently has one dependency -- the loading spinner. I'd love to build that out natively and remove all dependencies.
* Clean up design a little bit


## Author

Hi, that's me, Josh Menden. Feel free to reach out to me with any questions.

## Contributors

* Bryan Muller
* David DeGraw
