import { type Entity } from "./entity"

export class EntityPromises<T extends Entity, K> {
    private toRejectOnCleanup = new WeakSet<T>()
    private promises = new Map<number, { resolve: (result: K) => void; reject: (reason: Error) => void }>()

    async new(entity: T): Promise<K> {
        this.promises.get(entity.id)?.reject(new Error("Promise was overridden by another promise"))

        if (!this.toRejectOnCleanup.has(entity)) {
            entity.onCleanup(() => {
                this.reject(entity, "Entity was destroyed")
            })

            this.toRejectOnCleanup.add(entity)
        }

        return new Promise((resolve, reject) => {
            this.promises.set(entity.id, { resolve, reject })
        })
    }

    resolve(entity: T, response: K) {
        const existing = this.promises.get(entity.id)

        if (existing) {
            // @dockfries
            // bug: does not trigger resolve of promise
            // fix: it only works if you put it in an event loop
            setTimeout(() => {
                existing.resolve(response)
            })
        }

        this.promises.delete(entity.id)
    }

    reject(entity: T, reason: string) {
        this.promises.get(entity.id)?.reject(new Error(reason))
        this.promises.delete(entity.id)
    }
}
