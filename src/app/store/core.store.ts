import { signalStore } from "@ngrx/signals";
import { with_CoreHooks } from "./core.hooks";

export const CoreStore = signalStore(
    {
        providedIn: 'root'
    },
    with_CoreHooks()
)