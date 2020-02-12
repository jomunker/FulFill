// import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage';
// import { Plugins } from '@capacitor/core';
// import { LocalNotificationScheduleResult} from '@capacitor/core';
// const { LocalNotifications } = Plugins;

// LocalNotifications.schedule({
//   notifications: [
//     {
//       title: "Title",
//       body: "Body",
//       id: 1,
//       schedule: { at: new Date(Date.now() + 1000 * 5) },
//       sound: null,
//       attachments: null,
//       actionTypeId: "",
//       extra: null
//     }
//   ]
// });

// @Injectable({
//   providedIn: 'root'
// })
// export class PreferencesService {

//   notifs: LocalNotificationScheduleResult;
//   pendingNotifs: LocalNotificationScheduleResult;

//   constructor() {
//   }

//   async init() {
//     await Plugins.LocalNotifications.requestPermissions();

//     try {
//       Plugins.LocalNotifications.registerActionTypes({
//         types: [
//           {
//             id: 'OPEN_PRODUCT',
//             actions: [
//               {
//                 id: 'view',
//                 title: 'Product'
//               }, {
//                 id: 'remove', title: 'Remove', destructive: true
//               },
//               {
//                 id: 'response',
//                 title: 'Response',
//                 input: true
//               }
//             ]
//           }
//         ]
//       });

//       Plugins.LocalNotifications.addListener('localNotificationReceived', (notification) => {
//         console.log('Notification: ', notification);
//       })

//       Plugins.LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
//         console.log('Notification action performed', notification);
//       });

//     } catch(e) {
//       console.log(e);
//     }

//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad LocalNotificationsPage');
//   }

//   async scheduleNow() {
//     this.notifs = await Plugins.LocalNotifications.schedule({
//       notifications: [{
//         title: '',
//         body: '',
//         // Get random id to test cancel
//         id: Math.floor(Math.random()*10),
//         sound: 'beep.aiff',
//         attachments: [
//           { id: 'face', url: 'res://public/assets/ionitron.png' }
//         ],
//         actionTypeId: 'OPEN_PRODUCT',
//         extra: {
//           productId: 'PRODUCT-1'
//         }
//       }]
//     });
//   }

//   async scheduleNowWithIcon() {
//     this.notifs = await Plugins.LocalNotifications.schedule({
//       notifications: [{
//         title: '',
//         body: '',
//         // Android-only: set a custom statusbar icon 
//         smallIcon: "res://ic_stat_icon_sample",
//         // Get random id to test cancel
//         id: Math.floor(Math.random()*10),
//         sound: 'beep.aiff',
//         attachments: [
//           { id: 'face', url: 'res://public/assets/ionitron.png' }
//         ],
//         actionTypeId: 'OPEN_PRODUCT',
//         extra: {
//           productId: 'PRODUCT-1'
//         }
//       }]
//     });
//   }

//   async scheduleOnce(time, title, content) {
//     // var now = new Date();
//     this.notifs = await Plugins.LocalNotifications.schedule({
//       notifications: [{
//         title: title,
//         body: content,
//         // Get random id to test cancel
//         id: Math.floor(Math.random()*10),
//         sound: 'beep.aiff',
//         attachments: [
//           { id: 'face', url: 'res://public/assets/ionitron.png' }
//         ],
//         schedule: {
//           at: time
//         },
//         actionTypeId: 'OPEN_PRODUCT',
//         extra: {
//           productId: 'PRODUCT-1'
//         }
//       }]
//     });
//   }

//   async scheduleRepeatingOn() {
//     var now = new Date();
//     this.notifs = await Plugins.LocalNotifications.schedule({
//       notifications: [{
//         title: '',
//         body: '',
//         id: 2,
//         schedule: {
//           on: {
//             minute: new Date().getUTCMinutes()+1
//           }
//         }
//       }]
//     });
//   }

//   async scheduleRepeatingEvery() {
//     var now = new Date();
//     this.notifs = await Plugins.LocalNotifications.schedule({
//       notifications: [{
//         title: '',
//         body: '',
//         id: 3,
//         schedule: {
//           every: 'minute'
//         }
//       }]
//     });
//   }

