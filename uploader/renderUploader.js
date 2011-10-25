/**
 * @fileoverview �����ļ��ϴ����
 * @author: ��ƽ�����ӣ�<minghe36@126.com>
 *
 **/
KISSY.add(function(S,DOM,Uploader,Button,Queue,Auth) {
    /**
     * ���������ҳ����data-config��Ϊ���������
     * @param {String} hook �������
     * @param {String} dataConfigName ������
     * @return {Object}
     */
    S.parseComConfig = function(hook,dataConfigName){
        var config = {},sConfig,DATA_CONFIG = dataConfigName || 'data-config';
        sConfig = DOM.attr(hook,DATA_CONFIG);
        try{
           config = JSON.parse(sConfig);
        }catch(err){
            S.log('����'+DATA_CONFIG+'�ĸ�ʽ�Ƿ���Ϲ淶');
        }
        return config;
    };

    /**
     * @name RenderUploader
     * @class �����ļ��ϴ����
     * @constructor
     * @param {String | HTMLElement} target Ŀ��Ԫ��
     * @param {String | HTMLElement} queueTarget �ļ�����Ŀ��Ԫ��
     * @param {Object} config ����
     */
    function RenderUploader(target,queueTarget,config){
        var self = this;
        self.target = S.get(target);
        self.queueTarget = S.get(queueTarget);
        self.config = config || S.parseComConfig(target);
        self.uploader = {};
        self._init();
    }
    S.augment(RenderUploader,{
            /**
             * ��ʼ��
             */
            _init : function(){
                var self = this, button = self._initButton(),queue = self._initQueue(),uploader;
                //���ò��������ϴ���ťʵ�����ϴ�����ʵ��
                S.mix(self.config, {button : button,queue : queue});
                //ʵ�����ϴ����
                uploader = new Uploader(self.config);
                uploader.render();
                self.uploader = uploader;
            },
            /**
             * ��ʼ��ģ����ϴ���ť
             * @return {UploadButton}
             */
            _initButton : function(){
                var self = this,buttonConfig = {};
                //�������ļ�·���������name��
                if (self.config.urlsInputName) buttonConfig.urlsInputName = self.config.urlsInputName;
                //ʵ�����ϴ���ť
                return new Button(self.target, buttonConfig);
            },
            /**
             * ��ʼ���ϴ��ļ�����
             * @return {Queue}
             */
            _initQueue : function(){
                var self = this;
                //�ϴ�����ʵ����
                return new Queue(self.queueTarget);
            },
            /**
             * ��ʼ���ϴ�ƾ֤��֤
             * @param {AjaxUploader} ajaxUploader AjaxUploader��ʵ��
             */
            _initAuth : function(ajaxUploader){
                var tip = new Tip(btn, {autoRender:true,container : DOM.next(DOM.parent(hook.BUTTON), hook.TIP_CONTAINER)});
                return new Auth({ajaxUploader : ajaxUploader,tip : tip});
            }
        });
    return RenderUploader;
}, {requires:['dom','./uploader','./button','./queue','./auth']});