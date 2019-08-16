import _Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        $snackbard: SnackbardPlugin
    }
}

export declare type SnackbardPlugin = {
    loading(config?: SnackbardPayload): void
    show(config: SnackbardPayload): void
    cancel(config?: SnackbardPayload): void
    success(config?: SnackbardPayload): void
    error(config?: SnackbardPayload): void
}

declare const _default: {
    install(Vue: typeof _Vue): void
}

export declare type SnackbardPayload = {
    buttonColor?: string
    buttonText?: string
    color?: string
    loading?: boolean
    spinnerSize?: string
    spinnerColor?: string
    text?: string
    timeout?: number
    onClick?: Function
}

export default _default