//   async scheduleRepeatingEveryWithValue(value: number) {
//     this.notifs = await Plugins.LocalNotifications.schedule({
//       notifications: [{
//         title: 'Happy Holidays! Last couple minutes.',
//         body: 'Swipe to learn more',
//         id: 4,
//         schedule: {
//           every: 'minute',
//           count: value
//         }
//       }]
//     });
//   }

//   cancelNotification() {
//     this.pendingNotifs && Plugins.LocalNotifications.cancel(this.pendingNotifs);
//   }

//   async getPending() {
//     this.pendingNotifs = await Plugins.LocalNotifications.getPending();
//     console.log('PENDING', this.pendingNotifs);
//   }

//   toJson(o: any) {
//     return JSON.stringify(o, null, 2);
//   }

// // LocalNotifications.schedule({
// //   notifications: [
// //     {
// //       title: "Title",
// //       body: "Body",
// //       id: 1,
// //       schedule: { at: new Date(Date.now() + 1000 * 5) },
// //       sound: null,
// //       attachments: null,
// //       actionTypeId: "",
// //       extra: null
// //     }
// //   ]
// // });
// }

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Plugins } from '@capacitor/core';
import { LocalNotificationScheduleResult } from '@capacitor/core';
const { LocalNotifications } = Plugins;

@Injectable({
    providedIn: 'root'
})
export class PreferencesService {

    public isActive = false;

    public taskName = 'Journal';

    public sceduledTime = '16:22';

    public loaded: boolean = false;


    notifs: LocalNotificationScheduleResult;
    pendingNotifs: LocalNotificationScheduleResult;

    constructor(public storage: Storage) {
    }

    load(): Promise<boolean> {
        return new Promise((resolve) => {
            this.storage.get('isActive');
            this.storage.get('notifs');
            this.storage.get('pendingNotifs');
            this.storage.get('taskName');
            this.loaded = true;
            resolve(true);
        });
    }


    loadName(): Promise<boolean> {

        return new Promise((resolve) => {

            this.storage.get('taskName').then((taskName) => {

                if (taskName != null) {
                    this.taskName = this.taskName;
                }
                this.loaded = true;
                resolve(true);

            });
        });
    }


    save(): void {
        this.storage.set('sceduledTime', this.sceduledTime);
        this.storage.set('isActive', this.isActive);
        this.storage.set('notifs', this.notifs);
        this.storage.set('pendingNotifs', this.pendingNotifs);
        this.storage.set('taskName', this.taskName);

    }

    changeName(name) {
        this.taskName = name;
        this.storage.set('name', this.taskName);
    }

    saveName(): void {
        this.storage.set('taskName', this.taskName);
    }

    getHour() {
        let h = this.sceduledTime.split(':');
        return parseInt(h[0]);
    }

    getMinutes() {
        let m = this.sceduledTime.split(':');
        return parseInt(m[1]);
    }

    async dailyNotification() {
        console.log('Daily Notification was set to ' + this.sceduledTime)
        this.notifs = await Plugins.LocalNotifications.schedule({
            notifications: [
                {
                    title: "This Should be a daily notification",
                    body: "Body",
                    id: 3,
                    schedule: {
                        on: {
                            hour: this.getHour(),
                            minute: this.getMinutes()
                        }
                    },
                    sound: null,
                    attachments: null,
                    actionTypeId: "",
                    extra: null
                }
            ]
        });
        this.save();
    }

    cancelNotification() {
        this.pendingNotifs && Plugins.LocalNotifications.cancel(this.pendingNotifs);
        // console.log('Notification was canceled');
        this.save();
    }

    async getPending() {
        this.pendingNotifs = await Plugins.LocalNotifications.getPending();
        console.log('PENDING', this.pendingNotifs);
    }

    toggleChanged(eve) {
        if (this.isActive) {
            this.dailyNotification();
        }
        else if (!this.isActive) {
            this.cancelNotification();
        }
    }

    timeChanged(eve) {
        this.dailyNotification();
    }

}
