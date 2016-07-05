import Ember from 'ember';

export default Ember.Component.extend({
	tagName: '',
	classNames: [],
	attributeBindings: ['style'],
	style: "width:100%",
	numberOfInvalids: 0,
	isValid: Ember.computed('numberOfInvalids', function() {
		return this.get('numberOfInvalids') === 0 ? true : false;
	}),
	isInvalid: Ember.computed('isValid', function() {
		return !this.get('isValid');
	}),
	sendToParent: Ember.on('init', Ember.observer('isValid', function() {
		if (!this.get('parentAction')) return;
		this.get('parentAction')(this.get('isValid'));
	})),
	actions: {
		onInvalid: function(status) {
			if (status || status === null) {
				this.set('numberOfInvalids', this.get('numberOfInvalids') + 1);
			} else {
				if (this.get('numberOfInvalids') === 0) return;
				this.set('numberOfInvalids', this.get('numberOfInvalids') - 1);
			}
		},
		submit: function() {
			if (this.get('parentSubmit')) {
				this.get('parentSubmit')();
			}
			this.set('isTouched', true);
			this.set('isTouched', false);
		}
	}
});