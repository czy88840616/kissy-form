/**
 * @fileoverview �ϴ���ʽ��Ļ���
 * @author: ��ƽ�����ӣ�<minghe36@126.com>,��Ӣ<daxingplay@gmail.com>
 **/
KISSY.add(function(S,Node,Base) {
    var EMPTY = '',$ = Node.all;
    /**
     * @name UploadType
     * @class iframe�����ϴ�
     * @constructor
     * @extends Base
     * @requires Node
     */
    function UploadType(config){
        var self = this;
        //���ø��๹�캯��
        UploadType.superclass.constructor.call(self,config);
    }
    //�̳���Base������getter��setterί����Base����
    S.extend(UploadType, Base, /** @lends UploadType.prototype*/{
            /**
             * �ϴ��ļ�
             */
            upload : function(){

            }
    },{ATTRS : /** @lends UploadType*/{
            /**
             * ��������·��
             */
            action : {value : EMPTY},
            /**
             * ���͸��������˵Ĳ������ϣ��ᱻת��hiddenԪ��post���������ˣ�
             */
            data : {value : {}}
    }});

    return UploadType;
},{requires:['node','base']});