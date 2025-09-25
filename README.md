# A SignalStore Example, with [`Angular`](https://angular.dev/) v20 and [`NgRx`](https://ngrx.io/), using an Inheritance Approach

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.4.

## Project Structure

This SignalStore is built around Inheritance using [`signalStoreFeature()`](https://ngrx.io/guide/signals/signal-store/custom-store-features) from NgRx for custom SignalStore Features. By passing the State through various custom Features the Store only requires the last Link from the Inheritance Chain, making the whole Project Tree cleaner, more structured and easier to overview. The initial Setup however can be somewhat difficult and is prone to Human Errors. 

> Each File has the "to-be-used" Imports at the beginning in case of import Errors and/or not recognized Methods.

## Used Naming Conventions

For Files, 'Component Name' followed by the 'Area Name'. This Naming Convention is a partially modified Version from NgRx: 
`[componentName].[areaName].ts`

For Functions, 'with' Prefix followed by capital 'Component Name Area Name' separated by an 'underscore'. This Naming Convention is a way to mark Custom Feature Functions, make them easier to spot and more distinguishable from already integrated Functions with similar Names.
`with_[ComponentName][AreaName]()`

For Interfaces, captial "i" as Prefix. This Naming Convention is personal Preference:
`I[Interface]`

For Services, captial "s" as Prefix. This Naming Convention is personal Preference:
`S[Service]`

---

## Recommended Setup Steps

0. (Optional: Create Folders for your Interfaces and Services)

1. Install the following Dependencies, the first one, [`angular-architects/ngrx-toolkit`](https://ngrx-toolkit.angulararchitects.io/docs/with-call-state), is optional and is used for `setLoading()`, `setLoaded()` and `setError()`, the remaining ones are required to guarantee proper functionality:

```bash
        npm i @angular-architects/ngrx-toolkit
        npm i @ngrx/operators
        ng add @ngrx/signals@latest
        ng add @ngrx/store@latest
```

2. Provide the Http Client in the `providers:[]` in [`app.config.ts](src/app/app.config.ts) and create your Service

3. Create a new Folder named `store`

---

### [`state.ts`](src/app/store/core.state.ts)

        import { signalStoreFeature, withState } from "@ngrx/signals"
        import { withCallState } from "@angular-architects/ngrx-toolkit"

4. Create the `state.ts` File using your Component Name as Prefix.  
The `component.state.ts` File houses the [`initialState`](src/app/store/core.state.ts#L10#C15) of your Component Store.  
Add a new Function using `with` as Prefix, the Component Name and the File Name as Suffix. [See Convention](#recommended-setup-steps-and-used-naming-conventions)  
Now `return` a `signalStoreFeature()` to merge a Sequence of Features into a singular one.  
Add the base Feature `withState` to add your [`initalComponentState`](src/app/store/core.state.ts#L10#C15).  
(`withCallState` is optional, it's used for `setLoading()`, `setLoaded()` and `setError()`).

        export function with_ComponentState() {
            return signalStoreFunction(
                withState(initialComponentState),
                withCallState()
            )
        }

---

### [`computed.ts`](src/app/store/core.computed.ts)

        import { signalStoreFeature, withComputed } from "@ngrx/signals";
        import { computed } from "@angular/core";

5. Create the `computed.ts` File using your Component Name as Prefix.  
The `components.computed.ts` File houses all your [`computed Signals`](src/app/store/core.computed.ts#L9#C13) which should be mostly calculation Functions for things such as "total of items", since they are read-only and depend on other Signals to provide a Value.  
Add the previously created custom Feature (`with_ComponentState()`) as first Entry to the `signalStoreFeature()`.  
Add the base Feature `withComputed` and pass the `store`.  
Finally add your computed Signal Functions.

        export function with_ComponentComputed() {
            return signalStoreFeature(
                with_ComponentState(),
                withComputed((store) => ({
                    total: computed(() => store.items().length)
                }))
            )
        }

---

### [`methods.ts`](src/app/store/core.methods.ts)

        import { patchState, signalStoreFeature, withMethods, withProps } from "@ngrx/signals";
        import { setLoading, setLoaded, setError } from "@angular-architects/ngrx-toolkit";
        import { inject } from "@angular/core";
        import { tapResponse } from "@ngrx/operators";
        import { rxMethod } from "@ngrx/signals/rxjs-interop";
        import { pipe, tap, switchMap } from "rxjs";

6. Create the `methods.ts` File using your Component Name as Prefix.  
The `component.methods.ts` File houses the Methods the Application/User can use to change the States in the Store such as CRUD Operations.  
Add the previously created custom Feature (`with_ComponentComputed()`) as first Entry to the `signalStoreFeature()`.  
Optionally inject your Services in the base Feature `withProps()` to remove the need to inject them later on in `withMethods()`, which helps to achieve that cleaner look.  
Add the base Feature `withMethods()` and pass the store.  
Note that `rxMethod` from [`@ngrx/signals/rxjs-interop`](https://ngrx.io/guide/signals/rxjs-integration) always requires a Type such as `void`, `number`, `string`...  
`pipe` is used to chain the RxJS Operators such as [`tap`](https://rxjs.dev/api/operators/tap) and [`switchMap`](https://rxjs.dev/api/operators/switchMap) together.  
Using your `store` you can now access Methods from your [`service`](src/app/services/score.ts#L8#C14).  

---

### [`hooks.ts`](src/app/store/core.hooks.ts)

        import { signalStoreFeature, withHooks } from "@ngrx/signals";

7. Create the `hooks.ts` File using your Component Name as Prefix.  
The `component.hooks.ts` File lets you run additional logic which should be executed when the Store gets initialized or destroyed and provides two Methods, `onInit()` and `onDestroy()`.  
Add the previously created custom Feature (`with_ComponentMethods()`) as first Entry to the `signalStoreFeature()`.
Add the base Feature `withHooks()` and add either hook; `onInit()`, `onDestroy()` or both.  Either of them takes the `store` as Argument.  
Now to have Data initially loaded into the Store, access a previously defined get-Request through the `store` in the `onInit(store)` Function.  

        export function with_ComponentHooks() {
            return signalStoreFeature(
                with_ComponentMethods(),
                withHooks({
                    onInit(store) {
                        store.getRequest();
                    }
                })
            )
        }

---

### [`store.ts`](src/app/store/core.store.ts)

        import { signalStore } from "@ngrx/signals";

8. Finally, create the `store.ts` File using your Component Name as Prefix.  
The `component.store.ts`File is where you create your `store` with the [`signalStore`](https://ngrx.io/guide/signals/signal-store) Keyword.  
By adding `providedIn: 'root'` the Store will be made [`globally`](https://ngrx.io/guide/signals/signal-store#providing-and-injecting-the-store) available.  
Add the previously created custom Feature (`with_ComponentHooks()`) as only Entry to the `signalStoreFeature()` so the Store knows of the `initialComponentState`

        export const ComponentStore = signalStore(
            {
                providedIn: 'root'
            },
            with_ComponentHooks()
        )

---

### `.ts`

9. To be able to access the Store in html Templates, inject your Store in the according Class as follows:  

        store = inject(ComponentStore);