/**
 * @fileoverview �����ļ��ϴ����
 * @author: ��ƽ�����ӣ�<minghe36@126.com>,��Ӣ<daxingplay@gmail.com>
 **/
KISSY.add(function(S, Base, Node,Uploader,Button,Queue) {
    var EMPTY = '',$ = Node.all,LOG_PREFIX = '[uploaderRender]:';
    /**
     * ���������ҳ����data-config��Ϊ���������
     * @param {String} hook �������
     * @param {String} dataConfigName ������
     * @return {Object}
     */
    function parseConfig(hook, dataConfigName) {
        var config = {},sConfig,DATA_CONFIG = dataConfigName || 'data-config';
        sConfig = $(hook).attr(DATA_CONFIG);
        if(!S.isString(sConfig)) return {};
        try {
            config = JSON.parse(sConfig);
        } catch(err) {
            S.log(LOG_PREFIX + '����'+hook+'��' + DATA_CONFIG + '�����ڵ�json��ʽ�Ƿ���Ϲ淶��');
        }
        return config;
    }
    /**
     * @name RenderUploader
     * @class �����ļ��ϴ����
     * @constructor
     * @param {String | HTMLElement} buttonTarget �ϴ���ťĿ��Ԫ��
     * @param {String | HTMLElement} queueTarget �ļ�����Ŀ��Ԫ��
     * @param {Object} config ����
     */
    function RenderUploader(buttonTarget, queueTarget, config) {
        var self = this;
        config = config || parseConfig(buttonTarget);
        //�����ʼ��
        RenderUploader.superclass.constructor.call(self, config);
        self.set('buttonTarget',buttonTarget);
        self.set('queueTarget',queueTarget);
        self.set('uploaderConfig',config);
        self._init();
    }

    S.extend(RenderUploader, Base, {
            /**
             * ��ʼ�����
             */
            _init : function() {
                var self = this,uploaderConfig = self.get('uploaderConfig'),
                    button = self._initButton(),
                    queue = self._initQueue();
                self.set('button',button);
                self.set('queue',queue);
                //�������Ӱ�ťʵ���Ͷ���ʵ��
                S.mix(uploaderConfig, {button : button,queue : queue});
                var uploader = new Uploader(uploaderConfig);
                uploader.render();
                uploader.upload();
            },
            /**
             * ��ʼ��ģ����ϴ���ť
             * @return {Button}
             */
            _initButton : function(){
                var self = this,target = self.get('buttonTarget');
                //ʵ�����ϴ���ť
                return new Button(target);
            },
            /**
             * ��ʼ���ϴ��ļ�����
             * @return {Queue}
             */
            _initQueue : function(){
                var self = this,target = self.get('queueTarget');
                return new Queue(target);
            }
        }, {
            ATTRS : {
                /**
                 * ��ťĿ��Ԫ��
                 */
                buttonTarget : {value : EMPTY},
                /**
                 * ����Ŀ��Ԫ��
                 */
                queueTarget : {value : EMPTY},
                /**
                 * �ϴ��������
                 */
                uploaderConfig : {},
                /**
                 * Button���ϴ���ť����ʵ��
                 */
                button : {value : EMPTY},
                /**
                 * Queue���ϴ����У���ʵ��
                 */
                queue : {value : EMPTY}
            }
        });
    return RenderUploader;
}, {requires:['base','node','./base','./button/base','./queue/base']});