import Dep from './dep'

export class Observer {
    constructor(value) {
        this.value = value
        this.dep = new Dep()

        this.walk(value)
    }


    walk(obj) {
        if(!obj || typeof obj !== 'object') {
            console.log(typeof obj);
            return
        }

        var keys = Object.keys(obj);

        for(let i = 0; i < keys.length; i++) {
            defineReactive(obj,keys[i]);
        }
        
    }

}
export function defineReactive(obj, key, val) {
    let property = Object.getOwnPropertyDescriptor(obj, key);

    if(property && property.configurable === false) {
        return 
    }
    if(!val) {
        var val = obj[key]
    }

    const dep = new Dep()

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,

        get: function() {
            //依赖添加
            if(Dep.target) {
                dep.addSub(Dep.target)
            }
            console.log(`获取${key}的数据，触发getter,值为: ${val}`)

            return val;
        },
        set: function(newVal) {
            //通知订阅者，修改数据.

            //我在想，这里为什么不把newVal顺便传过去呢，看到watcher内部的实现才知道，
            //订阅者实例内部有个get方法，收到更新通知后会先利用get方法，触发getter来获取到最新的值，然后再对新值执行操作（通知渲染函数 re-render）
            //这里并不用把newVal传过去，因为watcher实例获得新值是通过触发getter来获取的
            val = newVal
            console.log(`${key}的value修改，触发setter, 新value：${newVal}`)
            console.log("开始通知订阅者")
            dep.notify()
            
        } 
    })
}

export function observe(value) {
    var ob = new Observer(value) 

    return ob
}

