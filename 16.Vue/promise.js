const request = require('request')

// class Promise {
//   constructor(exec) {
//     this.state = 'pending'
//     this.value = undefined
//     this.reason = undefined
//     this.onResolvedCallbacks = []
//     this.onRejectedCallbacks = []

//     const resolve = value => {
//       if (this.state === 'pending') {
//         this.state = 'fulfilled'
//         this.value = value
//         this.onResolvedCallbacks.forEach(fn => fn())
//       }
//     }
//     const reject = reason => {
//       if (this.state === 'pending') {
//         this.state = 'rejected'
//         this.reason = reason
//         onRejectedCallbacks.forEach(fn => fn())
//       }
//     }
//     exec(resolve, reject)
//   }

//   then(onFulfilled, onRejected) {
//     return new Promise((resolve, reject) => {
//       if (this.state === 'fulfilled') {
//         this.onResolvedCallbacks.forEach(fn => {
//           fn(this.value)
//         })
//       }
//       if (this.state === 'rejected') {
//         this.onRejectedCallbacks.forEach(fn => {
//           fn(this.reason)
//         })
//       }
//       if (this.state === 'pending') {
//         this.onResolvedCallbacks.push(() => {
//           onFulfilled(this.value)
//         })
//         this.onRejectedCallbacks.push(() => {
//           onRejected(this.reason)
//         })
//       }
//     })
//   }
// }

class Promise{
  constructor(exector){
      this.state = 'pending';
      this.value = undefined;
      this.reason = undefined;
      this.onResolvedCallbacks = [];
      this.onRejectedCallbacks = [];

      const resolve = value => {
          if(this.state === 'pending'){
              this.state = 'resolved';
              this.value = value;
              this.onResolvedCallbacks.forEach(fn=>fn())
          }
      }

      const reject = reason => {
          if(this.state === 'pending'){
              this.state = 'rejected';
              this.reason = reason;
              this.onRejectedCallbacks.forEach(fn=>fn())
          }
      }
      exector(resolve, reject);
  }
  then(onFulfilled, onRejected){
      if(this.state === 'resolved'){
          onFulfilled(this.value)
      }
      if(this.state === 'rejected'){
          onRejected(this.reason)
      }
      if(this.state === 'pending'){
          this.onResolvedCallbacks.push(()=>{
              onFulfilled(this.value)
          })
          this.onRejectedCallbacks.push(()=>{
              onRejected(this.reason)
          })
      }
  }
}

const promise = new Promise((resolve, reject) => {
  request('http://localhost:3000/promise', function(err, response, body) {
    resolve(body)
  })
})

promise.then(data => {
  console.log(data)
})
