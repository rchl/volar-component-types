import type { DefineComponent } from 'vue';
import type { RouterLinkProps } from 'vue-router/types/router';

export type NuxtLinkProps = RouterLinkProps & {
    prefetch?: boolean;
    noPrefetch?: boolean;
};

export const _default: DefineComponent<NuxtLinkProps>;
export default _default
