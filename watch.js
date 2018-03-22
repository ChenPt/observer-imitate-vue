import Dep from './dep'

export default class Watcher {
    constructor(vm, exp, cb) {
        this.vm = vm
        this.exp = exp
        this.cb = cb
        this.value = this.get()
    }

    update() {
        console.log('订阅者里的update操作.');
        this.run()
    }

    //用来触发getter获取到最新的新值.
    get() {
        Dep.target = this
        let value = this.vm[this.exp] //触发key的getter，将自己添加为订阅者.
        //添加完后
        Dep.target = null;

        return value;

    }

    run() {
        let value = this.get()
        console.log('run: ', value)
        let oldVal = this.value

        if(oldVal !== value) {
            this.value = value
            this.cb.call(this.vm, value, oldVal)
            console.log("执行完毕回调");
        }
    }
}