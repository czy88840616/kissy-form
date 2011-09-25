/**
 * @fileoverview ��ѡ������
 * @author: ��ƽ<minghe36@126.com>
 *
 **/
KISSY.add(function(S, DOM, Base, Event) {
    var EMPTY = '', data = {TARGET : 'data-target'},
        //����̨
        console = console || S,LOG_PREFIX = '[nice-radio]:';
    /**
     * @name Radio
     * @class ��ѡ������
     * @constructor
     * @param {String} target Ŀ��
     * @param {Object} config ���ö���
     */
    function Radio(target, config) {
        var self = this;
        /**
         * ��ѡ��Ŀ��
         * @type Array
         */
        self.target = S.query(target);
        self.radios = [];
        //�����ʼ��
        Radio.superclass.constructor.call(self, config);
    }

    //�̳���KISSY.Base
    S.extend(Radio, Base);
    /**
     * ���ò���
     */
    Radio.ATTRS = {
        /**
         * �Ƿ��Զ�����
         * @type Boolean
         */
        autoRender : {
            value : false,
            setter : function(v) {
                v && this.render();
                return v;
            }
        },
        /**
         * ��ѡ��ģ��
         * @type String
         */
        tpl : {
            value : '<span class="g-u ks-radio" tabindex="0" data-label="{label}" aria-label="{label}������enterѡ�и���" rel="{name}"></span>'
        }
    };
    S.mix(Radio,{
            /**
             * ��ʽ
             */
            cls : {CHECKED : 'ks-radio-checked',DISABLED : 'ks-radio-disabled'},
            data : {DISABLED : 'data-disabled',TARGET : 'data-target',LABEL : 'data-label'}
    });
    /**
     * ����
     */
    S.augment(Radio, {
            /**
             * ����
             */
            render : function() {
                var self = this,target = self.target;
                if(target.length == 0){
                    console.log(LOG_PREFIX + '��ѡ�����������ڣ�');
                    return false;
                }
                DOM.hide(target);
                Event.on(target,'change',self._changeHandler,self);
                self._createRadio();
                S.each(target,function(input){
                    if(DOM.attr(input,'checked')){
                        if(Event.trigger) Event.trigger(DOM.data(input,data.TARGET),'click');
                    }
                });
            },
            /**
             * ѡ��ָ������ֵ��Ԫ�أ��ĵ�ѡ��
             * @param {HTMLElement | Number} target Ŀ��Ԫ��
             */
            checked : function(target){
                var self = this,radios = self.target;
                //�������������ǵ�ѡ�������ֵ����ô��this.targetԪ��������ȡԪ��
                if(S.isNumber(target)){
                    target = radios[target];
                }
                var input = DOM.data(target,Radio.data.TARGET),checkedCls = Radio.cls.CHECKED;
                //�����ѡ��Ϊ����״̬��ֱ���˳�
                if(DOM.data(target,Radio.data.DISABLED))return false;
                DOM.removeClass(self.radios,checkedCls);
                //���ѡ����ʽ
                DOM.addClass(target,checkedCls);
                DOM.attr(input,'checked',true);
                //������ѡ����¼�
                //TODO:�÷���Ϊ�����Զ���ķ����뿴core.js
                if(Event.trigger){
                    Event.trigger(input,'change');
                    Event.trigger(input,'click');
                }
            },
            /**
             * ����������ͼƬ��ѡ��������ϵͳԭ����ѡ��
             */
            _createRadio : function(){
                var self = this,target = self.target,radioTpl = self.get('tpl'),
                    name,disabled,html,radio,label;
                S.each(target,function(item){
                    name = DOM.attr(item,'name');
                    disabled = DOM.attr(item,'disabled');
                    //��ѡ���label
                    label = self._getLabel(item);
                    html = S.substitute(radioTpl,{name : name,label : label});
                    radio = DOM.create(html);
                    //��ͼƬ��ѡ����뵽��ѡ��ǰ��
                    DOM.insertBefore(radio,item);
                    //����ͼƬ��ѡ��ĵ����¼�
                    Event.on(radio,'click',self._radioClickHandler,self);
                    Event.on(radio,'keyup',self._radioKeyupHandler,self);
                    DOM.data(radio,data.TARGET,item);
                    DOM.data(item,data.TARGET,radio);
                    self.radios.push(radio);
                    if(disabled) self.setDisabled(radio);
                })
            },
            /**
             * ��ȡ��ѡ���label
             * @param {HTMLElement} radio ��ѡ��Ԫ��
             */
            _getLabel : function(radio){
                if(!radio) return false;
                var dataNameLabel = Radio.data.LABEL,label = EMPTY,elLabel;
                label = DOM.attr(radio,dataNameLabel);
                if(!label){
                    elLabel = DOM.next(radio,'label') || DOM.prev(radio,'label');
                    if(elLabel){
                        label = DOM.text(elLabel);
                    }
                }
                return label;
            },
            /**
             * ����������ѡ����¼�������
             */
            _radioClickHandler : function(ev){
                var self = this,target = ev.target;
                self.checked(target);
                target.focus();
            },
            /**
             * ����ģ�ⵥѡ��ļ��̰����¼�
             * @param ev
             */
            _radioKeyupHandler : function(ev){
                var self = this,target = ev.target,keyCode = ev.keyCode;
                //����enter��
                if(keyCode == 13){
                    self.checked(target);
                }
            },
            /**
             * ���õ�ѡ�򲻿���
             * @param {HTMLElement} radio ģ�ⵥѡ��Ԫ��
             */
            setDisabled : function(radio){
                var self = this,disabledCls = Radio.cls.DISABLED,data = Radio.data,
                    radioTarget = DOM.data(radio,data.TARGET);
                if(!radio) return false;
                DOM.addClass(radio,disabledCls);
                DOM.data(radio,data.DISABLED,true);
                if(!DOM.attr(radioTarget,'disabled')) DOM.attr(radioTarget,'disabled',true);
            }
        });
    return Radio;
}, {requires:['dom','base','event']});