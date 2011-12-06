/**
 * @fileoverview �ļ��ϴ���ťbase
 * @author: ��Ӣ(����)<daxingplay@gmail.com>, ��ƽ�����ӣ�<minghe36@126.com>
 **/
KISSY.add(function(S, Node, Base) {
    var EMPTY = '',
        LOG_PREFIX = '[AjaxUploader-Button] ',
        $ = Node.all;

    /**
     * �ļ��ϴ���ť
     * @class Button
     * @constructor
     * @param {Object} config ���ö���
     */
    function Button(config) {
        var self = this;
        /**
         * Ŀ������
         * @type HTMLElement
         */
        self.target = $(config.target);
        /**
         * �ļ�·��������
         * @type HTMLElement
         */
        self.urlsInput = EMPTY;
        //�����ʼ��
        Button.superclass.constructor.call(self, config);
    }

    S.mix(Button, {
        //֧�ֵ��¼�
        event : { 
        	'beforeShow': 'beforeShow',
        	'afterShow': 'afterShow',
        	'beforeHide': 'beforeHide',
        	'afterHide': 'afterHide',
        	'beforeRender' : 'beforeRender', 
        	'afterRender' : 'afterRender',
        	'CHANGE' : 'change'
        }
    });
        
    S.extend(Button, Base, /** @lends Button.prototype*/{
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
    },{
    	ATTRS : /** @lends Button */{
		    /**
             * ���صı��ϴ����ģ��
             * @type String
             */
	        tpl : {
	            value : '<div class="ks-ajax-uploader-input-container"><input type="file" name="{name}" hidefoucs="true" class="ks-ajax-uploader-input" /></div>'
	        },
	        /**
	         * ���صı��ϴ����nameֵ
	         * @type String
	         */
	        name : {
	            value : 'fileInput',
	            setter : function(v) {
	                if (this.fileInput) {
	                    DOM.attr(this.fileInput, 'name', v);
	                }
	                return v;
	            }
	        },
            /**
	         * ���ص��ļ�·��������ģ��
	         * @type String
	         */
	        urlsInputTpl : {
	            value : '<input type="hidden" value="" name="{name}" class="J_UploaderUrlsInput">'
	        },
            /**
	         * ����ļ�ʱʹ�õķָ���
	         * @type String
	         */
	        urlDivision : {
	            value : ','
	        },
	        /**
	         * �Ƿ�����ѡ֧��
	         * @type Boolean
	         */
	        multiple : {
	            value : false
	        },
	        /**
	         * �Ƿ����,falseΪ����
	         * @type Boolean
	         */
	        disabled : {
	            value : false,
	        }
    	}
    });
    
    return Button;
    
}, {
	requires:[
		'node',
		'base'
	]
});