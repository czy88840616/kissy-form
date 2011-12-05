/**
 * @fileoverview ajax�����ϴ�
 * @author ��ƽ�����ӣ�<minghe36@126.com>,��Ӣ<daxingplay@gmail.com>
 **/
KISSY.add(function(S, Node, UploadType) {
    var EMPTY = '',$ = Node.all,LOG_PREFIX = '[uploader-AjaxType]:';

    /**
     * @name AjaxType
     * @class ajax�����ϴ�
     * @constructor
     * @extends UploadType
     * @requires Node
     */
    function AjaxType(config) {
        var self = this;
        //���ø��๹�캯��
        AjaxType.superclass.constructor.call(self, config);
        //�����ݸ��������˵Ĳ���
        self._processData();
    }

    S.mix(AjaxType, /** @lends AjaxType.prototype*/{
        /**
         * �¼��б�
         */
        event : UploadType.event
    });
    //�̳���Base������getter��setterί����Base����
    S.extend(AjaxType, UploadType, /** @lends AjaxType.prototype*/{
        /**
         * �ϴ��ļ�
         * @param {HTMLElement} fileInput �ļ�input
         * @return {AjaxType}
         */
        upload : function(fileInput) {
            //�������ļ���Ϣ����ֱ���˳�
            if (!fileInput) {
                S.log(LOG_PREFIX + 'upload()��fileInput��������');
                return false;
            }
            var self = this, files = fileInput.files, file;
            //�������ļ���Ϣ����ֱ���˳�
            if (!files.length) {
                S.log(LOG_PREFIX + 'upload()��������Ҫ�ϴ����ļ���');
                return false;
            }
            file = files[0];
            self._addFileData(fileInput,file);
            self.send();
            return self;
        },
        /**
         * ֹͣ�ϴ�
         * @return {AjaxType}
         */
        stop : function(){
            var self = this,io = self.get('io');
            if(!S.isObject(io)){
                S.log(LOG_PREFIX + 'stop()��ioֵ����');
                return false;
            }
            //��ֹajax���󣬻ᴥ��error�¼�
            io.abort();
            return self;
        },
        /**
         * ����ajax����
         * @return {AjaxType}
         */
        send : function(){
            var self = this,ajaxConfig = self.get('ajaxConfig'),
                //�������˴����ļ��ϴ���·��
                action = self.get('action'),
                data = self.get('formData'),
                io;
            S.mix(ajaxConfig,{
                url : action,
                data : data,
                /**
                 * ����ɹ���Ļص�����
                 * @param {Object} result
                 */
                success : function(result){
                    self.fire(AjaxType.event.SUCCESS, {result : result});
                },
                /**
                 * ����ʧ�ܺ�Ļص�����
                 * @param  {Null} n
                 * @param {String} textStatus
                 */
                error : function(n,textStatus){
                    self.fire(AjaxType.event.ERROR, {textStatus : textStatus,msg : 'ajax����ʧ�ܣ�ԭ��' + textStatus});
                }
            });
            self.set('ajaxConfig',ajaxConfig);
            //ajax
            io = S.io(ajaxConfig);
            self.set('io',io);
            return self;
        },
        /**
         * �����ݸ��������˵Ĳ���
         */
        _processData : function(){
            var self = this,data = self.get('data'),
                formData = self.get('formData');
            S.each(data,function(val,key){
                formData.append(key,val);
            });
            self.set('formData',formData);
        },
        /**
         * ���ļ���Ϣ��ӵ�FormData��
         * @param {HTMLElement} fileInput �ļ��ϴ���
         * @param {Object} file �ļ���Ϣ
         */
        _addFileData : function(fileInput,file){
            if(!S.isObject(file)){
                S.log(LOG_PREFIX + '_addFileData()��file��������');
                return false;
            }
            var self = this,
                formData = self.get('formData'),
                fileDataName = self.get('fileDataName');
            if(fileDataName == EMPTY) {
                fileDataName = $(fileInput).attr('name');
                self.set('fileDataName',fileDataName);
            }
            formData.append(fileDataName,file);
            self.set('formData',formData);
        }
    }, {ATTRS : /** @lends AjaxType*/{
        /**
         * �����ݶ���
         */
        formData : {value : new FormData()},
        /**
         * ajax����
         */
        ajaxConfig : {value : {
                type : 'post',
                processData : false,
                cache : false,
                dataType : 'json',
                contentType: false
        }
        },
        io : {value : EMPTY},
        fileDataName : {value : EMPTY},
        form : {value : {}},
        fileInput : {value : EMPTY}
    }
    });
    return AjaxType;
}, {requires:['node','./base']});