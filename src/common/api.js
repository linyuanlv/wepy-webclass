import wepy from 'wepy'
import m_contacts from '../mocks/contact';
import m_history from '../mocks/history';
import m_reply from '../mocks/reply';
import global from './global';


export default {
	getMessageList () {
		let history = m_history;
		// return new Promise( (resolve,reject) => {
			let distince = [],
				rst = [],
				sorted = history.sort( (a,b) => b.time - a.time);
				sorted.forEach(v => {
					if (v.from !== 'me' && distince.indexOf(v.from) === -1) {
						distince.push(v.from);
					}
					if (v.to !== 'me' && distince.indexOf(v.to) === -1) {
						distince.push(v.to);
					}
				});
				
				distince.forEach((v) => {
					let pmsg = sorted.filter((msg) => msg.to === v || msg.from === v);
					let  lastmsg = pmsg.length ? pmsg[0].msg : '';

					rst.push({
						id: v,
						lastmsg: lastmsg,
					})
				})
				console.log(rst);
				// setTimeout(() => {
					return this.leftJoin(rst, m_contacts);
				// });
		// })
	},
	leftJoin(original, contacts) {
		let contactObj = global.getContact();
		console.log(contactObj);
        let rst = [];

        original.forEach((v) => {
            if (!v.id) {
                v.id = (v.from !== 'me') ? v.from : v.to;
            }
            if (v.id) {
                if (v.id !== 'me') {
                    v.name = contactObj[v.id].name;
                    v.icon = (wepy.env === 'web' ? './mocks/users/' : '../mocks/users/') + contactObj[v.id].id + '.png';
                }
                rst.push(v);
            }
		});
        return rst;
    },
}

 