let uid = 0;  // unique Id

export default class Dep {
    
    constructor() {
        this.subs = []
        this.id = uid++
    }

    addSub(watcher) {
        this.subs.push(watcher)
    }

    notify() {
        //通知watcher，数据已经改变了.调用watcher内的update方法
        //获取一个subs sample，防止修改当前实例的subs实例。
        const subs = this.subs.slice() 

        for(let i = 0; i < subs.length; i++) {
            subs[i].update()
        }
        console.log(`Dep${this.id} 已经通知完所有订阅者${subs}`)
    }
}

Dep.target = null;