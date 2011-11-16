/**
 * �ļ��ϴ������б���ʾ�ʹ���
 * @author: ��ƽ�����ӣ�<minghe36@126.com>,��Ӣ<daxingplay@gmail.com>
 **/
KISSY.add(function(S,Node,Base) {
    var EMPTY = '',$ = Node.all;
    /**
     * @name Queue
     * @class �ļ��ϴ�����
     * @constructor
     * @extends Base
     * @requires Node
     */
    function Queue(target,config){
        var self = this;
        //���ø��๹�캯��
        Queue.superclass.constructor.call(self,config);
        //����Ŀ��
        self.set('target',$(target));
    }
    S.mix(Queue,/**@lends Queue*/ {
            /**
             * ģ��
             */
            tpl : {
                DEFAULT:'<li id="queue-file-{id}" class="clearfix" data-name="{name}">' +
                            '<div class="f-l sprite file-icon"></div>' +
                            '<div class="f-l">{name}</div>' +
                            '<div class="f-l loading J_Loading"></div>' +
                            '<div class="f-l uploader-controller J_UploaderController"><a href="#deleteFile()" class="g-u J_DeleteFile">ɾ��</a></div>' +
                        '</li>'
            },
            /**
             * ֧�ֵ��¼�
             */
            event : {
                //�����һ���ļ�����¼�
                ADD : 'add',
                //��Ӷ���ļ�����¼�
                ADD_ALL : 'addAll',
                //ɾ���ļ��󴥷�
                REMOVE_ITEM : 'removeItem',
                // ������ʱ����
                QUEUE_FULL: 'queueFull'
            },
            //��ʽ
            cls : {
                QUEUE : 'ks-uploader-queue'
            }
    });
    //�̳���Base������getter��setterί����Base����
    S.extend(Queue, Base, /** @lends Queue.prototype*/{
            /**
             * �������
             * @return {Queue}
             */
            render: function(){
                var self = this,$target = self.get('target');
                $target.addClass(Queue.cls.QUEUE);
                return self;
            },
            /**
             * ���ϴ���������ļ�
             * @param {Object} file �ļ���Ϣ
             * @return {NodeList} �ļ��ڵ�
             */
            add : function(file){
                var self = this,$target = self.get('target'),event = Queue.event,hFile,$file,
                    //Ԥ���ļ�id
                    autoId = self.get('id'),
                    //�ļ���Ϣ��ʾģ��
                    tpl = self.get('tpl'),
                    files = self.get('files');
                //�����ļ�Ψһid
                file.id = autoId;
                hFile = S.substitute(tpl,file);
                //���ļ���ӵ�����֮��
                $file = $(hFile).appendTo($target).data('data-file',file);
                files[autoId] = file;
                self.set('files',files);
                //�����ļ�id���
                autoId ++;
                self.set('id', autoId);
                self.fire(event.ADD,{file : file,target : $file.getDOMNode()});
                return $file;
            },
            /**
             * ��ȡָ������ֵ�Ķ����е��ļ�
             * @param index
             */
            getFile : function(index){
                
            }
    },{ATTRS : /** @lends Queue*/{
            /**
             * ģ��
             * @type String
             */
            tpl : { value : Queue.tpl.DEFAULT },
            target : {value : EMPTY},
            id : {value : 0},
            files : {value : []}
    }});
    
    return Queue;
},{requires:['node','base']});
