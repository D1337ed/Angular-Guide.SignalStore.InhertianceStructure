import { with_CoreComputed } from "./core.computed";
import { inject } from "@angular/core";
import { SCore } from "../services/score";
import { patchState, signalStoreFeature, withMethods, withProps } from "@ngrx/signals";
import { setLoading, setLoaded, setError } from "@angular-architects/ngrx-toolkit";
import { tapResponse } from "@ngrx/operators";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, tap, switchMap } from "rxjs";
import { ICore } from "../interfaces/icore";

export function with_CoreMethods() {
    return signalStoreFeature(
        with_CoreComputed(),
        withProps(() => ({
            s_Core: inject(SCore)
        })),
        withMethods((store) => ({
            getAll: rxMethod<void>(
                pipe(
                    tap(() => setLoading()),
                    switchMap(() => {
                        return store.s_Core.getAll().pipe(
                            tapResponse({
                                next: (cpus) => patchState(store, { cpus: cpus }),
                                error: (err) => patchState(store, setError(err)),
                                finalize: () => setLoaded()
                            })
                        )
                    })
                )
            ),
            get: rxMethod<number>(
                pipe(
                    tap(() => setLoading()),
                    switchMap((cpuId: number) => {
                        return store.s_Core.get(cpuId).pipe(
                            tapResponse({
                                next: (cpu) => patchState(store, { cpu: cpu }),
                                error: (err) => patchState(store, setError(err)),
                                finalize: () => setLoaded()
                            })
                        )
                    })
                )
            ),
            create: rxMethod<ICore>(
                pipe(
                    tap(() => setLoading()),
                    switchMap((cpu: ICore) => {
                        return store.s_Core.create(cpu).pipe(
                            tapResponse({
                                next: () => patchState(store, { cpu }),
                                error: (err) => patchState(store, setError(err)),
                                finalize: () => setLoaded()
                            })
                        )
                    })
                )
            ),
            update: rxMethod<ICore>(
                pipe(
                    tap(() => setLoading()),
                    switchMap((patch: ICore) => {
                        return store.s_Core.update(patch).pipe(
                            tapResponse({
                                next: () => patchState(store, { cpu: patch }),
                                error: (err) => patchState(store, setError(err)),
                                finalize: () => setLoaded()
                            })
                        )
                    })
                )
            ),
            delete: rxMethod<number>(
                pipe(
                    tap(() => setLoading()),
                    switchMap((cpuId: number) => {
                        return store.s_Core.delete(cpuId).pipe(
                            tapResponse({
                                next: () => patchState(store, {}),
                                error: (err) => patchState(store, setError(err)),
                                finalize: () => setLoaded()
                            })
                        )
                    })
                )
            )
        }))
    )
}