import { DefineComponent, Transition } from 'vue';
import { ClientOnlyProps } from 'vue-client-only';
import { RouterLinkProps } from 'vue-router/types/router';

export { Transition };

type NuxtLinkProps = RouterLinkProps & {
    prefetch?: boolean;
    noPrefetch?: boolean;
};

export const NuxtLink: DefineComponent<NuxtLinkProps>;

export const ClientOnly: DefineComponent<ClientOnlyProps>;

type NuxtProps = {
    keepAlive?: boolean;
    keepAliveProps?: object;
    name?: string;
    nuxtChildKey?: string;
};

export const Nuxt: DefineComponent<NuxtProps>;

type NuxtChildProps = {
    keepAlive?: boolean;
    keepAliveProps?: object;
    nuxtChildKey?: string;
    [key: string]: any;
};

export const NuxtChild: DefineComponent<NuxtChildProps>;
