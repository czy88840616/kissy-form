/**
 * @fileoverview �����б�����json����Դ������ѡ���ģ���б�
 * @author: ��ƽ�����ӣ�<minghe36@126.com>
 *
 **/
KISSY.add(function(S, DOM, Base, Event, Template) {
    var EMPTY = '', LOG_PREFIX = '[nice-list]:';
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
     * @property {Number} currentIndex ��ǰѡ�е��������б��е�����ֵ
     * @property {HTMLElement} list ģ���б�Ԫ�أ�һ����ul��ol
     */
    function List(container, config) {
        var self = this;
        self.container = S.get(container);
        self.currentIndex = 0;
        self.list = EMPTY;
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
                DEFAULT : '<ul class="ks-nice-list" tabindex="0">' +
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
            event : {RENDER : 'render',CLICK : 'click',ITEM_MOUSEOVER : 'itemMouseover',ITEM_MOUSEOUT : 'itemMouseout'},
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
                var self = this,container = self.container,list,li;
                if (container.length == 0) {
                    S.log(LOG_PREFIX + '�б����������ڣ�');
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
                if(S.isString(value)){
                    S.each(lis,function(li,i){
                        if(DOM.attr(li,List.data.VALUE) == value){
                            _changeStyle(li);
                            self.currentIndex = i;
                            return true;
                        }
                    })
                }
                //�б���Ԫ������
                else if(S.isNumber(value)){
                    if(value == lis.length){
                        value = 0;
                    }else if(value < 0){
                        value = lis.length - 1;
                    }
                    _changeStyle(lis[value]);
                    self.currentIndex = value;
                }
                /**
                 * �ı�ѡ����ʽ
                 * @param {HTMLElement} li �б���Ԫ��
                 */
                function _changeStyle(li){
                    DOM.removeClass(lis,currentCls);
                    DOM.addClass(li,currentCls);
                }
                return self.currentIndex;
            },
            /**
             * ��ȡ��ǰ�������б���������
             * @param {Number} index �б�����
             */
            getItemData : function(index){
                if(!S.isNumber(index)) return false;
                var self = this,data = self.get('data'),itemData;
                itemData = data[index] || {};
                return itemData;
            },
            /**
             * �����б�
             */
            _create : function() {
                var self = this,container = self.container,data = self.get('data'),
                    tpl = self.get('tpl'),html = EMPTY,elList;
                if (!S.isArray(data) || data.length == 0 || !S.isString(tpl)) return false;
                html = Template(tpl).render({data : data});
                elList = DOM.create(html);
                DOM.append(elList, container);
                return self.list = elList;
            },
            /**
             * ����б�ѡ��ʱ����
             * @param {Object} ev �¼�����
             */
            _clickHandler : function(ev){
                var self = this,target = ev.target,index,
                    value = DOM.attr(target,List.data.VALUE);
                index = self.select(value);
                self.fire(List.event.CLICK,{index : index,target : target});
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
                    self.fire(List.event.ITEM_MOUSEOVER,{target : target});
                }else if(type == 'mouseout'){
                    DOM.removeClass(target,cls);
                    self.fire(List.event.ITEM_MOUSEOUT,{target : target});
                }
            }
        });
    return List;
}, {requires:['dom','base','event','template']});