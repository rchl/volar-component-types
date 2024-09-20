import { DefineComponent, Transition } from 'vue';
import { ClientOnlyProps } from 'vue-client-only';
import { RouterLinkProps } from 'vue-router/types/router';

type NuxtLinkProps = RouterLinkProps & {
    prefetch?: boolean;
    noPrefetch?: boolean;
};

type NuxtLink = DefineComponent<NuxtLinkProps>;

type ClientOnly = DefineComponent<ClientOnlyProps>;

type NuxtProps = {
    keepAlive?: boolean;
    keepAliveProps?: object;
    name?: string;
    nuxtChildKey?: string;
};

type Nuxt = DefineComponent<NuxtProps>;

type NuxtChildProps = {
    keepAlive?: boolean;
    keepAliveProps?: object;
    nuxtChildKey?: string;
    [key: string]: any;
};

type NuxtChild = DefineComponent<NuxtChildProps>;

declare module 'vue' {
    export interface GlobalComponents {
        ClientOnly: ClientOnly;
        Nuxt: Nuxt;
        NuxtChild: NuxtChild;
        NuxtLink: NuxtLink;
        Transition: typeof Transition;
        LazyClientOnly: ClientOnly;
        LazyNuxt: Nuxt;
        LazyNuxtChild: NuxtChild;
        LazyNuxtLink: NuxtLink;
        LazyTransition: typeof Transition;
    }
}
