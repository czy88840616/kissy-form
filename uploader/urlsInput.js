/**
 * @fileoverview �洢�ļ�·����Ϣ��������
 * @author: ��ƽ�����ӣ�<minghe36@126.com>,��Ӣ<daxingplay@gmail.com>
 **/
KISSY.add(function(S,Node,Base) {
    var EMPTY = '',$ = Node.all,LOG_PREFIX = '[uploader-urlsInput]:';
    function UrlsInput(container,config){
        var self = this;
        //���ø��๹�캯��
        UrlsInput.superclass.constructor.call(self,config);
        self.set('container',$(container));
    }
    S.mix(UrlsInput,/**@lends UrlsInput*/ {
        TPL : '<input type="hidden" id="{name}" name="{name}" value="{value}" />'
    });
    //�̳���Base������getter��setterί����Base����
    S.extend(UrlsInput, Base, /** @lends UrlsInput.prototype*/{
            /**
             * ����
             */
            render : function(){
                var self = this,container = self.get('container');
                if(!S.isObject(container)){
                    S.log(LOG_PREFIX + 'container�������Ϸ���');
                    return false;
                }
                self._create();
            },
            /**
             * ����������
             */
            _create : function(){
                var self = this,container = self.get('container'),
                    tpl = self.get('tpl'),
                    name = self.get('name'), urls = self.get('urls'),
                    input;
                if(!S.isString(tpl) || !S.isString('name')) return false;
                input = $(S.substitute(tpl,{name : name,value : urls}));
                container.append(input);
                self.set('input',input);
                return input;
            }

    },{ATTRS : /** @lends UrlsInput*/{
            name : {value : EMPTY},
            /**
             * �ļ�·��
             */
            urls : {
                value : EMPTY,
                setter : function(v){

                }
            },
            /**
             * inputģ��
             */
            tpl : {value : UrlsInput.TPL},
            /**
             * �ļ�·������input
             */
            input : {value : EMPTY},
            /**
             * ����������
             */
            container : {value : EMPTY}
    }});

    return UrlsInput;
},{requires:['node','base']});