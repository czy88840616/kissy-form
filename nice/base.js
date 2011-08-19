/**
 * @fileoverview ��Ԫ����������
 * @author: ��ƽ�����ӣ�<minghe36@126.com>
 *
 **/
KISSY.add(function(S,Event) {
    /**
     * ��չKISSY.Event��trigger���ڴ���Ŀ���¼�
     * @param {String} target �¼�Ŀ��
     * @param {String} type �¼�����
     */
    Event.trigger = function(target,type){
        var listeners = Event.__getListeners(target,type),
            len = listeners.length,fn,that;
        if(len == 0) return false;
        S.each(listeners,function(listener){
            fn = listener.fn;
            that = listener.scope;
            if(S.isFunction(fn)){
                fn.call(listener.scope,{'target':target});
            }
        });
    };

    function niceBase(){

    }
    return niceBase;
},{requires : ['event']});