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
<<<<<<< HEAD
        /**
         * Ŀ������
         * @type HTMLElement
         */
        self.target = S.get(target);
        /**
         * ��Ӧ�ı��ϴ���
         * @type HTMLElement
         */
        self.fileInput = EMPTY;
        /**
         * �ļ�·��������
         * @type HTMLElement
         */
        self.urlsInput = EMPTY;
        /**
         * ���ϴ��������
         * @type HTMLElement
         */
        self.inputContainer = EMPTY;
=======
        self.set('target', $(target));
>>>>>>> a47347bcb68b3167c5cd475966de573b11f02b0b
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
<<<<<<< HEAD
    };
    /**
     * ����
     */
    S.augment(Button, {
            /**
             * ����
             * @return {Object} Button��ʵ��
             */
            render : function() {
                var self = this,target = self.target;
                if (target == null) {
                    console.log(LOG_PREFIX + '����Ŀ��Ԫ���Ƿ���ڣ�');
                    return false;
                }
                self._createInput();
                DOM.css(target, 'position', 'relative');
                self.fire(Button.event.RENDER);
                return self;
            },
            /**
             * ��ʾ��ť
             */
            show : function(){
                var self = this,target = self.target,input = self.fileInput;
                DOM.show(target);
                DOM.show(input);
            },
            /**
             * ���ذ�ť
             */
            hide : function(){
                var self = this,target = self.target,input = self.fileInput;
                DOM.hide(target);
                DOM.hide(input);
            },
            /**
             * ���ð�ť
             * @return {Object} Button��ʵ��
             */
            resetInput : function() {
                var self = this,inputContainer = self.inputContainer;
                //�Ƴ����ϴ�������
                DOM.remove(inputContainer);
                self.inputContainer = EMPTY;
                self.fileInput = EMPTY;
                //���´������ϴ���
                self._createInput();
                return self;
            },
            /**
             * �������صı��ϴ���
             * @return {HTMLElement} �ļ��ϴ�������
             */
            _createInput : function() {
                var self = this,name = self.get('name'),tpl = self.get('tpl'),multiple = self.get('multiple'),
                    html,inputContainer,fileInput;
                if (!S.isString(name) || !S.isString(tpl)) return false;
                html = S.substitute(tpl, {name : name});
                inputContainer = DOM.create(html);
                //��body��ӱ��ļ��ϴ���
                DOM.append(inputContainer, self.target);
                fileInput = DOM.children(inputContainer, 'input')[0];
                //������ѡ�ϴ�
                multiple && DOM.attr('multiple', 'multiple');
                //�ϴ����ֵ�ı�󴥷�
                Event.on(fileInput, 'change', self._changeHandler, self);
                //��껬��/�ƿ��ϴ���ʱ����
                Event.on(fileInput, 'mouseover mouseout', self._hoverHandler, self);
                //�ϴ����ȡ���㡢ʧȥ����ʱ����
                Event.on(fileInput, 'focus blur', self._focusBlurHandler, self);
                //DOM.hide(fileInput);
                self.fileInput = fileInput;
                self.inputContainer = inputContainer;
                self.resetContainerCss();
                return inputContainer;
            },
            /**
             * �����°�ť��Ӧ�����ر��������ĳߴ��ƫ��
             * @return {Object} Button��ʵ��
             */
            resetContainerCss : function() {
                var self = this,container = self.inputContainer,target = self.target,
                    css = {'width':DOM.width(target),'height':DOM.height(target)};
                DOM.css(container, css);
                return self;
            },
            /**
             * �ļ��ϴ����ֵ�ı�ʱ����
             * @param {Object} ev �¼�����
             */
            _changeHandler : function(ev) {
                var self = this,fileInput = self.fileInput,value = DOM.val(fileInput),fileName;
                if (value == EMPTY) return false;
                //�ļ�����
                fileName = Button.getFileName(value);
                self.fire(Button.event.CHANGE, {name : fileName,files : ev.target.files,input : fileInput});
            },
            /**
             * ��껬��/�ƿ���ť
             * @param {Object} ev �¼�����
             */
            _hoverHandler : function(ev) {
                var self = this,target = self.target,cls = self.get('cls'),fileInput = self.fileInput;
                if (!S.isObject(cls) || !cls.hover) return false;
                if (ev.type == 'mouseover') {
                    DOM.addClass(target, cls.hover);
                    self.fire(Button.event.MOUSEOVER);
                }
                else if (ev.type == 'mouseout') {
                    DOM.removeClass(target, cls.hover);
                    //if(fileInput != EMPTY && DOM.css(fileInput,'display') == 'block') DOM.css(fileInput,'display','none');
                    self.fire(Button.event.MOUSEOUT);
                }

            },
            /**
             * ��ȡ/ʧȥ����
             * @param {Object} ev �¼�����
             */
            _focusBlurHandler : function(ev) {
                var self = this,target = self.target,cls = self.get('cls');
                if (!S.isObject(cls) || !cls.focus) return false;
                if (ev.type == 'focus') {
                    DOM.addClass(target, cls.focus);
                    self.fire(Button.event.FOCUS);
                }
                else if (ev.type == 'blur') {
                    DOM.removeClass(target, cls.hover);
                    DOM.removeClass(target, cls.focus);
                    self.fire(Button.event.BLUR);
                }
            }
        });
    return Button;
}, {requires:['dom','base','event']});
=======
    });
        
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




>>>>>>> a47347bcb68b3167c5cd475966de573b11f02b0b
