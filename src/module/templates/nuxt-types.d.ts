import type { DefineComponent } from 'vue';
import type { RouterLinkProps } from 'vue-router/types/router';

type NuxtLinkProps = RouterLinkProps & {
    prefetch?: boolean;
    noPrefetch?: boolean;
};

export const NuxtLink: DefineComponent<NuxtLinkProps>;

// type TransitionProps<HostElement> = {
//   name?: string
//   type?: AnimationTypes
//   css?: boolean
//   duration?: number | { enter: number; leave: number }
//   // custom transition classes
//   enterClass?: string
//   enterActiveClass?: string
//   enterToClass?: string
//   appearClass?: string
//   appearActiveClass?: string
//   appearToClass?: string
//   leaveClass?: string
//   leaveActiveClass?: string
//   leaveToClass?: string

//   mode?: 'in-out' | 'out-in' | 'default'
//   appear?: boolean

//   // If true, indicates this is a transition that doesn't actually insert/remove
//   // the element, but toggles the show / hidden status instead.
//   // The transition hooks are injected, but will be skipped by the renderer.
//   // Instead, a custom directive can control the transition by calling the
//   // injected hooks (e.g. v-show).
//   persisted?: boolean

//   // Hooks. Using camel case for easier usage in render functions & JSX.
//   // In templates these can be written as @before-enter="xxx" as prop names
//   // are camelized.
//   onBeforeEnter?: Hook<(el: HostElement) => void>
//   onEnter?: Hook<(el: HostElement, done: () => void) => void>
//   onAfterEnter?: Hook<(el: HostElement) => void>
//   onEnterCancelled?: Hook<(el: HostElement) => void>
//   // leave
//   onBeforeLeave?: Hook<(el: HostElement) => void>
//   onLeave?: Hook<(el: HostElement, done: () => void) => void>
//   onAfterLeave?: Hook<(el: HostElement) => void>
//   onLeaveCancelled?: Hook<(el: HostElement) => void> // only fired in persisted mode
//   // appear
//   onBeforeAppear?: Hook<(el: HostElement) => void>
//   onAppear?: Hook<(el: HostElement, done: () => void) => void>
//   onAfterAppear?: Hook<(el: HostElement) => void>
//   onAppearCancelled?: Hook<(el: HostElement) => void>
// }

// export const Transition: DefineComponent<TransitionProps<Element>>
