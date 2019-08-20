import Vue from 'vue';

import Snackbard, {SnackbardPayload} from '../index';

Vue.use(Snackbard);

const App = Vue.extend({
    created(): void {
        const options: SnackbardPayload = {
            buttonColor: 'green',
            buttonText: 'Hello World!',
            color: 'green',
            loading: false,
            spinnerSize: '34px',
            spinnerColor: 'green',
            text: 'Hello World!',
            timeout: 3000,
            onClick: () => null
        };
        this.$snackbard.success();
        this.$snackbard.cancel();
        this.$snackbard.error();
        this.$snackbard.loading();
        this.$snackbard.show(options);
    }
});


new Vue({
    el: '#app',
    render: h => h(App)
});

