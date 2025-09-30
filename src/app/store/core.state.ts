import { signalStoreFeature, withState } from "@ngrx/signals"
import { withCallState } from "@angular-architects/ngrx-toolkit"
import { ICore } from "../interfaces/icore";

export interface ICoreState {
    cpus: ICore[],
    cpu: ICore,
}

export const initialCoreState: ICoreState = {
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
        withCallState({ collection: 'cpus' }),
    )
}