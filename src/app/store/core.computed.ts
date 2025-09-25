import { signalStoreFeature, withComputed } from "@ngrx/signals";
import { with_CoreState } from "./core.state";
import { computed } from "@angular/core";

export function with_CoreComputed() {
    return signalStoreFeature(
        with_CoreState(),
        withComputed((store) => ({
            totalCpus: computed(() => store.cpus().length)
        }))
    )
}