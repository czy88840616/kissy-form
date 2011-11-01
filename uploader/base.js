/**
 * @fileoverview �첽�ļ��ϴ����
 * @author: ��ƽ�����ӣ�<minghe36@126.com>,��Ӣ<daxingplay@gmail.com>
 **/
KISSY.add(function(S, Base, Node,IframeWay,AjaxWay) {
    var EMPTY = '',$ = Node.all,LOG_PREFIX = '[uploader]:';
    /**
     * @name Uploader
     * @class �첽�ļ��ϴ����
     * @constructor
     * @extends Base
     * @requires Node,IframeUploader,AjaxUploader
     */
    function Uploader(){
        var self = this;
        //���ø��๹�캯��
        Uploader.superclass.constructor.call(self);
        
    }
    S.mix(Uploader,{
        WAY : {AUTO : 'auto',IFRAME : 'iframe',AJAX : 'ajax'}
    });
    //�̳���Base������getter��setterί����Base����
    S.extend(Uploader, Base, /** @lends Uploader.prototype*/{
            /**
             * ����
             */
            render : function(){
                var self = this,UploadWay = self.getUploadWay();
                if(!UploadWay) return false;

            },
            /**
             * �ϴ��ļ�
             */
            upload : function(){

            },
            /**
             * �Ƿ�֧��ajax�����ϴ�
             * @return {Boolean}
             */
            isSupportAjax : function(){
                return S.isObject(FormData);
            },
            /**
             * ��ȡ�ϴ���ʽ�ࣨiframe������ajax������
             * @return {IframeWay|AjaxWay}
             */
            getUploadWay : function(){
                var self = this,way = self.get('way'),WAY = Uploader.WAY,
                isSupportAjax = self.isSupportAjax(),UploadWay;
                switch(way){
                    case WAY.AUTO :
                        UploadWay = isSupportAjax && AjaxWay || IframeWay;
                    break;
                    case WAY.IFRAME :
                        UploadWay = IframeWay;
                    break;
                    case WAY.AJAX :
                        UploadWay = AjaxWay;
                    break;
                    default :
                    S.log(LOG_PREFIX + 'way�������Ϸ���ֻ��������ֵΪ'+WAY.AUTO + ',' + WAY.IFRAME + ',' + WAY.AJAX);
                    return false;
                }
                return UploadWay;
            }
    },{ATTRS : /** @lends Uploader*/{
            /**
             * ���õ��ϴ�������auto������������Զ�ѡ��iframe������iframe������ajax������ajax����
             */
            way : {value : Uploader.WAY.AUTO}
    }});
    return Uploader;
},{requires:['base','node','./way/iframeWay','./way/ajaxWay']});