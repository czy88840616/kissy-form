/**
 * @fileoverview ��ѡ������
 * @author: ��ƽ<minghe36@126.com>
 *
 **/
KISSY.add(function(S, DOM, Base, Event) {
    var EMPTY = '',CHECKED = 'ks-radio-checked',
        data = {TARGET : 'data-target'},
        //����̨
        console = console || S,LOG_PREFIX = '[nice-radio]:',
        DOM = DOM || S.DOM,Base = Base || S.Base,Event = Event || S.Event;        ;
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
            value : '<span class="g-u ks-radio" rel="{name}"></span>'
        }
    };
    S.mix(Radio,{
            /**
             * ��ʽ
             */
            cls : {CHECKED : 'ks-radio-checked',DISABLED : 'ks-radio-disabled'},
            data : {DISABLED : 'data-disabled',TARGET : 'data-target'}
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
             * ����������ͼƬ��ѡ��������ϵͳԭ����ѡ��
             */
            _createRadio : function(){
                var self = this,target = self.target,radioTpl = self.get('tpl'),
                    name,disabled,html,radio;
                S.each(target,function(item){
                    name = DOM.attr(item,'name');
                    disabled = DOM.attr(item,'disabled');
                    html = S.substitute(radioTpl,{name : name});
                    radio = DOM.create(html);
                    //��ͼƬ��ѡ����뵽��ѡ��ǰ��
                    DOM.insertBefore(radio,item);
                    //����ͼƬ��ѡ��ĵ����¼�
                    Event.on(radio,'click',self._radioClickHandler,self);
                    DOM.data(radio,data.TARGET,item);
                    DOM.data(item,data.TARGET,radio);
                    self.radios.push(radio);
                    if(disabled) self.setDisabled(radio);
                })
            },
            /**
             * ����������ѡ����¼�������
             */
            _radioClickHandler : function(ev){
                var self = this,target = ev.target,input = DOM.data(target,Radio.data.TARGET),
                    checkedCls = Radio.cls.CHECKED;
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
    S.namespace('nice');
    S.nice.Radio = Radio;
    return Radio;
}, {requires:['dom','base','event']});