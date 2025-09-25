import { signalStoreFeature, withState } from "@ngrx/signals"
import { withCallState } from "@angular-architects/ngrx-toolkit"
import { CoreState } from "../interfaces/icore.state";

export const initialCoreState: CoreState = {
    cpus: [],
    cpu: {
        id: 0,
        name: "",
        manufacturer: "",
        function: "",
    }
}

export function with_CoreState() {
    return signalStoreFeature(
        withState(initialCoreState),
        withCallState(),
    )
}