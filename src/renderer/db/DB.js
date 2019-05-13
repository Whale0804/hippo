import Vue from 'vue'
import {DB_NAME, DB_VERSION} from "../config/contants";

export default class IndexedDB {


    constructor() {
        this.database = DB_NAME;
        this.version = DB_VERSION;
        this.db = null;
        this.store = null;
    }

    callback() {
        console.log(`${this.database}, ${this.version}`)
    }

    open(table, pushErr = (err) => {
        throw new Error(err)
    }) {
        let request;
        if (window.indexedDB) {
            request = window.indexedDB.open(this.database, this.version);
            request.onerrror = (event) => {
                pushErr(event)
            }
            request.onsuccess = (event) => {
                this.db = request.result;
                Vue.prototype.$db = request.result;
                console.log('get db');
                let objectStore;
                if (this.db && !this.db.objectStoreNames.contains(table.name)) {
                    objectStore = this.db.createObjectStore(table.name, table.options)
                    table.columns.map((column) => {
                        objectStore.createIndex(column.name, column.prop, column.option);
                    })
                    console.log('success')
                }
            }
            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
                console.log('upgrade');
                let objectStore;
                if (this.db && !this.db.objectStoreNames.contains(table.name)) {
                    objectStore = this.db.createObjectStore(table.name, {
                        keyPath: 'id'
                    })
                    table.columns.map((column) => {
                        objectStore.createIndex(column.name, column.prop, column.option);
                    })
                }
            }


        }
    }


    addAll(store, table, pushErr = (err) => {
        throw new Error(err)
    }) {

        if (this.db) {
            let transaction = this.$db.transaction([table], 'readwrite');
            let objectStore = transaction.objectStore(table)
            store.map((item) => {
                let request = objectStore.put(item);
                request.onsuccess = (event) => {
                    console.log('add success');
                }
                request.onerror = (event) => {
                    pushErr(event.target.error)
                }
            })
        }

    }

    add(item, table, pushErr = (err) => {
        throw err
    }) {
        console.log(Vue.$db)
        if (this.db) {

            let transaction = this.db.transaction([table], 'readwrite');
            let objectStore = transaction.objectStore(table);
            let request = objectStore.put(item);

            request.onsuccess = (event) => {
                console.log('add success');
            }

            request.onerror = (event) => {
                pushErr(event.target.error);
            }
        }

    }

    read(i, table, pushErr = (err) => {
        throw new Error(err)
    }) {
        if (this.db) {
            var getData;
            var transaction = this.db.transaction([table]);
            var objectStore = transaction.objectStore(table);
            var request = objectStore.get(i);
            request.onerror = (event) => {
                pushErr('读取异常')
            }
            request.onsuccess = (event) => {
                if (request.result) {
                    getData = request.result
                } else {
                    pushErr('没有数据');
                }
            }
            return getData;
        }
    }


    readAll(table, pushErr = (err) => {
        throw new Error(err)
    }) {
        let getData = [];
        let objectStore = this.db.transaction(table).objectStore(table)

        objectStore.openCursor().onsuccess = (event) => {
            let cursor = event.target.result;
            if (cursor) {
                getData.push(cursor.value);
                cursor.continue();
            } else {
                console.log('没有更多数据了');
            }
        }

        return getData;

    }

    // 删除 指定行
    remove(i, table, pushErr = (err) => {
        throw new Error(err)
    }) {
        var request = this.db.transaction([table], 'readwrite').objectStore(table).delete(i);
        request.onsuccess = (event) => {
            console.log('remove success');
        }
        request.onerror = (event) => {
            pushErr('删除失败')
        }
    }

    removeAll(pushErr = (err) => {
        throw new Error(err)
    }) {
        var request = this.db.transaction(['person'], 'readwrite').objectStore('person').clear();
        request.onsuccess = (event) => {
            console.log('clear success');
        }
        request.onerror = (event) => {
            push(event.target.error);
        }
    }

    // 指定更新
    update(o, table, pushErr = (err) => {
        throw new Error(err)
    }) {
        var request = this.db.transaction([table], 'readwrite').objectStore(table)
            .put(o)

        request.onsuccess = (event) => {
            console.log('update success');
        }
        request.onerror = (event) => {
            pushErr(event)
        }
    }


}
