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
        self.set('target',$(target));
    }
    S.mix(Queue,/**@lends Queue*/ {
            /**
             * ģ��
             */
            tpl : {
                DEFAULT:'<li id="files{id}" class="f-l" data-url="{url}" data-name="{name}" data-size="{size}">' +
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
                ADD_ITEM : 'addItem',
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
            length : {value : 0}
    }});
    
    return Queue;
},{requires:['node','base']});
