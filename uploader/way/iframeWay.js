/**
 * @fileoverview iframe�����ϴ�
 * @author: ��ƽ�����ӣ�<minghe36@126.com>,��Ӣ<daxingplay@gmail.com>
 **/
KISSY.add(function(S,Node,Base) {
    var EMPTY = '',$ = Node.all;
    /**
     * @name IframeWay
     * @class iframe�����ϴ�
     * @constructor
     * @extends Base
     * @requires Node
     */
    function IframeWay(config){
        var self = this;
        //���ø��๹�캯��
        IframeWay.superclass.constructor.call(self,config);
    }
    S.mix(IframeWay,/**@lends IframeWay*/ {
            
    });
    //�̳���Base������getter��setterί����Base����
    S.extend(IframeWay, Base, /** @lends IframeWay.prototype*/{
        
    },{ATTRS : /** @lends IframeWay*/{

    }});
    
    return IframeWay;
},{requires:['node','base']});