/**
 * @fileoverview �ļ��ϴ���ť
 * @author: ��ƽ�����ӣ�<minghe36@126.com>
 **/
KISSY.add(function(S, DOM, Base, Event) {
    var EMPTY = '',FILE = 'file',ID = 'id',
        //����̨
        console = console || S,LOG_PREFIX = '[ajaxUploader-button]:';

    /**
     * �ļ��ϴ���ť
     * @class Button
     * @constructor
     * @param {String} target Ŀ��Ԫ��
     * @param {Object} config ���ö���
     */
    function Button(target, config) {
        var self = this;
        self.set('target', $(target));
        //�����ʼ��
        Button.superclass.constructor.call(self, config);
    }

    //�̳���KISSY.Base
    S.extend(Button, Base);
    S.mix(Button, {
            //ģ��
            tpl : {
                DEFAULT:'<div class="ks-ajax-uploader-input-container"><input type="file" id="{name}" name="{name}" hidefoucs="true" class="ks-ajax-uploader-input" /></div>',
                URLS_INPUT : '<input type="hidden" value="" name="{name}" class="J_UploaderUrlsInput">'
            },
            //֧�ֵ��¼�
            event : { RENDER : 'render', CHANGE : 'change',MOUSEOVER : 'mouseover',MOUSEOUT : 'MOUSEOUT',FOCUS : 'focus',BLUR : 'blur' },
            /**
             * ��ȡ�ļ����ƣ��ӱ����ֵ����ȡ��
             * @param {String} path �ļ�·��
             * @return {String}
             */
            getFileName : function(path) {
                return path.replace(/.*(\/|\\)/, "");
            },
            /**
             * ��ȡ�ļ���չ��
             * @param fileName
             * @return {String}
             */
            getExt : function(fileName) {
                return -1 !== fileName.indexOf('.') && fileName.replace(/.*[.]/, '') || '';
            }
        });
    /**
     * ����
     */
    Button.ATTRS = {
        /**
         * ���صı��ϴ����ģ��
         * @type String
         */
        tpl : {
            value : Button.tpl.DEFAULT
        },
        /**
         * ���ص��ļ�·��������ģ��
         * @type String
         */
        urlsInputTpl : {
            value : Button.tpl.URLS_INPUT
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
            setter : function(v) {
                var self = this,target = self.target,cls = self.get('cls').disabled,fileInput = self.fileInput;
                if (v) {
                    DOM.addClass(target, cls);
                    DOM.hide(fileInput);
                } else {
                    DOM.removeClass(target, cls);
                    DOM.show(fileInput);
                }
                return v;
            }
        },
        /**
         * ��ʽ
         * @type Object
         */
        cls : {
            value : {
                hover : 'uploader-button-hover',
                focus : 'uploader-button-focus',
                disabled : 'uploader-button-disabled'
            }
        }
    };
        
    S.extend(Button, Base, /** @lends Button.prototype*/{
    	/**
         * ����
         * @return {Object} Button��ʵ��
         */
        render : function() {
            var self = this,
            	target = self.get('target'),
            	render = self.fire(Button.event.beforeRender);
            if(render === false){
            	S.log(LOG_PREFIX + 'button render was prevented.')
            	return false;
            }else{
            	if (target == null) {
                    S.log(LOG_PREFIX + 'Cannot find target!');
                    return false;
                }
                self._createInput();
                self.fire(Button.event.afterRender);
                S.log(LOG_PREFIX + 'button was rendered just now.');
                return self;
            }
        },
        /**
         * ��ʾ��ť
         */
        show : function(){
            var self = this,
            	target = self.target,
            	input = self.get('fileInput'),
            	show = self.fire(Button.event.beforeShow);
            if(show === false){
            	S.log(LOG_PREFIX + 'show button event was prevented.');
            }else{
            	$(target).show();
                $(input).show();
                self.fire(Button.event.afterShow);
                S.log(LOG_PREFIX + 'button showed.');
            }
        },
        /**
         * ���ذ�ť
         */
        hide : function(){
            var self = this,
            	target = self.target,
            	input = self.get('fileInput'),
            	hide = self.fire(Button.event.beforeHide);
            if(hide === false){
            	S.log(LOG_PREFIX + 'hide button event was prevented.');
            }else{
            	$(target).hide();
                $(input).hide();
                self.fire(Button.event.afterHide);
                S.log(LOG_PREFIX + 'button showed.');
            }
        },
        /**
         * ���ð�ť
         * @return {Object} Button��ʵ��
         */
        _reset : function() {
            var self = this,
            	inputContainer = self.get('inputContainer');
            //�Ƴ����ϴ�������
            $(inputContainer).remove();
            self.set('inputContainer', EMPTY);
            self.set('fileInput', EMPTY);
            //���´������ϴ���
            self._createInput();
            return self;
        },
        /**
         * �������صı��ϴ���
         * @return {HTMLElement} �ļ��ϴ�������
         */
        _createInput : function() {
            var self = this,
            	target = self.get('target'),
            	name = self.get('name'),
            	tpl = self.get('tpl'),
            	multiple = self.get('multiple'),
                html,
                inputContainer,
                fileInput;
            if (!S.isString(name) || !S.isString(tpl)){
            	S.log(LOG_PREFIX + 'No name or tpl specified.');
            	return false;
            }
            html = S.substitute(tpl, {
            	'name' : name
            });
            // TODO: inputContainer = DOM.create(html);
            inputContainer = $(html);
            //��body��ӱ��ļ��ϴ���
            $(inputContainer).appendTo(target);
            fileInput = $(inputContainer, 'input').children()[0];
            // TODO: ������ѡ�ϴ�
            // multiple && DOM.attr('multiple', 'multiple');
            //�ϴ����ֵ�ı�󴥷�
            $(fileInput).on('change', self._changeHandler, self);
            //DOM.hide(fileInput);
            self.set('fileInput', fileInput);
            self.set('inputContainer', inputContainer);
            // self.resetContainerCss();
            return inputContainer;
        },
        /**
         * �ļ��ϴ����ֵ�ı�ʱ����
         * @param {Object} ev �¼�����
         */
        _changeHandler : function(ev) {
            var self = this,
            	fileInput = self.get('fileInput'),
            	value = $(fileInput).val(),
            	fileName;
            if (value == EMPTY){
            	S.log(LOG_PREFIX + 'No file selected.');
            	return false;
            }
            self.fire(self.event.CHANGE, {
            	'eventTarget': ev
            });
            // change��֮��reset��ť����ֹѡ��ͬһ���ļ��޷�����change�¼�
            self._reset();
        }
    },{
    	ATTRS : /** @lends Button */{
    		/**
    		 * target
    		 */
    		target: {
    			value: null
    		},
	        /**
	         * �Ƿ�����ѡ֧��
	         * @type Boolean
	         */
	        multiple : {
	            value : false
	        },
	        /**
    		 * ��Ӧ�ı��ϴ���
     		 * @type HTMLElement
    		 */
    		fileInput: {
    			value: EMPTY
    		},
    		inputContainer: {
    			value: EMPTY
    		},
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
	                if (this.get('fileInput')) {
	                    $(this.get('fileInput')).attr('name', v);
	                }
	                return v;
	            }
	        },
	        /**
	         * �Ƿ����,falseΪ����
	         * @type Boolean
	         */
	        disabled : {
	            value : false,
	            setter : function(v) {
	                var self = this,
	                	target = self.target,
	                	cls = self.get('cls').disabled,
	                	fileInput = self.fileInput;
	                if (v) {
	                    $(target).addClass(cls);
	                    $(fileInput).hide();
	                } else {
	                    $(target).removeClass(cls);
	                    $(fileInput).show();
	                }
	                return v;
	            }
	        },
	        /**
	         * ��ʽ
	         * @type Object
	         */
	        cls : {
	            value : {
	                disabled : 'uploader-button-disabled'
	            }
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
