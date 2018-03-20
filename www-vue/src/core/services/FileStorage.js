import Config from '../../../../api-nj/config'

const FileStorage = {
  init () {
    if (window.firebase.apps.length === 0) {
      window.firebase.initializeApp(Config.firebaseConnection)
    }
  },

  upload (imgBlob, saveTo, meta) {
    return new Promise((resolve, reject) => {
      this.init()
      const storage = window.firebase.storage().ref()
      const task = storage.child(saveTo).put(imgBlob, meta)
      task.on('state_changed',
        snapshot => {},
        err => { reject(err) },
        () => {
          if (task.snapshot.downloadURL && task.snapshot.state === 'success') {
            resolve(task.snapshot)
          } else {
            reject(task.snapshot)
          }
        }
      )
    })
  },

  remove (path) {
    const storage = window.firebase.storage().ref()
    return storage.child(path).delete()
  }
}

export default FileStorage
