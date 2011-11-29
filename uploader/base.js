/**
 * @fileoverview �첽�ļ��ϴ����
 * @author ��ƽ�����ӣ�<minghe36@126.com>,��Ӣ<daxingplay@gmail.com>
 **/
KISSY.add(function(S, Base, Node, UrlsInput, IframeType, AjaxType) {
    var EMPTY = '',$ = Node.all,LOG_PREFIX = '[uploader]:';

    /**
     * @name Uploader
     * @class �첽�ļ��ϴ������Ŀǰ��ʹ��ajax+iframe�ķ������պ�����flash����
     * @constructor
     * @extends Base
     * @requires Node,IframeUploader,AjaxUploader
     */
    function Uploader(config) {
        var self = this;
        //���ø��๹�캯��
        Uploader.superclass.constructor.call(self, config);

    }

    S.mix(Uploader, /** @lends Uploader*/{
        /**
         * �ϴ���ʽ
         */
        type : {AUTO : 'auto',IFRAME : 'iframe',AJAX : 'ajax'},
        /**
         * �¼�
         */
        event : {
            //����
            RENDER : 'render',
            //ѡ�����ļ��󴥷�
            SELECT : 'select',
            //��ʼ�ϴ�
            START : 'start',
            // �ϴ���
            UPLOADING: 'uploading',
            //�ϴ���ɣ����ϴ��ɹ����ϴ�ʧ�ܺ󶼻ᴥ����
            COMPLETE :'complete',
            //�ϴ��ɹ�
            SUCCESS : 'success',
            //�ϴ�ʧ��
            ERROR : 'error'
        }
    });
    //�̳���Base������getter��setterί����Base����
    S.extend(Uploader, Base, /** @lends Uploader.prototype*/{
        /**
         * ����
         * @return {Uploader}
         */
        render : function() {
            var self = this,serverConfig = self.get('serverConfig'),
                UploadType = self.getUploadType(),uploadType;
            if (!UploadType) return false;
            self._renderQueue();
            self._renderButton();
            self._renderUrlsInput();
            uploadType = new UploadType(serverConfig);
            //�����ϴ����ϴ�����¼�
            uploadType.on(uploadType.constructor.event.COMPLETE, self._uploadCompleteHanlder, self);
            self.set('uploadType', uploadType);
            self.fire(Uploader.event.RENDER);
            return self;
        },
        /**
         * �ϴ��ļ�
         * @param {Number} fileId �ļ�����ֵ
         */
        upload : function(fileId) {
            if (!S.isNumber(fileId)) return false;
            var self = this,uploadType = self.get('uploadType'),
                queue = self.get('queue'),
                file = queue.get('files')[fileId],
                fileInput;
            if (!S.isPlainObject(file)) {
                S.log(LOG_PREFIX + '�����в�����idΪ' + fileId + '���ļ�');
                return false;
            }
            //�ļ��ϴ���
            fileInput = file.input;
            //�����ļ��ϴ�ǰ�¼�
            self.fire(Uploader.event.START, {id : fileId,file : file});
            //���õ�ǰ�ϴ����ļ�id
            self.set('curUploadId', fileId);
            //�ı��ļ��ϴ�״̬Ϊstart
            queue.fileStatus(fileId, queue.constructor.status.START);
            //��ʼ�ϴ�
            uploadType.upload(fileInput);
        },
        /**
         * �Ƿ�֧��ajax�����ϴ�
         * @return {Boolean}
         */
        isSupportAjax : function() {
            return S.isObject(FormData);
        },
        /**
         * ��ȡ�ϴ���ʽ�ࣨiframe������ajax������
         * @return {IframeWay|AjaxWay}
         */
        getUploadType : function() {
            var self = this,type = self.get('type'),types = Uploader.type,
                isSupportAjax = self.isSupportAjax(),UploadType;
            switch (type) {
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
                    S.log(LOG_PREFIX + 'type�������Ϸ���ֻ��������ֵΪ' + types.AUTO + ',' + types.IFRAME + ',' + types.AJAX);
                    return false;
            }
            return UploadType;
        },
        /**
         * ����Button�ϴ���ť���
         * @return {Button}
         */
        _renderButton : function() {
            var self = this,button = self.get('button');
            if (!S.isObject(button)) {
                S.log(LOG_PREFIX + 'button�������Ϸ���');
                return false;
            }
            //������ť�ı��¼�
            button.on('change', self._select, self);
            //���а�ťʵ��
            button.render();
            return button;
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
         * ѡ�����ļ���
         */
        _select : function(ev) {
            var self = this,autoUpload = self.get('autoUpload'),
                queue = self.get('queue'),
                oFile = {name : ev.name,input : ev.input},
                fileId;
            self.fire(Uploader.event.SELECT);
            //���������ļ�
            fileId = queue.add(oFile);
            autoUpload && self.upload(fileId);
        },
        /**
         * ���ϴ���ť�������������ڴ洢�ļ�·����input
         */
        _renderUrlsInput : function() {
            var self = this,button = self.get('button'),inputWrapper = button.target,
                name = self.get('urlsInputName'),
                urlsInput = new UrlsInput(inputWrapper, {name : name});
            urlsInput.render();
            return urlsInput;
        },
        /**
         * ���ϴ���Ϻ󷵻ؽ�����Ĵ���
         */
        _uploadCompleteHanlder : function(ev) {
            var self = this,result = ev.result,status,event = Uploader.event,
                queue = self.get('queue'),id = self.get('curUploadId'),
                file = queue.getFile(id);
            //�ÿյ�ǰ�ϴ�id
            self.set('curUploadId', EMPTY);
            if (!S.isObject(result)) return false;
            //�ļ��ϴ�״̬
            status = result.status;
            if (status) {
                //�޸Ķ������ļ���״̬Ϊsuccess���ϴ���ɣ�
                queue.fileStatus(id, queue.constructor.status.SUCCESS);
                self.fire(event.SUCCESS);
            } else {
                //�޸Ķ������ļ���״̬Ϊerror���ϴ�ʧ�ܣ�
                queue.fileStatus(id, queue.constructor.status.ERROR);
                self.fire(event.ERROR, {status : status});
            }
            self.set('curUploadId', EMPTY);
            self.fire(event.COMPLETE);
        }

    }, {ATTRS : /** @lends Uploader*/{
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
        //��ǰ�ϴ���id
        curUploadId : {value : EMPTY},
        uploadType : {value : {}}
    }});
    return Uploader;
}, {requires:['base','node','./urlsInput','./type/iframe','./type/ajax']});