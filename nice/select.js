/**
 * @fileoverview ������ѡ���
 * @author: ��ƽ�����ӣ�<minghe36@126.com>
 *
 **/
KISSY.add('form/nice/select',function(S, DOM, Base, Event) {
    var EMPTY = '',
        //����̨
        console = console || S,LOG_PREFIX = '[nice-select]:',
        IFRAME_TPL = '<iframe src="" width="{width}" height="{height}" class="ks-nice-select-iframe"></iframe>';
    /**
     * @name Select
     * @class ������ѡ���
     * @constructor
     * @param {String} target Ŀ��
     * @param {Object} config ���ö���
     */
    function Select(target, config) {
        var self = this;
        /**
         * ѡ���Ŀ��
         * @type Array
         */
        self.target = S.get(target);
        /**
         * ���ݼ���
         * @type Array
         */
        self.data = [];
        /**
         * �б�����
         * @type HTMLElement
         */
        self.listContainer = EMPTY;
        /**
         * ��������IE6������bug��iframeԪ��
         * @type HTMLElement
         */
        self.iframe = EMPTY;
        /**
         * ģ���б�ʵ��
         * @type Object
         */
        self.list = EMPTY;
        /**
         * ѡ���
         * @type HTMLElement
         */
        self.select = EMPTY;
        /**
         * ѡ�������
         * @type HTMLElement
         */
        self.selectContainer = EMPTY;
        /**
         * ��ǰѡ�е�����
         * @type Object
         */
        self.currentData = {text : EMPTY,value : EMPTY}; 
        //�����ʼ��
        Select.superclass.constructor.call(self, config);
    }

    //�̳���KISSY.Base
    S.extend(Select, Base);
    S.mix(Select,{
       hook : {LIST_CONTAINER : '.J_ListContainer',SELECT : '.J_NiceSelect',TEXT : '.J_SelectText'}
    });
    /**
     * ���ò���
     */
    Select.ATTRS = {
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
         * ѡ�����
         * @type Number
         */
        width : {
            value : 160,
            setter : function(v){
                v && this._setWidth(v);
                return v;
            }
        },
        /**
         * ѡ���ģ��
         * @type String
         */
        tpl : {
            value : '<div class="ks-nice-select-container" tabindex="0" aria-label="���tab����ѡ��ѡ�񣬵��esc�˳�ѡ��"><div class="ks-nice-select J_NiceSelect"><span class="select-text J_SelectText">{text}</span><span class="select-icon J_SelectIcon"></span></div><div class="list-container J_ListContainer"></div></div>'
        },
        /**
         * ��껬��ѡ�����ʽ
         * @type String
         */
        hoverCls : {
            value : 'ks-nice-select-hover'
        },
        /**
         * ��굥��ѡ����б���ʾ����ӵ���ʽ
         * @type String
         */
        clickCls : {
            value : 'ks-nice-select-click'
        }
    };

    /**
     * ����
     */
    S.augment(Select, {
            /**
             * ����
             */
            render : function() {
                var self = this,target = self.target,select,selectContainer;
                if(!target){
                    console.log(LOG_PREFIX + 'ѡ��򲻴��ڣ�');
                    return false;
                }
                DOM.hide(target);
                self._create();
                select = self.select;
                selectContainer = self.selectContainer;
                //ѡ�������
                Event.on(selectContainer,'keyup',self._keyupHandler,self);
                //��ֹ�¼�ð��
                Event.on(selectContainer,'click',function(ev){
                    ev.stopPropagation();
                });
                Event.on(select,'mouseover mouseout',self._hoverHandler,self);
                Event.on(select,'click',self._clickHandler,self);
                Event.on('body','click',function(ev){
                    self.hide();
                });
                DOM.data(target,'data-select',self);
            },
            /**
             * �����б�
             */
            hide : function(){
                var self = this,select = self.select,cls = self.get('clickCls'),
                    listContainer = self.listContainer,iframe = self.iframe;
                DOM.hide(listContainer);
                if(iframe != EMPTY) DOM.hide(iframe);
                DOM.removeClass(select,cls);
            },
            /**
             * ��ʾ�б�
             */
            show : function(){
                var self = this;
                if(self.list == EMPTY){
                    self.list = self._renderList();
                    self.iframe = self._createIframe();
                    self._setWidth(self.get('width'));
                }
                var select = self.select,iframe = self.iframe, cls = self.get('clickCls'),listContainer = self.listContainer;
                DOM.show(listContainer);
                if(iframe != EMPTY) DOM.show(iframe);
                //���Ӽ�����ʽ
                DOM.addClass(select,cls);
            },
            /**
             * ���ÿ��
             */
            _setWidth : function(width){
                var self = this,target = self.target,selectContainer = self.selectContainer,listContainer = self.listContainer;
                if(width == 'auto'){
                    var targetClone = target.cloneNode(true);
                    DOM.css(targetClone,{position:'absolute',top:'-3000px',display:'block'});
                    DOM.append(targetClone,'body');
                    width = DOM.width(targetClone);
                    DOM.remove(targetClone);
                }
                if(!S.isNumber(width)) return false;
                DOM.width(selectContainer,width);
                DOM.width(listContainer,width);
                DOM.width(self.iframe,width);
            },
            /**
             * ����ģ��ѡ���
             */
            _create : function(){
                var self = this,target = self.target,tpl = self.get('tpl'),text = EMPTY,html,
                    selectContainer,data;
                if(!S.isString(tpl)) return false;
                S.each(DOM.children(target),function(option){
                   if(DOM.attr(option,'selected')){
                       text = DOM.text(option);
                   }
                });
                data = {text : text,value : DOM.val(target)};
                html = S.substitute(tpl,data);
                selectContainer = DOM.create(html);
                DOM.insertAfter(selectContainer,target);
                self.currentData = S.merge(self.currentData,data);
                self.selectContainer = selectContainer;
                self.select =  DOM.children(selectContainer,Select.hook.SELECT);
                self._setWidth(self.get('width'));
            },
            /**
             * ����ģ���б�
             * @return {Object} Listʵ��
             */
            _renderList : function(){
                var self = this,selectContainer = self.selectContainer,list,
                    listContainer = DOM.children(selectContainer,Select.hook.LIST_CONTAINER),
                    data = self._getData(),
                    value = DOM.val(self.target);
                list = new List(listContainer,{data : data});
                list.render();
                list.select(value);
                list.on('click',self._listItemClickHandler,self);
                self.listContainer = listContainer;
                return list;
            },
            /**
             * ��ѡ��ת��������
             */
            _getData : function(){
                var self = this,target = self.target,options = DOM.children(target),data = [];
                if(options.length == 0) return false;
                S.each(options,function(option){
                    data.push({text : DOM.text(option),value : DOM.val(option)});
                });
                self.data = data;
                return data;
            },
            /**
             * ��껬���¼�������
             * @param {Object} ev �¼�����
             */
            _hoverHandler : function(ev){
                var self = this,type = ev.type,target = self.select,cls = self.get('hoverCls');
                if(!S.isString(cls)) return false;
                if(type == 'mouseover'){
                    DOM.addClass(target,cls);
                }else if(type == 'mouseout'){
                    DOM.removeClass(target,cls);
                }
            },
            /**
             * ��굥��ģ��ѡ����¼�������
             * @param {Object} ev �¼�����
             */
            _clickHandler : function(ev){
                var self = this,listContainer = self.listContainer;
                if(self.list == EMPTY || DOM.css(listContainer,'display') == 'none'){
                    self.show();
                }else{
                    self.hide();
                }
            },
            /**
             * �����¼�����������Ҫ����esc����
             */
            _keyupHandler : function(ev){
                var self = this,keyCode = ev.keyCode,list = self.list,currentIndex = list.currentIndex;
                switch(keyCode){
                    //esc��
                    case 27:
                        self.hide();
                    break;
                    //tab��
                    case 9 :
                        self.show();
                    break;
                    //���¼�
                    case 40 :
                        currentIndex ++;
                        list.select(currentIndex);
                    break;
                    //���ϼ�
                    case 38 :
                        currentIndex --;
                        list.select(currentIndex);
                    break;
                    //enter��
                    case 13 :
                        self.change(currentIndex);
                    break;
                }
            },
            /**
             * �ı�ѡ����ֵ
             */
            change : function(index){
                var self = this,select = self.select,textContainer = DOM.children(select,Select.hook.TEXT),
                    list = self.list,itemData = list.getItemData(index),text,value;
                if(S.isEmptyObject(itemData)) return false;
                text = itemData.text;
                value = itemData.value;
                //ѡ���ֵ�����ı�
                if(self.currentData.value != value){
                    //���б�ѡ��ֵд�������
                    DOM.text(textContainer,text);
                    DOM.val(self.target,value);
                    //��д
                    S.mix(self.currentData,itemData);
                    //����change�¼�
                    if(Event.trigger) Event.trigger(self.target,'change');
                }
                self.hide();
            },
            /**
             * ������б�ѡ��󴥷����¼�������
             * @param {Object} ev �¼�����ev.index����������б������б��е�����ֵ��
             */
            _listItemClickHandler : function(ev){
                var self = this;
                //�ı�ѡ����ֵ
                self.change(ev.index);
                //����ԭ��ѡ����click�¼�
                if(Event.trigger) Event.trigger(self.target,'click');
            },
            /**
             * ��������IE6�������޷���ס��Ԫ�ص�bug
             * @return {HTMLElement} iframeԪ��
             */
            _createIframe: function(){
                var self = this,listContainer = self.listContainer,selectContainer = self.selectContainer,
                    left = DOM.css(listContainer,'left'), width,height,iframeHtml,iframe;
                DOM.css(listContainer,{'display':'block','left' : '-3000px'});
                width = self.get('width'),height = DOM.height(listContainer);
                DOM.css(listContainer,{'display':'none','left' : left});
                iframeHtml = S.substitute(IFRAME_TPL,{width : width,height : height});
                iframe = DOM.create(iframeHtml);
                DOM.append(iframe,selectContainer);
                return iframe;
            }
        });
    return Select;
}, {requires:['dom','base','event']});