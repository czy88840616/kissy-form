/**
 * @fileoverview �첽�ļ��ϴ����
 * @author: ��ƽ�����ӣ�<minghe36@126.com>,��Ӣ<daxingplay@gmail.com>
 **/
KISSY.add(function(S, Base, Node,UrlsInput,IframeWay,AjaxWay) {
    var EMPTY = '',$ = Node.all,LOG_PREFIX = '[uploader]:';
    /**
     * @name Uploader
     * @class �첽�ļ��ϴ������Ŀǰ��ʹ��ajax+iframe�ķ������պ�����flash����
     * @constructor
     * @extends Base
     * @requires Node,IframeUploader,AjaxUploader
     */
    function Uploader(config){
        var self = this;
        //���ø��๹�캯��
        Uploader.superclass.constructor.call(self,config);
        
    }
    S.mix(Uploader,{
            WAY : {AUTO : 'auto',IFRAME : 'iframe',AJAX : 'ajax'},
            event : {}
    });
    //�̳���Base������getter��setterί����Base����
    S.extend(Uploader, Base, /** @lends Uploader.prototype*/{
            /**
             * ����
             * @return {Uploader}
             */
            render : function(){
                var self = this,serverConfig = self.get('serverConfig'),
                    UploadWay = self.getUploadWay(),uploadWay;
                if(!UploadWay) return false;
                self._renderButton();
                self._renderUrlsInput();
                uploadWay = new UploadWay(serverConfig);
                self.set('uploadWay',uploadWay );
                //self.fire(Uploader.event.RENDER);
                return self;
            },
            /**
             * �ϴ��ļ�
             */
            upload : function(){
                var self = this,uploadWay = self.get('uploadWay');
                uploadWay.upload();
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
            },
            /**
             * ����Button�ϴ���ť���
             * @return {Button}
             */
            _renderButton : function(){
                var self = this,button = self.get('button'),autoUpload;
                if (!S.isObject(button)) {
                    S.log(LOG_PREFIX + 'button�������Ϸ���');
                    return false;
                }
                //������ť�ı��¼�
                button.on('change', function(ev) {
                    autoUpload = self.get('autoUpload');
                    autoUpload && self.upload(ev);
                });
                //���а�ťʵ��
                button.render();
                return button;
            },
            /**
             * ����Queue�������
             * @return {Queue} ����ʵ��
             */
            _renderQueue : function() {
                var self = this,queue = self.get('queue'),button = self.get('button'),
                    urlsInput = button.urlsInput,urls;
                if (!S.isObject(queue)) {
                    S.log(LOG_PREFIX + 'queue�������Ϸ�');
                    return false;
                }
                //ɾ���������ļ��󴥷�
                queue.on('removeItem',function(ev){
                    
                });
                queue.render();
                return queue;
            },
            /**
             * ���ϴ���ť�������������ڴ洢�ļ�·����input
             */
            _renderUrlsInput : function(){
                var self = this,button = self.get('button'),inputWrapper = button.target,
                    name  = self.get('urlsInputName'),
                    urlsInput = new UrlsInput(inputWrapper,{name : name});
                urlsInput.render();
                return urlsInput;
            }

    },{ATTRS : /** @lends Uploader*/{
            /**
             * Button��ť��ʵ��
             */
            button : {value : {}},
            /**
             * Queue���е�ʵ��
             */
            queue : {value : {}},
            /**
             * ���õ��ϴ�������auto������������Զ�ѡ��iframe������iframe������ajax������ajax����
             */
            way : {value : Uploader.WAY.AUTO},
            /**
             * ������������
             */
            serverConfig : {value : {action : EMPTY,data : {},dataType : 'json'}},
            /**
             * �Ƿ������ϴ��ļ�
             */
            isAllowUpload : {value : true},
            /**
             * �Ƿ��Զ��ϴ�
             */
            autoUpload : {value : true},
            /**
             * �洢�ļ�·�����������name��
             */
            urlsInputName : {value : EMPTY},
            uploadWay : {value : {}}
    }});
    return Uploader;
},{requires:['base','node','./urlsInput','./way/iframeWay','./way/ajaxWay']});