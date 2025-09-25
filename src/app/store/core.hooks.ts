import { signalStoreFeature, withHooks } from "@ngrx/signals";
import { with_CoreMethods } from "./core.methods";

export function with_CoreHooks() {
    return signalStoreFeature(
        with_CoreMethods(),
        withHooks({
            onInit(store) {
                store.getAll();
            }
        })
    )
}