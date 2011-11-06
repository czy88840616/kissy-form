/**
 * @fileoverview �첽�ļ��ϴ����
 * @author: ��ƽ�����ӣ�<minghe36@126.com>,��Ӣ<daxingplay@gmail.com>
 **/
KISSY.add(function(S, Base, Node,UrlsInput,IframeType,AjaxType) {
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
    S.mix(Uploader,/** @lends Uploader*/{
            /**
             * �ϴ���ʽ
             */
            type : {AUTO : 'auto',IFRAME : 'iframe',AJAX : 'ajax'},
            /**
             * �¼�
             */
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
                    UploadType = self.getUploadType(),uploadType;
                if(!UploadType) return false;
                self._renderQueue();
                self._renderButton();
                self._renderUrlsInput();
                uploadType = new UploadType(serverConfig);
                self.set('uploadType',uploadType );
                //self.fire(Uploader.event.RENDER);
                return self;
            },
            /**
             * �ϴ��ļ�
             * @param {Number} fileIndex �ļ�����ֵ
             */
            upload : function(fileIndex){
                if(!fileIndex) return false;
                var self = this,uploadType = self.get('uploadType'),
                    queue = self.get('queue'), oFile = queue.getFile(fileIndex);
                uploadType.upload();
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
            getUploadType : function(){
                var self = this,type = self.get('type'),types = Uploader.type,
                isSupportAjax = self.isSupportAjax(),UploadType;
                switch(type){
                    case types.AUTO :
                        UploadType = isSupportAjax && AjaxType || IframeType;
                    break;
                    case types.IFRAME :
                        UploadType = IframeType;
                    break;
                    case types.AJAX :
                        UploadType = AjaxType;
                    break;
                    default :
                    S.log(LOG_PREFIX + 'type�������Ϸ���ֻ��������ֵΪ'+types.AUTO + ',' + types.IFRAME + ',' + types.AJAX);
                    return false;
                }
                return UploadType;
            },
            /**
             * ����Button�ϴ���ť���
             * @return {Button}
             */
            _renderButton : function(){
                var self = this,button = self.get('button');
                if (!S.isObject(button)) {
                    S.log(LOG_PREFIX + 'button�������Ϸ���');
                    return false;
                }
                //������ť�ı��¼�
                button.on('change', self._select,self);
                //���а�ťʵ��
                button.render();
                return button;
            },
            /**
             * ѡ�����ļ���
             */
            _select : function(ev){
                var self = this,autoUpload = self.get('autoUpload');
                self._appendToQueue(ev);
                autoUpload && self.upload();
            },
            /**
             * ����Queue�������
             * @return {Queue} ����ʵ��
             */
            _renderQueue : function() {
                var self = this,queue = self.get('queue'),button = self.get('button');
                if (!S.isObject(queue)) {
                    S.log(LOG_PREFIX + 'queue�������Ϸ�');
                    return false;
                }
                queue.render();
                return queue;
            },
            /**
             * ���ļ���ӵ�����
             */
            _appendToQueue : function(fileObj){
                var self = this,queue = self.get('queue');
                queue.add();
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
            type : {value : Uploader.type.AUTO},
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
            uploadType : {value : {}}
    }});
    return Uploader;
},{requires:['base','node','./urlsInput','./type/iframe','./type/ajax']});