/**
 * @fileoverview �����б�����json����Դ������ѡ���ģ���б�
 * @author: ��ƽ�����ӣ�<minghe36@126.com>
 *
 **/
KISSY.add(function(S, DOM, Base, Event, Template) {
    var EMPTY = '',
        //����̨
        console = console || S,LOG_PREFIX = '[nice-list]:';
    /**
     * @name List
     * @class �����б�����json����Դ������ѡ���ģ���б�
     * @constructor
     * @augments KISSY.Base
     * @description
     * List���������ģ��ѡ�����������ݣ�Ҳ��Ӧ���ڶ�ѡ��
     * @param {String} container ����
     * @param {Object} config ���ö���
     * @property {HTMLElement} container ģ���б������
     * @property {HTMLElement} list ģ���б�Ԫ�أ�һ����ul��ol
     */
    function List(container, config) {
        var self = this;
        /**
         * �б������
         * @type HTMLElement
         */
        self.container = S.get(container);
        /**
         * �б�Ԫ��
         * @type HTMLElement
         */
        self.list = EMPTY;
        /**
         * ��ǰѡ�е�ѡ������
         * @type Number
         */
        self.currentIndex = EMPTY;
        //�����ʼ��
        List.superclass.constructor.call(self, config);
    }

    //�̳���KISSY.Base
    S.extend(List, Base);
    S.mix(List, /**@lends List*/ {
            /**
             * ģ��
             */
            tpl : {
                DEFAULT : '<ul class="ks-nice-list">' +
                    '{{#each data}}' +
                    '<li data-value="{{_ks_value.value}}">{{_ks_value.text}}</li>' +
                    '{{/each}}' +
                    '</ul>'
            },
            /**
             * ����õ�����ʽ����
             */
            cls : {CURRENT : 'ks-nice-current',HOVER : 'ks-nice-hover'},
            /**
             * ֧�ֵ��¼�
             */
            event : {RENDER : 'render',CLICK : 'click'},
            /**
             * ��������key��
             */
            data : {VALUE : 'data-value'}
        });
    /**
     * @description
     * <p>���Ĭ�ϲ����������Լ�����KISSY.Base����������ӵ��getter��setter������</p>
     * <ul>
     *     <li>autoRender:�Ƿ��Զ�����</li>
     *     <li>data:����Դ</li>
     *     <li>tpl:���ʹ�õ�ģ��</li>
     *     <li>style:����list��������ʽ</li>
     * </ul>
     */
    List.ATTRS = {
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
         * ����
         * @type Array
         */
        data : {
            value : [],
            setter : function(v) {
                return v;
            }
        },
        /**
         * ģ��
         * @type String
         */
        tpl : {
            value : List.tpl.DEFAULT
        },
        /**
         * ����list������ʽ
         * @type Object
         */
        style : {
            value : {},
            setter : function(v) {
                var self = this,list = self.list;
                DOM.css(list, v);
                return v;
            }
        }
    };

    /**
     * ����
     */
    S.augment(List, 
        /**@lends List.prototype*/
        {
            /**
             * ����
             */
            render : function() {
                var self = this,container = self.container,style = self.get('style'),list,li;
                if (container.length == 0) {
                    console.log(LOG_PREFIX + '�б����������ڣ�');
                    return false;
                }
                list = self._create();
                li = DOM.children(list);
                Event.on(li,'click',self._clickHandler,self);
                Event.on(li,'mouseover mouseout',self._hoverHandler,self);
                self.fire(List.event.RENDER);
            },
            /**
             * ѡ��������
             * @param {String} value ѡ���valueֵ
             */
            select : function(value){
                var self = this,currentCls = List.cls.CURRENT,
                    list = self.list,lis = DOM.children(list);
                S.each(lis,function(li,i){
                    if(DOM.attr(li,List.data.VALUE) == value){
                        DOM.removeClass(lis,currentCls);
                        DOM.addClass(li,currentCls);
                        self.currentIndex = i;
                        return true;
                    }
                })
            },
            /**
             * �����б�
             */
            _create : function() {
                var self = this,container = self.container,data = self.get('data'),tpl = self.get('tpl'),html = EMPTY;
                if (!S.isArray(data) || data.length == 0 || !S.isString(tpl)) return false;
                html = Template(tpl).render({data : data});
                DOM.html(container, html);
                return self.list = DOM.children(container)[0];
            },
            /**
             * ����б�ѡ��ʱ����
             */
            _clickHandler : function(ev){
                var self = this,target = ev.target,currentCls = List.cls.CURRENT,
                    list = self.list,lis = DOM.children(list),
                    text = S.trim(DOM.text(target)),value = DOM.attr(target,List.data.VALUE);
                self.select(value);
                self.fire(List.event.CLICK,{text : text,value : value,target : target});
            },
            /**
             * ��껬���¼�������
             * @param {Object} ev �¼�����
             */
            _hoverHandler : function(ev){
                var self = this,type = ev.type,target = ev.target,cls = List.cls.HOVER;
                if(!S.isString(cls)) return false;
                if(type == 'mouseover'){
                    DOM.addClass(target,cls);
                }else if(type == 'mouseout'){
                    DOM.removeClass(target,cls);
                }
            }
        });
    return List;
}, {requires:['dom','base','event','template']});