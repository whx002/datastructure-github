

function Promise(executor) {
    let self = this
    this.PromiseState = 'pending'
    this.PromiseResult = ''
    this.callback = [];
    function resolve(value) {
        if (self.PromiseState !== 'pending') return
        self.PromiseState = 'fulfilled'
        self.PromiseResult = value
        self.callback.forEach(item => {
            item.onResolved(value)
        })
    }
    function reject(reason) {
        if (self.PromiseState !== 'pending') return
        self.PromiseState = 'rejected'
        self.PromiseResult = reason
        self.callback.forEach(item => {
            item.onRjected(reason)
        })
    }
    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error)
    }

}



Promise.prototype.then = function (onResolved, onRjected) {
    if (typeof onRjected !== 'function') {
        onRjected = reason => {
            throw reason
        }
    }

    if (typeof onResolved !== 'function') {
        onRjected = value => {
            return value
        }
    }
    return new Promise((resolve, reject) => {
        if (this.PromiseState === 'fulfilled') {
            try {
                let result = onResolved(this.PromiseResult)
                if (result instanceof Promise) {
                    result.then(resolve, reject)
                } else {
                    resolve(vaule)
                }
            } catch (error) {
                reject(error)
            }

        }a
        if (this.PromiseState === 'rejected') {
            try {
                let result = onRjected(this.PromiseResult)
                if (result instanceof Promise) {
                    result.then(resolve, reject)
                } else {
                    resolve(reson)
                }
            } catch (error) {
                reject(error)
            }

        }
        if (this.PromiseState === "pending") {
            this.callback.push({
                onResolved: function (value) {
                    try {
                        let result = onResolved(value)
                        if (result instanceof Promise) {
                            result.then(resolve, reject)
                        } else {
                            resolve(vaule)
                        }
                    } catch (error) {
                        reject(error)
                    }
                },
                onRjected: function (reson) {
                    try {
                        let result = onRjected(reson)
                        if (result instanceof Promise) {
                            result.then(resolve, reject)
                        } else {
                            resolve(reson)
                        }
                    } catch (error) {
                        reject(error)
                    }

                }
            })
        }
    })

}
Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
}