/**
 * @fileoverview �ļ��ϴ���ť for html
 * @author: ��Ӣ(����)<daxingplay@gmail.com>, ��ƽ�����ӣ�<minghe36@126.com>
 **/

KISSY.add(function(S, Node, Button) {
    var EMPTY = '',
    	$ = Node.all,
    	LOG_PREFIX = '[AjaxUploader-Button] ';
    /**
     * �ļ��ϴ���ť
     * @class Button
     * @constructor
     * @param {Object} config ���ö���
     */
    function HtmlButton(config){
        var self = this;
        /**
         * ��Ӧ�ı��ϴ���
         * @type HTMLElement
         */
        self.fileInput = EMPTY;
        /**
         * ���ϴ��������
         * @type HTMLElement
         */
        self.inputContainer = EMPTY;
        //���ø��๹�캯��
        HtmlButton.superclass.constructor.call(self, config);
    }
    
    //�̳���Base������getter��setterί����Base����
    S.extend(HtmlButton, Button, /** @lends Button.prototype*/{
        	/**
             * ����
             * @return {Object} Button��ʵ��
             */
            render : function() {
                var self = this,
                	target = self.target,
                	render = self.fire(self.event.beforeRender);
                if(render === false){
                	S.log(LOG_PREFIX + 'button render was prevented.')
                	return false;
                }else{
                	if (target == null) {
	                    S.log(LOG_PREFIX + 'Cannot find target!');
	                    return false;
	                }
	                self._createInput();
	                self._createUrlsInput();
	                $(target).css('position', 'relative');
	                self.fire(HtmlButton.event.RENDER);
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
                	input = self.fileInput,
                	show = self.fire(self.event.beforeShow);
                if(show === false){
                	S.log(LOG_PREFIX + 'show button event was prevented.');
                }else{
                	$(target).show();
	                $(input).show();
	                self.fire(self.event.afterShow);
	                S.log(LOG_PREFIX + 'button showed.');
                }
            },
            /**
             * ���ذ�ť
             */
            hide : function(){
                var self = this,
                	target = self.target,
                	input = self.fileInput,
                	hide = self.fire(self.event.beforeHide);
                if(hide === false){
                	S.log(LOG_PREFIX + 'hide button event was prevented.');
                }else{
                	$(target).hide();
	                $(input).hide();
	                self.fire(self.event.afterHide);
	                S.log(LOG_PREFIX + 'button showed.');
                }
            },
            /**
             * ���ð�ť
             * @return {Object} Button��ʵ��
             */
            resetInput : function() {
                var self = this,
                	inputContainer = self.inputContainer;
                //�Ƴ����ϴ�������
                $(inputContainer).remove();
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
                var self = this,
                	name = self.get('name'),
                	tpl = self.get('tpl'),
                	multiple = self.get('multiple'),
                    html,
                    inputContainer,
                    fileInput;
                if (!S.isString(name) || !S.isString(tpl)){
                	return false;
                }
                html = S.substitute(tpl, {
                	'name' : name
                });
                // TODO inputContainer = DOM.create(html);
                inputContainer = $(html);
                //��body��ӱ��ļ��ϴ���
                $(inputContainer).appendTo(self.target);
                fileInput = $(inputContainer, 'input').children()[0];
                //TODO ������ѡ�ϴ�
                // multiple && DOM.attr('multiple', 'multiple');
                //�ϴ����ֵ�ı�󴥷�
                $(fileInput).on('change', self._changeHandler, self);
                //��껬��/�ƿ��ϴ���ʱ����
                $(fileInput).on('mouseover mouseout', self._hoverHandler, self);
                //DOM.hide(fileInput);
                self.fileInput = fileInput;
                self.inputContainer = inputContainer;
                // self.resetContainerCss();
                return inputContainer;
            },
            /**
             * �����°�ť��Ӧ�����ر��������ĳߴ��ƫ��
             * @return {Object} Button��ʵ��
             */
            // resetContainerCss : function() {
                // var self = this,container = self.inputContainer,target = self.target,
                    // css = {'width':DOM.width(target),'height':DOM.height(target)};
                // DOM.css(container, css);
                // return self;
            // },
            /**
             * ����һ�����������ڷ��ϴ��ļ���url·��
             * @return {HTMLElement}
             */
            // TODO Ӧ�÷���base����
            _createUrlsInput : function() {
                var self = this,
                	target = self.target,
                	tpl = self.get('urlsInputTpl'),
                	name = self.get('urlsInputName'),
                	input;
                if (!S.isString(tpl) || !S.isString(name)){
                	return false;
                }
                // TODO Node ����create����
                input = DOM.create(tpl, {'name':name});
                // input = DOM.create(tpl, {'name':name});
                $(input).insertAfter(target);
                return self.urlsInput = input;
            },
            /**
             * �ļ��ϴ����ֵ�ı�ʱ����
             * @param {Object} ev �¼�����
             */
            _changeHandler : function(ev) {
                var self = this,
                	fileInput = self.fileInput,
                	value = $(fileInput).val(),
                	fileName;
                if (value == EMPTY){
                	return false;
                }
                self.fire(self.event.CHANGE);
            }
    },{
    	ATTRS : /** @lends Button*/{
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
    	}
    });
    
    return HtmlButton;
},{
	requires:[
		'node',
		'./base'
	]
});