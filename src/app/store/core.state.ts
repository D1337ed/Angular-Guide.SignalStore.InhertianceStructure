import { ICore } from "../interfaces/icore";
import { signalStoreFeature, withState } from "@ngrx/signals"
import { withCallState } from "@angular-architects/ngrx-toolkit"

export interface CoreState {
    cpus: ICore[],
    cpu: ICore,
}

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