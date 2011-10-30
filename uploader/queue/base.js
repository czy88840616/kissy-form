/**
 * @fileoverview �ϴ������б���ʾ�ʹ���
 * @author: ��ƽ�����ӣ�<minghe36@126.com>
 **/
KISSY.add(function(S,DOM,Base,Event){
    var EMPTY = '',KB = 'KB',MB = 'MB',
        data = {NAME : 'data-name'},
        //����̨
        console = console || S,LOG_PREFIX = '[queue]:';
    /**
    * �ϴ������б���ʾ�ʹ���
    * @class Queue
    * @constructor
    * @param {String} container ������������ul��ol��
    * @param {Object} config ���ö���
    */
    function Queue(container ,config){
        var self = this;
        /**
         * Ŀ������
         * @type HTMLElement
         */
        self.container = S.get(container);
        /**
         * �ļ����ݻ���
         * @type Array
         */
        self.files = [];
        //�����ʼ��
        Queue.superclass.constructor.call(self, config);
    }
    //�̳���KISSY.Base
    S.extend(Queue, Base);
    S.mix(Queue,{
        //ģ��
        //TODO:���ϲ�list��item��Ҫ����item���������
        tpl : {
            DEFAULT:'<li class="clearfix" data-name="{name}" data-url="{url}">' +
                        '<div class="f-l sprite file-icon"></div>' +
                        '<div class="f-l">{name}</div>' +
                        '<div class="f-l loading J_Loading"></div>' +
                        '<div class="f-l uploader-controller J_UploaderController"><a href="#deleteFile()" class="g-u J_DeleteFile">ɾ��</a></div>' +
                    '</li>'
        },
        hook : {
            LOADING : '.J_Loading',
            UPLOADER_CONTROLLER : '.J_UploaderController',
            DELETE_FILE : '.J_DeleteFile'
        },
        //��ʽ
        cls : {
            QUEUE : 'ks-uploader-queue'
        },
        //�¼�
        event : {
            //�����һ���ļ�����¼�
            ADD_ITEM : 'addItem',
            //��Ӷ���ļ�����¼�
            ADD_ALL : 'addAll',
            //ɾ���ļ��󴥷�
            REMOVE_ITEM : 'removeItem'
        },
        /**
         * ת���ļ���С�ֽ���
         * @param {Number} size �ļ���С�ֽ���
         * @return {String} �ļ���С
         */
        convertByteSize : function(size){
            var byteSize = Math.round(size / 1024 * 100) * .01,suffix = KB,sizeParts;
            if (byteSize > 1000) {
                byteSize = Math.round(byteSize *.001 * 100) * .01;
                suffix = MB;
            }
            sizeParts = byteSize.toString().split('.');
            if (sizeParts.length > 1) {
                byteSize = sizeParts[0] + '.' + sizeParts[1].substr(0,2);
            } else {
                byteSize = sizeParts[0];
            }
            return byteSize+ suffix;
        }
    });
    /**
     * ���ò���
     */
    Queue.ATTRS = {
        /**
         * �Ƿ��Զ�����
         * @type Boolean
         */
        autoRender : {
            value : false,
            setter : function(v){
                v && this.render();
                return v;
            }
        },
        /**
         * ģ��
         * @type String
         */
        tpl : {
            value : Queue.tpl.DEFAULT
        },
        /**
         * ����ļ�������
         * @type Number
         */
        max : {
            value : 3
        }
    };
    /**
     * ����
     */
    S.augment(Queue,{
        /**
         * ����
         * @return {Queue} Queue��ʵ��
         */
        render : function(){
            var self = this,container = self.container;
            if(container == null){
                console.log(LOG_PREFIX + '����������Ϊ�գ�');
                return false;
            }
            DOM.addClass(container,Queue.cls.QUEUE);
            return self;
        },
        /**
         * ���ϴ���������ļ�
         * @param {Object | Array} file �ļ���Ϣ
         * @return {Queue} Queue��ʵ��
         */
        add : function(file){
            var self = this,itemHtml = EMPTY,item,tpl = self.get('tpl'),
                container = self.container,event = Queue.event,size,
                max = self.get('max'),files = self.files,fileController,delEle;
            if(files.length >= max){
                console.log(LOG_PREFIX + '������������ϴ���');
                return false;
            }
            //���飬˵���Ƕ���ļ�����
            if(S.isArray(file) && file.length > 0){
                S.each(file,function(f,i){
                    self.add(f);
                    if(i == file.length - 1) self.fire(event.ADD_ALL,{files : file});
                })
            }
            //�����׷��һ���ļ�����
            else if(S.isObject(file)){
                //ת���ļ���С�ĵ�λ
                size = file.size;
                if(size) file.size = Queue.convertByteSize(size);
                //ת��ģ��
                itemHtml = S.substitute(tpl,file);
                item = DOM.create(itemHtml);
                DOM.append(item,container);
                //ɾ�����Ӽ���click�¼�
                fileController = DOM.children(item,Queue.hook.UPLOADER_CONTROLLER);
                delEle = DOM.children(fileController,Queue.hook.DELETE_FILE);
                Event.on(delEle,'click',self._delFileHandler,self);
                //���ļ����ݼ��뻺��
                self.files.push(file);
                self.fire(event.ADD_ITEM,{file : file});
            }
            return self;
        },
        /**
         * ɾ��
         * @param {String | Array} name �ļ�������Ϊ����ʱ����ɾ��
         * @return {Object} �ļ�����ʵ��
         */
        remove : function(name){
            var self = this,files = self.files,lis = DOM.children(self.container,'li');
            if(files.length == 0) return false;
            //���飬˵���Ƕ���ļ�����
            if(S.isArray(name) && name.length > 0){
                S.each(name,function(n,i){
                    self.remove(n);
                })
            }
            else if(S.isString(name)){
                self.removeFileData(name,function(index){
                    lis[index] != null && DOM.remove(lis[index]);
                    self.fire(Queue.event.REMOVE_ITEM,{index : index});
                });
            }
            return self;
        },
        /**
         * ɾ���ļ����ݣ�֮��������remove�����󣬻����������������Ҫ������ֻɾ�����ݲ�ɾ��DOM������
         * @param {String} name �ļ���
         * @param {Function} callBack �ص�����
         */
        removeFileData : function(name,callBack){
            var self = this,files = self.files;
            S.each(files,function(file,index){
                //���ڸ��ļ�
                if(file.name == name){
                    self.files.splice(index,1);
                    callBack && callBack.call(this,index);
                    return true;
                }
            })
        },
        /**
         * ����loading gifͼ��
         * @param {Number} index li������
         * @return {HTMLElement}
         */
        cancelLoading : function(index){
            var self = this,li = DOM.children(self.container)[index],loadingIcon;
            if(!li) return false;
            loadingIcon = DOM.children(li,Queue.hook.LOADING);
            DOM.hide(loadingIcon);
            return loadingIcon;
        },
        /**
         * ��ʾ�ļ����Ʋ�����������ɾ���ļ��ȣ�һ�����ϴ���������ʾ��
         * @param {Number} index li������
         * @return {HTMLElement}
         */
        showFileController : function(index){
            var self = this,li = DOM.children(self.container)[index],fileController;
            if(!li) return false;
            fileController = DOM.children(li,Queue.hook.UPLOADER_CONTROLLER);
            DOM.show(fileController);
            return fileController;
        },
        /**
         * ɾ���¼�������
         * @param {Object} ev �¼�����
         */
        _delFileHandler : function(ev){
            var self = this,target = ev.target,li = DOM.parent(target,'li'),name = DOM.attr(li,data.NAME);
            //TODO:��ʱ�޸�IE6�±���name��ֵΪ�յĴ���
            try{
                self.remove(name);
            }catch(err){

            }
        }
    });

    return Queue;
},{requires:['dom','base','event']});
