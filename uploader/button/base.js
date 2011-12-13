/**
 * @fileoverview �ļ��ϴ���ť
 * @author ��Ӣ(����)<daxingplay@gmail.com>, ��ƽ(����)<minghe36@126.com>
 */
KISSY.add('upload-btn', function(S, Node, Base){
	
	var $ = Node.all,
		EMPTY = '',
		LOG_PRE = '[AjaxUploader-Button] ';
	
	/**
	 * �ļ��ϴ���ť
	 * @class Button
	 * @constructor
	 * @param {Object} config ���ö���
	 */
	function Button(config){
		var self = this;
		
		self.config = S.mix({
			'type': 'html'
		}, config);
		
		var	module = self.config.type;
		if(S.inArray(module, ['html', 'flash'])){
			// self.set('target', self.config.target);
			// self.target = $(self.config.target);
			S.use(module + '-button', function(S, Mod){
				// inst = new Mod(config);
				// self.set('instance', new Mod(config));
				self.instance = new Mod(self.config);
				S.log(LOG_PRE + 'Button loaded. Type: ' + module);
			});
			self.render();
		}else{
			S.log(LOG_PRE + 'button type does not exists.');
		}
	}
	
	S.mix(Button, {
		'event': {
			'beforeShow': 'beforeShow',
        	'afterShow': 'afterShow',
        	'beforeHide': 'beforeHide',
        	'afterHide': 'afterHide',
        	'change' : 'change'
		}
	})
	
	S.extend(Button, Base, {
		/**
		 * ��Ⱦ��ť
		 */
		render: function(){
			var self = this,
				inst = self.instance;
			inst._render();
			// self._createUrlsInput();
		},
		/**
		 * ��ʾ��ť
		 */
		show: function(){
			
		},
		/**
		 * ���ذ�ť
		 */
		hide: function(){
			
		}
		
	}, {
		ATTRS: {
			/**
			 * �������͵�Buttonʵ��
			 * @type Object
			 */
			// instance: {
				// value: null
			// },
			/**
			 * 
			 */
			// target: {
				// value: null,
				// setter: function(v){
					// if(S.isString(v)){
						// return $(v);
					// }
				// }
			// }
			disabled: {
				value: false,
				setter: function(v){
					var self = this,
						inst = self.instance;
					// if(v == false){
						// self
					// }
					// self.instance.disable();
					S.log(LOG_PRE + '111');
					self.instance.set('disabled', v);
					return v;
				},
				getter: function(){
					S.log(LOG_PRE + '1123124')
				}
			}
		}
	});
	
	return Button;
}, {
	requires: [
		'node',
		'base'
	]
});
/**
 * CHANGELOG
 * 2011-12-13 �����ڲ����ԾͲ�Ҫ��set��get�ˡ�
 */