import wepy from 'wepy'
import m_contacts from '../mocks/contact';
import m_history from '../mocks/history';
import m_reply from '../mocks/reply';


export default {
	getMessageList () {
		let history = m_history;
		return new Promise( (resolve,reject) => {
			let distince = [],
				rst = [],
				sorted = history.sort( (a,b) => b.time - a.time);
				console.log(sorted);
				resolve(sorted);
		})
	}
}

 