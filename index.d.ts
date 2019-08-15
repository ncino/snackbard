import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        $snackbard: Snackbard
    }
}

type Snackbard = {
    loading(config?: SnackbardPayload): void
    show(config: SnackbardPayload): void
    cancel(config?: SnackbardPayload): void
    success(config?: SnackbardPayload): void
    error(config?: SnackbardPayload): void
}

type SnackbardPayload = {
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