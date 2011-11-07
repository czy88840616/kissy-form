/**
 * @fileoverview iframe�����ϴ�
 * @author: ��ƽ�����ӣ�<minghe36@126.com>,��Ӣ<daxingplay@gmail.com>
 **/
KISSY.add(function(S,Node,Base) {
    var EMPTY = '',$ = Node.all,LOG_PREFIX = '[uploader-iframeType]:',ID_PREFIX = 'ks-uploader-iframe-';
    /**
     * @name IframeType
     * @class iframe�����ϴ�
     * @constructor
     * @extends Base
     * @requires Node
     */
    function IframeType(config){
        var self = this;
        //���ø��๹�캯��
        IframeType.superclass.constructor.call(self,config);
    }
    S.mix(IframeType,/**@lends IframeType*/ {
        /**
         * ���õ���htmlģ��
         */
        tpl : {
            IFRAME : '<iframe src="javascript:false;" name="{id}" id="{id}" border="no" width="1" height="1" style="display: none;" />',
            FORM : '<form method="post" enctype="multipart/form-data" action="{action}" target="{target}">{hiddenInputs}</form>',
            HIDDEN_INPUT : '<input type="hidden" name="{name}" value="{value}" />'
        }
    });
    //�̳���Base������getter��setterί����Base����
    S.extend(IframeType, Base, /** @lends IframeType.prototype*/{
            /**
             * ����
             */
            render : function(){

            },
            /**
             * �ϴ��ļ�
             * @param {HTMLElement} fileInput �ļ�input
             */
            upload : function(fileInput){
                var self = this,$input = $(fileInput);
                if(!$input.length) return false;
                self._create();
                self._appendFileInput($input);

            },
            /**
             * ����������ת����hiddenԪ��
             * @param {Object} data ��������
             * @return {String} hiddenInputHtml hiddenԪ��htmlƬ��
             */
            dataToHidden : function(data){
                if(!S.isObject(data) || S.isEmptyObject(data)){
                    S.log(LOG_PREFIX + 'data�������Ƕ������Ϊ�գ�');
                    return false;
                }
                var self = this,hiddenInputHtml = EMPTY,
                    //hiddenԪ��ģ��
                    tpl = self.get('tpl'),hiddenTpl = tpl.HIDDEN_INPUT;
                if (!S.isString(hiddenTpl)) return false;
                for (var k in data) {
                    hiddenInputHtml += S.substitute(hiddenTpl, {'name' : k,'value' : data[k]});
                }
                return hiddenInputHtml;
            },
            /**
             * ����һ���յ�iframe�������ļ��ϴ����ύ�󷵻ط�����������
             * @return {NodeList}
             */
            _createIframe : function(){
                var self = this,
                    //iframe��id
                    id = self.get('id'),
                    //iframeģ��
                    tpl = self.get('tpl'),iframeTpl = tpl.IFRAME,
                    iframe;
                if (!S.isString(iframeTpl)){
                    S.log(LOG_PREFIX + 'iframe��ģ�岻�Ϸ���');
                    return false;
                }
                if (!S.isString(id)){
                    S.log(LOG_PREFIX + 'id���������Ϊ�ַ������ͣ�');
                    return false;
                }
                //���������ϴ���iframe
                iframe = S.substitute(tpl.IFRAME, { 'id' : id });
                return $(iframe);
            },
            /**
             * �����ļ��ϴ���
             * @return {NodeList}
             */
            _createForm : function(){
                var self = this,
                    //iframe��id
                    id = self.get('id'),
                    //formģ��
                    tpl = self.get('tpl'),formTpl = tpl.FORM,
                    //��Ҫ���͸��������˵�����
                    data = self.get('data'),
                    //�������˴����ļ��ϴ���·��
                    action = self.get('action'),
                    hiddens,form = EMPTY;
                if (!S.isString(formTpl)){
                    S.log(LOG_PREFIX + 'formģ�岻�Ϸ���');
                    return false;
                }
                if (!S.isObject(data)){
                    S.log(LOG_PREFIX + 'data�������Ϸ���');
                    return false;
                }
                if (!S.isString(action)){
                    S.log(LOG_PREFIX + 'action�������Ϸ���');
                    return false;
                }
                hiddens = self.dataToHidden(data);
                if(hiddens == EMPTY) return false;
                form = S.substitute(formTpl, {'action' : action,'target' : id,'hiddenInputs' : hiddens});
                return $(form);
            },
            /**
             * ����iframe��form
             */
            _create : function(){
                var self = this,
                    iframe = self._createIframe(),
                    form = self._createForm();
                $('body').append(iframe);
                $('body').append(form);
                self.set('iframe',iframe);
                self.set('form',form);
            },
            /**
             * ���ļ�����뵽��
             * @param {NodeList} input �ļ���
             * @param {NodeList} ����ļ����ı�
             */
            _appendFileInput : function(input){
                //��¡�ļ���
                var self = this,$inputClone = input.clone(),
                    form = self.get('form');
                $(form).append($inputClone);
                self.set('form',form);
                return form;
            }

    },{ATTRS : /** @lends IframeType*/{
            /**
             * iframe�������õ���htmlģ�壬һ�㲻��Ҫ�޸�
             */
            tpl : {value : IframeType.tpl},
            /**
             * ������iframeid
             */
            id : {value : ID_PREFIX + S.guid()},
            /**
             * ��������·��
             */
            action : {value : EMPTY},
            /**
             * ���͸��������˵Ĳ������ϣ��ᱻת��hiddenԪ��post���������ˣ�
             */
            data : {value : {}},
            iframe : {value : {}},
            form : {value : {}}
    }});
    
    return IframeType;
},{requires:['node','base']});